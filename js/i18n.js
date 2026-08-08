(function () {
  const KEY = 'home-manager-persona-languages-v1';

  const ta = {
    'Family': 'குடும்பம்', 'Shared household': 'குடும்பப் பொது பார்வை', 'Family member': 'குடும்ப உறுப்பினர்', 'Daily & weekly': 'தினசரி · வாராந்திரம்',
    'Mother': 'அம்மா', 'Father': 'அப்பா', 'Daughter': 'மகள்', 'Son': 'மகன்',
    'Today': 'இன்று', 'Home': 'இல்லம்', 'Household': 'இல்லம்', 'Kitchen': 'உணவு', 'Family Calendar': 'குடும்ப நாட்காட்டி', 'Food': 'உணவு', 'More': 'மேலும்',
    'Money': 'பணம்', 'Care': 'நலன்', 'Leisure': 'ஓய்வுநேரம்', 'Travel': 'பயணம்', 'Web Life': 'இணைய வாழ்க்கை',
    'Entertainment': 'பொழுதுபோக்கு', 'Education': 'கல்வி', 'Community': 'சமூகம்',
    'Overview': 'முகப்பு', 'Inbox intelligence': 'மின்னஞ்சல் சுருக்கம்', 'Inbox Intelligence': 'மின்னஞ்சல் சுருக்கம்',
    'Help & Guide': 'உதவி & வழிகாட்டி', 'Settings': 'அமைப்புகள்', 'Tasks & routines': 'பணிகள் & வழக்கங்கள்',
    'Food & supplies': 'உணவு & பொருட்கள்', 'Property & assets': 'வீடு & சொத்துகள்', 'Property & Assets': 'வீடு & சொத்துகள்',
    'Domestic help': 'வீட்டு உதவி', 'Sustainability': 'நிலைத்த வாழ்வு', 'Calendar': 'நாட்காட்டி',
    'Celebrations': 'கொண்டாட்டங்கள்', 'Documents': 'ஆவணங்கள்', 'Contacts': 'தொடர்புகள்',
    'Protection & legacy': 'பாதுகாப்பு & மரபு', 'Protection & Legacy': 'பாதுகாப்பு & மரபு',
    'Budget': 'வரவு செலவுத் திட்டம்', 'Cash flow': 'பணப்புழக்கம்', 'Cash Flow': 'பணப்புழக்கம்',
    'Spending': 'செலவுகள்', 'Commitments': 'கடமைகள்', 'Net worth': 'நிகர மதிப்பு', 'Net Worth': 'நிகர மதிப்பு',
    'Reports': 'அறிக்கைகள்', 'Health': 'உடல்நலம்', 'Medicines': 'மருந்துகள்', 'Appointments': 'மருத்துவ சந்திப்புகள்',
    'Elder care': 'மூத்தோர் நலன்', 'Emergency': 'அவசர உதவி', 'Pets': 'செல்லப்பிராணிகள்',
    'Trips': 'சுற்றுப்பயணங்கள்', 'Transportation': 'போக்குவரத்து', 'Vehicles': 'வாகனங்கள்',
    'Hotels & stays': 'விடுதிகள் & தங்குமிடம்', 'Insurance & documents': 'காப்பீடு & ஆவணங்கள்',
    'Email & accounts': 'மின்னஞ்சல் & கணக்குகள்', 'AI services': 'AI சேவைகள்', 'Subscriptions': 'சந்தாக்கள்',
    'Browsing habits': 'இணையப் பயன்பாடு', 'Games & apps': 'விளையாட்டுகள் & செயலிகள்', 'Privacy & devices': 'தனியுரிமை & சாதனங்கள்',
    'Watch': 'காணொளி', 'Listen': 'கேட்பவை', 'Read': 'வாசிப்பு', 'Play & games': 'விளையாட்டு', 'Outings & events': 'வெளிச்செலவு & நிகழ்வுகள்',
    'Updates': 'புதுப்பிப்புகள்', 'Events & polls': 'நிகழ்வுகள் & வாக்கெடுப்புகள்', 'Volunteer': 'தன்னார்வம்',
    'Civic issues': 'பொது சிக்கல்கள்', 'Local services': 'உள்ளூர் சேவைகள்', 'Guides': 'வழிகாட்டிகள்',
    'Home Overview': 'இல்ல முகப்பு', 'Home Tasks': 'இல்லப் பணிகள்', 'Family': 'குடும்பம்', 'Care Overview': 'நலன் முகப்பு',
    'Money Overview': 'பண முகப்பு', 'Family Budget': 'குடும்ப வரவு செலவுத் திட்டம்', 'Supplies & Meals': 'பொருட்கள் & உணவு',
    'Travel Spending': 'பயணச் செலவுகள்', 'Entertainment Spending': 'பொழுதுபோக்குச் செலவுகள்',
    'Community Overview': 'சமூக முகப்பு', 'News & Forum': 'செய்திகள் & உரையாடல்', 'Community Services': 'சமூக சேவைகள்',
    'Home Directory': 'இல்லத் தொடர்புகள்', 'Today at home': 'இன்றைய இல்ல நிலை',
    'What needs attention now': 'இப்போது கவனிக்க வேண்டியவை', 'Run the home': 'இல்லத்தை ஒழுங்குபடுத்துங்கள்',
    'Plans and togetherness': 'திட்டங்களும் குடும்ப இணைப்பும்', 'Health and safety': 'உடல்நலமும் பாதுகாப்பும்',
    'Every journey and vehicle': 'பயணங்களும் வாகனங்களும்', 'Accounts, habits and digital costs': 'கணக்குகள், பழக்கங்கள், இணையச் செலவுகள்',
    'Watch, listen, read and go out': 'பார்க்க, கேட்க, படிக்க, வெளிச்செல்ல', 'Local participation': 'உள்ளூர் பங்கேற்பு',
    'Add item': 'புதியதைச் சேர்க்க', 'Add': 'சேர்', 'Save': 'சேமி', 'Save item': 'சேமி', 'Cancel': 'ரத்து செய்',
    'Edit': 'திருத்து', 'Delete': 'நீக்கு', 'Close': 'மூடு', 'Open': 'திற', 'Update': 'புதுப்பி', 'Print': 'அச்சிடு',
    'Search': 'தேடு', 'Search records and help': 'பதிவுகளையும் உதவியையும் தேடுங்கள்', 'Notifications': 'அறிவிப்புகள்',
    'Attention': 'கவனம்', 'Household signals': 'இல்ல அறிவிப்புகள்', 'Nothing needs attention.': 'இப்போது கவனிக்க வேண்டியது எதுவுமில்லை.',
    'Current household signals': 'தற்போதைய இல்ல நிலை', 'Open notifications': 'அறிவிப்புகளைத் திற',
    'Offline assistant': 'இணையமில்லா உதவியாளர்', 'Open offline assistant': 'இணையமில்லா உதவியாளரைத் திற',
    'Quick tools': 'விரைவு கருவிகள்', 'Choose what you want to organise.': 'ஒழுங்குபடுத்த வேண்டியதைத் தேர்ந்தெடுக்கவும்.',
    'Create': 'உருவாக்கு', 'Add to Home Manager': 'இல்ல மேலாண்மையில் சேர்க்க',
    'Home identity': 'இல்ல அடையாளம்', 'Household name': 'இல்லத்தின் பெயர்', 'Primary language': 'முதன்மை மொழி',
    'Home address and landmark': 'இல்ல முகவரி மற்றும் அடையாளம்', 'Timezone': 'நேர மண்டலம்', 'Food preference': 'உணவு விருப்பம்',
    'People & roles': 'உறுப்பினர்கள் & பொறுப்புகள்', 'Household profile': 'இல்ல விவரம்', 'App & data': 'செயலி & தரவு',
    'Open planner': 'திட்டமிடலைத் திற', 'Open refill list': 'வாங்கும் பட்டியலைத் திற', 'Add pantry item': 'சரக்கறைப் பொருளைச் சேர்க்க',
    'Low stock': 'குறைந்த இருப்பு', 'Pantry items': 'சரக்கறைப் பொருட்கள்', 'Recipes': 'உணவுச் செய்முறைகள்',
    'All family sections': 'அனைத்து குடும்பப் பகுதிகளும்', 'Fixed': 'நிலையானது', 'Flexible': 'மாறக்கூடியது', 'Non-monthly': 'மாதாந்திரமல்லாதது',
    'Section budgets': 'பிரிவு வரவு செலவுகள்', 'Food & groceries': 'உணவு & மளிகை', 'Home & utilities': 'வீடு & சேவைகள்',
    'Vehicles & transport': 'வாகனம் & போக்குவரத்து', 'Health & care': 'உடல்நலம் & பராமரிப்பு', 'Learning & school': 'கல்வி & பள்ளி',
    'Family & celebrations': 'குடும்பம் & கொண்டாட்டங்கள்', 'Tasks': 'பணிகள்', 'Events': 'நிகழ்வுகள்', 'Goals': 'இலக்குகள்',
    'Upcoming': 'வரவிருப்பவை', 'Overdue': 'காலதாமதம்', 'Completed': 'முடிந்தது', 'In progress': 'நடைபெறுகிறது',
    'No records yet.': 'இன்னும் பதிவுகள் இல்லை.', 'No items yet.': 'இன்னும் எதுவும் சேர்க்கப்படவில்லை.',
    'Open responsibilities': 'முடிக்க வேண்டிய பொறுப்புகள்', 'My responsibilities': 'என் பொறுப்புகள்', 'Includes overdue work': 'காலதாமதமான பணிகளும் உள்ளன',
    'Household handoff': 'குடும்பப் பொறுப்பு பகிர்வு', 'No meal planned': 'உணவுத் திட்டம் இல்லை', 'Open repairs': 'முடிக்காத பழுதுபார்ப்புகள்',
    'Shared property and appliances': 'பொதுவான வீடும் சாதனங்களும்', 'Monthly home spend': 'இந்த மாத இல்லச் செலவு', 'Shared household total': 'குடும்பத்தின் மொத்தம்',
    'Run the home next': 'அடுத்து செய்ய வேண்டிய இல்லப் பணிகள்', 'Responsibilities sorted by due date': 'கடைசி தேதிப்படி பொறுப்புகள்',
    'All tasks': 'அனைத்துப் பணிகள்', 'Services and upkeep': 'சேவைகள் & பராமரிப்பு', 'Shared renewals, repairs and recurring support': 'புதுப்பிப்புகள், பழுதுபார்ப்புகள் மற்றும் தொடர்ச்சியான உதவி',
    'Property': 'வீடு', 'No service or upkeep item needs attention.': 'இப்போது பராமரிப்பில் கவனிக்க வேண்டியது இல்லை.',
    'Home overview': 'இல்ல முகப்பு', 'Readiness and handoffs': 'தயார்நிலையும் பொறுப்புப் பகிர்வும்', 'Assigned and recurring work': 'ஒதுக்கப்பட்ட மற்றும் தொடரும் பணிகள்',
    'Meals, pantry and shopping': 'உணவு, சரக்கறை மற்றும் வாங்குதல்', 'Repairs, warranties and value': 'பழுது, உத்தரவாதம் மற்றும் மதிப்பு',
    'Service, fuel and renewals': 'சேவை, எரிபொருள் மற்றும் புதுப்பிப்பு', 'Attendance, pay and contacts': 'வருகை, ஊதியம் மற்றும் தொடர்புகள்',
    'Water, energy, waste and garden': 'தண்ணீர், மின்சாரம், கழிவு மற்றும் தோட்டம்', 'Search tasks': 'பணிகளைத் தேடு',
    'All statuses': 'அனைத்து நிலைகளும்', 'To do': 'செய்ய வேண்டும்', 'Done': 'முடிந்தது', 'Task': 'பணி', 'Assigned': 'ஒதுக்கப்பட்டது',
    'Due': 'கடைசி தேதி', 'Status': 'நிலை', 'Actions': 'செயல்கள்', 'Unassigned': 'ஒதுக்கப்படவில்லை', 'Event': 'நிகழ்வு',
    'Previous month': 'முந்தைய மாதம்', 'Next month': 'அடுத்த மாதம்', 'No events this month.': 'இந்த மாதம் நிகழ்வுகள் இல்லை.',
    'Inventory': 'இருப்புப் பட்டியல்', 'Low stock is highlighted automatically': 'குறைந்த இருப்பு தானாகக் காட்டப்படும்', 'Item': 'பொருள்',
    'Meal plan': 'உணவுத் திட்டம்', 'Upcoming family meals': 'வரவிருக்கும் குடும்ப உணவுகள்', 'Meal': 'உணவு', 'No supplies tracked.': 'பொருட்கள் இன்னும் கண்காணிக்கப்படவில்லை.',
    'No meals planned.': 'உணவுகள் இன்னும் திட்டமிடப்படவில்லை.', 'Plan meal': 'உணவைத் திட்டமிடு',
    'Monthly income': 'மாத வருமானம்', 'Planned budget': 'திட்டமிட்ட தொகை', 'Spent this month': 'இந்த மாதச் செலவு', 'Available after plans': 'திட்டங்களுக்குப் பின் மீதம்',
    'Consolidated reporting only': 'ஒருங்கிணைந்த அறிக்கை மட்டும்', 'Budget by family area': 'குடும்பப் பிரிவுப்படி வரவு செலவு', 'Full budget': 'முழுத் திட்டம்',
    'Needs attention': 'கவனம் தேவை', 'All commitments': 'அனைத்துக் கடமைகள்', 'No financial commitments need attention.': 'இப்போது கவனிக்க வேண்டிய பணக் கடமைகள் இல்லை.',
    'Total planned': 'மொத்தத் திட்டம்', 'Predictable monthly': 'மாதந்தோறும் நிலையானது', 'Adjustable spending': 'மாற்றக்கூடிய செலவு', 'Sinking funds': 'எதிர்காலத் தேவைக்கான சேமிப்பு',
    'Edit each budget at its source.': 'ஒவ்வொரு தொகையையும் அதன் பிரிவிலேயே திருத்துங்கள்.', 'Expected income': 'எதிர்பார்க்கும் வருமானம்', 'Planned outflow': 'திட்டமிட்ட வெளியேற்றம்',
    'Goal funding': 'இலக்குச் சேமிப்பு', 'Left to allocate': 'ஒதுக்க மீதமுள்ளது', 'Monthly plan flow': 'மாதாந்திர பணப்புழக்கம்',
    'This month': 'இந்த மாதம்', 'Largest category': 'அதிகச் செலவுப் பிரிவு', 'Transactions': 'பரிவர்த்தனைகள்', 'Daily average': 'தினசரி சராசரி',
    'Read-only report': 'பார்வைக்கு மட்டும்', 'Expense': 'செலவு', 'Family area': 'குடும்பப் பிரிவு', 'Category': 'வகை', 'Date': 'தேதி', 'Amount': 'தொகை', 'Source': 'மூலம்',
    'Assets': 'சொத்துகள்', 'Liabilities': 'கடன்கள்', 'Goal reserves': 'இலக்குச் சேமிப்பு', 'Asset register': 'சொத்துப் பதிவு', 'Savings goals': 'சேமிப்பு இலக்குகள்',
    'Gmail signals': 'Gmail தகவல்கள்', 'Needs a decision': 'முடிவு தேவை', 'Detected value': 'கண்டறிந்த தொகை', 'Added to app': 'செயலியில் சேர்க்கப்பட்டது',
    'Family attention queue': 'குடும்ப கவனப் பட்டியல்', 'No urgent items': 'அவசரமானவை இல்லை', 'Apply': 'சேர்க்க', 'Accounts': 'கணக்குகள்',
    'Frequent senders': 'அடிக்கடி அனுப்புவோர்', 'Family account coverage': 'குடும்ப மின்னஞ்சல் இணைப்பு', 'Processed Gmail evidence': 'செயலாக்கப்பட்ட Gmail தகவல்கள்',
    'Signal': 'தகவல்', 'Family member': 'குடும்ப உறுப்பினர்', 'Received / action': 'பெற்றது / செயல்', 'Decision': 'முடிவு', 'Needs review': 'சரிபார்க்க வேண்டும்',
    'Health records': 'உடல்நலப் பதிவுகள்', 'Upcoming appointments': 'வரவிருக்கும் மருத்துவ சந்திப்புகள்', 'Medicine schedule': 'மருந்து அட்டவணை', 'Emergency contacts': 'அவசரத் தொடர்புகள்'
  };

  const patterns = [
    [/^(\d+) things? to replenish$/, '$1 பொருட்களை மீண்டும் வாங்க வேண்டும்'],
    [/^(\d+) items? need attention$/, '$1 பொருட்களுக்கு கவனம் தேவை'],
    [/^(\d+) remaining$/, '$1 மீதம்'],
    [/^Open (.+)$/, '$1 திற'],
    [/^Edit (.+)$/, '$1 திருத்து']
  ];

  function preferences() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (_) { return {}; }
  }

  function defaultFor(person = HM.persona.current()) {
    return HM.persona.roleGroup(person) === 'parents' ? 'ta' : 'en';
  }

  function current(person = HM.persona.current()) {
    return preferences()[person.id] || defaultFor(person);
  }

  function set(language, person = HM.persona.current()) {
    const next = language === 'en' ? 'en' : 'ta';
    const saved = preferences();
    saved[person.id] = next;
    localStorage.setItem(KEY, JSON.stringify(saved));
    document.documentElement.lang = next === 'ta' ? 'ta' : 'en';
    window.dispatchEvent(new CustomEvent('hm-language-change', { detail: { language: next, personaId: person.id } }));
    return next;
  }

  function t(value, language = current()) {
    const source = String(value ?? '');
    if (language !== 'ta') return source;
    const trimmed = source.trim();
    if (ta[trimmed]) return source.replace(trimmed, ta[trimmed]);
    for (const [pattern, replacement] of patterns) if (pattern.test(trimmed)) return source.replace(trimmed, trimmed.replace(pattern, replacement));
    return source;
  }

  function isHouseholdRoute(route = location.hash.replace(/^#\/?/, '') || 'global/overview') {
    return !route.startsWith('study/');
  }

  function apply(root = document, route) {
    const language = current();
    document.documentElement.lang = language === 'ta' ? 'ta' : 'en';
    document.body.dataset.language = language;
    if (language !== 'ta' || !isHouseholdRoute(route)) return;
    const targets = root instanceof Document ? [document.querySelector('#sidebar'), document.querySelector('.app-header'), document.querySelector('#content'), document.querySelector('#utilityRail'), document.querySelector('#notificationPanel'), document.querySelector('#bottomNav')] : [root];
    targets.filter(Boolean).forEach(target => {
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (node.parentElement?.closest('script,style,textarea,input,[data-no-translate]')) return;
        node.nodeValue = t(node.nodeValue, language);
      });
      target.querySelectorAll('[placeholder],[title],[aria-label]').forEach(element => {
        if (element.closest('[data-no-translate]')) return;
        ['placeholder', 'title', 'aria-label'].forEach(attribute => {
          if (element.hasAttribute(attribute)) element.setAttribute(attribute, t(element.getAttribute(attribute), language));
        });
      });
    });
  }

  function observe() {
    if (!document.body || window.__hmLanguageObserver) return;
    window.__hmLanguageObserver = new MutationObserver(mutations => {
      if (current() !== 'ta' || !isHouseholdRoute()) return;
      const roots = new Set();
      mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) roots.add(node);
        else if (node.nodeType === Node.TEXT_NODE && node.parentElement) roots.add(node.parentElement);
      }));
      roots.forEach(root => apply(root));
    });
    window.__hmLanguageObserver.observe(document.body, { childList: true, subtree: true });
  }

  window.HM.i18n = { KEY, current, set, t, apply, observe, isHouseholdRoute };
  observe();
})();
