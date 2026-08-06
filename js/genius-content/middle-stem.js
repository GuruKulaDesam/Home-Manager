(function () {
  window.HM = window.HM || {};
  const root = window.HM.geniusContent = window.HM.geniusContent || { school: {}, jee: {} };
  root.school = root.school || {};

  const add = (subject, title, d) => {
    root.school[`${subject}::${title}`] = {
      insight: d.i,
      whyItMatters: d.w,
      concepts: d.c.map(([conceptTitle, explain, visual]) => ({ title: conceptTitle, explain, visual })),
      mustKnow: d.m,
      worked: { problem: d.p, steps: d.s, answer: d.a, check: d.k },
      examTips: d.e,
      traps: d.t,
      memoryHook: d.h,
      guidedQuestions: d.q.map(([question, answer, explanation]) => ({ question, answer, explanation }))
    };
  };

  add('Mathematics', 'Large Numbers Around Us', {
    i: 'A large number becomes friendly when you see it as named place-value blocks, not as a wall of digits.', w: 'Estimation, budgets, populations and data comparisons all depend on knowing both a number’s size and the precision of a claim.',
    c: [['Place-value lens','A digit’s value is digit × place; inserting commas reveals the groups.','7,42,06,315 = 7 crore | 42 lakh | 6 thousand | 315'],['Scale and comparison','Compare digit count first, then scan equal-length numbers from the left.','9,98,000 < 10,02,000'],['Estimation','Round at the requested place; the first discarded digit decides whether to rise.','48,762 → nearest thousand → 49,000']],
    m: ['Indian grouping: ones, thousands, lakhs, crores.','International grouping uses groups of three: thousands, millions.','Estimate before calculating to detect impossible answers.'],
    p: 'A district has 27,48,650 people and adds 1,96,780. Estimate to the nearest lakh, then find the exact total.', s: ['Round: 27,48,650 ≈ 27 lakh and 1,96,780 ≈ 2 lakh.','Estimated total = 29 lakh.','Exact column addition gives 29,45,430.'], a: 'Estimate: 29,00,000; exact: 29,45,430.', k: '29,45,430 lies near 29 lakh, so the digits and scale agree.',
    e: ['Write commas before reading the number.','State the place used for rounding.'], t: ['Rounding every addend at a different place.','Treating lakh as a million.'], h: 'Group, name, compare, estimate.',
    q: [['Why is 6,09,000 greater than 5,99,999?','Its lakh digit is larger.','Comparison ends at the first unequal place from the left.'],['What is one crore in lakhs?','100 lakh.','1,00,00,000 ÷ 1,00,000 = 100.']]
  });

  add('Mathematics', 'Arithmetic Expressions', {
    i: 'An expression is a recipe: brackets package steps, and operation priority tells you which package to cook first.', w: 'Correct grouping turns word situations into one reliable expression and prevents calculator-like guessing.',
    c: [['Operation tree','The final operation is the root; its inputs are smaller completed expressions.','(18−6)×4\n   ×\n 12  4'],['Priority','Brackets first, then multiplication/division, then addition/subtraction from left to right.','24÷6×2 = 4×2 = 8'],['Equivalent forms','Different-looking expressions may have the same value because of properties.','7×(10+2)=70+14']],
    m: ['Multiplication is not automatically before division; equal-priority operations go left to right.','A vinculum or fraction bar groups numerator and denominator.','Distributive property: a(b+c)=ab+ac.'],
    p: 'A bus makes 4 trips with 38 students, but 7 seats are empty on each trip. How many students travel?', s: ['One trip carries 38−7=31 students.','Repeat for 4 trips: 4×31.','Compute 124.'], a: '4×(38−7)=124 students.', k: 'Four groups slightly below 40 should be slightly below 160; 124 is plausible.',
    e: ['Translate words before calculating.','Show the bracket that captures “on each”.'], t: ['Writing 4×38−7, which subtracts only once.','Doing addition before a surrounding multiplication.'], h: 'Brackets tell the story; priority executes it.',
    q: [['Are 5+3×4 and (5+3)×4 equal?','No: 17 and 32.','Brackets change which operation is completed first.'],['Why is 20÷5×2 equal to 8?','Division and multiplication proceed left to right.','It is (20÷5)×2, not 20÷(5×2).']]
  });

  add('Mathematics', 'A Peek Beyond the Point', {
    i: 'A decimal point is a mirror boundary: places become ten times smaller with every step to the right.', w: 'Money, length and measurements demand decimal sense; place value is safer than memorised “move the point” rules.',
    c: [['Decimal places','Tenths, hundredths and thousandths are fractions with powers of ten.','3.407 = 3 + 4/10 + 0/100 + 7/1000'],['Comparison','Align decimal points and append harmless zeros before comparing.','2.70 > 2.069'],['Operations','Addition aligns places; multiplying by 10 shifts every digit one place in value.','4.26 × 10 = 42.6']],
    m: ['Trailing zeros do not change value: 0.5=0.50.','0.09 is nine hundredths, smaller than 0.1.','Keep units identical before operating.'],
    p: 'A ribbon is 3.75 m long. Pieces of 0.8 m and 1.26 m are cut. What remains?', s: ['Align decimals: 0.80+1.26=2.06.','Subtract: 3.75−2.06=1.69.','Retain the metre unit.'], a: '1.69 m remains.', k: 'About 3.8−2.1=1.7 m, matching 1.69 m.',
    e: ['Write zeros to align decimal columns.','Estimate before exact subtraction.'], t: ['Comparing digit counts instead of place values.','Aligning final digits rather than decimal points.'], h: 'The point stays; the places line up.',
    q: [['Which is greater, 0.7 or 0.65?','0.7.','Write 0.70; seventy hundredths exceeds sixty-five.'],['Why does 2.4×10 become 24?','Every digit’s place value becomes ten times larger.','The digits shift one place left relative to the decimal point.']]
  });

  add('Mathematics', 'Expressions Using Letter-Numbers', {
    i: 'A letter-number is a labelled empty box: it can vary, while the operations around it stay fixed.', w: 'Algebra compresses patterns into rules and lets one argument solve infinitely many numerical cases.',
    c: [['Variable and coefficient','In 5n+2, n varies, 5 scales it, and 2 is fixed.','n → ×5 → +2'],['Like terms','Only terms with the same letter part combine.','3x+2x−4 = 5x−4'],['Substitution','Replace the letter with its value using brackets, especially for negatives.','2a+3, a=−4 → 2(−4)+3']],
    m: ['3x means 3×x, not 3+x.','x and x² are unlike terms.','Equivalent expressions agree for every allowed value.'],
    p: 'A matchstick pattern has 4n+1 sticks. Find the 12th figure and explain the formula.', s: ['n counts repeated four-stick units.','Substitute n=12: 4(12)+1.','Compute 48+1.'], a: '49 sticks.', k: 'Moving from one figure to the next adds 4, exactly as coefficient 4 predicts.',
    e: ['Define what the variable represents.','Use brackets when substituting.'], t: ['Combining 4n+1 as 5n.','Thinking n is one fixed mystery number in a pattern.'], h: 'Letter is the input; expression is the machine.',
    q: [['Can 2a+3b become 5ab?','No.','Unlike terms describe different quantities and cannot be merged.'],['If n increases by 1, how much does 7n−2 increase?','7.','The constant stays fixed while 7n gains 7.']]
  });

  add('Mathematics', 'Parallel and Intersecting Lines', {
    i: 'Angle facts are not a list: they flow from straight lines, full turns and the unchanging direction of parallel lines.', w: 'This reasoning is the grammar of constructions, polygons and later coordinate geometry.',
    c: [['At an intersection','Vertically opposite angles are equal; adjacent linear-pair angles total 180°.','\ 120° /\n \ 60°/'],['Transversal map','For parallel lines, corresponding and alternate interior angles are equal.','parallel rails + crossing road → repeated angle'],['Proof direction','Equal corresponding angles can also prove two lines parallel.','matching F-angles ⇒ parallel']],
    m: ['Angles on a straight line sum to 180°.','Angles around a point sum to 360°.','Co-interior angles between parallels sum to 180°.'],
    p: 'A transversal crosses parallel lines. One obtuse angle is 118°. Find every acute angle.', s: ['Its adjacent angle is 180°−118°=62°.','Vertically opposite angles repeat 62° and 118°.','Corresponding angles copy these values at the second intersection.'], a: 'Every acute angle is 62°.', k: 'Each acute angle pairs with 118° to make 180°.',
    e: ['Mark equal angles with the same symbol.','Name the rule at each step.'], t: ['Assuming lines are parallel because they look parallel.','Calling adjacent angles vertically opposite.'], h: 'X gives equals; line gives 180; parallels copy.',
    q: [['Can two distinct parallel lines meet?','No.','They maintain the same direction and separation in a plane.'],['If alternate interior angles are equal, what follows?','The lines are parallel.','This is the converse of the alternate-angle property.']]
  });

  add('Mathematics', 'Number Play', {
    i: 'Number patterns become mathematics only when you explain the mechanism that must keep producing them.', w: 'Divisibility, parity and digit reasoning build proof habits without heavy algebra.',
    c: [['Parity','Even±even is even; odd±odd is even; odd±even is odd.','E+E=E, O+O=E, O+E=O'],['Digit tests','Place-value remainders create divisibility rules.','10 ≡ 1 (mod 9) → digit sum test'],['Invariants','An invariant is a feature that cannot change under the allowed move.','add 2 repeatedly → parity never changes']],
    m: ['A counterexample disproves an “always” claim.','Divisibility by 3 and 9 uses digit sums; by 11 uses alternating sums.','Consecutive integers differ by 1 and alternate parity.'],
    p: 'Without dividing, decide whether 73,458 is divisible by 3, 9 and 11.', s: ['Digit sum = 7+3+4+5+8=27, divisible by 3 and 9.','Alternating difference = (8+4+7)−(5+3)=11.','A multiple of 11 means the original number is divisible by 11.'], a: 'It is divisible by 3, 9 and 11.', k: 'Each decision uses a complete divisibility condition, not the last digit.',
    e: ['Test a pattern on examples, then justify it.','For “not always”, give one clean counterexample.'], t: ['Treating three examples as proof.','Using the divisibility-by-3 test for 6 without checking evenness.'], h: 'Spot, test, explain—never stop at spotting.',
    q: [['Is the sum of three odd numbers odd?','Yes.','Odd+odd is even, then even+odd is odd.'],['Why is a number and its digit sum congruent modulo 9?','Every power of 10 leaves remainder 1 modulo 9.','Place values therefore reduce to the sum of their digits.']]
  });

  add('Mathematics', 'A Tale of Three Intersecting Lines', {
    i: 'Three lines enclose a triangle, and its angle sum is the shadow of a straight angle moved through parallel lines.', w: 'Triangle angle logic lets you solve diagrams and judge whether a claimed construction is possible.',
    c: [['Angle sum','The three interior angles of any triangle total 180°.','△: A+B+C=180°'],['Exterior angle','An exterior angle equals the two remote interior angles.','exterior = far angle + far angle'],['Existence','Positive angles summing to 180° can form a triangle; side lengths must satisfy triangle inequality.','a+b>c for every pair']],
    m: ['An exterior angle is larger than either remote interior angle.','An equilateral triangle has three 60° angles.','A triangle cannot have two right angles.'],
    p: 'One exterior angle is 132°, and one remote interior angle is 57°. Find the other two interior angles.', s: ['Other remote angle =132°−57°=75°.','The adjacent interior angle forms a line with 132°: 48°.','Check 57°+75°+48°=180°.'], a: 'The angles are 57°, 75° and 48°.', k: 'The exterior angle 132° equals 57°+75°.',
    e: ['Choose exterior-angle theorem when it avoids an extra step.','Check the final sum is 180°.'], t: ['Adding the adjacent interior angle as a remote angle.','Trusting a not-to-scale drawing.'], h: 'Triangle totals 180; exterior equals the far two.',
    q: [['Can a triangle have angles 91°, 45°, 44°?','Yes.','They are positive and sum exactly to 180°.'],['Why can there be at most one obtuse angle?','Two would already exceed 180°.','Every third angle must also be positive.']]
  });

  add('Mathematics', 'Working with Fractions', {
    i: 'A fraction is a number and an operator: it marks a location, compares a ratio, and can scale a quantity.', w: 'Fraction fluency supports percentages, probability, algebra and almost every proportional situation.',
    c: [['Common units','Addition needs equal-sized pieces, so first create a common denominator.','1/3 + 1/4 → 4/12 + 3/12'],['Multiplication','“Of” means scale: multiply numerators and denominators, cancelling common factors first.','3/5 of 20 → 3×4'],['Division','Ask how many divisor-sized groups fit; multiplying by the reciprocal answers it.','3/4 ÷ 1/8 = 6 groups']],
    m: ['A larger denominator means smaller pieces only when numerators match.','Never add denominators when adding fractions.','Mixed numbers should become improper fractions before multiplication/division.'],
    p: 'A 3/4 L bottle fills cups of 1/8 L. How many full cups?', s: ['The question is 3/4 ÷ 1/8.','Multiply by reciprocal: 3/4×8/1.','Cancel 8÷4=2, then 3×2=6.'], a: '6 cups.', k: 'Six eighths equal 6/8=3/4.',
    e: ['Draw a bar when the operation is unclear.','Simplify before multiplying.'], t: ['Flipping the first fraction.','Using a common denominator for multiplication.'], h: 'Add equal pieces; multiply to scale; divide to count groups.',
    q: [['Why is 2/3÷4/5 equal to 2/3×5/4?','Division asks for the inverse scaling.','Multiplication by 5/4 undoes multiplication by 4/5.'],['Is 5/6×3/4 greater than 5/6?','No.','Scaling by a positive number below 1 makes the quantity smaller.']]
  });

  add('Mathematics', 'Geometric Twins', {
    i: 'Congruent figures are perfect overlays; similarity alone preserves shape but may change size.', w: 'Rigid-motion thinking makes congruence criteria meaningful rather than mysterious letter codes.',
    c: [['Superposition','If translation, rotation or reflection makes two figures coincide, they are congruent.','△ABC ↻ → △PQR, exact overlap'],['Triangle rigidity','SSS, SAS, ASA/AAS and RHS supply enough locked measurements.','three hinged sticks → one rigid triangle'],['Correspondence','The order in a congruence statement pairs matching vertices and sides.','△ABC ≅ △PQR ⇒ A↔P, B↔Q, C↔R']],
    m: ['AAA proves similar shape, not equal size.','SSA is generally ambiguous.','Corresponding parts of congruent triangles are equal.'],
    p: 'Triangles ABC and PQR have AB=PQ=5, AC=PR=7 and ∠A=∠P=60°. Prove BC=QR.', s: ['The equal angle lies between the two given equal sides.','Thus △ABC≅△PQR by SAS.','BC and QR are corresponding third sides.'], a: 'BC=QR by corresponding parts of congruent triangles.', k: 'The order ABC↔PQR pairs B with Q and C with R.',
    e: ['Write correspondence before the criterion.','For SAS, verify the angle is included.'], t: ['Using AAA as congruence.','Matching vertices by picture position rather than evidence.'], h: 'Exact overlay means exact matching parts.',
    q: [['Why does SSS make a rigid triangle?','Three fixed side lengths leave no freedom to change its shape.','Changing an angle would force a side length to change.'],['Are all circles congruent?','No.','They are similar, but congruent only when their radii are equal.']]
  });

  add('Mathematics', 'Operations with Integers', {
    i: 'Integers are directed movements: sign says direction, magnitude says distance.', w: 'Temperature, debt, elevation and algebra become predictable when operations are understood as movement and reversal.',
    c: [['Addition walk','Same signs join distances; opposite signs compete and the larger magnitude sets direction.','−3 ← 0 → +5'],['Subtraction','Subtracting means adding the opposite—the reverse of a movement.','4−(−3)=4+3'],['Product signs','A negative factor reverses direction; two reversals restore it.','(−)×(−)=(+)']],
    m: ['The additive inverse of a is −a.','Zero is neither positive nor negative.','Division follows multiplication sign rules but division by zero is undefined.'],
    p: 'At dawn it is −6°C. It rises 9°C, then falls 4°C. Find the final temperature.', s: ['Start at −6.','Rise: −6+9=3.','Fall: 3−4=−1.'], a: '−1°C.', k: 'Net change is +5°C; −6+5=−1.',
    e: ['Use parentheses around negative values.','Estimate the sign before magnitude.'], t: ['Saying every subtraction gives a negative.','Dropping both minus signs without interpreting reversal.'], h: 'Sign is direction; minus reverses.',
    q: [['Why is −8 greater than −12?','It lies closer to zero on the right.','Integer order follows position on the number line.'],['What is (−5)×(−3)?','15.','Multiplication by −3 reverses a five-step negative movement three times into the positive direction.']]
  });

  add('Mathematics', 'Finding Common Ground', {
    i: 'Factors look inward at what builds a number; multiples look outward at what the number can build.', w: 'HCF solves largest equal grouping; LCM solves first shared repetition.',
    c: [['Prime fingerprint','Prime factorisation is a number’s unique multiplication fingerprint.','60=2²×3×5'],['HCF','Take shared primes with the smaller exponents.','HCF(12,18)=2×3=6'],['LCM','Take every needed prime with the larger exponent.','LCM(12,18)=2²×3²=36']],
    m: ['For two positive integers: HCF×LCM=product.','Co-prime numbers have HCF 1.','Use HCF for equal largest pieces; LCM for synchronising cycles.'],
    p: 'Lights flash every 12 s and 18 s. If together now, when next together?', s: ['This asks for the first common repeat: LCM.','12=2²×3; 18=2×3².','LCM=2²×3²=36.'], a: 'After 36 seconds.', k: '36 is divisible by both 12 and 18, and no smaller positive common multiple works.',
    e: ['Decide HCF versus LCM from the story first.','Show prime exponents clearly.'], t: ['Using HCF for repeating events.','Assuming consecutive numbers share a factor.'], h: 'HCF groups; LCM meets again.',
    q: [['What is the HCF of two distinct primes?','1.','Their only common positive factor is 1.'],['Why is LCM never smaller than either positive input?','It must contain each number as a factor.','A common multiple is at least as large as both numbers.']]
  });

  add('Mathematics', 'Another Peek Beyond the Point', {
    i: 'Decimals and fractions are two camera views of the same number; powers of ten let you switch views.', w: 'Conversions expose exact values, recurring patterns and sensible percentage comparisons.',
    c: [['Fraction to decimal','Create a denominator 10, 100… or divide numerator by denominator.','3/8 = 3÷8 = 0.375'],['Decimal product','Multiply as whole numbers, then restore the total number of decimal places.','1.2×0.3: 12×3=36 → 0.36'],['Decimal quotient','Scale dividend and divisor equally until the divisor is whole.','4.2÷0.7 = 42÷7']],
    m: ['Terminating decimals arise when a reduced denominator has only factors 2 and 5.','Multiplying by a number below 1 makes a positive number smaller.','Place-value reasoning should verify point placement.'],
    p: 'Calculate 2.4×0.35 and verify by fractions.', s: ['24×35=840; total three decimal places gives 0.840.','As fractions: 24/10×35/100=840/1000.','Simplify or read as 0.84.'], a: '0.84.', k: '0.35 is less than half, so its product with 2.4 must be below 1.2.',
    e: ['Predict the size before placing the decimal.','Reduce fractions before judging termination.'], t: ['Counting zeros instead of decimal places.','Assuming every fraction terminates.'], h: 'Scale without changing value; place by size.',
    q: [['Will 7/40 terminate?','Yes.','40=2³×5 contains no other prime factor.'],['Why is 0.4×0.2 not 0.8?','Each factor is below 1, so the product must shrink.','Four tenths of two tenths is eight hundredths, 0.08.']]
  });

  add('Mathematics', 'Connecting the Dots…', {
    i: 'Coordinates are an address system: move horizontally first, vertically second, and every point becomes unambiguous.', w: 'Graphs turn patterns into visible shape and prepare students for functions, motion graphs and analytic geometry.',
    c: [['Ordered pair','(x,y) means x-direction then y-direction; order matters.','origin → x steps → y steps'],['Quadrants','Signs identify the region: (+,+), (−,+), (−,−), (+,−).',' II | I\n----+----\nIII | IV'],['Pattern graph','A rule creates ordered pairs; plotted points reveal its trend.','y=2x: (0,0),(1,2),(2,4)']],
    m: ['The origin is (0,0).','A point on the x-axis has y=0; on y-axis has x=0.','Scale must be uniform and labelled.'],
    p: 'Plot A(−3,2), reflect it in the y-axis, then in the x-axis.', s: ['Reflection in y-axis reverses x: (3,2).','Reflection in x-axis reverses y: (3,−2).','Track one coordinate change at each mirror.'], a: 'Final point: (3,−2).', k: 'Two reflections preserve distance from the origin and reverse both signs.',
    e: ['Write the scale beside each axis.','Read x before y.'], t: ['Swapping coordinates.','Connecting categorical points when no continuity is implied.'], h: 'Across then up: x before y.',
    q: [['Where is (0,−5)?','On the negative y-axis.','Its x-coordinate is zero, so it is not in a quadrant.'],['What does reflection in the y-axis change?','Only the sign of x.','Horizontal position reverses while vertical height stays fixed.']]
  });

  add('Mathematics', 'Constructions and Tilings', {
    i: 'A construction is an exact geometric algorithm; a tiling succeeds when angles around every meeting point close perfectly.', w: 'Compass-and-straightedge work reveals why shapes fit, repeat and remain exact without measurement guessing.',
    c: [['Compass meaning','A compass transfers an exact distance and traces all points equally distant from a centre.','centre • ))) equal-radius arc'],['Perpendicular bisector','Equal-radius arcs from both endpoints locate points equidistant from them.','A • )×( • B'],['Tiling test','Angles around a vertex must total 360° with no gaps or overlaps.','60°×6=360°']],
    m: ['Record construction steps and justify the resulting property.','Equilateral triangles, squares and regular hexagons tile alone.','A regular pentagon’s 108° cannot make 360° using a whole number of copies.'],
    p: 'Can regular octagons tile a plane alone? Use their interior angle.', s: ['Interior angle=(8−2)×180°/8=135°.','Compute 360°÷135°=2⅔.','A fractional number of tiles cannot meet at a vertex.'], a: 'No, regular octagons cannot tile alone.', k: 'Two leave a 90° gap; three overlap by 45°.',
    e: ['Keep compass width unchanged when transferring lengths.','Use an angle-sum argument for tiling claims.'], t: ['Judging only from a sketch.','Calling measured near-equality an exact construction.'], h: 'Construction preserves distance; tiling closes 360°.',
    q: [['Why do six equilateral triangles meet perfectly?','Each contributes 60°, and 6×60°=360°.','The vertex closes with neither gap nor overlap.'],['What does every point on a perpendicular bisector share?','Equal distance from the segment’s endpoints.','That locus property is created by equal-radius arcs.']]
  });

  add('Mathematics', 'Finding the Unknown', {
    i: 'An equation is a balanced scale; solving means undoing operations equally on both pans until the unknown stands alone.', w: 'Equations transform verbal constraints into checkable answers and power later algebra and science formulas.',
    c: [['Balance','Whatever operation is applied to one side must be applied to the other.','3x+2 = 14  ⚖'],['Reverse path','Undo addition before multiplication—the reverse order of the expression machine.','x → ×3 → +2; solve: −2 → ÷3'],['Model from words','Define the unknown, translate relations, then solve and interpret.','number n; “five more” → n+5']],
    m: ['Like terms may be collected before isolating x.','A solution must make the original equation true.','The equals sign means same value, not “the answer comes next”.'],
    p: 'Three identical notebooks plus ₹18 cost ₹ ninety-six. Find one notebook’s cost.', s: ['Let one notebook cost x; equation 3x+18=96.','Subtract 18 from both sides: 3x=78.','Divide both sides by 3: x=26.'], a: 'One notebook costs ₹26.', k: '3(26)+18=78+18=96.',
    e: ['Define the variable with its unit.','Substitute into the original equation to check.'], t: ['Moving a term and changing sign without understanding the balance operation.','Stopping at 3x=78.'], h: 'Keep balance; undo the machine backwards.',
    q: [['Why may we subtract 7 from both sides?','Equal quantities remain equal after the same subtraction.','The balance is preserved.'],['Solve 5−2x=11.','x=−3.','Subtract 5: −2x=6; divide by −2; checking gives 5+6=11.']]
  });

  add('Science', 'The Ever-Evolving World of Science', {
    i: 'Science is not a pile of final facts; it is a self-correcting way to turn curiosity into testable explanations.', w: 'Knowing how evidence works helps students investigate honestly, separate claims from proof and improve ideas.',
    c: [['Question to test','A scientific question identifies something measurable and a fair comparison.','notice → question → hypothesis → test'],['Variables','Change one independent variable, measure the dependent variable and hold controls steady.','change light → measure growth; same soil/water'],['Evidence cycle','Results can support, weaken or refine a model; replication checks reliability.','test → data → explain → retest ↻']],
    m: ['A hypothesis must be testable, not merely confident.','Observations are recorded evidence; inferences are interpretations.','Unexpected results are information, not failure.'],
    p: 'Test whether warm water dissolves sugar faster than cold water.', s: ['Use equal sugar, water volume, cups and stirring.','Change only water temperature; time until dissolved.','Repeat trials and compare average times.'], a: 'A fair test links temperature to dissolving time; the data, not expectation, decides.', k: 'If stirring or sugar amount differs, temperature is no longer the only explanation.',
    e: ['Name the changed, measured and controlled variables.','Use a table with units.'], t: ['Changing several conditions at once.','Calling one trial a universal law.'], h: 'One change, one measure, many careful repeats.',
    q: [['Why repeat an experiment?','To reduce the influence of chance and spot inconsistent results.','Repeated measurements give a more reliable pattern.'],['Is “the plant looks happier” a strong measurement?','No.','Height, leaf count or mass is defined and comparable.']]
  });

  add('Science', 'Exploring Substances: Acidic, Basic, and Neutral', {
    i: 'Acids and bases are opposing chemical behaviours revealed safely by indicators—not by taste.', w: 'The ideas explain digestion, soil treatment, cleaning and neutralisation while building safe laboratory habits.',
    c: [['Indicators','Litmus, turmeric and universal indicator change colour according to the solution.','acid: blue litmus→red | base: red→blue'],['pH scale','Below 7 is acidic, 7 neutral, above 7 basic; distance signals strength qualitatively.','0 acidic ← 7 → basic 14'],['Neutralisation','Acid and base react to form salt and water, often releasing heat.','acid + base → salt + water']],
    m: ['Never identify laboratory substances by tasting.','Neutral means pH 7, not “colourless”.','Indicators classify; they are not reactants to consume casually.'],
    p: 'A solution turns blue litmus red. After adding a base dropwise, universal indicator becomes green. Explain.', s: ['Blue-to-red identifies the starting solution as acidic.','Base consumes acidity during neutralisation.','Green indicates the mixture has reached about pH 7.'], a: 'The acid has been neutralised to an approximately neutral solution.', k: 'Adding much more base would move the indicator beyond green into basic colours.',
    e: ['Report observation before inference.','Distinguish indicator colour from the substance’s original colour.'], t: ['Saying every salt solution is neutral.','Touching unknown acids or bases.'], h: 'Indicator reveals; pH locates; neutralisation balances.',
    q: [['Why is toothpaste mildly basic?','It can neutralise acids in the mouth.','Bacterial acids attack enamel, so controlled basicity helps oppose them.'],['Does diluting an acid make it a base?','No.','It becomes less acidic and approaches pH 7 but does not cross merely through dilution.']]
  });

  add('Science', 'Electricity: Circuits and Their Components', {
    i: 'Current needs an unbroken loop; components control how electrical energy moves and changes form.', w: 'Circuit models explain household devices and prevent the common mistake of thinking current is “used up” at a bulb.',
    c: [['Closed path','A cell pushes charge around a complete conducting loop; a gap stops current everywhere.','cell ─ switch ─ bulb ─┐\n└──────────────────────┘'],['Series and parallel','Series gives one path; parallel gives branches with independent routes.','series: —A—B— | parallel: —A—\n                         —B—'],['Component roles','Cell supplies energy, switch controls path, resistor/bulb converts energy, wire connects.','chemical → electrical → light + heat']],
    m: ['Conventional current is drawn from positive to negative outside the cell.','A fuse protects by melting when current is dangerously high.','Never experiment with mains electricity.'],
    p: 'Two bulbs are in series. One is removed. What happens, and why?', s: ['Series has only one path.','Removing a bulb opens that path.','With no closed loop, current stops through both positions.'], a: 'Both bulbs go out.', k: 'Replacing the missing bulb or bridging the gap restores a complete path.',
    e: ['Use standard circuit symbols and join them cleanly.','Trace a complete loop before predicting brightness.'], t: ['Drawing wires that cross as connected without a junction dot.','Believing the switch supplies electricity.'], h: 'No loop, no current; one path shares, branches choose.',
    q: [['Why are home appliances connected in parallel?','Each gets a complete independent branch.','One appliance can switch off or fail without opening every other path.'],['What energy change occurs in a bulb?','Electrical energy becomes light and heat.','Charge continues around the circuit; energy is transferred.']]
  });

  add('Science', 'The World of Metals and Non-metals', {
    i: 'Metal and non-metal properties come as patterns with exceptions; use evidence from several tests, not appearance alone.', w: 'Material choice—from wires to cookware—depends on conductivity, strength, reactivity and corrosion.',
    c: [['Physical pattern','Metals are usually lustrous, malleable, ductile and conducting; non-metals often show the opposite.','metal sheet ⇄ hammer; wire ⇢ current'],['Chemical response','Many metals react with oxygen to form basic oxides; many non-metal oxides are acidic.','metal + O₂ → metal oxide'],['Reactivity','A more reactive metal can displace a less reactive metal from its salt solution.','Zn + CuSO₄ → ZnSO₄ + Cu']],
    m: ['Graphite conducts although it is a non-metal.','Mercury is a liquid metal; bromine is a liquid non-metal.','Corrosion can be slowed by painting, oiling, plating or alloying.'],
    p: 'An iron nail is placed in blue copper sulfate solution; a brown coat appears and solution turns greenish.', s: ['Iron is more reactive than copper.','Iron atoms enter solution while copper is displaced.','Deposited copper makes the brown coat; iron sulfate changes solution colour.'], a: 'Fe + CuSO₄ → FeSO₄ + Cu.', k: 'Copper cannot similarly displace iron from iron sulfate because it is less reactive.',
    e: ['Pair every observation with its inference.','Mention exceptions when classifying by physical properties.'], t: ['Calling every shiny material a metal.','Confusing corrosion with simple dirt.'], h: 'Property chooses use; reactivity predicts change.',
    q: [['Why is copper used in wires?','It conducts electricity and is ductile.','It carries current efficiently and can be drawn into long thin wires.'],['Why paint an iron gate?','To block oxygen and moisture.','Removing contact with corrosion reactants slows rusting.']]
  });

  add('Science', 'Changes Around Us: Physical and Chemical', {
    i: 'Ask whether particles merely rearranged in form or formed substances with new properties.', w: 'This distinction explains cooking, rusting, dissolving and reversible manufacturing processes.',
    c: [['Physical change','Identity remains while state, shape or size changes.','ice ⇄ water ⇄ vapour'],['Chemical change','Atoms reorganise into new substances; clues include lasting colour, gas, precipitate or energy change.','reactants → new substances'],['Reversibility','Reversibility is useful evidence but not the definition; some physical changes are hard to reverse.','cut paper: physical yet not easily reversed']],
    m: ['Dissolving can be physical even though the solid “disappears”.','A gas bubble is evidence only after ruling out boiling.','Conservation of matter applies in a closed system.'],
    p: 'Classify burning a candle, separating wax melting from wick burning.', s: ['Wax near the flame melts and can solidify: physical state change.','Wax vapour/wick reacts with oxygen, making new substances: chemical change.','One event can contain both kinds of change.'], a: 'Melting is physical; combustion is chemical.', k: 'Cooling recovers wax from molten wax but cannot turn combustion products back into the original wick.',
    e: ['Name the new substance or unchanged identity.','Do not classify using reversibility alone.'], t: ['Calling every colour change chemical without controls.','Treating an entire event as only one change.'], h: 'Same substance, new form: physical; new substance: chemical.',
    q: [['Is dissolving salt in water chemical?','Usually physical.','Evaporation can recover salt, whose chemical identity remains.'],['Why is rusting chemical?','Iron forms iron oxide with new properties.','The product is not merely reshaped iron.']]
  });

  add('Science', 'Adolescence: A Stage of Growth and Change', {
    i: 'Adolescence is a coordinated body-and-brain transition controlled by hormones, with wide normal variation in timing.', w: 'Accurate, respectful knowledge helps students care for themselves without shame, comparison or unsafe myths.',
    c: [['Hormone messages','Endocrine glands release chemical messengers carried in blood to target tissues.','gland → hormone in blood → target'],['Puberty changes','Growth, body hair, skin changes, voice and reproductive maturity do not occur on one fixed timetable.','childhood → variable transition → adulthood'],['Health foundations','Balanced food, movement, sleep and hygiene support rapid growth and emotional regulation.','food + sleep + activity + hygiene']],
    m: ['Variation between healthy individuals is normal.','Menstruation is a normal biological process, not an illness.','Seek a trusted adult or clinician for persistent distress or health concerns.'],
    p: 'A student sleeps five hours and skips breakfast, then reports poor concentration. Suggest a science-based plan.', s: ['Growing bodies generally need consistent sufficient sleep.','Add a balanced breakfast with protein, grains and fruit rather than a quick sugar spike.','Track energy for a week and speak to an adult if difficulty persists.'], a: 'Restore sleep and regular balanced meals; monitor rather than diagnose.', k: 'The plan changes basic health inputs safely and includes escalation if symptoms continue.',
    e: ['Use biological terms respectfully.','Separate normal variation from claims requiring medical advice.'], t: ['Comparing development as a race.','Treating social-media advice as medical fact.'], h: 'Hormones signal; bodies vary; habits support growth.',
    q: [['Why can two same-age students begin puberty at different times?','Normal timing varies among individuals.','Genes, health and environment influence development; difference alone is not abnormal.'],['Are hormones produced only during adolescence?','No.','Hormones regulate processes throughout life; puberty changes their patterns and effects.']]
  });

  add('Science', 'Heat Transfer in Nature', {
    i: 'Heat is energy in transit from hotter to cooler regions; conduction, convection and radiation are three routes, not three kinds of heat.', w: 'This explains sea breezes, insulation, cooking and climate-linked movement of air and water.',
    c: [['Conduction','Neighbouring particles transfer energy without bulk movement; solids often dominate.','hot end ●●●→●●● cold end'],['Convection','Warmer fluid expands, becomes less dense and rises while cooler fluid sinks.','warm ↑   ↓ cool  ↻'],['Radiation','Electromagnetic waves transfer energy without a material medium.','Sun ~~~> Earth']],
    m: ['Temperature measures thermal state; heat is transferred energy.','Dark dull surfaces absorb and emit radiation well.','Insulators slow transfer; they do not create cold.'],
    p: 'Explain a daytime sea breeze.', s: ['Land warms faster than sea.','Air over land warms, expands and rises.','Cooler dense sea air moves toward land, completing a convection circulation.'], a: 'Surface wind blows from sea to land during the day.', k: 'At night land cools faster, so the circulation can reverse.',
    e: ['Name the hotter and cooler regions.','For convection, mention density and bulk fluid motion.'], t: ['Saying heat rises; warm fluid rises.','Claiming radiation needs air.'], h: 'Contact conducts; fluids circulate; radiation crosses space.',
    q: [['Why does a metal spoon feel colder than wood in the same room?','Metal removes heat from your hand faster.','They may have equal temperature; different conductivity changes sensation.'],['How does wool keep us warm?','It traps air and slows heat transfer.','Still air is a poor conductor and suppresses convection.']]
  });

  add('Science', 'Measurement of Time and Motion', {
    i: 'Motion becomes science when position is tied to time; speed compresses that change into a comparable rate.', w: 'Timetables, road safety, sports and graphs all rely on measured distance-time relationships.',
    c: [['Reference point','An object moves only relative to a chosen reference; rest and motion can coexist.','passenger: at rest to bus, moving to road'],['Speed','Average speed is total distance divided by total time.','speed = distance/time'],['Distance-time graph','Slope shows speed: steeper means faster; horizontal means stopped.','distance |  /\n         |_/___ time']],
    m: ['Use consistent units before dividing.','A speedometer reports speed, an odometer distance.','Average speed does not reveal every moment’s speed.'],
    p: 'A cyclist travels 600 m in 2 min, rests 1 min, then 900 m in 3 min. Find average speed for the whole journey.', s: ['Total distance=1500 m.','Total elapsed time includes rest: 6 min=360 s.','Average speed=1500/360.'], a: 'About 4.17 m/s.', k: 'It is below the moving speeds because one minute was spent stationary.',
    e: ['Include stoppage in total journey time.','Write unit conversions explicitly.'], t: ['Averaging two speeds directly.','Omitting the reference point when describing motion.'], h: 'Choose reference; measure change; divide by elapsed time.',
    q: [['What does a horizontal distance-time segment mean?','The object is stationary.','Time passes while distance from the reference does not change.'],['Can a person be both at rest and moving?','Yes, relative to different references.','A seated passenger rests relative to the train but moves relative to the ground.']]
  });

  add('Science', 'Life Processes in Animals', {
    i: 'An animal survives through connected transport networks: food is broken down, gases exchanged, materials delivered and wastes removed.', w: 'Seeing systems as linked prevents memorising organs as isolated labels and explains how habits affect the whole body.',
    c: [['Digestion','Mechanical and chemical digestion reduce food into absorbable nutrients, chiefly in the small intestine.','food → mouth → stomach → small intestine → large intestine'],['Respiration and transport','Alveoli exchange gases; blood carries oxygen and nutrients to cells.','air ⇄ alveoli ⇄ blood ⇄ cells'],['Excretion','Kidneys filter blood, retain useful materials and form urine from wastes and excess water.','blood → kidney filter → urine']],
    m: ['Breathing moves air; cellular respiration releases energy from food.','Arteries carry blood away from heart; veins return it.','Villi and alveoli offer large surface areas.'],
    p: 'Why do breathing and heartbeat increase during running?', s: ['Muscle cells need faster energy release.','They require more oxygen and produce more carbon dioxide.','Faster breathing exchanges gases; faster circulation delivers and removes them.'], a: 'Both rates rise to meet increased cellular respiration demands.', k: 'After activity stops, rates gradually return as demand and recovery decline.',
    e: ['Trace materials from entry to cells.','Distinguish organ function from process name.'], t: ['Saying lungs make oxygen.','Saying all digestion occurs in the stomach.'], h: 'Break down, exchange, transport, remove.',
    q: [['Why is the small intestine long and folded?','To provide a large absorption area.','More contact surface lets digested nutrients enter blood efficiently.'],['Why are alveoli thin-walled?','To shorten diffusion distance.','Oxygen and carbon dioxide exchange rapidly across the surface.']]
  });

  add('Science', 'Life Processes in Plants', {
    i: 'A plant is a solar-powered transport system: roots obtain materials, leaves manufacture food, and vessels connect the whole organism.', w: 'This model links photosynthesis, respiration, transport and transpiration instead of treating them as separate definitions.',
    c: [['Photosynthesis','Light energy helps chlorophyll convert carbon dioxide and water into glucose, releasing oxygen.','CO₂ + H₂O --light/chlorophyll→ glucose + O₂'],['Transport','Xylem carries water/minerals mainly upward; phloem distributes sugars from sources to sinks.','roots ↑ xylem ↑ leaves; sugar ↕ phloem'],['Stomata and transpiration','Guarded pores exchange gases; water loss helps pull water upward but must be controlled.','leaf pore: CO₂ in | O₂ + H₂O out']],
    m: ['Plants respire day and night; photosynthesis needs light.','Roots absorb water mainly through root hairs.','Leaves are food sources; growing/storage organs may be sinks.'],
    p: 'A destarched plant has one leaf partly covered, then receives sunlight. Iodine turns only exposed parts blue-black. Explain.', s: ['Destarching removes previously stored starch.','Covered area lacks light; exposed area receives it.','Blue-black iodine result shows starch formed only where light enabled photosynthesis.'], a: 'Light is necessary for starch production in the tested leaf.', k: 'The covered and exposed regions belong to the same leaf, controlling many other variables.',
    e: ['State why a control is used.','Do not write that sunlight itself becomes food.'], t: ['Claiming plants get food from soil.','Equating photosynthesis with respiration.'], h: 'Roots supply; leaves make; vessels move; stomata trade.',
    q: [['Why do plants need respiration if they photosynthesise?','Cells must release usable energy from food.','Photosynthesis stores energy; respiration makes it available for cell work.'],['What does phloem carry?','Dissolved sugars and other organic substances.','It moves manufactured food from sources to places using or storing it.']]
  });

  add('Science', 'Light: Shadows and Reflections', {
    i: 'Trace straight rays instead of guessing what light “wants” to do; images and shadows then become geometry.', w: 'Ray reasoning explains mirrors, eclipses, cameras, vision and why changing source size changes shadow sharpness.',
    c: [['Straight-line travel','In one uniform medium, light travels along straight paths.','source • ─────> object'],['Shadow geometry','An opaque object blocks rays; source, object and screen positions control size and sharpness.','lamp → object → dark region on screen'],['Reflection','Angle of incidence equals angle of reflection, measured from the normal.','\ i | r /\n    normal']],
    m: ['A plane-mirror image is virtual, upright, laterally inverted and equally far behind the mirror.','Angles are measured from the normal, not mirror surface.','Transparent materials transmit most light; translucent ones scatter it.'],
    p: 'A ray strikes a plane mirror at 35° to the mirror surface. Find angle of reflection.', s: ['The normal is 90° to the surface.','Angle of incidence=90°−35°=55°.','By reflection law, angle of reflection=55°.'], a: '55°.', k: 'Incident and reflected rays are symmetric around the normal.',
    e: ['Draw and label the normal first.','Use dashed backward extensions for virtual images.'], t: ['Using angle to the surface as incidence angle.','Saying a shadow is an image with details.'], h: 'Rays go straight; obstacles block; mirrors bounce symmetrically.',
    q: [['Why can’t a plane-mirror image be caught on a screen?','The reflected rays do not actually meet behind the mirror.','Only their backward extensions appear to meet there, making the image virtual.'],['What makes a shadow larger?','Moving the object nearer a diverging source often enlarges it.','The blocked cone spreads farther before reaching the screen.']]
  });

  add('Science', 'Earth, Moon, and the Sun', {
    i: 'Most sky patterns follow two motions—rotation and revolution—combined with changing viewing geometry.', w: 'A spatial model replaces myths about day, seasons, phases and eclipses with predictions students can test.',
    c: [['Rotation','Earth turns about its axis roughly once a day, making the Sun appear to cross the sky.','west ← Earth ↺ → east; sunrise appears east'],['Revolution and tilt','Earth orbits yearly with a tilted axis, changing sunlight angle and day length.','tilted Earth ⟲ Sun'],['Moon phases','Half the Moon is always sunlit; we see changing fractions as its position changes.','Sun → Moon orbit → changing view from Earth']],
    m: ['Seasons are not caused mainly by changing Earth-Sun distance.','Moon phases are not Earth’s shadow; that occurs during a lunar eclipse.','Solar eclipses require Moon between Sun and Earth; lunar eclipses require Earth between Sun and Moon.'],
    p: 'Why is it summer in one hemisphere while winter in the other?', s: ['Earth’s axis stays tilted in nearly the same direction during orbit.','The hemisphere tilted toward the Sun gets more direct rays and longer days.','The other gets slanted rays and shorter days.'], a: 'Opposite axial tilts toward/away from the Sun create opposite seasons.', k: 'Six months later the orbital position reverses which hemisphere tilts toward the Sun.',
    e: ['Draw Sun rays parallel and Earth’s axis tilted consistently.','Name positions in an eclipse in order.'], t: ['Explaining phases with Earth’s shadow.','Drawing Earth’s tilt flipping during orbit.'], h: 'Spin makes day; orbit plus tilt makes seasons; geometry makes phases.',
    q: [['Why don’t eclipses happen every month?','The Moon’s orbit is tilted relative to Earth’s orbital plane.','Usually the three bodies pass above or below exact alignment.'],['At full Moon, where is Earth?','Approximately between Sun and Moon.','The Moon’s Earth-facing half is then almost fully illuminated.']]
  });
})();
