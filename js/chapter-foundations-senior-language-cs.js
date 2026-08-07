(function () {
  'use strict';

  const HM = window.HM = window.HM || {};
  const root = HM.chapterFoundations = HM.chapterFoundations || {};
  const normalizedKey = (subject, title) => `${subject}|${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const flow = (nodes, edges) => ({
    type: 'flow',
    nodes: nodes.map(([id, label]) => ({ id, label })),
    edges: edges.map(([from, to, label = '']) => ({ from, to, label }))
  });
  const add = (subject, title, id, remember, newWords, firstExample, visual) => {
    const value = {
      title,
      subject,
      remember,
      newWords: newWords.map(([term, plain]) => ({ term, plain })),
      firstExample: { prompt: firstExample[0], steps: firstExample[1], answer: firstExample[2] },
      visual
    };
    root[id] = value;
    root[`${subject}::${title}`] = value;
    root[normalizedKey(subject, title)] = value;
  };
  const english = (title, id, remember, words, example, visual) => add('English Core', title, id, remember, words, example, visual);
  const cs = (title, id, remember, words, example, visual) => add('Computer Science', title, id, remember, words, example, visual);

  english('The Last Lesson', 'book-g12-english-1-1',
    ['You already know that losing something can make its value suddenly clear.', 'You also know that a language carries family stories, jokes, songs and shared memories.'],
    [['occupation', 'control of a place by a foreign power'], ['identity', 'the qualities and culture that tell a person or group who they are'], ['irony', 'a gap between what is expected and what actually happens']],
    ['Why does Franz begin to value grammar during the final lesson?', ['The order from Berlin means he will no longer be taught French.', 'What looked like a boring school task now represents a freedom being taken away.', 'His regret changes attention into respect.'], 'Franz values grammar because the threatened loss of French reveals that language is part of his identity and freedom.'],
    flow([['neglect', 'French is neglected'], ['order', 'Berlin removes French'], ['loss', 'Loss becomes real'], ['resist', 'Language becomes resistance']], [['neglect', 'order', 'occupation'], ['order', 'loss', 'awakens Franz'], ['loss', 'resist', 'protect identity']]));

  english('Lost Spring', 'book-g12-english-1-2',
    ['You already know that children need school, play, safety and time to grow.', 'A choice is not fully free when hunger, debt or social rules leave no practical alternative.'],
    [['child labour', 'work that harms a child or keeps the child from education'], ['exploitation', 'gaining from another person while treating them unfairly'], ['hereditary', 'passed from one generation to the next']],
    ['Why is Saheb carrying a steel canister less freely than he carried his plastic bag?', ['The bag belonged to him while he searched and moved on his own.', 'The canister belongs to the tea-stall owner and represents fixed duty.', 'A wage improves food security but also places his time under another person’s control.'], 'The canister shows that Saheb has gained a job but lost some independence.'],
    flow([['poverty', 'Poverty and caste'], ['work', 'Child enters work'], ['school', 'School and play are lost'], ['cycle', 'Poverty continues']], [['poverty', 'work', 'forces'], ['work', 'school', 'replaces'], ['school', 'cycle', 'limits future choices']]));

  english('Deep Water', 'book-g12-english-1-3',
    ['You already know that the body can remember danger even after the danger has ended.', 'A difficult skill becomes manageable when it is split into small, repeatable parts.'],
    [['trauma', 'a deeply frightening event whose effects continue later'], ['panic', 'sudden fear that makes clear thinking and body control difficult'], ['exposure', 'careful, gradual contact with something feared']],
    ['How does the instructor help Douglas instead of simply telling him to be brave?', ['He makes water safe with a belt and rope.', 'Douglas practises breathing, kicking and strokes separately.', 'Repeated safe experience teaches his body that water does not always mean danger.'], 'The instructor rebuilds skill and trust step by step, replacing panic with controlled experience.'],
    flow([['event', 'Near-drowning'], ['fear', 'Fear spreads to all water'], ['practice', 'Small guided practices'], ['test', 'Independent tests'], ['choice', 'Fear stops controlling choices']], [['event', 'fear'], ['fear', 'practice', 'faced gradually'], ['practice', 'test'], ['test', 'choice']]));

  english('The Rattrap', 'book-g12-english-1-4',
    ['You already know how bait attracts an animal into a trap.', 'You also know that people often behave better when someone trusts them to be better.'],
    [['metaphor', 'an idea explained by saying it is another thing'], ['temptation', 'a strong pull toward something attractive but wrong'], ['redemption', 'changing after wrongdoing and making amends']],
    ['How is the peddler caught in his own rattrap idea?', ['The crofter’s money becomes attractive bait.', 'He steals it and then becomes lost and afraid in the forest.', 'His choice traps him in guilt and danger just as bait traps a rat.'], 'The world-rattrap metaphor becomes real through the peddler’s theft and fear.'],
    flow([['bait', 'Money as bait'], ['theft', 'Peddler steals'], ['trap', 'Fear and forest trap him'], ['respect', 'Edla gives respect'], ['return', 'He returns the money']], [['bait', 'theft'], ['theft', 'trap'], ['trap', 'respect', 'unexpected kindness'], ['respect', 'return', 'restores dignity']]));

  english('Indigo', 'book-g12-english-1-5',
    ['You already know that a bully becomes stronger when everyone is too afraid to speak.', 'Reliable facts can turn many separate complaints into proof.'],
    [['civil disobedience', 'peacefully refusing an unjust order while accepting legal consequences'], ['tinkathia', 'the system that forced Champaran peasants to grow indigo on part of their land'], ['self-reliance', 'the ability to solve problems without depending completely on an outsider']],
    ['Why did a 25-percent refund matter when it was not the full amount?', ['The planters had always acted as if peasants had no power.', 'Agreeing to repay any amount meant their authority had been challenged.', 'The peasants lost fear and later recovered control of the land.'], 'The refund’s symbolic victory was larger than its cash value because it broke the planters’ prestige.'],
    flow([['fear', 'Peasants live in fear'], ['facts', 'Testimony builds evidence'], ['law', 'Gandhi accepts court risk'], ['settle', 'Planters refund'], ['agency', 'Peasants gain confidence']], [['fear', 'facts', 'organise'], ['facts', 'law'], ['law', 'settle'], ['settle', 'agency']]));

  english('Poets and Pancakes', 'book-g12-english-1-6',
    ['You already know that a shiny final product can hide messy work behind it.', 'Workplaces have unwritten ranks, rivalries and misunderstandings as well as official job titles.'],
    [['satire', 'humour that exposes foolishness or unfairness'], ['hierarchy', 'a system in which people have different levels of power'], ['anecdote', 'a short account of a real incident used to make a larger point']],
    ['What does pancake make-up reveal about Gemini Studios?', ['Films display smooth, glamorous faces.', 'The make-up room uses hot lights and thick artificial paste.', 'The funny contrast exposes how manufactured screen beauty is.'], 'Pancake make-up punctures the glamour of cinema by showing the uncomfortable labour that creates it.'],
    flow([['glamour', 'Screen glamour'], ['backstage', 'Messy backstage work'], ['people', 'Egos and hierarchy'], ['humour', 'Narrator’s dry humour'], ['critique', 'Studio culture exposed']], [['glamour', 'backstage', 'contrast'], ['backstage', 'people'], ['people', 'humour'], ['humour', 'critique']]));

  english('The Interview', 'book-g12-english-1-7',
    ['You already know that a thoughtful question can reveal useful ideas.', 'You also know that personal questions can cross a boundary and make someone feel exposed.'],
    [['interview', 'a planned conversation in which questions are used to learn from a person'], ['intrusion', 'entering someone’s private space without enough permission'], ['interstice', 'a small gap between larger activities']],
    ['How does the Umberto Eco section show a good use of the interview?', ['The questions focus on how Eco thinks and works.', 'His answers explain his use of small empty times and the link between his books.', 'The reader gains insight without needing private gossip.'], 'It shows that prepared, respectful questions can reveal a person’s ideas rather than reduce the person to a celebrity.'],
    flow([['question', 'Question asked'], ['power', 'Interviewer holds power'], ['choice', 'Gossip or genuine inquiry'], ['result', 'Intrusion or insight']], [['question', 'power'], ['power', 'choice'], ['choice', 'result']]));

  english('Going Places', 'book-g12-english-1-8',
    ['You already know the difference between hoping something happens and having evidence that it happened.', 'Dreams can motivate action, but an invented certainty can make disappointment harder.'],
    [['fantasy', 'an imagined situation that is not supported by reality'], ['aspiration', 'a strong hope to achieve something'], ['socio-economic', 'connected to money, work and position in society']],
    ['Why is Sophie’s wait for Danny Casey important?', ['She has turned an imagined meeting into an expected promise.', 'The empty place tests her story against reality.', 'Even after he does not come, she returns to the beautiful image in her mind.'], 'The wait shows the cost of treating fantasy as fact: Sophie experiences real pain from an unsupported belief.'],
    flow([['limits', 'Limited opportunities'], ['dream', 'Large dream'], ['story', 'Dream becomes a story'], ['belief', 'Story feels true'], ['pain', 'Reality brings disappointment']], [['limits', 'dream', 'escape'], ['dream', 'story'], ['story', 'belief', 'repetition'], ['belief', 'pain']]));

  english('My Mother at Sixty-six', 'book-g12-english-1-9',
    ['You already know that seeing an older loved one tired can suddenly remind you that time passes.', 'Writers often place opposite images together so each becomes clearer.'],
    [['simile', 'a comparison using words such as like or as'], ['contrast', 'placing different things together to show their difference'], ['mortality', 'the fact that every living being will die']],
    ['Why are young trees and children shown after the ageing mother?', ['The mother is pale, still and sleepy.', 'The outside images seem young, active and full of life.', 'Their energy makes the mother’s ageing more visible.'], 'The contrast turns a quiet car journey into a sharp awareness of ageing and possible separation.'],
    flow([['notice', 'Speaker notices mother'], ['fear', 'Old fear of loss'], ['outside', 'Looks at young life'], ['airport', 'Sees mother as winter moon'], ['smile', 'Controls pain with a smile']], [['notice', 'fear'], ['fear', 'outside', 'avoidance'], ['outside', 'airport'], ['airport', 'smile']]));

  english('Keeping Quiet', 'book-g12-english-1-10',
    ['You already know that pausing before reacting can prevent harm.', 'Rest can look inactive while the body is repairing and preparing to move again.'],
    [['introspection', 'looking carefully at your own thoughts and actions'], ['stillness', 'a temporary state without movement or noise'], ['renewal', 'becoming strong, fresh or active again']],
    ['Why does the poet compare quietness with the Earth?', ['In winter or still moments, Earth may appear inactive.', 'Life and change continue beneath that appearance.', 'Therefore a human pause can contain reflection and a new beginning rather than death.'], 'Earth proves that stillness can be alive and renewing, so the poem asks for a pause, not permanent inactivity.'],
    flow([['rush', 'Busy harmful activity'], ['pause', 'Shared brief pause'], ['notice', 'Notice self and others'], ['choose', 'Choose less harmful action'], ['renew', 'Return renewed']], [['rush', 'pause', 'interrupt'], ['pause', 'notice'], ['notice', 'choose'], ['choose', 'renew']]));

  english('A Thing of Beauty', 'book-g12-english-1-11',
    ['You already know that a lovely place, song or memory can comfort you more than once.', 'Comfort does not make a hard problem unreal; it can give strength to face it.'],
    [['despondence', 'a state of deep discouragement'], ['pall', 'a dark covering; here, the gloom over human life'], ['immortal', 'not dying or not coming to an end']],
    ['How can a beautiful thing increase in loveliness after the moment has passed?', ['The experience stays in memory.', 'Later situations can give the memory new meaning.', 'The comfort can therefore return and even deepen.'], 'Beauty increases through memory and renewed understanding, not because the physical object must grow.'],
    flow([['gloom', 'Life contains gloom'], ['beauty', 'Beauty is noticed'], ['memory', 'Beauty stays in memory'], ['comfort', 'Memory gives comfort'], ['bond', 'Life feels worth holding']], [['gloom', 'beauty', 'countered by'], ['beauty', 'memory'], ['memory', 'comfort'], ['comfort', 'bond']]));

  english('A Roadside Stand', 'book-g12-english-1-12',
    ['You already know how it feels to be ignored while asking for a fair chance.', 'Help is not truly helpful if it removes the other person’s voice and control.'],
    [['paternalism', 'controlling people while claiming it is for their own good'], ['satire', 'humour or sharp language used to criticise'], ['disparity', 'a large and unfair difference']],
    ['Why do the passing cars anger the speaker?', ['The villagers want customers and a share of the cash economy.', 'Motorists notice only a spoiled view, wrong turn or personal need.', 'The people in the stand become invisible to those enjoying prosperity.'], 'The cars reveal economic inequality because wealth passes close to rural need without recognising it.'],
    flow([['need', 'Rural families need income'], ['stand', 'They build a roadside stand'], ['cars', 'Prosperous cars pass'], ['ignore', 'Drivers ignore the need'], ['control', 'False helpers offer control']], [['need', 'stand'], ['stand', 'cars'], ['cars', 'ignore'], ['ignore', 'control', 'instead of fair exchange']]));

  english('Aunt Jennifer’s Tigers', 'book-g12-english-1-13',
    ['You already know that art can show the life or feeling an artist wishes to have.', 'An object can feel “heavy” because of what it represents, not only because of its physical weight.'],
    [['patriarchy', 'a social system in which men hold unfair power over women'], ['ordeal', 'a long and painful experience'], ['symbol', 'a thing that stands for a larger idea']],
    ['Why is the wedding band described as heavy?', ['A ring itself is small and light.', 'Aunt Jennifer’s marriage has placed fear and pressure on her.', 'The band therefore carries the symbolic weight of unequal power.'], 'The heavy band is a symbol of marital oppression, not a statement about its physical mass.'],
    flow([['burden', 'Aunt lives under burden'], ['hands', 'Her hands struggle'], ['art', 'She creates tigers'], ['tigers', 'Tigers move without fear'], ['endure', 'Art outlives its maker']], [['burden', 'hands'], ['hands', 'art'], ['art', 'tigers', 'imagines freedom'], ['tigers', 'endure']]));

  english('The Third Level', 'book-g12-english-2-1',
    ['You already know that people may daydream about a simpler time when the present feels stressful.', 'A mystery can be designed to keep two explanations possible.'],
    [['escapism', 'using imagination to get away from an unpleasant reality'], ['nostalgia', 'a warm longing for an earlier time, often remembering it as better than it was'], ['ambiguity', 'a situation with more than one reasonable meaning']],
    ['Is the third level real or imagined?', ['Charley’s stress and Sam’s explanation support a waking dream.', 'Old clothes, currency and the later letter support a supernatural reading.', 'The story never removes either set of clues.'], 'The safest answer keeps both readings and explains that either one shows a longing to escape modern anxiety.'],
    flow([['stress', 'Modern stress'], ['wish', 'Wish for a peaceful past'], ['level', 'Third level appears'], ['read1', 'Psychological reading'], ['read2', 'Time-travel reading']], [['stress', 'wish'], ['wish', 'level'], ['level', 'read1'], ['level', 'read2']]));

  english('The Tiger King', 'book-g12-english-2-2',
    ['You already know that trying too hard to prevent a prediction can sometimes cause the predicted result.', 'Satire makes us laugh at a powerful person so that we can see a serious misuse of power.'],
    [['prophecy', 'a prediction about what will happen'], ['satire', 'humour used to expose foolishness or wrongdoing'], ['dramatic irony', 'when readers know an important fact that a character does not']],
    ['Why is the wooden tiger a powerful ending?', ['The king believes he has defeated one hundred real tigers.', 'Readers know his shot did not kill the hundredth tiger.', 'A tiny splinter from a toy tiger causes the infection that kills him.'], 'The toy reverses expectation and completes the prophecy through irony: the great hunter is defeated by a harmless-looking copy.'],
    flow([['fear', 'Prophecy creates fear'], ['power', 'King uses state power'], ['hunt', 'Kills tigers'], ['false', 'Claims false victory'], ['toy', 'Toy tiger fulfils prophecy']], [['fear', 'power'], ['power', 'hunt'], ['hunt', 'false'], ['false', 'toy', 'ironic reversal']]));

  english('Journey to the End of the Earth', 'book-g12-english-2-3',
    ['You already know that fossils and ice can preserve clues about the past.', 'In an ecosystem, a change to a tiny organism can affect much larger animals and processes.'],
    [['Gondwana', 'the ancient supercontinent that joined several present-day lands'], ['climate archive', 'a natural record, such as ice, that stores evidence of earlier climates'], ['phytoplankton', 'tiny water organisms that use sunlight and form the base of many ocean food webs']],
    ['Why does the chapter spend time on phytoplankton?', ['They are tiny, so they look unimportant.', 'They take in carbon dioxide through photosynthesis and feed marine systems.', 'Damage to them can therefore affect both food webs and climate.'], 'Phytoplankton prove the chapter’s systems idea: a small living part can have a planetary effect.'],
    flow([['past', 'Gondwana and deep time'], ['ice', 'Ice stores evidence'], ['warming', 'Human-driven warming'], ['plankton', 'Phytoplankton affected'], ['planet', 'Global systems change']], [['past', 'ice'], ['ice', 'warming', 'reveals speed of change'], ['warming', 'plankton'], ['plankton', 'planet']]));

  english('The Enemy', 'book-g12-english-2-4',
    ['You already know that one person can have duties that pull in opposite directions.', 'Treating an injured person often makes labels such as stranger or enemy feel less simple.'],
    [['dilemma', 'a choice in which every option has a serious cost'], ['medical ethics', 'principles that guide care, safety and a doctor’s duty'], ['patriotism', 'loyalty and responsibility toward one’s country']],
    ['Why does Sadao operate on the prisoner although this is dangerous?', ['As a citizen, he knows the man belongs to an enemy army.', 'As a doctor, he sees a dying patient whom his skill can save.', 'Immediate medical duty and human compassion outweigh the label at that moment.'], 'Sadao operates because professional and human responsibility become stronger than national hostility when the wounded man is before him.'],
    flow([['find', 'Enemy soldier found'], ['roles', 'Doctor and citizen conflict'], ['treat', 'Sadao and Hana treat him'], ['general', 'General fails morally'], ['escape', 'Sadao enables escape']], [['find', 'roles'], ['roles', 'treat'], ['treat', 'general'], ['general', 'escape']]));

  english('On the Face of It', 'book-g12-english-2-5',
    ['You already know that repeated unkind reactions can change how a person expects everyone to behave.', 'A fact about appearance is only one part of a person, not a complete identity.'],
    [['stigma', 'a negative label that causes unfair judgement'], ['internalise', 'to accept other people’s judgement as part of your own belief'], ['agency', 'the ability to make your own choices and act on them']],
    ['Why is Mr Lamb’s open garden important?', ['The garden contains many different living things without rejecting them.', 'Its gate is open while Derry has closed himself away.', 'Entering and returning to it show Derry trying participation instead of isolation.'], 'The garden is a model of an open, inclusive life in which difference belongs rather than being hidden.'],
    flow([['gaze', 'Others stare or pity'], ['belief', 'Derry expects rejection'], ['isolate', 'He withdraws'], ['dialogue', 'Mr Lamb widens his view'], ['return', 'Derry chooses to return']], [['gaze', 'belief'], ['belief', 'isolate'], ['isolate', 'dialogue', 'challenged by'], ['dialogue', 'return']]));

  english('Memories of Childhood', 'book-g12-english-2-6',
    ['You already know that a rule can look normal to one group while hurting another group every day.', 'Learning why an insult happens can turn confusion into a plan to resist it.'],
    [['assimilation', 'forcing a group to give up its culture and become like the dominant group'], ['caste discrimination', 'unfair treatment based on a caste assigned by birth'], ['resistance', 'action that refuses or challenges unfair control']],
    ['How can education be harmful in one memoir and helpful in the other?', ['Zitkala-Sa’s school uses education to erase her culture and control her body.', 'Bama’s brother recommends learning as a way to gain power against caste exclusion.', 'The difference is who controls education and whether it removes or strengthens agency.'], 'Education is not automatically liberating: it oppresses when forced for erasure and empowers when used by the learner to challenge injustice.'],
    flow([['event', 'Child sees or suffers humiliation'], ['learn', 'Understands the system'], ['anger', 'Pain becomes clear anger'], ['strategy1', 'Protect cultural identity'], ['strategy2', 'Use learning to advance']], [['event', 'learn'], ['learn', 'anger'], ['anger', 'strategy1'], ['anger', 'strategy2']]));

  cs('Exception Handling in Python', 'book-g12-cs-1',
    ['You already know that a program normally follows statements from top to bottom.', 'You also know that input can be wrong or a file can be missing even when the program’s main idea is correct.'],
    [['exception', 'an object that reports a problem during program execution'], ['handler', 'code that responds to a particular kind of exception'], ['finally', 'a block that runs before leaving the try statement, whether or not failure occurred']],
    ['Trace: try: print(8/int("0")); except ValueError: print("V"); except ZeroDivisionError: print("Z"); finally: print("F").', ['int("0") succeeds and gives 0.', '8 divided by 0 raises ZeroDivisionError, so Z is printed.', 'finally always runs next, so F is printed.'], 'The output is Z and then F.'],
    flow([['try', 'Run try block'], ['fail', 'Exception occurs?'], ['match', 'Find matching except'], ['else', 'No failure: run else'], ['finally', 'Run finally']], [['try', 'fail'], ['fail', 'match', 'yes'], ['fail', 'else', 'no'], ['match', 'finally'], ['else', 'finally']]));

  cs('File Handling in Python', 'book-g12-cs-2',
    ['You already know that a variable disappears when a program ends.', 'A file keeps data on storage so a later run can read it again.'],
    [['file mode', 'the rule that says whether a file is read, replaced, appended or handled as binary'], ['file pointer', 'the current position from which the next read or write happens'], ['serialization', 'turning a data object into a form that can be stored and rebuilt']],
    ['Append the line "Asha,92" without deleting existing marks.', ['Choose append text mode: a.', 'Use a with block so the file closes even if an error occurs.', 'Write the record plus a newline because write does not add one.'], 'with open("marks.csv", "a") as f: f.write("Asha,92\\n")'],
    flow([['program', 'Python value'], ['encode', 'Convert to text or bytes'], ['file', 'Store in file'], ['read', 'Read later'], ['value', 'Parse back to value']], [['program', 'encode'], ['encode', 'file'], ['file', 'read'], ['read', 'value']]));

  cs('Stack', 'book-g12-cs-3',
    ['You already know a pile of plates: the last plate placed on top is the first one you can remove.', 'A Python list can add and remove at its right-hand end.'],
    [['LIFO', 'last in, first out'], ['push', 'add an item to the top of a stack'], ['underflow', 'trying to remove or inspect an item when the stack is empty']],
    ['Start with []; PUSH A; PUSH B; POP; PUSH C. What remains?', ['After two pushes the stack is [A, B], with B on top.', 'POP removes B, leaving [A].', 'PUSH C gives [A, C].'], 'The stack is [A, C], and C is on top.'],
    flow([['pushA', 'PUSH A'], ['pushB', 'PUSH B above A'], ['pop', 'POP removes B'], ['pushC', 'PUSH C above A']], [['pushA', 'pushB'], ['pushB', 'pop'], ['pop', 'pushC']]));

  cs('Queue', 'book-g12-cs-4',
    ['You already know a fair waiting line: the person who arrived first is served first.', 'A queue must keep the entry end separate from the exit end.'],
    [['FIFO', 'first in, first out'], ['enqueue', 'add an item at the rear of a queue'], ['dequeue', 'remove the item at the front of a queue']],
    ['Start with []; ENQUEUE A; ENQUEUE B; DEQUEUE; ENQUEUE C. What remains?', ['After two arrivals the queue is [A, B], with A at the front.', 'DEQUEUE removes A, leaving [B].', 'ENQUEUE C adds at the rear, giving [B, C].'], 'The queue is [B, C]; B leaves next.'],
    flow([['arrive', 'Item arrives'], ['rear', 'Add at rear'], ['wait', 'Wait in order'], ['front', 'Remove from front']], [['arrive', 'rear'], ['rear', 'wait'], ['wait', 'front']]));

  cs('Sorting', 'book-g12-cs-5',
    ['You already sort books by title or numbers from smallest to largest.', 'An algorithm needs a repeatable rule that works even when the list is long.'],
    [['inversion', 'a pair that is in the wrong order'], ['pass', 'one complete journey through the current working part of a list'], ['stable sort', 'a sort that keeps equal-key items in their original relative order']],
    ['Show the first bubble-sort pass on [4, 1, 3, 2].', ['Compare 4 and 1; swap: [1, 4, 3, 2].', 'Compare 4 and 3; swap: [1, 3, 4, 2].', 'Compare 4 and 2; swap: [1, 3, 2, 4].'], 'After the first complete pass, [1, 3, 2, 4]; the largest value is settled at the end.'],
    flow([['list', 'Unsorted list'], ['compare', 'Compare using a rule'], ['move', 'Swap, select or shift'], ['region', 'Sorted region grows'], ['done', 'No disorder remains']], [['list', 'compare'], ['compare', 'move'], ['move', 'region'], ['region', 'compare', 'repeat'], ['region', 'done', 'complete']]));

  cs('Searching', 'book-g12-cs-6',
    ['You already search a small list by checking items one by one.', 'In a sorted list, the middle value tells you which entire half cannot contain the target.'],
    [['linear search', 'checking candidates one after another'], ['binary search', 'repeatedly halving a sorted candidate range'], ['invariant', 'a fact that remains true during every step of an algorithm']],
    ['Find 23 in [5, 11, 18, 23, 31] with binary search.', ['Middle is 18; 23 is larger, so discard 5, 11 and 18.', 'Remaining range is [23, 31]; its middle under integer indexing is 23.', 'The target is found at original index 3.'], 'Binary search finds 23 after two comparisons because the list is sorted.'],
    flow([['range', 'Sorted candidate range'], ['mid', 'Check middle'], ['equal', 'Equal? Found'], ['half', 'Otherwise discard impossible half']], [['range', 'mid'], ['mid', 'equal', 'yes'], ['mid', 'half', 'no'], ['half', 'range', 'repeat']]));

  cs('Understanding Data', 'book-g12-cs-7',
    ['You already collect facts such as marks, temperatures or favourite sports.', 'A table becomes useful only when each value has a clear meaning, unit and owner.'],
    [['data', 'recorded values or observations'], ['information', 'data explained in context so it answers a question'], ['bias', 'a systematic unfair tilt in collection or interpretation']],
    ['A survey of favourite school lunches asks only the football team. What is wrong?', ['The question concerns all students.', 'The football team is only one special group and may have different habits.', 'The sample is not representative, so the conclusion may be biased.'], 'The collection method creates sampling bias; survey a fair cross-section of the whole school.'],
    flow([['question', 'Ask a clear question'], ['collect', 'Collect relevant data'], ['clean', 'Fix quality problems'], ['analyse', 'Compare and summarise'], ['meaning', 'Interpret with limits']], [['question', 'collect'], ['collect', 'clean'], ['clean', 'analyse'], ['analyse', 'meaning']]));

  cs('Database Concepts', 'book-g12-cs-8',
    ['You already use tables with rows and columns.', 'An ID number is safer than a name when two people can share the same name.'],
    [['primary key', 'a chosen field or field set that uniquely identifies each row'], ['foreign key', 'a field that points to a key in another table'], ['redundancy', 'storing the same fact in several places unnecessarily']],
    ['Design the link between Student(student_id, name) and Result(student_id, subject, mark).', ['Student.student_id uniquely identifies each student, so it is the primary key.', 'Result.student_id points to the matching Student row, so it is a foreign key.', 'The student name stays in Student instead of being repeated for every result.'], 'The shared student_id creates the relationship while avoiding repeated names.'],
    flow([['student', 'Student row'], ['pk', 'Primary key: student_id'], ['fk', 'Result foreign key'], ['result', 'Many result rows']], [['student', 'pk'], ['pk', 'fk', 'referenced by'], ['fk', 'result']]));

  cs('Structured Query Language', 'book-g12-cs-9',
    ['You already filter a list by a condition and choose which columns to display.', 'SQL applies the same ideas to tables, then adds grouping and links between tables.'],
    [['query', 'a precise request for data or a change to data'], ['aggregate', 'a calculation such as COUNT, SUM or AVG over several rows'], ['join', 'combining related rows from different tables']],
    ['Show each class whose average mark is above 80.', ['FROM and WHERE form the usable rows.', 'GROUP BY class forms one group per class.', 'HAVING AVG(mark) > 80 keeps only qualifying groups.'], 'SELECT class, AVG(mark) FROM Result GROUP BY class HAVING AVG(mark) > 80;'],
    flow([['from', 'FROM and JOIN build rows'], ['where', 'WHERE filters rows'], ['group', 'GROUP BY forms groups'], ['having', 'HAVING filters groups'], ['select', 'SELECT returns columns']], [['from', 'where'], ['where', 'group'], ['group', 'having'], ['having', 'select']]));

  cs('Computer Networks', 'book-g12-cs-10',
    ['You already know that a postal address helps a letter reach the right building.', 'Networks also use addresses and agreed rules to move pieces of data to the correct device and program.'],
    [['protocol', 'an agreed set of communication rules'], ['router', 'a device that forwards packets between different networks'], ['DNS', 'the system that changes a domain name into an IP address']],
    ['What happens before a browser can contact example.com?', ['DNS finds the IP address linked to the name.', 'The device sends data through its local network toward a router.', 'Routers forward packets across networks to the destination.'], 'Name resolution comes first; local forwarding and routing then carry packets to the server.'],
    flow([['app', 'Browser requests a name'], ['dns', 'DNS returns IP'], ['switch', 'Local network forwards'], ['router', 'Router crosses networks'], ['server', 'Server receives']], [['app', 'dns'], ['dns', 'switch'], ['switch', 'router'], ['router', 'server']]));

  cs('Data Communication', 'book-g12-cs-11',
    ['You already know that a message needs a sender, receiver and a path between them.', 'A noisy path can change information, so communication systems add checks.'],
    [['bandwidth', 'the capacity range of a communication channel'], ['packet switching', 'splitting data into units that share network links'], ['duplex', 'the rule describing which directions can transmit and when']],
    ['Is a walkie-talkie half-duplex or full-duplex?', ['Both people can transmit and receive.', 'Only one person speaks over the channel at a time.', 'They must take turns by pressing and releasing the talk control.'], 'A walkie-talkie is half-duplex because both directions are possible but not simultaneously.'],
    flow([['source', 'Sender creates data'], ['encode', 'Data becomes a signal'], ['medium', 'Signal crosses medium'], ['check', 'Receiver checks errors'], ['message', 'Data is reconstructed']], [['source', 'encode'], ['encode', 'medium'], ['medium', 'check'], ['check', 'message']]));

  cs('Security Aspects', 'book-g12-cs-12',
    ['You already protect a home with locks, keys and a backup plan.', 'Digital security also needs several layers because one control can fail.'],
    [['authentication', 'proving who you are'], ['authorisation', 'deciding what an identified user may do'], ['encryption', 'using a key to turn readable data into protected unreadable form']],
    ['A thief learns your password. How can MFA still help?', ['The password supplies only the first proof of identity.', 'MFA asks for another proof, such as an authenticator code or security key.', 'Without the second factor, the stolen password alone is not enough.'], 'MFA reduces the damage of password theft by requiring an independent second proof.'],
    flow([['asset', 'Valuable data or service'], ['threat', 'Threat meets vulnerability'], ['prevent', 'Preventive control'], ['detect', 'Detect suspicious activity'], ['recover', 'Recover from damage']], [['asset', 'threat'], ['threat', 'prevent'], ['prevent', 'detect', 'if bypassed'], ['detect', 'recover']]));

  cs('Project Based Learning', 'book-g12-cs-13',
    ['You already solve problems better when you first ask what the user actually needs.', 'A small working solution teaches more than many unfinished features.'],
    [['requirement', 'a clear, testable statement of what a solution must do'], ['prototype', 'an early version built to test an idea'], ['boundary case', 'an input at the edge of what is allowed, such as zero or a maximum value']],
    ['A school wants a library project. What should happen before coding?', ['Observe how books are issued and returned and speak to users.', 'Define a narrow outcome, such as recording loans and identifying overdue books.', 'Write testable requirements and a small data design.'], 'Begin with the real workflow and measurable requirements; technology choice comes after the problem is understood.'],
    flow([['need', 'Real user need'], ['requirements', 'Testable requirements'], ['design', 'Data and module design'], ['build', 'Small working version'], ['test', 'Tests and user feedback'], ['improve', 'Improve and document']], [['need', 'requirements'], ['requirements', 'design'], ['design', 'build'], ['build', 'test'], ['test', 'improve'], ['improve', 'requirements', 'next iteration']]));
})();
