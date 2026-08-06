(function () {
  window.HM = window.HM || {};
  const root = window.HM.geniusContent = window.HM.geniusContent || { school: {}, jee: {} };
  root.school = root.school || {};
  root.jee = root.jee || {};

  const C = (title, explain, visual) => ({ title, explain, visual });
  const E = (insight, whyItMatters, concepts, mustKnow, problem, steps, answer, check, examTips, traps, memoryHook, guidedQuestions) => ({
    insight, whyItMatters, concepts, mustKnow, worked: { problem, steps, answer, check }, examTips, traps, memoryHook, guidedQuestions
  });
  const Q = (question, answer, explanation) => ({ question, answer, explanation });
  const S = root.school;

  S['Mathematics::Relations and Functions'] = E(
    'A relation is any permitted pairing; a function is a machine that must give each input exactly one output. Most mistakes disappear when domain, codomain and range are written first.',
    'This language controls inverse functions, continuity, probability mappings and nearly every later chapter.',
    [C('Function test','For every x in the domain, count outgoing arrows: exactly one is compulsory; many inputs may share an output.','x → one y;  x ↛ two y-values'),C('Composition','(g∘f)(x) means apply f first, then g; its domain also requires f(x) to lie in the domain of g.','x → f(x) → g(f(x))'),C('Invertibility','An inverse function exists exactly when the map is one-one and onto; otherwise restrict the domain or codomain.','A ⇄ B only for a bijection')],
    ['Equivalence relations are reflexive, symmetric and transitive.','One-one: f(a)=f(b) implies a=b; onto: range equals codomain.','(g∘f)⁻¹=f⁻¹∘g⁻¹, with order reversed.','Binary operation closure must be checked before properties.'],
    'For f:R→R, f(x)=2x−3 and g(x)=x², find (g∘f)(2) and decide whether g is invertible on R.',
    ['f(2)=1.','Apply g to that output: g(1)=1.','g is not one-one on R because g(1)=g(−1).'], 'The value is 1; g has no inverse function on all R.', 'Composition order is visible in the substitution, and the counterexample settles invertibility.',
    ['Draw arrow diagrams before classifying a finite relation.','For inverse questions, prove both one-one and onto—a formula alone is insufficient.','State any domain restriction, such as x≥0 for x².'],
    ['Confusing codomain with actual range.','Reading g∘f from left to right.','Cancelling functions without checking invertibility.'],
    'Function = one output per input; inverse = one-to-one correspondence.',
    [Q('Can f(x)=|x| be inverted on R?','No.','It fails one-one since f(a)=f(−a); restricting the domain to [0,∞) makes inversion possible.'),Q('If f and g are one-one, is g∘f one-one?','Yes.','Equal composite outputs imply equal f outputs by g being one-one, then equal inputs by f being one-one.')]
  );

  S['Mathematics::Inverse Trigonometric Functions'] = E(
    'Inverse trigonometric functions return principal angles, not every possible angle. Treat each as a restricted inverse and quadrant errors become avoidable.',
    'Principal ranges determine signs, identities and final answers in calculus and equations.',
    [C('Principal branches','sin⁻¹ maps [−1,1] to [−π/2,π/2]; cos⁻¹ to [0,π]; tan⁻¹ to (−π/2,π/2).','input → unique principal angle'),C('Triangle translation','Convert an inverse value into a right triangle, then compute the requested trig ratio with the correct sign.','tan⁻¹ x: opposite=x, adjacent=1'),C('Identity with conditions','Identities such as tan⁻¹x+tan⁻¹y need an added or subtracted π when the principal quadrant demands it.','formula value → quadrant check → principal value')],
    ['sin⁻¹x+cos⁻¹x=π/2 for x∈[−1,1].','tan⁻¹x+cot⁻¹x=π/2 under NCERT principal conventions.','Never cancel sin(sin⁻¹x) and sin⁻¹(sin x) as if both were unrestricted.','Use the sign and principal range to select the final angle.'],
    'Evaluate cos(sin⁻¹(3/5)).', ['Let θ=sin⁻¹(3/5), so θ lies in [−π/2,π/2].','Build a triangle: opposite 3, hypotenuse 5, adjacent 4.','Cosine is nonnegative throughout this principal range.'], '4/5.', 'Squaring gives 1−9/25=16/25, and the principal range chooses the positive root.',
    ['Write the principal range beside every inverse symbol.','Use complementary identities to shorten one-mark evaluations.','After applying an addition formula, adjust the angle to the required range.'],
    ['Writing sin⁻¹x as 1/sin x.','Choosing ±4/5 without using the range.','Using tan addition without checking whether xy>1.'],
    'Inverse trig asks: which allowed angle produced this ratio?',
    [Q('What is sin⁻¹(sin 3π/4)?','π/4.','3π/4 is outside the sine inverse principal range; sine has the same value at π/4.'),Q('Why is cos(cos⁻¹x)=x always valid?','The input x is already restricted to [−1,1].','Cosine and its restricted inverse undo each other on the inverse function domain.')]
  );

  S['Mathematics::Matrices'] = E(
    'A matrix is a linear transformation table. Multiplication composes transformations, which is why order matters and why inner dimensions must match.',
    'Matrices encode simultaneous equations, geometry and data; board questions reward disciplined order and indexing.',
    [C('Order rule','An m×n matrix times an n×p matrix gives m×p; each entry is a row-dot-column product.','(m×n)(n×p)→m×p'),C('Non-commutativity','AB and BA represent opposite composition orders and may differ or one may not exist.','B first, then A ⇒ AB'),C('Elementary operations','Row or column operations are reversible moves used to simplify or invert a matrix.','R₂→R₂−2R₁')],
    ['Equality requires the same order and equal corresponding entries.','(AB)ᵀ=BᵀAᵀ.','Only square matrices have the usual inverse; AA⁻¹=I.','For A⁻¹ by operations, apply identical row moves to [A|I].'],
    'Let A=[[1,2],[0,1]] and B=[[2,0],[3,1]]. Find AB.', ['First row with first column: 1·2+2·3=8.','First row with second column: 1·0+2·1=2.','Second row products give 3 and 1.'], 'AB=[[8,2],[3,1]].', 'The result is 2×2; multiplying it by a compatible test vector agrees with applying B then A.',
    ['Write dimensions above factors before multiplying.','Compute one full row at a time to reduce misplaced entries.','Verify an inverse by multiplication with A, not by appearance.'],
    ['Multiplying corresponding entries instead of row-by-column.','Assuming AB=BA.','Performing a row operation on only one side of an augmented matrix.'],
    'Inner dimensions agree; outer dimensions survive.',
    [Q('Can a 2×3 matrix multiply a 2×2 matrix on the right?','No.','The inner dimensions 3 and 2 do not match.'),Q('If AB=I for square matrices, what is B?','A⁻¹.','A right inverse of a finite square matrix is also its inverse.')]
  );

  S['Mathematics::Determinants'] = E(
    'A determinant is a signed scale factor: zero means the transformation collapses space, so the matrix cannot be inverted.',
    'It gives fast tests for invertibility, collinearity, areas and solvability of linear systems.',
    [C('Cofactor expansion','Expand along the row or column with most zeros; signs follow a checkerboard beginning with +.','+ − +; − + −; + − +'),C('Operation effects','Swapping rows flips sign; multiplying a row by k multiplies the determinant by k; row addition leaves it unchanged.','R swap:×−1; Rᵢ→Rᵢ+kRⱼ: unchanged'),C('Geometry','For three planar points, determinant zero means zero triangle area, hence collinearity.','Area=½|det|')],
    ['det(AB)=det A det B.','A is invertible iff det A≠0.','A⁻¹=adj A/det A.','Two proportional or identical rows force determinant zero.'],
    'Evaluate det[[1,2,3],[0,4,5],[0,0,6]].', ['Recognise an upper triangular matrix.','The determinant of a triangular matrix is the product of diagonal entries.','Compute 1·4·6.'], '24.', 'A direct first-column expansion also gives 1·det[[4,5],[0,6]]=24.',
    ['Look for zeros and row relations before expanding.','Carry the cofactor sign explicitly.','In area questions take absolute value; orientation can make the determinant negative.'],
    ['Changing a row without tracking its determinant effect.','Using minors where signed cofactors are required.','Concluding a unique solution when det A=0.'],
    'Determinant measures surviving volume; zero means collapse.',
    [Q('What happens to det A if two rows are exchanged?','Its sign reverses.','The oriented volume reverses orientation but keeps magnitude.'),Q('Why does det A=0 prevent an inverse?','Because det(A A⁻¹) would equal det I=1.','But det A det A⁻¹ would be zero, a contradiction.')]
  );

  S['Mathematics::Continuity and Differentiability'] = E(
    'Continuity means no break at a point; differentiability means one well-defined tangent slope. Differentiability implies continuity, but a corner can be continuous without being differentiable.',
    'These tests are the gatekeepers for calculus theorems, tangent models and optimisation.',
    [C('Three-part continuity test','At x=a, left limit, right limit and f(a) must all exist and agree.','LHL = RHL = f(a)'),C('Derivative as local rate','f′(a) is the limit of secant slopes as the second point approaches a.','secants → tangent'),C('Chain structure','Differentiate the outer function, keep the inner expression, then multiply by the inner derivative.','d f(g(x))/dx=f′(g(x))g′(x)')],
    ['Check piecewise joins using one-sided limits.','A finite derivative implies continuity at that point.','Know derivatives of inverse trig, exponential and logarithmic functions with domains.','For implicit functions differentiate every term with respect to x.'],
    'Find k so f(x)=kx+1 for x<2 and f(x)=x²−1 for x≥2 is continuous at 2.', ['Left limit is 2k+1.','Right limit and f(2) are 4−1=3.','Set 2k+1=3.'], 'k=1.', 'Both one-sided expressions then approach 3, exactly f(2).',
    ['At a join, test continuity before differentiability.','Write the inner derivative as a separate factor in chain-rule work.','Use logarithmic differentiation when powers contain variables.'],
    ['Checking only LHL=RHL but not f(a).','Assuming continuity guarantees differentiability.','Missing dy/dx on differentiated y-terms.'],
    'Continuous joins the curve; differentiable joins its direction too.',
    [Q('Is |x| differentiable at 0?','No.','Its left derivative is −1 and right derivative is +1, although the function is continuous.'),Q('What is d(e^{x²})/dx?','2xe^{x²}.','Chain rule multiplies the unchanged outer exponential by derivative 2x of the exponent.')]
  );

  S['Mathematics::Applications of Derivatives'] = E(
    'The derivative is a decision signal: its sign tells direction, its zeros propose turning points, and its second derivative describes local bending.',
    'It converts geometry, business and physical optimisation into a repeatable sign-analysis workflow.',
    [C('Monotonicity','f′>0 means increasing and f′<0 decreasing on an interval; test intervals separated by critical points.','+↗ | 0 | −↘'),C('Extrema','A critical point is only a candidate; confirm by a derivative sign change or second-derivative test.','+→−: max; −→+: min'),C('Approximation','For small Δx, change in f is approximately f′(x)Δx.','f(x+Δx)≈f(x)+f′(x)Δx')],
    ['Include endpoints when optimising on a closed interval.','Normal slope is −1/m when tangent slope m≠0.','f′(c)=0 alone does not prove an extremum.','Translate verbal constraints into one-variable functions before differentiating.'],
    'Find the maximum of f(x)=−x²+4x+1.', ['f′(x)=−2x+4; set it to zero to get x=2.','f″(x)=−2<0, so the stationary point is a local maximum.','Evaluate f(2)=−4+8+1.'], 'Maximum value 5 at x=2.', 'Completing the square gives f(x)=5−(x−2)²≤5.',
    ['Draw a sign chart rather than merely listing critical points.','For word problems, state the feasible domain.','Use exact values until the final requested approximation.'],
    ['Calling every f′=0 point a maximum/minimum.','Ignoring boundary values.','Optimising two variables before applying the constraint.'],
    'Derivative sign is the curve’s traffic arrow.',
    [Q('Can f′(c)=0 and still no extremum occur?','Yes; f(x)=x³ at 0.','The derivative stays positive on both sides, so the function keeps increasing.'),Q('What sign change identifies a local minimum?','Negative to positive.','The function decreases into the point and increases away from it.')]
  );

  S['Mathematics::Integrals'] = E(
    'Integration is controlled accumulation and the reverse of differentiation. Indefinite integrals are families; definite integrals are net signed accumulation.',
    'It unifies area, displacement, probability and the solution of differential equations.',
    [C('Pattern recognition','Choose substitution when an inner derivative is present, parts for products with a simplifiable factor, and partial fractions for rational forms.','form → method → simplify'),C('Fundamental theorem','A definite integral is evaluated by any antiderivative F: ∫ₐᵇf=F(b)−F(a).','rate ↔ accumulation'),C('Symmetry','On [−a,a], odd functions integrate to 0 and even functions double the half-interval.','odd cancels; even mirrors')],
    ['Always include +C for indefinite integrals.','After substitution, change limits or return fully to x—do not mix variables.','Area is nonnegative, but a definite integral is signed.','Use properties such as ∫₀ᵃf(x)dx=∫₀ᵃf(a−x)dx before brute force.'],
    'Evaluate ∫₀¹ 2x/(1+x²) dx.', ['Let u=1+x², so du=2x dx.','The limits become u=1 and u=2.','Integrate ∫₁² du/u=[ln u]₁².'], 'ln 2.', 'Differentiating ln(1+x²) gives the integrand; the result is positive on a positive integrand interval.',
    ['Simplify algebra before selecting a method.','Write u and du together so missing constants are visible.','Differentiate an indefinite answer as an immediate check.'],
    ['Forgetting +C.','Using integration by parts when a one-line substitution exists.','Treating net integral as geometric area across a sign change.'],
    'Derivative asks the rate; integral rebuilds the total.',
    [Q('Why is ∫₋ₐᵃ x³ dx zero?','x³ is odd.','Equal positive and negative signed areas cancel on symmetric limits.'),Q('What should you try for ∫ x e^{x²}dx?','Substitution u=x².','The factor x dx is proportional to du, revealing an inner-derivative pattern.')]
  );

  S['Mathematics::Applications of Integrals'] = E(
    'Area by integration is a sum of thin positive slices. The difficult step is not integrating; it is identifying which curve is above and where that order changes.',
    'It trains graph interpretation and turns bounded-region geometry into exact computation.',
    [C('Vertical slices','Area between curves is ∫(top−bottom)dx after finding intersection limits.','top curve ↕ slice ↓ bottom curve'),C('Horizontal slices','When left/right boundaries are simpler, integrate (right−left)dy.','left | horizontal slice | right'),C('Split points','If boundaries cross or change formula, split the integral so every slice stays nonnegative.','A=A₁+A₂')],
    ['Sketch both curves and mark intersections.','Solve intersections exactly to obtain limits.','Use absolute differences or split wherever top/bottom reverses.','Exploit symmetry only after confirming the region.'],
    'Find the area enclosed by y=x and y=x².', ['Intersections satisfy x=x², giving x=0,1.','On (0,1), x is above x².','Compute ∫₀¹(x−x²)dx=[x²/2−x³/3]₀¹.'], '1/6 square unit.', 'The answer is positive and below the unit-square area, matching the sketch.',
    ['Make the sketch part of the solution, not decoration.','Label the slice direction before writing the integrand.','Report square units.'],
    ['Writing bottom−top and accepting a negative area.','Using visible graph endpoints instead of solving intersections.','Failing to split a region where curves cross.'],
    'Area integrand = upper minus lower, slice by slice.',
    [Q('When is dy easier than dx?','When left and right boundaries are single simple functions of y.','It can avoid splitting a region that fails the vertical-line description.'),Q('Can enclosed area equal a negative definite integral?','No.','Geometric area uses positive slice lengths; reverse the difference or take absolute pieces.')]
  );

  S['Mathematics::Differential Equations'] = E(
    'A differential equation specifies how a quantity changes; its solution is an entire family of functions whose derivatives obey that rule.',
    'Population, motion, cooling and circuits are described more naturally by rates than by finished formulas.',
    [C('Order and degree','Order is the highest derivative; degree is its power only after the equation is polynomial in derivatives.','(d²y/dx²)³ → order 2, degree 3'),C('Separation','If dy/dx=g(x)h(y), move all y terms with dy and x terms with dx, then integrate.','dy/h(y)=g(x)dx'),C('Linear form','dy/dx+P(x)y=Q(x) uses integrating factor e^{∫Pdx}.','IF × equation → product derivative')],
    ['An arbitrary constant count usually matches the order.','Apply initial conditions only after obtaining the general solution.','Check a solution by differentiating and substituting.','Do not assign degree when radicals/fractions of derivatives remain unpolynomialised.'],
    'Solve dy/dx=2xy with y(0)=3.', ['Separate: dy/y=2x dx.','Integrate: ln|y|=x²+C, so y=Ce^{x²}.','Use y(0)=3 to obtain C=3.'], 'y=3e^{x²}.', 'Its derivative is 6xe^{x²}=2x(3e^{x²})=2xy and y(0)=3.',
    ['Classify before choosing a method.','Keep the arbitrary constant through exponentiation by renaming e^C.','Substitute the final function into the original equation.'],
    ['Separating sums as though they were products.','Forgetting the integrating factor on the right side.','Losing constant solutions when dividing by h(y)=0.'],
    'Separate variables when rates factor; integrating factors manufacture a product rule.',
    [Q('What is the order of y″+(y′)²=0?','2.','The highest derivative present is y″.'),Q('Why verify by substitution?','Integration and algebra can introduce or lose solutions.','The original differential equation is the defining test, independent of the method.')]
  );

  S['Mathematics::Vector Algebra'] = E(
    'Vectors separate magnitude from direction. Dot products measure alignment; cross products create a perpendicular area vector.',
    'They compress 3D geometry, work, projections and orientation into reliable algebra.',
    [C('Dot product','a·b=|a||b|cosθ; zero signals perpendicularity when both vectors are nonzero.','projection shadow along b'),C('Cross product','|a×b|=|a||b|sinθ and direction follows the right-hand rule.','parallelogram area, normal arrow'),C('Resolution','Projection of a on b is (a·b/|b|²)b; the remainder is perpendicular.','a = parallel part + perpendicular part')],
    ['Unit vector along a is a/|a| for a≠0.','a×b=−(b×a).','Scalar triple product gives signed parallelepiped volume.','Check whether a question wants scalar projection or vector projection.'],
    'For a=(1,2,2), find its magnitude and unit vector.', ['|a|=√(1²+2²+2²)=3.','Divide every component by 3.','Confirm the new magnitude is 1.'], '|a|=3 and â=(1/3,2/3,2/3).', '√(1/9+4/9+4/9)=1.',
    ['Write vectors in component form before calculation.','Use dot product for angles/projections and cross product for normals/areas.','Test orthogonality with a zero dot product.'],
    ['Treating cross product as commutative.','Forgetting magnitude in unit-vector construction.','Confusing a·b=|a| with |a|².'],
    'Dot aligns, cross stands perpendicular.',
    [Q('If a·b=0, are a and b always perpendicular?','Only if both are nonzero.','The zero vector has zero dot product with every vector but no defined direction.'),Q('Why is a×a=0?','The angle is zero, so sin 0=0.','Parallel vectors span no parallelogram area.')]
  );

  S['Mathematics::Three Dimensional Geometry'] = E(
    'Lines and planes in 3D are best understood as a point plus allowed directions: a line has one direction; a plane has two, or equivalently one normal.',
    'This model turns spatial angle and distance problems into dot products and projections.',
    [C('Line form','r=a+λb starts at point a and moves along direction b.','point • ──→ direction'),C('Plane form','n·(r−a)=0 says every in-plane displacement is perpendicular to normal n.','normal ↑ from plane'),C('Shortest distance','Distance is the absolute projection of a connecting vector onto the relevant unit normal.','gap projected onto normal')],
    ['Direction ratios may be proportional; direction cosines have squared sum 1.','Angle between planes equals the acute angle between normals.','A line is parallel to a plane when its direction is perpendicular to the plane normal.','Use absolute value in distance formulas.'],
    'Find the distance from (1,2,3) to plane x+2y+2z−9=0.', ['Substitute point coordinates into ax+by+cz+d: 1+4+6−9=2.','Normal magnitude is √(1+4+4)=3.','Take absolute numerator divided by normal magnitude.'], '2/3 unit.', 'The sign depends on side of plane, but distance must be nonnegative.',
    ['Extract direction vectors/normals before using angle formulas.','Check whether the requested angle is acute.','Substitute a known plane point to verify its equation.'],
    ['Using direction ratios as already-normalised cosines.','Omitting absolute value in distance.','Comparing line coefficients when normals, not line directions, control plane angles.'],
    'Line follows a direction; plane rejects motion along its normal.',
    [Q('When are planes a·r=d₁ and b·r=d₂ parallel?','When a and b are proportional.','Their normals point in the same or opposite direction.'),Q('What makes two lines skew?','They are nonparallel and nonintersecting.','Unlike coplanar lines, they occupy different planes in 3D.')]
  );

  S['Mathematics::Linear Programming'] = E(
    'Linear programming searches a polygonal feasible region; a linear objective reaches an optimum at a corner unless it is constant along an edge.',
    'It formalises decisions under limited resources and rewards a visual, auditable method.',
    [C('Constraints','Each inequality defines a half-plane; their common overlap is the feasible region.','boundary line + shaded valid side'),C('Corner principle','Test the objective at every feasible vertex because level lines slide until touching a boundary corner/edge.','parallel Z-lines → last contact'),C('Feasibility','A mathematically best intersection is irrelevant if it violates even one constraint.','candidate → all constraints → accept/reject')],
    ['Include x≥0,y≥0 when variables represent nonnegative quantities.','Use a test point to choose each inequality side.','List coordinates and objective values in a table.','Multiple optima occur when an objective level line is parallel to a binding edge.'],
    'Maximise Z=3x+2y subject to x+y≤4, x≤2, x,y≥0.', ['Feasible vertices are (0,0),(2,0),(2,2),(0,4).','Evaluate Z: 0,6,10,8 respectively.','Choose the greatest feasible value.'], 'Maximum Z=10 at (2,2).', '(2,2) satisfies all constraints, including x+y=4 and x=2.',
    ['Draw and label boundary equations cleanly.','Verify every computed intersection before treating it as a vertex.','State both optimum value and the point where it occurs.'],
    ['Shading the wrong half-plane.','Testing intersections outside the feasible region.','Reporting only the point or only the objective value.'],
    'Constraints carve the region; the objective chooses its best corner.',
    [Q('Can an optimum occur at every point of an edge?','Yes.','This happens when the objective line is parallel to and coincides in value along a feasible boundary edge.'),Q('What does an empty feasible region mean?','The constraints are mutually inconsistent.','No decision satisfies all requirements, so no feasible optimum exists.')]
  );

  S['Mathematics::Probability'] = E(
    'Conditional probability updates the sample space after information arrives; independence says that update does not change the other event’s chance.',
    'It is essential for evidence, risk and inference, where confusing P(A|B) with P(B|A) causes serious errors.',
    [C('Conditioning','P(A|B)=P(A∩B)/P(B): restrict attention to B, then measure the A-part.','B circle becomes new universe'),C('Total probability','Partition the population into causes Bᵢ, weight each cause by its chance and likelihood.','causes → weighted paths → outcome'),C('Bayes reversal','Bayes converts likelihood P(evidence|cause) into posterior P(cause|evidence).','prior × likelihood → normalise')],
    ['Independence: P(A∩B)=P(A)P(B), not mutual exclusivity.','Use complements for “at least one” events.','A valid partition is disjoint and exhaustive.','Check all final probabilities lie in [0,1] and relevant totals equal 1.'],
    'A disease affects 1% of people. A test is 90% sensitive and has 5% false positives. Find P(disease|positive).', ['P(positive)=0.01·0.90+0.99·0.05=0.0585.','Joint probability of disease and positive is 0.009.','Divide joint by total positive probability.'], '0.009/0.0585=2/13≈15.38%.', 'The posterior is far below 90% because false positives arise from the much larger healthy group.',
    ['Draw a probability tree for multi-stage wording.','Keep exact fractions until the end.','Name events before inserting numbers into Bayes’ formula.'],
    ['Reversing conditional probabilities.','Calling disjoint events independent.','Ignoring the base rate in diagnostic-style questions.'],
    'Bayes: prior belief × evidence strength, then divide by all ways to see that evidence.',
    [Q('If A and B are mutually exclusive with positive probabilities, are they independent?','No.','P(A∩B)=0 but P(A)P(B)>0.'),Q('Why use a complement for at least one success?','Its complement is no successes.','Computing 1−P(none) avoids adding many overlapping cases.')]
  );

  const J = root.jee;

  J['Mathematics::Sets, Relations and Functions'] = E(
    'JEE questions hide set restrictions inside algebra. Establish the universe, domain and range before manipulating expressions; a correct equation outside its domain is still a wrong answer.',
    'This unit supplies the validity checks used throughout algebra, calculus and counting.',
    [C('Set algebra','Use complements and De Morgan laws to turn complicated unions/intersections into countable regions.','(A∪B)ᶜ=Aᶜ∩Bᶜ'),C('Function anatomy','Domain is permitted input, range is achieved output; monotonicity is often the fastest one-one test.','domain → rule → range'),C('Composition and inverse','Composition carries domain constraints forward; inverse requires a bijection and reverses composition order.','(g∘f)⁻¹=f⁻¹∘g⁻¹')],
    ['n(A∪B)=n(A)+n(B)−n(A∩B).','For rational functions exclude zero denominators; for even roots require radicand≥0.','Strict monotonicity proves one-one on an interval.','An inverse relation becomes a function only for a bijection.'],
    'Find the domain and range of f(x)=1/(x²+1).', ['The denominator is always positive, so the domain is R.','Since x²≥0, x²+1≥1, hence 0<f(x)≤1.','The maximum 1 occurs at x=0; values approach but never reach 0.'], 'Domain R; range (0,1].', 'Solving y=1/(x²+1) gives x²=(1−y)/y, which has real solutions exactly for 0<y≤1.',
    ['Put domain restrictions in the first line.','Use interval/monotonic reasoning before attempting an inverse formula.','For finite-set functions, count choices only after imposing mapping conditions.'],
    ['Cancelling a factor and restoring an excluded input.','Equating range with codomain.','Assuming f∘g and g∘f have the same domain.'],
    'Legal inputs first, algebra second.',
    [Q('What is the range of x²/(1+x²)?','[0,1).','It equals 1−1/(1+x²): minimum 0 is attained and 1 is approached only at infinity.'),Q('Does f∘g one-one imply g one-one?','Yes, on the stated domain.','If g mapped two inputs equally, the composite would also map them equally.')]
  );

  J['Mathematics::Complex Numbers and Quadratic Equations'] = E(
    'A complex number is simultaneously an algebraic pair and a geometric point. Switch between rectangular form for addition and polar form for powers, products and loci.',
    'This dual view shortens quadratic-root, geometry and argument questions dramatically.',
    [C('Argand geometry','z=x+iy is point (x,y); |z−a| is distance from point a.','Re axis →, Im axis ↑'),C('Polar multiplication','Multiplication multiplies moduli and adds arguments; division divides moduli and subtracts arguments.','r₁∠θ₁ · r₂∠θ₂=r₁r₂∠(θ₁+θ₂)'),C('Quadratic roots','For real coefficients, non-real roots occur as conjugate pairs; sum and product encode coefficients.','α+β=−b/a, αβ=c/a')],
    ['z z̅=|z|² and 1/z=z̅/|z|² for z≠0.','Argument is multi-valued modulo 2π; principal argument follows a convention.','Discriminant controls real-root nature; Vieta often avoids solving.','The n-th roots lie equally spaced on a circle.'],
    'Solve z²=8i.', ['Write 8i=8e^{i(π/2+2kπ)}.','Square roots have modulus √8=2√2 and arguments π/4 and 5π/4.','Convert to rectangular form.'], 'z=2+2i or −2−2i.', 'Squaring 2+2i gives 8i; the other root is its negative.',
    ['Use loci: |z−a|=r is a circle and equal distances give a perpendicular bisector.','For powers/roots, move to polar form.','Use Vieta when the expression is symmetric in roots.'],
    ['Taking only one n-th root.','Using arctan(y/x) without quadrant correction.','Assuming |z₁+z₂|=|z₁|+|z₂| always.'],
    'Rectangular for sums; polar for products and powers.',
    [Q('What locus is |z−1|=|z+1|?','The imaginary axis.','Points are equidistant from 1 and −1, so x=0.'),Q('If a real quadratic has one root 2+i, what is the other?','2−i.','Non-real roots of real-coefficient polynomials occur in conjugate pairs.')]
  );

  J['Mathematics::Matrices and Determinants'] = E(
    'Matrices compose linear actions; determinants tell whether information survives that action. Use structure and row operations before expansion.',
    'JEE combines inverse, equations and determinant properties, so structural recognition saves most of the time.',
    [C('Composition','AB applies B before A; row-by-column multiplication preserves this order.','vector → B → A'),C('Determinant structure','Triangular determinants multiply diagonals; proportional rows signal zero immediately.','triangular → diagonal product'),C('System solvability','AX=B has a unique solution exactly when det A≠0, then X=A⁻¹B.','det A ≠ 0 → one solution')],
    ['det(AB)=det A det B and det(Aᵀ)=det A.','adj(A)A=det(A)I.','Row addition preserves determinant; row swap reverses sign.','A⁻¹ exists iff det A≠0.'],
    'If A is 3×3 with det A=2, find det(3A⁻¹).', ['For order 3, det(3B)=3³det B.','det(A⁻¹)=1/det A=1/2.','Multiply: 27/2.'], '27/2.', 'det(3A⁻¹)det(A/3)=1, which agrees with inverse scaling.',
    ['Search for proportionality, zeros and triangular form first.','Track scalar powers using matrix order.','Verify any inverse identity by multiplying in the stated order.'],
    ['Using det(kA)=k det A instead of kⁿ det A.','Assuming determinant distributes over addition.','Changing determinant under Rᵢ→Rᵢ+kRⱼ.'],
    'Matrix moves; determinant measures whether the move collapses space.',
    [Q('For 3×3 A, what is det(adj A)?','(det A)².','In order n, det(adj A)=(det A)^{n−1}.'),Q('Can AB=O with nonzero square A and B?','Yes, if singular matrices are allowed.','Nonzero transformations can map into each other’s null spaces.')]
  );

  J['Mathematics::Permutations and Combinations'] = E(
    'Counting is a modelling problem: decide whether order matters, whether repetition is allowed and whether objects are distinct before choosing a formula.',
    'Correct case design beats memorised formulas in arrangements, selections and probability.',
    [C('Product versus sum','Multiply sequential independent choices; add mutually exclusive complete cases.','stage 1 × stage 2; case A + case B'),C('Arrangement versus selection','If exchanging chosen objects creates a new outcome use permutations; otherwise combinations.','order matters: nPᵣ; not: nCᵣ'),C('Restriction strategy','Count directly by blocks/slots or use total minus forbidden outcomes.','valid = total − invalid')],
    ['nPᵣ=n!/(n−r)! and nCᵣ=n!/[r!(n−r)!].','For repeated identical objects divide by factorials of repeat counts.','Circular arrangements of n distinct objects are (n−1)! when rotations coincide.','Distribute identical objects using stars and bars only when constraints fit.'],
    'How many 5-digit even numbers use distinct digits from 0–9?', ['Choose the final digit by cases. If it is 0: first digit 9 choices, then 8·7.','If final digit is one of 2,4,6,8: 4 choices; first digit has 8 nonzero choices; middle places 8·7.','Add 9·8·7 + 4·8·8·7.'], '2520.', 'The total is below 9·9·8·7=4536 distinct-digit 5-digit numbers, as expected.',
    ['Write a sentence defining one counted outcome.','Place the most restrictive position first.','Use complementary counting for at least-one conditions.'],
    ['Allowing zero in the leading position.','Multiplying overlapping cases.','Using combinations when roles/positions distinguish selections.'],
    'Order? repetition? identity? restriction? Answer these four before counting.',
    [Q('Why divide by 3! for three identical letters?','Their internal swaps do not create new arrangements.','Each visible arrangement was counted 3! times as if those letters were distinct.'),Q('How many nonnegative solutions to x+y+z=5?','C(7,2)=21.','Five stars separated into three boxes by two bars gives seven positions choose two bars.')]
  );

  J['Mathematics::Binomial Theorem'] = E(
    'The general term is the control centre of a binomial expansion. Translate the requested power or position into an equation for r instead of expanding everything.',
    'This enables rapid coefficient, middle-term, divisibility and approximation questions.',
    [C('General term','In (a+b)ⁿ, Tᵣ₊₁=C(n,r)a^{n−r}bʳ; term number is r+1.','r=0,1,…,n'),C('Target exponent','After substituting powers of x, collect the exponent and solve for integer r.','power(x)=linear expression in r'),C('Middle terms','n even gives one middle term T_{n/2+1}; n odd gives two.','n+1 total terms')],
    ['C(n,r)=C(n,n−r).','Independent term requires net variable exponent zero.','Greatest coefficients cluster near r≈n/2.','For rational indices, a valid term still requires integer r in [0,n].'],
    'Find the constant term in (x²+1/x)⁶.', ['Tᵣ₊₁=C(6,r)(x²)^{6−r}(x⁻¹)ʳ.','The x exponent is 12−3r; set it to 0, giving r=4.','Coefficient is C(6,4).'], '15.', 'r=4 is an allowed integer and x^{12−12}=1.',
    ['Write Tᵣ₊₁ before doing any coefficient work.','Separate numerical coefficient, sign and variable exponent.','Check r is an integer within range.'],
    ['Confusing r with term number r+1.','Dropping a negative sign raised to r.','Accepting a fractional r as a term.'],
    'General term first; requested condition becomes an equation for r.',
    [Q('How many terms are in (a+b)ⁿ?','n+1.','r runs from 0 through n inclusive.'),Q('What are the middle terms when n=7?','T₄ and T₅.','There are 8 terms, so the central pair occupies positions 4 and 5.')]
  );

  J['Mathematics::Sequence and Series'] = E(
    'A sequence describes position; a series accumulates positions. Identify the invariant—constant difference, ratio or telescoping cancellation—before applying formulas.',
    'Progressions appear directly and inside limits, finance and combinatorial sums.',
    [C('AP','Constant first difference d gives aₙ=a+(n−1)d and Sₙ=n[2a+(n−1)d]/2.','equal additive steps'),C('GP','Constant ratio r gives aₙ=ar^{n−1}; finite and infinite sums depend on r.','equal multiplicative steps'),C('Telescoping','Rewrite terms so adjacent pieces cancel, leaving boundary terms.','(u₁−u₂)+(u₂−u₃)+…')],
    ['An infinite GP converges only for |r|<1.','Insert arithmetic/geometric means by treating endpoints as terms of one progression.','Use partial fractions for sums like 1/[n(n+1)].','For recurrence relations calculate early terms and seek a stable pattern before proving it.'],
    'Evaluate Σ from n=1 to N of 1/[n(n+1)].', ['Decompose 1/[n(n+1)]=1/n−1/(n+1).','Write the first terms: (1−1/2)+(1/2−1/3)+…+(1/N−1/(N+1)).','Cancel internal terms.'], 'N/(N+1).', 'For N=1 it gives 1/2, matching the original first term; as N grows it approaches 1.',
    ['Test first differences and ratios explicitly.','For finite sums, verify with n=1 or 2.','Search for shifted cancellation before heavy algebra.'],
    ['Using infinite-GP formula when |r|≥1.','Confusing nth term with sum to n terms.','Cancelling a telescoping pattern without retaining endpoints.'],
    'Difference means AP, ratio means GP, shifted subtraction means telescope.',
    [Q('What is 0.999… as a series?','1.','It is a GP with a=0.9, r=0.1, so sum=0.9/0.9.'),Q('If AP terms have sum n², what is aₙ?','2n−1.','aₙ=Sₙ−Sₙ₋₁=n²−(n−1)².')]
  );

  J['Mathematics::Limit, Continuity and Differentiability'] = E(
    'A limit studies local approach, continuity matches that approach to the function value, and differentiation measures the first-order local change. Preserve domains and use expansions only to the first non-cancelling order.',
    'JEE calculus depends on detecting indeterminate forms, piecewise joins and hidden non-differentiable points quickly.',
    [C('Limit toolkit','Factor/rationalise for algebraic cancellation; use standard limits or series near zero for transcendental forms.','0/0 → transform, never substitute blindly'),C('Continuity chain','Composition of continuous functions stays continuous wherever every inner expression is defined.','continuous blocks + valid domain'),C('Differentiability test','At joins and moduli, compare left and right derivatives; a corner/cusp fails.','LHD ?= RHD')],
    ['lim_{x→0} sin x/x=1, (eˣ−1)/x=1 and ln(1+x)/x=1.','Equivalent small quantities may be replaced only inside a valid limiting argument.','Differentiability implies continuity, not conversely.','For greatest-integer/modulus functions inspect breakpoints separately.'],
    'Evaluate lim_{x→0} (eˣ−1−x)/x².', ['Use eˣ=1+x+x²/2+O(x³).','The constant and linear terms cancel.','Divide the first surviving x²/2 term by x².'], '1/2.', 'Applying L’Hôpital twice gives eˣ/2→1/2, confirming the expansion.',
    ['Identify the form before choosing a technique.','At a piecewise point, test value, limits and one-sided derivatives in that order.','Keep enough series terms to survive cancellation.'],
    ['Replacing sin x by x away from a limit.','Applying L’Hôpital to a non-indeterminate form.','Cancelling a factor while forgetting the original punctured domain.'],
    'Limit approaches; continuity connects; derivative measures the connected curve’s local direction.',
    [Q('Why does (1−cos x)/x² tend to 1/2?','Use 1−cos x=2sin²(x/2).','The expression becomes one half times [sin(x/2)/(x/2)]².'),Q('Is x^{2/3} differentiable at 0?','No.','Its derivative behaves like x^{-1/3}, producing a vertical cusp even though the function is continuous.')]
  );

  J['Mathematics::Integral Calculus'] = E(
    'JEE integration is pattern selection plus verification. Simplify first, match an inner derivative or symmetry, and differentiate the result whenever possible.',
    'Integral calculus supplies exact accumulation, areas and many high-yield property-based shortcuts.',
    [C('Method decision','Composite with inner derivative → substitution; product with reducible factor → parts; rational function → division/partial fractions.','shape → shortest method'),C('Definite properties','Pair f(x) with f(a−x), exploit parity, periodicity and interval splitting before finding antiderivatives.','mirror interval around midpoint'),C('Area discipline','Solve intersections and integrate positive top-minus-bottom pieces.','graph → split → integrate')],
    ['∫₀ᵃf(x)dx=∫₀ᵃf(a−x)dx.','For periodic f of period T, integrals across full periods repeat.','Definite integrals need no +C; indefinite ones do.','Differentiate parameter-dependent integrals using the fundamental theorem and chain rule.'],
    'Evaluate I=∫₀π/2 sin x/(sin x+cos x) dx.', ['Replace x by π/2−x to get I=∫ cos x/(sin x+cos x)dx over the same limits.','Add the two forms: 2I=∫₀π/2 1 dx.','Hence 2I=π/2.'], 'I=π/4.', 'The paired integrands add to 1 pointwise; symmetry also suggests equal sine and cosine shares.',
    ['Try x→a−x immediately on symmetric definite limits.','Keep a method hierarchy; do not default to parts.','For area, locate every sign/intersection change.'],
    ['Mixing changed u-limits with x in the integrand.','Forgetting constants in standard forms.','Assuming ∫f/g equals (∫f)/(∫g).'],
    'Simplify, spot structure, integrate, differentiate to verify.',
    [Q('What is ∫₋ₐᵃ f(x)dx for odd f?','0.','Opposite signed contributions cancel over symmetric limits.'),Q('Why can a definite integral be negative?','It measures signed accumulation.','Where the function is below the axis, vertical slices contribute negatively; geometric area would reverse those pieces.')]
  );

  J['Mathematics::Differential Equations'] = {
    ...S['Mathematics::Differential Equations'],
    insight: 'In JEE, classification is the speed move: recognise separable or first-order linear form before touching algebra, then verify the final family in the original equation.',
    examTips: ['Test for separation before computing an integrating factor.','Protect constant solutions before dividing by a y-expression.','Differentiate the final answer; verification is often faster than rechecking integration.'],
    traps: ['Forgetting absolute values in logarithmic integration.','Dropping equilibrium solutions during division.','Using the linear integrating factor with the wrong sign for P(x).']
  };

  J['Mathematics::Coordinate Geometry'] = E(
    'Coordinate geometry becomes manageable when every curve is read as a geometric constraint: focus-directrix for conics, fixed distance for circles, and direction for lines.',
    'JEE rewards choosing a coordinate system and parametric representation that builds the constraint in automatically.',
    [C('Straight lines','Slope encodes direction; normal form encodes perpendicular distance; determinant form handles collinearity.','direction vector along line, normal across it'),C('Circle','(x−h)²+(y−k)²=r² exposes centre and radius; tangent is perpendicular to the radius.','centre •─r─ circumference'),C('Conics','Parabola fixes focus/directrix ratio 1; ellipse <1 and hyperbola >1 through eccentricity.','focus •, directrix |, moving P')],
    ['Complete squares before interpreting a general circle equation.','Use parametric points: circle (a cosθ,a sinθ), parabola (at²,2at).','A tangent has one repeated intersection: discriminant zero.','Translate/rotate intuition before expanding equations.'],
    'Find the tangent to x²+y²=25 at (3,4).', ['The radius direction is (3,4), so it is normal to the tangent.','For x²+y²=a² at (x₁,y₁), tangent is xx₁+yy₁=a².','Substitute the point.'], '3x+4y=25.', 'The point satisfies 9+16=25, and tangent normal (3,4) matches the radius.',
    ['Translate the equation into centre/focus/axis data first.','Use parameter forms to eliminate repeated constraints.','Check tangency using discriminant zero or radius perpendicularity.'],
    ['Memorising a tangent formula for the wrong standard orientation.','Using distance from origin instead of the actual centre.','Squaring locus equations and retaining extraneous branches.'],
    'Equation is geometry compressed; unpack centre, direction, focus and distance first.',
    [Q('What condition makes y=mx+c tangent to x²+y²=a²?','c²=a²(1+m²).','The centre-to-line distance |c|/√(1+m²) must equal radius a.'),Q('Why is the latus rectum of y²=4ax length 4a?','Its line x=a passes through the focus.','Substitution gives y=±2a, whose separation is 4a.')]
  );

  J['Mathematics::Three Dimensional Geometry'] = {
    ...S['Mathematics::Three Dimensional Geometry'],
    insight: 'JEE 3D questions are vector projection problems wearing coordinate notation. Extract direction vectors and plane normals first; only then select angle, intersection or distance formulas.',
    examTips: ['Convert symmetric line equations to a point and direction vector immediately.','Use a scalar triple product to test coplanarity.','For shortest distance, construct or project along the common perpendicular.'],
    traps: ['Using line direction where a plane normal is required.','Returning the obtuse angle when the question requests angle between lines/planes.','Applying skew-line distance without checking the denominator cross product is nonzero.']
  };

  J['Mathematics::Vector Algebra'] = {
    ...S['Mathematics::Vector Algebra'],
    insight: 'In JEE vectors are a geometry engine: dot products answer alignment and projection, cross products answer area and normals, and triple products answer volume and coplanarity.',
    examTips: ['Choose the operation from the requested geometric object before expanding components.','Square magnitudes to avoid premature radicals.','Use cyclic symmetry of scalar triple products to reorder conveniently.'],
    traps: ['Taking magnitudes too early and losing direction/sign.','Reversing cross-product order.','Treating scalar and vector projections as interchangeable.']
  };

  J['Mathematics::Statistics and Probability'] = E(
    'Statistics compresses variation; probability models uncertainty. In both, define weights and the sample space before calculating, because an elegant computation on the wrong population is worthless.',
    'JEE mixes variance transformations, distributions, conditional probability and counting into compact multi-step questions.',
    [C('Mean and variance','Mean locates the centre; variance averages squared distance from it. Shifts do not change variance, scaling by a multiplies it by a².','X→aX+b: mean aμ+b, variance a²σ²'),C('Conditional paths','Multiply along a probability-tree path and add mutually exclusive paths reaching the same outcome.','branch products → outcome sum'),C('Random variable','A discrete distribution lists possible values with nonnegative probabilities summing to one.','Σpᵢ=1; E[X]=Σxᵢpᵢ')],
    ['Var(X)=E[X²]−(E[X])².','Independent events multiply; mutually exclusive alternatives add.','Binomial model requires fixed n, two outcomes, constant p and independent trials.','Bayes divides the desired path probability by total evidence probability.'],
    'If X has P(X=0)=1/4, P(X=1)=1/2, P(X=2)=1/4, find mean and variance.', ['E[X]=0+1/2+2/4=1.','E[X²]=0+1/2+4/4=3/2.','Variance=3/2−1².'], 'Mean 1; variance 1/2.', 'The distribution is symmetric about 1, and squared deviations 1,0,1 average to 1/2.',
    ['Create a distribution table with x, p, xp and x²p columns.','Use complements for at-least-one events.','Check probabilities sum to one before taking expectations.'],
    ['Using E[X²] as variance.','Adding probabilities of overlapping events.','Applying binomial formulas when success probability changes.'],
    'Mean tracks centre; variance tracks squared spread; probability trees track evidence.',
    [Q('What happens to variance when every observation increases by 7?','It is unchanged.','All deviations from the new mean remain the same.'),Q('For binomial(n,p), what are mean and variance?','np and np(1−p).','They follow from summing n independent Bernoulli indicators.')]
  );

  J['Mathematics::Trigonometry'] = E(
    'Trigonometry is geometry plus periodicity. Reduce angles and signs first, then choose identities; do not expand every expression by reflex.',
    'It underlies coordinate geometry, complex numbers and calculus, and JEE often tests transformations rather than raw evaluation.',
    [C('Unit-circle control','Coordinates (cosθ,sinθ) determine signs and periodic values without memorising quadrant tables.','unit circle: x=cosθ, y=sinθ'),C('Identity strategy','Convert mixed functions to sine/cosine, factor using sum-to-product, or combine a sin x+b cos x into one shifted sine.','a sin x+b cos x=R sin(x+φ)'),C('Equation completeness','Find reference solutions, apply periodic families, then restrict to the requested interval.','base angles + period → filter interval')],
    ['sin²x+cos²x=1 drives most conversions.','Maximum of a sin x+b cos x is √(a²+b²).','tan has period π; sine and cosine have period 2π.','Inverse-trig final values must lie in principal ranges.'],
    'Find the maximum and minimum of 3 sin x+4 cos x.', ['Set R=√(3²+4²)=5.','Choose φ with cosφ=3/5 and sinφ=4/5, giving 5 sin(x+φ).','Since sine lies in [−1,1], scale the bounds by 5.'], 'Maximum 5; minimum −5.', 'Cauchy–Schwarz also gives |3 sin x+4 cos x|≤5, and suitable angles attain equality.',
    ['Reduce to standard angles and determine quadrant signs first.','Use amplitude form for linear sine-cosine expressions.','After solving an equation, list all solutions in the stated interval.'],
    ['Dividing by sin x or cos x and losing zero cases.','Using degrees in a radian-based calculus setting.','Giving only principal inverse-trig answers for a periodic trig equation.'],
    'Unit circle for signs, identities for shape, periodicity for every solution.',
    [Q('Solve sin x=sin α generally.','x=nπ+(−1)ⁿα, n∈Z.','It combines x=α+2kπ and x=π−α+2kπ.'),Q('Why is |a sin x+b cos x|≤√(a²+b²)?','It is a dot product of (a,b) with unit vector (sin x,cos x).','Cauchy–Schwarz bounds the dot product by the product of magnitudes.')]
  );
})();
