(function () {
  'use strict';
  const HM = window.HM = window.HM || {};
  const root = HM.geniusContent = HM.geniusContent || {};
  root.school = root.school || {};

  const add = (subject, title, insight, whyItMatters, concepts, mustKnow, worked, examTips, traps, memoryHook, guidedQuestions) => {
    root.school[`${subject}::${title}`] = {
      insight, whyItMatters,
      concepts: concepts.map(([conceptTitle, explain, visual]) => ({ title: conceptTitle, explain, visual })),
      mustKnow, worked, examTips, traps, memoryHook,
      guidedQuestions: guidedQuestions.map(([question, answer, explanation]) => ({ question, answer, explanation }))
    };
  };
  const english = (title, insight, why, concepts, mustKnow, worked, tips, traps, hook, questions) =>
    add('English Core', title, insight, why, concepts, mustKnow, worked, tips, traps, hook, questions);
  const cs = (title, insight, why, concepts, mustKnow, worked, tips, traps, hook, questions) =>
    add('Computer Science', title, insight, why, concepts, mustKnow, worked, tips, traps, hook, questions);

  english('The Last Lesson',
    'The lost language is not merely a school subject: it becomes identity, freedom and regret when power threatens to remove it.',
    'Strong answers connect the narrator’s changed attention, the teacher’s final dignity and the village presence to the larger cost of occupation.',
    [['Perspective shift','Franz moves from avoidance to alert observation; his change lets the reader discover value at the moment of loss.','Before: escape school → decree → attentive listening → regret.'],['Language and power','Control of language is cultural control; preserving it becomes quiet resistance.','Authority → bans language → identity threatened → memory resists.'],['Symbolic setting','Unusual silence, formal clothes and villagers turn an ordinary classroom into a communal farewell.','Classroom = school + courtroom + memorial.']],
    ['Track Franz before and after the announcement.','Use a precise event as evidence, then explain its implication.','Distinguish patriotism from empty praise: the story tests delayed appreciation.'],
    { problem:'Explain how the classroom becomes a symbol of resistance.', steps:['Claim: ordinary teaching acquires political meaning.','Evidence: villagers attend and the final lesson is treated ceremonially.','Reason: shared attention preserves what the decree tries to erase.'], answer:'The classroom resists through remembrance and disciplined learning, not violence.', check:'Does each piece of evidence support the claim about resistance?' },
    ['For 5 marks: thesis, two evidence-reason links, concluding insight.','Discuss change, not just recount events.'],
    ['Calling the teacher only strict and missing his self-criticism.','Quoting an event without explaining what it reveals.'],
    'Value becomes visible when choice disappears.',
    [['Why do the villagers attend?','To honour the language and acknowledge neglected learning.','Their presence converts private regret into a shared cultural response.'],['Why is Franz’s narration effective?','His naïve viewpoint grows during the lesson.','The reader experiences discovery rather than receiving a lecture.']]);

  english('Lost Spring',
    'Child labour is sustained by a chain—poverty, social inheritance, exploitation and absent opportunity—not by a child’s lack of ambition.',
    'Board answers score when they compare lived details and expose systems instead of reducing the profiles to sympathy.',
    [['Two portraits','Saheb’s displaced family and Mukesh’s inherited occupation show different settings but the same stolen childhood.','Displacement ↘ poverty → labour ← caste tradition.'],['Irony of freedom','A small job gives money but removes the informal freedom Saheb once possessed.','Income gained; autonomy lost.'],['Dream as resistance','Mukesh’s practical ambition matters because it crosses an occupation fixed by birth.','Inherited circle → skill dream → possible exit.']],
    ['Compare, do not merge, the two children.','Name the structural barrier behind each detail.','Notice the contrast between promises, policy and reality.'],
    { problem:'Compare how hope operates in the two profiles.', steps:['State the shared deprivation.','Contrast Saheb’s narrowing choices with Mukesh’s declared goal.','Explain why even modest agency is significant.'], answer:'Hope is fragile for both, but Mukesh articulates a route beyond inherited labour while Saheb becomes absorbed into it.', check:'Have both similarity and difference been established?' },
    ['Build comparison paragraphs around one common criterion.','Use ethically precise language; do not romanticise poverty.'],
    ['Writing only a plot summary.','Blaming families while ignoring exploitative networks.'],
    'Ask of every image: who benefits when childhood becomes labour?',
    [['What does the title suggest?','Childhood’s season of renewal has been stolen.','“Spring” represents growth and possibility denied by labour.'],['Why is Mukesh’s dream powerful?','It rejects hereditary destiny.','Its modest realism shows agency within severe constraints.']]);

  english('Deep Water',
    'Fear survives through memory and avoidance; it weakens when controlled practice repeatedly replaces helplessness with evidence of safety.',
    'The chapter supports psychological interpretation and a clear cause–process–result answer structure.',
    [['Fear conditioning','A terrifying incident links water with bodily panic long after immediate danger ends.','Trigger → panic memory → avoidance.'],['Graduated mastery','The instructor divides swimming into manageable skills and rehearses them systematically.','Breathing + kicking + strokes → integration.'],['Final verification','Independent tests matter because technical skill and inner confidence are different achievements.','Training → solo challenge → freedom.']],
    ['Separate the childhood incident from the later pool trauma.','Explain how method, repetition and self-testing each contribute.','The victory is over fear, not over nature.'],
    { problem:'Show that courage here is a process, not a sudden feeling.', steps:['Identify the entrenched fear.','Describe staged instruction and repeated practice.','Use independent swimming as the proof of changed belief.'], answer:'Courage grows from disciplined exposure until experience contradicts fear.', check:'Does the answer explain mechanism rather than say “he tried hard”?' },
    ['Use chronological causality: origin, reinforcement, remedy, test.','Connect the personal account to a universal insight only at the end.'],
    ['Treating the instructor as the sole cause of recovery.','Confusing absence of fear with reckless risk.'],
    'Name it, train in pieces, test it alone.',
    [['Why was instruction alone insufficient?','He still needed independent proof.','Fear can persist after skill acquisition, so solo tests rebuilt trust.'],['What is the deeper meaning of the final swims?','They verify psychological freedom.','The setting becomes a test of self-command rather than technique alone.']]);

  english('The Rattrap',
    'The world-as-trap metaphor explains temptation, but compassionate recognition—not punishment—makes moral renewal possible.',
    'Exam questions often test symbolism, contrasting responses and whether transformation is convincingly motivated.',
    [['Central metaphor','Worldly bait tempts people into traps of greed and fear.','Bait → choice → trap → possible release.'],['Misrecognition','Being mistaken for someone else exposes the peddler to dignity before his identity is known.','False identity → hospitality → moral mirror.'],['Transformative kindness','Edla protects his humanity while seeing the truth, giving him a self worth living up to.','Respect received → responsibility awakened.']],
    ['Trace when the metaphor becomes real for the peddler.','Contrast the ironmaster’s conditional welcome with Edla’s principled hospitality.','Use the returned money and signed message as evidence of change.'],
    { problem:'Why is Edla, not fear of law, the decisive influence?', steps:['Note that threat first makes him defensive.','Show that Edla offers safety after learning his identity.','Connect unconditional respect to restitution.'], answer:'Her respect restores a moral identity; he acts honestly to deserve the person she believed he could be.', check:'Is the final action linked causally to her treatment?' },
    ['Explain the title at literal and metaphorical levels.','For character questions, use decision → motive → consequence.'],
    ['Claiming kindness magically changes everyone.','Ignoring the peddler’s own final choice.'],
    'A trap closes through greed; dignity opens it.',
    [['Why does the peddler sign as a captain?','He accepts the better identity Edla’s trust offered him.','The signature marks ethical transformation, not social promotion.'],['Is the world metaphor completely pessimistic?','No.','Human compassion creates a route out of the trap.']]);

  english('Indigo',
    'Effective leadership converts private suffering into collective courage through inquiry, presence and negotiated action.',
    'The chapter is a case study in how evidence, civil resistance and empowerment interact.',
    [['Fact before action','Gandhi listens, investigates and records testimony instead of arriving with a ready-made slogan.','Listen → verify → organise.'],['Civil disobedience','Calm refusal exposes unjust authority while accepting personal consequence.','Unjust order → principled refusal → public legitimacy.'],['Empowerment beyond settlement','The refund matters less than peasants learning that planters are not invincible.','Material gain < fear broken.']],
    ['Know Rajkumar Shukla’s persistence as the initiating force.','Explain why the percentage of refund was symbolically secondary.','Include social reconstruction—health, education, self-reliance.'],
    { problem:'Why was the Champaran outcome more than a legal victory?', steps:['Mention verified grievances and resistance.','Explain the planters’ loss of prestige and control.','Show peasants gaining courage and local capacity.'], answer:'It altered the relationship of power: peasants ceased to see oppression as inevitable.', check:'Does the conclusion identify lasting change?' },
    ['Answer leadership questions with methods, not adjectives.','Distinguish immediate settlement from long-term impact.'],
    ['Turning the answer into a biography.','Equating compromise with weakness.'],
    'Investigate the fact, confront the injustice, leave people stronger.',
    [['Why did Gandhi accept a smaller refund?','The admission of planter liability mattered more than the amount.','Symbolic surrender broke the aura of unquestionable power.'],['What does Shukla demonstrate?','Persistent agency from the oppressed.','He is not merely rescued; he brings the issue to national attention.']]);

  english('Poets and Pancakes',
    'Humour reveals a film studio as a hierarchy of appearances, frustrated creativity and political misunderstanding.',
    'The best response reads comic details as criticism and connects seemingly scattered episodes.',
    [['Make-up hierarchy','The cosmetics department mirrors status divisions while manufacturing screen illusion.','Faces transformed; ranks preserved.'],['Office boy’s resentment','His blame of Subbu exposes displaced ambition and unreliable self-judgment.','Frustration → scapegoat → comic irony.'],['Misread visitor','The studio’s confusion about the poet shows cultural and ideological distance.','Guest speaks → audience puzzled → later recognition.']],
    ['Narrator’s understated tone creates satire.','Subbu combines loyalty, practical creativity and generosity.','The title joins glamorous illusion with mundane material.'],
    { problem:'Show how humour carries social criticism.', steps:['Choose one comic studio detail.','Identify the contradiction beneath it.','Explain what hierarchy or ignorance the contradiction exposes.'], answer:'The light tone makes pretence visible without turning the memoir bitter.', check:'Have you moved from funny event to critical meaning?' },
    ['Use episode–irony–insight paragraphs.','For Subbu, balance privilege with service to others.'],
    ['Listing colourful incidents with no link.','Assuming the narrator’s mild tone means no criticism.'],
    'Behind every manufactured face, inspect the hierarchy.',
    [['Why is the office boy unreliable?','His resentment shapes his interpretation.','He projects failed ambition onto an accessible target.'],['Why include the foreign visitor episode?','It exposes the studio’s cultural confusion.','Recognition arriving much later completes the irony.']]);

  english('The Interview',
    'An interview can illuminate a mind or intrude upon it; its value depends on purpose, preparation and the quality of questioning.',
    'Questions frequently require synthesis of the debate about interviews with the working habits revealed in the author interview.',
    [['Ethical tension','Public insight competes with privacy, distortion and performance.','Knowledge gained ↔ person exposed.'],['Question design','A focused question elicits method and reasoning; a generic one produces publicity language.','Specific prompt → reflective evidence.'],['Productive intervals','Eco treats small gaps as usable units, explaining output without a romantic myth of inspiration.','Fragments of time → accumulated work.']],
    ['Represent both criticism and usefulness of interviews.','Distinguish interviewer framing from interviewee evidence.','Eco’s scholarly and creative work need not be opposites.'],
    { problem:'Evaluate the interview as a source of truth.', steps:['State its access advantage.','State mediation risks: selection, pressure, self-presentation.','Conclude with conditions for reliability.'], answer:'It offers valuable but constructed evidence, strongest when questions are informed and answers are read critically.', check:'Is the judgement balanced and conditional?' },
    ['Use “however” to build evaluation, not a one-sided list.','Attribute views correctly.'],
    ['Treating every opinion in Part I as the narrator’s.','Retelling Eco’s career instead of interpreting his method.'],
    'An interview is a lens: it can focus or distort.',
    [['What do Eco’s “empty spaces” reveal?','He uses brief intervals deliberately.','Consistent small units can produce substantial intellectual work.'],['Why do writers distrust interviews?','They can simplify or violate the self.','Editing and public performance may replace complexity with a marketable image.']]);

  english('Going Places',
    'Fantasy gives Sophie temporary escape from limits, but repeated self-deception isolates her from evidence and from people who care for her.',
    'A mature answer distinguishes aspiration, imaginative play and harmful fabrication.',
    [['Class constraint','Family expectations and economic reality frame which dreams are plausible.','Limited options → grand imagined futures.'],['Fantasy escalation','A private possibility becomes a detailed story that must be defended.','Wish → claim → elaboration → disappointment.'],['Contrasting realism','Jansie reads circumstances realistically; Geoff becomes the imagined bridge to a larger world.','Jansie = evidence; Geoff = possibility.']],
    ['Do not condemn ambition itself.','Track how Sophie moves from dream to claimed encounter.','The waiting scene reveals emotional investment in her invention.'],
    { problem:'Is Sophie simply a liar?', steps:['Acknowledge her fabricated claims.','Explain fantasy as response to restricted life.','Judge the harm: she blurs desire and fact.'], answer:'She is an imaginative, dissatisfied adolescent whose unchecked fantasy becomes deception and self-injury.', check:'Does the answer combine accountability with context?' },
    ['Character answers need trait, evidence and qualification.','Use contrasts with Jansie and Geoff strategically.'],
    ['Mocking Sophie’s social position.','Calling every dream unrealistic without examining evidence.'],
    'Dream boldly—but make evidence the bridge.',
    [['Why does Sophie trust Geoff?','His silence lets her project mystery and possibility onto him.','He represents access to a world beyond her routine.'],['What makes the ending painful?','She waits for an event the reader knows is invented.','Hope built without evidence produces private disappointment.']]);

  english('My Mother at Sixty-six',
    'A fleeting journey holds a lifelong fear: the adult speaker sees maternal ageing clearly, then masks grief with an ordinary farewell.',
    'Poetry answers improve when image, contrast and repetition are tied to emotional movement.',
    [['Visual recognition','The mother’s sleeping face triggers awareness of frailty and mortality.','Close-up face → sudden fear.'],['Life–age contrast','Young trees and children intensify, rather than erase, the image of decline.','Youth outside ↔ age inside car.'],['Controlled ending','Repeated smiling performs reassurance while revealing what cannot be spoken.','Fear concealed behind farewell.']],
    ['Follow observation → diversion → renewed recognition → suppression.','Name a device only with its effect.','The poem’s restraint is central to its power.'],
    { problem:'Explain the function of the youthful roadside images.', steps:['Identify their energy and movement.','Contrast them with the mother’s stillness.','Link contrast to the speaker’s fear of separation.'], answer:'They sharpen awareness of ageing by placing abundant life beside visible frailty.', check:'Did you explain effect rather than merely name contrast?' },
    ['PEE: point, image-based evidence, effect.','Use present tense for poetic analysis.'],
    ['Paraphrasing every line.','Calling all non-literal language a metaphor.'],
    'Outside, life rushes; inside, time becomes visible.',
    [['Why does the speaker look away?','To control the fear awakened by her mother’s appearance.','The exterior scene is an attempted emotional diversion.'],['Why repeat the smile?','It masks anxiety and offers reassurance.','Repetition makes the effort of self-control audible.']]);

  english('Keeping Quiet',
    'Chosen stillness is an active pause for self-knowledge and solidarity, not death, defeat or permanent inactivity.',
    'Most errors come from literalising the count or confusing reflective silence with total cessation.',
    [['Shared pause','A brief collective stillness suspends habitual divisions.','Many languages → one moment of silence.'],['Self-examination','Stopping automatic action exposes its human and environmental costs.','Pause → notice → reconsider.'],['Life after stillness','Nature’s apparent quiet contains renewal, proving silence can be fertile.','Winter-like stillness → new life.']],
    ['The poet explicitly rejects association with death.','Examples of war and labour connect inner reflection to public ethics.','Stillness is temporary and purposeful.'],
    { problem:'Why is the poem not an argument for inactivity?', steps:['Separate pause from permanent stoppage.','Show its purpose: awareness and changed action.','Use nature’s renewal as the final model.'], answer:'The pause interrupts destructive momentum so life may resume more consciously.', check:'Have you addressed the likely counter-reading?' },
    ['Frame answers around paradox: stillness creates movement within.','Connect examples to the central proposal.'],
    ['Equating silence with laziness.','Claiming the poem demands literal worldwide compliance.'],
    'Pause the noise; restart with awareness.',
    [['What is gained by counting together?','A simple shared rhythm crosses social divisions.','The act imagines collective attention without linguistic hierarchy.'],['How does Earth teach the poem’s lesson?','Apparent inactivity can conceal renewal.','Natural cycles refute the idea that stillness equals death.']]);

  english('A Thing of Beauty',
    'Beauty is a renewable source of meaning: it does not deny suffering but repeatedly helps human beings endure it.',
    'Interpretation should connect the poem’s accumulating images to its argument about despair and permanence.',
    [['Enduring gift','A beautiful experience continues in memory and imagination.','Encounter → memory → repeated consolation.'],['Counterforce to gloom','Despondency is real, yet beauty removes the emotional covering that darkens life.','Gloomy veil lifted by attention.'],['Abundant imagery','Natural and artistic examples form a flowing, life-giving source rather than isolated ornaments.','Many streams → one immortal fountain.']],
    ['Beauty and suffering coexist in the argument.','Accumulation creates a sense of inexhaustible abundance.','Explain symbols through function, not dictionary meaning.'],
    { problem:'How does the poem avoid shallow optimism?', steps:['Acknowledge the catalogue of disappointment.','Show beauty acting against, not erasing, suffering.','Explain continuity through memory and recurring experience.'], answer:'Its hope is credible because consolation is presented as a sustaining counterforce within a difficult world.', check:'Does the answer preserve both darkness and renewal?' },
    ['Organise around claim, contrasting evidence, resolution.','Mention sound or imagery only when relevant to effect.'],
    ['Writing a list of beautiful objects.','Saying beauty makes all problems disappear.'],
    'Beauty is not escape; it is emotional oxygen.',
    [['Why does beauty “increase”?','Its meaning continues through memory and renewed perception.','The lasting inner effect can outgrow the original moment.'],['What unifies the final images?','Life-giving continuity.','They turn separate beauties into an inexhaustible source of sustenance.']]);

  english('A Roadside Stand',
    'The roadside stand exposes a cruel mismatch between rural need and the polished promises, impatience and controlling “help” of the privileged.',
    'High-level answers analyse the speaker’s mixed anger and helpless compassion rather than treating the poem as a simple rural scene.',
    [['Unequal gaze','Passing motorists notice inconvenience to themselves, not the sellers’ economic need.','Fast car → complaint; stand → waiting.'],['False development','Official relief can remove agency while claiming benevolence.','Promise of help → control/displacement.'],['Speaker’s conflict','The desire to end suffering collides with recognition that easy solutions can be violent.','Compassion ↔ helplessness.']],
    ['Separate rural aspiration from urban fantasy imposed upon it.','Irony targets both motorists and paternalistic schemes.','Tone moves among satire, pity, frustration and self-questioning.'],
    { problem:'How does waiting become political?', steps:['Identify what the sellers hope passing traffic will bring.','Show motorists refusing economic recognition.','Link repeated disappointment to structural exclusion.'], answer:'Their waiting reveals an economy that passes rural producers by while displaying prosperity before them.', check:'Is the image connected to a power relation?' },
    ['Use tone shifts as paragraph boundaries.','Explain quoted details in your own analytical language.'],
    ['Portraying villagers as passive caricatures.','Assuming every proposed reform is genuine help.'],
    'The cars see a blemish; the poet sees an unanswered livelihood.',
    [['Why are motorists criticised?','Their concerns remain aesthetic and self-centred.','They consume the landscape while ignoring people seeking fair exchange.'],['Why is the ending uneasy?','Compassion tempts the speaker toward an impossible instant release.','The self-correction exposes the danger of solving others’ lives for them.']]);

  english('Aunt Jennifer’s Tigers',
    'The embroidered tigers embody fearless agency that Aunt Jennifer cannot exercise under the weight of patriarchal marriage.',
    'A strong response reads the artwork, hands, ring and ending as one system of contrast.',
    [['Created freedom','The tigers move with certainty because art imagines the confidence denied to their creator.','Tigers: open movement; aunt: constrained hands.'],['Weight as oppression','The wedding band carries social and psychological burden beyond its physical size.','Small ring → enormous invisible pressure.'],['Art beyond the artist','The tigers persist after the maker, preserving resistance even when her life remains marked.','Mortal hand → enduring image.']],
    ['Contrast does the main argumentative work.','The poem critiques an institution shaped by unequal power, not companionship itself.','Notice that artistic survival is hopeful but does not undo suffering.'],
    { problem:'Is the ending fully triumphant?', steps:['Identify the tigers’ continued fearlessness.','Contrast the aunt’s lasting marks of ordeal.','Form a qualified judgement.'], answer:'Art endures as defiance, but the woman’s unrelieved suffering prevents a simple victory.', check:'Have both hope and limitation been retained?' },
    ['Analyse image clusters rather than isolated devices.','Use “suggests” and then justify the inference.'],
    ['Saying the tigers literally rescue her.','Ignoring the bodily imagery of burden.'],
    'Her hands are burdened; her art refuses to bow.',
    [['Why are the tigers important?','They externalise qualities the aunt is denied.','Their confidence makes her constraint more visible.'],['What does the ring signify?','An oppressive marital order.','Its figurative weight explains why a small object overwhelms her hands.']]);

  english('The Third Level',
    'The mysterious station level turns escapism into a test: is fantasy merely avoidance, or can it expose what modern life fails to provide?',
    'Answers should preserve ambiguity rather than forcing a single medical or supernatural explanation.',
    [['Psychological escape','Stress makes an idealised past attractive because it appears slower and safer.','Modern anxiety → nostalgic doorway.'],['Documentary detail','Currency, clothing and station signs make the impossible experience materially convincing.','Fantasy + precise objects = uncertainty.'],['Open ending','The friend’s message destabilises the rational explanation and keeps both readings alive.','Proof? ↔ projection?']],
    ['Recognise nostalgia as selective idealisation.','The stamp collection functions as a bridge to the past.','Ambiguity is designed, not a flaw to solve away.'],
    { problem:'Offer a balanced interpretation of the third level.', steps:['Present the stress-induced escape reading.','Present details that support a literal anomaly.','Explain why coexistence of both readings serves the theme.'], answer:'Whether mental or real, the third level materialises the longing to escape insecurity into an imagined stable past.', check:'Have you avoided claiming certainty the text withholds?' },
    ['Use “on one reading…however…” architecture.','Tie every strange detail back to escapism.'],
    ['Calling it only hallucination.','Treating the past as historically perfect.'],
    'When the present overwhelms, nostalgia builds a platform.',
    [['Why is the past attractive?','It is imagined as peaceful and predictable.','The attraction reveals dissatisfaction with present anxiety.'],['What does the final message achieve?','It reopens the supernatural possibility.','Evidence from the rational friend prevents neat closure.']]);

  english('The Tiger King',
    'The prophecy does not control the king as much as his arrogant response to it; power turns fear into violence and irony completes the trap.',
    'The story rewards analysis of satire, dramatic irony and the misuse of authority.',
    [['Self-fulfilling obsession','Trying to defeat fate makes the king organise his life around it.','Prediction → obsession → actions → ironic fulfilment.'],['Political satire','Subjects, officials and resources bend around royal fear rather than public good.','Private anxiety commands public machinery.'],['Final irony','The apparently harmless hundredth tiger succeeds where hunted animals did not.','Confidence peaks → trivial object → death.']],
    ['The narrator’s exaggeration exposes absurd authority.','The king is brave in hunting but cowardly before uncertainty.','The wooden tiger is both comic device and causal mechanism.'],
    { problem:'How does irony make the ending inevitable yet surprising?', steps:['Recall the king’s numerical confidence.','Identify the overlooked flaw in the toy.','Connect his obsession with the conditions of his death.'], answer:'He believes he has mastered the prophecy, but the symbol he trivialises fulfils it through an ordinary infection.', check:'Does your explanation join character flaw, object and outcome?' },
    ['For satire: target, comic method, serious criticism.','Do not spend marks recounting all hunts.'],
    ['Saying fate alone causes everything.','Missing the suffering produced by royal obsession.'],
    'Fear wearing a crown is still fear.',
    [['What is the real target of satire?','Arbitrary, self-serving power.','The prophecy plot reveals how authority sacrifices reason and people to personal obsession.'],['Why is the toy tiger effective?','It reverses scale and expectation.','A tiny artificial object defeats the hunter of powerful living animals.']]);

  english('Journey to the End of the Earth',
    'Antarctica compresses planetary history into visible evidence, making climate change a question of connected systems and human time scales.',
    'The chapter invites science-informed interpretation rather than a travelogue summary.',
    [['Deep time','Continental history reveals that present geography and climate are temporary states.','Gondwana → separation → present continents.'],['System connection','Small organisms, oceans, atmosphere and ice participate in linked climate feedbacks.','Microscopic life → carbon cycle → global climate.'],['Experiential learning','Direct encounter can turn abstract data into responsibility.','See evidence → grasp scale → choose action.']],
    ['Explain why Antarctica is a climate archive.','Connect phytoplankton to the carbon cycle carefully.','The youth programme embodies investment in future decision-makers.'],
    { problem:'Why is Antarctica ideal for understanding climate change?', steps:['Mention preserved ice and minimal human settlement.','Connect past atmospheric evidence to current trends.','Explain global consequences of polar change.'], answer:'Its relatively undisturbed records reveal Earth’s past while its sensitive systems warn how present warming propagates globally.', check:'Have past evidence and future warning both appeared?' },
    ['Use cause–system–consequence chains.','Avoid vague “save nature” conclusions.'],
    ['Calling Antarctica untouched in an absolute sense.','Listing facts without showing connection.'],
    'At the edge of the map, the whole planet becomes visible.',
    [['Why focus on tiny phytoplankton?','They demonstrate that small components can regulate large systems.','Their photosynthesis links marine ecology with atmospheric carbon.'],['What is the programme’s educational logic?','Experience can reshape long-term choices.','Young participants may carry systems awareness into future leadership.']]);

  english('The Enemy',
    'Professional duty and shared humanity collide with wartime loyalty, forcing moral action where every available choice carries risk.',
    'Nuanced answers resist calling characters simply patriotic or disloyal and track decisions under pressure.',
    [['Role conflict','Sadao is simultaneously surgeon, citizen, husband and subject of an authoritarian state.','One person ← four competing duties.'],['Humanisation through care','Treating the wounded body makes an enemy category impossible to keep abstract.','Label “enemy” → patient → person.'],['Compromised escape','The final plan protects life yet also frees Sadao from danger, mixing principle and self-interest.','Compassion + survival strategy.']],
    ['Hana’s labour and fear matter to the ethical choice.','The General’s selfish dependence exposes corrupted authority.','The ending retains unease rather than awarding moral purity.'],
    { problem:'Is Sadao’s decision heroic?', steps:['Show the real personal and political risk.','Identify medical ethics and compassion.','Qualify with his attempts to remove the danger.'], answer:'His rescue is morally courageous, though shaped by fear and self-preservation; that mixture makes it human rather than idealised.', check:'Does the judgement use evidence on both sides?' },
    ['Use decision points as structure.','Discuss wartime context without excusing every action.'],
    ['Ignoring Hana’s contribution.','Equating moral complexity with hypocrisy.'],
    'Uniforms create enemies; care encounters a human body.',
    [['Why does the General fail to act?','Self-interest and illness distract him.','His dependence on Sadao outweighs state duty, exposing elite moral weakness.'],['Why can Sadao not leave the man untreated?','His medical identity recognises an immediate human obligation.','Professional skill creates responsibility before nationality intervenes.']]);

  english('On the Face of It',
    'The decisive barrier is not bodily difference alone but the isolating identity built from other people’s gaze—and sometimes accepted by the self.',
    'The play tests dialogue, setting and character change rather than asking for generic inspiration.',
    [['Internalised judgement','Derry predicts rejection and therefore withdraws before others can know him.','Stare → shame → isolation → more certainty.'],['Alternative attention','Mr Lamb acknowledges difference without making it the whole person.','Notice scar, then widen the field of life.'],['Open garden','The unfenced, sensory garden models participation and receptiveness.','Open gate → open attention → connection.']],
    ['Mr Lamb is not a magical cure; his ideas create an opening.','Derry’s return is an act of agency.','The tragic ending intensifies, rather than cancels, the change.'],
    { problem:'How does the garden function symbolically?', steps:['Identify its openness and varied life.','Contrast it with Derry’s withdrawal.','Connect entry and return to a new willingness to engage.'], answer:'The garden externalises an inclusive world in which difference belongs within life rather than outside it.', check:'Have setting and character movement been linked?' },
    ['Analyse a dialogue exchange as claim and counterclaim.','Avoid pity-based language.'],
    ['Presenting Mr Lamb as endlessly cheerful and simple.','Claiming appearance never affects social experience.'],
    'A scar is a fact, not a complete identity.',
    [['Why does Derry initially distrust kindness?','He interprets it as pity or performance.','Repeated stigma has trained him to anticipate insincerity.'],['What changes when he returns?','He chooses connection despite family pressure.','The choice shows emerging independence even though the meeting ends tragically.']]);

  english('Memories of Childhood',
    'Two personal memories expose how discrimination enters ordinary routines—and how recognition can become resistance rather than submission.',
    'Comparison should identify the distinct systems, narrative moments and strategies of resistance.',
    [['Humiliation made ordinary','Institutions and customs present unequal treatment as normal behaviour.','Routine act → hidden hierarchy exposed.'],['Moment of recognition','Each narrator moves from puzzlement or innocence to understanding structural injustice.','Observation → explanation → anger/clarity.'],['Different resistance','One resists imposed cultural erasure; the other is urged to defeat caste hierarchy through education.','Identity defence | educational advancement.']],
    ['Name the different contexts: Indigenous assimilation and caste discrimination.','Compare mechanisms without claiming the experiences are identical.','Education can oppress in one setting and empower in another depending on control.'],
    { problem:'Compare how knowledge changes both narrators.', steps:['Describe each initial encounter.','Explain what the narrator learns about the system behind it.','Contrast the action or resolve that follows.'], answer:'Understanding turns private pain into political awareness; each narrator then seeks agency through a context-specific form of resistance.', check:'Are both commonality and difference explicit?' },
    ['Use a comparison grid before writing: event, system, response, outcome.','Treat autobiographical detail as evidence of structure.'],
    ['Blending the two accounts into one.','Reducing resistance to personal confidence alone.'],
    'See the system behind the insult; choose the lever that can change it.',
    [['How can education be both harmful and empowering?','Its effect depends on whose values and agency it serves.','Forced schooling erases identity, while self-directed learning can challenge exclusion.'],['Why use childhood memories?','A child’s changing understanding exposes learned prejudice.','The movement from innocence to awareness makes normalised injustice visible.']]);

  cs('Exception Handling in Python',
    'Exceptions are alternate control paths: robust programs anticipate where an operation can fail and recover at the narrowest useful boundary.',
    'Tracing exception flow prevents silent corruption and distinguishes user errors from programmer defects.',
    [['Try flow','Execution jumps from the failing statement to the first compatible handler; remaining try statements are skipped.','try line 1 → failure ✕ → matching except → finally.'],['Specific handlers','Narrow exception types preserve accurate diagnosis and recovery.','ValueError ≠ ZeroDivisionError ≠ FileNotFoundError.'],['Cleanup','finally executes whether the operation succeeds or fails, making it suitable for release actions.','Acquire → attempt → finally release.']],
    ['Order specific handlers before broad ones.','else runs only when try finishes without exception.','Do not use bare except to conceal defects.'],
    { problem:'Trace: try x=int("0"); print(8/x) except ValueError: print("V") except ZeroDivisionError: print("Z") finally: print("F").', steps:['int("0") succeeds.','Division raises ZeroDivisionError before print.','Matching handler prints Z; finally prints F.'], answer:'Output is Z, then F.', check:'The ValueError handler is skipped because conversion succeeded.' },
    ['Trace the exact failing expression.','For code writing, keep the try block small.','State exception class and recovery behaviour.'],
    ['Assuming execution resumes after the failed try statement.','Catching Exception before a specific subclass.'],
    'TRY the risky step; EXCEPT the known failure; FINALLY clean up.',
    [['Does finally run after return?','Yes, before control leaves the function.','Python guarantees cleanup unless the process terminates abnormally.'],['Why avoid bare except?','It catches failures the program cannot responsibly handle.','Hidden programming errors become misleading normal behaviour.']]);

  cs('File Handling in Python',
    'A file operation has three layers: path and mode, cursor position, and conversion between stored text/bytes and program values.',
    'Most exam errors arise from confusing read position, append/overwrite semantics or text with typed data.',
    [['Modes','r reads, w truncates before writing, a writes at the end; + adds paired access.','Open mode → allowed operation + initial file state.'],['Cursor','read and write occur at the current position; tell observes it and seek moves it.','Bytes/characters laid on a tape with a pointer.'],['Record parsing','Lines are strings; fields must be split, cleaned and converted deliberately.','line → strip → split delimiter → validate → convert.']],
    ['Use with open(...) to guarantee closure.','readline returns an empty string at EOF.','w destroys previous contents; a preserves them.'],
    { problem:'A file contains "4,9\n" and "6,2\n". Find the sum of first fields.', steps:['Iterate over each line.','Split at comma and select index 0.','Convert to int and accumulate: 4+6.'], answer:'10.', check:'Newline is harmless after int conversion, but strip clarifies parsing.' },
    ['State mode before predicting output.','Track cursor after every read.','Use a context manager in design answers.'],
    ['Using split without converting numeric strings.','Expecting write mode to retain old content.'],
    'Mode sets the rules; cursor marks the place; parsing creates meaning.',
    [['Why can a second read return empty?','The cursor may already be at EOF.','Use seek(0) to reread from the beginning when appropriate.'],['Why is with safer?','It closes the file on normal and exceptional exits.','Resource cleanup is automatic and structurally visible.']]);

  cs('Stack',
    'A stack restricts access to one end, so every trace is governed by last-in, first-out order.',
    'Stacks power nested-expression handling, undo history and backtracking, and are frequent hand-tracing questions.',
    [['LIFO invariant','The most recently pushed item must be the first popped.','Bottom [A,B,C] top → pop C.'],['Core operations','push adds at top; pop removes top; peek observes top without removal.','One doorway for entry and exit.'],['Underflow','Pop or peek on an empty stack is invalid and must be guarded.','isEmpty? → reject or operate.']],
    ['Python list append and pop implement top at the right end efficiently.','After n pushes and k valid pops, size is n−k.','Balanced delimiters require type matching, not only equal counts.'],
    { problem:'Trace push(3), push(8), pop(), push(5), peek().', steps:['Stack becomes [3].','Then [3,8]; pop returns 8 leaving [3].','Push gives [3,5]; peek reads 5.'], answer:'The popped value is 8; final top is 5 and stack is [3,5].', check:'Peek does not remove 5.' },
    ['Draw the stack after each operation.','Label which list end is top.','Test empty input and unmatched opening symbols.'],
    ['Popping from index 0 while claiming the right end is top.','Forgetting underflow.'],
    'Last through the door, first back out.',
    [['Why does a stack suit nested brackets?','The latest unmatched opener must close first.','Nesting naturally follows LIFO order.'],['Is peek destructive?','No.','It returns the top element while preserving size and order.']]);

  cs('Queue',
    'A queue separates arrival from service: insertion occurs at the rear and removal at the front in first-in, first-out order.',
    'Correct front/rear tracking is essential in scheduling and circular-queue traces.',
    [['FIFO invariant','The earliest enqueued item leaves first.','Front → [A,B,C] ← rear; remove A.'],['Pointers','Front identifies next service; rear identifies latest insertion.','enqueue advances rear; dequeue advances front.'],['Circular reuse','Modulo arithmetic reuses freed array positions instead of wasting the prefix.','Last index wraps to 0.']],
    ['A queue and stack with the same data produce different removal orders.','Circular next index is (i+1) mod capacity.','Define empty/full conditions consistently.'],
    { problem:'Capacity 5, front=3, rear=4. Enqueue X into the next circular position.', steps:['Compute next=(4+1)%5.','next=0, so wrapping occurs.','Store X at index 0 and set rear=0.'], answer:'X is stored at index 0; rear becomes 0.', check:'Index stays within 0–4 and free prefix space is reused.' },
    ['Trace logical order separately from physical indices.','State whether endpoints are inclusive.','Check underflow before deletion.'],
    ['Assuming rear always has a greater index than front.','Calling a shifted linear queue empty because rear reached the array end.'],
    'First to arrive, first to be served; circular space comes around again.',
    [['Why use a circular queue?','It reuses array cells freed by dequeues.','Wrap-around avoids false overflow in a fixed-size array.'],['Where is a queue preferable to a stack?','When arrival order should determine service order.','Print jobs and request scheduling require fairness by time.']]);

  cs('Sorting',
    'Sorting algorithms are best understood as maintained invariants: after each pass, some region is guaranteed to be in final or relative order.',
    'Pass-by-pass reasoning earns marks and helps choose an algorithm for data size and initial order.',
    [['Bubble invariant','Each left-to-right pass moves the largest remaining value to the unsorted region’s end.','Unsorted | fixed largest suffix.'],['Selection invariant','Each pass selects the minimum remaining value for the next prefix position.','Fixed smallest prefix | unsorted.'],['Insertion invariant','The processed prefix remains sorted while the next item is inserted into its place.','Sorted hand of cards grows one card.']],
    ['Quadratic simple sorts perform O(n²) comparisons in typical/worst cases.','A swap flag can stop bubble sort early.','Stability preserves order among equal keys.'],
    { problem:'Perform one ascending bubble pass on [5,2,4,1].', steps:['Compare 5,2 → [2,5,4,1].','Compare 5,4 → [2,4,5,1].','Compare 5,1 → [2,4,1,5].'], answer:'After one pass: [2,4,1,5]; 5 is fixed at the end.', check:'A single pass need not sort the whole list.' },
    ['Show every comparison when a pass is requested.','Name ascending/descending order.','Use the invariant to justify termination.'],
    ['Giving the final sorted list instead of the requested pass.','Counting swaps as comparisons.'],
    'Bubble fixes the end; selection fixes the start; insertion grows a sorted hand.',
    [['Which simple sort benefits most visibly from nearly sorted data?','Optimised bubble or insertion sort.','Few inversions allow early stopping or short shifts.'],['What does stable mean?','Equal-key records retain their original relative order.','That matters when data was previously sorted by another field.']]);

  cs('Searching',
    'Searching is elimination: linear search discards one candidate at a time; binary search discards half but requires sorted order.',
    'Trace questions test boundary updates and the difference between index, comparison count and found value.',
    [['Linear search','Inspect items sequentially until match or exhaustion.','Candidate list shrinks from the front.'],['Binary search','Compare with middle; ordering proves which half cannot contain the target.','[low … mid … high] → keep one half.'],['Boundary correctness','Updating to mid±1 guarantees progress and retains all possible candidates.','New interval strictly smaller.']],
    ['Binary search requires sorted comparable data.','mid=(low+high)//2.','Worst-case comparisons are logarithmic for binary and linear for sequential search.'],
    { problem:'Find 23 in [4,9,15,23,31,42] by binary search.', steps:['low=0 high=5 mid=2 gives 15; target is larger.','low=3 high=5 mid=4 gives 31; target is smaller.','low=3 high=3 mid=3 gives 23.'], answer:'Found at index 3 after three comparisons.', check:'Each discarded half is justified by sorted order.' },
    ['Write low, high and mid for every iteration.','Clarify zero-based index.','State unsuccessful termination low>high.'],
    ['Using binary search on unsorted data.','Updating low=mid and causing an infinite loop.'],
    'Sorted data lets one comparison erase half the doubt.',
    [['Why is sorting sometimes not worth it before one search?','Sorting may cost more than a single linear scan.','Algorithm choice depends on total workload, not search alone.'],['When is binary search unsuccessful?','When the candidate interval becomes empty.','low>high proves no possible index remains.']]);

  cs('Understanding Data',
    'Data becomes evidence only after its meaning, type, quality and context are established.',
    'This chapter underpins responsible analysis: wrong units, missing values or biased collection can invalidate correct arithmetic.',
    [['Data hierarchy','Raw observations are organised into information and interpreted for decisions.','Observation → clean structure → pattern → decision.'],['Quality dimensions','Accuracy, completeness, consistency, timeliness and relevance determine fitness for use.','Quality checklist around a dataset.'],['Representation','Tables and graphs reveal different relationships; scale choices can clarify or distort.','Same values → table, bar, line, distribution.']],
    ['Categorical and numerical variables require different summaries.','Correlation alone does not establish causation.','Missing-data handling must be documented, not hidden.'],
    { problem:'A class average rises after five absent low scores are deleted. Is improvement proved?', steps:['Identify that the groups being averaged differ.','Deletion is non-random and biases the sample upward.','Compare the same students or report missingness before concluding.'], answer:'No; the apparent rise may be a missing-data artefact.', check:'The calculation can be correct while the inference is invalid.' },
    ['State what each row and column represents.','Check units, range and missing values before analysis.','Explain why a chosen visual matches the question.'],
    ['Treating zero as automatically missing.','Using a pie chart for time trends.'],
    'Before asking what data says, ask how it came to speak.',
    [['Why can a graph mislead without false numbers?','Axis limits, aggregation and visual scale shape perception.','Presentation choices influence comparison and apparent magnitude.'],['What makes data relevant?','It directly measures or validly represents the question being asked.','Large volume cannot compensate for measuring the wrong construct.']]);

  cs('Database Concepts',
    'A relational database protects meaning by separating entities, linking them with keys and enforcing valid states.',
    'Good schema reasoning prevents duplicates, update anomalies and ambiguous relationships before SQL is written.',
    [['Relation design','A table models one coherent entity or relationship; rows are tuples and columns are attributes.','STUDENT(StudentID, Name, Class).'],['Keys','A primary key identifies each row; a foreign key links to another table’s primary key.','ENROLMENT.StudentID → STUDENT.StudentID.'],['Integrity','Domain, entity and referential constraints block invalid values, duplicate identity and orphan references.','Input → constraints gate → valid database.']],
    ['Primary keys are unique and not null.','A candidate key is minimal and uniquely identifies rows.','Many-to-many relationships require an associative table.'],
    { problem:'Model students taking many courses, with a grade for each enrolment.', steps:['Create STUDENT with StudentID primary key.','Create COURSE with CourseID primary key.','Create ENROLMENT(StudentID, CourseID, Grade) with composite key and two foreign keys.'], answer:'The associative ENROLMENT table resolves the many-to-many relationship and stores relationship-specific Grade.', check:'A student-course pair cannot appear twice.' },
    ['Underline primary keys and mark foreign keys in schema answers.','Test insert, update and delete anomalies.','Keep attribute values atomic.'],
    ['Putting a list of course IDs in one student cell.','Using a person’s name as a guaranteed unique key.'],
    'One fact, one place; keys make the connections.',
    [['Can a foreign key repeat?','Yes.','Many child rows may refer to the same parent row.'],['Why not store derived totals everywhere?','Copies can become inconsistent after updates.','Compute when practical or control redundancy explicitly.']]);

  cs('Structured Query Language',
    'An SQL query is a pipeline: form rows, filter rows, group them, filter groups, project results and order the output.',
    'Thinking in logical stages prevents common WHERE/HAVING, join and aggregation errors.',
    [['Row filtering','WHERE selects individual rows before grouping.','FROM → WHERE leaves candidate rows.'],['Grouping','GROUP BY creates one result context per key; aggregate functions summarise each group.','Rows → buckets → COUNT/SUM/AVG.'],['Joining','A join condition matches related keys; missing or wrong conditions create lost rows or Cartesian multiplication.','Orders.CustomerID = Customers.ID.']],
    ['Use IS NULL, not = NULL.','WHERE filters rows; HAVING filters groups.','Every selected non-aggregate column should be grouped appropriately.'],
    { problem:'Find departments with average salary above 60000.', steps:['Read rows from Employee.','Group by Department.','Compute AVG(Salary) per group and filter with HAVING.'], answer:'SELECT Department, AVG(Salary) FROM Employee GROUP BY Department HAVING AVG(Salary) > 60000;', check:'HAVING is required because the condition uses an aggregate.' },
    ['Write the intended output columns first.','Qualify ambiguous columns in joins.','Test with duplicate and NULL values.'],
    ['Putting aggregate conditions in WHERE.','Forgetting a join condition.','Assuming COUNT(column) counts NULLs.'],
    'WHERE chooses rows; HAVING chooses groups.',
    [['What does COUNT(*) count?','All result rows, including rows containing NULL fields.','It counts rows rather than non-null values of one column.'],['Why can a join return too many rows?','The match condition may be missing or non-unique.','Each matching pair becomes an output row.']]);

  cs('Computer Networks',
    'A network is layered cooperation: each layer solves a bounded communication problem and offers a service to the layer above.',
    'Layer reasoning connects devices, addressing, protocols and troubleshooting instead of turning them into isolated definitions.',
    [['Scope and topology','LAN/WAN describe reach; topology describes how nodes and links are arranged.','Star nodes → central switch; mesh → multiple paths.'],['Addressing','MAC identifies a local interface; IP supports routed delivery; ports identify an application endpoint.','Device → IP host → port process.'],['Layered delivery','Application data is encapsulated with transport, network and link information.','Data ↓ headers added → bits; receiver reverses.']],
    ['A switch forwards frames within a LAN; a router forwards packets between networks.','Protocols define message format and behaviour.','Bandwidth is capacity; latency is delay.'],
    { problem:'A school LAN must reach a server on another network. Which devices act where?', steps:['The host sends a frame toward its default gateway.','The local switch forwards it within the LAN.','The router reads the destination IP and selects the next network path.'], answer:'Switching handles local frame delivery; routing carries the IP packet between networks.', check:'Do not claim the switch chooses the internet route.' },
    ['Answer scenarios by tracing a packet end to end.','Keep address type matched to layer.','Distinguish physical topology from geographic scope.'],
    ['Calling every network device a router.','Equating high bandwidth with low latency.'],
    'Switch within; route between; ports reach the program.',
    [['Why are layers useful?','They isolate responsibilities and permit interoperable change.','A new link technology need not redesign the application protocol.'],['Can two services share one IP address?','Yes, by using different ports.','The IP reaches the host; the transport port identifies the process.']]);

  cs('Data Communication',
    'Reliable communication depends on matching signal, medium, direction, timing and error strategy to the task.',
    'Design questions become manageable when evaluated by distance, interference, capacity, mobility and cost.',
    [['Communication model','Sender encodes a message, a channel carries a signal, and receiver decodes it under a protocol.','Source → encoder → medium/noise → decoder → destination.'],['Direction modes','Simplex is one-way, half-duplex alternates, full-duplex supports simultaneous directions.','→ ; ↔ taking turns ; ⇄ simultaneous.'],['Media trade-offs','Copper, fibre and wireless differ in capacity, attenuation, interference, security and deployment.','Choice matrix: distance × speed × environment × cost.']],
    ['Noise can alter signals; protocols detect or correct errors.','Fibre resists electromagnetic interference and supports long high-capacity links.','Transmission rate and useful throughput are not identical.'],
    { problem:'Choose a medium for a high-speed link between buildings in an electrically noisy campus.', steps:['Need long reach and high capacity.','Electrical noise makes copper vulnerable.','A fixed route makes cable installation acceptable.'], answer:'Optical fibre is the strongest choice because it offers high bandwidth, low attenuation and immunity to electromagnetic interference.', check:'The choice follows requirements rather than “fibre is always best”.' },
    ['Use a criteria table for medium-selection answers.','State units for data rate.','Separate signal impairment from protocol recovery.'],
    ['Choosing solely by headline speed.','Confusing full-duplex with two physical cables.'],
    'Good links fit the environment, not merely the advertisement.',
    [['Why can throughput be below bandwidth?','Overheads, congestion, errors and delays consume capacity.','Raw link rate is not all delivered as useful application data.'],['When is wireless preferable despite interference?','When mobility or difficult cabling dominates the design.','Engineering balances constraints rather than maximising one metric.']]);

  cs('Security Aspects',
    'Security is risk management across confidentiality, integrity and availability; no single tool can secure careless design and behaviour.',
    'Students must diagnose threats and choose proportionate controls, not merely memorise malware names.',
    [['CIA goals','Confidentiality limits disclosure, integrity prevents unauthorised change, availability keeps services usable.','CIA triangle around valuable data.'],['Authentication and authorisation','Authentication proves identity; authorisation decides permitted actions.','Who are you? → what may you do?'],['Layered defence','Updates, least privilege, backups, encryption and awareness cover different failure modes.','Multiple barriers; no single point of trust.']],
    ['Hashing checks integrity or stores password verifiers; encryption is reversible with a key.','Phishing attacks judgement as well as technology.','Backups support recovery but must be tested and protected.'],
    { problem:'A student receives an urgent login link asking for credentials. What should they do?', steps:['Do not open the link or submit data.','Reach the service through a known bookmark/app and inspect account alerts.','Report the message; change credentials if exposure occurred and enable MFA.'], answer:'Verify through an independent trusted channel and treat the message as phishing.', check:'The response both prevents compromise and supports recovery/reporting.' },
    ['Map each control to a named risk.','Differentiate prevention, detection and recovery.','Use least privilege in scenario answers.'],
    ['Saying encryption prevents every attack.','Reusing a strong password across sites.'],
    'Verify identity, minimise privilege, prepare recovery.',
    [['Why is MFA useful?','A stolen password alone is insufficient.','Independent factors reduce the chance one compromise grants access.'],['Are backups protection against ransomware?','They support recovery if isolated and tested.','Online writable backups may be encrypted by the same attack.']]);

  cs('Project Based Learning',
    'A successful computing project starts with a measurable user problem, then iterates through requirements, data design, implementation and evidence-based testing.',
    'Projects are judged by reasoning and reliability as much as by interface polish.',
    [['Problem definition','A user, need and success criterion prevent feature-first development.','User pain → measurable outcome.'],['Modular design','Split input, validation, processing, storage and presentation into testable responsibilities.','UI → service logic → data layer.'],['Verification','Normal, boundary and invalid cases show whether requirements are truly met.','Requirement ↔ test case ↔ observed result.']],
    ['Keep a data dictionary and schema.','Validate input at system boundaries.','Document sources, privacy decisions, limitations and future work.'],
    { problem:'Design a library-loan project’s minimum viable workflow.', steps:['Define users and rules: issue, return, due date, availability.','Model BOOK, MEMBER and LOAN with keys.','Build one end-to-end issue/return path and test duplicate issue, missing member and overdue return.'], answer:'A small verified transaction flow is a stronger MVP than many disconnected screens.', check:'Every feature traces to a requirement and test.' },
    ['Demonstrate a complete workflow, not isolated forms.','Include test evidence and explain design choices.','Use synthetic data where real personal data is unnecessary.'],
    ['Starting with colours before requirements.','Keeping all logic in one event handler.','Claiming “tested” without cases and results.'],
    'Problem → requirement → design → test → evidence → improve.',
    [['What makes a requirement testable?','It states observable behaviour and conditions.','“Easy to use” is vague; “complete issue in three validated steps” can be checked.'],['Why build an MVP?','It exposes core design risks early.','Feedback on a working path is more useful than assumptions about a large unfinished system.']]);
}());
