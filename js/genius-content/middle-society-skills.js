(function () {
  window.HM = window.HM || {};
  const root = window.HM.geniusContent = window.HM.geniusContent || { school: {}, jee: {} };
  root.school = root.school || {};

  const add = (subject, title, d) => {
    root.school[`${subject}::${title}`] = {
      insight: d.i, whyItMatters: d.w,
      concepts: d.c.map(([conceptTitle, explain, visual]) => ({ title: conceptTitle, explain, visual })),
      mustKnow: d.m,
      worked: { problem: d.p, steps: d.s, answer: d.a, check: d.k },
      examTips: d.e, traps: d.t, memoryHook: d.h,
      guidedQuestions: d.q.map(([question, answer, explanation]) => ({ question, answer, explanation }))
    };
  };

  const S = 'Social Science';
  add(S, 'Geographical Diversity of India', {
    i:'India is best understood as linked landscapes: relief shapes water and climate, which shape livelihoods, settlement and culture.',
    w:'This causal chain explains regional diversity without reducing people or places to stereotypes.',
    c:[['Relief regions','Mountains, plains, plateaus, deserts, coasts and islands differ in height, slope and formation.','relief → soil + drainage → land use'],['Map evidence','Direction, scale, symbols and legend turn a map into evidence rather than decoration.','locate → describe pattern → infer cause'],['Human adaptation','People adapt crops, houses, transport and work to opportunities and hazards.','environment ⇄ choices ⇄ technology']],
    m:['Himalayas are young fold mountains; the Northern Plains are largely alluvial.','The Peninsular Plateau is ancient; coastal plains flank it.','Describe location with named neighbours, direction and physical features.'],
    p:'Explain why dense settlement is common in the Northern Plains.', s:['Locate the plains near perennial river systems.','Connect alluvial soil, level land and water to farming and transport.','Add a limit: floods and crowding still create risk.'], a:'Fertile level land, reliable water and easier transport support farming, towns and dense settlement.', k:'The answer links physical evidence to human consequence; it does not claim every place is identical.',
    e:['Annotate maps with one fact and one consequence.','Use “because–therefore–however” for geography explanations.'], t:['Listing landforms without relationships.','Assuming geography alone determines culture.'], h:'Land gives possibilities; people make choices.',
    q:[['Why are mountain roads often winding?','They follow gentler gradients.','A winding route reduces the steepness vehicles must climb, though it increases distance.'],['What makes a map claim convincing?','Location plus visible pattern and relevant legend/scale evidence.','A claim must be traceable to what the map actually shows.']]
  });

  add(S, 'Understanding the Weather', {
    i:'Weather is the atmosphere’s short-term condition; instruments convert what we feel into comparable evidence.',
    w:'Reading weather evidence supports farming, travel and safety decisions and prevents one hot afternoon becoming a false climate claim.',
    c:[['Elements','Temperature, pressure, humidity, wind, cloud and precipitation describe atmospheric condition.','observe → measure → record'],['Instruments','Each variable needs a suitable instrument and standard unit.','thermometer °C | rain gauge mm | wind vane direction'],['Daily pattern','Solar heating changes through the day and drives local temperature and air movement.','sunrise → warming → afternoon peak → cooling']],
    m:['Weather changes over hours or days; climate is a long-term pattern.','Maximum and minimum temperature need comparable exposure conditions.','Wind is named for the direction from which it comes.'],
    p:'At noon clouds thicken, pressure falls and humid winds strengthen. Make a cautious forecast.', s:['Use all three observations rather than one sign.','Connect rising moisture and uplift with cloud growth.','State uncertainty because forecasts are probabilities.'], a:'Rain has become more likely soon, but the evidence does not guarantee it.', k:'The conclusion is proportional to the evidence and includes uncertainty.',
    e:['Name the element, instrument and unit together.','Interpret a table by citing two values and their trend.'], t:['Confusing weather with climate.','Reading a wind vane as the direction wind travels toward.'], h:'Measure now; compare often; climate emerges slowly.',
    q:[['Why keep a rain gauge in an open place?','To collect unobstructed rainfall.','Roofs and trees can block, channel or splash water and distort the reading.'],['Can one unusually cold day disprove global warming?','No.','A local daily event and a long-term global climate trend use different time and spatial scales.']]
  });

  add(S, 'Climates of India', {
    i:'India’s climate is a moving system controlled by latitude, altitude, distance from sea, relief and seasonal winds.',
    w:'Cause-based climate reasoning explains monsoons, regional contrasts and why averages still contain risk.',
    c:[['Climate controls','Latitude affects solar energy; altitude cools; oceans moderate; relief redirects air.','L-A-D-R → climate pattern'],['Monsoon mechanism','Seasonal land–sea heating differences help reverse winds and transport moisture.','summer low over land ← moist ocean air'],['Rainfall pattern','Relief can lift moist air on windward slopes and leave a rain shadow leeward.','moist air ↑ cools → rain | descending air → dry']],
    m:['Southwest monsoon supplies much of India’s annual rain.','Tamil Nadu receives important rain from the retreating/northeast monsoon.','Climate graphs pair monthly temperature with precipitation.'],
    p:'Why is Mumbai’s annual temperature range smaller than Delhi’s?', s:['Mumbai is coastal; Delhi is inland.','Water heats and cools more slowly than land.','Sea influence moderates Mumbai while continentality increases Delhi’s extremes.'], a:'Mumbai’s maritime location produces a smaller range; inland Delhi heats and cools more sharply.', k:'The comparison holds the country broadly constant and changes the key control—distance from sea.',
    e:['For climate graphs, identify peak, trough, range and wet season.','Explain regional difference by comparing the same control in both places.'], t:['Saying monsoon means continuous rain.','Using latitude as the only climate control.'], h:'Latitude loads the dice; sea, height and relief reshape the result.',
    q:[['Why does the windward side often receive more rain?','Air is forced upward, cools and condenses.','The leeward air descends warmer and drier, creating a rain shadow.'],['Why are monsoon dates important to farmers?','They affect sowing, irrigation and crop risk.','Farm decisions depend not only on total rain but also timing and distribution.']]
  });

  add(S, 'New Beginnings: Cities and States', {
    i:'Early cities and states grew when surplus, specialised work, trade and organised authority reinforced one another.',
    w:'This explains state formation as a process supported by evidence, not a memorised list of kings.',
    c:[['Second urbanisation','Agricultural surplus and iron tools supported larger settlements and specialised occupations.','surplus → specialists → exchange → towns'],['Mahajanapadas','Territorial states developed capitals, revenue systems and armies; some were monarchies, others ganas.','janapada → fortified centre → administration'],['Historical evidence','Texts, coins, pottery, inscriptions and archaeology answer different questions.','source + context + corroboration → claim']],
    m:['The Ganga plains became a major centre of urban and political growth.','Magadha benefited from resources, routes and capable rulers.','A source is evidence, not an automatic fact; ask who made it and why.'],
    p:'A fortified site contains punch-marked coins, craft debris and grain stores. What can historians infer?', s:['Classify the evidence: defence, exchange, production and storage.','Link the cluster to concentrated population and coordination.','Avoid naming a specific kingdom without identifying evidence.'], a:'It was probably an organised urban centre with trade, specialised crafts, stored surplus and defensive authority.', k:'Every inference is tied to an artefact and the conclusion stays within the evidence.',
    e:['Build timeline answers around change and continuity.','Cite at least two independent source types.'], t:['Treating legend and archaeology as identical evidence.','Assuming every early state was ruled by one king.'], h:'Surplus feeds specialists; specialists grow cities; cities need coordination.',
    q:[['Why were rivers valuable to early states?','They supported water, fertile land, movement and exchange.','One geographical feature could strengthen several parts of state power.'],['Why compare sources?','Each source is partial and shaped by its maker.','Agreement and disagreement reveal both facts and perspectives.']]
  });

  add(S, 'The Rise of Empires', {
    i:'An empire survives by connecting military reach to revenue, administration, communication and negotiated local support.',
    w:'It replaces the “great conqueror” story with a system explanation and makes comparison meaningful.',
    c:[['Expansion','Resources, strategy, diplomacy and conflict expand control, but conquest creates governing costs.','conquer → communicate → collect → legitimise'],['Mauryan governance','Officials, centres and routes linked a large territory while local conditions still differed.','capital ⇄ provincial centres ⇄ localities'],['Ashokan evidence','Edicts communicate dhamma and royal concerns in different scripts and places.','inscription = message + audience + location']],
    m:['Chandragupta Maurya founded the Mauryan Empire; Ashoka was a major later ruler.','The Kalinga conflict is central to Ashoka’s stated moral turn.','Edicts reveal royal aims, not a complete account of everyone’s life.'],
    p:'An edict appears in a frontier region in a local script. What does that placement suggest?', s:['Identify intended audience from location and script.','Infer a desire to communicate policy across diversity.','Separate the ruler’s message from proof that everyone obeyed it.'], a:'The state adapted communication to reach frontier communities, showing ambition to govern and persuade across a diverse empire.', k:'The answer uses medium, location and audience while preserving source limits.',
    e:['Compare empires using the same headings: expansion, administration, revenue, communication, legitimacy.','Date events on a simple before/after timeline.'], t:['Equating a ruler’s claim with reality.','Explaining expansion through bravery alone.'], h:'Winning land begins an empire; connecting it sustains one.',
    q:[['Why are inscriptions valuable primary sources?','They survive from the period and preserve an official message.','Their closeness to events helps, but official purpose creates bias.'],['Did dhamma mean one new religion forced on all?','No.','It was presented as ethical conduct and social harmony, though interpreted through royal policy.']]
  });

  add(S, 'The Age of Reorganisation', {
    i:'When one large empire fragments, power does not vanish—it reorganises among regions, routes and new political networks.',
    w:'This lens reveals continuity alongside change and prevents “decline” from becoming an empty explanation.',
    c:[['Post-imperial map','Shungas, Satavahanas, Kushanas and other powers operated across overlapping times and regions.','timeline bands, not one ruler list'],['Trade networks','Land and sea routes moved goods, coins, technologies and beliefs.','port ⇄ hinterland ⇄ caravan route'],['Cultural encounter','Contact creates adaptation and hybrid forms rather than simple copying.','local form + incoming influence → new expression']],
    m:['Political decentralisation can coexist with expanding trade.','Coins help trace rulers, economy, symbols and connections.','Chronology should show overlap, not force all dynasties into one sequence.'],
    p:'A site yields Roman coins, local pottery and a Buddhist monument. Construct a balanced inference.', s:['Treat each item as a clue to exchange, daily production and patronage.','Connect the site to wider trade without calling it Roman territory.','State that dating and context are needed.'], a:'The settlement likely joined long-distance trade while retaining local production and supporting Buddhist institutions.', k:'The conclusion explains all three finds and avoids ownership claims unsupported by evidence.',
    e:['Draw parallel regional timelines.','Use artefacts to support one precise inference each.'], t:['Calling political change a “dark age.”','Assuming a foreign coin proves foreign rule.'], h:'Power shifts; routes persist; cultures recombine.',
    q:[['How can coins reveal trade?','Their origin and find-location can show movement and exchange.','Context and quantity matter because a single coin may travel in many ways.'],['What is continuity?','A feature that persists across a period of change.','Trade routes or institutions may remain even as ruling houses change.']]
  });

  add(S, 'The Gupta Era: An Age of Tireless Creativity', {
    i:'The Gupta era matters not as a flawless “golden age,” but as a period whose art, learning and institutions must be tested against varied evidence.',
    w:'Balanced evaluation recognises achievement while asking who benefited and whose voices are missing.',
    c:[['Political network','Rulers used conquest, alliances, grants and local relationships rather than uniform control everywhere.','core control → allies → frontier relations'],['Knowledge and art','Mathematics, astronomy, literature, sculpture and temple forms developed through communities of practice.','patronage + institutions + exchange'],['Perspective','Court praise, inscriptions and surviving elite works illuminate some lives more than others.','visible evidence ≠ whole society']],
    m:['Samudragupta’s prashasti is praise composed for a ruler and must be read critically.','Achievements were cumulative, not the work of a single dynasty alone.','Land grants reveal power, economy and social relationships.'],
    p:'A prashasti calls a king unconquered. How should a historian use it?', s:['Identify genre and patron: public royal praise.','Extract verifiable details such as places or relationships.','Corroborate the superiority claim with coins, inscriptions and archaeology.'], a:'Use it as evidence of royal image and possible events, not unquestioned proof of universal victory.', k:'The source is neither discarded nor believed literally; purpose shapes interpretation.',
    e:['Evaluate an era with achievements, limits and evidence.','Credit developments to processes and institutions, not one hero.'], t:['Writing “golden age” as an unquestioned fact.','Treating absence of evidence as evidence of absence.'], h:'Celebrate the work; interrogate the label.',
    q:[['Why is a prashasti biased but useful?','Its praise serves a ruler, yet reveals ideals, claims and named events.','Bias is information about purpose, not a reason to ignore a source.'],['How can historians test a cultural achievement?','Date and compare manuscripts, objects, inscriptions and later transmission.','Independent evidence strengthens attribution and context.']]
  });

  add(S, 'How the Land Becomes Sacred', {
    i:'Sacred landscapes emerge when communities connect memory, story, pilgrimage, ritual and place across generations.',
    w:'Studying the process respectfully explains cultural geography without asking history to prove or disprove faith.',
    c:[['Place-making','A river, hill, grove or settlement gains shared meanings through narratives and practices.','place + story + practice + memory'],['Pilgrimage network','Routes connect local shrines, travellers, markets and institutions.','home → route → sacred centre → return'],['Multiple perspectives','The same landscape can hold religious, ecological, economic and political meanings.','one place | many lenses']],
    m:['Sacred geography changes over time while preserving traditions.','Oral accounts, texts, material remains and present practice offer different evidence.','Respectful comparison describes beliefs without ranking them.'],
    p:'A riverbank has old inscriptions, annual festivals and recent conservation rules. Explain its layered significance.', s:['Place each evidence type on a timeline.','Identify religious memory, community practice and environmental governance.','Show interaction rather than choosing one “real” meaning.'], a:'The riverbank is a layered sacred landscape shaped by historical memory, living festival practice and present ecological responsibility.', k:'All supplied evidence appears and distinct perspectives are kept visible.',
    e:['Use neutral phrases such as “devotees believe” when reporting faith claims.','Organise place studies by source, time and perspective.'], t:['Treating sacred traditions as unchanging.','Mocking belief or presenting belief as archaeological proof.'], h:'Stories map meaning onto land; practice keeps the map alive.',
    q:[['Can a natural site have both sacred and ecological value?','Yes.','Values can overlap and may motivate protection, though uses can also conflict.'],['Why record oral traditions?','They preserve community memory and meanings often absent from official texts.','They should be contextualised and compared, like every source.']]
  });

  add(S, 'From the Rulers to the Ruled: Types of Governments', {
    i:'Classify governments by where authority comes from, how it is limited and how citizens can hold it accountable.',
    w:'Names such as democracy or monarchy matter less than tracing actual decision power, rights and checks.',
    c:[['Authority','Rule may rest on inheritance, elections, force, law or combinations of these.','source of power → governing institutions'],['Participation','Direct and representative systems offer different ways to take part at different scales.','citizen → representative → decision'],['Accountability','Elections, legislatures, courts, media and civic action can question power.','power ↔ checks + public scrutiny']],
    m:['Democracy requires more than voting: rights, rule of law and accountability matter.','A constitutional monarchy differs from an absolute monarchy.','Government form and quality of governance are separate questions.'],
    p:'A country holds elections, but opposition candidates are jailed and media criticism is banned. Is election evidence enough to call it democratic?', s:['Note the election as one feature.','Test competition, freedoms and accountability.','Reach a qualified judgment using all evidence.'], a:'No. Elections alone are insufficient when genuine choice, civil liberties and scrutiny are suppressed.', k:'The classification uses several democratic criteria rather than a label.',
    e:['Compare systems in a table using identical criteria.','Support civic judgments with institutional evidence.'], t:['Assuming elected leaders can do anything.','Confusing state, government and nation.'], h:'Ask three questions: who rules, by what right, under what check?',
    q:[['Why are secret ballots important?','They protect voters from coercion and retaliation.','Private choice makes participation more genuinely free.'],['Can a democracy limit majority power?','Yes.','Constitutions and rights protect individuals and minorities from arbitrary majorities.']]
  });

  add(S, 'The Constitution of India — An Introduction', {
    i:'The Constitution is both a rulebook for institutions and a promise that public power must serve equal citizenship.',
    w:'Constitutional reasoning helps students connect everyday rights and duties to institutions rather than memorise articles in isolation.',
    c:[['Preamble compass','Justice, liberty, equality and fraternity express the Constitution’s direction.','values → institutions → public action'],['Institutional design','Legislature makes law, executive implements, judiciary interprets, with checks and federal division.','Union ↔ States | three organs'],['Rights and duties','Fundamental Rights limit state action; duties express civic responsibility.','claim a right + respect others + use remedy']],
    m:['The Constitution came into effect on 26 January 1950.','Constitutional supremacy means government is limited by higher law.','Rights can involve reasonable legal limits; courts review violations.'],
    p:'A public school denies admission solely because of a child’s caste. Frame a constitutional response.', s:['Identify unequal treatment and dignity harm.','Connect to equality and prohibition of caste discrimination.','Name lawful remedy: report, administrative review or court—not retaliation.'], a:'The exclusion violates constitutional equality; the family should seek institutional redress and restoration of admission.', k:'The response links fact, value, right and safe remedy.',
    e:['Use “fact → principle → institution/remedy” in civics answers.','Quote Preamble values accurately, then apply them.'], t:['Treating duties as permission to cancel rights.','Naming an article without explaining relevance.'], h:'Power gets a map; citizens get a shield and a voice.',
    q:[['Why is an independent judiciary important?','It can review power without taking orders from the authority challenged.','Independence supports fair remedies and constitutional limits.'],['What does fraternity add to liberty and equality?','A commitment to mutual dignity and common belonging.','Legal equality becomes stronger when citizens reject humiliation and exclusion.']]
  });

  add(S, 'From Barter to Money', {
    i:'Money succeeds when a community trusts a common claim that separates selling today from buying later.',
    w:'Understanding functions and trust makes digital payments, prices and saving easier to reason about.',
    c:[['Barter constraint','Exchange fails when each trader does not simultaneously want what the other offers.','A wants B’s rice; B does not want A’s pots → no trade'],['Functions of money','Money is medium of exchange, unit of account and store of value.','sell → money → choose later'],['Trust system','Acceptance depends on institutions, authenticity and confidence in future purchasing power.','issuer + security + acceptance → trust']],
    m:['Double coincidence of wants is a barter difficulty.','A price is value expressed in a unit of account, not value itself.','Digital payment transfers money claims; the phone is not the money.'],
    p:'A farmer needs shoes, but the shoemaker wants neither grain nor vegetables. Show how money changes the exchange.', s:['Farmer sells produce to any willing buyer for money.','Money stores purchasing power temporarily.','Shoemaker accepts money and the farmer buys shoes.'], a:'Money breaks one difficult swap into two independent exchanges.', k:'Each participant accepts the same medium; matching wants is no longer necessary.',
    e:['Explain each function with a different example.','Use a flow diagram for exchange.'], t:['Saying barter means goods have no value.','Calling every valuable object good money.'], h:'Barter must match; money lets exchange wait.',
    q:[['Why is a rapidly spoiling fruit a poor store of value?','Its usable value disappears quickly.','A store of value must carry purchasing power into the future.'],['Does a QR code itself hold money?','Usually no.','It identifies payment information; regulated accounts record the transferred claim.']]
  });

  add(S, 'Understanding Markets', {
    i:'A market is a system of exchange shaped by buyers, sellers, information, institutions and bargaining power—not merely a physical place.',
    w:'Market reasoning helps compare price, quality, fairness and hidden costs instead of choosing by advertisement.',
    c:[['Demand and supply','Price and quantity respond to willingness to buy and ability to offer, with other factors also changing.','short supply + steady demand → upward price pressure'],['Market chain','Producers, wholesalers, retailers, platforms and consumers each add service and claim a margin.','producer → aggregator → retailer → consumer'],['Power and fairness','Information, competition, standards and consumer rights affect whose interests prevail.','choice + information + remedy → fairer exchange']],
    m:['Markets may be local, weekly, wholesale, retail or digital.','Price difference may reflect cost, quality, tax, scarcity or market power.','Bills, labels and grievance channels support consumer protection.'],
    p:'A farmer receives ₹20/kg while a city buyer pays ₹55/kg. Is the ₹35 difference automatically unfair?', s:['List legitimate chain costs: sorting, loss, transport, storage and retail.','Ask for evidence of costs, risk and bargaining power.','Judge fairness only after comparing margins and alternatives.'], a:'No automatic verdict is possible; investigate value added, costs, losses and power across the chain.', k:'The answer neither ignores exploitation nor assumes every margin is profit.',
    e:['Trace one product from producer to consumer.','Separate observation (“price is ₹55”) from judgment (“margin is unfair”).'], t:['Equating high price with high profit.','Assuming online markets remove intermediaries.'], h:'Follow the product, the rupee and the power.',
    q:[['Why can the same product have different prices?','Costs, quality, timing, location, competition and information differ.','Markets combine multiple changing conditions.'],['What should a consumer preserve after purchase?','Bill, warranty and product details.','They provide evidence for comparison, service and grievance redress.']]
  });

  add(S, 'The Story of Indian Farming', {
    i:'Farming is a decision system joining soil, water, seed, labour, knowledge, markets and risk.',
    w:'A systems view respects farmers’ choices and explains why one technique cannot fit every region or household.',
    c:[['Farm cycle','Preparation, sowing, care, harvest, storage and sale form an interdependent sequence.','soil → seed → care → harvest → store/sell'],['Agro-diversity','Crop choice responds to season, water, soil, food needs and market opportunity.','conditions + needs + risk → crop mix'],['Sustainability','Productivity must be balanced with soil health, water, biodiversity and livelihood resilience.','yield today + resource tomorrow']],
    m:['Kharif and rabi refer broadly to monsoon and winter cropping seasons.','Irrigation reduces rainfall dependence but can create depletion or salinity if mismanaged.','Farm size, tenancy, credit and market access shape choices.'],
    p:'A dry district repeatedly grows a water-intensive crop using falling groundwater. Recommend a reasoned response.', s:['Identify the mismatch between crop water demand and recharge.','Compare alternatives: millets, efficient irrigation, soil moisture conservation and income support.','Include transition risk rather than ordering instant change.'], a:'Shift gradually toward suitable crops and water-saving methods, backed by reliable markets, advice and livelihood protection.', k:'The solution joins environmental feasibility with farmer economics.',
    e:['Answer farm problems as linked causes, not a technique list.','Use region-specific evidence before recommending crops.'], t:['Blaming farmers while ignoring incentives.','Calling all traditional or all modern methods superior.'], h:'A farm harvests decisions before it harvests crops.',
    q:[['Why is crop diversity useful?','It spreads weather, pest and price risk.','Different crops respond differently, so one failure need not destroy all income or food.'],['Is higher yield always more sustainable?','No.','Yield must be weighed against input cost, soil, water and long-term resilience.']]
  });

  add(S, 'India and Her Neighbours', {
    i:'Neighbourhood geography creates shared rivers, ecosystems, routes and histories, making cooperation practical even when interests differ.',
    w:'Map-based regional reasoning avoids treating countries as isolated coloured shapes.',
    c:[['Relative location','Land and maritime neighbours are identified through boundaries, seas and compass directions.','map centre: India | north, east, west, ocean'],['Interdependence','Trade, migration, culture, energy and ecology cross political borders.','border separates governments; networks connect people'],['Regional perspective','The same event can look different from each country’s security, economic and historical position.','claim A ↔ evidence ↔ claim B']],
    m:['Use an official/current map for international boundaries.','A shared river requires upstream–downstream reasoning.','People-to-people links and government relations are related but not identical.'],
    p:'An upstream project promises electricity but a downstream neighbour fears reduced seasonal flow. Frame a cooperative process.', s:['State both legitimate interests.','Share flow data and environmental assessment.','Negotiate release rules, monitoring and dispute review.'], a:'A transparent, evidence-based agreement can balance energy needs with downstream water and ecosystem security.', k:'The proposal includes both benefit-sharing and enforceable monitoring.',
    e:['Locate before explaining a bilateral issue.','Present each perspective fairly before evaluating options.'], t:['Using outdated maps.','Describing an entire country through one dispute.'], h:'Borders divide authority; geography keeps the conversation connected.',
    q:[['Why do shared rivers require cooperation?','Actions upstream affect water quantity, timing and quality downstream.','The basin functions as one physical system across political borders.'],['What is a maritime neighbour?','A country connected across a nearby sea rather than a land boundary.','Sea lanes and coastal proximity create direct regional relationships.']]
  });

  add(S, 'Empires and Kingdoms: 6th to 10th Centuries', {
    i:'Power in this period grew through flexible networks of rulers, feudatories, land grants, temples, trade and local institutions.',
    w:'Network reasoning explains why political maps changed while regional cultures and economic centres flourished.',
    c:[['Regional powers','Multiple dynasties rose in different regions and often competed for strategic centres.','regional cores ↔ frontier alliances'],['Land and authority','Grants could transfer revenue claims and responsibilities, reshaping local power.','ruler → grant → beneficiary/local society'],['Temple and economy','Temples could be sacred, artistic, landholding and redistributive institutions.','patronage → craft + ritual + exchange']],
    m:['Dynasties overlapped; build regional parallel timelines.','Tripartite struggle refers to contest over Kannauj among major powers.','Inscriptions often express the donor’s idealised authority.'],
    p:'Two dynasties claim the same city in inscriptions from nearby decades. How do you reconstruct control?', s:['Date each inscription and locate where it was issued/found.','Compare with coins, grants and records of opponents.','Allow changing or contested control rather than forcing one winner.'], a:'The city may have changed hands or remained contested; a dated evidence sequence is stronger than either claim alone.', k:'The inference explains contradiction through chronology and corroboration.',
    e:['Create a region-by-century matrix.','For political claims, separate title, territory and effective control.'], t:['Memorising dynasties as one national queue.','Assuming grand titles equal stable empire.'], h:'Map power as a web, not a solid block.',
    q:[['Why was Kannauj important?','Its location and prestige made it strategically and symbolically valuable.','Control could strengthen routes, resources and claims to status.'],['What can a land grant reveal?','Donor, recipient, revenue rights, boundaries and social relationships.','It is both a legal act and a statement of authority.']]
  });

  add(S, 'Turning Tides: 11th and 12th Centuries', {
    i:'The 11th and 12th centuries were an age of shifting political centres, expanding networks and regional creativity—not a single sudden rupture.',
    w:'Careful timelines distinguish raids, conquest, migration, trade and cultural exchange instead of collapsing them into one story.',
    c:[['Changing power','Regional kingdoms competed, allied and adapted through military and administrative change.','pressure → response → new balance'],['Event versus process','A raid is an event; durable rule requires institutions, revenue and local relationships.','entry ≠ stable control'],['Source perspective','Chronicles, inscriptions and monuments were produced for audiences with different purposes.','compare author + patron + silence']],
    m:['Avoid projecting modern national borders backward.','Synchronise events across regions before claiming cause.','Conflict and cultural exchange can occur in the same period.'],
    p:'A court chronicle reports a decisive victory, but grants from the “defeated” ruler continue afterward. Interpret the evidence.', s:['Recognise court praise as a perspective.','Date and locate the continuing grants.','Infer limited victory, recovery or contested authority.'], a:'The battle may have occurred, but “decisive” control is doubtful; power likely remained fluid or regional.', k:'The interpretation accounts for both sources without erasing either.',
    e:['Use precise verbs: raided, captured, ruled, allied—never substitute them.','Answer change questions with before, turning point and after.'], t:['Calling every invasion permanent rule.','Judging past actors only through present identities.'], h:'A battle is a dot; political change is the line connecting many dots.',
    q:[['Why can a victorious battle fail to create an empire?','Holding territory requires revenue, administration, communication and support.','Military success is only one component of durable authority.'],['How does chronology test a claim?','Later dated evidence can confirm, limit or contradict it.','Sequence shows whether an event produced lasting change.']]
  });

  add(S, 'India, a Home to Many', {
    i:'Indian diversity is created through long histories of movement, exchange and local belonging, held together by shared civic equality.',
    w:'This approach celebrates difference without turning communities into fixed stereotypes.',
    c:[['Plural identities','Language, region, faith, occupation and family histories overlap within each person.','person = many circles, not one label'],['Movement and exchange','Migration carries skills, food, words and practices that communities reshape locally.','movement → encounter → adaptation'],['Unity and citizenship','Constitutional equality provides common belonging without demanding cultural sameness.','diversity + dignity + equal rights']],
    m:['Diversity exists within communities as well as between them.','Culture changes through contact and choice.','Descriptions should use evidence and allow people to self-identify.'],
    p:'A class survey finds three home languages but many shared foods and festivals. What conclusion is justified?', s:['Report both difference and overlap.','Avoid claiming every student practises every tradition.','Connect shared participation to interaction, not sameness.'], a:'The class shows layered identities: linguistic diversity coexists with overlapping cultural practices and shared school belonging.', k:'The conclusion preserves individual variation and uses only surveyed evidence.',
    e:['Use examples as evidence, not as labels for whole communities.','Compare both difference and connection.'], t:['Treating one custom as universal.','Equating unity with uniformity.'], h:'Many roots, crossing branches, equal shade.',
    q:[['Can a person belong to several cultural groups?','Yes.','Identity is layered and changes with context without becoming dishonest.'],['Why are stereotypes weak explanations?','They erase variation and often rely on selective examples.','Reliable claims need representative evidence and room for individual difference.']]
  });

  add(S, 'The State, the Government, and You', {
    i:'Citizens solve public problems by matching the issue to the correct level and institution, then using evidence to demand accountable action.',
    w:'Knowing the route from problem to remedy turns civics into practical democratic agency.',
    c:[['State and government','The state is the enduring institutional order; a government is the current group exercising authority.','citizens → elected government → public institutions'],['Levels','Local, State and Union bodies have different and sometimes shared responsibilities.','problem → jurisdiction → responsible office'],['Civic action','Requests work better with facts, records, collective voice and follow-up.','observe → document → submit → track → escalate']],
    m:['Public authority is limited by law and constitutional rights.','Local bodies address many nearby civic services.','Peaceful participation includes voting, consultation, petitions and information requests.'],
    p:'A broken streetlight remains unfixed. Design a safe escalation path.', s:['Record pole/location, date and photo without exposing private data.','Report through the responsible local service and save complaint ID.','Follow up collectively; escalate to ward/grievance channel if overdue.'], a:'Use a documented, trackable local-government complaint and proportionate escalation.', k:'The action targets the likely jurisdiction and creates evidence of follow-up.',
    e:['In case studies write issue, authority, evidence, action and accountability.','Distinguish what government should do from what citizens can safely do.'], t:['Sending every complaint to the Union government.','Confusing criticism with disloyalty.'], h:'Right problem, right office, written trail.',
    q:[['Why keep a complaint number?','It proves submission and allows tracking or escalation.','Accountability needs a verifiable administrative trail.'],['Is voting the only citizen role?','No.','Citizens also deliberate, monitor, request information and participate peacefully between elections.']]
  });

  add(S, 'Infrastructure: Engine of India’s Development', {
    i:'Infrastructure creates development when reliable networks expand access fairly; a large project alone is not the outcome.',
    w:'Students can evaluate roads, energy and digital systems through benefit, access, resilience and cost.',
    c:[['Network effect','Transport, power, water and communication become more useful when dependable links connect users.','node—link—node → wider opportunity'],['Multiplier','A reliable service can reduce cost and enable education, health, production and markets.','infrastructure → time/cost change → new activity'],['Trade-offs','Projects may displace people, alter ecosystems or exclude users unless planned and governed well.','benefit − social/environmental cost']],
    m:['Physical and digital infrastructure complement human capabilities.','Access, affordability, quality and reliability are distinct measures.','Maintenance is part of infrastructure, not an afterthought.'],
    p:'A new road cuts travel time but crosses a wetland and bypasses two villages. Evaluate it.', s:['Quantify likely mobility and market benefits.','Identify ecological and distributional costs.','Compare routes and require mitigation, access links and monitoring.'], a:'Approve only the option whose net benefit is strong, wetland harm is minimised and bypassed communities gain safe access.', k:'The judgment uses multiple criteria and proposes measurable safeguards.',
    e:['Evaluate with stakeholders and short/long-term effects.','Never use project cost alone as proof of success.'], t:['Calling construction itself development.','Ignoring maintenance and last-mile access.'], h:'Build the link, measure the reach, protect what bears the cost.',
    q:[['Why is reliable electricity more useful than nominal connection?','Activities need power when required, at safe voltage and affordable cost.','Access on paper does not guarantee usable service.'],['What is last-mile connectivity?','The final link that lets homes or users reach a larger network.','A network’s benefit can fail near the endpoint.']]
  });

  add(S, 'Banks and the Magic of Finance', {
    i:'Banks connect savers and borrowers while managing trust, records and risk; finance is useful precisely because obligations are measurable.',
    w:'Financial reasoning helps students compare loans, protect credentials and distinguish return from deceptive promises.',
    c:[['Intermediation','Deposits provide funds that banks can lend under regulation and risk controls.','savers → bank → borrowers'],['Interest','Interest is the price paid or earned for using money over time.','simple interest = P × R × T / 100'],['Risk and safety','Identity checks, diversification, regulation and secure habits reduce—not erase—financial risk.','verify sender → protect secret → use official channel']],
    m:['A deposit and a loan are different contracts.','Compare total repayment, rate, duration and fees—not EMI alone.','Never share OTP, PIN, CVV or password.'],
    p:'₹5,000 is deposited at 6% simple interest for 2 years. Find interest and amount.', s:['Use I=P×R×T/100.','I=5000×6×2/100=₹600.','Amount=P+I=₹5,600.'], a:'Interest ₹600; final amount ₹5,600.', k:'Six percent of ₹5,000 is ₹300 per year; two years gives ₹600.',
    e:['Label principal, rate and time before calculating.','In fraud cases, recommend only official verified reporting channels.'], t:['Comparing loans by EMI alone.','Believing guaranteed high-return messages.'], h:'Money moves on trust; numbers and verification protect trust.',
    q:[['Why does a bank charge loan interest?','It prices time, operating cost and default risk.','The exact rate also reflects regulation and market conditions.'],['What should you do after a suspicious payment message?','Do not click; verify independently through the official app, number or branch.','Independent verification breaks the scammer’s control of the communication channel.']]
  });

  const K = 'Kaushal Bodh';
  add(K, 'Work with Life Forms — Part 1', {
    i:'Working with living things begins with observation and care: change one condition at a time and never treat life as disposable equipment.',
    w:'A safe project workflow builds ecological skill, patience and trustworthy records.',
    c:[['Need assessment','Identify organism, habitat, resources and welfare before choosing a task.','observe → need → safe plan'],['Fair test','Keep conditions alike except the factor investigated.','control | one changed variable | repeated measure'],['Care cycle','Daily observation, gentle intervention and reflection guide the next action.','check → care → record → adjust']],
    m:['Wash hands after soil or animal contact and use gloves where appropriate.','Do not taste unknown plants or handle wildlife.','Record dates, conditions and failures; they are evidence.'],
    p:'Plan a seed-germination comparison for light versus darkness.', s:['Use same seed type, count, container, moisture and temperature.','Change only light exposure; label clearly.','Count germinated seeds daily without disturbing them.'], a:'Compare germination rate across matched groups while maintaining moisture and safe hygiene.', k:'If several conditions differ, the project cannot identify light’s effect.',
    e:['Photograph from the same angle with a scale.','End reports with evidence, limitation and next test.'], t:['Changing water and light together.','Removing organisms from habitats without permission.'], h:'Observe gently, change one thing, record honestly.',
    q:[['Why use several seeds per condition?','Individual seeds vary.','Replicates make the pattern more reliable than one lucky or damaged seed.'],['What if mould appears?','Stop handling, isolate the container and ask an adult/teacher for safe disposal.','Unknown mould spores should not be touched or inhaled.']]
  });

  add(K, 'School Habitat Garden', {
    i:'A habitat garden is designed for relationships—soil, water, native plants, insects and people—not just visual decoration.',
    w:'It turns biodiversity and stewardship into a measurable, safe school improvement.',
    c:[['Site survey','Map sunlight, drainage, existing life, foot traffic and hazards before planting.','site grid: sun | shade | wet | path'],['Plant layers','Suitable native groundcovers, herbs, shrubs and small trees create food and shelter niches.','soil → ground layer → shrub layer → canopy'],['Maintenance loop','Water, mulch, observe survival and adapt using a rota.','plan → plant → monitor → maintain']],
    m:['Seek school approval and adult checks before digging.','Avoid toxic, thorny, invasive or allergy-risk plants near children.','Biodiversity count and survival rate are better outcomes than plant count alone.'],
    p:'A sunny patch becomes waterlogged after rain. Decide whether to plant immediately.', s:['Map drainage and observe how long water remains.','Choose drainage improvement, a rain-garden design or water-tolerant local species.','Get approval before earthworks and protect utilities.'], a:'Do not blindly plant; redesign for the site’s water pattern with approved, locally suitable species.', k:'The plan responds to observed habitat conditions rather than a catalogue image.',
    e:['Include a labelled plan, species reason and maintenance owner.','Use before/after biodiversity observations.'], t:['Planting invasive ornamentals.','Creating a garden with no holiday watering plan.'], h:'Survey first; plant for relationships; maintain for seasons.',
    q:[['Why prefer locally suitable native plants?','They often support local food webs and fit climate conditions.','Suitability still requires checking site, safety and availability.'],['How can success be measured?','Track survival, flowering, visitor species, soil cover and water use.','Multiple indicators capture habitat function better than appearance alone.']]
  });

  add(K, 'Work with Machines and Materials — Part 2', {
    i:'Good making is controlled iteration: understand forces and material properties, prototype safely, test, then improve.',
    w:'This turns craft into engineering reasoning and keeps tools from becoming hazards.',
    c:[['Mechanism','Machines redirect or multiply force through parts such as levers, wheels, gears and pulleys.','input force → mechanism → useful motion'],['Material choice','Strength, flexibility, hardness, weight, cost and reuse determine suitability.','need → property → candidate → test'],['Build cycle','Sketch dimensions, prototype, test against criteria and revise one weakness.','design → make → test → improve']],
    m:['Wear eye protection when cutting/drilling and use adult-supervised tools only.','Clamp work; cut away from the body; disconnect power before adjustment.','A fair test needs a stated load, measure and success criterion.'],
    p:'A cardboard bridge bends under 1 kg. Improve it without simply adding many layers.', s:['Locate where bending is greatest.','Fold flat sheet into beams or triangular trusses to increase stiffness.','Build one change and retest with gradually added, stable loads.'], a:'Use shaped structural members and bracing, then compare load-to-weight performance safely.', k:'A better design carries more load per material, not merely more load because it is heavier.',
    e:['Label force arrows and moving joints.','Record version, change, result and next decision.'], t:['Testing a heavy load over feet or fragile objects.','Changing the material and shape simultaneously.'], h:'Property chooses material; force chooses shape; test chooses revision.',
    q:[['Why does corrugation stiffen cardboard?','Folds increase structural depth and resist bending.','Geometry can improve performance without much extra material.'],['What comes before using an unfamiliar tool?','Risk check, instruction and capable adult supervision.','Tool skill begins with controlling the workpiece, body position and energy source.']]
  });

  add(K, 'AI Assistant', {
    i:'An AI assistant predicts useful outputs from patterns; it can accelerate thinking but cannot own truth, privacy or responsibility.',
    w:'Students need a repeatable verify-and-improve workflow, not blind trust or fear.',
    c:[['Prompt specification','State task, context, constraints and output format while omitting private data.','goal + context + limits + format'],['Verification','Check claims against trusted sources, calculations or direct tests.','AI claim → source/test → accept, revise or reject'],['Responsible use','Protect data, disclose meaningful assistance and keep human judgment over consequential decisions.','safe input + review + attribution']],
    m:['Generative AI can produce fluent falsehoods.','Never enter passwords, private records, faces or identifying student data without authorised safeguards.','AI output is a draft; the student remains accountable.'],
    p:'An AI says a medicinal leaf is safe to eat. What should a student do?', s:['Do not taste or act on the output.','Check an authoritative plant/health source and consult a responsible adult or qualified expert.','Report the uncertainty in the project.'], a:'Treat the claim as unverified and take no health action from AI advice.', k:'High-risk claims require stronger evidence and qualified human oversight.',
    e:['Save prompt, useful output, verification and correction.','Explain what judgment you added.'], t:['Trusting confident wording as evidence.','Uploading classmates’ data to get personalised output.'], h:'Ask clearly, verify independently, decide responsibly.',
    q:[['Why can AI invent a citation?','It generates plausible sequences rather than checking truth by default.','Open and verify every source, author, date and relevant claim.'],['What makes a good AI comparison test?','Same task and criteria, varied prompts, recorded outputs and human verification.','Controlled comparison reveals which instruction changed performance.']]
  });

  add(K, 'Work in Human Services — Part 3', {
    i:'Human service is skilled support built on listening, consent, inclusion, boundaries and dependable follow-through.',
    w:'The quality of help is measured by the person’s dignity and outcome, not the helper’s intention alone.',
    c:[['Need discovery','Ask open questions and confirm the person’s stated need before proposing help.','listen → clarify → agree'],['Accessible service','Design language, timing, space and process so different users can participate.','barrier → adaptation → access'],['Boundary and referral','Know what a student can do safely and when a trained adult or service must take over.','support within role → document → refer']],
    m:['Obtain consent before collecting stories, images or personal details.','Do not promise secrecy when someone may be unsafe; involve a trusted adult.','Use minimum necessary data and store it securely.'],
    p:'An older visitor cannot read a complex form and seems embarrassed. Offer respectful support.', s:['Ask privately whether assistance would help.','Explain each field neutrally and let the person choose the answers.','Refer uncertain legal/financial questions to authorised staff.'], a:'Provide consent-based reading/writing assistance without taking control or guessing answers.', k:'The visitor retains agency and sensitive decisions stay with appropriate people.',
    e:['Use a service blueprint: user need, step, barrier, adaptation, feedback.','Reflect on impact with anonymised evidence.'], t:['Photographing beneficiaries for proof without consent.','Giving medical, legal or financial advice beyond competence.'], h:'Listen first; serve with, not for; refer when risk rises.',
    q:[['Why is consent ongoing?','A person may change their mind as the task or information use changes.','Check again when scope, audience or risk changes.'],['What is a service boundary?','The limit of one’s training, authority and safe role.','Boundaries protect the user and helper and trigger proper referral.']]
  });

  add(K, 'Family Health Handbook', {
    i:'A useful health handbook organises verified routines and emergency contacts; it never turns a student into a diagnostician.',
    w:'Clear, private and current information helps families act safely while preserving clinical authority.',
    c:[['Information design','Separate emergency action, routine prevention, contacts and record templates.','urgent now | routine | record | contact'],['Source quality','Prefer public-health agencies and qualified professionals; record source and review date.','claim → authority → date → family confirmation'],['Privacy','Collect only agreed information and control who can see it.','minimum data → consent → secure access']],
    m:['Call local emergency services/trusted adults for severe symptoms; do not rely on the handbook alone.','Never alter medicine dose or schedule without the prescribing professional.','Use generic templates unless a responsible adult chooses to add protected details.'],
    p:'Design a page for medicine routines without giving medical advice.', s:['Fields: medicine name as prescribed, dose text copied exactly, time, prescriber/pharmacy contact and last review.','Add “do not change; ask qualified professional” and missed-dose contact instruction.','Keep the page private and adult-managed.'], a:'A read-only routine record supports adherence while all changes remain with the prescriber and responsible adult.', k:'The design records authorised instructions but creates no new treatment recommendation.',
    e:['Cite each health source and review date.','Use icons plus plain language, never colour alone for urgency.'], t:['Publishing family diagnoses in a class project.','Copying social-media remedies as fact.'], h:'Verify, simplify, protect, refer.',
    q:[['Why add a review date?','Health guidance and family details can change.','A visible date signals when rechecking is necessary.'],['What belongs on an emergency page?','Verified emergency contacts, address guidance and immediate adult-led steps.','It should speed access to trained help, not attempt diagnosis.']]
  });

  add(K, 'Planning for Kaushal Mela', {
    i:'A successful mela is a coordinated project: each exhibit has a learner, purpose, safety owner, timeline and proof that it works.',
    w:'Planning converts many creative efforts into a calm, inclusive event where visitors can understand and participate.',
    c:[['Work breakdown','Turn the event into deliverables, tasks, owners, dependencies and deadlines.','goal → deliverables → tasks → owner/date'],['Visitor journey','Design arrival, navigation, interaction, accessibility and feedback.','enter → orient → engage → reflect → exit'],['Run and recover','Rehearse, inspect risks, prepare backups and close with evidence-based review.','test → fix → run → debrief']],
    m:['Every power tool, electrical setup, food item and live organism needs specific adult-approved safety control.','Budgets distinguish must-have from optional costs.','Consent is required for identifiable photos or published work.'],
    p:'Two days before the mela, the model works but its student explainer is absent. Recover the exhibit.', s:['Identify essential outcome: safe working demonstration plus explanation.','Assign and brief a backup using a one-minute script and troubleshooting card.','Rehearse; if unsafe or unclear, switch to a recorded/non-operating display.'], a:'Use a trained backup and tested script, with a safe fallback that preserves the learning goal.', k:'The contingency protects both understanding and safety instead of merely keeping the stall open.',
    e:['Show a timeline with dependencies, not just a task list.','Collect visitor feedback tied to the exhibit’s learning goal.'], t:['Leaving safety inspection to event morning.','Assigning tasks without a named owner.'], h:'Purpose, owner, deadline, test, backup.',
    q:[['What is a dependency?','A task or condition that must be completed before another can proceed.','Marking dependencies exposes schedule risk early.'],['How should a team judge mela success?','Use learning, safety, inclusion, reliability and visitor evidence.','Crowd size alone does not show whether the exhibit taught anything.']]
  });
})();
