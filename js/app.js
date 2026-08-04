(function () {
  const D = HM.data;
  const V = HM.views;
  const $ = selector => document.querySelector(selector);
  let route = location.hash.slice(2) || 'global/overview';
  let workspace = route.split('/')[0];
  let activeGroup = D.state.settings.activeGroup || 'today';
  let lastDeleted = null;
  let toastTimer = null;
  let activeTimerMinutes = 25;
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
    const routeOwners = { 'home/assets': 'household', 'home/life/property': 'household', 'community/events': 'community', 'community/polls': 'community' };
    return routeOwners[currentRoute] || Object.keys(V.groups).find(key => key !== 'today' && V.groups[key].items.some(item => item[2] === currentRoute)) || 'today';
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
      activeGroup = groupForRoute(route);
      D.state.settings.activeGroup = activeGroup;
    }
    const group = V.groups[activeGroup];
    document.body.classList.remove('workspace-home', 'workspace-community', 'workspace-study', ...Object.keys(V.groups).map(key => `group-${key}`));
    document.body.classList.add('workspace-' + workspace);
    document.body.classList.add(activeSettings ? 'settings-mode' : `group-${activeGroup}`);
    document.body.classList.toggle('settings-mode', Boolean(activeSettings));
    const topRoute = ({ 'home/assets': 'home/property', 'home/life/property': 'home/property', 'community/events': 'community/participate', 'community/polls': 'community/participate' })[route] || route;
    $('#groupNav').innerHTML = activeSettings ? '' : group.items.map(item => { const active = topRoute === item[2]; return `<button type="button" data-route="${item[2]}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><i data-lucide="${item[1]}"></i><span>${D.esc(item[0])}</span></button>`; }).join('');
    const navItems = activeSettings ? V.settingsGroups.map(item => [item[1], item[2], `settings/${item[0]}`]) : Object.entries(V.groups).map(([key, item]) => [item.label, item.icon, item.route, key]);
    $('#workspaceMenuLabel').innerHTML = activeSettings ? `<span><small>Configure once</small><b>Settings</b></span><i data-lucide="settings-2"></i>` : `<span><small>Daily & weekly</small><b>${D.esc(group.label)}</b></span><i data-lucide="${group.icon}"></i>`;
    $('#nav').innerHTML = navItems.map(item => { const active = activeSettings ? activeSettings === item[2].split('/')[1] : item[3] === activeGroup; return `<button ${activeSettings ? `data-route="${item[2]}"` : `data-group="${item[3]}"`} class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><span class="nav-icon"><i data-lucide="${item[1]}"></i></span><span>${D.esc(item[0])}</span></button>`; }).join('');
    const mobileItems = [['Today', 'sparkles', 'global/overview'], ['Calendar', 'calendar-days', 'home/calendar'], ['Tasks', 'list-checks', 'home/tasks'], ['Food', 'shopping-basket', 'home/inventory']];
    $('#bottomNav').innerHTML = mobileItems.map(item => { const active = route === item[2]; return `<button data-route="${item[2]}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><i data-lucide="${item[1]}"></i><span>${D.esc(item[0])}</span></button>`; }).join('') + '<button id="bottomMore"><i data-lucide="layout-grid"></i><span>More</span></button>';
    $('#settingsNav').classList.toggle('active', Boolean(activeSettings));
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

  function render() {
    HM.life.ensure();
    route = location.hash.slice(2) || route;
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
    document.body.classList.remove('menu-open');
    $('#menu').setAttribute('aria-expanded', 'false');
    refreshIcons();
  }

  function inputAttributes(name, type) {
    if (type !== 'number') return '';
    if (['wellbeing', 'proficiency'].includes(name)) return ' min="0" max="100" step="1"';
    if (name === 'target') return ' min="1" step="1"';
    if (['quantity', 'points', 'plannedHours', 'progress', 'needed'].includes(name)) return ' min="0" step="1"';
    if (['amount', 'value'].includes(name)) return ' min="0" step="0.01"';
    return '';
  }

  function field(label, name, type = 'text', options, required = true) {
    return `<label>${label}${options ? `<select name="${name}" ${required ? 'required' : ''}>${options.map(option => `<option value="${option}">${option}</option>`).join('')}</select>` : `<input name="${name}" type="${type}"${inputAttributes(name, type)} ${required ? 'required' : ''}>`}</label>`;
  }
  function area(label, name, required = true) { return `<label>${label}<textarea name="${name}" ${required ? 'required' : ''}></textarea></label>`; }

  const schemas = {
    task: () => [field('Task', 'title'), field('Context', 'context', 'text', ['home', 'community', 'study']), field('Type', 'type', 'text', ['task', 'duty', 'reminder', 'practice', 'volunteer']), field('Category', 'category'), field('Assigned to', 'assignee', 'text', null, false), field('Due', 'dueAt', 'date'), field('Priority', 'priority', 'text', ['low', 'medium', 'high'])],
    event: () => [field('Event', 'title'), field('Context', 'context', 'text', ['home', 'community', 'study']), field('Category', 'category'), field('Starts', 'startAt', 'datetime-local'), field('Venue', 'venue', 'text', null, false)],
    person: () => [field('Name', 'name'), field('Household role', 'householdRole'), field('Wellbeing score', 'wellbeing', 'number')],
    points: () => [field('Reason', 'reason'), field('Points', 'points', 'number')],
    expense: () => [field('Expense', 'title'), field('Category', 'category'), field('Amount', 'amount', 'number'), field('Date', 'date', 'date')],
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
    life: () => [field('Title', 'title'), field('Category', 'category'), field('Family member / owner', 'owner'), field('Provider / contact', 'provider', 'text', null, false), field('Masked reference / location', 'reference', 'text', null, false), field('Amount', 'amount', 'number', null, false), field('Due / renewal date', 'dueDate', 'date', null, false), field('Frequency', 'frequency', 'text', ['One time', 'Monthly', 'Quarterly', 'Half-yearly', 'Yearly', 'As needed']), field('Status', 'status', 'text', ['planning', 'pending', 'active', 'due', 'paid', 'done']), field('Phone', 'phone', 'tel', null, false), area('Notes', 'notes', false)]
  };

  const editCollections = { task: 'tasks', expense: 'expenses', person: 'people', asset: 'assets', life: 'lifeRecords' };

  function openForm(kind, source = {}) {
    const schema = schemas[kind];
    if (!schema) return;
    const collection = editCollections[kind];
    const record = source.editId && collection ? D.state[collection].find(x => x.id === source.editId) : null;
    const routeDomain = route.match(/^(?:home|settings)\/life\/([^/]+)$/)?.[1] || '';
    $('#formTitle').textContent = (record ? 'Edit ' : 'Add ') + kind;
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
        kind === 'expense' || kind === 'life' ? { amount: +values.amount || 0 } :
        kind === 'asset' ? { value: +values.value || 0 } :
        kind === 'person' ? { wellbeing: Math.min(100, Math.max(0, +values.wellbeing || 0)) } : {});
      save('Changes saved');
      render();
      return;
    }
    switch (kind) {
      case 'task': state.tasks.push({ id: id('t'), context: values.context, type: values.type, title: values.title, category: values.category, assignee: values.assignee, dueAt: values.dueAt, priority: values.priority, status: 'todo' }); break;
      case 'event': state.events.push({ id: id('e'), context: values.context, title: values.title, category: values.category, startAt: values.startAt, venue: values.venue }); break;
      case 'person': state.people.push({ id: id('p'), name: values.name, householdRole: values.householdRole, wellbeing: Math.min(100, Math.max(0, +values.wellbeing || 0)) }); break;
      case 'points': state.pointTransactions.push({ id: id('pt'), personId: meta.person, context: 'home', reason: values.reason, points: +values.points || 0, createdAt: new Date().toISOString().slice(0, 10) }); break;
      case 'expense': state.expenses.push({ id: id('x'), title: values.title, category: values.category, amount: +values.amount || 0, date: values.date }); break;
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
    if ($('#settingsTheme')) $('#settingsTheme').onclick = toggleTheme;
    if ($('#exportData')) $('#exportData').onclick = exportData;
    if ($('#importData')) $('#importData').onchange = importData;
    if ($('#resetData')) $('#resetData').onclick = () => { if (confirm('Reset all local Home Manager data?')) { D.reset(); applyTheme(); render(); toast('Demonstration data restored'); } };
    if ($('#householdSettings')) $('#householdSettings').onsubmit = event => {
      event.preventDefault();
      Object.assign(D.state.settings, Object.fromEntries(new FormData(event.currentTarget)));
      save('Household settings saved');
      render();
    };
    if ($('#timerToggle')) $('#timerToggle').onclick = toggleTimer;
    document.querySelectorAll('[data-timer]').forEach(button => button.onclick = () => setTimer(button.dataset.timer));
  }

  function routeFor(type, record) {
    if (type === 'Task') return record.context === 'study' ? 'study/tasks' : record.context === 'community' ? 'community/overview' : 'home/tasks';
    if (type === 'Event') return record.context === 'study' ? 'study/schedule' : record.context === 'community' ? 'community/events' : 'home/calendar';
    if (type === 'Issue') return record.scope === 'civic' ? 'community/tickets' : 'home/assets';
    if (type === 'Contact') return record.scope === 'community' ? 'community/directory' : 'home/directory';
    if (type === 'Life record') {
      const settingsDomains = ['documents', 'digital', 'legacy', 'property', 'vehicles', 'help'];
      return `${settingsDomains.includes(record.domain) ? 'settings' : 'home'}/life/${record.domain}`;
    }
    return { Person: 'home/family', Expense: 'home/finance', Inventory: 'home/inventory', Meal: 'home/inventory', Asset: 'home/assets', Wisdom: 'home/wisdom', Topic: 'study/board', Goal: 'study/goals', News: 'community/feed', Discussion: 'community/feed', Volunteer: 'community/volunteer', Guide: 'community/guides' }[type] || 'global/overview';
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
    add(D.state.expenses, 'Expense', 'title', 'home');
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
    return output.slice(0, 7);
  }

  function showSearch() {
    $('#searchDialog').showModal();
    setTimeout(() => $('#searchInput').focus(), 0);
    renderSearch('');
  }
  function renderSearch(query) {
    const results = searchItems(query);
    $('#searchResults').innerHTML = results.length ? `<small>${results.length} results</small>${results.map(item => `<button class="search-result" data-route="${item.route}"><span class="context-badge ${item.context}">${D.esc(item.context)}</span><span class="grow"><b>${D.esc(item.label)}</b><small>${item.type}</small></span><i data-lucide="arrow-up-right"></i></button>`).join('')}` : `<div class="empty">${query ? 'No matches' : 'Type to search every workspace'}</div>`;
    refreshIcons();
  }

  function quick() {
    const actions = [['task', 'Task', 'home', 'list-plus', ''], ['event', 'Calendar event', 'home', 'calendar-plus', ''], ['expense', 'Expense', 'home', 'receipt-text', ''], ['meal', 'Meal', 'home', 'cooking-pot', ''], ['inventory', 'Shopping item', 'home', 'shopping-basket', ''], ['life', 'Health note', 'home', 'heart-pulse', 'health'], ['issue', 'Home repair', 'home', 'wrench', '']];
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
    $('#emergencyBody').innerHTML = `<section class="emergency-services">${services.map(item => `<a href="tel:${item[0]}"><span><i data-lucide="${item[3]}"></i></span><span class="grow"><b>${item[1]}</b><small>${item[2]}</small></span><strong>${item[0]}</strong></a>`).join('')}</section><section class="emergency-card"><div class="section-head"><div><small>HOUSEHOLD CARD</small><h3>${D.esc(D.state.settings.householdName || 'Family')}</h3></div><button data-route="settings/health">Edit plan</button></div><p><b>Home address</b><br>${D.esc(address)}</p>${emergencyRecords.map(item => `<div class="row"><div class="grow"><b>${D.esc(item.title)}</b><small>${D.esc(item.owner || 'Family')} · ${D.esc(item.notes || item.reference || 'Open the record for details')}</small></div></div>`).join('') || '<p>No health or emergency notes configured.</p>'}</section>`;
    $('#emergencyDialog').showModal();
    refreshIcons();
  }

  function toggleTheme() {
    D.state.settings.theme = D.state.settings.theme === 'dark' ? 'light' : 'dark';
    save('Theme updated');
    applyTheme();
  }
  function applyTheme() {
    const dark = D.state.settings.theme === 'dark';
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('collapsed', Boolean(D.state.settings.sidebarCollapsed));
    $('#theme').setAttribute('aria-pressed', String(dark));
  }

  function exportData() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(D.state, null, 2)], { type: 'application/json' }));
    link.download = `home-manager-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
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
        if (activeTimerMinutes >= 20) D.state.focusSessions.push({ id: D.uid('f'), date: new Date().toISOString().slice(0, 10), minutes: activeTimerMinutes, subject: 'Focus' });
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

  document.addEventListener('click', event => {
    const closeDialog = event.target.closest('[data-close-dialog]');
    if (closeDialog) {
      const dialog = document.getElementById(closeDialog.dataset.closeDialog);
      if (dialog?.open) dialog.close();
      return;
    }
    const groupTarget = event.target.closest('[data-group]');
    if (groupTarget) {
      activeGroup = groupTarget.dataset.group;
      D.state.settings.activeGroup = activeGroup;
      D.save();
      go(V.groups[activeGroup].route);
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
    const workspaceTarget = event.target.closest('[data-workspace]');
    if (workspaceTarget) { workspace = workspaceTarget.dataset.workspace; go(workspace + '/overview'); return; }
    const create = event.target.closest('[data-create]');
    if (create) { openForm(create.dataset.create, create.dataset); return; }
    const edit = event.target.closest('[data-edit]');
    if (edit) { openForm(edit.dataset.edit, { editId: edit.dataset.id, context: edit.dataset.context, domain: edit.dataset.domain }); return; }
    const deletion = event.target.closest('[data-delete]');
    if (deletion) { const [collection, id] = deletion.dataset.delete.split(':'); if (confirm('Remove this item? You can undo with Ctrl+Z.')) remove(collection, id); return; }
    const complete = event.target.closest('[data-complete]');
    if (complete) { const id = complete.dataset.complete.split(':')[1]; const task = D.state.tasks.find(x => x.id === id); if (task) { task.status = complete.checked ? 'done' : 'todo'; save(); render(); } return; }
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
  $('#globalSearch').onclick = showSearch;
  $('#searchMobile').onclick = showSearch;
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
