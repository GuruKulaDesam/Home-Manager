(function () {
  const D = HM.data;
  const e = D.esc;
  let activeRenderRoute = '';

  const groups = {
    today: { label: 'Today', icon: 'sparkles', note: 'What needs attention now', route: 'global/overview', items: [
      ['Today', 'sparkles', 'global/overview'], ['Inbox intelligence', 'mail-search', 'global/intelligence'], ['Help & Guide', 'circle-help', 'global/questions']
    ]},
    household: { label: 'Household', icon: 'house', note: 'Run the home', route: 'home/overview', items: [
      ['Overview', 'layout-dashboard', 'home/overview'], ['Tasks & routines', 'list-checks', 'home/tasks'], ['Food & supplies', 'shopping-basket', 'home/inventory'], ['Property & assets', 'wrench', 'home/property'], ['Domestic help', 'hand-helping', 'home/life/help'], ['Sustainability', 'leaf', 'home/life/sustainability']
    ]},
    kitchen: { label: 'Kitchen', icon: 'cooking-pot', note: 'Cook, plan and replenish', route: 'kitchen/overview', items: [
      ['Kitchen home', 'cooking-pot', 'kitchen/overview'], ['100 Tamil recipes', 'book-open', 'kitchen/recipes'], ['Weekly menus', 'calendar-range', 'kitchen/menus'], ['Pantry & refills', 'package-open', 'kitchen/pantry'], ['Shopping list', 'shopping-cart', 'kitchen/shopping']
    ]},
    family: { label: 'Family', icon: 'users-round', note: 'Plans and togetherness', route: 'home/family', items: [
      ['Overview', 'users-round', 'home/family'], ['Calendar', 'calendar-days', 'home/calendar'], ['Celebrations', 'party-popper', 'home/life/festivals'], ['Documents', 'folders', 'home/life/documents'], ['Contacts', 'contact-round', 'home/directory'], ['Protection & legacy', 'shield-check', 'home/family/protection']
    ]},
    money: { label: 'Money', icon: 'indian-rupee', note: 'Consolidated family reporting', route: 'home/finance', items: [
      ['Overview', 'layout-dashboard', 'home/finance'], ['Budget', 'chart-pie', 'home/money/budget'], ['Cash flow', 'arrow-right-left', 'home/money/cashflow'], ['Spending', 'wallet-cards', 'home/money/spending'], ['Commitments', 'calendar-sync', 'home/money/commitments'], ['Net worth', 'scale', 'home/money/networth'], ['Reports', 'chart-no-axes-combined', 'home/money/reports']
    ]},
    care: { label: 'Care', icon: 'heart-handshake', note: 'Health and safety', route: 'home/care', items: [
      ['Overview', 'heart-handshake', 'home/care'], ['Health', 'heart-pulse', 'home/life/health'], ['Medicines', 'pill', 'home/life/medicines'], ['Appointments', 'stethoscope', 'home/life/appointments'], ['Elder care', 'accessibility', 'home/life/elders'], ['Emergency', 'siren', 'home/life/emergency'], ['Pets', 'paw-print', 'home/life/pets']
    ]},
    travel: { label: 'Travel', icon: 'luggage', note: 'Every journey and vehicle', route: 'home/travel', items: [
      ['Overview', 'map', 'home/travel'], ['Trips', 'route', 'home/life/travel'], ['Transportation', 'bus-front', 'home/life/transport'], ['Vehicles', 'car-front', 'home/life/vehicles'], ['Hotels & stays', 'bed-double', 'home/life/stays'], ['Insurance & documents', 'shield-check', 'home/life/travelProtection'], ['Spending', 'wallet-cards', 'home/travel/spending']
    ]},
    web: { label: 'Web Life', icon: 'globe-2', note: 'Accounts, habits and digital costs', route: 'home/web', items: [
      ['Overview', 'layout-dashboard', 'home/web'], ['Email & accounts', 'at-sign', 'home/life/webAccounts'], ['AI services', 'sparkles', 'home/life/aiServices'], ['Subscriptions', 'repeat-2', 'home/life/subscriptions'], ['Browsing habits', 'history', 'home/life/webHabits'], ['Games & apps', 'gamepad-2', 'home/life/games'], ['Privacy & devices', 'shield-check', 'home/life/digital']
    ]},
    entertainment: { label: 'Entertainment', icon: 'clapperboard', note: 'Watch, listen, read and go out', route: 'home/entertainment', items: [
      ['Overview', 'layout-dashboard', 'home/entertainment'], ['Watch', 'clapperboard', 'home/life/watch'], ['Listen', 'headphones', 'home/life/listen'], ['Read', 'book-open', 'home/life/reading'], ['Play & games', 'gamepad-2', 'home/life/play'], ['Outings & events', 'ticket', 'home/life/outings'], ['Spending', 'wallet-cards', 'home/entertainment/spending']
    ]},
    learning: { label: 'Education', icon: 'graduation-cap', note: 'Study and development', route: 'study/curriculum', items: [
      ['Curriculum', 'route', 'study/curriculum'], ['Planner', 'calendar-clock', 'study/planner'], ['Overview', 'activity', 'study/overview'], ['Progress', 'chart-no-axes-combined', 'study/reports']
    ]},
    community: { label: 'Community', icon: 'map-pinned', note: 'Local participation', route: 'community/overview', items: [
      ['Overview', 'map', 'community/overview'], ['Updates', 'newspaper', 'community/feed'], ['Events & polls', 'calendar-heart', 'community/participate'], ['Volunteer', 'hand-heart', 'community/volunteer'], ['Civic issues', 'ticket-check', 'community/tickets'], ['Local services', 'life-buoy', 'community/directory'], ['Guides', 'book-marked', 'community/guides']
    ]}
  };

  const settingsGroups = [
    ['household', 'Household profile', 'house', 'Home address, language and family defaults'],
    ['people', 'People & roles', 'users-round', 'Members, caregivers, contacts and consent'],
    ['app', 'App & data', 'settings-2', 'Mountain backgrounds, Google sync, privacy and backup']
  ];

  const natureBackgrounds = [
    ['waterfall', 'Mountain falls'], ['river', 'Spiti river'], ['fern', 'Misty forest'],
    ['meadow', 'Alpine meadow'], ['lotus', 'Sunrise lake'], ['monsoon', 'Monsoon peaks'],
    ['sunrise', 'Munnar sunrise'], ['glacier', 'Glacier mountains'], ['bamboo', 'Rocky forest'],
    ['sky', 'Peaks above clouds'], ['grove', 'Evergreen valley'], ['wildflower', 'Wildflower slopes']
  ];

  const textbookCatalog = [
    { id: 'g7-math-1', code: 'gegp1', grade: 7, subject: 'Mathematics', title: 'Ganita Prakash Part I', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gegp1=0-8' },
    { id: 'g7-math-2', code: 'gegp2', grade: 7, subject: 'Mathematics', title: 'Ganita Prakash Part II', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gegp2=0-7' },
    { id: 'g7-science', code: 'gecu1', grade: 7, subject: 'Science', title: 'Curiosity', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gecu1=0-12' },
    { id: 'g7-english', code: 'gepr1', grade: 7, subject: 'English', title: 'Poorvi', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gepr1=0-5' },
    { id: 'g7-social-1', code: 'gees1', grade: 7, subject: 'Social Science', title: 'Exploring Society: India and Beyond Part I', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gees1=0-12' },
    { id: 'g7-social-2', code: 'gees2', grade: 7, subject: 'Social Science', title: 'Exploring Society: India and Beyond Part II', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gees2=0-8' },
    { id: 'g7-hindi', code: 'ghml1', grade: 7, subject: 'Hindi', title: 'Malhar', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?ghml1=0-10' },
    { id: 'g7-skills', code: 'gekb1', grade: 7, subject: 'Kaushal Bodh', title: 'Kaushal Bodh', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?gekb1=0-7' },
    { id: 'g7-tamil', grade: 7, subject: 'Tamil', title: 'Class 7 Tamil — Complete Book', publisher: 'Family-supplied CBSE Tamil edition', sourceUrl: 'https://cbsetamil.com/ncert-tamil-book-for-class-7-pdf/' },
    { id: 'g12-math-1', code: 'lemh1', grade: 12, subject: 'Mathematics', title: 'Mathematics Part I', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?lemh1=0-6' },
    { id: 'g12-math-2', code: 'lemh2', grade: 12, subject: 'Mathematics', title: 'Mathematics Part II', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?lemh2=0-7' },
    { id: 'g12-physics-1', code: 'leph1', grade: 12, subject: 'Physics', title: 'Physics Part I', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?leph1=0-8' },
    { id: 'g12-physics-2', code: 'leph2', grade: 12, subject: 'Physics', title: 'Physics Part II', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?leph2=0-6' },
    { id: 'g12-chemistry-1', code: 'lech1', grade: 12, subject: 'Chemistry', title: 'Chemistry Part I', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?lech1=0-5' },
    { id: 'g12-chemistry-2', code: 'lech2', grade: 12, subject: 'Chemistry', title: 'Chemistry Part II', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?lech2=0-5' },
    { id: 'g12-english-1', code: 'lefl1', grade: 12, subject: 'English Core', title: 'Flamingo', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?lefl1=0-13' },
    { id: 'g12-english-2', code: 'levt1', grade: 12, subject: 'English Core', title: 'Vistas', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?levt1=0-6' },
    { id: 'g12-cs', code: 'lecs1', grade: 12, subject: 'Computer Science', title: 'Computer Science', publisher: 'NCERT', sourceUrl: 'https://ncert.nic.in/textbook.php?lecs1=0-13' }
  ];

  const bundledBookParts = {
    gegp1: ['ps','01','02','03','04','05','06','07','08'], gegp2: ['ps','01','02','03','04','05','06','07'],
    gecu1: ['ps','01','02','03','04','05','06','07','08','09','10','11','12'], gepr1: ['ps','01','02','03','04','05'],
    gees1: ['ps','01','02','03','04','05','06','07','08','09','10','11','12'], gees2: ['ps','01','02','03','04','05','06','07','08'],
    ghml1: ['ps','01','02','03','04','05','06','07','08','09','10'], gekb1: ['ps','01','02','03','04','05','06','07'],
    lemh1: ['01','02','03','04','05','06','a1','a2','an','ps'], lemh2: ['01','02','03','04','05','06','07','an','ps'],
    leph1: ['01','02','03','04','05','06','07','08','an','ps'], leph2: ['01','02','03','04','05','06','an','ps'],
    lech1: ['01','02','03','04','05','a1','an','ps'], lech2: ['01','02','03','04','05','an','ps'],
    lefl1: ['01','02','03','04','05','06','07','08','11','12','13','14','15','ps'], levt1: ['01','02','03','04','05','06','ps'],
    lecs1: ['01','02','03','04','05','06','07','08','09','10','11','12','13','ps']
  };
  // Titles transcribed from the opening page of each bundled NCERT section.
  const bundledBookTitles = {
    gegp1: { ps: 'Prelims', '01': 'Large Numbers Around Us', '02': 'Arithmetic Expressions', '03': 'A Peek Beyond the Point', '04': 'Expressions Using Letter-Numbers', '05': 'Parallel and Intersecting Lines', '06': 'Number Play', '07': 'A Tale of Three Intersecting Lines', '08': 'Working with Fractions' },
    gegp2: { ps: 'Prelims', '01': 'Geometric Twins', '02': 'Operations with Integers', '03': 'Finding Common Ground', '04': 'Another Peek Beyond the Point', '05': 'Connecting the Dots…', '06': 'Constructions and Tilings', '07': 'Finding the Unknown' },
    gecu1: { ps: 'Prelims', '01': 'The Ever-Evolving World of Science', '02': 'Exploring Substances: Acidic, Basic, and Neutral', '03': 'Electricity: Circuits and Their Components', '04': 'The World of Metals and Non-metals', '05': 'Changes Around Us: Physical and Chemical', '06': 'Adolescence: A Stage of Growth and Change', '07': 'Heat Transfer in Nature', '08': 'Measurement of Time and Motion', '09': 'Life Processes in Animals', '10': 'Life Processes in Plants', '11': 'Light: Shadows and Reflections', '12': 'Earth, Moon, and the Sun' },
    gepr1: { ps: 'Prelims', '01': 'Learning Together', '02': 'Wit and Humour', '03': 'Dreams and Discoveries', '04': 'Travel and Adventure', '05': 'Bravehearts' },
    gees1: { ps: 'Prelims', '01': 'Geographical Diversity of India', '02': 'Understanding the Weather', '03': 'Climates of India', '04': 'New Beginnings: Cities and States', '05': 'The Rise of Empires', '06': 'The Age of Reorganisation', '07': 'The Gupta Era: An Age of Tireless Creativity', '08': 'How the Land Becomes Sacred', '09': 'From the Rulers to the Ruled: Types of Governments', '10': 'The Constitution of India — An Introduction', '11': 'From Barter to Money', '12': 'Understanding Markets' },
    gees2: { ps: 'Prelims', '01': 'The Story of Indian Farming', '02': 'India and Her Neighbours', '03': 'Empires and Kingdoms: 6th to 10th Centuries', '04': 'Turning Tides: 11th and 12th Centuries', '05': 'India, a Home to Many', '06': 'The State, the Government, and You', '07': 'Infrastructure: Engine of India’s Development', '08': 'Banks and the Magic of Finance' },
    ghml1: { ps: 'प्रारंभिक पृष्ठ', '01': 'माँ, कह एक कहानी', '02': 'तीन बुद्धिमान', '03': 'फूल और काँटा', '04': 'पानी रे पानी', '05': 'नहीं होना बीमार', '06': 'गिरिधर कविराय की कुंडलियाँ', '07': 'वर्षा-बहार', '08': 'बिरजू महाराज से साक्षात्कार', '09': 'चिड़िया', '10': 'मीरा के पद' },
    gekb1: { ps: 'Prelims', '01': 'Work with Life Forms — Part 1', '02': 'School Habitat Garden', '03': 'Work with Machines and Materials — Part 2', '04': 'AI Assistant', '05': 'Work in Human Services — Part 3', '06': 'Family Health Handbook', '07': 'Planning for Kaushal Mela' },
    lemh1: { '01': 'Relations and Functions', '02': 'Inverse Trigonometric Functions', '03': 'Matrices', '04': 'Determinants', '05': 'Continuity and Differentiability', '06': 'Applications of Derivatives', a1: 'Appendix 1', a2: 'Appendix 2', an: 'Answers', ps: 'Prelims' },
    lemh2: { '01': 'Integrals', '02': 'Applications of Integrals', '03': 'Differential Equations', '04': 'Vector Algebra', '05': 'Three Dimensional Geometry', '06': 'Linear Programming', '07': 'Probability', an: 'Answers', ps: 'Prelims' },
    leph1: { '01': 'Electric Charges and Fields', '02': 'Electrostatic Potential and Capacitance', '03': 'Current Electricity', '04': 'Moving Charges and Magnetism', '05': 'Magnetism and Matter', '06': 'Electromagnetic Induction', '07': 'Alternating Current', '08': 'Electromagnetic Waves', an: 'Answers', ps: 'Prelims' },
    leph2: { '01': 'Ray Optics and Optical Instruments', '02': 'Wave Optics', '03': 'Dual Nature of Radiation and Matter', '04': 'Atoms', '05': 'Nuclei', '06': 'Semiconductor Electronics: Materials, Devices and Simple Circuits', an: 'Answers', ps: 'Prelims' },
    lech1: { '01': 'Solutions', '02': 'Electrochemistry', '03': 'Chemical Kinetics', '04': 'The d- and f-Block Elements', '05': 'Coordination Compounds', a1: 'Appendix 1', an: 'Answers', ps: 'Prelims' },
    lech2: { '01': 'Haloalkanes and Haloarenes', '02': 'Alcohols, Phenols and Ethers', '03': 'Aldehydes, Ketones and Carboxylic Acids', '04': 'Amines', '05': 'Biomolecules', an: 'Answers', ps: 'Prelims' },
    lefl1: { '01': 'The Last Lesson', '02': 'Lost Spring', '03': 'Deep Water', '04': 'The Rattrap', '05': 'Indigo', '06': 'Poets and Pancakes', '07': 'The Interview', '08': 'Going Places', '11': 'My Mother at Sixty-six', '12': 'Keeping Quiet', '13': 'A Thing of Beauty', '14': 'A Roadside Stand', '15': 'Aunt Jennifer’s Tigers', ps: 'Prelims' },
    levt1: { '01': 'The Third Level', '02': 'The Tiger King', '03': 'Journey to the End of the Earth', '04': 'The Enemy', '05': 'On the Face of It', '06': 'Memories of Childhood', ps: 'Prelims' },
    lecs1: { '01': 'Exception Handling in Python', '02': 'File Handling in Python', '03': 'Stack', '04': 'Queue', '05': 'Sorting', '06': 'Searching', '07': 'Understanding Data', '08': 'Database Concepts', '09': 'Structured Query Language', '10': 'Computer Networks', '11': 'Data Communication', '12': 'Security Aspects', '13': 'Project Based Learning', ps: 'Prelims' }
  };
  const textbookAsset = path => path;
  textbookCatalog.forEach(book => {
    if (!book.code) return;
    const nested = book.code === 'lefl1' ? '/lefl1dd' : '';
    const gradeFolder = book.grade === 7 ? 'class-7' : 'class-12';
    book.pdfFiles = bundledBookParts[book.code].map((part, index) => ({ label: bundledBookTitles[book.code][part], url: textbookAsset(`assets/textbooks/${gradeFolder}/${book.code}${nested}/${book.code}${part}.pdf`), order: index + 1 }));
  });
  textbookCatalog.find(book => book.id === 'g7-tamil').pdfFiles = [
    ['அமுதத் தமிழ்', 11], ['அணிநிழல் காடு', 35], ['நாடு அதை நாடு', 61], ['அறிவியல் ஆக்கம்', 85], ['ஓதுவது ஒழியேல்', 109], ['கலைவண்ணம்', 131], ['நயத்தகு நாகரிகம்', 157], ['ஒப்புரவு ஒழுகு', 177], ['மானுடம் வெல்லும்', 201]
  ].map(([label, page], index) => ({ key: `tamil-unit-${index + 1}`, label, page, url: textbookAsset('assets/textbooks/class-7/tamil/tamil7-cbse-complete.pdf'), order: index + 1 }));

  const titles = {
    'global/overview': ['Today', 'Your home command center'],
    'global/intelligence': ['Inbox Intelligence', 'Decisions from family Gmail signals'],
    'global/questions': ['Help & Guide', 'Purpose, workflows and product answers'],
    'global/settings': ['Settings', 'Appearance, data and privacy'],
    'home/overview': ['Home Overview', 'Your household at a glance'],
    'home/tasks': ['Home Tasks', 'Responsibilities, reminders and maintenance'],
    'home/calendar': ['Family Calendar', 'Household plans and shared events'],
    'home/family': ['Family', 'Members, wellbeing and recognition'],
    'home/family/protection': ['Protection & Legacy', 'Cover, nominations and family continuity'],
    'home/care': ['Care Overview', 'Family health, treatment and safety actions'],
    'home/finance': ['Money Overview', 'Consolidated family financial reporting'],
    'home/money/budget': ['Family Budget', 'Plans entered in each family section'],
    'home/money/cashflow': ['Cash Flow', 'Income, commitments and available money'],
    'home/money/spending': ['Spending', 'Read-only activity from every family section'],
    'home/money/commitments': ['Commitments', 'Bills, renewals and recurring obligations'],
    'home/money/networth': ['Net Worth', 'Household assets, liabilities and goals'],
    'home/money/reports': ['Money Reports', 'Trends, watchlists and exceptions'],
    'home/inventory': ['Supplies & Meals', 'Inventory and meal planning'],
    'kitchen/overview': ['Kitchen', 'Tamil food, weekly planning and pantry readiness'],
    'kitchen/recipes': ['Tamil Recipe Library', '100 traditional dishes with a clear everyday purpose'],
    'kitchen/menus': ['Weekly Menus', 'Seven Tamil home menus, from heritage to modern'],
    'kitchen/pantry': ['Pantry & Refills', 'What is available and what needs replenishment'],
    'kitchen/shopping': ['Shopping List', 'A practical refill list generated from pantry levels'],
    'home/assets': ['Property & Assets', 'Repairs, property records and household assets'],
    'home/wisdom': ['Wisdom & Recognition', 'Family knowledge and points'],
    'home/directory': ['Home Directory', 'Family and service contacts'],
    'home/property': ['Property & Assets', 'Repairs, property records and household assets'],
    'home/travel': ['Travel', 'Trips, transportation, vehicles, stays and protection'],
    'home/travel/spending': ['Travel Spending', 'Costs across trips, transport, vehicles and stays'],
    'home/web': ['Web Life', 'Accounts, online habits, services, games and digital costs'],
    'home/entertainment': ['Entertainment', 'What your family watches, listens to, reads, plays and attends'],
    'home/entertainment/spending': ['Entertainment Spending', 'Recurring and one-time leisure costs'],
    'community/overview': ['Community Overview', 'Your local personal planner'],
    'community/feed': ['News & Forum', 'Locally stored neighbourhood notes'],
    'community/events': ['Community Events', 'Meetings, markets and local activities'],
    'community/polls': ['Community Polls', 'Preferences stored in this browser'],
    'community/volunteer': ['Volunteer', 'Personal participation planner'],
    'community/tickets': ['Civic Tickets', 'Personal issue follow-up log'],
    'community/directory': ['Community Services', 'Essential local contacts'],
    'community/guides': ['Civic Guides', 'Self-service local information'],
    'community/participate': ['Events & Polls', 'Plans and local preferences'],
    'study/overview': ['Education Dashboard', 'Peepal and CBSE progress'],
    'study/books': ['Books', 'Focused local textbook library'],
    'study/genius': ['Genius Mind', 'Top-student methods, key concepts and chapter recall'],
    'study/jee': ['JEE Main', 'PCM concepts, worked reasoning and exam practice'],
    'study/curriculum': ['Curriculum', 'One connected journey through every curriculum chapter'],
    'study/planner': ['Study Planner', 'School day and home study'],
    'study/assignments': ['Assignments', 'Homework, projects and practicals'],
    'study/assessments': ['Practice & Tests', 'Chapter questions, assessments and error repair'],
    'study/practice': ['Practice & Tests', 'Chapter questions, assessments and error repair'],
    'study/reports': ['Education Reports', 'Academic and whole-child review']
  };
  titles['home/life'] = ['Family Life Registry', 'Every important family record in one place'];
  Object.entries(HM.life.domains).forEach(([key, config]) => {
    titles[`home/life/${key}`] = [config.title, config.note];
  });
  settingsGroups.forEach(item => { titles[`settings/${item[0]}`] = [item[1], item[3]]; });

  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, Number(value) || 0));
  const isoDay = value => String(value || '').slice(0, 10);
  const today = () => {
    const value = new Date();
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  };
  const eventRoute = context => context === 'community' ? 'community/events' : context === 'study' ? 'study/schedule' : 'home/calendar';
  const taskRoute = context => context === 'study' ? 'study/tasks' : context === 'community' ? 'community/overview' : 'home/tasks';
  const activePersona = () => HM.persona.current();
  const personaScope = items => HM.persona.scope(items);

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

  function workspacePanel(service, iconName, title, description, controls, results = '', preferredPersonId = '') {
    const accounts = (D.state.settings.googleSync?.accounts || []).filter(account => account.email && account.consent);
    if (!accounts.length && service === 'notes') return `<section class="panel google-workflow google-notes" data-google-service="notes"><div class="section-head"><div><span class="section-kicker">QUICK NOTES</span><h2>${e(title)}</h2><p>${e(description)}</p></div><button data-route="settings/app">Set up Google sharing</button></div><div class="google-workflow-controls">${controls}</div>${results ? `<div class="google-workflow-results">${results}</div>` : ''}</section>`;
    if (!accounts.length) return `<section class="panel google-workflow google-${e(service)}"><div class="section-head"><div><span class="section-kicker">GOOGLE ${e(service.toUpperCase())}</span><h2>${e(title)}</h2><p>Map a consenting family Google account before using this workflow.</p></div><button data-route="settings/app">Set up accounts</button></div></section>`;
    const personaId = activePersona().isFamily ? '' : activePersona().id;
    const selected = HM.workspace?.selected?.[service] || accounts.find(account => account.personId === (preferredPersonId || personaId))?.slotId || accounts[0].slotId;
    return `<section class="panel google-workflow google-${e(service)}" data-google-service="${e(service)}"><div class="section-head"><div><span class="section-kicker">GOOGLE ${e(service.toUpperCase())}</span><h2>${e(title)}</h2><p>${e(description)}</p></div><label class="google-account-picker"><span>Family account</span><select data-google-workspace-account aria-label="Google account for ${e(title)}">${accounts.map(account => `<option value="${e(account.slotId)}" ${account.slotId === selected ? 'selected' : ''}>${e(D.state.people.find(person => person.id === account.personId)?.name || account.email)} - ${e(account.email)}</option>`).join('')}</select></label></div><div class="google-workflow-controls">${controls}</div>${results ? `<div class="google-workflow-results">${results}</div>` : ''}</section>`;
  }

  function quickNotesPanel() {
    const persona = activePersona();
    const notes = personaScope(D.state.quickNotes || []).filter(item => item.status !== 'archived').sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 7);
    const results = notes.length ? notes.map(item => `<div class="row"><span class="source-icon">${icon('sticky-note')}</span><div class="grow"><b>${e(item.text)}</b><small>${D.date(item.createdAt)} - ${e(D.state.people.find(person => person.id === item.ownerId)?.name || 'Family')}</small></div><button data-google-action="note-task" data-note-id="${e(item.id)}">${icon('list-checks')}<span>Tasks</span></button><button data-google-action="note-doc" data-note-id="${e(item.id)}">${icon('file-text')}<span>Docs</span></button><button class="icon-action" data-note-archive="${e(item.id)}" aria-label="Archive note">${icon('archive')}</button></div>`).join('') : '<p class="empty">No quick notes. Capture a thought without leaving Today.</p>';
    return workspacePanel('notes', 'sticky-note', persona.isFamily ? 'Quick Notes' : `${persona.name}'s Quick Notes`, 'Notes stay in Home Manager. Send one to Google Tasks or Docs when it needs a shared destination.', `<input data-google-note-text maxlength="500" placeholder="Write a ${persona.isFamily ? 'family' : 'personal'} note"><select data-google-note-owner aria-label="Note owner">${D.state.people.map(person => `<option value="${e(person.id)}" ${person.id === persona.id ? 'selected' : ''}>${e(person.name)}</option>`).join('')}</select><button class="primary" data-google-action="note-add">${icon('plus')}<span>Add note</span></button>`, results);
  }

  function drivePanel() {
    const files = HM.workspace?.cache?.drive || [];
    const results = files.length ? files.map(file => `<div class="row"><span class="source-icon">${icon('file')}</span><div class="grow"><b>${e(file.name)}</b><small>${e(file.mimeType || 'File')} - ${file.modifiedTime ? D.date(file.modifiedTime) : 'No date'}</small></div>${file.webViewLink ? `<a class="button-link" href="${e(file.webViewLink)}" target="_blank" rel="noopener noreferrer">Open</a>` : ''}<button class="icon-action danger-action" data-google-action="drive-delete" data-file-id="${e(file.id)}" aria-label="Delete ${e(file.name)}">${icon('trash-2')}</button></div>`).join('') : '<p class="empty">No app-created or explicitly selected Drive files loaded.</p>';
    return workspacePanel('drive', 'hard-drive', 'Family documents in Drive', 'Browse only files this app created or you explicitly shared with it. Uploads remain in the selected account.', `<button data-google-action="drive-list">${icon('refresh-cw')}<span>Refresh files</span></button><label class="primary file-button">${icon('upload')}<span>Upload document</span><input data-google-drive-file type="file" hidden></label>`, results);
  }

  function contactsPanel() {
    const contacts = HM.workspace?.cache?.contacts || [];
    const results = contacts.length ? contacts.map(contact => `<div class="row"><span class="source-icon">${icon('contact')}</span><div class="grow"><b>${e(contact.name)}</b><small>${e(contact.email || contact.phone || 'No contact detail')}</small></div><button data-google-action="contact-import" data-contact-id="${e(contact.id)}">${icon('user-plus')}<span>Import</span></button></div>`).join('') : '<p class="empty">No Google contacts loaded.</p>';
    return workspacePanel('contacts', 'contact', 'Google Contacts', 'Review contacts from one family account and import only the people needed in the Home Directory.', `<button class="primary" data-google-action="contacts-list">${icon('refresh-cw')}<span>Load contacts</span></button>`, results);
  }

  function calendarPanel() {
    const events = HM.workspace?.cache?.calendar || [];
    const results = events.length ? events.map(item => `<div class="row"><span class="source-icon">${icon(item.hangoutLink ? 'video' : 'calendar-days')}</span><div class="grow"><b>${e(item.summary || 'Untitled event')}</b><small>${D.date(item.start?.dateTime || item.start?.date)}${item.hangoutLink ? ' - Meet ready' : ''}</small></div><button data-google-action="calendar-import" data-event-id="${e(item.id)}">${icon('download')}<span>Import</span></button></div>`).join('') : '<p class="empty">No Google Calendar events loaded.</p>';
    return workspacePanel('calendar', 'calendar-sync', 'Google Calendar & Meet', 'Read upcoming events or create a family event. Meet links are created as part of the calendar event.', `<button data-google-action="calendar-list">${icon('refresh-cw')}<span>Load upcoming</span></button><input data-google-event-title maxlength="120" placeholder="Event title"><input data-google-event-start type="datetime-local" aria-label="Event start"><button class="primary" data-google-action="calendar-create">${icon('calendar-plus')}<span>Create event</span></button><button data-google-action="calendar-meet">${icon('video')}<span>Create with Meet</span></button>`, results);
  }

  function tasksPanel() {
    const tasks = HM.workspace?.cache?.tasks || [];
    const results = tasks.length ? tasks.map(item => `<div class="row"><input type="checkbox" data-google-action="task-toggle" data-task-id="${e(item.id)}" data-task-list-id="${e(item.taskListId)}" ${item.status === 'completed' ? 'checked' : ''} aria-label="Complete ${e(item.title)}"><div class="grow"><b>${e(item.title)}</b><small>${e(item.listTitle || 'Google Tasks')}${item.due ? ` - ${D.date(item.due)}` : ''}</small></div><button data-google-action="task-import" data-task-id="${e(item.id)}">${icon('download')}<span>Import</span></button></div>`).join('') : '<p class="empty">No Google tasks loaded.</p>';
    return workspacePanel('tasks', 'list-checks', 'Google Tasks', 'Bring assigned work into the household list, create a Google task, or complete it from here.', `<button data-google-action="tasks-list">${icon('refresh-cw')}<span>Load tasks</span></button><input data-google-task-title maxlength="120" placeholder="New task"><button class="primary" data-google-action="task-create">${icon('plus')}<span>Create in Google</span></button>`, results);
  }

  function classroomPanel(studentId) {
    const work = HM.workspace?.cache?.classroom || [];
    const results = work.length ? work.map(item => `<div class="row"><span class="source-icon">${icon('school')}</span><div class="grow"><b>${e(item.title)}</b><small>${e(item.courseName)}${item.dueDate ? ` - due ${D.date(item.dueDate)}` : ''}</small></div><button data-google-action="classroom-import" data-work-id="${e(item.id)}">${icon('download')}<span>Import</span></button></div>`).join('') : '<p class="empty">No active Classroom work loaded for this learner.</p>';
    return workspacePanel('classroom', 'school', 'Google Classroom', 'Load active coursework for the selected learner and review before importing it as an assignment.', `<button class="primary" data-google-action="classroom-list" data-student-id="${e(studentId)}">${icon('refresh-cw')}<span>Load coursework</span></button>`, results, studentId);
  }

  function sheetsPanel() {
    const sheet = HM.workspace?.cache?.sheets;
    const results = sheet ? `<div class="row"><span class="source-icon">${icon('file-spreadsheet')}</span><div class="grow"><b>${e(sheet.name)}</b><small>Expense and budget snapshot exported from current Home Manager records</small></div><a class="button-link" href="${e(sheet.url)}" target="_blank" rel="noopener noreferrer">Open sheet</a></div>` : '';
    return workspacePanel('sheets', 'file-spreadsheet', 'Google Sheets report', 'Create a dated spreadsheet from the consolidated expense and budget data shown on this page.', `<button class="primary" data-google-action="sheets-export">${icon('file-spreadsheet')}<span>Export current report</span></button>`, results);
  }

  function docsPanel() {
    const doc = HM.workspace?.cache?.docs;
    const results = doc ? `<div class="row"><span class="source-icon">${icon('file-text')}</span><div class="grow"><b>${e(doc.name)}</b><small>Created from the current family wisdom entries</small></div><a class="button-link" href="${e(doc.url)}" target="_blank" rel="noopener noreferrer">Open document</a></div>` : '';
    return workspacePanel('docs', 'file-text', 'Google Docs family book', 'Create a shareable document from recipes, traditions and family knowledge already reviewed here.', `<button class="primary" data-google-action="docs-export">${icon('file-plus-2')}<span>Create family book</span></button>`, results);
  }

  function slidesPanel(studentId) {
    const deck = HM.workspace?.cache?.slides;
    const assignments = (D.state.academicDeliverables || []).filter(item => item.studentId === studentId);
    const results = deck ? `<div class="row"><span class="source-icon">${icon('presentation')}</span><div class="grow"><b>${e(deck.name)}</b><small>Project starter deck created in Google Slides</small></div><a class="button-link" href="${e(deck.url)}" target="_blank" rel="noopener noreferrer">Open deck</a></div>` : '';
    return workspacePanel('slides', 'presentation', 'Google Slides project deck', 'Choose one Home Manager assignment and generate a structured title and planning slide in the learner account.', `<select data-google-slide-work aria-label="Assignment for presentation">${assignments.map(item => `<option value="${e(item.id)}">${e(item.title)}</option>`).join('')}</select><button class="primary" data-google-action="slides-create" data-student-id="${e(studentId)}" ${assignments.length ? '' : 'disabled'}>${icon('presentation')}<span>Create project deck</span></button>`, results, studentId);
  }

  function unified() {
    const s = D.state;
    const persona = activePersona();
    const day = today();
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    const weekIso = weekStart.toISOString().slice(0, 10);
    const openTasks = personaScope(s.tasks).filter(x => D.status(x.status) !== 'done');
    const overdue = openTasks.filter(x => x.dueAt && isoDay(x.dueAt) < day);
    const upcomingEvents = s.events.filter(x => isoDay(x.startAt) >= day).sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)));
    const lowStock = s.inventoryItems.filter(x => (+x.quantity || 0) <= 2);
    const month = day.slice(0, 7);
    const monthSpend = s.expenses.filter(x => isoDay(x.date).startsWith(month)).reduce((sum, x) => sum + (+x.amount || 0), 0);
    const lifeRecords = HM.life.ensure();
    const horizonDate = new Date(); horizonDate.setDate(horizonDate.getDate() + 30);
    const horizon = horizonDate.toISOString().slice(0, 10);
    const lifeDue = personaScope(lifeRecords).filter(x => x.dueDate && x.dueDate <= horizon && !['done', 'paid'].includes(x.status)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
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
    const people = persona.isFamily ? s.people.slice(0, 6) : s.people.filter(person => person.id === persona.id);
    const nextMeal = mealsToday[0] || s.meals.filter(x => isoDay(x.date) > day).sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
    const ownerClass = owner => `person-${Math.max(0, s.people.findIndex(person => person.name === owner)) % 6}`;
    const dayLabel = value => value === day ? 'Today' : value === weekDays[1].iso ? 'Tomorrow' : new Date(`${value}T00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
    const timeLabel = item => item.kind === 'event' && item.starts ? new Date(item.starts).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) : item.kind === 'due' ? 'Due' : 'Any time';

    return `${persona.isFamily ? `<section class="family-filter" aria-label="Filter the agenda by family member">
        <button class="active" data-agenda-person="all" aria-pressed="true"><span class="member-avatar all">${icon('users-round')}</span><span>Everyone</span></button>
        ${people.map((person, index) => `<button data-agenda-person="${e(person.name.toLowerCase())}" aria-pressed="false"><span class="member-avatar person-${index % 6}">${e(person.name[0])}</span><span>${e(person.name.split(' ')[0])}</span></button>`).join('')}
      </section>` : ''}
      <section class="household-status" aria-label="Household status">
        <button data-route="home/tasks"><span class="status-icon teal">${icon('list-checks')}</span><span><small>Open tasks</small><b>${openTasks.length}</b></span><em>${overdue.length ? `${overdue.length} overdue` : 'On track'}</em></button>
        <button data-route="home/calendar"><span class="status-icon violet">${icon('calendar-days')}</span><span><small>Coming up</small><b>${upcomingEvents.length}</b></span><em>Events</em></button>
        <button data-route="home/inventory"><span class="status-icon green">${icon('shopping-basket')}</span><span><small>Low stock</small><b>${lowStock.length}</b></span><em>Items</em></button>
        <button data-route="home/finance"><span class="status-icon purple">${icon('indian-rupee')}</span><span><small>This month</small><b>${D.money(monthSpend)}</b></span><em>Spending</em></button>
      </section>
      <div class="family-board">
        <section class="day-plan">
          <div class="board-heading"><div><span class="section-kicker">${persona.isFamily ? 'THE FAMILY PLAN' : `${e(persona.name.toUpperCase())}'S PLAN`}</span><h2>${persona.isFamily ? 'Today and next' : 'What matters to me'}</h2></div><button data-route="home/calendar">Open calendar ${icon('arrow-right')}</button></div>
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
      </div>${quickNotesPanel()}`;
  }

  const inboxCategoryConfig = {
    bills: { label: 'Money & bills', icon: 'receipt-indian-rupee', route: 'home/money/reports', action: 'Pay or verify' },
    school: { label: 'School & learning', icon: 'graduation-cap', route: 'study/reports', action: 'Review school action' },
    health: { label: 'Health & care', icon: 'heart-pulse', route: 'home/life/appointments', action: 'Prepare care action' },
    travel: { label: 'Travel', icon: 'luggage', route: 'home/life/travel', action: 'Confirm booking' },
    deliveries: { label: 'Deliveries', icon: 'package-check', route: 'home/tasks', action: 'Track delivery' },
    home: { label: 'Home services', icon: 'wrench', route: 'home/overview', action: 'Schedule service' },
    government: { label: 'Government', icon: 'landmark', route: 'home/life/documents', action: 'Review or renew' }
  };

  function inboxStatus(value) {
    const labels = { pending: 'Needs review', applied: 'Added to app', dismissed: 'Dismissed' };
    const className = value === 'pending' ? 'warning' : value === 'dismissed' ? '' : 'connected';
    return `<span class="badge ${className}">${e(labels[value] || 'Needs review')}</span>`;
  }

  function gmailEssence(categoryKeys, title, note, showEmpty = false) {
    const persona = activePersona();
    const signals = personaScope(D.state.syncSuggestions || []).filter(item => item.source === 'gmail' && categoryKeys.includes(item.category)).sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt)));
    if (!signals.length && !showEmpty) return '';
    const detected = signals.reduce((total, item) => total + (+item.amount || 0), 0);
    const content = signals.length ? signals.slice(0, 7).map(item => `<article class="module-email-item"><span>${icon((inboxCategoryConfig[item.category] || inboxCategoryConfig.home).icon)}</span><div class="grow"><small>${e(item.sender || 'Unknown sender')} · ${D.date(item.receivedAt)}</small><b>${e(item.title)}</b><p>${e(item.summary || 'No essential detail was retained.')}</p></div><div><strong>${item.amount ? D.money(item.amount) : ''}</strong>${inboxStatus(item.status)}</div></article>`).join('') : `<div class="inbox-empty-inline"><span>${icon('mail-search')}</span><p>Connect the consenting family Gmail accounts and run sync to bring matching information here.</p><button data-route="settings/app">Configure Gmail</button></div>`;
    return `<section class="panel module-inbox-brief"><div class="section-head"><div><span class="section-kicker">${persona.isFamily ? 'FAMILY EMAIL ESSENCE' : `${e(persona.name.toUpperCase())}'S EMAIL ESSENCE`}</span><h2>${e(title)}</h2><p>${signals.length} relevant messages · ${D.money(detected)} detected · ${e(note)}</p></div><button data-route="global/intelligence">${persona.isFamily ? 'All family email' : 'My email essence'}</button></div>${content}</section>`;
  }

  function inboxIntelligence() {
    const persona = activePersona();
    const signals = personaScope(D.state.syncSuggestions || []).filter(item => item.source === 'gmail').sort((a, b) => String(b.processedAt || b.receivedAt).localeCompare(String(a.processedAt || a.receivedAt)));
    const pending = signals.filter(item => item.status === 'pending');
    const applied = signals.filter(item => item.status === 'applied');
    const attention = pending.filter(item => item.urgency === 'high' || (item.actionDate && item.actionDate <= today()));
    const totalValue = signals.reduce((total, item) => total + (+item.amount || 0), 0);
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recent = signals.filter(item => String(item.receivedAt || item.processedAt) >= thirtyDaysAgo.toISOString());
    const people = Object.fromEntries(D.state.people.map(person => [person.id, person]));
    const accounts = (D.state.settings.googleSync?.accounts || []).filter(account => persona.isFamily || account.personId === persona.id);
    const categories = Object.entries(inboxCategoryConfig).map(([key, config]) => {
      const items = signals.filter(item => item.category === key);
      return { key, config, items, pending: items.filter(item => item.status === 'pending').length, amount: items.reduce((total, item) => total + (+item.amount || 0), 0) };
    });
    const senders = Object.entries(signals.reduce((result, item) => { const sender = item.sender || 'Unknown sender'; result[sender] ||= { count: 0, pending: 0, amount: 0 }; result[sender].count += 1; result[sender].pending += item.status === 'pending' ? 1 : 0; result[sender].amount += +item.amount || 0; return result; }, {})).sort((a, b) => b[1].count - a[1].count).slice(0, 7);
    const now = new Date(`${today()}T00:00`);
    const weeks = Array.from({ length: 6 }, (_, index) => { const start = new Date(now); start.setDate(start.getDate() - (5 - index) * 7); const end = new Date(start); end.setDate(end.getDate() + 7); const count = signals.filter(item => { const value = new Date(item.receivedAt || item.processedAt); return value >= start && value < end; }).length; return { label: start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), count }; });
    const maxWeek = Math.max(1, ...weeks.map(item => item.count));
    const urgencyRank = { high: 0, medium: 1, normal: 2 };
    const decisions = [...pending].sort((a, b) => (urgencyRank[a.urgency] ?? 2) - (urgencyRank[b.urgency] ?? 2) || String(a.actionDate || '9999').localeCompare(String(b.actionDate || '9999'))).slice(0, 7);
    if (!signals.length) return `<section class="panel inbox-empty"><span>${icon('mail-search')}</span><div class="grow"><h2>No Gmail decisions yet</h2><p>Connect the family accounts and run Gmail sync. Matching household messages will appear here as local decision evidence.</p></div><button class="primary" data-route="settings/app">Configure Gmail</button></section>`;
    return `<section class="metrics inbox-metrics">${metric('Gmail signals', signals.length, `${recent.length} in the last 30 days`, 'mail-search')}${metric('Needs a decision', pending.length, attention.length ? `${attention.length} time-sensitive` : 'No urgent items', 'list-checks')}${metric('Detected value', D.money(totalValue), 'Verify before recording', 'indian-rupee')}${metric('Added to app', applied.length, `${Math.round(applied.length / Math.max(1, signals.length) * 100)}% action rate`, 'badge-check')}</section>
      <section class="inbox-category-grid" aria-label="Seven Gmail decision groups">${categories.map(item => `<button data-route="${item.config.route}" class="inbox-category category-${item.key}"><span>${icon(item.config.icon)}</span><span class="grow"><b>${e(item.config.label)}</b><small>${item.items.length} signals - ${item.pending} pending</small></span><strong>${item.amount ? D.money(item.amount) : item.items.length}</strong>${icon('chevron-right')}</button>`).join('')}</section>
      <div class="grid-2 inbox-decision-grid"><section class="panel"><div class="section-head"><div><span class="section-kicker">DECIDE NEXT</span><h2>${persona.isFamily ? 'Family attention queue' : `${e(persona.name)}'s attention queue`}</h2><p>Ranked by urgency and extracted action date</p></div><span class="badge ${attention.length ? 'danger' : ''}">${attention.length} urgent</span></div>${decisions.length ? decisions.map(item => { const config = inboxCategoryConfig[item.category] || inboxCategoryConfig.home; const owner = people[item.personId]?.name || 'Family'; return `<article class="inbox-decision urgency-${e(item.urgency || 'normal')}"><span>${icon(config.icon)}</span><div class="grow"><small>${e(config.label)} - ${e(owner)}</small><b>${e(item.title)}</b><p>${e(item.summary || 'No summary retained.')}</p><em>${item.actionDate ? `Act by ${D.date(item.actionDate)}` : D.date(item.receivedAt)}${item.amount ? ` - ${D.money(item.amount)}` : ''}</em></div><div><button data-route="${config.route}" aria-label="Open ${e(config.label)}">${icon('arrow-up-right')}</button><button class="primary" data-sync-apply="${e(item.id)}">${icon('check')}<span>Apply</span></button></div></article>`; }).join('') : '<p class="empty">Every Gmail signal has been reviewed.</p>'}</section>
        <section class="panel inbox-trend"><div class="section-head"><div><span class="section-kicker">VOLUME</span><h2>Six-week signal trend</h2><p>Matched household messages across four accounts</p></div></div><div class="chart" aria-label="Gmail signals by week">${weeks.map(item => `<div style="height:${Math.max(4, item.count / maxWeek * 100)}%"><b>${item.count}</b><span>${e(item.label)}</span></div>`).join('')}</div><div class="inbox-source-summary"><b>${accounts.length}/4</b><span>accounts mapped</span><b>${senders.length}</b><span>active senders shown</span></div></section></div>
      <div class="grid-2"><section class="panel"><div class="section-head"><div><h2>Family account coverage</h2><p>Who receives each decision signal</p></div><button data-route="settings/app">Accounts</button></div>${accounts.map(account => { const items = signals.filter(item => item.personId === account.personId); const owner = people[account.personId]; return row(owner?.name || account.email || 'Unassigned', `${items.length} signals - ${items.filter(item => item.status === 'pending').length} pending`, `<b>${items.reduce((total, item) => total + (+item.amount || 0), 0) ? D.money(items.reduce((total, item) => total + (+item.amount || 0), 0)) : e(account.email || 'No email')}</b>`); }).join('') || '<p class="empty">Map family Gmail accounts in Settings.</p>'}</section><section class="panel"><div class="section-head"><div><h2>Frequent senders</h2><p>Use repeated signals to identify recurring obligations</p></div></div>${senders.map(([sender, summary]) => row(sender, `${summary.count} signals - ${summary.pending} pending`, summary.amount ? `<b>${D.money(summary.amount)}</b>` : '')).join('') || '<p class="empty">No sender pattern yet.</p>'}</section></div>
      <section class="panel inbox-history"><div class="section-head"><div><span class="section-kicker">COMPLETE LOCAL HISTORY</span><h2>Processed Gmail evidence</h2><p>Essential details are extracted from message content; complete email bodies are processed in memory and never retained.</p></div><span class="context-badge">${signals.length} records</span></div><div class="toolbar inbox-toolbar"><input data-filter aria-label="Search Gmail history" placeholder="Search sender, title or summary"><select data-status-filter aria-label="Filter Gmail status"><option value="">All statuses</option><option value="pending">Needs review</option><option value="applied">Added to app</option><option value="dismissed">Dismissed</option></select><select data-category-filter aria-label="Filter Gmail category"><option value="">All 7 categories</option>${categories.map(item => `<option value="${item.key}">${e(item.config.label)}</option>`).join('')}</select></div><div class="inbox-table-wrap"><table class="table"><thead><tr><th>Signal</th><th>Family member</th><th>Category</th><th>Received / action</th><th>Value</th><th>Status</th><th>Decision</th></tr></thead><tbody>${signals.map(item => { const config = inboxCategoryConfig[item.category] || inboxCategoryConfig.home; const owner = people[item.personId]?.name || 'Family'; return `<tr data-filter-row data-status="${e(item.status)}" data-category="${e(item.category)}"><td data-label="Signal"><b>${e(item.title)}</b><small>${e(item.sender || 'Unknown sender')} - ${e(item.summary || 'No summary retained.')}</small></td><td data-label="Family member">${e(owner)}</td><td data-label="Category"><span class="badge">${e(config.label)}</span></td><td data-label="Received / action"><span>${D.date(item.receivedAt)}</span><small>${item.actionDate ? `Action ${D.date(item.actionDate)}` : 'No action date detected'}</small></td><td data-label="Value">${item.amount ? D.money(item.amount) : '-'}</td><td data-label="Status">${inboxStatus(item.status)}</td><td data-label="Decision">${item.status === 'pending' ? `<button class="primary" data-sync-apply="${e(item.id)}">${icon('check')}<span>${e(item.decision || config.action)}</span></button>` : `<button data-route="${config.route}">${icon('arrow-up-right')}<span>Open section</span></button>`}</td></tr>`; }).join('')}</tbody></table></div></section>`;
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
        ${[['sparkles', '1', 'See today', 'global/overview'], ['users-round', '2', 'Set up family', 'settings/people'], ['list-checks', '3', 'Assign work', 'home/tasks'], ['calendar-days', '4', 'Plan time', 'home/calendar'], ['wallet-cards', '5', 'Track money', 'home/finance'], ['heart-handshake', '6', 'Prepare care', 'home/life/health'], ['database-backup', '7', 'Protect data', 'settings/app']].map(item => `<button data-route="${item[3]}"><span>${icon(item[0])}</span><small>${item[1]}</small><b>${item[2]}</b></button>`).join('')}
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
    const persona = activePersona();
    const month = today().slice(0, 7);
    const spend = s.expenses.filter(x => isoDay(x.date).startsWith(month)).reduce((sum, x) => sum + (+x.amount || 0), 0);
    const homeTasks = personaScope(s.tasks).filter(x => x.context === 'home');
    const openTasks = homeTasks.filter(x => D.status(x.status) !== 'done').sort((a, b) => String(a.dueAt).localeCompare(String(b.dueAt)));
    const issues = s.issues.filter(x => x.scope === 'household' && D.status(x.status) !== 'done');
    const lowStock = s.inventoryItems.filter(item => +item.quantity <= 2);
    const nextMeal = [...s.meals].filter(item => item.date >= today()).sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
    const services = HM.life.ensure().filter(item => ['property', 'vehicles', 'help', 'sustainability', 'bills', 'subscriptions'].includes(item.domain) && !['done', 'paid'].includes(item.status)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    return `<section class="metrics">${metric(persona.isFamily ? 'Open responsibilities' : 'My responsibilities', openTasks.length, openTasks.filter(item => item.dueAt < today()).length ? 'Includes overdue work' : persona.isFamily ? 'Household handoff' : `${persona.name}'s task view`, 'list-todo')}${metric('Low stock', lowStock.length, nextMeal ? `Next meal ${nextMeal.name}` : 'No meal planned', 'shopping-basket')}${metric('Open repairs', issues.length, 'Shared property and appliances', 'wrench')}${metric('Monthly home spend', D.money(spend), 'Shared household total', 'wallet-cards')}</section><div class="grid-2"><section class="panel"><div class="section-head"><div><h2>${persona.isFamily ? 'Run the home next' : `${e(persona.name)}'s next responsibilities`}</h2><p>Responsibilities sorted by due date</p></div><button data-route="home/tasks">All tasks</button></div>${openTasks.length ? openTasks.slice(0, 7).map(x => row(x.title, `${x.assignee || 'Unassigned'} - ${D.date(x.dueAt)}`, status(x.status))).join('') : empty(persona.isFamily ? 'No home tasks need attention.' : `Nothing is assigned to ${persona.name}.`, 'task', 'Add task')}</section><section class="panel"><div class="section-head"><div><h2>Services and upkeep</h2><p>Shared renewals, repairs and recurring support</p></div><button data-route="home/property">Property</button></div>${issues.slice(0, 3).map(item => row(item.title, `${item.category} - ${item.location}`, `<button data-route="home/property">Open</button>`)).join('')}${services.slice(0, 4).map(item => row(item.title, `${HM.life.domains[item.domain].title} - ${D.date(item.dueDate)}`, `<button data-route="home/life/${item.domain}">Open</button>`)).join('') || '<p class="empty">No service or upkeep item needs attention.</p>'}</section></div><section class="family-action-grid household-action-grid" aria-label="Household workflows">${[['layout-dashboard','Home overview','Readiness and handoffs','home/overview'],['list-checks','Tasks & routines','Assigned and recurring work','home/tasks'],['shopping-basket','Food & supplies','Meals, pantry and shopping','home/inventory'],['wrench','Property & assets','Repairs, warranties and value','home/property'],['car-front','Vehicles','Service, fuel and renewals','home/life/vehicles'],['hand-helping','Domestic help','Attendance, pay and contacts','home/life/help'],['leaf','Sustainability','Water, energy, waste and garden','home/life/sustainability']].map(item => `<button data-route="${item[3]}"><span>${icon(item[0])}</span><span><b>${item[1]}</b><small>${item[2]}</small></span>${icon('chevron-right')}</button>`).join('')}</section>`;
  }

  function taskView(context) {
    const persona = activePersona();
    const items = personaScope(D.state.tasks).filter(x => x.context === context);
    return `<div class="toolbar"><label class="sr-only" for="taskFilter">Search tasks</label><input id="taskFilter" data-filter placeholder="Search ${persona.isFamily ? e(context) : 'my'} tasks"><select data-status-filter aria-label="Filter tasks by status"><option value="">All statuses</option><option value="todo">To do</option><option value="progress">In progress</option><option value="done">Done</option></select><button class="primary" data-create="task" data-context="${context}">${icon('plus')}<span>Task</span></button></div><section class="panel">${items.length ? `<table class="table"><thead><tr><th>Done</th><th>Task</th><th>Category</th><th>Assigned</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead><tbody>${items.map(x => `<tr data-filter-row data-status="${e(D.status(x.status))}"><td data-label="Done"><input type="checkbox" aria-label="Mark ${e(x.title)} complete" data-complete="task:${e(x.id)}" ${D.status(x.status) === 'done' ? 'checked' : ''}></td><td data-label="Task"><b>${e(x.title)}</b></td><td data-label="Category">${e(x.category)}</td><td data-label="Assigned">${e(x.assignee || 'Unassigned')}</td><td data-label="Due">${D.date(x.dueAt)}</td><td data-label="Status">${status(x.status)}</td><td data-label="Actions"><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(x.title)}" data-edit="task" data-id="${e(x.id)}" data-context="${e(x.context)}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(x.title)}" data-delete="tasks:${e(x.id)}">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table>` : empty(persona.isFamily ? `No ${context} tasks yet.` : `No tasks for ${persona.name}.`, 'task', 'Add task')}</section>${context === 'home' ? tasksPanel() : ''}`;
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
    return `<div class="toolbar"><div><small>Calendar</small><h2>${calendarCursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</h2></div><div class="row-actions"><button data-calendar-shift="-1" aria-label="Previous month">${icon('chevron-left')}</button><button data-calendar-shift="today">Today</button><button data-calendar-shift="1" aria-label="Next month">${icon('chevron-right')}</button></div><button class="primary" data-create="event" data-context="${context === 'all' ? 'home' : context}">${icon('plus')}<span>Event</span></button></div><div class="calendar-wrap"><div class="calendar">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => `<div class="calendar-day calendar-label"><b>${x}</b></div>`).join('')}${cells}</div><div class="calendar-agenda">${monthEvents.length ? monthEvents.map(x => row(x.title, `${D.date(x.startAt, { weekday: 'short', day: 'numeric', month: 'short' })} - ${x.venue || 'No venue'}`, badge(x.context))).join('') : empty('No events this month.', 'event', 'Add event')}</div></div>${context === 'all' ? calendarPanel() : ''}`;
  }

  function family() {
    const s = D.state;
    const persona = activePersona();
    const visiblePeople = persona.isFamily ? s.people : s.people.filter(person => person.id === persona.id);
    const records = personaScope(HM.life.ensure());
    const upcoming = s.events.filter(item => item.context === 'home' && isoDay(item.startAt) >= today()).sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)));
    const openTasks = personaScope(s.tasks).filter(item => item.context === 'home' && D.status(item.status) !== 'done');
    const plans = records.filter(item => ['travel', 'festivals'].includes(item.domain) && !['done', 'paid'].includes(item.status)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const continuity = records.filter(item => ['documents', 'insurance', 'legacy'].includes(item.domain));
    const averageWellbeing = visiblePeople.length ? Math.round(visiblePeople.reduce((total, person) => total + clamp(person.wellbeing), 0) / visiblePeople.length) : 0;
    return `<section class="metrics compact-metrics">${metric(persona.isFamily ? 'Family members' : 'Current persona', persona.isFamily ? s.people.length : persona.name, persona.isFamily ? 'Profiles and roles' : persona.householdRole, 'users-round')}${metric(persona.isFamily ? 'Family wellbeing' : 'My wellbeing', `${averageWellbeing}%`, 'Conversation prompt, not diagnosis', 'heart-handshake')}${metric('Next 30 days', upcoming.filter(item => isoDay(item.startAt) <= new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10)).length, 'Shared events', 'calendar-days')}${metric('Continuity records', continuity.length, 'Documents, cover and legacy', 'shield-check')}</section>
      <div class="family-suite-grid"><section class="panel"><div class="section-head"><div><h2>${persona.isFamily ? 'Family pulse' : `${e(persona.name)}'s pulse`}</h2><p>Check load and wellbeing without ranking people</p></div><button data-route="settings/people">${icon('user-cog')}<span>Profiles</span></button></div>${visiblePeople.map((person, index) => { const taskCount = openTasks.filter(task => task.assignee === person.name).length; return `<div class="family-pulse-row"><span class="member-avatar person-${index % 6}">${e((person.name || '?')[0])}</span><div class="grow"><b>${e(person.name)}</b><small>${e(person.householdRole)} - ${taskCount} open task${taskCount === 1 ? '' : 's'}</small><div class="progress"><span style="width:${clamp(person.wellbeing)}%"></span></div></div><strong>${clamp(person.wellbeing)}%</strong></div>`; }).join('')}</section>
      <section class="panel"><div class="section-head"><div><h2>Plans together</h2><p>Dates, trips and celebrations that need coordination</p></div><button class="primary" data-create="event" data-context="home">${icon('plus')}<span>Event</span></button></div>${upcoming.slice(0, 4).map(item => row(item.title, `${D.date(item.startAt, { weekday: 'short', day: 'numeric', month: 'short' })} - ${item.venue || 'No venue'}`, `<button data-route="home/calendar">Open</button>`)).join('')}${plans.slice(0, 3).map(item => row(item.title, `${HM.life.domains[item.domain].title} - ${D.date(item.dueDate)}`, `<button data-route="home/life/${item.domain}">Open</button>`)).join('') || '<p class="empty">No family plans need attention.</p>'}</section></div>
      <section class="family-action-grid" aria-label="Family workflows">${[['calendar-days','Shared calendar','See every family date','home/calendar'],['luggage','Travel','Bookings, packing and elder needs','home/life/travel'],['party-popper','Celebrations','Guests, gifts, pooja and budget','home/life/festivals'],['folders','Documents','Masked identity and renewal records','home/life/documents'],['contact-round','Contacts','Doctors, school and trusted people','home/directory'],['shield-check','Protection & legacy','Cover, nominees and continuity','home/family/protection']].map(item => `<button data-route="${item[3]}"><span>${icon(item[0])}</span><span><b>${item[1]}</b><small>${item[2]}</small></span>${icon('chevron-right')}</button>`).join('')}</section>${sectionFinance('family', ['income', 'goal', 'tax'])}`;
  }

  function protectionAndLegacy() {
    const records = personaScope(HM.life.ensure());
    const policies = records.filter(item => item.domain === 'insurance');
    const legacy = records.filter(item => item.domain === 'legacy');
    const documents = records.filter(item => item.domain === 'documents');
    const attention = [...policies, ...legacy, ...documents].filter(item => lifeDueState(item));
    const register = (title, note, domain, items, iconName) => `<section class="panel"><div class="section-head"><div><h2>${title}</h2><p>${note}</p></div><button class="primary" data-create="life" data-domain="${domain}">${icon('plus')}<span>Add</span></button></div>${items.length ? items.map(item => row(item.title, `${item.owner || 'Family'} - ${D.date(item.dueDate)}`, `<button data-route="home/life/${domain}">${lifeStatus(item.status)}</button>`)).join('') : `<p class="empty">No ${title.toLowerCase()} recorded.</p>`}<button class="open-register" data-route="home/life/${domain}">${icon(iconName)}<span>Open full register</span>${icon('arrow-right')}</button></section>`;
    return `<section class="panel privacy-banner"><div>${icon('shield-alert')}<div><h2>Continuity, without exposed secrets</h2><p>Track owners, renewal dates and where originals are kept. Never store full identity numbers, account credentials, PINs, OTPs, wills or document scans in browser storage.</p></div></div></section><section class="metrics compact-metrics">${metric('Protection records', policies.length, 'Life and personal accident cover', 'shield-check')}${metric('Legacy actions', legacy.length, 'Nominees and succession', 'scroll-text')}${metric('Documents', documents.length, 'Masked references only', 'folders')}${metric('Needs attention', attention.length, 'Due or overdue', 'calendar-warning')}</section><div class="care-register-grid">${register('Family protection', 'Life and personal accident policies', 'insurance', policies, 'shield-check')}${register('Nominees & legacy', 'Annual continuity and succession review', 'legacy', legacy, 'scroll-text')}</div>`;
  }

  function careOverview() {
    const persona = activePersona();
    const records = personaScope(HM.life.ensure());
    const careDomains = ['health', 'medicines', 'appointments', 'elders', 'emergency', 'pets'];
    const careRecords = records.filter(item => careDomains.includes(item.domain));
    const due = careRecords.filter(item => lifeDueState(item)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const medicines = careRecords.filter(item => item.domain === 'medicines' && !['done', 'paid'].includes(item.status));
    const appointments = careRecords.filter(item => item.domain === 'appointments' && !['done', 'paid'].includes(item.status)).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const emergency = careRecords.filter(item => item.domain === 'emergency' && item.status === 'active');
    return `<section class="care-readiness"><div><span class="section-kicker">${persona.isFamily ? 'FAMILY CARE PLAN' : `${e(persona.name.toUpperCase())}'S CARE PLAN`}</span><h2>${persona.isFamily ? 'One handoff for health and safety' : `Care that applies to ${e(persona.name)}`}</h2><p>Keep treatment tasks, refills, consultations, support and emergency instructions visible to the family member responsible.</p></div><div class="care-readiness-score"><strong>${Math.min(100, 40 + emergency.length * 20 + Math.min(20, medicines.length * 10) + Math.min(20, appointments.length * 10))}%</strong><small>setup readiness</small></div></section>
      <section class="metrics compact-metrics">${metric('Care actions', careRecords.filter(item => !['done', 'paid'].includes(item.status)).length, 'Open across family', 'heart-handshake')}${metric('Medicines', medicines.length, 'Plans and refills', 'pill')}${metric('Next appointment', appointments[0] ? D.date(appointments[0].dueDate) : 'Not planned', appointments[0]?.owner || 'No owner', 'stethoscope')}${metric('Emergency card', emergency.length ? 'Ready' : 'Review', emergency.length ? 'Active family instructions' : 'No active record', 'siren')}</section>
      <div class="care-register-grid"><section class="panel"><div class="section-head"><div><h2>Needs care next</h2><p>Due dates across every care register</p></div></div>${due.length ? due.slice(0, 7).map(item => row(item.title, `${item.owner || 'Family'} - ${HM.life.domains[item.domain].title}`, `<span class="badge ${lifeDueState(item) === 'overdue' ? 'danger' : 'warning'}">${D.date(item.dueDate)}</span><button data-route="home/life/${item.domain}">Open</button>`)).join('') : '<p class="empty">No care action is due in the next 30 days.</p>'}</section><section class="panel"><div class="section-head"><div><h2>Care handoff</h2><p>Quick entries stay in their owning register</p></div></div><div class="care-quick-actions">${[['pill','Medicine or refill','medicines'],['stethoscope','Appointment','appointments'],['activity','Health observation','health'],['accessibility','Elder support','elders'],['siren','Emergency instruction','emergency'],['paw-print','Pet care','pets']].map(item => `<button data-create="life" data-domain="${item[2]}"><span>${icon(item[0])}</span><span><b>${item[1]}</b><small>Add to ${HM.life.domains[item[2]].title}</small></span>${icon('plus')}</button>`).join('')}</div></section></div>
      <section class="official-care-links"><a href="https://ors.gov.in/" target="_blank" rel="noopener noreferrer">${icon('building-2')}<span><b>Government hospital appointments</b><small>ORS patient portal</small></span>${icon('external-link')}</a><a href="https://abdm.gov.in/" target="_blank" rel="noopener noreferrer">${icon('heart-pulse')}<span><b>ABHA and health records</b><small>Ayushman Bharat Digital Mission</small></span>${icon('external-link')}</a><a href="https://112.gov.in/" target="_blank" rel="noopener noreferrer">${icon('siren')}<span><b>Emergency Response Support System</b><small>Official Pan-India 112 service</small></span>${icon('external-link')}</a></section><section class="panel care-boundary"><span>${icon('shield-check')}</span><div><b>Planning aid, not medical advice or an alarm service</b><p>Confirm medicine instructions with the prescriber and use native phone or pharmacy reminders for time-critical doses. This static app does not diagnose, contact clinicians or dispatch help.</p></div></section>${sectionFinance('health', ['goal'])}`;
  }

  function topCategory(items) {
    const totals = {};
    items.forEach(x => { totals[x.category] = (totals[x.category] || 0) + (+x.amount || 0); });
    return Object.keys(totals).sort((a, b) => totals[b] - totals[a])[0] || 'None';
  }

  const financeDomains = {
    food: { label: 'Food & supplies', route: 'home/inventory', icon: 'shopping-basket' },
    housing: { label: 'Property & home', route: 'home/property', icon: 'house' },
    vehicle: { label: 'Vehicles', route: 'home/life/vehicles', icon: 'car-front' },
    health: { label: 'Health & care', route: 'home/life/health', icon: 'heart-pulse' },
    family: { label: 'Family & celebrations', route: 'home/family', icon: 'users-round' },
    learning: { label: 'Education', route: 'study/overview', icon: 'graduation-cap' },
    community: { label: 'Community', route: 'community/overview', icon: 'map-pinned' }
  };
  const lifeFinanceDomains = { property: 'housing', bills: 'housing', subscriptions: 'housing', digital: 'housing', help: 'housing', sustainability: 'housing', vehicles: 'vehicle', health: 'health', medicines: 'health', appointments: 'health', elders: 'health', emergency: 'health', pets: 'health', travel: 'family', festivals: 'family', documents: 'family', tax: 'family', insurance: 'family', legacy: 'family', education: 'learning' };
  const financeDomain = value => financeDomains[value] ? value : 'family';
  const sourceRoute = value => financeDomains[financeDomain(value)].route;
  const monthlyValue = item => (+item.amount || 0) * ({ Daily: 365 / 12, Weekly: 52 / 12, Monthly: 1, Quarterly: 1 / 3, 'Half-yearly': 1 / 6, Yearly: 1 / 12, 'One time': 0, 'As needed': 0 }[item.frequency] ?? 1);
  const currentExpenses = domain => D.state.expenses.filter(item => isoDay(item.date).startsWith(today().slice(0, 7)) && (!domain || financeDomain(item.domain) === domain));
  const sum = (items, key = 'amount') => items.reduce((total, item) => total + (+item[key] || 0), 0);

  function sectionFinance(domain, options = []) {
    domain = financeDomain(domain);
    const config = financeDomains[domain];
    const budgets = D.state.budgets.filter(item => financeDomain(item.domain) === domain);
    const expenses = currentExpenses(domain);
    const planned = sum(budgets);
    const spent = sum(expenses);
    const remaining = planned - spent;
    const optionButtons = options.includes('income') ? `<button data-create="income" data-domain="${domain}">${icon('badge-indian-rupee')}<span>Income</span></button>` : '';
    const liabilityButton = options.includes('liability') ? `<button data-create="liability" data-domain="${domain}">${icon('landmark')}<span>Loan</span></button>` : '';
    const goalButton = options.includes('goal') ? `<button data-create="moneyGoal" data-domain="${domain}">${icon('target')}<span>Savings goal</span></button>` : '';
    const recordButtons = options.filter(item => HM.life.domains[item]).map(item => `<button data-route="home/life/${item}">${icon(HM.life.domains[item].icon)}<span>${e(HM.life.domains[item].title)}</span></button>`).join('');
    return `<section class="panel section-finance"><div class="section-head"><div><small>SECTION-OWNED MONEY</small><h2>${e(config.label)} budget & spending</h2><p>Enter it here; Money only consolidates and reports it.</p></div><button data-route="home/money/budget">${icon('chart-pie')}<span>Money report</span></button></div><div class="finance-strip"><span><small>Monthly budget</small><b>${D.money(planned)}</b></span><span><small>Spent</small><b>${D.money(spent)}</b></span><span class="${remaining < 0 ? 'negative' : ''}"><small>${remaining < 0 ? 'Over budget' : 'Remaining'}</small><b>${D.money(Math.abs(remaining))}</b></span><div class="toolbar-actions"><button class="primary" data-create="expense" data-domain="${domain}">${icon('plus')}<span>Expense</span></button><button data-create="budget" data-domain="${domain}">${icon('gauge')}<span>Budget</span></button>${optionButtons}${liabilityButton}${goalButton}${recordButtons}</div></div>${budgets.length || expenses.length ? `<div class="section-money-rows">${budgets.map(item => row(item.category, `${item.bucket} monthly budget`, `<b>${D.money(item.amount)}</b><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(item.category)} budget" data-edit="budget" data-id="${e(item.id)}" data-domain="${domain}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(item.category)} budget" data-delete="budgets:${e(item.id)}">${icon('trash-2')}</button></span>`)).join('')}${expenses.slice(0, 3).map(item => row(item.title, `${item.category} - ${D.date(item.date)}`, `<b>${D.money(item.amount)}</b><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(item.title)}" data-edit="expense" data-id="${e(item.id)}" data-domain="${domain}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(item.title)}" data-delete="expenses:${e(item.id)}">${icon('trash-2')}</button></span>`)).join('')}</div>` : ''}</section>`;
  }

  function moneyOverview() {
    const income = sum(D.state.incomes.map(item => ({ amount: monthlyValue(item) })));
    const budgets = sum(D.state.budgets);
    const spent = sum(currentExpenses());
    const goals = sum(D.state.moneyGoals, 'contribution');
    const debtPayments = sum(D.state.liabilities, 'payment');
    const available = income - budgets - goals - debtPayments;
    const due = HM.life.ensure().filter(item => lifeDueState(item) && +item.amount > 0);
    return `<section class="panel reporting-notice"><span>${icon('radar')}</span><div><b>Consolidated reporting only</b><p>Add or change money in the family section that owns it. This hub never creates source records.</p></div></section><section class="metrics">${metric('Monthly income', D.money(income), `${D.state.incomes.length} sources`, 'badge-indian-rupee')}${metric('Planned budget', D.money(budgets), `${D.state.budgets.length} section budgets`, 'chart-pie')}${metric('Spent this month', D.money(spent), topCategory(currentExpenses()), 'wallet-cards')}${metric('Available after plans', D.money(available), `${D.money(goals)} goals + ${D.money(debtPayments)} debt`, 'piggy-bank')}</section><div class="grid-2"><section class="panel"><div class="section-head"><h2>Budget by family area</h2><button data-route="home/money/budget">Full budget</button></div>${Object.entries(financeDomains).map(([key, config]) => { const planned = sum(D.state.budgets.filter(item => financeDomain(item.domain) === key)); const actual = sum(currentExpenses(key)); const percent = planned ? clamp(Math.round(actual / planned * 100)) : 0; return `<button class="money-source-row" data-route="${config.route}"><span class="source-icon">${icon(config.icon)}</span><span class="grow"><b>${e(config.label)}</b><small>${D.money(actual)} of ${D.money(planned)}</small><span class="progress"><span style="width:${percent}%"></span></span></span><strong>${percent}%</strong>${icon('chevron-right')}</button>`; }).join('')}</section><section class="panel"><div class="section-head"><h2>Needs attention</h2><button data-route="home/money/commitments">All commitments</button></div>${due.length ? due.slice(0, 7).map(item => row(item.title, `${HM.life.domains[item.domain]?.title || 'Family'} - ${D.date(item.dueDate)}`, `<b>${D.money(item.amount)}</b><button data-route="home/life/${e(item.domain)}">Source</button>`)).join('') : '<p class="empty">No financial commitments need attention.</p>'}</section></div>`;
  }

  function moneyBudget() {
    return `<section class="metrics">${metric('Total planned', D.money(sum(D.state.budgets)), 'All family sections', 'chart-pie')}${metric('Fixed', D.money(sum(D.state.budgets.filter(item => item.bucket === 'Fixed'))), 'Predictable monthly', 'lock-keyhole')}${metric('Flexible', D.money(sum(D.state.budgets.filter(item => item.bucket === 'Flexible'))), 'Adjustable spending', 'sliders-horizontal')}${metric('Non-monthly', D.money(sum(D.state.budgets.filter(item => item.bucket === 'Non-monthly'))), 'Sinking funds', 'calendar-range')}</section><section class="panel"><div class="section-head"><div><h2>Section budgets</h2><p>Edit each budget at its source.</p></div></div>${D.state.budgets.map(item => { const actual = sum(currentExpenses(financeDomain(item.domain)).filter(expense => expense.category === item.category || D.state.budgets.filter(budget => budget.domain === item.domain).length === 1)); const percent = clamp(Math.round(actual / Math.max(1, +item.amount) * 100)); return `<button class="budget-report-row" data-route="${sourceRoute(item.domain)}"><span class="source-icon">${icon(financeDomains[financeDomain(item.domain)].icon)}</span><span class="grow"><b>${e(item.category)}</b><small>${e(item.bucket)} - ${D.money(actual)} spent of ${D.money(item.amount)}</small><span class="progress ${percent >= 100 ? 'over' : ''}"><span style="width:${percent}%"></span></span></span><strong>${percent}%</strong>${icon('chevron-right')}</button>`; }).join('')}</section>${gmailEssence(['bills'], 'Bills, receipts and payments from Gmail', 'confirmed payments update spending automatically', true)}`;
  }

  function moneyCashflow() {
    const income = sum(D.state.incomes.map(item => ({ amount: monthlyValue(item) })));
    const fixed = sum(D.state.budgets.filter(item => item.bucket === 'Fixed'));
    const flexible = sum(D.state.budgets.filter(item => item.bucket === 'Flexible'));
    const nonMonthly = sum(D.state.budgets.filter(item => item.bucket === 'Non-monthly'));
    const goals = sum(D.state.moneyGoals, 'contribution');
    const debtPayments = sum(D.state.liabilities, 'payment');
    const left = income - fixed - flexible - nonMonthly - goals - debtPayments;
    const parts = [['Income', income, 'family'], ['Fixed plans', -fixed, 'housing'], ['Flexible plans', -flexible, 'food'], ['Non-monthly funds', -nonMonthly, 'health'], ['Debt payments', -debtPayments, 'housing'], ['Goal contributions', -goals, 'family']];
    return `<section class="metrics">${metric('Expected income', D.money(income), 'Monthly equivalent', 'badge-indian-rupee')}${metric('Planned outflow', D.money(fixed + flexible + nonMonthly + debtPayments), 'Budgets plus debt', 'arrow-up-right')}${metric('Goal funding', D.money(goals), 'Monthly contributions', 'piggy-bank')}${metric('Left to allocate', D.money(left), left < 0 ? 'Plans exceed income' : 'Buffer after plans', 'circle-dollar-sign')}</section><section class="panel cashflow-waterfall"><h2>Monthly plan flow</h2>${parts.map(([label, value, domain]) => row(label, financeDomains[domain].label, `<span class="cashflow-value ${value < 0 ? 'out' : 'in'}">${value < 0 ? '-' : '+'}${D.money(Math.abs(value))}</span><button data-route="${sourceRoute(domain)}">Source</button>` , '')).join('')}<div class="row cashflow-total"><div class="grow"><b>Available after plan</b><small>Income minus budgets, debt payments and goal contributions</small></div><strong>${D.money(left)}</strong></div></section>`;
  }

  function moneySpending() {
    const expenses = [...D.state.expenses].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return `<section class="metrics">${metric('This month', D.money(sum(currentExpenses())), today().slice(0, 7), 'wallet-cards')}${metric('Largest category', topCategory(currentExpenses()), 'Current month', 'chart-pie')}${metric('Transactions', currentExpenses().length, 'Across all sections', 'receipt-text')}${metric('Daily average', D.money(sum(currentExpenses()) / Math.max(1, new Date().getDate())), 'Month to date', 'divide')}</section><div class="toolbar"><input data-filter aria-label="Search consolidated spending" placeholder="Search consolidated spending"><span class="report-only-label">${icon('lock-keyhole')} Read-only report</span></div><section class="panel"><table class="table"><thead><tr><th>Expense</th><th>Family area</th><th>Category</th><th>Date</th><th>Amount</th><th>Source</th></tr></thead><tbody>${expenses.map(item => `<tr data-filter-row><td data-label="Expense"><b>${e(item.title)}</b></td><td data-label="Family area">${e(financeDomains[financeDomain(item.domain)].label)}</td><td data-label="Category">${e(item.category)}</td><td data-label="Date">${D.date(item.date)}</td><td data-label="Amount">${D.money(item.amount)}</td><td data-label="Source"><button data-route="${sourceRoute(item.domain)}">Open</button></td></tr>`).join('')}</tbody></table></section>${gmailEssence(['bills'], 'Email evidence behind spending', 'receipts remain traceable to sender and date')}`;
  }

  function moneyCommitments() {
    const records = HM.life.ensure().filter(item => +item.amount > 0).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const monthly = sum(records.map(item => ({ amount: monthlyValue(item) }))) + sum(D.state.liabilities, 'payment');
    return `<section class="metrics">${metric('Monthly equivalent', D.money(monthly), 'Renewals plus loan payments', 'calendar-sync')}${metric('Due in 30 days', records.filter(item => lifeDueState(item)).length, 'Needs review', 'calendar-warning')}${metric('Annual renewals', D.money(sum(records.filter(item => item.frequency === 'Yearly'))), 'Yearly commitments', 'repeat-2')}${metric('Loan payments', D.money(sum(D.state.liabilities, 'payment')), `${D.state.liabilities.length} liabilities`, 'landmark')}</section><section class="panel"><table class="table"><thead><tr><th>Commitment</th><th>Area</th><th>Frequency</th><th>Next due</th><th>Amount</th><th>Source</th></tr></thead><tbody>${records.map(item => { const domain = lifeFinanceDomains[item.domain] || 'family'; return `<tr><td data-label="Commitment"><b>${e(item.title)}</b><small>${e(item.provider || item.category)}</small></td><td data-label="Area">${e(financeDomains[domain].label)}</td><td data-label="Frequency">${e(item.frequency)}</td><td data-label="Next due">${D.date(item.dueDate)}</td><td data-label="Amount">${D.money(item.amount)}</td><td data-label="Source"><button data-route="home/life/${e(item.domain)}">Open</button></td></tr>`; }).join('')}</tbody></table></section>`;
  }

  function moneyNetWorth() {
    const assets = sum(D.state.assets, 'value');
    const debts = sum(D.state.liabilities, 'balance');
    const worth = assets - debts;
    return `<section class="metrics">${metric('Net worth', D.money(worth), 'Assets minus liabilities', 'scale')}${metric('Assets', D.money(assets), `${D.state.assets.length} records`, 'gem')}${metric('Liabilities', D.money(debts), `${D.state.liabilities.length} balances`, 'landmark')}${metric('Goal reserves', D.money(sum(D.state.moneyGoals, 'saved')), `${D.state.moneyGoals.length} goals`, 'piggy-bank')}</section><div class="grid-2"><section class="panel"><div class="section-head"><h2>Asset register</h2><button data-route="home/property">Property & assets</button></div>${D.state.assets.map(item => row(item.name, `${item.category} - ${item.status}`, `<b>${D.money(item.value)}</b>`)).join('')}</section><section class="panel"><div class="section-head"><h2>Liabilities</h2></div>${D.state.liabilities.map(item => row(item.title, `${item.type} - ${item.interestRate}%`, `<b>${D.money(item.balance)}</b><button data-route="${sourceRoute(item.domain)}">Source</button>`)).join('')}</section></div><section class="panel"><div class="section-head"><h2>Savings goals</h2></div>${D.state.moneyGoals.map(item => { const percent = clamp(Math.round((+item.saved || 0) / Math.max(1, +item.target || 1) * 100)); return `<button class="budget-report-row" data-route="${sourceRoute(item.domain)}"><span class="source-icon">${icon('target')}</span><span class="grow"><b>${e(item.title)}</b><small>${D.money(item.saved)} of ${D.money(item.target)} - ${D.money(item.contribution)}/month</small><span class="progress"><span style="width:${percent}%"></span></span></span><strong>${percent}%</strong>${icon('chevron-right')}</button>`; }).join('')}</section>`;
  }

  function moneyReportsBase() {
    const months = [...new Set(D.state.expenses.map(item => isoDay(item.date).slice(0, 7)))].filter(Boolean).sort().slice(-6);
    const current = currentExpenses();
    const watch = Object.entries(financeDomains).map(([domain, config]) => { const planned = sum(D.state.budgets.filter(item => item.domain === domain)); const actual = sum(currentExpenses(domain)); return { domain, config, planned, actual, percent: planned ? Math.round(actual / planned * 100) : 0 }; }).sort((a, b) => b.percent - a.percent);
    const gmailBills = (D.state.syncSuggestions || []).filter(item => item.source === 'gmail' && item.category === 'bills').sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt)));
    return `<section class="metrics">${metric('Savings rate', `${Math.round((1 - sum(current) / Math.max(1, sum(D.state.incomes))) * 100)}%`, 'Income less recorded spending', 'trending-up')}${metric('Budget pressure', `${watch.filter(item => item.percent >= 80).length} areas`, 'At or above 80%', 'gauge')}${metric('Recurring annual', D.money(sum(HM.life.ensure().filter(item => +item.amount > 0).map(item => ({ amount: monthlyValue(item) * 12 })))), 'Estimated commitments', 'repeat-2')}${metric('Data coverage', `${Object.keys(financeDomains).filter(domain => D.state.budgets.some(item => item.domain === domain)).length}/7`, 'Family areas budgeted', 'scan-search')}</section><div class="grid-2"><section class="panel"><h2>Monthly spending trend</h2><div class="chart money-chart" aria-label="Monthly spending">${months.map(month => { const value = sum(D.state.expenses.filter(item => isoDay(item.date).startsWith(month))); const max = Math.max(...months.map(key => sum(D.state.expenses.filter(item => isoDay(item.date).startsWith(key)))), 1); return `<div style="height:${Math.max(4, value / max * 100)}%"><b>${D.money(value)}</b><span>${e(month.slice(5))}/${e(month.slice(2, 4))}</span></div>`; }).join('')}</div></section><section class="panel"><div class="section-head"><div><h2>Budget watchlist</h2><p>Areas nearest their limit</p></div></div>${watch.map(item => row(item.config.label, `${D.money(item.actual)} of ${D.money(item.planned)}`, `<strong class="${item.percent >= 100 ? 'negative' : ''}">${item.percent}%</strong><button data-route="${item.config.route}">Source</button>`)).join('')}</section></div><section class="panel module-inbox-brief"><div class="section-head"><div><span class="section-kicker">GMAIL EVIDENCE</span><h2>Bills, payments and renewals</h2><p>${gmailBills.length} detected signals - ${gmailBills.filter(item => item.status === 'pending').length} still need review - ${D.money(gmailBills.reduce((total, item) => total + (+item.amount || 0), 0))} detected value</p></div><button data-route="global/intelligence">Full inbox report</button></div>${gmailBills.length ? gmailBills.slice(0, 7).map(item => row(item.title, `${item.sender || 'Unknown sender'} - ${item.actionDate ? `act by ${D.date(item.actionDate)}` : D.date(item.receivedAt)}`, `${item.amount ? `<b>${D.money(item.amount)}</b>` : ''}${inboxStatus(item.status)}`)).join('') : '<p class="empty">No financial Gmail signals have been processed.</p>'}</section>`;
  }

  function moneyReports() {
    return `${sheetsPanel()}${moneyReportsBase()}`;
  }

  function finance(view = 'overview') {
    return ({ overview: moneyOverview, budget: moneyBudget, cashflow: moneyCashflow, spending: moneySpending, commitments: moneyCommitments, networth: moneyNetWorth, reports: moneyReports }[view] || moneyOverview)();
  }

  function inventory() {
    const s = D.state;
    return `<div class="grid-2"><section><div class="section-head"><div><h2>Inventory</h2><p>Low stock is highlighted automatically</p></div><button class="primary" data-create="inventory">${icon('plus')}<span>Item</span></button></div><section class="panel">${s.inventoryItems.length ? s.inventoryItems.map(x => row(x.name, x.category, `<span class="badge ${+x.quantity <= 2 ? 'warning' : ''}">${e(x.quantity)} ${e(x.unit)}</span>`)).join('') : empty('No supplies tracked.', 'inventory', 'Add item')}</section></section><section><div class="section-head"><div><h2>Meal plan</h2><p>Upcoming family meals</p></div><button class="primary" data-create="meal">${icon('plus')}<span>Meal</span></button></div><section class="panel">${s.meals.length ? s.meals.sort((a, b) => String(a.date).localeCompare(String(b.date))).map(x => row(x.name, `${x.mealType} - ${x.cook}`, `<span class="badge">${D.date(x.date)}</span>`)).join('') : empty('No meals planned.', 'meal', 'Plan meal')}</section></section></div>${sectionFinance('food')}`;
  }

  function assets() {
    return propertyHub();
  }

  function wisdom() {
    const leaderboard = D.state.people.map(person => ({ name: person.name, points: D.state.pointTransactions.filter(x => x.personId === person.id).reduce((sum, x) => sum + (+x.points || 0), 0) })).sort((a, b) => b.points - a.points);
    return `<div class="grid-2"><section><div class="section-head"><h2>Family wisdom</h2><button class="primary" data-create="wisdom">${icon('plus')}<span>Entry</span></button></div><div class="cards" style="grid-template-columns:1fr">${D.state.wisdomEntries.map(x => `<article class="card"><span class="badge">${e(x.category)}</span><h3>${e(x.title)}</h3><p>${e(x.body)}</p><small>Preserved by ${e(x.author)}</small></article>`).join('')}</div></section><section class="panel"><h2>Recognition</h2>${leaderboard.map((x, index) => row(`#${index + 1} ${x.name}`, 'Family contribution points', `<b>${x.points} pts</b>`)).join('')}</section></div>${docsPanel()}`;
  }

  function directory(scope) {
    const contacts = D.state.contacts.filter(x => x.scope === scope);
    return `<div class="toolbar"><input data-filter aria-label="Search contacts" placeholder="Search contacts"><button class="primary" data-create="contact" data-scope="${scope}">${icon('user-plus')}<span>Contact</span></button></div><div class="cards">${contacts.length ? contacts.map(x => `<article class="card" data-filter-row><span class="badge">${e(x.category)}</span><h3>${e(x.name)}</h3><p>${e(x.hours)}</p>${x.phone ? `<a href="tel:${e(String(x.phone).replace(/[^+\d]/g, ''))}">${e(x.phone)}</a>` : x.email ? `<a href="mailto:${e(x.email)}">${e(x.email)}</a>` : '<small>No contact method saved</small>'}</article>`).join('') : empty('No contacts saved.', 'contact', 'Add contact')}</div>${scope === 'home' ? contactsPanel() : ''}`;
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

  const lifeSuites = {
    travel: {
      title: 'Travel command centre', note: 'Plan the whole journey in one place — before, during and after the trip.', icon: 'luggage',
      domains: ['travel', 'transport', 'vehicles', 'stays', 'travelProtection'],
      links: [['Trips', 'Itineraries, people, packing and trip tasks', 'luggage', 'home/life/travel'], ['Transportation', 'Flights, trains, buses, taxis and transfers', 'bus-front', 'home/life/transport'], ['Vehicles', 'Service, fuel, insurance, PUC and registration', 'car-front', 'home/life/vehicles'], ['Hotels & stays', 'Bookings, check-in, cancellation and accessibility', 'bed-double', 'home/life/stays'], ['Insurance & documents', 'Cover, visas, permits and emergency copies', 'shield-check', 'home/life/travelProtection'], ['Travel spending', 'See the cost of every travel commitment', 'wallet-cards', 'home/travel/spending']]
    },
    web: {
      title: 'Your web life, under control', note: 'Know which accounts exist, what they cost and whether they still deserve your time and data.', icon: 'globe-2',
      domains: ['webAccounts', 'aiServices', 'subscriptions', 'webHabits', 'games', 'digital'],
      links: [['Email & accounts', 'Ownership, purpose and recovery readiness', 'at-sign', 'home/life/webAccounts'], ['AI services', 'Plans, limits, privacy and intended use', 'sparkles', 'home/life/aiServices'], ['Subscriptions', 'Renewals for streaming, cloud, software and news', 'repeat-2', 'home/life/subscriptions'], ['Browsing habits', 'Attention, screen boundaries and intentional routines', 'history', 'home/life/webHabits'], ['Games & apps', 'Purchases, age access, play limits and ownership', 'gamepad-2', 'home/life/games'], ['Privacy & devices', 'Backups, device reviews and recovery readiness', 'shield-check', 'home/life/digital']],
      warning: 'Store account names, owners and renewal details only. Never save passwords, PINs, OTPs, passkeys, recovery codes or security answers in this app.'
    },
    entertainment: {
      title: 'Entertainment worth your time', note: 'Keep family leisure intentional: discover, choose, enjoy and remember — without losing sight of cost.', icon: 'clapperboard',
      domains: ['watch', 'listen', 'reading', 'play', 'outings'],
      links: [['Watch', 'Films, series and documentaries', 'clapperboard', 'home/life/watch'], ['Listen', 'Music, podcasts and audiobooks', 'headphones', 'home/life/listen'], ['Read', 'Books, magazines and comics', 'book-open', 'home/life/reading'], ['Play & games', 'Board games, video games and hobbies', 'dice-5', 'home/life/play'], ['Outings & events', 'Cinema, concerts, sports, attractions and dining', 'ticket', 'home/life/outings'], ['Entertainment spending', 'See recurring and one-time leisure costs', 'wallet-cards', 'home/entertainment/spending']]
    }
  };

  function lifeSuiteOverview(name) {
    const suite = lifeSuites[name];
    const records = HM.life.ensure().filter(item => suite.domains.includes(item.domain));
    const active = records.filter(item => !['done', 'paid', 'complete'].includes(item.status));
    const due = active.filter(item => lifeDueState(item));
    const monthly = records.reduce((total, item) => total + monthlyValue(item), 0);
    const next = active.filter(item => item.dueDate).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate))).slice(0, 6);
    return `${suite.warning ? `<section class="panel privacy-banner"><div>${icon('shield-alert')}<div><h2>Protect your digital identity</h2><p>${e(suite.warning)}</p></div></div><button data-route="global/settings">Privacy details</button></section>` : ''}
      <section class="metrics compact-metrics">${metric('Active records', active.length, suite.title, suite.icon)}${metric('Need attention', due.length, 'Due or overdue', 'calendar-warning')}${metric('Monthly commitments', D.money(monthly), 'Estimated from saved records', 'wallet-cards')}${metric('Completed', records.length - active.length, 'Closed items', 'circle-check-big')}</section>
      <section class="family-action-grid suite-action-grid" aria-label="${e(suite.title)} workflows">${suite.links.map(item => `<button data-route="${item[3]}"><span>${icon(item[2])}</span><span><b>${e(item[0])}</b><small>${e(item[1])}</small></span>${icon('chevron-right')}</button>`).join('')}</section>
      <section class="panel"><div class="section-head"><div><h2>What needs attention next</h2><p>${e(suite.note)}</p></div></div>${next.length ? next.map(item => row(item.title, `${HM.life.domains[item.domain].title} · ${D.date(item.dueDate)}`, `<button data-route="home/life/${item.domain}">Open</button>`)).join('') : '<p class="empty">Nothing is due. Open a section above to add the first record.</p>'}</section>`;
  }

  function lifeSuiteSpending(name) {
    const suite = lifeSuites[name];
    const records = HM.life.ensure().filter(item => suite.domains.includes(item.domain) && +item.amount > 0).sort((a, b) => monthlyValue(b) - monthlyValue(a));
    const monthly = records.reduce((total, item) => total + monthlyValue(item), 0);
    const annual = monthly * 12;
    const oneTime = records.filter(item => ['One time', 'As needed'].includes(item.frequency)).reduce((total, item) => total + (+item.amount || 0), 0);
    return `<section class="metrics compact-metrics">${metric('Monthly equivalent', D.money(monthly), 'Recurring commitments', 'calendar-sync')}${metric('Annual equivalent', D.money(annual), 'Estimate from recurring records', 'chart-no-axes-combined')}${metric('One-time plans', D.money(oneTime), 'Saved planned costs', 'receipt-indian-rupee')}${metric('Costed records', records.length, suite.title, suite.icon)}</section>
      <section class="panel"><div class="section-head"><div><h2>Where the money goes</h2><p>Amounts come directly from the owning registers.</p></div></div>${records.length ? `<table class="table"><thead><tr><th>Item</th><th>Area</th><th>Frequency</th><th>Saved amount</th><th>Monthly equivalent</th><th></th></tr></thead><tbody>${records.map(item => `<tr><td data-label="Item"><b>${e(item.title)}</b><small>${e(item.provider || item.category)}</small></td><td data-label="Area">${e(HM.life.domains[item.domain].title)}</td><td data-label="Frequency">${e(item.frequency)}</td><td data-label="Saved amount">${D.money(item.amount)}</td><td data-label="Monthly equivalent">${D.money(monthlyValue(item))}</td><td><button data-route="home/life/${item.domain}">Open</button></td></tr>`).join('')}</tbody></table>` : '<p class="empty">No costs have been saved in these registers yet.</p>'}</section>`;
  }

  function lifeHub() {
    const records = personaScope(HM.life.ensure());
    const configs = HM.life.domains;
    const dueSoon = records.filter(record => ['overdue', 'soon'].includes(lifeDueState(record)));
    const open = records.filter(record => !['done', 'paid', 'complete'].includes(record.status));
    const annual = records.reduce((sum, record) => sum + (+record.amount || 0) * ({ Daily: 365, Weekly: 52, Monthly: 12, Quarterly: 4, 'Half-yearly': 2 }[record.frequency] || 1), 0);
    const groups = [...new Set(Object.values(configs).map(config => config.group))];
    return `<section class="panel privacy-banner"><div>${icon('shield-alert')}<div><h2>Private family registry</h2><p>This browser storage is not encrypted. Use masked references only; never save full Aadhaar, PAN, account credentials, passwords, PINs, OTPs or document scans.</p></div></div><button data-route="global/settings">Privacy details</button></section>
      <section class="metrics">${metric('Life records', records.length, `${Object.keys(configs).length} family domains`, 'layout-grid')}${metric('Due in 30 days', dueSoon.length, 'Renewals and commitments', 'calendar-warning')}${metric('Active items', open.length, 'Across the household', 'activity')}${metric('Tracked commitments', D.money(annual), 'Estimated annual value', 'indian-rupee')}</section>
      ${groups.map(group => `<section class="life-section"><div class="section-head"><div><h2>${e(group)}</h2><p>Dedicated registers with shared reminders and search</p></div></div><div class="life-domain-grid">${Object.entries(configs).filter(([, config]) => config.group === group).map(([key, config]) => { const items = records.filter(record => record.domain === key); const alerts = items.filter(record => lifeDueState(record)); return `<button class="card life-domain-card" data-route="home/life/${key}"><span class="life-icon">${icon(config.icon)}</span><span class="grow"><b>${e(config.title)}</b><small>${e(config.note)}</small></span><span class="life-count ${alerts.length ? 'attention' : ''}">${alerts.length || items.length}</span></button>`; }).join('')}</div></section>`).join('')}`;
  }

  function lifeDomain(domain) {
    const config = HM.life.domains[domain];
    if (!config) return lifeHub();
    const records = personaScope(HM.life.ensure()).filter(record => record.domain === domain);
    const alerts = records.filter(record => lifeDueState(record));
    const total = records.reduce((sum, record) => sum + (+record.amount || 0), 0);
    const moneyDomain = lifeFinanceDomains[domain] || 'family';
    const moneyOptions = ['vehicles', 'property'].includes(domain) ? ['liability'] : ['health', 'emergency'].includes(domain) ? ['goal'] : [];
    return `<section class="metrics compact-metrics">${metric('Records', records.length, config.title, config.icon)}${metric('Needs attention', alerts.length, 'Due or overdue', 'calendar-warning')}${metric('Tracked value', D.money(total), 'Current records', 'indian-rupee')}${metric('Completed', records.filter(record => ['done', 'paid', 'complete'].includes(record.status)).length, 'Closed items', 'circle-check-big')}</section>
      <div class="toolbar"><input data-filter aria-label="Search ${e(config.title)}" placeholder="Search ${e(config.title.toLowerCase())}"><select data-status-filter aria-label="Filter by status"><option value="">All statuses</option><option value="planning">Planning</option><option value="pending">Pending</option><option value="active">Active</option><option value="due">Due</option><option value="paid">Paid</option><option value="done">Done</option></select><button class="primary" data-create="life" data-domain="${domain}">${icon('plus')}<span>Add ${e(config.noun)}</span></button></div>
      <section class="panel life-register">${records.length ? `<table class="table"><thead><tr><th>Record</th><th>Owner</th><th>Provider / reference</th><th>Due</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>${records.map(record => { const dueState = lifeDueState(record); return `<tr data-filter-row data-status="${e(record.status)}"><td data-label="Record"><b>${e(record.title)}</b><small>${e(record.category || config.title)}</small></td><td data-label="Owner">${e(record.owner || 'Family')}</td><td data-label="Provider"><span>${e(record.provider || 'Not set')}</span><small>${e(record.reference || '')}</small></td><td data-label="Due"><span class="badge ${dueState === 'overdue' ? 'danger' : dueState === 'soon' ? 'warning' : ''}">${D.date(record.dueDate)}</span></td><td data-label="Amount">${record.amount ? D.money(record.amount) : '-'}</td><td data-label="Status"><button data-life-status="${e(record.id)}">${lifeStatus(record.status)}</button></td><td data-label="Actions"><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(record.title)}" data-edit="life" data-id="${e(record.id)}" data-domain="${domain}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(record.title)}" data-delete="lifeRecords:${e(record.id)}">${icon('trash-2')}</button></span></td></tr>`; }).join('')}</tbody></table>` : `<div class="empty"><p>No ${e(config.title.toLowerCase())} records yet.</p><button class="primary" data-create="life" data-domain="${domain}">${icon('plus')}<span>Add ${e(config.noun)}</span></button></div>`}</section>${domain === 'documents' ? drivePanel() : ''}${sectionFinance(moneyDomain, moneyOptions)}`;
  }

  function communityOverview() {
    const s = D.state;
    const events = s.events.filter(x => x.context === 'community' && isoDay(x.startAt) >= today()).sort((a, b) => String(a.startAt).localeCompare(String(b.startAt)));
    const tickets = s.issues.filter(x => x.scope === 'civic' && D.status(x.status) !== 'done');
    const plannedVolunteer = s.volunteerOpportunities.filter(item => item.registered);
    return `<section class="panel reporting-notice"><span>${icon('map-pinned')}</span><div><b>Personal community planner</b><p>Updates, votes, registrations and civic follow-ups stay in this browser. A saved action is never presented as submitted to an association or public authority.</p></div></section><section class="metrics">${metric('Saved updates', s.newsItems.length, 'Personal notes', 'newspaper')}${metric('Upcoming events', events.length, events[0] ? `Next ${D.date(events[0].startAt)}` : 'No plan', 'calendar-heart')}${metric('Open follow-ups', tickets.length, 'Personal civic log', 'ticket-check')}${metric('Volunteer commitments', plannedVolunteer.length, 'Marked in my plan', 'hand-heart')}</section><div class="grid-2"><section class="panel"><div class="section-head"><div><h2>Local brief</h2><p>Saved information to verify before acting</p></div><button data-route="community/feed">Updates</button></div>${s.newsItems.slice(0, 5).map(x => row(x.title, `${x.category} - ${D.date(x.date)}`, `<button data-route="community/feed">Open</button>`)).join('')}</section><section class="panel"><div class="section-head"><div><h2>Participation next</h2><p>Events, volunteering and civic follow-up</p></div><button data-route="community/participate">Participate</button></div>${events.slice(0, 3).map(x => row(x.title, `${D.date(x.startAt)} - ${x.venue}`, `<button data-route="community/events">Calendar</button>`)).join('')}${tickets.slice(0, 3).map(x => row(x.title, `${x.ticketNo || 'Local'} - ${x.location}`, `<button data-route="community/tickets">Follow up</button>`)).join('') || '<p class="empty">No community action planned.</p>'}</section></div><section class="family-action-grid" aria-label="Community workflows">${[['newspaper','Updates','Saved local notes','community/feed'],['calendar-heart','Events & polls','Dates and personal preferences','community/participate'],['hand-heart','Volunteer','Personal commitments','community/volunteer'],['ticket-check','Civic issues','Follow-up log','community/tickets'],['life-buoy','Local services','Verified contact directory','community/directory'],['book-marked','Guides','Self-service references','community/guides']].map(item => `<button data-route="${item[3]}"><span>${icon(item[0])}</span><span><b>${item[1]}</b><small>${item[2]}</small></span>${icon('chevron-right')}</button>`).join('')}</section>${sectionFinance('community')}`;
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

  function academicContext() {
    const profiles = D.state.academicProfiles || [];
    const activeId = profiles.some(item => item.personId === D.state.settings.activeLearnerId) ? D.state.settings.activeLearnerId : profiles[0]?.personId;
    if (activeId && activeId !== D.state.settings.activeLearnerId) D.state.settings.activeLearnerId = activeId;
    const profile = profiles.find(item => item.personId === activeId) || { personId: '', name: 'Student', grade: 6, subjects: [], targetPercent: 75 };
    const defaultSubject = profile.subjects.includes('Mathematics') ? 'Mathematics' : profile.subjects[0] || 'All subjects';
    const selectedSubject = D.state.settings.activeLearningSubject?.[activeId] || D.state.settings.learningSubjectTabs?.[activeRenderRoute] || defaultSubject;
    const inSubject = item => selectedSubject === 'All subjects' || item.subject === selectedSubject;
    return {
      activeId,
      profile,
      profiles,
      selectedSubject,
      syllabus: (D.state.syllabusItems || []).filter(item => item.studentId === activeId && inSubject(item)),
      plans: (D.state.studyPlans || []).filter(item => item.studentId === activeId && inSubject(item)),
      deliverables: (D.state.academicDeliverables || []).filter(item => item.studentId === activeId && inSubject(item)),
      assessments: (D.state.academicAssessments || []).filter(item => item.studentId === activeId && inSubject(item)),
      practice: (D.state.practiceLogs || []).filter(item => item.studentId === activeId && inSubject(item)),
      sessions: (D.state.focusSessions || []).filter(item => !item.studentId || item.studentId === activeId),
      school: D.state.schoolProfile || {},
      timetable: (D.state.schoolTimetable || []).filter(item => item.studentId === activeId),
      schoolEvents: (D.state.schoolEvents || []).filter(item => item.studentId === activeId),
      attendance: (D.state.attendanceRecords || []).filter(item => item.studentId === activeId),
      reflections: (D.state.learningReflections || []).filter(item => item.studentId === activeId),
      feedback: (D.state.tutorFeedback || []).filter(item => item.studentId === activeId),
      activities: (D.state.coCurricularRecords || []).filter(item => item.studentId === activeId)
    };
  }

  const nonChapterLabels = /^(prelims|answers|appendix|complete book|प्रारंभिक पृष्ठ)/i;
  function schoolCurriculumLessons(context) {
    const books = textbookCatalog.filter(book => book.grade === +context.profile.grade && book.subject === context.selectedSubject);
    return books.flatMap(book => (book.pdfFiles || [])
      .filter(part => !nonChapterLabels.test(part.label) && !/ps\.pdf(?:$|[?#])/i.test(part.url))
      .map((part, index) => {
        const saved = (D.state.syllabusItems || []).find(item => item.studentId === context.activeId && item.subject === book.subject && String(item.title).toLowerCase() === String(part.label).toLowerCase());
        return {
          id: `book-${book.id}-${part.order || index + 1}`,
          studentId: context.activeId,
          subject: book.subject,
          title: part.label,
          term: book.title,
          competency: saved?.competency || 'CBSE chapter',
          status: saved?.status || 'not-started',
          mastery: +saved?.mastery || 0,
          bookId: book.id,
          partUrl: part.url,
          partKey: part.key || part.url,
          partPage: part.page || 1
        };
      }));
  }

  function curriculumLessons(context, jeeMode = false) {
    return jeeMode ? HM.genius.jeeSyllabus.filter(item => item.subject === context.selectedSubject) : schoolCurriculumLessons(context);
  }

  function curriculumLessonById(context, lessonId) {
    return HM.genius.jeeSyllabus.find(item => item.id === lessonId) || schoolCurriculumLessons(context).find(item => item.id === lessonId) || (D.state.syllabusItems || []).find(item => item.id === lessonId && item.studentId === context.activeId);
  }

  const averageOf = values => values.length ? Math.round(values.reduce((total, value) => total + (+value || 0), 0) / values.length) : 0;
  const assessmentPercent = item => Math.round(((+item.score || 0) + (+item.practicalScore || 0)) / Math.max(1, (+item.maxScore || 0) + (+item.practicalMax || 0)) * 100);
  const practicePercent = items => Math.round(items.reduce((sumValue, item) => sumValue + (+item.correct || 0), 0) / Math.max(1, items.reduce((sumValue, item) => sumValue + (+item.attempted || 0), 0)) * 100);
  const academicStatus = value => `<span class="badge ${['missed', 'todo'].includes(value) ? 'danger' : ['planned', 'progress', 'revision', 'learning'].includes(value) ? 'warning' : ''}">${e(String(value || 'pending').replace('-', ' '))}</span>`;
  const attendancePercent = items => {
    const schoolDays = items.filter(item => !['holiday'].includes(item.status));
    if (!schoolDays.length) return null;
    return Math.round(schoolDays.filter(item => ['present', 'late'].includes(item.status)).length / schoolDays.length * 100);
  };

  function examReadinessPanel(context) {
    if (+context.profile.grade !== 12) return '';
    const tracks = [
      { name: 'CBSE Class XII', subjects: context.profile.subjects, iconName: 'school' },
      { name: 'JEE Main', subjects: ['Physics', 'Chemistry', 'Mathematics'], iconName: 'target' }
    ];
    const trackCards = tracks.map(track => {
      const rows = track.subjects.filter(subject => context.selectedSubject === 'All subjects' || context.selectedSubject === subject).map(subject => {
        const syllabus = context.syllabus.filter(item => item.subject === subject);
        const tests = context.assessments.filter(item => item.subject === subject && item.status !== 'scheduled' && (track.name.startsWith('CBSE') ? item.exam !== 'JEE Main' : item.exam === 'JEE Main' || /JEE/i.test(item.type || '')));
        const practice = context.practice.filter(item => item.subject === subject && (track.name.startsWith('CBSE') ? item.exam !== 'JEE Main' : item.exam === 'JEE Main' || /JEE/i.test(item.source || '')));
        const syllabusScore = averageOf(syllabus.map(item => item.mastery));
        const testScore = tests.length ? averageOf(tests.map(assessmentPercent)) : 0;
        const accuracy = practice.length ? practicePercent(practice) : 0;
        const volume = Math.min(100, Math.round(practice.reduce((sum, item) => sum + (+item.attempted || 0), 0) / (track.name === 'JEE Main' ? 1.5 : .75)));
        const score = Math.round(syllabusScore * .35 + testScore * .3 + accuracy * .25 + volume * .1);
        return `<div class="exam-readiness-row"><b>${e(subject)}</b><span title="Syllabus">${syllabusScore}%</span><span title="Tests">${testScore}%</span><span title="Accuracy">${accuracy}%</span><span title="Practice volume">${volume}%</span><strong>${score}%</strong></div>`;
      }).join('');
      return `<section class="panel exam-track"><div class="section-head"><div><h2>${icon(track.iconName)} ${e(track.name)} readiness</h2><p>Syllabus · tests/mocks · accuracy · practice volume</p></div></div><div class="exam-readiness-head"><b>Subject</b><span>Syllabus</span><span>Tests</span><span>Accuracy</span><span>Volume</span><strong>Ready</strong></div>${rows || '<p class="empty">This exam does not include the selected subject.</p>'}</section>`;
    }).join('');
    return `<div class="exam-readiness-grid">${trackCards}</div><section class="panel assessment-note"><span>${icon('shield-check')}</span><div><b>Readiness is evidence, not a prediction.</b><p>Log CBSE papers and JEE Main mocks under the correct exam track. Review chapter mastery, timed accuracy, unfinished practical/internal work and recurring errors every week.</p></div></section>`;
  }

  function learnerBar(context) {
    const p = context.profile;
    const extension = context.learningExtension === 'reports' ? examReadinessPanel(context) : '';
    const jeeMode = +p.grade === 12 && (activeRenderRoute === 'study/jee' || D.state.settings.activeLearningTrack?.[context.activeId] === 'jee');
    const subjects = jeeMode ? ['Physics', 'Chemistry', 'Mathematics'] : context.profile.subjects;
    const selectedTab = subjects.includes(context.selectedSubject) ? context.selectedSubject : subjects[0];
    const subjectTabs = activeRenderRoute.startsWith('study/') ? `<nav class="subject-tabs subject-master-tabs" aria-label="Subjects">${subjects.map(subject => `<button type="button" data-learning-subject="${e(subject)}" class="${selectedTab === subject ? 'active' : ''}" aria-pressed="${selectedTab === subject}">${e(subject)}</button>`).join('')}</nav>` : '';
    const cbseSections = [['Curriculum','route','study/curriculum'],['Planner','calendar-clock','study/planner'],['Overview','activity','study/overview'],['Progress','chart-no-axes-combined','study/reports']];
    const jeeSections = cbseSections;
    const learningSections = jeeMode ? jeeSections : cbseSections;
    const sectionTabs = activeRenderRoute.startsWith('study/') ? `<nav class="learning-section-tabs" aria-label="Learning sections">${learningSections.map(([label, iconName, route]) => `<button type="button" data-route="${route}" class="${activeRenderRoute === route ? 'active' : ''}" ${activeRenderRoute === route ? 'aria-current="page"' : ''}>${icon(iconName)}<span>${label}</span></button>`).join('')}</nav>` : '';
    const trackTabs = +p.grade === 12 ? `<nav class="learning-track-tabs" aria-label="Curriculum track"><button type="button" data-learning-track="cbse" class="${jeeMode ? '' : 'active'}" aria-pressed="${!jeeMode}">CBSE</button><button type="button" data-learning-track="jee" class="${jeeMode ? 'active' : ''}" aria-pressed="${jeeMode}">JEE Main</button></nav>` : `<span class="learning-track-label">CBSE · Class ${e(p.grade)}</span>`;
    return `<div class="learning-command-bar subject-first"><div class="education-command-row"><div class="education-master-controls">${trackTabs}${subjectTabs}</div>${sectionTabs}</div></div>${extension}`;
  }

  function schoolHub(context) {
    const s = context.school;
    return `<section class="school-hub"><div class="school-mark">${icon('school')}</div><div class="grow school-identity"><small>VERIFIED SCHOOL</small><h2>${e(s.name)}</h2><p>${e(context.profile.schoolStage)} - ${e(context.profile.subjectGroup)}</p></div><div class="school-facts"><span><small>CBSE affiliation</small><b>${e(s.affiliationNo)}</b></span><span><small>Campus</small><b>${e(s.campus)}</b></span><span><small>Contact</small><b>${e(s.phone)}</b></span></div><div class="school-actions"><a class="primary" href="${e(s.parentPortal)}" target="_blank" rel="noopener noreferrer">${icon('log-in')}<span>Parent portal</span></a><a href="${e(context.profile.grade >= 11 ? s.seniorSecondaryUrl : s.secondaryUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open Peepal programme">${icon('external-link')}</a><a href="mailto:${e(s.email)}" aria-label="Email Peepal Prodigy School">${icon('mail')}</a></div></section>`;
  }

  function reflectionPanel(context) {
    if (context) return '';
    const recent = [...context.reflections].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 4);
    const lensIcons = ['scan-search', 'network', 'users-round', 'blocks', 'messages-square', 'trophy'];
    return `<div class="education-grid reflection-grid"><section class="panel"><div class="section-head"><div><h2>Peepal learning lenses</h2><p>School-published learning priorities</p></div><a class="icon-action" href="${e(context.profile.grade >= 11 ? context.school.seniorSecondaryUrl : context.school.secondaryUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open Peepal methodology">${icon('external-link')}</a></div><div class="learning-lenses">${(context.school.methods || []).map((method, index) => `<span><i>${icon(lensIcons[index] || 'sparkles')}</i><b>${e(method)}</b></span>`).join('')}</div></section><section class="panel"><div class="section-head"><div><h2>Daily self-assessment</h2><p>Strength, question and next step</p></div><button class="primary" data-create="reflection" data-student="${e(context.activeId)}">${icon('plus')}<span>Reflection</span></button></div>${recent.length ? recent.map(item => `<div class="reflection-row"><div class="grow"><b>${e(item.subject)} - ${D.date(item.date)}</b><small>Confidence ${item.confidence}/5 - Effort ${item.effort}/5 - Clarity ${item.clarity}/5</small><p>${e(item.nextStep)}</p></div><span class="row-actions"><button class="icon-action" data-edit="reflection" data-id="${e(item.id)}" data-student="${e(context.activeId)}" aria-label="Edit reflection">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="learningReflections:${e(item.id)}" aria-label="Delete reflection">${icon('trash-2')}</button></span></div>`).join('') : '<p class="empty">No self-assessment recorded.</p>'}</section></div>`;
  }

  function schoolPlannerPanel(context) {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timetable = [...context.timetable].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day) || (+a.period || 0) - (+b.period || 0));
    const events = [...context.schoolEvents].filter(item => item.date >= today() && item.status !== 'cancelled').sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(0, 7);
    return `<div class="education-grid school-planning"><section class="panel"><div class="section-head"><div><h2>School timetable</h2><p>Confirmed periods and learning spaces</p></div><button class="primary" data-create="schoolTimetable" data-student="${e(context.activeId)}">${icon('plus')}<span>Period</span></button></div>${timetable.length ? `<div class="compact-table-wrap"><table class="table"><thead><tr><th>Day</th><th>Period</th><th>Subject</th><th>Time</th><th>Tutor / space</th><th>Actions</th></tr></thead><tbody>${timetable.map(item => `<tr><td data-label="Day">${e(item.day)}</td><td data-label="Period">${item.period}</td><td data-label="Subject"><b>${e(item.subject)}</b><small>${e(item.type)}</small></td><td data-label="Time">${e(item.startTime)}-${e(item.endTime)}</td><td data-label="Tutor / space">${e(item.tutor || item.space || '-')}</td><td data-label="Actions"><span class="row-actions"><button class="icon-action" data-edit="schoolTimetable" data-id="${e(item.id)}" data-student="${e(context.activeId)}" aria-label="Edit timetable period">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="schoolTimetable:${e(item.id)}" aria-label="Delete timetable period">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Add the confirmed class timetable from the school portal.</p>'}</section><section class="panel"><div class="section-head"><div><h2>School calendar</h2><p>Exams, SPT meetings, activities and holidays</p></div><button class="primary" data-create="schoolEvent" data-student="${e(context.activeId)}">${icon('plus')}<span>School date</span></button></div>${events.length ? events.map(item => row(item.title, `${D.date(item.date)}${item.time ? ` - ${e(item.time)}` : ''} - ${e(item.type)}`, `<span class="row-actions"><button class="icon-action" data-edit="schoolEvent" data-id="${e(item.id)}" data-student="${e(context.activeId)}" aria-label="Edit school date">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="schoolEvents:${e(item.id)}" aria-label="Delete school date">${icon('trash-2')}</button></span>`)).join('') : '<p class="empty">Add only dates confirmed by Peepal.</p>'}<div class="school-source-links"><a href="${e(context.school.parentPortal)}" target="_blank" rel="noopener noreferrer">${icon('log-in')} Parent portal</a><a href="${e(context.school.calendarUrl)}" target="_blank" rel="noopener noreferrer">${icon('calendar-search')} Published calendar page</a></div></section></div>`;
  }

  function schoolReportPanel(context) {
    const attendance = [...context.attendance].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 7);
    const attendanceRate = attendancePercent(context.attendance);
    const feedback = [...context.feedback].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 5);
    const activities = [...context.activities].sort((a, b) => String(a.activity).localeCompare(String(b.activity))).slice(0, 7);
    return `<section class="school-report-strip"><span><small>Attendance</small><b>${attendanceRate === null ? 'Not recorded' : `${attendanceRate}%`}</b></span><span><small>Open tutor actions</small><b>${context.feedback.filter(item => item.status === 'open').length}</b></span><span><small>Active activities</small><b>${context.activities.filter(item => item.status === 'active').length}</b></span><a href="${e(context.school.parentPortal)}" target="_blank" rel="noopener noreferrer">${icon('log-in')}<span>Peepal portal</span></a></section><div class="education-grid report-school-grid"><section class="panel"><div class="section-head"><div><h2>Attendance record</h2><p>Family-entered school days</p></div><button class="primary" data-create="attendance" data-student="${e(context.activeId)}">${icon('plus')}<span>Day</span></button></div>${attendance.length ? attendance.map(item => `<div class="row"><div class="grow"><b>${D.date(item.date, { weekday: 'short', day: 'numeric', month: 'short' })}</b><small>${e(item.note || 'No note')}</small></div><span class="badge ${['absent', 'leave'].includes(item.status) ? 'danger' : item.status === 'late' ? 'warning' : ''}">${e(item.status)}</span><span class="row-actions"><button class="icon-action" data-edit="attendance" data-id="${e(item.id)}" data-student="${e(context.activeId)}" aria-label="Edit attendance">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="attendanceRecords:${e(item.id)}" aria-label="Delete attendance">${icon('trash-2')}</button></span></div>`).join('') : '<p class="empty">No attendance entered.</p>'}</section><section class="panel"><div class="section-head"><div><h2>Student-Parent-Tutor review</h2><p>Strengths, challenges and agreed actions</p></div><button class="primary" data-create="tutorFeedback" data-student="${e(context.activeId)}">${icon('plus')}<span>Review</span></button></div>${feedback.length ? feedback.map(item => `<div class="review-action"><span>${icon(item.status === 'done' ? 'circle-check-big' : 'messages-square')}</span><div class="grow"><b>${e(item.subject)} - ${e(item.type)}</b><p>${e(item.action)}</p><small>${item.dueDate ? `Follow up ${D.date(item.dueDate)}` : D.date(item.date)}${item.tutor ? ` - ${e(item.tutor)}` : ''}</small></div><span class="row-actions"><button class="icon-action" data-edit="tutorFeedback" data-id="${e(item.id)}" data-student="${e(context.activeId)}" aria-label="Edit tutor review">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="tutorFeedback:${e(item.id)}" aria-label="Delete tutor review">${icon('trash-2')}</button></span></div>`).join('') : '<p class="empty">No tutor review recorded.</p>'}</section><section class="panel"><div class="section-head"><div><h2>Whole-child activities</h2><p>Clubs, arts, sports and skills</p></div><button class="primary" data-create="coCurricular" data-student="${e(context.activeId)}">${icon('plus')}<span>Activity</span></button></div>${activities.length ? activities.map(item => `<div class="row"><span class="activity-icon">${icon(item.category === 'Sport' ? 'medal' : item.category === 'Art & craft' ? 'palette' : 'sparkles')}</span><div class="grow"><b>${e(item.activity)}</b><small>${e(item.category)}${item.schedule ? ` - ${e(item.schedule)}` : ''}</small></div>${academicStatus(item.status)}<span class="row-actions"><button class="icon-action" data-edit="coCurricular" data-id="${e(item.id)}" data-student="${e(context.activeId)}" aria-label="Edit activity">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="coCurricularRecords:${e(item.id)}" aria-label="Delete activity">${icon('trash-2')}</button></span></div>`).join('') : '<p class="empty">No co-curricular activity recorded.</p>'}</section></div>`;
  }

  function subjectReadiness(context) {
    const subjects = context.selectedSubject && context.selectedSubject !== 'All subjects' ? [context.selectedSubject] : context.profile.subjects;
    return subjects.map(subject => {
      const syllabus = context.syllabus.filter(item => item.subject === subject);
      const assessments = context.assessments.filter(item => item.subject === subject && item.status !== 'scheduled');
      const practice = context.practice.filter(item => item.subject === subject);
      const mastery = averageOf(syllabus.map(item => item.mastery));
      const test = assessments.length ? averageOf(assessments.map(assessmentPercent)) : mastery;
      const accuracy = practice.length ? practicePercent(practice) : mastery;
      return { subject, mastery, test, accuracy, readiness: Math.round(mastery * .4 + test * .4 + accuracy * .2) };
    });
  }

  function studyOverview() {
    const c = academicContext();
    const readiness = subjectReadiness(c);
    const mastery = averageOf(c.syllabus.map(item => item.mastery));
    const completedAssessments = c.assessments.filter(item => item.status !== 'scheduled');
    const score = averageOf(completedAssessments.map(assessmentPercent));
    const due = c.deliverables.filter(item => !['done', 'submitted'].includes(item.status));
    const upcomingExams = c.assessments.filter(item => item.status === 'scheduled' && item.date >= today()).sort((a, b) => String(a.date).localeCompare(String(b.date)));
    const nextPlans = c.plans.filter(item => item.date >= today()).sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)).slice(0, 7);
    const weak = [...readiness].sort((a, b) => a.readiness - b.readiness).slice(0, 3);
    return `${learnerBar(c)}<section class="metrics">${metric('Syllabus mastery', `${mastery}%`, `${c.syllabus.filter(item => item.status === 'mastered').length}/${c.syllabus.length} outcomes mastered`, 'book-open-check')}${metric('Assessment average', `${score}%`, `Target ${c.profile.targetPercent}%`, 'file-chart-column')}${metric('Open submissions', due.length, due.filter(item => item.dueDate <= today()).length ? 'Includes overdue work' : 'Homework and projects', 'clipboard-check')}${metric('Practice accuracy', `${practicePercent(c.practice)}%`, `${c.practice.reduce((sumValue, item) => sumValue + (+item.attempted || 0), 0)} questions logged`, 'brain-circuit')}</section><div class="grid-2 learning-dashboard"><section class="panel"><div class="section-head"><div><h2>Next study blocks</h2><p>A realistic plan for ${e(c.profile.name)}</p></div><button data-route="study/planner">Open planner</button></div>${nextPlans.length ? nextPlans.map(item => row(`${item.startTime} - ${item.activity}`, `${D.date(item.date, { weekday: 'short', day: 'numeric', month: 'short' })} - ${item.subject} - ${item.minutes} min`, academicStatus(item.status))).join('') : '<p class="empty">No study blocks planned.</p>'}</section><section class="panel"><div class="section-head"><div><h2>Priority subjects</h2><p>Lowest combined readiness first</p></div><button data-route="study/reports">Full report</button></div>${weak.map(item => `<div class="readiness-row"><span class="subject-dot"></span><div class="grow"><b>${e(item.subject)}</b><small>Mastery ${item.mastery}% - Tests ${item.test}% - Practice ${item.accuracy}%</small><div class="progress ${item.readiness < 60 ? 'over' : ''}"><span style="width:${clamp(item.readiness)}%"></span></div></div><strong>${item.readiness}%</strong></div>`).join('')}</section></div><section class="panel learning-actions"><div class="section-head"><div><h2>Do next</h2><p>Highest-impact actions based on current records</p></div></div><div class="action-strip">${upcomingExams.slice(0, 1).map(item => `<button data-route="study/assessments"><span>${icon('calendar-warning')}</span><span><small>UPCOMING EXAM</small><b>${e(item.subject)} - ${e(item.title)}</b><em>${D.date(item.date)}</em></span></button>`).join('')}${due.slice(0, 2).map(item => `<button data-route="study/assignments"><span>${icon('clipboard-check')}</span><span><small>SUBMISSION</small><b>${e(item.title)}</b><em>${D.date(item.dueDate)}</em></span></button>`).join('')}${weak.slice(0, 2).map(item => `<button data-route="study/practice"><span>${icon('brain-circuit')}</span><span><small>REINFORCE</small><b>${e(item.subject)}</b><em>${item.readiness}% ready</em></span></button>`).join('')}<button data-route="study/assessments"><span>${icon(c.profile.grade === 12 ? 'file-check-2' : 'notebook-tabs')}</span><span><small>${c.profile.grade === 12 ? 'BOARD PREP' : 'SCHOOL REVIEW'}</small><b>${c.profile.grade === 12 ? 'Check practical and theory gaps' : 'Review periodic-test gaps'}</b><em>Open assessment plan</em></span></button></div></section>${sectionFinance('learning', ['goal', 'education'])}`;
  }

  function curriculum() {
    const c = academicContext();
    const subjects = c.profile.subjects;
    const learner = learnerBar(c);
    const books = textbookCatalog.filter(book => book.grade === +c.profile.grade && (c.selectedSubject === 'All subjects' || book.subject === c.selectedSubject));
    const reading = D.state.readingProgress || [];
    const bookCards = books.map((book, index) => {
      const progress = reading.find(item => item.studentId === c.activeId && item.bookId === book.id);
      const page = progress?.currentPage || 1;
      const total = progress?.totalPages || 0;
      const statusLabel = progress?.status === 'reviewed' ? 'Reviewed' : progress?.status === 'reading' ? 'Reading' : 'Not started';
      const pageLabel = progress ? `Page ${page}${total ? ` of ${total}` : ''}` : 'No reading progress';
      return `<article class="book-card book-tone-${index % 7 + 1}" data-book-card="${e(book.id)}" data-student="${e(c.activeId)}"><span class="book-subject-icon">${icon(book.subject === 'Computer Science' ? 'code-2' : book.subject.includes('English') || book.subject === 'Hindi' || book.subject === 'Tamil' ? 'languages' : book.subject === 'Science' || book.subject === 'Physics' || book.subject === 'Chemistry' ? 'flask-conical' : book.subject === 'Mathematics' ? 'sigma' : book.subject === 'Social Science' ? 'landmark' : 'blocks')}</span><div class="book-card-copy"><small>${e(book.subject)}</small><h3>${e(book.title)}</h3><p>${e(book.publisher)} - ${e(statusLabel)} - ${e(pageLabel)}</p><span class="book-local-state" data-book-state>Checking this device...</span></div><div class="book-card-actions"><button type="button" class="primary" data-book-open="${e(book.id)}" data-student="${e(c.activeId)}" disabled>${icon('book-open')}<span>Read</span></button><button type="button" data-book-import="${e(book.id)}" data-student="${e(c.activeId)}">${icon('file-up')}<span data-book-import-label>Add PDF</span></button><a href="${e(book.sourceUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Open official source for ${e(book.title)}" title="Official source">${icon('external-link')}</a></div></article>`;
    }).join('');
    const reviewed = reading.filter(item => item.studentId === c.activeId && books.some(book => book.id === item.bookId) && item.status === 'reviewed').length;
    return `${learner}<section class="textbook-section"><div class="section-head textbook-heading"><div><small>PRIVATE READING LIBRARY</small><h2>${e(c.profile.name)}'s Class ${e(c.profile.grade)} books</h2><p>${books.length} prescribed or school-issued titles - ${reviewed} reviewed</p></div><a href="https://epathshala.nic.in/topics.php?ln=en" target="_blank" rel="noopener noreferrer">${icon('library-big')}<span>ePathshala</span></a></div><div class="book-shelf">${bookCards}</div><div class="book-rights-note">${icon('shield-check')}<span><b>Your PDFs stay on this device.</b> Add only copies your family may lawfully use. NCERT books are not redistributed by Home Manager; use each official-source button to obtain the current edition. PDF files are excluded from Home Manager JSON backups.</span></div></section>${reflectionPanel(c)}<section class="curriculum-summary">${['not-started', 'learning', 'revision', 'mastered'].map((state, index) => `<span class="curriculum-state state-${index + 1}"><b>${c.syllabus.filter(item => item.status === state).length}</b><small>${e(state.replace('-', ' '))}</small></span>`).join('')}</section><div class="toolbar"><input data-filter aria-label="Search curriculum" placeholder="Search chapters and competencies"><select id="subjectFilter" aria-label="Filter by subject"><option value="">All subjects</option>${subjects.map(subject => `<option>${e(subject)}</option>`).join('')}</select><select data-status-filter aria-label="Filter by mastery status"><option value="">All stages</option><option value="not-started">Not started</option><option value="learning">Learning</option><option value="revision">Revision</option><option value="mastered">Mastered</option></select><button class="primary" data-create="syllabus" data-student="${e(c.activeId)}">${icon('plus')}<span>Outcome</span></button></div><section class="panel"><table class="table academic-table"><thead><tr><th>Subject & outcome</th><th>Term</th><th>Competency</th><th>Mastery</th><th>Stage</th><th>Actions</th></tr></thead><tbody>${c.syllabus.map(item => `<tr data-filter-row data-subject="${e(item.subject)}" data-status="${e(item.status)}"><td data-label="Outcome"><b>${e(item.title)}</b><small>${e(item.subject)} - ${item.plannedHours} planned hours</small></td><td data-label="Term">${e(item.term)}</td><td data-label="Competency"><span class="badge">${e(item.competency)}</span></td><td data-label="Mastery"><div class="mastery-cell"><div class="progress"><span style="width:${clamp(item.mastery)}%"></span></div><b>${clamp(item.mastery)}%</b></div></td><td data-label="Stage"><select data-syllabus-status="${e(item.id)}" aria-label="Update ${e(item.title)} stage">${['not-started', 'learning', 'revision', 'mastered'].map(value => `<option value="${value}" ${item.status === value ? 'selected' : ''}>${value.replace('-', ' ')}</option>`).join('')}</select></td><td data-label="Actions"><span class="row-actions"><button class="icon-action" data-edit="syllabus" data-id="${e(item.id)}" data-student="${e(c.activeId)}" aria-label="Edit ${e(item.title)}">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="syllabusItems:${e(item.id)}" aria-label="Delete ${e(item.title)}">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table></section>`;
  }

  const chapterStages = [
    ['summary', 'Summary', 'scroll-text'],
    ['understand', 'Genius Mind', 'brain'],
    ['book', 'Read Book', 'book-open'],
    ['notes', 'My Notes', 'notebook-pen'],
    ['practice', 'Practice & Tests', 'list-checks'],
    ['assignments', 'Assignments', 'clipboard-check'],
    ['progress', 'Mastery', 'chart-no-axes-combined']
  ];
  const chapterSections = chapterStages;

  const chapterTitleCase = value => {
    const minor = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'from', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);
    return String(value || '').split(/\s+/).map((word, index) => index && minor.has(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  function chapterSubchapters(lesson) {
    const notes = HM.genius.teacherNotes(lesson);
    const richConcepts = (notes.rich?.concepts || []).map(concept => ({
      title: concept.title,
      explanation: concept.explain,
      connection: concept.visual || ''
    }));
    const supportingIdeas = [...(notes.concepts || []), ...(notes.must || [])].map((value, index) => {
      const text = String(value || '').trim();
      const lead = text.split(/[:.;]|\s+[—–-]\s+/)[0].trim();
      const words = lead.split(/\s+/).slice(0, 7).join(' ');
      return { title: words || `Chapter Idea ${index + 1}`, explanation: text, connection: '' };
    });
    const candidates = (richConcepts.length >= 3 ? richConcepts : [...richConcepts, ...supportingIdeas]).filter(item => item.title && item.explanation);
    const unique = [];
    const seen = new Set();
    candidates.forEach(item => {
      const key = String(item.title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
      if (!key || seen.has(key) || unique.length >= 6) return;
      seen.add(key);
      unique.push({
        id: `${lesson.id}--topic-${unique.length + 1}`,
        title: chapterTitleCase(item.title),
        explanation: item.explanation,
        connection: item.connection
      });
    });
    return unique;
  }

  function chapterSubchapterTracking(context, lesson) {
    const subchapters = chapterSubchapters(lesson);
    const saved = D.state.settings.subchapterProgress?.[context.activeId]?.[lesson.id] || {};
    const states = Object.fromEntries(subchapters.map(item => [item.id, saved[item.id] || 'not-started']));
    const mastered = Object.values(states).filter(value => value === 'mastered').length;
    const learning = Object.values(states).filter(value => value === 'learning').length;
    const points = Object.values(states).reduce((total, value) => total + (value === 'mastered' ? 100 : value === 'learning' ? 50 : 0), 0);
    return { subchapters, states, mastered, learning, total: subchapters.length, percent: subchapters.length ? Math.round(points / subchapters.length) : 0 };
  }

  function chapterTracking(context, lesson) {
    const manual = D.state.settings.chapterJourney?.[context.activeId]?.[lesson.id] || {};
    const mastery = D.state.settings.chapterMastery?.[context.activeId]?.[lesson.id]?.mastery ?? (+lesson.mastery || 0);
    const note = D.state.settings.geniusNotes?.[context.activeId]?.[lesson.id] || '';
    const sectionNotes = D.state.settings.chapterSectionNotes?.[context.activeId]?.[lesson.id] || [];
    const topicTracking = chapterSubchapterTracking(context, lesson);
    const status = {
      summary: Boolean(manual.summary || manual.exam || (topicTracking.total && topicTracking.mastered === topicTracking.total)),
      understand: Boolean(manual.understand),
      book: Boolean(manual.book),
      notes: Boolean(note.trim() || sectionNotes.some(item => item.text?.trim())),
      practice: Boolean(manual.practice),
      assignments: Boolean(manual.assignments),
      progress: mastery >= 80
    };
    const complete = chapterStages.filter(([key]) => status[key]).length;
    return { status, complete, percent: Math.round(complete / chapterStages.length * 100), mastery, topics: topicTracking };
  }

  function curriculumJourney() {
    const c = academicContext();
    const subjectTheme = `subject-${String(c.selectedSubject || 'default').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const chapterIconPool = ['book-open-check','lightbulb','workflow','network','git-branch','binary','calculator','flask-conical','atom','orbit','microscope','telescope','landmark','languages','feather','scroll-text','map','compass','shapes','brain','sparkles'];
    const chapterIconOffset = ({ Physics: 8, Chemistry: 7, Mathematics: 2, 'Computer Science': 3, Science: 6, English: 13, 'English Core': 13, Tamil: 14, Hindi: 15, 'Social Science': 11, 'Kaushal Bodh': 17 })[c.selectedSubject] || 0;
    const jeeMode = +c.profile.grade === 12 && D.state.settings.activeLearningTrack?.[c.activeId] === 'jee';
    const lessons = curriculumLessons(c, jeeMode);
    D.state.settings.chapterMastery ||= {};
    D.state.settings.chapterMastery[c.activeId] ||= {};
    const masteryFor = lesson => D.state.settings.chapterMastery[c.activeId][lesson.id]?.mastery ?? (+lesson.mastery || 0);
    const tracking = lessons.map(lesson => chapterTracking(c, lesson));
    const completedStages = tracking.reduce((total, item) => total + item.complete, 0);
    const summaryReady = tracking.filter(item => item.status.summary).length;
    const mastered = tracking.filter(item => item.status.progress).length;
    const nextLesson = lessons.find((lesson, index) => tracking[index].complete < chapterStages.length);
    const rows = lessons.map((lesson, index) => {
      const chapterVisual = chapterIconPool[(chapterIconOffset + index) % chapterIconPool.length];
      const mastery = masteryFor(lesson);
      const tracking = chapterTracking(c, lesson);
      const nextStage = chapterStages.find(([key]) => !tracking.status[key])?.[1] || 'Revision';
      const masteryLevels = [...new Set([0, 20, 40, 60, 80, 100, mastery])].sort((a, b) => a - b);
      const tracker = `<div class="chapter-seven-track" aria-label="${tracking.complete} of 7 chapter stages complete">${chapterStages.map(([key, label]) => `<i class="${tracking.status[key] ? 'complete' : ''}" title="${e(label)}" aria-label="${e(label)} ${tracking.status[key] ? 'complete' : 'not complete'}"></i>`).join('')}</div>`;
      const topicRows = tracking.topics.subchapters.map((topic, topicIndex) => {
        const topicState = tracking.topics.states[topic.id];
        const stateLabel = topicState === 'mastered' ? 'Mastered' : topicState === 'learning' ? 'Learning' : 'Not Started';
        return `<div class="chapter-subchapter-row state-${e(topicState)}"><button type="button" class="chapter-subchapter-open" data-chapter-subchapter="${e(topic.id)}" data-lesson="${e(lesson.id)}"><span>${index + 1}.${topicIndex + 1}</span><b>${e(topic.title)}</b>${icon('chevron-right')}</button><button type="button" class="chapter-subchapter-state" data-subchapter-progress="${e(topic.id)}" data-lesson="${e(lesson.id)}" data-state="${e(topicState)}" aria-label="${e(topic.title)}: ${e(stateLabel)}">${icon(topicState === 'mastered' ? 'circle-check-big' : topicState === 'learning' ? 'circle-dot' : 'circle')}<span>${e(stateLabel)}</span></button></div>`;
      }).join('');
      return `<article class="curriculum-journey-row curriculum-chapter-card ${tracking.complete === 7 ? 'is-complete' : ''}" data-filter-row data-chapter-card="${e(lesson.id)}" role="button" tabindex="0" aria-label="Open chapter ${e(lesson.title)}"><header class="curriculum-card-head"><span class="chapter-sequence">${String(index + 1).padStart(2, '0')}</span><span class="chapter-card-state ${tracking.complete === 7 ? 'complete' : ''}">${tracking.complete === 7 ? icon('circle-check-big') : icon('circle-dashed')} ${tracking.complete === 7 ? 'Complete' : `${tracking.complete}/7 stages`}</span></header><div class="chapter-journey-copy"><span class="section-kicker">${e(lesson.term)} · ${e(lesson.competency)}</span><div class="chapter-card-title"><span class="chapter-card-visual" data-chapter-icon="${e(chapterVisual)}">${icon(chapterVisual)}</span><h2>${e(lesson.title)}</h2></div><div class="chapter-card-metrics"><span><b>${tracking.topics.percent}%</b><small>Topics</small></span><label class="chapter-card-mastery"><small>Mastery</small><select data-card-mastery="${e(lesson.id)}" aria-label="Update ${e(lesson.title)} mastery">${masteryLevels.map(value => `<option value="${value}" ${value === mastery ? 'selected' : ''}>${value}%</option>`).join('')}</select></label><span class="chapter-topic-total"><b>${tracking.topics.mastered}/${tracking.topics.total}</b><small>Mastered</small></span></div><div class="chapter-progress-line"><span><i style="width:${tracking.topics.percent}%"></i></span></div>${tracker}</div><section class="chapter-subchapter-list" aria-label="${e(lesson.title)} subchapters">${topicRows}</section><footer class="chapter-card-footer"><span><small>${tracking.complete === 7 ? 'Status' : 'Next step'}</small><b>${tracking.complete === 7 ? 'Ready to revise' : e(nextStage)}</b></span><span class="chapter-card-open-hint">Open ${icon('arrow-up-right')}</span></footer></article>`;
    }).join('');
    const metrics = [[lessons.length, 'Chapters'], [`${completedStages}/${lessons.length * chapterStages.length}`, 'Stages complete'], [summaryReady, 'Summaries reviewed'], [mastered, 'Mastered']];
    return `${learnerBar(c)}<div class="curriculum-subject-theme ${subjectTheme}"><section class="curriculum-progress-strip" aria-label="${e(c.selectedSubject)} chapter progress"><header><span class="section-kicker">${jeeMode ? 'JEE MAIN' : `CBSE · CLASS ${e(c.profile.grade)}`} · ${e(c.selectedSubject)}</span><b>${nextLesson ? `Next: ${e(nextLesson.title)}` : 'All chapter stages complete'}</b><small>${nextLesson ? `${chapterStages.length - chapterTracking(c, nextLesson).complete} stages remain in this chapter` : 'Choose a chapter to revise mastery'}</small></header><div class="curriculum-strip-metrics">${metrics.map(([value, label]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join('')}</div></section><section class="curriculum-journey-list">${rows || '<p class="empty">Choose a curriculum subject to see its chapters.</p>'}</section></div>`;
  }

  function chapterWorkspaceNavigation(lessonId, section = 'summary') {
    const c = academicContext();
    const lesson = curriculumLessonById(c, lessonId);
    if (!lesson) return '';
    const jeeMode = Boolean(HM.genius.jeeSyllabus.find(item => item.id === lessonId));
    const lessons = curriculumLessons(c, jeeMode);
    const tracking = chapterTracking(c, lesson);
    const mastery = tracking.mastery;
    const chapterButtons = lessons.map((item, index) => { const itemTracking = chapterTracking(c, item); const children = item.id === lesson.id ? `<div class="chapter-browser-subchapters">${itemTracking.topics.subchapters.map((topic, topicIndex) => `<button type="button" data-chapter-subchapter="${e(topic.id)}" data-lesson="${e(item.id)}"><span>${index + 1}.${topicIndex + 1}</span><b>${e(topic.title)}</b><i class="state-${e(itemTracking.topics.states[topic.id])}"></i></button>`).join('')}</div>` : ''; return `<div class="chapter-browser-branch"><button type="button" data-chapter-switch="${e(item.id)}" class="chapter-browser-item ${item.id === lesson.id ? 'active' : ''}" ${item.id === lesson.id ? 'aria-current="page"' : ''}><span>${String(index + 1).padStart(2, '0')}</span><span><b>${e(item.title)}</b></span>${icon(itemTracking.complete === 7 ? 'circle-check-big' : 'chevron-right')}</button>${children}</div>`; }).join('');
    return `<div class="chapter-shell-nav"><nav class="chapter-browser" aria-label="${e(jeeMode ? 'JEE Main' : 'CBSE')} ${e(lesson.subject)} chapters">${chapterButtons}</nav><div class="chapter-workspace-status"><span><small>Current journey</small><b>${tracking.complete}/7</b></span><span><small>Mastery</small><b>${mastery}%</b></span></div><button type="button" class="chapter-workspace-close" data-close-chapter-workspace aria-label="Back to Curriculum">${icon('arrow-left')}<span>Back to Curriculum</span></button></div>`;
  }

  function chapterWorkspace(lessonId, section = 'summary') {
    const c = academicContext();
    const jeeLesson = HM.genius.jeeSyllabus.find(item => item.id === lessonId);
    const lesson = curriculumLessonById(c, lessonId);
    if (!lesson) return '<section class="panel"><p class="empty">This chapter is no longer available.</p></section>';
    const jeeMode = Boolean(jeeLesson);
    const notes = HM.genius.teacherNotes(lesson);
    const guide = jeeMode ? HM.genius.jeeGuide(lesson) : HM.genius.guide(lesson);
    const questions = HM.genius.questions(lesson);
    const list = values => `<ul>${values.map(value => `<li>${e(value)}</li>`).join('')}</ul>`;
    const norm = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const books = textbookCatalog.filter(book => book.grade === +c.profile.grade && book.subject === lesson.subject);
    const bookMatches = books.flatMap(book => (book.pdfFiles || []).map(part => ({ book, part }))).filter(entry => (lesson.partKey && (entry.part.key || entry.part.url) === lesson.partKey) || norm(entry.part.label) === norm(lesson.title) || norm(entry.part.label).includes(norm(lesson.title)) || norm(lesson.title).includes(norm(entry.part.label)));
    const bookEntry = bookMatches[0] || (books[0]?.pdfFiles?.[0] ? { book: books[0], part: books[0].pdfFiles[0] } : null);
    const assignments = (D.state.academicDeliverables || []).filter(item => item.studentId === c.activeId && item.subject === lesson.subject);
    D.state.settings.chapterMastery ||= {};
    D.state.settings.chapterMastery[c.activeId] ||= {};
    const stored = D.state.settings.chapterMastery[c.activeId][lesson.id] || {};
    const tracking = chapterTracking(c, lesson);
    const mastery = tracking.mastery;
    const statusValue = stored.status || lesson.status || (mastery >= 80 ? 'mastered' : mastery ? 'learning' : 'not-started');
    const deepConcepts = notes.rich ? `<section class="chapter-deep-concepts">${notes.rich.concepts.map((concept, index) => `<article><span>${index + 1}</span><div><h3>${e(concept.title)}</h3><p>${e(concept.explain)}</p><small>${e(concept.visual)}</small><button type="button" class="topic-deep-dive" data-deep-dive data-lesson="${e(lesson.id)}" data-topic="${e(concept.title)}" data-explanation="${e(concept.explain)}" data-connection="${e(concept.visual || notes.bigIdea)}">${icon('scan-search')}<span>Deep Dive</span></button></div></article>`).join('')}</section>` : '';
    const summaryRegistry = window.HM.chapterSummaries || {};
    const trackRegistry = jeeMode ? (summaryRegistry.jee || {}) : (summaryRegistry.school || {});
    const normalizedTitle = `${lesson.subject}|${lesson.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const summaryValues = [...Object.values(trackRegistry), ...Object.values(summaryRegistry)].filter(item => item && typeof item === 'object' && !Array.isArray(item));
    const authoredSummary = trackRegistry[lesson.id] || trackRegistry[`${lesson.subject}::${lesson.title}`] || summaryRegistry[lesson.id] || summaryRegistry[`${lesson.subject}::${lesson.title}`] || summaryRegistry[normalizedTitle] || summaryValues.find(item => item?.title === lesson.title && (!item.subject || item.subject === lesson.subject));
    const summary = authoredSummary || {
      title: lesson.title,
      bigIdea: notes.bigIdea,
      story: notes.rich?.whyItMatters || notes.wisdom,
      essentialResults: notes.rich?.mustKnow || notes.must,
      problemFlow: notes.rich?.worked?.steps || [notes.example[0], notes.example[1]],
      examTraps: notes.rich?.traps || guide.traps,
      rapidRecall: notes.revision
    };
    const foundationRegistry = window.HM.chapterFoundations || {};
    const foundationValues = [...Object.values(foundationRegistry.school || {}), ...Object.values(foundationRegistry.jee || {}), ...Object.values(foundationRegistry)].filter(item => item && typeof item === 'object' && !Array.isArray(item));
    const authoredFoundation = foundationRegistry[lesson.id] || foundationRegistry.school?.[lesson.id] || foundationRegistry.jee?.[lesson.id] || foundationRegistry[`${lesson.subject}::${lesson.title}`] || foundationRegistry.school?.[`${lesson.subject}::${lesson.title}`] || foundationRegistry.jee?.[`${lesson.subject}::${lesson.title}`] || foundationRegistry[normalizedTitle] || foundationValues.find(item => item?.title === lesson.title && (!item.subject || item.subject === lesson.subject));
    const subjectMemory = {
      Physics: ['A quantity is a number with a unit. Some quantities also need a direction.', 'A graph shows how one quantity changes when another quantity changes.', 'An equation is a relationship: changing one side must still keep the other side equal.'],
      Chemistry: ['Matter is made of particles, and particles can rearrange without disappearing.', 'Atoms use outer electrons to bond, react and form ions.', 'A chemical equation must conserve every kind of atom and the total charge.'],
      Mathematics: ['An equals sign says that two expressions have the same value.', 'A variable is a number whose value may change or may still be unknown.', 'A graph turns a number relationship into a picture.'],
      'Computer Science': ['A program is a precise list of instructions.', 'A variable gives a stored value a name.', 'Input enters a system, rules transform it, and output leaves the system.'],
      'English Core': ['A text has a speaker or narrator, a situation and an intended effect.', 'Evidence is the exact detail that supports an interpretation.', 'A strong answer states an idea, points to evidence and explains the connection.']
    };
    const foundation = authoredFoundation || {
      remember: subjectMemory[lesson.subject] || ['Every chapter grows from ideas you already know.', 'Examples connect a new word to something familiar.', 'A clear explanation tells what happens, how it happens and why it matters.'],
      newWords: (notes.rich?.concepts || []).slice(0, 5).map(concept => ({ term: concept.title, plain: concept.explain })),
      firstExample: { prompt: notes.rich?.worked?.question || notes.example?.[0] || `Where can we notice ${lesson.title} in a familiar situation?`, steps: notes.rich?.worked?.steps || [notes.example?.[1] || notes.wisdom], answer: notes.rich?.worked?.answer || notes.example?.[1] || notes.bigIdea },
      visual: { type: 'flow', nodes: (notes.visual || []).map((label, index) => ({ id: `node-${index + 1}`, label })), edges: (notes.visual || []).slice(1).map((_, index) => ({ from: `node-${index + 1}`, to: `node-${index + 2}` })) }
    };
    const formulaPattern = /(?:^\s*(?:equation|reaction|formula)\s*:|=|→|⇌|≈|≠|≤|≥|∑|∫|√|\^|\b(?:sin|cos|tan|log|det|lim|mol|pH)\b)/i;
    const titleCase = value => { const minor = new Set(['a','an','and','as','at','by','for','from','in','of','on','or','the','to','with']); return String(value || '').split(/\s+/).map((word, index) => index && minor.has(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)).join(' '); };
    const criticalSignalPattern = /\b(if and only if|only if|only when|must not|do not|not guaranteed|except(?: when)?|unless|cannot|never|always|at least|at most)\b/gi;
    const teachingText = value => e(value).replace(criticalSignalPattern, '<strong class="chapter-critical-term">$1</strong>');
    const teachingSteps = (values, start = 1, formulaAware = false) => { const ordered = values === summary.problemFlow || values === example?.steps; const tag = ordered ? 'ol' : 'ul'; return `<${tag} class="chapter-slow-steps ${ordered ? 'chapter-sequence-list' : 'chapter-teaching-list'}" ${ordered ? `start="${start}"` : ''}>${(values || []).map(value => { const isFormula = formulaAware && formulaPattern.test(String(value)); return `<li class="${isFormula ? 'chapter-formula-card' : ''}"><article>${isFormula ? `<span aria-hidden="true">${icon('sigma')}</span>` : ''}<div><p>${teachingText(value)}</p>${isFormula ? '<small>The symbols, units and conditions are part of the relationship—not decoration.</small>' : ''}</div></article></li>`; }).join('')}</${tag}>`; };
    const referenceSource = [...(summary.essentialResults || []), ...(notes.must || []), ...(notes.revision || [])].map(value => String(value || '').trim()).filter(Boolean);
    const uniqueReferenceSource = [...new Map(referenceSource.map(value => [value.toLowerCase(), value])).values()];
    const languageSubject = ['English', 'English Core', 'Tamil', 'Hindi'].includes(lesson.subject);
    const resourceConfig = lesson.subject === 'Computer Science'
      ? { label: 'Syntax & Patterns', title: 'Syntax and Patterns in This Chapter', item: 'Pattern', icon: 'code-2', formula: false }
      : languageSubject
        ? { label: 'Language Tools', title: 'Language Tools That Strengthen Every Answer', item: 'Tool', icon: 'languages', formula: false }
        : lesson.subject === 'Social Science'
          ? { label: 'Evidence & Timelines', title: 'Evidence, Dates and Relationships That Build the Chapter', item: 'Evidence', icon: 'landmark', formula: false }
          : lesson.subject === 'Kaushal Bodh'
            ? { label: 'Methods & Measures', title: 'Methods and Measures to Use Correctly', item: 'Method', icon: 'ruler', formula: false }
            : uniqueReferenceSource.some(value => formulaPattern.test(value))
              ? { label: 'Formulae', title: 'Formulae Explained, Not Merely Listed', item: 'Formula', icon: 'sigma', formula: true }
              : { label: 'Key Relationships', title: 'Key Relationships That Organise the Chapter', item: 'Relationship', icon: 'git-branch', formula: false };
    const resourceItems = (resourceConfig.formula ? uniqueReferenceSource.filter(value => formulaPattern.test(value)) : uniqueReferenceSource).length
      ? (resourceConfig.formula ? uniqueReferenceSource.filter(value => formulaPattern.test(value)) : uniqueReferenceSource)
      : uniqueReferenceSource;
    const resourceCards = resourceItems.map((value, index) => {
      const concept = notes.rich?.concepts?.[index % Math.max(notes.rich?.concepts?.length || 1, 1)];
      const meaning = concept?.explain || summary.story || summary.bigIdea;
      const use = (summary.problemFlow || notes.exam || [])[index % Math.max((summary.problemFlow || notes.exam || []).length, 1)] || 'Match the quantities, evidence and conditions in the question before applying this relationship.';
      const caution = (summary.examTraps || guide.traps || [])[index % Math.max((summary.examTraps || guide.traps || []).length, 1)] || 'Its conditions decide whether the relationship applies.';
      return `<article><header><span>${resourceConfig.item} ${index + 1}</span><h2>${teachingText(value)}</h2><button type="button" class="topic-deep-dive" data-deep-dive data-lesson="${e(lesson.id)}" data-topic="${e(value)}" data-explanation="${e(meaning)}" data-connection="${e(use)}">${icon('scan-search')}<span>Deep Dive</span></button></header><div><section><small>WHAT IT MEANS</small><p>${teachingText(meaning)}</p></section><section><small>WHEN TO USE IT</small><p>${teachingText(use)}</p></section><section class="caution"><small>CHECK BEFORE USING</small><p>${teachingText(caution)}</p></section></div></article>`;
    }).join('');
    const resourcePanel = `<section class="chapter-resource-panel ${resourceConfig.formula ? 'formulae' : 'conceptual'}"><header><span>${icon(resourceConfig.icon)}</span><div><small>${e(resourceConfig.label.toUpperCase())}</small><h1>${e(resourceConfig.title)}</h1><p>${resourceConfig.formula ? 'Each formula is a relationship between quantities, with meaning and conditions that govern when it works.' : 'Each tool appears with its purpose, evidence and limits.'}</p></div></header><div class="chapter-resource-cards">${resourceCards || '<p class="empty">This chapter uses its central relationships directly in the guided examples.</p>'}</div></section>`;
    const wordCards = (foundation.newWords || []).map(word => { const item = typeof word === 'string' ? { term: word, plain: '' } : word; return `<article><div><h3>${e(titleCase(item.term))}</h3><p>${teachingText(item.plain || 'This word names one of the chapter’s central ideas.')}</p></div></article>`; }).join('');
    const visualNodes = (foundation.visual?.nodes || notes.visual || []).map((node, index) => typeof node === 'string' ? { id: `node-${index + 1}`, label: node } : node);
    const visualEdges = foundation.visual?.edges || visualNodes.slice(1).map((_, index) => ({ from: visualNodes[index]?.id, to: visualNodes[index + 1]?.id }));
    const relationshipCaption = foundation.visual?.caption || `A relationship map for ${lesson.title}. Each arrow shows how one idea leads to the next.`;
    const relationshipVisual = visualNodes.length ? `<figure class="chapter-relationship-visual" data-visual-type="${e(foundation.visual?.type || 'flow')}" role="img" aria-labelledby="relationship-${e(lesson.id)}"><div class="relationship-nodes">${visualNodes.map((node, index) => { const incoming = index ? visualEdges.find(edge => edge.to === node.id || (!edge.to && index > 0)) : null; return `${index ? `<span class="relationship-arrow" aria-hidden="true">${incoming?.label ? `<small>${e(incoming.label)}</small>` : ''}${icon(foundation.visual?.type === 'cycle' && index === visualNodes.length - 1 ? 'rotate-cw' : 'arrow-right')}</span>` : ''}<article><span>${index + 1}</span><b>${e(node.label)}</b></article>`; }).join('')}</div><figcaption id="relationship-${e(lesson.id)}">${e(relationshipCaption)}</figcaption></figure>` : '';
    const example = foundation.firstExample || {};
    const walkthroughExamples = [
      { prompt: example.prompt || notes.example?.[0] || `Use the chapter idea in ${lesson.title}.`, steps: example.steps || summary.problemFlow || [], answer: example.answer || notes.example?.[1] || summary.bigIdea },
      ...questions.slice(0, 2).map(question => ({ prompt: question.stem, steps: [...(summary.problemFlow || []).slice(0, 2), question.why], answer: question.options?.[question.answer] || question.why }))
    ].slice(0, 3);
    const walkthroughExamplesSection = `<section class="chapter-first-example chapter-lesson-section"><div class="chapter-lesson-heading"><small>THREE GUIDED EXAMPLES</small><h2>See the Idea Work, Step by Step</h2><p>Each example shows the question, the reasoning moves and the final conclusion.</p></div><div class="chapter-worked-examples">${walkthroughExamples.map((item, index) => `<article><header><span>Example ${index + 1}</span><h3>${e(item.prompt)}</h3></header><ol>${(item.steps || []).slice(0, 4).map(step => `<li>${teachingText(step)}</li>`).join('')}</ol><footer><b>Answer</b><p>${teachingText(item.answer)}</p></footer></article>`).join('')}</div></section>`;
    const summaryConceptMap = tracking.topics.subchapters.length ? `<section class="chapter-summary-map chapter-subchapter-summary chapter-lesson-section"><div class="chapter-lesson-heading"><small>CHAPTER ROADMAP</small><h2>Subchapters</h2><p>These are the ideas that make up this chapter. Progress is saved for each one.</p></div><div class="chapter-concept-lessons">${tracking.topics.subchapters.map((topic, index) => { const topicState = tracking.topics.states[topic.id]; const stateLabel = topicState === 'mastered' ? 'Mastered' : topicState === 'learning' ? 'Learning' : 'Not Started'; return `<article id="${e(topic.id)}" data-summary-subchapter="${e(topic.id)}" class="summary-subchapter state-${e(topicState)}" tabindex="-1"><header><span>Subchapter ${index + 1} of ${tracking.topics.total}</span><button type="button" class="chapter-subchapter-state" data-subchapter-progress="${e(topic.id)}" data-lesson="${e(lesson.id)}" data-state="${e(topicState)}">${icon(topicState === 'mastered' ? 'circle-check-big' : topicState === 'learning' ? 'circle-dot' : 'circle')}<span>${e(stateLabel)}</span></button></header><div><h3>${e(topic.title)}</h3><p>${teachingText(topic.explanation)}</p>${topic.connection ? `<aside>${icon('git-branch')}<span>${teachingText(topic.connection)}</span></aside>` : ''}<button type="button" class="topic-deep-dive" data-deep-dive data-lesson="${e(lesson.id)}" data-topic="${e(topic.title)}" data-explanation="${e(topic.explanation)}" data-connection="${e(topic.connection || summary.bigIdea)}">${icon('scan-search')}<span>Deep Dive</span></button></div></article>`; }).join('')}</div></section>` : '';
    const summaryPanel = `<article class="chapter-summary"><section class="chapter-foundation chapter-lesson-section"><span class="chapter-lesson-number">1</span><div class="chapter-lesson-heading"><small>WHAT THIS CHAPTER BUILDS ON</small><h2>Bring these ideas with you</h2><p>These familiar ideas are enough to begin this chapter.</p></div>${teachingSteps(foundation.remember || [])}</section><section class="chapter-vocabulary chapter-lesson-section"><span class="chapter-lesson-number">2</span><div class="chapter-lesson-heading"><small>MEET THE NEW LANGUAGE</small><h2>New words, in plain words</h2><p>Knowing these words makes the explanation and formulas easier to follow.</p></div><div class="chapter-word-cards">${wordCards}</div></section><header class="chapter-summary-opening chapter-lesson-section"><span class="chapter-lesson-number">3</span><div class="chapter-opening-copy"><span class="chapter-summary-icon">${icon('scroll-text')}</span><div><small>${e(lesson.subject)}</small><h1>${e(lesson.title)}</h1><h2>The chapter’s central idea</h2><p class="chapter-summary-bigidea">${e(summary.bigIdea)}</p><p class="chapter-summary-story">${e(summary.story)}</p></div></div></header><section class="chapter-picture-section chapter-lesson-section"><span class="chapter-lesson-number">4</span><div class="chapter-lesson-heading"><small>SEE THE RELATIONSHIP</small><h2>How the pieces connect</h2><p>Follow the arrows and explain what changes from one box to the next.</p></div>${relationshipVisual}</section>${summaryConceptMap}<section class="chapter-summary-results chapter-lesson-section"><span class="chapter-lesson-number">6</span><div class="chapter-lesson-heading"><small>KEEP THESE RELATIONSHIPS</small><h2>Facts and formulas that carry the chapter</h2><p>Each box holds one useful relationship. Name the quantities and units before using a formula.</p></div>${teachingSteps(summary.essentialResults || [], 1, true)}</section><section class="chapter-first-example chapter-lesson-section"><span class="chapter-lesson-number">7</span><div class="chapter-lesson-heading"><small>YOUR FIRST COMPLETE EXAMPLE</small><h2>Watch one idea become an answer</h2><p>${e(example.prompt || notes.example?.[0] || '')}</p></div>${teachingSteps(example.steps || summary.problemFlow || [])}${example.answer ? `<div class="chapter-example-answer"><span>${icon('badge-check')}</span><div><small>ANSWER AND MEANING</small><p>${e(example.answer)}</p></div></div>` : ''}</section><section class="chapter-summary-reasoning chapter-lesson-section"><span class="chapter-lesson-number">8</span><div class="chapter-lesson-heading"><small>USE THE METHOD AGAIN</small><h2>How to work through a question</h2><p>This is the thinking path to reuse when the numbers, diagram or wording changes.</p></div>${teachingSteps(summary.problemFlow || [])}</section><section class="chapter-summary-traps chapter-lesson-section"><span class="chapter-lesson-number">9</span><div class="chapter-lesson-heading"><small>STOP AND CHECK</small><h2>Mistakes to watch for</h2><p>These mistakes often look reasonable at first. The check beside each idea helps you catch them.</p></div>${teachingSteps(summary.examTraps || [])}</section><section class="chapter-summary-exam chapter-lesson-section"><span class="chapter-lesson-number">10</span><div class="chapter-lesson-heading"><small>SHOW WHAT YOU KNOW</small><h2>How to write a strong exam answer</h2><p>A clear answer shows the idea, the working and the conclusion in that order.</p></div><div class="chapter-exam-teaching"><div><h3>What earns marks</h3>${teachingSteps(notes.exam)}</div><div><h3>What proves you understand</h3><p>${e(guide.proof)}</p></div></div></section><section class="chapter-summary-recall chapter-lesson-section"><span class="chapter-lesson-number">11</span><div class="chapter-lesson-heading"><small>REBUILD IT FROM MEMORY</small><h2>What can you explain without looking?</h2><p>Use these prompts to find the one part that needs another look.</p></div>${teachingSteps(summary.rapidRecall || [])}</section></article>`;
    const workedSteps = notes.rich ? `<ol>${notes.rich.worked.steps.map(step => `<li>${e(step)}</li>`).join('')}</ol><p><b>Answer:</b> ${e(notes.rich.worked.answer)}</p><p class="worked-check"><b>Check:</b> ${e(notes.rich.worked.check)}</p>` : `<p><b>Reason:</b> ${e(notes.example[1])}</p>`;
    const learn = `<section class="chapter-learning-grid"><article class="chapter-big-idea"><span class="section-kicker">THE IDEA THAT UNLOCKS THIS CHAPTER</span><h2>${e(notes.bigIdea)}</h2><div class="chapter-concept-flow">${notes.visual.map((value, index) => `${index ? icon('arrow-right') : ''}<span>${e(value)}</span>`).join('')}</div><div class="chapter-guru"><span>${icon('sparkles')}</span><div><b>Guru’s insight</b><p>${e(notes.wisdom)}</p></div></div>${deepConcepts}</article><article><span class="section-kicker">CHAPTER CORE</span><h3>The Relationships That Matter</h3>${list(notes.must)}</article><article><span class="section-kicker">WORKED REASONING</span><h3>See How the Thinking Moves</h3><p><b>Problem:</b> ${e(notes.example[0])}</p>${workedSteps}</article><article><span class="section-kicker">COMMON TRAPS</span><h3>Where Marks Disappear</h3>${list(notes.rich?.traps || guide.traps)}</article></section>`;
    const bookPanel = bookEntry ? `<section class="chapter-book-panel"><iframe title="${e(bookEntry.part.label)} textbook section" src="${e(`${bookEntry.part.url}#${bookEntry.part.page ? `page=${bookEntry.part.page}&` : ''}view=FitH`)}"></iframe></section>` : `<section class="chapter-empty-state">${icon('book-x')}<h2>No exact book section is mapped yet</h2><p>The teacher notes and guided questions remain available.</p></section>`;
    const explainedChecks = notes.rich?.guidedQuestions?.map((question, index) => `<article class="guided-teaching-check"><span class="question-number">${questions.length + index + 1}</span><div><h3>${e(question.question)}</h3><div class="guided-explanation"><span>${icon('lightbulb')}</span><p><b>Teacher’s answer:</b> ${e(question.answer)} ${e(question.explanation)}</p></div></div></article>`).join('') || '';
    const practice = `<section class="chapter-guided-practice"><header><span class="section-kicker">PRACTICE & TESTS</span><h2>Questions With Complete Explanations</h2><p>Every question reveals the correct choice, the reasoning behind it, and the distinction that makes the other choices fail.</p></header>${questions.map((question, questionIndex) => `<article><span class="question-number">${questionIndex + 1}</span><div><h3>${e(question.stem)}</h3><div class="guided-options">${question.options.map((option, optionIndex) => `<div class="${optionIndex === question.answer ? 'correct' : ''}"><span>${String.fromCharCode(65 + optionIndex)}</span><p>${e(option)}</p>${optionIndex === question.answer ? icon('circle-check-big') : ''}</div>`).join('')}</div><div class="guided-explanation"><span>${icon('lightbulb')}</span><p><b>Why ${String.fromCharCode(65 + question.answer)} is correct:</b> ${e(question.why)}</p></div></div></article>`).join('')}${explainedChecks}</section>`;
    const assignmentPanel = `<section class="chapter-assignment-panel"><header><span class="section-kicker">SCHOOL WORK · ${e(lesson.subject)}</span><h2>Assignments connected to this subject</h2><p>Finish teacher-assigned work here; this learning view does not ask students to create more work.</p></header>${assignments.length ? assignments.map(item => `<article><span>${icon(item.type === 'Practical' ? 'flask-conical' : item.type === 'Project' ? 'presentation' : 'clipboard-check')}</span><div><b>${e(item.title)}</b><p>${e(item.notes || item.type)}</p><small>${D.date(item.dueDate)} · ${e(item.status)}</small></div>${academicStatus(item.status)}</article>`).join('') : '<p class="empty">No school assignment is currently recorded for this subject.</p>'}</section>`;
    D.state.settings.geniusNotes ||= {};
    D.state.settings.geniusNotes[c.activeId] ||= {};
    const personalNote = D.state.settings.geniusNotes[c.activeId][lesson.id] || '';
    const notePanel = `<section class="genius-personal-notes chapter-note-panel"><div><span>${icon('notebook-pen')}</span><span><b>My chapter notes</b><small>Keep the idea, formula, mistake or question your future self needs.</small></span></div><textarea data-genius-note data-lesson="${e(lesson.id)}" placeholder="Write your own chapter note…">${e(personalNote)}</textarea><footer><small>A saved note completes the Notes stage.</small><button type="button" class="primary" data-genius-note-save="${e(lesson.id)}">${icon('save')} Save note</button></footer></section>`;
    const sevenStatus = `<section class="chapter-seven-status" aria-label="Seven-part chapter progress">${chapterStages.map(([key, label, iconName], index) => `<article class="${tracking.status[key] ? 'complete' : ''}"><span>${icon(tracking.status[key] ? 'circle-check-big' : iconName)}</span><small>${index + 1}</small><b>${e(label)}</b><em>${tracking.status[key] ? 'Complete' : 'To do'}</em></article>`).join('')}</section>`;
    const progressPanel = `<section class="chapter-progress-panel"><div class="chapter-mastery-ring" style="--mastery:${clamp(mastery)}"><strong>${mastery}%</strong><span>${e(statusValue.replace('-', ' '))}</span></div><div><span class="section-kicker">MASTERY SNAPSHOT</span><h2>Current Command of the Chapter</h2><p>The levels move from recognition to independent explanation, unfamiliar problems, and teaching-quality understanding.</p><div class="mastery-choices">${[[20,'I recognise it'],[40,'I can explain it'],[60,'I can solve standard questions'],[80,'I can handle unfamiliar questions'],[100,'I can teach and verify it']].map(([value, label]) => `<button type="button" data-chapter-mastery="${value}" data-lesson="${e(lesson.id)}" data-jee="${jeeMode}" class="${mastery === value ? 'active' : ''}"><b>${value}%</b><span>${label}</span></button>`).join('')}</div></div>${sevenStatus}</section>`;
    const memoryBySubject = {
      Physics: ['A clear diagram fixes the system, directions and known quantities before an equation appears.', 'Every symbol carries both a physical meaning and a unit.', 'The strongest explanations follow cause, law and observable result.'],
      Chemistry: ['Reaction families become clearer when grouped by the change they produce.', 'Reactant, condition and product reveal the logic inside an equation.', 'A contrast table makes similar terms and their exceptions visible together.'],
      Mathematics: ['A definition becomes concrete through one example beside one non-example.', 'A formula is easier to retain when tied to its graph or geometric meaning.', 'A tiny case reveals the structure before the general rule adds notation.'],
      'Computer Science': ['One small input traced through every step exposes the program’s actual behaviour.', 'Purpose gives syntax a reason to exist.', 'The normal path becomes clearer beside one failure case.'],
      'English Core': ['An interpretation becomes convincing when attached to one exact textual detail.', 'Beginning, turning point and result capture change without retelling everything.', 'Character, conflict and consequence form durable recall anchors.']
    };
    const supportList = values => `<ul>${(values || []).filter(Boolean).slice(0, 4).map(value => `<li>${e(value)}</li>`).join('')}</ul>`;
    const chapterReferenceRail = `<section class="chapter-reference-rail" aria-label="Chapter foundations and vocabulary"><article class="chapter-reference-card foundation"><header><span>1</span><h2>Foundation Bridge</h2></header>${supportList(foundation.remember)}</article><article class="chapter-reference-card vocabulary"><header><span>2</span><h2>New Words, in Plain Words</h2></header><dl>${(foundation.newWords || []).map(word => { const item = typeof word === 'string' ? { term: word, plain: '' } : word; return `<div><dt>${e(titleCase(item.term))}</dt><dd>${e(item.plain || 'A central idea used in this chapter.')}</dd></div>`; }).join('')}</dl></article></section>`;
    const patterns = (summary.problemFlow || notes.visual || []).slice(0, 3);
    const memoryMethods = memoryBySubject[lesson.subject] || ['A three-step story makes the main relationship easier to reconstruct.', 'A visual rebuilt from memory reveals which connection is still missing.', 'An example expressed in fresh words shows whether the idea—not the sentence—was understood.'];
    const errorChecks = {
      Physics: ['Direction errors often survive even when the magnitude is correct.', 'Units and limiting cases expose physically impossible results.', 'Every law depends on symmetry or stated conditions.'],
      Chemistry: ['Atom and charge balance expose an invalid calculation immediately.', 'A reaction condition can completely change the expected product.', 'Named exceptions matter because they alter the usual product or trend.'],
      Mathematics: ['The domain or stated condition decides which algebraic results are allowed.', 'Substitution into the original statement exposes extraneous answers.', 'Graphs, signs and size estimates reject results that algebra alone may leave behind.'],
      'Computer Science': ['The smallest valid input makes each program step visible.', 'Data type, boundaries and failure paths account for most hidden defects.', 'Syntax errors and logic errors require different repairs.'],
      'English Core': ['A claim without a precise textual detail remains an opinion.', 'Speaker, narrator and author are distinct voices.', 'Evidence earns its place only when its connection to the conclusion is clear.']
    }[lesson.subject] || ['Meaning, evidence and conclusion form one reasoning chain.', "A sound answer remains consistent with the chapter's central relationship."];
    const supportCard = (type, title, iconName, contexts, body) => `<article class="chapter-support-card ${type}" data-support-for="${contexts.join(' ')}"><header><span>${icon(iconName)}</span><h2>${e(title)}</h2></header>${body}</article>`;
    const contextualSupports = [];
    if (patterns.length >= 2) contextualSupports.push(supportCard('patterns', 'Common Patterns', 'git-branch', ['opening','picture','concepts','example','reasoning'], supportList(patterns)));
    if (memoryMethods.length >= 2) contextualSupports.push(supportCard('memory', 'Memorization Techniques', 'brain', ['foundation','vocabulary','results','recall'], supportList(memoryMethods)));
    if ((summary.rapidRecall || []).length >= 2) contextualSupports.push(supportCard('remember', 'High-Value Recall', 'pin', ['results','recall'], supportList(summary.rapidRecall)));
    if ((summary.examTraps || guide.traps || []).length >= 2) contextualSupports.push(supportCard('repair', 'How to Catch Errors', 'scan-search', ['traps'], supportList(errorChecks)));
    if (guide.proof) contextualSupports.push(supportCard('exam-signal', 'Answer Pattern', 'badge-check', ['exam'], `<p>${e(guide.proof)}</p>`));
    const marginNotes = D.state.settings.chapterSectionNotes?.[c.activeId]?.[lesson.id] || [];
    const marginNoteCards = `${personalNote ? `<article class="chapter-margin-note legacy" data-note-for="chapter"><header><span>Whole Chapter</span><small>Earlier note</small></header><p>${e(personalNote)}</p></article>` : ''}${marginNotes.map(note => `<article class="chapter-margin-note" data-note-for="${e(note.section || 'opening')}" data-note-id="${e(note.id)}"><header><span>${e(note.sectionLabel || 'Chapter Note')}</span><small>${e(note.updatedAt ? D.date(note.updatedAt) : 'Saved')}</small></header><textarea data-chapter-note-text="${e(note.id)}" aria-label="Edit note for ${e(note.sectionLabel || 'chapter section')}">${e(note.text)}</textarea><footer><button type="button" data-chapter-note-save="${e(note.id)}" data-lesson="${e(lesson.id)}">Save</button><button type="button" class="danger-action" data-chapter-note-delete="${e(note.id)}" data-lesson="${e(lesson.id)}" aria-label="Delete this note">${icon('trash-2')}</button></footer></article>`).join('')}`;
    const marginNotesPanel = `<section class="chapter-rail-panel chapter-margin-notes" data-chapter-rail-panel="notes" hidden><header><small>NOTES BESIDE THE LESSON</small><h2>My Notes</h2><p>Attached to: <b data-note-section-label>The Chapter’s Central Idea</b></p></header><div class="chapter-note-composer"><textarea data-chapter-note-draft data-lesson="${e(lesson.id)}" placeholder="Write what you understood, a formula, a mistake to avoid, or a question…"></textarea><button type="button" data-chapter-note-add="${e(lesson.id)}">${icon('plus')}<span>Add Note Card</span></button></div><div class="chapter-margin-note-list">${marginNoteCards}<p class="chapter-note-empty" data-chapter-note-empty>No note cards beside this section yet.</p></div></section>`;
    const railShell = (guideContent, label) => `<aside class="chapter-support-rail" aria-label="${label}"><nav class="chapter-rail-tabs" aria-label="Right panel options"><button type="button" class="active" data-chapter-rail-tab="guide" aria-selected="true">Study Guide</button><button type="button" data-chapter-rail-tab="notes" aria-selected="false">My Notes${marginNotes.length ? `<span>${marginNotes.length}</span>` : ''}</button></nav><section class="chapter-rail-panel" data-chapter-rail-panel="guide">${guideContent}</section>${marginNotesPanel}</aside>`;
    const supportRail = railShell(`${chapterReferenceRail}${contextualSupports.join('')}`, 'Chapter reference, contextual support and notes');
    const understandSupportRail = railShell(contextualSupports.join(''), 'Contextual chapter support and notes');
    const chapterMasthead = `<header class="chapter-summary-masthead"><small>${e(lesson.subject)} · Chapter guide</small><h1>${e(lesson.title)}</h1></header>`;
    const cleanSummaryPanel = summaryPanel
      .replace('<article class="chapter-summary">', `<article class="chapter-summary">${chapterMasthead}`)
      .replace(`<small>${e(lesson.subject)}</small><h1>${e(lesson.title)}</h1>`, '')
      .replace(/<span class="chapter-lesson-number">\d+<\/span>/g, '')
      .replace(/<span class="chapter-summary-icon">[\s\S]*?<\/span>/, '')
      .replace(/<section class="chapter-first-example chapter-lesson-section">[\s\S]*?<\/section>/, walkthroughExamplesSection)
      .replace(/<article><span>\d+<\/span><b>/g, '<article><b>')
      .replace('Bring these ideas with you', 'Foundation Bridge')
      .replace('These familiar ideas are enough to begin this chapter.', 'These familiar ideas connect earlier learning to the chapter ahead.')
      .replace('Knowing these words makes the explanation and formulas easier to follow.', 'These words carry the chapter’s central meanings and relationships.')
      .replace('Follow the arrows and explain what changes from one box to the next.', 'Each arrow reveals what changes from one idea to the next.')
      .replace('KEEP THESE RELATIONSHIPS', 'CORE RELATIONSHIPS')
      .replace('Each box holds one useful relationship. Name the quantities and units before using a formula.', 'Each box holds one useful relationship; quantities, units and conditions remain visible beside it.')
      .replace('USE THE METHOD AGAIN', 'METHOD IN ACTION')
      .replace('This is the thinking path to reuse when the numbers, diagram or wording changes.', 'The same reasoning path survives when the numbers, diagram or wording changes.')
      .replace('STOP AND CHECK', 'COMMON MISSTEPS')
      .replace('These mistakes often look reasonable at first. The check beside each idea helps you catch them.', 'These mistakes look reasonable at first; the contrast beside each one reveals the flaw.')
      .replace('SHOW WHAT YOU KNOW', 'EXAM ANSWER STRUCTURE')
      .replace('REBUILD IT FROM MEMORY', 'RAPID RECALL MAP')
      .replace('What can you explain without looking?', 'The Chapter in a Few Questions')
      .replace('Use these prompts to find the one part that needs another look.', 'Each prompt isolates one relationship that carries the chapter.')
      .replace(/<(h[23])>([^<]+)<\/\1>/g, (_, tag, text) => `<${tag}>${titleCase(text)}</${tag}>`)
      .replace(e(summary.bigIdea), () => teachingText(summary.bigIdea))
      .replace(e(summary.story), () => teachingText(summary.story));
    const summaryWithSupport = `<div class="chapter-summary-layout">${cleanSummaryPanel}${supportRail}</div>`;
    const learningWithSupport = `<div class="chapter-summary-layout chapter-understand-layout">${learn}${understandSupportRail}</div>`;
    const panels = { summary: summaryWithSupport, understand: learningWithSupport, resource: resourcePanel, book: bookPanel, notes: notePanel, practice, assignments: assignmentPanel, progress: progressPanel };
    const canToggle = !['notes', 'progress', 'resource'].includes(section);
    const stageAction = canToggle ? `<button type="button" class="chapter-stage-toggle compact ${tracking.status[section] ? 'complete' : ''}" data-chapter-stage-toggle="${e(section)}" data-lesson="${e(lesson.id)}">${icon(tracking.status[section] ? 'circle-check-big' : 'circle')}<span>${tracking.status[section] ? 'Completed' : 'Mark complete'}</span></button>` : `<span class="chapter-tab-context">${icon(section === 'resource' ? resourceConfig.icon : tracking.status[section] ? 'circle-check-big' : 'info')}<b>${section === 'resource' ? `${resourceItems.length} explained ${resourceConfig.label.toLowerCase()}` : section === 'notes' ? 'Save a note to complete' : '80% mastery completes this stage'}</b></span>`;
    const workspaceSections = [...chapterSections.slice(0, 2), ['resource', resourceConfig.label, resourceConfig.icon], ...chapterSections.slice(2)];
    const workspaceTabs = `<header class="chapter-content-tabs"><nav class="chapter-workspace-tabs" aria-label="Chapter learning sections">${workspaceSections.map(([value,label,iconName]) => `<button type="button" data-chapter-workspace-tab="${value}" data-lesson="${e(lesson.id)}" class="${section === value ? 'active' : ''} ${value !== 'summary' && tracking.status[value] ? 'complete' : ''}" ${section === value ? 'aria-current="page"' : ''}>${icon(iconName)}<span>${label}</span>${value !== 'summary' && tracking.status[value] ? icon('circle-check-big') : ''}</button>`).join('')}</nav>${stageAction}</header>`;
    return `<div class="chapter-workspace-shell">${workspaceTabs}<main class="chapter-workspace-content chapter-section-${e(section)}">${panels[section] || cleanSummaryPanel}</main></div>`;
  }

  function books() {
    const c = academicContext();
    c.learningExtension = 'books';
    const available = textbookCatalog.filter(book => book.grade === +c.profile.grade);
    const availableSubjects = [...new Set(available.map(item => item.subject))];
    const selectedSubject = c.selectedSubject === 'All subjects' ? available[0]?.subject : c.selectedSubject;
    const subjectBooks = available.filter(book => book.subject === selectedSubject);
    D.state.settings.activeReadingBook ||= {};
    const savedBookId = D.state.settings.activeReadingBook[c.activeId];
    const book = subjectBooks.find(item => item.id === savedBookId) || subjectBooks[0];
    if (!book) return `${learnerBar(c)}<section class="panel"><p class="empty">No textbook is configured for this subject.</p></section>`;
    const progress = (D.state.readingProgress || []).find(item => item.studentId === c.activeId && item.bookId === book.id);
    const partKey = part => part.key || part.url;
    const partSource = part => part?.url ? `${part.url}#${part.page ? `page=${part.page}&` : ''}view=FitH` : '';
    const selectedPart = book.pdfFiles?.find(part => partKey(part) === progress?.currentPart || (!part.key && part.url === progress?.currentPart)) || book.pdfFiles?.[0];
    const directSource = partSource(selectedPart);
    const sectionCount = subjectBooks.reduce((total, item) => total + (item.pdfFiles?.length || 0), 0);
    const bookNavLabel = item => item.title.match(/Part\s+[IVX]+$/i)?.[0] || item.title;
    const volumeGroups = subjectBooks.map(item => {
      const active = item.id === book.id;
      const sections = active && item.pdfFiles?.length ? `<div class="inline-book-volume-sections">${item.pdfFiles.map((part, index) => `<button type="button" data-inline-book-chapter="${e(part.url)}" data-book-part-key="${e(partKey(part))}" data-book-page="${part.page || 1}" data-book-id="${e(item.id)}" class="inline-book-chapter ${part === selectedPart ? 'active' : ''}" aria-current="${part === selectedPart ? 'page' : 'false'}"><span>${String(index + 1).padStart(2, '0')}</span><b>${e(part.label)}</b></button>`).join('')}</div>` : '';
      return `<section class="inline-book-volume ${active ? 'active' : ''}"><button type="button" class="inline-book-volume-head" data-inline-book="${e(item.id)}" aria-expanded="${active}"><span>${icon(active ? 'book-open' : 'book')}</span><span><b>${e(bookNavLabel(item))}</b><small>${item.pdfFiles?.length || 0} offline sections</small></span>${icon(active ? 'chevron-down' : 'chevron-right')}</button>${sections}</section>`;
    }).join('');
    const bookSubjectSwitch = `<nav class="book-subject-switch" aria-label="Switch textbook subject">${availableSubjects.map(subject => `<button type="button" data-learning-subject="${e(subject)}" class="${subject === selectedSubject ? 'active' : ''}" aria-pressed="${subject === selectedSubject}">${e(subject)}</button>`).join('')}</nav>`;
    const chapterNav = `<aside class="inline-book-chapters" aria-label="${e(selectedSubject)} books and chapters"><header><span>${icon('list-tree')}</span><span><b>Books & chapters</b><small>${subjectBooks.length} ${subjectBooks.length === 1 ? 'book' : 'books'} · ${sectionCount} sections</small></span></header>${bookSubjectSwitch}<nav>${volumeGroups}</nav></aside>`;
    return `${learnerBar(c)}<section class="inline-book-reader" data-book-card="${e(book.id)}" data-student="${e(c.activeId)}"><div class="inline-book-head"><div class="inline-book-identity"><span class="section-kicker">${e(selectedSubject)}</span><h2>${e(book.title)}</h2><p data-book-library-summary>${e(book.publisher)} · ${progress ? `Page ${progress.currentPage || 1}` : 'Ready to read'}</p></div><div class="inline-book-actions">${book.pdfFiles?.length ? '' : `<button type="button" data-book-import="${e(book.id)}" data-student="${e(c.activeId)}"><span data-book-import-label>Add PDF</span></button>`}<button type="button" data-book-open="${e(book.id)}" data-student="${e(c.activeId)}" ${book.pdfFiles?.length ? '' : 'disabled'} title="Open reading tools">${icon('maximize-2')}<span>Tools</span></button><a href="${e(book.sourceUrl)}" target="_blank" rel="noopener noreferrer" title="Open official source">${icon('external-link')}<span>Source</span></a><span class="book-local-state" data-book-state>Checking…</span></div></div><div class="inline-book-workspace">${chapterNav}<div class="inline-book-frame-wrap"><iframe class="inline-book-frame" data-inline-book-frame title="${e(book.title)} PDF" src="${e(directSource || 'about:blank')}"></iframe><div class="inline-book-missing" ${directSource ? 'hidden' : ''}><span>${icon('file-up')}</span><h3>Add this PDF to read it here</h3><p>The file stays in this browser and is excluded from backups.</p><button type="button" class="primary" data-book-import="${e(book.id)}" data-student="${e(c.activeId)}">${icon('file-up')}<span>Add PDF</span></button></div></div></div></section><div class="book-rights-note">${icon('shield-check')}<span><b>Your PDFs stay on this device.</b> Use lawfully obtained copies. Uploaded files remain in browser storage and are excluded from Home Manager JSON backups.</span></div>`;
  }

  function geniusMind() {
    const c = academicContext();
    const jeeEligible = +c.profile.grade === 12;
    D.state.settings.activeGeniusMode ||= {};
    const mode = jeeEligible && D.state.settings.activeGeniusMode[c.activeId] === 'jee' ? 'jee' : 'school';
    const lessons = mode === 'jee' ? c.syllabus.filter(item => ['Physics', 'Chemistry', 'Mathematics'].includes(item.subject)) : c.syllabus;
    D.state.settings.activeGeniusLesson ||= {};
    const savedId = D.state.settings.activeGeniusLesson[c.activeId];
    const lesson = lessons.find(item => item.id === savedId) || lessons[0];
    if (!lesson) return `${learnerBar(c)}<section class="panel"><p class="empty">Add curriculum outcomes to create chapter guidance.</p></section>`;
    const guide = mode === 'jee' ? HM.genius.jeeGuide(lesson) : HM.genius.guide(lesson);
    const list = values => `<ul>${values.map(value => `<li>${e(value)}</li>`).join('')}</ul>`;
    const sourceItems = mode === 'jee' ? [...HM.genius.jeeSources, ...HM.genius.sources] : HM.genius.sources;
    const sourceLinks = sourceItems.map(source => `<a href="${e(source.url)}" target="_blank" rel="noopener noreferrer"><span>${icon('external-link')}</span><span><b>${e(source.title)}</b><small>${e(source.note)}</small></span></a>`).join('');
    const modeSwitch = jeeEligible ? `<div class="genius-mode-switch" role="group" aria-label="Preparation mode"><button type="button" data-genius-mode="school" class="${mode === 'school' ? 'active' : ''}" aria-pressed="${mode === 'school'}">School & Boards</button><button type="button" data-genius-mode="jee" class="${mode === 'jee' ? 'active' : ''}" aria-pressed="${mode === 'jee'}">JEE Main</button></div>` : '';
    const jeePanels = mode === 'jee' ? `<div class="genius-jee-grid"><section><span class="section-kicker">JEE TIMED DRILL</span><h3>Train retrieval under time</h3>${list(guide.drill)}</section><section><span class="section-kicker">QUESTION SELECTION</span><h3>Protect accurate marks</h3>${list(guide.attempt)}</section><section><span class="section-kicker">ERROR CODES</span><h3>Repair the earliest wrong step</h3>${list(guide.errorCodes)}</section></div>` : '';
    const sources = `${modeSwitch}${jeePanels}${sourceLinks}`;
    return `${learnerBar(c)}<section class="genius-hero"><div><span class="section-kicker">RESEARCH-SYNTHESISED STUDY SYSTEM</span><h2>Turn each chapter into recall, application and marks</h2><p>Original study briefs built from the current curriculum, official assessment expectations and learning-science evidence—not copied commercial notes or a promise of rank.</p></div><div class="genius-cycle-mini"><span>Learn</span>${icon('arrow-right')}<span>Retrieve</span>${icon('arrow-right')}<span>Apply</span>${icon('arrow-right')}<span>Correct</span></div></section><div class="genius-layout"><aside class="genius-lessons" aria-label="Lessons"><header><b>${e(c.selectedSubject)}</b><small>${lessons.length} lessons</small></header>${lessons.map(item => `<button type="button" data-genius-lesson="${e(item.id)}" class="${item.id === lesson.id ? 'active' : ''}"><span class="genius-mastery">${item.mastery}%</span><span><b>${e(item.title)}</b><small>${e(item.term)} · ${e(item.competency)}</small></span></button>`).join('')}</aside><article class="genius-brief"><header><div><span class="context-badge study">${e(lesson.subject)}</span><h2>${e(lesson.title)}</h2><p>${e(lesson.term)} · current mastery ${lesson.mastery}% · ${e(lesson.status)}</p></div><div class="row-actions"><button data-route="study/books">${icon('book-open')}<span>Textbook</span></button><button data-route="study/practice">${icon('brain-circuit')}<span>Practise</span></button></div></header><section class="genius-key-concepts"><div class="section-head"><div><span class="section-kicker">KEY CONCEPTS</span><h3>Know these relationships</h3></div></div>${guide.concepts.map((concept, index) => `<div><span>${index + 1}</span><b>${e(concept)}</b></div>`).join('')}</section><div class="genius-brief-grid"><section><span class="section-kicker">TOP-STUDENT METHOD</span><h3>How to work this chapter</h3>${list(guide.method)}</section><section><span class="section-kicker">COMMON TRAPS</span><h3>Where marks disappear</h3>${list(guide.traps)}</section><section><span class="section-kicker">ACTIVE RECALL</span><h3>Close the book and answer</h3>${list(guide.recall)}</section><section><span class="section-kicker">EXAM PROOF</span><h3>What a strong answer shows</h3><p>${e(guide.proof)}</p></section></div><section class="genius-revision-cycle"><span class="section-kicker">FIVE-PASS CYCLE</span><h3>Do more than reread</h3><ol>${guide.cycle.map(value => `<li>${e(value)}</li>`).join('')}</ol></section></article></div><section class="genius-evidence"><div class="section-head"><div><span class="section-kicker">WHY THIS METHOD</span><h2>Official and research foundations</h2><p>Use current school instructions and official marking schemes as authoritative.</p></div></div><div>${sources}</div></section>`;
  }

  function geniusMindTeacher() {
    const c = academicContext();
    const jeeEligible = +c.profile.grade === 12;
    D.state.settings.activeGeniusMode ||= {};
    D.state.settings.activeGeniusLesson ||= {};
    D.state.settings.activeGeniusSection ||= {};
    const mode = jeeEligible && (activeRenderRoute === 'study/jee' || D.state.settings.activeGeniusMode[c.activeId] === 'jee') ? 'jee' : 'school';
    const lessons = curriculumLessons(c, mode === 'jee');
    const lesson = lessons.find(item => item.id === D.state.settings.activeGeniusLesson[c.activeId]) || lessons[0];
    if (!lesson) return `${learnerBar(c)}<section class="panel"><p class="empty">Add curriculum chapters to begin a Genius lesson.</p></section>`;
    const guide = mode === 'jee' ? HM.genius.jeeGuide(lesson) : HM.genius.guide(lesson);
    const notes = HM.genius.teacherNotes(lesson);
    const section = D.state.settings.activeGeniusSection[c.activeId] || 'understand';
    const list = values => `<ul>${values.map(value => `<li>${e(value)}</li>`).join('')}</ul>`;
    const titleCase = value => {
      const acronyms = { si: 'SI', rms: 'RMS', shm: 'SHM', vsepr: 'VSEPR', ncert: 'NCERT', ap: 'AP', gp: 'GP', ph: 'pH' };
      return String(value).split(' ').map((rawWord, index) => {
        const word = rawWord.toLowerCase();
        if (acronyms[word]) return acronyms[word];
        if (index && ['and', 'as', 'of', 'in', 'to', 'or', 'the'].includes(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    };
    const conceptTeaching = {
      'position, velocity and acceleration as vectors': 'Start with position r(t). Velocity is its rate of change and points along motion; acceleration is the rate of change of velocity, so it can change speed, direction, or both.',
      'motion graphs and relative motion': 'On a position–time graph, slope gives velocity. On a velocity–time graph, slope gives acceleration and signed area gives displacement. Relative velocity is always one velocity measured against another.',
      'projectile components and constraints': 'Resolve the launch velocity once. Horizontal motion has constant velocity while vertical motion has acceleration −g; time is the constraint that reconnects the two components.'
    };
    const conceptCards = notes.concepts.map((concept, index) => { const richConcept = notes.rich?.concepts?.[index]; return `<article><span>${index + 1}</span><div><h3>${e(titleCase(concept))}</h3><p>${e(richConcept?.explain || conceptTeaching[String(concept).toLowerCase()] || notes.must[index] || `Connect this relationship to the chapter model, then test where it stops applying.`)}</p>${richConcept?.visual ? `<small class="concept-visual">${e(richConcept.visual)}</small>` : ''}</div></article>`; }).join('');
    const visual = `<div class="genius-flow" aria-label="Concept flow">${notes.visual.map((value, index) => `${index ? icon('arrow-right') : ''}<span>${e(titleCase(value))}</span>`).join('')}</div>`;
    const understand = `<section class="genius-teach-panel"><span class="section-kicker">THE IDEA THAT UNLOCKS THE CHAPTER</span><h2>${e(notes.bigIdea)}</h2>${visual}<div class="teacher-talk"><span>${icon('sparkles')}</span><div><b>Guru's insight</b><p>${e(notes.wisdom)}</p></div></div><section class="genius-concept-lessons"><div><span class="section-kicker">KEY CONCEPTS</span><h3>Relationships That Organise the Chapter</h3></div>${conceptCards}</section><div class="genius-note-grid"><section><span class="section-kicker">CHAPTER CORE</span><h3>Essential Relationships</h3>${list(notes.must)}</section><section><span class="section-kicker">FROM IDEA TO APPLICATION</span><h3>Where Understanding Becomes Reliable</h3><p>A concept becomes reliable when its relationships survive a fresh example, an unfamiliar case and a change in conditions.</p></section></div></section>`;
    const examSheet = `<section class="genius-teach-panel"><span class="section-kicker">EXAM TIPS</span><h2>What Earns Marks in ${e(lesson.title)}</h2><div class="genius-note-grid"><section><span class="section-kicker">HIGH-VALUE RELATIONSHIPS</span><h3>Core Notes</h3>${list(notes.must)}</section><section><span class="section-kicker">EXAMINER'S LENS</span><h3>Evidence of Understanding</h3>${list(notes.exam)}<p class="teacher-proof">${e(guide.proof)}</p></section><section><span class="section-kicker">MARK-LOSING TRAPS</span><h3>Why Plausible Answers Lose Marks</h3>${list(guide.traps)}</section><section class="genius-revision-card"><span class="section-kicker">30-SECOND REVISION</span><h3>The Chapter at a Glance</h3>${list(notes.revision)}</section></div></section>`;
    const worked = `<section class="genius-teach-panel"><span class="section-kicker">WORKED EXAMPLE</span><h2>Watch the reasoning, not just the answer</h2><div class="worked-example"><div class="worked-question"><span>QUESTION / SITUATION</span><p>${e(notes.example[0])}</p></div><div class="worked-reasoning"><span>THINK THIS WAY</span><p>${e(notes.example[1])}</p></div><div class="worked-check"><span>${icon('badge-check')}</span><p><b>Self-check:</b> Can the result survive a unit, sign, boundary, diagram or evidence check?</p></div></div>${mode === 'jee' ? `<div class="genius-jee-grid"><section><span class="section-kicker">TIMED DRILL</span>${list(guide.drill)}</section><section><span class="section-kicker">ATTEMPT ORDER</span>${list(guide.attempt)}</section><section><span class="section-kicker">ERROR LOG</span>${list(guide.errorCodes)}</section></div>` : ''}</section>`;
    const panels = { understand, exam: examSheet, worked };
    D.state.settings.geniusNotes ||= {};
    D.state.settings.geniusNotes[c.activeId] ||= {};
    const personalNote = D.state.settings.geniusNotes[c.activeId][lesson.id] || '';
    const notePanel = `<section class="genius-personal-notes"><div><span>${icon('notebook-pen')}</span><span><b>My chapter notes</b><small>Private to this device and attached to ${e(lesson.title)}</small></span></div><textarea data-genius-note data-lesson="${e(lesson.id)}" placeholder="Write the insight, formula, mistake or question you want to remember…">${e(personalNote)}</textarea><footer><small>Keep only what will help your future self.</small><button type="button" class="primary" data-genius-note-save="${e(lesson.id)}">${icon('save')} Save note</button></footer></section>`;
    panels.notes = notePanel;
    const sectionTabs = [['understand', 'Understand', 'lightbulb'], ['exam', 'Exam Tips', 'notebook-tabs'], ['worked', 'Worked Example', 'route'], ['practice', 'Practice & Tests', 'brain-circuit'], ['notes', 'My Notes', 'notebook-pen']];
    const modeSwitch = jeeEligible ? `<div class="genius-mode-switch" role="group" aria-label="Preparation mode"><button type="button" data-genius-mode="school" class="${mode === 'school' ? 'active' : ''}" aria-pressed="${mode === 'school'}">Boards</button><button type="button" data-genius-mode="jee" class="${mode === 'jee' ? 'active' : ''}" aria-pressed="${mode === 'jee'}">JEE Main</button></div>` : '';
    const sources = (mode === 'jee' ? HM.genius.jeeSources : HM.genius.sources.slice(0, 3)).map(source => `<a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${icon('external-link')}<span><b>${e(source.title)}</b><small>${e(source.note)}</small></span></a>`).join('');
    const teacherSubjects = mode === 'jee' ? ['Physics', 'Chemistry', 'Mathematics'] : ['All subjects', ...c.profile.subjects];
    const subjectSwitch = '';
    return `${learnerBar(c)}${subjectSwitch}<div class="genius-teacher-layout"><aside class="genius-lessons" aria-label="Chapters"><header><b>${e(lesson.subject)}</b><small>${lessons.length} chapters</small></header>${lessons.map(item => `<button type="button" data-genius-lesson="${e(item.id)}" class="${item.id === lesson.id ? 'active' : ''}"><span class="genius-mastery">${item.mastery}%</span><span><b>${e(item.title)}</b><small>${e(item.status)}</small></span></button>`).join('')}</aside><main class="genius-classroom"><header class="genius-classroom-head"><div><span class="context-badge study">${e(lesson.subject)}</span><h1>${e(lesson.title)}</h1><p>${e(lesson.term)} · ${lesson.mastery}% mastery</p></div><div class="row-actions"><button data-route="study/books">${icon('book-open')} Book</button><button data-practice-open="${e(lesson.id)}">${icon('pencil-line')} Practice</button></div></header><nav class="genius-section-tabs" aria-label="Lesson sections">${sectionTabs.map(([value, label, iconName]) => value === 'practice' ? `<button type="button" class="practice-jump" data-practice-open="${e(lesson.id)}">${icon(iconName)}<span>${label}</span>${icon('arrow-up-right')}</button>` : `<button type="button" data-genius-section="${value}" class="${section === value ? 'active' : ''}" aria-pressed="${section === value}">${icon(iconName)}<span>${label}</span></button>`).join('')}</nav>${panels[section] || understand}</main></div><section class="genius-source-drawer"><details><summary>Sources and syllabus alignment</summary><div>${sources}</div></details></section>`;
  }

  function jeeMain() {
    const gradeTwelve = (D.state.academicProfiles || []).find(profile => +profile.grade === 12);
    if (gradeTwelve && D.state.settings.activeLearnerId !== gradeTwelve.personId) D.state.settings.activeLearnerId = gradeTwelve.personId;
    const learnerId = D.state.settings.activeLearnerId;
    D.state.settings.activeGeniusMode ||= {};
    D.state.settings.activeGeniusMode[learnerId] = 'jee';
    D.state.settings.activeLearningTrack ||= {};
    D.state.settings.activeLearningTrack[learnerId] = 'jee';
    D.state.settings.activeLearningSubject ||= {};
    if (!['Physics', 'Chemistry', 'Mathematics'].includes(D.state.settings.activeLearningSubject[learnerId])) D.state.settings.activeLearningSubject[learnerId] = 'Physics';
    return geniusMindTeacher();
  }

  function studyPlanner() {
    const c = academicContext();
    c.learningExtension = 'planner';
    const plans = [...c.plans].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));
    const days = Array.from({ length: 7 }, (_, index) => { const value = new Date(`${today()}T00:00`); value.setDate(value.getDate() + index); return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`; });
    const total = plans.filter(item => days.includes(item.date)).reduce((sumValue, item) => sumValue + (+item.minutes || 0), 0);
    const columnConfig = [['planned', 'Planned', 'calendar-clock'], ['done', 'Done', 'circle-check-big'], ['missed', 'Missed', 'rotate-ccw']];
    const weekCalendar = `<section class="study-planner-surface"><div class="planner-surface-head"><div><span class="section-kicker">WEEK CALENDAR</span><h2>When the work happens</h2><p>Add blocks inside a date; open a block to edit it.</p></div><strong>${Math.round(total / 60 * 10) / 10} h</strong></div><div class="study-week-calendar">${days.map(date => { const items = plans.filter(item => item.date === date); return `<section class="${date === today() ? 'is-today' : ''}"><header><span><small>${D.date(date, { weekday: 'short' })}</small><b>${D.date(date, { day: 'numeric', month: 'short' })}</b></span><button class="icon-action" data-create="studyPlan" data-student="${e(c.activeId)}" data-date="${e(date)}" aria-label="Add study block on ${D.date(date)}">${icon('plus')}</button></header><div class="study-day-lane">${items.map(item => `<button class="study-calendar-block ${e(item.status)}" data-edit="studyPlan" data-id="${e(item.id)}" data-student="${e(c.activeId)}"><span>${e(item.startTime)}</span><b>${e(item.subject)}</b><small>${e(item.activity)} · ${item.minutes} min</small></button>`).join('') || `<button class="study-day-empty" data-create="studyPlan" data-student="${e(c.activeId)}" data-date="${e(date)}">${icon('plus')} Plan this day</button>`}</div></section>`; }).join('')}</div></section>`;
    const kanban = `<section class="study-planner-surface"><div class="planner-surface-head"><div><span class="section-kicker">KANBAN BOARD</span><h2>Move work as it changes</h2><p>Drag cards between columns or use their move actions.</p></div></div><div class="study-plan-kanban">${columnConfig.map(([statusValue, label, iconName]) => { const items = plans.filter(item => item.status === statusValue); return `<section class="study-plan-column ${statusValue}" data-plan-drop="${statusValue}"><header><span>${icon(iconName)}</span><b class="grow">${label}</b><strong>${items.length}</strong>${statusValue === 'planned' ? `<button class="icon-action" data-create="studyPlan" data-student="${e(c.activeId)}" aria-label="Add planned study block">${icon('plus')}</button>` : ''}</header><div class="study-plan-cards">${items.map(item => `<article class="study-plan-card" draggable="true" data-study-plan="${e(item.id)}"><div class="study-plan-card-head"><span>${D.date(item.date, { weekday: 'short', day: 'numeric', month: 'short' })} · ${e(item.startTime)}</span><span class="row-actions"><button class="icon-action" data-edit="studyPlan" data-id="${e(item.id)}" data-student="${e(c.activeId)}" aria-label="Edit ${e(item.activity)}">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="studyPlans:${e(item.id)}" aria-label="Delete ${e(item.activity)}">${icon('trash-2')}</button></span></div><b>${e(item.activity)}</b><p>${e(item.subject)} · ${item.minutes} min · ${e(item.method)}</p><div class="study-card-moves">${columnConfig.filter(column => column[0] !== statusValue).map(column => `<button data-plan-move="${e(item.id)}" data-status="${column[0]}">${icon(column[2])}<span>${column[1]}</span></button>`).join('')}</div></article>`).join('') || `<button class="study-column-empty" ${statusValue === 'planned' ? `data-create="studyPlan" data-student="${e(c.activeId)}"` : 'disabled'}>${statusValue === 'planned' ? `${icon('plus')} Add the first block` : `No ${label.toLowerCase()} blocks`}</button>`}</div></section>`; }).join('')}</div></section>`;
    return `${learnerBar(c)}<section class="metrics compact-metrics">${metric('Planned this week', `${Math.round(total / 60 * 10) / 10} h`, 'Sustainable load', 'calendar-clock')}${metric('Study blocks', plans.filter(item => item.date >= today()).length, 'Upcoming', 'list-checks')}${metric('Subjects covered', new Set(plans.filter(item => item.date >= today()).map(item => item.subject)).size, `of ${c.profile.subjects.length}`, 'library-big')}${metric('Completed blocks', plans.filter(item => item.status === 'done').length, 'Build consistency', 'badge-check')}</section>${weekCalendar}${kanban}<section class="panel plan-guidance"><span>${icon('heart-pulse')}</span><div><b>Protect sleep and recovery</b><p>Use this planner to balance school, revision, exercise and sleep. More logged hours do not guarantee better marks; consistent retrieval practice and correction do.</p></div></section>`;
  }

  function assignmentsBase() {
    const c = academicContext();
    const items = [...c.deliverables].sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
    const open = items.filter(item => !['done', 'submitted'].includes(item.status));
    const weekEnd = new Date(`${today()}T00:00`); weekEnd.setDate(weekEnd.getDate() + 7);
    return `${learnerBar(c)}<section class="metrics compact-metrics">${metric('Open work', open.length, 'Needs action', 'clipboard-list')}${metric('Due in 7 days', open.filter(item => item.dueDate <= weekEnd.toISOString().slice(0, 10)).length, 'Plan early', 'calendar-warning')}${metric('Projects & practicals', items.filter(item => ['Project', 'Practical', 'Portfolio', 'Internal assessment'].includes(item.type)).length, c.profile.grade === 12 ? 'Board evidence' : 'Applied learning', 'flask-conical')}${metric('Submitted', items.filter(item => ['done', 'submitted'].includes(item.status)).length, 'Completed work', 'circle-check-big')}</section><div class="toolbar"><input data-filter aria-label="Search assignments" placeholder="Search assignments"><select id="subjectFilter" aria-label="Filter assignments by subject"><option value="">All subjects</option>${c.profile.subjects.map(subject => `<option>${e(subject)}</option>`).join('')}</select><select data-status-filter aria-label="Filter assignment status"><option value="">All statuses</option><option>todo</option><option>progress</option><option>submitted</option><option>done</option></select><button class="primary" data-create="deliverable" data-student="${e(c.activeId)}">${icon('plus')}<span>Assignment</span></button></div><section class="panel"><table class="table"><thead><tr><th>Work</th><th>Type</th><th>Teacher</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead><tbody>${items.map(item => `<tr data-filter-row data-subject="${e(item.subject)}" data-status="${e(item.status)}"><td data-label="Work"><b>${e(item.title)}</b><small>${e(item.subject)} - ${e(item.notes || 'No notes')}</small></td><td data-label="Type"><span class="badge">${e(item.type)}</span></td><td data-label="Teacher">${e(item.teacher || '-')}</td><td data-label="Due"><span class="badge ${item.dueDate < today() && !['done', 'submitted'].includes(item.status) ? 'danger' : ''}">${D.date(item.dueDate)}</span></td><td data-label="Status"><select data-deliverable-status="${e(item.id)}" aria-label="Update ${e(item.title)}">${['todo', 'progress', 'submitted', 'done'].map(value => `<option ${item.status === value ? 'selected' : ''}>${value}</option>`).join('')}</select></td><td data-label="Actions"><span class="row-actions"><button class="icon-action" data-edit="deliverable" data-id="${e(item.id)}" data-student="${e(c.activeId)}" aria-label="Edit ${e(item.title)}">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="academicDeliverables:${e(item.id)}" aria-label="Delete ${e(item.title)}">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table></section>`;
  }

  function assignments() {
    const c = academicContext();
    return `${assignmentsBase()}<details class="learning-integrations"><summary>${icon('cloud')}<span><b>Google class tools</b><small>Classroom imports and project presentations</small></span>${icon('chevron-down')}</summary><div>${classroomPanel(c.activeId)}${slidesPanel(c.activeId)}</div></details>`;
  }

  function assessments() {
    const c = academicContext();
    const completed = c.assessments.filter(item => item.status !== 'scheduled');
    const scheduled = c.assessments.filter(item => item.status === 'scheduled' && item.date >= today());
    const scores = completed.map(assessmentPercent);
    const target = +c.profile.targetPercent || 75;
    const below = completed.filter(item => assessmentPercent(item) < target);
    return `${learnerBar(c)}<section class="metrics compact-metrics">${metric('Current average', `${averageOf(scores)}%`, `Target ${target}%`, 'file-chart-column')}${metric('Target gap', `${Math.max(0, target - averageOf(scores))} pts`, below.length ? 'Improvement needed' : 'On target', 'target')}${metric('Upcoming exams', scheduled.length, scheduled.length ? `Next ${D.date([...scheduled].sort((a, b) => String(a.date).localeCompare(String(b.date)))[0].date)}` : 'Nothing scheduled', 'calendar-warning')}${metric(c.profile.grade === 12 ? 'Practical readiness' : 'Competency checks', c.profile.grade === 12 ? `${averageOf(completed.filter(item => item.practicalMax).map(item => Math.round(item.practicalScore / item.practicalMax * 100)))}%` : `${below.length} to review`, c.profile.grade === 12 ? 'Separate practical evidence' : 'Use errors for revision', 'flask-conical')}</section><div class="section-head"><div><h2>${c.profile.grade === 12 ? 'Board and school assessments' : 'School assessment record'}</h2><p>Schedule exams first; add marks only after completion</p></div><button class="primary" data-create="assessment" data-student="${e(c.activeId)}">${icon('plus')}<span>Assessment</span></button></div><section class="panel"><table class="table"><thead><tr><th>Assessment</th><th>Date</th><th>Status</th><th>Theory</th><th>Practical / IA</th><th>Overall</th><th>Target</th><th>Actions</th></tr></thead><tbody>${[...c.assessments].sort((a, b) => String(b.date).localeCompare(String(a.date))).map(item => { const isScheduled = item.status === 'scheduled'; const percent = assessmentPercent(item); const targetPercent = Math.round((+item.target || 0) / Math.max(1, +item.maxScore || 0) * 100); return `<tr><td data-label="Assessment"><b>${e(item.subject)}</b><small>${e(item.title)} - ${e(item.type)}</small></td><td data-label="Date">${D.date(item.date)}</td><td data-label="Status">${academicStatus(item.status)}</td><td data-label="Theory">${isScheduled ? `Target ${item.target}/${item.maxScore}` : `${item.score}/${item.maxScore}`}</td><td data-label="Practical / IA">${item.practicalMax ? (isScheduled ? `Max ${item.practicalMax}` : `${item.practicalScore}/${item.practicalMax}`) : '-'}</td><td data-label="Overall">${isScheduled ? '<span class="muted">Pending</span>' : `<b class="${percent < targetPercent ? 'negative' : ''}">${percent}%</b>`}</td><td data-label="Target">${targetPercent}%</td><td data-label="Actions"><span class="row-actions"><button class="icon-action" data-edit="assessment" data-id="${e(item.id)}" data-student="${e(c.activeId)}" aria-label="Edit ${e(item.subject)} assessment">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="academicAssessments:${e(item.id)}" aria-label="Delete assessment">${icon('trash-2')}</button></span></td></tr>`; }).join('')}</tbody></table></section><section class="panel assessment-note"><span>${icon('shield-check')}</span><div><b>${c.profile.grade === 12 ? 'Track theory and practical separately' : 'Use formative evidence, not one test alone'}</b><p>${c.profile.grade === 12 ? 'The board requires separate attention to theory and practical/project/internal work where applicable. Confirm exact subject marks with the school and current CBSE documents.' : 'Combine school feedback, application questions, projects and self-correction when planning support.'}</p></div></section>`;
  }

  let timerSeconds = 25 * 60;
  let timerId = null;
  function format(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }

  function practiceAndTests() {
    const c = academicContext();
    const jeeMode = +c.profile.grade === 12 && D.state.settings.activeLearningTrack?.[c.activeId] === 'jee';
    const lessons = curriculumLessons(c, jeeMode);
    D.state.settings.activePracticeLesson ||= {};
    D.state.settings.mcqProgress ||= {};
    const lesson = lessons.find(item => item.id === D.state.settings.activePracticeLesson[c.activeId]) || lessons[0];
    if (!lesson) return `${learnerBar(c)}<section class="panel"><p class="empty">Choose a subject with configured chapters to begin practice.</p></section>`;
    const questions = HM.genius.questions(lesson);
    const learnerProgress = D.state.settings.mcqProgress[c.activeId] ||= {};
    const progress = learnerProgress[lesson.id] ||= { index: 0, answers: {}, attempted: 0, correct: 0 };
    const revision = HM.genius.teacherNotes(lesson).revision;
    const completed = c.assessments.filter(item => item.status !== 'scheduled');
    const scheduled = c.assessments.filter(item => item.status === 'scheduled');
    const allProgress = Object.values(learnerProgress);
    const totalAttempted = allProgress.reduce((sum, item) => sum + (+item.attempted || 0), 0);
    const totalCorrect = allProgress.reduce((sum, item) => sum + (+item.correct || 0), 0);
    const questionCards = questions.map((question, questionIndex) => {
      const response = progress.answers?.[questionIndex];
      const options = question.options.map((option, optionIndex) => {
        const state = response ? (optionIndex === question.answer ? 'correct' : optionIndex === response.selected ? 'wrong' : 'muted') : '';
        return `<button type="button" class="mcq-option ${state}" data-mcq-answer="${optionIndex}" data-lesson="${e(lesson.id)}" data-question="${questionIndex}" ${response ? 'disabled' : ''}><span>${String.fromCharCode(65 + optionIndex)}</span><b>${e(option)}</b>${response && optionIndex === question.answer ? icon('circle-check-big') : ''}</button>`;
      }).join('');
      const feedback = response ? `<div class="mcq-feedback ${response.correct ? 'correct' : 'wrong'}"><span>${icon(response.correct ? 'badge-check' : 'scan-search')}</span><div><b>${response.correct ? 'Correct—and here is why' : 'Good miss. Repair this exact idea.'}</b><p>${e(question.why)}</p></div></div>` : `<p class="mcq-prompt">Choose one answer. The explanation appears immediately.</p>`;
      return `<article class="mcq-question" id="practice-q-${e(lesson.id)}-${questionIndex + 1}" data-mcq-question-card="${questionIndex}"><header><span>Question ${questionIndex + 1}</span><small>${response ? (response.correct ? 'Correct' : 'Review') : 'Not attempted'}</small></header><h2>${e(question.stem)}</h2><div class="mcq-options">${options}</div>${feedback}</article>`;
    }).join('');
    const resultRows = [...c.assessments].sort((a, b) => String(b.date).localeCompare(String(a.date))).map(item => `<tr><td><b>${e(item.subject)}</b><small>${e(item.title)}</small></td><td>${D.date(item.date)}</td><td>${academicStatus(item.status)}</td><td>${item.status === 'scheduled' ? 'Scheduled' : `${assessmentPercent(item)}%`}</td><td><button class="icon-action" data-edit="assessment" data-id="${e(item.id)}" data-student="${e(c.activeId)}" aria-label="Edit assessment">${icon('pencil')}</button></td></tr>`).join('');
    return `${learnerBar(c)}<section class="practice-summary-strip"><span><small>Question accuracy</small><b>${totalAttempted ? Math.round(totalCorrect / totalAttempted * 100) : 0}%</b></span><span><small>Questions answered</small><b>${totalAttempted}</b></span><span><small>Assessment average</small><b>${completed.length ? averageOf(completed.map(assessmentPercent)) : 0}%</b></span><span><small>Upcoming tests</small><b>${scheduled.length}</b></span></section><div class="mcq-workspace"><aside class="mcq-chapters"><header><b>${e(lesson.subject)}</b><small>Choose chapter</small></header>${lessons.map(item => { const itemProgress = learnerProgress[item.id]; return `<button type="button" data-practice-lesson="${e(item.id)}" class="${item.id === lesson.id ? 'active' : ''}"><span>${itemProgress?.attempted ? `${itemProgress.correct}/${itemProgress.attempted}` : 'NEW'}</span><b>${e(item.title)}</b></button>`; }).join('')}</aside><main class="mcq-stage"><header><div><span class="section-kicker">${e(lesson.subject)} · ${e(lesson.title)}</span><h2>${questions.length} explained questions</h2><p>Scroll through the full chapter set. Every answer teaches the reasoning immediately.</p></div><nav class="mcq-progress" aria-label="Question shortcuts">${questions.map((question, index) => `<a href="#practice-q-${e(lesson.id)}-${index + 1}" class="${progress.answers?.[index] ? (progress.answers[index].correct ? 'correct' : 'wrong') : ''}" aria-label="Go to question ${index + 1}">${index + 1}</a>`).join('')}</nav></header><div class="mcq-question-list">${questionCards}</div><section class="practice-recall"><div><span class="section-kicker">ANSWER GUIDE</span><h3>What to retain from this chapter</h3><p>Use these explained ideas after each question; there is nothing to type or submit here.</p></div><ol>${revision.map(value => `<li>${e(value)}</li>`).join('')}</ol><button type="button" data-chapter-workspace="${e(lesson.id)}" data-chapter-section="understand">${icon('brain')} Open Genius Mind</button></section></main></div><section class="assessment-drawer"><details><summary><span>${icon('file-chart-column')}</span><span><b>School assessments and mock-test record</b><small>${c.assessments.length} read-only records · kept here with practice</small></span></summary><div class="compact-table-wrap"><table class="table"><thead><tr><th>Assessment</th><th>Date</th><th>Status</th><th>Result</th><th></th></tr></thead><tbody>${resultRows || '<tr><td colspan="5">No assessments recorded yet.</td></tr>'}</tbody></table></div></details></section>`;
  }

  function practiceCentre() {
    const c = academicContext();
    const attempted = c.practice.reduce((sumValue, item) => sumValue + (+item.attempted || 0), 0);
    const commonErrors = Object.entries(c.practice.reduce((counts, item) => { counts[item.errorType] = (counts[item.errorType] || 0) + 1; return counts; }, {})).sort((a, b) => b[1] - a[1]);
    const resources = (D.state.academicResources || []).filter(item => item.audience === '6-12' || item.audience.split('-').map(Number).some((value, index, values) => values.length === 1 ? +c.profile.grade === value : +c.profile.grade >= values[0] && +c.profile.grade <= values[1]));
    return `${learnerBar(c)}<section class="metrics compact-metrics">${metric('Accuracy', `${practicePercent(c.practice)}%`, `${attempted} questions attempted`, 'brain-circuit')}${metric('Practice time', `${c.practice.reduce((sumValue, item) => sumValue + (+item.minutes || 0), 0)} min`, 'Logged sessions', 'clock-3')}${metric('Main error', commonErrors[0]?.[0] || 'None', 'Correct the pattern', 'scan-search')}${metric('Practice sets', c.practice.length, 'NCERT and CBSE sources', 'notebook-pen')}</section><div class="practice-layout"><section class="panel timer practice-timer"><span class="context-badge study">Focused study</span><div class="clock" id="clock" role="timer" aria-live="polite">${format(timerSeconds)}</div><p>A completed 25-minute block is added to ${e(c.profile.name)}'s report.</p><div class="timer-actions"><button id="timerToggle" class="primary">${icon(timerId ? 'pause' : 'play')}<span>${timerId ? 'Pause' : 'Start'}</span></button><button data-timer="reset">Reset</button><button data-timer="5">5 min break</button><button data-timer="25">25 min focus</button></div></section><section class="panel"><div class="section-head"><div><h2>Error notebook</h2><p>Turn mistakes into the next practice set</p></div><button class="primary" data-create="practiceLog" data-student="${e(c.activeId)}">${icon('plus')}<span>Practice log</span></button></div>${commonErrors.map(([label, count]) => row(label, `${count} logged session${count === 1 ? '' : 's'}`, `<button data-route="study/planner">Plan correction</button>`)).join('') || '<p class="empty">No errors logged yet.</p>'}</section></div><section class="panel"><div class="section-head"><h2>Recent practice</h2></div><table class="table"><thead><tr><th>Date & source</th><th>Subject</th><th>Attempted</th><th>Correct</th><th>Accuracy</th><th>Error focus</th><th>Actions</th></tr></thead><tbody>${[...c.practice].sort((a, b) => String(b.date).localeCompare(String(a.date))).map(item => `<tr><td data-label="Date & source"><b>${D.date(item.date)}</b><small>${e(item.source)}</small></td><td data-label="Subject">${e(item.subject)}</td><td data-label="Attempted">${item.attempted}</td><td data-label="Correct">${item.correct}</td><td data-label="Accuracy"><b>${Math.round(item.correct / Math.max(1, item.attempted) * 100)}%</b></td><td data-label="Error focus">${e(item.errorType)}</td><td data-label="Actions"><span class="row-actions"><button class="icon-action" data-edit="practiceLog" data-id="${e(item.id)}" data-student="${e(c.activeId)}" aria-label="Edit practice log">${icon('pencil')}</button><button class="icon-action danger-action" data-delete="practiceLogs:${e(item.id)}" aria-label="Delete practice log">${icon('trash-2')}</button></span></td></tr>`).join('')}</tbody></table></section><section class="official-study-resources"><div class="section-head"><div><h2>Official study sources</h2><p>Open current CBSE and NCERT material</p></div></div>${resources.map(item => `<a href="${e(item.url)}" target="_blank" rel="noopener noreferrer"><span>${icon(item.type.includes('textbook') ? 'book-open' : 'external-link')}</span><span><b>${e(item.title)}</b><small>${e(item.type)}</small></span></a>`).join('')}</section>`;
  }

  function learningReports() {
    const c = academicContext();
    c.learningExtension = 'reports';
    const subjects = subjectReadiness(c).sort((a, b) => a.readiness - b.readiness);
    const overall = averageOf(subjects.map(item => item.readiness));
    const focusMinutes = c.sessions.reduce((sumValue, item) => sumValue + (+item.minutes || 0), 0);
    const interventions = subjects.filter(item => item.readiness < c.profile.targetPercent - 10);
    const schoolSignals = (D.state.syncSuggestions || []).filter(item => item.source === 'gmail' && item.category === 'school').sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt)));
    const reviewItems = interventions.length ? interventions.slice(0, 4).map(item => {
      const action = item.mastery < item.test ? 'Re-teach the weakest concept, then check with three application questions.' : item.accuracy < item.test ? 'Review the error notebook and schedule one short correction set.' : 'Protect the planned revision block and confirm school feedback.';
      return `<div class="review-action"><span>${icon('arrow-up-right')}</span><div><b>${e(item.subject)}</b><p>${action}</p></div></div>`;
    }).join('') : `<div class="review-action"><span>${icon('circle-check-big')}</span><div><b>Progress is on target</b><p>Keep the weekly routine stable and ask the student to explain one thing learned well.</p></div></div>`;
    return `${learnerBar(c)}<section class="metrics">${metric('Overall readiness', `${overall}%`, `Target ${c.profile.targetPercent}%`, 'gauge')}${metric('On-target subjects', subjects.filter(item => item.readiness >= c.profile.targetPercent).length, `of ${subjects.length}`, 'badge-check')}${metric('Focus recorded', `${focusMinutes} min`, 'Use with quality evidence', 'timer-reset')}${metric('Parent actions', interventions.length, interventions.length ? 'Review this week' : 'No urgent intervention', 'users-round')}</section><div class="grid-2"><section class="panel"><div class="section-head"><div><h2>Subject readiness</h2><p>Mastery 40% + assessments 40% + practice 20%</p></div></div>${subjects.map(item => `<div class="readiness-row"><span class="subject-dot"></span><div class="grow"><b>${e(item.subject)}</b><small>Curriculum ${item.mastery}% - Assessment ${item.test}% - Accuracy ${item.accuracy}%</small><div class="progress ${item.readiness < 60 ? 'over' : ''}"><span style="width:${clamp(item.readiness)}%"></span></div></div><strong>${item.readiness}%</strong></div>`).join('')}</section><section class="panel parent-review"><div class="section-head"><div><h2>Weekly parent review</h2><p>Support without micromanaging</p></div></div>${reviewItems}<div class="review-boundary"><b>Marks are evidence, not identity.</b><p>Use this dashboard to find support needs. Do not use it to compare siblings or punish a low score.</p></div></section></div><section class="panel"><div class="section-head"><div><h2>Readiness distribution</h2><p>Use the lowest bars to plan the next week</p></div></div><div class="chart readiness-chart" aria-label="Subject readiness">${subjects.map(item => `<div style="height:${Math.max(4, item.readiness)}%"><b>${item.readiness}%</b><span>${e(item.subject.split(' ')[0])}</span></div>`).join('')}</div></section><section class="panel module-inbox-brief"><div class="section-head"><div><span class="section-kicker">SCHOOL GMAIL EVIDENCE</span><h2>Parent decisions from school messages</h2><p>${schoolSignals.length} detected signals - ${schoolSignals.filter(item => item.status === 'pending').length} still need review</p></div><button data-route="global/intelligence">Full inbox report</button></div>${schoolSignals.length ? schoolSignals.slice(0, 7).map(item => row(item.title, `${item.sender || 'School'} - ${item.actionDate ? `act by ${D.date(item.actionDate)}` : D.date(item.receivedAt)}`, inboxStatus(item.status))).join('') : '<p class="empty">No school Gmail signals have been processed.</p>'}</section>`;
  }

  function settingsLink(title, note, route, iconName) {
    return `<button class="settings-link" data-route="${route}"><span>${icon(iconName)}</span><span class="grow"><b>${e(title)}</b><small>${e(note)}</small></span>${icon('chevron-right')}</button>`;
  }

  function settingsTabs(activeSection) {
    return `<nav class="settings-tabs" aria-label="Settings groups">${settingsGroups.map((item, index) => `<button type="button" data-route="settings/${item[0]}" class="tab-tone-${index + 1} ${activeSection === item[0] ? 'active' : ''}" ${activeSection === item[0] ? 'aria-current="page"' : ''} title="${e(item[3])}">${icon(item[2])}<span>${e(item[1])}</span></button>`).join('')}</nav>`;
  }

  function appSettings(intro, settings) {
    const cloud = HM.cloud?.getStatus?.() || { status: 'loading', detail: 'Loading family database', connected: false, vaultId: '', shareUrl: '' };
    const sync = settings.googleSync || {};
    const sms = settings.phoneSms || {};
    const clientReady = /^[0-9]+-[a-z0-9_-]+\.apps\.googleusercontent\.com$/i.test(sync.clientId || '');
    const accounts = Array.isArray(sync.accounts) ? sync.accounts : [];
    const connected = accounts.filter(account => account.status === 'connected').length;
    const googleSlots = Array.from({ length: 4 }, (_, index) => accounts[index] || { slotId: `google-${index + 1}`, personId: D.state.people[index]?.id || D.state.people[0]?.id || '', email: '', consent: false, status: 'pending' });
    const categories = [
      ['bills', 'Bills & renewals'], ['travel', 'Travel & bookings'], ['school', 'School & learning'],
      ['health', 'Health appointments'], ['deliveries', 'Shopping & deliveries'], ['home', 'Home services'],
      ['government', 'Government & documents']
    ];
    const suggestions = D.state.syncSuggestions || [];
    const pending = suggestions.filter(item => item.status === 'pending');
    const smsPending = pending.filter(item => item.source === 'sms').length;
    const sourceIcon = source => source === 'sms' ? 'message-square-text' : source === 'calendar' ? 'calendar-sync' : 'mail-search';
    const queue = pending.length ? pending.slice(0, 7).map(item => `<article class="sync-suggestion"><span class="suggestion-source source-${e(item.source)}">${icon(sourceIcon(item.source))}</span><div class="grow"><small>${e(item.source)} - ${e(item.category)}${item.sender ? ` - ${e(item.sender)}` : ''}</small><b>${e(item.title)}</b><p>${e(item.summary || 'No message content retained.')}</p><em>${item.receivedAt ? D.date(item.receivedAt, { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date'}${item.amount ? ` - ${D.money(item.amount)}` : ''}</em></div><div class="suggestion-actions"><button type="button" data-sync-dismiss="${e(item.id)}" aria-label="Dismiss ${e(item.title)}">${icon('x')}</button><button type="button" class="primary" data-sync-apply="${e(item.id)}">${icon('check')}<span>Apply</span></button></div></article>`).join('') : '<p class="empty">No imported updates need review.</p>';
    return `${intro}
      <section class="panel family-vault vault-${e(cloud.status)}"><div class="section-head"><div><span class="section-kicker">PERMANENT FAMILY DATABASE</span><h2>Shared family vault</h2><p>One private shared link keeps settings and family records synchronized across Firebase Hosting, GitHub Pages, browsers and devices.</p></div><span class="sync-state ${cloud.connected ? 'connected' : cloud.status === 'error' ? 'error' : 'pending'}">${e(cloud.status)}</span></div>
        <div class="vault-status"><span>${icon(cloud.connected ? 'cloud-check' : cloud.status === 'error' ? 'cloud-alert' : 'cloud')}<b>${e(cloud.detail)}</b></span></div>
        ${cloud.vaultId ? `<div class="vault-share"><label>Shared family link<input id="familyVaultUrl" readonly value="${e(cloud.shareUrl)}"></label><div class="vault-actions"><button type="button" id="copyFamilyVault">${icon('copy')}<span>Copy family link</span></button><button type="button" id="saveFamilyVault" class="primary">${icon('cloud-upload')}<span>Save now</span></button><button type="button" id="disconnectFamilyVault">${icon('unlink')}<span>Use local only</span></button></div></div>` : `<form id="familyVaultForm" class="vault-connect"><label>Existing shared family key<input name="vaultId" autocomplete="off" spellcheck="false" placeholder="Paste the 43-character family key"></label><button type="submit">${icon('link')}<span>Join vault</span></button><button type="button" id="createFamilyVault" class="primary">${icon('database-backup')}<span>Create family vault</span></button></form>`}
        <p class="vault-warning">Anyone with the full shared link can read and change this family vault. Send it only to trusted family members. Passwords, OTPs, OAuth tokens, raw SMS files and PDF files are never uploaded.</p>
      </section>
      <section class="panel appearance-panel"><div class="section-head"><div><h2>Mountain photograph</h2><p>Choose a mountain landscape for the entire app.</p></div><span class="context-badge">12 photos</span></div>
        <fieldset class="nature-picker"><legend class="sr-only">App background</legend>${natureBackgrounds.map(item => `<label class="nature-option nature-${item[0]}"><input type="radio" name="appBackground" value="${item[0]}" ${settings.appBackground === item[0] ? 'checked' : ''}><span aria-hidden="true">${icon('leaf')}</span><b>${item[1]}</b>${icon('check')}</label>`).join('')}</fieldset>
      </section>
      <form id="googleSyncSettings" class="panel sync-settings"><div class="section-head"><div><span class="section-kicker">GOOGLE ACCOUNT ACCESS</span><h2>Family account mapping</h2><p>Map four consenting accounts here. Calendar, Tasks, Drive, Contacts and Learning actions appear only in the family section that owns the work.</p></div><span class="sync-state ${clientReady ? connected ? 'connected' : 'pending' : 'required'}">${clientReady ? connected ? `${connected} active this session` : 'Ready to authorize' : 'OAuth client ID required'}</span></div>
        <div class="sync-summary" aria-label="Google sync configuration"><span>${icon('users-round')}<b>${accounts.length}</b><small>mapped accounts</small></span><span>${icon('calendar-sync')}<b>${sync.calendarSync ? 'On' : 'Off'}</b><small>calendar import</small></span><span>${icon('mail-search')}<b>${sync.emailAnalysis ? 'On' : 'Off'}</b><small>email detection</small></span></div>
        <label class="connector-field">Google OAuth web client ID<input id="googleClientId" name="clientId" autocomplete="off" placeholder="123456789-example.apps.googleusercontent.com" value="${e(sync.clientId || '')}"><small>This identifier is public, not a secret. Authorize <b>https://shishyan.github.io</b> as a JavaScript origin in Google Cloud.</small></label>
        <div class="sync-preferences"><label><input type="checkbox" name="calendarSync" ${sync.calendarSync ? 'checked' : ''}> Import Google Calendar events</label><label><input type="checkbox" name="emailAnalysis" ${sync.emailAnalysis ? 'checked' : ''}> Detect household updates in Gmail</label><label><input type="checkbox" name="driveBackup" ${sync.driveBackup ? 'checked' : ''}> Save JSON backup in private Drive app data</label></div>
        <div class="section-head sync-subhead"><div><h3>Four Google accounts</h3><p>Map each account to its family member and obtain separate consent from every owner.</p></div></div><div class="google-members">${googleSlots.map((account, index) => { const owner = D.state.people.find(person => person.id === account.personId) || D.state.people[index] || D.state.people[0]; const ready = clientReady && account.email && account.consent; return `<div class="google-member" data-google-account="${e(account.slotId || `google-${index + 1}`)}"><span class="member-avatar">${index + 1}</span><div class="grow"><b>Google account ${index + 1}</b><select data-google-owner aria-label="Owner for Google account ${index + 1}">${D.state.people.map(person => `<option value="${e(person.id)}" ${owner?.id === person.id ? 'selected' : ''}>${e(person.name)} - ${e(person.householdRole)}</option>`).join('')}</select><input data-google-email type="email" autocomplete="email" placeholder="Google account email" value="${e(account.email || '')}"></div><label class="consent-check"><input data-google-consent type="checkbox" ${account.consent ? 'checked' : ''}><span>Owner consent</span></label><span class="sync-state ${e(account.status || 'pending')}">${e(account.status === 'connected' ? account.lastSync ? 'Gmail synced this session' : 'Connected · sync pending' : account.status === 'error' ? 'Needs attention' : 'Gmail sync inactive')}</span><button type="button" data-google-connect="${e(account.slotId || `google-${index + 1}`)}" ${ready ? '' : 'disabled'}>${icon('mail-check')}<span>${account.status === 'connected' ? 'Reconnect Gmail' : 'Connect Gmail'}</span></button></div>`; }).join('')}</div>
        <fieldset class="detection-groups"><legend>Detect from email</legend>${categories.map(item => `<label><input type="checkbox" name="syncCategory" value="${item[0]}" ${(sync.categories || []).includes(item[0]) ? 'checked' : ''}><span>${icon('check')} ${item[1]}</span></label>`).join('')}</fieldset>
        <div class="sync-controls"><label>Look back<select name="lookbackDays"><option value="7" ${+sync.lookbackDays === 7 ? 'selected' : ''}>7 days</option><option value="30" ${+sync.lookbackDays === 30 ? 'selected' : ''}>30 days</option><option value="90" ${+sync.lookbackDays === 90 ? 'selected' : ''}>90 days</option></select></label><label>Apply policy<select name="reviewPolicy"><option value="trusted" selected>Auto-apply family accounts</option></select></label><button type="button" data-google-sync ${clientReady && connected ? '' : 'disabled'}>${icon('refresh-cw')}<span>Sync all accounts</span></button><button type="submit" class="primary">${icon('save')}<span>Save</span></button></div>
      </form>
      <form id="phoneSmsSettings" class="panel sync-settings"><div class="section-head"><div><span class="section-kicker">ANDROID PHONE SMS</span><h2>Direct SMS synchronization</h2><p>Install the private Android companion once. It reads consented messages locally and sends only structured family updates to this Firebase vault.</p></div><span class="sync-state ${cloud.vaultId ? 'connected' : 'required'}">${cloud.vaultId ? 'Companion ready' : 'Family vault required'}</span></div>
        <div class="sync-summary" aria-label="Phone SMS integration"><span>${icon('message-square-text')}<b>${sms.importedCount || 0}</b><small>messages analysed</small></span><span>${icon('list-checks')}<b>${smsPending}</b><small>SMS suggestions</small></span><span>${icon('clock-3')}<b>${sms.lastImport ? D.date(sms.lastImport) : 'Never'}</b><small>last import</small></span></div>
        <div class="sms-import-row companion-download"><div><b>Our Divine Nest SMS companion 1.0</b><small>Android 8 or newer · 7 MB · private APK · signed download</small></div><a class="primary button" href="assets/downloads/our-divine-nest-sms.apk" download>${icon('download')}<span>Download Android APK</span></a>${cloud.vaultId ? `<a class="button" href="ourdivinenest://configure?vault=${encodeURIComponent(cloud.vaultId)}&owner=${encodeURIComponent(sms.ownerId || 'p1')}">${icon('link')}<span>Configure installed app</span></a>` : ''}</div>
        <div class="sms-boundary">${icon('shield-check')}<p><b>Install:</b> download on the Android phone, allow this browser to install unknown apps when prompted, install, then return here and tap <b>Configure installed app</b>. Grant SMS permission inside the companion. Android may show a Play Protect warning because this is a private family APK.</p></div>
        <div class="sms-owner-row"><label>Phone owner<select name="smsOwner">${D.state.people.map(person => `<option value="${e(person.id)}" ${sms.ownerId === person.id ? 'selected' : ''}>${e(person.name)} - ${e(person.householdRole)}</option>`).join('')}</select></label><label class="consent-check"><input id="smsConsent" name="smsConsent" type="checkbox" ${sms.consent ? 'checked' : ''}><span>The phone owner consents to local message analysis</span></label></div>
        <fieldset class="detection-groups"><legend>Detect from SMS</legend>${categories.map(item => `<label><input type="checkbox" name="smsCategory" value="${item[0]}" ${(sms.categories || []).includes(item[0]) ? 'checked' : ''}><span>${icon('check')} ${item[1]}</span></label>`).join('')}</fieldset>
        <div class="sms-import-row"><div><b>Android backup file</b><small>Supports SMS Backup & Restore XML and structured JSON. OTP and verification messages are discarded.</small></div><label class="primary file-button ${sms.consent ? '' : 'disabled'}">${icon('file-up')}<span>Choose backup</span><input id="smsImport" type="file" accept=".xml,.json,text/xml,application/xml,application/json" hidden ${sms.consent ? '' : 'disabled'}></label><button type="submit">${icon('save')}<span>Save phone settings</span></button></div>
        <div class="sms-boundary">${icon('smartphone')}<p>The companion automatically handles new SMS and can synchronize up to 500 existing inbox messages. OTPs are discarded, long numbers are masked, duplicate messages are ignored, and raw SMS bodies never enter Firebase. The backup-file import remains available as a fallback.</p></div>
      </form>
      <section class="panel integration-queue"><div class="section-head"><div><span class="section-kicker">TRUSTED FAMILY SYNC</span><h2>Google and SMS updates</h2><p>Mapped family Google accounts and consented SMS backups update household records automatically. Only untrusted sources wait for review.</p></div><div class="toolbar-actions"><span class="sync-state ${pending.length ? 'pending' : 'connected'}">${pending.length} pending</span><button type="button" data-route="global/intelligence">${icon('chart-no-axes-combined')}<span>Inbox report</span></button></div></div><div class="suggestion-list">${queue}</div></section>
      <section class="panel sync-boundary"><span>${icon('shield-check')}</span><div><b>Session-only Google access</b><p>Google access tokens remain in memory and disappear on refresh or close. Home Manager reads recent Gmail content in memory, retains only the structured household essence, and never stores tokens or complete email bodies. Gmail access still requires Google's restricted-scope verification for production use.</p></div></section>
      <section class="panel"><h2>Backup and local data</h2><div class="row"><div class="grow"><b>Export backup</b><small>Download every locally stored record and non-secret sync preference</small></div><button id="exportData">Export JSON</button></div><div class="row"><div class="grow"><b>Import backup</b><small>Validate and restore a Home Manager export</small></div><label class="primary file-button">Choose file<input id="importData" type="file" accept="application/json" hidden></label></div><div class="row"><div class="grow"><b>Reset demonstration data</b><small>Remove local changes from this browser</small></div><button id="resetData" class="danger-action">Reset</button></div></section>
      <section class="panel privacy-note"><b>Shared family data is stored in Firebase</b><p>Settings and structured family records synchronize to the selected vault and remain cached locally for offline use. Raw SMS backup files, textbook PDFs, passwords, OTPs and Google access tokens stay off the family database. Exported backups and the shared vault link must be stored securely.</p></section>`;
  }

  function settingsPage(section = 'household') {
    if (!['household', 'people', 'app'].includes(section)) section = 'household';
    const settings = D.state.settings;
    const intro = settingsTabs(section);
    if (section === 'household') return `${intro}<form id="householdSettings" class="panel settings-form"><div class="section-head"><div><h2>Home identity</h2><p>This name and address identify the current home throughout the community app.</p></div><button class="primary" type="submit">${icon('save')}<span>Save</span></button></div><div class="form-grid"><label>Household name<input name="householdName" value="${e(settings.householdName || 'Lotus Naga Home')}"></label><label>Primary language<select name="language"><option ${settings.language === 'English' ? 'selected' : ''}>English</option><option ${settings.language === 'Tamil' ? 'selected' : ''}>Tamil</option><option ${settings.language === 'Hindi' ? 'selected' : ''}>Hindi</option><option ${settings.language === 'Malayalam' ? 'selected' : ''}>Malayalam</option><option ${settings.language === 'Telugu' ? 'selected' : ''}>Telugu</option><option ${settings.language === 'Kannada' ? 'selected' : ''}>Kannada</option></select></label><label class="wide">Home address and landmark<textarea name="primaryAddress" placeholder="Address visible on the emergency card">${e(settings.primaryAddress || '32 SSS Jaya Enclave, Kovaipudur, Coimbatore, 641042')}</textarea></label><label>Timezone<input name="timezone" value="${e(settings.timezone || 'Asia/Kolkata')}"></label><label>Food preference<input name="foodPreference" value="${e(settings.foodPreference || '')}" placeholder="Vegetarian, allergies, fasting preferences"></label></div></form>`;
    if (section === 'people') return `${intro}<section class="panel"><div class="section-head"><div><h2>Household members</h2><p>Profiles, roles and accessibility needs.</p></div><button class="primary" data-create="person">${icon('user-plus')}<span>Add member</span></button></div>${D.state.people.map(person => `<div class="row"><span class="avatar small-avatar">${e(person.name[0])}</span><div class="grow"><b>${e(person.name)}</b><small>${e(person.householdRole)}</small></div><button class="icon-action" aria-label="Edit ${e(person.name)}" data-edit="person" data-id="${e(person.id)}">${icon('pencil')}</button></div>`).join('')}</section><section class="settings-grid">${settingsLink('Family contacts', 'Doctors, schools, trusted people and providers', 'home/directory', 'contact-round')}${settingsLink('Family knowledge', 'Traditions, recipes and shared memories', 'home/wisdom', 'book-heart')}</section>`;
    return appSettings(intro, settings);
  }

  function propertyHub() {
    const issues = D.state.issues.filter(item => item.scope === 'household');
    const assets = D.state.assets;
    const total = assets.reduce((sum, item) => sum + (+item.value || 0), 0);
    return `<section class="metrics compact-metrics">${metric('Assets', assets.length, 'Household register', 'gem')}${metric('Open repairs', issues.filter(item => D.status(item.status) !== 'done').length, 'Needs follow-up', 'wrench')}${metric('Registered value', D.money(total), 'Approximate value', 'indian-rupee')}${metric('Property records', HM.life.ensure().filter(item => item.domain === 'property').length, 'Utilities and occupancy', 'building-2')}</section>
      <div class="toolbar"><button data-route="home/life/property">${icon('building-2')}<span>Property records</span></button><span class="grow"></span><span class="toolbar-actions"><button class="primary" data-create="issue" data-scope="household">${icon('plus')}<span>Add repair</span></button><button class="primary" data-create="asset">${icon('plus')}<span>Add asset</span></button></span></div>
      <div class="grid-2"><section class="panel"><div class="section-head"><h2>Repairs</h2></div>${issues.length ? issues.map(item => row(item.title, `${item.category} - ${item.location}`, `<button data-advance="${e(item.id)}">${status(item.status)}</button>`)).join('') : empty('No maintenance issues.', 'issue', 'Report issue')}</section>
      <section class="panel"><div class="section-head"><h2>Asset register</h2></div>${assets.length ? assets.map(asset => `<div class="row"><span class="asset-icon">${icon('gem')}</span><div class="grow"><b>${e(asset.name)}</b><small>${e(asset.category)} - ${e(asset.status)}</small></div><b>${D.money(asset.value)}</b><span class="row-actions"><button class="icon-action" aria-label="Edit ${e(asset.name)}" data-edit="asset" data-id="${e(asset.id)}">${icon('pencil')}</button><button class="icon-action danger-action" aria-label="Delete ${e(asset.name)}" data-delete="assets:${e(asset.id)}">${icon('trash-2')}</button></span></div>`).join('') : empty('No assets recorded.', 'asset', 'Add asset')}</section></div>${sectionFinance('housing', ['liability', 'bills', 'subscriptions'])}`;
  }

  function communityParticipate() {
    return `<section class="choice-grid">${settingsLink('Community events', 'Meetings, markets and neighbourhood activities', 'community/events', 'calendar-heart')}${settingsLink('Community polls', 'Preferences stored only in this browser', 'community/polls', 'chart-no-axes-column')}</section>`;
  }

  function render(route) {
    activeRenderRoute = route;
    if (route.startsWith('kitchen/')) return HM.kitchen.render(route, D.state, { e, icon, date: D.date });
    if (route === 'global/overview') return unified();
    if (route === 'global/intelligence') return inboxIntelligence();
    if (route === 'global/questions') return questionHub();
    if (route === 'global/settings') return settingsPage('app');
    if (route.startsWith('settings/')) return settingsPage(route.split('/')[1]);
    if (route === 'home/life') return lifeHub();
    if (route.startsWith('home/life/')) {
      const domain = route.split('/')[2];
      const category = ({ bills: 'bills', subscriptions: 'bills', travel: 'travel', transport: 'travel', vehicles: 'travel', stays: 'travel', travelProtection: 'travel', health: 'health', medicines: 'health', appointments: 'health', documents: 'government', tax: 'government', property: 'home', help: 'home' })[domain];
      return `${lifeDomain(domain)}${category ? gmailEssence([category], `${inboxCategoryConfig[category].label} from family email`, 'the essential message details stay beside the owning register') : ''}`;
    }
    const map = {
      'home/overview': homeOverview,
      'home/property': () => `${propertyHub()}${gmailEssence(['home', 'bills'], 'Property, service and utility email', 'repairs, service dates and bills stay with the home')}`,
      'home/tasks': () => taskView('home'),
      'home/calendar': () => calendar('all'),
      'home/family': family,
      'home/family/protection': protectionAndLegacy,
      'home/care': careOverview,
      'home/finance': finance,
      'home/money/budget': () => finance('budget'),
      'home/money/cashflow': () => finance('cashflow'),
      'home/money/spending': () => finance('spending'),
      'home/money/commitments': () => finance('commitments'),
      'home/money/networth': () => finance('networth'),
      'home/money/reports': () => finance('reports'),
      'home/inventory': () => `${inventory()}${gmailEssence(['deliveries'], 'Orders and deliveries from Gmail', 'tracking information stays beside household supplies')}`,
      'home/assets': assets,
      'home/wisdom': wisdom,
      'home/directory': () => directory('home'),
      'home/travel': () => `${lifeSuiteOverview('travel')}${gmailEssence(['travel'], 'Bookings and travel changes from Gmail', 'itineraries and action dates stay with Travel', true)}`,
      'home/travel/spending': () => lifeSuiteSpending('travel'),
      'home/web': () => `${lifeSuiteOverview('web')}${gmailEssence(['bills', 'deliveries', 'home'], 'Digital accounts, renewals and services from Gmail', 'recurring services and account notices stay with Web Life')}`,
      'home/entertainment': () => lifeSuiteOverview('entertainment'),
      'home/entertainment/spending': () => lifeSuiteSpending('entertainment'),
      'community/overview': communityOverview,
      'community/participate': communityParticipate,
      'community/feed': feed,
      'community/events': () => calendar('community'),
      'community/polls': polls,
      'community/volunteer': volunteer,
      'community/tickets': tickets,
      'community/directory': () => directory('community'),
      'community/guides': guides,
      'study/overview': () => `${studyOverview()}${gmailEssence(['school'], 'School email distilled into actions', 'assignments and dated actions are added to Education', true)}`,
      'study/books': books,
      'study/genius': geniusMindTeacher,
      'study/jee': jeeMain,
      'study/curriculum': curriculumJourney,
      'study/planner': studyPlanner,
      'study/assignments': () => `${assignments()}${gmailEssence(['school'], 'Assignments detected from school email', 'submission dates and teacher context stay beside school work')}`,
      'study/assessments': practiceAndTests,
      'study/practice': practiceAndTests,
      'study/reports': learningReports,
      'study/board': curriculum,
      'study/schedule': studyPlanner,
      'study/tasks': assignments,
      'study/goals': learningReports,
      'study/focus': practiceAndTests,
      'study/analytics': learningReports
    };
    return (map[route] || unified)();
  }

  window.HM.views = {
    groups,
    settingsGroups,
    natureBackgrounds,
    textbookCatalog,
    textbookAsset,
    chapterWorkspace,
    chapterWorkspaceNavigation,
    chapterSubchapters,
    lessonById: lessonId => curriculumLessonById(academicContext(), lessonId),
    defaultLessonId: () => { const c = academicContext(); const jeeMode = +c.profile.grade === 12 && D.state.settings.activeLearningTrack?.[c.activeId] === 'jee'; return curriculumLessons(c, jeeMode)[0]?.id || ''; },
    titles,
    render,
    renderQuestionResults,
    shiftCalendar,
    get timer() { return { seconds: timerSeconds, id: timerId }; },
    setTimer(seconds, id) { timerSeconds = seconds; timerId = id; },
    format
  };
})();
