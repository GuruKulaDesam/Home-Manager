(function () {
  'use strict';

  const HM = window.HM = window.HM || {};
  const root = HM.chapterFoundations = HM.chapterFoundations || {};
  root.school = root.school || {};
  root.jee = root.jee || {};

  const words = (...pairs) => pairs.map(([term, plain]) => ({ term, plain }));
  const visual = (type, labels, links, caption) => ({
    type,
    nodes: labels.map(([id, label]) => ({ id, label })),
    edges: links.map(([from, to, label]) => ({ from, to, ...(label ? { label } : {}) })),
    caption
  });
  const foundation = (title, remember, newWords, prompt, steps, answer, diagram) => ({
    title, subject: 'Physics', remember, newWords, firstExample: { prompt, steps, answer }, visual: diagram
  });

  const F = {
    'Electric Charges and Fields': foundation('Electric Charges and Fields',
      ['Matter contains positive protons and negative electrons. Equal amounts cancel, so the object is neutral.', 'Like charges push apart; unlike charges pull together. Force also has a direction, so arrows matter.', 'Distance r means the straight-line separation between the two charges, measured in metres.'],
      words(['charge q', 'how much positive or negative electricity an object has'], ['electric field E', 'the push or pull that one coulomb would feel at a point'], ['superposition', 'find each effect separately, then add the arrows']),
      'A +2 C test charge is placed where E = 3 N/C to the right. What force acts on it?',
      ['Use F = qE.', 'Multiply 2 C by 3 N/C.', 'A positive charge follows the field arrow.'], 'F = 6 N to the right.',
      visual('vector', [['q','source charge'],['E','field arrow'],['t','test charge'],['F','force']], [['q','E','creates'],['E','t','exists at'],['t','F','feels']], 'A source creates a field; a test charge placed there feels a force.')),

    'Electrostatic Potential and Capacitance': foundation('Electrostatic Potential and Capacitance',
      ['Work is energy transferred when a force moves something.', 'Potential energy belongs to a position or arrangement. A lifted book stores gravitational potential energy; separated charges store electric potential energy.', 'Voltage compares energy per coulomb. A larger voltage means each coulomb can transfer more energy.'],
      words(['potential V', 'electric energy available per coulomb'], ['capacitance C', 'how much charge can be stored per volt'], ['dielectric', 'an insulating material placed between capacitor plates']),
      'A capacitor stores 6 C when the voltage is 3 V. Find its capacitance.',
      ['Start from C = Q/V.', 'Put Q = 6 C and V = 3 V.', 'Divide charge by voltage.'], 'C = 2 F.',
      visual('compare', [['h','height'],['pe','stored energy'],['v','voltage'],['c','capacitor']], [['h','pe','gravity'],['v','c','electricity']], 'Height helps you picture gravitational energy; voltage plays a similar bookkeeping role for charge.')),

    'Current Electricity': foundation('Current Electricity',
      ['A closed circuit is an unbroken path. If the path is open, charges cannot keep moving around it.', 'Current tells how much charge passes each second: I = Q/t.', 'A cell supplies energy, while resistance makes charge motion harder and transfers electrical energy into heat.'],
      words(['current I', 'charge passing a point each second'], ['resistance R', 'opposition to current'], ['emf', 'energy supplied by a source per coulomb']),
      'A 6 V battery is connected across a 3 ohm resistor. Find the current.',
      ['The circuit is one closed loop.', 'Use Ohm law: V = IR.', 'Rearrange: I = V/R = 6/3.'], 'I = 2 A.',
      visual('flow', [['cell','cell gives energy'],['wire','charges move'],['res','resistor warms'],['back','charges return']], [['cell','wire'],['wire','res'],['res','back'],['back','cell']], 'Current is a complete-loop story, not a one-way supply that gets used up.')),

    'Moving Charges and Magnetism': foundation('Moving Charges and Magnetism',
      ['Velocity is speed with a direction. Changing direction is acceleration even when speed stays the same.', 'A cross product produces an arrow perpendicular to two input arrows. Use the right hand for positive charge and reverse it for negative charge.', 'Circular motion needs a net force pointing toward the centre.'],
      words(['magnetic field B', 'the region that steers moving charge or magnets'], ['Lorentz force', 'the electric and magnetic force on a charge'], ['pitch', 'forward distance covered in one turn of a helix']),
      'A positive charge moves east through a magnetic field pointing north. Which way is the force?',
      ['Point right-hand fingers east.', 'Curl them toward north.', 'The thumb points upward.'], 'The magnetic force is upward.',
      visual('vector', [['v','velocity →'],['B','field ↑'],['F','force ⊙']], [['v','F','v × B'],['B','F']], 'The magnetic force is perpendicular to both velocity and field, so it turns the particle rather than speeding it up.')),

    'Magnetism and Matter': foundation('Magnetism and Matter',
      ['A current loop acts like a tiny bar magnet with a north-facing direction.', 'Torque is a turning effect. A door turns more easily when you push far from its hinge.', 'Atoms contain moving charge, so they can behave like tiny magnets.'],
      words(['magnetic dipole', 'a tiny magnet with a north and south side'], ['magnetic moment m', 'an arrow measuring a magnet’s strength and direction'], ['domain', 'a region where many atomic magnets point together']),
      'A magnetic moment points opposite to a uniform field. Is this alignment stable?',
      ['Imagine turning it a tiny amount.', 'The field torque turns it farther toward the field.', 'It does not return to the opposite position.'], 'No. Opposite alignment is unstable; parallel alignment is stable.',
      visual('compare', [['dia','diamagnetic: weakly away'],['para','paramagnetic: weakly toward'],['ferro','ferromagnetic: domains align']], [['dia','para','response grows'],['para','ferro','response grows']], 'Materials differ by how their atomic magnetic moments respond to an external field.')),

    'Electromagnetic Induction': foundation('Electromagnetic Induction',
      ['A magnetic field can pass through a loop. More field lines through the loop means more magnetic flux.', 'Change is the key: a steady magnet beside a steady loop produces no induced emf.', 'Nature resists the change that causes induction. This is Lenz law and it protects energy conservation.'],
      words(['magnetic flux Φ', 'how much magnetic field passes through an area'], ['induced emf', 'voltage produced by changing flux'], ['inductance L', 'how strongly a circuit opposes a change in its own current']),
      'Flux through one loop falls from 5 Wb to 1 Wb in 2 s. Find the emf magnitude.',
      ['Flux change has magnitude 4 Wb.', 'Divide by the time: |ΔΦ/Δt| = 4/2.', 'There is one turn, so no extra multiplication is needed.'], 'The induced emf magnitude is 2 V.',
      visual('cycle', [['change','flux changes'],['emf','emf appears'],['current','current flows'],['oppose','new field opposes change']], [['change','emf'],['emf','current'],['current','oppose'],['oppose','change']], 'Faraday gives the size; Lenz gives the direction.')),

    'Alternating Current': foundation('Alternating Current',
      ['Direct current keeps one direction. Alternating current repeatedly reverses direction.', 'A sine wave has a peak value and an effective rms value. Household ratings normally use rms.', 'Inductors store magnetic energy; capacitors store electric energy. Both can return energy to the circuit.'],
      words(['reactance', 'frequency-dependent opposition from an inductor or capacitor'], ['impedance Z', 'the total opposition to alternating current'], ['phase', 'how far one repeating wave leads or lags another']),
      'A sinusoidal voltage has peak value 10√2 V. Find its rms value.',
      ['Use Vrms = Vpeak/√2.', 'Substitute 10√2 V.', 'Cancel √2.'], 'Vrms = 10 V.',
      visual('compare', [['R','R: V and I together'],['L','L: V leads I'],['C','C: I leads V']], [['R','L','phase changes'],['R','C','phase changes']], 'The same current reference lets you compare resistor, inductor and capacitor phase clearly.')),

    'Electromagnetic Waves': foundation('Electromagnetic Waves',
      ['A wave carries energy from place to place without carrying the material along with it.', 'Frequency counts cycles each second; wavelength is the distance from one crest to the next.', 'Electric and magnetic fields can change together and travel even through empty space.'],
      words(['transverse', 'vibration is sideways to the travel direction'], ['spectrum', 'the full family of electromagnetic frequencies'], ['displacement current', 'a changing electric field that plays the role of current']),
      'A radio wave has frequency 100 MHz. Find its wavelength in vacuum.',
      ['Convert 100 MHz to 1 × 10^8 Hz.', 'Use λ = c/f.', 'Divide 3 × 10^8 m/s by 1 × 10^8 Hz.'], 'λ = 3 m.',
      visual('vector', [['E','electric field ↕'],['B','magnetic field ⊙'],['travel','wave travels →']], [['E','travel','perpendicular'],['B','travel','perpendicular'],['E','B','perpendicular']], 'E, B and the travel direction are mutually perpendicular.')),

    'Ray Optics and Optical Instruments': foundation('Ray Optics and Optical Instruments',
      ['Light travels in straight lines inside a uniform material.', 'Reflection means bouncing back; refraction means changing direction when light changes speed in a new material.', 'A real image can be caught on a screen. A virtual image can be seen but not caught on a screen.'],
      words(['principal axis', 'the central reference line of a mirror or lens'], ['focus', 'the point where parallel rays meet or appear to meet'], ['refractive index n', 'how much light slows inside a material']),
      'Light travels from air into glass. Does it bend toward or away from the normal?',
      ['Glass has the larger refractive index.', 'Light slows when entering glass.', 'A ray entering the slower medium bends toward the normal.'], 'It bends toward the normal.',
      visual('flow', [['object','object'],['lens','lens bends rays'],['image','image forms'],['eye','eye or screen']], [['object','lens'],['lens','image'],['image','eye']], 'Always draw the ray path before choosing signs or using an image formula.')),

    'Wave Optics': foundation('Wave Optics',
      ['When waves meet, their displacements add. This is superposition.', 'Crest with crest strengthens the wave; crest with trough weakens it.', 'Phase tells which part of a repeating cycle a wave has reached.'],
      words(['coherent sources', 'sources keeping a fixed phase relationship'], ['interference', 'bright and dark pattern made by adding waves'], ['diffraction', 'spreading caused by a narrow opening or edge']),
      'Two coherent paths differ by exactly one wavelength. Is the point bright or dark?',
      ['A one-wavelength difference is a full cycle.', 'The two crests arrive together again.', 'Their amplitudes add.'], 'The point is bright: constructive interference.',
      visual('compare', [['same','crest + crest'],['bright','larger amplitude / bright'],['opposite','crest + trough'],['dark','cancellation / dark']], [['same','bright'],['opposite','dark']], 'Interference is easiest when you first compare how the two wave cycles arrive.')),

    'Dual Nature of Radiation and Matter': foundation('Dual Nature of Radiation and Matter',
      ['Energy can arrive in packets called photons. One photon’s energy depends on frequency.', 'An electron in a metal needs a minimum escape energy. Below that threshold, more dim photons or more bright photons still cannot free it.', 'Momentum measures quantity of motion. Matter wavelength becomes shorter when momentum grows.'],
      words(['photon', 'one packet of light energy'], ['work function φ', 'minimum energy needed to free an electron'], ['de Broglie wavelength', 'the wave length linked with a moving particle']),
      'A photon has 5 eV and a metal’s work function is 2 eV. Find maximum electron kinetic energy.',
      ['The photon brings 5 eV.', 'The electron spends 2 eV escaping.', 'The remainder becomes kinetic energy.'], 'Kmax = 5 − 2 = 3 eV.',
      visual('flow', [['photon','photon energy hν'],['escape','work function φ'],['motion','electron kinetic energy']], [['photon','escape','pays'],['escape','motion','remainder']], 'Photon energy is shared between escaping the metal and moving the electron.')),

    'Atoms': foundation('Atoms',
      ['Most of an atom is empty space, with a tiny positive nucleus at the centre.', 'Electrons in an atom may occupy only certain energy levels, like permitted rungs on a ladder.', 'A photon is emitted when an electron moves to a lower energy level and loses energy.'],
      words(['ground state', 'the lowest allowed energy state'], ['excited state', 'an allowed state above the ground state'], ['ionization', 'giving enough energy to remove an electron completely']),
      'An electron drops from −3.4 eV to −13.6 eV. What photon energy is emitted?',
      ['Initial energy is −3.4 eV.', 'Final energy is −13.6 eV.', 'Energy released is Ei − Ef = −3.4 − (−13.6).'], 'The photon energy is 10.2 eV.',
      visual('flow', [['high','higher energy level'],['photon','energy difference leaves as photon'],['low','lower energy level']], [['high','photon','electron drops'],['photon','low']], 'The line spectrum is a record of permitted jumps between energy levels.')),

    'Nuclei': foundation('Nuclei',
      ['The nucleus contains positive protons and neutral neutrons. Their total is the mass number A.', 'Mass can change into energy. Even a tiny missing mass can represent a large energy because E = mc².', 'Radioactive decay is random for one nucleus but predictable for a huge group.'],
      words(['isotope', 'same proton number but different neutron number'], ['binding energy', 'energy needed to separate a nucleus into nucleons'], ['half-life', 'time for half of a large radioactive sample to remain']),
      'A sample begins with 80 mg and has a half-life of 2 h. How much remains after 4 h?',
      ['Four hours contains two half-lives.', 'After 2 h: 80 → 40 mg.', 'After 4 h: 40 → 20 mg.'], '20 mg remains.',
      visual('cycle', [['80','80 mg'],['40','40 mg'],['20','20 mg'],['10','10 mg']], [['80','40','one half-life'],['40','20','one half-life'],['20','10','one half-life']], 'Each half-life halves what remains, not the original amount.')),

    'Semiconductor Electronics: Materials, Devices and Simple Circuits': foundation('Semiconductor Electronics: Materials, Devices and Simple Circuits',
      ['Conductors have many mobile charge carriers; insulators have very few. Semiconductors sit between them.', 'Adding a carefully chosen impurity is called doping. It increases electrons or holes without giving the whole crystal a net charge.', 'A switch has two useful states. A diode similarly behaves very differently in its forward and reverse directions.'],
      words(['hole', 'a missing electron that behaves like a positive carrier'], ['p-n junction', 'boundary between p-type and n-type material'], ['depletion region', 'carrier-poor barrier formed at the junction']),
      'An ideal diode is forward biased in series with a battery and resistor. Is it ON or OFF?',
      ['Forward bias lowers the junction barrier.', 'The ideal diode allows current in this direction.', 'Replace the ON ideal diode by a wire when solving the circuit.'], 'It is ON.',
      visual('flow', [['dope','dope silicon'],['pn','join p and n'],['bias','apply bias'],['state','diode ON or OFF']], [['dope','pn'],['pn','bias'],['bias','state']], 'Start with carriers, then the junction, then bias; the circuit behaviour becomes understandable.')),

    'Units and Measurements': foundation('Units and Measurements',
      ['A physical quantity is written as a number and a unit. “5” is incomplete; “5 metres” is meaningful.', 'No measurement is perfectly exact. The final digits communicate the instrument’s limit.', 'An equation must compare the same kind of quantity on both sides. You cannot add time to length.'],
      words(['dimension', 'the basic kind of a quantity, such as length, mass or time'], ['least count', 'smallest change an instrument can show'], ['significant figures', 'digits justified by the measurement']),
      'A rectangle is 2.0 m by 3.0 m. Find its area with sensible precision.',
      ['Use area = length × breadth.', 'Multiply 2.0 × 3.0 = 6.00.', 'Both measurements have two significant figures, so report two.'], 'Area = 6.0 m².',
      visual('flow', [['thing','physical property'],['number','measured number'],['unit','unit'],['unc','uncertainty']], [['thing','number'],['number','unit','needs'],['unit','unc','reported with']], 'A trustworthy measurement is number + unit + honest precision.')),

    'Kinematics': foundation('Kinematics',
      ['Position tells where an object is relative to a chosen origin.', 'Velocity tells how quickly position changes and in which direction. Acceleration tells how quickly velocity changes.', 'A graph is a story: slope tells rate of change, while area can tell accumulated change.'],
      words(['displacement', 'change in position, including direction'], ['instantaneous velocity', 'velocity at one exact moment'], ['relative velocity', 'one object’s velocity as seen from another']),
      'A bicycle speeds up uniformly from 2 m/s to 8 m/s in 3 s. Find acceleration.',
      ['Velocity change is 8 − 2 = 6 m/s.', 'Time taken is 3 s.', 'Use a = Δv/Δt = 6/3.'], 'a = 2 m/s².',
      visual('flow', [['x','position x'],['v','velocity v'],['a','acceleration a']], [['x','v','slope of x–t'],['v','a','slope of v–t']], 'Position, velocity and acceleration are linked by rates of change.')),

    'Laws of Motion': foundation('Laws of Motion',
      ['A force is a push or pull caused by an interaction. Motion does not require a force; change in motion does.', 'Mass measures resistance to acceleration. The same force accelerates a smaller mass more.', 'Always study one chosen object at a time and draw only forces acting on that object.'],
      words(['inertia', 'tendency to keep the same velocity'], ['free-body diagram', 'a sketch showing one object and every force on it'], ['friction', 'contact force opposing slipping or attempted slipping']),
      'A 2 kg box has a net horizontal force of 6 N. Find its acceleration.',
      ['Choose the box as the system.', 'Use net F = ma.', 'Rearrange a = F/m = 6/2.'], 'a = 3 m/s² in the net-force direction.',
      visual('flow', [['interact','interaction'],['force','force on object'],['net','add force arrows'],['motion','acceleration']], [['interact','force'],['force','net'],['net','motion','Fnet = ma']], 'Do not start with a formula; first identify the object and the real interactions.')),

    'Work, Energy and Power': foundation('Work, Energy and Power',
      ['Energy is the ability of a system to produce change. It can move between stores without disappearing.', 'Work is energy transferred by a force through a displacement.', 'Power says how quickly energy is transferred, not how much energy exists.'],
      words(['kinetic energy', 'energy of motion'], ['potential energy', 'stored energy due to arrangement or position'], ['conservative force', 'force whose work depends only on start and finish']),
      'A 4 N force pushes a box 3 m in the same direction. Find the work.',
      ['Force and displacement point together, so cos 0° = 1.', 'Use W = Fs cos θ.', 'Multiply 4 × 3 × 1.'], 'W = 12 J.',
      visual('flow', [['store1','initial energy'],['work','work transfers energy'],['store2','final energy'],['loss','thermal/sound']], [['store1','work'],['work','store2'],['work','loss']], 'An energy diagram prevents “lost” energy from silently disappearing.')),

    'Rotational Motion': foundation('Rotational Motion',
      ['Straight motion uses position, velocity and acceleration. Rotation uses angle, angular velocity and angular acceleration.', 'A force turns an object best when applied far from the axis and sideways to the lever arm.', 'Mass distribution matters: mass farther from the axis is harder to spin.'],
      words(['torque τ', 'turning effect of a force'], ['moment of inertia I', 'rotational resistance set by mass and its distance from the axis'], ['centre of mass', 'balance point for the object’s mass']),
      'A 5 N force acts perpendicular to a spanner 0.2 m from the bolt. Find torque.',
      ['The force is perpendicular, so sin 90° = 1.', 'Use τ = rF sin θ.', 'Multiply 0.2 × 5.'], 'τ = 1 N·m.',
      visual('compare', [['x','position x'],['v','velocity v'],['F','force F'],['th','angle θ'],['om','angular speed ω'],['tau','torque τ']], [['x','th','translation ↔ rotation'],['v','om'],['F','tau']], 'Rotational ideas become easier when paired with their straight-motion partners.')),

    'Gravitation': foundation('Gravitation',
      ['Every mass attracts every other mass. The attraction grows with mass and weakens with distance.', 'Weight is the gravitational force on an object; mass is the amount of matter and does not vanish in orbit.', 'For planets and satellites, distance r is measured from the centre, not from the surface.'],
      words(['gravitational field g', 'force per kilogram at a point'], ['potential V', 'gravitational energy per kilogram'], ['escape speed', 'minimum launch speed to reach infinitely far with no speed left']),
      'If distance from a planet’s centre doubles, what happens to gravitational force?',
      ['Gravity follows 1/r².', 'Replacing r by 2r makes the denominator (2r)² = 4r².', 'The force becomes one quarter.'], 'The force is F/4.',
      visual('flow', [['mass','mass M'],['field','creates field g'],['object','another mass m'],['force','feels force mg']], [['mass','field'],['field','object'],['object','force']], 'Separate the source, its field, and the force on the visiting mass.')),

    'Properties of Solids and Liquids': foundation('Properties of Solids and Liquids',
      ['Solids can change shape; fluids can flow. Both push back when forces act on them.', 'Pressure is force spread over area. The same force on a smaller area creates more pressure.', 'Density compares mass with volume: ρ = m/V.'],
      words(['stress', 'internal force per area in a solid'], ['strain', 'fractional change in shape or size'], ['viscosity', 'a fluid’s resistance to layers sliding past one another']),
      'A force of 20 N acts normally on area 4 m². Find pressure.',
      ['Use P = F/A.', 'Put F = 20 N and A = 4 m².', 'Divide.'], 'P = 5 Pa.',
      visual('compare', [['solid','solid: deforms'],['static','fluid at rest: pressure'],['flow','moving fluid: speed + pressure'],['visc','real fluid: loses energy']], [['solid','static'],['static','flow'],['flow','visc']], 'First identify which kind of material behaviour the question is describing.')),

    'Thermodynamics': foundation('Thermodynamics',
      ['Temperature tells the thermal state; heat is energy transferred because of a temperature difference.', 'A system is the part we study. Everything else is its surroundings.', 'Internal energy is microscopic energy stored in the system. Work and heat are ways that energy crosses its boundary.'],
      words(['state variable', 'quantity fixed by the present state, such as P, V or T'], ['process', 'the path used to move between states'], ['adiabatic', 'a process with no heat transfer']),
      'A gas receives 50 J of heat and does 20 J of work. Find its internal-energy change.',
      ['Use ΔQ = ΔU + Wby.', 'Rearrange ΔU = ΔQ − Wby.', 'Substitute 50 − 20.'], 'ΔU = +30 J.',
      visual('flow', [['heat','heat enters Q'],['system','internal energy U'],['work','gas does work W']], [['heat','system'],['system','work']], 'Energy entering as heat either stays as internal energy or leaves as work.')),

    'Kinetic Theory of Gases': foundation('Kinetic Theory of Gases',
      ['A gas contains an enormous number of particles moving randomly.', 'Pressure comes from particle collisions with the container walls.', 'Absolute temperature in kelvin is linked with average molecular kinetic energy.'],
      words(['ideal gas', 'a model of tiny particles with negligible size and elastic collisions'], ['rms speed', 'a useful average based on squared molecular speeds'], ['degree of freedom', 'one independent way a molecule can store energy']),
      'The kelvin temperature of an ideal gas becomes four times larger. What happens to rms speed?',
      ['Use vrms ∝ √T.', 'Replace T by 4T.', '√4 = 2.'], 'The rms speed doubles.',
      visual('flow', [['motion','random molecular motion'],['hit','wall collisions'],['pressure','pressure'],['temp','faster motion ↔ higher T']], [['motion','hit'],['hit','pressure'],['temp','motion']], 'Kinetic theory connects invisible molecular motion to visible pressure and temperature.')),

    'Oscillations and Waves': foundation('Oscillations and Waves',
      ['A stable equilibrium is a resting position that pulls an object back after a small disturbance.', 'An oscillation repeats around equilibrium. Its amplitude is the greatest distance from equilibrium.', 'A wave lets neighbouring parts repeat an oscillation, passing energy onward.'],
      words(['simple harmonic motion', 'oscillation with acceleration proportional and opposite to displacement'], ['phase', 'where an oscillator is in its cycle'], ['resonance', 'large response when driving frequency matches natural frequency']),
      'In SHM, a particle is at x = +A. What are its velocity and acceleration directions?',
      ['At the turning point it pauses, so velocity is zero.', 'Acceleration obeys a = −ω²x.', 'Positive displacement gives negative acceleration, toward equilibrium.'], 'v = 0; acceleration points toward equilibrium.',
      visual('cycle', [['centre','equilibrium'],['right','right turning point'],['centre2','equilibrium'],['left','left turning point']], [['centre','right'],['right','centre2'],['centre2','left'],['left','centre']], 'The object repeatedly trades kinetic and potential energy as it moves through equilibrium.')),

    'Electrostatics': null,
    'Magnetic Effects of Current and Magnetism': null,
    'Electromagnetic Induction and Alternating Currents': null,
    'Optics': null,
    'Dual Nature of Matter and Radiation': null,
    'Atoms and Nuclei': null,
    'Electronic Devices': null,
    'Experimental Skills': foundation('Experimental Skills',
      ['An experiment asks a precise question by changing one quantity and observing another.', 'A fair test holds other important quantities steady.', 'Repeated readings reveal scatter; a graph helps the overall relationship stand out.'],
      words(['independent variable', 'quantity deliberately changed'], ['dependent variable', 'quantity measured in response'], ['uncertainty', 'honest numerical range around a measurement']),
      'Five pendulum times are 2.0, 2.1, 1.9, 2.0 and 2.0 s. Find the mean.',
      ['Add the readings: 10.0 s.', 'Divide by 5 readings.', 'Keep precision supported by the data.'], 'Mean time = 2.0 s.',
      visual('cycle', [['question','ask'],['plan','control + measure'],['data','repeat + record'],['graph','graph + conclude']], [['question','plan'],['plan','data'],['data','graph'],['graph','question']], 'Good experiments form a cycle: the evidence may lead to a better question.'))
  };

  F.Electrostatics = foundation('Electrostatics',
    ['Positive and negative charges attract or repel. A charge creates an electric field around it.', 'Force and field need arrows; electric potential and energy are numbers that can be added without directions.', 'A conductor contains mobile charges. At electrostatic equilibrium they have stopped rearranging.'],
    words(['field', 'force per coulomb'], ['potential', 'energy per coulomb'], ['capacitance', 'charge stored per volt']),
    'Two equal positive charges sit symmetrically around the midpoint. What is the electric field at the midpoint?',
    ['Each charge creates a field of equal size.', 'The two arrows point in opposite directions.', 'Equal opposite vectors cancel.'], 'The net electric field is zero, though potential is not zero.',
    visual('flow', [['charge','charge'],['field','field + force'],['potential','potential + energy'],['cap','capacitor storage']], [['charge','field'],['field','potential','same interaction'],['potential','cap']], 'Electrostatics offers two languages: arrows for forces and scalar energy for movement.'));

  F['Magnetic Effects of Current and Magnetism'] = foundation('Magnetic Effects of Current and Magnetism',
    ['Moving charge is current, and current creates a magnetic field.', 'A magnetic field can turn a moving charge because its force is sideways to velocity.', 'A current loop has a magnetic moment and behaves like a small bar magnet.'],
    words(['Lorentz force', 'sideways force on moving charge'], ['Biot–Savart law', 'rule for adding field from current pieces'], ['magnetic dipole', 'a current loop or magnet represented by a direction arrow']),
    'A positive charge moves parallel to a magnetic field. Find its magnetic force.',
    ['Use F = qvB sin θ.', 'Parallel vectors have θ = 0°.', 'sin 0° = 0.'], 'The magnetic force is zero.',
    visual('flow', [['current','moving charge/current'],['B','creates B'],['force','B acts on moving charge'],['turn','path turns / loop twists']], [['current','B'],['B','force'],['force','turn']], 'Current makes magnetic field; magnetic field then steers current or magnetic moments.'));

  F['Electromagnetic Induction and Alternating Currents'] = foundation('Electromagnetic Induction and Alternating Currents',
    ['Magnetic flux counts field through a loop. Only a change in flux produces induced emf.', 'Alternating current reverses and is described by repeating sine waves.', 'Inductors and capacitors store and return energy, so voltage and current can peak at different times.'],
    words(['flux linkage', 'flux multiplied by number of turns'], ['reactance', 'AC opposition from L or C'], ['resonance', 'frequency where inductive and capacitive reactance cancel']),
    'In a series RLC circuit, XL = 8 Ω and XC = 8 Ω. What is the net reactance?',
    ['Inductive and capacitive effects point in opposite phasor directions.', 'Use X = XL − XC.', 'Subtract 8 − 8.'], 'Net reactance is 0 Ω; the circuit is at resonance.',
    visual('flow', [['flux','changing flux'],['emf','alternating emf'],['RLC','RLC response'],['res','resonance']], [['flux','emf'],['emf','RLC'],['RLC','res']], 'The unit moves from making AC by flux change to controlling AC with R, L and C.'));

  F.Optics = foundation('Optics',
    ['Use rays when tracing images through mirrors and lenses.', 'Use waves when explaining interference, diffraction or polarization.', 'Both models describe light; the useful model depends on the size and question.'],
    words(['refraction', 'bending caused by a speed change'], ['phase difference', 'how far two wave cycles are out of step'], ['polarization', 'selecting one transverse vibration direction']),
    'A question asks about bright and dark fringes from two slits. Which model should you choose?',
    ['Fringes come from two light contributions adding.', 'Adding depends on their phase difference.', 'Phase is a wave idea.'], 'Use the wave model and interference conditions.',
    visual('compare', [['ray','ray model'],['image','mirrors, lenses, instruments'],['wave','wave model'],['pattern','interference, diffraction, polarization']], [['ray','image'],['wave','pattern']], 'First choose ray or wave language; then the correct tools become obvious.'));

  F['Dual Nature of Matter and Radiation'] = { ...F['Dual Nature of Radiation and Matter'], title: 'Dual Nature of Matter and Radiation' };
  F['Atoms and Nuclei'] = foundation('Atoms and Nuclei',
    ['Atoms have quantized electron energy levels around a tiny nucleus.', 'The nucleus itself contains protons and neutrons bound by nuclear interaction.', 'Both atomic photons and nuclear energy come from differences between initial and final energy states.'],
    words(['quantized', 'restricted to certain allowed values'], ['mass defect', 'bound nucleus mass missing compared with separate nucleons'], ['Q-value', 'energy released or absorbed in a nuclear reaction']),
    'A transition releases 2 eV. Is this more naturally atomic or nuclear in scale?',
    ['Atomic transitions commonly use electron-volts.', 'Nuclear changes are commonly millions of eV (MeV).', 'Compare the scale before choosing formulas.'], 'It is naturally an atomic-scale transition.',
    visual('compare', [['atom','electron levels: eV'],['photon','atomic photons'],['nucleus','binding: MeV'],['reaction','decay/fission/fusion']], [['atom','photon'],['nucleus','reaction']], 'Atomic and nuclear changes both use energy differences, but their structures and scales differ.'));
  F['Electronic Devices'] = { ...F['Semiconductor Electronics: Materials, Devices and Simple Circuits'], title: 'Electronic Devices' };

  const school = [
    ['book-g12-physics-1-1','Electric Charges and Fields','sy-p3-phys-1'],
    ['book-g12-physics-1-2','Electrostatic Potential and Capacitance','sy-p3-phys-2'],
    ['book-g12-physics-1-3','Current Electricity','sy-p3-phys-3'],
    ['book-g12-physics-1-4','Moving Charges and Magnetism','sy-p3-phys-4'],
    ['book-g12-physics-1-5','Magnetism and Matter','sy-p3-phys-5'],
    ['book-g12-physics-1-6','Electromagnetic Induction','sy-p3-phys-6'],
    ['book-g12-physics-1-7','Alternating Current','sy-p3-phys-7'],
    ['book-g12-physics-1-8','Electromagnetic Waves','sy-p3-phys-8'],
    ['book-g12-physics-2-1','Ray Optics and Optical Instruments','sy-p3-phys-9'],
    ['book-g12-physics-2-2','Wave Optics','sy-p3-phys-10'],
    ['book-g12-physics-2-3','Dual Nature of Radiation and Matter','sy-p3-phys-11'],
    ['book-g12-physics-2-4','Atoms','sy-p3-phys-12'],
    ['book-g12-physics-2-5','Nuclei','sy-p3-phys-13'],
    ['book-g12-physics-2-6','Semiconductor Electronics: Materials, Devices and Simple Circuits','sy-p3-phys-14']
  ];
  const jee = ['Units and Measurements','Kinematics','Laws of Motion','Work, Energy and Power','Rotational Motion','Gravitation','Properties of Solids and Liquids','Thermodynamics','Kinetic Theory of Gases','Oscillations and Waves','Electrostatics','Current Electricity','Magnetic Effects of Current and Magnetism','Electromagnetic Induction and Alternating Currents','Electromagnetic Waves','Optics','Dual Nature of Matter and Radiation','Atoms and Nuclei','Electronic Devices','Experimental Skills'].map((title, index) => [`jee-phys-${index + 1}`, title]);
  const normalized = title => `physics--${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  const install = (target, records) => records.forEach(([id, title, syllabusId]) => {
    const value = { ...F[title], id };
    target[id] = value;
    target[`Physics::${title}`] = value;
    target[normalized(title)] = value;
    root[id] = value;
    root[`Physics::${title}`] = value;
    root[normalized(title)] = value;
    if (syllabusId) {
      target[syllabusId] = { ...value, id: syllabusId };
      root[syllabusId] = target[syllabusId];
    }
  });

  install(root.school, school);
  install(root.jee, jee);
}());
