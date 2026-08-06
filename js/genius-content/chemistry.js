(function () {
  window.HM = window.HM || {};
  const root = window.HM.geniusContent = window.HM.geniusContent || {};
  root.school = root.school || {};
  root.jee = root.jee || {};

  const make = ({ insight, whyItMatters, concepts, mustKnow, worked, examTips, traps, memoryHook, guidedQuestions }) => ({
    insight, whyItMatters,
    concepts: concepts.map(([title, explain, visual]) => ({ title, explain, visual })),
    mustKnow,
    worked: { problem: worked[0], steps: worked[1], answer: worked[2], check: worked[3] },
    examTips, traps, memoryHook,
    guidedQuestions: guidedQuestions.map(([question, answer, explanation]) => ({ question, answer, explanation }))
  });
  const add = (target, title, data) => { target[`Chemistry::${title}`] = make(data); };

  const school = {};

  school['Solutions'] = {
    insight: 'A solution problem becomes easy when you first decide what is conserved: moles of solute, total mass, or vapour-pressure contribution. Choose the concentration unit only after that decision.',
    whyItMatters: 'Colligative properties connect microscopic particle count to measurable boiling point, freezing point and osmotic pressure; boards repeatedly test both calculation and abnormal molar mass.',
    concepts: [
      ['Concentration language', 'Molarity changes with temperature because volume changes; molality and mole fraction do not. Convert through a 100 g or 1 kg basis instead of mixing denominators.', 'mass % → assume 100 g solution → moles → χ or molality'],
      ['Raoult and Henry', 'Raoult relates solvent vapour pressure to its mole fraction; Henry relates dissolved-gas mole fraction to partial pressure, p = KHx. A larger KH means poorer gas solubility.', 'liquid composition x → equilibrium vapour pressure p'],
      ['Colligative counting', 'ΔTb = iKb m, ΔTf = iKf m and π = iCRT respond to the number of solute particles. The van’t Hoff factor diagnoses association or dissociation.', 'one formula unit ⇄ i effective particles']
    ],
    mustKnow: ['M = moles solute/litre solution; m = moles solute/kg solvent', 'For a non-volatile solute, relative lowering of vapour pressure equals solute mole fraction in the dilute limit', 'For dissociation into ν particles, i = 1 + α(ν−1); for n-mer association, i = 1−α(1−1/n)', 'Osmosis moves solvent through a semipermeable membrane toward higher solute concentration'],
    worked: ['0.10 mol CaCl₂ is dissolved to make 1.0 L at 300 K. If 80% dissociates, find osmotic pressure.', ['CaCl₂ gives ν = 3 ions.', 'i = 1 + 0.80(3−1) = 2.60.', 'Use π = iCRT = 2.60 × 0.10 × 0.0821 × 300.'], 'π ≈ 6.40 atm.', 'Complete dissociation would give i = 3, so the answer must be below 7.39 atm.'],
    examTips: ['Write the concentration denominator with its unit before substituting.', 'In vapour-pressure questions identify volatile versus non-volatile components first.', 'Use osmotic pressure for biomolecules because it is measurable at room temperature and very dilute concentration.'],
    traps: ['Using kg of solution instead of kg of solvent in molality', 'Assuming i equals the number of ions even when α is given', 'Reading high KH as high solubility'],
    memoryHook: 'Molarity owns litres; molality owns kilograms of solvent; colligative properties count particles, not identities.',
    guidedQuestions: [['Why is molality preferred when temperature changes?', 'Its denominator is mass of solvent.', 'Mass is temperature-independent, whereas solution volume—and therefore molarity—changes.'], ['Why can observed molar mass be smaller after dissociation?', 'Extra particles make the colligative effect larger.', 'If the calculation assumes i = 1, a larger measured effect is interpreted as more moles and hence a smaller molar mass.']]
  };

  school['Electrochemistry'] = {
    insight: 'Keep thermodynamics and wiring separate: a positive Ecell means the written redox reaction is spontaneous, while oxidation still occurs at the anode and reduction at the cathode.',
    whyItMatters: 'Cells, corrosion, electrolysis and conductivity unite redox chemistry with energy and quantitative current—high-yield territory for numericals and reasoning questions.',
    concepts: [
      ['Cell potential', 'E°cell = E°cathode − E°anode using reduction potentials. ΔG° = −nFE° and ln K = nFE°/RT connect voltage to spontaneity and equilibrium.', 'anode | oxidation || reduction | cathode'],
      ['Nernst correction', 'E = E° − (0.0591/n)log Q at 298 K. Pure solids and liquids are absent from Q; reverse the reaction and Q inverts.', 'reaction quotient Q rises → driving voltage falls'],
      ['Conductance', 'κ describes a sample-independent conducting ability; molar conductivity Λm = κ×1000/C rises on dilution, sharply for weak electrolytes.', 'dilution ↑ → interionic drag ↓ → Λm ↑']
    ],
    mustKnow: ['Salt bridge maintains electrical neutrality and completes the circuit', 'At equilibrium Ecell = 0 and Q = K', 'Faraday law: deposited mass = ItM/(nF)', 'Kohlrausch law adds independent limiting ionic conductivities'],
    worked: ['For Zn|Zn²⁺(0.10 M)||Cu²⁺(1.0 M)|Cu, E°cell = 1.10 V. Find E at 298 K.', ['Reaction: Zn + Cu²⁺ → Zn²⁺ + Cu; n = 2.', 'Q = [Zn²⁺]/[Cu²⁺] = 0.10.', 'E = 1.10 − (0.0591/2)log(0.10).'], 'E ≈ 1.130 V.', 'Lower product/reactant ratio than standard makes the forward reaction more favourable, so E should exceed 1.10 V.'],
    examTips: ['Write the balanced net reaction before n and Q.', 'Never multiply E° by stoichiometric coefficients; multiply ΔG°, not potential.', 'In electrolysis, convert time to seconds before using Q = It.'],
    traps: ['Calling the galvanic anode positive', 'Including solid metals in Q', 'Confusing conductivity κ with conductance G'],
    memoryHook: 'AN OX, RED CAT: anode oxidation, cathode reduction—always; only electrode signs change by cell type.',
    guidedQuestions: [['Why does Ecell become zero at equilibrium?', 'There is no net driving force.', 'Forward and reverse chemical potentials balance, so ΔG = −nFE is zero.'], ['Why does Λm of a weak electrolyte rise steeply on dilution?', 'Dilution increases ionisation as well as mobility.', 'Strong electrolytes mainly lose interionic interactions; weak electrolytes also create many more ions.']]
  };

  school['Chemical Kinetics'] = {
    insight: 'Rate laws are experimental fingerprints, not equations obtained from the overall balanced reaction—unless the reaction is a single elementary step.',
    whyItMatters: 'Order, half-life and Arrhenius plots let you identify a mechanism’s kinetic behaviour and predict shelf life, reaction time and temperature effects.',
    concepts: [
      ['Rate law and order', 'For rate = k[A]^m[B]^n, overall order is m+n. Units of k follow concentration^(1−order) time⁻¹.', 'initial concentrations → measured rate → exponents'],
      ['Integrated laws', 'Zero order gives [A]=[A]₀−kt and constant-rate depletion; first order gives ln([A]₀/[A])=kt and concentration-independent half-life.', 'zero: [A] vs t straight; first: ln[A] vs t straight'],
      ['Activation energy', 'k = Ae^(−Ea/RT); a catalyst supplies a lower-Ea path but changes neither ΔG nor equilibrium.', 'reactants ↗ lower catalysed peak ↘ products']
    ],
    mustKnow: ['First-order t½ = 0.693/k; zero-order t½ = [A]₀/(2k)', 'Molecularity applies only to an elementary step and is always a positive integer', 'Pseudo-first order holds when one reactant remains effectively constant', 'Slope of ln k versus 1/T is −Ea/R'],
    worked: ['A first-order reaction is 75% complete in 40 min. Find its half-life.', ['25% remains, so [A]₀/[A] = 4.', 'k = ln4/40 = 0.03466 min⁻¹.', 't½ = 0.693/k.'], 't½ = 20 min.', '75% completion is two half-lives: 100% → 50% → 25% remaining.'],
    examTips: ['Translate percent complete into fraction remaining before using an integrated law.', 'Identify order from how half-life depends on initial concentration.', 'Use two-temperature Arrhenius form to avoid calculating A.'],
    traps: ['Equating reaction order with stoichiometric coefficient', 'Using 75/100 as concentration remaining when 75% is complete', 'Saying a catalyst increases equilibrium yield'],
    memoryHook: 'First order halves on a clock; zero order removes equal concentration chunks on a clock.',
    guidedQuestions: [['Can a reaction have fractional order?', 'Yes.', 'Order is experimentally fitted and need not match molecularity or stoichiometry.'], ['Why does a catalyst not alter K?', 'It lowers forward and reverse activation barriers without changing state energies.', 'Equilibrium depends on ΔG°, not the route taken.']]
  };

  school['The d- and f-Block Elements'] = {
    insight: 'Most transition-metal behaviour follows from one fact: ns and (n−1)d orbitals are close in energy, so oxidation state, colour, magnetism and complex formation change together.',
    whyItMatters: 'Board questions reward explanation of trends and exceptions—especially configurations, oxidation states, colour, magnetic moment and lanthanoid contraction.',
    concepts: [
      ['Variable oxidation states', 'Both ns and (n−1)d electrons can bond. Higher states are stabilised by O/F; +2 becomes more stable across the first row as removing the third electron gets harder.', 'Sc +3 → middle many states → Zn +2'],
      ['Colour and magnetism', 'Partly filled d orbitals allow d–d transitions and unpaired spins. Spin-only moment μ = √n(n+2) BM; d⁰ and d¹⁰ ions are usually colourless.', 'unpaired electrons n → magnetic moment'],
      ['Lanthanoid contraction', 'Poor 4f shielding causes a steady Ln³⁺ radius decrease, making 4d/5d pairs similar and lanthanoids hard to separate.', 'La³⁺ > … > Lu³⁺ radius']
    ],
    mustKnow: ['Cr is [Ar]3d⁵4s¹ and Cu is [Ar]3d¹⁰4s¹', 'On ionisation, 4s electrons leave before 3d', 'KMnO₄ and K₂Cr₂O₇ are strong oxidants in acidic medium', 'Zn, Cd and Hg are d-block but not transition elements by the incomplete-d definition'],
    worked: ['Predict spin-only magnetic moment and colour tendency of Fe³⁺.', ['Fe: [Ar]3d⁶4s²; remove 4s² and one 3d electron.', 'Fe³⁺ is 3d⁵ with five unpaired electrons in the free ion.', 'μ = √[5(5+2)] = √35 BM.'], 'μ ≈ 5.92 BM; it is paramagnetic and generally coloured.', 'Five unpaired electrons is the maximum high-spin d count, so the moment should be large.'],
    examTips: ['Write the ion configuration after removing ns electrons first.', 'When explaining colour, mention incomplete d subshell and electronic transition—not merely “transition element”.', 'Attach a consequence to lanthanoid contraction, such as Zr/Hf similarity.'],
    traps: ['Writing Fe²⁺ as 3d⁴4s²', 'Calling Zn a transition element because it lies in the d block', 'Assuming every transition-metal compound is coloured'],
    memoryHook: 'Close energies create many choices: oxidation states, unpaired spins, colours and complexes.',
    guidedQuestions: [['Why is Cu⁺ colourless but Cu²⁺ coloured?', 'Cu⁺ is d¹⁰; Cu²⁺ is d⁹.', 'A filled d subshell lacks ordinary d–d transitions, while d⁹ has available split d levels.'], ['Why are Zr and Hf radii so similar?', 'Lanthanoid contraction offsets the expected period increase.', 'Poor 4f shielding contracts Hf after the lanthanoids.']]
  };

  school['Coordination Compounds'] = {
    insight: 'Solve complexes in a fixed order: charge → oxidation state → d count → coordination number/shape → ligand-field occupancy → magnetic behaviour and name.',
    whyItMatters: 'This chapter compresses nomenclature, isomerism, bonding and colour into predictable algorithms and is among the most scorable inorganic units.',
    concepts: [
      ['Coordination language', 'Ligands donate lone pairs to a central metal. Coordination number counts donor atoms, not ligand molecules; en is bidentate and EDTA is hexadentate.', '[metal(ligands)] charge; counter-ion outside'],
      ['Naming and isomerism', 'Name ligands alphabetically before metal; an anionic complex ends in -ate. Geometrical, optical, linkage and ionisation isomers preserve formula but alter arrangement/bonding.', 'cis/trans positions; mirror-image Δ/Λ forms'],
      ['Crystal-field decisions', 'Ligands split d levels. Compare Δ with pairing energy: strong fields pair electrons; weak fields retain more unpaired electrons.', 'octahedral: t₂g lower, e_g higher']
    ],
    mustKnow: ['Oxidation state follows total complex charge after ligand charges are included', 'Spectrochemical trend: weak I⁻ < Br⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ < CO strong', 'Tetrahedral complexes are usually high spin', 'Chelation increases stability through multiple donor attachments'],
    worked: ['Analyse [Fe(CN)₆]⁴⁻: oxidation state, d count and magnetism.', ['Six CN⁻ contribute −6; complex charge −4 gives Fe = +2.', 'Fe²⁺ is d⁶.', 'CN⁻ is strong field: octahedral electrons pair as t₂g⁶e_g⁰.'], 'Hexacyanidoferrate(II) is low-spin d⁶ and diamagnetic.', 'All six d electrons are paired in t₂g, so n = 0 and μ = 0.'],
    examTips: ['Show ligand-charge arithmetic before stating oxidation state.', 'For magnetism, write metal d count and split-orbital occupancy.', 'Alphabetise ligand names while ignoring multiplicative prefixes such as di- and bis-.'],
    traps: ['Counting two en ligands as coordination number 2 instead of 4', 'Using metal atomic number without correcting oxidation state', 'Assuming CN⁻ is weak because it is negatively charged'],
    memoryHook: 'Charge first, d count second, field third—then shape, spin and colour stop being guesses.',
    guidedQuestions: [['Why is [Ni(CN)₄]²⁻ square planar but [NiCl₄]²⁻ tetrahedral?', 'CN⁻ strongly pairs d⁸ electrons; Cl⁻ does not.', 'Strong-field pairing permits dsp² square-planar hybridisation, while weak-field chloride favours sp³ tetrahedral geometry.'], ['What makes a chelate more stable?', 'Several donor bonds hold one ligand to the same metal.', 'Breaking one bond does not fully detach it, and chelation is often entropically favoured.']]
  };

  school['Haloalkanes and Haloarenes'] = {
    insight: 'For every substitution or elimination, inspect four things before predicting product: substrate structure, nucleophile/base, solvent and temperature.',
    whyItMatters: 'Mechanism controls rate, stereochemistry and competing products; this reasoning is more reliable than memorising disconnected reaction arrows.',
    concepts: [
      ['SN1 versus SN2', 'SN1 forms a planar carbocation and favours stable 3° substrates/polar protic solvent; SN2 is one-step backside attack and favours unhindered methyl/1° substrates.', 'SN2: Nu⁻ → C—X → inversion'],
      ['Elimination competition', 'Strong bulky base and heat promote β-elimination. Zaitsev alkene usually dominates, but bulky base can favour the less substituted Hofmann product.', 'β-H—C—C—X → C=C'],
      ['Aryl-halide resistance', 'Chlorobenzene has resonance-strengthened partial double C–Cl character, sp² carbon and no easy SN1/SN2 route; harsh conditions are needed.', 'aryl C—Cl ↔ resonance gives shortened bond']
    ],
    mustKnow: ['Leaving-group ability generally I⁻ > Br⁻ > Cl⁻ >> F⁻', 'SN2 gives inversion at a stereocentre; SN1 tends toward racemisation', 'Aqueous KOH favours substitution; alcoholic KOH and heat favour elimination', 'Finkelstein uses NaI/acetone; Swarts prepares alkyl fluorides'],
    worked: ['Predict the major product when 2-bromobutane is heated with alcoholic KOH.', ['Alcoholic KOH supplies a strong base under elimination conditions.', 'Remove β-H from either adjacent carbon while Br leaves.', 'The more substituted internal alkene is favoured; trans is more stable than cis.'], 'trans-2-butene is major (with cis-2-butene and 1-butene minor).', 'The major product is the more substituted, less sterically crowded alkene.'],
    examTips: ['Write conditions over every organic arrow.', 'State both mechanism and stereochemical result when a chiral substrate appears.', 'For conversions, count carbons before and after each reagent.'],
    traps: ['Predicting SN2 at a tertiary carbon', 'Treating chlorobenzene like chloroethane', 'Using aqueous and alcoholic KOH interchangeably'],
    memoryHook: 'Crowding blocks backside attack; heat and base seek a β-hydrogen; resonance locks aryl halide.',
    guidedQuestions: [['Why is tert-butyl bromide fast in SN1?', 'It forms a stable tertiary carbocation.', 'Hyperconjugation and inductive donation stabilise the rate-determining intermediate.'], ['Why does NaI in acetone drive the Finkelstein reaction?', 'NaCl or NaBr precipitates.', 'Removing a product shifts the substitution equilibrium forward.']]
  };

  school['Alcohols, Phenols and Ethers'] = {
    insight: 'The oxygen group is the same, but its carbon environment changes everything: phenol stabilises phenoxide by resonance, alcohols oxidise by available α-hydrogen, and ethers mainly cleave under strong acid.',
    whyItMatters: 'Acidity order, named preparations, oxidation and electrophilic substitution generate predictable board conversions and distinction tests.',
    concepts: [
      ['Acidity', 'Phenol is more acidic than alcohol because phenoxide delocalises charge. Electron-withdrawing ring groups stabilise phenoxide; electron donors weaken acidity.', 'phenoxide: negative charge shared at O, ortho, para'],
      ['Alcohol reactions', 'Primary alcohol → aldehyde → acid; secondary → ketone; tertiary resists normal oxidation. Dehydration follows carbocation stability where rearrangement is possible.', '1° RCH₂OH → RCHO → RCOOH'],
      ['Ether chemistry', 'Williamson synthesis is SN2, best with a primary alkyl halide. Hot concentrated HI/HBr cleaves C–O, usually at the less hindered alkyl side unless aryl/tertiary rules intervene.', 'RO⁻ + R′X → ROR′ + X⁻']
    ],
    mustKnow: ['Lucas test: tertiary alcohol clouds fastest, secondary slower, primary only on heating', 'Phenol gives violet colour with neutral FeCl₃', 'Phenol + CHCl₃/NaOH gives salicylaldehyde (Reimer–Tiemann)', 'Phenol + CO₂/NaOH then acid gives salicylic acid (Kolbe reaction)'],
    worked: ['Choose reagents to convert propene to propan-1-ol rather than propan-2-ol.', ['Direct acid hydration is Markovnikov and gives propan-2-ol.', 'Use hydroboration–oxidation: BH₃·THF followed by H₂O₂/OH⁻.', 'B and then OH attach at the less substituted carbon without rearrangement.'], 'Propene →(BH₃·THF; H₂O₂/OH⁻) propan-1-ol.', 'The OH must finish at terminal carbon, confirming anti-Markovnikov hydration.'],
    examTips: ['Draw phenoxide resonance when justifying phenol acidity.', 'Check whether the carbon bearing OH has zero, one or two hydrogens before oxidation.', 'Williamson: put the less hindered fragment on the halide.'],
    traps: ['Claiming alcohol is more acidic because alkoxide has oxygen', 'Using a tertiary halide in Williamson and ignoring elimination', 'Cleaving the aryl C–O bond of anisole with HI'],
    memoryHook: 'Phenol shares charge, alcohol changes oxidation level, ether needs acid to split.',
    guidedQuestions: [['Why is p-nitrophenol more acidic than phenol?', 'The nitro group stabilises phenoxide by withdrawal.', 'Its −I and −R effects disperse the conjugate-base charge.'], ['Why does tertiary alcohol resist oxidation?', 'It has no hydrogen on the carbon bearing OH.', 'Normal oxidation to C=O requires removal of that α-hydrogen without breaking C–C bonds.']]
  };

  school['Aldehydes, Ketones and Carboxylic Acids'] = {
    insight: 'Carbonyl chemistry is electron-flow chemistry: nucleophiles attack electrophilic carbonyl carbon; substituents control reactivity, and the presence of α-hydrogen decides condensation behaviour.',
    whyItMatters: 'Named reactions and chemical tests are easiest when organised by carbonyl reactivity rather than memorised as isolated equations.',
    concepts: [
      ['Nucleophilic addition', 'Aldehydes are usually more reactive than ketones because they have less steric crowding and less +I donation. Attack gives a tetrahedral intermediate.', 'Nu⁻ → Cδ+=Oδ− → tetrahedral alkoxide'],
      ['α-H reactions', 'Carbonyl compounds with α-H form enolates and undergo aldol; those without α-H may undergo Cannizzaro in concentrated base.', 'α-C—H → enolate → C—C bond'],
      ['Carboxylic acidity', 'Carboxylate is resonance-stabilised over two oxygens. Electron-withdrawing groups increase acidity, with effect weakening with distance.', 'RCOO⁻: two equivalent C—O bonds']
    ],
    mustKnow: ['Tollens oxidises aldehydes to give silver mirror; Fehling usually detects aliphatic aldehydes', 'Iodoform detects CH₃CO− and CH₃CH(OH)− groups', 'Clemmensen Zn(Hg)/HCl is acidic; Wolff–Kishner NH₂NH₂/KOH is basic', 'HVZ introduces halogen at α-carbon of a carboxylic acid'],
    worked: ['Predict products of ethanal with dilute NaOH followed by heating.', ['Ethanal has α-hydrogens, so it forms an enolate.', 'Enolate attacks another ethanal to form 3-hydroxybutanal.', 'Heating dehydrates the aldol to an α,β-unsaturated aldehyde.'], 'Major product: but-2-enal (crotonaldehyde).', 'Two C₂ units must give a C₄ product; dehydration removes H₂O.'],
    examTips: ['Mark α-carbon and α-hydrogens before choosing aldol or Cannizzaro.', 'In conversion chains, choose Clemmensen versus Wolff–Kishner to suit acid/base-sensitive groups.', 'Write the observation as well as reagent in distinction tests.'],
    traps: ['Giving Cannizzaro to an aldehyde that has α-H', 'Saying all ketones give iodoform', 'Ranking ketones above aldehydes for nucleophilic addition'],
    memoryHook: 'α-H opens aldol; no α-H opens Cannizzaro; CH₃CO opens iodoform.',
    guidedQuestions: [['Why is methanal most reactive toward nucleophilic addition?', 'It has no alkyl donation and minimum steric hindrance.', 'Both electronic and steric effects make its carbonyl carbon most accessible and electrophilic.'], ['Why is carboxylic acid stronger than phenol?', 'Carboxylate shares charge equally over two electronegative oxygens.', 'Its conjugate base has stronger, equivalent resonance stabilisation.']]
  };

  school['Amines'] = {
    insight: 'Basicity is a competition between electron availability and conjugate-acid solvation; this is why gas-phase, aqueous and aromatic orders need not match.',
    whyItMatters: 'Basicity order, diazonium chemistry and amine tests connect structure to synthesis and are frequent conversion/reasoning questions.',
    concepts: [
      ['Basicity decisions', 'Alkyl +I effects increase N electron density, but aqueous solvation and steric hindrance modify the order. Aniline is weaker because its lone pair delocalises into the ring.', 'aniline lone pair → aromatic ring resonance'],
      ['Preparation and tests', 'Reduction of nitro/nitrile/amide compounds and Gabriel synthesis prepare amines; carbylamine identifies primary amines only.', '1° amine + CHCl₃ + KOH → foul-smelling isocyanide'],
      ['Diazonium hub', 'At 273–278 K, aniline forms a diazonium salt that can become Cl, Br, I, F, CN, OH or an azo dye—an invaluable aromatic conversion junction.', 'ArNH₂ → ArN₂⁺ → many Ar–X products']
    ],
    mustKnow: ['Hinsberg reagent distinguishes 1°, 2° and 3° amines by sulfonamide behaviour', 'Gabriel synthesis gives primary aliphatic amines, not aryl amines', 'Aniline brominates readily to 2,4,6-tribromoaniline in bromine water', 'Diazotisation temperature must remain 273–278 K'],
    worked: ['Plan conversion aniline → chlorobenzene.', ['Dissolve aniline in HCl and cool to 273–278 K.', 'Add NaNO₂ to generate benzenediazonium chloride.', 'Treat with CuCl/HCl (Sandmeyer reaction), releasing N₂.'], 'C₆H₅NH₂ → C₆H₅N₂⁺Cl⁻ → C₆H₅Cl.', 'Carbon skeleton remains six carbons; loss of very stable N₂ drives substitution.'],
    examTips: ['State solvent/phase when comparing basicity.', 'Use diazonium as the map centre for aromatic conversions.', 'For Hinsberg, track whether the product dissolves in alkali and/or acid.'],
    traps: ['Applying Gabriel synthesis to make aniline', 'Keeping diazonium salt at room temperature', 'Using +I alone to rank aqueous methylamines'],
    memoryHook: 'Cool aniline to diazonium—the nitrogen exit door that lets Cl, Br, I, CN, OH and dyes enter.',
    guidedQuestions: [['Why is aniline less basic than ammonia?', 'Its lone pair is delocalised into benzene.', 'Protonation removes this resonance stabilisation, so the lone pair is less available.'], ['Why does amide reduction give an amine with the same carbon count?', 'LiAlH₄ converts C=O to CH₂.', 'The carbonyl carbon remains in the chain rather than being removed.']]
  };

  school['Biomolecules'] = {
    insight: 'Do not memorise biomolecules as lists: identify the monomer, the linkage joining monomers, the structural level and the chemical test or biological consequence.',
    whyItMatters: 'Boards and JEE test fine distinctions—reducing versus non-reducing sugars, peptide and glycosidic links, denaturation, and DNA/RNA structure.',
    concepts: [
      ['Carbohydrate structure', 'Monosaccharides cyclise as hemiacetals; a free anomeric carbon allows ring opening and reducing behaviour. A glycosidic bond can lock that carbon.', 'open chain ⇄ α/β cyclic anomers'],
      ['Proteins', 'A peptide bond joins amino acids. Primary sequence folds into secondary and tertiary structure; denaturation disrupts higher structure without normally cleaving peptide bonds.', 'amino acids → peptide chain → folded protein'],
      ['Nucleic acids', 'Nucleotides contain base + sugar + phosphate and connect through 3′–5′ phosphodiester bonds. DNA uses T/deoxyribose; RNA uses U/ribose.', '5′ phosphate—sugar/base—3′ linkage']
    ],
    mustKnow: ['Glucose is an aldohexose; fructose a ketohexose yet can reduce Tollens in base by tautomerisation', 'Sucrose is non-reducing; maltose and lactose are reducing', 'Essential amino acids must be obtained through diet', 'A–T has two H bonds; G–C has three'],
    worked: ['Explain why sucrose is non-reducing but maltose is reducing.', ['Locate the anomeric carbons in each glycosidic linkage.', 'Sucrose links both anomeric centres, leaving no free hemiacetal.', 'Maltose uses one anomeric carbon and leaves the other free to open.'], 'Sucrose cannot expose a carbonyl group; maltose can and therefore reduces mild oxidants.', 'The conclusion must follow the free-anomeric-carbon test, not simply “disaccharide”.'],
    examTips: ['Draw or describe the bonded anomeric carbons for reducing behaviour.', 'Distinguish hydrolysis of primary structure from denaturation of higher structure.', 'For vitamins, pair solubility with storage: A/D/E/K fat-soluble; B/C water-soluble.'],
    traps: ['Calling every sugar a reducing sugar', 'Saying denaturation breaks all peptide bonds', 'Confusing nucleoside with nucleotide'],
    memoryHook: 'Monomer—linkage—shape—function: four questions organise every biomolecule.',
    guidedQuestions: [['What extra component turns a nucleoside into a nucleotide?', 'A phosphate group.', 'Base + sugar is a nucleoside; adding phosphate gives a nucleotide.'], ['Why can fructose reduce Tollens reagent?', 'In alkaline medium it tautomerises through an enediol to aldoses.', 'The test conditions create reducing aldehyde forms even though fructose begins as a ketose.']]
  };

  Object.entries(school).forEach(([title, data]) => add(root.school, title, data));

  const jee = {};
  jee['Some Basic Concepts in Chemistry'] = {
    insight: 'Stoichiometry is an accounting system: convert every given quantity to moles, identify the limiting reagent, then convert only the requested result into its final unit.',
    whyItMatters: 'Nearly every quantitative chemistry chapter assumes fluent mole, composition, concentration and limiting-reagent reasoning.',
    concepts: [['Mole bridge', 'Moles connect mass, particles, gas volume and solution concentration; never jump directly between unlike quantities.', 'mass ÷ molar mass → moles → particles or volume'], ['Limiting reagent', 'Compare available moles divided by stoichiometric coefficients; the smallest reaction extent limits product.', 'nᵢ/νᵢ → minimum ξ'], ['Precision', 'Significant figures express measurement certainty; dimensional analysis exposes wrong conversions before arithmetic.', 'number × unit factors → target unit']],
    mustKnow: ['NA = 6.022×10²³ mol⁻¹', 'Molecular formula = integer × empirical formula', 'At fixed T,P gas volume ratios follow stoichiometric mole ratios', 'Equivalent concepts must still respect the actual redox/acid-base reaction'],
    worked: ['10 g H₂ reacts with 64 g O₂. Find water formed.', ['n(H₂)=10/2=5 mol; n(O₂)=64/32=2 mol.', 'For 2H₂+O₂→2H₂O, extents are 5/2 and 2/1; O₂ limits.', '2 mol O₂ produces 4 mol H₂O.'], '4×18 = 72 g H₂O.', 'Total consumed mass is 8 g H₂ + 64 g O₂ = 72 g.'],
    examTips: ['Write balanced equation before calculations.', 'Use reaction extent to avoid intuitive limiting-reagent errors.', 'Retain guard digits until the final significant-figure rounding.'],
    traps: ['Comparing reagent masses rather than stoichiometric moles', 'Using 22.4 L mol⁻¹ away from STP without checking convention', 'Rounding intermediate steps'],
    memoryHook: 'Everything enters the reaction ledger as moles.',
    guidedQuestions: [['What determines the limiting reagent?', 'The smallest n/stoichiometric coefficient.', 'That reactant supports the fewest complete reaction extents.'], ['Why may empirical and molecular formula differ?', 'The empirical formula is only the simplest ratio.', 'Molar mass determines the integer multiple of that ratio.']]
  };

  jee['Atomic Structure'] = {
    insight: 'Quantum numbers are an address, not an orbit: they specify allowed energy, shape, orientation and spin, while probability replaces a fixed electron path.',
    whyItMatters: 'Electronic configuration, spectra, periodic trends and bonding all depend on correctly counting states and comparing orbital energies.',
    concepts: [['Wave-particle model', 'E=hν and λ=h/p connect photons and matter waves; uncertainty prevents simultaneous exact position and momentum.', 'particle momentum p ↔ wavelength h/p'], ['Quantum addresses', 'n sets shell, l subshell, ml orientation and ms spin; allowed values automatically count orbitals and electrons.', 'n → l=0…n−1 → ml=−l…+l'], ['Configuration', 'Aufbau uses n+l ordering, Pauli limits two opposite spins per orbital, and Hund maximises singly occupied degenerate orbitals.', '□ ↑  □ ↑  □ ↑ before pairing']],
    mustKnow: ['Shell n has n² orbitals and capacity 2n²', 'Subshell l has 2l+1 orbitals and 4l+2 electrons', 'Hydrogen-like En = −13.6Z²/n² eV', 'Nodes: total n−1; angular l; radial n−l−1'],
    worked: ['Find wavelength for H transition n=3 to n=2.', ['Use 1/λ=R(1/2²−1/3²).', 'Difference = 5/36.', 'λ=36/(5R).'], 'λ ≈ 656 nm.', 'This is Balmer emission, so visible red wavelength is sensible.'],
    examTips: ['Check emission versus absorption sign before energy.', 'Reject impossible quantum-number sets by allowed ranges.', 'For ions, remove ns electrons before (n−1)d.'],
    traps: ['Treating orbital as a circular path', 'Allowing l=n', 'Filling paired p electrons before each p orbital is singly occupied'],
    memoryHook: 'n shell, l shape, ml direction, ms spin.',
    guidedQuestions: [['How many orbitals are in 4d?', 'Five.', 'For d, l=2, so ml has five values −2 to +2.'], ['Why does 4s fill before 3d but ionise first?', 'Orbital energies reorder after occupation.', 'In transition-metal atoms, 4s becomes higher/more external once 3d is occupied.']]
  };

  jee['Chemical Bonding and Molecular Structure'] = {
    insight: 'Use a hierarchy: Lewis electron count first, formal charge and resonance second, VSEPR shape third, then hybridisation/MO theory where it explains bond order or magnetism.',
    whyItMatters: 'This unit predicts geometry, polarity, stability and magnetic behaviour and feeds directly into inorganic and organic mechanisms.',
    concepts: [['Lewis and resonance', 'Best contributors minimise formal charge and place negative charge on electronegative atoms; the real molecule is a resonance hybrid.', 'multiple contributors ↔ one delocalised hybrid'], ['VSEPR', 'Electron domains repel in order LP–LP > LP–BP > BP–BP; count multiple bonds as one domain but stronger repulsion.', 'electron geometry − lone-pair positions → shape'], ['Molecular orbitals', 'Bond order=(Nb−Na)/2; unpaired MO electrons explain paramagnetism, including O₂.', 'AOs combine → bonding MO + antibonding MO*']],
    mustKnow: ['Dipole moment is vector sum, so symmetric polar bonds may cancel', 'Lone pairs prefer equatorial sites in trigonal bipyramidal geometry', 'Hydrogen bonding raises boiling point and structures water/biomolecules', 'Bond order rises as bond length generally falls'],
    worked: ['Predict shape, hybridisation and polarity of SF₄.', ['S has four bond pairs and one lone pair: five domains.', 'Trigonal-bipyramidal electron geometry; lone pair occupies equatorial site.', 'Molecular shape is seesaw, often described sp³d.'], 'SF₄ is seesaw and polar.', 'Asymmetric shape prevents S–F dipoles from cancelling.'],
    examTips: ['Count electron domains on the central atom, including lone pairs.', 'Sketch bond-dipole vectors before declaring polarity.', 'Use MO filling—not Lewis structure—for magnetic character.'],
    traps: ['Equating electron geometry with molecular shape', 'Putting a lone pair axial in TBP', 'Calling O₂ diamagnetic'],
    memoryHook: 'Count, arrange, remove lone-pair labels, then test symmetry.',
    guidedQuestions: [['Why is NH₃ pyramidal but BF₃ planar?', 'NH₃ has one lone pair; BF₃ has none.', 'Four electron domains give tetrahedral electron geometry for NH₃, while three give trigonal planar BF₃.'], ['Why is O₂ paramagnetic?', 'It has two unpaired electrons in π* orbitals.', 'MO filling places one electron in each degenerate antibonding π orbital.']]
  };

  jee['Chemical Thermodynamics'] = {
    insight: 'Thermodynamics is sign-controlled bookkeeping: define the system, use state functions for endpoints, and let ΔG—not heat alone—decide spontaneity.',
    whyItMatters: 'Enthalpy cycles, entropy and free energy determine whether reactions can occur and connect directly to equilibrium and electrochemistry.',
    concepts: [['First law', 'ΔU=q+w with chemistry sign convention; pressure-volume work w=−PextΔV. At constant volume qv=ΔU.', 'energy in as q/w → ΔU'], ['Enthalpy cycles', 'At constant pressure qp=ΔH; Hess law works because enthalpy is a state function. Use formation enthalpies products minus reactants.', 'alternate reaction paths share same ΔH'], ['Free energy', 'ΔG=ΔH−TΔS; spontaneous at specified conditions means ΔG<0. ΔG°=−RT lnK.', 'enthalpy drive versus entropy×temperature']],
    mustKnow: ['For ideal-gas reactions ΔH=ΔU+ΔngRT', 'Standard enthalpy of formation of an element in its standard state is zero', 'Entropy is state function and generally rises with gas moles/dispersal', 'Spontaneous does not mean fast'],
    worked: ['For ΔH=+40 kJ mol⁻¹ and ΔS=+100 J mol⁻¹K⁻¹, above what T is reaction spontaneous?', ['Convert ΔS=0.100 kJ mol⁻¹K⁻¹.', 'Set ΔG=ΔH−TΔS<0.', 'T>ΔH/ΔS=40/0.100.'], 'T > 400 K.', 'Endothermic with positive entropy becomes favourable only at sufficiently high T.'],
    examTips: ['Convert entropy units before combining with kJ enthalpy.', 'Reverse a Hess equation: reverse ΔH sign; multiply equation: multiply ΔH.', 'Use Δng for gaseous species only.'],
    traps: ['Calling exothermic always spontaneous', 'Using bond enthalpy products minus reactants instead of bonds broken minus formed', 'Treating q and w as state functions'],
    memoryHook: 'Free energy asks whether enthalpy can pay the temperature-weighted entropy bill.',
    guidedQuestions: [['Can a spontaneous reaction be slow?', 'Yes.', 'Thermodynamics supplies driving force; kinetics controls the activation barrier and rate.'], ['When is ΔH equal to heat?', 'At constant pressure with only PV work.', 'Under those conditions qp equals the enthalpy change.']]
  };

  jee['Equilibrium'] = {
    insight: 'Equilibrium calculations become systematic when you write the balanced reaction, construct Q or K from activities, and use an ICE change that respects stoichiometry.',
    whyItMatters: 'Chemical and ionic equilibria underpin yield, buffers, solubility, titration and electrochemical voltage.',
    concepts: [['K and Q', 'K is the equilibrium value of Q at a temperature. Q<K drives forward; Q>K drives reverse; pure solids/liquids are omitted.', 'Q position compared with fixed K'], ['Le Chatelier', 'A disturbance changes Q and the system shifts toward K. A catalyst changes neither Q nor K; temperature changes K.', 'disturbance → Q≠K → shift'], ['Ionic equilibrium', 'Ka, Kb, Kw and Ksp are specialised equilibrium constants. Buffers consume added acid/base through a conjugate pair.', 'weak acid ⇄ H⁺ + conjugate base']],
    mustKnow: ['Kp=Kc(RT)^Δng', 'pH+pOH=14 at 298 K', 'For conjugate pair KaKb=Kw', 'Precipitation begins when ionic product exceeds Ksp'],
    worked: ['Find pH of 0.10 M CH₃COOH, Ka=1.8×10⁻⁵.', ['Let [H⁺]=x; Ka=x²/(0.10−x).', 'Weak-ionisation approximation gives x≈√(1.8×10⁻⁶).', 'x=1.34×10⁻³ M; approximation is about 1.3%.'], 'pH ≈ 2.87.', 'A weak acid must have higher pH than 0.10 M strong acid (pH 1).'],
    examTips: ['Use Q before verbal shift rules.', 'Check the 5% approximation after solving.', 'In common-ion problems include all ion sources before Ksp.'],
    traps: ['Putting solids into K', 'Saying pressure changes every gas equilibrium', 'Using initial concentration directly as weak-acid [H⁺]'],
    memoryHook: 'Q tells where you are; K tells where the system wants to be.',
    guidedQuestions: [['Why does catalyst not change equilibrium composition?', 'It accelerates forward and reverse reactions equally.', 'The same equilibrium ratio is reached faster.'], ['When will AgCl precipitate?', 'When [Ag⁺][Cl⁻] > Ksp.', 'The ionic product then exceeds the maximum equilibrium dissolved product.']]
  };

  jee['Redox Reactions and Electrochemistry'] = school['Electrochemistry'];

  jee['Classification of Elements and Periodicity'] = {
    insight: 'Periodic trends are not arrows to memorise; compare effective nuclear charge, shell number, shielding and subshell stability, then explain the exceptions.',
    whyItMatters: 'These trends predict bonding, acidity, redox behaviour and inorganic reactivity throughout JEE chemistry.',
    concepts: [['Size', 'Across a period Zeff rises and radius falls; down a group new shells enlarge atoms. Cations shrink, anions expand, and isoelectronic size falls with nuclear charge.', 'N charge ↑ across same electron count → radius ↓'], ['Ionisation and affinity', 'Ionisation energy rises with Zeff but half/full subshell stability causes Be/B and N/O exceptions.', 'energy to remove electron depends on orbital and pairing'], ['Oxide character', 'Across a period oxides trend basic → amphoteric → acidic as metallic character declines.', 'Na₂O basic … Al₂O₃ amphoteric … Cl oxides acidic']],
    mustKnow: ['Zeff roughly rises across a period', 'Isoelectronic radius order is inverse to nuclear charge', 'Second ionisation energy jumps after a stable noble-gas configuration', 'Electronegativity increases across and decreases down generally'],
    worked: ['Arrange O²⁻, F⁻, Na⁺, Mg²⁺ by increasing radius.', ['All species contain 10 electrons.', 'For an isoelectronic series, greater nuclear charge pulls the cloud tighter.', 'Z values: O 8, F 9, Na 11, Mg 12.'], 'Mg²⁺ < Na⁺ < F⁻ < O²⁻.', 'Charge labels agree: highly positive ion should be compact and negative ion expanded.'],
    examTips: ['State the controlling factor and exception—not just the trend.', 'Check whether comparison is atoms, ions or an isoelectronic series.', 'Large successive-ionisation jump reveals valence-electron count.'],
    traps: ['Ranking isoelectronic ions by ionic charge alone without Z reasoning', 'Ignoring paired-electron repulsion in O versus N', 'Treating electron gain enthalpy and electronegativity as identical'],
    memoryHook: 'Shells set the scale; effective nuclear charge tightens the grip.',
    guidedQuestions: [['Why is IE₁(B) below IE₁(Be)?', 'B loses a higher-energy 2p electron.', 'Be loses from its filled, more penetrating 2s subshell.'], ['Why is Cl electron gain enthalpy more negative than F?', 'F’s compact 2p shell has stronger incoming-electron repulsion.', 'Cl offers a roomier 3p orbital despite lower nominal electronegativity.']]
  };

  jee['p-Block Elements'] = {
    insight: 'Organise p-block chemistry by oxidation state stability, central-atom size, bond strength and acid–base/redox behaviour; equations then become consequences rather than isolated facts.',
    whyItMatters: 'JEE questions mix NCERT facts with trend explanations, structures and product prediction across Groups 13–18.',
    concepts: [['Inert-pair effect', 'Down heavier p-block groups, the ns² pair participates less, stabilising oxidation states two below the group maximum.', 'Tl(I), Pb(II), Bi(III) gain stability downward'], ['Multiple bonding and catenation', 'Small second-period atoms form strong pπ–pπ bonds; heavier atoms favour single bonds and expanded coordination where allowed.', 'C=C strong; heavier E=E overlap weaker'], ['Oxoacid logic', 'For the same central atom, more terminal oxygen generally raises acidity by −I effect and conjugate-base resonance; O–H bonds govern basicity.', 'E(=O)n—OH → conjugate-base delocalisation']],
    mustKnow: ['BF₃ is electron-deficient yet B–F backbonding shortens bonds', 'NH₃ is more basic than PH₃ in water', 'H₃PO₂ is monobasic and reducing; only O–H protons are ionisable', 'Xe forms fluorides/oxides because its ionisation energy is accessible to strong oxidants'],
    worked: ['Rank HClO, HClO₂, HClO₃, HClO₄ by acidity.', ['All have the same central atom and one O–H bond.', 'Additional terminal oxygens withdraw electron density and stabilise conjugate base by resonance.', 'Acidity therefore rises with oxidation state/oxygen count.'], 'HClO < HClO₂ < HClO₃ < HClO₄.', 'The most oxygen-rich acid has the most stabilised conjugate base.'],
    examTips: ['Draw actual structures before counting basic/reducing hydrogens.', 'Use oxidation number to predict disproportionation possibilities.', 'Learn preparations with reagent, temperature and product state.'],
    traps: ['Calling every H in an oxoacid ionisable', 'Using simple electronegativity alone for hydride stability', 'Ignoring inert-pair stability in heavy elements'],
    memoryHook: 'Size controls overlap; oxidation state controls redox; O–H count controls basicity.',
    guidedQuestions: [['Why is H₃PO₂ monobasic?', 'Only one hydrogen is bonded to oxygen.', 'Its two P–H hydrogens are not released as protons in water.'], ['Why is BF₃ a Lewis acid?', 'B has only six valence-shell electrons.', 'It can accept an electron pair into an empty orbital.']]
  };

  jee['d- and f-Block Elements'] = school['The d- and f-Block Elements'];
  jee['Coordination Compounds'] = school['Coordination Compounds'];

  jee['Purification and Characterisation of Organic Compounds'] = {
    insight: 'Choose a purification method from the physical property that differs most—volatility, solubility, sublimability or adsorption—not from the compound’s name.',
    whyItMatters: 'Practical organic questions test method selection, elemental analysis and quantitative formula reasoning.',
    concepts: [['Purification choice', 'Crystallisation uses temperature-dependent solubility; distillation uses boiling-point difference; sublimation uses solid vapour pressure.', 'mixture property difference → separation method'], ['Chromatography', 'Components distribute differently between stationary and mobile phases; stronger stationary-phase attraction moves less.', 'spot travel/sample versus solvent front gives Rf'], ['Element estimation', 'Combustion converts C/H to measurable CO₂/H₂O; Kjeldahl estimates many nitrogens; Carius handles halogens/sulfur.', 'measured product mass → element moles → percentage']],
    mustKnow: ['Rf = distance solute/distance solvent front and is below 1', 'Steam distillation suits water-immiscible, steam-volatile compounds', 'Kjeldahl does not estimate N in nitro, azo or ring nitrogen reliably', 'Differential extraction uses immiscible solvents and partitioning'],
    worked: ['0.30 g compound gives 0.44 g CO₂. Find % carbon.', ['Moles/amount of C in CO₂ mass = (12/44)×0.44 g.', 'Carbon mass = 0.12 g.', 'Percentage = 0.12/0.30×100.'], '40.0% carbon.', 'Carbon mass must be less than sample mass.'],
    examTips: ['Name the property exploited after naming a technique.', 'Use element-to-product molar mass factor explicitly.', 'In chromatography mark baseline in pencil, not ink.'],
    traps: ['Using simple distillation for close boiling points', 'Letting Rf exceed 1', 'Applying Kjeldahl universally'],
    memoryHook: 'Separate by the biggest physical difference; characterise by converting an element into something measurable.',
    guidedQuestions: [['Why use reduced-pressure distillation?', 'It lowers boiling temperature.', 'High-boiling heat-sensitive liquids can distil before decomposing.'], ['What does a smaller Rf mean?', 'Stronger retention by stationary phase relative to mobile phase.', 'The solute travels a smaller fraction of the solvent-front distance.']]
  };

  jee['Some Basic Principles of Organic Chemistry'] = {
    insight: 'Organic answers follow electrons: identify electron-rich and electron-poor sites, compare intermediate stability, then draw arrows from electron source to sink.',
    whyItMatters: 'Electronic effects, acidity/basicity and mechanism logic control every later organic unit.',
    concepts: [['Electronic effects', 'Inductive effect acts through σ bonds and fades with distance; resonance delocalises through aligned p orbitals; hyperconjugation stabilises adjacent charge/π bonds.', 'σ withdrawal versus p-orbital delocalisation'], ['Intermediates', 'Carbocations favour resonance and substitution; carbanions favour electron-withdrawing stabilisation; radicals follow resonance/hyperconjugation trends.', 'stability controls pathway and rearrangement'], ['Acid-base structure', 'Acidity rises when the conjugate base is stabilised by electronegativity, resonance, −I effect or greater s character.', 'acid ⇄ H⁺ + stabilised conjugate base']],
    mustKnow: ['Curved arrow begins at an electron pair/bond and ends where electrons go', 'Carbocation rearrangements occur by 1,2-hydride/alkyl shift to a more stable centre', 'Aromatic compounds require cyclic planar conjugation with (4n+2) π electrons', 'Purity and mechanism cannot be inferred from IUPAC name alone'],
    worked: ['Rank ethane, ethene and ethyne in acidity.', ['Their conjugate bases place charge on sp³, sp² and sp carbon.', 'Greater s character holds electron density closer to nucleus and stabilises negative charge.', 's character: sp 50% > sp² 33% > sp³ 25%.'], 'ethyne > ethene > ethane.', 'Corresponding pKa values should decrease as s character rises.'],
    examTips: ['Draw conjugate bases when comparing acidity.', 'Before selecting major product, test resonance and rearrangement.', 'Use full curved arrows rather than memorised names.'],
    traps: ['Drawing arrows from positive charge', 'Assuming more alkyl groups stabilise carbanions', 'Calling every cyclic conjugated molecule aromatic'],
    memoryHook: 'Electron source → electron sink; stable intermediate → favoured path.',
    guidedQuestions: [['Why is allyl carbocation stable?', 'Its positive charge is resonance-delocalised.', 'Adjacent p orbitals share electron deficiency over more than one carbon.'], ['Why is phenol more acidic than cyclohexanol?', 'Phenoxide is resonance-stabilised.', 'Cyclohexoxide localises its negative charge on one oxygen.']]
  };

  jee['Hydrocarbons'] = {
    insight: 'Hydrocarbon reactions are controlled by bond type: alkanes undergo radical substitution, alkenes/alkynes electrophilic addition, and benzene preserves aromaticity through substitution.',
    whyItMatters: 'Product, orientation, stereochemistry and oxidation questions train the mechanism patterns reused throughout organic chemistry.',
    concepts: [['Radical chains', 'Halogenation proceeds initiation, propagation and termination; bromination is slower but more selective than chlorination.', 'X₂ → 2X•; H abstraction; radical substitution'], ['π-bond addition', 'Electrophiles attack electron-rich π bonds. Markovnikov orientation follows the more stable carbocation unless peroxide-effect HBr uses a radical path.', 'C=C + E⁺ → carbocation → nucleophile'], ['Aromatic substitution', 'Benzene attacks an electrophile then loses H⁺ to restore aromaticity; substituents alter rate and directing position.', 'aromatic ring → σ complex → aromatic ring restored']],
    mustKnow: ['Peroxide effect is significant for HBr, not HCl or HI', 'Ozonolysis cleaves C=C and reveals carbonyl fragments', 'Terminal alkynes are acidic enough to form Ag/Cu acetylides', 'Friedel–Crafts fails on strongly deactivated rings and aniline–AlCl₃ complexes'],
    worked: ['Identify alkene whose reductive ozonolysis gives acetone and ethanal.', ['Reconnect the two carbonyl carbons with a double bond.', 'Acetone carbon contributes two CH₃ groups; ethanal carbon contributes CH₃ and H.', 'Construct (CH₃)₂C=CHCH₃.'], '2-methylbut-2-ene.', 'Cleaving the reconstructed double bond returns exactly C₃ + C₂ fragments.'],
    examTips: ['For ozonolysis, erase C=C and cap each carbon with O; reverse to reconstruct.', 'State peroxide presence before anti-Markovnikov HBr.', 'Use directing effects plus activation to predict aromatic products.'],
    traps: ['Applying peroxide effect to HCl', 'Giving addition rather than substitution for benzene', 'Forgetting rearrangement in acid-catalysed alkene addition'],
    memoryHook: 'σ bonds substitute by radicals; π bonds add; aromatic rings substitute to survive.',
    guidedQuestions: [['Why is bromination more selective than chlorination?', 'Its H-abstraction step is more sensitive to radical stability.', 'A later, more endothermic transition state resembles the radical product more strongly.'], ['How does ozonolysis locate a double bond?', 'Each alkene carbon becomes a carbonyl carbon.', 'Rejoining those carbonyl carbons reconstructs the original C=C.']]
  };

  jee['Organic Compounds Containing Halogens'] = school['Haloalkanes and Haloarenes'];
  jee['Organic Compounds Containing Oxygen'] = {
    ...school['Aldehydes, Ketones and Carboxylic Acids'],
    insight: 'Treat oxygen chemistry as a connected oxidation map—alcohol, carbonyl and acid—then overlay acidity, nucleophilic addition and ether/phenol exceptions.',
    whyItMatters: 'JEE combines alcohols, phenols, ethers, carbonyls and acids in multi-step conversions where reagent selectivity decides the route.',
    mustKnow: [...school['Aldehydes, Ketones and Carboxylic Acids'].mustKnow, 'PCC stops a primary alcohol at aldehyde; strong aqueous oxidants usually continue to acid']
  };
  jee['Organic Compounds Containing Nitrogen'] = school['Amines'];
  jee['Biomolecules'] = school['Biomolecules'];

  jee['Principles Related to Practical Chemistry'] = {
    insight: 'Practical chemistry is controlled observation: reagent, condition, visible change and inference form one inseparable answer.',
    whyItMatters: 'JEE tests salt analysis, functional-group tests, titration logic and laboratory precautions through outcomes that must be chemically justified.',
    concepts: [['Qualitative ions', 'Preliminary colour/flame/gas clues narrow possibilities; confirmatory tests use selective precipitation or complex formation under controlled pH.', 'sample → group reagent → characteristic precipitate'], ['Organic tests', 'Unsaturation, carbonyl, aldehyde, phenol and amine tests identify reactivity motifs; a positive observation must be paired with limitations.', 'functional group + selective reagent → colour/precipitate'], ['Titration and apparatus', 'Equivalence is stoichiometric; endpoint is indicator response. Rinse burette with titrant and pipette with analyte to avoid dilution.', 'known C×V ↔ stoichiometry ↔ unknown C×V']],
    mustKnow: ['CO₂ turns limewater milky; excess can clear through soluble bicarbonate', 'NH₃ turns moist red litmus blue and forms white fumes with HCl', 'Tollens silver mirror supports aldehyde but α-hydroxy ketones may also respond', 'KMnO₄ is self-indicating in permanganate titration'],
    worked: ['A 25.0 mL Na₂CO₃ sample needs 20.0 mL 0.100 M HCl for complete neutralisation. Find Na₂CO₃ molarity.', ['Reaction Na₂CO₃+2HCl→2NaCl+H₂O+CO₂.', 'n(HCl)=0.100×0.0200=0.00200 mol.', 'n(Na₂CO₃)=0.00100 mol in 0.0250 L.'], '0.0400 M Na₂CO₃.', 'Acid molarity/volume gives twice the carbonate moles because stoichiometric ratio is 2:1.'],
    examTips: ['Write observation and inference separately.', 'Balance the actual ionic reaction before titration arithmetic.', 'Use confirmatory tests; one preliminary colour is not proof.'],
    traps: ['Calling endpoint identical to equivalence by definition', 'Rinsing a burette only with water before filling', 'Treating any decolourisation as a unique functional-group proof'],
    memoryHook: 'Condition + observation + equation = defensible inference.',
    guidedQuestions: [['Why rinse a burette with titrant?', 'To prevent residual water diluting it.', 'Its delivered concentration must remain the stated concentration.'], ['Why acidify KMnO₄ with H₂SO₄ rather than HCl?', 'Permanganate can oxidise chloride ions.', 'HCl would consume oxidant and produce chlorine, corrupting the titre.']]
  };

  jee['Solutions'] = school['Solutions'];
  jee['Chemical Kinetics'] = school['Chemical Kinetics'];
  Object.entries(jee).forEach(([title, data]) => add(root.jee, title, data));
})();
