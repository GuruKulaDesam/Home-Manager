(function () {
  const sources = [
    { title: 'CBSE competency-based education', url: 'https://cbseacademic.nic.in/cbe/index.html', note: 'Application, authentic problems and demonstrated learning outcomes.' },
    { title: 'CBSE assessment resources', url: 'https://cbseacademic.nic.in/cbe/assessment.html', note: 'Curriculum-aligned competency items for Classes 6-10.' },
    { title: 'CBSE Class XII sample papers and marking schemes', url: 'https://cbseacademic.nic.in/sqp_classxii_2025-26.html', note: 'Official question structure and marking evidence.' },
    { title: 'NCERT secondary learning outcomes', url: 'https://ncert.nic.in/pdf/publication/otherpublications/learning_outcomes.pdf', note: 'Observable subject competencies rather than recall alone.' },
    { title: 'Retrieval practice study', url: 'https://pubmed.ncbi.nlm.nih.gov/21252317/', note: 'Retrieval practice improved meaningful learning beyond restudy in the reported experiments.' },
    { title: 'Effective learning-techniques review', url: 'https://pubmed.ncbi.nlm.nih.gov/26173288/', note: 'Practice testing and distributed practice receive strong support.' }
  ];

  const jeeSources = [
    { title: 'Official JEE Main syllabus', url: 'https://jeemain.nta.nic.in/document/syllabus-2026/', note: 'The current NTA unit list for Physics, Chemistry and Mathematics.' },
    { title: 'Official JEE Main portal', url: 'https://jeemain.nta.nic.in/', note: 'Use the current Information Bulletin here for dates, pattern and examination rules.' }
  ];

  const jeeBlueprint = {
    Physics: ['Units and Measurements', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power', 'Rotational Motion', 'Gravitation', 'Properties of Solids and Liquids', 'Thermodynamics', 'Kinetic Theory of Gases', 'Oscillations and Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects of Current and Magnetism', 'Electromagnetic Induction and Alternating Currents', 'Electromagnetic Waves', 'Optics', 'Dual Nature of Matter and Radiation', 'Atoms and Nuclei', 'Electronic Devices', 'Experimental Skills'],
    Chemistry: ['Some Basic Concepts in Chemistry', 'Atomic Structure', 'Chemical Bonding and Molecular Structure', 'Chemical Thermodynamics', 'Solutions', 'Equilibrium', 'Redox Reactions and Electrochemistry', 'Chemical Kinetics', 'Classification of Elements and Periodicity', 'p-Block Elements', 'd- and f-Block Elements', 'Coordination Compounds', 'Purification and Characterisation of Organic Compounds', 'Some Basic Principles of Organic Chemistry', 'Hydrocarbons', 'Organic Compounds Containing Halogens', 'Organic Compounds Containing Oxygen', 'Organic Compounds Containing Nitrogen', 'Biomolecules', 'Principles Related to Practical Chemistry'],
    Mathematics: ['Sets, Relations and Functions', 'Complex Numbers and Quadratic Equations', 'Matrices and Determinants', 'Permutations and Combinations', 'Binomial Theorem', 'Sequence and Series', 'Limit, Continuity and Differentiability', 'Integral Calculus', 'Differential Equations', 'Coordinate Geometry', 'Three Dimensional Geometry', 'Vector Algebra', 'Statistics and Probability', 'Trigonometry']
  };
  const jeeSyllabus = Object.entries(jeeBlueprint).flatMap(([subject, titles]) => titles.map((title, index) => ({ id: `jee-${subject.toLowerCase().slice(0, 4)}-${index + 1}`, subject, title, term: index < Math.ceil(titles.length / 2) ? 'Foundation + core' : 'Advanced core', competency: 'JEE Main', status: 'not-started', mastery: 0 })));

  const playbooks = {
    Physics: {
      method: ['Draw the physical situation before choosing an equation.', 'Keep a one-page formula sheet with meaning, SI unit and limiting case.', 'Practise one derivation, one graph and three mixed numericals from memory.'],
      proof: 'Show the principle, labelled diagram, substitution with units, and a sensible final result.',
      traps: ['Using a formula outside its assumptions', 'Losing vector direction or sign', 'Writing a numerical answer without unit or significant reasoning']
    },
    Chemistry: {
      method: ['Separate physical formulas, inorganic facts and organic mechanisms.', 'Build reaction maps with reagent, condition, product and exception.', 'Close the book and reproduce equations before checking.'],
      proof: 'Balance equations, show conditions, name the governing idea and use precise NCERT terminology.',
      traps: ['Remembering product but not reagent or condition', 'Mixing oxidation state, charge and coordination number', 'Skipping units or logarithm conventions in numericals']
    },
    Mathematics: {
      method: ['Keep an example-pattern notebook: trigger, method, one solved model, one trap.', 'Solve without viewing the next step; mark the first point where reasoning breaks.', 'Interleave familiar and unfamiliar problems instead of repeating one template.'],
      proof: 'State the formula or theorem, show transformations in order, preserve conditions and box the conclusion.',
      traps: ['Cancelling or squaring without checking restrictions', 'Dropping constants, signs or limits', 'Recognising a solution without being able to reproduce it']
    },
    'Computer Science': {
      method: ['Predict output on paper before running code.', 'Trace variables, scope, file position and SQL rows in small tables.', 'Write minimal programs from a blank screen, then test boundary cases.'],
      proof: 'Use correct syntax, a short trace, explicit input/output and the exact SQL/Python operation requested.',
      traps: ['Confusing mutation with returned values', 'Ignoring file mode, delimiter or exception path', 'Writing SQL without checking keys, NULLs or row multiplicity']
    },
    'English Core': {
      method: ['Reduce each text to conflict, change, evidence and theme.', 'Build a quotation-free evidence bank of precise events and images.', 'Write timed answers with claim, textual evidence and interpretation.'],
      proof: 'Answer the command word directly, support it with textual evidence, and close with the wider idea.',
      traps: ['Retelling the plot instead of analysing', 'Generic introductions that do not answer the question', 'Ignoring format, word limit or tone in writing tasks']
    },
    Science: {
      method: ['Explain the process aloud using a labelled sketch.', 'Connect observation → evidence → scientific explanation.', 'Practise prediction questions by changing one variable at a time.'],
      proof: 'Use the correct term, a diagram/table where helpful, and evidence from the described observation.',
      traps: ['Memorising a definition without an example', 'Confusing correlation with cause', 'Drawing an unlabelled diagram']
    },
    'Social Science': {
      method: ['Build timelines, maps and cause–effect chains.', 'For each claim store one named example or piece of evidence.', 'Compare viewpoints using the same criteria.'],
      proof: 'Use a clear claim, specific evidence, explanation and—where relevant—chronology or location.',
      traps: ['Listing facts without showing connection', 'Mixing periods, places or institutions', 'Giving an opinion without evidence']
    },
    English: {
      method: ['Annotate purpose, audience, tone and evidence.', 'Retrieve vocabulary in sentences, not isolated lists.', 'Plan writing before drafting and reserve time to edit.'],
      proof: 'Use a direct response, relevant textual evidence, clear paragraphs and accurate language.',
      traps: ['Copying lines without inference', 'Ignoring the command word', 'Editing only spelling and not meaning']
    },
    Hindi: { method: ['पाठ का सार, भाव, पात्र और प्रमाण अलग-अलग याद करें।', 'व्याकरण को वाक्य-प्रयोग के साथ अभ्यास करें।', 'लेखन से पहले रूपरेखा और आवश्यक प्रारूप बनाएँ।'], proof: 'सीधा उत्तर, पाठ-आधारित प्रमाण, सही प्रारूप और स्पष्ट भाषा दें।', traps: ['केवल कहानी दोहराना', 'प्रश्न के निर्देश शब्द को छोड़ना', 'मात्रा और व्याकरण की जाँच न करना'] },
    Tamil: { method: ['கருத்து, பாத்திரம், சான்று, மொழிநயம் எனப் பாடத்தைச் சுருக்கவும்.', 'இலக்கணத்தை தனிச்சொல்லாக அல்லாமல் வாக்கியத்தில் பயிற்சி செய்யவும்.', 'எழுதும் முன் வடிவமும் முக்கியக் குறிப்புகளும் திட்டமிடவும்.'], proof: 'வினாவிற்கு நேரடி விடை, பாடச்சான்று, சரியான வடிவம், தெளிவான மொழி.', traps: ['கதையை மட்டும் மீண்டும் கூறுதல்', 'வினைச்சொல்லை கவனிக்காமை', 'எழுத்து மற்றும் இலக்கண திருத்தம் செய்யாமை'] },
    'Kaushal Bodh': { method: ['Define the user need and success criteria before making.', 'Sketch, choose tools safely, build a small test and record changes.', 'Explain teamwork roles and what evidence shows the design works.'], proof: 'Show the process, safe tool use, evidence from testing and a justified improvement.', traps: ['Starting construction without criteria', 'Ignoring safety or material limits', 'Showing a product without documenting iteration'] }
  };

  const conceptRules = [
    [/units and measurements|experimental skills/i, ['dimensional consistency and SI units', 'significant figures, uncertainty and least count', 'graph slope/intercept and experimental error']],
    [/kinematics/i, ['position, velocity and acceleration as vectors', 'motion graphs and relative motion', 'projectile components and constraints']],
    [/laws of motion/i, ['free-body diagram and Newton laws', 'friction direction and limiting value', 'connected bodies, pulleys and circular motion']],
    [/work, energy and power/i, ['work–energy theorem', 'potential energy and conservative force', 'power, collisions and energy/momentum conservation']],
    [/rotational motion/i, ['centre of mass and torque', 'angular momentum and moment of inertia', 'rolling without slipping and energy']],
    [/gravitation/i, ['field and potential', 'orbital speed, period and energy', 'escape speed and variation of g']],
    [/properties of solids and liquids/i, ['stress–strain and elastic moduli', 'pressure, buoyancy and fluid flow', 'viscosity, surface tension and thermal expansion']],
    [/thermodynamics/i, ['system, state variables and process path', 'first law and sign convention', 'isothermal/adiabatic processes, entropy and spontaneity']],
    [/kinetic theory/i, ['molecular origin of pressure', 'degrees of freedom and equipartition', 'rms speed, temperature and mean free path']],
    [/oscillations and waves/i, ['SHM equation, phase and energy', 'wave speed, superposition and standing waves', 'resonance, beats and Doppler effect']],
    [/some basic concepts in chemistry/i, ['mole concept and stoichiometry', 'limiting reagent and percentage yield', 'empirical/molecular formula and concentration']],
    [/atomic structure/i, ['quantum numbers and orbital meaning', 'electronic configuration and stability', 'spectra, de Broglie relation and uncertainty']],
    [/chemical bonding/i, ['Lewis structure, formal charge and resonance', 'VSEPR shape and hybridisation', 'molecular orbital order, bond order and magnetism']],
    [/equilibrium/i, ['Kc/Kp and reaction quotient', 'Le Châtelier response without changing K', 'ionic equilibrium, pH, buffers and solubility product']],
    [/periodicity|p-block/i, ['effective nuclear charge and periodic trends', 'oxidation states and anomalous behaviour', 'structure, acidity/basicity and redox patterns of key compounds']],
    [/purification and characterisation/i, ['purification method from physical property', 'qualitative element detection', 'quantitative composition and empirical formula']],
    [/basic principles of organic/i, ['inductive, resonance and hyperconjugative effects', 'acidity/basicity and intermediate stability', 'nucleophile/electrophile, mechanism and isomerism']],
    [/hydrocarbons/i, ['alkane radical substitution', 'alkene/alkyne addition and orientation', 'aromaticity and electrophilic substitution']],
    [/practical chemistry/i, ['observation → inference → confirmatory test', 'titration apparatus, endpoint and calculation', 'functional-group and inorganic-ion tests with interference control']],
    [/complex numbers|quadratic/i, ['Argand plane, modulus and argument', 'roots, discriminant and coefficient relations', 'locus and geometric interpretation']],
    [/permutations and combinations/i, ['fundamental counting principle', 'arrangement versus selection', 'restrictions, identical objects and complementary counting']],
    [/binomial theorem/i, ['general and middle terms', 'coefficient extraction', 'independent term and greatest term']],
    [/sequence and series/i, ['AP/GP nth term and sum', 'means and finite/infinite GP', 'standard sums and telescoping structure']],
    [/coordinate geometry/i, ['line slope/distance and angle', 'circle standard/general form and tangent', 'parabola, ellipse and hyperbola focus–directrix structure']],
    [/statistics and probability/i, ['variance and standard deviation', 'conditional probability and Bayes theorem', 'random variable and binomial distribution']],
    [/trigonometry/i, ['identities and transformations', 'equations and general solutions', 'inverse-trig principal branches and triangle relations']],
    [/charge|electrostatic/i, ['Coulomb interaction and superposition', 'electric field/flux representations', 'Gauss-law symmetry and sign']],
    [/potential|capacitance/i, ['potential–field relationship', 'equipotential surfaces', 'capacitor combinations and stored energy']],
    [/current electricity/i, ['drift, current density and Ohm law', 'Kirchhoff rules', 'cells, bridges and internal resistance']],
    [/magnet|moving charges/i, ['Lorentz force and motion', 'Biot–Savart/Ampere reasoning', 'magnetic materials and dipoles']],
    [/induction|alternating/i, ['Faraday–Lenz law', 'inductance and energy', 'phasors, impedance, resonance and power']],
    [/optic|light/i, ['reflection/refraction geometry', 'image formation and sign convention', 'interference/diffraction or optical instruments']],
    [/atom|nuclei|dual nature/i, ['quantisation and spectra', 'photoelectric/de Broglie evidence', 'binding energy, decay and conservation']],
    [/semiconductor|electronic devices/i, ['energy bands and doping', 'junction bias and rectification', 'logic/diode characteristics']],
    [/solution/i, ['concentration measures', 'Raoult law and deviations', 'colligative properties and van’t Hoff factor']],
    [/electrochem/i, ['cell potential and Nernst equation', 'conductance and molar conductivity', 'electrolysis, corrosion and batteries']],
    [/kinetic/i, ['rate law and order', 'integrated forms and half-life', 'Arrhenius dependence and mechanism']],
    [/coordination|d- and f-/i, ['electronic configuration and oxidation states', 'nomenclature/isomerism', 'bonding, colour and magnetic behaviour']],
    [/halo|alcohol|aldehyde|ketone|amine/i, ['functional-group structure and reactivity', 'named transformations and mechanisms', 'reagent/condition/product map and distinguishing tests']],
    [/organic compounds containing oxygen/i, ['alcohol/phenol/ether acidity and reactions', 'carbonyl nucleophilic addition and named reactions', 'carboxylic-acid derivatives, conversions and tests']],
    [/organic compounds containing nitrogen/i, ['amine basicity and preparation', 'diazonium-salt reactions and coupling', 'functional-group tests and conversion map']],
    [/biomolecule|nutrition|respiration|reproduction/i, ['structure–function connection', 'process sequence and inputs/outputs', 'regulation, comparison and real-life evidence']],
    [/relation|function/i, ['domain/range and mapping', 'composition and invertibility', 'properties and counterexamples']],
    [/trigonometric/i, ['principal branches and domains', 'identities and transformations', 'graph/sign checks']],
    [/matrices|determinant/i, ['operations and properties', 'inverse/adjoint logic', 'systems of equations and geometric meaning']],
    [/continuity|derivative/i, ['limit, continuity and differentiability conditions', 'derivative rules and implicit forms', 'monotonicity, extrema and rate interpretation']],
    [/integral/i, ['standard forms and substitution', 'parts/partial fractions', 'definite properties and area setup']],
    [/differential equation/i, ['order/degree and solution family', 'variable separation/linear form', 'initial condition verification']],
    [/vector|three dimensional/i, ['vector products and projections', 'line geometry and direction ratios', 'angle/distance interpretation']],
    [/probability|data handling/i, ['conditional probability and independence', 'Bayes/total probability structure', 'distribution, expectation and data interpretation']],
    [/python|function|exception|file|csv|data structure/i, ['state, control flow and scope', 'input/output representation', 'trace, boundary cases and failure handling']],
    [/network/i, ['topology and devices', 'protocol/address roles', 'communication path and security basics']],
    [/database|sql/i, ['schema, keys and constraints', 'query filtering/grouping/joins', 'result-table tracing and Python connectivity']],
    [/fraction|decimal|rational/i, ['equivalent representations', 'operations and estimation', 'number-line/application reasoning']],
    [/expression|equation/i, ['terms, coefficients and equivalence', 'order of operations', 'inverse operations and verification']],
    [/angle|triangle|perimeter|area/i, ['definitions and properties', 'diagram construction/measurement', 'theorem or formula choice and unit check']],
    [/heat|temperature/i, ['heat versus temperature', 'transfer mechanisms', 'measurement, change of state and daily applications']],
    [/acid|base|salt/i, ['indicator evidence and pH idea', 'neutralisation and products', 'safe everyday applications']],
    [/physical and chemical/i, ['observable evidence', 'reversibility versus new substance', 'word/symbol representation']],
    [/motion and time/i, ['distance–time relationship', 'speed and units', 'graph interpretation and measurement']],
    [/electric current/i, ['complete circuit and symbols', 'heating/magnetic effects', 'safety devices and applications']],
    [/environment|forest|wastewater|climate|water/i, ['system components and cycles', 'human impact and evidence', 'conservation choices and trade-offs']],
    [/history|kingdom|mughal|changes through time/i, ['chronology and periodisation', 'sources and perspective', 'power, culture and continuity/change']],
    [/equality|government|market|media|democracy|public service/i, ['institution and stakeholder roles', 'rights, access and inequality', 'claim–evidence–consequence evaluation']],
    [/reading comprehension|prose|poetry|literature/i, ['central idea and structure', 'speaker/character and change', 'language choice, evidence and inference']],
    [/grammar|vocabulary/i, ['form and function in context', 'meaning/collocation', 'editing and error explanation']],
    [/writing|portfolio/i, ['purpose, audience and format', 'idea order and cohesion', 'draft–edit–proofread cycle']],
    [/safety|tools|design|project|teamwork/i, ['need and success criteria', 'safe process/tools/materials', 'prototype, test evidence and improvement']]
  ];

  const fallbackConcepts = item => [item.title, `${item.competency} through an example`, 'connections, evidence and transfer to a new situation'];

  const teacherRules = [
    [/electric charges|electrostatic/i, { bigIdea: 'Charge creates a field in space; the field, not action at a distance, explains the force on another charge.', visual: ['source charge q', 'field E = kq/r²', 'test charge feels F = q₀E'], must: ['Coulomb: F = k|q₁q₂|/r² along the joining line', 'Superposition is vector addition: add fields, not magnitudes', 'Gauss law: ∮E·dA = qᵢₙ/ε₀; use it only when symmetry makes E constant'], example: ['For +q at x = −a and +q at x = +a, the fields at the origin are equal and opposite.', 'Therefore E(0) = 0, although potential V(0) = 2kq/a is not zero.'], exam: ['Separate scalar potential from vector field.', 'For a Gaussian surface, first justify spherical, cylindrical or planar symmetry.'] }],
    [/potential and capacitance/i, { bigIdea: 'Potential is energy per unit charge; capacitance measures how much charge a geometry stores per volt.', visual: ['charge separation Q', 'potential difference V', 'stored energy U = ½CV²'], must: ['E = −dV/dr in one dimension', 'Parallel plate: C = εA/d; dielectric multiplies C by K', 'Series capacitors carry equal Q; parallel capacitors share equal V'], example: ['If an isolated charged capacitor gets a dielectric, Q stays fixed.', 'C becomes KC, so V becomes V/K and stored energy becomes U/K.'], exam: ['Decide first whether battery is connected: fixed V or fixed Q.', 'Energy lost on connecting capacitors becomes heat; charge is still conserved.'] }],
    [/current electricity/i, { bigIdea: 'Current is organised charge flow; circuit laws are conservation of charge and energy written for networks.', visual: ['electric field drives carriers', 'I = nqAvd', 'network obeys junction + loop laws'], must: ['V = IR for an ohmic element; resistance R = ρL/A', 'Kirchhoff junction: algebraic current sum is zero', 'Cell terminal voltage: V = E − Ir while discharging'], example: ['For a cell E with internal resistance r connected to R, I = E/(R+r).', 'Power in R is I²R and is maximum when R = r.'], exam: ['Assign current directions freely, then respect signs.', 'A balanced Wheatstone bridge has no galvanometer current.'] }],
    [/moving charges|magnetism and matter/i, { bigIdea: 'Magnetic fields bend moving charges but do no work; currents and magnetic moments create magnetic fields.', visual: ['moving charge/current', 'magnetic field B', 'sideways force q(v × B)'], must: ['F = q(v × B); radius in uniform B is mv/(|q|B)', 'Long wire: B = μ₀I/(2πr); loop centre: B = μ₀NI/(2R)', 'Torque on dipole: τ = m × B; potential U = −m·B'], example: ['A charge entering perpendicular to uniform B follows a circle.', 'Speed and kinetic energy stay constant because magnetic force is perpendicular to velocity.'], exam: ['Use the right-hand rule, then reverse for negative charge.', 'Do not add electric and magnetic effects as scalar magnitudes.'] }],
    [/electromagnetic induction|alternating current/i, { bigIdea: 'Changing magnetic flux produces an emf; AC circuits add phase and frequency to ordinary circuit reasoning.', visual: ['flux Φ changes', 'emf ε = −dΦ/dt', 'current opposes the change'], must: ['Flux Φ = BA cosθ; Lenz law supplies the negative sign', 'Xᴸ = ωL, Xᶜ = 1/(ωC), Z = √(R²+(Xᴸ−Xᶜ)²)', 'Series resonance: Xᴸ = Xᶜ and current is maximum'], example: ['Rotate a coil uniformly in B: Φ = NBA cosωt.', 'Then ε = NBAω sinωt: a sinusoidal alternating emf.'], exam: ['State what change is being opposed, not merely “Lenz law”.', 'Use RMS values for average AC power: P = VᵣₘₛIᵣₘₛcosφ.'] }],
    [/electromagnetic waves/i, { bigIdea: 'A changing electric field creates magnetic field and vice versa, allowing a transverse wave to travel without matter.', visual: ['E oscillates', 'B oscillates perpendicular', 'wave travels at c = 1/√(μ₀ε₀)'], must: ['E, B and propagation direction are mutually perpendicular', 'c = νλ and E₀/B₀ = c', 'Spectrum order follows frequency; all EM waves have the same vacuum speed'], example: ['Doubling frequency in vacuum halves wavelength.', 'Wave speed remains c; photon energy hν doubles.'], exam: ['Distinguish frequency-dependent energy from common vacuum speed.', 'Know spectrum order and one defensible use/hazard of each region.'] }],
    [/ray optics/i, { bigIdea: 'Ray optics tracks how wavefront normals change direction at reflecting and refracting boundaries.', visual: ['object ray bundle', 'surface/lens changes direction', 'rays meet or appear to meet at image'], must: ['Use one Cartesian sign convention consistently', 'Mirror: 1/f = 1/v + 1/u; lens: 1/f = 1/v − 1/u', 'Snell: n₁sin i = n₂sin r; total internal reflection needs denser-to-rarer travel'], example: ['For a convex lens, u = −30 cm and f = +20 cm.', '1/v = 1/f + 1/u = 1/20 − 1/30 = 1/60, so v = +60 cm.'], exam: ['Draw the principal rays before substituting.', 'Check whether image nature and magnification agree with the diagram.'] }],
    [/wave optics/i, { bigIdea: 'When waves overlap, phase difference—not ray intersection—controls brightness.', visual: ['two coherent paths', 'path difference Δ', 'constructive or destructive intensity'], must: ['YDSE fringe width β = λD/d', 'Bright: Δ = nλ; dark: Δ = (n+½)λ', 'Single-slit diffraction central maximum has twice the width of secondary maxima'], example: ['If screen distance D doubles in YDSE while d and λ stay fixed, β doubles.', 'The pattern spreads but the central fringe remains at zero path difference.'], exam: ['Do not mix interference fringe width with diffraction width.', 'Convert path difference to phase using φ = 2πΔ/λ.'] }],
    [/dual nature/i, { bigIdea: 'Light and matter reveal wave or particle behaviour depending on what the experiment measures.', visual: ['photon energy hν', 'electron receives energy', 'Kmax = hν − φ'], must: ['Einstein equation: eVₛ = hν − φ', 'Threshold frequency ν₀ = φ/h', 'de Broglie wavelength λ = h/p'], example: ['Intensity increases photoelectron count, not maximum kinetic energy.', 'Frequency above threshold increases Kmax linearly.'], exam: ['Threshold behaviour defeats a classical-wave explanation.', 'Use stopping potential, not accelerating potential, in the photoelectric equation.'] }],
    [/^atoms$|nuclei/i, { bigIdea: 'Atomic spectra come from quantised energies; nuclear stability comes from mass–energy and binding.', visual: ['allowed energy levels', 'transition releases/absorbs hν', 'nuclear mass defect becomes binding energy'], must: ['Bohr hydrogen: Eₙ = −13.6/n² eV and rₙ ∝ n²', 'Radioactive decay: N = N₀e^(−λt), T½ = ln2/λ', 'Binding energy = Δmc²; binding energy per nucleon indicates stability'], example: ['After three half-lives, N/N₀ = (1/2)³ = 1/8.', 'The decayed fraction is therefore 7/8, not 3/2.'], exam: ['Use energy differences for photons, never the energy of one level alone.', 'Conserve charge number and mass number in nuclear equations.'] }],
    [/semiconductor/i, { bigIdea: 'Doping controls charge carriers; a p–n junction uses the depletion region to permit strongly directional current.', visual: ['p-type + n-type', 'depletion barrier', 'forward bias lowers barrier'], must: ['Intrinsic: electrons = holes; n-type majority carriers are electrons', 'Forward bias lowers barrier; reverse bias widens it', 'Diodes rectify; logic gates map voltage levels to Boolean outcomes'], example: ['In a half-wave rectifier, the diode conducts during one input half-cycle.', 'The load receives pulsating DC; a capacitor filter reduces ripple.'], exam: ['Conventional current direction differs from electron motion.', 'Build truth tables row by row; do not rely on gate-symbol memory alone.'] }],
    [/^solutions$/i, { bigIdea: 'A solution’s particle count and escaping tendency determine its concentration and colligative behaviour.', visual: ['solute particles mix', 'vapour pressure changes', 'colligative effect counts particles'], must: ['Molarity changes with temperature; molality does not', 'Raoult: pᵢ = xᵢpᵢ° for ideal solutions', 'ΔTᵦ = iKᵦm, ΔT𝒻 = iK𝒻m and π = iCRT'], example: ['1 mol CaCl₂ ideally gives 3 mol particles, so i ≈ 3.', 'Association lowers i; dissociation raises it.'], exam: ['Identify whether the question wants solvent mass or solution volume.', 'Use the observed molar mass to infer association/dissociation carefully.'] }],
    [/electrochemistry/i, { bigIdea: 'A redox reaction separates electron transfer into two electrodes, converting chemical and electrical energy.', visual: ['anode: oxidation', 'electrons through wire', 'cathode: reduction'], must: ['Ecell = Ecathode − Eanode using reduction potentials', 'ΔG° = −nFE° and logK = nE°/0.0591 at 298 K', 'Nernst: E = E° − (0.0591/n)logQ at 298 K'], example: ['Zn|Zn²⁺ || Cu²⁺|Cu has Zn oxidation and Cu²⁺ reduction.', 'E°cell = E°Cu²⁺/Cu − E°Zn²⁺/Zn; a positive value means spontaneous as written.'], exam: ['Write the balanced cell reaction before Q.', 'Conductivity falls on dilution, while molar conductivity generally rises.'] }],
    [/chemical kinetics/i, { bigIdea: 'Rate laws are experimental fingerprints of how concentration and temperature control reaction speed.', visual: ['measure concentration vs time', 'infer rate law', 'temperature changes rate constant k'], must: ['Rate = k[A]^m[B]^n; order = m+n', 'First order: ln([A]₀/[A]) = kt and T½ = 0.693/k', 'Arrhenius: ln(k₂/k₁) = −Ea/R(1/T₂−1/T₁)'], example: ['For a first-order reaction, two half-lives leave (1/2)² = 25%.', 'Its half-life does not depend on initial concentration.'], exam: ['Order comes from experiment, not stoichiometric coefficients.', 'Check the unit of k to identify order.'] }],
    [/d- and f-|coordination/i, { bigIdea: 'Partly filled d/f orbitals produce variable oxidation states, colour and magnetism; ligands reshape orbital energies.', visual: ['metal ion', 'ligands coordinate', 'd orbitals split by field'], must: ['Write oxidation state and d-electron count before predicting properties', 'Coordination number counts donor atoms, not ligands', 'Crystal-field splitting plus electron pairing determines unpaired electrons'], example: ['In [Fe(CN)₆]⁴⁻, Fe is +2, hence d⁶.', 'CN⁻ is strong field, so octahedral d⁶ is low spin and diamagnetic.'], exam: ['Name ligands alphabetically; oxidation state belongs in Roman numerals.', 'Distinguish ionisation, linkage, geometrical and optical isomerism.'] }],
    [/haloalkane|alcohol|aldehyde|ketone|amine/i, { bigIdea: 'Organic reactions become predictable when you follow electron-rich and electron-poor sites instead of memorising isolated equations.', visual: ['identify functional group', 'choose electrophile/nucleophile', 'track bonds broken and formed'], must: ['Map reagent + condition → mechanism → product', 'Compare effects of resonance, induction, steric hindrance and leaving group', 'Use oxidation/reduction level to connect functional groups'], example: ['A primary haloalkane with OH⁻ in aqueous medium favours substitution to an alcohol.', 'Alcoholic base and heat favour elimination; the condition changes the pathway.'], exam: ['Write structures, not only names, when isomers matter.', 'Keep a one-page conversion map and include named-test observations.'] }],
    [/biomolecules/i, { bigIdea: 'Biomolecules are structure–function systems: small changes in linkage or shape change biological behaviour.', visual: ['monomers', 'specific linkage', 'macromolecule structure and function'], must: ['Know reducing vs non-reducing sugars and glycosidic links', 'Amino acids form peptide bonds; protein structure controls function', 'DNA/RNA differ in sugar, bases, strands and biological role'], example: ['Sucrose is non-reducing because both anomeric carbons form the glycosidic bond.', 'Hydrolysis frees glucose and fructose, which can show reducing behaviour.'], exam: ['Use exact linkage and monomer names.', 'Do not confuse denaturation with hydrolysis of peptide bonds.'] }],
    [/relations and functions|inverse trigonometric/i, { bigIdea: 'A function is a controlled input–output rule; inverse questions are really about one-to-one behaviour and restricted domains.', visual: ['input domain', 'rule f', 'output range; inverse reverses only if one-to-one'], must: ['Check reflexive, symmetric and transitive properties separately', 'An inverse exists only for a bijection on the stated sets', 'Principal-value branches make inverse trigonometric functions single-valued'], example: ['f(x)=x² on all reals has no inverse because f(2)=f(−2).', 'Restricting domain to x≥0 gives f⁻¹(x)=√x.'], exam: ['Write domain and range before simplifying inverse-trig expressions.', 'A counterexample is enough to disprove a relation property.'] }],
    [/matrices|determinants/i, { bigIdea: 'Matrices encode transformations and simultaneous equations; the determinant tells whether the transformation is reversible.', visual: ['equations/data', 'matrix operation', 'det ≠ 0 gives unique inverse'], must: ['Matrix multiplication order matters: AB generally differs from BA', 'A⁻¹ = adj A/|A| only when |A| ≠ 0', 'Determinant row/column operations have specific sign and scale effects'], example: ['For A = [[a,b],[c,d]], |A| = ad−bc.', 'If ad−bc ≠ 0, A⁻¹ = 1/(ad−bc)[[d,−b],[−c,a]].'], exam: ['Check dimensions before multiplying.', 'Use determinant properties to simplify before expanding.'] }],
    [/continuity|derivatives/i, { bigIdea: 'A derivative measures local change; continuity connects nearby values, while differentiability requires a single local slope.', visual: ['function values approach', 'continuous point joins', 'derivative is tangent slope'], must: ['Differentiable implies continuous, but not conversely', 'Apply chain, product and quotient rules with full inner functions', 'At extrema, f′ may be zero or fail to exist; test sign or second derivative'], example: ['f(x)=|x| is continuous at 0.', 'Left derivative is −1 and right derivative is +1, so it is not differentiable there.'], exam: ['For piecewise functions, compare LHL, RHL and value first.', 'In optimisation, state the feasible domain and verify the extremum.'] }],
    [/^integrals$|applications of integrals/i, { bigIdea: 'Integration reverses differentiation and accumulates infinitely small contributions.', visual: ['slice quantity', 'sum many slices', 'limit becomes ∫'], must: ['Choose substitution when a function and its derivative appear', 'Definite integrals use limits and need no +C', 'Area needs top−bottom or right−left and may require splitting'], example: ['∫₂ˣ 2t dt = [t²]₂ˣ = x²−4.', 'This is signed accumulation; geometrical area cannot be negative.'], exam: ['Differentiate an indefinite answer to check it.', 'Sketch curves and find intersections before setting area limits.'] }],
    [/differential equations/i, { bigIdea: 'A differential equation describes a rule for change; its solution is a whole family of functions until conditions select one.', visual: ['rate relation dy/dx', 'integrate/solve form', 'initial condition selects curve'], must: ['Order is highest derivative; degree is power after polynomial form', 'For separable equations, collect y with dy and x with dx', 'A linear first-order equation uses integrating factor e^(∫Pdx)'], example: ['dy/dx = ky gives dy/y = k dx.', 'So y = Ce^(kx); y(0)=y₀ gives C=y₀.'], exam: ['Include the integration constant before applying conditions.', 'Substitute the final solution back into the original equation.'] }],
    [/vector algebra|three dimensional/i, { bigIdea: 'Vectors turn geometry into algebra: dot products measure projection and cross products measure oriented area.', visual: ['vectors/direction ratios', 'dot or cross product', 'angle, projection, line or plane result'], must: ['a·b = |a||b|cosθ; a×b magnitude = |a||b|sinθ', 'Line: r = a + λb; preserve direction ratios', 'Skew lines are neither parallel nor intersecting'], example: ['If a·b=0 for non-zero vectors, they are perpendicular.', 'If a×b=0, they are parallel or antiparallel.'], exam: ['Choose dot for angle/projection and cross for perpendicular/area.', 'Check whether a requested distance is point-line, point-plane or between skew lines.'] }],
    [/linear programming|probability/i, { bigIdea: 'Optimisation searches feasible choices; probability updates what is possible when information changes.', visual: ['constraints/events', 'feasible or conditional set', 'evaluate objective or probability'], must: ['Linear-programming extrema occur at feasible-region corner points', 'P(A|B)=P(A∩B)/P(B)', 'Independent means P(A∩B)=P(A)P(B), not mutually exclusive'], example: ['If P(A)=0.5, P(B)=0.4 and independent, P(A∩B)=0.2.', 'Then P(A|B)=0.2/0.4=0.5, unchanged by knowing B.'], exam: ['Shade every inequality and test all feasible vertices.', 'Draw a probability tree when events occur in stages.'] }],
    [/fraction|decimal|rational|large numbers/i, { bigIdea: 'Numbers can look different but represent the same quantity; estimation tells you whether an exact answer is sensible.', visual: ['quantity', 'fraction ↔ decimal ↔ number line', 'operate then estimate-check'], must: ['Use common denominators for addition, not multiplication', 'A rational number is p/q with q≠0', 'Sign rules and operation order apply before simplification'], example: ['3/4 + 2/3 = 9/12 + 8/12 = 17/12.', 'The answer is a little above 1, matching the estimate.'], exam: ['Write one intermediate line to protect signs and denominators.', 'Use a number line or estimate to catch impossible answers.'] }],
    [/heat and temperature|acid|physical and chemical|motion and time|electric current and effects|^light$/i, { bigIdea: 'Science explains an observation by connecting evidence to a model and a testable prediction.', visual: ['observe a change', 'identify variable/cause', 'model predicts what happens next'], must: ['Define the idea in your own words with one observable example', 'Draw and label the process or apparatus', 'Change one variable at a time and record evidence with units'], example: ['State the observation first, then the explanation.', 'Example structure: “The reading increased because …; therefore if we change …, we predict …”.'], exam: ['A diagram without labels cannot carry the reasoning.', 'Do not use “because it happens” as an explanation—name the mechanism.'] }],
    [/history|kingdom|mughal|environment|climate|government|market|media/i, { bigIdea: 'Humanities answers become convincing when a clear claim is connected to specific evidence and its consequence.', visual: ['claim', 'named evidence/source', 'explain why it proves the claim'], must: ['Locate the topic in time and place', 'Separate cause, event and consequence', 'Compare viewpoints using the same criterion'], example: ['Weak: “Markets can be unfair.”', 'Strong: name the participant, mechanism and evidence, then explain who gains or loses and why.'], exam: ['Answer the command word: describe, explain, compare or evaluate.', 'Use two precise examples instead of five disconnected facts.'] }],
    [/reading|vocabulary|grammar|prose|poetry|writing|speaking|literature/i, { bigIdea: 'Language marks come from meaning plus evidence: understand what a text does, then express that insight precisely.', visual: ['question/claim', 'textual detail', 'interpretation linked back'], must: ['Identify purpose, audience, tone and change', 'Use a precise event/image as evidence without retelling everything', 'Plan → draft → edit meaning → proofread language'], example: ['Claim: the speaker feels isolated.', 'Evidence: choose a specific image/action; explanation: show how its connotation creates isolation.'], exam: ['Open with a direct answer, not a generic introduction.', 'For writing tasks, format and tone are part of the answer.'] }],
    [/python|function|exception|file|csv|data structure|network|database|sql/i, { bigIdea: 'Computing becomes predictable when you trace state: what data exists, how an operation changes it, and what output follows.', visual: ['input/state', 'operation one step at a time', 'output + boundary case'], must: ['Trace variables and types before running code', 'For files/databases, know mode, cursor/result and failure path', 'Test an empty case, one normal case and one boundary case'], example: ['For a loop, make columns for iteration, condition and changed variables.', 'For SQL, form the filtered row set before applying grouping or projection.'], exam: ['Predict exact output including spaces, types and mutation.', 'Never write a query before identifying tables, keys and expected rows.'] }]
  ];

  const guruRules = [
    [/electric charges|electrostatic/i, 'Zero electric field does not mean zero potential. Field asks which way a charge would move; potential asks how much energy it has. Never collapse a vector question into a scalar one.'],
    [/potential and capacitance/i, 'Before touching a capacitor formula, ask one question: is the battery connected? That single decision fixes either voltage or charge and changes the entire solution.'],
    [/current electricity/i, 'A circuit is not a maze of equations. Every junction protects charge and every loop protects energy. Draw current directions once, then let conservation correct your guesses.'],
    [/moving charges|magnetism/i, 'A magnetic field can turn a particle without speeding it up. Whenever a force is perpendicular to motion, think direction change—not energy change.'],
    [/induction|alternating current/i, 'Lenz’s law is nature refusing a free change: induced current opposes the change in flux, not necessarily the original field. Name the change before choosing the direction.'],
    [/electromagnetic waves/i, 'Do not memorise the spectrum as seven unrelated names. Track one rising quantity—frequency—and wavelength falls while photon energy rises.'],
    [/optics|light/i, 'An optics answer should be visible before it is algebraic. If your signs predict an image that contradicts your ray sketch, the arithmetic has exposed its own mistake.'],
    [/dual nature/i, 'Intensity counts photons; frequency prices each photon. Photoelectric questions become easy when you decide whether the experiment changed the number of packets or the energy per packet.'],
    [/atoms|nuclei/i, 'The photon carries the difference between two energy levels, never the energy of one level. In nuclei, compare binding energy per nucleon—not total binding energy—to judge stability.'],
    [/semiconductor|electronic devices/i, 'A diode is a controllable barrier. Forward bias lowers the barrier; reverse bias raises it. Build every circuit explanation from that picture.'],
    [/units and measurements|experimental/i, 'Units are an independent examiner sitting inside every numerical. A dimensionally wrong equation is wrong before a single number is substituted.'],
    [/kinematics/i, 'Position, velocity and acceleration are three different stories about the same motion. Read a graph by its slope and area; do not read its height as every quantity at once.'],
    [/laws of motion/i, 'The best equation of motion begins as a free-body diagram. Draw only forces acting on the chosen body—never forces it exerts on something else.'],
    [/work, energy and power|rotational motion/i, 'Choose conservation when it removes unknown internal forces. Choose torque when rotation matters. The clever method is the one that avoids calculating what the question never asks for.'],
    [/gravitation/i, 'Field, potential and energy are related but not interchangeable. Field is the slope of potential; orbit questions often yield faster when energy and centripetal motion are connected.'],
    [/thermodynamics/i, 'Heat and work belong to a process; internal energy belongs to a state. Fix the sign convention at the beginning and never repair signs by intuition at the end.'],
    [/oscillations and waves/i, 'SHM is not any repeated motion—it requires acceleration proportional and opposite to displacement. Find that restoring relation first; the rest follows.'],
    [/some basic concepts in chemistry/i, 'A balanced equation speaks in moles, not grams. Convert everything to moles, identify the limiting reagent, and only then return to the unit requested.'],
    [/atomic structure/i, 'Quantum numbers are an address, not four facts to memorise. Read them in order: shell, subshell, orbital orientation, then electron spin.'],
    [/chemical bonding/i, 'Shape follows electron-pair repulsion, but properties follow the whole molecule. Draw the Lewis structure before naming hybridisation, polarity or bond order.'],
    [/equilibrium/i, 'A disturbance may change the equilibrium composition, but only temperature changes the equilibrium constant. This distinction destroys many attractive wrong options.'],
    [/solution/i, 'Colligative properties count dissolved particles, not their chemical prestige. First determine the real particle count; then apply the formula.'],
    [/electrochem/i, 'Write oxidation at the anode and reduction at the cathode before using any potential. A correct cell reaction makes the Nernst quotient and the sign almost self-checking.'],
    [/kinetic/i, 'Stoichiometry proposes a reaction; experiment reveals its rate law. Never borrow reaction coefficients as orders unless the mechanism justifies it.'],
    [/coordination|d- and f-|periodicity|p-block/i, 'In inorganic chemistry, configuration explains the pattern and NCERT records the exceptions. Learn the reason first, then attach each exception to the exact rule it breaks.'],
    [/organic|halo|alcohol|aldehyde|ketone|amine|hydrocarbon/i, 'Follow electrons, not reaction names. Mark the electron-rich site, the electron-poor site and the leaving group; the product then becomes a consequence instead of a memory test.'],
    [/biomolecules/i, 'In biomolecules, linkage is destiny. Two compounds may contain the same monomers yet behave differently because the bonding position or three-dimensional shape changed.'],
    [/relations and functions|sets/i, 'An inverse is earned, not assumed. Check one-to-one and onto behaviour on the stated domain and codomain before reversing a function.'],
    [/complex numbers|quadratic/i, 'A complex equation has both algebra and geometry. When manipulation becomes long, move to the Argand plane; a modulus often describes a distance and an argument an angle.'],
    [/matrices|determinants/i, 'A determinant is the matrix’s reversibility test. Check dimensions and determinant before doing heavy multiplication or hunting for an inverse.'],
    [/permutations|combinations/i, 'Ask whether order changes the outcome. If yes, arrange; if no, select. Most counting errors begin before the first factorial.'],
    [/binomial|sequence and series/i, 'Do not expand what can be indexed. The general term is a search tool: it locates the coefficient, independent term or pattern without carrying the whole expression.'],
    [/continuity|derivative|differentiability/i, 'Continuity asks whether the path breaks; differentiability asks whether the path has one local direction. A corner can pass the first test and fail the second.'],
    [/integral/i, 'An integral is accumulated change, not merely anti-differentiation. Sketch the region or identify the changing slice before trusting a formula.'],
    [/differential equation/i, 'The differential equation describes an entire family; the initial condition chooses the member. Never lose the constant before the family has been formed.'],
    [/coordinate geometry|vector|three dimensional/i, 'Geometry becomes shorter when you choose the right product: dot for projection and angle, cross for perpendicular direction and area, determinant for coplanarity.'],
    [/probability|statistics/i, 'Conditional probability changes the universe you are counting in. Rewrite the sample space after the condition instead of mechanically inserting numbers into Bayes’ formula.'],
    [/fraction|decimal|rational|large numbers/i, 'Estimate before calculating. An estimate is not a weaker answer—it is the guardrail that catches a misplaced sign, decimal or denominator.'],
    [/heat|acid|physical and chemical|motion and time|electric current and effects/i, 'A scientific answer is observation plus mechanism. Say what changed, name why it changed, and predict what would happen if one variable changed again.'],
    [/history|kingdom|mughal|environment|climate|government|market|media/i, 'A fact earns marks only when it proves a claim. Name the evidence, then complete the sentence: “This matters because…”'],
    [/reading|vocabulary|grammar|prose|poetry|writing|speaking|literature/i, 'Do not retell when the question asks you to interpret. Make the claim, choose one precise textual detail, and explain how that detail creates meaning.'],
    [/python|function|exception|file|csv|data structure|network|database|sql/i, 'Code is a sequence of state changes. Trace what each variable or row contains after every operation; the output will stop feeling like a guess.']
  ];

  function guruWisdom(item, note) {
    return guruRules.find(([pattern]) => pattern.test(item.title))?.[1] || `The doorway into ${item.title} is ${note.concepts[0]}. If that relationship is clear enough to explain without vocabulary shortcuts, the remaining details have somewhere logical to attach.`;
  }

  function teacherNotes(item) {
    const match = teacherRules.find(([pattern]) => pattern.test(item.title));
    const concepts = (conceptRules.find(([pattern]) => pattern.test(item.title)) || [null, fallbackConcepts(item)])[1];
    const note = match?.[1] || {
      bigIdea: `${item.title} is best understood as a connected model: define the parts, show how they interact, then use the model in a new situation.`,
      visual: [concepts[0], concepts[1], concepts[2]],
      must: concepts.map(value => `Explain ${value} with a definition, one example and one boundary case.`),
      example: [`Start with a simple ${item.title} case and label the known information.`, 'Apply one governing idea, explain the result, then change one condition and predict the effect.'],
      exam: ['Answer the command word directly.', 'Show the connection between evidence, method and conclusion.']
    };
    const result = {
      ...note,
      concepts,
      check: [`In one sentence, what is the central idea of ${item.title}?`, `Which of these relationships would you use first: ${concepts.join(' / ')}? Explain why.`, 'What is the most tempting wrong answer or method, and what check exposes it?'],
      revision: [note.bigIdea, ...note.must].slice(0, 4)
    };
    result.wisdom = guruWisdom(item, result);
    return result;
  }

  const quizRules = [
    [/electric charges|electrostatic/i, { stem: 'At a point, the electric field is zero. Which conclusion is always valid?', options: ['Electric potential must also be zero', 'A test charge there experiences zero electric force', 'No source charges exist nearby', 'Electric flux through every surrounding surface is zero'], answer: 1, why: 'Force is F = q₀E, so E = 0 makes the force zero. Potential is a scalar sum and may remain non-zero.' }],
    [/potential and capacitance/i, { stem: 'A dielectric fully fills an isolated charged capacitor. What happens?', options: ['Q falls and V stays fixed', 'Q stays fixed, while V and energy fall', 'Q and V both rise', 'Capacitance falls'], answer: 1, why: 'Isolation fixes charge. C becomes KC, hence V = Q/C and U = Q²/(2C) both decrease.' }],
    [/current electricity/i, { stem: 'A cell of emf E and internal resistance r supplies an external resistance R. The current is:', options: ['E/R', 'E/r', 'E/(R+r)', 'E(R+r)'], answer: 2, why: 'Internal and external resistances are in series in the complete circuit, so the total opposition is R+r.' }],
    [/moving charges|magnetism/i, { stem: 'A charged particle moves perpendicular to a uniform magnetic field. Which quantity stays constant?', options: ['Velocity vector', 'Momentum vector', 'Kinetic energy', 'Magnetic force direction'], answer: 2, why: 'Magnetic force is always perpendicular to velocity, so it changes direction but does no work.' }],
    [/induction|alternating current/i, { stem: 'In a series RLC circuit at resonance, which statement is correct?', options: ['XL is greater than XC', 'Impedance is minimum and current is maximum', 'Power factor is zero', 'Current must be zero'], answer: 1, why: 'At resonance XL = XC, their effects cancel, Z = R and the current reaches its maximum.' }],
    [/ray optics/i, { stem: 'Before solving a lens numerical, which step prevents the most sign errors?', options: ['Use all distances as positive', 'Draw the ray situation and apply one sign convention', 'Memorise the final image location', 'Convert focal length to magnification'], answer: 1, why: 'The diagram establishes object/image sides and makes a consistent Cartesian sign convention meaningful.' }],
    [/wave optics/i, { stem: 'In YDSE, the screen distance doubles while wavelength and slit spacing stay fixed. Fringe width:', options: ['Halves', 'Stays unchanged', 'Doubles', 'Becomes four times'], answer: 2, why: 'β = λD/d, so fringe width is directly proportional to screen distance.' }],
    [/dual nature/i, { stem: 'Above threshold frequency, increasing light intensity primarily increases:', options: ['Stopping potential', 'Maximum kinetic energy', 'Number of emitted photoelectrons', 'Threshold frequency'], answer: 2, why: 'Intensity changes photon count. Photon energy—and therefore maximum kinetic energy—is controlled by frequency.' }],
    [/^solutions$/i, { stem: 'Which concentration measure is unchanged by temperature?', options: ['Molarity', 'Molality', 'Volume percentage', 'Moles per litre'], answer: 1, why: 'Molality uses mass of solvent, whereas volume-based measures change with temperature.' }],
    [/electrochemistry/i, { stem: 'Using standard reduction potentials, the cell potential is calculated as:', options: ['Eanode − Ecathode', 'Ecathode − Eanode', 'Ecathode + Eanode in every case', 'nF/ΔG'], answer: 1, why: 'With both values written as reduction potentials, E°cell = E°cathode − E°anode.' }],
    [/chemical kinetics/i, { stem: 'For a first-order reaction, the half-life:', options: ['Increases with initial concentration', 'Decreases with initial concentration', 'Is independent of initial concentration', 'Is always zero'], answer: 2, why: 't½ = 0.693/k for first order, so initial concentration does not appear.' }],
    [/coordination|d- and f-/i, { stem: 'Coordination number counts:', options: ['The number of ligands only', 'Donor atoms directly bonded to the central metal', 'Oxidation state of the metal', 'Unpaired electrons'], answer: 1, why: 'A multidentate ligand contributes more than one donor atom, so ligand count and coordination number can differ.' }],
    [/relations and functions|inverse trigonometric/i, { stem: 'Why does f(x)=x² on all real numbers have no inverse function?', options: ['Its range contains positive numbers', 'It is not one-to-one', 'It is not continuous', 'It has no derivative at zero'], answer: 1, why: 'Different inputs such as 2 and −2 give the same output, so reversing the mapping is not a function.' }],
    [/matrices|determinants/i, { stem: 'A square matrix has a unique inverse exactly when:', options: ['Every entry is positive', 'Its determinant is non-zero', 'It is symmetric', 'Its trace is zero'], answer: 1, why: 'A non-zero determinant means the transformation is non-singular and A⁻¹ = adj(A)/|A| exists.' }],
    [/continuity|derivatives/i, { stem: 'Which statement is always true?', options: ['Continuous implies differentiable', 'Differentiable implies continuous', 'Every extremum has derivative zero', 'A cusp has equal one-sided derivatives'], answer: 1, why: 'Differentiability guarantees continuity; |x| at zero shows continuity alone is insufficient.' }],
    [/^integrals$|applications of integrals/i, { stem: 'When calculating geometrical area between curves, you should first:', options: ['Add +C', 'Sketch, find intersections and identify the upper curve', 'Assume the integral is positive', 'Differentiate both curves twice'], answer: 1, why: 'Area requires correct limits and a non-negative height, often forcing the integral to be split.' }],
    [/probability/i, { stem: 'If non-zero-probability events A and B are independent, then:', options: ['P(A∩B)=0', 'P(A|B)=P(A)', 'They are mutually exclusive', 'P(A)=P(B)'], answer: 1, why: 'Knowing B does not change the probability of A; equivalently P(A∩B)=P(A)P(B).' }],
    [/fraction|decimal|rational/i, { stem: 'What is 3/4 + 2/3?', options: ['5/7', '5/12', '17/12', '6/12'], answer: 2, why: 'Use denominator 12: 9/12 + 8/12 = 17/12, which sensibly is a little greater than 1.' }],
    [/heat and temperature/i, { stem: 'Which statement is scientifically correct?', options: ['Heat and temperature are identical', 'Temperature measures the direction in which heat will flow', 'A larger object always has higher temperature', 'Heat cannot move through empty space'], answer: 1, why: 'Temperature difference determines the direction of heat transfer; radiation can carry energy through empty space.' }],
    [/sql|database/i, { stem: 'What should you determine before writing a multi-table SQL query?', options: ['Font and column colour', 'Tables, keys and expected result rows', 'Only the SELECT column', 'The number of Python loops'], answer: 1, why: 'Keys define valid joins and expected rows expose accidental duplication before aggregation.' }]
  ];

  function questions(item) {
    const notes = teacherNotes(item);
    const authored = quizRules.find(([pattern]) => pattern.test(item.title))?.[1];
    const generated = [
      { stem: `Which statement belongs on the essential exam sheet for “${item.title}”?`, options: [notes.must[0], 'A final answer is enough; conditions never matter.', 'Every related quantity can be treated as a scalar.', 'The safest method is to memorise one example unchanged.'], answer: 0, why: `${notes.must[0]} This is a governing idea; the other choices discard conditions or reasoning.` },
      { stem: `What is the best first move when a new ${item.title} question looks unfamiliar?`, options: [`Identify the known information and connect it to ${notes.concepts[0]}.`, 'Start calculating with the longest available formula.', 'Look at the answer before representing the problem.', 'Ignore the conditions and match keywords only.'], answer: 0, why: `Representation comes before calculation. The first useful anchor here is ${notes.concepts[0]}.` }
    ];
    return [authored, ...generated].filter(Boolean);
  }
  function guide(item) {
    const playbook = playbooks[item.subject] || playbooks.English;
    const rule = conceptRules.find(([pattern]) => pattern.test(item.title));
    const concepts = rule ? rule[1] : fallbackConcepts(item);
    return {
      concepts,
      method: playbook.method,
      traps: playbook.traps,
      proof: playbook.proof,
      recall: [
        `Without notes, explain “${item.title}” in three connected points.`,
        `Give one example, one non-example and the reason they differ.`,
        `Create one application question and solve or answer it completely.`
      ],
      cycle: ['Learn: connect the idea to one worked example.', 'Retrieve: close everything and reconstruct it.', 'Apply: solve an unfamiliar or competency question.', 'Correct: log the exact error and repair the weak step.', 'Space: revisit after 1 day, 3 days, 7 days and 21 days.']
    };
  }

  function jeeGuide(item) {
    const base = guide(item);
    const subject = item.subject;
    const subjectTraps = {
      Physics: ['Starting algebra before drawing the system and choosing a sign convention', 'Missing a hidden constraint, limiting case, vector direction or unit', 'Using a familiar formula when its assumptions do not match the question'],
      Chemistry: ['Treating an NCERT exception as a general rule', 'Remembering a product but losing the reagent, condition, mechanism or stereochemical result', 'Mixing concentration conventions, signs, logarithms or approximations in a numerical'],
      Mathematics: ['Ignoring domain, range, branch, sign or an extraneous root', 'Choosing a long standard method when a substitution, property or option check is faster', 'Continuing a time-sink calculation without a checkpoint or alternate route']
    };
    return {
      ...base,
      traps: subjectTraps[subject] || base.traps,
      method: [
        `Map ${item.title} to its prerequisites and write the three governing relationships from memory.`,
        'Solve in layers: 3 direct questions, 4 standard applications, then 3 mixed questions under time.',
        'After checking, redo every wrong or guessed question without seeing the solution.'
      ],
      attempt: ['Pass A: take questions whose route is visible immediately.', 'Pass B: return to questions that need a few connected steps.', 'Pass C: attempt time-sinks only after protecting accurate marks; follow the current NTA bulletin for marking rules.'],
      errorCodes: ['C — concept or prerequisite gap', 'R — formula, fact or reaction not retrievable', 'S — wrong setup, representation or method choice', 'X — algebra, calculation, sign or unit slip', 'Q — question misread or condition missed', 'T — poor time/attempt selection'],
      drill: ['Untimed diagnostic: explain the route before solving 3 questions.', 'Timed set: solve 7 mixed questions without notes and mark every guess.', 'Repair: classify each miss by error code and write the earliest wrong step.', 'Retention: redo misses after 1 day and again in a mixed weekly test.'],
      proof: 'A JEE-ready solution selects a valid route quickly, preserves every condition and unit, reaches the verified option/value, and can survive a second solution or limiting-case check.'
    };
  }

  window.HM.genius = { guide, jeeGuide, teacherNotes, questions, jeeSyllabus, playbooks, sources, jeeSources };
})();
