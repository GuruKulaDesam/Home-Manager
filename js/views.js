(function () {
  const D = HM.data;
  const e = D.esc;

  const nav = {
    home: [
      ['', 'Overview', 'layout-dashboard', 'home/overview'],
      ['Plan', 'Tasks', 'list-checks', 'home/tasks'],
      ['Plan', 'Calendar', 'calendar-days', 'home/calendar'],
      ['Home', 'Family', 'users', 'home/family'],
      ['People', 'Family Health', 'heart-pulse', 'home/life/health'],
      ['Home', 'Money', 'wallet-cards', 'home/finance'],
      ['Home', 'Supplies & Meals', 'shopping-basket', 'home/inventory'],
      ['Money', 'Bills & Payments', 'receipt-indian-rupee', 'home/life/bills'],
      ['Money', 'Insurance', 'shield-check', 'home/life/insurance'],
      ['Money', 'Tax & Compliance', 'landmark', 'home/life/tax'],
      ['Money', 'Subscriptions', 'repeat-2', 'home/life/subscriptions'],
      ['Household', 'Property & Utilities', 'building-2', 'home/life/property'],
      ['Household', 'Vehicles', 'car-front', 'home/life/vehicles'],
      ['Household', 'Domestic Help', 'hand-helping', 'home/life/help'],
      ['Household', 'Sustainability', 'leaf', 'home/life/sustainability'],
      ['Plans', 'Travel & Pilgrimage', 'luggage', 'home/life/travel'],
      ['Plans', 'Festivals & Functions', 'party-popper', 'home/life/festivals'],
      ['Records', 'Life Registry', 'layout-grid', 'home/life'],
      ['Records', 'Documents & IDs', 'folders', 'home/life/documents'],
      ['Records', 'Digital Household', 'cloud-cog', 'home/life/digital'],
      ['Records', 'Nominees & Legacy', 'scroll-text', 'home/life/legacy'],
      ['Care', 'Emergency Readiness', 'siren', 'home/life/emergency'],
      ['Care', 'Pets & Animals', 'paw-print', 'home/life/pets'],
      ['Care', 'Maintenance & Assets', 'wrench', 'home/assets'],
      ['Care', 'Wisdom & Recognition', 'sparkles', 'home/wisdom'],
      ['Care', 'Directory', 'contact-round', 'home/directory']
    ],
    community: [
      ['', 'Overview', 'map', 'community/overview'],
      ['Discover', 'News & Forum', 'newspaper', 'community/feed'],
      ['Discover', 'Events', 'calendar-heart', 'community/events'],
      ['Discover', 'Polls', 'chart-no-axes-column', 'community/polls'],
      ['Participate', 'Volunteer', 'hand-heart', 'community/volunteer'],
      ['Participate', 'Civic Tickets', 'ticket-check', 'community/tickets'],
      ['Resources', 'Services', 'life-buoy', 'community/directory'],
      ['Resources', 'Guides', 'book-marked', 'community/guides']
    ],
    study: [
      ['', 'Overview', 'graduation-cap', 'study/overview'],
      ['Plan', 'Study Board', 'columns-3', 'study/board'],
      ['Plan', 'Schedule', 'calendar-clock', 'study/schedule'],
      ['Plan', 'Tasks', 'list-todo', 'study/tasks'],
      ['Plan', 'Goals', 'target', 'study/goals'],
      ['Focus', 'Timer', 'timer', 'study/focus'],
      ['Focus', 'Analytics', 'chart-spline', 'study/analytics']
    ]
  };

  const titles = {
    'global/overview': ['Today', 'Your home command center'],
    'global/settings': ['Settings', 'Appearance, data and privacy'],
    'home/overview': ['Home Overview', 'Your household at a glance'],
    'home/tasks': ['Home Tasks', 'Responsibilities, reminders and maintenance'],
    'home/calendar': ['Family Calendar', 'Household plans and shared events'],
    'home/family': ['Family', 'Members, wellbeing and recognition'],
    'home/finance': ['Money', 'Expenses and household totals'],
    'home/inventory': ['Supplies & Meals', 'Inventory and meal planning'],
    'home/assets': ['Maintenance & Assets', 'Household issues and valuables'],
    'home/wisdom': ['Wisdom & Recognition', 'Family knowledge and points'],
    'home/directory': ['Home Directory', 'Family and service contacts'],
    'community/overview': ['Community Overview', 'Your local personal planner'],
    'community/feed': ['News & Forum', 'Locally stored neighbourhood notes'],
    'community/events': ['Community Events', 'Meetings, markets and local activities'],
    'community/polls': ['Community Polls', 'Preferences stored in this browser'],
    'community/volunteer': ['Volunteer', 'Personal participation planner'],
    'community/tickets': ['Civic Tickets', 'Personal issue follow-up log'],
    'community/directory': ['Community Services', 'Essential local contacts'],
    'community/guides': ['Civic Guides', 'Self-service local information'],
    'study/overview': ['Study Overview', 'Preparation at a glance'],
    'study/board': ['Study Board', 'Syllabus progress from backlog to mastery'],
    'study/schedule': ['Study Schedule', 'Study blocks on the shared calendar'],
    'study/tasks': ['Study Tasks', 'Practice and revision checklist'],
    'study/goals': ['Study Goals', 'Milestones and target scores'],
    'study/focus': ['Focus Timer', 'Focused sessions recorded in analytics'],
    'study/analytics': ['Study Analytics', 'Focus time and subject proficiency']
  };
  titles['home/life'] = ['Family Life Registry', 'Every important family record in one place'];
  Object.entries(HM.life.domains).forEach(([key, config]) => {
    titles[`home/life/${key}`] = [config.title, config.note];
  });

  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, Number(value) || 0));
  const isoDay = value => String(value || '').slice(0, 10);
  const today = () => new Date().toISOString().slice(0, 10);
  const eventRoute = context => context === 'community' ? 'community/events' : context === 'study' ? 'study/schedule' : 'home/calendar';
  const taskRoute = context => context === 'study' ? 'study/tasks' : context === 'community' ? 'community/overview' : 'home/tasks';

  function badge(context) {
    const safe = ['home', 'community', 'study'].includes(context) ? context : 'home';
    return `<span class="context-badge ${safe}">${e(safe[0].toUpperCase() + safe.slice(1))}</span>`;
  }

  function status(value) {
    const normalized = D.status(value);
    const className = normalized === 'todo' ? 'warning' : normalized === 'progress' ? 'danger' : '';
    const label = normalized === 'progress' ? 'In progress' : normalized === 'done' ? 'Done' : 'To do';
    return `<span class="badge ${className}">${label}</span>`;
  }

  function metric(label, value, note, iconName = 'sparkle') {
    return `<article class="metric"><small><span>${e(label)}</span>${icon(iconName)}</small><strong>${e(value)}</strong><em>${e(note)}</em></article>`;
  }

  function row(title, sub, right = '', context = '') {
    return `<div class="row">${context ? badge(context) : ''}<div class="grow"><b>${e(title)}</b><small>${e(sub)}</small></div>${right}</div>`;
  }

  function empty(message, kind, label) {
    return `<div class="empty"><p>${e(message)}</p>${kind ? `<button class="primary" data-create="${kind}">${icon('plus')}<span>${e(label)}</span></button>` : ''}</div>`;
  }

  function intro() {
    const now = new Date();
    const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
    return `<section class="page-intro"><div><span class="eyebrow">${icon('sunrise')} ${e(now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }))}</span><h2>${greeting}</h2><p>See what needs attention across your household, local plans and study goals.</p></div><span class="aurora-rule" aria-hidden="true"><i></i><i></i><i></i><i></i></span></section>`;
  }

  function unified() {
    const s = D.state;
    const day = today();
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    const weekIso = weekStart.toISOString().slice(0, 10);
    const openTasks = s.tasks.filter(x => D.status(x.status) !== 'done');
    const overdue = openTasks.filter(x => x.dueAt && isoDay(x.dueAt) < day);
    const upcomingEvents = s.events.filter(x => isoDay(x.startAt) >= day).sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)));
    const focus = s.focusSessions.filter(x => x.date >= weekIso).reduce((sum, x) => sum + (+x.minutes || 0), 0);
    const lowStock = s.inventoryItems.filter(x => (+x.quantity || 0) <= 2);
    const month = day.slice(0, 7);
    const monthSpend = s.expenses.filter(x => isoDay(x.date).startsWith(month)).reduce((sum, x) => sum + (+x.amount || 0), 0);
    const lifeRecords = HM.life.ensure();
    const horizonDate = new Date(); horizonDate.setDate(horizonDate.getDate() + 30);
    const horizon = horizonDate.toISOString().slice(0, 10);
    const lifeDue = lifeRecords.filter(x => x.dueDate && x.dueDate <= horizon && !['done', 'paid'].includes(x.status)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const agenda = [
      ...openTasks.map(x => ({ date: isoDay(x.dueAt), context: x.context, title: x.title, sub: `${x.category} - ${x.assignee || 'Unassigned'}`, route: taskRoute(x.context), icon: 'circle-check-big' })),
      ...upcomingEvents.map(x => ({ date: isoDay(x.startAt), context: x.context, title: x.title, sub: `${D.date(x.startAt)} - ${x.venue || 'No venue'}`, route: eventRoute(x.context), icon: 'calendar-clock' })),
      ...lifeDue.map(x => ({ date: x.dueDate, context: 'home', title: x.title, sub: `${HM.life.domains[x.domain]?.title || 'Family record'} - ${x.status}`, route: `home/life/${x.domain}`, icon: HM.life.domains[x.domain]?.icon || 'folder-clock' }))
    ].filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
    const issues = s.issues.filter(x => D.status(x.status) !== 'done');

    return `${intro()}
      <section class="metrics">
        ${metric('Open tasks', openTasks.length, overdue.length ? `${overdue.length} overdue` : 'Nothing overdue', 'list-checks')}
        ${metric('Next events', upcomingEvents.length, 'Shared calendars', 'calendar-range')}
        ${metric('This month', D.money(monthSpend), `${s.expenses.filter(x => isoDay(x.date).startsWith(month)).length} expenses`, 'wallet-cards')}
        ${metric('Study focus', `${focus} min`, 'Last 7 days', 'timer-reset')}
      </section>
      <div class="dashboard-grid">
        <section class="panel">
          <div class="section-head"><div><h2>Today and next</h2><p>One chronological agenda across every workspace</p></div><button class="primary" data-create="task" data-context="home">${icon('plus')}<span>Task</span></button></div>
          ${agenda.length ? agenda.map(x => {
            const date = new Date(`${x.date}T00:00`);
            return `<button class="row" data-route="${x.route}"><span class="agenda-date"><small>${e(date.toLocaleDateString('en-IN', { month: 'short' }))}</small><b>${date.getDate()}</b></span>${icon(x.icon)}<span class="grow"><b>${e(x.title)}</b><small>${e(x.sub)}</small></span>${badge(x.context)}</button>`;
          }).join('') : empty('Your agenda is clear. Add a task or event to begin.', 'task', 'Add task')}
        </section>
        <div class="dashboard-stack">
          <section class="signal-grid">
            <article class="card signal ${overdue.length ? 'danger' : ''}"><small>Overdue</small><strong>${overdue.length}</strong><span>${overdue.length ? 'Needs a decision today' : 'All caught up'}</span></article>
            <article class="card signal warning"><small>Low stock</small><strong>${lowStock.length}</strong><span>${lowStock.length ? lowStock.slice(0, 2).map(x => e(x.name)).join(', ') : 'Supplies look good'}</span></article>
            <article class="card signal"><small>Home issues</small><strong>${issues.filter(x => x.scope === 'household').length}</strong><span>Maintenance follow-up</span></article>
            <article class="card signal study"><small>Study topics</small><strong>${s.learningTopics.filter(x => x.status !== 'done').length}</strong><span>Still in progress</span></article>
            <article class="card signal danger"><small>Renewals & dues</small><strong>${lifeDue.length}</strong><span>Next 30 days</span></article>
            <article class="card signal warning"><small>Life registry</small><strong>${lifeRecords.length}</strong><span>${Object.keys(HM.life.domains).length} family domains</span></article>
          </section>
          <section class="panel"><div class="section-head"><div><h2>Needs attention</h2><p>Priority tasks, renewals and open issues</p></div><button data-route="home/life">Life registry</button></div>${[...lifeDue.slice(0, 3).map(x => row(x.title, `${HM.life.domains[x.domain]?.title || 'Family'} - ${D.date(x.dueDate)}`, lifeStatus(x.status), 'home')), ...overdue.slice(0, 2).map(x => row(x.title, `Due ${D.date(x.dueAt)}`, status(x.status), x.context)), ...issues.slice(0, 2).map(x => row(x.title, `${x.location} - ${x.priority}`, status(x.status), x.scope === 'civic' ? 'community' : 'home'))].join('') || '<p class="empty">No urgent signals.</p>'}</section>
        </div>
      </div>
      <section><div class="section-head"><div><h2>Workspaces</h2><p>Focused views when you need more detail</p></div></div><div class="grid-3">
        <article class="card snapshot"><span class="context-badge">Home</span><h3>${s.people.length} household members</h3><p>${openTasks.filter(x => x.context === 'home').length} open tasks and ${lowStock.length} low-stock supplies.</p><button data-route="home/overview">Open Home</button></article>
        <article class="card snapshot community"><span class="context-badge community">Community</span><h3>${s.newsItems.length} saved updates</h3><p>${upcomingEvents.filter(x => x.context === 'community').length} upcoming plans and ${issues.filter(x => x.scope === 'civic').length} personal follow-ups.</p><button data-route="community/overview">Open Community</button></article>
        <article class="card snapshot study"><span class="context-badge study">Study</span><h3>${s.learningTopics.length} syllabus topics</h3><p>${s.learningTopics.filter(x => x.status === 'done').length} mastered and ${s.goals.filter(x => x.context === 'study').length} active goals.</p><button data-route="study/overview">Open Study</button></article>
      </div></section>`;
  }

  function homeOverview() {
    const s = D.state;
    const month = today().slice(0, 7);
    const spend = s.expenses.filter(x => isoDay(x.date).startsWith(month)).reduce((sum, x) => sum + (+x.amount || 0), 0);
    const homeTasks = s.tasks.filter(x => x.context === 'home');
    return `<section class="metrics">${metric('Family members', s.people.length, 'Local profiles', 'users')}${metric('Open home tasks', homeTasks.filter(x => D.status(x.status) !== 'done').length, 'Responsibilities', 'list-todo')}${metric('Home issues', s.issues.filter(x => x.scope === 'household' && D.status(x.status) !== 'done').length, 'Maintenance', 'wrench')}${metric('Monthly expenses', D.money(spend), month, 'wallet-cards')}</section><div class="grid-2"><section class="panel"><div class="section-head"><h2>Household activity</h2><button data-route="home/tasks">View tasks</button></div>${homeTasks.length ? homeTasks.map(x => row(x.title, `${x.assignee || 'Unassigned'} - ${D.date(x.dueAt)}`, status(x.status))).join('') : empty('No home tasks yet.', 'task', 'Add task')}</section><section class="panel"><div class="section-head"><h2>Family wellbeing</h2><button data-route="home/family">Members</button></div>${s.people.map(x => row(x.name, x.householdRole, `<b>${clamp(x.wellbeing)}%</b>`)).join('')}</section></div>`;
  }

  function taskView(context) {
    const items = D.state.tasks.filter(x => x.context === context);
    return `<div class="toolbar"><label class="sr-only" for="taskFilter">Search tasks</label><input id="taskFilter" data-filter placeholder="Search ${e(context)} tasks"><select data-status-filter aria-label="Filter tasks by status"><option value="">All statuses</option><option value="todo">To do</option><option value="progress">In progress</option><option value="done">Done</option></select><button class="primary" data-create="task" data-context="${context}">${icon('plus')}<span>Task</span></button></div><section class="panel">${items.length ? `<table class="table"><thead><tr><th>Done</th><th>Task</th><th>Category</th><th>Assigned</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead><tbody>${items.map(x => `<tr data-filter-row data-status="${e(D.status(x.status))}"><td data-label="Done"><input type="checkbox" aria-label="Mark ${e(x.title)} complete" data-complete="task:${e(x.id)}" ${D.status(x.status) === 'done' ? 'checked' : ''}></td><td data-label="Task"><b>${e(x.title)}</b></td><td data-label="Category">${e(x.category)}</td><td data-label="Assigned">${e(x.assignee || 'Unassigned')}</td><td data-label="Due">${D.date(x.dueAt)}</td><td data-label="Status">${status(x.status)}</td><td data-label="Actions"><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(x.title)}" data-edit="task" data-id="${e(x.id)}" data-context="${e(x.context)}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(x.title)}" data-delete="tasks:${e(x.id)}">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table>` : empty(`No ${context} tasks yet.`, 'task', 'Add task')}</section>`;
  }

  let calendarCursor = new Date();
  function shiftCalendar(delta) {
    if (delta === 'today') calendarCursor = new Date();
    else calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + Number(delta), 1);
  }

  function calendar(context = 'all') {
    const year = calendarCursor.getFullYear();
    const month = calendarCursor.getMonth();
    const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const events = D.state.events.filter(x => (context === 'all' || x.context === context) && x.startAt);
    let cells = '';
    for (let i = 0; i < 42; i++) {
      const dayNumber = i - firstOffset + 1;
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
      const dayEvents = dayNumber > 0 && dayNumber <= days ? events.filter(x => isoDay(x.startAt) === date) : [];
      cells += `<div class="calendar-day ${date === today() ? 'is-today' : ''}"><small>${dayNumber > 0 && dayNumber <= days ? dayNumber : ''}</small>${dayEvents.map(x => `<button class="event ${e(x.context)}" data-route="${eventRoute(x.context)}">${e(x.title)}</button>`).join('')}</div>`;
    }
    const monthEvents = events.filter(x => isoDay(x.startAt).startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)));
    return `<div class="toolbar"><div><small>Calendar</small><h2>${calendarCursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h2></div><div class="row-actions"><button data-calendar-shift="-1" aria-label="Previous month">${icon('chevron-left')}</button><button data-calendar-shift="today">Today</button><button data-calendar-shift="1" aria-label="Next month">${icon('chevron-right')}</button></div><button class="primary" data-create="event" data-context="${context === 'all' ? 'home' : context}">${icon('plus')}<span>Event</span></button></div><div class="calendar-wrap"><div class="calendar">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => `<div class="calendar-day calendar-label"><b>${x}</b></div>`).join('')}${cells}</div><div class="calendar-agenda">${monthEvents.length ? monthEvents.map(x => row(x.title, `${D.date(x.startAt, { weekday: 'short', day: 'numeric', month: 'short' })} - ${x.venue || 'No venue'}`, badge(x.context))).join('') : empty('No events this month.', 'event', 'Add event')}</div></div>`;
  }

  function family() {
    const s = D.state;
    return `<div class="toolbar"><input data-filter aria-label="Search family" placeholder="Search family"><button class="primary" data-create="person">${icon('user-plus')}<span>Member</span></button></div><div class="cards">${s.people.map(person => { const points = s.pointTransactions.filter(x => x.personId === person.id).reduce((sum, x) => sum + (+x.points || 0), 0); return `<article class="card" data-filter-row><span class="avatar">${e((person.name || '?')[0])}</span><h3>${e(person.name)}</h3><p>${e(person.householdRole)}</p><div class="row"><div class="grow"><small>Wellbeing</small><b>${clamp(person.wellbeing)}%</b></div><div><small>Points</small><b>${points}</b></div></div><footer><button data-create="points" data-person="${e(person.id)}">Award points</button><button class="danger-action" data-delete="people:${e(person.id)}">Remove</button></footer></article>`; }).join('')}</div>`;
  }

  function topCategory(items) {
    const totals = {};
    items.forEach(x => { totals[x.category] = (totals[x.category] || 0) + (+x.amount || 0); });
    return Object.keys(totals).sort((a, b) => totals[b] - totals[a])[0] || 'None';
  }

  function finance() {
    const month = today().slice(0, 7);
    const items = D.state.expenses.filter(x => isoDay(x.date).startsWith(month));
    const total = items.reduce((sum, x) => sum + (+x.amount || 0), 0);
    return `<section class="metrics">${metric('This month', D.money(total), month, 'indian-rupee')}${metric('Largest category', topCategory(items), 'By amount', 'chart-pie')}${metric('Entries', items.length, 'Current month', 'receipt-text')}${metric('Average', D.money(total / Math.max(1, items.length)), 'Per entry', 'divide')}</section><div class="toolbar"><input data-filter aria-label="Search expenses" placeholder="Search expenses"><button class="primary" data-create="expense">${icon('plus')}<span>Expense</span></button></div><section class="panel">${D.state.expenses.length ? `<table class="table"><thead><tr><th>Expense</th><th>Category</th><th>Date</th><th>Amount</th><th>Actions</th></tr></thead><tbody>${D.state.expenses.map(x => `<tr data-filter-row><td data-label="Expense"><b>${e(x.title)}</b></td><td data-label="Category">${e(x.category)}</td><td data-label="Date">${D.date(x.date)}</td><td data-label="Amount">${D.money(x.amount)}</td><td data-label="Actions"><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(x.title)}" data-edit="expense" data-id="${e(x.id)}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(x.title)}" data-delete="expenses:${e(x.id)}">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table>` : empty('No expenses recorded.', 'expense', 'Add expense')}</section>`;
  }

  function inventory() {
    const s = D.state;
    return `<div class="grid-2"><section><div class="section-head"><div><h2>Inventory</h2><p>Low stock is highlighted automatically</p></div><button class="primary" data-create="inventory">${icon('plus')}<span>Item</span></button></div><section class="panel">${s.inventoryItems.length ? s.inventoryItems.map(x => row(x.name, x.category, `<span class="badge ${+x.quantity <= 2 ? 'warning' : ''}">${e(x.quantity)} ${e(x.unit)}</span>`)).join('') : empty('No supplies tracked.', 'inventory', 'Add item')}</section></section><section><div class="section-head"><div><h2>Meal plan</h2><p>Upcoming family meals</p></div><button class="primary" data-create="meal">${icon('plus')}<span>Meal</span></button></div><section class="panel">${s.meals.length ? s.meals.sort((a, b) => String(a.date).localeCompare(String(b.date))).map(x => row(x.name, `${x.mealType} - ${x.cook}`, `<span class="badge">${D.date(x.date)}</span>`)).join('') : empty('No meals planned.', 'meal', 'Plan meal')}</section></section></div>`;
  }

  function assets() {
    const issues = D.state.issues.filter(x => x.scope === 'household');
    return `<div class="grid-2"><section><div class="section-head"><div><h2>Maintenance</h2><p>Cycle status from to do to complete</p></div><button class="primary" data-create="issue" data-scope="household">${icon('plus')}<span>Issue</span></button></div><section class="panel">${issues.length ? issues.map(x => row(x.title, `${x.category} - ${x.location}`, `<button data-advance="${e(x.id)}">${status(x.status)}</button>`)).join('') : empty('No maintenance issues.', 'issue', 'Report issue')}</section></section><section><div class="section-head"><h2>Household assets</h2><button class="primary" data-create="asset">${icon('plus')}<span>Asset</span></button></div><section class="panel">${D.state.assets.map(x => row(x.name, `${x.category} - ${x.status}`, `<b>${D.money(x.value)}</b>`)).join('') || empty('No assets recorded.', 'asset', 'Add asset')}</section></section></div>`;
  }

  function wisdom() {
    const leaderboard = D.state.people.map(person => ({ name: person.name, points: D.state.pointTransactions.filter(x => x.personId === person.id).reduce((sum, x) => sum + (+x.points || 0), 0) })).sort((a, b) => b.points - a.points);
    return `<div class="grid-2"><section><div class="section-head"><h2>Family wisdom</h2><button class="primary" data-create="wisdom">${icon('plus')}<span>Entry</span></button></div><div class="cards" style="grid-template-columns:1fr">${D.state.wisdomEntries.map(x => `<article class="card"><span class="badge">${e(x.category)}</span><h3>${e(x.title)}</h3><p>${e(x.body)}</p><small>Preserved by ${e(x.author)}</small></article>`).join('')}</div></section><section class="panel"><h2>Recognition</h2>${leaderboard.map((x, index) => row(`#${index + 1} ${x.name}`, 'Family contribution points', `<b>${x.points} pts</b>`)).join('')}</section></div>`;
  }

  function directory(scope) {
    const contacts = D.state.contacts.filter(x => x.scope === scope);
    return `<div class="toolbar"><input data-filter aria-label="Search contacts" placeholder="Search contacts"><button class="primary" data-create="contact" data-scope="${scope}">${icon('user-plus')}<span>Contact</span></button></div><div class="cards">${contacts.length ? contacts.map(x => `<article class="card" data-filter-row><span class="badge">${e(x.category)}</span><h3>${e(x.name)}</h3><p>${e(x.hours)}</p><a href="tel:${e(String(x.phone).replace(/[^+\d]/g, ''))}">${e(x.phone)}</a></article>`).join('') : empty('No contacts saved.', 'contact', 'Add contact')}</div>`;
  }

  function lifeDueState(record) {
    if (!record.dueDate || ['done', 'paid', 'complete'].includes(record.status)) return '';
    const days = Math.ceil((new Date(`${record.dueDate}T00:00`) - new Date(`${today()}T00:00`)) / 86400000);
    if (days < 0) return 'overdue';
    if (days <= 30) return 'soon';
    return '';
  }

  function lifeStatus(value) {
    const safe = ['planning', 'pending', 'active', 'due', 'paid', 'done'].includes(value) ? value : 'pending';
    const className = safe === 'due' ? 'danger' : ['planning', 'pending'].includes(safe) ? 'warning' : '';
    return `<span class="badge ${className}">${e(safe[0].toUpperCase() + safe.slice(1))}</span>`;
  }

  function lifeHub() {
    const records = HM.life.ensure();
    const configs = HM.life.domains;
    const dueSoon = records.filter(record => ['overdue', 'soon'].includes(lifeDueState(record)));
    const open = records.filter(record => !['done', 'paid', 'complete'].includes(record.status));
    const annual = records.reduce((sum, record) => sum + (+record.amount || 0) * (record.frequency === 'Monthly' ? 12 : record.frequency === 'Quarterly' ? 4 : record.frequency === 'Half-yearly' ? 2 : 1), 0);
    const groups = [...new Set(Object.values(configs).map(config => config.group))];
    return `<section class="panel privacy-banner"><div>${icon('shield-alert')}<div><h2>Private family registry</h2><p>This browser storage is not encrypted. Use masked references only; never save full Aadhaar, PAN, account credentials, passwords, PINs, OTPs or document scans.</p></div></div><button data-route="global/settings">Privacy details</button></section>
      <section class="metrics">${metric('Life records', records.length, `${Object.keys(configs).length} family domains`, 'layout-grid')}${metric('Due in 30 days', dueSoon.length, 'Renewals and commitments', 'calendar-warning')}${metric('Active items', open.length, 'Across the household', 'activity')}${metric('Tracked commitments', D.money(annual), 'Estimated annual value', 'indian-rupee')}</section>
      ${groups.map(group => `<section class="life-section"><div class="section-head"><div><h2>${e(group)}</h2><p>Dedicated registers with shared reminders and search</p></div></div><div class="life-domain-grid">${Object.entries(configs).filter(([, config]) => config.group === group).map(([key, config]) => { const items = records.filter(record => record.domain === key); const alerts = items.filter(record => lifeDueState(record)); return `<button class="card life-domain-card" data-route="home/life/${key}"><span class="life-icon">${icon(config.icon)}</span><span class="grow"><b>${e(config.title)}</b><small>${e(config.note)}</small></span><span class="life-count ${alerts.length ? 'attention' : ''}">${alerts.length || items.length}</span></button>`; }).join('')}</div></section>`).join('')}`;
  }

  function lifeDomain(domain) {
    const config = HM.life.domains[domain];
    if (!config) return lifeHub();
    const records = HM.life.ensure().filter(record => record.domain === domain);
    const alerts = records.filter(record => lifeDueState(record));
    const total = records.reduce((sum, record) => sum + (+record.amount || 0), 0);
    return `<section class="domain-hero"><span class="life-icon large">${icon(config.icon)}</span><div class="grow"><small>${e(config.group)}</small><h2>${e(config.title)}</h2><p>${e(config.note)}</p></div><button class="primary" data-create="life" data-domain="${domain}">${icon('plus')}<span>Add ${e(config.noun)}</span></button></section>
      <section class="metrics compact-metrics">${metric('Records', records.length, config.title, config.icon)}${metric('Needs attention', alerts.length, 'Due or overdue', 'calendar-warning')}${metric('Tracked value', D.money(total), 'Current records', 'indian-rupee')}${metric('Completed', records.filter(record => ['done', 'paid', 'complete'].includes(record.status)).length, 'Closed items', 'circle-check-big')}</section>
      <div class="toolbar"><input data-filter aria-label="Search ${e(config.title)}" placeholder="Search ${e(config.title.toLowerCase())}"><select data-status-filter aria-label="Filter by status"><option value="">All statuses</option><option value="planning">Planning</option><option value="pending">Pending</option><option value="active">Active</option><option value="due">Due</option><option value="paid">Paid</option><option value="done">Done</option></select><button data-route="home/life">All life records</button></div>
      <section class="panel life-register">${records.length ? `<table class="table"><thead><tr><th>Record</th><th>Owner</th><th>Provider / reference</th><th>Due</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(record => { const dueState = lifeDueState(record); return `<tr data-filter-row data-status="${e(record.status)}"><td data-label="Record"><b>${e(record.title)}</b><small>${e(record.category || config.title)}</small></td><td data-label="Owner">${e(record.owner || 'Family')}</td><td data-label="Provider"><span>${e(record.provider || 'Not set')}</span><small>${e(record.reference || '')}</small></td><td data-label="Due"><span class="badge ${dueState === 'overdue' ? 'danger' : dueState === 'soon' ? 'warning' : ''}">${D.date(record.dueDate)}</span></td><td data-label="Amount">${record.amount ? D.money(record.amount) : '-'}</td><td data-label="Status"><button data-life-status="${e(record.id)}">${lifeStatus(record.status)}</button></td><td data-label="Actions"><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(record.title)}" data-edit="life" data-id="${e(record.id)}" data-domain="${domain}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(record.title)}" data-delete="lifeRecords:${e(record.id)}">${icon('trash-2')}</button></span></td></tr>`; }).join('')}</tbody></table>` : empty(`No ${config.title.toLowerCase()} records yet.`, 'life', `Add ${config.noun}`)}</section>`;
  }

  function matrixExplorer(route) {
    const code = route.split('/')[1] || '11';
    const branch = HM.hierarchy.branch(code);
    if (!branch) return `<section class="panel"><h2>Unknown hierarchy branch</h2><p>This code is not part of the seven-level family matrix.</p><button data-route="matrix/11">Open the matrix</button></section>`;
    const current = branch.nodes[branch.nodes.length - 1];
    const remainingLeaves = 7 ** (7 - code.length);
    const path = branch.nodes.map((node, index) => {
      const nodeCode = code.slice(0, index + 1);
      const navigable = index > 0;
      return `<${navigable ? 'button' : 'span'} ${navigable ? `data-route="matrix/${nodeCode}" data-area="${branch.areaKey}"` : ''}><small>${e(node.growth)}</small><b>${e(node.label)}</b></${navigable ? 'button' : 'span'}>`;
    }).join('<i data-lucide="chevron-right"></i>');
    const moduleButton = branch.major.moduleRoute ? `<button data-route="${branch.major.moduleRoute}" data-area="${branch.areaKey}">${icon('external-link')}<span>Open working module</span></button>` : '';
    const children = branch.next ? branch.next.children.map((child, index) => {
      const childCode = `${code}${index + 1}`;
      return `<button class="matrix-node" data-route="matrix/${childCode}" data-area="${branch.areaKey}"><span class="matrix-code">${childCode}</span><span class="matrix-node-icon">${icon('git-branch')}</span><span class="grow"><b>${e(child[0])}</b><small>${e(child[1])}</small></span><i data-lucide="arrow-right"></i></button>`;
    }).join('') : '';
    const lifecycle = HM.hierarchy.levels[7].children[Number(code[6]) - 1];
    return `<section class="matrix-hero"><div class="matrix-hero-main"><span class="matrix-seed">${icon(branch.area.icon)}</span><div><small>${e(branch.area.label)} · System ${e(branch.major.code)}</small><h2>${e(branch.major.label)}</h2><p>${e(branch.major.description)}</p></div></div><div class="matrix-actions">${moduleButton}<button data-route="global/overview">${icon('layout-dashboard')}<span>Today</span></button></div></section>
      <nav class="branch-path" aria-label="Current hierarchy path">${path}</nav>
      <section class="metrics compact-metrics">${metric('Current level', `${code.length} of 7`, `${current.scale || 'Major'} · ${current.growth}`, 'layers-3')}${metric('Node code', code, 'Traceable requirement key', 'binary')}${metric('Children here', branch.next ? 7 : 0, branch.next ? `${branch.next.scale} · ${branch.next.growth}` : 'Atomic leaf', 'git-fork')}${metric('Leaves below', remainingLeaves.toLocaleString('en-IN'), 'Exact atomic paths', 'network')}</section>
      ${branch.next ? `<section class="matrix-level-head"><div><span>${e(branch.next.growth)}</span><h2>${e(branch.next.scale)} capabilities</h2><p>${e(branch.next.purpose)}. Select one of the seven child nodes to continue.</p></div><strong>7</strong></section><section class="matrix-grid">${children}</section>` : `<section class="panel atomic-detail"><span class="badge">Atomic requirement ${e(code)}</span><h2>${e(lifecycle[0])}</h2><p>${e(lifecycle[1])}</p><div class="atomic-summary">${branch.nodes.slice(2).map(node => `<div><small>${e(node.scale)}</small><b>${e(node.label)}</b></div>`).join('')}</div><p class="matrix-disclosure">This leaf is a requirements-coverage state, not a claim that an external integration or automated workflow is implemented.</p></section>`}
      <section class="matrix-disclosure"><b>Coverage model</b><span>The complete workbook defines 823,543 atomic paths. Home Manager generates each branch from its code and shows working modules only where functionality exists.</span></section>`;
  }

  function communityOverview() {
    const s = D.state;
    const events = s.events.filter(x => x.context === 'community' && isoDay(x.startAt) >= today());
    const tickets = s.issues.filter(x => x.scope === 'civic' && D.status(x.status) !== 'done');
    return `<section class="panel"><span class="badge warning">Local-only workspace</span><h2>Your personal community planner</h2><p>News, votes, registrations and tickets stay in this browser. They are not submitted to external organisations.</p></section><section class="metrics">${metric('Saved updates', s.newsItems.length, 'Personal notes', 'newspaper')}${metric('Upcoming events', events.length, 'Local plans', 'calendar-heart')}${metric('Ticket follow-ups', tickets.length, 'Personal log', 'ticket-check')}${metric('Volunteer plans', s.volunteerOpportunities.length, 'Opportunities', 'hand-heart')}</section><div class="grid-2"><section class="panel"><div class="section-head"><h2>Latest notes</h2><button data-route="community/feed">Open feed</button></div>${s.newsItems.map(x => row(x.title, `${x.category} - ${D.date(x.date)}`)).join('')}</section><section class="panel"><div class="section-head"><h2>Community agenda</h2><button data-route="community/events">Calendar</button></div>${events.map(x => row(x.title, `${D.date(x.startAt)} - ${x.venue}`)).join('') || '<p class="empty">No upcoming events.</p>'}</section></div>`;
  }

  function feed() {
    return `<div class="toolbar"><input data-filter aria-label="Search saved news and discussions" placeholder="Search saved notes"><button class="primary" data-create="discussion">${icon('plus')}<span>Discussion</span></button><button data-create="news">Add news note</button></div><div class="grid-2"><section><div class="section-head"><h2>Neighbourhood notes</h2></div>${D.state.newsItems.map(x => `<article class="card panel" data-filter-row><span class="badge">${e(x.category)}</span><h3>${e(x.title)}</h3><p>${e(x.body)}</p><small>${D.date(x.date)}</small></article>`).join('')}</section><section><div class="section-head"><h2>Forum notes</h2></div>${D.state.discussions.map(x => `<article class="card panel" data-filter-row><span class="badge">${e(x.author)}</span><h3>${e(x.title)}</h3><p>${e(x.body)}</p><footer><button data-like="${e(x.id)}">Appreciate - ${+x.likes || 0}</button><button class="danger-action" data-delete="discussions:${e(x.id)}">Remove</button></footer></article>`).join('')}</section></div>`;
  }

  function polls() {
    return `<div class="cards">${D.state.polls.map(poll => { const total = poll.options.reduce((sum, x) => sum + (+x.votes || 0), 0); return `<article class="card"><span class="context-badge community">Local preference</span><h3>${e(poll.title)}</h3>${poll.options.map((option, index) => { const percent = total ? Math.round((+option.votes || 0) / total * 100) : 0; return `<button class="poll-option" data-vote="${e(poll.id)}:${index}"><i style="width:${percent}%"></i><span>${e(option.name)} - ${percent}%</span></button>`; }).join('')}<small>${total} votes stored in this browser</small></article>`; }).join('')}</div>`;
  }

  function volunteer() {
    return `<div class="section-head"><div><h2>Personal participation plan</h2><p>Registration status is not sent externally</p></div><button class="primary" data-create="volunteer">${icon('plus')}<span>Opportunity</span></button></div><div class="cards">${D.state.volunteerOpportunities.map(x => `<article class="card"><span class="badge">${e(x.category)}</span><h3>${e(x.title)}</h3><p>${D.date(x.date)} - ${e(x.needed)} people needed</p><footer><button data-register="${e(x.id)}">${x.registered ? 'Planned' : 'Add to my plan'}</button></footer></article>`).join('')}</div>`;
  }

  function tickets() {
    const tickets = D.state.issues.filter(x => x.scope === 'civic');
    return `<section class="panel"><span class="badge warning">Personal tracking only</span><p>These records do not submit issues to a civic authority.</p></section><div class="toolbar"><input data-filter aria-label="Search civic follow-ups" placeholder="Search follow-ups"><button class="primary" data-create="issue" data-scope="civic">${icon('plus')}<span>Follow-up</span></button></div><section class="panel"><table class="table"><thead><tr><th>Reference</th><th>Issue</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead><tbody>${tickets.map(x => `<tr data-filter-row><td data-label="Reference"><b>${e(x.ticketNo || 'Local')}</b></td><td data-label="Issue">${e(x.title)}<small>${e(x.category)}</small></td><td data-label="Location">${e(x.location)}</td><td data-label="Status"><button data-advance="${e(x.id)}">${status(x.status)}</button></td><td data-label="Actions"><button class="icon-action danger-action" aria-label="Delete ${e(x.title)}" data-delete="issues:${e(x.id)}">${icon('trash-2')}</button></td></tr>`).join('')}</tbody></table></section>`;
  }

  function guides() {
    return `<div class="cards">${D.state.guides.map(x => `<article class="card"><span class="context-badge community">Guide</span><h3>${e(x.title)}</h3><p>${e(x.body)}</p><footer><button data-open-guide="${e(x.id)}">${x.read ? 'Read' : 'Mark as read'}</button></footer></article>`).join('')}</div>`;
  }

  function studyOverview() {
    const topics = D.state.learningTopics;
    const average = topics.length ? Math.round(topics.reduce((sum, x) => sum + clamp(x.proficiency), 0) / topics.length) : 0;
    const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - 6);
    const minutes = D.state.focusSessions.filter(x => x.date >= weekStart.toISOString().slice(0, 10)).reduce((sum, x) => sum + (+x.minutes || 0), 0);
    return `<section class="metrics">${metric('Syllabus topics', topics.length, 'All subjects', 'book-open-check')}${metric('Mastered', topics.filter(x => x.status === 'done').length, 'Completed topics', 'badge-check')}${metric('Average proficiency', `${average}%`, 'Self-assessed', 'gauge')}${metric('Weekly focus', `${minutes} min`, 'Last 7 days', 'timer-reset')}</section><div class="grid-2"><section class="panel"><div class="section-head"><h2>Subject progress</h2><button data-route="study/analytics">Analytics</button></div>${['Physics', 'Chemistry', 'Mathematics'].map(subject => { const items = topics.filter(x => x.subject === subject); const progress = items.length ? Math.round(items.reduce((sum, x) => sum + clamp(x.proficiency), 0) / items.length) : 0; return `<div class="row"><b style="width:100px">${subject}</b><div class="progress grow" role="progressbar" aria-label="${subject} proficiency" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="width:${progress}%"></span></div><b>${progress}%</b></div>`; }).join('')}</section><section class="panel"><div class="section-head"><h2>Due next</h2><button data-route="study/tasks">Tasks</button></div>${D.state.tasks.filter(x => x.context === 'study' && D.status(x.status) !== 'done').map(x => row(x.title, `${x.category} - ${D.date(x.dueAt)}`, status(x.status))).join('') || '<p class="empty">No study tasks due.</p>'}</section></div>`;
  }

  function board() {
    const topics = D.state.learningTopics;
    const columns = [['backlog', 'Backlog'], ['progress', 'In progress'], ['revision', 'Revision'], ['done', 'Mastered']];
    return `<div class="toolbar"><input data-filter aria-label="Search syllabus" placeholder="Search syllabus"><select id="subjectFilter" aria-label="Filter by subject"><option value="">All subjects</option><option>Physics</option><option>Chemistry</option><option>Mathematics</option></select><button class="primary" data-create="topic">${icon('plus')}<span>Topic</span></button></div><div class="kanban">${columns.map(([state, label]) => `<section class="kanban-column" data-drop="${state}"><h3>${label}<span class="badge">${topics.filter(x => x.status === state).length}</span></h3>${topics.filter(x => x.status === state).map(x => { const proficiency = clamp(x.proficiency); return `<article class="kanban-card" draggable="true" data-topic="${e(x.id)}" data-filter-row data-subject="${e(x.subject)}"><b>${e(x.title)}</b><small>${e(x.subject)} - ${e(x.chapter)}</small><div class="progress" role="progressbar" aria-label="${e(x.title)} proficiency" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${proficiency}"><span style="width:${proficiency}%"></span></div><small>${+x.plannedHours || 0}h planned - ${proficiency}%</small><select data-topic-status="${e(x.id)}" aria-label="Move ${e(x.title)}"><option value="backlog" ${state === 'backlog' ? 'selected' : ''}>Backlog</option><option value="progress" ${state === 'progress' ? 'selected' : ''}>In progress</option><option value="revision" ${state === 'revision' ? 'selected' : ''}>Revision</option><option value="done" ${state === 'done' ? 'selected' : ''}>Mastered</option></select></article>`; }).join('')}</section>`).join('')}</div>`;
  }

  function goals() {
    const goals = D.state.goals.filter(x => x.context === 'study');
    return `<div class="section-head"><h2>Active milestones</h2><button class="primary" data-create="goal">${icon('plus')}<span>Goal</span></button></div>${goals.map(x => { const target = Math.max(1, +x.target || 1); const progress = Math.max(0, +x.progress || 0); const percent = clamp(Math.round(progress / target * 100)); return `<article class="panel"><div class="row"><div class="grow"><b>${e(x.title)}</b><small>Due ${D.date(x.dueAt)} - ${progress}/${target}</small><div class="progress" role="progressbar" aria-label="${e(x.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div></div><b>${percent}%</b><button data-progress="${e(x.id)}">+1</button></div></article>`; }).join('') || empty('No study goals yet.', 'goal', 'Add goal')}`;
  }

  let timerSeconds = 25 * 60;
  let timerId = null;
  function focus() {
    return `<section class="panel timer"><span class="context-badge study">Focus session</span><div class="clock" id="clock" role="timer" aria-live="polite">${format(timerSeconds)}</div><p>Completed focus sessions are recorded in local study analytics.</p><div class="timer-actions"><button id="timerToggle" class="primary">${icon(timerId ? 'pause' : 'play')}<span>${timerId ? 'Pause' : 'Start'}</span></button><button data-timer="reset">Reset</button><button data-timer="5">5 min break</button><button data-timer="25">25 min focus</button></div></section>`;
  }
  function format(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }

  function analytics() {
    const sessions = D.state.focusSessions.slice().sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(-7);
    const topics = D.state.learningTopics;
    return `<section class="metrics">${metric('Focus sessions', D.state.focusSessions.length, 'Recorded locally', 'timer')}${metric('Focus minutes', D.state.focusSessions.reduce((sum, x) => sum + (+x.minutes || 0), 0), 'All time', 'clock-3')}${metric('Mastered topics', topics.filter(x => x.status === 'done').length, 'Syllabus progress', 'badge-check')}${metric('Active goals', D.state.goals.filter(x => x.context === 'study').length, 'Milestones', 'target')}</section><div class="grid-2"><section class="panel"><h2>Recent focus minutes</h2><div class="chart" aria-label="Recent focus minutes">${sessions.map(x => `<div style="height:${Math.max(4, (+x.minutes || 0) / 90 * 100)}%"><span>${D.date(x.date, { weekday: 'short' })}</span></div>`).join('')}</div></section><section class="panel"><h2>Topic proficiency</h2>${topics.map(x => { const proficiency = clamp(x.proficiency); return `<div class="row"><div class="grow"><b>${e(x.title)}</b><small>${e(x.subject)}</small><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${proficiency}"><span style="width:${proficiency}%"></span></div></div><b>${proficiency}%</b></div>`; }).join('')}</section></div>`;
  }

  function settings() {
    return `<section class="panel"><h2>Appearance and data</h2><div class="row"><div class="grow"><b>Aurora contrast theme</b><small>Switch between luminous and dark glass</small></div><button id="settingsTheme">Toggle</button></div><div class="row"><div class="grow"><b>Export unified data</b><small>Download every locally stored record</small></div><button id="exportData">Export JSON</button></div><div class="row"><div class="grow"><b>Import backup</b><small>Validate and restore a Home Manager export</small></div><label class="primary" style="padding:8px 11px;cursor:pointer">Choose file<input id="importData" type="file" accept="application/json" hidden></label></div><div class="row"><div class="grow"><b>Reset demonstration data</b><small>Remove local changes from all workspaces</small></div><button id="resetData" class="danger-action">Reset</button></div></section><section class="panel"><h2>Privacy and storage</h2><p>Home Manager is a static, local-first application. Records are stored only in this browser unless you export them. Community votes, registrations and ticket references are personal planning records and are not sent to outside services.</p></section><section class="panel"><h2>Repository consolidation</h2><p>This app combines household, community and study source lineages into one static HTML, CSS and JavaScript product.</p></section>`;
  }

  function render(route) {
    if (route.startsWith('matrix/')) return matrixExplorer(route);
    if (route === 'global/overview') return unified();
    if (route === 'global/settings') return settings();
    if (route === 'home/life') return lifeHub();
    if (route.startsWith('home/life/')) return lifeDomain(route.split('/')[2]);
    const map = {
      'home/overview': homeOverview,
      'home/tasks': () => taskView('home'),
      'home/calendar': () => calendar('all'),
      'home/family': family,
      'home/finance': finance,
      'home/inventory': inventory,
      'home/assets': assets,
      'home/wisdom': wisdom,
      'home/directory': () => directory('home'),
      'community/overview': communityOverview,
      'community/feed': feed,
      'community/events': () => calendar('community'),
      'community/polls': polls,
      'community/volunteer': volunteer,
      'community/tickets': tickets,
      'community/directory': () => directory('community'),
      'community/guides': guides,
      'study/overview': studyOverview,
      'study/board': board,
      'study/schedule': () => calendar('study'),
      'study/tasks': () => taskView('study'),
      'study/goals': goals,
      'study/focus': focus,
      'study/analytics': analytics
    };
    return (map[route] || unified)();
  }

  window.HM.views = {
    nav,
    titles,
    render,
    shiftCalendar,
    get timer() { return { seconds: timerSeconds, id: timerId }; },
    setTimer(seconds, id) { timerSeconds = seconds; timerId = id; },
    format
  };
})();
