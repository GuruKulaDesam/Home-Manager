(function () {
  'use strict';

  const HM = window.HM = window.HM || {};
  const root = HM.chapterSummaries = HM.chapterSummaries || {};
  root.school = root.school || {};
  root.jee = root.jee || {};

  const summary = (meaning, flow, essentials, traps, recall) => ({
    meaning,
    flow,
    essentials,
    traps,
    recall
  });

  const S = {
    'Electric Charges and Fields': summary(
      'Charge creates an electric field, and the field tells another charge how it would accelerate. The chapter moves from forces between individual charges to fields made by continuous charge and finally to Gauss law, where symmetry replaces difficult addition.',
      ['Fix the source charges and draw the geometry.', 'Add electric-field vectors, cancelling symmetric components first.', 'Use flux and Gauss law only when spherical, cylindrical or planar symmetry makes E constant on the chosen surface.', 'For conductors in electrostatic equilibrium, enforce E = 0 inside and place excess charge on the surface.'],
      ['Coulomb: F = kq1q2/r^2 along the joining line.', 'Field: E = F/q0; for a point charge E = kq/r^2.', 'Dipole moment p = q(2a); far-field falls as 1/r^3.', 'Flux Phi = integral E.dA; closed flux = Qenclosed/epsilon0.', 'Infinite line: E = lambda/(2 pi epsilon0 r); infinite sheet: E = sigma/(2 epsilon0).'],
      ['Adding field magnitudes instead of vectors.', 'Putting external charge into Qenclosed.', 'Using Gauss law to calculate E when the charge distribution lacks symmetry.', 'Assuming zero net flux means zero field everywhere.'],
      ['Sketch source, test point and direction arrows.', 'Say aloud: source charge -> field -> force qE.', 'Rebuild the three Gaussian surfaces and their enclosed-charge equations.', 'Check direction, N/C units and inverse-distance behaviour.']
    ),
    'Electrostatic Potential and Capacitance': summary(
      'Potential is electric potential energy per unit charge, so it turns a vector-field problem into scalar energy bookkeeping. Capacitance then describes how geometry and dielectric material store separated charge and field energy.',
      ['Choose the zero of potential and add source potentials algebraically.', 'Use E = -grad V to read field direction from how potential falls.', 'Reduce capacitor networks by identifying common voltage in parallel and common charge in series.', 'Before changing plate geometry, decide whether the battery fixes V or disconnection fixes Q.'],
      ['Point charge: V = kq/r; system energy U = sum kqiqj/rij over pairs.', 'Potential difference is minus field work per unit charge.', 'C = Q/V; parallel plates C = epsilon A/d.', 'Series: 1/Ceq = sum 1/C; parallel: Ceq = sum C.', 'Stored energy U = Q^2/(2C) = CV^2/2 = QV/2.'],
      ['Treating potential as a vector.', 'Keeping both Q and V fixed after a capacitor is disconnected.', 'Forgetting that a dielectric changes C and therefore changes energy differently under fixed-Q and fixed-V conditions.', 'Confusing zero potential with zero electric field.'],
      ['Draw equipotentials with E perpendicular and downhill.', 'Write “connected: V fixed; isolated: Q fixed.”', 'Derive one series and one parallel combination from definitions.', 'Check energy units are joules and capacitance units are farads.']
    ),
    'Current Electricity': summary(
      'Electric current is organised charge motion. At circuit scale, every problem is solved by charge conservation at junctions and energy conservation around loops; resistance and internal resistance account for energy converted to heat.',
      ['Translate the circuit into labelled nodes and branch currents.', 'Combine obvious series or parallel parts.', 'At remaining junctions apply sum Iin = sum Iout; around independent loops apply sum Delta V = 0.', 'Verify current directions, power balance and limiting cases.'],
      ['I = neAvd; J = sigma E.', 'R = rho L/A and V = IR for an ohmic conductor.', 'Cell terminal voltage while supplying current: V = emf - Ir.', 'Electrical power P = VI = I^2R = V^2/R.', 'Balanced Wheatstone bridge: P/Q = R/S; potentiometer compares emf without drawing current at balance.'],
      ['Adding parallel resistances directly.', 'Confusing emf with terminal voltage.', 'Changing current along an unbranched series path.', 'Ignoring meter resistance or connecting an ammeter in parallel.'],
      ['Mark every node and current arrow.', 'Say: junctions conserve coulombs; loops conserve joules.', 'Rebuild R-series, R-parallel and cell-with-r equations.', 'Check equivalent parallel resistance is below the smallest branch.']
    ),
    'Moving Charges and Magnetism': summary(
      'Magnetic fields steer moving charge and current without doing work. The same Lorentz-force direction rule explains particle orbits, velocity selectors, force on wires and torque on current loops; currents in turn create magnetic fields.',
      ['Draw v, B and q(v x B) before using a formula.', 'Split velocity into components parallel and perpendicular to B.', 'For fields made by current, choose Biot-Savart for general geometry or Ampere law for strong symmetry.', 'For a loop in a uniform field, replace it by magnetic moment m = NIA.'],
      ['F = q(E + v x B); magnetic work is zero.', 'Perpendicular orbit: r = mv/(|q|B), period T = 2 pi m/(|q|B).', 'Wire: dB = mu0 I dl x rhat/(4 pi r^2); long wire B = mu0 I/(2 pi r).', 'Wire force F = I l x B; loop torque tau = m x B.', 'Parallel currents attract; F/L = mu0 I1I2/(2 pi d).'],
      ['Forgetting to reverse direction for a negative charge.', 'Using total speed rather than perpendicular speed in the radius.', 'Giving magnetic force a component along velocity.', 'Using Ampere law where B is not constant along the path.'],
      ['Build the right-hand triad v, B, F.', 'Explain why speed stays fixed in a magnetic-only field.', 'Recall particle -> wire -> loop as qvB -> IlB -> mB.', 'Check radius grows with momentum and shrinks with B.']
    ),
    'Magnetism and Matter': summary(
      'A bar magnet and a current loop behave as magnetic dipoles. External fields exert torque that aligns their moments, while matter responds through atomic moments and domains, producing dia-, para- or ferromagnetism.',
      ['Represent the magnet or loop by moment m.', 'Use energy to decide stable alignment and torque to describe turning.', 'Resolve Earth magnetic field into horizontal and vertical components.', 'Classify materials by susceptibility, permeability and domain response.'],
      ['Loop moment m = NIA; torque tau = mB sin theta; U = -m.B.', 'Axial and equatorial dipole fields fall as 1/r^3.', 'Earth field: BH = B cos delta; BV = B sin delta; tan delta = BV/BH.', 'Diamagnetic chi < 0, paramagnetic chi > 0 small, ferromagnetic chi very large and history-dependent.', 'Gauss law for magnetism: closed integral B.dA = 0.'],
      ['Measuring theta from the plane instead of the loop normal.', 'Calling diamagnetism weak attraction.', 'Confusing geographic and magnetic directions.', 'Assuming zero torque at antiparallel alignment means stable equilibrium.'],
      ['Draw the moment arrow from south to north through the magnet.', 'Sketch U versus theta and identify stable/unstable positions.', 'Make a three-column dia/para/ferro comparison.', 'Recall that magnetic field lines always close.']
    ),
    'Electromagnetic Induction': summary(
      'An emf appears whenever magnetic flux linkage changes. Faraday gives its magnitude; Lenz gives its direction by opposing the change in flux, ensuring that induced electrical energy is paid for by mechanical or field energy.',
      ['Choose an area normal and write flux BA cos theta.', 'Identify whether B, area or orientation changes.', 'Differentiate flux linkage to find emf.', 'Use Lenz law after identifying the change; then use circuit resistance for current and energy checks.'],
      ['Phi = integral B.dA; emf = -N dPhi/dt.', 'Motional emf Blv applies when B, l and v are mutually perpendicular.', 'Self-induced emf = -L di/dt; mutual emf = -M di/dt.', 'Inductor energy U = LI^2/2.', 'AC generator emf is sinusoidal because rotating-loop flux is cosine.'],
      ['Opposing the original field instead of its change.', 'Dropping the number of turns.', 'Using Blv without checking geometry.', 'Assigning an induced-current direction without first defining the surface normal.'],
      ['Say: flux change -> emf -> current -> opposing field.', 'Draw increasing and decreasing flux cases.', 'Rebuild rotating-coil and sliding-rod derivations.', 'Check that magnetic drag matches energy conservation.']
    ),
    'Alternating Current': summary(
      'Alternating voltage repeatedly reverses. Resistors dissipate energy, while inductors and capacitors store and return it with opposite phase shifts; phasors convert these time relationships into a solvable right triangle.',
      ['Use rms values unless peak values are explicitly requested.', 'Draw current as reference: VR along it, VL +90 degrees and VC -90 degrees.', 'Find net reactance XL - XC, impedance and phase.', 'At resonance set XL = XC and interpret the physical result.'],
      ['Vrms = V0/sqrt(2), Irms = I0/sqrt(2).', 'XL = omega L; XC = 1/(omega C).', 'Series RLC: Z = sqrt(R^2 + (XL-XC)^2), tan phi = (XL-XC)/R.', 'Average power = Vrms Irms cos phi.', 'Resonance omega0 = 1/sqrt(LC); ideal transformer Vs/Vp = Ns/Np.'],
      ['Adding XL and XC instead of subtracting.', 'Mixing peak and rms quantities.', 'Claiming an ideal L or C consumes average power.', 'Forgetting whether current leads or lags.'],
      ['Draw the phasor triangle from memory.', 'Use ELI: voltage leads current in L; ICE: current leads in C.', 'Explain resonance as reactive cancellation, not disappearance of L and C.', 'Check power factor lies from 0 to 1.']
    ),
    'Electromagnetic Waves': summary(
      'Changing electric and magnetic fields sustain each other and travel through vacuum as a transverse wave. All spectral bands obey the same physics; frequency controls wavelength, photon energy and typical interaction with matter.',
      ['Use displacement current to complete the field picture across a capacitor gap.', 'Orient E, B and propagation as a right-handed perpendicular set.', 'Use c = frequency times wavelength.', 'Place the wave on the spectrum and connect its frequency to energy and application.'],
      ['c = 1/sqrt(mu0 epsilon0) = nu lambda.', 'In vacuum E0/B0 = c.', 'E and B are in phase and perpendicular to propagation.', 'Propagation and energy flow point along E x B.', 'Spectrum order: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.'],
      ['Calling EM waves longitudinal.', 'Putting E and B out of phase.', 'Changing vacuum speed with frequency.', 'Confusing wave intensity with energy per photon.'],
      ['Draw E x B pointing forward.', 'Recite spectrum while wavelength decreases and frequency increases.', 'Convert one frequency to wavelength.', 'Explain in one sentence why no material medium is required.']
    ),
    'Ray Optics': summary(
      'Ray optics treats light as straight-line paths that reflect and refract at boundaries. Image formulae are compressed ray diagrams: the diagram determines signs, reality, orientation and magnification before arithmetic begins.',
      ['Draw two principal rays from the object tip.', 'Apply the Cartesian sign convention consistently.', 'At boundaries use Snell law; test total internal reflection only for denser-to-rarer travel.', 'For instruments, locate the objective’s intermediate image before analysing the eyepiece.'],
      ['n1 sin i = n2 sin r; n = c/v.', 'Mirror: 1/f = 1/v + 1/u; lens: 1/f = 1/v - 1/u with Cartesian signs.', 'Magnification mirror m = -v/u; lens m = v/u.', 'Lens power P = 1/f(m); powers of thin contact lenses add.', 'TIR needs n1 > n2 and i > critical angle.'],
      ['Mixing mirror and lens sign formulae.', 'Applying apparent-depth formula away from near-normal viewing.', 'Using TIR without both conditions.', 'Adding focal lengths instead of powers.'],
      ['Draw first, sign second, calculate third.', 'Rebuild the six standard mirror/lens image cases.', 'Trace telescope and microscope objective before eyepiece.', 'Check image location against the ray sketch.']
    ),
    'Wave Optics': summary(
      'Wave optics tracks phase. Interference measures path difference, diffraction reveals the effect of finite aperture, and polarization proves that light’s electric field oscillation is transverse.',
      ['Convert geometry into path difference.', 'Use coherence to decide whether a stable pattern exists.', 'For diffraction, add contributions across one aperture rather than two sources.', 'For polarization, project the electric-field amplitude before squaring for intensity.'],
      ['Interference bright: Delta = n lambda; dark: Delta = (n+1/2)lambda.', 'YDSE fringe width beta = lambda D/d.', 'Single-slit first minimum: a sin theta = lambda; central width = 2 lambda D/a.', 'Malus law I = I0 cos^2 theta.', 'Interference redistributes intensity; it does not create energy.'],
      ['Confusing fringe width with diffraction central width.', 'Forgetting that the diffraction central maximum is double adjacent maxima width.', 'Treating independent sources as coherent.', 'Using amplitude ratios directly as intensity ratios.'],
      ['Sketch two paths and label Delta.', 'Say: interference measures separation; diffraction measures aperture.', 'Predict effects of increasing lambda, D, d and a.', 'Recall polarization as evidence for transverse waves.']
    ),
    'Dual Nature of Radiation and Matter': summary(
      'Light transfers energy and momentum in photons, while particles such as electrons display a wavelength set by momentum. The chapter replaces the classical idea of continuously shared energy with discrete interaction events.',
      ['For photoelectric questions separate photon energy, work function and electron kinetic energy.', 'Use frequency—not intensity—to decide whether emission is possible.', 'Use stopping potential to measure maximum kinetic energy.', 'For matter waves calculate momentum first, then de Broglie wavelength.'],
      ['Einstein equation: Kmax = h nu - phi = eVstop.', 'Threshold frequency nu0 = phi/h.', 'Photon momentum p = h/lambda.', 'Matter wavelength lambda = h/p; for non-relativistic electron accelerated through V, lambda = h/sqrt(2meV).', 'Intensity above threshold changes photocurrent, not stopping potential.'],
      ['Thinking intense sub-threshold light ejects electrons.', 'Using wavelength instead of frequency without converting photon energy.', 'Giving photons a nonzero rest mass.', 'Confusing electron count with maximum electron energy.'],
      ['Draw Kmax versus frequency: slope h, intercept -phi.', 'Say: frequency sets packet energy; intensity sets packet count.', 'Rebuild lambda = h/p.', 'Check faster particles have shorter wavelengths.']
    ),
    'Atoms': summary(
      'Atomic spectra show that electrons occupy discrete energy states. Rutherford established the nuclear atom; Bohr added quantized angular momentum to explain hydrogen radii, energies and spectral lines.',
      ['Use scattering evidence to separate Rutherford’s result from Bohr’s model.', 'For a hydrogen-like ion identify nuclear charge Z and level n.', 'Compute energy difference between levels.', 'Convert emitted or absorbed energy to photon frequency or wavelength.'],
      ['Bohr radius rn = a0 n^2/Z.', 'Energy En = -13.6 Z^2/n^2 eV.', 'Angular momentum mvr = nh/(2 pi).', 'Photon h nu = |Ef - Ei|; 1/lambda = RZ^2(1/nf^2 - 1/ni^2) for emission.', 'Ionization energy is energy needed to reach E = 0.'],
      ['Using the lower-minus-upper sign incorrectly.', 'Forgetting Z^2 for hydrogen-like ions.', 'Treating an orbit as a classical radiating path.', 'Confusing excitation energy with the level’s negative total energy.'],
      ['Sketch energy levels with zero at ionization.', 'Recall r grows as n^2 while binding falls as 1/n^2.', 'Trace one transition and label emission/absorption.', 'Check emitted photon energy is positive.']
    ),
    'Nuclei': summary(
      'A nucleus is held together because its bound mass is less than the mass of separated nucleons; that mass defect is binding energy. Radioactive decay is probabilistic, while fission and fusion release energy by moving nuclei toward greater binding per nucleon.',
      ['Write A, Z and neutron number before balancing a reaction.', 'Compute mass defect using consistent atomic or nuclear masses.', 'Use the binding-energy curve to explain stability and energy release.', 'For decay, work in ratios or number of half-lives before using exponentials.'],
      ['Nuclear radius R = R0 A^(1/3).', 'Binding energy B = Delta m c^2; 1 u = 931.5 MeV/c^2.', 'N = N0 e^(-lambda t); activity A = lambda N.', 'Half-life T1/2 = ln2/lambda; mean life = 1/lambda.', 'Reaction Q = (initial mass - final mass)c^2.'],
      ['Not balancing both A and Z.', 'Mixing atomic and nuclear masses without accounting for electrons.', 'Treating decay as affected by ordinary temperature or pressure.', 'Using half-life as the time for all nuclei to decay.'],
      ['Draw the binding-energy-per-nucleon curve.', 'Say: fission splits heavy; fusion joins light; both move uphill in binding.', 'Solve one decay by repeated halves and one by exponential.', 'Check Q sign: positive means energy released.']
    ),
    'Semiconductor Electronics': summary(
      'Semiconductors conduct through electrons and holes whose populations can be controlled by doping. A p-n junction’s depletion barrier makes current strongly directional, enabling rectification, regulation and switching.',
      ['Start with energy bands and intrinsic carriers.', 'Add donor or acceptor doping without calling the material electrically charged.', 'At a junction, track how bias changes depletion width and barrier.', 'Read diode circuits piecewise: decide ON/OFF, replace by the appropriate model, then solve.'],
      ['Intrinsic: electron density equals hole density; doping creates majority and minority carriers.', 'Forward bias narrows the barrier; reverse bias widens it.', 'Diode current is nonlinear; ideal diode is short when ON and open when OFF.', 'Zener diode operates in reverse breakdown for voltage regulation.', 'Logic gates implement Boolean operations; derive output row by row.'],
      ['Saying n-type material is negatively charged.', 'Reversing forward-bias battery connections.', 'Treating a diode as an ohmic resistor.', 'Memorising gate symbols without evaluating inputs.'],
      ['Draw bands, n-type, p-type and junction in sequence.', 'Say: bias changes barrier, barrier changes current.', 'Solve one clipper/rectifier by ON-OFF states.', 'Rebuild truth tables from the Boolean expression.']
    ),
    'Units and Measurements': summary(
      'Measurement connects a physical quantity to a unit and an honest uncertainty. Dimensions catch impossible equations, significant figures prevent false precision, and graphs expose relationships more reliably than isolated readings.',
      ['Convert all quantities to consistent SI units.', 'Use dimensions to test terms and infer allowed powers.', 'Carry uncertainty through the actual operation.', 'Report the result only to precision supported by the least precise measurement.'],
      ['For products/powers, fractional errors add with absolute powers.', 'For sums/differences, absolute uncertainties add.', 'Dimensional homogeneity is necessary, not sufficient, for a correct law.', 'Slope units equal y-unit/x-unit; intercept units equal y-unit.', 'Least count sets instrumental resolution; repeated readings address random error.'],
      ['Adding fractional errors for a sum.', 'Using dimensional analysis to find numerical constants.', 'Keeping calculator digits unsupported by data.', 'Ignoring zero error or unit conversion.'],
      ['Write quantity = number x unit.', 'Build M-L-T dimensions for the target expression.', 'Do one error-propagation example.', 'Check unit, magnitude and significant figures last.']
    ),
    'Kinematics': summary(
      'Kinematics describes motion without asking what causes it. Position, velocity and acceleration are vectors; graphs and relative motion are alternate languages for the same change in position.',
      ['Choose origin, axes and positive directions.', 'Write vector constraints, then split into independent components.', 'Use slopes and areas to translate x-t, v-t and a-t graphs.', 'For relative motion subtract velocities in one reference frame.'],
      ['v = dr/dt and a = dv/dt.', 'Constant acceleration: v = u + at; r = ut + at^2/2; v^2 = u^2 + 2a.Delta r.', 'Projectile: x = u cos theta t; y = u sin theta t - gt^2/2.', 'Relative velocity vA/B = vA - vB.', 'Uniform circular motion has centripetal acceleration v^2/r toward the centre.'],
      ['Using constant-acceleration equations when acceleration varies.', 'Treating speed as velocity.', 'Forgetting sign changes at turning points.', 'Using projectile range formula when launch and landing heights differ.'],
      ['Draw axes and initial vector.', 'Read graph slope then area.', 'Separate x and y but keep common time.', 'Check limiting cases t = 0 and g -> 0.']
    ),
    'Laws of Motion': summary(
      'Forces do not maintain motion; net force changes momentum. The free-body diagram is the chapter’s central tool: isolate one body, show only external forces, choose axes, and let Newton’s laws connect the bodies through constraints.',
      ['Select the body or system.', 'Draw weight, normal, tension, friction and applied forces with no invented “motion force.”', 'Choose axes along motion/contact and write sum F = ma.', 'Add string, contact or circular-motion constraints and solve simultaneously.'],
      ['Momentum p = mv; impulse = integral F dt = Delta p.', 'Newton II: net F = dp/dt, reducing to ma at constant mass.', 'Static friction adjusts up to mu_s N; kinetic friction = mu_k N.', 'Circular radial equation is net inward force = mv^2/r.', 'Action-reaction forces act on different bodies.'],
      ['Setting static friction equal to mu_sN automatically.', 'Putting action and reaction on one free-body diagram.', 'Assuming tension is identical with a massive rope/pulley.', 'Adding a separate centripetal force instead of resolving real forces inward.'],
      ['Isolate, draw, axis, equation, constraint.', 'Ask what would move without friction to find its direction.', 'Check whether computed static friction is below its limit.', 'Test zero-friction and equal-mass cases.']
    ),
    'Work, Energy and Power': summary(
      'Work transfers energy through force along displacement. The work-energy theorem is valid for all forces, while potential energy is available only for conservative interactions; conservation laws then replace force-by-force motion solving.',
      ['Define the system and initial/final states.', 'Use net work = change in kinetic energy, or include conservative potential energy.', 'Account explicitly for external work and dissipative losses.', 'Use momentum conservation separately for collisions; kinetic energy is conserved only when elastic.'],
      ['W = integral F.dr; K = mv^2/2; Wnet = Delta K.', 'F = -dU/dx; near stable equilibrium U has a minimum.', 'Power P = dW/dt = F.v.', 'Spring U = kx^2/2; gravitational U near Earth = mgh.', 'Collision coefficient of restitution e = relative separation speed/relative approach speed.'],
      ['Conserving mechanical energy despite friction without thermal energy.', 'Conserving kinetic energy in every collision.', 'Using force magnitude times distance when force is not parallel/constant.', 'Confusing power with energy.'],
      ['Draw an energy bar chart for start and finish.', 'Say: forces explain the route; energy connects states.', 'Pair momentum and restitution for collisions.', 'Check joules, signs and whether energy loss is nonnegative.']
    ),
    'Rotational Motion': summary(
      'Rotation mirrors translation: angle replaces position, angular velocity replaces velocity, torque changes angular momentum, and moment of inertia measures resistance to angular acceleration. Rolling couples translation and rotation through a no-slip constraint.',
      ['Choose the rotation axis before calculating torque or inertia.', 'Locate centre of mass and separate translation of the centre from rotation about it.', 'Use torque/angular momentum or rotational energy according to the question.', 'For pure rolling impose vCM = omega R.'],
      ['tau = r x F; L = r x p and for a fixed axis L = I omega.', 'Net tau = dL/dt; fixed-axis tau = I alpha.', 'Krot = I omega^2/2; rolling K = MvCM^2/2 + ICM omega^2/2.', 'Parallel-axis theorem I = ICM + Md^2.', 'Angular momentum is conserved when external torque about the chosen point is zero.'],
      ['Using I without naming the axis.', 'Assuming zero net force means zero torque.', 'Applying v = omega R when slipping occurs.', 'Conserving angular momentum about a point with external torque.'],
      ['Make the x-v-a / theta-omega-alpha analogy.', 'Mark lever arms perpendicular to force.', 'Write rolling constraint beside the energy equation.', 'Check dimensions of I as mass x length squared.']
    ),
    'Gravitation': summary(
      'Gravity is an inverse-square attractive field. Potential and total orbital energy reveal more than force alone: a bound orbit has negative total energy, escape reaches zero energy, and Kepler’s laws follow from central-force dynamics.',
      ['Use shell/spherical symmetry before treating an extended body as a point mass.', 'Choose potential zero at infinity.', 'For circular orbit set gravity equal to centripetal force.', 'For transfer, escape or satellites use total energy and angular momentum.'],
      ['F = GMm/r^2; g = GM/r^2; V = -GM/r; U = -GMm/r.', 'Circular orbit v = sqrt(GM/r), T = 2 pi sqrt(r^3/GM).', 'Circular total energy E = -GMm/(2r).', 'Escape speed = sqrt(2GM/R), independent of projectile mass.', 'Inside a uniform shell g = 0; potential is constant, not zero.'],
      ['Using height above surface where centre distance is required.', 'Setting gravitational potential positive.', 'Assuming weightlessness means no gravity.', 'Using circular-orbit energy for a non-circular position without justification.'],
      ['Sketch U(r), marking zero at infinity.', 'Derive orbital speed from force and escape speed from energy.', 'Say: larger orbit -> slower satellite -> longer period.', 'Check limiting behaviour as r tends to infinity.']
    ),
    'Properties of Solids and Liquids': summary(
      'Bulk matter responds to applied forces through deformation and flow. Solids relate stress to strain, fluids transmit pressure and convert pressure/height/speed energy, while viscosity and surface tension arise from molecular momentum transfer and surface energy.',
      ['Identify whether the problem is elastic, hydrostatic, flowing, viscous or surface-based.', 'Choose a small element and balance forces/energy.', 'State the ideal assumptions behind Bernoulli or Hooke law.', 'Use dimensions and limiting behaviour to check the result.'],
      ['Stress/strain defines Young, bulk and shear moduli within elastic limit.', 'Pressure depth p = p0 + rho gh; buoyancy equals displaced-fluid weight.', 'Continuity A v = constant; Bernoulli p + rho gh + rho v^2/2 = constant along ideal streamline.', 'Stokes drag = 6 pi eta r v; terminal speed follows force balance.', 'Surface excess pressure: drop 2T/r, soap bubble 4T/r.'],
      ['Using Bernoulli across pumps, viscosity losses or unrelated streamlines without correction.', 'Confusing pressure with force.', 'Missing two surfaces of a soap film.', 'Using Hooke law beyond elastic limit.'],
      ['Classify: solid, static fluid, ideal flow, viscous flow, surface.', 'Draw the stress-strain curve.', 'Rebuild continuity plus Bernoulli.', 'Check units: modulus/pressure N/m^2, viscosity Pa.s, tension N/m.']
    ),
    'Thermodynamics': summary(
      'Thermodynamics tracks energy transfer without following individual molecules. Internal energy is a state function; heat and work depend on the process path. The first law balances energy, while the second law gives natural direction and limits heat engines.',
      ['Define system, surroundings and sign convention.', 'Mark initial/final states and identify the process path on a P-V graph.', 'Apply the first law with work equal to area under the P-V curve.', 'For cycles and engines track heat reservoirs, work and entropy direction.'],
      ['First law under common physics convention: Delta Q = Delta U + Delta Wby.', 'Ideal gas internal energy depends only on temperature.', 'Isothermal ideal gas: Delta U = 0; adiabatic: Q = 0 and PV^gamma = constant.', 'Cp - Cv = R; gamma = Cp/Cv.', 'Engine efficiency = W/Qhot and cannot reach 1 for finite-temperature reservoirs.'],
      ['Changing sign convention midway.', 'Treating heat as stored in a body.', 'Assuming Delta U = 0 for every constant-temperature substance without model context.', 'Reading work from endpoints rather than P-V path area.'],
      ['Draw the P-V path and shade work.', 'Say: U is owned by the state; Q and W describe the journey.', 'Fill a table for isothermal, adiabatic, isochoric, isobaric.', 'Check a complete cycle has Delta U = 0.']
    ),
    'Kinetic Theory of Gases': summary(
      'Kinetic theory derives pressure and temperature from molecular motion. Random collisions create pressure, average translational kinetic energy measures absolute temperature, and equipartition distributes energy among active quadratic degrees of freedom.',
      ['State ideal-gas assumptions.', 'Relate wall impulse to pressure.', 'Average over random directions so vx^2, vy^2 and vz^2 contribute equally.', 'Count active degrees of freedom before finding internal energy or heat capacity.'],
      ['P = rho vrms^2/3; average translational KE = 3kT/2.', 'vrms = sqrt(3RT/M).', 'Equipartition energy per molecule = f kT/2.', 'For ideal gas U = f nRT/2, Cv = fR/2, Cp = Cv + R.', 'Mean free path decreases as density and molecular cross-section increase.'],
      ['Using Celsius in molecular-speed formulas.', 'Confusing mean speed with rms speed.', 'Counting vibrational degrees incorrectly at ordinary temperature.', 'Believing molecules slow down after elastic wall collision because pressure is exerted.'],
      ['Go macro P,V,T -> micro mass,speed,collisions.', 'Derive P = rho vrms^2/3 in words.', 'Count f for monatomic and rigid diatomic gases.', 'Check vrms grows as sqrt(T/M).']
    ),
    'Oscillations and Waves': summary(
      'Simple harmonic motion is the local motion near a stable equilibrium where restoring force is proportional to displacement. Waves carry this oscillation and energy through space; superposition creates standing waves, beats and resonance.',
      ['Find equilibrium and linear restoring force.', 'Write displacement with phase and obtain velocity/acceleration by differentiation.', 'For waves identify propagation direction, phase and boundary conditions.', 'Superpose waves before applying node/antinode or beat conditions.'],
      ['SHM: a = -omega^2 x; x = A cos(omega t + phi); total E = m omega^2 A^2/2.', 'Spring omega = sqrt(k/m); simple pendulum omega = sqrt(g/L) for small angle.', 'Wave y = A sin(kx - omega t + phi), v = omega/k = nu lambda.', 'String speed = sqrt(T/mu).', 'Beat frequency = |nu1 - nu2|; standing waves have no net energy transport.'],
      ['Calling every periodic motion SHM.', 'Using pendulum formula at large amplitude.', 'Confusing particle velocity with wave speed.', 'Applying open/closed-pipe harmonic rules to the wrong boundary.'],
      ['Draw equilibrium, amplitude and phase circle.', 'Recall F -> a -> x with opposite sign.', 'Mark nodes and antinodes before wavelength.', 'Check frequency is set by source while speed is set by medium.']
    ),
    'Electrostatics': null,
    'Magnetic Effects of Current and Magnetism': null,
    'Electromagnetic Induction and Alternating Currents': null,
    'Optics': null,
    'Atoms and Nuclei': null,
    'Electronic Devices': null,
    'Experimental Skills': summary(
      'Experimental physics is evidence-building: identify the measurable relationship, use calibrated instruments correctly, control other variables, quantify uncertainty and let a graph decide whether the model fits.',
      ['Write aim as a relationship between variables.', 'Choose range, least count and zero correction before readings.', 'Repeat measurements and tabulate raw values with units.', 'Plot the transformed variables that should form a straight line; extract slope/intercept with units.'],
      ['Vernier least count = one main-scale division - one vernier-scale division for the usual direct vernier.', 'Screw-gauge least count = pitch/number of circular divisions.', 'Percentage error = absolute error/measured value x 100.', 'Ammeter goes in series with low resistance; voltmeter goes in parallel with high resistance.', 'A straight-line graph tests both slope and intercept predictions.'],
      ['Reading a scale without eye-level/parallax control.', 'Using one reading or discarding inconvenient data without reason.', 'Drawing a graph without units or using two nearby points for slope.', 'Connecting meters with wrong polarity/range.'],
      ['Say: calibrate, vary, measure, graph, infer.', 'Practise reading vernier, screw gauge and meter diagrams.', 'Sketch each circuit before connecting it.', 'Report result with unit, uncertainty and one justified precaution.']
    )
  };

  S.Electrostatics = summary(
    'Electrostatics unites Coulomb force, electric field, potential, Gauss law and capacitance. JEE problems reward switching between vector field for force/symmetry and scalar potential for work/energy.',
    ['Use symmetry and superposition for E.', 'Use potential and energy when charges move or configurations change.', 'Apply Gauss law only with a surface on which E is known by symmetry.', 'For capacitors identify fixed Q or fixed V before geometry/dielectric changes.'],
    [...S['Electric Charges and Fields'].essentials.slice(0, 3), ...S['Electrostatic Potential and Capacitance'].essentials.slice(1, 5)],
    ['Integrating before exploiting symmetry.', 'Confusing potential zero with field zero.', 'Using Qenclosed as all charge present.', 'Failing to distinguish battery-connected and isolated capacitors.'],
    ['Draw charge geometry and field directions.', 'Choose field language or energy language.', 'Rebuild Gauss surfaces and capacitor constraints.', 'Check signs, limiting distance and energy source.']
  );
  S['Magnetic Effects of Current and Magnetism'] = summary(
    'This unit connects current-produced magnetic fields, Lorentz force, magnetic dipoles and material response. Direction is not decoration: it determines trajectories, forces, torque and induced effects.',
    ['Draw current/velocity and B.', 'Use the cross product for force.', 'Exploit Biot-Savart or Ampere symmetry for B.', 'Reduce loops/magnets to dipole moment for torque and energy.'],
    [...S['Moving Charges and Magnetism'].essentials, ...S['Magnetism and Matter'].essentials.slice(0, 3)],
    ['Reversing electron direction incorrectly.', 'Using total velocity for magnetic radius.', 'Using Ampere law without symmetry.', 'Measuring loop angle from its plane.'],
    ['Build I -> B -> force/torque.', 'Apply the right-hand rule explicitly.', 'Check that magnetic force does no work.', 'Use energy to test dipole stability.']
  );
  S['Electromagnetic Induction and Alternating Currents'] = summary(
    'Changing flux produces emf, and alternating circuits reveal how resistors dissipate while inductors and capacitors exchange stored energy. Faraday-Lenz reasoning leads naturally to phasors, resonance, generators and transformers.',
    ['Find flux change and induced direction.', 'Translate a sinusoidal source to rms and phase relations.', 'Build the RLC phasor triangle.', 'Use energy conservation to verify generators, inductive drag and transformers.'],
    [...S['Electromagnetic Induction'].essentials, ...S['Alternating Current'].essentials],
    ['Opposing B rather than change in flux.', 'Dropping turns or geometric factors.', 'Adding reactances.', 'Mixing rms and peak values.'],
    ['Flux -> emf -> current -> opposition.', 'Current-reference phasor: R across, L up, C down.', 'Mark resonance XL = XC.', 'Check energy and phase.']
  );
  S.Optics = summary(
    'Optics uses two compatible models: rays handle imaging when dimensions are large compared with wavelength; wave phase handles interference, diffraction and polarization. Choosing the correct model is the first mark.',
    ['Classify ray or wave behaviour.', 'For ray systems draw before signs and formulas.', 'For wave systems calculate path/phase difference.', 'Use aperture and coherence conditions to interpret visibility and resolution.'],
    [...S['Ray Optics'].essentials, ...S['Wave Optics'].essentials],
    ['Mixing lens/mirror signs.', 'Using TIR without its two conditions.', 'Confusing YDSE fringe width with diffraction central width.', 'Ignoring coherence or intensity-amplitude squaring.'],
    ['Ask: path of a ray or phase of a wave?', 'Draw the geometry.', 'Predict before calculating.', 'Check image character or pattern scaling.']
  );
  S['Atoms and Nuclei'] = summary(
    'Atomic transitions rearrange electrons between quantized levels; nuclear changes rearrange nucleons and release binding energy. Both are solved by state-energy differences, but their scales and governing models are distinct.',
    ['Identify atomic level transition or nuclear reaction.', 'Write initial and final energy/mass states.', 'Conserve charge, nucleon number and energy.', 'Convert the difference into photon wavelength, kinetic energy or Q-value.'],
    [...S.Atoms.essentials, ...S.Nuclei.essentials],
    ['Mixing excitation and ionization energies.', 'Forgetting Z scaling.', 'Failing to balance A and Z.', 'Mixing atomic and nuclear mass conventions.'],
    ['Draw atomic levels and binding-energy curve.', 'Say: electron states use eV; nuclear mass defects often use MeV.', 'Balance first, calculate second.', 'Check energy-difference sign.']
  );
  S['Electronic Devices'] = S['Semiconductor Electronics'];

  const schoolChapters = [
    ['book-g12-physics-1-1', 'Electric Charges and Fields', 'sy-p3-phys-1'],
    ['book-g12-physics-1-2', 'Electrostatic Potential and Capacitance', 'sy-p3-phys-2'],
    ['book-g12-physics-1-3', 'Current Electricity', 'sy-p3-phys-3'],
    ['book-g12-physics-1-4', 'Moving Charges and Magnetism', 'sy-p3-phys-4'],
    ['book-g12-physics-1-5', 'Magnetism and Matter', 'sy-p3-phys-5'],
    ['book-g12-physics-1-6', 'Electromagnetic Induction', 'sy-p3-phys-6'],
    ['book-g12-physics-1-7', 'Alternating Current', 'sy-p3-phys-7'],
    ['book-g12-physics-1-8', 'Electromagnetic Waves', 'sy-p3-phys-8'],
    ['book-g12-physics-2-1', 'Ray Optics and Optical Instruments', 'sy-p3-phys-9'],
    ['book-g12-physics-2-2', 'Wave Optics', 'sy-p3-phys-10'],
    ['book-g12-physics-2-3', 'Dual Nature of Radiation and Matter', 'sy-p3-phys-11'],
    ['book-g12-physics-2-4', 'Atoms', 'sy-p3-phys-12'],
    ['book-g12-physics-2-5', 'Nuclei', 'sy-p3-phys-13'],
    ['book-g12-physics-2-6', 'Semiconductor Electronics: Materials, Devices and Simple Circuits', 'sy-p3-phys-14']
  ];

  const jeeChapters = [
    ['jee-phys-1', 'Units and Measurements'],
    ['jee-phys-2', 'Kinematics'],
    ['jee-phys-3', 'Laws of Motion'],
    ['jee-phys-4', 'Work, Energy and Power'],
    ['jee-phys-5', 'Rotational Motion'],
    ['jee-phys-6', 'Gravitation'],
    ['jee-phys-7', 'Properties of Solids and Liquids'],
    ['jee-phys-8', 'Thermodynamics'],
    ['jee-phys-9', 'Kinetic Theory of Gases'],
    ['jee-phys-10', 'Oscillations and Waves'],
    ['jee-phys-11', 'Electrostatics'],
    ['jee-phys-12', 'Current Electricity'],
    ['jee-phys-13', 'Magnetic Effects of Current and Magnetism'],
    ['jee-phys-14', 'Electromagnetic Induction and Alternating Currents'],
    ['jee-phys-15', 'Electromagnetic Waves'],
    ['jee-phys-16', 'Optics'],
    ['jee-phys-17', 'Dual Nature of Matter and Radiation'],
    ['jee-phys-18', 'Atoms and Nuclei'],
    ['jee-phys-19', 'Electronic Devices'],
    ['jee-phys-20', 'Experimental Skills']
  ];

  // The app's JEE title uses “Matter and Radiation”; the NCERT chapter uses the
  // reverse order. The physics content is the same, but both exact titles remain intact.
  S['Dual Nature of Matter and Radiation'] = S['Dual Nature of Radiation and Matter'];
  S['Ray Optics and Optical Instruments'] = S['Ray Optics'];
  S['Semiconductor Electronics: Materials, Devices and Simple Circuits'] = S['Semiconductor Electronics'];

  const record = (id, title, track) => ({
      id,
      title,
      subject: 'Physics',
      track,
      bigIdea: S[title].meaning,
      story: S[title].flow.join(' '),
      essentialResults: [...S[title].essentials],
      problemFlow: [...S[title].flow],
      examTraps: [...S[title].traps],
      rapidRecall: [...S[title].recall]
  });

  const install = (target, track, chapters) => chapters.forEach(([id, title, syllabusId]) => {
    const entry = record(id, title, track);
    target[id] = entry;
    if (syllabusId) target[syllabusId] = { ...entry, id: syllabusId };
    target[`Physics::${title}`] = entry;
  });

  install(root.school, 'CBSE Class 12', schoolChapters);
  install(root.jee, 'JEE Main', jeeChapters);
}());
