(function () {
  const D = HM.data;
  const V = HM.views;
  const $ = selector => document.querySelector(selector);
  let route = location.hash.slice(2) || 'global/overview';
  let workspace = route.split('/')[0];
  let activeGroup = D.state.settings.activeGroup || 'today';
  let expandedGroup = activeGroup === 'today' ? '' : activeGroup;
  let lastDeleted = null;
  let toastTimer = null;
  let activeTimerMinutes = 25;
  let activeBookReader = null;
  let activeBookUrl = '';
  const googleSessions = new Map();
  (D.state.settings.googleSync?.accounts || []).forEach(account => { if (account.status === 'connected') account.status = 'pending'; });
  if (!['home', 'community', 'study'].includes(workspace)) workspace = D.state.settings.activeWorkspace || 'home';

  const iconNames = {
    overview: 'layout-dashboard', tasks: 'list-checks', calendar: 'calendar-days',
    feed: 'newspaper', tickets: 'ticket-check', board: 'columns-3', focus: 'timer'
  };

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
  }

  function toast(message) {
    const element = $('#toast');
    clearTimeout(toastTimer);
    element.textContent = message;
    element.classList.add('show');
    toastTimer = setTimeout(() => element.classList.remove('show'), 3200);
  }

  function go(next) { location.hash = '#/' + next; }

  function save(message = 'Saved') {
    try {
      D.save();
      toast(message);
      return true;
    } catch (error) {
      toast('Could not save locally. Export a backup before continuing.');
      console.error(error);
      return false;
    }
  }

  function groupForRoute(currentRoute) {
    if (V.groups[activeGroup]?.items.some(item => item[2] === currentRoute)) return activeGroup;
    if (currentRoute === 'global/overview') return 'today';
    const lifeDomain = currentRoute.match(/^home\/life\/([^/]+)$/)?.[1];
    const lifeOwners = {
      property: 'household', bills: 'household', subscriptions: 'household', digital: 'household', help: 'household', sustainability: 'household', vehicles: 'household',
      travel: 'family', festivals: 'family', documents: 'family', tax: 'family', insurance: 'family', legacy: 'family',
      health: 'care', emergency: 'care', pets: 'care', education: 'learning'
    };
    if (lifeOwners[lifeDomain]) return lifeOwners[lifeDomain];
    const routeOwners = { 'home/assets': 'household', 'home/life/property': 'household', 'community/events': 'community', 'community/polls': 'community' };
    return routeOwners[currentRoute] || Object.keys(V.groups).find(key => key !== 'today' && V.groups[key].items.some(item => item[2] === currentRoute)) || 'today';
  }

  function openBookDatabase() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) { reject(new Error('IndexedDB is unavailable')); return; }
      const request = indexedDB.open('home-manager-books-v1', 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('files')) request.result.createObjectStore('files', { keyPath: 'bookId' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open the private book library'));
    });
  }

  async function getBookFile(bookId) {
    const db = await openBookDatabase();
    return new Promise((resolve, reject) => {
      const request = db.transaction('files', 'readonly').objectStore('files').get(bookId);
      request.onsuccess = () => { db.close(); resolve(request.result || null); };
      request.onerror = () => { db.close(); reject(request.error); };
    });
  }

  async function putBookFile(bookId, file) {
    const db = await openBookDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readwrite');
      transaction.objectStore('files').put({ bookId, name: file.name, type: file.type || 'application/pdf', size: file.size, updatedAt: new Date().toISOString(), blob: file });
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
  }

  async function deleteBookFile(bookId) {
    const db = await openBookDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('files', 'readwrite');
      transaction.objectStore('files').delete(bookId);
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
  }

  function readingProgress(bookId, studentId, create = true) {
    D.state.readingProgress ||= [];
    let record = D.state.readingProgress.find(item => item.bookId === bookId && item.studentId === studentId);
    if (!record && create) {
      record = { id: D.uid('rp'), bookId, studentId, currentPage: 1, totalPages: 0, status: 'not-started', bookmarks: [], notes: [], lastOpened: '' };
      D.state.readingProgress.push(record);
    }
    return record;
  }

  async function hydrateBookshelf() {
    const cards = [...document.querySelectorAll('[data-book-card]')];
    await Promise.all(cards.map(async card => {
      const state = card.querySelector('[data-book-state]');
      const open = card.querySelector('[data-book-open]');
      const importLabel = card.querySelector('[data-book-import-label]');
      try {
        const file = await getBookFile(card.dataset.bookCard);
        card.classList.toggle('book-ready', Boolean(file));
        open.disabled = !file;
        state.textContent = file ? `Ready offline - ${file.name}` : 'PDF not added on this device';
        importLabel.textContent = file ? 'Replace PDF' : 'Add PDF';
      } catch (error) {
        open.disabled = true;
        state.textContent = 'Private storage is unavailable in this browser';
        console.error(error);
      }
    }));
  }

  function renderReaderNotes() {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    const notes = [...progress.notes].sort((a, b) => +b.page - +a.page);
    $('#bookNotes').innerHTML = notes.length ? notes.map(note => `<article><span><b>Page ${note.page}</b><small>${D.esc(note.createdAt ? D.date(note.createdAt) : '')}</small></span><p>${D.esc(note.text)}</p><button type="button" data-book-note-delete="${D.esc(note.id)}" aria-label="Delete note on page ${note.page}"><i data-lucide="trash-2"></i></button></article>`).join('') : '<p class="empty">No review notes yet.</p>';
    refreshIcons();
  }

  function refreshBookReader(reloadDocument = false) {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    const page = Math.max(1, Math.min(progress.totalPages || Infinity, +progress.currentPage || 1));
    progress.currentPage = page;
    $('#bookCurrentPage').value = page;
    $('#bookTotalPages').value = progress.totalPages || 0;
    const percent = progress.totalPages ? Math.min(100, Math.round(page / progress.totalPages * 100)) : 0;
    $('#bookReadProgress').innerHTML = `<span>${progress.totalPages ? `${percent}%` : 'In progress'}</span><b>Page ${page}${progress.totalPages ? ` of ${progress.totalPages}` : ''}</b>`;
    const bookmarked = progress.bookmarks.includes(page);
    $('#bookBookmark').classList.toggle('active', bookmarked);
    $('#bookBookmark').querySelector('span').textContent = bookmarked ? 'Remove bookmark' : 'Bookmark page';
    $('#bookReviewed').classList.toggle('active', progress.status === 'reviewed');
    $('#bookReviewed').querySelector('span').textContent = progress.status === 'reviewed' ? 'Reviewed' : 'Mark reviewed';
    if (reloadDocument && activeBookUrl) $('#bookFrame').src = `${activeBookUrl}#page=${page}&view=FitH`;
  }

  async function openBookReader(bookId, studentId) {
    const book = V.textbookCatalog.find(item => item.id === bookId);
    if (!book) return;
    try {
      const stored = await getBookFile(bookId);
      if (!stored?.blob) { chooseBookFile(bookId, studentId); return; }
      if (activeBookUrl) URL.revokeObjectURL(activeBookUrl);
      activeBookUrl = URL.createObjectURL(stored.blob);
      activeBookReader = { book, studentId };
      const profile = D.state.academicProfiles.find(item => item.personId === studentId);
      const progress = readingProgress(bookId, studentId);
      if (progress.status === 'not-started') progress.status = 'reading';
      progress.lastOpened = new Date().toISOString();
      D.save();
      $('#bookReaderContext').textContent = `${profile?.name || 'Student'} - CLASS ${book.grade} - ${book.subject}`;
      $('#bookReaderTitle').textContent = book.title;
      $('#bookReaderMeta').textContent = `${book.publisher} - ${stored.name} - stored only in this browser`;
      $('#bookNote').value = '';
      refreshBookReader(true);
      renderReaderNotes();
      $('#bookReaderDialog').showModal();
      refreshIcons();
    } catch (error) {
      console.error(error);
      toast('Could not open this book from private browser storage.');
    }
  }

  function chooseBookFile(bookId, studentId) {
    const input = $('#bookFileInput');
    input.dataset.bookId = bookId;
    input.dataset.studentId = studentId;
    input.value = '';
    input.click();
  }

  async function importBookFile(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    if (!(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) { toast('Choose a PDF textbook file.'); return; }
    if (file.size > 150 * 1024 * 1024) { toast('This PDF is over the 150 MB device limit.'); return; }
    try {
      await putBookFile(input.dataset.bookId, file);
      readingProgress(input.dataset.bookId, input.dataset.studentId);
      D.save();
      toast('Textbook saved privately on this device');
      await hydrateBookshelf();
      await openBookReader(input.dataset.bookId, input.dataset.studentId);
    } catch (error) {
      console.error(error);
      toast('Could not store the PDF. Check available browser storage.');
    }
  }

  function settingsSection() {
    if (route === 'global/settings') return 'app';
    if (/^settings\/(household|people|home|money|health|records|app)$/.test(route)) return route.split('/')[1];
    const domain = route.match(/^settings\/life\/([^/]+)$/)?.[1];
    return ({ property: 'home', vehicles: 'home', help: 'home', bills: 'money', insurance: 'money', tax: 'money', subscriptions: 'money', health: 'health', emergency: 'health', pets: 'health', documents: 'records', digital: 'records', legacy: 'records' })[domain] || '';
  }

  function renderNav() {
    const activeSettings = settingsSection();
    if (!activeSettings) {
      const routeGroup = groupForRoute(route);
      if (routeGroup !== activeGroup) {
        activeGroup = routeGroup;
        expandedGroup = activeGroup === 'today' ? '' : activeGroup;
      }
      D.state.settings.activeGroup = activeGroup;
    }
    const group = V.groups[activeGroup];
    document.body.classList.remove('workspace-home', 'workspace-community', 'workspace-study', ...Object.keys(V.groups).map(key => `group-${key}`));
    document.body.classList.add('workspace-' + workspace);
    document.body.classList.add(`group-${activeGroup}`);
    document.body.classList.toggle('settings-mode', Boolean(activeSettings));
    const topRoute = ({
      'home/assets': 'home/property', 'home/life/property': 'home/property', 'home/life/bills': 'home/property', 'home/life/subscriptions': 'home/property', 'home/life/digital': 'home/property',
      'home/life/insurance': 'home/family', 'home/life/tax': 'home/family', 'home/life/documents': 'home/family', 'home/life/legacy': 'home/family',
      'home/life/education': 'study/overview', 'community/events': 'community/participate', 'community/polls': 'community/participate'
    })[route] || route;
    $('#workspaceMenuLabel').innerHTML = `<span><small>Daily & weekly</small><b>${D.esc(group.label)}</b></span><i data-lucide="${group.icon}"></i>`;
    $('#nav').innerHTML = Object.entries(V.groups).map(([key, item]) => {
      const active = key === activeGroup;
      const expanded = expandedGroup === key && key !== 'today';
      const children = expanded ? `<div id="sectionNav" class="section-nav" role="group" aria-label="${D.esc(item.label)} pages">${item.items.map((child, index) => { const childActive = !activeSettings && topRoute === child[2]; return `<button type="button" data-route="${child[2]}" aria-label="Open ${D.esc(child[0])}" title="${D.esc(child[0])}" class="tab-tone-${index + 1} ${childActive ? 'active' : ''}" ${childActive ? 'aria-current="page"' : ''}><i data-lucide="${child[1]}"></i><span>${D.esc(child[0])}</span></button>`; }).join('')}</div>` : '';
      const chevron = key === 'today' ? '' : `<i class="nav-chevron" data-lucide="${expanded ? 'chevron-down' : 'chevron-right'}"></i>`;
      const expansionState = key === 'today' ? '' : ` aria-expanded="${expanded}"`;
      const parentLabel = key === 'today' ? 'Open Today' : `${expanded ? 'Collapse' : 'Expand'} ${item.label} menu`;
      return `<div class="nav-tree-item"><button class="nav-parent ${active ? 'active' : ''} ${expanded ? 'expanded' : ''}" data-group="${key}" aria-label="${D.esc(parentLabel)}" title="${D.esc(parentLabel)}"${expansionState}><span class="nav-icon"><i data-lucide="${item.icon}"></i></span><span>${D.esc(item.label)}</span>${chevron}</button>${children}</div>`;
    }).join('');
    const mobileItems = [['Today', 'sparkles', 'global/overview'], ['Calendar', 'calendar-days', 'home/calendar'], ['Tasks', 'list-checks', 'home/tasks'], ['Food', 'shopping-basket', 'home/inventory']];
    $('#bottomNav').innerHTML = mobileItems.map(item => { const active = route === item[2]; return `<button data-route="${item[2]}" aria-label="Open ${D.esc(item[0])}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><i data-lucide="${item[1]}"></i><span>${D.esc(item[0])}</span></button>`; }).join('') + '<button id="bottomMore" aria-label="Open more navigation"><i data-lucide="layout-grid"></i><span>More</span></button>';
    $('#settingsNav').classList.toggle('active', Boolean(activeSettings));
    $('#helpNav').classList.toggle('active', route === 'global/questions');
  }

  function notificationItems() {
    const today = new Date().toISOString().slice(0, 10);
    const overdue = D.state.tasks.filter(x => D.status(x.status) !== 'done' && x.dueAt && String(x.dueAt).slice(0, 10) < today);
    const low = D.state.inventoryItems.filter(x => (+x.quantity || 0) <= 2);
    const issues = D.state.issues.filter(x => D.status(x.status) !== 'done' && x.priority === 'high');
    const inThirtyDays = new Date();
    inThirtyDays.setDate(inThirtyDays.getDate() + 30);
    const horizon = inThirtyDays.toISOString().slice(0, 10);
    const lifeRecords = (D.state.lifeRecords || []).filter(x => x.dueDate && x.dueDate <= horizon && !['done', 'paid'].includes(x.status));
    return [
      ...overdue.map(x => ({ title: x.title, detail: `Overdue since ${D.date(x.dueAt)}`, route: x.context === 'study' ? 'study/tasks' : 'home/tasks' })),
      ...low.map(x => ({ title: `${x.name} is running low`, detail: `${x.quantity} ${x.unit} remaining`, route: 'home/inventory' })),
      ...issues.map(x => ({ title: x.title, detail: `${x.location} - high priority`, route: x.scope === 'civic' ? 'community/tickets' : 'home/assets' })),
      ...lifeRecords.map(x => ({ title: x.title, detail: `${HM.life.domains[x.domain]?.title || 'Family record'} - due ${D.date(x.dueDate)}`, route: `home/life/${x.domain}` }))
    ];
  }

  function renderNotifications() {
    const items = notificationItems();
    $('#notifications').classList.toggle('has-indicator', items.length > 0);
    $('#notificationList').innerHTML = items.length ? items.slice(0, 7).map(item => `<button class="row notification-item" data-route="${item.route}"><span class="grow"><b>${D.esc(item.title)}</b><small>${D.esc(item.detail)}</small></span><i data-lucide="chevron-right"></i></button>`).join('') : '<div class="empty">Nothing needs attention.</div>';
  }

  function renderHeaderKpis() {
    const day = new Date().toISOString().slice(0, 10);
    const month = day.slice(0, 7);
    const nextWeek = new Date(); nextWeek.setDate(nextWeek.getDate() + 7);
    const weekEnd = nextWeek.toISOString().slice(0, 10);
    const openTasks = D.state.tasks.filter(item => D.status(item.status) !== 'done');
    const upcoming = D.state.events.filter(item => item.startAt && item.startAt.slice(0, 10) >= day && item.startAt.slice(0, 10) <= weekEnd);
    const lowStock = D.state.inventoryItems.filter(item => (+item.quantity || 0) <= 2);
    const routeDomain = route.match(/(?:home|settings)\/life\/([^/]+)/)?.[1];
    const records = routeDomain ? (D.state.lifeRecords || []).filter(item => item.domain === routeDomain) : [];
    let items;
    if (routeDomain) {
      items = [['Records', records.length, route, 'database'], ['Need attention', records.filter(item => item.dueDate && item.dueDate <= weekEnd && !['done', 'paid'].includes(item.status)).length, route, 'bell-ring'], ['Tracked', D.money(records.reduce((sum, item) => sum + (+item.amount || 0), 0)), route, 'indian-rupee']];
    } else if (route === 'home/finance' || route.startsWith('home/money/')) {
      const expenses = D.state.expenses.filter(item => String(item.date).startsWith(month));
      const planned = (D.state.budgets || []).reduce((sum, item) => sum + (+item.amount || 0), 0);
      items = [['Budget', D.money(planned), 'home/money/budget', 'chart-pie'], ['Spent', D.money(expenses.reduce((sum, item) => sum + (+item.amount || 0), 0)), 'home/money/spending', 'wallet-cards'], ['Net worth', D.money((D.state.assets || []).reduce((sum, item) => sum + (+item.value || 0), 0) - (D.state.liabilities || []).reduce((sum, item) => sum + (+item.balance || 0), 0)), 'home/money/networth', 'scale']];
    } else if (route.startsWith('study/')) {
      const learnerId = D.state.settings.activeLearnerId;
      const profile = D.state.academicProfiles.find(item => item.personId === learnerId) || D.state.academicProfiles[0];
      const syllabus = D.state.syllabusItems.filter(item => item.studentId === learnerId);
      const mastery = syllabus.length ? Math.round(syllabus.reduce((sum, item) => sum + (+item.mastery || 0), 0) / syllabus.length) : 0;
      const due = D.state.academicDeliverables.filter(item => item.studentId === learnerId && !['done', 'submitted'].includes(item.status)).length;
      items = [[`Class ${profile?.grade || ''}`, profile?.name || 'Learner', 'study/overview', 'graduation-cap'], ['Mastery', `${mastery}%`, 'study/curriculum', 'gauge'], ['Due work', due, 'study/assignments', 'clipboard-check']];
    } else if (route === 'home/inventory') {
      items = [['Low stock', lowStock.length, route, 'shopping-basket'], ['Items', D.state.inventoryItems.length, route, 'package-open'], ['Meals', D.state.meals.filter(item => item.date >= day).length, route, 'cooking-pot']];
    } else if (route.startsWith('settings/')) {
      const sync = D.state.settings.googleSync || {};
      items = [['Members', D.state.people.length, 'settings/people', 'users-round'], ['Google', (sync.accounts || []).filter(item => item.status === 'connected').length, 'settings/app', 'cloud'], ['Background', V.natureBackgrounds.find(item => item[0] === D.state.settings.appBackground)?.[1] || 'Mountain falls', 'settings/app', 'palette']];
    } else {
      items = [['Open tasks', openTasks.length, 'home/tasks', 'list-checks'], ['Next 7 days', upcoming.length, 'home/calendar', 'calendar-days'], ['Low stock', lowStock.length, 'home/inventory', 'shopping-basket']];
    }
    $('#headerKpis').innerHTML = items.map(item => `<button data-route="${item[2]}" title="Open ${D.esc(item[0])}"><i data-lucide="${item[3]}"></i><span><small>${D.esc(item[0])}</small><b>${D.esc(item[1])}</b></span></button>`).join('');
  }

  function render() {
    HM.life.ensure();
    route = location.hash.slice(2) || route;
    const movedLifeRoute = route.match(/^settings\/life\/([^/]+)$/);
    if (movedLifeRoute) {
      go(`home/life/${movedLifeRoute[1]}`);
      return;
    }
    const movedSettingsRoute = {
      'settings/home': 'home/property',
      'settings/money': 'home/finance',
      'settings/health': 'home/life/health',
      'settings/records': 'home/life/documents'
    }[route];
    if (movedSettingsRoute) {
      go(movedSettingsRoute);
      return;
    }
    const movedStudyRoute = { 'study/board': 'study/curriculum', 'study/schedule': 'study/planner', 'study/tasks': 'study/assignments', 'study/goals': 'study/reports', 'study/focus': 'study/practice', 'study/analytics': 'study/reports' }[route];
    if (movedStudyRoute) { go(movedStudyRoute); return; }
    const first = route.split('/')[0];
    if (['home', 'community', 'study'].includes(first)) {
      workspace = first;
      D.state.settings.activeWorkspace = workspace;
      D.save();
    }
    renderNav();
    const title = V.titles[route] || ['Today', 'Home Manager'];
    $('#breadcrumb').textContent = settingsSection() ? 'Settings' : V.groups[activeGroup].label;
    $('#pageTitle').textContent = title[0];
    document.title = title[0] + ' - Home Manager';
    $('#content').innerHTML = V.render(route);
    bindView();
    renderNotifications();
    renderHeaderKpis();
    document.body.classList.remove('menu-open');
    $('#menu').setAttribute('aria-expanded', 'false');
    refreshIcons();
    requestAnimationFrame(() => $('#sectionNav .active')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  function inputAttributes(name, type) {
    if (type !== 'number') return '';
    if (['wellbeing', 'proficiency'].includes(name)) return ' min="0" max="100" step="1"';
    if (name === 'target') return ' min="1" step="1"';
    if (['quantity', 'points', 'plannedHours', 'progress', 'needed', 'minutes', 'score', 'maxScore', 'practicalScore', 'practicalMax', 'targetPercent', 'mastery', 'weight', 'attempted', 'correct', 'period'].includes(name)) return ' min="0" step="1"';
    if (['confidence', 'effort', 'clarity'].includes(name)) return ' min="1" max="5" step="1"';
    if (['amount', 'value', 'balance', 'payment', 'interestRate', 'saved', 'contribution', 'target'].includes(name)) return ' min="0" step="0.01"';
    return '';
  }

  function field(label, name, type = 'text', options, required = true) {
    return `<label>${label}${options ? `<select name="${name}" ${required ? 'required' : ''}>${options.map(option => `<option value="${option}">${option}</option>`).join('')}</select>` : `<input name="${name}" type="${type}"${inputAttributes(name, type)} ${required ? 'required' : ''}>`}</label>`;
  }
  function area(label, name, required = true) { return `<label>${label}<textarea name="${name}" ${required ? 'required' : ''}></textarea></label>`; }
  const activeAcademicProfile = source => D.state.academicProfiles.find(item => item.personId === (source.student || D.state.settings.activeLearnerId)) || D.state.academicProfiles[0];
  const academicSubjects = source => activeAcademicProfile(source)?.subjects || ['English', 'Mathematics', 'Science'];

  const schemas = {
    task: () => [field('Task', 'title'), field('Context', 'context', 'text', ['home', 'community', 'study']), field('Type', 'type', 'text', ['task', 'duty', 'reminder', 'practice', 'volunteer']), field('Category', 'category'), field('Assigned to', 'assignee', 'text', null, false), field('Due', 'dueAt', 'date'), field('Repeats', 'frequency', 'text', ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly']), field('Priority', 'priority', 'text', ['low', 'medium', 'high'])],
    event: () => [field('Event', 'title'), field('Context', 'context', 'text', ['home', 'community', 'study']), field('Category', 'category'), field('Starts', 'startAt', 'datetime-local'), field('Venue', 'venue', 'text', null, false)],
    person: () => [field('Name', 'name'), field('Household role', 'householdRole'), field('Wellbeing score', 'wellbeing', 'number')],
    points: () => [field('Reason', 'reason'), field('Points', 'points', 'number')],
    expense: () => [field('Expense', 'title'), field('Category', 'category'), field('Amount', 'amount', 'number'), field('Date', 'date', 'date')],
    budget: () => [field('Budget category', 'category'), field('Monthly budget', 'amount', 'number'), field('Budget type', 'bucket', 'text', ['Fixed', 'Flexible', 'Non-monthly'])],
    income: () => [field('Income source', 'source'), field('Family member / owner', 'owner'), field('Amount', 'amount', 'number'), field('Frequency', 'frequency', 'text', ['One time', 'Monthly', 'Quarterly', 'Yearly']), field('Received / expected', 'date', 'date')],
    liability: () => [field('Loan or liability', 'title'), field('Type', 'type'), field('Outstanding balance', 'balance', 'number'), field('Monthly payment', 'payment', 'number'), field('Interest rate %', 'interestRate', 'number')],
    moneyGoal: () => [field('Savings goal', 'title'), field('Target amount', 'target', 'number'), field('Already saved', 'saved', 'number'), field('Monthly contribution', 'contribution', 'number'), field('Target date', 'dueDate', 'date')],
    inventory: () => [field('Item', 'name'), field('Category', 'category'), field('Quantity', 'quantity', 'number'), field('Unit', 'unit')],
    meal: () => [field('Meal', 'name'), field('Meal type', 'mealType', 'text', ['Breakfast', 'Lunch', 'Dinner', 'Snack']), field('Cook', 'cook'), field('Date', 'date', 'date')],
    issue: () => [field('Issue', 'title'), field('Category', 'category'), field('Location', 'location'), field('Priority', 'priority', 'text', ['low', 'medium', 'high'])],
    asset: () => [field('Asset', 'name'), field('Category', 'category'), field('Value', 'value', 'number'), field('Status', 'status', 'text', ['active', 'secured', 'maintenance'])],
    wisdom: () => [field('Title', 'title'), field('Category', 'category'), field('Author', 'author'), area('Entry', 'body')],
    contact: () => [field('Name', 'name'), field('Category', 'category'), field('Phone', 'phone', 'tel'), field('Hours / availability', 'hours')],
    discussion: () => [field('Topic', 'title'), field('Author', 'author'), area('Message', 'body')],
    news: () => [field('Headline', 'title'), field('Category', 'category', 'text', ['Civic', 'Transport', 'Education', 'Business']), area('Summary', 'body'), field('Date', 'date', 'date')],
    volunteer: () => [field('Opportunity', 'title'), field('Category', 'category'), field('Date', 'date', 'date'), field('People needed', 'needed', 'number')],
    topic: () => [field('Topic', 'title'), field('Subject', 'subject', 'text', ['Physics', 'Chemistry', 'Mathematics']), field('Chapter', 'chapter'), field('Planned hours', 'plannedHours', 'number'), field('Proficiency %', 'proficiency', 'number')],
    goal: () => [field('Goal', 'title'), field('Due', 'dueAt', 'date'), field('Target', 'target', 'number'), field('Current progress', 'progress', 'number')],
    academicProfile: () => [field('Student name', 'name'), field('CBSE grade', 'grade', 'text', ['6', '7', '8', '9', '10', '11', '12']), field('Stream / stage', 'stream'), field('School', 'school'), field('School section', 'schoolStage'), field('Peepal subject group', 'subjectGroup'), field('Target percentage', 'targetPercent', 'number'), area('Subjects (comma separated)', 'subjects')],
    syllabus: source => [field('Subject', 'subject', 'text', academicSubjects(source)), field('Chapter / learning outcome', 'title'), field('Term', 'term', 'text', ['Term 1', 'Term 2', 'Full year']), field('Competency', 'competency', 'text', ['Concept', 'Application', 'Analysis', 'Communication', 'Practical']), field('Status', 'status', 'text', ['not-started', 'learning', 'revision', 'mastered']), field('Mastery %', 'mastery', 'number'), field('Planned hours', 'plannedHours', 'number')],
    studyPlan: source => [field('Date', 'date', 'date'), field('Start time', 'startTime', 'time'), field('Minutes', 'minutes', 'number'), field('Subject', 'subject', 'text', academicSubjects(source)), field('Activity', 'activity'), field('Study method', 'method', 'text', ['Active recall', 'Written practice', 'Timed practice', 'Teach-back', 'Read-recall', 'Practical', 'Revision']), field('Status', 'status', 'text', ['planned', 'done', 'missed'])],
    deliverable: source => [field('Assignment / project', 'title'), field('Subject', 'subject', 'text', academicSubjects(source)), field('Type', 'type', 'text', ['Homework', 'Worksheet', 'Project', 'Practical', 'Portfolio', 'Internal assessment']), field('Due date', 'dueDate', 'date'), field('Teacher', 'teacher', 'text', null, false), field('Status', 'status', 'text', ['todo', 'progress', 'submitted', 'done']), field('Marks / weight', 'weight', 'number', null, false), area('Instructions / notes', 'notes', false)],
    assessment: source => [field('Assessment', 'title'), field('Subject', 'subject', 'text', academicSubjects(source)), field('Type', 'type', 'text', ['Class quiz', 'School test', 'Periodic test', 'Pre-board', 'Board pattern', 'Practical']), field('Date', 'date', 'date'), field('Status', 'status', 'text', ['scheduled', 'completed']), field('Theory score', 'score', 'number'), field('Theory maximum', 'maxScore', 'number'), field('Target score', 'target', 'number'), field('Practical / internal score', 'practicalScore', 'number', null, false), field('Practical / internal maximum', 'practicalMax', 'number', null, false)],
    practiceLog: source => [field('Date', 'date', 'date'), field('Subject', 'subject', 'text', academicSubjects(source)), field('Source', 'source', 'text', ['NCERT exercise', 'NCERT exemplar', 'CBSE competency questions', 'CBSE question bank', 'Board sample paper', 'Previous-year paper', 'School worksheet', 'Reading / writing practice']), field('Questions attempted', 'attempted', 'number'), field('Correct', 'correct', 'number'), field('Minutes', 'minutes', 'number'), field('Main error type', 'errorType', 'text', ['Concept', 'Application', 'Calculation', 'Recall', 'Inference', 'Format', 'Time management', 'Careless error'])],
    schoolTimetable: source => [field('Day', 'day', 'text', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']), field('Period', 'period', 'number'), field('Starts', 'startTime', 'time'), field('Ends', 'endTime', 'time'), field('Subject', 'subject', 'text', academicSubjects(source)), field('Session type', 'type', 'text', ['Academic', 'Laboratory', 'Physical education', 'Club', 'Library', 'Tutor time']), field('Tutor', 'tutor', 'text', null, false), field('Learning space', 'space', 'text', null, false)],
    schoolEvent: () => [field('School item', 'title'), field('Type', 'type', 'text', ['Exam', 'Student-Parent-Tutor meeting', 'Holiday', 'School activity', 'Submission', 'Trip', 'Notice']), field('Date', 'date', 'date'), field('Time', 'time', 'time', null, false), field('Location', 'location', 'text', null, false), field('Status', 'status', 'text', ['planned', 'done', 'cancelled']), area('Notes', 'notes', false)],
    attendance: () => [field('Date', 'date', 'date'), field('Attendance', 'status', 'text', ['present', 'absent', 'leave', 'late', 'holiday']), area('Note', 'note', false)],
    reflection: source => [field('Date', 'date', 'date'), field('Subject', 'subject', 'text', academicSubjects(source)), field('Confidence (1-5)', 'confidence', 'number'), field('Effort (1-5)', 'effort', 'number'), field('Clarity (1-5)', 'clarity', 'number'), area('What went well', 'strength'), area('Question or challenge', 'question', false), area('Next step', 'nextStep')],
    tutorFeedback: source => [field('Review date', 'date', 'date'), field('Subject / area', 'subject', 'text', [...academicSubjects(source), 'Study habits', 'Wellbeing', 'Co-curricular']), field('Review type', 'type', 'text', ['Tutor feedback', 'Student-Parent-Tutor meeting', 'Learning objective', 'Recognition']), field('Tutor', 'tutor', 'text', null, false), area('Strength', 'strength'), area('Challenge', 'challenge', false), area('Agreed action', 'action'), field('Follow-up date', 'dueDate', 'date', null, false), field('Status', 'status', 'text', ['open', 'done'])],
    coCurricular: () => [field('Activity', 'activity'), field('Category', 'category', 'text', ['Think Tank', 'Club', 'Sport', 'Art & craft', 'Traditional games', 'Silambam', 'Community', 'Other']), field('Tutor / coach', 'tutor', 'text', null, false), field('Schedule', 'schedule', 'text', null, false), area('Growth goal', 'goal'), field('Status', 'status', 'text', ['active', 'paused', 'completed']), area('Achievement / evidence', 'achievement', false)],
    life: source => {
      const domain = source.domain || 'documents';
      const variants = {
        medicines: { title: 'Medicine or refill plan', categories: ['Regular medicine', 'Short course', 'Prescription', 'Refill', 'Stock and expiry'], provider: 'Prescriber / pharmacy', date: 'Next refill / review' },
        appointments: { title: 'Appointment or follow-up', categories: ['Consultation', 'Test', 'Procedure', 'Follow-up', 'Therapy', 'Dental'], provider: 'Doctor / clinic / hospital', date: 'Appointment / follow-up date' },
        elders: { title: 'Elder care action', categories: ['Check-in', 'Mobility', 'Meals', 'Medicine handoff', 'Appointment', 'Support service'], provider: 'Caregiver / provider', date: 'Next handoff / review' }
      };
      const variant = variants[domain] || { title: 'Title', categories: null, provider: 'Provider / contact', date: 'Due / renewal date' };
      return [field(variant.title, 'title'), field('Category', 'category', 'text', variant.categories), field('Family member / owner', 'owner'), field(variant.provider, 'provider', 'text', null, false), field('Masked reference / location', 'reference', 'text', null, false), field('Amount', 'amount', 'number', null, false), field(variant.date, 'dueDate', 'date', null, false), field('Frequency', 'frequency', 'text', ['One time', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-yearly', 'Yearly', 'As needed']), field('Status', 'status', 'text', ['planning', 'pending', 'active', 'due', 'paid', 'done']), field('Phone', 'phone', 'tel', null, false), area('Instructions / notes', 'notes', false)];
    }
  };

  const editCollections = { task: 'tasks', expense: 'expenses', budget: 'budgets', income: 'incomes', liability: 'liabilities', moneyGoal: 'moneyGoals', person: 'people', asset: 'assets', academicProfile: 'academicProfiles', syllabus: 'syllabusItems', studyPlan: 'studyPlans', deliverable: 'academicDeliverables', assessment: 'academicAssessments', practiceLog: 'practiceLogs', schoolTimetable: 'schoolTimetable', schoolEvent: 'schoolEvents', attendance: 'attendanceRecords', reflection: 'learningReflections', tutorFeedback: 'tutorFeedback', coCurricular: 'coCurricularRecords', life: 'lifeRecords' };

  function openForm(kind, source = {}) {
    const schema = schemas[kind];
    if (!schema) return;
    const collection = editCollections[kind];
    const record = source.editId && collection ? D.state[collection].find(x => x.id === source.editId) : null;
    const routeDomain = route.match(/^(?:home|settings)\/life\/([^/]+)$/)?.[1] || '';
    const labels = { moneyGoal: 'savings goal', liability: 'loan or liability', income: 'income source', budget: 'section budget', expense: 'section expense', academicProfile: 'student profile', syllabus: 'syllabus item', studyPlan: 'study block', deliverable: 'assignment', assessment: 'assessment', practiceLog: 'practice session', schoolTimetable: 'school timetable period', schoolEvent: 'school calendar item', attendance: 'attendance day', reflection: 'self-assessment', tutorFeedback: 'tutor review', coCurricular: 'co-curricular activity' };
    const lifeLabel = kind === 'life' ? HM.life.domains[source.domain || record?.domain || routeDomain]?.noun : '';
    $('#formTitle').textContent = (record ? 'Edit ' : 'Add ') + (lifeLabel || labels[kind] || kind);
    $('#formContext').textContent = String(source.context || record?.context || workspace).toUpperCase();
    $('#formFields').innerHTML = schema(source).join('');
    const form = $('#entityForm');
    form.dataset.kind = kind;
    form.dataset.context = source.context || record?.context || workspace;
    form.dataset.scope = source.scope || record?.scope || '';
    form.dataset.person = source.person || '';
    form.dataset.domain = source.domain || record?.domain || routeDomain || 'documents';
    form.dataset.editId = source.editId || '';
    if (record) Object.entries(record).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value ?? ''; });
    else if (form.elements.context) form.elements.context.value = source.context || workspace;
    $('#formDialog').showModal();
    refreshIcons();
    setTimeout(() => $('#formFields input, #formFields select, #formFields textarea')?.focus(), 50);
  }

  function addEntity(kind, values, meta) {
    const state = D.state;
    const id = D.uid;
    if (meta.editId && editCollections[kind]) {
      const record = state[editCollections[kind]].find(x => x.id === meta.editId);
      if (record) Object.assign(record, values,
        kind === 'expense' || kind === 'budget' || kind === 'income' || kind === 'life' ? { amount: +values.amount || 0 } :
        kind === 'liability' ? { balance: +values.balance || 0, payment: +values.payment || 0, interestRate: +values.interestRate || 0 } :
        kind === 'moneyGoal' ? { target: Math.max(1, +values.target || 1), saved: +values.saved || 0, contribution: +values.contribution || 0 } :
        kind === 'academicProfile' ? { grade: Math.min(12, Math.max(6, +values.grade || 6)), targetPercent: Math.min(100, Math.max(33, +values.targetPercent || 75)), subjects: String(values.subjects || '').split(',').map(item => item.trim()).filter(Boolean) } :
        kind === 'syllabus' ? { mastery: Math.min(100, Math.max(0, +values.mastery || 0)), plannedHours: Math.max(0, +values.plannedHours || 0) } :
        kind === 'studyPlan' ? { minutes: Math.max(5, +values.minutes || 30) } :
        kind === 'deliverable' ? { weight: Math.max(0, +values.weight || 0) } :
        kind === 'assessment' ? { score: +values.score || 0, maxScore: +values.maxScore || 0, target: +values.target || 0, practicalScore: +values.practicalScore || 0, practicalMax: +values.practicalMax || 0 } :
        kind === 'practiceLog' ? { attempted: +values.attempted || 0, correct: Math.min(+values.attempted || 0, +values.correct || 0), minutes: +values.minutes || 0 } :
        kind === 'schoolTimetable' ? { period: Math.max(1, +values.period || 1) } :
        kind === 'reflection' ? { confidence: Math.min(5, Math.max(1, +values.confidence || 3)), effort: Math.min(5, Math.max(1, +values.effort || 3)), clarity: Math.min(5, Math.max(1, +values.clarity || 3)) } :
        kind === 'asset' ? { value: +values.value || 0 } :
        kind === 'person' ? { wellbeing: Math.min(100, Math.max(0, +values.wellbeing || 0)) } : {});
      save('Changes saved');
      render();
      return;
    }
    switch (kind) {
      case 'task': state.tasks.push({ id: id('t'), context: values.context, type: values.type, title: values.title, category: values.category, assignee: values.assignee, dueAt: values.dueAt, frequency: values.frequency || 'Once', priority: values.priority, status: 'todo' }); break;
      case 'event': state.events.push({ id: id('e'), context: values.context, title: values.title, category: values.category, startAt: values.startAt, venue: values.venue }); break;
      case 'person': state.people.push({ id: id('p'), name: values.name, householdRole: values.householdRole, wellbeing: Math.min(100, Math.max(0, +values.wellbeing || 0)) }); break;
      case 'points': state.pointTransactions.push({ id: id('pt'), personId: meta.person, context: 'home', reason: values.reason, points: +values.points || 0, createdAt: new Date().toISOString().slice(0, 10) }); break;
      case 'expense': state.expenses.push({ id: id('x'), domain: meta.domain || 'family', title: values.title, category: values.category, amount: +values.amount || 0, date: values.date }); break;
      case 'budget': state.budgets.push({ id: id('b'), domain: meta.domain || 'family', category: values.category, amount: +values.amount || 0, bucket: values.bucket }); break;
      case 'income': state.incomes.push({ id: id('in'), domain: meta.domain || 'family', source: values.source, owner: values.owner, amount: +values.amount || 0, frequency: values.frequency, date: values.date }); break;
      case 'liability': state.liabilities.push({ id: id('db'), domain: meta.domain || 'family', title: values.title, type: values.type, balance: +values.balance || 0, payment: +values.payment || 0, interestRate: +values.interestRate || 0 }); break;
      case 'moneyGoal': state.moneyGoals.push({ id: id('mg'), domain: meta.domain || 'family', title: values.title, target: Math.max(1, +values.target || 1), saved: +values.saved || 0, contribution: +values.contribution || 0, dueDate: values.dueDate }); break;
      case 'inventory': state.inventoryItems.push({ id: id('n'), name: values.name, category: values.category, quantity: +values.quantity || 0, unit: values.unit }); break;
      case 'meal': state.meals.push({ id: id('m'), name: values.name, mealType: values.mealType, cook: values.cook, date: values.date }); break;
      case 'issue': state.issues.push({ id: id('i'), scope: meta.scope || 'household', ticketNo: meta.scope === 'civic' ? 'LOCAL-' + String(Date.now()).slice(-4) : null, title: values.title, category: values.category, location: values.location, priority: values.priority, status: 'todo', reportedAt: new Date().toISOString().slice(0, 10) }); break;
      case 'asset': state.assets.push({ id: id('a'), name: values.name, category: values.category, value: +values.value || 0, status: values.status }); break;
      case 'wisdom': state.wisdomEntries.push({ id: id('w'), title: values.title, category: values.category, author: values.author, body: values.body }); break;
      case 'contact': state.contacts.push({ id: id('c'), scope: meta.scope || workspace, name: values.name, category: values.category, phone: values.phone, hours: values.hours }); break;
      case 'discussion': state.discussions.push({ id: id('d'), title: values.title, author: values.author, body: values.body, likes: 0 }); break;
      case 'news': state.newsItems.push({ id: id('nw'), title: values.title, category: values.category, body: values.body, date: values.date }); break;
      case 'volunteer': state.volunteerOpportunities.push({ id: id('v'), title: values.title, category: values.category, date: values.date, needed: +values.needed || 0, registered: false }); break;
      case 'topic': state.learningTopics.push({ id: id('l'), subject: values.subject, chapter: values.chapter, title: values.title, status: 'backlog', plannedHours: +values.plannedHours || 0, proficiency: Math.min(100, Math.max(0, +values.proficiency || 0)) }); break;
      case 'goal': state.goals.push({ id: id('g'), context: 'study', title: values.title, dueAt: values.dueAt, target: Math.max(1, +values.target || 1), progress: Math.max(0, +values.progress || 0) }); break;
      case 'academicProfile': state.academicProfiles.push({ id: id('ap'), personId: meta.student || '', name: values.name, board: 'CBSE', grade: Math.min(12, Math.max(6, +values.grade || 6)), stream: values.stream, school: values.school, schoolStage: values.schoolStage, subjectGroup: values.subjectGroup, targetPercent: Math.min(100, Math.max(33, +values.targetPercent || 75)), subjects: String(values.subjects || '').split(',').map(item => item.trim()).filter(Boolean) }); break;
      case 'syllabus': state.syllabusItems.push({ id: id('sy'), studentId: meta.student || state.settings.activeLearnerId, subject: values.subject, title: values.title, term: values.term, competency: values.competency, status: values.status, mastery: Math.min(100, Math.max(0, +values.mastery || 0)), plannedHours: Math.max(0, +values.plannedHours || 0) }); break;
      case 'studyPlan': state.studyPlans.push({ id: id('sp'), studentId: meta.student || state.settings.activeLearnerId, date: values.date, startTime: values.startTime, minutes: Math.max(5, +values.minutes || 30), subject: values.subject, activity: values.activity, method: values.method, status: values.status }); break;
      case 'deliverable': state.academicDeliverables.push({ id: id('ad'), studentId: meta.student || state.settings.activeLearnerId, title: values.title, subject: values.subject, type: values.type, dueDate: values.dueDate, teacher: values.teacher, status: values.status, weight: Math.max(0, +values.weight || 0), notes: values.notes }); break;
      case 'assessment': state.academicAssessments.push({ id: id('as'), studentId: meta.student || state.settings.activeLearnerId, title: values.title, subject: values.subject, type: values.type, date: values.date, status: values.status, score: +values.score || 0, maxScore: +values.maxScore || 0, target: +values.target || 0, practicalScore: +values.practicalScore || 0, practicalMax: +values.practicalMax || 0 }); break;
      case 'practiceLog': state.practiceLogs.push({ id: id('pr'), studentId: meta.student || state.settings.activeLearnerId, date: values.date, subject: values.subject, source: values.source, attempted: +values.attempted || 0, correct: Math.min(+values.attempted || 0, +values.correct || 0), minutes: +values.minutes || 0, errorType: values.errorType }); break;
      case 'schoolTimetable': state.schoolTimetable.push({ id: id('tt'), studentId: meta.student || state.settings.activeLearnerId, day: values.day, period: Math.max(1, +values.period || 1), startTime: values.startTime, endTime: values.endTime, subject: values.subject, type: values.type, tutor: values.tutor, space: values.space }); break;
      case 'schoolEvent': state.schoolEvents.push({ id: id('se'), studentId: meta.student || state.settings.activeLearnerId, title: values.title, type: values.type, date: values.date, time: values.time, location: values.location, status: values.status, notes: values.notes }); break;
      case 'attendance': state.attendanceRecords.push({ id: id('at'), studentId: meta.student || state.settings.activeLearnerId, date: values.date, status: values.status, note: values.note }); break;
      case 'reflection': state.learningReflections.push({ id: id('rf'), studentId: meta.student || state.settings.activeLearnerId, date: values.date, subject: values.subject, confidence: Math.min(5, Math.max(1, +values.confidence || 3)), effort: Math.min(5, Math.max(1, +values.effort || 3)), clarity: Math.min(5, Math.max(1, +values.clarity || 3)), strength: values.strength, question: values.question, nextStep: values.nextStep }); break;
      case 'tutorFeedback': state.tutorFeedback.push({ id: id('tf'), studentId: meta.student || state.settings.activeLearnerId, date: values.date, subject: values.subject, type: values.type, tutor: values.tutor, strength: values.strength, challenge: values.challenge, action: values.action, dueDate: values.dueDate, status: values.status }); break;
      case 'coCurricular': state.coCurricularRecords.push({ id: id('cc'), studentId: meta.student || state.settings.activeLearnerId, activity: values.activity, category: values.category, tutor: values.tutor, schedule: values.schedule, goal: values.goal, status: values.status, achievement: values.achievement }); break;
      case 'life': state.lifeRecords.push({ id: id('lr'), domain: meta.domain || 'documents', title: values.title, category: values.category, owner: values.owner, provider: values.provider, reference: values.reference, amount: Math.max(0, +values.amount || 0), dueDate: values.dueDate, frequency: values.frequency, status: values.status, phone: values.phone, notes: values.notes, createdAt: new Date().toISOString() }); break;
    }
    save('Added to Home Manager');
    render();
  }

  function remove(collection, id) {
    const index = D.state[collection].findIndex(x => x.id === id);
    if (index < 0) return;
    const [record] = D.state[collection].splice(index, 1);
    if (collection === 'people') D.state.pointTransactions = D.state.pointTransactions.filter(x => x.personId !== id);
    lastDeleted = { collection, record, index };
    save('Removed. Press Ctrl+Z to undo.');
    render();
  }

  function undoDelete() {
    if (!lastDeleted) return;
    D.state[lastDeleted.collection].splice(lastDeleted.index, 0, lastDeleted.record);
    lastDeleted = null;
    save('Removal undone');
    render();
  }

  function applyFilters() {
    const query = (document.querySelector('[data-filter]')?.value || '').toLowerCase();
    const status = document.querySelector('[data-status-filter]')?.value || '';
    const subject = $('#subjectFilter')?.value || '';
    document.querySelectorAll('[data-filter-row]').forEach(row => {
      const matchesText = !query || row.textContent.toLowerCase().includes(query);
      const matchesStatus = !status || row.dataset.status === status;
      const matchesSubject = !subject || row.dataset.subject === subject;
      row.hidden = !(matchesText && matchesStatus && matchesSubject);
    });
  }

  function bindView() {
    document.querySelectorAll('[data-filter], [data-status-filter], #subjectFilter').forEach(control => {
      control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', applyFilters);
    });
    document.querySelectorAll('[data-topic]').forEach(card => card.ondragstart = event => event.dataTransfer.setData('topic', card.dataset.topic));
    document.querySelectorAll('[data-drop]').forEach(column => {
      column.ondragover = event => event.preventDefault();
      column.ondrop = event => {
        const topic = D.state.learningTopics.find(x => x.id === event.dataTransfer.getData('topic'));
        if (topic) { topic.status = column.dataset.drop; save('Topic moved'); render(); }
      };
    });
    document.querySelectorAll('[data-topic-status]').forEach(select => select.onchange = () => {
      const topic = D.state.learningTopics.find(x => x.id === select.dataset.topicStatus);
      if (topic) { topic.status = select.value; save('Topic moved'); render(); }
    });
    document.querySelectorAll('[name="appBackground"]').forEach(input => input.onchange = () => {
      D.state.settings.appBackground = input.value;
      save('Nature background updated');
      applyTheme();
      renderHeaderKpis();
      refreshIcons();
    });
    document.querySelectorAll('[data-syllabus-status]').forEach(select => select.onchange = () => {
      const item = D.state.syllabusItems.find(record => record.id === select.dataset.syllabusStatus);
      if (item) { item.status = select.value; if (item.status === 'mastered') item.mastery = Math.max(80, +item.mastery || 0); save('Syllabus status updated'); render(); }
    });
    document.querySelectorAll('[data-plan-status]').forEach(select => select.onchange = () => {
      const item = D.state.studyPlans.find(record => record.id === select.dataset.planStatus);
      if (item) { item.status = select.value; save('Study plan updated'); render(); }
    });
    document.querySelectorAll('[data-deliverable-status]').forEach(select => select.onchange = () => {
      const item = D.state.academicDeliverables.find(record => record.id === select.dataset.deliverableStatus);
      if (item) { item.status = select.value; save('Assignment status updated'); render(); }
    });
    if ($('#exportData')) $('#exportData').onclick = exportData;
    if ($('#importData')) $('#importData').onchange = importData;
    if ($('#resetData')) $('#resetData').onclick = () => { if (confirm('Reset all local Home Manager data?')) { D.reset(); applyTheme(); render(); toast('Demonstration data restored'); } };
    if ($('#householdSettings')) $('#householdSettings').onsubmit = event => {
      event.preventDefault();
      Object.assign(D.state.settings, Object.fromEntries(new FormData(event.currentTarget)));
      save('Household settings saved');
      render();
    };
    if ($('#googleSyncSettings')) {
      const form = $('#googleSyncSettings');
      const refreshConnectionButtons = () => {
        const clientReady = /^[0-9]+-[a-z0-9_-]+\.apps\.googleusercontent\.com$/i.test($('#googleClientId').value.trim());
        form.querySelectorAll('[data-google-account]').forEach(row => {
          const ready = clientReady && row.querySelector('[data-google-email]').value.trim() && row.querySelector('[data-google-consent]').checked;
          row.querySelector('[data-google-connect]').disabled = !ready;
        });
      };
      form.querySelectorAll('#googleClientId, [data-google-email], [data-google-consent]').forEach(control => control.addEventListener('input', refreshConnectionButtons));
      form.onchange = event => { if (event.target.matches('#googleClientId, [data-google-email], [data-google-consent]')) refreshConnectionButtons(); };
      form.onsubmit = event => {
        event.preventDefault();
        const values = new FormData(form);
        const previous = D.state.settings.googleSync || {};
        const clientId = String(values.get('clientId') || '').trim();
        const clientChanged = clientId !== (previous.clientId || '');
        D.state.settings.googleSync = {
          ...previous,
          mode: 'direct', clientId,
          autoSync: values.has('autoSync'), calendarSync: values.has('calendarSync'), emailAnalysis: values.has('emailAnalysis'), driveBackup: values.has('driveBackup'),
          reviewPolicy: values.get('reviewPolicy') === 'rules' ? 'rules' : 'review', lookbackDays: +values.get('lookbackDays') || 30,
          categories: values.getAll('syncCategory'),
          accounts: Array.from(form.querySelectorAll('[data-google-account]')).map((row, index) => {
            const slotId = row.dataset.googleAccount || `google-${index + 1}`;
            const personId = row.querySelector('[data-google-owner]').value;
            const existing = (previous.accounts || []).find(account => account.slotId === slotId) || (previous.accounts || [])[index] || {};
            const email = row.querySelector('[data-google-email]').value.trim();
            const consent = row.querySelector('[data-google-consent]').checked;
            const keepStatus = !clientChanged && existing.email === email && consent && googleSessions.has(slotId);
            if (!keepStatus) googleSessions.delete(slotId);
            return { ...existing, slotId, personId, email, consent, status: keepStatus ? existing.status || 'pending' : 'pending' };
          }).filter(account => account.email || account.consent)
        };
        save('Google sync preferences saved');
        render();
      };
      form.querySelectorAll('[data-google-connect]').forEach(button => button.onclick = () => startGoogleConnect(button));
      form.querySelector('[data-google-sync]').onclick = runGoogleSync;
    }
    if ($('#phoneSmsSettings')) {
      const form = $('#phoneSmsSettings');
      form.onsubmit = event => {
        event.preventDefault();
        const values = new FormData(form);
        const current = D.state.settings.phoneSms || {};
        D.state.settings.phoneSms = { ...current, ownerId: String(values.get('smsOwner') || 'p1'), consent: values.has('smsConsent'), categories: values.getAll('smsCategory') };
        save('Phone SMS settings saved');
        render();
      };
      form.querySelector('#smsImport').onchange = importSmsBackup;
      form.querySelector('#smsConsent').onchange = event => {
        const input = form.querySelector('#smsImport');
        input.disabled = !event.target.checked;
        input.closest('label').classList.toggle('disabled', !event.target.checked);
      };
    }
    if ($('#questionQuery')) {
      const updateQuestions = () => {
        const query = $('#questionQuery').value;
        const category = $('#questionCategory').value;
        const role = $('#questionRole').value;
        $('#questionResults').innerHTML = V.renderQuestionResults(query, category, role);
        $('#questionResultTitle').textContent = query ? `Answers for "${query}"` : category !== 'all' || role !== 'all' ? 'Filtered product questions' : 'Common product questions';
        refreshIcons();
      };
      $('#questionQuery').oninput = updateQuestions;
      $('#questionCategory').onchange = updateQuestions;
      $('#questionRole').onchange = updateQuestions;
      document.querySelectorAll('[data-question-category]').forEach(button => button.onclick = () => { $('#questionCategory').value = button.dataset.questionCategory; updateQuestions(); $('#questionQuery').focus(); });
    }
    if ($('#timerToggle')) $('#timerToggle').onclick = toggleTimer;
    document.querySelectorAll('[data-timer]').forEach(button => button.onclick = () => setTimer(button.dataset.timer));
    if (document.querySelector('[data-book-card]')) hydrateBookshelf();
    document.querySelectorAll('[data-sync-apply]').forEach(button => button.onclick = () => applyIntegrationSuggestion(button.dataset.syncApply));
    document.querySelectorAll('[data-sync-dismiss]').forEach(button => button.onclick = () => dismissIntegrationSuggestion(button.dataset.syncDismiss));
  }

  function routeFor(type, record) {
    if (type === 'Task') return record.context === 'study' ? 'study/tasks' : record.context === 'community' ? 'community/overview' : 'home/tasks';
    if (type === 'Event') return record.context === 'study' ? 'study/schedule' : record.context === 'community' ? 'community/events' : 'home/calendar';
    if (type === 'Issue') return record.scope === 'civic' ? 'community/tickets' : 'home/assets';
    if (type === 'Contact') return record.scope === 'community' ? 'community/directory' : 'home/directory';
    if (type === 'Life record') {
      return `home/life/${record.domain}`;
    }
    const moneySources = { food: 'home/inventory', housing: 'home/property', vehicle: 'home/life/vehicles', health: 'home/life/health', family: 'home/family', learning: 'study/overview', community: 'community/overview' };
    if (['Expense', 'Budget', 'Income', 'Liability', 'Savings goal'].includes(type)) return moneySources[record.domain] || 'home/family';
    return { Person: 'home/family', Inventory: 'home/inventory', Meal: 'home/inventory', Asset: 'home/assets', Wisdom: 'home/wisdom', Topic: 'study/curriculum', Syllabus: 'study/curriculum', Assignment: 'study/assignments', Assessment: 'study/assessments', 'Study plan': 'study/planner', 'School period': 'study/planner', 'School calendar': 'study/planner', Attendance: 'study/reports', Reflection: 'study/curriculum', 'Tutor review': 'study/reports', Activity: 'study/reports', Goal: 'study/reports', News: 'community/feed', Discussion: 'community/feed', Volunteer: 'community/volunteer', Guide: 'community/guides' }[type] || 'global/overview';
  }

  function searchItems(query) {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const output = [];
    const add = (items, type, label, context) => items.forEach(record => {
      const text = Object.values(record).filter(value => typeof value === 'string' || typeof value === 'number').join(' ').toLowerCase();
      if (text.includes(q)) output.push({ context: typeof context === 'function' ? context(record) : context, type, label: record[label], route: routeFor(type, record) });
    });
    add(D.state.tasks, 'Task', 'title', x => x.context);
    add(D.state.events, 'Event', 'title', x => x.context);
    add(D.state.people, 'Person', 'name', 'home');
    add(D.state.issues, 'Issue', 'title', x => x.scope === 'civic' ? 'community' : 'home');
    add(D.state.contacts, 'Contact', 'name', x => x.scope === 'community' ? 'community' : 'home');
    const moneyContext = item => item.domain === 'learning' ? 'study' : item.domain === 'community' ? 'community' : 'home';
    add(D.state.expenses, 'Expense', 'title', moneyContext);
    add(D.state.budgets || [], 'Budget', 'category', moneyContext);
    add(D.state.incomes || [], 'Income', 'source', moneyContext);
    add(D.state.liabilities || [], 'Liability', 'title', moneyContext);
    add(D.state.moneyGoals || [], 'Savings goal', 'title', moneyContext);
    add(D.state.inventoryItems, 'Inventory', 'name', 'home');
    add(D.state.meals, 'Meal', 'name', 'home');
    add(D.state.assets, 'Asset', 'name', 'home');
    add(D.state.wisdomEntries, 'Wisdom', 'title', 'home');
    add(D.state.learningTopics, 'Topic', 'title', 'study');
    add(D.state.goals, 'Goal', 'title', x => x.context);
    add(D.state.newsItems, 'News', 'title', 'community');
    add(D.state.discussions, 'Discussion', 'title', 'community');
    add(D.state.volunteerOpportunities, 'Volunteer', 'title', 'community');
    add(D.state.guides, 'Guide', 'title', 'community');
    add(D.state.lifeRecords || [], 'Life record', 'title', 'home');
    add(D.state.syllabusItems || [], 'Syllabus', 'title', 'study');
    add(D.state.academicDeliverables || [], 'Assignment', 'title', 'study');
    add(D.state.academicAssessments || [], 'Assessment', 'title', 'study');
    add(D.state.studyPlans || [], 'Study plan', 'activity', 'study');
    add(D.state.schoolTimetable || [], 'School period', 'subject', 'study');
    add(D.state.schoolEvents || [], 'School calendar', 'title', 'study');
    add(D.state.attendanceRecords || [], 'Attendance', 'date', 'study');
    add(D.state.learningReflections || [], 'Reflection', 'subject', 'study');
    add(D.state.tutorFeedback || [], 'Tutor review', 'subject', 'study');
    add(D.state.coCurricularRecords || [], 'Activity', 'activity', 'study');
    return output.slice(0, 7);
  }

  function showSearch() {
    $('#searchDialog').showModal();
    setTimeout(() => $('#searchInput').focus(), 0);
    renderSearch('');
  }
  function renderSearch(query) {
    const questionMatches = query.trim() ? HM.questions.search(query).slice(0, 3) : [];
    const results = searchItems(query).slice(0, Math.max(0, 7 - questionMatches.length));
    const questionRows = questionMatches.map(question => { const answer = HM.questions.answer(question); return `<button class="search-result question-search-result" data-route="${answer.route}"><span class="context-badge">Answer</span><span class="grow"><b>${D.esc(question.text)}</b><small>${D.esc(answer.headline)}</small></span><i data-lucide="arrow-up-right"></i></button>`; }).join('');
    const recordRows = results.map(item => `<button class="search-result" data-route="${item.route}"><span class="context-badge ${item.context}">${D.esc(item.context)}</span><span class="grow"><b>${D.esc(item.label)}</b><small>${item.type}</small></span><i data-lucide="arrow-up-right"></i></button>`).join('');
    const total = questionMatches.length + results.length;
    $('#searchResults').innerHTML = total ? `<small>${total} best matches</small>${questionRows}${recordRows}` : `<div class="empty">${query ? 'No matches' : 'Search a household record or ask how the app works'}</div>`;
    refreshIcons();
  }

  function quick() {
    const actions = [['task', 'Task', 'home', 'list-plus', ''], ['event', 'Calendar event', 'home', 'calendar-plus', ''], ['contact', 'Family contact', 'home', 'contact-round', ''], ['meal', 'Meal', 'home', 'cooking-pot', ''], ['inventory', 'Shopping item', 'home', 'shopping-basket', ''], ['life', 'Health note', 'home', 'heart-pulse', 'health'], ['issue', 'Home repair', 'home', 'wrench', '']];
    $('#quickActions').innerHTML = actions.map(item => `<button type="button" data-quick="${item[0]}" data-context="${item[2]}" data-domain="${item[4]}" data-scope="${item[0] === 'issue' ? 'household' : ''}"><i data-lucide="${item[3]}"></i><span><b>${item[1]}</b><small>Quick capture</small></span><i data-lucide="chevron-right"></i></button>`).join('');
    $('#quickDialog').showModal();
    refreshIcons();
  }

  function showEmergency() {
    const services = [
      ['112', 'Emergency', 'Police, fire, medical or immediate danger', 'siren'],
      ['181', 'Women helpline', 'Support and referral for women in distress', 'shield-alert'],
      ['1098', 'Child helpline', 'Help for a child in danger or distress', 'baby'],
      ['14567', 'Elderline', 'Support for senior citizens', 'accessibility'],
      ['1930', 'Cyber fraud', 'Report financial cyber fraud quickly', 'badge-alert'],
      ['1906', 'LPG leak', 'All-India LPG emergency helpline', 'flame']
    ];
    const emergencyRecords = (D.state.lifeRecords || []).filter(item => ['emergency', 'health'].includes(item.domain)).slice(0, 4);
    const address = D.state.settings.primaryAddress || 'Add the home address and landmark in Settings.';
    $('#emergencyBody').innerHTML = `<section class="emergency-services">${services.map(item => `<a href="tel:${item[0]}"><span><i data-lucide="${item[3]}"></i></span><span class="grow"><b>${item[1]}</b><small>${item[2]}</small></span><strong>${item[0]}</strong></a>`).join('')}</section><section class="emergency-card"><div class="section-head"><div><small>HOUSEHOLD CARD</small><h3>${D.esc(D.state.settings.householdName || 'Family')}</h3></div><button data-route="home/life/emergency">Edit plan</button></div><p><b>Home address</b><br>${D.esc(address)}</p>${emergencyRecords.map(item => `<div class="row"><div class="grow"><b>${D.esc(item.title)}</b><small>${D.esc(item.owner || 'Family')} · ${D.esc(item.notes || item.reference || 'Open the record for details')}</small></div></div>`).join('') || '<p>No health or emergency notes configured.</p>'}</section>`;
    $('#emergencyDialog').showModal();
    refreshIcons();
  }

  const integrationCategories = ['bills', 'travel', 'school', 'health', 'deliveries', 'home', 'government'];
  const categoryLabels = { bills: 'Bill or payment', travel: 'Travel update', school: 'School update', health: 'Health update', deliveries: 'Delivery update', home: 'Home service', government: 'Government document' };

  function safeMessageSummary(value) {
    return String(value || '')
      .replace(/https?:\/\/\S+/gi, '[link removed]')
      .replace(/\b\d{6,}\b/g, number => `...${number.slice(-4)}`)
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 260);
  }

  function normalizeMessageDate(value) {
    if (!value) return '';
    const numeric = Number(value);
    const date = Number.isFinite(numeric) && numeric > 0 ? new Date(numeric < 1e11 ? numeric * 1000 : numeric) : new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  }

  async function messageFingerprint(message) {
    const input = new TextEncoder().encode(`${message.sender}|${message.receivedAt}|${message.body}`);
    if (crypto.subtle) {
      const hash = await crypto.subtle.digest('SHA-256', input);
      return [...new Uint8Array(hash)].map(value => value.toString(16).padStart(2, '0')).join('');
    }
    return `${message.sender}-${message.receivedAt}-${message.body.length}`;
  }

  async function parseSmsBackup(file) {
    if (file.size > 25 * 1024 * 1024) throw new Error('SMS backup must be 25 MB or smaller.');
    const text = await file.text();
    let records;
    if (file.name.toLowerCase().endsWith('.json') || file.type.includes('json')) {
      const parsed = JSON.parse(text);
      records = Array.isArray(parsed) ? parsed : Array.isArray(parsed.messages) ? parsed.messages : [];
      records = records.map(item => ({ sender: item.address || item.sender || item.from || '', contact: item.contact_name || item.contact || '', receivedAt: normalizeMessageDate(item.date || item.timestamp || item.receivedAt), body: item.body || item.text || item.message || '' }));
    } else {
      const documentXml = new DOMParser().parseFromString(text, 'application/xml');
      if (documentXml.querySelector('parsererror')) throw new Error('The SMS XML file is not valid.');
      records = [...documentXml.querySelectorAll('sms')].map(item => ({ sender: item.getAttribute('address') || '', contact: item.getAttribute('contact_name') || '', receivedAt: normalizeMessageDate(item.getAttribute('date')), body: item.getAttribute('body') || '' }));
    }
    return records.filter(item => item.body && item.sender).slice(0, 10000);
  }

  function classifyIntegrationText(text, allowedCategories = integrationCategories) {
    const rules = [
      ['bills', /\b(bill|invoice|payment due|due date|electricity|broadband|postpaid|recharge|premium|renewal|debited|credited|upi|transaction)\b/i],
      ['travel', /\b(pnr|flight|train|bus|boarding|departure|arrival|booking|trip|journey|hotel|cab)\b/i],
      ['school', /\b(school|class|exam|test|assignment|homework|fee|parent meeting|ptm|student|teacher)\b/i],
      ['health', /\b(doctor|hospital|clinic|appointment|lab|pharmacy|medicine|vaccin|health|consultation)\b/i],
      ['deliveries', /\b(delivery|delivered|shipped|dispatch|courier|out for delivery|order)\b/i],
      ['government', /\b(aadhaar|passport|income tax|pan card|digilocker|government|municipal|certificate|challan)\b/i],
      ['home', /\b(service|repair|maintenance|technician|pest control|gas cylinder|lpg|water supply)\b/i]
    ];
    return rules.find(([category, expression]) => allowedCategories.includes(category) && expression.test(text))?.[0] || '';
  }

  async function analyzeSms(message, ownerId, allowedCategories) {
    const body = String(message.body || '');
    if (/\b(otp|one[ -]?time password|verification code|login code|auth code)\b/i.test(body)) return null;
    const category = classifyIntegrationText(body, allowedCategories);
    if (!category) return null;
    const amountMatch = body.match(/(?:rs\.?|inr|₹)\s*([\d,]+(?:\.\d{1,2})?)/i);
    const sourceRef = await messageFingerprint(message);
    const sender = safeMessageSummary(message.contact && message.contact !== '(Unknown)' ? message.contact : message.sender).slice(0, 100);
    return { id: D.uid('sg'), source: 'sms', sourceRef, personId: ownerId, category, title: `${categoryLabels[category]}${sender ? ` from ${sender}` : ''}`, summary: safeMessageSummary(body), sender, receivedAt: message.receivedAt, amount: amountMatch ? +amountMatch[1].replace(/,/g, '') || 0 : 0, status: 'pending' };
  }

  function mergeSuggestions(items, fallbackSource = 'gmail') {
    D.state.syncSuggestions ||= [];
    let added = 0;
    items.slice(0, 500).forEach(item => {
      const category = integrationCategories.includes(item.category) ? item.category : 'home';
      const source = ['gmail', 'calendar', 'sms'].includes(item.source) ? item.source : fallbackSource;
      const sourceRef = String(item.sourceRef || item.externalId || item.id || '').slice(0, 180);
      if (!sourceRef || D.state.syncSuggestions.some(existing => existing.source === source && existing.sourceRef === sourceRef)) return;
      D.state.syncSuggestions.push({ id: D.uid('sg'), source, sourceRef, personId: String(item.personId || ''), category, title: safeMessageSummary(item.title || categoryLabels[category]).slice(0, 160), summary: safeMessageSummary(item.summary || item.snippet || ''), sender: safeMessageSummary(item.sender || item.account || '').slice(0, 100), receivedAt: normalizeMessageDate(item.receivedAt || item.startAt || item.date), amount: Math.max(0, +item.amount || 0), status: 'pending' });
      added += 1;
    });
    return added;
  }

  async function importSmsBackup(event) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const settings = D.state.settings.phoneSms || {};
    if (!settings.consent) { toast('Save phone-owner consent before importing messages.'); return; }
    try {
      const messages = await parseSmsBackup(file);
      const suggestions = (await Promise.all(messages.map(message => analyzeSms(message, settings.ownerId, settings.categories || integrationCategories)))).filter(Boolean);
      const added = mergeSuggestions(suggestions, 'sms');
      settings.lastImport = new Date().toISOString();
      settings.importedCount = (settings.importedCount || 0) + messages.length;
      settings.sourceName = file.name;
      save(`${messages.length} messages analysed; ${added} new updates need review`);
      render();
    } catch (error) {
      console.error(error);
      toast(`SMS import failed: ${error.message}`);
    } finally { event.currentTarget.value = ''; }
  }

  function applyIntegrationSuggestion(id) {
    const item = (D.state.syncSuggestions || []).find(suggestion => suggestion.id === id && suggestion.status === 'pending');
    if (!item) return;
    const date = String(item.receivedAt || new Date().toISOString()).slice(0, 10);
    const eventTime = String(item.receivedAt || '').includes('T') ? String(item.receivedAt).slice(0, 16) : `${date}T09:00`;
    if (item.source === 'calendar' || item.category === 'school') {
      D.state.events.push({ id: D.uid('e'), context: item.category === 'school' ? 'study' : 'home', title: item.title, category: item.category === 'school' ? 'School' : categoryLabels[item.category], startAt: eventTime, venue: item.sender || '', notes: item.summary });
    } else if (['bills', 'travel', 'health', 'government'].includes(item.category)) {
      const domain = { bills: 'bills', travel: 'travel', health: 'appointments', government: 'documents' }[item.category];
      D.state.lifeRecords.push({ id: D.uid('lr'), domain, title: item.title, category: categoryLabels[item.category], owner: D.state.people.find(person => person.id === item.personId)?.name || 'Family', provider: item.sender, reference: '', amount: item.amount, dueDate: date, frequency: 'Once', status: 'pending', phone: '', notes: item.summary, createdAt: new Date().toISOString() });
    } else {
      D.state.tasks.push({ id: D.uid('t'), context: 'home', type: 'reminder', title: item.title, category: item.category === 'deliveries' ? 'Delivery' : 'Home service', assignee: D.state.people.find(person => person.id === item.personId)?.name || 'Family', dueAt: date, frequency: 'Once', priority: 'medium', status: 'todo', notes: item.summary });
    }
    item.status = 'applied';
    save('Imported update added to its family section');
    render();
  }

  function dismissIntegrationSuggestion(id) {
    const item = (D.state.syncSuggestions || []).find(suggestion => suggestion.id === id && suggestion.status === 'pending');
    if (!item) return;
    item.status = 'dismissed';
    save('Imported update dismissed');
    render();
  }

  function googleScopes(form = $('#googleSyncSettings')) {
    const scopes = ['openid', 'email'];
    if (form?.querySelector('[name="calendarSync"]')?.checked) scopes.push('https://www.googleapis.com/auth/calendar.readonly');
    if (form?.querySelector('[name="emailAnalysis"]')?.checked) scopes.push('https://www.googleapis.com/auth/gmail.readonly');
    if (form?.querySelector('[name="driveBackup"]')?.checked) scopes.push('https://www.googleapis.com/auth/drive.appdata');
    return scopes.join(' ');
  }

  async function waitForGoogleIdentity() {
    for (let attempt = 0; attempt < 50; attempt += 1) {
      if (window.google?.accounts?.oauth2) return window.google.accounts.oauth2;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Google Identity Services did not load. Check content blockers and retry.');
  }

  async function googleApi(url, accessToken, options = {}) {
    const response = await fetch(url, { ...options, headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}`, ...(options.headers || {}) } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error?.message || `Google API returned ${response.status}`);
    return payload;
  }

  async function startGoogleConnect(button) {
    const row = button.closest('[data-google-account]');
    const email = row.querySelector('[data-google-email]').value.trim();
    const consent = row.querySelector('[data-google-consent]').checked;
    if (!email || !consent) { toast('Add the account email and owner consent first'); return; }
    try {
      button.disabled = true;
      const clientId = $('#googleClientId').value.trim();
      if (!/^[0-9]+-[a-z0-9_-]+\.apps\.googleusercontent\.com$/i.test(clientId)) throw new Error('Enter a valid Google OAuth web client ID.');
      const oauth2 = await waitForGoogleIdentity();
      const tokenResponse = await new Promise((resolve, reject) => {
        const client = oauth2.initTokenClient({
          client_id: clientId,
          scope: googleScopes(),
          login_hint: email,
          prompt: 'select_account',
          callback: response => response?.error ? reject(new Error(response.error_description || response.error)) : resolve(response),
          error_callback: error => reject(new Error(error.type === 'popup_closed' ? 'Google account window was closed.' : 'Google authorization could not open.'))
        });
        client.requestAccessToken();
      });
      const user = await googleApi('https://openidconnect.googleapis.com/v1/userinfo', tokenResponse.access_token);
      if (String(user.email || '').toLowerCase() !== email.toLowerCase()) {
        oauth2.revoke(tokenResponse.access_token);
        throw new Error(`Google authorized ${user.email || 'another account'}, not ${email}.`);
      }
      const slotId = button.dataset.googleConnect;
      const personId = row.querySelector('[data-google-owner]').value;
      googleSessions.set(slotId, { accessToken: tokenResponse.access_token, expiresAt: Date.now() + (+tokenResponse.expires_in || 3600) * 1000, email });
      const sync = D.state.settings.googleSync;
      sync.mode = 'direct';
      sync.clientId = clientId;
      let account = (sync.accounts || []).find(item => item.slotId === slotId);
      if (!account) { account = { slotId }; sync.accounts ||= []; sync.accounts.push(account); }
      Object.assign(account, { personId, email, consent: true, status: 'connected', lastSync: account.lastSync || '' });
      save(`${email} connected for this browser session`);
      render();
    } catch (error) { toast(`Google connection failed: ${error.message}`); }
    finally { if (button?.isConnected) button.disabled = false; }
  }

  function amountFromText(text) {
    const match = String(text || '').match(/(?:rs\.?|inr|₹)\s*([\d,]+(?:\.\d{1,2})?)/i);
    return match ? +match[1].replace(/,/g, '') || 0 : 0;
  }

  async function readGoogleCalendar(account, session, sync) {
    if (!sync.calendarSync) return [];
    const from = new Date(); from.setDate(from.getDate() - (+sync.lookbackDays || 30));
    const until = new Date(); until.setDate(until.getDate() + 90);
    const params = new URLSearchParams({ singleEvents: 'true', orderBy: 'startTime', maxResults: '100', timeMin: from.toISOString(), timeMax: until.toISOString() });
    const payload = await googleApi(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`, session.accessToken);
    return (payload.items || []).filter(item => item.status !== 'cancelled').map(item => {
      const text = `${item.summary || ''} ${item.description || ''} ${item.location || ''}`;
      const category = classifyIntegrationText(text, sync.categories || integrationCategories) || 'home';
      return { source: 'calendar', sourceRef: `${account.email}:${item.id}:${item.updated || ''}`, personId: account.personId, category, title: item.summary || 'Google Calendar event', summary: [item.description, item.location].filter(Boolean).join(' - '), sender: account.email, receivedAt: item.start?.dateTime || item.start?.date || '', amount: amountFromText(text) };
    });
  }

  async function readGoogleGmail(account, session, sync) {
    if (!sync.emailAnalysis) return [];
    const query = `newer_than:${+sync.lookbackDays || 30}d {bill invoice renewal booking travel school exam appointment delivery government service}`;
    const listParams = new URLSearchParams({ q: query, maxResults: '40' });
    const list = await googleApi(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${listParams}`, session.accessToken);
    const messages = await Promise.all((list.messages || []).slice(0, 40).map(async reference => {
      const params = new URLSearchParams({ format: 'metadata' });
      ['Subject', 'From', 'Date'].forEach(name => params.append('metadataHeaders', name));
      return googleApi(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${encodeURIComponent(reference.id)}?${params}`, session.accessToken);
    }));
    return messages.map(message => {
      const headers = Object.fromEntries((message.payload?.headers || []).map(header => [String(header.name).toLowerCase(), header.value]));
      const text = `${headers.subject || ''} ${message.snippet || ''}`;
      const category = classifyIntegrationText(text, sync.categories || integrationCategories);
      if (!category || /\b(otp|one[ -]?time password|verification code)\b/i.test(text)) return null;
      return { source: 'gmail', sourceRef: `${account.email}:${message.id}`, personId: account.personId, category, title: headers.subject || categoryLabels[category], summary: message.snippet || '', sender: headers.from || account.email, receivedAt: message.internalDate ? new Date(+message.internalDate).toISOString() : headers.date || '', amount: amountFromText(text) };
    }).filter(Boolean);
  }

  async function backupToGoogleDrive(account, session) {
    const boundary = `home_manager_${Date.now()}`;
    const metadata = { name: `Home Manager backup ${new Date().toISOString().slice(0, 10)}.json`, parents: ['appDataFolder'], mimeType: 'application/json' };
    const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(D.state)}\r\n--${boundary}--`;
    await googleApi('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', session.accessToken, { method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body });
    return account.email;
  }

  async function runGoogleSync() {
    const button = document.querySelector('[data-google-sync]');
    try {
      button.disabled = true;
      button.classList.add('is-syncing');
      const sync = D.state.settings.googleSync;
      const active = (sync.accounts || []).map(account => ({ account, session: googleSessions.get(account.slotId) })).filter(item => item.session && item.session.expiresAt > Date.now());
      if (!active.length) throw new Error('Connect at least one Google account for this session.');
      const suggestions = [];
      for (const { account, session } of active) {
        suggestions.push(...await readGoogleCalendar(account, session, sync));
        suggestions.push(...await readGoogleGmail(account, session, sync));
        if (sync.driveBackup) await backupToGoogleDrive(account, session);
        account.lastSync = new Date().toISOString();
        account.status = 'connected';
      }
      const added = mergeSuggestions(suggestions, 'gmail');
      save(added ? `${added} Google updates need review` : 'Google sync completed with no new updates');
      render();
    } catch (error) { toast(`Google sync failed: ${error.message}`); }
    finally { if (button?.isConnected) { button.disabled = false; button.classList.remove('is-syncing'); } }
  }

  function toggleTheme() {
    const options = V.natureBackgrounds.map(item => item[0]);
    const current = options.indexOf(D.state.settings.appBackground);
    D.state.settings.appBackground = options[(current + 1) % options.length];
    save(`Background: ${V.natureBackgrounds.find(item => item[0] === D.state.settings.appBackground)[1]}`);
    applyTheme();
    render();
  }
  function applyTheme() {
    const background = V.natureBackgrounds.some(item => item[0] === D.state.settings.appBackground) ? D.state.settings.appBackground : 'waterfall';
    document.body.classList.remove('dark');
    document.body.dataset.nature = background;
    document.body.classList.toggle('collapsed', Boolean(D.state.settings.sidebarCollapsed));
    $('#theme').title = `Next mountain background (current: ${V.natureBackgrounds.find(item => item[0] === background)[1]})`;
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.body).getPropertyValue('--app-bg').trim() || '#edf7f3';
  }

  function exportData() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(D.state, null, 2)], { type: 'application/json' }));
    link.download = `home-manager-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast('Household backup exported');
  }

  async function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const value = D.normalize(JSON.parse(await file.text()));
      D.state = value;
      D.save();
      applyTheme();
      render();
      toast('Backup validated and imported');
    } catch (error) {
      toast('Import failed: ' + error.message);
    }
  }

  function toggleTimer() {
    const timer = V.timer;
    if (timer.id) { clearInterval(timer.id); V.setTimer(timer.seconds, null); render(); return; }
    const endAt = Date.now() + timer.seconds * 1000;
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      V.setTimer(remaining, id);
      const clock = $('#clock');
      if (clock) clock.textContent = V.format(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        V.setTimer(25 * 60, null);
        if (activeTimerMinutes >= 20) D.state.focusSessions.push({ id: D.uid('f'), studentId: D.state.settings.activeLearnerId, date: new Date().toISOString().slice(0, 10), minutes: activeTimerMinutes, subject: 'General revision' });
        save(activeTimerMinutes >= 20 ? 'Focus session recorded' : 'Break complete');
        render();
      }
    }, 250);
    V.setTimer(timer.seconds, id);
    render();
  }
  function setTimer(value) {
    const timer = V.timer;
    if (timer.id) clearInterval(timer.id);
    activeTimerMinutes = value === 'reset' ? 25 : +value;
    V.setTimer(activeTimerMinutes * 60, null);
    render();
  }

  function toggleNotifications(open) {
    const next = open ?? !document.body.classList.contains('notifications-open');
    document.body.classList.toggle('notifications-open', next);
    $('#notifications').setAttribute('aria-expanded', String(next));
    $('#notificationPanel').setAttribute('aria-hidden', String(!next));
  }

  // Google Workspace Integration Handlers
  if (window.HMGoogle) {
    window.HMGoogle.onAuthUpdate(() => {
      if (route.startsWith('settings')) render();
    });
  }

  async function handleWorkspaceAction(action, target) {
    if (!window.HMGoogle?.getUser()) {
      toast('Please sign in with Google first.');
      try {
        await window.HMGoogle?.login();
        render();
      } catch (e) {
        return;
      }
    }

    try {
      if (action === 'fetchDrive') {
        const container = $('#wsContent-drive');
        if (container) container.innerHTML = '<p class="empty">Loading Google Drive files...</p>';
        const data = await window.HMGoogle.listDriveFiles(10);
        const files = data.files || [];
        if (container) {
          container.innerHTML = files.length ? files.map(f => `
            <div class="workspace-list-item">
              <div class="grow">
                <b>${V.e(f.name)}</b>
                <small>${f.mimeType ? V.e(f.mimeType.split('.').pop()) : 'File'} · ${f.modifiedTime ? D.date(f.modifiedTime) : ''}</small>
              </div>
              <a href="${V.e(f.webViewLink)}" target="_blank" rel="noopener" class="icon-action" title="Open file">${V.icon('external-link')}</a>
              <button type="button" data-gw-delete-drive="${V.e(f.id)}" data-gw-file-name="${V.e(f.name)}" class="icon-action danger-action" title="Delete file">${V.icon('trash-2')}</button>
            </div>
          `).join('') : '<p class="empty">No files found in Google Drive.</p>';
        }
        toast('Drive files loaded');
      } else if (action === 'uploadDrive') {
        const name = prompt('Enter file name (e.g., Home_Notes.txt):', 'Home_Manager_Note.txt');
        if (!name) return;
        const content = prompt('Enter file text content:', 'Created from Home Manager');
        if (content === null) return;
        toast('Uploading file to Google Drive...');
        const file = await window.HMGoogle.createDriveFile(name, content);
        toast(`File "${name}" created in Google Drive!`);
        handleWorkspaceAction('fetchDrive');
      } else if (action === 'fetchContacts') {
        const container = $('#wsContent-contacts');
        if (container) container.innerHTML = '<p class="empty">Fetching Google Contacts...</p>';
        const data = await window.HMGoogle.getContacts(15);
        const connections = data.connections || [];
        if (container) {
          container.innerHTML = connections.length ? connections.map(c => {
            const name = c.names?.[0]?.displayName || 'Unnamed Contact';
            const email = c.emailAddresses?.[0]?.value || '';
            const phone = c.phoneNumbers?.[0]?.value || '';
            return `
              <div class="workspace-list-item">
                <div class="grow">
                  <b>${V.e(name)}</b>
                  <small>${V.e(email || phone || 'No details')}</small>
                </div>
                <button type="button" data-gw-import-contact="${V.e(name)}" data-gw-contact-email="${V.e(email)}" data-gw-contact-phone="${V.e(phone)}" class="primary" style="font-size:10px; padding:3px 6px;">Import</button>
              </div>
            `;
          }).join('') : '<p class="empty">No Google Contacts found.</p>';
        }
        toast('Google Contacts loaded');
      } else if (action === 'fetchCalendar') {
        const container = $('#wsContent-calendar');
        if (container) container.innerHTML = '<p class="empty">Loading Google Calendar events...</p>';
        const data = await window.HMGoogle.getCalendarEvents(10);
        const items = data.items || [];
        if (container) {
          container.innerHTML = items.length ? items.map(ev => {
            const start = ev.start?.dateTime || ev.start?.date || '';
            return `
              <div class="workspace-list-item">
                <div class="grow">
                  <b>${V.e(ev.summary || 'Untitled Event')}</b>
                  <small>${start ? D.date(start) : ''} ${ev.location ? `· ${V.e(ev.location)}` : ''}</small>
                </div>
                ${ev.htmlLink ? `<a href="${V.e(ev.htmlLink)}" target="_blank" rel="noopener" class="icon-action" title="Open event">${V.icon('external-link')}</a>` : ''}
              </div>
            `;
          }).join('') : '<p class="empty">No upcoming Google Calendar events.</p>';
        }
        toast('Calendar events loaded');
      } else if (action === 'createCalEvent') {
        const title = prompt('Event summary/title:', 'Family Gathering');
        if (!title) return;
        const now = new Date();
        const startStr = prompt('Start Date & Time (YYYY-MM-DD THH:MM):', `${now.toISOString().slice(0, 10)}T10:00`);
        if (!startStr) return;
        const endStr = prompt('End Date & Time (YYYY-MM-DD THH:MM):', `${now.toISOString().slice(0, 10)}T11:00`);
        if (!endStr) return;
        const ev = await window.HMGoogle.createCalendarEvent(title, startStr, endStr);
        toast(`Calendar event "${title}" created!`);
        handleWorkspaceAction('fetchCalendar');
      } else if (action === 'createMeet') {
        const title = prompt('Google Meet Title:', 'Family & Study Sync');
        if (!title) return;
        const now = new Date();
        const startStr = `${now.toISOString().slice(0, 10)}T10:00`;
        const endStr = `${now.toISOString().slice(0, 10)}T11:00`;
        toast('Creating Google Meet link...');
        const res = await window.HMGoogle.createGoogleMeet(title, startStr, endStr);
        const meetUri = res.hangoutLink || res.conferenceData?.entryPoints?.find(p => p.entryPointType === 'video')?.uri;
        const container = $('#wsContent-meet');
        if (container && meetUri) {
          container.innerHTML = `
            <div class="workspace-list-item" style="flex-direction:column; align-items:flex-start; gap:6px;">
              <b>${V.e(title)}</b>
              <small>Meet link active!</small>
              <a href="${V.e(meetUri)}" target="_blank" rel="noopener" class="primary button" style="text-decoration:none; padding:6px 10px; font-size:12px; font-weight:bold; color:#fff; display:inline-flex; align-items:center; gap:6px;">
                ${V.icon('video')}<span>Join Google Meet</span>
              </a>
            </div>
          `;
        }
        toast('Google Meet link generated!');
      } else if (action === 'fetchClassroom') {
        const container = $('#wsContent-classroom');
        if (container) container.innerHTML = '<p class="empty">Loading Google Classroom courses...</p>';
        const data = await window.HMGoogle.getClassroomCourses();
        const courses = data.courses || [];
        if (container) {
          container.innerHTML = courses.length ? courses.map(c => `
            <div class="workspace-list-item">
              <div class="grow">
                <b>${V.e(c.name)}</b>
                <small>${V.e(c.section || 'Active Course')}</small>
              </div>
              ${c.alternateLink ? `<a href="${V.e(c.alternateLink)}" target="_blank" rel="noopener" class="icon-action" title="Open Classroom">${V.icon('external-link')}</a>` : ''}
            </div>
          `).join('') : '<p class="empty">No active Google Classroom courses found.</p>';
        }
        toast('Google Classroom courses loaded');
      } else if (action === 'fetchTasks') {
        const container = $('#wsContent-tasks');
        if (container) container.innerHTML = '<p class="empty">Loading Google Tasks...</p>';
        const data = await window.HMGoogle.getTasks();
        const tasks = data.items || [];
        if (container) {
          container.innerHTML = tasks.length ? tasks.map(t => `
            <div class="workspace-list-item">
              <div class="grow">
                <b style="${t.status === 'completed' ? 'text-decoration:line-through; opacity:0.6;' : ''}">${V.e(t.title || 'Untitled Task')}</b>
                <small>${t.due ? `Due ${D.date(t.due)}` : 'No due date'}</small>
              </div>
              ${t.status !== 'completed' ? `<button type="button" data-gw-complete-task="${V.e(t.id)}" class="primary" style="font-size:10px; padding:3px 6px;">Done</button>` : `<span class="badge warning">Done</span>`}
            </div>
          `).join('') : '<p class="empty">No tasks in Google Tasks.</p>';
        }
        toast('Google Tasks loaded');
      } else if (action === 'createTask') {
        const title = prompt('Google Task Title:', 'Review Household Budget');
        if (!title) return;
        await window.HMGoogle.createTask(title);
        toast(`Task "${title}" added to Google Tasks!`);
        handleWorkspaceAction('fetchTasks');
      } else if (action === 'createSheet') {
        const title = prompt('New Google Sheet Title:', 'Home Financial Planner');
        if (!title) return;
        const sheet = await window.HMGoogle.createSpreadsheet(title);
        const url = sheet.spreadsheetUrl;
        const container = $('#wsContent-sheets');
        if (container && url) {
          container.innerHTML = `
            <div class="workspace-list-item">
              <div class="grow">
                <b>${V.e(title)}</b>
                <small>Created in Google Sheets</small>
              </div>
              <a href="${V.e(url)}" target="_blank" rel="noopener" class="icon-action" title="Open Sheet">${V.icon('external-link')}</a>
            </div>
          `;
        }
        toast(`Google Sheet "${title}" created!`);
      } else if (action === 'exportExpensesSheet') {
        toast('Exporting Home Manager expenses to Google Sheets...');
        const sheet = await window.HMGoogle.createSpreadsheet(`Home Manager Expenses Backup - ${new Date().toISOString().slice(0, 10)}`);
        const expenses = D.state.expenses || [];
        const rows = [
          ['Category', 'Title / Description', 'Amount', 'Date', 'Status'],
          ...expenses.map(x => [x.category || 'General', x.title || '', x.amount || 0, x.dateAt || '', x.status || ''])
        ];
        await window.HMGoogle.appendSheetValues(sheet.spreadsheetId, 'Sheet1!A1', rows);
        const container = $('#wsContent-sheets');
        if (container && sheet.spreadsheetUrl) {
          container.innerHTML = `
            <div class="workspace-list-item">
              <div class="grow">
                <b>Expenses Exported (${expenses.length} records)</b>
                <small>Google Sheet ready</small>
              </div>
              <a href="${V.e(sheet.spreadsheetUrl)}" target="_blank" rel="noopener" class="primary button" style="text-decoration:none; padding:4px 8px; font-size:11px; color:#fff;">Open Sheet</a>
            </div>
          `;
        }
        toast('Exported expenses to Google Sheets!');
      } else if (action === 'createDoc') {
        const title = prompt('Google Doc Title:', 'Family Knowledge Guide');
        if (!title) return;
        const content = prompt('Initial Document Text:', 'Home Manager Wisdom & Notes');
        const doc = await window.HMGoogle.createDoc(title, content || '');
        const url = `https://docs.google.com/document/d/${doc.documentId}/edit`;
        const container = $('#wsContent-docs');
        if (container) {
          container.innerHTML = `
            <div class="workspace-list-item">
              <div class="grow">
                <b>${V.e(title)}</b>
                <small>Google Doc created</small>
              </div>
              <a href="${V.e(url)}" target="_blank" rel="noopener" class="icon-action" title="Open Doc">${V.icon('external-link')}</a>
            </div>
          `;
        }
        toast(`Google Doc "${title}" created!`);
      } else if (action === 'createSlide') {
        const title = prompt('Presentation Title:', 'Family Annual Project Deck');
        if (!title) return;
        const pres = await window.HMGoogle.createPresentation(title);
        const url = `https://docs.google.com/presentation/d/${pres.presentationId}/edit`;
        const container = $('#wsContent-slides');
        if (container) {
          container.innerHTML = `
            <div class="workspace-list-item">
              <div class="grow">
                <b>${V.e(title)}</b>
                <small>Google Slide presentation created</small>
              </div>
              <a href="${V.e(url)}" target="_blank" rel="noopener" class="icon-action" title="Open Slide">${V.icon('external-link')}</a>
            </div>
          `;
        }
        toast(`Google Slides "${title}" created!`);
      } else if (action === 'fetchKeepTasks') {
        const container = $('#wsContent-keep');
        if (container) container.innerHTML = '<p class="empty">Syncing Quick Notes with Google Tasks...</p>';
        const data = await window.HMGoogle.getTasks();
        const items = data.items || [];
        if (container) {
          container.innerHTML = items.length ? items.map(k => `
            <div class="workspace-list-item">
              <div class="grow">
                <b>${V.e(k.title)}</b>
                <small>${k.notes ? V.e(k.notes) : 'Quick note'}</small>
              </div>
            </div>
          `).join('') : '<p class="empty">No quick notes synced.</p>';
        }
        toast('Quick notes synced!');
      }
    } catch (err) {
      console.error(err);
      toast(`Google action error: ${err.message}`);
    }
  }

  document.addEventListener('click', event => {
    // Handle Google Auth buttons
    if (event.target.closest('#gsiLoginBtn') || event.target.closest('[data-gw-login]')) {
      if (window.HMGoogle) {
        window.HMGoogle.login().then(() => {
          toast('Successfully signed in with Google!');
          render();
        }).catch(err => {
          toast(`Sign in failed: ${err.message}`);
        });
      }
      return;
    }

    if (event.target.closest('#googleSignOutBtn')) {
      if (window.HMGoogle) {
        window.HMGoogle.logout().then(() => {
          toast('Signed out of Google');
          render();
        });
      }
      return;
    }

    const gwAct = event.target.closest('[data-gw-act]');
    if (gwAct) {
      handleWorkspaceAction(gwAct.dataset.gwAct, gwAct);
      return;
    }

    const gwDeleteDrive = event.target.closest('[data-gw-delete-drive]');
    if (gwDeleteDrive) {
      const fileId = gwDeleteDrive.dataset.gwDeleteDrive;
      const fileName = gwDeleteDrive.dataset.gwFileName || 'file';
      window.HMGoogle.deleteDriveFile(fileId, fileName).then(deleted => {
        if (deleted) {
          toast(`Deleted "${fileName}" from Google Drive`);
          handleWorkspaceAction('fetchDrive');
        }
      }).catch(err => toast(err.message));
      return;
    }

    const gwImportContact = event.target.closest('[data-gw-import-contact]');
    if (gwImportContact) {
      const name = gwImportContact.dataset.gwImportContact;
      const email = gwImportContact.dataset.gwContactEmail;
      const phone = gwImportContact.dataset.gwContactPhone;
      D.state.people.push({
        id: D.uid('p'),
        name,
        email,
        phone,
        householdRole: 'Contact',
        relation: 'Google Import'
      });
      save(`Imported ${name} into Home Manager directory`);
      render();
      return;
    }

    const gwCompleteTask = event.target.closest('[data-gw-complete-task]');
    if (gwCompleteTask) {
      const taskId = gwCompleteTask.dataset.gwCompleteTask;
      window.HMGoogle.completeTask(taskId).then(() => {
        toast('Task marked completed in Google Tasks!');
        handleWorkspaceAction('fetchTasks');
      }).catch(err => toast(err.message));
      return;
    }

    const closeDialog = event.target.closest('[data-close-dialog]');
    if (closeDialog) {
      const dialog = document.getElementById(closeDialog.dataset.closeDialog);
      if (dialog?.open) dialog.close();
      return;
    }
    const bookImport = event.target.closest('[data-book-import]');
    if (bookImport) { chooseBookFile(bookImport.dataset.bookImport, bookImport.dataset.student); return; }
    const bookOpen = event.target.closest('[data-book-open]');
    if (bookOpen) { openBookReader(bookOpen.dataset.bookOpen, bookOpen.dataset.student); return; }
    const noteDelete = event.target.closest('[data-book-note-delete]');
    if (noteDelete && activeBookReader) {
      const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
      progress.notes = progress.notes.filter(note => note.id !== noteDelete.dataset.bookNoteDelete);
      save('Reading note removed');
      renderReaderNotes();
      return;
    }
    const groupTarget = event.target.closest('[data-group]');
    if (groupTarget) {
      const groupKey = groupTarget.dataset.group;
      if (groupKey === 'today') {
        expandedGroup = '';
        go(V.groups.today.route);
        return;
      }
      expandedGroup = expandedGroup === groupKey ? '' : groupKey;
      renderNav();
      refreshIcons();
      return;
    }
    const routeTarget = event.target.closest('[data-route]');
    if (routeTarget) { event.preventDefault(); go(routeTarget.dataset.route); if ($('#searchDialog').open) $('#searchDialog').close(); if ($('#emergencyDialog').open) $('#emergencyDialog').close(); toggleNotifications(false); return; }
    const agendaPerson = event.target.closest('[data-agenda-person]');
    if (agendaPerson) {
      const owner = agendaPerson.dataset.agendaPerson;
      document.querySelectorAll('.family-filter [data-agenda-person]').forEach(button => { const active = button.dataset.agendaPerson === owner; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
      let visible = 0;
      document.querySelectorAll('.agenda-item').forEach(item => { item.hidden = owner !== 'all' && item.dataset.agendaOwner !== owner; if (!item.hidden) visible += 1; });
      const empty = document.querySelector('#agendaFilterEmpty');
      if (empty) empty.hidden = visible > 0;
      return;
    }
    const learner = event.target.closest('[data-learner]');
    if (learner) { D.state.settings.activeLearnerId = learner.dataset.learner; save('Student view changed'); render(); return; }
    const workspaceTarget = event.target.closest('[data-workspace]');
    if (workspaceTarget) { workspace = workspaceTarget.dataset.workspace; go(workspace + '/overview'); return; }
    const create = event.target.closest('[data-create]');
    if (create) { openForm(create.dataset.create, create.dataset); return; }
    const edit = event.target.closest('[data-edit]');
    if (edit) { openForm(edit.dataset.edit, { editId: edit.dataset.id, context: edit.dataset.context, domain: edit.dataset.domain }); return; }
    const deletion = event.target.closest('[data-delete]');
    if (deletion) { const [collection, id] = deletion.dataset.delete.split(':'); if (confirm('Remove this item? You can undo with Ctrl+Z.')) remove(collection, id); return; }
    const complete = event.target.closest('[data-complete]');
    if (complete) {
      const id = complete.dataset.complete.split(':')[1];
      const task = D.state.tasks.find(x => x.id === id);
      if (task) {
        if (complete.checked && task.frequency && task.frequency !== 'Once' && task.dueAt) {
          const next = new Date(`${task.dueAt}T00:00`);
          if (task.frequency === 'Daily') next.setDate(next.getDate() + 1);
          if (task.frequency === 'Weekly') next.setDate(next.getDate() + 7);
          if (task.frequency === 'Monthly') next.setMonth(next.getMonth() + 1);
          if (task.frequency === 'Yearly') next.setFullYear(next.getFullYear() + 1);
          task.dueAt = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`;
          task.status = 'todo';
          save(`Completed; next due ${D.date(task.dueAt)}`);
        } else {
          task.status = complete.checked ? 'done' : 'todo';
          save();
        }
        render();
      }
      return;
    }
    const like = event.target.closest('[data-like]');
    if (like) { const discussion = D.state.discussions.find(x => x.id === like.dataset.like); if (discussion) { discussion.likes = (+discussion.likes || 0) + 1; save('Appreciation stored locally'); render(); } return; }
    const vote = event.target.closest('[data-vote]');
    if (vote) { const [id, index] = vote.dataset.vote.split(':'); const poll = D.state.polls.find(x => x.id === id); if (poll?.options[index]) { poll.options[index].votes = (+poll.options[index].votes || 0) + 1; save('Preference stored locally'); render(); } return; }
    const register = event.target.closest('[data-register]');
    if (register) { const item = D.state.volunteerOpportunities.find(x => x.id === register.dataset.register); if (item) { item.registered = !item.registered; save(item.registered ? 'Added to personal plan' : 'Removed from personal plan'); render(); } return; }
    const advance = event.target.closest('[data-advance]');
    if (advance) { const issue = D.state.issues.find(x => x.id === advance.dataset.advance); const order = ['todo', 'progress', 'done']; if (issue) { issue.status = order[(order.indexOf(D.status(issue.status)) + 1) % 3]; save('Issue status updated'); render(); } return; }
    const progress = event.target.closest('[data-progress]');
    if (progress) { const goal = D.state.goals.find(x => x.id === progress.dataset.progress); if (goal) { goal.progress = Math.min(Math.max(1, +goal.target || 1), (+goal.progress || 0) + 1); save('Goal progress updated'); render(); } return; }
    const lifeStatus = event.target.closest('[data-life-status]');
    if (lifeStatus) { const record = D.state.lifeRecords.find(x => x.id === lifeStatus.dataset.lifeStatus); const order = ['planning', 'pending', 'active', 'due', 'paid', 'done']; if (record) { record.status = order[(order.indexOf(record.status) + 1) % order.length]; save('Family record status updated'); render(); } return; }
    const calendarShift = event.target.closest('[data-calendar-shift]');
    if (calendarShift) { V.shiftCalendar(calendarShift.dataset.calendarShift); render(); return; }
    const quickTarget = event.target.closest('[data-quick]');
    if (quickTarget) { event.preventDefault(); $('#quickDialog').close(); openForm(quickTarget.dataset.quick, quickTarget.dataset); return; }
    const guideButton = event.target.closest('[data-open-guide]');
    if (guideButton) { const guide = D.state.guides.find(x => x.id === guideButton.dataset.openGuide); if (guide) { guide.read = true; save('Guide marked as read'); render(); } }
  });

  $('#entityForm').onsubmit = event => {
    if (event.submitter?.value === 'cancel') return;
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    $('#formDialog').close();
    addEntity(form.dataset.kind, Object.fromEntries(new FormData(form)), form.dataset);
    form.reset();
  };
  $('#bookFileInput').onchange = importBookFile;
  $('#bookCurrentPage').onchange = event => {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    progress.currentPage = Math.max(1, Math.min(progress.totalPages || Infinity, +event.target.value || 1));
    if (progress.status === 'not-started') progress.status = 'reading';
    progress.lastOpened = new Date().toISOString();
    D.save();
    refreshBookReader(true);
  };
  $('#bookTotalPages').onchange = event => {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    progress.totalPages = Math.max(0, +event.target.value || 0);
    progress.currentPage = Math.min(progress.totalPages || Infinity, progress.currentPage);
    D.save();
    refreshBookReader(true);
  };
  document.querySelectorAll('[data-book-page-delta]').forEach(button => button.onclick = () => {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    progress.currentPage = Math.max(1, Math.min(progress.totalPages || Infinity, progress.currentPage + +button.dataset.bookPageDelta));
    if (progress.status === 'not-started') progress.status = 'reading';
    progress.lastOpened = new Date().toISOString();
    D.save();
    refreshBookReader(true);
  });
  $('#bookBookmark').onclick = () => {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    const page = progress.currentPage;
    progress.bookmarks = progress.bookmarks.includes(page) ? progress.bookmarks.filter(item => item !== page) : [...progress.bookmarks, page].sort((a, b) => a - b);
    save(progress.bookmarks.includes(page) ? 'Page bookmarked' : 'Bookmark removed');
    refreshBookReader();
  };
  $('#bookReviewed').onclick = () => {
    if (!activeBookReader) return;
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    progress.status = progress.status === 'reviewed' ? 'reading' : 'reviewed';
    save(progress.status === 'reviewed' ? 'Book marked reviewed' : 'Book returned to reading');
    refreshBookReader();
  };
  $('#saveBookNote').onclick = () => {
    if (!activeBookReader) return;
    const text = $('#bookNote').value.trim();
    if (!text) { toast('Write a review note first.'); $('#bookNote').focus(); return; }
    const progress = readingProgress(activeBookReader.book.id, activeBookReader.studentId);
    progress.notes.push({ id: D.uid('rn'), page: progress.currentPage, text, createdAt: new Date().toISOString() });
    $('#bookNote').value = '';
    save('Review note saved');
    renderReaderNotes();
  };
  $('#removeBookFile').onclick = async () => {
    if (!activeBookReader || !confirm('Remove this PDF from this browser? Reading progress and notes will remain.')) return;
    try {
      await deleteBookFile(activeBookReader.book.id);
      toast('PDF removed from this device');
      $('#bookReaderDialog').close();
    } catch (error) {
      console.error(error);
      toast('Could not remove the PDF from browser storage.');
    }
  };
  $('#bookReaderDialog').addEventListener('close', () => {
    $('#bookFrame').src = 'about:blank';
    if (activeBookUrl) URL.revokeObjectURL(activeBookUrl);
    activeBookUrl = '';
    activeBookReader = null;
    if (route === 'study/curriculum') render();
  });
  $('#globalSearch').onclick = showSearch;
  $('#searchInput').oninput = event => renderSearch(event.target.value);
  $('#quickAdd').onclick = quick;
  $('#emergency').onclick = showEmergency;
  $('#theme').onclick = toggleTheme;
  $('#notifications').onclick = () => toggleNotifications();
  $('#closeNotifications').onclick = () => toggleNotifications(false);
  $('#menu').onclick = () => { const open = !document.body.classList.contains('menu-open'); document.body.classList.toggle('menu-open', open); $('#menu').setAttribute('aria-expanded', String(open)); };
  $('#backdrop').onclick = () => { document.body.classList.remove('menu-open'); $('#menu').setAttribute('aria-expanded', 'false'); };
  $('#collapse').onclick = () => { D.state.settings.sidebarCollapsed = !D.state.settings.sidebarCollapsed; D.save(); applyTheme(); };
  $('#bottomNav').onclick = event => { if (event.target.closest('#bottomMore')) { document.body.classList.add('menu-open'); $('#menu').setAttribute('aria-expanded', 'true'); } };
  window.addEventListener('hashchange', render);
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); showSearch(); }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && lastDeleted) { event.preventDefault(); undoDelete(); }
    if (event.key === 'Escape') { document.body.classList.remove('menu-open'); toggleNotifications(false); }
  });

  applyTheme();
  render();
})();
