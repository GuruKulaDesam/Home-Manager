(function () {
  const D = HM.data;
  const domains = {
    health: { title: 'Family Health', group: 'People', icon: 'heart-pulse', note: 'Appointments, medicines and preventive care', noun: 'health record' },
    documents: { title: 'Documents & IDs', group: 'Records', icon: 'folders', note: 'Aadhaar, PAN, passports and certificates', noun: 'document' },
    bills: { title: 'Bills & Payments', group: 'Household', icon: 'receipt-indian-rupee', note: 'Utilities, fees, EMIs and recurring dues', noun: 'bill' },
    insurance: { title: 'Family Protection', group: 'Family', icon: 'shield-check', note: 'Life and personal accident cover', noun: 'policy' },
    tax: { title: 'Tax & Compliance', group: 'Family', icon: 'landmark', note: 'ITR and statutory dates', noun: 'tax record' },
    property: { title: 'Property & Utilities', group: 'Household', icon: 'building-2', note: 'Homes, services, taxes and agreements', noun: 'property record' },
    vehicles: { title: 'Vehicles', group: 'Household', icon: 'car-front', note: 'Service, insurance, PUC and registration', noun: 'vehicle record' },
    help: { title: 'Domestic Help', group: 'Household', icon: 'hand-helping', note: 'Staff, attendance, salary and contacts', noun: 'help record' },
    subscriptions: { title: 'Subscriptions', group: 'Household', icon: 'repeat-2', note: 'Digital, newspaper, milk and memberships', noun: 'subscription' },
    education: { title: 'Education Commitments', group: 'Learning', icon: 'school', note: 'Fees, transport, courses and renewals', noun: 'education commitment' },
    travel: { title: 'Travel & Pilgrimage', group: 'Plans', icon: 'luggage', note: 'Trips, bookings, packing and documents', noun: 'travel plan' },
    festivals: { title: 'Festivals & Functions', group: 'Plans', icon: 'party-popper', note: 'Puja, guests, gifting and budgets', noun: 'festival plan' },
    emergency: { title: 'Emergency Readiness', group: 'Care', icon: 'siren', note: 'Contacts, blood groups and urgent instructions', noun: 'emergency record' },
    pets: { title: 'Pets & Animals', group: 'Care', icon: 'paw-print', note: 'Vaccines, food, care and appointments', noun: 'pet record' },
    digital: { title: 'Digital Household', group: 'Records', icon: 'cloud-cog', note: 'Devices, domains, backups and account custody', noun: 'digital record' },
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
    { id: 'lr18', domain: 'legacy', title: 'Nominee review across accounts', category: 'Nominations', owner: 'Parents', provider: 'Banks and investments', reference: 'Legacy folder', amount: 0, dueDate: '2026-12-15', frequency: 'Yearly', status: 'pending', phone: '', notes: 'Review bank, demat, mutual fund, insurance and locker nominations.' }
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
