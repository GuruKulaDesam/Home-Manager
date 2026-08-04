(function () {
  const D = HM.data;
  const roles = ['Everyone', 'Home manager', 'Parent', 'Child', 'Student', 'Caregiver', 'Elder'];
  const sets = [
    { id: 'today', label: 'Today & coordination', icon: 'calendar-check-2', route: 'global/overview', items: [
      ['Everyone', 'What is happening in the family today?'],
      ['Everyone', 'Which tasks are due today?'],
      ['Home manager', 'What is overdue right now?'],
      ['Everyone', 'Who is doing what today?'],
      ['Everyone', 'What is the first event today?'],
      ['Parent', 'What are the school timings today?'],
      ['Parent', 'Who is handling school pickup today?'],
      ['Home manager', 'Who is cooking dinner tonight?'],
      ['Child', 'What are we having for dinner?'],
      ['Caregiver', 'Are there any appointments today?'],
      ['Home manager', 'Are any bills due today?'],
      ['Caregiver', 'Which medicines or care tasks are due today?'],
      ['Home manager', 'What groceries need to be bought today?'],
      ['Home manager', 'Which repair needs follow-up today?'],
      ['Everyone', 'Are any visitors expected today?'],
      ['Home manager', 'Is a delivery or service visit expected today?'],
      ['Elder', 'When is the family prayer or pooja today?'],
      ['Everyone', 'Is exercise or family activity planned today?'],
      ['Parent', 'What homework must the children finish today?'],
      ['Student', 'What should I study today?'],
      ['Caregiver', 'Does an elder need help today?'],
      ['Home manager', 'Is domestic help coming today?'],
      ['Parent', 'Who needs the vehicle today?'],
      ['Everyone', 'What is the weather plan for today?'],
      ['Home manager', 'Is waste collection or recycling due today?'],
      ['Parent', 'How much did the family spend today?'],
      ['Everyone', 'When is everyone free today?'],
      ['Child', 'Which chores have already been completed?'],
      ['Everyone', 'What changed in the family plan since yesterday?'],
      ['Everyone', 'What needs urgent attention now?'],
      ['Everyone', 'What is planned for tomorrow?'],
      ['Everyone', 'What is planned for this weekend?'],
      ['Parent', 'Where are the children right now?'],
      ['Home manager', 'What is missing from today\'s plan?'],
      ['Parent', 'Who needs a reminder today?'],
      ['Everyone', 'How can I quickly add something to the family plan?']
    ]},
    { id: 'household', label: 'Home & food', icon: 'house', route: 'home/overview', items: [
      ['Home manager', 'What is running low in the pantry?'],
      ['Child', 'Is there enough milk for tomorrow?'],
      ['Home manager', 'What is on the shopping list?'],
      ['Everyone', 'What meals are planned this week?'],
      ['Home manager', 'Which ingredients are needed for dinner?'],
      ['Parent', 'Who is responsible for each household chore?'],
      ['Child', 'What chores do I need to finish?'],
      ['Home manager', 'When was each room last cleaned?'],
      ['Home manager', 'Is laundry planned or pending?'],
      ['Home manager', 'Which household supplies should be reordered?'],
      ['Everyone', 'Which home repairs are still open?'],
      ['Home manager', 'Who is handling the current repair?'],
      ['Parent', 'How much will the current repair cost?'],
      ['Home manager', 'When is the next appliance service due?'],
      ['Parent', 'Which appliances are still under warranty?'],
      ['Home manager', 'Where is the appliance purchase record?'],
      ['Parent', 'What valuable household assets are recorded?'],
      ['Home manager', 'When is pest control due?'],
      ['Home manager', 'When should the water tank be cleaned?'],
      ['Home manager', 'When is the gas cylinder expected to finish?'],
      ['Everyone', 'What should we do if there is an LPG leak?'],
      ['Home manager', 'When is the electricity bill due?'],
      ['Home manager', 'When is the water bill due?'],
      ['Parent', 'What is the broadband plan and renewal date?'],
      ['Home manager', 'Which service providers can we call?'],
      ['Home manager', 'What is the domestic help schedule?'],
      ['Home manager', 'Has domestic help salary been paid?'],
      ['Parent', 'When is the domestic help bonus due?'],
      ['Parent', 'When is the car service due?'],
      ['Parent', 'Is the vehicle insurance current?'],
      ['Parent', 'When does the vehicle PUC expire?'],
      ['Everyone', 'Is the home ready for monsoon?'],
      ['Home manager', 'How much electricity are we trying to save?'],
      ['Child', 'What can I recycle or compost today?'],
      ['Home manager', 'What is stored in each room?'],
      ['Everyone', 'Who should be contacted if we are locked out?']
    ]},
    { id: 'family', label: 'Family & relationships', icon: 'users-round', route: 'home/family', items: [
      ['Everyone', 'Who are the members of this household?'],
      ['Child', 'What is my role in the family?'],
      ['Parent', 'How is each family member feeling?'],
      ['Caregiver', 'Who may need extra support this week?'],
      ['Everyone', 'When is the next family meeting?'],
      ['Parent', 'Which family decisions are still open?'],
      ['Everyone', 'Who agreed to the latest family decision?'],
      ['Parent', 'What responsibilities belong to each parent?'],
      ['Child', 'Who can I ask for help?'],
      ['Elder', 'Who is my primary caregiver?'],
      ['Caregiver', 'Who can take over if the caregiver is unavailable?'],
      ['Parent', 'What are the children\'s daily routines?'],
      ['Parent', 'What screen-time rules has the family agreed?'],
      ['Parent', 'What pocket-money rule is active?'],
      ['Child', 'When can I invite friends home?'],
      ['Home manager', 'Are guests expected this week?'],
      ['Home manager', 'What should be prepared for visiting relatives?'],
      ['Everyone', 'Whose birthday is next?'],
      ['Everyone', 'Which anniversaries are coming up?'],
      ['Home manager', 'What celebration preparations are pending?'],
      ['Parent', 'What gifts have already been planned?'],
      ['Elder', 'Which family traditions are recorded?'],
      ['Child', 'Where is the family recipe for rasam?'],
      ['Everyone', 'What did the family appreciate recently?'],
      ['Parent', 'Are household duties shared fairly?'],
      ['Caregiver', 'When did we last check on an elderly relative?'],
      ['Parent', 'Who is the emergency guardian for the children?'],
      ['Parent', 'Who is authorised to pick up the children?'],
      ['Everyone', 'Which family contacts are available?'],
      ['Parent', 'What consent or permission needs renewal?'],
      ['Caregiver', 'What care instructions should relatives know?'],
      ['Everyone', 'What pet care is due?'],
      ['Child', 'When is the pet\'s next vaccination?'],
      ['Everyone', 'What family trip are we planning?'],
      ['Elder', 'Is the next trip accessible for elders?'],
      ['Everyone', 'Where can we preserve an important family memory?']
    ]},
    { id: 'money', label: 'Money & records', icon: 'wallet-cards', route: 'home/finance', items: [
      ['Parent', 'How much has the family spent this month?'],
      ['Parent', 'Which expense category is highest?'],
      ['Home manager', 'How much was spent on groceries?'],
      ['Parent', 'How much was spent on utilities?'],
      ['Parent', 'Which bills are due next?'],
      ['Home manager', 'Has the electricity bill been paid?'],
      ['Parent', 'Which subscriptions renew this month?'],
      ['Parent', 'Which subscriptions can be cancelled?'],
      ['Parent', 'What EMIs or debts are due?'],
      ['Parent', 'What is the monthly household budget?'],
      ['Home manager', 'How much budget remains for food?'],
      ['Parent', 'Are we saving toward a family goal?'],
      ['Parent', 'How much is available in the emergency fund?'],
      ['Parent', 'Which insurance policies does the family have?'],
      ['Caregiver', 'Does health insurance cover the elders?'],
      ['Parent', 'When does family health insurance renew?'],
      ['Parent', 'When does vehicle insurance renew?'],
      ['Parent', 'Where is the property insurance record?'],
      ['Parent', 'What documents are needed for the next tax filing?'],
      ['Parent', 'When is the income-tax return due?'],
      ['Home manager', 'When is property tax due?'],
      ['Parent', 'Where are investment records referenced?'],
      ['Parent', 'Are nominees recorded for every account?'],
      ['Elder', 'Who is the nominee for my accounts?'],
      ['Parent', 'Where is the family will or succession note?'],
      ['Parent', 'Which identity documents expire next?'],
      ['Parent', 'When does each passport expire?'],
      ['Everyone', 'Where is the Aadhaar reference stored?'],
      ['Student', 'Where are school certificates recorded?'],
      ['Parent', 'Where is the property agreement referenced?'],
      ['Parent', 'Where are vehicle registration details recorded?'],
      ['Everyone', 'Where are warranty and purchase records kept?'],
      ['Parent', 'Which financial records are missing?'],
      ['Parent', 'When was the financial setup last reviewed?'],
      ['Parent', 'How do I export a secure household backup?'],
      ['Everyone', 'Which financial secrets must never be stored here?']
    ]},
    { id: 'health', label: 'Health & safety', icon: 'heart-pulse', route: 'home/life/health', items: [
      ['Everyone', 'What is each family member\'s blood group?'],
      ['Caregiver', 'Who has allergies or important medical conditions?'],
      ['Caregiver', 'Which medicines are currently being taken?'],
      ['Caregiver', 'When is the next medicine dose?'],
      ['Everyone', 'Who is our family doctor?'],
      ['Caregiver', 'What is the doctor\'s phone number?'],
      ['Caregiver', 'When is the next medical appointment?'],
      ['Parent', 'Are annual health checks due?'],
      ['Parent', 'When is the next dental check?'],
      ['Parent', 'When is the next eye check?'],
      ['Parent', 'Which child vaccinations are due?'],
      ['Caregiver', 'Which elder vaccinations are due?'],
      ['Caregiver', 'What elder care tasks are pending?'],
      ['Elder', 'Who should I call if I feel unwell?'],
      ['Everyone', 'What should we do in a medical emergency?'],
      ['Everyone', 'What is India\'s single emergency number?'],
      ['Parent', 'How can a woman request emergency support?'],
      ['Child', 'What number can a child call for help?'],
      ['Elder', 'What is the Elderline number?'],
      ['Parent', 'How do we report financial cyber fraud?'],
      ['Everyone', 'What should we do during an LPG leak?'],
      ['Everyone', 'Where is the household emergency card?'],
      ['Parent', 'Who are the trusted emergency contacts?'],
      ['Parent', 'What is the emergency meeting point?'],
      ['Child', 'Who is allowed to collect me during an emergency?'],
      ['Everyone', 'Where is the first-aid kit?'],
      ['Home manager', 'Does the first-aid kit need restocking?'],
      ['Everyone', 'Where are fire extinguishers located?'],
      ['Everyone', 'When was the emergency plan last reviewed?'],
      ['Parent', 'Are doors and access keys accounted for?'],
      ['Parent', 'Is important data backed up?'],
      ['Parent', 'Who can recover critical digital accounts?'],
      ['Caregiver', 'What health information can be shared with relatives?'],
      ['Caregiver', 'Where should official health records be kept?'],
      ['Everyone', 'Is the family safe to travel today?'],
      ['Everyone', 'What safety issue needs attention first?']
    ]},
    { id: 'learning', label: 'Children & learning', icon: 'graduation-cap', route: 'study/overview', items: [
      ['Student', 'What classes do I have today?'],
      ['Student', 'What homework is due next?'],
      ['Parent', 'Which assignments are overdue?'],
      ['Student', 'What exam is coming up?'],
      ['Parent', 'When is the next parent-teacher meeting?'],
      ['Parent', 'What is the school fee due date?'],
      ['Parent', 'Has the transport fee been recorded?'],
      ['Parent', 'What is the child\'s attendance status?'],
      ['Student', 'Which subject needs the most work?'],
      ['Student', 'Which topics are still in backlog?'],
      ['Student', 'Which topics need revision?'],
      ['Student', 'What have I already mastered?'],
      ['Student', 'What is my study goal this month?'],
      ['Student', 'How much progress have I made on my goal?'],
      ['Student', 'How many focus minutes did I complete this week?'],
      ['Parent', 'How is study time distributed by subject?'],
      ['Student', 'When is my next focus session?'],
      ['Student', 'Where should I record a new study topic?'],
      ['Parent', 'Who is the current tutor?'],
      ['Parent', 'When is the tutor payment due?'],
      ['Student', 'What learning resources are available?'],
      ['Child', 'Which books should be returned to the library?'],
      ['Parent', 'Which school documents are recorded?'],
      ['Student', 'Where are certificates and achievements recorded?'],
      ['Parent', 'What skills is the child developing outside school?'],
      ['Child', 'What activity or sport is planned this week?'],
      ['Parent', 'Is screen time balanced with study and sleep?'],
      ['Student', 'What can I study during travel?'],
      ['Parent', 'What accommodation or learning support is needed?'],
      ['Student', 'Who can help with this subject?'],
      ['Parent', 'Which education decisions are pending?'],
      ['Student', 'What should I prepare for tomorrow?'],
      ['Parent', 'How can the family celebrate learning progress?'],
      ['Student', 'What is the quickest way to add homework?'],
      ['Parent', 'What part of the child\'s learning record is missing?']
    ]},
    { id: 'community', label: 'Community & life events', icon: 'map-pinned', route: 'community/overview', items: [
      ['Everyone', 'What community events are coming up?'],
      ['Everyone', 'What neighbourhood updates were saved recently?'],
      ['Parent', 'Are there civic issues near the school?'],
      ['Everyone', 'Which civic follow-ups are still open?'],
      ['Everyone', 'What is the status of the pothole report?'],
      ['Home manager', 'Which local services are available?'],
      ['Caregiver', 'Where is the nearest recorded health centre?'],
      ['Parent', 'Which local emergency contacts are recorded?'],
      ['Everyone', 'Are there volunteer activities this week?'],
      ['Student', 'Can I volunteer for a local learning activity?'],
      ['Everyone', 'Which community polls need a response?'],
      ['Parent', 'When is the residents association meeting?'],
      ['Home manager', 'When is the farmers market?'],
      ['Everyone', 'What local transport update was recorded?'],
      ['Parent', 'Where can I find local school or tutor information?'],
      ['Elder', 'Which accessible local places are recorded?'],
      ['Child', 'Which parks or outdoor activities are available?'],
      ['Everyone', 'What festival is the family preparing for?'],
      ['Home manager', 'What puja supplies are still needed?'],
      ['Parent', 'What is the festival budget?'],
      ['Everyone', 'Which relatives are attending the function?'],
      ['Home manager', 'What travel bookings are pending?'],
      ['Everyone', 'What should we pack for the next trip?'],
      ['Caregiver', 'Which medicines are needed for the trip?'],
      ['Elder', 'Is an accessible room included in the travel plan?'],
      ['Parent', 'Where are tickets and booking references recorded?'],
      ['Everyone', 'What is the next pilgrimage plan?'],
      ['Parent', 'Who is responsible for the house while we travel?'],
      ['Home manager', 'What deliveries should be paused during travel?'],
      ['Everyone', 'Which family event needs an RSVP?'],
      ['Parent', 'What government service should hold official documents?'],
      ['Caregiver', 'Where can official personal health records be managed?'],
      ['Everyone', 'What local guide should we read first?'],
      ['Parent', 'Which community information may be outdated?'],
      ['Everyone', 'How do I add a new community or travel plan?']
    ]}
  ];

  const questions = sets.flatMap(set => set.items.map((item, index) => ({
    id: `${set.id}-${index + 1}`,
    category: set.id,
    categoryLabel: set.label,
    icon: set.icon,
    defaultRoute: set.route,
    role: item[0],
    text: item[1]
  })));

  const lower = value => String(value || '').toLowerCase();
  const includesAny = (text, terms) => terms.some(term => text.includes(term));

  function routeFor(question) {
    const text = lower(question.text);
    const rules = [
      [['emergency number', 'woman request emergency', 'child call for help', 'elderline', 'cyber fraud', 'lpg leak'], 'home/life/emergency'],
      [['blood group', 'allerg', 'medicine', 'doctor', 'medical', 'health check', 'dental', 'eye check', 'vaccination', 'elder care'], 'home/life/health'],
      [['first-aid', 'fire extinguisher', 'safety issue', 'emergency card', 'emergency contact', 'meeting point'], 'home/life/emergency'],
      [['insurance'], 'home/life/insurance'],
      [['income-tax', 'tax filing', 'property tax'], 'home/life/tax'],
      [['bill', 'electricity', 'water bill', 'emi', 'broadband'], 'home/life/bills'],
      [['subscription'], 'home/life/subscriptions'],
      [['aadhaar', 'passport', 'certificate', 'identity document', 'school documents'], 'settings/life/documents'],
      [['nominee', 'will', 'succession', 'inherit'], 'settings/life/legacy'],
      [['backup', 'digital account', 'financial secrets'], 'settings/life/digital'],
      [['emergency guardian', 'authorised to pick up', 'allowed to collect', 'care instructions', 'primary caregiver'], 'home/life/emergency'],
      [['consent or permission'], 'settings/life/documents'],
      [['vehicle', 'car service', 'puc', 'registration'], 'home/life/vehicles'],
      [['domestic help', 'maid', 'housekeeping salary', 'bonus due'], 'home/life/help'],
      [['trip', 'travel', 'pilgrimage', 'booking', 'pack'], 'home/life/travel'],
      [['festival', 'puja', 'pooja supplies', 'function'], 'home/life/festivals'],
      [['pet'], 'home/life/pets'],
      [['repair', 'appliance', 'warranty', 'pest control', 'water tank', 'locked out', 'fire extinguisher'], 'home/assets'],
      [['pantry', 'milk', 'shopping', 'grocer', 'ingredient', 'meal', 'dinner', 'gas cylinder', 'supplies', 'room'], 'home/inventory'],
      [['expense', 'spent', 'spending', 'budget', 'saving', 'emergency fund', 'investment', 'money'], 'home/finance'],
      [['homework', 'assignment'], 'study/tasks'],
      [['class', 'exam', 'parent-teacher', 'activity or sport'], 'study/schedule'],
      [['study goal', 'progress have i made'], 'study/goals'],
      [['focus minute', 'focus session'], 'study/focus'],
      [['study time distributed', 'proficiency'], 'study/analytics'],
      [['study', 'subject', 'topic', 'learning', 'tutor', 'library', 'education'], 'study/overview'],
      [['community event', 'residents association', 'farmers market'], 'community/events'],
      [['civic', 'pothole'], 'community/tickets'],
      [['volunteer'], 'community/volunteer'],
      [['poll'], 'community/polls'],
      [['local service', 'health centre', 'local emergency contact', 'tutor information'], 'community/directory'],
      [['neighbourhood update', 'transport update'], 'community/feed'],
      [['family member', 'family feeling', 'family meeting', 'family decision', 'role in the family', 'caregiver', 'responsibilities', 'screen-time', 'pocket-money', 'family contact', 'guardian', 'authorised'], 'home/family'],
      [['birthday', 'anniversar', 'visitor', 'guest', 'calendar', 'happening', 'planned for tomorrow', 'planned for this weekend', 'appointment', 'school timings', 'pickup', 'free today', 'activity planned'], 'home/calendar'],
      [['chore', 'task', 'doing what', 'overdue', 'urgent attention', 'reminder', 'missing from today'], 'home/tasks']
    ];
    return rules.find(rule => includesAny(text, rule[0]))?.[1] || question.defaultRoute;
  }

  function officialAnswer(text) {
    if (text.includes('single emergency number') || text.includes('medical emergency')) return { headline: 'Call 112', detail: 'ERSS 112 is the pan-India number for police, fire, rescue and medical emergencies.', status: 'official', external: 'https://112.gov.in/' };
    if (text.includes('woman request emergency')) return { headline: 'Call 112 or 181', detail: 'Use 112 for immediate danger. The women helpline is 181.', status: 'official', external: 'https://112.gov.in/' };
    if (text.includes('child call for help')) return { headline: 'Call 1098', detail: 'Child Helpline 1098 supports children in danger or distress. Use 112 for immediate danger.', status: 'official', external: 'https://112.gov.in/' };
    if (text.includes('elderline')) return { headline: 'Call 14567', detail: 'Elderline 14567 provides support for senior citizens. Use 112 for immediate danger.', status: 'official', external: 'https://112.gov.in/' };
    if (text.includes('cyber fraud')) return { headline: 'Call 1930 quickly', detail: 'Report financial cyber fraud promptly through 1930 and the official cybercrime portal.', status: 'official', external: 'https://cybercrime.gov.in/' };
    if (text.includes('lpg leak')) return { headline: 'Call 1906 and leave the area', detail: 'Do not operate electrical switches or flames. Ventilate if safe and call the LPG emergency helpline.', status: 'official', external: 'https://www.mylpg.in/' };
    if (text.includes('weather plan')) return { headline: 'Live weather is not connected', detail: 'Check the official IMD forecast, then add weather-dependent changes to the family calendar.', status: 'external', external: 'https://mausam.imd.gov.in/' };
    if (text.includes('where are the children right now')) return { headline: 'Live location is not tracked', detail: 'This static app does not monitor people. Record pickup plans and trusted contacts instead.', status: 'limitation' };
    if (text.includes('government service should hold official documents')) return { headline: 'Use DigiLocker', detail: 'Keep authentic government-issued documents in DigiLocker; store only masked references here.', status: 'official', external: 'https://www.digilocker.gov.in/' };
    if (text.includes('official personal health records')) return { headline: 'Use ABHA', detail: 'ABHA supports consent-based personal health records. Keep only planning notes in Home Manager.', status: 'official', external: 'https://abdm.gov.in/' };
    return null;
  }

  function matching(items, text, fields) {
    const stop = new Set(['what', 'when', 'where', 'which', 'family', 'today', 'next', 'recorded', 'should', 'there', 'does', 'have', 'this', 'that', 'with', 'each', 'from', 'current']);
    const words = lower(text).split(/[^a-z0-9]+/).filter(word => word.length > 3 && !stop.has(word));
    return items.map(item => ({ item, score: words.reduce((score, word) => score + (fields.some(field => lower(item[field]).includes(word)) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score).find(entry => entry.score > 0)?.item;
  }

  function captureFor(route, text) {
    if (route === 'home/tasks' || route === 'study/tasks') return { kind: 'task', context: route.startsWith('study') ? 'study' : 'home' };
    if (route === 'home/calendar' || route === 'community/events' || route === 'study/schedule') return { kind: 'event', context: route.startsWith('community') ? 'community' : route.startsWith('study') ? 'study' : 'home' };
    if (route === 'home/inventory') return { kind: includesAny(text, ['meal', 'dinner', 'cook']) ? 'meal' : 'inventory', context: 'home' };
    if (route === 'home/finance') return { kind: 'expense', context: 'home' };
    if (route === 'home/assets' || route === 'community/tickets') return { kind: 'issue', scope: route.startsWith('community') ? 'civic' : 'household' };
    if (route.startsWith('study/')) return { kind: includesAny(text, ['goal', 'progress']) ? 'goal' : 'task', context: 'study' };
    const domain = route.match(/(?:home|settings)\/life\/([^/]+)/)?.[1];
    if (domain) return { kind: 'life', domain };
    return null;
  }

  function answer(question) {
    const text = lower(question.text);
    const official = officialAnswer(text);
    if (official) return { ...official, route: routeFor(question) };
    const route = routeFor(question);
    const state = D.state;
    const capture = captureFor(route, text);
    if (route === 'home/tasks' || route === 'study/tasks') {
      const open = state.tasks.filter(item => D.status(item.status) !== 'done' && (route === 'home/tasks' || item.context === 'study'));
      const match = matching(open, text, ['title', 'category', 'assignee', 'type']);
      if (match) return { headline: match.title, detail: `${match.assignee || 'Unassigned'} - due ${D.date(match.dueAt)} - ${D.status(match.status)}`, status: 'live', route, capture };
      return { headline: `${open.length} open tasks`, detail: open.length ? `Next: ${open[0].title} (${open[0].assignee || 'unassigned'}).` : 'No open tasks are recorded.', status: open.length ? 'live' : 'setup', route, capture };
    }
    if (route === 'home/calendar' || route === 'community/events' || route === 'study/schedule') {
      const events = state.events.filter(item => route === 'home/calendar' || item.context === (route === 'community/events' ? 'community' : 'study')).sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)));
      const match = matching(events, text, ['title', 'category', 'venue']);
      const requiresExact = includesAny(text, ['birthday', 'anniversar', 'pickup', 'visitor', 'delivery', 'appointment', 'school timing', 'parent-teacher', 'class', 'exam', 'sport']);
      const item = match || (!requiresExact && events.find(event => String(event.startAt) >= new Date().toISOString().slice(0, 10)));
      return item ? { headline: item.title, detail: `${D.date(item.startAt, { weekday: 'short', day: 'numeric', month: 'short' })} - ${item.venue || 'venue not recorded'}`, status: 'live', route, capture } : { headline: 'No matching event recorded', detail: 'Add the date, time, owner and location to the shared calendar.', status: 'setup', route, capture };
    }
    if (route === 'home/inventory') {
      if (includesAny(text, ['meal', 'dinner', 'cook', 'ingredient'])) {
        const meal = matching(state.meals, text, ['name', 'mealType', 'cook']) || state.meals.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
        return meal ? { headline: meal.name, detail: `${meal.mealType} on ${D.date(meal.date)} - ${meal.cook || 'cook unassigned'}`, status: 'live', route, capture } : { headline: 'No meal is planned', detail: 'Add a meal, date and cook.', status: 'setup', route, capture };
      }
      const low = state.inventoryItems.filter(item => (+item.quantity || 0) <= 2);
      const match = matching(state.inventoryItems, text, ['name', 'category', 'unit']);
      if (!match && includesAny(text, ['milk', 'gas cylinder', 'ingredient', 'stored in each room'])) return { headline: 'No matching household item recorded', detail: 'Add the item, location, quantity and reorder level.', status: 'setup', route, capture };
      return match ? { headline: `${match.name}: ${match.quantity} ${match.unit}`, detail: match.quantity <= 2 ? 'This item is low.' : 'Stock is available.', status: 'live', route, capture } : { headline: `${low.length} low-stock items`, detail: low.length ? low.map(item => item.name).slice(0, 3).join(', ') : 'No low-stock items are recorded.', status: 'live', route, capture };
    }
    if (route === 'home/finance') {
      const month = new Date().toISOString().slice(0, 7);
      const expenses = state.expenses.filter(item => String(item.date).startsWith(month));
      const match = matching(state.expenses, text, ['title', 'category']);
      const total = expenses.reduce((sum, item) => sum + (+item.amount || 0), 0);
      if (!match && includesAny(text, ['budget', 'saving', 'emergency fund', 'investment'])) return { headline: 'No matching financial plan recorded', detail: 'Record the target, current amount, owner and review date without storing account secrets.', status: 'setup', route, capture };
      return match ? { headline: D.money(match.amount), detail: `${match.title} - ${match.category} - ${D.date(match.date)}`, status: 'live', route, capture } : { headline: `${D.money(total)} this month`, detail: `${expenses.length} expense entries are recorded.`, status: 'live', route, capture };
    }
    if (route === 'home/assets' || route === 'community/tickets') {
      const scope = route === 'community/tickets' ? 'civic' : 'household';
      const issues = state.issues.filter(item => item.scope === scope && D.status(item.status) !== 'done');
      const match = matching(issues, text, ['title', 'category', 'location']);
      const requiresExact = includesAny(text, ['pest control', 'water tank', 'appliance service', 'warranty', 'purchase record', 'locked out', 'fire extinguisher']);
      const item = match || (!requiresExact && issues[0]);
      return item ? { headline: item.title, detail: `${item.location} - ${item.priority} priority - ${D.status(item.status)}`, status: 'live', route, capture } : { headline: 'No matching open issue', detail: 'Record the issue, location, priority and owner.', status: 'setup', route, capture };
    }
    if (route === 'home/family') {
      const match = matching(state.people, text, ['name', 'householdRole']);
      return match ? { headline: match.name, detail: `${match.householdRole} - wellbeing ${match.wellbeing}%`, status: 'live', route } : { headline: `${state.people.length} household members`, detail: state.people.map(person => `${person.name} (${person.householdRole})`).join(', '), status: 'live', route };
    }
    if (route === 'study/focus') {
      const week = new Date(); week.setDate(week.getDate() - 6);
      const minutes = state.focusSessions.filter(item => item.date >= week.toISOString().slice(0, 10)).reduce((sum, item) => sum + (+item.minutes || 0), 0);
      return { headline: `${minutes} focus minutes`, detail: 'Total recorded during the last seven days.', status: 'live', route, capture };
    }
    if (route === 'study/goals') {
      const goal = state.goals.find(item => item.context === 'study');
      return goal ? { headline: goal.title, detail: `${goal.progress}/${goal.target} complete - due ${D.date(goal.dueAt)}`, status: 'live', route, capture } : { headline: 'No study goal recorded', detail: 'Add a measurable target, progress and due date.', status: 'setup', route, capture };
    }
    if (route.startsWith('study/')) {
      const match = matching(state.learningTopics, text, ['title', 'subject', 'chapter', 'status']);
      const open = state.learningTopics.filter(item => item.status !== 'done');
      const item = match || open.sort((a, b) => (+a.proficiency || 0) - (+b.proficiency || 0))[0];
      return item ? { headline: item.title, detail: `${item.subject} - ${item.status} - ${item.proficiency}% proficiency`, status: 'live', route, capture } : { headline: 'No matching learning item', detail: 'Add the topic, subject, due work and owner.', status: 'setup', route, capture };
    }
    if (route.startsWith('community/')) {
      if (route === 'community/polls') {
        const poll = state.polls[0];
        return poll ? { headline: poll.title, detail: poll.options.map(option => `${option.name}: ${option.votes}`).join(' - '), status: 'live', route } : { headline: 'No community poll recorded', detail: 'There is no active local preference poll in this browser.', status: 'setup', route };
      }
      const source = route === 'community/volunteer' ? state.volunteerOpportunities : route === 'community/feed' ? state.newsItems : route === 'community/directory' ? state.contacts.filter(item => item.scope === 'community') : state.guides;
      const match = matching(source, text, ['title', 'name', 'category', 'body', 'hours']);
      const allowLatest = ['community/feed', 'community/volunteer', 'community/overview', 'community/guides'].includes(route);
      const item = match || (allowLatest ? source.slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))[0] : null);
      return item ? { headline: item.title || item.name, detail: item.body || item.hours || `${item.category || 'Community'} - ${D.date(item.date)}`, status: 'live', route, capture } : { headline: 'No matching community record', detail: 'Open this section to add or review local information.', status: 'setup', route, capture };
    }
    const domain = route.match(/(?:home|settings)\/life\/([^/]+)/)?.[1];
    if (domain) {
      const records = HM.life.ensure().filter(item => item.domain === domain);
      const match = matching(records, text, ['title', 'category', 'owner', 'provider', 'notes']);
      const requiresExact = includesAny(text, ['puc', 'water bill', 'medicine dose', 'dental', 'eye check', 'vaccination', 'meeting point', 'access keys', 'school certificate', 'transport fee', 'attendance', 'tutor payment', 'property insurance', 'purchase record']);
      const item = match || (!requiresExact && records.slice().sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))[0]);
      return item ? { headline: item.title, detail: `${item.owner || 'Family'} - ${item.dueDate ? `due ${D.date(item.dueDate)}` : 'no due date'} - ${item.status}`, status: 'live', route, capture } : { headline: `No ${HM.life.domains[domain]?.noun || 'record'} recorded`, detail: 'Add a safe reference, owner, provider, due date and instructions.', status: 'setup', route, capture };
    }
    return { headline: 'Open the related family section', detail: 'This question is mapped, but the answer depends on information the household records.', status: 'setup', route, capture };
  }

  function search(query = '', category = 'all', role = 'all') {
    const words = lower(query).split(/[^a-z0-9]+/).filter(word => word.length > 1);
    return questions
      .filter(item => (category === 'all' || item.category === category) && (role === 'all' || item.role === role))
      .map((item, index) => ({ item, index, score: words.length ? words.reduce((score, word) => score + (lower(item.text).includes(word) ? 2 : 0) + (lower(item.categoryLabel).includes(word) || lower(item.role).includes(word) ? 1 : 0), 0) : (index % 36 === 0 ? 3 : 1) }))
      .filter(entry => !words.length || entry.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 7)
      .map(entry => entry.item);
  }

  window.HM.questions = { roles, sets, questions, routeFor, answer, search };
})();
