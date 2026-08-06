(function () {
  'use strict';
  const HM = window.HM = window.HM || {};
  const root = HM.geniusContent = HM.geniusContent || {};
  root.school = root.school || {};
  root.jee = root.jee || {};

  const concept = value => { const [title, explain, visual] = value.split('|'); return { title, explain, visual }; };
  const make = (insight, whyItMatters, concepts, mustKnow, problem, steps, answer, check, examTips, traps, memoryHook, guidedQuestions) => ({
    insight, whyItMatters, concepts: concepts.map(concept), mustKnow,
    worked: { problem, steps, answer, check }, examTips, traps, memoryHook,
    guidedQuestions: guidedQuestions.map(([question, answer, explanation]) => ({ question, answer, explanation }))
  });
  const S = {};
  const put = (title, ...data) => { S[title] = make(...data); };

  put('Electric Charges and Fields',
    'A field is the local instruction space gives a test charge; symmetry decides which instructions can survive.',
    'This viewpoint turns Coulomb-law sums, Gauss-law proofs and conductor questions into one coherent model.',
    ['Superposition|Electric fields add vectorially because each source acts independently.|Draw arrows tip-to-tail; cancel symmetric components first.', 'Electric flux|Flux counts the signed normal component crossing a surface, not field lines literally.|Picture tiny area arrows and project E onto each normal.', 'Gauss law|Closed-surface flux equals enclosed charge divided by ε₀; outside charge contributes zero net flux.|Wrap a symmetric Gaussian sphere, cylinder or pillbox around charge.'],
    ['E=kq/r² r̂ and F=qE', 'Φ=∮E·dA; only enclosed charge enters Qenc', 'Inside an electrostatic conductor E=0 and excess charge lies on its surface', 'Field jumps by σ/ε₀ across a charged sheet'],
    'Find the field 0.30 m from a +2 μC point charge.', ['Use E=kq/r².', 'Substitute 9×10⁹×2×10⁻⁶/(0.30)².', 'Direction is radially outward for positive charge.'], '2.0×10⁵ N C⁻¹ outward.', 'E units are N/C and doubling r would quarter the answer.',
    ['Exploit symmetry before integrating.', 'Show the Gaussian surface and state why E is constant on it.', 'Carry charge signs into vector direction, not merely magnitude.'],
    ['Using Gauss law to find E where symmetry is insufficient.', 'Counting an external charge in Qenc.', 'Treating flux as zero whenever enclosed charge is zero, even though local E may be nonzero.'],
    'Source → field; test charge → force. Never mix the creator with the probe.',
    [['Can a closed surface have zero flux but nonzero field?', 'Yes.', 'External charges or equal positive and negative enclosed charges can give zero net flux while E remains nonzero locally.'], ['Why is the conductor interior field zero?', 'Free charges rearrange until internal force vanishes.', 'Any residual field would keep moving charges, contradicting electrostatic equilibrium.']]);

  put('Electrostatic Potential and Capacitance',
    'Potential stores the geometry of an electric field as scalar energy per charge; capacitance stores separated charge per volt.',
    'Scalar potential simplifies many-source problems and reveals energy, equipotentials and dielectric effects.',
    ['Potential difference|ΔV is negative work done by the field per unit charge.|Walk across equipotential contours; E points downhill.', 'Field-potential link|E is the negative spatial slope of V.|A steep V-versus-x graph means a strong opposite-directed field.', 'Capacitor energy|A capacitor separates ±Q; energy resides in its electric field.|See parallel plates with field-filled space between them.'],
    ['V=kq/r and E=−∇V', 'C=Q/V; parallel plates C=εA/d', 'U=½CV²=Q²/2C=½QV', 'Battery connected fixes V; isolated capacitor fixes Q'],
    'A 4 μF capacitor at 12 V is disconnected, then its plate spacing doubles. Find new voltage.', ['Initially Q=CV=48 μC.', 'Doubling d halves C to 2 μF.', 'Disconnected means Q stays fixed, so V=Q/C.'], '24 V.', 'Energy rises because mechanical work separates attracting plates.',
    ['Mark whether Q or V is constrained before changing geometry.', 'Use scalar addition for potentials.', 'Derive series/parallel results from common Q or common V.'],
    ['Assuming potential is a vector.', 'Using C=εA/d after inserting dielectric without the correct εr.', 'Keeping both Q and V fixed after disconnecting the battery.'],
    'Connected: voltage clamped. Disconnected: charge trapped.',
    [['Why is E perpendicular to an equipotential?', 'A tangential E would do work along it.', 'That would change V, contradicting equipotentiality.'], ['Does zero potential imply zero field?', 'No.', 'Potential may cross the chosen zero while its spatial gradient remains nonzero.']]);

  put('Current Electricity',
    'Circuit solving is conservation of charge at junctions plus conservation of energy around loops.',
    'It prevents formula guessing and connects microscopic drift with measurable resistance and power.',
    ['Drift current|An electric field gives carriers a tiny net drift atop random thermal motion.|Picture random zigzags with a small average arrow.', 'Resistance|Collisions convert ordered electrical energy into heat; R=ρL/A.|A long narrow wire is a crowded corridor.', 'Kirchhoff laws|Junction rule conserves charge; loop rule conserves energy.|Label branch currents, then walk one closed loop.'],
    ['I=neAvd', 'V=IR for ohmic conditions; R=ρL/A', 'ΣIin=ΣIout and ΣΔVloop=0', 'P=VI=I²R=V²/R'],
    'A 6 Ω and 3 Ω resistor are parallel across 12 V. Find total current.', ['Branch currents are 12/6=2 A and 12/3=4 A.', 'Junction rule adds them.', 'Equivalent resistance check: 2 Ω.'], '6 A.', '12 V/2 Ω=6 A and total power is 72 W.',
    ['Choose current directions freely; a negative result corrects you.', 'Include internal resistance when terminal voltage is requested.', 'Check equivalent R lies below the smallest parallel resistor.'],
    ['Adding parallel resistances directly.', 'Changing current through a series junction.', 'Confusing emf with terminal voltage under load.'],
    'Junctions conserve charge; loops conserve joules.',
    [['Why does a bulb light almost immediately if drift is slow?', 'The electric field establishes through the circuit rapidly.', 'Energy transfer is by the field, not one electron travelling from switch to bulb.'], ['When is terminal voltage less than emf?', 'While the cell supplies current.', 'Internal drop Ir makes V=ε−Ir.']]);

  put('Moving Charges and Magnetism',
    'Magnetic force bends moving charge without changing its speed; currents create magnetic fields that act on other currents.',
    'Direction discipline unifies particle paths, selectors, cyclotrons and force between wires.',
    ['Lorentz force|F=q(v×B); it is perpendicular to velocity and magnetic field.|Use a right-hand triad, then reverse for negative q.', 'Circular motion|Perpendicular magnetic force supplies centripetal force.|Draw v tangent and magnetic force toward circle centre.', 'Field from current|Biot–Savart adds current-element contributions; Ampère exploits symmetry.|Curl fingers around a straight current.'],
    ['F=q(E+v×B)', 'r=mv/(|q|B), T=2πm/(|q|B)', 'Bwire=μ₀I/(2πr)', 'F/L=μ₀I₁I₂/(2πd)'],
    'A proton enters 0.50 T perpendicular to B at 2×10⁶ m/s. Find orbit radius.', ['Set qvB=mv²/r.', 'Use r=mv/qB.', 'Insert mp=1.67×10⁻²⁷ kg and q=1.6×10⁻¹⁹ C.'], '4.18 cm.', 'Radius scales with momentum and inversely with B.',
    ['Draw v, B and F before algebra.', 'State whether velocity is perpendicular or has a parallel component.', 'Use conventional current direction in field rules.'],
    ['Giving magnetic force a component along v.', 'Forgetting to reverse force for an electron.', 'Using r=mv/qB when v is not the perpendicular component.'],
    'Magnetism steers; electricity can speed up.',
    [['Can a static magnetic field increase kinetic energy?', 'No.', 'F·v=0, so magnetic work is zero.'], ['What path results when v has parallel and perpendicular components?', 'A helix.', 'The parallel component remains uniform while the perpendicular component circles.']]);

  put('Magnetism and Matter',
    'A magnet is best modelled as a dipole: its torque, energy and material response all depend on alignment with B.',
    'This connects bar magnets, current loops, Earth magnetism and dia/para/ferromagnetic behaviour.',
    ['Magnetic dipole|A loop has moment m=IA n̂ and responds to external B.|Draw a loop normal pointing by right-hand curl.', 'Torque and energy|τ=m×B rotates toward lower U=−m·B.|Imagine a compass needle settling along B.', 'Magnetic materials|Domains or induced moments determine susceptibility.|Show domains random, partially aligned, or strongly locked.'],
    ['τ=mB sinθ and U=−mB cosθ', 'Bar magnet field resembles a current-loop dipole field', 'Diamagnetic χ<0, paramagnetic χ>0 small, ferromagnetic χ≫0', 'No isolated magnetic monopole appears in Gauss law for B'],
    'A 0.20 A, 50-turn loop of area 0.01 m² is at 30° to a 0.40 T field; find torque.', ['m=NIA=50×0.20×0.01=0.10 A m².', 'Use τ=mB sin30°.', 'Multiply 0.10×0.40×0.5.'], '0.020 N m.', 'Maximum possible torque is mB=0.040 N m, so the result is plausible.',
    ['Clarify whether θ is with the loop normal or plane.', 'Use domain language for ferromagnets.', 'Separate geographic and magnetic meridians in Earth-field questions.'],
    ['Using area vector in the loop plane.', 'Calling diamagnetism weak attraction.', 'Assuming torque exists when m is parallel or antiparallel to B.'],
    'A dipole wants its moment arrow to lie along the field arrow.',
    [['At θ=180°, is torque zero despite unstable equilibrium?', 'Yes.', 'The cross product vanishes, but a tiny displacement produces torque away from that maximum-energy state.'], ['Why are magnetic field lines closed?', 'There are no observed magnetic monopoles.', 'Flux leaving one pole returns through the magnet to the other.']]);

  put('Electromagnetic Induction',
    'Induction responds to changing flux, and Lenz’s law makes the response oppose the change—not necessarily the field.',
    'That single distinction solves motional emf, generators, inductors and energy-conservation questions.',
    ['Flux linkage|NΦ=N∫B·dA measures field threading all turns.|Rotate an area vector through a fixed B.', 'Faraday–Lenz law|ε=−d(NΦ)/dt; the minus sign is the induced direction.|Mark increasing flux, then draw an opposing induced field.', 'Inductance|Changing current creates a back emf and stores magnetic energy.|A coil resists current change like inertia resists velocity change.'],
    ['ε=−N dΦ/dt', 'Motional emf Blv for mutually perpendicular B,l,v', 'εL=−L di/dt', 'UL=½LI²'],
    'A 0.50 m rod moves at 4 m/s perpendicular to 0.30 T. Find motional emf.', ['Charges feel q(v×B).', 'Separation continues until electric and magnetic forces balance.', 'Use ε=Blv.'], '0.60 V.', 'Units T·m²/s equal volts.',
    ['State what changes: B, area or orientation.', 'Use Lenz’s law only after determining flux change.', 'Check induced force opposes the supplied mechanical motion.'],
    ['Opposing the original B instead of its change.', 'Ignoring N turns.', 'Applying Blv without perpendicular geometry.'],
    'Nature charges an energy bill for every attempted flux change.',
    [['Can flux be zero while induced emf is nonzero?', 'Yes.', 'At the instant a rotating coil crosses zero flux, its rate of change can be maximum.'], ['Why does the rod feel drag?', 'The induced current’s magnetic force opposes motion.', 'Mechanical work becomes electrical/thermal energy.']]);

  put('Alternating Current',
    'AC components differ by how they exchange energy: R dissipates, while L and C store and return it with opposite phase shifts.',
    'Phasors then turn differential behaviour into geometry and expose resonance and power factor.',
    ['RMS value|RMS is the DC value producing equal average heating.|Imagine squaring a sine wave before averaging.', 'Reactance and phase|XL=ωL; XC=1/(ωC); voltage leads in L and lags in C.|Draw VR along I, VL up and VC down.', 'Resonance|At XL=XC, reactive effects cancel and series current peaks.|Phasor vertical arrows cancel, leaving only VR.'],
    ['Vrms=V₀/√2 and Irms=I₀/√2', 'Z=√(R²+(XL−XC)²)', 'ω₀=1/√(LC)', 'Pavg=Vrms Irms cosφ'],
    'For R=30 Ω, XL=50 Ω, XC=10 Ω at 120 V rms, find current.', ['Net reactance is 40 Ω inductive.', 'Z=√(30²+40²)=50 Ω.', 'I=V/Z.'], '2.4 A, lagging voltage.', 'Power factor is R/Z=0.6; real power is 172.8 W.',
    ['Start every series RLC problem with a phasor triangle.', 'Use rms values in power calculations.', 'At resonance state both impedance and phase.'],
    ['Adding reactances instead of subtracting.', 'Using peak voltage with rms current.', 'Saying an ideal inductor consumes average power.'],
    'ELI: voltage leads current in L; ICE: current leads voltage in C.',
    [['Why is average power zero in a pure inductor?', 'Energy borrowed in one quarter-cycle is returned later.', 'Voltage and current are 90° out of phase, so cosφ=0.'], ['What happens to series current at resonance?', 'It is maximum.', 'Net reactance vanishes, leaving minimum impedance R.']]);

  put('Electromagnetic Waves',
    'A changing electric field creates magnetic field and a changing magnetic field creates electric field, allowing a self-propagating transverse wave.',
    'This explains propagation through vacuum, the spectrum and energy transport without treating bands as disconnected facts.',
    ['Displacement current|Changing electric flux completes Ampère’s law even across a capacitor gap.|Picture E growing between plates and circular B around it.', 'Wave geometry|E, B and propagation are mutually perpendicular and in phase.|Use a right-handed E×B triad.', 'Spectrum|All bands share c in vacuum; frequency sets photon energy and wavelength.|Arrange radio to gamma as λ falls and f rises.'],
    ['c=1/√(μ₀ε₀)=νλ', 'E₀/B₀=c in vacuum', 'Propagation direction is E×B', 'Energy flux is the Poynting vector'],
    'Find the wavelength of a 100 MHz radio wave in vacuum.', ['Convert f=100×10⁶ Hz.', 'Use λ=c/f.', 'Divide 3×10⁸ by 10⁸.'], '3.0 m.', 'Higher frequency must mean shorter wavelength at fixed c.',
    ['Use one spectrum anchor then scale, rather than memorising every boundary.', 'Draw E, B and travel direction.', 'Distinguish wave intensity from photon energy.'],
    ['Claiming E and B are out of phase.', 'Changing wave speed in vacuum with frequency.', 'Calling electromagnetic waves longitudinal.'],
    'E makes B, B makes E, and E×B points forward.',
    [['Why can EM waves cross vacuum?', 'They need no material oscillators.', 'The coupled changing fields sustain each other.'], ['Which has greater photon energy, UV or IR?', 'UV.', 'Photon energy hf increases with frequency.']]);

  const q = (title, insight, why, cs, know, prob, steps, ans, check, tips, traps, hook, qs) => put(title, insight, why, cs, know, prob, steps, ans, check, tips, traps, hook, qs);
  q('Ray Optics', 'Every ray diagram is geometry constrained by Fermat’s least-time principle; signs merely encode that geometry.', 'It makes mirrors, lenses, prisms and instruments predictable instead of a formula list.',
    ['Refraction|Snell’s law preserves the tangential wave-vector component.|Bend toward the normal on entering higher n.', 'Imaging|Principal rays locate where a wavefront converges or appears to diverge.|Draw two rays from one object tip.', 'Optical instruments|Lens combinations trade field of view, magnification and final-image position.|Trace objective image before eyepiece action.'],
    ['n₁sin i=n₂sin r and n=c/v', 'Mirror: 1/f=1/v+1/u; lens: 1/f=1/v−1/u under Cartesian signs', 'Lens power P=1/f(m); powers add for thin contacting lenses', 'TIR requires denser-to-rarer travel and i>ic'],
    'A convex lens of f=20 cm views an object 30 cm in front. Locate the image.', ['Use u=−30 cm, f=+20 cm.', '1/v=1/f+1/u=1/20−1/30=1/60.', 'Positive v means a real image on the far side.'], 'v=+60 cm; magnification v/u=−2.', 'A real inverted enlarged image beyond 2F matches the ray diagram.',
    ['Draw the image before trusting signs.', 'State TIR conditions together.', 'For instruments, identify the intermediate image.'], ['Mixing mirror and lens sign equations.', 'Using apparent depth without near-normal viewing.', 'Adding focal lengths instead of powers.'],
    'Draw first, sign second, calculate third.', [['Why does a ray bend toward the normal in glass?', 'Its speed decreases.', 'Phase continuity at the boundary produces Snell’s law.'], ['Can a virtual image be photographed?', 'Yes, if another optical system forms it on a sensor.', 'Virtual only describes ray convergence at that stage.']]);

  q('Wave Optics', 'Interference reveals phase; diffraction reveals finite aperture; polarization reveals transverse direction.', 'These three ideas distinguish wave optics from ray construction and control resolution.',
    ['Coherence|Stable phase difference produces a stable interference pattern.|Overlay two synchronized ripples.', 'YDSE|Path difference selects bright or dark fringes.|Draw two sources to one screen point.', 'Diffraction|Every aperture point radiates; their superposition spreads the beam.|A narrower slit gives a wider central maximum.'],
    ['Bright Δ=nλ; dark Δ=(n+½)λ', 'YDSE fringe width β=λD/d', 'Single-slit central width=2λD/a', 'Malus law I=I₀cos²θ'],
    'In YDSE, λ=600 nm, D=2 m and d=0.50 mm. Find fringe width.', ['Use β=λD/d.', 'Convert all lengths to metres.', 'Compute 600×10⁻⁹×2/(0.5×10⁻³).'], '2.4 mm.', 'Increasing slit separation would shrink this spacing.',
    ['Translate phase questions into path difference.', 'Separate interference fringe width from diffraction central width.', 'Use polarization as evidence of transverse waves.'], ['Using d/λ instead of λD/d.', 'Calling incoherent sources dark everywhere.', 'Forgetting the diffraction central maximum is twice adjacent width.'],
    'Interference measures path; diffraction measures aperture.', [['Why are two ordinary bulbs not coherent?', 'Their phase difference fluctuates randomly.', 'Independent atomic emissions cannot sustain stationary fringes.'], ['What happens when slit width halves?', 'The diffraction central maximum doubles in width.', 'Angular spread is proportional to λ/a.']]);

  q('Dual Nature of Radiation and Matter', 'Quanta exchange energy and momentum in indivisible events, while probability amplitudes propagate as waves.', 'This resolves photoelectric observations and gives particles a measurable de Broglie wavelength.',
    ['Photoelectric effect|One photon transfers hf to one electron; intensity changes count, not packet energy.|Plot stopping potential versus frequency.', 'Photon momentum|Light carries p=h/λ despite zero rest mass.|Picture a photon transferring recoil.', 'Matter waves|A particle of momentum p has λ=h/p.|Faster electrons have tighter wave spacing.'],
    ['Kmax=hf−φ=eVstop', 'Threshold frequency f₀=φ/h', 'Photon p=h/λ=E/c', 'de Broglie λ=h/p'],
    'A metal has work function 2.0 eV and receives 3.5 eV photons. Find stopping potential.', ['Energy conservation gives Kmax=3.5−2.0 eV.', 'Kmax=eVstop.', 'Numerically eV maps directly to volts for one electron.'], '1.5 V.', 'It is independent of intensity above threshold.',
    ['Use photon energy for stopping potential and intensity for current.', 'Check threshold before calculating emission.', 'For accelerated electrons use p=√(2meV) when nonrelativistic.'], ['Increasing intensity to overcome sub-threshold frequency.', 'Using wave speed as particle speed.', 'Confusing stopping potential with accelerating voltage.'],
    'Frequency pays each electron; intensity counts how many are paid.', [['Why is emission immediate?', 'A single photon transfers energy in one event.', 'No gradual classical energy accumulation is needed.'], ['Does brighter light raise Kmax?', 'Not at fixed frequency.', 'It supplies more photons and hence more emitted electrons.']]);

  q('Atoms', 'Atomic spectra are energy-level fingerprints: transitions, not orbits themselves, emit photons.', 'The model converts spectral lines into quantized energy differences and atomic size.',
    ['Rutherford scattering|Rare large deflections reveal a tiny dense positive nucleus.|Most α tracks pass straight; a few turn sharply.', 'Bohr quantization|Allowed hydrogen states have discrete radius and energy.|Draw nested levels rather than literal planetary paths.', 'Spectrum|A transition emits or absorbs hf=|ΔE|.|An arrow between levels maps to one spectral line.'],
    ['En=−13.6Z²/n² eV', 'rn=a₀n²/Z', '1/λ=RZ²(1/nf²−1/ni²) for emission ni>nf', 'Angular momentum nh/2π in Bohr model'],
    'Find photon energy for hydrogen transition n=3 to n=2.', ['E3=−13.6/9 eV; E2=−13.6/4 eV.', 'Photon energy is E3−E2.', 'Subtract −1.51−(−3.40).'], '1.89 eV.', 'Balmer transition ends at n=2, so visible range is plausible.',
    ['Draw an energy ladder with negative energies.', 'Use initial minus final energy for emission magnitude.', 'Apply Bohr formulas only to hydrogen-like species.'], ['Treating bound-state energy as positive.', 'Using nf−ni instead of energy difference.', 'Applying Bohr radii to multi-electron atoms unchanged.'],
    'Levels are addresses; spectral photons are the fare between them.', [['Why is ground-state energy negative?', 'Energy must be supplied to free the electron.', 'Zero is defined for electron and nucleus infinitely separated.'], ['What does a line spectrum prove?', 'Only discrete energy changes occur.', 'Each wavelength corresponds to a fixed ΔE.']]);

  q('Nuclei', 'Nuclear stability is an energy accounting problem: mass deficit appears as binding energy, while decay moves nuclei toward more stable arrangements.', 'It connects radioactivity, fission, fusion and energy release without memorising reactions blindly.',
    ['Binding energy|A bound nucleus weighs less than separated nucleons by Δm.|Plot binding energy per nucleon peaking near iron.', 'Radioactive decay|Each nucleus has constant decay probability; populations fall exponentially.|Equal half-lives remove equal fractions, not equal counts.', 'Reactions|Charge and nucleon number balance while Q-value measures mass-energy change.|Balance A and Z on both sides.'],
    ['BE=Δmc² and 1 u=931.5 MeV/c²', 'N=N₀e⁻λt; T½=ln2/λ', 'Activity A=λN', 'Q=(minitial−mfinal)c²'],
    'A sample has half-life 6 h. What fraction remains after 18 h?', ['18 h is three half-lives.', 'Remaining fraction=(1/2)³.', 'Evaluate.'], '1/8 or 12.5%.', 'Three halvings: 100→50→25→12.5%.',
    ['Balance A and Z before calculating Q.', 'Use fractions for repeated half-lives.', 'Compare binding energy per nucleon, not total binding energy, for stability.'], ['Assuming activity decreases linearly.', 'Confusing mass defect with missing matter.', 'Saying half-life depends on initial sample size.'],
    'Count halvings for decay; count mass difference for energy.', [['Why can both fission and fusion release energy?', 'Products move toward higher binding energy per nucleon.', 'Very heavy and very light nuclei lie below the iron-region peak.'], ['Does one nucleus have a predictable decay time?', 'No.', 'Only ensemble decay probability and statistics are predictable.']]);

  q('Semiconductor Electronics', 'A semiconductor device controls carrier populations and junction barriers; circuit behaviour follows which carriers can cross.', 'This makes diodes, rectifiers, LEDs and logic gates understandable from band structure.',
    ['Doping|Donors add electrons; acceptors create holes without charging the bulk crystal.|Show donor level near conduction band and acceptor near valence band.', 'p–n junction|Diffusion leaves a depletion region and built-in field.|Draw fixed ions forming a barrier.', 'Bias and devices|Forward bias lowers the barrier; reverse bias raises it.|Compare battery orientation across p and n sides.'],
    ['Intrinsic carriers satisfy n=p', 'Forward bias: p to positive, n to negative', 'Diode current is strongly asymmetric', 'Logic outputs follow truth tables, not gate shapes alone'],
    'A silicon diode in series with 1 kΩ is forward biased by 5 V. Estimate current using 0.7 V drop.', ['Resistor receives 5−0.7=4.3 V.', 'Use I=V/R.', 'Divide 4.3 V by 1000 Ω.'], '4.3 mA.', 'Current is in the usual small-signal LED/diode scale.',
    ['Mark p and n before deciding bias.', 'Use the stated diode model.', 'Build truth tables row by row for combined gates.'], ['Calling an n-type sample negatively charged overall.', 'Ignoring the depletion barrier.', 'Treating a real diode as a perfect short in every forward-bias problem.'],
    'Forward bias flattens the hill; reverse bias steepens it.', [['Why is n-type material electrically neutral?', 'Donor ions balance the extra mobile electrons.', 'Doping changes carrier population, not net bulk charge.'], ['Why does an LED emit light?', 'Electron-hole recombination releases band-gap energy as photons.', 'The colour reflects the material band gap.']]);

  const brief = (title, insight, why, cs, know, problem, steps, answer, check, tips, traps, hook, qs) => q(title, insight, why, cs, know, problem, steps, answer, check, tips, traps, hook, qs);
  brief('Units and Measurements', 'A measurement is a number plus a unit plus justified uncertainty; dimensions police equations but cannot create physics.', 'JEE questions hide easy marks in significant figures, error propagation and dimensional consistency.',
    ['Dimensions|Dimensions reveal how a quantity scales with M, L and T.|Write each variable as powers of base dimensions.', 'Uncertainty|Independent small fractional errors add under products and powers.|Visualize an interval around every reading.', 'Significant figures|Reported precision cannot exceed the least precise input.|Round once, at the final step.'],
    ['[G]=M⁻¹L³T⁻²', 'For z=xᵃyᵇ, Δz/z≈|a|Δx/x+|b|Δy/y', 'A dimensionless quantity may still have a unit-defined angle convention'],
    'Radius r=(2.00±0.02) cm. Find percentage uncertainty in area.', ['A∝r².', 'Fractional uncertainty is 2Δr/r.', '2×0.02/2.00×100.'], '2.0%.', 'The area uncertainty must be twice the radius percentage uncertainty.',
    ['Check dimensions before arithmetic.', 'Keep guard digits until the answer.', 'Use logarithmic differentiation for products and powers.'], ['Adding absolute errors in a product.', 'Treating dimensional correctness as proof of an equation.', 'Writing more significant figures than data permits.'],
    'Units catch impossible answers; uncertainty tells how much to trust possible ones.', [['Can two unlike quantities be added?', 'No.', 'Addition requires identical dimensions.'], ['Can dimensional analysis determine a numerical constant?', 'Usually no.', 'Pure numbers such as 2π carry no dimensions.']]);

  brief('Kinematics', 'Motion becomes simple after choosing an origin, axes and clock; graphs are equations drawn visibly.', 'It controls projectile, relative-motion and constraint questions where formula-first solving fails.',
    ['Vectors|Displacement has direction; distance does not.|Resolve every arrow into chosen axes.', 'Motion graphs|Slope of x–t is v; slope of v–t is a; area under v–t is displacement.|Read slope locally and signed area globally.', 'Relative motion|Velocity of A seen from B is vA−vB.|Freeze B by subtracting its velocity from everything.'],
    ['v=u+at and s=ut+½at² only for constant a', 'v²=u²+2as', 'Projectile ax=0, ay=−g', 'vAB=vA−vB'],
    'A projectile is launched at 20 m/s at 30°, take g=10. Find time of flight.', ['Vertical launch speed is 20sin30°=10 m/s.', 'Return to same level gives T=2uy/g.', 'Compute 20/10.'], '2.0 s.', 'Time to top is 1 s, so symmetry confirms 2 s.',
    ['Draw axes and signs.', 'Use components, never a scalar speed in a vector equation.', 'Read graph area with its sign.'], ['Using constant-acceleration formulas when a varies.', 'Confusing average speed and magnitude of average velocity.', 'Assuming relative speeds always add.'],
    'Choose the frame before chasing the object.', [['Can velocity be zero while acceleration is nonzero?', 'Yes.', 'At a projectile’s top, vertical velocity is zero but acceleration is g downward.'], ['What does negative v–t area mean?', 'Negative displacement.', 'Area is signed because velocity is signed.']]);

  brief('Laws of Motion', 'A force diagram is the argument; equations are only its translation.', 'Correct system choice exposes friction, pulleys, pseudo force and circular constraints cleanly.',
    ['Free-body diagram|Show only forces acting on the isolated body.|Cut the body away from surroundings and replace contacts by forces.', 'Friction|Static friction adapts up to μsN; kinetic friction is μkN.|Draw friction opposing relative slip tendency.', 'Constraint|Strings and contacts link accelerations geometrically.|Write one length equation before differentiating.'],
    ['ΣF=ma in an inertial frame', '0≤fs≤μsN; fk=μkN', 'Action-reaction forces act on different bodies', 'Pseudo force −maframe in an accelerating frame'],
    'A 5 kg block on a smooth floor is pulled by 20 N. Find acceleration.', ['Isolate the block.', 'Horizontal net force is 20 N.', 'Use a=F/m.'], '4 m s⁻².', 'Force 20 N equals 5×4 N.',
    ['Choose the system to eliminate internal tensions when useful.', 'Test static friction before setting it to μsN.', 'Resolve normal force from actual perpendicular balance.'], ['Putting action and reaction on one free-body diagram.', 'Assuming N=mg on every surface.', 'Choosing friction opposite motion rather than slip tendency.'],
    'No diagram, no dynamics.', [['Can static friction be zero?', 'Yes.', 'It takes only the value needed to prevent slipping.'], ['Why do action-reaction forces not cancel acceleration?', 'They act on different bodies.', 'Only forces on the chosen system are summed together.']]);

  brief('Work, Energy and Power', 'Energy methods compress the whole path into state changes, but only after every energy transfer is accounted for.', 'They solve variable-force, spring and collision-adjacent problems faster than force-time equations.',
    ['Work|Work is ∫F·dr, the area under an F–x graph.|Project force along each displacement element.', 'Potential energy|For conservative forces, ΔU=−Wc.|Picture a landscape whose slope gives force.', 'Power|Power is rate of energy transfer, P=F·v.|At an instant, only force along velocity supplies power.'],
    ['Wnet=ΔK', 'K=½mv²', 'Uspring=½kx² and Ug=mgh near Earth', 'P=dW/dt=F·v'],
    'A 2 kg block speeds from 3 to 7 m/s. Find net work.', ['Apply work-energy theorem.', 'ΔK=½m(v²−u²).', 'With m=2, compute 49−9.'], '40 J.', 'Positive work agrees with increased speed.',
    ['Use energy when time is absent.', 'Include negative work by friction.', 'For variable force, integrate or use graph area.'], ['Calling normal-force work always zero without checking displacement.', 'Conserving mechanical energy when dissipation is unaccounted.', 'Using Fv when force and velocity are not parallel.'],
    'Forces describe the journey; energy compares the endpoints.', [['Can centripetal force do work in uniform circular motion?', 'No.', 'It is perpendicular to instantaneous displacement.'], ['When is mechanical energy conserved?', 'When only conservative forces transfer energy internally.', 'External work or dissipation changes K+U.']]);

  brief('Rotational Motion', 'Rotation mirrors translation, but mass distribution matters: torque changes angular momentum, not merely angular speed.', 'This viewpoint unifies rolling, equilibrium, pulleys and collision-with-rotation problems.',
    ['Centre of mass|External force controls centre-of-mass motion independent of internal forces.|Replace a system by one point for translation.', 'Torque|τ=r×F changes angular momentum about the chosen origin.|Use perpendicular lever arm.', 'Moment of inertia|I=∫r²dm measures rotational inertia about an axis.|Mass farther from axis counts quadratically.'],
    ['τext=dL/dt', 'For fixed axis τ=Iα', 'Krot=½Iω²', 'Pure rolling vCM=ωR'],
    'A solid disc of mass 2 kg, radius 0.5 m rotates at 4 rad/s. Find rotational KE.', ['I=½MR²=0.25 kg m².', 'Use K=½Iω².', 'Compute 0.5×0.25×16.'], '2.0 J.', 'Units kg m² s⁻² are joules.',
    ['Declare the torque origin.', 'Separate translation of CM from rotation about CM.', 'Use rolling constraint only without slipping.'], ['Using MR² for every body.', 'Conserving angular momentum about a point with external torque.', 'Assuming friction dissipates energy in ideal pure rolling.'],
    'Force changes momentum; torque changes angular momentum.', [['Why can zero net force coexist with rotation?', 'A force couple has zero resultant but nonzero torque.', 'Separated opposite forces cancel translationally, not rotationally.'], ['Where is rolling contact point instantaneously?', 'At rest relative to the ground.', 'vCM and rotational velocity cancel there.']]);

  brief('Gravitation', 'Gravity is an inverse-square field with a negative potential well; orbits are continuous free fall.', 'The field-energy picture handles satellites, escape and variation with height/depth consistently.',
    ['Field|g=−GM r̂/r² points toward mass.|Draw radial arrows shrinking outward.', 'Potential|V=−GM/r with zero at infinity.|Plot a negative well approaching zero.', 'Orbit|Gravity supplies centripetal acceleration; total orbital energy is negative.|A satellite continually falls around Earth.'],
    ['g=GM/r²', 'V=−GM/r and U=mV', 'vorbit=√(GM/r)', 'vescape=√(2GM/R)'],
    'At radius 4R from Earth’s centre, express g in terms of surface g₀.', ['Use inverse-square scaling.', 'g/g₀=R²/(4R)².', 'Simplify.'], 'g=g₀/16.', 'Greater radius must reduce field.',
    ['Use distance from centre, not height alone.', 'Distinguish field g from potential V.', 'For orbit energy use E=−GMm/(2r).'], ['Taking gravitational potential as positive.', 'Using constant g far from Earth.', 'Adding satellite speed to escape speed directly.'],
    'Orbit is falling fast enough to keep missing Earth.', [['Why is escape speed independent of launch mass?', 'Both kinetic and gravitational energies scale with mass.', 'Mass cancels in energy conservation.'], ['Is gravity zero inside a hollow spherical shell?', 'Yes.', 'Shell contributions cancel at every interior point.']]);

  brief('Properties of Solids and Liquids', 'Bulk matter responds through gradients: stress creates strain, pressure differences drive fluids, and surface energy shapes interfaces.', 'JEE combines elasticity, Bernoulli flow, viscosity and capillarity in constraint-heavy questions.',
    ['Elasticity|Modulus is stress/strain in the linear regime.|Read slope of stress–strain curve.', 'Fluid continuity|Steady incompressible flow conserves volume rate Av.|A narrowing stream speeds up.', 'Surface tension|Interface energy makes surfaces minimize area.|A droplet curves to balance excess pressure.'],
    ['Y=(F/A)/(ΔL/L)', 'P+½ρv²+ρgh=constant along ideal streamline', 'A₁v₁=A₂v₂', 'Stokes force=6πηrv'],
    'Water flows from area 4 cm² at 2 m/s into area 1 cm². Find new speed.', ['For incompressible steady flow use A₁v₁=A₂v₂.', 'v₂=(4/1)×2.', 'Compute.'], '8 m/s.', 'Fourfold smaller area requires fourfold speed.',
    ['Check whether Bernoulli assumptions hold.', 'Use radius, not diameter, in capillary formulas.', 'Distinguish gauge and absolute pressure.'], ['Applying Bernoulli across viscous energy loss.', 'Confusing stress with force.', 'Forgetting two surfaces in a soap film.'],
    'Solids remember shape; fluids remember continuity.', [['Why does a fast horizontal stream have lower static pressure?', 'Energy shifts from pressure to kinetic form.', 'Bernoulli conservation gives P+½ρv² constant at equal height.'], ['Why are tiny drops nearly spherical?', 'A sphere minimizes area.', 'Surface energy is proportional to surface area.']]);

  brief('Thermodynamics', 'Thermodynamics is strict bookkeeping: heat and work are paths, internal energy is a state, and entropy restricts direction.', 'It prevents sign errors and links gas processes to engines and refrigerators.',
    ['First law|Energy entering as heat becomes internal energy or work.|Track arrows across a system boundary.', 'Processes|Isothermal, adiabatic, isobaric and isochoric constraints select different paths on P–V plots.|Area under P–V is work.', 'Second law|Entropy identifies spontaneous direction and limits efficiency.|Heat naturally disperses from hot to cold.'],
    ['ΔQ=ΔU+W by system convention', 'Ideal gas ΔU=nCvΔT', 'Isothermal ideal gas ΔU=0', 'Carnot η=1−Tc/Th'],
    'An ideal gas absorbs 500 J and does 200 J work. Find ΔU.', ['Use Q=ΔU+W.', 'Rearrange ΔU=Q−W.', 'Compute 500−200.'], '300 J.', 'Energy input splits into stored and exported parts.',
    ['Declare the work sign convention.', 'Use P–V area for quasistatic work.', 'Temperatures in efficiency formulas must be kelvin.'], ['Calling heat a substance stored in a body.', 'Assuming ΔU=0 for every cyclic step rather than whole cycle.', 'Using Celsius in Carnot efficiency.'],
    'Heat in = energy stored + work out.', [['Can internal energy change with no heat transfer?', 'Yes.', 'Adiabatic work can change temperature and internal energy.'], ['Why can no engine reach 100% efficiency between finite temperatures?', 'Some heat must be rejected.', 'The second law forbids complete cyclic conversion of heat into work.']]);

  brief('Kinetic Theory of Gases', 'Pressure and temperature are macroscopic shadows of microscopic momentum transfer and kinetic-energy statistics.', 'It turns gas laws, speeds, degrees of freedom and heat capacities into one particle model.',
    ['Pressure|Wall collisions transfer momentum; their rate produces pressure.|Imagine many elastic impacts on a wall.', 'Temperature|Absolute temperature measures mean translational kinetic energy.|A broader speed distribution at higher T.', 'Equipartition|Each active quadratic degree contributes ½kT per molecule.|Count translational, rotational and vibrational modes.'],
    ['PV=NkT=nRT', 'P=⅓ρvrms²', '½m⟨v²⟩=3kT/2', 'U=f nRT/2'],
    'At what factor does vrms change when absolute temperature quadruples?', ['vrms∝√T for fixed gas.', 'Take √(4T/T).', 'Evaluate.'], 'It doubles.', 'Speed grows as square root, not linearly.',
    ['Use kelvin for molecular speeds.', 'Count active degrees appropriate to the temperature.', 'Separate mean speed, rms speed and most probable speed.'], ['Assigning temperature to one molecule.', 'Using molar mass in kg incorrectly.', 'Assuming all molecules have vrms.'],
    'Temperature sets the kinetic-energy average, not one molecule’s speed.', [['Why does pressure rise at fixed volume when heated?', 'Collisions become faster and transfer momentum more frequently.', 'Mean kinetic energy rises with T.'], ['Is rms speed the average speed?', 'No.', 'It is the square root of mean squared speed and is larger than mean speed.']]);

  brief('Oscillations and Waves', 'Oscillation is projection of circular phase motion; waves transport that phase and energy without bulk transport of matter.', 'Phase thinking handles SHM, resonance, standing waves and beats more reliably than isolated formulas.',
    ['SHM|Restoring acceleration is −ω²x, so phase advances uniformly.|Project uniform circular motion onto a diameter.', 'Wave phase|kx−ωt fixes equal-phase points and travel direction.|Track a crest as phase remains constant.', 'Standing waves|Opposite travelling waves create nodes and antinodes.|Draw immobile nodes separated by λ/2.'],
    ['x=Acos(ωt+φ), a=−ω²x', 'Tpendulum=2π√(l/g) for small angle', 'vwave=νλ', 'String fn=nv/(2L) for fixed ends'],
    'A spring-mass system has m=1 kg and k=100 N/m. Find period.', ['ω=√(k/m)=10 rad/s.', 'T=2π/ω.', 'Evaluate.'], '0.2π s ≈0.628 s.', 'Stiffer spring gives a sub-second period.',
    ['Use energy at special SHM positions.', 'Mark boundary conditions before harmonics.', 'Compare phases modulo 2π.'], ['Using pendulum formula at large amplitude.', 'Thinking standing waves carry net energy along the medium.', 'Confusing particle velocity with wave speed.'],
    'SHM repeats in time; a wave repeats the phase in space.', [['Where is SHM speed maximum?', 'At equilibrium.', 'Potential energy is minimum and kinetic energy maximum there.'], ['Why are nodes stationary?', 'Opposite waves cancel there at every instant.', 'Their phase relation gives permanent destructive interference.']]);

  brief('Electrostatics', 'Electrostatics has two complementary languages: fields explain force locally, while potential explains energy globally.', 'JEE problems often switch between Coulomb/Gauss symmetry and capacitor energy constraints in one question.',
    ['Field and flux|Superpose vector fields; use Gauss law only when symmetry makes E uniform enough.|Place a Gaussian surface matching spherical, cylindrical or planar symmetry.', 'Potential|Potential is scalar and E points down its steepest spatial fall.|Draw equipotentials perpendicular to field lines.', 'Capacitance|Geometry sets C while the connection decides whether Q or V remains fixed.|Label battery-connected versus isolated before changing a dielectric.'],
    ['E=kq/r² r̂; Φ=Qenc/ε₀', 'V=kq/r and E=−∇V', 'C=Q/V; Cparallel plate=εA/d', 'U=½CV²=Q²/(2C)'],
    'An isolated capacitor has C=3 μF and Q=12 μC. Find stored energy.', ['Use the fixed-charge form U=Q²/(2C).', 'Substitute SI values.', 'Compute 144×10⁻¹²/(6×10⁻⁶).'], '24 μJ.', 'Equivalent voltage is 4 V and ½QV gives the same result.',
    ['Choose field or potential based on symmetry and requested quantity.', 'Write the capacitor constraint before modifying it.', 'Check limiting cases such as d→∞ or dielectric constant→1.'], ['Using Gauss law without symmetry.', 'Adding potentials vectorially.', 'Keeping V fixed after battery removal.'],
    'Field tells which way; potential tells how much energy.', [['Why can potential be constant inside a conductor?', 'Because E=−∇V=0 there.', 'Electrostatic equilibrium removes internal field.'], ['What changes when dielectric enters an isolated capacitor?', 'C rises, V and U fall.', 'Q is fixed while V=Q/C and U=Q²/2C.']]);

  brief('Magnetic Effects of Current and Magnetism', 'Currents create B, B steers moving charge, and magnetic dipoles seek alignment; direction links all three.', 'It unifies Biot–Savart/Ampère fields, Lorentz trajectories and material/dipole behaviour tested by JEE.',
    ['Current fields|Field geometry follows conductor symmetry and the right-hand curl.|Draw circles around a straight wire and near-uniform field in a solenoid.', 'Lorentz motion|qv×B bends the perpendicular velocity component into a circle.|Split velocity into parallel and perpendicular components for a helix.', 'Dipoles|A current loop has moment IA and energy −m·B.|Show torque rotating m toward B.'],
    ['F=qv×B', 'Bwire=μ₀I/(2πr)', 'r=mv⊥/(|q|B)', 'τ=m×B and U=−m·B'],
    'An electron enters B perpendicular to it. If speed doubles, what happens to orbit radius?', ['Use r=mv/(|q|B).', 'm, q and B stay fixed.', 'Radius is directly proportional to speed.'], 'The radius doubles.', 'Cyclotron period remains unchanged nonrelativistically.',
    ['Fix direction before magnitude.', 'Use Ampère only with exploitable symmetry.', 'Clarify whether angle is with loop normal.'], ['Allowing magnetic force to change speed.', 'Forgetting electron sign.', 'Using total v instead of v⊥ for radius.'],
    'Current curls B; B curves charge; dipoles align.', [['Why does a magnetic field do no work?', 'Force is perpendicular to velocity.', 'q(v×B)·v=0.'], ['Why do parallel currents attract?', 'Each wire lies in the other’s magnetic field.', 'The force directions from Iℓ×B point inward.']]);

  brief('Electromagnetic Induction and Alternating Currents', 'Changing flux creates emf; in AC circuits, inductors and capacitors return stored energy with opposing phase.', 'JEE connects rotating coils, motional emf, transients, phasors, resonance and transformer ideas.',
    ['Induction|ε=−d(NΦ)/dt opposes the flux change by energy conservation.|Draw change first, then the induced field.', 'AC phasors|R aligns with current; L leads and C lags voltage by 90°.|Construct the impedance right triangle.', 'Resonance|At XL=XC a series circuit becomes purely resistive and current peaks.|Cancel the vertical phasor components.'],
    ['ε=−N dΦ/dt and εmotion=Blv', 'XL=ωL; XC=1/(ωC)', 'Z=√(R²+(XL−XC)²)', 'ω₀=1/√(LC)'],
    'For L=1 H and C=4 μF, find resonance angular frequency.', ['Use ω₀=1/√(LC).', 'LC=4×10⁻⁶.', 'Its square root is 2×10⁻³.'], '500 rad s⁻¹.', 'Units from 1/√(H·F) reduce to s⁻¹.',
    ['Separate flux direction from flux change.', 'Use rms values for average AC power.', 'At resonance explicitly state phase and impedance.'], ['Opposing B instead of ΔB.', 'Adding XL and XC.', 'Giving an ideal inductor nonzero average power.'],
    'Flux change drives; phase decides what is stored and returned.', [['When is induced emf largest in a rotating coil?', 'When flux crosses zero fastest.', 'Emf depends on dΦ/dt, not Φ itself.'], ['Why does series resonance maximize current?', 'Reactive impedances cancel.', 'Only R remains in the impedance.']]);

  brief('Optics', 'Ray optics tracks the geometry of wavefront normals; wave optics tracks phase—use the description matched to the scale.', 'JEE mixes lenses and instruments with interference, diffraction and polarization, so model selection is the first step.',
    ['Geometrical optics|Reflection and Snell refraction locate images when dimensions greatly exceed λ.|Trace two principal rays.', 'Interference|Coherent path difference selects bright and dark outcomes.|Compare the two optical paths to a screen point.', 'Diffraction and polarization|Finite apertures spread waves; polarization reveals transverse fields.|Narrow a slit, then rotate an analyser.'],
    ['n₁sin i=n₂sin r', 'Thin lens 1/f=1/v−1/u', 'YDSE β=λD/d', 'Single slit central width=2λD/a'],
    'A YDSE setup doubles D and halves d. How does fringe width change?', ['Use β=λD/d.', 'New ratio β′/β=(2D)/(d/2)÷(D/d).', 'Simplify.'], 'It becomes four times.', 'Both changes independently double the width.',
    ['Draw rays for imaging and paths for interference.', 'Use paraxial formulas only in their approximation.', 'Separate fringe spacing from diffraction-envelope width.'], ['Mixing lens and mirror sign rules.', 'Using independent lamps as coherent sources.', 'Calling polarization possible for longitudinal waves.'],
    'When objects are large, trace rays; when apertures rival wavelength, track phase.', [['Why does diffraction grow as a slit narrows?', 'The angular scale λ/a increases.', 'A smaller aperture produces a broader Fourier spread.'], ['What remains unchanged across refraction?', 'Frequency.', 'The source fixes frequency while speed and wavelength change.']]);

  brief('Atoms and Nuclei', 'Atomic transitions rearrange electrons; nuclear reactions rearrange nucleons—both release energy through differences between quantized states.', 'JEE tests spectra, Bohr scaling, binding energy, decay and reaction Q-values side by side.',
    ['Atomic levels|Hydrogen-like energies scale as −Z²/n² and photons carry level differences.|Draw electron-transition arrows on an energy ladder.', 'Nuclear binding|Mass defect measures energy required to separate a nucleus.|Use the binding-energy-per-nucleon curve.', 'Radioactivity|Unstable populations decay exponentially with a fixed probability per time.|Count half-life intervals on a falling curve.'],
    ['En=−13.6Z²/n² eV', 'hf=|Ei−Ef|', 'BE=Δmc²', 'N=N₀e⁻λt and T½=ln2/λ'],
    'A radioactive count falls from 800 to 100. How many half-lives pass?', ['Form fraction 100/800=1/8.', 'Write 1/8=(1/2)³.', 'Read the exponent.'], 'Three half-lives.', '800→400→200→100.',
    ['Keep atomic and nuclear energy scales distinct.', 'Use negative bound-state atomic energies.', 'Balance both A and Z in nuclear equations.'], ['Treating decay as linear.', 'Using total binding energy alone to compare nuclei.', 'Assigning a definite decay instant to one nucleus.'],
    'Electron ladders make spectra; nucleon binding makes nuclear energy.', [['Why are atomic line spectra discrete?', 'Electron energies are quantized.', 'Only fixed energy differences can be emitted as photons.'], ['Why does fusion of light nuclei release energy?', 'Binding energy per nucleon rises.', 'The final mass is lower and the deficit becomes energy.']]);

  brief('Experimental Skills', 'An experiment is an argument made with apparatus: isolate a variable, calibrate the instrument, quantify uncertainty and let the graph test the model.', 'JEE experimental questions reward reading scales, circuits and graphs more than memorising laboratory prose.',
    ['Measurement instruments|Least count and zero correction set what a reading means.|Align eye, main scale and vernier/circular scale.', 'Circuit practice|Meters must be connected according to what they measure and their ideal resistance.|Ammeter in series, voltmeter in parallel.', 'Graph inference|Slope and intercept carry physical meaning and uncertainty.|Choose axes that linearise the proposed law.'],
    ['Vernier least count=1 MSD−1 VSD', 'Screw gauge least count=pitch/divisions', 'Ammeter low resistance; voltmeter high resistance', 'Slope units equal y-units/x-units'],
    'A screw gauge has 1 mm pitch and 100 circular divisions. Find least count.', ['Least count=pitch/number of divisions.', 'Use 1 mm/100.', 'Convert if required.'], '0.01 mm = 10 μm.', 'One full turn advances 1 mm, so each hundredth turn advances 0.01 mm.',
    ['Record zero error with its sign.', 'Use a best-fit line, not point-to-point zigzags.', 'State instrument range and least count before readings.'], ['Parallax from an oblique eye position.', 'Putting a voltmeter in series.', 'Forcing a best-fit line through the origin without physical reason.'],
    'Measure what the instrument actually reads, then make the graph reveal the law.', [['Why is an ammeter connected in series?', 'The branch current must pass through it.', 'Its low resistance minimizes circuit disturbance.'], ['What does a nonzero graph intercept mean?', 'Often zero error or an omitted offset.', 'It must be interpreted physically, not erased automatically.']]);

  const copy = value => JSON.parse(JSON.stringify(value));
  const schoolTitles = ['Electric Charges and Fields','Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves','Ray Optics','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics'];
  schoolTitles.forEach(title => { root.school[`Physics::${title}`] = copy(S[title]); });
  root.school['Physics::Ray Optics and Optical Instruments'] = copy(S['Ray Optics']);
  root.school['Physics::Semiconductor Electronics: Materials, Devices and Simple Circuits'] = copy(S['Semiconductor Electronics']);

  S['Dual Nature of Matter and Radiation'] = copy(S['Dual Nature of Radiation and Matter']);
  S['Electronic Devices'] = copy(S['Semiconductor Electronics']);
  const jeeTitles = ['Units and Measurements','Kinematics','Laws of Motion','Work, Energy and Power','Rotational Motion','Gravitation','Properties of Solids and Liquids','Thermodynamics','Kinetic Theory of Gases','Oscillations and Waves','Electrostatics','Current Electricity','Magnetic Effects of Current and Magnetism','Electromagnetic Induction and Alternating Currents','Electromagnetic Waves','Optics','Dual Nature of Matter and Radiation','Atoms and Nuclei','Electronic Devices','Experimental Skills'];
  jeeTitles.forEach(title => { root.jee[`Physics::${title}`] = copy(S[title]); });
}());
