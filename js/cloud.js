import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import { doc, getDoc, initializeFirestore, onSnapshot, persistentLocalCache, persistentMultipleTabManager, serverTimestamp, setDoc } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

const config = {
  projectId: 'home-manager-2026',
  appId: '1:472322435541:web:0b9794f65030e50f38755c',
  apiKey: 'AIzaSyBoWiYlMQAuxJej7a-4U0Zacdd4SuY9vEw',
  authDomain: 'home-manager-2026.firebaseapp.com',
  storageBucket: 'home-manager-2026.firebasestorage.app',
  messagingSenderId: '472322435541'
};

const vaultStorageKey = 'our-divine-nest-family-vault';
const deviceStorageKey = 'our-divine-nest-device-id';
const vaultPattern = /^[A-Za-z0-9_-]{43}$/;
const app = initializeApp(config);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

let vaultId = new URL(location.href).searchParams.get('vault') || localStorage.getItem(vaultStorageKey) || '';
let deviceId = localStorage.getItem(deviceStorageKey) || crypto.randomUUID();
let stateDocument = null;
let unsubscribe = null;
let saveTimer = null;
let applyingRemote = false;
let lastRemoteRevision = 0;
let status = vaultPattern.test(vaultId) ? 'connecting' : 'local';
let detail = status === 'local' ? 'Saved only in this browser' : 'Connecting to family database';

localStorage.setItem(deviceStorageKey, deviceId);
if (!vaultPattern.test(vaultId)) vaultId = '';
else localStorage.setItem(vaultStorageKey, vaultId);

function emit(name, payload = {}) {
  window.dispatchEvent(new CustomEvent(name, { detail: payload }));
}

function setStatus(next, message) {
  status = next;
  detail = message;
  emit('hm-cloud-status', getStatus());
}

function getStatus() {
  return { status, detail, connected: status === 'connected', vaultId, shareUrl: vaultId ? sharedUrl(vaultId) : '' };
}

function sharedUrl(id) {
  const url = new URL(location.href);
  url.searchParams.set('vault', id);
  return url.toString();
}

function createVault() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const id = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  connectVault(id);
}

function connectVault(value) {
  const id = String(value || '').trim();
  if (!vaultPattern.test(id)) throw new Error('The shared family key must be exactly 43 letters, numbers, underscores or hyphens.');
  localStorage.setItem(vaultStorageKey, id);
  const url = new URL(location.href);
  url.searchParams.set('vault', id);
  location.assign(url.toString());
}

function disconnectVault() {
  localStorage.removeItem(vaultStorageKey);
  const url = new URL(location.href);
  url.searchParams.delete('vault');
  location.assign(url.toString());
}

function persistRemoteState(payload) {
  if (!payload || typeof payload !== 'object' || !payload.state) return;
  const revision = Number(payload.revision || 0);
  if (payload.deviceId === deviceId && revision <= lastRemoteRevision) return;
  try {
    applyingRemote = true;
    const normalized = HM.data.normalize(payload.state);
    HM.data.state = normalized;
    localStorage.setItem(HM.data.KEY, JSON.stringify(normalized));
    lastRemoteRevision = Math.max(lastRemoteRevision, revision);
    emit('hm-cloud-state', { revision, deviceId: payload.deviceId || '' });
  } catch (error) {
    console.error('Family database contained invalid state', error);
    setStatus('error', 'Family database data could not be loaded');
  } finally {
    applyingRemote = false;
  }
}

function cloudSafeState(value) {
  const blockedKey = /(password|passcode|secret|otp|access.?token|refresh.?token|id.?token|credential)s?$/i;
  const visit = input => {
    if (Array.isArray(input)) return input.map(visit);
    if (!input || typeof input !== 'object') return input;
    return Object.fromEntries(Object.entries(input).filter(([key]) => !blockedKey.test(key)).map(([key, item]) => [key, visit(item)]));
  };
  return visit(value);
}

async function writeState() {
  if (!stateDocument || applyingRemote) return;
  const serialized = JSON.stringify(cloudSafeState(HM.data.state));
  if (new Blob([serialized]).size > 900000) {
    setStatus('error', 'Family data is too large for one database document; export a backup');
    return;
  }
  const revision = Date.now();
  lastRemoteRevision = revision;
  setStatus('saving', 'Saving family data');
  try {
    await setDoc(stateDocument, {
      schemaVersion: 1,
      state: JSON.parse(serialized),
      revision,
      deviceId,
      updatedAt: serverTimestamp()
    });
    setStatus('connected', 'Saved permanently in the family database');
  } catch (error) {
    console.error('Family database save failed', error);
    setStatus('error', 'Cloud save failed; changes remain saved in this browser');
  }
}

function scheduleSave() {
  if (!stateDocument || applyingRemote) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(writeState, 500);
}

async function startSync(user) {
  stateDocument = doc(db, 'familyVaults', vaultId, 'state', 'current');
  const snapshot = await getDoc(stateDocument);
  if (snapshot.exists()) persistRemoteState(snapshot.data());
  else await writeState();
  unsubscribe?.();
  unsubscribe = onSnapshot(stateDocument, { includeMetadataChanges: true }, current => {
    if (current.exists() && !current.metadata.hasPendingWrites) persistRemoteState(current.data());
    setStatus(current.metadata.fromCache ? 'offline' : 'connected', current.metadata.fromCache ? 'Offline; changes will sync when connected' : 'Saved permanently in the family database');
  }, error => {
    console.error('Family database listener failed', error);
    setStatus('error', 'Family database connection failed');
  });
  setStatus('connected', `Family database connected on device ${user.uid.slice(0, 6)}`);
}

const originalSave = HM.data.save.bind(HM.data);
HM.data.save = function saveWithCloud() {
  const result = originalSave();
  scheduleSave();
  return result;
};

HM.cloud = { getStatus, createVault, connectVault, disconnectVault, scheduleSave, writeState };
emit('hm-cloud-status', getStatus());

if (vaultId) {
  onAuthStateChanged(auth, user => {
    if (user) startSync(user).catch(error => {
      console.error('Family database startup failed', error);
      setStatus('error', 'Could not start family database sync');
    });
  });
  signInAnonymously(auth).catch(error => {
    console.error('Anonymous Firebase sign-in failed', error);
    setStatus('error', error.code === 'auth/operation-not-allowed' ? 'Enable Anonymous sign-in in Firebase Authentication' : 'Family database sign-in failed');
  });
}
