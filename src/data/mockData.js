export const TASKS = [
  {id:1,icon:'🚶',title:'Walk Instead of Drive',desc:'Walk or cycle for any commute up to 5km today. Skip the vehicle entirely for short trips.',difficulty:'easy',category:'transport',pts:50,creative:true},
  {id:2,icon:'🌳',title:'Plant 5 Trees',desc:'Plant 5 saplings in your area — courtyard, park, or roadside. Coordinate with local ward office.',difficulty:'hard',category:'trees',pts:200,creative:false},
  {id:3,icon:'💧',title:'Save 20 Liters of Water',desc:'Shorter shower, turn off taps, reuse cooking water. Track and submit your daily usage before & after.',difficulty:'medium',category:'water',pts:80,creative:true},
  {id:4,icon:'♻️',title:'Collect 5kg Recyclables',desc:'Gather plastic bottles, cardboard, metal cans from your home or street. Drop at nearest collection point.',difficulty:'medium',category:'waste',pts:100,creative:false},
  {id:5,icon:'💡',title:'4 Hours Zero Electronics',desc:'No TV, no AC, no unnecessary lights for 4 hours. Read a book, go outside, cook without mixer.',difficulty:'easy',category:'energy',pts:40,creative:true},
  {id:6,icon:'🌿',title:'Community Cleanup (1hr)',desc:'Join or organize a 1-hour cleanup of a public space — beach, garden, road, or market area.',difficulty:'medium',category:'waste',pts:120,creative:true},
  {id:7,icon:'🚌',title:'Use Public Transport All Day',desc:'Use only BEST bus or auto-rickshaw for all your travel today. Zero private vehicle.',difficulty:'easy',category:'transport',pts:60,creative:false},
  {id:8,icon:'🌱',title:'Start a Kitchen Garden',desc:'Plant one vegetable or herb in a pot at home. Tomato, mint, coriander — anything counts!',difficulty:'easy',category:'trees',pts:70,creative:true},
  {id:9,icon:'🪣',title:'Rainwater Harvesting Setup',desc:'Create or document a basic rainwater collection setup at home using buckets or drums.',difficulty:'hard',category:'water',pts:180,creative:false},
  {id:10,icon:'📱',title:'Spread Awareness Post',desc:'Share 1 environmental awareness post on social media and tag 3 friends to take the EcoMira pledge.',difficulty:'easy',category:'transport',pts:30,creative:true},
  {id:11,icon:'🔌',title:'Unplug Standby Devices',desc:'Unplug all devices not in use for 24 hours. TVs, chargers, appliances on standby all waste energy.',difficulty:'easy',category:'energy',pts:35,creative:true},
  {id:12,icon:'🧹',title:'Segregate Waste for 7 Days',desc:'Separate dry, wet, and hazardous waste every day for a week. Document daily with photos.',difficulty:'hard',category:'waste',pts:160,creative:false},
  {id:13,icon:'🚲',title:'Cycle to College/Office',desc:'Ride a bicycle to your workplace or college and back. Minimum 3km round trip.',difficulty:'medium',category:'transport',pts:90,creative:true},
  {id:14,icon:'☀️',title:'Solar Charging Challenge',desc:'Charge your phone or any device using a solar charger or power bank for one full day.',difficulty:'medium',category:'energy',pts:110,creative:false},
  {id:15,icon:'🌊',title:'Coastal/River Cleanup',desc:'Participate in a beach or Ulhas River bank cleanup drive. Minimum 30 minutes, bring gloves.',difficulty:'hard',category:'waste',pts:220,creative:false},
];

export const ACHIEVEMENTS = [
  {icon:'🌱',name:'First Seed',desc:'Complete your first task',locked:false,premium:false},
  {icon:'🌳',name:'Tree Hugger',desc:'Plant 5+ trees',locked:false,premium:false},
  {icon:'💧',name:'Water Warrior',desc:'Save 100L water',locked:false,premium:false},
  {icon:'♻️',name:'Recycling Pro',desc:'Submit 20kg recyclables',locked:true,premium:false},
  {icon:'⚡',name:'Energy Saver',desc:'10 energy tasks done',locked:false,premium:false},
  {icon:'🏆',name:'EcoChampion',desc:'Reach 1000 EcoPoints',locked:false,premium:false},
  {icon:'👑',name:'City Legend',desc:'Top 10 on leaderboard',locked:true,premium:true},
  {icon:'🌟',name:'Star Volunteer',desc:'50 tasks completed',locked:true,premium:false},
  {icon:'🔥',name:'30-Day Streak',desc:'30 consecutive days',locked:true,premium:false},
  {icon:'🎽',name:'Premium Member',desc:'Join EcoMira Premium',locked:true,premium:true},
  {icon:'📸',name:'Proof Master',desc:'20 verified proofs',locked:false,premium:false},
  {icon:'🤝',name:'Community Builder',desc:'Refer 5 friends',locked:true,premium:false},
];

export const LEADERBOARD = [
  {name:'Priya Sharma',area:'Mira Road East',pts:4820,avatar:'P'},
  {name:'Rohan Patil',area:'Bhayandar West',pts:4210,avatar:'R'},
  {name:'Sneha Joshi',area:'Kashimira',pts:3950,avatar:'S'},
  {name:'Aarav Mehta',area:'Navghar',pts:3640,avatar:'A'},
  {name:'Kavita Nair',area:'Mira Road West',pts:3380,avatar:'K'},
  {name:'You — Shivesh',area:'Mira Road East',pts:2340,avatar:'S',isYou:true},
];

export const TIPS = [
  {icon:'💧',text:'Turn off the tap while brushing teeth. You save up to 8 liters per minute!'},
  {icon:'🌳',text:'A single tree can absorb 22kg of CO₂ per year and provide shade equivalent to 10 ACs!'},
  {icon:'💡',text:'Switch off lights when leaving a room. 1 hour daily saves ~36kWh per year.'},
  {icon:'♻️',text:'Plastic takes 400-1000 years to decompose. Refuse single-use plastic today.'},
  {icon:'🚌',text:'One bus replaces 40 cars. Using public transport is the single biggest lifestyle change you can make.'},
  {icon:'🥗',text:'Eating one plant-based meal a week reduces your carbon footprint by 8%.'},
  {icon:'🪣',text:'Collecting 1mm of rainwater from a 10sqm roof gives you 10 liters. Set up a rain barrel!'},
  {icon:'🌱',text:'Kitchen waste composted properly becomes rich fertilizer. Start a compost bin today.'},
];

export const STRIP_TIPS = [
  'Did you know? Planting one tree absorbs ~22kg of CO₂ per year!',
  'Save water: A 5-minute shower uses 50L. Cut it to 3 minutes!',
  'Mira-Bhayandar goal: 1 lakh trees by 2026. Help us get there! 🌳',
  'Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water.',
  'Small act, big impact: Carry a cloth bag. Every plastic bag refused = planet saved.',
];

export const ACTIVITY_LOG = [
  {icon:'🌳',text:'Planted 3 trees — Mira Park',time:'Today, 9AM',pts:'+120'},
  {icon:'🚶',text:'Walked to college (4km)',time:'Yesterday',pts:'+50'},
  {icon:'💧',text:'Saved 25L water — shower',time:'2 days ago',pts:'+80'},
  {icon:'♻️',text:'Submitted 3kg recyclables',time:'3 days ago',pts:'+60'},
  {icon:'🌿',text:'Road cleanup — 1 hour',time:'5 days ago',pts:'+120'},
];

// MAP DATA
export const MAP_ACTIVITIES = [
  // Mira Road East
  {id:1,x:148,y:158,type:'tree',label:'Mira Park',user:'Priya S.',action:'Planted 5 trees',time:'2 min ago'},
  {id:2,x:168,y:175,type:'tree',label:'Sector 7 Garden',user:'Rohan M.',action:'Planted 3 trees',time:'8 min ago'},
  {id:3,x:130,y:190,type:'recycle',label:'Mira Road Depot',user:'Sneha K.',action:'Dropped 4kg recyclables',time:'12 min ago'},
  {id:4,x:175,y:148,type:'water',label:'Shanti Nagar',user:'Anil P.',action:'Saved 20L water',time:'15 min ago'},
  {id:5,x:145,y:210,type:'energy',label:'Vasant Vihar',user:'Kavita R.',action:'Zero power 4hrs',time:'22 min ago'},
  {id:6,x:158,y:165,type:'cleanup',label:'Link Road',user:'Dev T.',action:'1hr cleanup drive',time:'31 min ago'},
  {id:7,x:172,y:200,type:'tree',label:'Mira East Park',user:'Sunita J.',action:'Planted 2 trees',time:'35 min ago'},

  // Mira Road West
  {id:8,x:148,y:290,type:'water',label:'Shivaji Chowk',user:'Rahul B.',action:'Saved 15L water',time:'5 min ago'},
  {id:9,x:162,y:308,type:'recycle',label:'BMC Depot W',user:'Meera L.',action:'Dropped 6kg recyclables',time:'18 min ago'},
  {id:10,x:135,y:275,type:'tree',label:'Millennium Park',user:'Kiran V.',action:'Planted 7 trees',time:'27 min ago'},
  {id:11,x:170,y:325,type:'energy',label:'Golden Nest',user:'Pooja S.',action:'Solar charged phone',time:'42 min ago'},
  {id:12,x:148,y:342,type:'cleanup',label:'Mira West Beach',user:'Nikhil C.',action:'Beach cleanup 2hrs',time:'55 min ago'},

  // Kashimira
  {id:13,x:380,y:185,type:'tree',label:'Kashimira Park',user:'Raj G.',action:'Planted 10 trees',time:'3 min ago'},
  {id:14,x:420,y:210,type:'recycle',label:'Poonam Nagar',user:'Asha K.',action:'Dropped 8kg recyclables',time:'9 min ago'},
  {id:15,x:360,y:240,type:'water',label:'Silver Spring',user:'Vivek M.',action:'Saved 30L water',time:'14 min ago'},
  {id:16,x:450,y:195,type:'energy',label:'Cosmos Society',user:'Nisha P.',action:'Unplug drive 6hrs',time:'25 min ago'},
  {id:17,x:400,y:268,type:'cleanup',label:'Kashimira Rd',user:'Suresh T.',action:'Road cleanup 1hr',time:'38 min ago'},
  {id:18,x:438,y:248,type:'tree',label:'Mini Forest',user:'Anjali D.',action:'Planted 4 trees',time:'47 min ago'},

  // Navghar
  {id:19,x:200,y:430,type:'recycle',label:'Navghar Market',user:'Dinesh V.',action:'Dropped 10kg recyclables',time:'7 min ago'},
  {id:20,x:240,y:448,type:'tree',label:'Navghar Garden',user:'Lata B.',action:'Planted 3 trees',time:'19 min ago'},
  {id:21,x:170,y:458,type:'water',label:'Bhumi Apt.',user:'Ganesh S.',action:'Saved 25L water',time:'33 min ago'},
  {id:22,x:310,y:430,type:'energy',label:'Navghar East',user:'Rekha P.',action:'AC off for 8hrs',time:'51 min ago'},
  {id:23,x:280,y:470,type:'cleanup',label:'Navghar Beach',user:'Amit R.',action:'Beach cleanup 3hrs',time:'58 min ago'},

  // Bhayandar East
  {id:24,x:700,y:158,type:'tree',label:'Bhayandar Park',user:'Deepa M.',action:'Planted 6 trees',time:'4 min ago'},
  {id:25,x:730,y:185,type:'recycle',label:'Bhayandar Depot',user:'Ravi K.',action:'Dropped 5kg recyclables',time:'11 min ago'},
  {id:26,x:695,y:210,type:'water',label:'Ratan Nagar',user:'Simran J.',action:'Saved 18L water',time:'16 min ago'},
  {id:27,x:752,y:200,type:'energy',label:'Suncity Apt',user:'Manish G.',action:'Solar power day',time:'29 min ago'},
  {id:28,x:718,y:230,type:'cleanup',label:'Station Road',user:'Preethi A.',action:'Street cleanup 1hr',time:'44 min ago'},
  {id:29,x:742,y:168,type:'tree',label:'Bhayandar E. Garden',user:'Harish V.',action:'Planted 5 trees',time:'52 min ago'},

  // Bhayandar West
  {id:30,x:700,y:400,type:'recycle',label:'Creek Road Depot',user:'Nalini P.',action:'Dropped 7kg recyclables',time:'6 min ago'},
  {id:31,x:738,y:418,type:'tree',label:'Mangrove Zone',user:'Sunil M.',action:'Planted 8 mangroves',time:'13 min ago'},
  {id:32,x:775,y:395,type:'water',label:'Sai Nagar',user:'Geeta R.',action:'Saved 22L water',time:'21 min ago'},
  {id:33,x:760,y:448,type:'energy',label:'Laxmi Tower',user:'Vikram T.',action:'Zero power 5hrs',time:'36 min ago'},
  {id:34,x:720,y:462,type:'cleanup',label:'Bhayandar Creek',user:'Savita K.',action:'Creek cleanup 2hrs',time:'49 min ago'},
];

export const TYPE_CONFIG = {
  tree:    {color:'#22c55e',emoji:'🌳',ring:'rgba(34,197,94,0.3)'},
  recycle: {color:'#f59e0b',emoji:'♻️',ring:'rgba(245,158,11,0.3)'},
  energy:  {color:'#8b5cf6',emoji:'⚡',ring:'rgba(139,92,246,0.3)'},
  water:   {color:'#3b82f6',emoji:'💧',ring:'rgba(59,130,246,0.3)'},
  cleanup: {color:'#ec4899',emoji:'🌿',ring:'rgba(236,72,153,0.3)'},
};

export const FEED_MESSAGES = [
  {type:'tree',   text:'Priya S. planted 5 trees in Mira Park'},
  {type:'recycle',text:'Rohan M. dropped 6kg recyclables at Bhayandar'},
  {type:'water',  text:'Sneha K. saved 20L water in Kashimira'},
  {type:'cleanup',text:'Dev T. completed 1hr beach cleanup'},
  {type:'energy', text:'Kavita R. zero-power for 4hrs in Navghar'},
  {type:'tree',   text:'Raj G. planted 10 trees in Kashimira Park'},
  {type:'recycle',text:'Meera L. submitted 8kg recyclables'},
  {type:'water',  text:'Vivek M. saved 30L water — Shanti Nagar'},
  {type:'cleanup',text:'Suresh T. cleaned 500m of road in Bhayandar'},
  {type:'energy', text:'Manish G. used solar power all day'},
];
