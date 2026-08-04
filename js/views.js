(function () {
  const D = HM.data;
  const e = D.esc;

  const groups = {
    today: { label: 'Today', icon: 'sparkles', note: 'What needs attention now', route: 'global/overview', items: [
      ['Today', 'sparkles', 'global/overview'], ['Help & Guide', 'circle-help', 'global/questions']
    ]},
    household: { label: 'Household', icon: 'house', note: 'Run the home', route: 'home/overview', items: [
      ['Overview', 'layout-dashboard', 'home/overview'], ['Tasks & routines', 'list-checks', 'home/tasks'], ['Food & supplies', 'shopping-basket', 'home/inventory'], ['Property & repairs', 'wrench', 'home/property'], ['Vehicles', 'car-front', 'home/life/vehicles'], ['Domestic help', 'hand-helping', 'home/life/help'], ['Sustainability', 'leaf', 'home/life/sustainability']
    ]},
    family: { label: 'Family', icon: 'users-round', note: 'Plans and togetherness', route: 'home/calendar', items: [
      ['Calendar', 'calendar-days', 'home/calendar'], ['Family pulse', 'heart-handshake', 'home/family'], ['Travel', 'luggage', 'home/life/travel'], ['Celebrations', 'party-popper', 'home/life/festivals']
    ]},
    money: { label: 'Money', icon: 'indian-rupee', note: 'Finances and protection', route: 'home/finance', items: [
      ['Spending', 'wallet-cards', 'home/finance'], ['Bills', 'receipt-indian-rupee', 'home/life/bills'], ['Insurance', 'shield-check', 'home/life/insurance'], ['Tax dates', 'landmark', 'home/life/tax'], ['Subscriptions', 'repeat-2', 'home/life/subscriptions']
    ]},
    care: { label: 'Care', icon: 'heart-handshake', note: 'Health and safety', route: 'home/life/health', items: [
      ['Health', 'heart-pulse', 'home/life/health'], ['Emergency', 'siren', 'home/life/emergency'], ['Pets', 'paw-print', 'home/life/pets']
    ]},
    learning: { label: 'Learning', icon: 'graduation-cap', note: 'Study and development', route: 'study/overview', items: [
      ['Overview', 'graduation-cap', 'study/overview'], ['Study Board', 'columns-3', 'study/board'], ['Schedule', 'calendar-clock', 'study/schedule'], ['Tasks', 'list-todo', 'study/tasks'], ['Goals', 'target', 'study/goals'], ['Focus', 'timer', 'study/focus'], ['Analytics', 'chart-spline', 'study/analytics']
    ]},
    community: { label: 'Community', icon: 'map-pinned', note: 'Local participation', route: 'community/overview', items: [
      ['Overview', 'map', 'community/overview'], ['Updates', 'newspaper', 'community/feed'], ['Events & polls', 'calendar-heart', 'community/participate'], ['Volunteer', 'hand-heart', 'community/volunteer'], ['Civic issues', 'ticket-check', 'community/tickets'], ['Local services', 'life-buoy', 'community/directory'], ['Guides', 'book-marked', 'community/guides']
    ]}
  };

  const settingsGroups = [
    ['household', 'Household profile', 'house', 'Home address, language and family defaults'],
    ['people', 'People & roles', 'users-round', 'Members, caregivers, contacts and consent'],
    ['home', 'Home & services', 'building-2', 'Property, vehicles, domestic help and providers'],
    ['money', 'Money setup', 'wallet-cards', 'Policies, tax profiles and recurring commitments'],
    ['health', 'Health & safety', 'heart-pulse', 'Health profiles, doctors, pets and emergency plan'],
    ['records', 'Records & legacy', 'folders', 'Documents, digital household and nominees'],
    ['app', 'App & data', 'settings-2', 'Nature backgrounds, Google sync, privacy and backup']
  ];

  const natureBackgrounds = [
    ['waterfall', 'Waterfall mist'], ['river', 'River glass'], ['fern', 'Fern canopy'],
    ['meadow', 'Morning meadow'], ['lotus', 'Lotus pond'], ['monsoon', 'Monsoon sky'],
    ['sunrise', 'Sunrise grove'], ['glacier', 'Glacier lake'], ['bamboo', 'Bamboo light'],
    ['sky', 'Open sky'], ['grove', 'Mango grove'], ['wildflower', 'Wildflower field']
  ];

  const titles = {
    'global/overview': ['Today', 'Your home command center'],
    'global/questions': ['Help & Guide', 'Purpose, workflows and product answers'],
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
    'home/property': ['Property & Repairs', 'Maintenance, utilities and home records'],
    'community/overview': ['Community Overview', 'Your local personal planner'],
    'community/feed': ['News & Forum', 'Locally stored neighbourhood notes'],
    'community/events': ['Community Events', 'Meetings, markets and local activities'],
    'community/polls': ['Community Polls', 'Preferences stored in this browser'],
    'community/volunteer': ['Volunteer', 'Personal participation planner'],
    'community/tickets': ['Civic Tickets', 'Personal issue follow-up log'],
    'community/directory': ['Community Services', 'Essential local contacts'],
    'community/guides': ['Civic Guides', 'Self-service local information'],
    'community/participate': ['Events & Polls', 'Plans and local preferences'],
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
    titles[`settings/life/${key}`] = [config.title, `Settings · ${config.note}`];
  });
  settingsGroups.forEach(item => { titles[`settings/${item[0]}`] = [item[1], item[3]]; });

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
    const lowStock = s.inventoryItems.filter(x => (+x.quantity || 0) <= 2);
    const month = day.slice(0, 7);
    const monthSpend = s.expenses.filter(x => isoDay(x.date).startsWith(month)).reduce((sum, x) => sum + (+x.amount || 0), 0);
    const lifeRecords = HM.life.ensure();
    const horizonDate = new Date(); horizonDate.setDate(horizonDate.getDate() + 30);
    const horizon = horizonDate.toISOString().slice(0, 10);
    const lifeDue = lifeRecords.filter(x => x.dueDate && x.dueDate <= horizon && !['done', 'paid'].includes(x.status)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const agenda = [
      ...openTasks.map(x => ({ kind: 'task', id: x.id, date: isoDay(x.dueAt), context: x.context, title: x.title, detail: x.category, owner: x.assignee || 'Unassigned', route: taskRoute(x.context) })),
      ...upcomingEvents.map(x => ({ kind: 'event', date: isoDay(x.startAt), starts: x.startAt, context: x.context, title: x.title, detail: x.venue || 'No venue', owner: 'Family', route: eventRoute(x.context) })),
      ...lifeDue.map(x => ({ kind: 'due', date: x.dueDate, context: 'home', title: x.title, detail: HM.life.domains[x.domain]?.title || 'Family record', owner: x.owner || 'Family', route: `home/life/${x.domain}` }))
    ].filter(x => x.date).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 7);
    const issues = s.issues.filter(x => D.status(x.status) !== 'done');
    const mealsToday = s.meals.filter(x => isoDay(x.date) === day);
    const weekDays = Array.from({ length: 7 }, (_, index) => {
      const value = new Date(`${day}T00:00`);
      value.setDate(value.getDate() + index);
      const iso = value.toISOString().slice(0, 10);
      return { iso, value, count: upcomingEvents.filter(item => isoDay(item.startAt) === iso).length };
    });
    const people = s.people.slice(0, 6);
    const nextMeal = mealsToday[0] || s.meals.filter(x => isoDay(x.date) > day).sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
    const ownerClass = owner => `person-${Math.max(0, s.people.findIndex(person => person.name === owner)) % 6}`;
    const dayLabel = value => value === day ? 'Today' : value === weekDays[1].iso ? 'Tomorrow' : new Date(`${value}T00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
    const timeLabel = item => item.kind === 'event' && item.starts ? new Date(item.starts).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) : item.kind === 'due' ? 'Due' : 'Any time';

    return `<section class="today-heading">
        <div><span class="eyebrow">${icon('sunrise')} ${e(new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }))}</span><h2>Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}</h2><p>Here is what the family needs today.</p></div>
        <button class="primary today-add" data-create="task" data-context="home">${icon('plus')}<span>Add task</span></button>
      </section>
      <section class="family-filter" aria-label="Filter the agenda by family member">
        <button class="active" data-agenda-person="all" aria-pressed="true"><span class="member-avatar all">${icon('users-round')}</span><span>Everyone</span></button>
        ${people.map((person, index) => `<button data-agenda-person="${e(person.name.toLowerCase())}" aria-pressed="false"><span class="member-avatar person-${index % 6}">${e(person.name[0])}</span><span>${e(person.name.split(' ')[0])}</span></button>`).join('')}
      </section>
      <section class="household-status" aria-label="Household status">
        <button data-route="home/tasks"><span class="status-icon teal">${icon('list-checks')}</span><span><small>Open tasks</small><b>${openTasks.length}</b></span><em>${overdue.length ? `${overdue.length} overdue` : 'On track'}</em></button>
        <button data-route="home/calendar"><span class="status-icon violet">${icon('calendar-days')}</span><span><small>Coming up</small><b>${upcomingEvents.length}</b></span><em>Events</em></button>
        <button data-route="home/inventory"><span class="status-icon green">${icon('shopping-basket')}</span><span><small>Low stock</small><b>${lowStock.length}</b></span><em>Items</em></button>
        <button data-route="home/finance"><span class="status-icon purple">${icon('indian-rupee')}</span><span><small>This month</small><b>${D.money(monthSpend)}</b></span><em>Spending</em></button>
      </section>
      <div class="family-board">
        <section class="day-plan">
          <div class="board-heading"><div><span class="section-kicker">THE FAMILY PLAN</span><h2>Today and next</h2></div><button data-route="home/calendar">Open calendar ${icon('arrow-right')}</button></div>
          <div class="agenda-list">
            ${agenda.length ? agenda.map(item => `<article class="agenda-item" data-agenda-owner="${e(item.owner.toLowerCase())}">
              <div class="agenda-when"><b>${e(dayLabel(item.date))}</b><small>${e(timeLabel(item))}</small></div>
              ${item.kind === 'task' ? `<input type="checkbox" aria-label="Complete ${e(item.title)}" data-complete="task:${e(item.id)}">` : `<span class="agenda-kind ${item.kind}">${icon(item.kind === 'event' ? 'calendar-days' : 'bell-ring')}</span>`}
              <button class="agenda-content" data-route="${item.route}"><b>${e(item.title)}</b><small>${e(item.detail)}</small></button>
              <span class="agenda-owner ${ownerClass(item.owner)}" title="${e(item.owner)}">${e(item.owner === 'Unassigned' ? '?' : item.owner[0])}</span>
            </article>`).join('') : empty('Nothing is scheduled. Add the first family task.', 'task', 'Add task')}
            <div id="agendaFilterEmpty" class="agenda-filter-empty" hidden>No scheduled items for this person.</div>
          </div>
          <button class="inline-add" data-create="task" data-context="home">${icon('plus')} Add another task</button>
        </section>
        <aside class="family-brief">
          <section class="week-glance"><div class="brief-heading"><div><span class="section-kicker">SHARED CALENDAR</span><h3>Next 7 days</h3></div><button class="icon-action" data-route="home/calendar" aria-label="Open calendar">${icon('chevron-right')}</button></div><div class="week-strip">
            ${weekDays.map((item, index) => `<button data-route="home/calendar" class="${index === 0 ? 'today' : ''}"><small>${e(item.value.toLocaleDateString('en-IN', { weekday: 'narrow' }))}</small><b>${item.value.getDate()}</b>${item.count ? `<i>${item.count}</i>` : '<span></span>'}</button>`).join('')}
          </div></section>
          <section class="family-load"><div class="brief-heading"><div><span class="section-kicker">WHO IS DOING WHAT</span><h3>Family handoff</h3></div><button class="icon-action" data-route="home/family" aria-label="Open family pulse">${icon('chevron-right')}</button></div>
            ${people.slice(0, 5).map((person, index) => { const count = openTasks.filter(task => task.assignee === person.name).length; return `<button data-agenda-person="${e(person.name.toLowerCase())}"><span class="member-avatar person-${index % 6}">${e(person.name[0])}</span><span class="grow"><b>${e(person.name)}</b><small>${e(person.householdRole)}</small></span><strong>${count}<small>tasks</small></strong></button>`; }).join('')}
          </section>
          <section class="home-brief"><div class="brief-heading"><div><span class="section-kicker">HOME BRIEF</span><h3>Meals, stock and dues</h3></div></div>
            <button data-route="home/inventory"><span class="brief-icon meal">${icon('cooking-pot')}</span><span class="grow"><small>${nextMeal && isoDay(nextMeal.date) === day ? 'Today\'s meal' : 'Next meal'}</small><b>${e(nextMeal?.name || 'Plan a meal')}</b></span>${icon('chevron-right')}</button>
            <button data-route="home/inventory"><span class="brief-icon stock">${icon('shopping-basket')}</span><span class="grow"><small>Shopping</small><b>${lowStock.length ? `${lowStock.length} low-stock item${lowStock.length === 1 ? '' : 's'}` : 'Supplies look good'}</b></span>${icon('chevron-right')}</button>
            <button data-route="home/life/bills"><span class="brief-icon bills">${icon('receipt-indian-rupee')}</span><span class="grow"><small>Bills and renewals</small><b>${lifeDue.length ? `${lifeDue.length} due in 30 days` : 'Nothing due soon'}</b></span>${icon('chevron-right')}</button>
            <button data-route="home/assets"><span class="brief-icon repair">${icon('wrench')}</span><span class="grow"><small>Repairs</small><b>${issues.filter(x => x.scope === 'household').length ? `${issues.filter(x => x.scope === 'household').length} open` : 'No open repairs'}</b></span>${icon('chevron-right')}</button>
          </section>
        </aside>
      </div>`;
  }

  function questionResult(question, index = 0) {
    const result = HM.questions.answer(question);
    const capture = result.capture;
    const captureAttrs = capture ? `data-create="${capture.kind}" ${capture.context ? `data-context="${capture.context}"` : ''} ${capture.domain ? `data-domain="${capture.domain}"` : ''} ${capture.scope ? `data-scope="${capture.scope}"` : ''}` : '';
    const statusLabels = { direct: 'Direct answer', workflow: 'Working workflow', settings: 'Setup answer', privacy: 'Privacy answer', boundary: 'Known boundary' };
    return `<details class="question-card" ${index === 0 ? 'open' : ''}>
      <summary><span class="question-icon">${icon(question.icon)}</span><span class="grow"><small>${e(question.role)} - ${e(question.categoryLabel)}</small><b>${e(question.text)}</b></span><span class="answer-status ${e(result.status)}">${e(statusLabels[result.status] || 'Mapped')}</span>${icon('chevron-down')}</summary>
      <div class="question-answer"><span>${icon(result.status === 'boundary' ? 'shield-alert' : result.status === 'privacy' ? 'shield-check' : result.status === 'workflow' ? 'workflow' : 'badge-check')}</span><div class="grow"><h3>${e(result.headline)}</h3><p>${e(result.detail)}</p><div class="question-actions"><button data-route="${e(result.route)}">Go to ${e((titles[result.route] || ['section'])[0])} ${icon('arrow-right')}</button>${capture ? `<button class="primary" ${captureAttrs}>${icon('plus')}<span>Start this action</span></button>` : ''}</div></div></div>
    </details>`;
  }

  function renderQuestionResults(query = '', category = 'all', role = 'all') {
    const results = HM.questions.search(query, category, role);
    return results.length ? results.map(questionResult).join('') : '<div class="empty"><p>No matching product question.</p><p>Try fewer words or choose another usability area.</p></div>';
  }

  function questionHub() {
    const Q = HM.questions;
    const audit = Q.questions.map(question => Q.answer(question)).reduce((counts, answer) => ({ ...counts, [answer.status]: (counts[answer.status] || 0) + 1 }), {});
    return `<section class="ask-heading"><div><span class="eyebrow">${icon('badge-check')} PRODUCT CHECK</span><h2>Can every family member understand and use it?</h2><p>Purpose, navigation, common workflows, trust and recovery are answered against the working interface.</p></div><span class="question-count"><b>${Q.questions.length}</b><small>product questions checked</small></span></section>
      <section class="question-coverage" aria-label="Product question coverage"><span><b>${audit.direct || 0}</b><small>direct answers</small></span><span><b>${audit.workflow || 0}</b><small>working workflows</small></span><span><b>${(audit.settings || 0) + (audit.privacy || 0)}</b><small>setup and data answers</small></span><span><b>${audit.boundary || 0}</b><small>honest boundaries</small></span></section>
      <section class="product-path" aria-label="Seven steps through Home Manager">
        ${[['sparkles', '1', 'See today', 'global/overview'], ['users-round', '2', 'Set up family', 'settings/people'], ['list-checks', '3', 'Assign work', 'home/tasks'], ['calendar-days', '4', 'Plan time', 'home/calendar'], ['wallet-cards', '5', 'Track money', 'home/finance'], ['heart-handshake', '6', 'Prepare care', 'settings/health'], ['database-backup', '7', 'Protect data', 'settings/app']].map(item => `<button data-route="${item[3]}"><span>${icon(item[0])}</span><small>${item[1]}</small><b>${item[2]}</b></button>`).join('')}
      </section>
      <section class="question-toolbar">
        <label class="question-search">${icon('search')}<span class="sr-only">Search product help</span><input id="questionQuery" autocomplete="off" placeholder="Try: How do I add a recurring task?"></label>
        <label><span class="sr-only">Usability area</span><select id="questionCategory"><option value="all">All 7 usability areas</option>${Q.sets.map(set => `<option value="${set.id}">${e(set.label)}</option>`).join('')}</select></label>
        <label><span class="sr-only">Family role</span><select id="questionRole"><option value="all">Every family member</option>${Q.roles.map(role => `<option>${e(role)}</option>`).join('')}</select></label>
      </section>
      <div class="question-layout"><aside><span class="section-kicker">USABILITY AUDIT</span><h3>Seven product tests</h3><p>Choose what you are trying to understand, do or trust.</p><div class="question-domain-list">${Q.sets.map(set => `<button data-question-category="${set.id}">${icon(set.icon)}<span>${e(set.label)}</span><b>${set.items.length}</b></button>`).join('')}</div><div class="privacy-note question-privacy"><b>Honest by design</b><p>Unsupported sync, reminders, accounts and integrations are identified as boundaries, not simulated features.</p></div></aside><section><div class="question-results-head"><div><span class="section-kicker">BEST MATCHES</span><h3 id="questionResultTitle">Common product questions</h3></div><small>Up to 7 answers</small></div><div id="questionResults" aria-live="polite">${renderQuestionResults()}</div></section></div>`;
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
    return `<div class="section-head"><div><h2>Family pulse</h2><p>A simple wellbeing check, not a competition.</p></div><button data-route="settings/people">Manage profiles</button></div><div class="cards">${s.people.map(person => `<article class="card"><span class="avatar">${e((person.name || '?')[0])}</span><h3>${e(person.name)}</h3><p>${e(person.householdRole)}</p><div class="row"><div class="grow"><small>Current wellbeing</small><b>${clamp(person.wellbeing)}%</b></div></div></article>`).join('')}</div>`;
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
    return `<div class="section-head"><div><h2>Repairs & maintenance</h2><p>Open work, ownership and follow-up.</p></div><span class="row-actions"><button data-route="settings/home">Asset settings</button><button class="primary" data-create="issue" data-scope="household">${icon('plus')}<span>Repair</span></button></span></div><section class="panel">${issues.length ? issues.map(x => row(x.title, `${x.category} - ${x.location}`, `<button data-advance="${e(x.id)}">${status(x.status)}</button>`)).join('') : empty('No maintenance issues.', 'issue', 'Report issue')}</section>`;
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

  function lifeDomain(domain, settingsMode = false) {
    const config = HM.life.domains[domain];
    if (!config) return lifeHub();
    const records = HM.life.ensure().filter(record => record.domain === domain);
    const alerts = records.filter(record => lifeDueState(record));
    const total = records.reduce((sum, record) => sum + (+record.amount || 0), 0);
    return `<section class="domain-hero"><span class="life-icon large">${icon(config.icon)}</span><div class="grow"><small>${e(config.group)}</small><h2>${e(config.title)}</h2><p>${e(config.note)}</p></div><button class="primary" data-create="life" data-domain="${domain}">${icon('plus')}<span>Add ${e(config.noun)}</span></button></section>
      <section class="metrics compact-metrics">${metric('Records', records.length, config.title, config.icon)}${metric('Needs attention', alerts.length, 'Due or overdue', 'calendar-warning')}${metric('Tracked value', D.money(total), 'Current records', 'indian-rupee')}${metric('Completed', records.filter(record => ['done', 'paid', 'complete'].includes(record.status)).length, 'Closed items', 'circle-check-big')}</section>
      <div class="toolbar"><input data-filter aria-label="Search ${e(config.title)}" placeholder="Search ${e(config.title.toLowerCase())}"><select data-status-filter aria-label="Filter by status"><option value="">All statuses</option><option value="planning">Planning</option><option value="pending">Pending</option><option value="active">Active</option><option value="due">Due</option><option value="paid">Paid</option><option value="done">Done</option></select><button data-route="${settingsMode ? 'settings/records' : 'global/overview'}">${settingsMode ? 'Back to settings' : 'Back to Today'}</button></div>
      <section class="panel life-register">${records.length ? `<table class="table"><thead><tr><th>Record</th><th>Owner</th><th>Provider / reference</th><th>Due</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(record => { const dueState = lifeDueState(record); return `<tr data-filter-row data-status="${e(record.status)}"><td data-label="Record"><b>${e(record.title)}</b><small>${e(record.category || config.title)}</small></td><td data-label="Owner">${e(record.owner || 'Family')}</td><td data-label="Provider"><span>${e(record.provider || 'Not set')}</span><small>${e(record.reference || '')}</small></td><td data-label="Due"><span class="badge ${dueState === 'overdue' ? 'danger' : dueState === 'soon' ? 'warning' : ''}">${D.date(record.dueDate)}</span></td><td data-label="Amount">${record.amount ? D.money(record.amount) : '-'}</td><td data-label="Status"><button data-life-status="${e(record.id)}">${lifeStatus(record.status)}</button></td><td data-label="Actions"><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(record.title)}" data-edit="life" data-id="${e(record.id)}" data-domain="${domain}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(record.title)}" data-delete="lifeRecords:${e(record.id)}">${icon('trash-2')}</button></span></td></tr>`; }).join('')}</tbody></table>` : empty(`No ${config.title.toLowerCase()} records yet.`, 'life', `Add ${config.noun}`)}</section>`;
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

  function settingsLink(title, note, route, iconName) {
    return `<button class="settings-link" data-route="${route}"><span>${icon(iconName)}</span><span class="grow"><b>${e(title)}</b><small>${e(note)}</small></span>${icon('chevron-right')}</button>`;
  }

  function appSettings(intro, settings) {
    const sync = settings.googleSync || {};
    const connectorReady = /^https:\/\//i.test(sync.connectorUrl || '');
    const accounts = Array.isArray(sync.accounts) ? sync.accounts : [];
    const connected = accounts.filter(account => account.status === 'connected').length;
    const accountFor = personId => accounts.find(account => account.personId === personId) || {};
    const categories = [
      ['bills', 'Bills & renewals'], ['travel', 'Travel & bookings'], ['school', 'School & learning'],
      ['health', 'Health appointments'], ['deliveries', 'Shopping & deliveries'], ['home', 'Home services'],
      ['government', 'Government & documents']
    ];
    return `${intro}
      <section class="panel appearance-panel"><div class="section-head"><div><h2>Nature background</h2><p>Choose a light landscape palette for the entire app.</p></div><span class="context-badge">12 options</span></div>
        <fieldset class="nature-picker"><legend class="sr-only">App background</legend>${natureBackgrounds.map(item => `<label class="nature-option nature-${item[0]}"><input type="radio" name="appBackground" value="${item[0]}" ${settings.appBackground === item[0] ? 'checked' : ''}><span aria-hidden="true">${icon('leaf')}</span><b>${item[1]}</b>${icon('check')}</label>`).join('')}</fieldset>
      </section>
      <form id="googleSyncSettings" class="panel sync-settings"><div class="section-head"><div><span class="section-kicker">GOOGLE & AUTOMATION</span><h2>Family account sync</h2><p>Connect each account owner separately and review extracted household updates before applying them.</p></div><span class="sync-state ${connectorReady ? connected ? 'connected' : 'pending' : 'required'}">${connectorReady ? connected ? `${connected} connected` : 'Awaiting accounts' : 'Secure connector required'}</span></div>
        <div class="sync-summary" aria-label="Google sync configuration"><span>${icon('users-round')}<b>${accounts.length}</b><small>mapped accounts</small></span><span>${icon('calendar-sync')}<b>${sync.calendarSync ? 'On' : 'Off'}</b><small>calendar import</small></span><span>${icon('mail-search')}<b>${sync.emailAnalysis ? 'On' : 'Off'}</b><small>email detection</small></span></div>
        <label class="connector-field">Secure connector URL<input id="googleConnectorUrl" name="connectorUrl" type="url" inputmode="url" placeholder="https://sync.your-domain.in" value="${e(sync.connectorUrl || '')}"><small>OAuth codes, refresh tokens, Gmail cursors and background jobs must stay on this HTTPS service.</small></label>
        <div class="sync-preferences"><label><input type="checkbox" name="calendarSync" ${sync.calendarSync ? 'checked' : ''}> Import Google Calendar events</label><label><input type="checkbox" name="emailAnalysis" ${sync.emailAnalysis ? 'checked' : ''}> Detect household updates in Gmail</label><label><input type="checkbox" name="autoSync" ${sync.autoSync ? 'checked' : ''}> Run automatic background sync</label><label><input type="checkbox" name="driveBackup" ${sync.driveBackup ? 'checked' : ''}> Store encrypted backups in Drive</label></div>
        <div class="section-head sync-subhead"><div><h3>Family accounts</h3><p>Every account owner must provide separate Google consent.</p></div></div><div class="google-members">${D.state.people.map(person => { const account = accountFor(person.id); const ready = connectorReady && account.email && account.consent; return `<div class="google-member" data-google-person="${e(person.id)}"><span class="member-avatar">${e(person.name[0])}</span><div class="grow"><b>${e(person.name)}</b><small>${e(person.householdRole)}</small><input data-google-email type="email" autocomplete="email" placeholder="Google account email" value="${e(account.email || '')}"></div><label class="consent-check"><input data-google-consent type="checkbox" ${account.consent ? 'checked' : ''}><span>Owner consent</span></label><span class="sync-state ${e(account.status || 'pending')}">${e(account.status === 'connected' ? 'Connected' : account.status === 'paused' ? 'Paused' : account.status === 'error' ? 'Needs attention' : 'Not connected')}</span><button type="button" data-google-connect="${e(person.id)}" ${ready ? '' : 'disabled'}>${icon('cloud')}<span>${account.status === 'connected' ? 'Reconnect' : 'Connect'}</span></button></div>`; }).join('')}</div>
        <fieldset class="detection-groups"><legend>Detect from email</legend>${categories.map(item => `<label><input type="checkbox" name="syncCategory" value="${item[0]}" ${(sync.categories || []).includes(item[0]) ? 'checked' : ''}><span>${icon('check')} ${item[1]}</span></label>`).join('')}</fieldset>
        <div class="sync-controls"><label>Look back<select name="lookbackDays"><option value="7" ${+sync.lookbackDays === 7 ? 'selected' : ''}>7 days</option><option value="30" ${+sync.lookbackDays === 30 ? 'selected' : ''}>30 days</option><option value="90" ${+sync.lookbackDays === 90 ? 'selected' : ''}>90 days</option></select></label><label>Apply policy<select name="reviewPolicy"><option value="review" ${sync.reviewPolicy !== 'rules' ? 'selected' : ''}>Review every suggestion</option><option value="rules" ${sync.reviewPolicy === 'rules' ? 'selected' : ''}>Auto-apply approved rules</option></select></label><button type="button" data-google-sync ${connectorReady && connected ? '' : 'disabled'}>${icon('refresh-cw')}<span>Sync now</span></button><button type="submit" class="primary">${icon('save')}<span>Save sync settings</span></button></div>
      </form>
      <section class="panel sync-boundary"><span>${icon('shield-check')}</span><div><b>Private connection boundary</b><p>This GitHub Pages app never stores Google tokens or email bodies. Gmail analysis requires a verified OAuth backend using restricted read-only permission. Finance, health, identity and legal suggestions always require review.</p></div></section>
      <section class="panel"><h2>Backup and local data</h2><div class="row"><div class="grow"><b>Export backup</b><small>Download every locally stored record and non-secret sync preference</small></div><button id="exportData">Export JSON</button></div><div class="row"><div class="grow"><b>Import backup</b><small>Validate and restore a Home Manager export</small></div><label class="primary file-button">Choose file<input id="importData" type="file" accept="application/json" hidden></label></div><div class="row"><div class="grow"><b>Reset demonstration data</b><small>Remove local changes from this browser</small></div><button id="resetData" class="danger-action">Reset</button></div></section>
      <section class="panel privacy-note"><b>Local storage is not encrypted</b><p>Do not store full identity numbers, passwords, banking credentials, document scans, medical reports or Google tokens. Exported backups must be stored securely.</p></section>`;
  }

  function settingsPage(section = 'household') {
    const settings = D.state.settings;
    const meta = settingsGroups.find(item => item[0] === section) || settingsGroups[0];
    const intro = `<section class="settings-intro"><span>${icon(meta[2])}</span><div><small>SETTINGS · STORED IN THIS BROWSER</small><h2>${e(meta[1])}</h2><p>${e(meta[3])}</p></div></section>`;
    if (section === 'household') return `${intro}<form id="householdSettings" class="panel settings-form"><div class="section-head"><div><h2>Home identity</h2><p>Enter once and update only when the household changes.</p></div><button class="primary" type="submit">${icon('save')}<span>Save</span></button></div><div class="form-grid"><label>Household name<input name="householdName" value="${e(settings.householdName || 'Shishyan Family')}"></label><label>Primary language<select name="language"><option ${settings.language === 'English' ? 'selected' : ''}>English</option><option ${settings.language === 'Tamil' ? 'selected' : ''}>Tamil</option><option ${settings.language === 'Hindi' ? 'selected' : ''}>Hindi</option><option ${settings.language === 'Malayalam' ? 'selected' : ''}>Malayalam</option><option ${settings.language === 'Telugu' ? 'selected' : ''}>Telugu</option><option ${settings.language === 'Kannada' ? 'selected' : ''}>Kannada</option></select></label><label class="wide">Home address and landmark<textarea name="primaryAddress" placeholder="Address visible on the emergency card">${e(settings.primaryAddress || '')}</textarea></label><label>Timezone<input name="timezone" value="${e(settings.timezone || 'Asia/Kolkata')}"></label><label>Food preference<input name="foodPreference" value="${e(settings.foodPreference || '')}" placeholder="Vegetarian, allergies, fasting preferences"></label></div></form>`;
    if (section === 'people') return `${intro}<section class="panel"><div class="section-head"><div><h2>Household members</h2><p>Profiles, roles and accessibility needs.</p></div><button class="primary" data-create="person">${icon('user-plus')}<span>Add member</span></button></div>${D.state.people.map(person => `<div class="row"><span class="avatar small-avatar">${e(person.name[0])}</span><div class="grow"><b>${e(person.name)}</b><small>${e(person.householdRole)}</small></div><button class="icon-action" aria-label="Edit ${e(person.name)}" data-edit="person" data-id="${e(person.id)}">${icon('pencil')}</button></div>`).join('')}</section><section class="settings-grid">${settingsLink('Family contacts', 'Doctors, schools, trusted people and providers', 'home/directory', 'contact-round')}${settingsLink('Family knowledge', 'Traditions, recipes and shared memories', 'home/wisdom', 'book-heart')}</section>`;
    if (section === 'home') return `${intro}
      <section class="settings-grid">
        ${settingsLink('Property & utilities', 'Home, occupancy and service references', 'settings/life/property', 'building-2')}
        ${settingsLink('Vehicles', 'Registration, insurance and service master', 'settings/life/vehicles', 'car-front')}
        ${settingsLink('Domestic help profiles', 'Roles, agreed schedule and contact details', 'settings/life/help', 'hand-helping')}
        ${settingsLink('Service directory', 'Vendors, repair contacts and availability', 'home/directory', 'contact-round')}
      </section>
      <section class="panel"><div class="section-head"><div><h2>Asset register</h2><p>Appliances, valuables and long-lived household items.</p></div><button class="primary" data-create="asset">${icon('plus')}<span>Add asset</span></button></div>
        ${D.state.assets.length ? D.state.assets.map(asset => `<div class="row"><span class="asset-icon">${icon('gem')}</span><div class="grow"><b>${e(asset.name)}</b><small>${e(asset.category)} - ${e(asset.status)}</small></div><b>${D.money(asset.value)}</b><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(asset.name)}" data-edit="asset" data-id="${e(asset.id)}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(asset.name)}" data-delete="assets:${e(asset.id)}">${icon('trash-2')}</button></span></div>`).join('') : empty('No assets recorded.', 'asset', 'Add asset')}
      </section>`;
    if (section === 'money') return `${intro}<section class="settings-grid">${settingsLink('Insurance policies', 'Provider, masked reference and renewal rule', 'settings/life/insurance', 'shield-check')}${settingsLink('Tax profiles', 'Taxpayer and filing references', 'settings/life/tax', 'landmark')}${settingsLink('Subscriptions', 'Recurring service definitions', 'settings/life/subscriptions', 'repeat-2')}${settingsLink('Bills and payment rules', 'Providers, recurrence and due dates', 'settings/life/bills', 'receipt-indian-rupee')}${settingsLink('Assets and valuables', 'Long-lived household value records', 'settings/home', 'gem')}</section><section class="panel privacy-note"><b>Keep payment secrets out</b><p>Never store UPI PINs, OTPs, CVVs, passwords or full account numbers in Home Manager.</p></section>`;
    if (section === 'health') return `${intro}<section class="settings-grid">${settingsLink('Health profiles', 'Providers, allergies and preventive care references', 'settings/life/health', 'heart-pulse')}${settingsLink('Emergency plan', 'Trusted contacts, instructions and review dates', 'settings/life/emergency', 'siren')}${settingsLink('Pets and animals', 'Profiles, vaccines and care providers', 'settings/life/pets', 'paw-print')}</section><section class="panel official-links"><div class="section-head"><div><h2>Trusted services</h2><p>Open official services; Home Manager does not copy their sensitive records.</p></div></div><a href="https://112.gov.in/" target="_blank" rel="noopener">India Emergency 112 ${icon('external-link')}</a><a href="https://abdm.gov.in/" target="_blank" rel="noopener">ABHA health records ${icon('external-link')}</a></section>`;
    if (section === 'records') return `${intro}<section class="settings-grid">${settingsLink('Documents & IDs', 'Masked references, holders, issuers and expiry', 'settings/life/documents', 'folders')}${settingsLink('Digital household', 'Devices, backups and account custody notes', 'settings/life/digital', 'cloud-cog')}${settingsLink('Nominees & legacy', 'Nomination and succession review', 'settings/life/legacy', 'scroll-text')}${settingsLink('Family knowledge', 'Recipes, traditions, manuals and memories', 'home/wisdom', 'library-big')}</section><section class="panel official-links"><div class="section-head"><div><h2>Official document wallet</h2><p>Use DigiLocker for authentic documents. Store only masked references here.</p></div></div><a href="https://www.digilocker.gov.in/" target="_blank" rel="noopener">Open DigiLocker ${icon('external-link')}</a></section>`;
    return appSettings(intro, settings);
  }

  function propertyHub() {
    return `<section class="section-head"><div><h2>Property & repairs</h2><p>Choose the changing work or the stable home record.</p></div></section><section class="choice-grid">${settingsLink('Repairs & maintenance', 'Open issues, contractors, costs and follow-up', 'home/assets', 'wrench')}${settingsLink('Property & utilities', 'Service dates, taxes and occupancy records', 'home/life/property', 'building-2')}</section>`;
  }

  function communityParticipate() {
    return `<section class="section-head"><div><h2>Events & polls</h2><p>Plan local activities or record a household preference.</p></div></section><section class="choice-grid">${settingsLink('Community events', 'Meetings, markets and neighbourhood activities', 'community/events', 'calendar-heart')}${settingsLink('Community polls', 'Preferences stored only in this browser', 'community/polls', 'chart-no-axes-column')}</section>`;
  }

  function render(route) {
    if (route === 'global/overview') return unified();
    if (route === 'global/questions') return questionHub();
    if (route === 'global/settings') return settingsPage('app');
    if (route.startsWith('settings/life/')) return lifeDomain(route.split('/')[2], true);
    if (route.startsWith('settings/')) return settingsPage(route.split('/')[1]);
    if (route === 'home/life') return lifeHub();
    if (route.startsWith('home/life/')) return lifeDomain(route.split('/')[2]);
    const map = {
      'home/overview': homeOverview,
      'home/property': propertyHub,
      'home/tasks': () => taskView('home'),
      'home/calendar': () => calendar('all'),
      'home/family': family,
      'home/finance': finance,
      'home/inventory': inventory,
      'home/assets': assets,
      'home/wisdom': wisdom,
      'home/directory': () => directory('home'),
      'community/overview': communityOverview,
      'community/participate': communityParticipate,
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
    groups,
    settingsGroups,
    natureBackgrounds,
    titles,
    render,
    renderQuestionResults,
    shiftCalendar,
    get timer() { return { seconds: timerSeconds, id: timerId }; },
    setTimer(seconds, id) { timerSeconds = seconds; timerId = id; },
    format
  };
})();
