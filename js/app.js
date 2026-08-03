(function () {
  const D = HM.data;
  const V = HM.views;
  const $ = selector => document.querySelector(selector);
  let route = location.hash.slice(2) || 'global/overview';
  let workspace = route.split('/')[0];
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

  function renderNav() {
    document.body.classList.remove('workspace-home', 'workspace-community', 'workspace-study');
    document.body.classList.add('workspace-' + workspace);
    document.querySelectorAll('[data-workspace]').forEach(button => {
      const active = button.dataset.workspace === workspace;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });

    let lastGroup = '';
    const unifiedActive = route === 'global/overview';
    $('#nav').innerHTML = `<button data-route="global/overview" class="${unifiedActive ? 'active' : ''}" ${unifiedActive ? 'aria-current="page"' : ''}><span class="nav-icon"><i data-lucide="sparkles"></i></span><span>Today</span></button>` +
      (V.nav[workspace] || []).map(item => {
        const group = item[0] && item[0] !== lastGroup ? `<div class="nav-group">${D.esc(item[0])}</div>` : '';
        lastGroup = item[0] || lastGroup;
        const active = route === item[3];
        return `${group}<button data-route="${item[3]}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><span class="nav-icon"><i data-lucide="${item[2]}"></i></span><span>${D.esc(item[1])}</span></button>`;
      }).join('');

    const popular = {
      home: [['home/overview', 'Overview', 'layout-dashboard'], ['home/tasks', 'Tasks', 'list-checks'], ['home/calendar', 'Calendar', 'calendar-days']],
      community: [['community/overview', 'Overview', 'map'], ['community/feed', 'Feed', 'newspaper'], ['community/tickets', 'Tickets', 'ticket-check']],
      study: [['study/overview', 'Overview', 'graduation-cap'], ['study/board', 'Board', 'columns-3'], ['study/focus', 'Focus', 'timer']]
    };
    $('#bottomNav').innerHTML = (popular[workspace] || popular.home).map(item => {
      const active = route === item[0];
      return `<button data-route="${item[0]}" class="${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''}><i data-lucide="${item[2]}"></i><span>${item[1]}</span></button>`;
    }).join('') + '<button id="bottomMore"><i data-lucide="ellipsis"></i><span>More</span></button>';
  }

  function notificationItems() {
    const today = new Date().toISOString().slice(0, 10);
    const overdue = D.state.tasks.filter(x => D.status(x.status) !== 'done' && x.dueAt && String(x.dueAt).slice(0, 10) < today);
    const low = D.state.inventoryItems.filter(x => (+x.quantity || 0) <= 2);
    const issues = D.state.issues.filter(x => D.status(x.status) !== 'done' && x.priority === 'high');
    return [
      ...overdue.map(x => ({ title: x.title, detail: `Overdue since ${D.date(x.dueAt)}`, route: x.context === 'study' ? 'study/tasks' : 'home/tasks' })),
      ...low.map(x => ({ title: `${x.name} is running low`, detail: `${x.quantity} ${x.unit} remaining`, route: 'home/inventory' })),
      ...issues.map(x => ({ title: x.title, detail: `${x.location} - high priority`, route: x.scope === 'civic' ? 'community/tickets' : 'home/assets' }))
    ];
  }

  function renderNotifications() {
    const items = notificationItems();
    $('#notifications').classList.toggle('has-indicator', items.length > 0);
    $('#notificationList').innerHTML = items.length ? items.slice(0, 12).map(item => `<button class="row notification-item" data-route="${item.route}"><span class="grow"><b>${D.esc(item.title)}</b><small>${D.esc(item.detail)}</small></span><i data-lucide="chevron-right"></i></button>`).join('') : '<div class="empty">Nothing needs attention.</div>';
  }

  function render() {
    route = location.hash.slice(2) || route;
    const first = route.split('/')[0];
    if (['home', 'community', 'study'].includes(first)) {
      workspace = first;
      D.state.settings.activeWorkspace = workspace;
      D.save();
    }
    renderNav();
    const title = V.titles[route] || ['Today', 'Home Manager'];
    $('#breadcrumb').textContent = route === 'global/overview' ? 'Home Manager' : workspace[0].toUpperCase() + workspace.slice(1);
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
  function area(label, name) { return `<label>${label}<textarea name="${name}" required></textarea></label>`; }

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
    goal: () => [field('Goal', 'title'), field('Due', 'dueAt', 'date'), field('Target', 'target', 'number'), field('Current progress', 'progress', 'number')]
  };

  const editCollections = { task: 'tasks', expense: 'expenses' };

  function openForm(kind, source = {}) {
    const schema = schemas[kind];
    if (!schema) return;
    const collection = editCollections[kind];
    const record = source.editId && collection ? D.state[collection].find(x => x.id === source.editId) : null;
    $('#formTitle').textContent = (record ? 'Edit ' : 'Add ') + kind;
    $('#formContext').textContent = String(source.context || record?.context || workspace).toUpperCase();
    $('#formFields').innerHTML = schema(source).join('');
    const form = $('#entityForm');
    form.dataset.kind = kind;
    form.dataset.context = source.context || record?.context || workspace;
    form.dataset.scope = source.scope || record?.scope || '';
    form.dataset.person = source.person || '';
    form.dataset.editId = source.editId || '';
    if (record) Object.entries(record).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value ?? ''; });
    else if (form.elements.context) form.elements.context.value = source.context || workspace;
    $('#formDialog').showModal();
    refreshIcons();
  }

  function addEntity(kind, values, meta) {
    const state = D.state;
    const id = D.uid;
    if (meta.editId && editCollections[kind]) {
      const record = state[editCollections[kind]].find(x => x.id === meta.editId);
      if (record) Object.assign(record, values, kind === 'expense' ? { amount: +values.amount } : {});
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
    if ($('#timerToggle')) $('#timerToggle').onclick = toggleTimer;
    document.querySelectorAll('[data-timer]').forEach(button => button.onclick = () => setTimer(button.dataset.timer));
  }

  function routeFor(type, record) {
    if (type === 'Task') return record.context === 'study' ? 'study/tasks' : record.context === 'community' ? 'community/overview' : 'home/tasks';
    if (type === 'Event') return record.context === 'study' ? 'study/schedule' : record.context === 'community' ? 'community/events' : 'home/calendar';
    if (type === 'Issue') return record.scope === 'civic' ? 'community/tickets' : 'home/assets';
    if (type === 'Contact') return record.scope === 'community' ? 'community/directory' : 'home/directory';
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
    return output.slice(0, 30);
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
    const actions = [['task', 'Task', workspace, 'list-plus'], ['event', 'Event', workspace, 'calendar-plus'], ['expense', 'Expense', 'home', 'receipt-text'], ['issue', 'Home issue', 'home', 'wrench'], ['issue', 'Civic follow-up', 'community', 'ticket-plus'], ['topic', 'Study topic', 'study', 'book-plus'], ['discussion', 'Forum note', 'community', 'message-square-plus']];
    $('#quickActions').innerHTML = actions.map(item => `<button data-quick="${item[0]}" data-context="${item[2]}" data-scope="${item[1] === 'Civic follow-up' ? 'civic' : item[0] === 'issue' ? 'household' : ''}"><i data-lucide="${item[3]}"></i><span><b>${item[1]}</b><small>${item[2]} workspace</small></span></button>`).join('');
    $('#quickDialog').showModal();
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
    const routeTarget = event.target.closest('[data-route]');
    if (routeTarget) { event.preventDefault(); go(routeTarget.dataset.route); if ($('#searchDialog').open) $('#searchDialog').close(); toggleNotifications(false); return; }
    const workspaceTarget = event.target.closest('[data-workspace]');
    if (workspaceTarget) { workspace = workspaceTarget.dataset.workspace; go(workspace + '/overview'); return; }
    const create = event.target.closest('[data-create]');
    if (create) { openForm(create.dataset.create, create.dataset); return; }
    const edit = event.target.closest('[data-edit]');
    if (edit) { openForm(edit.dataset.edit, { editId: edit.dataset.id, context: edit.dataset.context }); return; }
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
    const calendarShift = event.target.closest('[data-calendar-shift]');
    if (calendarShift) { V.shiftCalendar(calendarShift.dataset.calendarShift); render(); return; }
    const quickTarget = event.target.closest('[data-quick]');
    if (quickTarget) { $('#quickDialog').close(); openForm(quickTarget.dataset.quick, quickTarget.dataset); return; }
    const guideButton = event.target.closest('[data-open-guide]');
    if (guideButton) { const guide = D.state.guides.find(x => x.id === guideButton.dataset.openGuide); if (guide) { guide.read = true; save('Guide marked as read'); render(); } }
  });

  $('#entityForm').onsubmit = event => {
    if (event.submitter?.value === 'cancel') return;
    const form = event.currentTarget;
    addEntity(form.dataset.kind, Object.fromEntries(new FormData(form)), form.dataset);
    form.reset();
  };
  $('#globalSearch').onclick = showSearch;
  $('#searchMobile').onclick = showSearch;
  $('#searchInput').oninput = event => renderSearch(event.target.value);
  $('#quickAdd').onclick = quick;
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
