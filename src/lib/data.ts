export type DestinationCharacteristic =
  | "Beach & Coast"
  | "Heritage"
  | "Nature"
  | "Mountains"
  | "Adventure"
  | "Wildlife"
  | "Culture"
  | "Slow Travel"
  | "Family"
  | "Romantic"
  | "Budget"
  | "Luxury"
  | "Food"
  | "Spiritual"
  | "Char Dham"
  | "7 Wonders"
  | "World Heritage";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  country: string;
  state?: string;
  city?: string;
  tag: string;
  description: string;
  longDescription?: string;
  image: string;
  imageCredit?: { author: string; license: string; sourceUrl: string };
  gallery?: string[];
  rating: string;
  duration: string;
  budget: string;
  dailyBudget?: string;
  bestTime: string;
  seasons: string[];
  color: string;
  characteristics: DestinationCharacteristic[];
  tags: string[];
  travelStyles: string[];
  knownFor: string[];
  topAttractions?: string[];
  hiddenGems?: string[];
  thingsToDo?: { title: string; desc: string }[];
  localFood?: string[];
  cultureTips?: string[];
  safetyTips?: string[];
  stayInfo?: {
    budget: string;
    midRange: string;
    luxury: string;
    recommendedArea: string;
  };
  routes?: {
    from: string;
    distance: string;
    flight?: string;
    train?: string;
    car?: string;
    bus?: string;
  }[];
  packingList?: string[];
  faqs?: { q: string; a: string }[];
  coordinates?: [number, number];
  categoryType?: "standard" | "jyotirlinga" | "wonder" | "heritage";
};

export const destinations: Destination[] = [
  // ==========================================
  // 1. CORE DESTINATIONS (INDIA & WORLD)
  // ==========================================
  {
    slug: "kerala",
    name: "Kerala",
    region: "South India",
    country: "India",
    state: "Kerala",
    city: "Kochi / Alleppey / Munnar",
    tag: "Backwaters & spice trails",
    description: "Slow mornings, emerald lagoons, and a coastline that knows how to linger.",
    longDescription: "Known as God's Own Country, Kerala captivates travellers with palm-fringed backwaters in Alleppey, rolling misty tea estates in Munnar, dramatic sea cliffs in Varkala, and historic spice trading routes in Fort Kochi.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.9",
    duration: "5–7 days",
    budget: "₹28,000",
    dailyBudget: "₹3,500",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Monsoon"],
    color: "#dcefe6",
    characteristics: ["Nature", "Slow Travel", "Beach & Coast", "Culture", "Romantic", "Food"],
    tags: ["Nature", "Slow travel", "Beach", "Ayurveda", "Romantic"],
    travelStyles: ["Slow travel", "Wellness", "Nature", "Romantic"],
    knownFor: ["Alleppey Houseboats", "Munnar Tea Hills", "Kathakali Dance", "Spice Plantations"],
    topAttractions: ["Vembanad Lake Backwaters", "Mattancherry Palace", "Eravikulam National Park", "Athirappilly Waterfalls"],
    hiddenGems: ["Munroe Island village canoe canals", "Silent Valley National Park", "Marari fishing village"],
    thingsToDo: [
      { title: "Overnight Houseboat Cruise", desc: "Drift along palm-canopied backwaters while sampling freshly prepared Karimeen Pollichathu." },
      { title: "Munnar Tea Estate Trek", desc: "Walk through cloud-wrapped tea trails and visit centuries-old orthodox tea factories." },
      { title: "Watch Kathakali & Kalaripayattu", desc: "Experience ancient storytelling through dramatic facial expressions and martial movements." }
    ],
    localFood: ["Appam with Stew", "Karimeen Pollichathu (Pearl Spot Fish)", "Malabar Parotta & Curry", "Puttu and Kadala"],
    cultureTips: ["Dress respectfully when entering temples", "Ayurvedic treatments are best booked through certified centers"],
    safetyTips: ["Check backwater ferry timings", "Carry insect repellent and rain protection during monsoon"],
    stayInfo: {
      budget: "₹1,200 – ₹2,500/night (Backwater Homestays)",
      midRange: "₹4,000 – ₹8,000/night (Heritage Resorts & Plantation Bungalows)",
      luxury: "₹12,000 – ₹35,000/night (Luxury Houseboats & Private Lagoon Villas)",
      recommendedArea: "Fort Kochi for heritage, Alleppey for backwaters, Old Munnar for tea views"
    },
    routes: [
      { from: "Mumbai", distance: "1,350 km", flight: "2 hrs to Cochin (COK)", train: "22 hrs (Netravati Express)", car: "24 hrs via NH 66" },
      { from: "Delhi", distance: "2,600 km", flight: "3 hrs 15 mins to Cochin", train: "40 hrs (Kerala Express)" },
      { from: "Bengaluru", distance: "530 km", flight: "1 hr 10 mins", train: "10 hrs", car: "9 hrs via NH 44 / Salem" }
    ],
    packingList: ["Breathable cottons", "Waterproof jacket or umbrella", "Comfortable slip-on sandals", "Sunscreen & hat", "Mosquito repellent"],
    coordinates: [9.9312, 76.2673]
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West India",
    country: "India",
    state: "Goa",
    city: "Panaji / North & South Goa",
    tag: "Coastal energy & Portuguese charm",
    description: "Portuguese lanes, salt-air sunsets, and long tables by the Arabian sea.",
    longDescription: "From the bustling beach shacks and night markets of North Goa to the quiet pastel villas, spice farms, and pristine secluded coves of South Goa, Goa offers an eclectic blend of Indian and Portuguese heritage.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.8",
    duration: "3–5 days",
    budget: "₹18,500",
    dailyBudget: "₹2,800",
    bestTime: "Nov – Feb",
    seasons: ["Winter", "Monsoon"],
    color: "#f4e3c7",
    characteristics: ["Beach & Coast", "Heritage", "Food", "Romantic", "Adventure", "Slow Travel"],
    tags: ["Beach", "Heritage", "Food", "Nightlife", "Romantic"],
    travelStyles: ["Beach life", "Culinary exploration", "Slow living"],
    knownFor: ["Palolem & Vagator Beaches", "Fontainhas Latin Quarter", "Dudhsagar Falls", "Goan Seafood"],
    topAttractions: ["Basilica of Bom Jesus", "Fort Aguada", "Cabo de Rama", "Chapora Fort"],
    hiddenGems: ["Divar Island heritage trail", "Kakolem Secret Beach", "Chorao Bird Sanctuary"],
    thingsToDo: [
      { title: "Walk Fontainhas Latin Quarter", desc: "Discover Portuguese colonial architecture, vivid yellow and indigo facades, and artisanal bakeries." },
      { title: "Kayak along Nerul Backwaters", desc: "Paddle through tranquil mangrove forests in early morning quiet." },
      { title: "Sunset at Cola Beach Lagoon", desc: "Swim where fresh volcanic freshwater lagoon meets the Arabian Sea waves." }
    ],
    localFood: ["Goan Fish Curry Rice", "Pork Vindaloo / Mushroom Xacuti", "Bebinca dessert", "Poi bread with chorizo"],
    stayInfo: {
      budget: "₹1,000 – ₹2,200/night (Beach shacks & boutique hostels)",
      midRange: "₹3,500 – ₹7,500/night (Portuguese villa homestays)",
      luxury: "₹14,000 – ₹40,000/night (5-star beachfront resorts in South Goa)",
      recommendedArea: "Fontainhas for culture, Anjuna/Vagator for social scene, Agonda/Palolem for peace"
    },
    routes: [
      { from: "Mumbai", distance: "580 km", flight: "1 hr 10 mins to GOI/GOX", train: "8 hrs (Vande Bharat)", car: "10 hrs via NH 66" },
      { from: "Bengaluru", distance: "560 km", flight: "1 hr 15 mins", train: "12 hrs", car: "10 hrs via NH 48" }
    ],
    packingList: ["Swimwear", "Light linen shirts", "Sun protection & shades", "Flip flops & walking shoes"],
    coordinates: [15.2993, 74.124]
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    region: "North India",
    country: "India",
    state: "Jammu & Kashmir",
    city: "Srinagar / Gulmarg / Pahalgam",
    tag: "Valleys of poetry & snow",
    description: "Misty lakes, snow-capped pir panjal peaks, and pine scented air.",
    longDescription: "Revered for centuries as heaven on earth, Kashmir enchants with wooden houseboats on Dal Lake, gondola rides over powdery Gulmarg snow, and the serene Lidder river meadows of Pahalgam.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a4d8?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "6–8 days",
    budget: "₹34,000",
    dailyBudget: "₹4,800",
    bestTime: "Apr – Oct / Dec – Feb",
    seasons: ["Spring / Autumn", "Summer", "Winter"],
    color: "#dce8ef",
    characteristics: ["Mountains", "Nature", "Romantic", "Culture", "Adventure", "Slow Travel"],
    tags: ["Mountains", "Snow", "Romantic", "Nature", "Photography"],
    travelStyles: ["Nature", "Photography", "Romantic", "Adventure"],
    knownFor: ["Dal Lake Shikara", "Gulmarg Gondola", "Betaab Valley", "Kashmiri Kahwa & Wazwan"],
    topAttractions: ["Mughal Gardens (Shalimar & Nishat)", "Apharwat Peak Gulmarg", "Aru Valley", "Shankaracharya Temple"],
    hiddenGems: ["Doodhpathri milk valley", "Gurez Valley border trail", "Sinthan Top pass"],
    thingsToDo: [
      { title: "Shikara Ride at Dawn", desc: "Glide through Dal Lake's floating vegetable market at first light with freshly brewed saffron Kahwa." },
      { title: "Gulmarg Gondola Phase 2", desc: "Ascend to 13,780 ft for panoramic views of snowbound Himalayan peaks." },
      { title: "Pony Trek in Baisaran Valley", desc: "Traverse pine forests to reach Kashmir's vibrant 'Mini Switzerland'." }
    ],
    localFood: ["Kashmiri Rogan Josh", "Gushtaba & Rista", "Saffron Kahwa", "Haakh greens & Kashmiri Dum Aloo"],
    stayInfo: {
      budget: "₹1,500 – ₹3,000/night (Srinagar guesthouses)",
      midRange: "₹4,500 – ₹9,000/night (Heritage cedar houseboats on Nigeen Lake)",
      luxury: "₹18,000 – ₹45,000/night (Luxury alpine ski resorts in Gulmarg)",
      recommendedArea: "Nigeen Lake for peaceful houseboat stays, Gulmarg for skiing"
    },
    routes: [
      { from: "Delhi", distance: "800 km", flight: "1 hr 25 mins to Srinagar (SXR)", train: "To Jammu Tawi + 5 hrs cab" },
      { from: "Mumbai", distance: "2,000 km", flight: "2 hrs 45 mins direct" }
    ],
    packingList: ["Thermal innerwear", "Warm woolen socks & gloves", "Insulated waterproof jacket", "Sturdy snow boots"],
    coordinates: [34.0837, 74.7973]
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "North India",
    country: "India",
    state: "Ladakh",
    city: "Leh / Nubra Valley / Pangong",
    tag: "High-altitude clarity & ancient passes",
    description: "Tibetan monasteries perched on moonscapes, turquoise lakes, and starry skies.",
    longDescription: "The Land of High Passes is a high-altitude desert world of dramatic geological formations, centuries-old Buddhist gompas, double-humped Bactrian camels in Hunder dunes, and the shifting blues of Pangong Tso.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "6–9 days",
    budget: "₹38,000",
    dailyBudget: "₹5,200",
    bestTime: "May – Sep",
    seasons: ["Summer"],
    color: "#e8dcc8",
    characteristics: ["Adventure", "Mountains", "Nature", "Culture", "Slow Travel"],
    tags: ["Adventure", "Mountains", "Biking", "Spiritual", "Photography"],
    travelStyles: ["Adventure", "Road trips", "Photography", "Cultural immersion"],
    knownFor: ["Pangong Tso Lake", "Khardung La Pass", "Nubra Valley Sand Dunes", "Thiksey Monastery"],
    topAttractions: ["Shanti Stupa", "Hemis Gompa", "Magnetic Hill", "Tso Moriri Lake"],
    hiddenGems: ["Turtuk Balti village near LoC", "Zanskar Valley gorge", "Hanle Dark Sky Reserve"],
    thingsToDo: [
      { title: "Stargazing at Hanle", desc: "Witness the Milky Way in India's official Dark Sky Sanctuary at 14,000 ft." },
      { title: "Cross Khardung La Pass", desc: "Drive across one of the world's highest motorable passes at 17,982 ft." },
      { title: "Morning Chants at Thiksey", desc: "Sit quietly in the multi-storey monastery courtyard during sunrise prayers." }
    ],
    localFood: ["Thukpa & handmade Momos", "Butter Tea (Gur Gur Chai)", "Skyu pasta soup", "Apricot jams and cakes"],
    stayInfo: {
      budget: "₹1,200 – ₹2,800/night (Leh homestays)",
      midRange: "₹4,000 – ₹8,500/night (Luxury glamping tents in Nubra & Pangong)",
      luxury: "₹18,000 – ₹50,000/night (Eco-luxury boutique palaces like Nimmu House)",
      recommendedArea: "Upper Leh for walking distance to markets, Diskit for Nubra Valley"
    },
    routes: [
      { from: "Delhi", distance: "1,000 km", flight: "1 hr 15 mins direct to Leh (IXL)" },
      { from: "Manali", distance: "430 km", car: "2 days scenic high-mountain highway" }
    ],
    packingList: ["UV Protection sunglasses", "High-SPF sunscreen & lip balm", "Layered fleece and windbreaker", "Diamox for altitude acclimatization"],
    coordinates: [34.1526, 77.5771]
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    region: "North India",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    tag: "Rose-coloured royalty & vibrant crafts",
    description: "Terracotta palace facades, artisanal jewel bazars, and grand hilltop fortresses.",
    longDescription: "The Pink City is Rajasthan's royal epicenter, framed by the majestic Amber Fort, the honeycomb windows of Hawa Mahal, and the astronomical precision of Jantar Mantar.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "3–5 days",
    budget: "₹19,500",
    dailyBudget: "₹3,200",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#f1d8c9",
    characteristics: ["Heritage", "Culture", "Food", "Family", "Romantic", "Luxury", "World Heritage"],
    tags: ["Heritage", "Forts", "Food", "Shopping", "Royal"],
    travelStyles: ["Heritage", "Food", "Photography", "Family"],
    knownFor: ["Amber Fort", "Hawa Mahal", "City Palace", "Block Printing & Gemstones"],
    topAttractions: ["Nahargarh Fort Sunset", "Jantar Mantar", "Albert Hall Museum", "Patrika Gate"],
    hiddenGems: ["Panna Meena ka Kund stepwell", "Amer village heritage walk", "Galta Ji monkey temple"],
    thingsToDo: [
      { title: "Sunset at Nahargarh Fort", desc: "Watch the pink city turn into an amber sea of lights from the hilltop ramparts." },
      { title: "Block Print Workshop in Bagru", desc: "Learn natural dyeing techniques directly from traditional Chippa master artisans." },
      { title: "Heritage Dinner at City Palace", desc: "Taste authentic royal recipes in opulent regal courtyards." }
    ],
    localFood: ["Dal Baati Churma", "Laal Maas", "Pyaaz Kachori with spicy tamarind chutney", "Ghewar sweet"],
    stayInfo: {
      budget: "₹1,200 – ₹2,500/night (Heritage havelis in Bani Park)",
      midRange: "₹4,500 – ₹10,000/night (Restored royal residences like Shahpura Haveli)",
      luxury: "₹25,000 – ₹90,000/night (Palatial suites at Rambagh Palace)",
      recommendedArea: "C-Scheme for cafes, Bani Park for havelis, Amer for fort atmosphere"
    },
    routes: [
      { from: "Delhi", distance: "280 km", flight: "55 mins", train: "3.5 hrs (Vande Bharat / Shatabdi)", car: "4 hrs via Delhi-Mumbai Expressway" },
      { from: "Mumbai", distance: "1,150 km", flight: "1 hr 45 mins direct" }
    ],
    packingList: ["Comfortable cotton walking shoes", "Sun hat", "Modest attire for temples", "Camera with wide lens"],
    coordinates: [26.9124, 75.7873]
  },
  {
    slug: "udaipur",
    name: "Udaipur",
    region: "West India",
    country: "India",
    state: "Rajasthan",
    city: "Udaipur",
    tag: "Lake-city romance & white marble",
    description: "Reflections of royal palaces on calm waters, rooftop candlelight, and Aravalli hills.",
    longDescription: "Known as the Venice of the East, Udaipur is crowned by the floating Lake Palace on Lake Pichola, the colossal City Palace, and quaint ghats alive with folk music and evening breezes.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "3–4 days",
    budget: "₹22,000",
    dailyBudget: "₹3,800",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#e5d8c5",
    characteristics: ["Romantic", "Heritage", "Slow Travel", "Culture", "Luxury", "Food"],
    tags: ["Romantic", "Lakes", "Heritage", "Luxury", "Palaces"],
    travelStyles: ["Romantic", "Heritage", "Slow travel", "Luxury"],
    knownFor: ["Lake Pichola Boat Ride", "City Palace Udaipur", "Jag Mandir", "Monsoon Palace"],
    topAttractions: ["Saheliyon Ki Bari", "Bagore Ki Haveli Folk Show", "Fateh Sagar Lake", "Karni Mata Ropeway"],
    hiddenGems: ["Badi Lake & Bahubali Hill viewpoint", "Shilpgram artisan village", "Ahar Cenotaphs"],
    thingsToDo: [
      { title: "Sunset Boat Cruise on Lake Pichola", desc: "Marvel at shimmering reflections of the City Palace and Jag Mandir as dusk settles." },
      { title: "Dharohar Folk Dance at Bagore Ki Haveli", desc: "Watch traditional Chari, Ghoomar, and puppet dance routines right on the water's edge." }
    ],
    localFood: ["Gatte Ki Sabzi", "Kadhi Pakoda", "Udaipur style Mirchi Vada", "Rabri Malpua"],
    stayInfo: {
      budget: "₹1,500 – ₹3,000/night (Lakeside havelis near Gangaur Ghat)",
      midRange: "₹5,000 – ₹12,000/night (Lakeview boutique hotels)",
      luxury: "₹30,000 – ₹1,20,000/night (Taj Lake Palace & The Leela Palace)",
      recommendedArea: "Lal Ghat and Hanuman Ghat for uninterrupted lake views"
    },
    routes: [
      { from: "Delhi", distance: "660 km", flight: "1 hr 15 mins", train: "12 hrs (Mewar Express)" },
      { from: "Mumbai", distance: "750 km", flight: "1 hr 20 mins" }
    ],
    packingList: ["Camera", "Smart casual evening wear for palace dinners", "Comfortable walking shoes for steep ghats"],
    coordinates: [24.5854, 73.7125]
  },
  {
    slug: "hampi",
    name: "Hampi",
    region: "South India",
    country: "India",
    state: "Karnataka",
    city: "Hampi / Hospet",
    tag: "Stones, empires, and open skies",
    description: "Boulders strewn across banana plantations and dramatic ruins of the Vijayanagara Empire.",
    longDescription: "A UNESCO World Heritage marvel, Hampi is an open-air historical wonderland where 14th-century temple monoliths and royal pavilions rise against surreal granite boulder hills.",
    image: "https://images.unsplash.com/photo-1600100397608-f010d6e2c5e9?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "3–4 days",
    budget: "₹16,000",
    dailyBudget: "₹2,700",
    bestTime: "Oct – Feb",
    seasons: ["Winter", "Monsoon"],
    color: "#e8d6b5",
    characteristics: ["Heritage", "Adventure", "Slow Travel", "Culture", "Budget", "World Heritage"],
    tags: ["Heritage", "Ruins", "Bouldering", "History", "River"],
    travelStyles: ["Heritage", "Adventure", "Photography", "Slow travel"],
    knownFor: ["Virupaksha Temple", "Stone Chariot at Vijaya Vittala", "Coracle Ride on Tungabhadra", "Matanga Hill Sunrise"],
    topAttractions: ["Lotus Mahal", "Elephant Stables", "Achyutaraya Temple", "Hemakuta Hill"],
    hiddenGems: ["Sanapur Lake cliff jumping & bouldering", "Anjaneya Hill sunset", "Kishkinda mythological valley"],
    thingsToDo: [
      { title: "Sunrise from Matanga Hill", desc: "Climb the highest point in Hampi for 360-degree views of morning mist lifting over 1,600 monuments." },
      { title: "Bicycle across the Royal Enclosure", desc: "Pedal along ancient stone roads past stepwells, baths, and ceremonial platforms." }
    ],
    localFood: ["South Indian Banana Leaf Thali", "Crispy Masala Dosa with coconut chutney", "Fresh cold pressed pomegranate juice"],
    stayInfo: {
      budget: "₹800 – ₹2,000/night (Guesthouses across the river in Anegundi)",
      midRange: "₹3,500 – ₹7,500/night (Heritage cottages and boulder-view eco resorts)",
      luxury: "₹15,000 – ₹35,000/night (Evolve Back Kamalapura Palace)",
      recommendedArea: "Hampi Bazaar for temples, Anegundi / Sanapur for chilled hippie vibe"
    },
    routes: [
      { from: "Bengaluru", distance: "340 km", train: "6 hrs (Hampi Express)", car: "6.5 hrs via NH 48 / NH 50" },
      { from: "Goa", distance: "310 km", train: "7 hrs (Amaravati Express)", car: "6 hrs" }
    ],
    packingList: ["Trekking shoes with solid grip for rock surfaces", "Sun hat and scarf", "Hydration pack"],
    coordinates: [15.335, 76.46]
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    region: "Asia",
    country: "Japan",
    city: "Kyoto",
    tag: "Quietly unforgettable & Zen gardens",
    description: "Temple bells, moss gardens, bamboo groves, and a city that rewards taking the long way.",
    longDescription: "The former imperial capital of Japan preserves over a thousand classical Buddhist temples, Shinto shrines, traditional wooden machiya townhouses, and the serene tea ceremony culture of Gion.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "4–6 days",
    budget: "$1,240 (₹1,02,000)",
    dailyBudget: "$160 (₹13,000)",
    bestTime: "Mar – May / Oct – Nov",
    seasons: ["Spring / Autumn", "Winter"],
    color: "#f1e0e5",
    characteristics: ["Culture", "Heritage", "Nature", "Slow Travel", "Food", "Romantic", "World Heritage"],
    tags: ["Culture", "Temples", "Cherry blossoms", "Tea", "Zen"],
    travelStyles: ["Cultural immersion", "Zen gardens", "Food & Tea", "Photography"],
    knownFor: ["Fushimi Inari Torii Gates", "Kinkaku-ji Golden Pavilion", "Arashiyama Bamboo Grove", "Gion Geisha District"],
    topAttractions: ["Kiyomizu-dera Temple", "Philosopher's Path", "Nijo Castle Nightingale Floors", "Tenryu-ji Zen Garden"],
    hiddenGems: ["Otagi Nenbutsu-ji whimsical stone statues", "Kurama to Kibune mountain hike", "Murin-an villa garden"],
    thingsToDo: [
      { title: "Hike Fushimi Inari at Dusk", desc: "Walk through 10,000 vermilion torii gates winding up sacred Mount Inari as lantern lights glow." },
      { title: "Authentic Matcha Ceremony in Uji", desc: "Whisk ceremonial grade stone-ground green tea in a traditional tatami tearoom." }
    ],
    localFood: ["Kyoto Kaiseki banquet", "Yudofu (simmered soft tofu)", "Matcha soft serve & Parfaits", "Saba Zushi (cured mackerel sushi)"],
    stayInfo: {
      budget: "$40 – $80/night (Boutique capsule hotels & guest machiyas)",
      midRange: "$150 – $320/night (Traditional Japanese Ryokan with onsen bath)",
      luxury: "$600 – $1,800/night (Hoshinoya Kyoto & Aman Kyoto)",
      recommendedArea: "Gion for atmosphere, Higashiyama for temple walks, Downtown for dining"
    },
    routes: [
      { from: "Tokyo", distance: "450 km", train: "2 hrs 15 mins via Shinkansen Tokaido Bullet Train" },
      { from: "Osaka Kansai (KIX)", distance: "95 km", train: "1 hr 15 mins (Haruka Express)" }
    ],
    packingList: ["Comfortable slip-on shoes for temple floors", "Universal adapter", "Light layers for spring/autumn breezes"],
    coordinates: [35.0116, 135.7681]
  },
  {
    slug: "swiss-alps",
    name: "Swiss Alps",
    region: "Europe",
    country: "Switzerland",
    city: "Zermatt / Interlaken / Lucerne",
    tag: "Alpine scale & pristine summits",
    description: "Mountain railways, wildflower pastures, glacier air, and dramatic snow ridges.",
    longDescription: "Home to the iconic Matterhorn, Jungfraujoch Top of Europe, and mirror-clear alpine lakes, the Swiss Alps represent the pinnacle of mountain luxury, cogwheel rail engineering, and outdoor adventures.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "5–8 days",
    budget: "$1,900 (₹1,56,000)",
    dailyBudget: "$280 (₹23,000)",
    bestTime: "Jun – Sep / Dec – Mar",
    seasons: ["Summer", "Winter"],
    color: "#d8e5e7",
    characteristics: ["Mountains", "Nature", "Adventure", "Luxury", "Family", "Romantic", "World Heritage"],
    tags: ["Mountains", "Glaciers", "Trains", "Skiing", "Scenic"],
    travelStyles: ["Scenic rail", "Alpine hiking", "Winter sports", "Luxury"],
    knownFor: ["Matterhorn in Zermatt", "Jungfraujoch Railway", "Glacier Express", "Lake Lucerne"],
    topAttractions: ["Grindelwald First Cliff Walk", "Gornergrat Panorama Train", "Lauterbrunnen 72 Waterfalls", "Mount Pilatus"],
    hiddenGems: ["Oeschinensee mountain coaster & lake", "Mürren car-free village", "Aare Gorge canyon walk"],
    thingsToDo: [
      { title: "Ride the Glacier Express", desc: "Journey through 91 tunnels and across 291 bridges in panoramic glass-roof carriages." },
      { title: "Hike the 5 Lakes Trail in Zermatt", desc: "Photograph the reflection of the Matterhorn mirrored in still glacial pools." }
    ],
    localFood: ["Swiss Cheese Fondue", "Crispy Rösti with fried egg", "Raclette scraped over new potatoes", "Artisanal Swiss Chocolate"],
    stayInfo: {
      budget: "$80 – $140/night (Alpine hostels & chalet rooms)",
      midRange: "$220 – $450/night (Traditional Swiss timber chalets with balcony views)",
      luxury: "$800 – $2,500/night (The Chedi Andermatt & Badrutt's Palace)",
      recommendedArea: "Lauterbrunnen for valley views, Zermatt for Matterhorn views"
    },
    routes: [
      { from: "Zurich (ZRH)", distance: "120 km", train: "1 hr 15 mins to Lucerne / 2 hrs to Interlaken" },
      { from: "Geneva (GVA)", distance: "210 km", train: "2.5 hrs to Zermatt" }
    ],
    packingList: ["Swiss Travel Pass", "Windproof alpine shell", "Polarized UV sunglasses", "Sturdy hiking boots"],
    coordinates: [46.8182, 8.2275]
  },
  {
    slug: "amalfi",
    name: "Amalfi Coast",
    region: "Europe",
    country: "Italy",
    city: "Positano / Amalfi / Ravello",
    tag: "Cliffside dolce vita & lemon groves",
    description: "Lemon orchards, blue-hour aperitivo, and pastel villas cascading into the Tyrrhenian Sea.",
    longDescription: "A breathtaking 50-kilometer stretch of Italian coastline where sheer cliffs plunge into azure waters, adorned with terraced lemon groves, bougainvillea, and glamorous clifftop restaurants.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "5–8 days",
    budget: "$1,680 (₹1,38,000)",
    dailyBudget: "$240 (₹19,800)",
    bestTime: "Apr – Jun / Sep – Oct",
    seasons: ["Spring / Autumn", "Summer"],
    color: "#dce8ef",
    characteristics: ["Beach & Coast", "Romantic", "Luxury", "Food", "Heritage", "Slow Travel", "World Heritage"],
    tags: ["Coast", "Romantic", "Italian food", "Villas", "Luxury"],
    travelStyles: ["Romantic", "Coastal living", "Culinary exploration", "Sailing"],
    knownFor: ["Positano Pastel Cliffs", "Ravello Villa Rufolo Gardens", "Capri Blue Grotto", "Limoncello Liqueur"],
    topAttractions: ["Path of the Gods (Sentiero degli Dei)", "Amalfi Cathedral (Duomo di Sant'Andrea)", "Fiordo di Furore", "Villa Cimbrone Infinity Terrace"],
    hiddenGems: ["Atrani smallest fishing village", "Valle delle Ferriere waterfall hike", "Cetara anchovy colatura workshops"],
    thingsToDo: [
      { title: "Hike Path of the Gods", desc: "Trek high above the coastline with dizzying panoramas of Capri and the sparkling sea." },
      { title: "Private Gozzo Boat Charter to Capri", desc: "Swim through turquoise sea caves and anchor beneath the Faraglioni limestone stacks." }
    ],
    localFood: ["Scialatielli ai Frutti di Mare (fresh seafood pasta)", "Delizia al Limone dessert", "Spaghetti alle Vongole", "Buffalo Mozzarella from Campania"],
    stayInfo: {
      budget: "$90 – $160/night (Guesthouses in Minori or Maiori)",
      midRange: "$280 – $550/night (Clifftop boutique B&Bs in Praiano)",
      luxury: "$1,000 – $3,200/night (Le Sirenuse & Belmond Hotel Caruso)",
      recommendedArea: "Positano for glamour, Praiano for sunsets, Ravello for tranquil mountain air"
    },
    routes: [
      { from: "Naples (NAP)", distance: "60 km", train: "1 hr to Sorrento + ferry/bus to Positano", car: "1.5 hrs scenic drive" },
      { from: "Rome", distance: "280 km", train: "1 hr 10 mins high speed Frecciarossa to Naples" }
    ],
    packingList: ["Linen resortwear", "Non-slip footwear for cobblestone stairs", "Swimsuit & sun hat"],
    coordinates: [40.6333, 14.6029]
  },
  {
    slug: "bali",
    name: "Bali",
    region: "Asia",
    country: "Indonesia",
    city: "Ubud / Uluwatu / Seminyak",
    tag: "Island ritual & terraced sanctuaries",
    description: "Emerald rice terraces, clifftop temple sunsets, wellness retreats, and soulful surf breaks.",
    longDescription: "The Island of the Gods combines deep Hindu spirituality, ancient Subak rice terrace irrigation systems, vibrant beach clubs, world-class yoga retreats, and volcanic crater lakes.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "5–8 days",
    budget: "$980 (₹80,000)",
    dailyBudget: "$120 (₹9,900)",
    bestTime: "Apr – Oct",
    seasons: ["Summer", "Spring / Autumn"],
    color: "#d9e8d3",
    characteristics: ["Beach & Coast", "Nature", "Slow Travel", "Culture", "Romantic", "Adventure", "Budget", "World Heritage"],
    tags: ["Beach", "Wellness", "Rice terraces", "Temples", "Surfing"],
    travelStyles: ["Wellness & Yoga", "Beach life", "Culture", "Slow travel"],
    knownFor: ["Tegallalang Rice Terraces", "Uluwatu Clifftop Temple & Kecak Dance", "Nusa Penida Kelingking Beach", "Ubud Sacred Monkey Forest"],
    topAttractions: ["Tanah Lot Sea Temple", "Mount Batur Sunrise Trek", "Tirta Empul Holy Water Spring", "Jatiluwih UNESCO Terraces"],
    hiddenGems: ["Sidemen Valley quiet rice villages", "Tukad Cepung cave waterfall", "Amed black sand diving"],
    thingsToDo: [
      { title: "Mount Batur Sunrise Trek", desc: "Climb an active volcano in early morning darkness to watch sunrise above the clouds." },
      { title: "Traditional Melukat Water Blessing", desc: "Participate in a centuries-old Balinese spiritual purification ceremony at a jungle temple spring." }
    ],
    localFood: ["Nasi Goreng & Satay Ayam with peanut sauce", "Babi Guling / Bebek Betutu (slow-roasted duck)", "Açaí smoothie bowls", "Fresh young coconut water"],
    stayInfo: {
      budget: "$25 – $50/night (Private bamboo bungalows in Ubud)",
      midRange: "$80 – $200/night (Private pool villa overlooking jungle ravine)",
      luxury: "$450 – $1,600/night (Four Seasons Sayan & Bulgari Resort Bali)",
      recommendedArea: "Ubud for culture and jungle, Uluwatu for surf and sunsets, Canggu for lively dining"
    },
    routes: [
      { from: "Singapore / KL", distance: "2.5 hrs flight to Denpasar Bali (DPS)" },
      { from: "Delhi / Mumbai", distance: "Direct / 1-stop flights via Singapore / Bangkok (7–9 hrs total)" }
    ],
    packingList: ["Temple sarong", "Light breathable activewear", "Swimwear", "Eco mosquito spray"],
    coordinates: [-8.3405, 115.092]
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "Middle East",
    country: "United Arab Emirates",
    city: "Dubai",
    tag: "Desert futurism & Arabian hospitality",
    description: "Sky-piercing architecture, golden dune safaris, historic creek dhows, and luxury shopping.",
    longDescription: "A futuristic metropolis in the Arabian desert featuring the world's tallest skyscraper (Burj Khalifa), monumental artificial islands, luxury marinas, and centuries-old spice and gold souks.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    rating: "4.7",
    duration: "4–6 days",
    budget: "$1,100 (₹90,000)",
    dailyBudget: "$180 (₹15,000)",
    bestTime: "Nov – Mar",
    seasons: ["Winter"],
    color: "#ead9c4",
    characteristics: ["Luxury", "Family", "Adventure", "Food", "Beach & Coast"],
    tags: ["Luxury", "Skyscrapers", "Desert safari", "Shopping", "Family"],
    travelStyles: ["Luxury", "Family", "Shopping", "Desert adventure"],
    knownFor: ["Burj Khalifa Observation Deck", "Desert Dune Bashing & Bedouin Camp", "Dubai Mall & Fountains", "Museum of the Future"],
    topAttractions: ["Palm Jumeirah", "Old Dubai Al Fahidi Historic Quarter", "Dubai Marina Yacht Cruise", "Miracle Garden"],
    hiddenGems: ["Al Qudra Desert Lakes & Love Lake", "Hatta Dam mountain kayaking", "Alserkal Avenue art district"],
    thingsToDo: [
      { title: "Sunset Desert Safari", desc: "4x4 dune bashing followed by traditional camel rides, tanoura dance, and barbecue under the desert stars." },
      { title: "Abra Boat Ride on Dubai Creek", desc: "Cross between Deira Gold Souk and Bur Dubai for just 1 Dirham on a traditional wooden boat." }
    ],
    localFood: ["Shawarma & Mixed Grill Platter", "Al Machboos spiced rice", "Luqaimat sweet dumplings with date syrup", "Karak Chai"],
    stayInfo: {
      budget: "$50 – $90/night (Deira & Bur Dubai city hotels)",
      midRange: "$140 – $280/night (Dubai Marina & Downtown suites)",
      luxury: "$600 – $2,500/night (Burj Al Arab & Atlantis The Royal)",
      recommendedArea: "Downtown for Burj Khalifa access, Dubai Marina for beach and nightlife"
    },
    routes: [
      { from: "Mumbai", distance: "1,900 km", flight: "3 hrs direct to Dubai (DXB)" },
      { from: "Delhi", distance: "2,200 km", flight: "3.5 hrs direct" }
    ],
    packingList: ["Lightweight summer clothes", "Pashmina/cardigan for air-conditioned malls", "Sunglasses & sunblock"],
    coordinates: [25.2048, 55.2708]
  },
  {
    slug: "paris",
    name: "Paris",
    region: "Europe",
    country: "France",
    city: "Paris",
    tag: "The art of lingering & luminous avenues",
    description: "Grand boulevards, world-defining art museums, sidewalk bistros, and Seine riverbanks.",
    longDescription: "The City of Light is an eternal capital of romance, art, haute cuisine, and architectural splendor, anchored by the Eiffel Tower, the Louvre, Notre-Dame, and bohemian Montmartre.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "4–6 days",
    budget: "$1,450 (₹1,20,000)",
    dailyBudget: "$220 (₹18,000)",
    bestTime: "Apr – Jun / Sep – Nov",
    seasons: ["Spring / Autumn", "Summer"],
    color: "#e5dce7",
    characteristics: ["Heritage", "Culture", "Food", "Romantic", "Luxury", "Slow Travel", "World Heritage"],
    tags: ["Romantic", "Art", "Museums", "Pastries", "Architecture"],
    travelStyles: ["Art & Museums", "Culinary exploration", "Romantic", "Slow walking"],
    knownFor: ["Eiffel Tower Sparkle", "Louvre Museum & Mona Lisa", "Montmartre & Sacré-Cœur", "Seine River Evening Cruise"],
    topAttractions: ["Musée d'Orsay", "Arc de Triomphe & Champs-Élysées", "Sainte-Chapelle Stained Glass", "Palace of Versailles"],
    hiddenGems: ["Palais-Royal garden arcades", "Canal Saint-Martin picnic spots", "Rue Crémieux pastel lane"],
    thingsToDo: [
      { title: "Picnic at Champ de Mars at Dusk", desc: "Enjoy fresh baguette, artisan cheese, and macarons as the Eiffel Tower lights illuminate." },
      { title: "Explore the Marais Courtyards", desc: "Wander through medieval cobblestone passages filled with art galleries, vintage boutiques, and patisseries." }
    ],
    localFood: ["Fresh Croissant & Pain au Chocolat", "Boeuf Bourguignon", "French Onion Soup", "Macarons from Ladurée"],
    stayInfo: {
      budget: "$70 – $130/night (Boutique hostels & Montmartre studios)",
      midRange: "$180 – $380/night (Charming Marais or Saint-Germain boutique hotels)",
      luxury: "$900 – $2,800/night (The Ritz Paris & Hôtel de Crillon)",
      recommendedArea: "Le Marais (3rd/4th arr.) for culture, Saint-Germain-des-Prés for cafes"
    },
    routes: [
      { from: "London", distance: "340 km", train: "2 hrs 15 mins via Eurostar" },
      { from: "Delhi / Mumbai", distance: "6,600 km", flight: "8.5 hrs direct to Paris Charles de Gaulle (CDG)" }
    ],
    packingList: ["Chic comfortable walking shoes", "Trench coat / stylish jacket", "Crossbody anti-theft bag"],
    coordinates: [48.8566, 2.3522]
  },

  // ==========================================
  // 2. THE 7 WONDERS OF THE WORLD
  // ==========================================
  {
    slug: "taj-mahal",
    name: "Taj Mahal",
    region: "North India",
    country: "India",
    state: "Uttar Pradesh",
    city: "Agra",
    tag: "Monument to eternal love in ivory marble",
    description: "The world's supreme triumph of Mughal symmetry, floral pietra dura inlay, and riverside romance.",
    longDescription: "Commissioned in 1632 by the Mughal Emperor Shah Jahan for his favorite wife Mumtaz Mahal, this UNESCO World Heritage Site and New 7 Wonder stands on the Yamuna riverbank, dazzling visitors with translucent white Makrana marble that shifts color from soft pink at dawn to shimmering gold at dusk.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "2–3 days",
    budget: "₹14,500",
    dailyBudget: "₹2,800",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#f6e4d0",
    characteristics: ["7 Wonders", "Heritage", "Romantic", "Culture", "World Heritage"],
    tags: ["7 Wonders", "Mughal", "Marble", "Romantic", "UNESCO"],
    travelStyles: ["Architecture", "Heritage", "Photography", "Romantic"],
    knownFor: ["Ivory Marble Dome", "Mehtab Bagh Sunset View", "Agra Fort", "Petha Sweet"],
    topAttractions: ["Taj Mahal Main Mausoleum", "Agra Fort", "Fatehpur Sikri", "Itimad-ud-Daulah (Baby Taj)"],
    hiddenGems: ["Mehtab Bagh moonlight reflection", "Kachhpura village heritage walk", "Kinari Bazaar spice lanes"],
    thingsToDo: [
      { title: "Sunrise View from the Central Garden", desc: "Watch early morning sun rays illuminate the marble dome with golden luminescence." },
      { title: "Sunset Silhouette across the Yamuna", desc: "Photograph the reflection from the Mughal gardens of Mehtab Bagh." }
    ],
    localFood: ["Agra Ka Petha (dry & kesar)", "Bedmi Puri & Aloo Sabzi", "Mughlai Biryani & Kebabs"],
    stayInfo: {
      budget: "₹1,200 – ₹2,500/night (Taj Ganj guesthouses)",
      midRange: "₹4,500 – ₹9,000/night (Boutique hotels with Taj terrace view)",
      luxury: "₹28,000 – ₹85,000/night (The Oberoi Amarvilas with private balcony Taj view)",
      recommendedArea: "Fatehabad Road for upscale resorts, Taj Ganj for walking access"
    },
    routes: [
      { from: "Delhi", distance: "210 km", train: "1 hr 40 mins (Gatimaan / Vande Bharat Express)", car: "3 hrs via Yamuna Expressway" }
    ],
    packingList: ["Comfortable slip-on shoes (shoe covers provided)", "Valid ID for monument entry", "Wide angle camera lens"],
    coordinates: [27.1751, 78.0421],
    categoryType: "wonder"
  },
  {
    slug: "great-wall-of-china",
    name: "Great Wall of China",
    region: "Asia",
    country: "China",
    city: "Beijing / Mutianyu / Simatai",
    tag: "Epic dragon ridge across northern mountains",
    description: "Over 21,000 kilometers of fortified masonry, watchtowers, and sweeping mountain panoramas.",
    longDescription: "Snaking across dramatic ridgelines for over two millennia, the Great Wall of China is one of humanity's greatest architectural and defense feats. Sections like Mutianyu and Jinshanling offer majestic stone battlements surrounded by pine-covered hills.",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "3–5 days",
    budget: "$1,200 (₹99,000)",
    dailyBudget: "$150",
    bestTime: "Apr – May / Sep – Nov",
    seasons: ["Spring / Autumn", "Summer"],
    color: "#e2d7c5",
    characteristics: ["7 Wonders", "Heritage", "Mountains", "Adventure", "World Heritage"],
    tags: ["7 Wonders", "China", "Hiking", "UNESCO", "Fortresses"],
    travelStyles: ["Historic hiking", "Photography", "Cultural immersion"],
    knownFor: ["Mutianyu Watchtowers", "Toboggan Ride", "Jinshanling Wild Wall", "Forbidden City Beijing"],
    topAttractions: ["Mutianyu Section", "Simatai Night Wall", "Forbidden City", "Summer Palace"],
    hiddenGems: ["Jiankou unrestored wild wall trek", "Gubei Water Town night lanterns", "Huanghuacheng lakeside wall"],
    thingsToDo: [
      { title: "Hike Jinshanling to Simatai", desc: "Traverse rolling mountain ridges passing dozens of Ming-era watchtowers." },
      { title: "Toboggan descent from Mutianyu", desc: "Glide down the scenic mountain chute from the wall ramparts." }
    ],
    localFood: ["Peking Roast Duck", "Hand-pulled Lanzhou Noodles", "Steamed Jiaozi Dumplings"],
    stayInfo: {
      budget: "$40 – $75/night (Gubei village guesthouses)",
      midRange: "$120 – $250/night (Brickyard retreat near Mutianyu)",
      luxury: "$500 – $1,200/night (Aman Summer Palace Beijing)",
      recommendedArea: "Huairou for direct wall access, Dongcheng Beijing for imperial sights"
    },
    routes: [
      { from: "Beijing Capital Airport (PEK)", distance: "70 km", car: "1.5 hrs private transfer / tourist shuttle" }
    ],
    packingList: ["High-grip trail shoes", "Windbreaker", "Hydration pack", "Passport for entry checks"],
    coordinates: [40.4319, 116.5704],
    categoryType: "wonder"
  },
  {
    slug: "petra",
    name: "Petra",
    region: "Middle East",
    country: "Jordan",
    city: "Wadi Musa / Petra",
    tag: "The Rose-Red City carved into desert canyons",
    description: "A lost Nabataean capital sculpted directly into rose-tinted sandstone cliff faces.",
    longDescription: "Hidden behind the dramatic 1.2-kilometer Siq canyon gorge, Petra was the flourishing desert trading hub of the Nabataean kingdom in the 1st century BCE. Highlights include the iconic Treasury (Al-Khazneh), the Monastery (Ad-Deir), and ancient rock-cut tombs.",
    image: "https://images.unsplash.com/photo-1579606032834-deaff715e75b?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "2–4 days",
    budget: "$1,350 (₹1,11,000)",
    dailyBudget: "$170",
    bestTime: "Mar – May / Sep – Nov",
    seasons: ["Spring / Autumn", "Winter"],
    color: "#eed2be",
    characteristics: ["7 Wonders", "Heritage", "Adventure", "Culture", "World Heritage"],
    tags: ["7 Wonders", "Jordan", "Desert", "Sandstone", "Nabataean"],
    travelStyles: ["Desert adventure", "Archaeology", "Photography"],
    knownFor: ["The Treasury (Al-Khazneh)", "The Siq Canyon", "The Monastery (Ad-Deir)", "Petra by Night (1,500 candles)"],
    topAttractions: ["High Place of Sacrifice", "Royal Tombs", "Little Petra (Siq al-Barid)", "Wadi Rum Desert"],
    hiddenGems: ["Back trail trek from Little Petra to Monastery", "Al-Khubtha cliff view over Treasury", "Bedouin cave mint tea"],
    thingsToDo: [
      { title: "Walk the Siq at First Light", desc: "Experience the dramatic moment the red Treasury facade reveals itself through the narrow canyon split." },
      { title: "Climb 800 stone steps to Ad-Deir", desc: "Reach the monumental mountain monastery overlooking desert canyons." }
    ],
    localFood: ["Jordanian Mansaf (lamb in fermented yogurt)", "Warm Falafel with Tahini", "Bedouin Sage Tea & Cardamom Coffee"],
    stayInfo: {
      budget: "$35 – $70/night (Wadi Musa town hotels)",
      midRange: "$110 – $220/night (Petra Moon Luxury Hotel near main gate)",
      luxury: "$450 – $900/night (Mövenpick Resort Petra right at the entrance)",
      recommendedArea: "Wadi Musa entrance plaza for walk-in convenience"
    },
    routes: [
      { from: "Amman (AMM)", distance: "235 km", car: "3 hrs via Desert Highway / scenic King's Highway" },
      { from: "Aqaba (AQJ)", distance: "125 km", car: "1.5 hrs" }
    ],
    packingList: ["Sun hat & UV protection sunglasses", "Breathable hiking boots", "Scarf for dust & canyon wind"],
    coordinates: [30.3285, 35.4444],
    categoryType: "wonder"
  },
  {
    slug: "colosseum",
    name: "Colosseum",
    region: "Europe",
    country: "Italy",
    city: "Rome",
    tag: "The monumental amphitheater of gladiators",
    description: "The supreme symbol of imperial Roman engineering, gladiatorial spectacles, and eternal history.",
    longDescription: "Constructed in 70–80 CE under the Flavian emperors, the Colosseum held up to 80,000 spectators for gladiatorial contests, public spectacles, and classical dramas. Standing at the heart of Rome alongside the Roman Forum and Palatine Hill, it remains the world's largest ancient amphitheater.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "3–5 days",
    budget: "$1,400 (₹1,15,000)",
    dailyBudget: "$210",
    bestTime: "Apr – Jun / Sep – Nov",
    seasons: ["Spring / Autumn", "Winter"],
    color: "#e8dcce",
    characteristics: ["7 Wonders", "Heritage", "Culture", "Food", "World Heritage"],
    tags: ["7 Wonders", "Rome", "Gladiators", "Ancient history", "UNESCO"],
    travelStyles: ["Historic exploration", "Culinary", "Art & Architecture"],
    knownFor: ["Hypogeum Underground Chambers", "Arena Floor", "Roman Forum & Palatine Hill", "Vatican Museums"],
    topAttractions: ["Trevi Fountain", "Pantheon", "Piazza Navona", "St. Peter's Basilica"],
    hiddenGems: ["Aventine Keyhole garden view", "Appian Way ancient cobbled bike route", "Trastevere cobblestone alleys"],
    thingsToDo: [
      { title: "Underground Hypogeum & Arena Tour", desc: "Walk where gladiators prepared and trapdoor mechanisms operated beneath the sands." },
      { title: "Twilight stroll across Roman Forum", desc: "Admire illuminated triumphal arches and temple columns as the sun sets over the Palatine." }
    ],
    localFood: ["Authentic Carbonara & Cacio e Pepe", "Supplì fried rice balls", "Artisanal Gelato & Roman thin-crust Pizza"],
    stayInfo: {
      budget: "$70 – $120/night (Monti boutique B&Bs)",
      midRange: "$180 – $360/night (Historic suites near Piazza Navona)",
      luxury: "$750 – $2,200/night (Hotel de Russie & Hassler Roma)",
      recommendedArea: "Rione Monti for artisan cafes near Colosseum, Trastevere for nightlife"
    },
    routes: [
      { from: "Rome Fiumicino Airport (FCO)", distance: "30 km", train: "32 mins (Leonardo Express to Termini Station)" }
    ],
    packingList: ["Comfortable cobblestone walking shoes", "Skip-the-line advance museum pass", "Refillable water bottle for public 'nasoni' fountains"],
    coordinates: [41.8902, 12.4922],
    categoryType: "wonder"
  },
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    region: "Americas",
    country: "Peru",
    city: "Cusco / Aguas Calientes",
    tag: "The Inca Citadel lost in cloud forests",
    description: "A sacred 15th-century royal citadel set high on Andean mountain peaks above the Urubamba River.",
    longDescription: "Perched 2,430 meters above sea level on an Andean ridge in Peru, Machu Picchu is an astonishing masterpiece of dry-stone mortarless masonry, agricultural terraces, and astronomical alignment, shrouded in dramatic mountain mist.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "4–6 days",
    budget: "$1,500 (₹1,24,000)",
    dailyBudget: "$190",
    bestTime: "May – Oct",
    seasons: ["Summer", "Spring / Autumn"],
    color: "#d4dfd4",
    characteristics: ["7 Wonders", "Mountains", "Heritage", "Adventure", "Nature", "World Heritage"],
    tags: ["7 Wonders", "Inca", "Andes", "Hiking", "Cloud Forest"],
    travelStyles: ["Inca Trail trekking", "High altitude adventure", "Archaeology"],
    knownFor: ["Temple of the Sun", "Intihuatana Sun Stone", "Huayna Picchu Peak", "Sacred Valley & Cusco"],
    topAttractions: ["Inca Trail / Salkantay Trek", "Ollantaytambo Fortress", "Moray Terraces", "Maras Salt Mines"],
    hiddenGems: ["Sun Gate (Inti Punku) sunrise approach", "Inca Bridge secret trail", "Aguas Calientes thermal hot springs"],
    thingsToDo: [
      { title: "Climb Huayna Picchu Peak", desc: "Ascend steep stone stairs above the ruins for an unforgettable panoramic aerial perspective." },
      { title: "Scenic Vistadome Train through Sacred Valley", desc: "Ride glass-domed train carriages alongside rushing glacial river rapids." }
    ],
    localFood: ["Fresh Ceviche with Peruvian corn", "Lomo Saltado stir-fry", "Causa Rellena potato terrine", "Coca leaf tea for altitude"],
    stayInfo: {
      budget: "$30 – $65/night (Aguas Calientes hostels)",
      midRange: "$120 – $280/night (Sacred Valley boutique eco-resorts)",
      luxury: "$900 – $2,400/night (Belmond Sanctuary Lodge right at the citadel gates)",
      recommendedArea: "Cusco for historic acclimation, Aguas Calientes for early morning entry"
    },
    routes: [
      { from: "Lima (LIM)", distance: "580 km", flight: "1 hr 15 mins to Cusco (CUZ)" },
      { from: "Cusco", distance: "75 km", train: "3.5 hrs (Inca Rail / PeruRail to Machu Picchu Pueblo)" }
    ],
    packingList: ["Trekking poles with rubber tips", "Waterproof rain poncho", "Layered fleece and sun protection", "Passport required for entry stamp"],
    coordinates: [-13.1631, -72.545],
    categoryType: "wonder"
  },
  {
    slug: "chichen-itza",
    name: "Chichén Itzá",
    region: "Americas",
    country: "Mexico",
    city: "Yucatán / Valladolid / Cancún",
    tag: "The grand Mayan pyramid of Kukulkán",
    description: "A majestic pre-Columbian city with astronomical pyramids and sacred natural cenotes.",
    longDescription: "One of the largest and most prominent Maya cities in Yucatán, Chichén Itzá is centered around El Castillo (The Temple of Kukulkán), a monumental step pyramid designed with mathematical precision so that shadow serpents appear to slither down the balustrade during the spring and autumn equinoxes.",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "3–5 days",
    budget: "$1,100 (₹90,000)",
    dailyBudget: "$160",
    bestTime: "Nov – Apr",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#eedecd",
    characteristics: ["7 Wonders", "Heritage", "Culture", "Nature", "World Heritage"],
    tags: ["7 Wonders", "Mayan", "Pyramid", "Mexico", "Cenotes"],
    travelStyles: ["Archaeology", "Jungle exploration", "Cultural history"],
    knownFor: ["El Castillo (Temple of Kukulkán)", "Great Ball Court", "Sacred Cenote Ik Kil", "Temple of the Warriors"],
    topAttractions: ["El Caracol Astronomical Observatory", "Valladolid Colonial Town", "Cenote Suytun", "Tulum Coastal Ruins"],
    hiddenGems: ["Cenote Zaci swimming cave in town", "Yaxunah uncrowded Maya ruins", "Artisanal smoked pork in Temozón"],
    thingsToDo: [
      { title: "Acoustic Clap at the Pyramid Base", desc: "Clap your hands in front of El Castillo to hear the acoustic echo mimic the sacred Quetzal bird call." },
      { title: "Swim in Sacred Cenote Ik Kil", desc: "Plunge into crystal freshwater surrounded by hanging jungle vines and waterfalls." }
    ],
    localFood: ["Cochinita Pibil (slow-roasted pork in achiote)", "Panuchos and Salbutes", "Fresh Sopa de Lima (lime soup)"],
    stayInfo: {
      budget: "$35 – $70/night (Colonial boutique hotels in Valladolid)",
      midRange: "$100 – $220/night (Hacienda style jungle lodges near site entrance)",
      luxury: "$450 – $1,200/night (Chablé Yucatán & luxury coastal resorts)",
      recommendedArea: "Valladolid for vibrant culture, Pisté for 5-minute site access"
    },
    routes: [
      { from: "Cancún (CUN)", distance: "200 km", car: "2 hrs via Highway 180D / ADO bus / Maya Train" },
      { from: "Mérida (MID)", distance: "120 km", car: "1.5 hrs" }
    ],
    packingList: ["Biodegradable sunscreen for cenotes", "Wide-brim sun hat", "Light cotton clothing", "Swimwear & water shoes"],
    coordinates: [20.6843, -88.5678],
    categoryType: "wonder"
  },
  {
    slug: "christ-the-redeemer",
    name: "Christ the Redeemer",
    region: "Americas",
    country: "Brazil",
    city: "Rio de Janeiro",
    tag: "Art deco icon overlooking Guanabara Bay",
    description: "The 30-meter Art Deco statue embracing Rio de Janeiro from the summit of Mount Corcovado.",
    longDescription: "Rising 710 meters above Rio de Janeiro from the summit of Mount Corcovado in Tijuca National Park, Christ the Redeemer (Cristo Redentor) is the world's most famous Art Deco sculpture, offering sweeping 360-degree vistas across Sugarloaf Mountain, Copacabana, and Ipanema beaches.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "4–6 days",
    budget: "$1,300 (₹1,07,000)",
    dailyBudget: "$180",
    bestTime: "Dec – Mar / May – Oct",
    seasons: ["Summer", "Winter"],
    color: "#dce7e4",
    characteristics: ["7 Wonders", "Beach & Coast", "Mountains", "Culture", "Romantic", "World Heritage"],
    tags: ["7 Wonders", "Brazil", "Rio", "Art Deco", "Panoramas"],
    travelStyles: ["Urban exploration", "Beach lifestyle", "Scenic viewpoints"],
    knownFor: ["Corcovado Cogwheel Train", "Sugarloaf Mountain Cable Car", "Copacabana & Ipanema Beaches", "Tijuca Rainforest"],
    topAttractions: ["Selarón Mosaic Steps", "Botanical Garden of Rio", "Santa Teresa Bohemian Quarter", "Maracanã Stadium"],
    hiddenGems: ["Mirante Dona Marta uncrowded sunrise viewpoint", "Parque das Ruínas cafe views", "Prainha secluded surfing beach"],
    thingsToDo: [
      { title: "Ride the Historic Corcovado Train", desc: "Ascend through the lush Atlantic rainforest of Tijuca to reach the base of the statue." },
      { title: "Sunset at Arpoador Rock", desc: "Join locals applauding the spectacular golden sunset over Ipanema and the Two Brothers peaks." }
    ],
    localFood: ["Feijoada (black bean & pork stew)", "Pão de Queijo cheese bread", "Fresh Açaí with granola", "Authentic Caipirinha cocktail"],
    stayInfo: {
      budget: "$35 – $75/night (Hostels & apartments in Santa Teresa)",
      midRange: "$120 – $260/night (Ipanema beachside boutique hotels)",
      luxury: "$600 – $1,800/night (Copacabana Palace, A Belmond Hotel)",
      recommendedArea: "Ipanema / Leblon for safe upscale beachfront dining"
    },
    routes: [
      { from: "Rio Galeão Airport (GIG)", distance: "20 km", car: "35 mins private taxi to South Zone" }
    ],
    packingList: ["Beachwear and flip flops (Havaianas)", "Sunglasses & sun hat", "Light windbreaker for mountain summits"],
    coordinates: [-22.9519, -43.2105],
    categoryType: "wonder"
  },

  // ==========================================
  // 3. THE 12 SACRED JYOTIRLINGAS OF INDIA
  // ==========================================
  {
    slug: "somnath",
    name: "Somnath",
    region: "West India",
    country: "India",
    state: "Gujarat",
    city: "Prabhas Patan / Veraval",
    tag: "The first Jyotirlinga on the Arabian Shore",
    description: "The eternal shrine of Lord Shiva standing on the confluence where the sea washes sacred stone.",
    longDescription: "Revered as the Adi (First) Jyotirlinga among the twelve, Somnath Temple rises majestically on the shore of the Arabian Sea in Saurashtra, Gujarat. Famous for its Chalukyan architectural grandeur, the temple marks a spot from which no land exists in a straight line until Antarctica.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "2–3 days",
    budget: "₹12,000",
    dailyBudget: "₹2,200",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#eedbc9",
    characteristics: ["Spiritual", "Heritage", "Beach & Coast", "Culture"],
    tags: ["Jyotirlinga", "Gujarat", "Spiritual", "Sea", "Pilgrimage"],
    travelStyles: ["Pilgrimage", "Coastal heritage", "Spiritual reset"],
    knownFor: ["First Jyotirlinga", "Evening Sound & Light Show", "Triveni Sangam", "Bhalka Tirth"],
    topAttractions: ["Somnath Temple Complex", "Prabhas Patan Museum", "Somnath Beach", "Gita Mandir"],
    hiddenGems: ["Junagadh Uparkot Fort detour", "Diu Portuguese Fort & coastal cliffs", "Gir Lion Sanctuary excursion"],
    thingsToDo: [
      { title: "Attend Twilight Aarti & Sea Darshan", desc: "Experience the reverberating conch shells and sacred chants as waves crash against the temple walls." },
      { title: "Witness Sound & Light History Show", desc: "Learn the thousand-year saga of Somnath narrated by Amitabh Bachchan." }
    ],
    localFood: ["Gujarati Thali with Dhokla & Fafda", "Sev Tameta Nu Shaak", "Fresh coconut water & buttermilk"],
    stayInfo: {
      budget: "₹800 – ₹1,800/night (Somnath Trust Guest Houses)",
      midRange: "₹2,500 – ₹5,500/night (Sea-facing hotels like The Fern Residency)",
      luxury: "₹7,000 – ₹15,000/night (Heritage havelis in nearby Diu / Gir)",
      recommendedArea: "Temple Bypass Road for walking proximity to the shrine"
    },
    routes: [
      { from: "Ahmedabad", distance: "410 km", train: "7 hrs (Somnath Express / Vande Bharat)", car: "8 hrs via NH 47 / NH 27" },
      { from: "Rajkot", distance: "190 km", car: "3.5 hrs" }
    ],
    packingList: ["Modest traditional Indian clothing", "Slip-off sandals", "Light shawl for ocean breeze"],
    coordinates: [20.888, 70.4012],
    categoryType: "jyotirlinga"
  },
  {
    slug: "mallikarjuna",
    name: "Mallikarjuna",
    region: "South India",
    country: "India",
    state: "Andhra Pradesh",
    city: "Srisailam",
    tag: "Shiva & Shakti on the Nallamala Hills",
    description: "A sacred hilltop sanctuary nestled inside dense tiger reserves on the banks of Krishna River.",
    longDescription: "Located on the flat top of Nallamala Hills in Andhra Pradesh, Mallikarjuna Swamy Temple is both a Jyotirlinga and a Shakti Peetha (Bhramaramba). Framed by ancient stone fortifications, forested wildlife reserves, and the deep gorges of the Krishna River.",
    image: "https://images.unsplash.com/photo-1600100397608-f010d6e2c5e9?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "2–3 days",
    budget: "₹11,500",
    dailyBudget: "₹2,100",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Monsoon"],
    color: "#dbe8dc",
    characteristics: ["Spiritual", "Nature", "Mountains", "Wildlife"],
    tags: ["Jyotirlinga", "Andhra", "Shakti Peetha", "Hills", "Forest"],
    travelStyles: ["Pilgrimage", "Scenic drive", "Nature sanctuary"],
    knownFor: ["Dual Jyotirlinga & Shakti Peetha", "Srisailam Dam View", "Patala Ganga Ropeway", "Nallamala Forest Drive"],
    topAttractions: ["Mallikarjuna Temple", "Bhramaramba Devi Temple", "Sakshi Ganapathi", "Phaladhara Panchadhara"],
    hiddenGems: ["Akka Mahadevi Caves boat ride", "Octopus Viewpoint overlooking reservoir", "Chenchu tribal honey cooperatives"],
    thingsToDo: [
      { title: "Ropeway Descent to Patala Ganga", desc: "Take the cable car down the river gorge and enjoy a traditional coracle ride." },
      { title: "Drive through Nallamala Forest Reserve", desc: "Traverse scenic ghat roads through one of India's largest tiger sanctuaries." }
    ],
    localFood: ["Andhra Thali with spicy Gongura Pachadi", "Pulihora (Tamarind Rice)", "Forest Honey & Laddu Prasadam"],
    stayInfo: {
      budget: "₹600 – ₹1,500/night (Devasthanam Choultries)",
      midRange: "₹2,500 – ₹5,000/night (Haritha Srisailam & Grand Akka Mahadevi)",
      luxury: "₹6,000 – ₹12,000/night (Boutique forest view resorts)",
      recommendedArea: "Temple Complex zone for early morning Darshan"
    },
    routes: [
      { from: "Hyderabad", distance: "215 km", car: "4.5 hrs scenic ghat drive via Srisailam Highway (NH 765)" },
      { from: "Vijayawada", distance: "260 km", car: "5.5 hrs" }
    ],
    packingList: ["Traditional dhoti/sari for inner sanctum entry", "Comfortable walking footwear", "Insect repellent for jungle trails"],
    coordinates: [16.0741, 78.8682],
    categoryType: "jyotirlinga"
  },
  {
    slug: "mahakaleshwar",
    name: "Mahakaleshwar",
    region: "Central India",
    country: "India",
    state: "Madhya Pradesh",
    city: "Ujjain",
    tag: "The Lord of Time & Sacred Bhasma Aarti",
    description: "The south-facing Jyotirlinga of Ujjain on the banks of holy Shipra River.",
    longDescription: "Located in the historic temple city of Ujjain, Mahakaleshwar is unique as a Dakshinabhimukhi (south-facing) Jyotirlinga. The temple is world-famous for its dawn Bhasma Aarti, ancient astronomical legacy, and the monumental Mahakal Lok corridor.",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Kashi_Vishwanath_Temple_in_Varanasi.jpg/1280px-Kashi_Vishwanath_Temple_in_Varanasi.jpg",
    imageCredit: { author: "Aliva Sahoo", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kashi_Vishwanath_Temple_in_Varanasi.jpg" },
    rating: "4.9",
    duration: "2–3 days",
    budget: "₹12,500",
    dailyBudget: "₹2,300",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#f2dfce",
    characteristics: ["Spiritual", "Heritage", "Culture", "Food"],
    tags: ["Jyotirlinga", "Ujjain", "Bhasma Aarti", "Mahakal Lok", "Shipra"],
    travelStyles: ["Pilgrimage", "Heritage architecture", "Food walks"],
    knownFor: ["Bhasma Aarti at Dawn", "Mahakal Lok Corridor", "Ram Ghat Shipra Aarti", "Kal Bhairav Temple"],
    topAttractions: ["Mahakaleshwar Complex", "Harsiddhi Temple (Shakti Peetha)", "Ved Shala Jantar Mantar", "Sandipani Ashram"],
    hiddenGems: ["Bhartrihari Caves on river cliff", "Gopal Mandir Maratha architecture", "Mangalnath Temple (origin of Mars)"],
    thingsToDo: [
      { title: "Experience the Sacred 4 AM Bhasma Aarti", desc: "Witness the sacred ritual chanting with ash and sacred Vedic Mantras." },
      { title: "Walk the Grand Mahakal Lok Corridor", desc: "Marvel at 200+ sculpted murals and towering Shiv Stambhas illuminated at night." }
    ],
    localFood: ["Ujjaini Poha Jalebi", "Dal Bafla with Ghee", "Malpua with Rabri", "Garadu chaat in winter"],
    stayInfo: {
      budget: "₹800 – ₹1,800/night (Dharamsalas & ashram rooms)",
      midRange: "₹3,000 – ₹6,500/night (Hotels near Mahakal Lok)",
      luxury: "₹8,000 – ₹18,000/night (Anjushree & Rudraksh Club Resort)",
      recommendedArea: "Mahakal Marg for walking access to temple gates"
    },
    routes: [
      { from: "Indore", distance: "55 km", car: "1 hr via super expressway", train: "1 hr 15 mins" },
      { from: "Bhopal", distance: "190 km", train: "3 hrs (Vande Bharat)" }
    ],
    packingList: ["Dhoti / Kurta for male Bhasma Aarti entry", "Traditional saree for female sanctum entry", "Easy slip-off footwear"],
    coordinates: [23.1827, 75.7682],
    categoryType: "jyotirlinga"
  },
  {
    slug: "omkareshwar",
    name: "Omkareshwar",
    region: "Central India",
    country: "India",
    state: "Madhya Pradesh",
    city: "Khandwa / Omkareshwar",
    tag: "The sacred island shaped like Om",
    description: "The Narmada River parts around Mandhata Island in the divine geometric shape of ॐ.",
    longDescription: "Situated on the sacred Narmada River, the island of Mandhata is naturally shaped like the Hindu symbol 'Om'. Housing two revered shrines—Omkareshwar and Mamleshwar—the pilgrimage involves scenic boat rides across the holy river and Parikrama circumambulation trails.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "1–2 days",
    budget: "₹9,500",
    dailyBudget: "₹2,000",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Monsoon"],
    color: "#e8dcce",
    characteristics: ["Spiritual", "Nature", "Heritage", "Slow Travel"],
    tags: ["Jyotirlinga", "Narmada", "Om Island", "Mamleshwar", "Boating"],
    travelStyles: ["River pilgrimage", "Boat journeys", "Spiritual trails"],
    knownFor: ["Om-shaped Island", "Mamleshwar Jyotirlinga", "Narmada River Boat Crossing", "Statue of Oneness (Adi Shankara)"],
    topAttractions: ["Omkareshwar Mandir", "Mamleshwar Temple", "Narmada Ghats & Suspension Bridge", "Kajal Rani Cave"],
    hiddenGems: ["Mandhata Parikrama 7km hill path", "Gauri Somnath 3-tier temple", "Maheshwar handloom weavers detour"],
    thingsToDo: [
      { title: "Narmada River Boat Ride", desc: "Cross the sacred waters while viewing the cliffside temple towers rising from the river." },
      { title: "Walk the Mandhata Parikrama", desc: "Hike the 7 km spiritual loop around the Om-shaped island past ancient hermitages." }
    ],
    localFood: ["Narmada Fresh Bafla Thali", "Poha & Jalebi breakfast", "Sabudana Khichdi"],
    stayInfo: {
      budget: "₹600 – ₹1,500/night (Narmada River Ashrams)",
      midRange: "₹2,200 – ₹4,500/night (MPSTDC Narmada Resort)",
      luxury: "₹7,000 – ₹25,000/night (Ahilya Fort in nearby Maheshwar)",
      recommendedArea: "Narmada riverfront for panoramic views"
    },
    routes: [
      { from: "Indore", distance: "80 km", car: "2.5 hrs via Indore-Icchapur Highway" },
      { from: "Ujjain", distance: "140 km", car: "3.5 hrs (ideal combined circuit)" }
    ],
    packingList: ["Modest cotton clothes", "Trekking sandals for island steps", "Water bottle for Parikrama"],
    coordinates: [22.2458, 76.1506],
    categoryType: "jyotirlinga"
  },
  {
    slug: "kedarnath",
    name: "Kedarnath",
    region: "North India",
    country: "India",
    state: "Uttarakhand",
    city: "Rudraprayag / Kedarnath",
    tag: "The high Himalayan Jyotirlinga in snow peaks",
    description: "Centuries-old stone sanctuary standing resilient at 3,584 meters against glacier peaks.",
    longDescription: "Set against the dramatic snowbound Kedar Dome peak in the Garhwal Himalayas near the Mandakini River source, Kedarnath is the highest and most revered of the 12 Jyotirlingas, built of massive interlocking grey stone slabs by Adi Shankaracharya.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a4d8?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "4–6 days",
    budget: "₹28,000",
    dailyBudget: "₹4,200",
    bestTime: "May – Jun / Sep – Oct",
    seasons: ["Summer", "Spring / Autumn"],
    color: "#d8e5ee",
    characteristics: ["Spiritual", "Mountains", "Adventure", "Nature"],
    tags: ["Jyotirlinga", "Himalayas", "Char Dham", "Glacier", "Trek"],
    travelStyles: ["High altitude trek", "Char Dham pilgrimage", "Spiritual devotion"],
    knownFor: ["Highest Jyotirlinga", "Bhim Shila Miracle Rock", "16km Gaurikund Trek", "Mandakini River Valley"],
    topAttractions: ["Kedarnath Temple", "Bhairavnath Temple Viewpoint", "Gandhi Sarovar glacial lake", "Gaurikund Hot Spring"],
    hiddenGems: ["Vasuki Tal high-altitude lake trek", "Triyuginarayan (Shiva-Parvati wedding venue)", "Chopta Tungnath meadow detour"],
    thingsToDo: [
      { title: "16 km Pilgrimage Trek from Gaurikund", desc: "Hike alongside cascading mountain streams with views of glacier peaks opening at each turn." },
      { title: "Bhairavnath Peak Sunrise Darshan", desc: "Climb 500 meters above the temple for the definitive panoramic view of Kedarnath in the valley bowl." }
    ],
    localFood: ["Garhwali Mandua Roti & Gahat Ki Dal", "Kandalee Ka Saag", "Hot ginger tea & Maggi bowls on trails"],
    stayInfo: {
      budget: "₹1,000 – ₹2,500/night (GMVN Pilgrim Tents & Cottages)",
      midRange: "₹3,500 – ₹7,000/night (Guptkashi / Sonprayag base hotels)",
      luxury: "₹15,000 – ₹45,000/night (Helicopter packages with luxury base camps)",
      recommendedArea: "Guptkashi / Sitapur for base stays, GMVN complex at the temple top"
    },
    routes: [
      { from: "Rishikesh / Dehradun", distance: "215 km", car: "7 hrs to Sonprayag/Gaurikund + 16 km trek / helicopter" }
    ],
    packingList: ["Thermals, woolen gloves & down jacket", "Sturdy waterproof hiking boots", "Rain poncho", "Trekking pole", "Personal altitude medical kit"],
    coordinates: [30.7352, 79.0669],
    categoryType: "jyotirlinga"
  },
  {
    slug: "bhimashankar",
    name: "Bhimashankar",
    region: "West India",
    country: "India",
    state: "Maharashtra",
    city: "Pune / Khed",
    tag: "Dense Sahyadri rainforest & source of Bhima River",
    description: "An ancient Nagara-style shrine sheltered inside the lush Western Ghats wildlife sanctuary.",
    longDescription: "Located 125 km from Pune in the Sahyadri range of Maharashtra, Bhimashankar marks the source of the sacred River Bhima. Surrounded by rainforests that host the elusive Indian Giant Squirrel (Shekru), the temple features intricate stone carvings and deep spiritual heritage.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "2–3 days",
    budget: "₹10,500",
    dailyBudget: "₹2,200",
    bestTime: "Aug – Feb",
    seasons: ["Monsoon", "Winter"],
    color: "#d7eadb",
    characteristics: ["Spiritual", "Nature", "Wildlife", "Mountains"],
    tags: ["Jyotirlinga", "Maharashtra", "Sahyadri", "Rainforest", "Wildlife"],
    travelStyles: ["Rainforest trekking", "Pilgrimage", "Nature photography"],
    knownFor: ["Nagari Style Architecture", "Indian Giant Squirrel (Shekru)", "Gupt Bhimashankar waterfall", "Nagphani Point"],
    topAttractions: ["Bhimashankar Sanctuary", "Nagphani (Duke's Nose) Cliff", "Hanuman Lake", "Kamalaja Devi Temple"],
    hiddenGems: ["Shidi Ghat ladder trek route for adventurers", "Ahupe village cliff panorama", "Bhorgiri fort ruins trail"],
    thingsToDo: [
      { title: "Trek through Mist-Clad Western Ghats", desc: "Walk through mossy rainforest canopies spotting Malabar Giant Squirrels in their natural habitat." },
      { title: "Hike to Nagphani Viewpoint", desc: "Enjoy views stretching across the Konkan plains from the mountain edge." }
    ],
    localFood: ["Maharashtrian Pithla Bhakri with Thecha", "Sweet Khoya Mawa & Pedha", "Hot Masala Chai with Kanda Bhaji"],
    stayInfo: {
      budget: "₹800 – ₹1,800/night (Local village homestays)",
      midRange: "₹2,500 – ₹5,000/night (MTDC Bhimashankar & Blue Mormon Jungle Resort)",
      luxury: "₹8,000 – ₹16,000/night (Luxury hill resorts in Lonavala / Pune)",
      recommendedArea: "Nigdale village for tranquility, Temple Bazaar for instant access"
    },
    routes: [
      { from: "Pune", distance: "115 km", car: "3 hrs via Pune-Nashik Highway" },
      { from: "Mumbai", distance: "210 km", car: "4.5 hrs via Talegaon / Chakan" }
    ],
    packingList: ["Raincoat / poncho during monsoon", "Sturdy non-slip footwear", "Mosquito repellent"],
    coordinates: [19.0722, 73.5358],
    categoryType: "jyotirlinga"
  },
  {
    slug: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    region: "North India",
    country: "India",
    state: "Uttar Pradesh",
    city: "Varanasi",
    tag: "Golden Spire on the eternal Ganga",
    description: "The supreme spiritual center of Kashi, illuminating the path of liberation.",
    longDescription: "Standing on the western bank of the holy River Ganga in Varanasi, the Kashi Vishwanath Temple is one of the holiest shrines in Hinduism. Rebuilt with an iconic golden spire by Maharani Ahilyabai Holkar and expanded with the Vishwanath Dham Corridor connecting directly to the river ghats.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "2–4 days",
    budget: "₹14,000",
    dailyBudget: "₹2,500",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#f6e4d0",
    characteristics: ["Spiritual", "Heritage", "Culture", "Food", "World Heritage"],
    tags: ["Jyotirlinga", "Varanasi", "Ganga", "Ghats", "Kashi"],
    travelStyles: ["Spiritual immersion", "Ganga boat walks", "Cultural exploration"],
    knownFor: ["Kashi Vishwanath Dham", "Dashashwamedh Ganga Aarti", "Subah-e-Banaras", "Banarasi Silk & Paan"],
    topAttractions: ["Manikarnika & Harishchandra Ghats", "Assi Ghat Morning Yoga", "Sarnath Buddha Deer Park", "Ramnagar Fort"],
    hiddenGems: ["Lallu Lal ki Malaiyyo winter sweet", "Kashi Labh Mukti Bhavan", "Panchganga Ghat quiet rooftops"],
    thingsToDo: [
      { title: "Ganga Ghats Boat Ride at Sunrise", desc: "Float past 84 stone ghats as thousands of pilgrims bathe and chant in morning light." },
      { title: "Walk the Grand Vishwanath Dham Corridor", desc: "Pass directly from Lalita Ghat through monumental sandstone plazas to the golden shrine." }
    ],
    localFood: ["Banarasi Tamatar Chaat", "Kachori Jalebi breakfast", "Banarasi Meetha Paan", "Malaiyyo winter froth milk"],
    stayInfo: {
      budget: "₹1,000 – ₹2,200/night (Riverside dharamsalas & boutique hostels)",
      midRange: "₹4,000 – ₹9,000/night (Restored palace havelis like BrijRama Palace)",
      luxury: "₹18,000 – ₹45,000/night (Taj Ganges & Nadesar Palace)",
      recommendedArea: "Assi Ghat for serene culture, Godowlia for temple corridor access"
    },
    routes: [
      { from: "Delhi", distance: "820 km", flight: "1 hr 15 mins (VNS)", train: "8 hrs (Vande Bharat Express)" },
      { from: "Mumbai", distance: "1,500 km", flight: "2 hrs 10 mins direct" }
    ],
    packingList: ["Modest traditional Indian attire", "Easy slip-off shoes", "Camera with low light capability"],
    coordinates: [25.3109, 83.0107],
    categoryType: "jyotirlinga"
  },
  {
    slug: "trimbakeshwar",
    name: "Trimbakeshwar",
    region: "West India",
    country: "India",
    state: "Maharashtra",
    city: "Nashik / Trimbak",
    tag: "Source of Godavari & Three-Faced Linga",
    description: "The unique three-faced Jyotirlinga embodying Brahma, Vishnu, and Shiva beneath Brahmagiri Hill.",
    longDescription: "Nestled at the foothills of Brahmagiri mountain near Nashik, Trimbakeshwar is extraordinary for its three lingam faces representing the Holy Trinity. Built entirely of black basalt stone by Peshwa Balaji Baji Rao, it is also the sacred origin of River Godavari (Dakshin Ganga).",
    image: "https://images.unsplash.com/photo-1600100397608-f010d6e2c5e9?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "2–3 days",
    budget: "₹11,000",
    dailyBudget: "₹2,300",
    bestTime: "Sep – Mar",
    seasons: ["Winter", "Monsoon"],
    color: "#e2d7c5",
    characteristics: ["Spiritual", "Heritage", "Mountains", "Culture"],
    tags: ["Jyotirlinga", "Nashik", "Godavari", "Brahmagiri", "Kumbh"],
    travelStyles: ["Pilgrimage", "Mountain trekking", "Vineyard & culture detour"],
    knownFor: ["Three-Faced Jyotirlinga", "Brahmagiri Hill Trek", "Kushavarta Kund", "Kumbh Mela Heritage"],
    topAttractions: ["Trimbakeshwar Temple", "Brahmagiri Mountain Source", "Anjaneri Hill (Hanuman birthplace)", "Nashik Vineyard Valleys"],
    hiddenGems: ["Gorakhnath Cave meditation chambers", "Gangadwar 700 steps spring walk", "Harihar Fort cliff ladder trek"],
    thingsToDo: [
      { title: "Brahmagiri Mountain Trek", desc: "Climb through stone steps to the exact mountain rock cleft where River Godavari emerges." },
      { title: "Holy Dip at Kushavarta Tirth", desc: "Visit the sacred rectangular pond where the Godavari river gathers." }
    ],
    localFood: ["Nashik Misal Pav with spicy Tarri", "Kanda Bhaji", "Fresh grape juices & Puran Poli"],
    stayInfo: {
      budget: "₹800 – ₹1,800/night (Trimbak Pilgrim Niwas)",
      midRange: "₹2,800 – ₹6,000/night (Nashik city hotels)",
      luxury: "₹12,000 – ₹28,000/night (Sula Vineyards & Radisson Blu Nashik)",
      recommendedArea: "Trimbakeshwar town for temples, Gangapur Road for luxury & dining"
    },
    routes: [
      { from: "Mumbai", distance: "175 km", car: "3.5 hrs via NH 160 / Kasara Ghat", train: "To Nashik Road (3 hrs)" },
      { from: "Pune", distance: "210 km", car: "4.5 hrs" }
    ],
    packingList: ["Traditional clothes for Darshan", "Walking shoes for hill steps", "Rain gear during monsoon"],
    coordinates: [19.9325, 73.5306],
    categoryType: "jyotirlinga"
  },
  {
    slug: "vaidyanath",
    name: "Vaidyanath",
    region: "East India",
    country: "India",
    state: "Jharkhand",
    city: "Deoghar",
    tag: "Baidyanath Dham & The Divine Physician",
    description: "The sacred Jyotirlinga where Ravana worshipped Shiva, famous for Shravan Kanwar Yatra.",
    longDescription: "Located in Deoghar in the Santhal Parganas division of Jharkhand, Baba Baidyanath Dham is considered one of the holiest shrines where Shiva cured Ravana's wounds as the Divine Physician (Vaidya). In Shravan month, millions of barefoot Kanwariyas carry holy Ganga water from Sultanganj.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "2–3 days",
    budget: "₹10,000",
    dailyBudget: "₹2,000",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#eed2be",
    characteristics: ["Spiritual", "Heritage", "Culture"],
    tags: ["Jyotirlinga", "Deoghar", "Jharkhand", "Kanwar Yatra", "Pilgrimage"],
    travelStyles: ["Pilgrimage", "Cultural exploration"],
    knownFor: ["Panchshul on Temple Spire", "Kanwar Yatra", "Trikuta Parvat Ropeway", "Naulakha Temple"],
    topAttractions: ["Baidyanath Temple Complex (22 temples)", "Trikut Hills Ropeway", "Tapovan Caves", "Satsang Ashram"],
    hiddenGems: ["Nandan Pahar hilltop sunset", "Rikhiapeeth spiritual ashram", "Basukinath Temple (45 km)"],
    thingsToDo: [
      { title: "Ropeway to Trikut Hill Peaks", desc: "Take the cable car to triple mountain peaks associated with Sage Valmiki." },
      { title: "Early Morning Jalabhishek", desc: "Offer holy river water at the sanctum adorned with the golden Panchshul." }
    ],
    localFood: ["Deoghar Famous Peda sweet", "Litti Chokha with ghee & green chutney", "Thekua & Tilkut"],
    stayInfo: {
      budget: "₹700 – ₹1,500/night (Baidyanath Pilgrim Rest Houses)",
      midRange: "₹2,200 – ₹4,500/night (Hotel Imperial & Yashoda International)",
      luxury: "₹5,500 – ₹11,000/night (Modern business hotels near Deoghar Airport)",
      recommendedArea: "Castairs Town for quiet stays, Clock Tower for bazaar proximity"
    },
    routes: [
      { from: "Kolkata", distance: "320 km", train: "4 hrs (Vande Bharat to Jasidih)", flight: "1 hr direct to Deoghar Airport (DGH)" },
      { from: "Patna", distance: "250 km", car: "5 hrs" }
    ],
    packingList: ["Modest cotton clothes", "Easy footwear for cobblestones", "Peda container for prasad"],
    coordinates: [24.4925, 86.7001],
    categoryType: "jyotirlinga"
  },
  {
    slug: "nageshwar",
    name: "Nageshwar",
    region: "West India",
    country: "India",
    state: "Gujarat",
    city: "Dwarka",
    tag: "The colossal 80ft Shiva statue on Saurashtra Coast",
    description: "The protector against all poisons standing near sacred Lord Krishna's Dwarka kingdom.",
    longDescription: "Located on the coast of Saurashtra between Dwarka and Beyt Dwarka island, Nageshwar Jyotirlinga represents protection from negative energies and poisons. The temple is crowned by a colossal 80-foot towering orange statue of Lord Shiva seated in meditation.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "2–3 days",
    budget: "₹12,000",
    dailyBudget: "₹2,200",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#f0e1c9",
    characteristics: ["Spiritual", "Heritage", "Beach & Coast"],
    tags: ["Jyotirlinga", "Dwarka", "Gujarat", "Giant Shiva", "Coastal"],
    travelStyles: ["Pilgrimage", "Coastal exploration", "Spiritual circuit"],
    knownFor: ["80ft Shiva Statue", "Dwarkadhish Temple Circuit", "Beyt Dwarka Ferry & Bridge", "Shivrajpur Blue Flag Beach"],
    topAttractions: ["Nageshwar Jyotirlinga", "Dwarkadhish Jagat Mandir", "Sudama Setu & Gomti Ghat", "Shivrajpur Beach"],
    hiddenGems: ["Okha coastal fishing harbor", "Rukmini Devi Temple 12th century murals", "Dunny Point isolated island tip"],
    thingsToDo: [
      { title: "Darshan under the 80ft Shiva Colossus", desc: "Marvel at the monumental seated Shiva statue visible for miles across coastal plains." },
      { title: "Ferry Ride to Beyt Dwarka Island", desc: "Cross sea waters where migrating sea gulls flock to boats on the way to Krishna's island palace." }
    ],
    localFood: ["Kathiyawadi Thali with Ringan No Olo", "Bajra Roti with White Butter", "Ghughra sweet & Farsan"],
    stayInfo: {
      budget: "₹800 – ₹1,800/night (Dwarka Ashram dharamsalas)",
      midRange: "₹2,800 – ₹6,000/night (Hawthorn Suites & The Fern Dwarka)",
      luxury: "₹7,500 – ₹18,000/night (Beachfront luxury tent resorts near Shivrajpur)",
      recommendedArea: "Dwarka City center for dual access to Dwarkadhish and Nageshwar"
    },
    routes: [
      { from: "Rajkot / Jamnagar", distance: "140 km from Jamnagar (JGA)", car: "2.5 hrs via coastal highway" },
      { from: "Ahmedabad", distance: "440 km", train: "8 hrs (Vande Bharat / Express)" }
    ],
    packingList: ["Light cotton clothing", "Sun protection & hat", "Traditional clothes for sanctum Abhishek"],
    coordinates: [22.3341, 69.0538],
    categoryType: "jyotirlinga"
  },
  {
    slug: "rameshwaram",
    name: "Rameshwaram",
    region: "South India",
    country: "India",
    state: "Tamil Nadu",
    city: "Rameshwaram / Dhanushkodi",
    tag: "Longest pillared corridors on Pamban Island",
    description: "The southernmost Jyotirlinga where Lord Rama built the bridge across emerald waters.",
    longDescription: "Located on Pamban Island in the Gulf of Mannar, Ramanathaswamy Temple is celebrated for having the longest sandstone pillared corridor in the world (over 1,200 meters) and 22 sacred teertham wells. The island extends to the ghost town of Dhanushkodi and Ram Setu.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
    rating: "4.9",
    duration: "2–4 days",
    budget: "₹15,000",
    dailyBudget: "₹2,600",
    bestTime: "Oct – Apr",
    seasons: ["Winter", "Spring / Autumn"],
    color: "#d5e8ea",
    characteristics: ["Spiritual", "Heritage", "Beach & Coast", "Char Dham", "Culture"],
    tags: ["Jyotirlinga", "Tamil Nadu", "Pamban Bridge", "Ram Setu", "Dhanushkodi"],
    travelStyles: ["Pilgrimage", "Coastal drive", "Historical mythology"],
    knownFor: ["World's Longest Pillared Corridor", "22 Sacred Theerthams", "Historic Pamban Sea Bridge", "Dhanushkodi Land's End"],
    topAttractions: ["Ramanathaswamy Temple", "Dhanushkodi Ghost Town & Beach", "Dr. APJ Abdul Kalam Memorial", "Agniteertham"],
    hiddenGems: ["Floating stone exhibits at Panchamukhi Hanuman", "Kothandaramaswamy sea temple", "Arichal Munai border viewpoint"],
    thingsToDo: [
      { title: "22 Theertham Sacred Bath Ritual", desc: "Receive holy water pours from all 22 ancient mineral wells inside the grand temple corridors." },
      { title: "4x4 Drive to Dhanushkodi Land's End", desc: "Drive along the narrow sand strip where the Indian Ocean meets the Bay of Bengal." }
    ],
    localFood: ["Chettinad style South Indian Meals", "Rameshwaram Podi Idli & Ghee Roast Dosa", "Filter Coffee"],
    stayInfo: {
      budget: "₹900 – ₹2,000/night (Temple mutts and guesthouses)",
      midRange: "₹3,000 – ₹6,500/night (Daiwik Hotels & Hotel MCM Towers)",
      luxury: "₹8,000 – ₹18,000/night (Hyatt Place Rameswaram)",
      recommendedArea: "Ramanathaswamy East Gate for walking access"
    },
    routes: [
      { from: "Madurai", distance: "170 km", car: "3.5 hrs via NH 87 across Pamban Sea Bridge", train: "3.5 hrs" },
      { from: "Chennai", distance: "560 km", flight: "To Madurai (IXM) + cab / overnight Rameswaram Express train" }
    ],
    packingList: ["Extra set of dry clothes for holy theertham bath", "Slip-off sandals", "Sun hat & shades for Dhanushkodi"],
    coordinates: [9.2881, 79.3174],
    categoryType: "jyotirlinga"
  },
  {
    slug: "grishneshwar",
    name: "Grishneshwar",
    region: "West India",
    country: "India",
    state: "Maharashtra",
    city: "Ellora / Aurangabad (Chhatrapati Sambhajinagar)",
    tag: "The twelfth Jyotirlinga beside Ellora Caves",
    description: "Carved from red basalt stone right next to the UNESCO World Heritage Ellora Caves.",
    longDescription: "Revered as the 12th and final Jyotirlinga, Grishneshwar (also known as Ghushmeshwar) is located in Verul village just 1 km from the monumental Kailash Temple of Ellora. Rebuilt in exquisite red rock by Queen Ahilyabai Holkar with detailed carvings of the Dashavatara.",
    image: "https://images.unsplash.com/photo-1600100397608-f010d6e2c5e9?auto=format&fit=crop&w=1200&q=85",
    rating: "4.8",
    duration: "2–3 days",
    budget: "₹12,000",
    dailyBudget: "₹2,400",
    bestTime: "Oct – Mar",
    seasons: ["Winter", "Monsoon"],
    color: "#eedbc9",
    characteristics: ["Spiritual", "Heritage", "World Heritage", "Culture"],
    tags: ["Jyotirlinga", "Ellora Caves", "Red stone", "UNESCO", "Maharashtra"],
    travelStyles: ["Heritage exploration", "Pilgrimage", "Rock-cut architecture"],
    knownFor: ["12th Jyotirlinga", "Ellora Caves & Kailash Temple", "Red Basalt Carvings", "Daulatabad Fort"],
    topAttractions: ["Grishneshwar Mandir", "Ellora Caves (Cave 16 Kailash)", "Bibi Ka Maqbara", "Daulatabad Hill Fortress"],
    hiddenGems: ["Pariyon Ka Talab peaceful lake", "Khuldabad Sufi saint tombs", "Paithani silk saree weaving centers in Paithan"],
    thingsToDo: [
      { title: "Visit Cave 16 Kailash Temple at Ellora", desc: "Marvel at the world's largest monolithic rock excavation carved top-down from a single basalt cliff." },
      { title: "Inner Sanctum Darshan in Traditional Attire", desc: "Touch the sacred Jyotirlinga lingam during morning abhishek." }
    ],
    localFood: ["Naan Qalia (historic Aurangabad royal curry)", "Maharashtrian Thali with Jowar Bhakri", "Imarti & Paan"],
    stayInfo: {
      budget: "₹800 – ₹1,800/night (Ellora village homestays)",
      midRange: "₹3,000 – ₹6,500/night (MTDC Ellora & Hotel Kailas with cave views)",
      luxury: "₹9,000 – ₹24,000/night (Welcomhotel Rama International & Vivanta Aurangabad)",
      recommendedArea: "Ellora for heritage tranquility, CIDCO Aurangabad for city dining"
    },
    routes: [
      { from: "Aurangabad (IXU)", distance: "30 km", car: "45 mins via NH 52" },
      { from: "Mumbai", distance: "340 km", train: "6 hrs (Vande Bharat Express)", car: "6.5 hrs via Samruddhi Mahamarg" }
    ],
    packingList: ["Dhoti required for men touching lingam", "Comfortable walking shoes for Ellora Caves", "Sun hat and camera"],
    coordinates: [20.0247, 75.1718],
    categoryType: "jyotirlinga"
  }
];

export const categoriesList: { name: DestinationCharacteristic; icon: string; desc: string }[] = [
  { name: "Beach & Coast", icon: "🏖️", desc: "Sun-drenched shores, cliffside views & salt air" },
  { name: "Heritage", icon: "🏛️", desc: "Ancient palaces, forts, temples & world wonders" },
  { name: "7 Wonders", icon: "✨", desc: "The official New 7 Wonders of the World" },
  { name: "World Heritage", icon: "🌐", desc: "UNESCO designated cultural & natural marvels" },
  { name: "Spiritual", icon: "🪔", desc: "Sacred 12 Jyotirlingas, ghats & pilgrimage trails" },
  { name: "Nature", icon: "🌿", desc: "Lush valleys, waterfalls, living root bridges & serene lakes" },
  { name: "Mountains", icon: "⛰️", desc: "Alpine summits, cedar trails & panoramic viewpoints" },
  { name: "Adventure", icon: "🧗", desc: "Trekking, water sports, bouldering & high-altitude passes" },
  { name: "Wildlife", icon: "🐅", desc: "National parks, marine reefs & jungle sanctuaries" },
  { name: "Culture", icon: "🎭", desc: "Living rituals, folk traditions & artisan quarters" },
  { name: "Slow Travel", icon: "☕", desc: "Unhurried mornings, wellness retreats & village trails" },
  { name: "Family", icon: "👨‍👩‍👧‍👦", desc: "Safe, scenic journeys with experiences for every generation" },
  { name: "Romantic", icon: "❤️", desc: "Secluded coastlines, palace candlelight & scenic hideaways" },
  { name: "Budget", icon: "🏷️", desc: "Smart, honest travel that maximizes value without compromise" },
  { name: "Luxury", icon: "💎", desc: "Palatial residences, private villas & bespoke service" },
  { name: "Food", icon: "🍲", desc: "Historic street food, royal feasts & spice markets" },
];

export const seasonalHighlights: { season: string; title: string; subtitle: string; destinations: string[] }[] = [
  {
    season: "Winter",
    title: "Crisp air & sun-warmed shores",
    subtitle: "Ideal for Goa beaches, Rajasthan palace trails, Varanasi ghats, and snow in Kashmir.",
    destinations: ["goa", "jaipur", "udaipur", "kashmir", "dubai", "taj-mahal", "somnath", "kashi-vishwanath"]
  },
  {
    season: "Summer",
    title: "High altitude escapes & mountain passes",
    subtitle: "Clear mountain passes in Ladakh, alpine meadows in Swiss Alps, Kedarnath, and tropical Bali.",
    destinations: ["ladakh", "swiss-alps", "bali", "kedarnath", "machu-picchu"]
  },
  {
    season: "Monsoon",
    title: "Emerald rain & singing waterfalls",
    subtitle: "Rains breathe life into Kerala backwaters, Bhimashankar rainforests, and Hampi boulders.",
    destinations: ["kerala", "bhimashankar", "hampi", "omkareshwar", "trimbakeshwar"]
  },
  {
    season: "Spring / Autumn",
    title: "Blossoms, harvests & mild skies",
    subtitle: "Cherry blossoms in Kyoto, lemon blossoms on Amalfi Coast, romance in Paris, and Petra.",
    destinations: ["kyoto", "amalfi", "paris", "petra", "colosseum", "chichen-itza", "rameshwaram"]
  }
];

export const indiaCollections = [
  { label: "12 Jyotirlingas", icon: "✦", count: "12 sacred temples", href: "/india/12-jyotirlingas" },
  { label: "7 Wonders of the World", icon: "✨", count: "Global icons", href: "/world/7-wonders" },
  { label: "UNESCO World Heritage", icon: "🌐", count: "Living treasures", href: "/world/heritage" },
  { label: "Royal Rajasthan", icon: "👑", count: "Jaipur, Udaipur, Palaces", href: "/india" },
];

export const worldRegions = ["Asia", "Europe", "Middle East", "Americas", "Africa", "Oceania"];

export const jyotirlingas = [
  ["Somnath", "Prabhas Patan, Gujarat", "somnath"],
  ["Mallikarjuna", "Srisailam, Andhra Pradesh", "mallikarjuna"],
  ["Mahakaleshwar", "Ujjain, Madhya Pradesh", "mahakaleshwar"],
  ["Omkareshwar", "Khandwa, Madhya Pradesh", "omkareshwar"],
  ["Kedarnath", "Rudraprayag, Uttarakhand", "kedarnath"],
  ["Bhimashankar", "Pune, Maharashtra", "bhimashankar"],
  ["Kashi Vishwanath", "Varanasi, Uttar Pradesh", "kashi-vishwanath"],
  ["Trimbakeshwar", "Nashik, Maharashtra", "trimbakeshwar"],
  ["Vaidyanath", "Deoghar, Jharkhand", "vaidyanath"],
  ["Nageshwar", "Dwarka, Gujarat", "nageshwar"],
  ["Rameshwaram", "Ramanathapuram, Tamil Nadu", "rameshwaram"],
  ["Grishneshwar", "Aurangabad, Maharashtra", "grishneshwar"],
] as const;

export const sevenWondersList = [
  { name: "Taj Mahal", location: "Agra, India", slug: "taj-mahal", tag: "Monument to eternal love" },
  { name: "Great Wall of China", location: "Beijing, China", slug: "great-wall-of-china", tag: "21,000 km dragon ridge" },
  { name: "Petra", location: "Wadi Musa, Jordan", slug: "petra", tag: "Rose-Red desert city" },
  { name: "Colosseum", location: "Rome, Italy", slug: "colosseum", tag: "Imperial amphitheater of gladiators" },
  { name: "Machu Picchu", location: "Cusco, Peru", slug: "machu-picchu", tag: "Lost Incan citadel in the clouds" },
  { name: "Chichén Itzá", location: "Yucatán, Mexico", slug: "chichen-itza", tag: "Mayan pyramid of Kukulkán" },
  { name: "Christ the Redeemer", location: "Rio de Janeiro, Brazil", slug: "christ-the-redeemer", tag: "Art Deco mountain colossus" },
];
