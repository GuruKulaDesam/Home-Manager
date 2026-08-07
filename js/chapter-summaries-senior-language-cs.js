(function () {
  'use strict';

  const HM = window.HM = window.HM || {};
  const root = HM.chapterSummaries = HM.chapterSummaries || {};
  const key = (subject, title) => `${subject}|${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const add = (subject, title, id, bigIdea, story, essentialResults, problemFlow, examTraps, rapidRecall) => {
    const value = { title, subject, bigIdea, story, essentialResults, problemFlow, examTraps, rapidRecall };
    root[id] = value;
    root[`${subject}::${title}`] = value;
    root[key(subject, title)] = value;
  };

  const english = (title, id, bigIdea, story, essentialResults, problemFlow, examTraps, rapidRecall) =>
    add('English Core', title, id, bigIdea, story, essentialResults, problemFlow, examTraps, rapidRecall);
  const cs = (title, id, bigIdea, story, essentialResults, problemFlow, examTraps, rapidRecall) =>
    add('Computer Science', title, id, bigIdea, story, essentialResults, problemFlow, examTraps, rapidRecall);

  english('The Last Lesson', 'book-g12-english-1-1',
    'Language is not merely a school subject; it carries identity, dignity and the power to resist domination.',
    'On the day Prussia orders French out of Alsace schools, Franz expects an ordinary scolding but finds M. Hamel dressed formally and the villagers seated behind him. The final lesson transforms neglected grammar into a farewell to cultural freedom. Franz suddenly values what is being taken away, while M. Hamel turns private regret into collective defiance with his last words on the board.',
    ['The order from Berlin is the external conflict; Franz’s awakening is the inner movement of the story.', 'M. Hamel criticises pupils, parents and himself: cultural loss follows shared neglect, not one person’s failure.', 'The villagers attend to honour the teacher and confess that they too postponed learning.', 'The classroom, formal clothes and unusual silence create the atmosphere of a ceremony and funeral.', 'The ending makes language a homeland that political occupation cannot completely seize.'],
    ['State the change forced by the order.', 'Track Franz before, during and after the lesson.', 'Use M. Hamel and the villagers to widen the event from personal regret to collective loss.', 'Interpret the final gesture as resistance, then connect it to language and identity.'],
    ['Retelling the day without explaining Franz’s transformation.', 'Calling M. Hamel only strict and ignoring his self-criticism.', 'Claiming language alone literally frees a country; it preserves unity and resistance.', 'Missing the irony that value becomes visible when possession is threatened.'],
    ['Order: French replaced by German.', 'Franz: avoidance → attention → regret.', 'M. Hamel: teacher → witness → patriot.', 'Last board message: cultural defiance.']);

  english('Lost Spring', 'book-g12-english-1-2',
    'Child labour is not an isolated bad choice; poverty, caste, debt and indifference lock children into inherited work.',
    'Anees Jung pairs Saheb, a barefoot ragpicker in Seemapuri, with Mukesh, a bangle-maker’s son in Firozabad. Saheb’s apparent freedom ends in a tea-stall job that costs him autonomy; Mukesh’s wish to become a motor mechanic is modest yet revolutionary because it challenges a hereditary occupation. The two portraits expose how society steals childhood while pretending the system is natural.',
    ['The title is ironic: the season of hope is lost to survival work.', 'Garbage is survival and possibility for adults but a mysterious treasure for children.', 'Saheb gains wages and meals but loses the carefree ownership represented by his plastic bag.', 'Firozabad’s cycle is maintained by poverty, caste, middlemen, police, bureaucracy and absence of leadership.', 'Mukesh matters because he can imagine a life outside the accepted circle.'],
    ['Identify the child’s dream.', 'Name the economic and social forces blocking it.', 'Use one revealing image or contrast.', 'Judge whether the ending offers freedom, compromise or only a fragile beginning.'],
    ['Treating poverty as laziness or parental choice.', 'Saying Saheb’s job is uncomplicated progress.', 'Confusing Saheb’s and Mukesh’s settings or ambitions.', 'Writing sympathy without analysing the structure that reproduces exploitation.'],
    ['Saheb: Seemapuri, ragpicking, tennis shoes, tea stall.', 'Mukesh: Firozabad, bangles, mechanic, breaking caste work.', 'Bag = autonomy; canister = burden.', 'Dream versus system is the chapter’s central tension.']);

  english('Deep Water', 'book-g12-english-1-3',
    'Courage is not the absence of fear; it is the disciplined rebuilding of control after fear has invaded body and imagination.',
    'A childhood wave at the beach prepares Douglas’s anxiety, but the decisive trauma occurs when a larger boy throws him into the YMCA pool. His careful plan to surface collapses, leaving a terror that restricts fishing, canoeing and swimming. An instructor rebuilds each skill separately; Douglas then tests himself alone until the remaining doubt loses authority.',
    ['The pool episode is narrated through physical sensations and broken thoughts to reproduce panic.', 'Fear survives the event by generalising into avoidance of water and lost opportunities.', 'Training decomposes swimming into breathing, kicking and coordinated strokes.', 'The final lake tests matter because independent action converts borrowed confidence into self-belief.', 'Roosevelt’s idea supports the conclusion: fear of death can be more imprisoning than death itself.'],
    ['Separate the original accident from its long psychological consequence.', 'Explain the instructor’s stepwise method.', 'Show why later self-tests are necessary.', 'Conclude with what Douglas learns about mastery of fear.'],
    ['Saying one act of will instantly cures trauma.', 'Ignoring the earlier beach memory.', 'Listing training exercises without explaining gradual exposure.', 'Equating courage with recklessness.'],
    ['Trauma → avoidance → guided practice → independent testing.', 'YMCA pool creates the dominant fear.', 'Skills are mastered one component at a time.', 'Victory means fear no longer controls choice.']);

  english('The Rattrap', 'book-g12-english-1-4',
    'A person trapped by temptation can still change when someone offers dignity without first demanding proof of worthiness.',
    'A lonely peddler imagines the world as a rattrap baited by riches. After stealing the crofter’s money, he is literally lost in the forest and metaphorically caught by his own theory. Mistaken for Captain von Stahle, he accepts the ironmaster’s invitation; Edla’s unwavering courtesy, even after the truth is known, allows him to act like the better self she recognised.',
    ['The rattrap is both a comic product and the governing metaphor for temptation and entrapment.', 'The crofter’s trust makes the theft a moral betrayal, not mere survival.', 'The ironmaster’s welcome depends on mistaken status; Edla’s respect survives correction.', 'Christmas provides a setting of hospitality, renewal and moral rebirth.', 'The returned money and signed letter show transformation through accountable action.'],
    ['Explain the metaphor before applying it to the peddler.', 'Contrast the crofter, ironmaster and Edla as different forms of human contact.', 'Locate the turning point after Edla learns the truth.', 'Use the final signature to prove restored self-respect.'],
    ['Calling Edla naive rather than morally perceptive.', 'Claiming fear of police alone causes the return.', 'Ignoring the peddler’s responsibility for theft.', 'Reducing the metaphor to only money.'],
    ['Bait → theft → forest trap.', 'Ironmaster sees rank; Edla sees a person.', 'Respect awakens responsibility.', 'Captain von Stahle signature = reclaimed identity.']);

  english('Indigo', 'book-g12-english-1-5',
    'Effective resistance begins by removing fear, gathering facts and enabling people to stand upright without permanent dependence on a hero.',
    'Rajkumar Shukla’s persistence brings Gandhi to Champaran, where British planters compel peasants to grow indigo under the tinkathia system. Gandhi refuses an official order to leave, investigates testimony and negotiates a partial refund. The money matters less than the planters’ loss of prestige; social work in sanitation, health and education then turns a legal victory into self-reliance.',
    ['Shukla appears unsophisticated yet drives the entire action through determination.', 'Civil disobedience is deliberate, respectful and accompanied by willingness to accept punishment.', 'Thousands of depositions convert suffering into verifiable public evidence.', 'The 25-percent refund is symbolically decisive because landlords surrender authority and peasants shed fear.', 'Gandhi rejects dependence on an English supporter: freedom requires inner capacity.'],
    ['Begin with the injustice and Shukla’s role.', 'Trace inquiry, court action and negotiation.', 'Explain why a small refund creates a large moral victory.', 'End with constructive work and self-reliance.'],
    ['Calling the outcome a complete financial victory.', 'Writing Gandhi as a lone saviour and erasing peasants or volunteers.', 'Treating law-breaking as impulsive.', 'Omitting education, sanitation and health from the solution.'],
    ['Tinkathia = forced indigo on 3/20 land.', 'Disobey openly; accept consequence.', 'Facts defeat fear.', 'Refund small, psychological victory large.']);

  english('Poets and Pancakes', 'book-g12-english-1-6',
    'Behind cinema’s glamour lies an absurd workplace of hierarchy, frustrated creativity and cultural misunderstanding.',
    'Asokamitran recalls Gemini Studios through pancake make-up, the office boy’s resentment, Subbu’s practical generosity, the legal adviser and the Moral Re-Armament visit. Stephen Spender’s baffling speech becomes intelligible only years later when the narrator discovers his anti-communist connection. The memoir uses dry humour to reveal how institutions misread both people and ideas.',
    ['The pancake department punctures the illusion of screen beauty by showing its artificial manufacture.', 'The office boy blames others for disappointed ambition; Subbu succeeds through loyalty, empathy and usefulness.', 'The legal adviser’s label is ironic because his action ends an actress’s career.', 'Gemini’s anti-communism is emotional and poorly understood rather than intellectually argued.', 'Spender’s visit illustrates failed communication across culture, accent and context.'],
    ['Identify the apparently comic incident.', 'Find the hierarchy or misconception underneath it.', 'Explain the narrator’s ironic distance.', 'Connect the episode to the larger portrait of studio culture.'],
    ['Treating the chapter as disconnected anecdotes.', 'Confusing Stephen Spender with the MRA troupe.', 'Taking job titles such as legal adviser literally rather than ironically.', 'Describing Subbu only as a flatterer.'],
    ['Pancake = artificial glamour.', 'Office boy = frustrated ambition.', 'Subbu = creative, loyal problem-solver.', 'Spender episode = context failure and delayed understanding.']);

  english('The Interview', 'book-g12-english-1-7',
    'An interview can illuminate a mind or invade a life; its value depends on purpose, preparation and the quality of attention.',
    'Christopher Silvester surveys the interview’s power and the objections of writers who find it demeaning. Mukund Padmanabhan’s conversation with Umberto Eco then demonstrates the form at its best: precise questions reveal Eco’s use of empty spaces, his semiotic scholarship and the unexpected success of The Name of the Rose.',
    ['The first part is a debate, not a verdict: interviews create vivid records but can reduce people to public objects.', 'Celebrity culture gives the interviewer unusual power over reputation and privacy.', 'Eco calls small intervals in life “empty spaces” and uses them productively.', 'His academic and fictional work share an underlying interest in signs and interpretation.', 'He refuses a single formula for a novel’s success, protecting the role of mystery and readers.'],
    ['For an opinion question, present the benefit and the ethical cost.', 'Use writers’ objections as evidence, not as the whole answer.', 'Use the Eco interview as a counterexample of informed dialogue.', 'Conclude with conditions for a worthwhile interview.'],
    ['Declaring all interviews good or bad.', 'Mixing the essayist’s views with Eco’s answers.', 'Calling “empty spaces” idleness.', 'Inventing a definite reason for the novel’s popularity.'],
    ['Interview = record plus intrusion risk.', 'Eco uses interstices productively.', 'Semiotics connects his varied writing.', 'Good questions reveal thought, not gossip.']);

  english('Going Places', 'book-g12-english-1-8',
    'Fantasy can protect a young person from limitation, but when desire is treated as fact it deepens isolation and disappointment.',
    'Sophie dreams of a boutique, acting and fashion despite her working-class reality. She invents an encounter with football star Danny Casey, expands it for Jansie and waits for a meeting that cannot occur. Her quiet brother Geoff becomes the imagined bridge to a wider world; the ending returns her to the beautiful story even after reality has contradicted it.',
    ['Sophie’s ambitions reveal both healthy longing and refusal to examine practical constraints.', 'Jansie is grounded in economic reality and understands that secrets circulate.', 'Geoff’s silence lets Sophie project unknown places and possibilities onto him.', 'The Casey fantasy grows through repeated narration until emotionally real to Sophie.', 'The empty wait produces pain, yet she retreats into fantasy instead of revising the belief.'],
    ['Separate what actually happens from what Sophie reports or imagines.', 'Connect each character to a different response to limitation.', 'Use the arcade waiting scene as the test of fantasy.', 'Give a balanced judgement: aspiration becomes harmful when evidence is refused.'],
    ['Mocking Sophie merely as a liar.', 'Assuming the Casey meeting certainly happened.', 'Ignoring class and limited opportunity.', 'Treating Geoff’s silence as proof that he believes her.'],
    ['Sophie = imaginative escape.', 'Jansie = practical reality.', 'Geoff = doorway to the unknown.', 'Dream without evidence → expectation → disappointment.']);

  english('My Mother at Sixty-six', 'book-g12-english-1-9',
    'A routine parting opens the adult child’s oldest fear: the parent who once seemed permanent is mortal and must eventually be lost.',
    'Driving from her parents’ home to the airport, the speaker notices her mother dozing, pale and open-mouthed. She looks outward at sprinting trees and cheerful children to escape the thought, but the airport distance returns the mother as a wan winter moon. The repeated smile controls grief without resolving it.',
    ['The mother’s stillness contrasts with young trees and children, sharpening age versus vitality.', 'The “late winter’s moon” suggests pallor, decline and distance.', 'The fear is familiar from childhood, showing that adult composure does not erase attachment anxiety.', 'The poem moves from observation to avoidance to recognition.', 'Repetition of “smile” performs reassurance while revealing suppressed pain.'],
    ['Follow the camera: mother, outside world, mother again.', 'Name the central contrast.', 'Explain how the final image changes the mood.', 'Interpret the repeated smile as both love and emotional control.'],
    ['Listing poetic devices without their effects.', 'Calling the moving trees literally fast.', 'Reading the ending as cheerful certainty.', 'Overstating that the mother is dying at that moment.'],
    ['Still mother versus running life.', 'Winter moon = ageing and pallor.', 'Old fear = separation.', 'Smile hides and communicates pain.']);

  english('Keeping Quiet', 'book-g12-english-1-10',
    'A brief, shared pause can interrupt violence and compulsive activity long enough for humanity to recognise its unity and choose differently.',
    'Neruda invites everyone to count to twelve and become still. This is not permanent silence, death or inactivity: fishermen, salt gatherers and war-makers would pause harmful patterns and notice themselves and others. The earth’s apparent stillness, which contains renewal, proves that quiet can be alive and transformative.',
    ['Counting to twelve creates a universal, accessible ritual beyond language.', 'The pause suspends harmful action; it does not demand abandonment of useful work.', 'Images of fishermen and the salt gatherer connect ecological and human injury.', 'War’s victors and victims share the same death, exposing the emptiness of victory.', 'Earth teaches that apparent inactivity may contain regeneration.'],
    ['Define what the poet asks for.', 'Clarify what he explicitly rejects.', 'Use two examples of interrupted harm.', 'Explain the Earth analogy and return to renewal.'],
    ['Equating quietness with death or laziness.', 'Claiming the poet wants work to stop forever.', 'Ignoring the political and ecological dimensions.', 'Using “peace” without explaining the mechanism of self-examination.'],
    ['Twelve = shared pause.', 'No speech, rush or harm for one moment.', 'Not death; not permanent inactivity.', 'Stillness → reflection → renewed action.']);

  english('A Thing of Beauty', 'book-g12-english-1-11',
    'Beauty does not erase suffering; it repeatedly restores the emotional strength required to live through it.',
    'Keats begins with the claim that beauty is an enduring joy, then imagines it as a shelter binding people to the earth. Despite disappointment, scarcity of nobility and darkened paths, natural and artistic beauty lifts the pall. The final immortal fountain gathers the catalogue into an image of inexhaustible sustenance.',
    ['Beauty increases because memory and renewed interpretation extend the original experience.', 'The “flowery band” represents attachments that keep humanity connected to life.', 'Gloom is acknowledged before beauty acts against it, making the hope earned rather than shallow.', 'The catalogue of sun, moon, trees and heroic stories creates abundance.', 'The immortal drink turns separate examples into one continuous, transcendent source.'],
    ['State the central claim.', 'Acknowledge the causes of despair.', 'Show beauty operating as a counterforce.', 'Use the final image to explain continuity and abundance.'],
    ['Writing only a list of beautiful objects.', 'Saying beauty removes every real problem.', 'Explaining images by dictionary meaning alone.', 'Ignoring the contrast that gives the poem its argument.'],
    ['Beauty lasts through memory.', 'Band = bond with earthly life.', 'Pall = despair lifted, not denied.', 'Fountain = endless spiritual nourishment.']);

  english('A Roadside Stand', 'book-g12-english-1-12',
    'Rural people ask for a fair share of prosperity, but privileged travellers and paternalistic schemes see them as scenery, nuisance or objects to manage.',
    'A small stand waits for passing cars to stop and spend. Motorists complain about spoiled scenery or ask selfish directions, while official promises threaten to relocate villagers into controlled dependence. The speaker’s anger and compassion culminate in an uneasy wish to end their pain instantly, followed by recognition of the violence hidden in that impulse.',
    ['The stand represents an attempt at economic participation, not charity.', 'Passing cars embody prosperity that is visible but inaccessible.', 'Urban complaints reveal an aesthetic gaze that ignores livelihood.', 'So-called benefactors may remove agency while presenting control as relief.', 'The ending exposes the speaker’s helplessness and checks simplistic rescue fantasies.'],
    ['Identify what the villagers hope to receive.', 'Contrast that need with motorists’ responses.', 'Analyse the irony of official “help”.', 'Track the speaker’s tonal shift from satire to pity to self-correction.'],
    ['Portraying villagers as passive or greedy.', 'Treating every development plan as genuine liberation.', 'Ignoring the speaker’s conflicted final thought.', 'Listing rural images without discussing unequal power.'],
    ['Stand = fair exchange sought.', 'Cars = wealth passing by.', 'Promises may conceal control.', 'Ending: compassion without an easy solution.']);

  english('Aunt Jennifer’s Tigers', 'book-g12-english-1-13',
    'Art gives fearless movement to the freedom Aunt Jennifer cannot inhabit under the weight of an unequal marriage.',
    'Aunt Jennifer embroiders bright tigers that pace proudly and fear no men. Her own fingers flutter and struggle beneath the symbolic weight of the wedding band. Even after death her hands will bear the marks of ordeal, yet the tigers will continue to prance, preserving an image of resistance beyond their maker.',
    ['Tigers embody confidence, movement and agency; the aunt embodies constraint.', 'The heavy wedding band converts a small object into the burden of patriarchal marriage.', 'Hands join creativity and suffering: they make freedom while remaining burdened.', 'The tigers’ masculine confidence reverses the aunt’s social powerlessness.', 'Art survives, but its survival does not retroactively free the artist.'],
    ['Build the answer around contrast.', 'Interpret the ring and hands as connected symbols.', 'Explain why the artwork endures.', 'Qualify the ending as resistance without complete personal victory.'],
    ['Saying the tigers literally rescue Aunt Jennifer.', 'Treating the poem as an attack on all companionship rather than unequal power.', 'Calling the ending wholly triumphant.', 'Naming imagery without linking it to agency.'],
    ['Tigers: fearless, fluid, free.', 'Aunt: burdened, trembling, constrained.', 'Ring = patriarchal weight.', 'Art endures; suffering remains marked.']);

  english('The Third Level', 'book-g12-english-2-1',
    'The impossible platform materialises a modern person’s longing for a safer past while refusing to tell us whether escape is psychological or supernatural.',
    'Charley claims Grand Central has a third level leading to 1894 Galesburg. His psychiatrist friend Sam calls it a waking-dream wish fulfilment, yet Charley searches for old currency and later discovers a letter apparently mailed by Sam from the past. Precise details support both explanations, so ambiguity becomes the point rather than a puzzle with one answer.',
    ['Modern insecurity makes an idealised past attractive.', 'Clothing, currency, lighting and newspaper details make the fantastic scene materially credible.', 'The stamp collection links everyday nostalgia with the alleged time passage.', 'Sam first supplies the rational explanation, then his letter destabilises it.', 'Galesburg is an imagined refuge, not proof that the historical past was perfect.'],
    ['Present the psychological interpretation.', 'Present the textual evidence for a literal third level.', 'Explain how Sam’s letter complicates certainty.', 'Conclude with what both readings reveal about escapism.'],
    ['Declaring it only a hallucination or only time travel.', 'Treating nostalgia as accurate history.', 'Omitting Sam’s changed role.', 'Retelling the station without connecting it to anxiety.'],
    ['Grand Central has two official levels.', 'Third level = 1894 refuge.', 'Sam: sceptic → possible escapee.', 'Ambiguity reveals the need to escape.']);

  english('The Tiger King', 'book-g12-english-2-2',
    'The prophecy gains power through the king’s arrogant attempt to defeat it; fear armed with authority becomes violence, absurdity and self-destruction.',
    'Told he will die because of a tiger, the king kills ninety-nine, manipulates marriage and administration, and believes the hundredth hunt has secured victory. The animal is not actually killed by his shot, while a splinter from a wooden tiger causes infection and death. The miniature toy completes the prophecy through comic, exact irony.',
    ['The astrologers’ warning matters less than the king’s obsessive response.', 'Private fear commandeers public power, forests, officials and marriage.', 'The narrator’s exaggeration and formal mockery expose arbitrary rule.', 'Dramatic irony separates what the king believes from what readers know about the hundredth tiger.', 'The wooden tiger reverses scale: a trivial imitation defeats the great hunter.'],
    ['Name the character flaw activated by prophecy.', 'Show how power magnifies that flaw into public harm.', 'Track the false victory over tiger one hundred.', 'Explain how the toy fulfils both plot logic and satire.'],
    ['Saying fate alone causes every event.', 'Treating the hunts as genuine bravery.', 'Missing the dewan’s deception and the tiger’s actual death.', 'Ignoring the political target of the humour.'],
    ['Prophecy → obsession → misuse of power.', 'Hundredth tiger survives the shot.', 'Hunters conceal the failure.', 'Toy splinter completes the irony.']);

  english('Journey to the End of the Earth', 'book-g12-english-2-3',
    'Antarctica makes Earth’s deep history and connected climate systems visible, turning environmental concern into evidence-based responsibility.',
    'Tishani Doshi travels with Students on Ice to the continent that once formed the centre of Gondwana. Its ice and sparse human presence allow visitors to read planetary history, while its sensitive ecosystem reveals present danger. Phytoplankton connect microscopic life to carbon regulation, demonstrating that no component of climate can be dismissed as small.',
    ['Gondwana explains how present continents, climates and species emerge from deep geological change.', 'Antarctic ice preserves records of past atmosphere and climate.', 'Polar change has global consequences through ocean and atmospheric systems.', 'Phytoplankton photosynthesis participates in food webs and carbon cycling.', 'Students on Ice trusts direct experience to shape future decision-makers.'],
    ['Move from deep past to present evidence.', 'Choose one system connection and trace cause to consequence.', 'Explain why Antarctica is a uniquely legible archive.', 'Connect experiential learning to responsible future action.'],
    ['Writing a travel diary instead of environmental analysis.', 'Calling Antarctica absolutely untouched.', 'Mentioning phytoplankton without the carbon link.', 'Ending with a vague “save nature” slogan.'],
    ['Gondwana = connected past.', 'Ice = climate archive.', 'Phytoplankton = small organism, planetary role.', 'See systems → understand stakes → act.']);

  english('The Enemy', 'book-g12-english-2-4',
    'War labels a man an enemy, but medical duty and direct human contact force Sadao and Hana to confront the person beneath the uniform.',
    'Japanese surgeon Sadao finds a wounded American prisoner during wartime. He and Hana treat him despite danger, servants’ hostility and national law. The General promises a secret killing but forgets because he values Sadao’s medical skill; Sadao finally equips the prisoner to escape, mixing compassion, professional ethics and self-preservation.',
    ['Sadao holds conflicting roles: surgeon, citizen, husband and subject of the state.', 'Hana’s physical labour and moral courage are indispensable to the rescue.', 'Treatment changes an abstract enemy into a vulnerable patient.', 'The servants voice social and nationalist pressure rather than simple villainy.', 'The General’s selfish dependence exposes the moral emptiness of authoritarian power.'],
    ['List the duties in conflict.', 'Track each decision and its risk.', 'Include Hana and the General as moral contrasts.', 'Judge Sadao with qualification: courageous, compassionate and also concerned for safety.'],
    ['Calling Sadao simply disloyal or perfectly heroic.', 'Ignoring Hana’s contribution.', 'Saying the General forgets from mercy.', 'Equating moral complexity with hypocrisy.'],
    ['Enemy soldier becomes patient.', 'Sadao operates; Hana assists.', 'General promises murder but forgets.', 'Escape preserves life and removes danger.']);

  english('On the Face of It', 'book-g12-english-2-5',
    'The deepest barrier is not bodily difference itself but an identity narrowed by other people’s gaze and then internalised by the person judged.',
    'Derry enters Mr Lamb’s open garden expecting pity or disgust because one side of his face is scarred. Mr Lamb neither denies the scar nor lets it define the boy; through conversation, bees, weeds and the open gate, he offers a larger way of attending to life. Derry returns against his mother’s wishes, but Mr Lamb’s fatal fall makes the new agency painfully fragile.',
    ['Derry anticipates rejection and withdraws, allowing stigma to reproduce isolation.', 'Mr Lamb acknowledges difference while challenging the conclusion that difference determines worth.', 'The open garden symbolises participation, variety and receptiveness.', 'Derry’s return is his own decision, not a miraculous cure delivered by Mr Lamb.', 'The tragic ending does not erase change; it tests whether the conversation can survive its speaker.'],
    ['Describe Derry’s starting belief.', 'Select one claim and counterclaim from the dialogue.', 'Connect the garden imagery to inclusion.', 'Explain why returning marks agency despite the ending.'],
    ['Using pity-based language.', 'Presenting Mr Lamb as a magical or flawless cure.', 'Claiming appearance has no social effects.', 'Saying the death makes Derry’s change meaningless.'],
    ['Scar is a fact, not a whole identity.', 'Closed self versus open garden.', 'Mr Lamb listens without pity.', 'Return = Derry choosing connection.']);

  english('Memories of Childhood', 'book-g12-english-2-6',
    'Two childhood memories reveal how discrimination hides inside ordinary routines and how understanding the system can turn humiliation into resistance.',
    'Zitkala-Sa resists the forced cutting of her hair at a boarding school designed to erase Indigenous identity. Bama watches a Dalit elder carry food by its string to avoid “polluting” an upper-caste man; her brother explains caste power and urges educational achievement. The accounts share an awakening to injustice but show different institutions and strategies.',
    ['Zitkala-Sa’s hair has cultural meaning, so cutting it enacts forced assimilation.', 'Her hiding and physical resistance preserve agency even when the institution overpowers her.', 'Bama’s laughter changes to anger when the apparently comic action is explained.', 'Caste makes humiliation look routine and demands bodily performances of inferiority.', 'Education oppresses when imposed to erase identity, but can empower when used to challenge exclusion.'],
    ['Treat each memoir separately: event, system, recognition, response.', 'Name forced assimilation and caste discrimination accurately.', 'Compare the common movement from innocence to political awareness.', 'Contrast resistance through identity defence and educational advancement.'],
    ['Blending the narrators into one story.', 'Claiming the two systems are identical.', 'Reducing resistance to confidence alone.', 'Missing the double role education plays.'],
    ['Zitkala-Sa: hair, cultural erasure, direct resistance.', 'Bama: food packet, caste humiliation, education.', 'Ordinary act exposes structure.', 'Awareness converts pain into agency.']);

  cs('Exception Handling in Python', 'book-g12-cs-1',
    'Exceptions are alternate control paths: anticipate recoverable failure, handle it at the narrowest useful boundary and always protect cleanup.',
    'Python normally executes a try suite until one statement raises an exception. It skips the rest of that suite, searches except clauses for the first compatible type, optionally runs else after complete success, and runs finally before control leaves. Good handling distinguishes bad input or unavailable resources from bugs that should remain visible.',
    ['Common built-ins include ValueError, TypeError, IndexError, KeyError, ZeroDivisionError and FileNotFoundError.', 'Specific except clauses must precede broad handlers because the first compatible clause wins.', 'else executes only if the try suite raises no exception; finally executes after success or handled/unhandled failure.', 'raise creates or re-raises an exception when a rule is violated.', 'A small try block prevents unrelated defects from being mistaken for expected input failure.'],
    ['Locate the exact expression that can fail.', 'Predict its exception class.', 'Catch only failures the program can meaningfully recover from.', 'Put normal post-success work in else and unconditional cleanup in finally.', 'Trace output in execution order, remembering the failed try remainder is skipped.'],
    ['Assuming execution resumes after the failing statement.', 'Writing bare except and concealing programming errors.', 'Putting Exception before its subclasses.', 'Using exception handling instead of ordinary validation for every condition.'],
    ['try = risky operation.', 'except = typed recovery.', 'else = success-only work.', 'finally = unconditional cleanup.', 'raise = signal a violated rule.']);

  cs('File Handling in Python', 'book-g12-cs-2',
    'A file turns temporary program state into persistent data; correct programs control mode, cursor position, representation and closure.',
    'Opening a file creates a stream between Python and storage. Text files encode characters and use strings; binary files preserve bytes and commonly store pickled objects. Sequential operations advance a file pointer, while seek and tell allow controlled navigation. The with statement guarantees closure even when processing fails.',
    ['Modes: r reads, w truncates then writes, a writes at end, x creates; + adds updating and b selects binary.', 'read(), readline() and readlines() return different shapes; write() does not add a newline automatically.', 'tell() reports the current position and seek() repositions the stream.', 'pickle.dump/load serialise Python objects in binary mode; do not unpickle untrusted data.', 'Record updates usually require a temporary file or load-modify-rewrite strategy because variable-length text is not safely edited in place.'],
    ['State file type and choose a compatible mode.', 'Open with a with block.', 'Read one record at a time when data may be large.', 'Parse, validate and transform the record.', 'Verify pointer position, output separators and final persistence.'],
    ['Opening with w when existing content must survive.', 'Mixing bytes and strings or using pickle in text mode.', 'Looping on end-of-file incorrectly instead of testing returned data.', 'Forgetting that reading advances the pointer.', 'Loading untrusted pickle data.'],
    ['Text → strings; binary → bytes.', 'r read, w replace, a append.', 'tell = where; seek = move.', 'with closes reliably.', 'Update records deliberately, often via rewrite.']);

  cs('Stack', 'book-g12-cs-3',
    'A stack restricts access to one end, making the most recently added item the first one removed: LIFO.',
    'Python lists implement a stack naturally: append performs PUSH and pop removes the top. A top check prevents underflow, while peek reads without removing. The abstraction matters more than the container because undo, expression evaluation, recursion and backtracking all depend on reversing the order of arrival.',
    ['PUSH inserts at top; POP removes and returns top; PEEK observes top; empty tests availability.', 'With a list, top is usually index -1 and both append/pop-at-end are amortised O(1).', 'Underflow means POP or PEEK on an empty stack; fixed-size implementations may also have overflow.', 'After n pushes and m valid pops, size is n - m.', 'Applications include call stacks, bracket matching, reversal, undo and postfix evaluation.'],
    ['Write the stack with its top consistently on one side.', 'Apply operations one at a time.', 'Check empty before every removal.', 'Record the returned item separately from the remaining stack.', 'For expression tasks, state precisely what each pushed value represents.'],
    ['Removing from index 0 and accidentally implementing a queue.', 'Showing the popped item still inside the stack.', 'Calling an empty pop overflow instead of underflow.', 'Using FIFO language in an explanation.'],
    ['LIFO: last in, first out.', 'append = PUSH; pop() = POP.', 'Top is list[-1].', 'Empty removal = underflow.', 'Undo and recursion need reversed order.']);

  cs('Queue', 'book-g12-cs-4',
    'A queue preserves arrival order: insertion occurs at the rear and deletion at the front, producing FIFO behaviour.',
    'A queue models waiting lines, print jobs and scheduling. A list can demonstrate insertion with append and deletion from index 0, although deque is more efficient for large real programs. The essential reasoning is to keep front and rear distinct and update both correctly when the structure becomes empty.',
    ['ENQUEUE adds at rear; DEQUEUE removes from front; FRONT/PEEK observes the next item.', 'FIFO means the earliest unremoved arrival leaves next.', 'Deleting list[0] is O(n) because later elements shift; collections.deque.popleft() is O(1).', 'Underflow occurs when deleting or peeking an empty queue.', 'Circular queues reuse freed array positions by advancing indices modulo capacity.'],
    ['Mark front and rear before tracing.', 'Append each arriving item at rear.', 'On deletion, remove only the current front.', 'After every operation, write the new order.', 'Check empty state and, for circular queues, apply modulo arithmetic.'],
    ['Popping from the rear and creating stack behaviour.', 'Reversing front and rear in diagrams.', 'Ignoring element shifts and complexity in a list.', 'Declaring overflow in a dynamic Python list without a fixed capacity.'],
    ['FIFO: first in, first out.', 'Rear receives; front releases.', 'append + pop(0) demonstrates a queue.', 'deque is the efficient implementation.', 'Empty deletion = underflow.']);

  cs('Sorting', 'book-g12-cs-5',
    'Sorting imposes an order that makes later searching, comparison and reporting easier; algorithms differ in how they move disorder out of the sequence.',
    'Bubble sort repeatedly swaps adjacent inversions so an extreme value settles at an end each pass. Selection sort finds the correct extreme for the next position and performs one placement. Insertion sort grows a sorted prefix by shifting larger values and inserting the next key. Tracing passes matters more than memorising code.',
    ['Bubble sort can stop early if a pass makes no swaps.', 'Selection sort performs about n squared comparisons but few swaps.', 'Insertion sort is efficient on nearly sorted data and is stable when equal keys are not crossed.', 'The elementary algorithms have O(n^2) worst-case time; auxiliary space is O(1) for in-place forms.', 'Ascending versus descending order changes the comparison, not the algorithmic structure.'],
    ['Identify the algorithm from its invariant: settled suffix, selected position or sorted prefix.', 'Write the list after every complete pass.', 'Count comparisons and swaps separately.', 'Check that the sorted region grows exactly as promised.', 'Verify duplicates are neither lost nor duplicated.'],
    ['Reporting intermediate swaps when the question asks for passes.', 'Changing comparison direction inconsistently.', 'Calling every in-place method stable.', 'Forgetting the shrinking unsorted range.', 'Assuming O(n^2) means exactly n squared operations.'],
    ['Bubble: swap neighbours; end settles.', 'Selection: choose extreme; position settles.', 'Insertion: shift and insert; prefix settles.', 'Trace complete passes.', 'All three are quadratic in the worst case.']);

  cs('Searching', 'book-g12-cs-6',
    'Searching succeeds by controlling where the target could still be: linear search discards one position at a time, binary search discards half a sorted range.',
    'Linear search compares from one end and works with any sequence. Binary search requires sorted data, compares with the middle element and updates low or high while preserving the invariant that any possible target lies inside the current interval. Most errors come from boundary updates, not from the central idea.',
    ['Linear search worst case is O(n) and may stop immediately on the first match.', 'Binary search worst case is O(log n), but only when the data is ordered under the same comparison rule.', 'mid = (low + high) // 2; after a failed comparison exclude mid using low = mid + 1 or high = mid - 1.', 'The loop continues while low <= high for an inclusive interval.', 'Duplicate values require a stated policy if the first or last occurrence is required.'],
    ['Check whether the sequence is sorted.', 'Set and state the candidate interval.', 'Compare the target with the middle.', 'Discard the impossible half without retaining mid.', 'Stop on equality or when the interval becomes empty.'],
    ['Using binary search on unsorted values.', 'Updating low = mid or high = mid and creating an infinite loop.', 'Using < instead of <= and missing the last candidate.', 'Claiming binary search is always faster after including the cost of sorting one tiny list.'],
    ['Linear: any order, one by one, O(n).', 'Binary: sorted, halve range, O(log n).', 'Inclusive interval uses low <= high.', 'Exclude mid after failure.', 'Define duplicate policy.']);

  cs('Understanding Data', 'book-g12-cs-7',
    'Data becomes useful only after context gives it meaning and disciplined processing turns observations into trustworthy information.',
    'The chapter moves from raw values to information, then examines collection, classification, storage, cleaning, visualisation and interpretation. Structured tables are easy to query, while semi-structured and unstructured sources need additional organisation. Quality and ethics matter because a polished chart cannot repair biased, incomplete or misused data.',
    ['Qualitative data describes categories; quantitative data measures numbers and may be discrete or continuous.', 'Primary data is collected for the current purpose; secondary data was collected earlier for another context.', 'Rows commonly represent records/observations and columns represent fields/variables.', 'Cleaning handles missing values, duplicates, inconsistent units, invalid ranges and type errors.', 'Accuracy, completeness, consistency, timeliness and relevance are distinct quality dimensions.'],
    ['Begin with the decision or question.', 'Define variables, units and population.', 'Choose a representative collection method.', 'Clean without silently changing meaning.', 'Summarise or visualise, then state conclusions and limitations.'],
    ['Treating data and information as synonyms.', 'Using a graph whose scale exaggerates a difference.', 'Deleting inconvenient observations without a rule.', 'Inferring causation from correlation.', 'Ignoring consent, privacy or sampling bias.'],
    ['Question → collect → clean → analyse → interpret.', 'Rows = records; columns = fields.', 'Category versus quantity.', 'Quality has several dimensions.', 'Ethics survives every stage.']);

  cs('Database Concepts', 'book-g12-cs-8',
    'A relational database preserves shared facts once, links them through keys and enforces rules so many operations can trust the same data.',
    'Instead of repeating information in disconnected files, a DBMS organises relations (tables) made of tuples (rows) and attributes (columns). Domains constrain values; keys identify records and connect tables. Good design reduces redundancy and update anomalies while integrity constraints prevent impossible states.',
    ['A candidate key uniquely identifies a tuple; one is chosen as primary key and remaining candidates are alternate keys.', 'A composite key uses more than one attribute.', 'A foreign key references a key in another relation and represents a relationship.', 'Entity integrity forbids null primary keys; referential integrity requires valid referenced values or null where allowed.', 'Schema describes structure; instance is the data stored at a particular time.'],
    ['Identify entities and their attributes.', 'Choose stable candidate and primary keys.', 'Separate repeating subjects into related tables.', 'Place foreign keys on the appropriate side of the relationship.', 'Test insert, update and delete cases against integrity rules.'],
    ['Choosing a non-unique name as a primary key.', 'Confusing a foreign key with a necessarily unique field.', 'Calling a table instance a schema.', 'Storing multiple values in one cell.', 'Repeating descriptive data and creating update anomalies.'],
    ['Relation/table; tuple/row; attribute/column.', 'Primary key identifies.', 'Foreign key connects.', 'Schema = design; instance = current data.', 'Integrity keeps relationships valid.']);

  cs('Structured Query Language', 'book-g12-cs-9',
    'SQL asks what result is required while the database decides how to retrieve it; correctness depends on forming rows, groups and conditions in the right logical order.',
    'DDL defines structures, DML changes data and SELECT retrieves it. A query forms source rows, filters them, groups them, filters groups, computes selected expressions and orders the final result. Joins reconstruct relationships through matching keys, while aggregate functions summarise sets rather than individual rows.',
    ['DDL includes CREATE, ALTER and DROP; DML includes INSERT, UPDATE and DELETE; SELECT performs retrieval.', 'WHERE filters rows before grouping; HAVING filters groups after GROUP BY.', 'COUNT(* ) counts rows; most aggregates ignore null expressions.', 'INNER JOIN keeps matching pairs; an outer join can retain unmatched rows.', 'Use IS NULL, not = NULL; LIKE uses % for any string and _ for one character.'],
    ['Translate the question into output columns, source tables and join relationships.', 'Filter individual rows with WHERE.', 'Group only when a per-group result is requested.', 'Filter aggregate results with HAVING.', 'Order last and check duplicate or null behaviour.'],
    ['Missing a join condition and producing a Cartesian product.', 'Using an aggregate condition in WHERE.', 'Selecting an ungrouped, non-aggregated column with GROUP BY.', 'Comparing null with =.', 'Running UPDATE or DELETE without the intended WHERE clause.'],
    ['FROM/JOIN builds rows.', 'WHERE filters rows.', 'GROUP BY forms groups.', 'HAVING filters groups.', 'SELECT projects; ORDER BY sorts.']);

  cs('Computer Networks', 'book-g12-cs-10',
    'A network moves application data across layered rules and physical links; each layer solves a different part of naming, delivery and reliability.',
    'Devices connect through media and topologies, exchange signals under protocols and use addresses to identify interfaces and services. Switches move frames within a LAN, routers connect IP networks and DNS translates names. Layering allows an application message to be encapsulated, transmitted, routed and reconstructed without one program mastering every hardware detail.',
    ['PAN, LAN, MAN and WAN describe increasing scope; topology describes physical or logical arrangement.', 'A switch forwards inside a local network using link-layer addresses; a router forwards between networks using IP.', 'IP identifies a network interface logically; MAC identifies a local interface at the data-link layer.', 'DNS resolves names to IP addresses; DHCP can supply configuration.', 'TCP provides connection-oriented reliable delivery; UDP favours low overhead without equivalent guarantees.'],
    ['Identify source, destination and required service.', 'Choose network scope and physical medium.', 'Trace data from application through addressing and local forwarding.', 'Locate the router boundary and name resolution step.', 'Match protocol choice to reliability, delay and overhead needs.'],
    ['Calling the Internet and World Wide Web the same thing.', 'Using switch and router interchangeably.', 'Saying UDP is simply faster in every situation.', 'Confusing bandwidth with actual throughput.', 'Assigning one permanent IP meaning to all devices everywhere.'],
    ['Switch: within LAN.', 'Router: between networks.', 'DNS: name to IP.', 'TCP: reliable stream; UDP: lightweight datagrams.', 'Layers encapsulate and decapsulate.']);

  cs('Data Communication', 'book-g12-cs-11',
    'Successful communication requires a message, sender, receiver, medium and protocol, while performance is constrained by signal quality, capacity and delay.',
    'Data is encoded into signals and transmitted through guided or unguided media. Direction may be simplex, half-duplex or full-duplex. Multiplexing shares a channel; switching chooses a path or forwards units; error detection adds controlled redundancy so corruption can be noticed before information is trusted.',
    ['Analog signals vary continuously; digital signals use discrete levels.', 'Bit rate counts transmitted bits per second; baud rate counts signal changes and need not be identical.', 'Twisted pair, coaxial and optical fibre are guided; radio, microwave and infrared are unguided.', 'Circuit switching reserves a path; packet switching divides data and shares links dynamically.', 'Parity and checksums detect classes of errors but do not guarantee that every possible corruption is caught.'],
    ['State the communication requirement: distance, rate, mobility, delay and reliability.', 'Choose medium and transmission mode.', 'Describe encoding and sharing of the channel.', 'Trace switching or forwarding.', 'Add error detection and assess the trade-off.'],
    ['Using bandwidth, bit rate and throughput as exact synonyms.', 'Claiming wireless means no transmission medium.', 'Calling half-duplex simultaneous.', 'Saying error detection automatically corrects all errors.', 'Assuming fibre has no practical constraints.'],
    ['Five elements: sender, receiver, message, medium, protocol.', 'Simplex one-way; half alternate; full simultaneous.', 'Bit rate is not always baud rate.', 'Packets share links.', 'Redundancy detects corruption.']);

  cs('Security Aspects', 'book-g12-cs-12',
    'Security protects confidentiality, integrity and availability by combining technical controls with careful human behaviour; no single tool makes a system safe.',
    'Threats exploit software flaws, weak identity checks and human trust. Authentication establishes who is requesting access, authorisation limits what that identity may do, encryption protects readable content and backups support recovery. Phishing and malware show why users, processes and technology must reinforce one another.',
    ['Confidentiality limits disclosure, integrity prevents unauthorised change and availability keeps services usable.', 'Authentication verifies identity; authorisation grants permissions after identity is known.', 'Hashing is one-way verification; encryption is reversible with a key; encoding is not security.', 'Symmetric encryption uses a shared secret; asymmetric systems use public/private key pairs.', 'Strong unique passwords, MFA, updates, least privilege and tested backups reduce different risks.'],
    ['Name the asset and likely threat.', 'Identify vulnerability and possible impact.', 'Choose preventive, detective and recovery controls.', 'Limit privileges and protect credentials.', 'Plan reporting, containment, restoration and learning after an incident.'],
    ['Calling a firewall complete protection.', 'Confusing encryption with hashing.', 'Reusing passwords because they are complex.', 'Treating HTTPS as proof a site is trustworthy.', 'Ignoring backups, updates and social engineering.'],
    ['CIA: confidentiality, integrity, availability.', 'Authenticate who; authorise what.', 'Hash verifies; encryption conceals.', 'MFA blocks many stolen-password attacks.', 'Prevent, detect, recover.']);

  cs('Project Based Learning', 'book-g12-cs-13',
    'A strong computing project is a tested solution to a defined user problem, not a large pile of code or screens.',
    'Project work starts with listening to users and converting a vague concern into requirements and success criteria. The team models data, divides the system into modules, builds a small end-to-end version, tests with representative cases and documents decisions. Iteration matters because evidence from users and tests should change the design.',
    ['A problem statement defines user, need, context and boundary.', 'Requirements should be testable; distinguish functional behaviour from quality constraints.', 'Design artefacts may include data dictionary, schema, flowchart, algorithms, interface sketches and module contracts.', 'Testing needs normal, boundary and invalid cases with expected and actual results.', 'Documentation must cover installation, use, limitations, data/privacy choices and future work.'],
    ['Observe the real workflow and define one measurable outcome.', 'Reduce scope to a minimum complete solution.', 'Design data and modules before polishing the interface.', 'Build in small testable increments and use versioned backups.', 'Demonstrate with evidence, acknowledge limitations and collect feedback.'],
    ['Choosing a fashionable technology before a real problem.', 'Expanding scope until no complete workflow works.', 'Using real personal data without consent or protection.', 'Testing only the happy path.', 'Presenting copied code that the team cannot explain.'],
    ['User need before feature list.', 'Requirements must be testable.', 'Small complete workflow beats unfinished breadth.', 'Test normal, boundary and invalid input.', 'Evidence + reflection make the project credible.']);
})();
