(function () {
  window.HM = window.HM || {};
  const root = window.HM.geniusContent = window.HM.geniusContent || {};
  root.school = root.school || {};

  const make = ({ insight, whyItMatters, concepts, mustKnow, worked, examTips, traps, memoryHook, guidedQuestions }) => ({
    insight,
    whyItMatters,
    concepts: concepts.map(([title, explain, visual]) => ({ title, explain, visual })),
    mustKnow,
    worked: { problem: worked[0], steps: worked[1], answer: worked[2], check: worked[3] },
    examTips,
    traps,
    memoryHook,
    guidedQuestions: guidedQuestions.map(([question, answer, explanation]) => ({ question, answer, explanation }))
  });

  const add = (subject, title, data) => { root.school[`${subject}::${title}`] = make(data); };

  const languageUnit = ({ insight, why, lenses, must, prompt, steps, answer, check, tips, traps, hook, questions }) => ({
    insight,
    whyItMatters: why,
    concepts: lenses,
    mustKnow: must,
    worked: [prompt, steps, answer, check],
    examTips: tips,
    traps,
    memoryHook: hook,
    guidedQuestions: questions
  });

  add('English', 'Learning Together', languageUnit({
    insight: 'Strong readers track how people learn from one another: a character begins with one belief, meets a challenge, listens or resists, and finishes changed.',
    why: 'Questions on theme, character and inference become one task when you can prove how an interaction causes change.',
    lenses: [
      ['Character change', 'Record the belief before the key event and the belief after it; the contrast reveals the lesson.', 'before belief → turning point → changed action'],
      ['Evidence ladder', 'Move from a precise event to what it reveals and then to the larger theme. Evidence is not a copied paragraph.', 'event → inference → theme'],
      ['Collaborative language', 'Notice questions, encouragement, correction and shared action. Each has a different effect on the group.', 'speaker + helpful move → group outcome']
    ],
    must: ['Theme is a transferable idea, not a one-word topic', 'A character trait needs an action as proof', 'A summary keeps cause and effect but removes decoration', 'Compare viewpoints before deciding who is more convincing'],
    prompt: 'A learner refuses help, fails once, accepts a classmate’s method, and later teaches it to someone else. State the theme with evidence.',
    steps: ['Identify the initial obstacle: pride blocks learning.', 'Locate the turning point: accepting a method after failure.', 'Use the final action—teaching another—as proof of lasting change.'],
    answer: 'Learning grows when humility allows knowledge to be shared; the learner’s shift from refusing help to teaching the method proves the change.',
    check: 'The answer names an idea, traces a change and uses two events rather than retelling everything.',
    tips: ['Use “At first… but after… therefore…” for character development', 'For comparison, give one similarity and one meaningful contrast', 'Keep a summary near 20–25% of the source length'],
    traps: ['Calling “friendship” a complete theme', 'Listing events without explaining their effect', 'Judging a character without textual evidence'],
    hook: 'Together means transfer: one mind changes because another mind reaches it.',
    questions: [['Why is teaching another person strong evidence of learning?', 'It shows understanding can be applied and communicated.', 'Repeating an answer may be memory; explaining a method demonstrates ownership.'], ['What should a theme statement avoid?', 'Names and plot-specific details.', 'A theme should remain true outside the particular story.']]
  }));

  add('English', 'Wit and Humour', languageUnit({
    insight: 'Humour is engineered through a gap—between what is expected and what actually happens, what is said and what is meant, or how a person sees themselves and how others see them.',
    why: 'Once you name the gap, “Why is this funny?” becomes an evidence-based explanation instead of “because it is amusing.”',
    lenses: [
      ['Comic gap', 'Write the reasonable expectation first, then the surprising result. Their distance creates humour.', 'expectation ⇢ surprise = comic effect'],
      ['Timing', 'Writers delay a key fact, repeat a pattern, then break it. Sentence length and placement can function like a pause.', 'setup → delay → punch'],
      ['Tone versus target', 'Gentle humour invites us to recognise human weakness; satire criticises a habit or institution.', 'laugh with ↔ laugh at → purpose']
    ],
    must: ['Irony is a meaningful contrast, not every coincidence', 'A punch line often reinterprets what came before', 'Exaggeration magnifies a trait to reveal it', 'Explain both technique and effect'],
    prompt: 'A boastful speaker gives a long lecture on punctuality and then discovers that they entered the meeting a day early. Explain the humour.',
    steps: ['Expectation: the lecturer appears expert and authoritative.', 'Reversal: their own misunderstanding is larger than the fault criticised.', 'Effect: situational irony exposes overconfidence without a direct lecture.'],
    answer: 'The humour comes from situational irony: the self-declared expert is not merely early but wrong about the date, so the boast collapses.',
    check: 'The explanation identifies the precise contrast and what it reveals about the speaker.',
    tips: ['Quote only the decisive word or action, then analyse it', 'Use “The reader expects…, whereas…”', 'Distinguish narrator tone from character attitude'],
    traps: ['Retelling the joke instead of explaining its construction', 'Calling every surprise irony', 'Ignoring whom the humour criticises'],
    hook: 'Humour lives in the gap: expectation on one side, reality on the other.',
    questions: [['How can repetition make a scene funny?', 'It creates a pattern that can intensify or be suddenly broken.', 'The reader predicts the next beat; fulfilment or reversal controls comic timing.'], ['When does humour become satire?', 'When the laughter points to a broader fault that needs criticism.', 'Satire uses amusement as a tool for social or moral examination.']]
  }));

  add('English', 'Dreams and Discoveries', languageUnit({
    insight: 'A discovery story is powered by disciplined curiosity: observation creates a question, a hypothesis predicts an answer, and evidence forces the thinker to revise.',
    why: 'This lens connects imaginative writing with scientific reasoning and helps separate a lucky event from a genuine discovery.',
    lenses: [
      ['Curiosity chain', 'A useful question grows from a noticed detail and leads to an action that can reveal more.', 'observe → wonder → test → revise'],
      ['Dream and obstacle', 'A dream matters when the character pays a cost, changes a plan or persists through uncertainty.', 'goal + obstacle + choice = journey'],
      ['Discovery language', 'Use tentative verbs for ideas and firm verbs for evidence: suspected, tested, observed, concluded.', 'claim strength ↔ evidence strength']
    ],
    must: ['Separate observation from interpretation', 'A hypothesis must be testable', 'Failure can provide evidence and redirect a plan', 'A conclusion should not claim more than the evidence supports'],
    prompt: 'A student notices that one windowsill plant bends more each day. Turn this into a four-step discovery account.',
    steps: ['Observation: the stem bends toward the brighter window.', 'Question and hypothesis: light direction may guide growth.', 'Test: rotate one plant while leaving another unchanged.', 'Conclusion: compare new growth and revise the hypothesis if needed.'],
    answer: 'The account moves from a visible pattern to a controlled comparison; it treats the result, not the original guess, as the basis of the conclusion.',
    check: 'Every step follows from the previous one and the test changes one important condition.',
    tips: ['In inference answers, mark fact and deduction separately', 'Use sequence connectives to make reasoning visible', 'For creative responses, give the dream a concrete obstacle and consequential choice'],
    traps: ['Presenting a guess as a fact', 'Making success effortless', 'Adding evidence that the text never supplies'],
    hook: 'Dream widely; test narrowly; conclude honestly.',
    questions: [['Why is an unsuccessful experiment still useful?', 'It eliminates or weakens an explanation.', 'Reliable inquiry changes direction when evidence disagrees.'], ['What makes a dream convincing in a narrative?', 'Specific choices and sacrifices.', 'Desire becomes meaningful through action under difficulty.']]
  }));

  add('English', 'Travel and Adventure', languageUnit({
    insight: 'Travel writing is not a list of places; it is a journey of perception in which setting applies pressure and the traveller notices, decides and changes.',
    why: 'This turns descriptive answers into purposeful writing and makes adventure plots easy to map.',
    lenses: [
      ['Journey arc', 'Track destination, obstacle, decision and consequence. Geography becomes plot when it changes available choices.', 'route → obstacle → decision → consequence'],
      ['Selective description', 'Choose sensory details that establish danger, wonder or contrast rather than decorating every noun.', 'detail → atmosphere → reader response'],
      ['Traveller viewpoint', 'Ask what the narrator notices first and what they overlook; selection reveals attitude and bias.', 'place filtered through observer']
    ],
    must: ['Setting can act like an opposing force', 'Adventure requires uncertainty and meaningful choice', 'First-person accounts are vivid but not automatically complete', 'Directions must use landmarks and ordered actions'],
    prompt: 'Improve “We crossed the forest and reached camp” into purposeful travel writing without making it long.',
    steps: ['Choose one obstacle that affects movement.', 'Add one sensory detail that signals atmosphere.', 'End with a decision or changed understanding.'],
    answer: 'As the marked path vanished under rainwater, we followed the river’s steady roar downhill; the camp lights appeared only after we stopped rushing and listened.',
    check: 'The revision adds setting, pressure, action and insight—not a pile of adjectives.',
    tips: ['Sketch a route before summarising a journey', 'Explain how a setting detail changes the traveller', 'Use strong verbs before adding adjectives'],
    traps: ['Treating scenery as unrelated decoration', 'Calling any movement an adventure', 'Assuming narrator opinion is objective fact'],
    hook: 'A journey changes location; an adventure changes the traveller.',
    questions: [['How can weather function as more than background?', 'It can limit choices, create risk and test character.', 'Setting becomes active when it causes decisions.'], ['Why might two travellers describe one place differently?', 'Attention, purpose and prior beliefs filter perception.', 'Travel writing presents a viewpoint, not a camera-neutral record.']]
  }));

  add('English', 'Bravehearts', languageUnit({
    insight: 'Courage is not the absence of fear; it is a deliberate action taken despite risk for a value larger than comfort.',
    why: 'This definition lets students evaluate courage with evidence instead of praising every bold act.',
    lenses: [
      ['Risk–value test', 'Name what may be lost and what principle or person the action protects.', 'risk + chosen value → courage'],
      ['Visible and quiet courage', 'Physical rescue is visible; admitting error, resisting pressure and persisting ethically may be quieter but equally costly.', 'outer danger ↔ inner pressure'],
      ['Legacy', 'A brave act matters beyond the moment when it changes another person, rule or shared memory.', 'act → immediate result → lasting influence']
    ],
    must: ['Recklessness ignores consequences; courage understands them', 'Motivation matters when judging an action', 'Biographical summaries need turning points, not every date', 'Respectful tribute uses precise evidence, not excessive praise'],
    prompt: 'A student reports a popular teammate’s cheating despite fear of exclusion. Is this courage?',
    steps: ['Risk: social rejection and conflict.', 'Value: fairness and trust.', 'Choice: reporting is deliberate and has a constructive purpose.'],
    answer: 'Yes. It is moral courage because the student accepts personal risk to protect fairness rather than to gain attention.',
    check: 'The judgement names risk, motive and protected value.',
    tips: ['Structure biography answers around challenge → choice → impact', 'Compare two brave figures by motive and consequence', 'Avoid calling a person “great” without saying what they did'],
    traps: ['Confusing aggression with bravery', 'Ignoring fear and cost', 'Writing a chronology instead of an interpretation'],
    hook: 'Fear asks “What may I lose?” Courage asks “What must I protect?”',
    questions: [['Can withdrawing be courageous?', 'Yes, when withdrawal protects life or principle after risks are judged.', 'Courage is wise commitment, not automatic confrontation.'], ['Why is motive important?', 'The same risky action can serve others or merely seek applause.', 'Courage includes ethical purpose as well as danger.']]
  }));

  const hindiUnits = [
    ['माँ, कह एक कहानी', 'संवाद के भीतर छिपी जिज्ञासा को पकड़ो: बच्चा केवल घटना नहीं सुनता, वह न्याय और करुणा पर प्रश्न भी करता है।', 'मातृ-संवाद, प्रश्नशीलता और नैतिक निर्णय', ['कौन बोल रहा है और किससे?', 'घटना के बाद भाव कैसे बदलता है?', 'उत्तर में कथ्य और संदेश दोनों लिखो'], 'किसी कथा में बालक का प्रश्न बड़ों के उत्तर से अधिक प्रभावी क्यों हो सकता है?', 'क्योंकि निष्कपट प्रश्न मान्यताओं की जाँच करता है और पाठक को स्वयं निर्णय लेने देता है।'],
    ['तीन बुद्धिमान', 'बुद्धिमत्ता का प्रमाण दावा नहीं, समस्या को देखने का ढंग और परिणाम है; प्रत्येक पात्र की युक्ति को कारण–परिणाम से परखो।', 'लोककथा, समस्या-समाधान और व्यंग्य', ['समस्या और बाधा अलग लिखो', 'हर युक्ति का परिणाम पहचानो', 'हास्य के पीछे की सीख बताओ'], 'यदि कोई उपाय चतुर दिखे पर समस्या बढ़ा दे, क्या वह बुद्धिमानी है?', 'नहीं; सच्ची बुद्धिमानी संदर्भ, परिणाम और दूसरों पर प्रभाव को ध्यान में रखती है।'],
    ['फूल और काँटा', 'फूल और काँटा केवल वस्तुएँ नहीं, विपरीत गुणों के प्रतीक हैं; समान प्रकृति में जन्म लेकर भी कर्म पहचान बनाते हैं।', 'प्रतीक, तुलना और कर्म का मूल्य', ['उपमान–उपमेय पहचानो', 'विरोधी बिंबों की सूची बनाओ', 'संदेश को अपने शब्दों में लिखो'], 'फूल और काँटे की तुलना से कौन-सा व्यापक विचार निकलता है?', 'परिस्थिति समान हो सकती है, पर व्यवहार और कर्म व्यक्ति का प्रभाव तय करते हैं।'],
    ['पानी रे पानी', 'जल को वस्तु नहीं, चक्र और साझा संसाधन की तरह समझो; कविता का भाव और तथ्यात्मक जल-साक्षरता साथ पढ़ो।', 'जलचक्र, संरक्षण और काव्यात्मक संबोधन', ['मानवीकरण के संकेत खोजो', 'समस्या–कारण–उपाय जोड़ो', 'नारे के बजाय व्यावहारिक उपाय दो'], 'जल-संरक्षण पर प्रभावी उत्तर कैसा होगा?', 'वह स्थानीय समस्या, उसका कारण और मापने योग्य उपाय—जैसे रिसाव रोकना या वर्षाजल संचयन—जोड़ेगा।'],
    ['नहीं होना बीमार', 'स्वास्थ्य-संदेश तभी उपयोगी है जब कारण, आदत और परिणाम की स्पष्ट शृंखला बने; डराने और समझाने का फर्क पहचानो।', 'स्वास्थ्य, हास्य और निर्देशात्मक भाषा', ['लक्षण और कारण न मिलाओ', 'आदेश को कारण से समर्थित करो', 'लय या हास्य का प्रभाव बताओ'], '“स्वस्थ रहो” की तुलना में “हाथ धोकर संक्रमण की कड़ी तोड़ो” बेहतर क्यों है?', 'दूसरा वाक्य स्पष्ट क्रिया और उसका कारण बताता है, इसलिए व्यवहार बदलने योग्य है।'],
    ['गिरिधर कविराय की कुंडलियाँ', 'कुंडली का घूमकर आरंभ से जुड़ना केवल रूप नहीं; दोहराव नीति-विचार को स्मृति में बाँधता है।', 'कुंडलिया छंद, नीति और लोकोक्ति', ['आरंभ–अंत संबंध देखो', 'कथन का व्यवहारिक अर्थ दो', 'छंद और संदेश को अलग-अलग समझो'], 'नीति-काव्य के भावार्थ में क्या लिखना चाहिए?', 'पहले सरल अर्थ, फिर सुझाया व्यवहार, और अंत में आज के जीवन का छोटा उदाहरण।'],
    ['वर्षा-बहार', 'वर्षा-वर्णन में दृश्य, ध्वनि, गंध और गति मिलकर मनोदशा बनाते हैं; विशेषण गिनने के बजाय बिंब का प्रभाव समझो।', 'प्रकृति-बिंब, ध्वनि और वातावरण', ['इंद्रिय-बिंब वर्गीकृत करो', 'क्रियाओं से गति पहचानो', 'प्रकृति और मनोभाव जोड़ो'], 'बादल की ध्वनि कविता का वातावरण कैसे बदल सकती है?', 'कोमल ध्वनि उल्लास और तीखी गर्जना आशंका पैदा कर सकती है; शब्द-चयन पाठक की अनुभूति निर्देशित करता है।'],
    ['बिरजू महाराज से साक्षात्कार', 'अच्छा साक्षात्कार जीवन-वृत्त नहीं दोहराता; प्रश्न कलाकार की साधना, चुनाव और कला-दृष्टि खोलते हैं।', 'साक्षात्कार, कथक और अनुवर्ती प्रश्न', ['खुले प्रश्न पूछो', 'उत्तर से अगला प्रश्न बनाओ', 'तथ्य और विचार अलग नोट करो'], '“आपको नृत्य पसंद है?” कमजोर प्रश्न क्यों है?', 'इसका उत्तर हाँ या नहीं हो सकता है; “किस अनुभव ने आपकी नृत्य-दृष्टि बदली?” विस्तृत और विशिष्ट उत्तर आमंत्रित करता है।'],
    ['चिड़िया', 'छोटी चिड़िया की छवि स्वतंत्रता, संवेदनशीलता या जिजीविषा का बड़ा विचार उठा सकती है; प्रतीक का अर्थ पाठ के संकेतों से सिद्ध करो।', 'प्रतीक, लघु बिंब और स्वतंत्रता', ['चिड़िया की क्रियाएँ चिह्नित करो', 'स्थान और सीमा का विरोध देखो', 'प्रतीक के लिए दो संकेत दो'], 'प्रतीक और सामान्य वर्णन में क्या अंतर है?', 'प्रतीक अपने शाब्दिक रूप के साथ एक व्यापक विचार भी वहन करता है, जिसे कई पाठ-संकेत समर्थन देते हैं।'],
    ['मीरा के पद', 'भक्ति-काव्य में संबोधन, समर्पण और सांसारिक दबाव के विरुद्ध आंतरिक निष्ठा एक साथ काम करते हैं।', 'भक्ति, पद-शैली और आत्मनिष्ठ स्वर', ['वक्ता–आराध्य संबंध पहचानो', 'भाव-सूचक शब्द समूहित करो', 'ऐतिहासिक संदर्भ को भावार्थ पर हावी न होने दो'], 'मीरा का स्वर व्यक्तिगत होते हुए भी व्यापक क्यों लगता है?', 'व्यक्तिगत संबोधन प्रेम, समर्पण और स्वतंत्र चुनाव जैसे सार्वभौमिक अनुभवों को तीव्र बनाता है।']
  ];

  hindiUnits.forEach(([title, insight, focus, must, prompt, answer]) => add('Hindi', title, languageUnit({
    insight,
    why: `${title} को ${focus} की दृष्टि से पढ़ने पर भावार्थ, व्याख्या और अनुप्रयोग एक ही समझ से निकलते हैं।`,
    lenses: [
      ['केंद्र-विचार', `पाठ की घटनाओं या बिंबों को “${focus}” से जोड़कर एक पूर्ण वाक्य में मुख्य विचार लिखो।`, 'घटना/बिंब → अर्थ → जीवन-संदर्भ'],
      ['भाषा की शक्ति', 'संबोधन, पुनरावृत्ति, तुलना, प्रश्न या ध्वनि में से जो साधन मिले, उसका प्रभाव भी बताओ।', 'भाषा-साधन + उदाहरण → प्रभाव'],
      ['उत्तर-निर्माण', 'दावा करो, पाठ का सटीक संकेत दो, फिर समझाओ कि वह संकेत दावे को कैसे सिद्ध करता है।', 'दावा → प्रमाण → व्याख्या']
    ],
    must,
    prompt,
    steps: ['प्रश्न का मुख्य शब्द रेखांकित करो।', 'पाठ से सबसे सटीक घटना, बिंब या कथन-संकेत चुनो।', '“इससे स्पष्ट होता है…” जोड़कर प्रमाण का अर्थ समझाओ।'],
    answer,
    check: 'उत्तर प्रश्न पर लौटता है, प्रमाण देता है और केवल कथा-सार बनकर नहीं रह जाता।',
    tips: ['भावार्थ में कठिन शब्द बदलो, विचार नहीं', 'तीन अंक के उत्तर में कम-से-कम एक कारण और एक प्रमाण दो', 'व्याकरणिक शुद्धता के साथ छोटे स्पष्ट वाक्य लिखो'],
    traps: ['पूरी कथा दोहराना', 'कवि/लेखक का नाम ही परिचय मान लेना', 'अलंकार का नाम लिखकर प्रभाव न बताना'],
    hook: `“${title}”: क्या कहा → कैसे कहा → उससे क्या समझा।`,
    questions: [[prompt, answer, 'यह उत्तर पाठ के केंद्र-विचार को नई परिस्थिति में लागू करता है।'], ['पाठ-आधारित उत्तर में प्रमाण के बाद व्याख्या क्यों आवश्यक है?', 'क्योंकि प्रमाण स्वयं यह नहीं बताता कि वह दावे से कैसे जुड़ता है।', 'व्याख्या ही उद्धृत संकेत और निष्कर्ष के बीच तर्क का पुल है।']]
  })));

  const tamilUnits = [
    ['அமுதத் தமிழ்', 'தமிழின் இனிமையைப் பாராட்டுவது மட்டும் போதாது; பாடல் கருத்து, பேச்சு–எழுத்து மொழி வேறுபாடு, சொலவடை, குற்றியலுகரம்/குற்றியலிகரம் ஆகியவற்றை பயன்பாட்டோடு இணைக்க வேண்டும்.', 'மொழிப்பற்று மற்றும் மொழிப்பயன்பாடு', 'பேச்சுமொழி மற்றும் எழுத்துமொழி எப்போது மாறுகின்றன?', 'சூழல், கேட்பவர், நோக்கம் ஆகியவற்றால் சொல் தேர்வும் வாக்கிய அமைப்பும் மாறுகின்றன; முறையான எழுத்தில் தெளிவும் இலக்கண ஒழுங்கும் தேவை.'],
    ['அணிநிழல் காடு', 'காடு ஒரு காட்சிப் பின்னணி அல்ல; உயிரினங்கள், நீர், மண், மனித வாழ்வு ஆகியவற்றை இணைக்கும் அமைப்பு.', 'இயற்கை வருணனை, நேர்காணல், நால்வகைக் குறுக்கங்கள்', 'ஒரு காட்டு விலங்கு குறைவதால் முழு சூழலும் ஏன் பாதிக்கப்படலாம்?', 'உணவுச் சங்கிலி மற்றும் வாழிடத் தொடர்புகள் ஒன்றோடொன்று சார்ந்தவை; ஓர் இணைப்பு மாறினால் பல உயிர்களின் எண்ணிக்கையும் வளங்களும் மாறும்.'],
    ['நாடு அதை நாடு', 'நாட்டுப்பற்று முழக்கத்தில் அல்ல; வரலாற்றை ஆதாரத்துடன் புரிந்து, பொது நலனுக்கான பொறுப்பை ஏற்கும் செயலில் தெரிகிறது.', 'வீரம், விடுதலை வரலாறு, வினைமுற்று', 'ஒரு வரலாற்று ஆளுமையைப் பாராட்டும் பதில் எவ்வாறு நம்பகமாகும்?', 'அவரது குறிப்பிட்ட செயல், எதிர்கொண்ட இடர், சமூக விளைவு ஆகியவற்றைக் கொடுத்தால் பாராட்டு ஆதாரமுடையதாகிறது.'],
    ['அறிவியல் ஆக்கம்', 'அறிவியல் தமிழில் துல்லியம் முதன்மை: பொருளின் பகுதிகள், செயல் முறை, காரணம், பயன் ஆகியவற்றை சரியான வரிசையில் விளக்க வேண்டும்.', 'கப்பற்கலை, தொழில்நுட்ப விளக்கம், இலக்கியவகைச் சொற்கள்', 'ஒரு கருவியின் செயல்முறையை எப்படிச் சுருக்குவது?', 'உள்ளீடு → நடைபெறும் மாற்றம் → வெளியீடு என்ற வரிசையில், ஒவ்வொரு படிக்கும் செயல்வினை பயன்படுத்த வேண்டும்.'],
    ['ஓதுவது ஒழியேல்', 'கல்வி மதிப்பெண் பெறும் வழி மட்டுமல்ல; சிந்திக்க, தேர்வு செய்ய, பிறருடன் வாழ, வாய்ப்பை உருவாக்க உதவும் ஆற்றல்.', 'கல்வியின் மதிப்பு, வாழ்க்கைத் திறன், சொல் அமைப்பு', '“கல்வி அழியாச் செல்வம்” என்பதன் நடைமுறைப் பொருள் என்ன?', 'அறிவும் திறனும் பயன்படுத்தும்போது வளர்கின்றன; பொருள் இழக்கப்பட்டாலும் கற்றறிந்த முடிவெடுக்கும் ஆற்றல் மனிதருடன் தொடர்கிறது.'],
    ['கலைவண்ணம்', 'ஓவியத்தைப் “பார்த்தேன்” என்று முடிக்காமல் நிறம், கோடு, மையம், இடவமைப்பு எந்த உணர்வை உருவாக்குகின்றன என்று வாசிக்க வேண்டும்.', 'ஓவிய வாசிப்பு, அழகியல், தொழிற்பெயர்', 'ஒரு ஓவியத்தின் மையக் கருத்தை எப்படி ஆதரிப்பது?', 'முதலில் கவனம் ஈர்க்கும் பகுதி, பயன்படுத்திய நிற/கோடு, அவற்றால் உருவாகும் உணர்வு—இம்மூன்றையும் இணைக்க வேண்டும்.'],
    ['நயத்தகு நாகரிகம்', 'நாகரிகத்தைப் பழைய கட்டடங்களால் மட்டும் அளவிட முடியாது; விருந்தோம்பல், விவசாயம், தொழில், நீர்மேலாண்மை, சமூக உறவு அனைத்தும் அதன் சான்றுகள்.', 'விருந்தோம்பல், வயலும் வாழ்வும், அணி இலக்கணம்', 'விருந்தோம்பல் ஒரு சமூக மதிப்பாக எவ்வாறு செயல்படுகிறது?', 'அது வளத்தைப் பகிர்வதன் மூலம் நம்பிக்கை, உறவு, பரஸ்பர உதவி ஆகியவற்றை வளர்க்கிறது.'],
    ['ஒப்புரவு ஒழுகு', 'ஒப்புரவு என்பது ஒரே மாதிரி நடப்பது அல்ல; பிறரின் தேவையை உணர்ந்து தக்க உதவியைச் செய்வது.', 'அறநெறி, உருவகம், அணி இலக்கணம்', 'உதவி மற்றும் ஒப்புரவு இடையே என்ன வேறுபாடு?', 'உதவி தனி நிகழ்வாக இருக்கலாம்; ஒப்புரவு சூழலை உணர்ந்து, எதிர்பார்ப்பின்றி பொதுநலனுக்காக தொடர்ந்து செயல்படும் பண்பு.'],
    ['மானுடம் வெல்லும்', 'மனிதநேயம் எல்லைகளை மறுப்பதல்ல; வேறுபாடுகளை மதித்தபடி இரக்கம், கண்ணியம், சமத்துவம் ஆகியவற்றை முடிவுகளில் காக்கிறது.', 'மனிதம், ஆளுமை, ஆகுபெயர்', 'ஒரு தலைவரின் ஆளுமையை மதிப்பிட முக்கியமான அளவுகோல் எது?', 'அவர் சொன்னதை விட, கடினமான சூழலில் எடுத்த முடிவு மனித கண்ணியத்தையும் பொதுநலனையும் எவ்வாறு காத்தது என்பதே முக்கியம்.']
  ];

  tamilUnits.forEach(([title, insight, focus, prompt, answer]) => add('Tamil', title, languageUnit({
    insight,
    why: `${title} இயலில் ${focus} ஒன்றோடொன்று இணைகின்றன; இதைப் புரிந்தால் செய்யுள்/உரைநடை விளக்கம், இலக்கணம், சிந்தனை வினா அனைத்திற்கும் ஒரே கருத்து வரைபடம் உதவும்.`,
    lenses: [
      ['கருத்து வரைபடம்', `இயலின் பாடங்களை “${focus}” என்ற மையத்துடன் காரணம், எடுத்துக்காட்டு, விளைவு என இணைக்கவும்.`, 'மையக்கருத்து → சான்று → விளைவு'],
      ['மொழிநயம்', 'சொல், தொடர், ஒலி, உவமை அல்லது உருவகம் கருத்தை எவ்வாறு கூர்மையாக்குகிறது என்பதைச் சொல்லவும்.', 'மொழிக்கூறு + சூழல் → தாக்கம்'],
      ['தேர்வு விடை', 'கேள்வியின் வினைச்சொல்லை முதலில் கவனிக்கவும்: குறிப்பிடுக, விளக்குக, ஒப்பிடுக, மதிப்பிடுக ஆகியவை வேறு விடை அமைப்பைக் கேட்கின்றன.', 'வினைச்சொல் → தேவையான செயல் → சான்றுள்ள விடை']
    ],
    must: ['பாடத்தின் பெயர் மட்டும் மையக்கருத்து அல்ல; முழு வாக்கியமாக எழுதுக', 'பொருள் விளக்கத்தில் கருத்தின் வரிசையை மாற்றாதீர்', 'இலக்கணத்தை தனிச் சொல்லில் மட்டும் அல்லாமல் வாக்கியத்தில் பயன்படுத்திப் பாருங்கள்', 'சிந்தனை வினாவில் பாடக் கருத்தை புதிய சூழலுடன் இணைக்கவும்'],
    prompt,
    steps: ['கேள்வியின் முக்கியச் சொல்லைத் தேர்ந்தெடுக்கவும்.', 'இயலின் கருத்திலிருந்து பொருத்தமான காரணம் அல்லது சான்றை இணைக்கவும்.', 'ஒரு தெளிவான விளைவு அல்லது பயன்பாட்டுடன் முடிக்கவும்.'],
    answer,
    check: 'விடையில் நேரடியான கருத்து, ஏன் என்ற விளக்கம், பொருத்தமான பயன்பாடு ஆகிய மூன்றும் உள்ளன.',
    tips: ['இரண்டு மதிப்பெண்: கருத்து + காரணம்', 'நான்கு மதிப்பெண்: கருத்து + இரண்டு சான்றுகள் + முடிவு', 'செய்யுள் நயத்தில் கருவியின் பெயருடன் அதன் தாக்கத்தையும் எழுதுக'],
    traps: ['கேள்வியையே மாற்றி விடையாக எழுதுதல்', 'மனப்பாட வரிகளைப் பொருள் தெரியாமல் சேர்த்தல்', 'இலக்கணப் பெயரை மட்டும் கூறி எடுத்துக்காட்டு தராமை'],
    hook: `${title}: படி → பொருள் காண் → மொழிநயம் உணர் → வாழ்க்கையில் பயன்படுத்து.`,
    questions: [[prompt, answer, 'இந்த விடை இயலின் மையக்கருத்தை நடைமுறைச் சூழலுடன் இணைக்கிறது.'], ['ஒரு சிறந்த மொழிப்பாட விடையில் “சான்று” ஏன் தேவை?', 'கருத்து பாடத்திலிருந்து நியாயமாக வந்தது என்பதைச் சான்று காட்டுகிறது.', 'சான்றுக்குப் பின் விளக்கம் சேர்க்கும்போது விடை நினைவுப்பதிவிலிருந்து பகுத்தறிவாக மாறுகிறது.']]
  })));

  add('Tamil', 'Complete book — 2024 revised edition', languageUnit({
    insight: 'இந்த முழுநூலை ஒன்பது தனித்தனி பாடத்தொகுப்புகளாக அல்ல, மொழித்திறன் ஏணியாகப் படியுங்கள்: புரிதல் → மொழிநயம் → இலக்கணப் பயன்பாடு → சொந்த வெளிப்பாடு.',
    why: 'நூலின் அச்சிடப்பட்ட பொருளடக்கம் ஒன்பது இயல்களை மொழி, இயற்கை, நாடு/சமூகம், அறிவியல்/தொழில்நுட்பம், கல்வி, கலை, நாகரிகம், அறம், மனிதம் என வளர்க்கிறது.',
    lenses: [
      ['ஒன்பது இயல் பாதை', 'அமுதத் தமிழ் முதல் மானுடம் வெல்லும் வரை ஒவ்வோர் இயலுக்கும் ஒரு கருத்து அட்டை உருவாக்கவும்.', 'இயல் → மையக்கருத்து → முக்கிய பாடம் → இலக்கணம்'],
      ['நான்கு வாசிப்பு அடுக்குகள்', 'முதலில் நேரடிப் பொருள்; அடுத்து மறைபொருள்; பின்னர் மொழிநயம்; இறுதியில் வாழ்க்கைப் பயன்பாடு.', 'என்ன? → ஏன்? → எப்படி சொல்லப்பட்டது? → எங்கே பயன்படும்?'],
      ['மீள்பார்வை முறை', 'ஒரு பக்கச் சுருக்கம், வாய்மொழி விளக்கம், இரண்டு சான்றுள்ள விடைகள், ஒரு இலக்கணப் பயன்பாடு ஆகியவற்றால் இயலை முடிக்கவும்.', 'சுருக்கு → சொல் → நிரூபி → பயன்படுத்து']
    ],
    must: ['ஒவ்வோர் இயலின் மையக்கருத்தையும் ஒரு வாக்கியத்தில் சொல்லத் தெரிந்திருக்க வேண்டும்', 'செய்யுள், உரைநடை, துணைப்பாடம், இலக்கணம் ஆகியவற்றை தொடர்புபடுத்த வேண்டும்', 'ஆசிரியர்/நூல் தகவலை கருத்து விளக்கத்திலிருந்து பிரிக்க வேண்டும்', 'விடையின் நீளத்தை மதிப்பெண்ணுக்கு ஏற்ப கட்டுப்படுத்த வேண்டும்'],
    prompt: 'ஒரு தமிழ் இயலை முழுமையாகக் கற்றுவிட்டோம் என்பதை எவ்வாறு சரிபார்க்கலாம்?',
    steps: ['புத்தகத்தை மூடி மையக்கருத்தை 30 வினாடிகளில் சொல்லவும்.', 'இரண்டு பாடச் சான்றுகளால் அதை விளக்கவும்.', 'இலக்கணக் கூறை புதிய வாக்கியத்தில் பயன்படுத்தவும்.', 'புதிய சிந்தனை வினாவுக்கு காரணத்துடன் பதிலளிக்கவும்.'],
    answer: 'நினைவிலிருந்து கருத்தை விளக்கி, சான்று காட்டி, இலக்கணத்தைப் புதிய சூழலில் பயன்படுத்தி, சிந்தனை வினாவைத் தீர்த்தால் இயல் கற்றல் நிறைவு பெற்றது.',
    check: 'வெறும் பாடப்பெயர் அல்லது மனப்பாட வரி அல்ல; புரிதல், பயன்பாடு, விளக்கம் அனைத்தும் சோதிக்கப்படுகின்றன.',
    tips: ['ஒவ்வோர் இயலுக்கும் ஒரு A4 “அறிவு வரைபடம்” வைத்துக்கொள்ளுங்கள்', 'வார இறுதியில் பழைய இரண்டு இயல்களை புத்தகமின்றி மீட்டெடுக்கவும்', 'தவறான விடையை அழிக்காமல் காரணத்தைச் சரிசெய்து மீண்டும் எழுதவும்'],
    traps: ['பாடங்களை மட்டும் படித்து இலக்கணத்தை இறுதிக்கு தள்ளுதல்', 'சுருக்கம் என்ற பெயரில் முழுப் பாடத்தை நகலெடுத்தல்', 'மதிப்பீட்டு வினாக்களைப் பார்த்து மட்டும் கற்றதாக எண்ணுதல்'],
    hook: 'ஒன்பது இயல்கள், நான்கு திறன்கள்: புரிந்து கொள், ரசித்து விளக்கு, சரியாக பயன்படுத்து, சொந்தமாக உருவாக்கு.',
    questions: [['ஏன் புத்தகத்தை மூடி மீட்டெடுப்பது முக்கியம்?', 'அது அடையாளம் காணுதலை அல்ல, உண்மையான நினைவூட்டல் மற்றும் புரிதலைச் சோதிக்கிறது.', 'பக்கத்தைப் பார்த்தால் தெரிந்ததாகத் தோன்றலாம்; உதவியின்றி விளக்குவது கற்றலின் வலிமையை காட்டும்.'], ['இலக்கணத்தை எவ்வாறு நீண்டநாள் நினைவில் வைக்கலாம்?', 'ஒவ்வொரு விதிக்கும் சொந்த எடுத்துக்காட்டு உருவாக்கி, பின்னர் அதைத் திருத்திப் பார்க்க வேண்டும்.', 'பயன்பாட்டில் விதி செயல்படுவதால் தனிப்பட்ட வரையறையை விட ஆழமான நினைவு உருவாகிறது.']]
  }));
})();
