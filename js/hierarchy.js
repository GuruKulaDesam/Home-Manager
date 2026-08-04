(function () {
  const system = (code, label, description, icon, moduleRoute = '') => ({ code, label, description, icon, moduleRoute });
  const areas = {
    people: {
      label: 'People & Relationships', shortLabel: 'People', icon: 'users-round', note: 'Members, care and connection',
      systems: [
        system('11', 'Members & Profiles', 'Household members, contacts, preferences, identity facts, availability and access needs.', 'contact-round', 'home/family'),
        system('12', 'Roles & Responsibilities', 'Ownership, decision rights, recurring duties, backups, handoffs and accountability.', 'user-cog', 'home/tasks'),
        system('13', 'Relationships & Communication', 'Conversations, agreements, conflicts, check-ins, celebrations, guests and social ties.', 'messages-square', 'home/directory'),
        system('14', 'Family Calendar & Rituals', 'Shared routines, ceremonies, birthdays, festivals, meetings, traditions and family time.', 'calendar-heart', 'home/calendar'),
        system('15', 'Parenting & Childcare', 'Children care, permissions, development, school coordination, activities and safeguarding.', 'baby'),
        system('16', 'Elder & Dependent Care', 'Care plans, accessibility, appointments, helpers, respite, wellbeing and continuity of care.', 'accessibility'),
        system('17', 'Pets & Animal Care', 'Pet profiles, feeding, health, training, grooming, supplies, boarding and registrations.', 'paw-print', 'home/life/pets')
      ]
    },
    home: {
      label: 'Home & Property', shortLabel: 'Home', icon: 'house', note: 'Spaces, services and upkeep',
      systems: [
        system('21', 'Property & Tenancy', 'Ownership or lease details, landlords, tenants, boundaries, inspections, deposits and occupancy.', 'building-2', 'home/life/property'),
        system('22', 'Rooms & Space Use', 'Rooms, zones, storage, layouts, allocation, accessibility, capacity and usage rules.', 'layout-template'),
        system('23', 'Utilities & Home Services', 'Electricity, water, gas, internet, waste, service providers, meters and consumption.', 'plug-zap', 'home/life/bills'),
        system('24', 'Furniture & Appliances', 'Furniture, devices, appliances, manuals, warranties, installation, service and replacement.', 'sofa', 'home/assets'),
        system('25', 'Cleaning & Hygiene', 'Cleaning standards, routines, laundry, sanitation, pest control, products and service help.', 'sparkles', 'home/life/help'),
        system('26', 'Maintenance & Repairs', 'Preventive maintenance, faults, work orders, contractors, spares, costs and verification.', 'wrench', 'home/assets'),
        system('27', 'Renovation, Garden & Improvement', 'Projects, designs, approvals, budgets, materials, landscaping, gardening and benefits.', 'flower-2', 'home/life/sustainability')
      ]
    },
    money: {
      label: 'Money & Assets', shortLabel: 'Money', icon: 'indian-rupee', note: 'Cash flow, obligations and wealth',
      systems: [
        system('31', 'Income & Benefits', 'Salary, business income, rent, allowances, benefits, grants, gifts and expected receipts.', 'badge-indian-rupee'),
        system('32', 'Budget & Cash Flow', 'Household plans, envelopes, forecasts, limits, reserves, variances and corrective actions.', 'chart-no-axes-combined', 'home/finance'),
        system('33', 'Expenses & Reimbursements', 'Purchases, shared costs, claims, refunds, reimbursements, categories and receipts.', 'receipt-text', 'home/finance'),
        system('34', 'Bills & Subscriptions', 'Recurring obligations, due dates, renewals, tariffs, subscriptions, cancellations and arrears.', 'receipt-indian-rupee', 'home/life/bills'),
        system('35', 'Banking & Payments', 'Accounts, wallets, payment methods, transfers, mandates, reconciliation and cash handling.', 'landmark'),
        system('36', 'Debt & Credit', 'Loans, cards, instalments, interest, collateral, repayment plans, credit health and settlements.', 'credit-card'),
        system('37', 'Savings, Investments & Assets', 'Emergency funds, goals, deposits, securities, property value, valuables and performance.', 'gem', 'home/assets')
      ]
    },
    health: {
      label: 'Health & Wellbeing', shortLabel: 'Health', icon: 'heart-pulse', note: 'Medical, physical and emotional care',
      systems: [
        system('41', 'Medical Care & Records', 'Providers, consultations, diagnoses, test results, procedures, records and follow-ups.', 'stethoscope', 'home/life/health'),
        system('42', 'Medicines & Treatments', 'Prescriptions, dosage, schedules, adherence, refills, reactions, therapy and equipment.', 'pill'),
        system('43', 'Prevention & Immunization', 'Vaccines, screenings, dental and vision care, risk checks, prevention plans and reminders.', 'shield-plus'),
        system('44', 'Food, Nutrition & Diet', 'Diet needs, allergies, nutrition goals, menus, portions, hydration and outcomes.', 'salad', 'home/inventory'),
        system('45', 'Fitness & Movement', 'Activity plans, exercise, mobility, sports, rehabilitation, tracking and milestones.', 'dumbbell'),
        system('46', 'Mental & Emotional Wellbeing', 'Mood, stress, support, counselling, coping plans, boundaries, recovery and connection.', 'brain'),
        system('47', 'Sleep, Hygiene & Accessibility', 'Sleep routines, personal care, accessibility aids, environmental comfort and support.', 'bed-double')
      ]
    },
    learning: {
      label: 'Learning & Development', shortLabel: 'Learning', icon: 'graduation-cap', note: 'Education, work and personal growth',
      systems: [
        system('51', 'School & Formal Education', 'Schools, timetables, subjects, assignments, attendance, results, fees and parent actions.', 'school', 'study/overview'),
        system('52', 'Skills & Certifications', 'Courses, practice plans, competencies, tutors, certifications, evidence and renewal.', 'badge-check', 'study/board'),
        system('53', 'Career, Work & Enterprise', 'Employment, projects, shifts, leave, clients, business activities, performance and transitions.', 'briefcase-business'),
        system('54', 'Goals, Habits & Personal Growth', 'Goals, routines, habits, reflections, coaching, progress, obstacles and achievements.', 'target', 'study/goals'),
        system('55', 'Hobbies, Creativity & Recreation', 'Interests, arts, games, sports, collections, events, projects and shared fun.', 'palette'),
        system('56', 'Knowledge & Family Archive', 'Notes, recipes, manuals, media, photos, stories, genealogy, indexing and retrieval.', 'library-big', 'home/wisdom'),
        system('57', 'Values, Spirituality & Contribution', 'Beliefs, ethics, worship, service, charity, volunteering, community and family culture.', 'hand-heart', 'community/volunteer')
      ]
    },
    operations: {
      label: 'Daily Operations & Mobility', shortLabel: 'Operations', icon: 'route', note: 'Tasks, supplies and movement',
      systems: [
        system('61', 'Tasks & Chores', 'One-time and recurring work, ownership, priority, dependencies, completion and quality.', 'list-checks', 'home/tasks'),
        system('62', 'Shopping & Procurement', 'Needs, lists, vendors, price comparison, orders, delivery, returns and supplier performance.', 'shopping-cart', 'home/inventory'),
        system('63', 'Inventory, Pantry & Supplies', 'Stock, location, quantity, expiry, minimum levels, replenishment, lending and disposal.', 'package-search', 'home/inventory'),
        system('64', 'Meal Planning & Kitchen Operations', 'Menus, recipes, preparation, cooking, serving, leftovers, cleanup and coordination.', 'cooking-pot', 'home/inventory'),
        system('65', 'Transport & Vehicles', 'Vehicles, drivers, licences, fuel, maintenance, routes, parking, ride sharing and costs.', 'car-front', 'home/life/vehicles'),
        system('66', 'Travel, Events & Outings', 'Itineraries, bookings, packing, permissions, tickets, budgets, contacts and disruption plans.', 'luggage', 'home/life/travel'),
        system('67', 'Digital Life & Communications', 'Devices, accounts, connectivity, files, backups, parental controls, privacy and support.', 'cloud-cog', 'home/life/digital')
      ]
    },
    safety: {
      label: 'Safety, Governance & Legacy', shortLabel: 'Safety', icon: 'shield-check', note: 'Protection, compliance and continuity',
      systems: [
        system('71', 'Security & Access', 'Keys, locks, alarms, visitors, credentials, permissions, monitoring, privacy and access reviews.', 'key-round'),
        system('72', 'Emergency Readiness', 'Emergency contacts, plans, kits, drills, evacuation, shelter, alerts and recovery actions.', 'siren', 'home/life/emergency'),
        system('73', 'Risk, Incidents & Safeguarding', 'Hazards, near misses, incidents, investigations, child and elder safety and mitigation.', 'triangle-alert', 'home/assets'),
        system('74', 'Identity, Legal & Compliance', 'IDs, certificates, contracts, licences, consent, obligations, disputes and renewals.', 'scale', 'home/life/documents'),
        system('75', 'Insurance, Tax & Claims', 'Policies, coverage, premiums, tax records, filing, claims, evidence, settlements and deadlines.', 'file-check-2', 'home/life/insurance'),
        system('76', 'Sustainability & Waste', 'Energy and water efficiency, reuse, recycling, disposal, emissions, resilience and targets.', 'recycle', 'home/life/sustainability'),
        system('77', 'Life Events, Estate & Legacy', 'Births, moves, marriage, separation, bereavement, wills, succession, inheritance and memory.', 'scroll-text', 'home/life/legacy')
      ]
    }
  };

  const levels = {
    3: { scale: 'Minor', growth: 'Trunk', purpose: 'Universal capability', children: [
      ['Identity & Scope', 'Define who, what, where, boundaries, inclusions, exclusions and current context.'],
      ['Goals & Rules', 'State desired outcomes, standards, policies, constraints, thresholds and decision rules.'],
      ['Plans & Schedules', 'Translate intent into dates, sequences, recurrence, capacity, dependencies and commitments.'],
      ['Resources & Records', 'Maintain the people, assets, funds, information, evidence and references needed.'],
      ['Activities & Transactions', 'Carry out and record the actual work, exchanges, events and changes.'],
      ['Controls & Exceptions', 'Manage approvals, risks, limits, incidents, deviations, escalation and recovery.'],
      ['Insights & Improvement', 'Review performance, learn, compare, forecast, optimize and preserve improvements.']
    ]},
    4: { scale: 'Micro', growth: 'Branch', purpose: 'End-to-end workflow', children: [
      ['Trigger & Request', 'Recognize a need, event, threshold, request, opportunity or obligation.'],
      ['Capture & Intake', 'Collect the minimum facts, source, evidence, consent and initial ownership.'],
      ['Assess & Classify', 'Validate, categorize, estimate impact, set priority and identify dependencies.'],
      ['Decide & Authorize', 'Choose an option, allocate authority, approve, reject, defer or escalate.'],
      ['Execute & Coordinate', 'Perform the work, communicate, sequence contributors and update progress.'],
      ['Verify & Resolve', 'Check quality and outcome, handle exceptions, correct failures and confirm acceptance.'],
      ['Close & Learn', 'Complete, reconcile, document, review, archive and feed learning into the next cycle.']
    ]},
    5: { scale: 'Nano', growth: 'Leaf', purpose: 'Managed entity', children: [
      ['Person or Party', 'A family member, dependent, contact, provider, organization, team or responsible party.'],
      ['Place or Location', 'A home, room, zone, address, destination, storage area or service location.'],
      ['Thing or Asset', 'A product, appliance, vehicle, medicine, supply, device, pet item or owned asset.'],
      ['Money or Obligation', 'An amount, budget, bill, payment, debt, benefit, coverage, liability or commitment.'],
      ['Time or Event', 'A date, deadline, appointment, routine, duration, milestone, trip or life event.'],
      ['Document or Evidence', 'A form, receipt, photo, certificate, note, contract, result, message or proof.'],
      ['Metric or Signal', 'A measurement, status, score, alert, variance, trend, forecast or trigger value.']
    ]},
    6: { scale: 'Pico', growth: 'Fruit', purpose: 'Available action', children: [
      ['Create', 'Add, register, request, schedule, import or originate a record.'],
      ['View', 'Search, filter, retrieve, compare, group, summarize or display a record.'],
      ['Update', 'Edit, correct, reschedule, recategorize, attach or enrich a record.'],
      ['Assign', 'Allocate owner, delegate, share, transfer, route or hand off responsibility.'],
      ['Notify', 'Remind, alert, message, invite, confirm, warn or escalate to selected people.'],
      ['Approve', 'Consent, authorize, accept, reject, sign off, acknowledge or waive.'],
      ['Automate', 'Repeat, calculate, synchronize, recommend, trigger, predict or act by rule.']
    ]},
    7: { scale: 'Atomic', growth: 'Evergreen', purpose: 'Lifecycle state', children: [
      ['Seeded / Draft', 'Captured but incomplete, tentative, unverified or not yet committed.'],
      ['Rooted / Ready', 'Complete enough to begin, assigned, authorized, funded or scheduled.'],
      ['Sprouting / Active', 'Currently in progress, being used, monitored or executed.'],
      ['Branching / Waiting', 'Paused for time, input, dependency, delivery, response or review.'],
      ['Canopy / At Risk', 'Blocked, overdue, outside tolerance, disputed, failing or requiring escalation.'],
      ['Fruiting / Complete', 'Finished, delivered, paid, resolved, accepted or outcome achieved.'],
      ['Evergreen / Archived', 'Closed and preserved for history, reuse, audit, learning or succession.']
    ]}
  };

  Object.values(areas).forEach(area => {
    area.route = `matrix/${area.systems[0].code}`;
    area.sections = area.systems.map(item => ({ label: item.label, route: `matrix/${item.code}`, icon: item.icon, note: item.description }));
  });

  function systemForCode(code) {
    const key = Object.keys(areas)[Number(code[0]) - 1];
    return areas[key]?.systems.find(item => item.code === code.slice(0, 2));
  }

  function forRoute(route, preferred) {
    const code = route.match(/^matrix\/([1-7]{2,7})$/)?.[1];
    if (code) return Object.keys(areas)[Number(code[0]) - 1] || 'people';
    if (preferred && areas[preferred]?.systems.some(item => item.moduleRoute === route)) return preferred;
    return Object.keys(areas).find(key => areas[key].systems.some(item => item.moduleRoute === route)) || (route.startsWith('community/') ? 'safety' : route.startsWith('study/') ? 'learning' : route === 'global/overview' ? 'operations' : 'people');
  }

  function branch(code) {
    if (!/^[1-7]{2,7}$/.test(code) || !systemForCode(code)) return null;
    const areaKey = Object.keys(areas)[Number(code[0]) - 1];
    const area = areas[areaKey];
    const major = systemForCode(code);
    const nodes = [{ level: 1, label: area.label, growth: 'Seed' }, { level: 2, label: major.label, growth: 'Root' }];
    for (let level = 3; level <= code.length; level += 1) {
      const entry = levels[level].children[Number(code[level - 1]) - 1];
      nodes.push({ level, label: entry[0], description: entry[1], growth: levels[level].growth, scale: levels[level].scale });
    }
    return { code, areaKey, area, major, nodes, next: code.length < 7 ? levels[code.length + 1] : null };
  }

  window.HM.hierarchy = { areas, levels, forRoute, branch, systemForCode };
})();
