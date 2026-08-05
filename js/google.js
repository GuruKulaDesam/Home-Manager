import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  projectId: "home-manager-2026",
  appId: "1:472322435541:web:0b9794f65030e50f38755c",
  apiKey: "AIzaSyBoWiYlMQAuxJej7a-4U0Zacdd4SuY9vEw",
  authDomain: "home-manager-2026.firebaseapp.com",
  storageBucket: "home-manager-2026.firebasestorage.app",
  messagingSenderId: "472322435541"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/contacts',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/meetings.space.created',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/presentations'
];

SCOPES.forEach(scope => provider.addScope(scope));

let cachedAccessToken = null;
let currentUser = null;
let authListeners = [];

export function onAuthUpdate(listener) {
  authListeners.push(listener);
  if (currentUser && cachedAccessToken) {
    listener({ user: currentUser, token: cachedAccessToken });
  }
}

function notifyAuthUpdate() {
  const data = currentUser && cachedAccessToken ? { user: currentUser, token: cachedAccessToken } : null;
  authListeners.forEach(l => l(data));
}

onAuthStateChanged(auth, user => {
  currentUser = user;
  if (!user) {
    cachedAccessToken = null;
    notifyAuthUpdate();
  }
});

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential || !credential.accessToken) {
      throw new Error("Could not retrieve access token from Google sign in.");
    }
    cachedAccessToken = credential.accessToken;
    currentUser = result.user;
    notifyAuthUpdate();
    return { user: currentUser, token: cachedAccessToken };
  } catch (err) {
    console.error("Google sign in error:", err);
    throw err;
  }
}

export async function logoutGoogle() {
  await signOut(auth);
  cachedAccessToken = null;
  currentUser = null;
  notifyAuthUpdate();
}

export function getAccessToken() {
  return cachedAccessToken;
}

export function getCurrentUser() {
  return currentUser;
}

// Global window access for HM integration
window.HMGoogle = {
  login: loginWithGoogle,
  logout: logoutGoogle,
  getToken: getAccessToken,
  getUser: getCurrentUser,
  onAuthUpdate,
  
  // 1. Google Drive API
  async listDriveFiles(pageSize = 20, mimeTypeFilter = '') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    let query = "trashed = false";
    if (mimeTypeFilter) {
      query += ` and mimeType = '${mimeTypeFilter}'`;
    }
    const url = `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&fields=files(id,name,mimeType,webViewLink,iconLink,thumbnailLink,modifiedTime,size)&q=${encodeURIComponent(query)}&orderBy=modifiedTime desc`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Drive error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async createDriveFile(name, content, mimeType = 'text/plain') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const metadata = { name, mimeType };
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', new Blob([content], { type: mimeType }));

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error(`Drive upload error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async deleteDriveFile(fileId, fileName = 'file') {
    if (!confirm(`Are you sure you want to delete "${fileName}" from Google Drive? This action cannot be undone.`)) {
      return false;
    }
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok && res.status !== 204) throw new Error(`Drive delete error: ${await res.text()}`);
    return true;
  },

  // 2. Google Contacts (People API)
  async getContacts(pageSize = 50) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const url = `https://people.googleapis.com/v1/people/me/connections?pageSize=${pageSize}&personFields=names,emailAddresses,phoneNumbers,organizations,photos`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Contacts error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  // 3. Google Calendar API
  async getCalendarEvents(maxResults = 25) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const now = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Calendar error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async createCalendarEvent(title, startTime, endTime, description = '', location = '') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const body = {
      summary: title,
      description,
      location,
      start: { dateTime: new Date(startTime).toISOString() },
      end: { dateTime: new Date(endTime).toISOString() }
    };
    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Create event error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  // 4. Google Meet API / Calendar Conference
  async createGoogleMeet(summary, startTime, endTime) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const body = {
      summary: summary || 'Home Manager Meet',
      description: 'Scheduled via Home Manager',
      start: { dateTime: new Date(startTime).toISOString() },
      end: { dateTime: new Date(endTime).toISOString() },
      conferenceData: {
        createRequest: {
          requestId: 'hm-' + Date.now(),
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    };
    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Google Meet error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  // 5. Google Classroom API
  async getClassroomCourses() {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch('https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Classroom error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async getClassroomCoursework(courseId) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Coursework error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  // 6. Google Tasks API
  async getTasksLists() {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch('https://tasks.googleapis.com/v1/users/@default/lists', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Tasks lists error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async getTasks(listId = '@default') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch(`https://tasks.googleapis.com/v1/lists/${listId}/tasks?showCompleted=true`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Tasks error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async createTask(title, notes = '', due = null, listId = '@default') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const body = { title, notes };
    if (due) body.due = new Date(due).toISOString();
    const res = await fetch(`https://tasks.googleapis.com/v1/lists/${listId}/tasks`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Create task error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async completeTask(taskId, listId = '@default') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch(`https://tasks.googleapis.com/v1/lists/${listId}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' })
    });
    if (!res.ok) throw new Error(`Complete task error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  // 7. Google Sheets API
  async createSpreadsheet(title) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties: { title } })
    });
    if (!res.ok) throw new Error(`Sheets error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  async appendSheetValues(spreadsheetId, range, values) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values })
    });
    if (!res.ok) throw new Error(`Sheets update error ${res.status}: ${await res.text()}`);
    return await res.json();
  },

  // 8. Google Docs API
  async createDoc(title, content = '') {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch('https://docs.googleapis.com/v1/documents', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error(`Docs error ${res.status}: ${await res.text()}`);
    const doc = await res.json();
    if (content && doc.documentId) {
      await fetch(`https://docs.googleapis.com/v1/documents/${doc.documentId}:batchUpdate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{ insertText: { location: { index: 1 }, text: content } }]
        })
      });
    }
    return doc;
  },

  // 9. Google Slides API
  async createPresentation(title) {
    const token = getAccessToken();
    if (!token) throw new Error("Please sign in with Google first.");
    const res = await fetch('https://slides.googleapis.com/v1/presentations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error(`Slides error ${res.status}: ${await res.text()}`);
    return await res.json();
  }
};
