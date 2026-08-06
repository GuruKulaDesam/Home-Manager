(function () {
  const D = HM.data;
  const domains = {
    health: { title: 'Family Health', group: 'People', icon: 'heart-pulse', note: 'Conditions, measurements, preventive care and health cover', noun: 'health record' },
    medicines: { title: 'Medicines & Refills', group: 'Care', icon: 'pill', note: 'Dosage plans, stock, prescriptions and refill dates', noun: 'medicine plan' },
    appointments: { title: 'Appointments & Follow-ups', group: 'Care', icon: 'stethoscope', note: 'Consultations, tests, reports and next actions', noun: 'appointment' },
    elders: { title: 'Elder Care', group: 'Care', icon: 'accessibility', note: 'Daily support, mobility, check-ins and caregiver handoffs', noun: 'care plan' },
    documents: { title: 'Documents & IDs', group: 'Records', icon: 'folders', note: 'Aadhaar, PAN, passports and certificates', noun: 'document' },
    bills: { title: 'Bills & Payments', group: 'Household', icon: 'receipt-indian-rupee', note: 'Utilities, fees, EMIs and recurring dues', noun: 'bill' },
    insurance: { title: 'Family Protection', group: 'Family', icon: 'shield-check', note: 'Life and personal accident cover', noun: 'policy' },
    tax: { title: 'Tax & Compliance', group: 'Family', icon: 'landmark', note: 'ITR and statutory dates', noun: 'tax record' },
    property: { title: 'Property & Utilities', group: 'Household', icon: 'building-2', note: 'Homes, services, taxes and agreements', noun: 'property record' },
    vehicles: { title: 'Vehicles', group: 'Travel', icon: 'car-front', note: 'Service, fuel, insurance, PUC and registration', noun: 'vehicle record' },
    help: { title: 'Domestic Help', group: 'Household', icon: 'hand-helping', note: 'Staff, attendance, salary and contacts', noun: 'help record' },
    subscriptions: { title: 'Online Subscriptions', group: 'Web Life', icon: 'repeat-2', note: 'Streaming, cloud, news, software and memberships', noun: 'subscription' },
    education: { title: 'Education Commitments', group: 'Learning', icon: 'school', note: 'Fees, transport, courses and renewals', noun: 'education commitment' },
    travel: { title: 'Trips', group: 'Travel', icon: 'luggage', note: 'Itineraries, bookings, packing, travellers and trip tasks', noun: 'trip' },
    transport: { title: 'Transportation', group: 'Travel', icon: 'bus-front', note: 'Flights, trains, buses, taxis, rentals, transfers and local transit', noun: 'transport booking' },
    stays: { title: 'Hotels & Stays', group: 'Travel', icon: 'bed-double', note: 'Hotels, homestays, check-in details, accessibility and cancellation dates', noun: 'stay' },
    travelProtection: { title: 'Travel Insurance & Documents', group: 'Travel', icon: 'shield-check', note: 'Travel cover, visas, passports, permits and emergency copies', noun: 'travel protection record' },
    festivals: { title: 'Festivals & Functions', group: 'Plans', icon: 'party-popper', note: 'Puja, guests, gifting and budgets', noun: 'festival plan' },
    emergency: { title: 'Emergency Readiness', group: 'Care', icon: 'siren', note: 'Contacts, blood groups and urgent instructions', noun: 'emergency record' },
    pets: { title: 'Pets & Animals', group: 'Care', icon: 'paw-print', note: 'Vaccines, food, care and appointments', noun: 'pet record' },
    digital: { title: 'Privacy, Devices & Backups', group: 'Web Life', icon: 'shield-check', note: 'Devices, privacy reviews, domains, backups and recovery readiness', noun: 'digital safety record' },
    webAccounts: { title: 'Email & Online Accounts', group: 'Web Life', icon: 'at-sign', note: 'Account ownership, purpose, recovery readiness and closure decisions — never passwords', noun: 'account record' },
    aiServices: { title: 'AI Services', group: 'Web Life', icon: 'sparkles', note: 'AI accounts, plan limits, renewals, data controls and intended use', noun: 'AI service' },
    webHabits: { title: 'Browsing & Screen Habits', group: 'Web Life', icon: 'history', note: 'Attention goals, screen boundaries, distracting sites and intentional routines', noun: 'online habit' },
    games: { title: 'Games & Apps', group: 'Web Life', icon: 'gamepad-2', note: 'Installed games, app purchases, child access, play limits and account ownership', noun: 'game or app' },
    watch: { title: 'Watch', group: 'Entertainment', icon: 'clapperboard', note: 'Films, series, documentaries and family watchlists', noun: 'watch item' },
    listen: { title: 'Listen', group: 'Entertainment', icon: 'headphones', note: 'Music, podcasts, audiobooks and family listening', noun: 'listening item' },
    reading: { title: 'Read', group: 'Entertainment', icon: 'book-open', note: 'Books, magazines, comics and leisure reading', noun: 'reading item' },
    play: { title: 'Play & Games', group: 'Entertainment', icon: 'dice-5', note: 'Board games, video games, hobbies and family play', noun: 'play item' },
    outings: { title: 'Outings & Events', group: 'Entertainment', icon: 'ticket', note: 'Cinema, concerts, sports, attractions, dining and family outings', noun: 'outing' },
    sustainability: { title: 'Sustainability', group: 'Household', icon: 'leaf', note: 'Water, energy, waste and garden goals', noun: 'sustainability record' },
    legacy: { title: 'Nominees & Legacy', group: 'Records', icon: 'scroll-text', note: 'Nominations, wills and succession readiness', noun: 'legacy record' }
  };

  const seedRecords = [
    { id: 'lr1', domain: 'health', title: 'Annual family health checks', category: 'Preventive care', owner: 'Family', provider: 'Family clinic', reference: '', amount: 0, dueDate: '2026-10-15', frequency: 'Yearly', status: 'pending', phone: '', notes: 'CBC, glucose, lipids, dental and eye checks.' },
    { id: 'lr2', domain: 'health', title: 'Blood group and allergy cards', category: 'Emergency health', owner: 'All members', provider: '', reference: '', amount: 0, dueDate: '2026-08-31', frequency: 'One time', status: 'active', phone: '', notes: 'Keep a copy in the emergency folder.' },
    { id: 'lr3', domain: 'documents', title: 'Passport renewal - Father', category: 'Passport', owner: 'Father', provider: 'Passport Seva', reference: 'Stored securely', amount: 1500, dueDate: '2027-02-10', frequency: 'As needed', status: 'active', phone: '', notes: 'Number intentionally masked in this planner.' },
    { id: 'lr4', domain: 'documents', title: 'Aadhaar address review', category: 'Aadhaar', owner: 'Family', provider: 'UIDAI', reference: 'Family document file', amount: 0, dueDate: '2026-12-01', frequency: 'Yearly', status: 'pending', phone: '', notes: 'Verify address and linked mobile numbers.' },
    { id: 'lr5', domain: 'bills', title: 'Electricity bill', category: 'Utility', owner: 'Household', provider: 'TANGEDCO', reference: 'Consumer number stored offline', amount: 1850, dueDate: '2026-08-12', frequency: 'Monthly', status: 'due', phone: '', notes: 'Autopay disabled.' },
    { id: 'lr6', domain: 'education', title: 'School term fee', category: 'Education', owner: 'Ananya', provider: 'School office', reference: 'Term 2', amount: 32000, dueDate: '2026-09-05', frequency: 'Quarterly', status: 'pending', phone: '', notes: 'Confirm transport fee separately.' },
    { id: 'lr7', domain: 'health', title: 'Family health policy', category: 'Health insurance', owner: 'Family', provider: 'Insurance provider', reference: 'Policy copy in locker', amount: 28500, dueDate: '2026-11-20', frequency: 'Yearly', status: 'active', phone: '', notes: 'Review sum insured and parents coverage.' },
    { id: 'lr8', domain: 'tax', title: 'Income tax return', category: 'ITR', owner: 'Father', provider: 'Income Tax Department', reference: 'AY 2026-27', amount: 0, dueDate: '2027-07-31', frequency: 'Yearly', status: 'pending', phone: '', notes: 'Collect Form 16, AIS and investment proofs.' },
    { id: 'lr9', domain: 'property', title: 'Corporation property tax', category: 'Property tax', owner: 'Household', provider: 'Coimbatore Corporation', reference: 'Property file', amount: 8600, dueDate: '2026-10-15', frequency: 'Half-yearly', status: 'pending', phone: '', notes: '' },
    { id: 'lr10', domain: 'vehicles', title: 'Car insurance renewal', category: 'Insurance', owner: 'Father', provider: 'Motor insurer', reference: 'TN registration', amount: 14200, dueDate: '2026-09-18', frequency: 'Yearly', status: 'due', phone: '', notes: 'Compare zero-depreciation renewal options.' },
    { id: 'lr11', domain: 'help', title: 'Monthly salary - Lakshmi', category: 'Housekeeping', owner: 'Household', provider: 'Lakshmi', reference: 'UPI / cash log', amount: 9000, dueDate: '2026-08-05', frequency: 'Monthly', status: 'due', phone: '98765 00000', notes: 'Track leave and festival bonus separately.' },
    { id: 'lr12', domain: 'subscriptions', title: 'Broadband plan', category: 'Internet', owner: 'Household', provider: 'ISP', reference: 'Home connection', amount: 1199, dueDate: '2026-08-22', frequency: 'Monthly', status: 'active', phone: '', notes: '' },
    { id: 'lr13', domain: 'travel', title: 'Rameswaram family pilgrimage', category: 'Pilgrimage', owner: 'Family', provider: 'IRCTC / hotel', reference: 'December plan', amount: 28000, dueDate: '2026-10-01', frequency: 'One time', status: 'planning', phone: '', notes: 'Train, temple timing, elder medicines and accessible room.' },
    { id: 'lr14', domain: 'festivals', title: 'Deepavali preparation', category: 'Festival', owner: 'Family', provider: '', reference: 'Annual checklist', amount: 18000, dueDate: '2026-11-08', frequency: 'Yearly', status: 'planning', phone: '', notes: 'Puja supplies, sweets, clothes, gifts and lamp safety.' },
    { id: 'lr15', domain: 'emergency', title: 'Family emergency contact card', category: 'Contacts', owner: 'Family', provider: 'Local contacts', reference: 'Printed near entrance', amount: 0, dueDate: '2026-09-01', frequency: 'Half-yearly', status: 'active', phone: '112', notes: 'Include doctors, neighbours, school and insurance helplines.' },
    { id: 'lr16', domain: 'digital', title: 'Family photo backup', category: 'Backup', owner: 'Family', provider: 'Encrypted drive', reference: 'Two-copy rule', amount: 0, dueDate: '2026-08-30', frequency: 'Monthly', status: 'pending', phone: '', notes: 'Verify both local and off-site copies.' },
    { id: 'lr17', domain: 'sustainability', title: 'Rainwater system service', category: 'Water', owner: 'Household', provider: 'Local plumber', reference: 'Pre-monsoon', amount: 2500, dueDate: '2027-05-15', frequency: 'Yearly', status: 'active', phone: '', notes: 'Clean filters and inspect recharge pit.' },
    { id: 'lr18', domain: 'legacy', title: 'Nominee review across accounts', category: 'Nominations', owner: 'Parents', provider: 'Banks and investments', reference: 'Legacy folder', amount: 0, dueDate: '2026-12-15', frequency: 'Yearly', status: 'pending', phone: '', notes: 'Review bank, demat, mutual fund, insurance and locker nominations.' },
    { id: 'lr19', domain: 'medicines', title: 'Review family medicine box', category: 'Stock and expiry', owner: 'Mother', provider: 'Family pharmacy', reference: 'Keep prescriptions offline', amount: 0, dueDate: '2026-08-15', frequency: 'Monthly', status: 'pending', phone: '', notes: 'Check regular medicines, expiry dates and seven days of essential stock.' },
    { id: 'lr20', domain: 'appointments', title: 'Dental preventive visit', category: 'Dental', owner: 'Children', provider: 'Family dentist', reference: 'Confirm directly with clinic', amount: 1200, dueDate: '2026-09-12', frequency: 'Half-yearly', status: 'planning', phone: '', notes: 'Record the appointment and follow-up action; do not store reports here.' },
    { id: 'lr21', domain: 'elders', title: 'Weekly elder care call', category: 'Check-in', owner: 'Parents', provider: 'Family', reference: 'Sunday handoff', amount: 0, dueDate: '2026-08-09', frequency: 'Weekly', status: 'active', phone: '', notes: 'Confirm medicines, meals, mobility, appointments and who will follow up.' },
    { id: 'lr22', domain: 'webAccounts', title: 'Review account recovery details', category: 'Email accounts', owner: 'Family', provider: 'Email providers', reference: 'No passwords stored', amount: 0, dueDate: '2026-09-01', frequency: 'Half-yearly', status: 'pending', phone: '', notes: 'Confirm recovery email, phone, passkeys and account owner. Never store passwords or recovery codes here.' },
    { id: 'lr23', domain: 'aiServices', title: 'Review AI service accounts', category: 'AI services', owner: 'Family', provider: 'Multiple providers', reference: 'Plans and privacy only', amount: 0, dueDate: '2026-09-15', frequency: 'Quarterly', status: 'pending', phone: '', notes: 'Review active plans, data controls, age suitability and whether each service is still useful.' },
    { id: 'lr24', domain: 'webHabits', title: 'Weekly intentional screen review', category: 'Browsing habits', owner: 'Family', provider: 'Device wellbeing reports', reference: 'Weekly review', amount: 0, dueDate: '2026-08-09', frequency: 'Weekly', status: 'active', phone: '', notes: 'Notice time, purpose and interruptions; agree one small change without surveillance.' },
    { id: 'lr25', domain: 'outings', title: 'Plan one family outing', category: 'Family outing', owner: 'Family', provider: '', reference: 'Monthly choice', amount: 0, dueDate: '2026-08-30', frequency: 'Monthly', status: 'planning', phone: '', notes: 'Choose together, set a budget and include travel time.' }
  ];

  function ensure() {
    if (!Array.isArray(D.state.lifeRecords)) {
      D.state.lifeRecords = D.clone(seedRecords);
      D.save();
    }
    let migrated = false;
    D.state.lifeRecords.forEach(record => {
      if (record.domain === 'bills' && String(record.category || record.title || '').toLowerCase().match(/school|education|tuition|course|exam/)) {
        record.domain = 'education';
        migrated = true;
      }
      if (record.domain === 'insurance') {
        const category = String(record.category || record.title || '').toLowerCase();
        if (category.includes('health') || category.includes('medical')) { record.domain = 'health'; migrated = true; }
        else if (category.includes('vehicle') || category.includes('motor') || category.includes('car') || category.includes('bike')) { record.domain = 'vehicles'; migrated = true; }
        else if (category.includes('property') || category.includes('home')) { record.domain = 'property'; migrated = true; }
      }
      if (!domains[record.domain]) { record.domain = 'documents'; migrated = true; }
      record.status = String(record.status || 'pending');
      record.amount = Math.max(0, +record.amount || 0);
    });
    if (migrated) D.save();
    return D.state.lifeRecords;
  }

  window.HM.life = { domains, seedRecords, ensure };
})();
