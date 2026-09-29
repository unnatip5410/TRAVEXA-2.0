export type Language = "EN" | "हिंदी" | "मराठी";

export interface I18nDictionary {
  brandTagline: string;
  navExplore: string;
  navIndia: string;
  navWorld: string;
  navPlanner: string;
  navCompare: string;
  navSpace: string;
  navSaved: string;
  navTrips: string;
  navJyotirlingas: string;
  navWonders: string;
  navHeritage: string;
  welcomeTitle: string;
  welcomeKicker: string;
  welcomeSubtitle: string;
  welcomeDesc: string;
  welcomeStart: string;
  welcomePlan: string;
  heroKicker: string;
  heroTitle: string;
  heroTitleEm: string;
  heroLede: string;
  heroBuildJourney: string;
  heroSeeHow: string;
  heroCurated: string;
  searchWhereTo: string;
  searchPlaceholder: string;
  searchDestination: string;
  searchWhen: string;
  searchTravelStyle: string;
  searchStylePlaceholder: string;
  searchPlanAI: string;
  searchPopular: string;
  searchMatching: string;
  searchChooseDates: string;
  searchVoice: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  catAll: string;
  catBeach: string;
  catHeritage: string;
  cat7Wonders: string;
  catWorldHeritage: string;
  catSpiritual: string;
  catNature: string;
  catMountains: string;
  catAdventure: string;
  catWildlife: string;
  catCulture: string;
  catSlowTravel: string;
  catFamily: string;
  catRomantic: string;
  catBudget: string;
  catLuxury: string;
  seasonWhere: string;
  seasonWinter: string;
  seasonSummer: string;
  seasonMonsoon: string;
  seasonSpringAutumn: string;
  seasonPicks: string;
  filterTitle: string;
  filterSeason: string;
  filterSort: string;
  filterSortRecommended: string;
  filterSortPopular: string;
  filterSortRating: string;
  filterSortBudget: string;
  filterSortAZ: string;
  filterClear: string;
  filterApply: string;
  resultsCount: string;
  emptyNoPlaces: string;
  emptyReset: string;
  cardFrom: string;
  cardRating: string;
  cardViewDetails: string;
  cardPlan: string;
  cardSave: string;
  cardSaved: string;
  cardShare: string;
  cardCopied: string;
  detailCharacteristics: string;
  detailOverview: string;
  detailThingsToDo: string;
  detailAttractions: string;
  detailHiddenGems: string;
  detailLocalFood: string;
  detailCulture: string;
  detailStayInfo: string;
  detailTransport: string;
  detailBestTime: string;
  detailDuration: string;
  detailBudget: string;
  detailDailyBudget: string;
  detailPacking: string;
  detailSafety: string;
  detailFaq: string;
  detailReviews: string;
  detailSimilar: string;
  detailEnroll: string;
  detailRouteMap: string;
  detailFromHub: string;
  detailDistance: string;
  detailTravelTime: string;
  transportFlight: string;
  transportTrain: string;
  transportBus: string;
  transportCar: string;
  transportLocal: string;
  bookingTitle: string;
  bookingSummary: string;
  bookingDates: string;
  bookingTravellers: string;
  bookingTransport: string;
  bookingStay: string;
  bookingTotal: string;
  bookingPayMethod: string;
  bookingPayButton: string;
  bookingSuccess: string;
  bookingDemoNote: string;
  paymentUPI: string;
  paymentGPay: string;
  paymentPhonePe: string;
  paymentPaytm: string;
  paymentBHIM: string;
  paymentCard: string;
  paymentScanQR: string;
  receiptTitle: string;
  receiptNumber: string;
  receiptTraveller: string;
  receiptDestination: string;
  receiptDate: string;
  receiptAmount: string;
  receiptStatus: string;
  receiptPrint: string;
  receiptViewTrip: string;
  thankYouTitle: string;
  thankYouSubtitle: string;
  thankYouHappyJourney: string;
  thankYouDesc: string;
  aiTitle: string;
  aiSubtitle: string;
  aiPlaceholder: string;
  aiSend: string;
  aiFullPlanner: string;
  aiPrompt1: string;
  aiPrompt2: string;
  aiPrompt3: string;
  aiPrompt4: string;
  aiPrompt5: string;
  aiPrompt6: string;
  footerExplore: string;
  footerMakeYours: string;
  footerGoodToKnow: string;
  footerRights: string;
  footerTagline: string;
  adminTitle: string;
  adminSubtitle: string;
  adminDestinations: string;
  adminUsers: string;
  adminTrips: string;
  adminPayments: string;
  adminReviews: string;
  adminAnalytics: string;
  adminTranslations: string;
  adminAddDestination: string;
  accessibilityTitle: string;
  accessibilityTextSize: string;
  accessibilityHighContrast: string;
  accessibilityReducedMotion: string;
}

export const translations: Record<Language, I18nDictionary> = {
  EN: {
    brandTagline: "Explore India. Discover the World.",
    navExplore: "Explore",
    navIndia: "Incredible India",
    navWorld: "World",
    navPlanner: "AI Planner",
    navCompare: "Compare",
    navSpace: "My Space",
    navSaved: "Saved Places",
    navTrips: "My Trips",
    navJyotirlingas: "12 Jyotirlingas",
    navWonders: "7 Wonders of the World",
    navHeritage: "World Heritage",
    welcomeTitle: "Welcome to TRAVEXA",
    welcomeKicker: "A NEW WAY TO GO",
    welcomeSubtitle: "Explore India. Discover the World.",
    welcomeDesc: "Your intelligent companion for discovering, planning, and experiencing your next journey with intention.",
    welcomeStart: "Explore the World",
    welcomePlan: "Plan with AI",
    heroKicker: "YOUR NEXT CHAPTER STARTS HERE",
    heroTitle: "Go somewhere",
    heroTitleEm: "that changes you.",
    heroLede: "Thoughtful journeys, beautifully planned. Let TRAVEXA turn the world's possibilities into your personal itinerary.",
    heroBuildJourney: "Build my journey",
    heroSeeHow: "See how it works",
    heroCurated: "Curated for the curious",
    searchWhereTo: "Where will you go?",
    searchPlaceholder: "Search city, state, country, or vibe...",
    searchDestination: "DESTINATION",
    searchWhen: "WHEN",
    searchTravelStyle: "TRAVEL STYLE",
    searchStylePlaceholder: "What moves you?",
    searchPlanAI: "Plan with AI",
    searchPopular: "Popular destinations",
    searchMatching: "Matching places",
    searchChooseDates: "Choose dates",
    searchVoice: "Use voice search",
    categoriesTitle: "Discover by Category",
    categoriesSubtitle: "From serene coasts to ancient peaks and living culture",
    catAll: "All Places",
    catBeach: "Beach & Coast",
    catHeritage: "Heritage & History",
    cat7Wonders: "7 Wonders of the World",
    catWorldHeritage: "UNESCO World Heritage",
    catSpiritual: "Spiritual & Pilgrimage",
    catNature: "Nature & Greenery",
    catMountains: "Mountains & Hills",
    catAdventure: "Adventure & Thrill",
    catWildlife: "Wildlife & Safari",
    catCulture: "Culture & Living Traditions",
    catSlowTravel: "Slow Travel & Wellness",
    catFamily: "Family Travel",
    catRomantic: "Romantic Getaways",
    catBudget: "Budget Friendly",
    catLuxury: "Luxury Retreats",
    seasonWhere: "WHERE SHOULD YOU GO THIS SEASON?",
    seasonWinter: "Winter",
    seasonSummer: "Summer",
    seasonMonsoon: "Monsoon",
    seasonSpringAutumn: "Spring / Autumn",
    seasonPicks: "Seasonal Picks",
    filterTitle: "Filters",
    filterSeason: "SEASON",
    filterSort: "SORT BY",
    filterSortRecommended: "Recommended",
    filterSortPopular: "Popularity",
    filterSortRating: "Highest Rating",
    filterSortBudget: "Budget (Low to High)",
    filterSortAZ: "Name (A–Z)",
    filterClear: "Clear all",
    filterApply: "Apply Filters",
    resultsCount: "destinations found",
    emptyNoPlaces: "No destinations matched your criteria",
    emptyReset: "Reset all filters",
    cardFrom: "from",
    cardRating: "Rating",
    cardViewDetails: "View Details",
    cardPlan: "Plan Trip",
    cardSave: "Save",
    cardSaved: "Saved",
    cardShare: "Share",
    cardCopied: "Link Copied!",
    detailCharacteristics: "Characteristics & Signature Vibe",
    detailOverview: "Overview & Travel Story",
    detailThingsToDo: "Top Things to Do",
    detailAttractions: "Key Attractions & Landmarks",
    detailHiddenGems: "Secret Spots & Hidden Gems",
    detailLocalFood: "Food & Culinary Specialties",
    detailCulture: "Local Culture & Etiquette",
    detailStayInfo: "Where to Stay & Accommodation",
    detailTransport: "How to Reach & Transport Options",
    detailBestTime: "Best Time to Visit",
    detailDuration: "Ideal Duration",
    detailBudget: "Estimated Budget",
    detailDailyBudget: "Daily Spend",
    detailPacking: "Smart Packing Suggestions",
    detailSafety: "Safety & Travel Tips",
    detailFaq: "Frequently Asked Questions",
    detailReviews: "Traveller Reviews & Ratings",
    detailSimilar: "Similar Places You May Love",
    detailEnroll: "Enroll / Book This Trip",
    detailRouteMap: "Route, Distance & Map",
    detailFromHub: "Starting Point",
    detailDistance: "Distance",
    detailTravelTime: "Estimated Travel Time",
    transportFlight: "Flight",
    transportTrain: "Train",
    transportBus: "Bus",
    transportCar: "Drive / Cab",
    transportLocal: "Local Transport",
    bookingTitle: "Trip Booking & Enrollment",
    bookingSummary: "Trip Summary",
    bookingDates: "Selected Dates",
    bookingTravellers: "Travellers",
    bookingTransport: "Transport Option",
    bookingStay: "Accommodation Tier",
    bookingTotal: "Total Amount",
    bookingPayMethod: "Select Payment Method",
    bookingPayButton: "Pay Now & Confirm",
    bookingSuccess: "Enrollment & Payment Confirmed!",
    bookingDemoNote: "Secure payment gateway integration. Production mode connects directly to bank/UPI endpoints.",
    paymentUPI: "BHIM UPI",
    paymentGPay: "Google Pay",
    paymentPhonePe: "PhonePe",
    paymentPaytm: "Paytm",
    paymentBHIM: "UPI ID",
    paymentCard: "Credit / Debit Card",
    paymentScanQR: "Scan UPI QR Code",
    receiptTitle: "Official Payment Receipt",
    receiptNumber: "Receipt Number",
    receiptTraveller: "Traveller Name",
    receiptDestination: "Destination",
    receiptDate: "Payment Date",
    receiptAmount: "Amount Paid",
    receiptStatus: "Payment Status",
    receiptPrint: "Print / Save PDF Receipt",
    receiptViewTrip: "View Itinerary & Trip",
    thankYouTitle: "Thank You & Happy Journey!",
    thankYouSubtitle: "Your Travel Chapter is Officially Confirmed.",
    thankYouHappyJourney: "Visit Again · Meaningful Miles Await",
    thankYouDesc: "We have safely registered your trip, confirmed transport and accommodations, and generated your official tax invoice receipt.",
    aiTitle: "TRAVEXA AI Travel Assistant",
    aiSubtitle: "Your personal smart travel advisor",
    aiPlaceholder: "Ask anything about destinations, budget, packing, weather...",
    aiSend: "Send",
    aiFullPlanner: "Open Full AI Planner ↗",
    aiPrompt1: "Plan a 5-day Goa trip on a budget",
    aiPrompt2: "Best places to visit in winter in India",
    aiPrompt3: "Guide to the 12 Jyotirlingas pilgrimage",
    aiPrompt4: "Show me the 7 Wonders of the World",
    aiPrompt5: "Romantic honeymoon destinations in Europe",
    aiPrompt6: "How to reach Kashmir and travel cost",
    footerExplore: "EXPLORE",
    footerMakeYours: "MAKE IT YOURS",
    footerGoodToKnow: "GOOD TO KNOW",
    footerRights: "© 2026 TRAVEXA. All rights reserved.",
    footerTagline: "Meaningful miles, beautifully planned.",
    adminTitle: "TRAVEXA Admin Dashboard",
    adminSubtitle: "Secure platform management & real-time travel intelligence",
    adminDestinations: "Destinations",
    adminUsers: "Users & Accounts",
    adminTrips: "Trips & Bookings",
    adminPayments: "Payments & Receipts",
    adminReviews: "Reviews Moderation",
    adminAnalytics: "Platform Analytics",
    adminTranslations: "Translations",
    adminAddDestination: "Add Destination",
    accessibilityTitle: "Accessibility Settings",
    accessibilityTextSize: "Text Size",
    accessibilityHighContrast: "High Contrast",
    accessibilityReducedMotion: "Reduced Motion",
  },
  "हिंदी": {
    brandTagline: "भारत को जानें। दुनिया को खोजें।",
    navExplore: "अन्वेषण",
    navIndia: "अतुल्य भारत",
    navWorld: "विश्व",
    navPlanner: "AI प्लानर",
    navCompare: "तुलना करें",
    navSpace: "मेरी जगह",
    navSaved: "सहेजे गए स्थान",
    navTrips: "मेरी यात्राएँ",
    navJyotirlingas: "12 ज्योतिर्लिंग",
    navWonders: "दुनिया के 7 अजूबे",
    navHeritage: "विश्व धरोहर स्थल",
    welcomeTitle: "TRAVEXA में आपका स्वागत है",
    welcomeKicker: "यात्रा का नया अनुभव",
    welcomeSubtitle: "भारत को जानें। दुनिया को खोजें।",
    welcomeDesc: "आपकी अगली यात्रा की समझदारी से खोज, योजना और अविस्मरणीय अनुभव का साथी।",
    welcomeStart: "दुनिया घूमें",
    welcomePlan: "AI से योजना बनाएँ",
    heroKicker: "आपका नया अध्याय यहाँ शुरू होता है",
    heroTitle: "ऐसी जगह जाएँ",
    heroTitleEm: "जो आपको बदल दे।",
    heroLede: "सोची-समझी यात्राएँ, खूबसूरती से नियोजित। TRAVEXA के साथ दुनिया की संभावनाओं को अपनी व्यक्तिगत यात्रा में बदलें।",
    heroBuildJourney: "मेरी यात्रा तैयार करें",
    heroSeeHow: "यह कैसे काम करता है",
    heroCurated: "जिज्ञासु यात्रियों के लिए खास",
    searchWhereTo: "आप कहाँ जाना चाहते हैं?",
    searchPlaceholder: "शहर, राज्य, देश या माहौल खोजें...",
    searchDestination: "गंतव्य",
    searchWhen: "कब",
    searchTravelStyle: "यात्रा का अंदाज़",
    searchStylePlaceholder: "आपको क्या पसंद है?",
    searchPlanAI: "AI से प्लान करें",
    searchPopular: "लोकप्रिय गंतव्य",
    searchMatching: "मिलते-जुलते स्थान",
    searchChooseDates: "तारीखें चुनें",
    searchVoice: "आवाज़ से खोजें",
    categoriesTitle: "श्रेणी के अनुसार खोजें",
    categoriesSubtitle: "शांत समुद्र तटों से लेकर प्राचीन शिखरों और समृद्ध संस्कृति तक",
    catAll: "सभी स्थान",
    catBeach: "समुद्र तट और तटीय स्थल",
    catHeritage: "धरोहर एवं इतिहास",
    cat7Wonders: "दुनिया के 7 अजूबे",
    catWorldHeritage: "यूनेस्को विश्व धरोहर",
    catSpiritual: "आध्यात्म एवं तीर्थयात्रा",
    catNature: "प्रकृति और हरियाली",
    catMountains: "पर्वत और वादियां",
    catAdventure: "रोमांच और साहसिक यात्रा",
    catWildlife: "वन्यजीव और सफारी",
    catCulture: "संस्कृति और परंपराएं",
    catSlowTravel: "धीमी यात्रा और सुकून",
    catFamily: "पारिवारिक यात्रा",
    catRomantic: "रोमांटिक स्थल",
    catBudget: "किफायती यात्रा",
    catLuxury: "शाही और लग्जरी प्रवास",
    seasonWhere: "इस मौसम में कहाँ जाना चाहिए?",
    seasonWinter: "सर्दी",
    seasonSummer: "गर्मी",
    seasonMonsoon: "मानसून",
    seasonSpringAutumn: "बसंत / पतझड़",
    seasonPicks: "मौसमी चयन",
    filterTitle: "फ़िल्टर",
    filterSeason: "मौसम",
    filterSort: "क्रमबद्ध करें",
    filterSortRecommended: "अनुशंसित",
    filterSortPopular: "लोकप्रियता",
    filterSortRating: "उच्चतम रेटिंग",
    filterSortBudget: "बजट (कम से ज्यादा)",
    filterSortAZ: "नाम (A से Z)",
    filterClear: "सभी हटाएं",
    filterApply: "फ़िल्टर लागू करें",
    resultsCount: "स्थान मिले",
    emptyNoPlaces: "कोई स्थान आपकी खोज से मेल नहीं खाता",
    emptyReset: "फ़िल्टर रीसेट करें",
    cardFrom: "शुरुआती",
    cardRating: "रेटिंग",
    cardViewDetails: "विवरण देखें",
    cardPlan: "यात्रा प्लान करें",
    cardSave: "सहेजें",
    cardSaved: "सहेजा गया",
    cardShare: "शेयर करें",
    cardCopied: "लिंक कॉपी हो गया!",
    detailCharacteristics: "विशेषताएँ और मुख्य अंदाज़",
    detailOverview: "अवलोकन और यात्रा कथा",
    detailThingsToDo: "करने योग्य मुख्य बातें",
    detailAttractions: "प्रमुख आकर्षण और दर्शनीय स्थल",
    detailHiddenGems: "छुपे हुए अनमोल ठिकाने",
    detailLocalFood: "स्थानीय व्यंजन और खानपान",
    detailCulture: "स्थानीय संस्कृति और परंपराएं",
    detailStayInfo: "ठहरने के बेहतरीन विकल्प",
    detailTransport: "कैसे पहुंचे और परिवहन विकल्प",
    detailBestTime: "घूमने का सबसे अच्छा समय",
    detailDuration: "अनुशंसित अवधि",
    detailBudget: "अनुमानित कुल बजट",
    detailDailyBudget: "दैनिक खर्च",
    detailPacking: "स्मार्ट पैकिंग सुझाव",
    detailSafety: "सुरक्षा एवं सामान्य यात्रा सुझाव",
    detailFaq: "अक्सर पूछे जाने वाले सवाल",
    detailReviews: "यात्रियों की समीक्षाएं और रेटिंग",
    detailSimilar: "मिलते-जुलते अन्य खूबसूरत स्थान",
    detailEnroll: "यह यात्रा बुक / एनरोल करें",
    detailRouteMap: "मार्ग, दूरी और मानचित्र",
    detailFromHub: "शुरुआती स्थान",
    detailDistance: "दूरी",
    detailTravelTime: "अनुमानित यात्रा समय",
    transportFlight: "विमान",
    transportTrain: "ट्रेन",
    transportBus: "बस",
    transportCar: "कार / टैक्सी",
    transportLocal: "स्थानीय साधन",
    bookingTitle: "यात्रा बुकिंग और नामांकन",
    bookingSummary: "यात्रा विवरण",
    bookingDates: "चुनी गई तारीखें",
    bookingTravellers: "यात्री संख्या",
    bookingTransport: "परिवहन प्रकार",
    bookingStay: "ठहरने का प्रकार",
    bookingTotal: "कुल राशि",
    bookingPayMethod: "भुगतान का तरीका चुनें",
    bookingPayButton: "भुगतान करें और कन्फर्म करें",
    bookingSuccess: "बुकिंग और भुगतान सफल!",
    bookingDemoNote: "सुरक्षित पेमेंट गेटवे। प्रोडक्शन में सीधे बैंक / यूपीआई से जुड़ता है।",
    paymentUPI: "भीम यूपीआई (BHIM UPI)",
    paymentGPay: "गूगल पे (Google Pay)",
    paymentPhonePe: "फ़ोनपे (PhonePe)",
    paymentPaytm: "पेटीएम (Paytm)",
    paymentBHIM: "यूपीआई आईडी (UPI ID)",
    paymentCard: "क्रेडिट / डेबिट कार्ड",
    paymentScanQR: "UPI QR कोड स्कैन करें",
    receiptTitle: "आधिकारिक भुगतान रसीद",
    receiptNumber: "रसीद क्रमांक",
    receiptTraveller: "यात्री का नाम",
    receiptDestination: "गंतव्य स्थान",
    receiptDate: "भुगतान तिथि",
    receiptAmount: "भुगतान की गई राशि",
    receiptStatus: "भुगतान स्थिति",
    receiptPrint: "रसीद प्रिंट / PDF सहेजें",
    receiptViewTrip: "यात्रा योजना देखें",
    thankYouTitle: "धन्यवाद और आपकी यात्रा मंगलमय हो!",
    thankYouSubtitle: "आपकी यात्रा की पुष्टि सफलतापूर्वक हो गई है।",
    thankYouHappyJourney: "पुनः पधारें · सुखद अनुभव की कामना",
    thankYouDesc: "हमने आपकी यात्रा, परिवहन और ठहरने के विवरण सुरक्षित रूप से दर्ज कर लिए हैं और आपकी रसीद तैयार है।",
    aiTitle: "TRAVEXA AI यात्रा सहायक",
    aiSubtitle: "आपका निजी स्मार्ट गाइड",
    aiPlaceholder: "स्थानों, बजट, पैकिंग, मौसम के बारे में कुछ भी पूछें...",
    aiSend: "भेजें",
    aiFullPlanner: "पूरा AI प्लानर खोलें ↗",
    aiPrompt1: "कम बजट में 5 दिन की गोवा यात्रा की योजना",
    aiPrompt2: "सर्दियों में भारत में घूमने की बेहतरीन जगहें",
    aiPrompt3: "12 ज्योतिर्लिंगों की संपूर्ण यात्रा गाइड",
    aiPrompt4: "दुनिया के 7 अजूबों के बारे में बताएं",
    aiPrompt5: "यूरोप में हनीमून के लिए रोमांटिक जगहें",
    aiPrompt6: "कश्मीर कैसे पहुंचे और यात्रा का खर्च",
    footerExplore: "अन्वेषण",
    footerMakeYours: "अपनी यात्रा बनाएं",
    footerGoodToKnow: "ज़रूरी जानकारी",
    footerRights: "© 2026 TRAVEXA. सर्वाधिकार सुरक्षित।",
    footerTagline: "सार्थक मील, खूबसूरती से नियोजित।",
    adminTitle: "TRAVEXA एडमिन डैशबोर्ड",
    adminSubtitle: "सुरक्षित प्रबंधन और लाइव ट्रैवेल एनालिटिक्स",
    adminDestinations: "गंतव्य प्रबंधन",
    adminUsers: "उपयोगकर्ता एवं खाते",
    adminTrips: "यात्राएँ एवं बुकिंग",
    adminPayments: "भुगतान एवं रसीदें",
    adminReviews: "समीक्षा प्रबंधन",
    adminAnalytics: "प्लेटफ़ॉर्म आँकड़े",
    adminTranslations: "अनुवाद",
    adminAddDestination: "नया गंतव्य जोड़ें",
    accessibilityTitle: "सुलभता सेटिंग्स",
    accessibilityTextSize: "अक्षरों का आकार",
    accessibilityHighContrast: "उच्च कंट्रास्ट",
    accessibilityReducedMotion: "कम गति (Reduced Motion)",
  },
  "मराठी": {
    brandTagline: "भारत अनुभवा। जग शोधा।",
    navExplore: "भटकंती",
    navIndia: "अतुल्य भारत",
    navWorld: "जग",
    navPlanner: "AI प्लॅनर",
    navCompare: "तुलना करा",
    navSpace: "माझी जागा",
    navSaved: "जतन केलेली ठिकाणे",
    navTrips: "माझ्या सहली",
    navJyotirlingas: "१२ ज्योतिर्लिंगे",
    navWonders: "जगातील ७ आश्चर्ये",
    navHeritage: "जागतिक वारसा स्थळे",
    welcomeTitle: "TRAVEXA मध्ये आपले स्वागत आहे",
    welcomeKicker: "प्रवासाची एक नवी पद्धत",
    welcomeSubtitle: "भारत अनुभवा। जग शोधा।",
    welcomeDesc: "तुमच्या पुढील प्रवासाचा शोध, नियोजन आणि सुंदर अनुभवांसाठी तुमचा विश्वासू सोबती.",
    welcomeStart: "जग एक्सप्लोर करा",
    welcomePlan: "AI सोबत प्लॅन करा",
    heroKicker: "तुमचा नवा अध्याय इथून सुरू होतो",
    heroTitle: "अशा ठिकाणी जा",
    heroTitleEm: "जे तुम्हाला बदलून टाकेल.",
    heroLede: "विचारपूर्वक केलेले प्रवास, सुंदर नियोजन. TRAVEXA सोबत जगातील अमर्याद शक्यतांना तुमच्या वैयक्तिक प्रवासात बदला.",
    heroBuildJourney: "माझा प्रवास तयार करा",
    heroSeeHow: "हे कसे चालते ते पहा",
    heroCurated: "जिज्ञासू प्रवाशांसाठी खास",
    searchWhereTo: "तुम्ही कुठे जाणार आहात?",
    searchPlaceholder: "शहर, राज्य, देश किंवा वातावरण शोधा...",
    searchDestination: "गंतव्य ठिकाण",
    searchWhen: "कधी",
    searchTravelStyle: "प्रवासाची शैली",
    searchStylePlaceholder: "तुम्हाला काय आवडते?",
    searchPlanAI: "AI ने प्लॅन करा",
    searchPopular: "लोकप्रिय ठिकाणे",
    searchMatching: "जुळणारी ठिकाणे",
    searchChooseDates: "तारखा निवडा",
    searchVoice: "आवाजाने शोधा",
    categoriesTitle: "श्रेणीनुसार भटकंती",
    categoriesSubtitle: "शांत समुद्रकिनाऱ्यांपासून ते प्राचीन गडकिल्ले आणि निसर्गरम्य शिखरांपर्यंत",
    catAll: "सर्व ठिकाणे",
    catBeach: "समुद्रकिनारे आणि सागरी किनारे",
    catHeritage: "वारसा आणि ऐतिहासिक स्थळे",
    cat7Wonders: "जगातील ७ आश्चर्ये",
    catWorldHeritage: "युनेस्को जागतिक वारसा",
    catSpiritual: "अध्यात्म आणि तीर्थक्षेत्रे",
    catNature: "निसर्ग आणि हिरवळ",
    catMountains: "डोंगर आणि पर्वत",
    catAdventure: "साहस आणि रोमांच",
    catWildlife: "वन्यजीव आणि सफारी",
    catCulture: "संस्कृती आणि परंपरा",
    catSlowTravel: "शांत प्रवास आणि आरोग्य",
    catFamily: "कौटुंबिक सहल",
    catRomantic: "रोमँटिक ठिकाणे",
    catBudget: "कमी खर्चात प्रवास",
    catLuxury: "आलिशान आणि लक्झरी प्रवास",
    seasonWhere: "या ऋतूत कुठे जायचे?",
    seasonWinter: "हिवाळा",
    seasonSummer: "उन्हाळा",
    seasonMonsoon: "पावसाळा",
    seasonSpringAutumn: "वसंत / शरद",
    seasonPicks: "ऋतूनुसार निवड",
    filterTitle: "फिल्टर",
    filterSeason: "ऋतू",
    filterSort: "क्रमवारी लावा",
    filterSortRecommended: "शिफारस केलेले",
    filterSortPopular: "लोकप्रियता",
    filterSortRating: "सर्वोच्च रेटिंग",
    filterSortBudget: "बजेट (कमी ते जास्त)",
    filterSortAZ: "नाव (A ते Z)",
    filterClear: "सर्व साफ करा",
    filterApply: "फिल्टर लावा",
    resultsCount: "ठिकाणे सापडली",
    emptyNoPlaces: "तुमच्या शोधाशी जुळणारे कोणतेही ठिकाण सापडले नाही",
    emptyReset: "फिल्टर रिसेट करा",
    cardFrom: "किमान",
    cardRating: "रेटिंग",
    cardViewDetails: "सविस्तर माहिती",
    cardPlan: "सहलीचे नियोजन",
    cardSave: "जतन करा",
    cardSaved: "जतन केले",
    cardShare: "शेअर करा",
    cardCopied: "लिंक कॉपी झाली!",
    detailCharacteristics: "वैशिष्ट्ये आणि खास वातावरण",
    detailOverview: "माहिती आणि प्रवास कथा",
    detailThingsToDo: "करण्यासारख्या गोष्टी",
    detailAttractions: "प्रमुख आकर्षणे आणि प्रेक्षणीय स्थळे",
    detailHiddenGems: "लपलेली सुंदर ठिकाणे",
    detailLocalFood: "स्थानिक खाद्यसंस्कृती व चव",
    detailCulture: "स्थानिक संस्कृती आणि परंपरा",
    detailStayInfo: "राहण्याची उत्तम सोय",
    detailTransport: "कसे पोहोचावे आणि प्रवासाचे पर्याय",
    detailBestTime: "भेट देण्यासाठी सर्वोत्तम वेळ",
    detailDuration: "योग्य कालावधी",
    detailBudget: "अंदाजे एकूण बजेट",
    detailDailyBudget: "दैनंदिन खर्च",
    detailPacking: "स्मार्ट पॅकिंग यादी",
    detailSafety: "सुरक्षा आणि प्रवासाच्या टिप्स",
    detailFaq: "वारंवार विचारले जाणारे प्रश्न",
    detailReviews: "प्रवाशांचे अभिप्राय आणि रेटिंग",
    detailSimilar: "अशीच आणखी सुंदर ठिकाणे",
    detailEnroll: "हा प्रवास बुक / नोंदणी करा",
    detailRouteMap: "मार्ग, अंतर आणि नकाशा",
    detailFromHub: "सुरुवातीचे ठिकाण",
    detailDistance: "अंतर",
    detailTravelTime: "अंदाजे प्रवासाचा वेळ",
    transportFlight: "विमान",
    transportTrain: "रेल्वे",
    transportBus: "बस",
    transportCar: "गाडी / टॅक्सी",
    transportLocal: "स्थानिक वाहतूक",
    bookingTitle: "प्रवास नोंदणी आणि बुकिंग",
    bookingSummary: "प्रवासाचा तपशील",
    bookingDates: "निवडलेल्या तारखा",
    bookingTravellers: "प्रवासी संख्या",
    bookingTransport: "वाहतुकीचा प्रकार",
    bookingStay: "मुक्कामाचा प्रकार",
    bookingTotal: "एकूण रक्कम",
    bookingPayMethod: "पेमेंट पद्धत निवडा",
    bookingPayButton: "पैसे भरा आणि निश्चित करा",
    bookingSuccess: "नोंदणी आणि पेमेंट यशस्वी!",
    bookingDemoNote: "सुरक्षित पेमेंट गेटवे. थेट बँक / UPI खात्याशी जोडणी.",
    paymentUPI: "भीम UPI (BHIM UPI)",
    paymentGPay: "गुगल पे (Google Pay)",
    paymentPhonePe: "फोनपे (PhonePe)",
    paymentPaytm: "पेटीएम (Paytm)",
    paymentBHIM: "UPI आयडी",
    paymentCard: "क्रेडिट / डेबिट कार्ड",
    paymentScanQR: "UPI QR कोड स्कॅन करा",
    receiptTitle: "अधिकृत पेमेंट पावती",
    receiptNumber: "पावती क्रमांक",
    receiptTraveller: "प्रवाशाचे नाव",
    receiptDestination: "ठिकाण",
    receiptDate: "पेमेंट तारीख",
    receiptAmount: "भरलेली रक्कम",
    receiptStatus: "पेमेंट स्थिती",
    receiptPrint: "पावती प्रिंट / PDF जतन करा",
    receiptViewTrip: "सहलीचे नियोजन पहा",
    thankYouTitle: "धन्यवाद आणि आपला प्रवास सुखकर होवो!",
    thankYouSubtitle: "तुमच्या सहलीची नोंदणी यशस्वीरित्या पूर्ण झाली आहे.",
    thankYouHappyJourney: "पुन्हा भेट द्या · आनंदी प्रवासाच्या शुभेच्छा",
    thankYouDesc: "आम्ही तुमची सहल, वाहतूक आणि निवासाची व्यवस्था निश्चित केली असून तुमची अधिकृत पावती तयार आहे.",
    aiTitle: "TRAVEXA AI प्रवास मार्गदर्शक",
    aiSubtitle: "तुमचा वैयक्तिक स्मार्ट सहाय्यक",
    aiPlaceholder: "ठिकाणे, बजेट, पॅकिंग, हवामान याबद्दल काहीही विचारा...",
    aiSend: "पाठवा",
    aiFullPlanner: "संपूर्ण AI प्लॅनर उघडा ↗",
    aiPrompt1: "कमी खर्चात ५ दिवसांची गोवा सहल",
    aiPrompt2: "हिवाळ्यात भारतात फिरण्यासाठी उत्तम ठिकाणे",
    aiPrompt3: "१२ ज्योतिर्लिंग यात्रा मार्गदर्शक",
    aiPrompt4: "जगातील ७ आश्चर्यांबद्दल सांगा",
    aiPrompt5: "युरोपमधील रोमँटिक हनिमून ठिकाणे",
    aiPrompt6: "काश्मीरला कसे जायचे आणि अंदाजे खर्च",
    footerExplore: "भटकंती",
    footerMakeYours: "तुमचा प्रवास बनवा",
    footerGoodToKnow: "महत्त्वाची माहिती",
    footerRights: "© 2026 TRAVEXA. सर्व हक्क सुरक्षित.",
    footerTagline: "सार्थक प्रवास, सुंदर नियोजन.",
    adminTitle: "TRAVEXA ॲडमिन डॅशबोर्ड",
    adminSubtitle: "सुरक्षित व्यवस्थापन आणि प्रवास विश्लेषण",
    adminDestinations: "ठिकाणे व्यवस्थापन",
    adminUsers: "वापरकर्ते आणि खाती",
    adminTrips: "सहली आणि बुकिंग",
    adminPayments: "पेमेंट आणि पावत्या",
    adminReviews: "अभिप्राय तपासणी",
    adminAnalytics: "प्लॅटफॉर्म विश्लेषण",
    adminTranslations: "भाषांतर",
    adminAddDestination: "नवीन ठिकाण जोडा",
    accessibilityTitle: "सुलभता सेटिंग्ज",
    accessibilityTextSize: "अक्षरांचा आकार",
    accessibilityHighContrast: "उच्च कॉन्ट्रास्ट",
    accessibilityReducedMotion: "कमी गती (Reduced Motion)",
  },
};
