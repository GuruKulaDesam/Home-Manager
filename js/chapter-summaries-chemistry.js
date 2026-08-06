(function () {
  window.HM = window.HM || {};
  const root = window.HM.chapterSummaries = window.HM.chapterSummaries || {};

  const summary = (bigIdea, essentialConcepts, equations, reasoningFlow, examTraps, rapidRecall) => ({
    bigIdea,
    story: essentialConcepts.join(' '),
    essentialResults: [...essentialConcepts, ...equations.map(value => `Equation: ${value}`)],
    problemFlow: reasoningFlow,
    examTraps,
    rapidRecall
  });
  const add = (id, title, data) => {
    const value = { title, ...data };
    root[id] = value;
    root[`Chemistry::${title}`] = value;
    root[`Chemistry|${title}`] = value;
    root[`chemistry|${title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()}`] = value;
  };

  const school = [
    ['book-g12-chemistry-1-1', 'Solutions', summary(
      'A solution is best understood by counting how much solute is present and how its particles change the escaping tendency of the solvent.',
      ['Molarity uses litres of solution and changes with temperature; molality uses kilograms of solvent and does not.', 'Raoult’s law connects liquid composition to vapour pressure; Henry’s law connects gas pressure to dissolved mole fraction.', 'Colligative properties depend on effective particle count, so association and dissociation appear through the van’t Hoff factor.'],
      ['p = x p°; relative lowering = x(solute)', 'ΔTb = iKb m; ΔTf = iKf m; π = iCRT', 'dissociation: i = 1 + α(ν−1); n-mer association: i = 1 − α(1−1/n)'],
      ['Identify solvent, solute and whether either is volatile.', 'Choose a concentration unit and keep its denominator explicit.', 'Count effective particles before applying a colligative formula.', 'Check whether the result changes in the physically correct direction.'],
      ['Using mass of solution in molality', 'Reading a larger Henry constant as greater solubility', 'Taking i as the number of ions even when dissociation is incomplete'],
      ['M → litre of solution; m → kg of solvent.', 'Higher KH means lower gas solubility.', 'Colligative means particle count, not chemical identity.'])],
    ['book-g12-chemistry-1-2', 'Electrochemistry', summary(
      'Electrochemistry is energy accounting for electron transfer: cell potential measures chemical driving force, while current measures how much charge actually moves.',
      ['Oxidation is always at the anode and reduction at the cathode; only electrode signs change between galvanic and electrolytic cells.', 'The Nernst equation corrects standard potential for actual composition.', 'Conductivity is a bulk property; molar conductivity reveals ionic contribution and rises on dilution.'],
      ['E°cell = E°cathode − E°anode', 'ΔG° = −nFE°; log K = nE°/0.0591 at 298 K', 'E = E° − (0.0591/n)log Q', 'Λm = κ×1000/C; deposited mass = ItM/(nF)'],
      ['Write and balance the net redox reaction.', 'Find n and construct Q without pure solids or liquids.', 'Apply Nernst and interpret the sign of E.', 'For electrolysis, turn current × seconds into charge, then into moles of electrons.'],
      ['Multiplying electrode potential by a stoichiometric coefficient', 'Including solid metals in Q', 'Confusing conductance G, conductivity κ and molar conductivity Λm'],
      ['AN OX; RED CAT.', 'Positive E means the written reaction is spontaneous.', 'At equilibrium E = 0 and Q = K.'])],
    ['book-g12-chemistry-1-3', 'Chemical Kinetics', summary(
      'A rate law is an experimental fingerprint of a reaction path; it is not normally obtained from the overall balanced equation.',
      ['Order is the sum of experimental concentration exponents; molecularity describes only one elementary step.', 'Integrated laws turn concentration-time data into straight-line tests.', 'Activation energy controls the temperature sensitivity of k; a catalyst changes the path, not equilibrium.'],
      ['zero: [A] = [A]₀−kt; t½ = [A]₀/(2k)', 'first: ln([A]₀/[A]) = kt; t½ = 0.693/k', 'k = Ae^(−Ea/RT); slope of ln k vs 1/T = −Ea/R'],
      ['Convert percent reacted into fraction remaining.', 'Identify order from units, graphs or half-life behaviour.', 'Use the matching integrated equation.', 'Check that k has the unit required by the order.'],
      ['Equating order with stoichiometric coefficient', 'Using percent completed as percent remaining', 'Claiming a catalyst changes K or ΔG°'],
      ['First order halves in equal times.', 'Zero order removes equal concentration amounts.', 'Order may be zero, fractional or negative; molecularity is a positive integer.'])],
    ['book-g12-chemistry-1-4', 'The d- and f-Block Elements', summary(
      'Transition-metal behaviour comes from the close energies of ns and (n−1)d orbitals; f-block contraction comes from poor shielding by f electrons.',
      ['Variable oxidation state, colour, magnetism and catalysis trace back to incomplete d subshells.', 'Remove 4s electrons before 3d when forming ions.', 'Lanthanoid contraction explains similar Zr/Hf radii, difficult separation and changing basicity.'],
      ['spin-only moment μ = √[n(n+2)] BM', 'Cr: [Ar]3d⁵4s¹; Cu: [Ar]3d¹⁰4s¹', 'MnO₄⁻ and Cr₂O₇²⁻: balance by half-reaction in the stated medium'],
      ['Write the neutral atom configuration.', 'Remove ns electrons and find the ion’s d count.', 'Count unpaired electrons before predicting magnetism or colour.', 'For trends, connect the electronic cause to one observable consequence.'],
      ['Calling every d-block element a transition element', 'Leaving 4s electrons in Fe²⁺ or Fe³⁺', 'Saying all transition-metal ions are coloured'],
      ['d⁰ and d¹⁰ are commonly colourless.', 'Zn, Cd and Hg are d-block but not transition by the incomplete-d definition.', 'Poor 4f shielding → lanthanoid contraction.'])],
    ['book-g12-chemistry-1-5', 'Coordination Compounds', summary(
      'Every complex becomes systematic when solved in this order: charge, oxidation state, d count, coordination geometry, field strength, spin and name.',
      ['Coordination number counts donor atoms, not ligand molecules.', 'Isomerism changes which ions bind or how ligands occupy space without changing overall composition.', 'Crystal-field splitting and pairing energy determine unpaired electrons, colour and geometry.'],
      ['oxidation state + ligand charges = complex charge', 'μ = √[n(n+2)] BM', 'octahedral: t₂g below eg; tetrahedral: e below t₂'],
      ['Calculate oxidation state explicitly.', 'Convert the metal ion to its d count.', 'Use ligand strength and geometry to fill split d levels.', 'Count unpaired electrons, then name ligands alphabetically.'],
      ['Counting two en ligands as coordination number two', 'Alphabetising using di-/bis- prefixes', 'Assuming an anionic ligand must be weak-field'],
      ['Charge → d count → field → spin.', 'Anionic complex metals end in -ate.', 'Chelation means several donor atoms hold the same metal.'])],
    ['book-g12-chemistry-2-1', 'Haloalkanes and Haloarenes', summary(
      'Substitution versus elimination is predicted from four controls: substrate crowding, nucleophile/base strength, solvent and temperature.',
      ['SN2 is one-step backside attack with inversion and favours methyl/primary carbon.', 'SN1 passes through a planar carbocation, favours stable tertiary centres and can rearrange.', 'Aryl C–X bonds resist ordinary SN1/SN2 because resonance and sp² bonding strengthen the bond.'],
      ['SN2 rate = k[RX][Nu⁻]; SN1 rate = k[RX]', 'aqueous KOH → substitution; alcoholic KOH + heat → elimination', 'leaving group tendency: I⁻ > Br⁻ > Cl⁻ >> F⁻'],
      ['Classify the carbon bearing halogen.', 'Decide whether the reagent acts mainly as nucleophile or base.', 'Use solvent and heat to choose mechanism.', 'State major product and stereochemical consequence.'],
      ['Putting SN2 at a tertiary centre', 'Treating chlorobenzene like chloroethane', 'Giving a product without reagent conditions or stereochemistry'],
      ['Crowding blocks SN2.', 'Heat plus strong base seeks β-H.', 'SN2 inverts; SN1 tends toward racemisation.'])],
    ['book-g12-chemistry-2-2', 'Alcohols, Phenols and Ethers', summary(
      'The carbon attached to oxygen decides the chemistry: phenoxide resonance controls acidity, α-hydrogen controls oxidation and steric access controls ether synthesis/cleavage.',
      ['Phenol is more acidic than alcohol because phenoxide delocalises negative charge.', 'Primary alcohol oxidises to aldehyde then acid; secondary to ketone; tertiary resists ordinary oxidation.', 'Williamson ether synthesis is SN2 and therefore works best with a primary alkyl halide.'],
      ['1° RCH₂OH → RCHO → RCOOH; 2° R₂CHOH → R₂CO', 'RO⁻ + R′X → ROR′ + X⁻', 'phenol + CHCl₃/NaOH → salicylaldehyde after work-up'],
      ['Identify alcohol class or distinguish phenol/ether.', 'Check acidity through stability of the conjugate base.', 'For conversions, choose reagent and write conditions.', 'For ether cleavage, decide which C–O bond can undergo substitution.'],
      ['Explaining phenol acidity only by oxygen electronegativity', 'Using a tertiary halide in Williamson synthesis', 'Oxidising a tertiary alcohol as if it had an α-H'],
      ['Resonance stabilises phenoxide.', 'Williamson is SN2.', 'Lucas: 3° fast, 2° slower, 1° on heating.'])],
    ['book-g12-chemistry-2-3', 'Aldehydes, Ketones and Carboxylic Acids', summary(
      'Carbonyl chemistry follows electrophilicity at carbon; substituent donation and steric crowding make aldehydes generally more reactive than ketones.',
      ['Nucleophiles add to the planar C=O carbon; acid derivatives undergo addition followed by elimination.', 'Aldehydes oxidise readily, enabling Tollens’ and Fehling’s distinctions.', 'Carboxylic-acid strength increases when electron-withdrawing groups stabilise carboxylate.'],
      ['RCHO + [O] → RCOOH; R₂CO + [H] → R₂CHOH', '2 carbonyl molecules with α-H → aldol product', 'carbonyl without α-H + strong base → Cannizzaro products'],
      ['Locate the functional group and α-hydrogens.', 'Classify reagent as nucleophile, oxidant, reductant or base.', 'Predict the first bond-forming event.', 'Check carbon count and oxidation state in the product.'],
      ['Using Cannizzaro when an α-H exists', 'Assuming every ketone gives Tollens’ test', 'Forgetting dehydration after aldol addition'],
      ['Aldehydes react faster than ketones.', 'α-H enables aldol; no α-H enables Cannizzaro.', 'Electron withdrawal strengthens carboxylic acids.'])],
    ['book-g12-chemistry-2-4', 'Amines', summary(
      'Amines are governed by availability of the nitrogen lone pair; resonance, solvation and substituent effects decide basicity and reactivity.',
      ['Aniline is less basic than alkylamines because its lone pair is delocalised into the ring.', 'Aqueous basicity balances +I donation, solvation and steric hindrance; gas-phase order can differ.', 'Diazonium salts convert an aromatic amino group into many other substituents.'],
      ['ArNH₂ + NaNO₂/HCl at 273–278 K → ArN₂⁺Cl⁻', 'Hofmann bromamide: RCONH₂ → RNH₂ (one carbon fewer)', 'carbylamine test is given only by primary amines'],
      ['Identify amine class and whether the lone pair is resonance-delocalised.', 'For basicity, state the phase and compare stability of conjugate acids.', 'For aromatic conversions, route through diazotisation.', 'Count carbons across named reactions.'],
      ['Applying one basicity order in every solvent', 'Diazotising aliphatic and aromatic amines identically', 'Using carbylamine test for secondary/tertiary amines'],
      ['Available lone pair → stronger base.', 'Diazotise aniline cold.', 'Hofmann removes one carbon.'])],
    ['book-g12-chemistry-2-5', 'Biomolecules', summary(
      'Biomolecules are structure–function systems: the monomer, linkage and three-dimensional arrangement jointly determine biological behaviour.',
      ['Reducing behaviour requires a free anomeric carbon; sucrose has neither anomeric carbon free.', 'Amino acids join by peptide bonds; protein function depends on higher-order structure and denaturation disrupts it.', 'DNA and RNA differ in sugar, bases, strand organisation and primary role.'],
      ['monosaccharide + monosaccharide → glycosidic bond + H₂O', 'amino acids → peptide bond (−CO−NH−) + H₂O', 'nucleotide = base + pentose sugar + phosphate'],
      ['Identify monomers and the connecting linkage.', 'Locate any free functional/anomeric group.', 'Connect structural level to property or biological role.', 'Use exact names rather than vague “sugar/protein” labels.'],
      ['Calling sucrose reducing', 'Treating denaturation as peptide-bond hydrolysis', 'Confusing nucleoside with nucleotide'],
      ['Sucrose is non-reducing; maltose and lactose are reducing.', 'Denaturation changes shape, not primary sequence.', 'Nucleoside + phosphate = nucleotide.'])]
  ];
  school.forEach(([id, title, data]) => add(id, title, data));

  const jeeOnly = [
    ['jee-chem-1', 'Some Basic Concepts in Chemistry', 'Chemistry numericals become reliable when every statement is translated into particles, moles and a balanced stoichiometric ratio.', ['Atomic/molecular masses connect microscopic entities to measurable mass.', 'The limiting reagent ends product formation; purity and yield modify the usable amount.', 'Empirical formula gives simplest ratio; molecular formula uses molar mass.'], ['n = m/M = N/NA', 'PV = nRT', '% yield = actual/theoretical ×100'], ['Balance equation.', 'Convert every given quantity to moles.', 'Find limiting reagent.', 'Return to requested unit with significant figures.'], ['Comparing reactant masses instead of mole/stoichiometric ratios', 'Ignoring purity', 'Rounding before the final step'], ['Balance → moles → limit → answer.', 'One mole contains NA entities.', 'Units are part of the calculation.']],
    ['jee-chem-2', 'Atomic Structure', 'Atomic behaviour is quantised: permitted energies and orbitals arise from wave mechanics, while spectra reveal energy differences.', ['Bohr works for hydrogen-like species; quantum mechanics replaces fixed paths with probability orbitals.', 'Quantum numbers define shell, subshell, orbital and spin.', 'Aufbau, Pauli and Hund govern ground-state configurations, with stability exceptions.'], ['En = −13.6Z²/n² eV', 'λ = h/mv; ΔxΔp ≥ h/4π', 'maximum electrons: shell 2n², subshell 2(2l+1)'], ['Identify hydrogenic or many-electron case.', 'Apply allowed quantum-number ranges.', 'Fill orbitals using Hund before pairing.', 'For transitions, take energy difference then convert to wavelength.'], ['Using Bohr formula for many-electron atoms', 'Allowing l = n', 'Forgetting absorption and emission signs'], ['n sets shell; l shape; ml orientation; ms spin.', 'Degenerate orbitals fill singly first.', 'Spectrum measures ΔE, not absolute energy.']],
    ['jee-chem-3', 'Chemical Bonding and Molecular Structure', 'Bonding questions are electron bookkeeping plus geometry: minimise formal charge, count electron domains and then include orbital/energy effects.', ['Lewis structures establish connectivity and resonance.', 'VSEPR predicts electron-domain geometry; lone pairs compress bond angles.', 'MO theory explains bond order and magnetism where simple Lewis/VB pictures fail.'], ['formal charge = valence − lone − ½(bonding)', 'bond order = ½(Nb−Na)', 'dipole moment μ = qr'], ['Count valence electrons.', 'Draw plausible Lewis/resonance forms.', 'Count σ domains and lone pairs for shape.', 'Use MO occupancy when bond order or magnetism is asked.'], ['Naming electron geometry instead of molecular shape', 'Treating resonance forms as rapidly switching molecules', 'Ignoring antibonding electrons'], ['Lone pair repels more.', 'Higher bond order means shorter, stronger bond.', 'O₂ is paramagnetic by MO theory.']],
    ['jee-chem-4', 'Chemical Thermodynamics', 'Thermodynamics tracks state-function energy and entropy; spontaneity is a ΔG decision, not a statement about reaction speed.', ['First law separates heat and work while conserving energy.', 'Hess law works because enthalpy is a state function.', 'Entropy and Gibbs energy combine energetic and dispersal tendencies.'], ['ΔU = q + w; w = −PextΔV', 'ΔH = ΔU + ΔngRT', 'ΔG = ΔH−TΔS; ΔG° = −RT ln K'], ['Define system and sign convention.', 'Use states and stoichiometry in enthalpy sums.', 'Convert entropy units before ΔG.', 'Interpret sign at the stated temperature.'], ['Calling exothermic automatically spontaneous', 'Mixing J and kJ', 'Using bond enthalpies without breaking-minus-forming logic'], ['State functions ignore path.', 'ΔG < 0 spontaneous; ΔG = 0 equilibrium.', 'K follows ΔG°, not rate.']],
    ['jee-chem-6', 'Equilibrium', 'Equilibrium is a dynamic balance whose position follows reaction quotient, while acid–base and solubility equilibria are the same law applied to ions.', ['Compare Q with K to predict direction.', 'Le Châtelier predicts response but does not replace a K calculation.', 'Buffers, hydrolysis and Ksp require disciplined concentration/species accounting.'], ['Kp = Kc(RT)^Δng', 'pH = −log[H⁺]; KaKb = Kw', 'buffer: pH = pKa + log([base]/[acid])', 'Ksp from ion concentrations with powers'], ['Write the balanced equilibrium.', 'Build K or Q from gaseous/aqueous species only.', 'Use an ICE table and justified approximation.', 'Check approximation and physical concentration limits.'], ['Including pure solid/liquid in K', 'Assuming catalyst changes equilibrium position', 'Using initial concentration directly in K'], ['Q<K forward; Q>K reverse.', 'Catalyst reaches equilibrium faster only.', 'Common ion suppresses ionisation/solubility.']],
    ['jee-chem-9', 'Classification of Elements and Periodicity', 'Periodic trends are consequences of effective nuclear charge, shielding and shell structure—not arrows to memorise without exceptions.', ['Across a period Zeff generally rises, contracting atoms and raising ionisation enthalpy.', 'Down a group new shells enlarge atoms despite higher nuclear charge.', 'Half/full-filled subshell stability and electron pairing create important exceptions.'], ['Zeff ≈ Z−shielding', 'cation < atom < anion for the same element', 'isoelectronic radius decreases as nuclear charge rises'], ['Locate element and write valence configuration.', 'Compare shells first, then Zeff and shielding.', 'Check half/full-filled and small-orbital exceptions.', 'State the cause alongside the trend.'], ['Blindly applying monotonic trends', 'Confusing electron gain enthalpy with electronegativity', 'Comparing ions without electron count'], ['Across: Zeff dominates.', 'Down: shell number dominates.', 'In an isoelectronic series, more protons means smaller radius.']],
    ['jee-chem-10', 'p-Block Elements', 'p-block chemistry is organised by valence configuration, oxidation-state stability and the changing strength of bonds down a group.', ['Inert-pair effect stabilises lower oxidation states down heavier groups.', 'First-member anomalies arise from small size, high electronegativity and absence of d orbitals.', 'Oxides/hydrides reveal acidity, basicity, stability and reducing trends.'], ['highest oxidation state ≈ group number−10', 'disproportionation requires an intermediate oxidation state', 'acid/base trends follow bond polarity and E−O bond character'], ['Write group valence configuration.', 'Identify possible oxidation states.', 'Compare size, bond strength and inert-pair effect.', 'Balance redox/disproportionation explicitly.'], ['Memorising an exception without its group trend', 'Assuming highest oxidation state becomes more stable down every group', 'Confusing thermal stability with reducing power'], ['First member is anomalous.', 'Lower oxidation states stabilise down heavier p block.', 'Structure explains reactivity.']],
    ['jee-chem-13', 'Purification and Characterisation of Organic Compounds', 'Purification works by exploiting one physical-property difference; analysis converts measured products into elemental composition.', ['Choose crystallisation, distillation, sublimation, extraction or chromatography from volatility/solubility differences.', 'Lassaigne fusion turns covalent N, S and halogens into detectable ionic salts.', 'Combustion and precipitate masses yield elemental percentages.'], ['Rf = distance solute/distance solvent front', '% element = mass element/mass sample ×100', 'Kjeldahl/Dumas quantify nitrogen under stated limits'], ['Identify impurity and property difference.', 'Choose the least destructive separation.', 'For analysis, convert measured compound to moles of target element.', 'Check method exceptions.'], ['Using simple distillation for close boiling points', 'Forgetting sodium-extract interferences', 'Using Kjeldahl for nitro/azo nitrogen'], ['Separation needs a property contrast.', 'Lassaigne makes ions.', 'Chromatography separates by differential affinity.']],
    ['jee-chem-14', 'Some Basic Principles of Organic Chemistry', 'Organic reaction prediction is electron-flow logic: stabilise charge, identify electron-rich/electron-poor sites, then follow a permitted mechanism.', ['Inductive effect travels through σ bonds and fades; resonance delocalises through conjugation.', 'Carbocation, carbanion and radical stability depend on resonance, hyperconjugation and substituent effects.', 'Acidity/basicity follows stability of the conjugate species.'], ['curved arrow starts at an electron pair and ends where it forms a bond', 'aromatic systems satisfy cyclic conjugation with (4n+2) π electrons', 'IUPAC: principal group fixes suffix and numbering'], ['Draw the complete structure.', 'Mark nucleophile, electrophile and leaving group.', 'Compare possible intermediates.', 'Move electrons, then verify charge and octets.'], ['Moving atoms instead of electrons with arrows', 'Using carbocation stability order for carbanions', 'Calling every cyclic conjugated system aromatic'], ['Electron arrows begin at electrons.', 'Resonance stabilisation often wins.', 'Always compare conjugate species.']],
    ['jee-chem-15', 'Hydrocarbons', 'Hydrocarbon reactions follow bond type: alkanes substitute by radicals, alkenes/alkynes add electrophiles, and aromatics preserve aromaticity through substitution.', ['Radical halogenation depends on initiation, propagation and termination.', 'Alkene regioselectivity follows intermediate stability; peroxides reverse HBr addition only.', 'Benzene undergoes electrophilic aromatic substitution and substituents direct later attack.'], ['alkene + X₂/HX/H₂/H₂O → addition products', 'terminal alkyne H is acidic due to sp carbon', 'Hückel aromaticity: (4n+2) π electrons'], ['Identify π, σ or aromatic system.', 'Generate the reactive species from reagent.', 'Choose the most stable intermediate/transition path.', 'Check regio- and stereochemistry.'], ['Applying peroxide effect to HCl or HI', 'Making benzene undergo easy addition', 'Ignoring rearrangement in carbocation addition'], ['Peroxide effect: HBr only.', 'More s-character means more acidic C−H.', 'Benzene substitutes to keep aromaticity.']],
    ['jee-chem-20', 'Principles Related to Practical Chemistry', 'Practical chemistry is observation linked to a chemical cause; a correct answer states reagent, condition, observation and inference.', ['Salt analysis separates cations/anions through selective precipitation, complexation and redox tests.', 'Organic functional groups give characteristic chemical responses only under controlled conditions.', 'Titration accuracy depends on apparatus conditioning, endpoint reading and stoichiometry.'], ['N1V1/stoichiometric coefficient = N2V2/stoichiometric coefficient', 'moles precipitate reveal analyte through balanced equation', 'qualitative test: reagent + observation → inference'], ['Record colour, gas, precipitate or solubility exactly.', 'Write the ionic equation causing it.', 'Exclude interfering ions/tests.', 'State inference no broader than evidence.'], ['Reporting only a colour with no reagent', 'Confusing endpoint and equivalence point', 'Using wet/unrinsed apparatus incorrectly'], ['Observation is evidence, not decoration.', 'Rinse burette with titrant and pipette with analyte.', 'Confirmatory tests need conditions.']]
  ];
  jeeOnly.forEach(([id, title, big, concepts, equations, flow, traps, recall]) => add(id, title, summary(big, concepts, equations, flow, traps, recall)));

  const reuse = [
    ['jee-chem-5', 'Solutions', 'book-g12-chemistry-1-1'],
    ['jee-chem-7', 'Redox Reactions and Electrochemistry', 'book-g12-chemistry-1-2'],
    ['jee-chem-8', 'Chemical Kinetics', 'book-g12-chemistry-1-3'],
    ['jee-chem-11', 'd- and f-Block Elements', 'book-g12-chemistry-1-4'],
    ['jee-chem-12', 'Coordination Compounds', 'book-g12-chemistry-1-5'],
    ['jee-chem-16', 'Organic Compounds Containing Halogens', 'book-g12-chemistry-2-1'],
    ['jee-chem-17', 'Organic Compounds Containing Oxygen', 'book-g12-chemistry-2-3'],
    ['jee-chem-18', 'Organic Compounds Containing Nitrogen', 'book-g12-chemistry-2-4'],
    ['jee-chem-19', 'Biomolecules', 'book-g12-chemistry-2-5']
  ];
  reuse.forEach(([id, title, sourceId]) => {
    const { title: sourceTitle, ...content } = root[sourceId];
    add(id, title, content);
  });

  add('jee-chem-7', 'Redox Reactions and Electrochemistry', summary(
    'Redox chemistry first conserves electrons and charge; electrochemistry then converts that balanced electron transfer into voltage, free energy or material deposited.',
    ['Oxidation number is a bookkeeping device: total increase must equal total decrease.', 'Half-reaction balancing conserves atoms, charge and electrons in acidic or basic medium.', 'A cell separates oxidation and reduction so electron transfer can do electrical work; concentration changes its voltage through Q.'],
    ['E°cell = E°cathode − E°anode', 'ΔG° = −nFE°; E = E° − (0.0591/n)log Q', 'electrolysis: charge = It; moles e⁻ = It/F'],
    ['Assign oxidation numbers and identify both changing atoms.', 'Balance electron loss and gain before adding half-reactions.', 'For a cell, write the net reaction, n and Q.', 'Use the sign/magnitude to infer spontaneity or deposited quantity.'],
    ['Balancing atoms but not charge', 'Multiplying E° by stoichiometric coefficients', 'Including pure solids in Q'],
    ['Oxidation loses electrons; reduction gains.', 'AN OX, RED CAT.', 'At equilibrium E = 0 and Q = K.']));

  add('jee-chem-17', 'Organic Compounds Containing Oxygen', summary(
    'Oxygen chemistry changes as carbon’s oxidation state and bonding change: alcohol/phenol reactions centre on O–H and C–O, while carbonyl reactions centre on electrophilic C=O.',
    ['Phenoxide resonance makes phenol more acidic than alcohol; electron-withdrawing groups strengthen it further.', 'Alcohol oxidation depends on α-hydrogen, and Williamson ether formation is an SN2 process.', 'Aldehydes are generally more reactive than ketones toward nucleophilic addition; α-hydrogen decides aldol versus Cannizzaro behaviour.', 'Carboxylic acids are stabilised through resonance of carboxylate and undergo nucleophilic acyl substitution.'],
    ['1° alcohol → aldehyde → acid; 2° alcohol → ketone', 'RO⁻ + R′X → ROR′', 'carbonyl + Nu⁻ → tetrahedral addition product', 'α-H → aldol; no α-H → Cannizzaro'],
    ['Mark the exact oxygen functional group.', 'Classify reagent as acid/base, nucleophile, oxidant or reductant.', 'Check α-hydrogen and possible intermediate.', 'Track carbon count, oxidation state and named-test observation.'],
    ['Using tertiary halide in Williamson synthesis', 'Giving Cannizzaro to a carbonyl with α-H', 'Treating phenol acidity as an inductive effect only'],
    ['Phenol acidity comes from phenoxide resonance.', 'Williamson is SN2.', 'Aldehydes out-react ketones; α-H unlocks aldol.']));
}());
