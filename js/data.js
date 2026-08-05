(function(){
const KEY='home-manager-unified-v1';
const seed={schemaVersion:1,settings:{theme:'light',locale:'en',activeWorkspace:'home'},people:[{id:'p1',name:'Father',householdRole:'Household lead',wellbeing:88},{id:'p2',name:'Mother',householdRole:'Home manager',wellbeing:92},{id:'p3',name:'Ananya',householdRole:'Student',wellbeing:95},{id:'p4',name:'Arjun',householdRole:'Student',wellbeing:90}],tasks:[{id:'t1',context:'home',type:'duty',title:'Morning pooja',category:'Routine',assignee:'Father',dueAt:'2026-08-03',priority:'high',status:'done'},{id:'t2',context:'home',type:'task',title:'Repair kitchen light',category:'Maintenance',assignee:'Arjun',dueAt:'2026-08-04',priority:'high',status:'progress'},{id:'t3',context:'study',type:'practice',title:'Solve Kinematics DPP',category:'Physics',assignee:'Ananya',dueAt:'2026-08-04',priority:'high',status:'todo'},{id:'t4',context:'community',type:'volunteer',title:'Lake Road cleanup',category:'Environment',assignee:'Family',dueAt:'2026-08-09',priority:'medium',status:'todo'}],events:[{id:'e1',context:'home',title:'Family yoga',category:'Health',startAt:'2026-08-05T06:00',venue:'Terrace'},{id:'e2',context:'community',title:'Residents association meeting',category:'Civic',startAt:'2026-08-08T18:00',venue:'Community Hall'},{id:'e3',context:'community',title:'Weekend farmers market',category:'Market',startAt:'2026-08-09T07:00',venue:'Siruvani Road'},{id:'e4',context:'study',title:'Weekly JEE mock',category:'Test',startAt:'2026-08-09T09:00',venue:'Study room'}],issues:[{id:'i1',scope:'household',ticketNo:null,title:'Kitchen light repair',category:'Electrical',location:'Kitchen',priority:'high',status:'progress',reportedAt:'2026-08-02'},{id:'i2',scope:'civic',ticketNo:'KP-1051',title:'Pothole near school gate',category:'Road',location:'Kovaipudur Main Road',priority:'high',status:'progress',reportedAt:'2026-08-01'}],contacts:[{id:'c1',scope:'home',name:'Dr. Meena',category:'Family doctor',phone:'98765 43210',hours:'On call'},{id:'c2',scope:'community',name:'Community Health Centre',category:'Health',phone:'0422 260 1122',hours:'Open 24 hours'},{id:'c3',scope:'community',name:'Corporation Help Desk',category:'Civic',phone:'0422 230 2323',hours:'9:30 AM - 5 PM'}],pointTransactions:[{id:'pt1',personId:'p3',context:'home',reason:'Completed duties',points:120,createdAt:'2026-08-01'},{id:'pt2',personId:'p4',context:'study',reason:'Study streak',points:95,createdAt:'2026-08-02'}],expenses:[{id:'x1',title:'Groceries',category:'Food',amount:4200,date:'2026-08-02'},{id:'x2',title:'Electricity',category:'Utilities',amount:1850,date:'2026-08-01'}],inventoryItems:[{id:'n1',name:'Rice',category:'Pantry',quantity:8,unit:'kg'},{id:'n2',name:'Cooking oil',category:'Pantry',quantity:2,unit:'L'},{id:'n3',name:'First aid kit',category:'Health',quantity:1,unit:'kit'}],meals:[{id:'m1',name:'Vegetable sambar',mealType:'Lunch',cook:'Mother',date:'2026-08-04'},{id:'m2',name:'Millet dosa',mealType:'Dinner',cook:'Father',date:'2026-08-04'}],assets:[{id:'a1',name:'Family car',category:'Vehicle',value:650000,status:'active'},{id:'a2',name:'Gold heirloom',category:'Heirloom',value:180000,status:'secured'}],wisdomEntries:[{id:'w1',title:'Grandma’s rasam recipe',category:'Recipe',author:'Grandma',body:'Family recipe preserved for the next generation.'},{id:'w2',title:'Deepavali family tradition',category:'Tradition',author:'Family',body:'Prepare lamps together before sunset.'}],learningTopics:[{id:'l1',subject:'Physics',chapter:'Mechanics',title:'Units and Measurements',status:'done',plannedHours:2,proficiency:90},{id:'l2',subject:'Physics',chapter:'Kinematics',title:'Motion in a Straight Line',status:'progress',plannedHours:5,proficiency:55},{id:'l3',subject:'Chemistry',chapter:'Physical Chemistry',title:'Atomic Structure',status:'revision',plannedHours:3,proficiency:68},{id:'l4',subject:'Mathematics',chapter:'Algebra',title:'Sets and Relations',status:'backlog',plannedHours:4,proficiency:30},{id:'l5',subject:'Chemistry',chapter:'Inorganic Chemistry',title:'Chemical Bonding',status:'progress',plannedHours:5,proficiency:48},{id:'l6',subject:'Mathematics',chapter:'Trigonometry',title:'Trigonometric Functions',status:'revision',plannedHours:4,proficiency:72}],goals:[{id:'g1',context:'study',title:'Complete Mechanics Class 11',dueAt:'2026-08-30',target:12,progress:7},{id:'g2',context:'home',title:'Complete annual document review',dueAt:'2026-08-20',target:10,progress:4}],focusSessions:[{id:'f1',date:'2026-07-28',minutes:42,subject:'Physics'},{id:'f2',date:'2026-07-29',minutes:58,subject:'Chemistry'},{id:'f3',date:'2026-07-30',minutes:35,subject:'Mathematics'},{id:'f4',date:'2026-07-31',minutes:75,subject:'Physics'},{id:'f5',date:'2026-08-01',minutes:64,subject:'Chemistry'},{id:'f6',date:'2026-08-02',minutes:90,subject:'Mathematics'},{id:'f7',date:'2026-08-03',minutes:52,subject:'Physics'}],newsItems:[{id:'nw1',title:'Lake Road cleanup draws 120 volunteers',category:'Civic',body:'Residents cleared waste, planted native saplings and mapped areas needing corporation support.',date:'2026-08-03'},{id:'nw2',title:'New morning bus services from Siruvani Road',category:'Transport',body:'Route 3B adds two services on weekdays following resident requests.',date:'2026-08-02'},{id:'nw3',title:'Students showcase water-saving innovations',category:'Education',body:'Local school teams presented practical conservation projects.',date:'2026-08-01'}],discussions:[{id:'d1',title:'Streetlight near A Block is working again',author:'Meena R',body:'Thank you to everyone who followed up on ticket KP-1042.',likes:18},{id:'d2',title:'Recommendations for a maths tutor?',author:'Suresh K',body:'Looking for Class 8 weekend sessions near the bus terminus.',likes:7}],polls:[{id:'pl1',title:'Which improvement should the ward prioritise?',options:[{name:'Street lighting',votes:42},{name:'Footpaths',votes:31},{name:'Waste collection',votes:27}]}],volunteerOpportunities:[{id:'v1',title:'Weekend lake cleanup',category:'Environment',date:'2026-08-09',needed:20},{id:'v2',title:'Library reading mentor',category:'Education',date:'2026-08-12',needed:6}],guides:[{id:'gd1',title:'Township governance',body:'Property tax, certificates and ward contacts'},{id:'gd2',title:'Transport and mobility',body:'Bus routes, autos and road safety'},{id:'gd3',title:'Learning and education',body:'Schools, tuition and public resources'},{id:'gd4',title:'Parks and nature',body:'Public spaces, trees and conservation'}]};
function clone(v){return JSON.parse(JSON.stringify(v))}
function uid(prefix){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6)}
seed.settings.appBackground='waterfall';
seed.settings.activeLearnerId='p3';
seed.settings.googleSync={mode:'direct',clientId:'',autoSync:false,calendarSync:true,emailAnalysis:true,driveBackup:false,reviewPolicy:'review',lookbackDays:30,categories:['bills','travel','school','health','deliveries','home','government'],accounts:[]};
seed.settings.phoneSms={ownerId:'p1',consent:false,lastImport:'',importedCount:0,sourceName:'',categories:['bills','travel','school','health','deliveries','home','government']};
seed.expenses.forEach(item=>item.domain=item.category==='Food'?'food':'housing');
seed.expenses.push(
  {id:'x3',title:'Petrol refill',category:'Fuel',domain:'vehicle',amount:3200,date:'2026-08-03'},
  {id:'x4',title:'Medicines',category:'Pharmacy',domain:'health',amount:2400,date:'2026-08-03'},
  {id:'x5',title:'School materials',category:'Education',domain:'learning',amount:1850,date:'2026-08-02'},
  {id:'x6',title:'Festival advance',category:'Celebration',domain:'family',amount:3000,date:'2026-08-01'},
  {id:'x7',title:'July groceries',category:'Food',domain:'food',amount:10800,date:'2026-07-15'},
  {id:'x8',title:'July fuel',category:'Fuel',domain:'vehicle',amount:6100,date:'2026-07-18'},
  {id:'x9',title:'June groceries',category:'Food',domain:'food',amount:11200,date:'2026-06-15'}
);
seed.budgets=[
  {id:'b1',domain:'food',category:'Food & groceries',amount:15000,bucket:'Flexible'},
  {id:'b2',domain:'housing',category:'Home & utilities',amount:22000,bucket:'Fixed'},
  {id:'b3',domain:'vehicle',category:'Vehicles & transport',amount:10000,bucket:'Flexible'},
  {id:'b4',domain:'health',category:'Health & care',amount:8000,bucket:'Non-monthly'},
  {id:'b5',domain:'learning',category:'Learning & school',amount:12000,bucket:'Fixed'},
  {id:'b6',domain:'family',category:'Family & celebrations',amount:10000,bucket:'Non-monthly'},
  {id:'b7',domain:'community',category:'Community',amount:3000,bucket:'Flexible'}
];
seed.incomes=[
  {id:'in1',domain:'family',source:'Monthly salary',owner:'Father',amount:150000,frequency:'Monthly',date:'2026-08-01'},
  {id:'in2',domain:'family',source:'Consulting income',owner:'Mother',amount:25000,frequency:'Monthly',date:'2026-08-02'}
];
seed.liabilities=[
  {id:'db1',domain:'housing',title:'Home loan',type:'Mortgage',balance:2400000,payment:28000,interestRate:8.4},
  {id:'db2',domain:'vehicle',title:'Car loan',type:'Vehicle loan',balance:280000,payment:14500,interestRate:9.1}
];
seed.moneyGoals=[
  {id:'mg1',domain:'family',title:'Emergency fund',target:300000,saved:120000,contribution:10000,dueDate:'2027-08-01'},
  {id:'mg2',domain:'learning',title:'Higher education fund',target:500000,saved:180000,contribution:8000,dueDate:'2029-06-01'}
];
seed.assets.push({id:'a3',name:'Family home',category:'Property',value:3800000,status:'active'});
seed.academicProfiles=[
  {id:'ap1',personId:'p3',name:'Ananya',board:'CBSE',grade:12,stream:'Science - PCM',school:'Peepal Prodigy School',schoolStage:'Senior Secondary - Grades 11-12',subjectGroup:'G1A - PCM + Computer Science',targetPercent:90,subjects:['English Core','Physics','Chemistry','Mathematics','Computer Science']},
  {id:'ap2',personId:'p4',name:'Arjun',board:'CBSE',grade:7,stream:'Middle Stage',school:'Peepal Prodigy School',schoolStage:'Secondary - Grades 6-10',subjectGroup:'NCERT secondary programme',targetPercent:85,subjects:['English','Hindi','Tamil','Mathematics','Science','Social Science','Kaushal Bodh']}
];
seed.schoolProfile={
  name:'Peepal Prodigy School',board:'CBSE',affiliationNo:'1930782',schoolCode:'55677',status:'Senior Secondary',
  campus:'CBSE School Campus',address:'Milekal, Sugunapuram, Kurichi Village, Coimbatore, Tamil Nadu 641008',
  email:'ask@peepalprodigy.com',phone:'+91 9585 400 900',principal:'Parvin S',studentTeacherRatio:'1:30',
  website:'https://www.peepalprodigy.in/',parentPortal:'https://crm.peepalprodigy.cloud/',
  sarasUrl:'https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/1930782',
  disclosureUrl:'https://www.peepalprodigy.in/images/saras.pdf',
  secondaryUrl:'https://www.peepalprodigy.in/secondary-school.html',seniorSecondaryUrl:'https://www.peepalprodigy.in/senior-secondary-school.html',
  calendarUrl:'https://www.peepalprodigy.in/annual-academic-calender',feesUrl:'https://www.peepalprodigy.in/fee-structure-of-the-school',
  sourceCheckedAt:'2026-08-04',methods:['Daily self-assessment','Interdisciplinary learning','Peer learning','Hands-on minds-on','Student-Parent-Tutor review','Physical and co-curricular growth']
};
const syllabusBlueprints={
  p4:{
    Mathematics:['Large numbers and number sense','Fractions, decimals and rational numbers','Arithmetic expressions','Algebraic expressions','Simple equations','Lines and angles','Triangles and constructions','Comparing quantities','Perimeter and area','Data handling and probability'],
    Science:['Nutrition in living organisms','Heat and temperature','Acids, bases and salts','Physical and chemical changes','Respiration and transport','Reproduction in plants','Motion and time','Electric current and effects','Light','Forests and wastewater'],
    'Social Science':['Tracing changes through time','Kingdoms and regional cultures','Delhi and the Mughals','Environment and resources','Weather, climate and water','Human environment interactions','Equality and government','Markets and public services','Media and democracy'],
    English:['Reading comprehension','Vocabulary and grammar','Prose study','Poetry study','Creative writing','Speaking and listening'],
    Hindi:['Reading comprehension','Grammar and vocabulary','Prose and poetry','Writing skills','Speaking and listening'],
    Tamil:['Reading comprehension','Grammar and vocabulary','Literature','Writing skills','Speaking and listening'],
    'Kaushal Bodh':['Workplace safety and teamwork','Tools and materials','Design and making project','Community-linked vocational project']
  },
  p3:{
    Physics:['Electric Charges and Fields','Electrostatic Potential and Capacitance','Current Electricity','Moving Charges and Magnetism','Magnetism and Matter','Electromagnetic Induction','Alternating Current','Electromagnetic Waves','Ray Optics','Wave Optics','Dual Nature of Radiation and Matter','Atoms','Nuclei','Semiconductor Electronics'],
    Chemistry:['Solutions','Electrochemistry','Chemical Kinetics','The d- and f-Block Elements','Coordination Compounds','Haloalkanes and Haloarenes','Alcohols, Phenols and Ethers','Aldehydes, Ketones and Carboxylic Acids','Amines','Biomolecules'],
    Mathematics:['Relations and Functions','Inverse Trigonometric Functions','Matrices','Determinants','Continuity and Differentiability','Applications of Derivatives','Integrals','Applications of Integrals','Differential Equations','Vector Algebra','Three Dimensional Geometry','Linear Programming','Probability'],
    'English Core':['Reading comprehension','Creative writing skills','Flamingo prose','Flamingo poetry','Vistas supplementary reader','Listening and speaking portfolio'],
    'Computer Science':['Python revision','Functions','Exception handling','Text and binary files','CSV files','Data structures','Computer networks','Database concepts','SQL','Python-SQL connectivity']
  }
};
seed.syllabusItems=[];
Object.entries(syllabusBlueprints).forEach(([studentId,subjects])=>Object.entries(subjects).forEach(([subject,units])=>units.forEach((title,index)=>seed.syllabusItems.push({id:`sy-${studentId}-${subject.replace(/[^a-z]/gi,'').slice(0,4).toLowerCase()}-${index+1}`,studentId,subject,title,term:index<Math.ceil(units.length/2)?'Term 1':'Term 2',competency:['Concept','Application','Analysis'][index%3],status:index%5===0?'mastered':index%3===0?'revision':index%2===0?'learning':'not-started',mastery:index%5===0?88:index%3===0?68:index%2===0?52:20,plannedHours:index%3+2}))));
seed.studyPlans=[
  {id:'sp1',studentId:'p3',date:'2026-08-05',startTime:'05:45',minutes:60,subject:'Physics',activity:'Ray Optics numericals',method:'Active recall',status:'planned'},
  {id:'sp2',studentId:'p3',date:'2026-08-05',startTime:'19:00',minutes:75,subject:'Chemistry',activity:'Electrochemistry NCERT questions',method:'Written practice',status:'planned'},
  {id:'sp3',studentId:'p3',date:'2026-08-06',startTime:'05:45',minutes:60,subject:'Mathematics',activity:'Definite integrals mixed set',method:'Timed practice',status:'planned'},
  {id:'sp4',studentId:'p3',date:'2026-08-07',startTime:'18:30',minutes:90,subject:'Physics',activity:'Practical record and viva',method:'Practical',status:'planned'},
  {id:'sp5',studentId:'p4',date:'2026-08-05',startTime:'17:00',minutes:35,subject:'Mathematics',activity:'Fractions worked examples',method:'Guided practice',status:'planned'},
  {id:'sp6',studentId:'p4',date:'2026-08-05',startTime:'17:45',minutes:30,subject:'English',activity:'Reading and summary',method:'Read-recall',status:'planned'},
  {id:'sp7',studentId:'p4',date:'2026-08-06',startTime:'17:00',minutes:35,subject:'Science',activity:'Heat concept map',method:'Teach-back',status:'planned'},
  {id:'sp8',studentId:'p4',date:'2026-08-07',startTime:'17:00',minutes:30,subject:'Social Science',activity:'Climate map work',method:'Visual practice',status:'planned'}
];
seed.academicDeliverables=[
  {id:'ad1',studentId:'p3',title:'Physics investigatory project',subject:'Physics',type:'Project',dueDate:'2026-08-25',teacher:'Physics faculty',status:'progress',weight:30,notes:'Complete observations, graphs and viva questions.'},
  {id:'ad2',studentId:'p3',title:'Chemistry practical record',subject:'Chemistry',type:'Practical',dueDate:'2026-08-18',teacher:'Chemistry faculty',status:'progress',weight:30,notes:'Finish salt analysis observations.'},
  {id:'ad3',studentId:'p3',title:'English speaking assessment',subject:'English Core',type:'Internal assessment',dueDate:'2026-08-12',teacher:'English faculty',status:'todo',weight:20,notes:'Prepare two-minute position statement.'},
  {id:'ad4',studentId:'p3',title:'Mathematics activity file',subject:'Mathematics',type:'Portfolio',dueDate:'2026-08-20',teacher:'Mathematics faculty',status:'todo',weight:20,notes:'Index, activities and viva review.'},
  {id:'ad5',studentId:'p4',title:'Fractions worksheet',subject:'Mathematics',type:'Homework',dueDate:'2026-08-06',teacher:'Mathematics teacher',status:'todo',weight:10,notes:'Show all working.'},
  {id:'ad6',studentId:'p4',title:'Heat and temperature activity',subject:'Science',type:'Activity',dueDate:'2026-08-08',teacher:'Science teacher',status:'progress',weight:10,notes:'Record observations safely with an adult.'},
  {id:'ad7',studentId:'p4',title:'Monsoon map work',subject:'Social Science',type:'Project',dueDate:'2026-08-10',teacher:'Social Science teacher',status:'todo',weight:10,notes:'Label rainfall regions and legend.'},
  {id:'ad8',studentId:'p4',title:'English book reflection',subject:'English',type:'Homework',dueDate:'2026-08-07',teacher:'English teacher',status:'done',weight:10,notes:'One-page personal response.'}
];
seed.academicAssessments=[
  {id:'as1',studentId:'p3',title:'Unit Test 1',subject:'Physics',type:'School test',date:'2026-07-18',status:'completed',score:52,maxScore:70,target:60,practicalScore:26,practicalMax:30},
  {id:'as2',studentId:'p3',title:'Unit Test 1',subject:'Chemistry',type:'School test',date:'2026-07-20',status:'completed',score:55,maxScore:70,target:60,practicalScore:27,practicalMax:30},
  {id:'as3',studentId:'p3',title:'Unit Test 1',subject:'Mathematics',type:'School test',date:'2026-07-22',status:'completed',score:68,maxScore:80,target:72,practicalScore:18,practicalMax:20},
  {id:'as4',studentId:'p3',title:'Monthly test',subject:'English Core',type:'School test',date:'2026-07-24',status:'completed',score:65,maxScore:80,target:72,practicalScore:18,practicalMax:20},
  {id:'as5',studentId:'p3',title:'Weekly mock',subject:'Computer Science',type:'Board pattern',date:'2026-08-02',status:'completed',score:56,maxScore:70,target:62,practicalScore:28,practicalMax:30},
  {id:'as6',studentId:'p4',title:'Periodic Test 1',subject:'Mathematics',type:'School test',date:'2026-07-15',status:'completed',score:34,maxScore:40,target:36,practicalScore:0,practicalMax:0},
  {id:'as7',studentId:'p4',title:'Periodic Test 1',subject:'Science',type:'School test',date:'2026-07-17',status:'completed',score:32,maxScore:40,target:35,practicalScore:0,practicalMax:0},
  {id:'as8',studentId:'p4',title:'Periodic Test 1',subject:'English',type:'School test',date:'2026-07-19',status:'completed',score:30,maxScore:40,target:34,practicalScore:0,practicalMax:0},
  {id:'as9',studentId:'p4',title:'Class quiz',subject:'Social Science',type:'Quiz',date:'2026-07-26',status:'completed',score:17,maxScore:20,target:17,practicalScore:0,practicalMax:0},
  {id:'as10',studentId:'p3',title:'Pre-board 1',subject:'Physics',type:'Pre-board',date:'2026-08-28',status:'scheduled',score:0,maxScore:70,target:62,practicalScore:0,practicalMax:30},
  {id:'as11',studentId:'p4',title:'Periodic Test 2',subject:'Science',type:'Periodic test',date:'2026-08-20',status:'scheduled',score:0,maxScore:40,target:35,practicalScore:0,practicalMax:0}
];
seed.practiceLogs=[
  {id:'pr1',studentId:'p3',date:'2026-08-01',subject:'Physics',source:'CBSE competency questions',attempted:25,correct:18,minutes:60,errorType:'Application'},
  {id:'pr2',studentId:'p3',date:'2026-08-02',subject:'Chemistry',source:'NCERT exemplar',attempted:30,correct:24,minutes:70,errorType:'Concept'},
  {id:'pr3',studentId:'p3',date:'2026-08-03',subject:'Mathematics',source:'Board sample paper',attempted:20,correct:16,minutes:80,errorType:'Calculation'},
  {id:'pr4',studentId:'p3',date:'2026-08-04',subject:'English Core',source:'Writing practice',attempted:8,correct:7,minutes:45,errorType:'Format'},
  {id:'pr5',studentId:'p4',date:'2026-08-01',subject:'Mathematics',source:'NCERT exercise',attempted:18,correct:14,minutes:35,errorType:'Calculation'},
  {id:'pr6',studentId:'p4',date:'2026-08-02',subject:'Science',source:'CBSE competency questions',attempted:15,correct:12,minutes:30,errorType:'Application'},
  {id:'pr7',studentId:'p4',date:'2026-08-03',subject:'English',source:'Reading comprehension',attempted:10,correct:8,minutes:25,errorType:'Inference'},
  {id:'pr8',studentId:'p4',date:'2026-08-04',subject:'Social Science',source:'School worksheet',attempted:12,correct:10,minutes:30,errorType:'Recall'}
];
seed.academicResources=[
  {id:'ar1',audience:'6-10',title:'CBSE competency assessment resources',type:'Question banks',url:'https://cbseacademic.nic.in/cbe/assessment.html'},
  {id:'ar2',audience:'6-12',title:'NCERT textbooks',type:'Official textbooks',url:'https://ncert.nic.in/textbook.php'},
  {id:'ar3',audience:'12',title:'CBSE curriculum 2026-27',type:'Official syllabus',url:'https://cbseacademic.nic.in/curriculum_2027.html'},
  {id:'ar4',audience:'12',title:'Class XII question banks',type:'Official practice',url:'https://cbseacademic.nic.in/qbclass12.html'},
  {id:'ar5',audience:'12',title:'Class XII sample papers (2025-26)',type:'Official practice and marking schemes',url:'https://cbseacademic.nic.in/sqp_classxii_2025-26.html'},
  {id:'ar6',audience:'6-8',title:'Kaushal Bodh curriculum',type:'Skill education',url:'https://cbseacademic.nic.in/skill-education-curriculum.html'},
  {id:'ar7',audience:'6-12',title:'Peepal parent portal',type:'School account',url:'https://crm.peepalprodigy.cloud/'},
  {id:'ar8',audience:'6-10',title:'Peepal secondary programme',type:'School methodology',url:'https://www.peepalprodigy.in/secondary-school.html'},
  {id:'ar9',audience:'11-12',title:'Peepal senior secondary groups',type:'School subject groups',url:'https://www.peepalprodigy.in/senior-secondary-school.html'},
  {id:'ar10',audience:'6-12',title:'CBSE affiliation record - 1930782',type:'Official school record',url:'https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/1930782'}
];
seed.schoolTimetable=[];
seed.schoolEvents=[];
seed.attendanceRecords=[];
seed.learningReflections=[];
seed.tutorFeedback=[];
seed.coCurricularRecords=[];
seed.readingProgress=[];
seed.syncSuggestions=[];
const collections=['people','tasks','events','issues','contacts','pointTransactions','expenses','budgets','incomes','liabilities','moneyGoals','inventoryItems','meals','assets','wisdomEntries','learningTopics','goals','focusSessions','academicProfiles','syllabusItems','studyPlans','academicDeliverables','academicAssessments','practiceLogs','academicResources','schoolTimetable','schoolEvents','attendanceRecords','learningReflections','tutorFeedback','coCurricularRecords','readingProgress','syncSuggestions','newsItems','discussions','polls','volunteerOpportunities','guides','lifeRecords'];
function normalizeGoogleSync(value){
  const input=value&&typeof value==='object'?value:{};
  const categories=['bills','travel','school','health','deliveries','home','government'];
  return {
    mode:'direct',
    clientId:typeof input.clientId==='string'?input.clientId.trim():'',
    autoSync:Boolean(input.autoSync),
    calendarSync:input.calendarSync!==false,
    emailAnalysis:input.mode?Boolean(input.emailAnalysis):true,
    driveBackup:Boolean(input.driveBackup),
    reviewPolicy:input.reviewPolicy==='rules'?'rules':'review',
    lookbackDays:[7,30,90].includes(+input.lookbackDays)?+input.lookbackDays:30,
    categories:Array.isArray(input.categories)?input.categories.filter(item=>categories.includes(item)):clone(seed.settings.googleSync.categories),
    accounts:Array.isArray(input.accounts)?input.accounts.filter(item=>item&&typeof item==='object').slice(0,4).map((item,index)=>({slotId:String(item.slotId||`google-${index+1}`),personId:String(item.personId||''),email:String(item.email||'').trim(),consent:Boolean(item.consent),status:['pending','connected','paused','error'].includes(item.status)?item.status:'pending',lastSync:typeof item.lastSync==='string'?item.lastSync:''})):[]
  };
}
function normalizePhoneSms(value){
  const input=value&&typeof value==='object'?value:{};
  const categories=['bills','travel','school','health','deliveries','home','government'];
  return {ownerId:String(input.ownerId||'p1'),consent:Boolean(input.consent),lastImport:typeof input.lastImport==='string'?input.lastImport:'',importedCount:Math.max(0,+input.importedCount||0),sourceName:typeof input.sourceName==='string'?input.sourceName.slice(0,120):'',categories:Array.isArray(input.categories)?input.categories.filter(item=>categories.includes(item)):clone(seed.settings.phoneSms.categories)};
}
function normalize(value){
  if(!value||typeof value!=='object'||value.schemaVersion!==1)throw Error('Unsupported backup format');
  const next=clone(seed);
  const inputSettings=value.settings&&typeof value.settings==='object'?value.settings:{};
  next.settings={
    ...next.settings,
    theme:'light',
    appBackground:['waterfall','river','fern','meadow','lotus','monsoon','sunrise','glacier','bamboo','sky','grove','wildflower'].includes(inputSettings.appBackground)?inputSettings.appBackground:'waterfall',
    locale:typeof inputSettings.locale==='string'?inputSettings.locale:'en',
    activeWorkspace:['home','community','study'].includes(inputSettings.activeWorkspace)?inputSettings.activeWorkspace:'home',
    activeGroup:typeof inputSettings.activeGroup==='string'?inputSettings.activeGroup:'today',
    activeLearnerId:typeof inputSettings.activeLearnerId==='string'?inputSettings.activeLearnerId:'p3',
    sidebarCollapsed:Boolean(inputSettings.sidebarCollapsed),
    householdName:typeof inputSettings.householdName==='string'?inputSettings.householdName:'',
    language:typeof inputSettings.language==='string'?inputSettings.language:'English',
    primaryAddress:typeof inputSettings.primaryAddress==='string'?inputSettings.primaryAddress:'',
    timezone:typeof inputSettings.timezone==='string'?inputSettings.timezone:'Asia/Kolkata',
    foodPreference:typeof inputSettings.foodPreference==='string'?inputSettings.foodPreference:'',
    googleSync:normalizeGoogleSync(inputSettings.googleSync),
    phoneSms:normalizePhoneSms(inputSettings.phoneSms)
  };
  next.schoolProfile={...next.schoolProfile,...(value.schoolProfile&&typeof value.schoolProfile==='object'?clone(value.schoolProfile):{})};
  collections.forEach(key=>{if(Array.isArray(value[key]))next[key]=clone(value[key]).filter(item=>item&&typeof item==='object')});
  seed.academicResources.forEach(resource=>{if(!next.academicResources.some(item=>item.id===resource.id))next.academicResources.push(clone(resource))});
  next.tasks.forEach(item=>{item.id=String(item.id||uid('t'));item.context=['home','community','study'].includes(item.context)?item.context:'home';item.status=normalizeStatus(item.status);item.priority=['low','medium','high'].includes(item.priority)?item.priority:'medium';item.frequency=['Once','Daily','Weekly','Monthly','Yearly'].includes(item.frequency)?item.frequency:'Once'});
  next.events.forEach(item=>{item.id=String(item.id||uid('e'));item.context=['home','community','study'].includes(item.context)?item.context:'home';item.startAt=typeof item.startAt==='string'?item.startAt:''});
  next.issues.forEach(item=>{item.id=String(item.id||uid('i'));item.scope=item.scope==='civic'?'civic':'household';item.status=normalizeStatus(item.status);item.priority=['low','medium','high'].includes(item.priority)?item.priority:'medium'});
  next.people.forEach(item=>item.wellbeing=Math.min(100,Math.max(0,+item.wellbeing||0)));
  next.learningTopics.forEach(item=>{item.status=['backlog','progress','revision','done'].includes(item.status)?item.status:'backlog';item.proficiency=Math.min(100,Math.max(0,+item.proficiency||0));item.plannedHours=Math.max(0,+item.plannedHours||0)});
  next.academicProfiles.forEach(item=>{item.grade=Math.min(12,Math.max(6,+item.grade||6));item.targetPercent=Math.min(100,Math.max(33,+item.targetPercent||75));item.subjects=Array.isArray(item.subjects)?item.subjects.map(String):[];if(!item.school||['CBSE School','CBSE Senior Secondary School'].includes(item.school))item.school=next.schoolProfile.name;if(!item.schoolStage)item.schoolStage=item.grade>=11?'Senior Secondary - Grades 11-12':'Secondary - Grades 6-10';if(!item.subjectGroup)item.subjectGroup=item.grade===12?'G1A - PCM + Computer Science':'NCERT secondary programme'});
  next.syllabusItems.forEach(item=>{item.mastery=Math.min(100,Math.max(0,+item.mastery||0));item.plannedHours=Math.max(0,+item.plannedHours||0);item.status=['not-started','learning','revision','mastered'].includes(item.status)?item.status:'not-started'});
  next.studyPlans.forEach(item=>{item.minutes=Math.max(5,+item.minutes||30);item.status=['planned','done','missed'].includes(item.status)?item.status:'planned'});
  next.academicDeliverables.forEach(item=>{item.weight=Math.max(0,+item.weight||0);item.status=['todo','progress','submitted','done'].includes(item.status)?item.status:'todo'});
  next.academicAssessments.forEach(item=>{['score','maxScore','target','practicalScore','practicalMax'].forEach(key=>item[key]=Math.max(0,+item[key]||0));item.status=item.status==='scheduled'?'scheduled':'completed'});
  next.practiceLogs.forEach(item=>{['attempted','correct','minutes'].forEach(key=>item[key]=Math.max(0,+item[key]||0));item.correct=Math.min(item.attempted,item.correct)});
  next.schoolTimetable.forEach(item=>{item.day=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].includes(item.day)?item.day:'Monday';item.period=Math.max(1,+item.period||1)});
  next.schoolEvents.forEach(item=>{item.status=['planned','done','cancelled'].includes(item.status)?item.status:'planned'});
  next.attendanceRecords.forEach(item=>{item.status=['present','absent','leave','late','holiday'].includes(item.status)?item.status:'present'});
  next.learningReflections.forEach(item=>{['confidence','effort','clarity'].forEach(key=>item[key]=Math.min(5,Math.max(1,+item[key]||3)))});
  next.tutorFeedback.forEach(item=>{item.status=item.status==='done'?'done':'open'});
  next.coCurricularRecords.forEach(item=>{item.status=['active','paused','completed'].includes(item.status)?item.status:'active'});
  next.readingProgress.forEach(item=>{item.currentPage=Math.max(1,+item.currentPage||1);item.totalPages=Math.max(0,+item.totalPages||0);item.status=['not-started','reading','reviewed'].includes(item.status)?item.status:'not-started';item.bookmarks=Array.isArray(item.bookmarks)?[...new Set(item.bookmarks.map(Number).filter(page=>page>0))]:[];item.notes=Array.isArray(item.notes)?item.notes.filter(note=>note&&typeof note==='object').map(note=>({id:String(note.id||uid('rn')),page:Math.max(1,+note.page||1),text:String(note.text||''),createdAt:String(note.createdAt||'')})).filter(note=>note.text):[]});
  next.syncSuggestions.forEach(item=>{item.id=String(item.id||uid('sg'));item.source=['gmail','calendar','sms'].includes(item.source)?item.source:'gmail';item.category=['bills','travel','school','health','deliveries','home','government'].includes(item.category)?item.category:'home';item.title=String(item.title||'Imported update').slice(0,160);item.summary=String(item.summary||'').slice(0,300);item.sender=String(item.sender||'').slice(0,100);item.receivedAt=String(item.receivedAt||'');item.actionDate=String(item.actionDate||'').slice(0,10);item.urgency=['high','medium','normal'].includes(item.urgency)?item.urgency:'normal';item.decision=String(item.decision||'Review').slice(0,80);item.processedAt=String(item.processedAt||item.receivedAt||'');item.amount=Math.max(0,+item.amount||0);item.status=['pending','applied','dismissed'].includes(item.status)?item.status:'pending';item.sourceRef=String(item.sourceRef||item.id).slice(0,180);item.personId=String(item.personId||'')});
  next.goals.forEach(item=>{item.target=Math.max(1,+item.target||1);item.progress=Math.max(0,+item.progress||0)});
  next.expenses.forEach(item=>{item.amount=Math.max(0,+item.amount||0);item.domain=['food','housing','vehicle','health','family','learning','community'].includes(item.domain)?item.domain:(String(item.category||'').toLowerCase().includes('food')?'food':String(item.category||'').toLowerCase().match(/health|medical|pharmacy/)?'health':String(item.category||'').toLowerCase().match(/school|education|tuition/)?'learning':'housing')});
  next.budgets.forEach(item=>{item.amount=Math.max(0,+item.amount||0);item.domain=['food','housing','vehicle','health','family','learning','community'].includes(item.domain)?item.domain:'family';item.bucket=['Fixed','Flexible','Non-monthly'].includes(item.bucket)?item.bucket:'Flexible'});
  next.incomes.forEach(item=>{item.amount=Math.max(0,+item.amount||0);item.domain=['family','housing','learning'].includes(item.domain)?item.domain:'family'});
  next.liabilities.forEach(item=>{item.balance=Math.max(0,+item.balance||0);item.payment=Math.max(0,+item.payment||0);item.interestRate=Math.max(0,+item.interestRate||0);item.domain=['housing','vehicle','learning','family'].includes(item.domain)?item.domain:'family'});
  next.moneyGoals.forEach(item=>{item.target=Math.max(1,+item.target||1);item.saved=Math.max(0,+item.saved||0);item.contribution=Math.max(0,+item.contribution||0);item.domain=['food','housing','vehicle','health','family','learning','community'].includes(item.domain)?item.domain:'family'});
  next.inventoryItems.forEach(item=>item.quantity=Math.max(0,+item.quantity||0));
  return next;
}
function normalizeStatus(v){v=String(v||'todo').toLowerCase();return v==='completed'||v==='resolved'?'done':v==='in-progress'?'progress':v}
function migrate(){let current;try{current=JSON.parse(localStorage.getItem(KEY)||'null')}catch{}if(current?.schemaVersion===1)return normalize(current);const next=clone(seed);try{const oldHome=JSON.parse(localStorage.getItem('home-manager-vanilla-v2')||'null');if(oldHome){(oldHome.tasks||[]).forEach(x=>next.tasks.push({id:uid('t'),context:'home',type:'task',title:x.title,category:x.project||'Home',assignee:x.member||'',dueAt:x.due||'',priority:x.priority||'medium',status:normalizeStatus(x.status)}));(oldHome.expenses||[]).forEach(x=>next.expenses.push({id:uid('x'),title:x.title,category:x.category,amount:+x.amount||0,date:x.date||''}))}}catch{}try{const oldCommunity=JSON.parse(localStorage.getItem('kovaipudur-community-v2')||'null');if(oldCommunity){(oldCommunity.events||[]).forEach(x=>next.events.push({id:uid('e'),context:'community',title:x.title,category:x.category,startAt:(x.date||'')+'T09:00',venue:x.venue||''}));(oldCommunity.news||[]).forEach(x=>next.newsItems.push({id:uid('nw'),title:x.title,category:x.category,body:x.body,date:x.date||''}))}}catch{}try{const oldStudy=JSON.parse(localStorage.getItem('prodyjee-vanilla-v2')||'null');if(oldStudy){(oldStudy.topics||[]).forEach(x=>next.learningTopics.push({id:uid('l'),subject:x.subject,chapter:x.chapter,title:x.title,status:normalizeStatus(x.status),plannedHours:+x.hours||0,proficiency:+x.proficiency||0}))}}catch{}localStorage.setItem(KEY,JSON.stringify(next));return normalize(next)}
const data={KEY,seed,state:migrate(),uid,clone,normalize,save(){localStorage.setItem(KEY,JSON.stringify(this.state));return true},reset(){this.state=clone(seed);this.save()},money(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(+n||0)},date(v,opts={day:'numeric',month:'short'}){if(!v)return 'No date';const text=String(v),d=new Date(text.length===10?text+'T00:00':text);return isNaN(d)?text:d.toLocaleDateString('en-IN',opts)},esc(v){const d=document.createElement('div');d.textContent=v??'';return d.innerHTML},status:normalizeStatus};window.HM={data};
})();
