(function () {
  const D = HM.data;
  const KEY = 'home-manager-active-persona-v1';
  const FAMILY_ID = 'family';
  const sharedNames = new Set(['', 'family', 'household', 'everyone', 'all', 'all members', 'shared', 'unassigned']);

  function people() {
    return Array.isArray(D.state.people) ? D.state.people : [];
  }

  function selectedId() {
    const saved = localStorage.getItem(KEY) || FAMILY_ID;
    return saved === FAMILY_ID || people().some(person => person.id === saved) ? saved : FAMILY_ID;
  }

  function current() {
    const id = selectedId();
    if (id === FAMILY_ID) return { id: FAMILY_ID, name: 'Family', householdRole: 'Shared household', isFamily: true, isStudent: false };
    const person = people().find(item => item.id === id);
    const role = String(person?.householdRole || 'Family member');
    return { ...person, isFamily: false, isStudent: /student|child|learner|daughter|son/i.test(role) };
  }

  function academic(person = current()) {
    return person && !person.isFamily ? (D.state.academicProfiles || []).find(profile => profile.personId === person.id) || null : null;
  }

  function set(id) {
    const valid = id === FAMILY_ID || people().some(person => person.id === id) ? id : FAMILY_ID;
    localStorage.setItem(KEY, valid);
    window.dispatchEvent(new CustomEvent('hm-persona-change', { detail: current() }));
    return current();
  }

  function roleGroup(person = current()) {
    if (person.isFamily) return 'family';
    return person.isStudent ? 'children' : 'parents';
  }

  function owns(record, person = current()) {
    if (!record || person.isFamily) return true;
    const explicitIds = ['personId', 'ownerId', 'studentId'].map(key => String(record[key] || '').trim()).filter(Boolean);
    if (explicitIds.length) return explicitIds.includes(person.id);
    const owner = String(record.assignee ?? record.owner ?? record.member ?? '').trim();
    const normalized = owner.toLowerCase();
    if (sharedNames.has(normalized)) return true;
    if (normalized === 'parents') return roleGroup(person) === 'parents';
    if (normalized === 'children') return roleGroup(person) === 'children';
    return normalized === String(person.name || '').trim().toLowerCase();
  }

  function scope(items) {
    return (items || []).filter(item => owns(item));
  }

  function initials(person = current()) {
    if (person.isFamily) return 'FN';
    return String(person.name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || '?';
  }

  window.HM.persona = { KEY, FAMILY_ID, people, current, academic, set, owns, scope, initials, roleGroup };
})();
