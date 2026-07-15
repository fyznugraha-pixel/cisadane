export const en = {
  site: {
    eventName: "Festival Cisadane 2026",
    tagline: "Flowing Heritage, Growing Courage",
    date: "July 22 - 26, 2026",
    startDate: "2026-07-22T00:00:00",
    location: "The Banks of Cisadane River",
    badge: "Karisma Event Nusantara 2026",
    recognition: "Top 125 Best National Events",
    eyebrow: "Tangerang's Cultural Heritage Celebration",
    description: "Join Tangerang's biggest annual festival from July 22–26, 2026. Experience intense dragon boat races, nighttime floating stage performances, local food markets, and rich cultural diversity along the banks of the Cisadane River.",
    cta: {
      primary: "Join the Festival",
      secondary: "Explore Attractions",
    },
    visualIdentity: "Visual Identity",
    atmosphere: "Atmosphere",
    atmosphereDesc: "Radiant, geometric, river currents, living culture, and folk festivities.",
  },
  navbar: {
    items: [
      { label: "The Story", href: "#about" },
      { label: "Highlights", href: "#highlights" },
      { label: "Performers", href: "#lineup" },
      { label: "Registration", href: "/register" },
      { label: "Getting Here", href: "#location" },
    ],
    registerBtn: "Join the Festival",
  },
  about: {
    eyebrow: "The Cisadane Festival Story",
    title: "A National Celebration\nof the People",
    description: "Celebrating diversity and community creativity along the riverbanks. The Cisadane Festival is an official annual event by the Tangerang City Government, recognized as one of the top 125 events in the 2026 Karisma Event Nusantara (KEN). The festival serves as a harmonious meeting ground for the Chinese, Betawi, and Sundanese cultures that have coexisted here for generations. Beyond the festivities, it is a tangible commitment to preserving the Cisadane River and empowering the local community.",
  },
  highlights: {
    eyebrow: "Attractions & Performances",
    title: "Festival Lights\nUpon the Water",
    description: "Discover the spectacular events that make Festival Cisadane an unforgettable destination for cultural enthusiasts and families alike.",
    items: [
      {
        title: "Dragon Boat Racing",
        description: "Watch adrenaline-pumping traditional rowing competitions. Top teams from Makassar, Salatiga, Bone, and Bogor will battle for the championship on the river course.",
        image: "/images/highlights/cs2.jpg",
        accent: "red" as const,
      },
      {
        title: "Floating Stage",
        description: "Enjoy nighttime art and music performances on a 15x20 meter floating stage, fully equipped with spectacular lighting.",
        image: "/images/highlights/cs6.jpg",
        accent: "teal" as const,
      },
      {
        title: "Barongsai & Cultural Performances",
        description: "Appreciate Tangerang's multicultural wealth through dynamic Barongsai (Lion Dance) and various cross-cultural art forms.",
        image: "/images/highlights/cs9.jpg",
        accent: "gold" as const,
      },
      {
        title: "Creative Dance & Traditional Choreography",
        description: "Experience the massive visual choreography of the Tifo Reveal and stunning creative dances that will captivate thousands of attendees.",
        image: "/images/highlights/cs7.jpg",
        accent: "orange" as const,
      },
      {
        title: "Night Stage (Concert)",
        description: "End your day by singing along with your favorite musicians and bands across multiple genres on the festival's main stage.",
        image: "/images/highlights/cs5.jpg",
        accent: "gold" as const,
      },
      {
        title: "Opening Ceremony",
        description: "A grand opening ceremony featuring acrobatic Water Flying Jet Dance and 3D Projection Mapping visuals directly on the water's surface.",
        image: "/images/highlights/cs1.jpg",
        accent: "red" as const,
      },
    ]
  },
  performers: {
    eyebrow: "Night Stage Lineup",
    title: "Melody Echoes\nFrom the Edge",
    description: "Experience spectacular performances from a curated lineup of musicians and guest stars ready to light up the night stage on the Cisadane River.",
    previewPrefix: "Lineup",
    tapToReveal: "Tap to Reveal",
    talent: [
      { name: "Feel Koplo", image: "/artis/feel-koplo.jpeg", tier: "headliner" },
      { name: "Samsaka", tier: "supporting" },
      { name: "ziepross", tier: "supporting" },
      { name: "VOC", tier: "supporting" },
      { name: "The Mora", tier: "supporting" },
      { name: "Star Koplo", tier: "supporting" },
      { name: "pasmatik 18", tier: "supporting" }
    ]
  },
  whyVisit: {
    eyebrow: "Why You Should Visit",
    title: "Experience the Magic\nof Cisadane",
    description: "Four reasons why the Cisadane Festival is a must-attend event this year.",
    reasonPrefix: "Reason",
    reasons: [
      {
        title: "Iconic Dragon Boats",
        description: "Watch a national-scale dragon boat racing competition live. This iconic tradition is always the main highlight of the festival every year.",
      },
      {
        title: "Floating Stage Experience",
        description: "Experience live concerts and art performances from a stage built directly on the river. Supported by projection mapping technology, the night shows truly come to life.",
      },
      {
        title: "Local Culinary & Market",
        description: "Explore hundreds of booths in the Local Market District. Taste authentic Tangerang street food and support products made by local small businesses.",
      },
      {
        title: "Inclusive for Everyone",
        description: "This festival is designed for everyone to enjoy. It offers fun rides for families, entertainment for general visitors, and networking opportunities for businesses.",
      },
    ]
  },
  register: {
    eyebrow: "Registration Information",
    title: "Choose Your Path\nto Join",
    description: "Discover how you can be a part of Festival Cisadane 2026. Please fill out the information below to register as a visitor.",
    statusBox: "Visitor registration is now open. See you at the Cisadane riverbanks!",
    form: {
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      category: "Visitor Category",
      categories: {
        general: "General Public",
        student: "Student",
        community: "Community",
        media: "Media"
      },
      tnc: "I agree that my registration data can be used for registration purposes, event access verification, and communications related to Festival Cisadane 2026.",
      submit: "Join Now",
      success: "Thank you! Your registration has been successful.",
    }
  },
  location: {
    eyebrow: "Getting Here",
    title: "Journey to\nCisadane",
    mapPlaceholder: "Dark Map Placeholder",
    mapTitle: "The Banks of the Cisadane River",
    mapDesc: "Routes and public transportation options to easily reach the festival grounds.",
    accessInfo: [
      {
        title: "Public Transportation",
        description: "Use the Trans Tangerang (Ayo) bus service or Si Benteng minivans operating on various strategic routes, dropping you directly near the glass bridge or the city square.",
      },
      {
        title: "Airport & Train Station",
        description: "From out of town, arrive at Soekarno-Hatta International Airport or take the commuter train to Tangerang Station, followed by local transport.",
      },
      {
        title: "Ride-Hailing Apps",
        description: "Reach the festival grounds easily using popular ride-hailing services like Gojek, Grab, or Maxim.",
      },
      {
        title: "Parking Guidelines",
        description: "Information regarding official parking areas for private vehicles will be announced closer to the event date.",
      },
    ]
  },
  gallery: {
    badge: "Festival Cisadane Archive",
    title: "Feel The Energy\nBefore You Arrive",
    description: "Thousands of steps along the Cisadane riverbanks, the pounding of dragon boat drums, stage lights reflecting on the river's surface, and the spirit of togetherness that grows every night. This is the atmosphere that awaits you at Festival Cisadane.",
    photos: [
      { src: "/images/highlights/cs1.jpg", caption: "A joyous opening ceremony, marking the beginning of Tangerang's grandest river heritage celebration." },
      { src: "/images/highlights/cs2.jpg", caption: "A display of agility and communal fighting spirit in the legendary dragon boat race." },
      { src: "/images/highlights/cs3.jpg", caption: "Slicing through the Cisadane currents, keeping ancestral traditions alive and flowing." },
      { src: "/images/highlights/cs4.jpg", caption: "A space for dialogue and idea exchange, empowering local communities through digital literacy." },
      { src: "/images/highlights/cs5.jpg", caption: "The vibrant night stage appreciating the works and dedication of the city's finest talents." },
      { src: "/images/highlights/cs6.jpg", caption: "The inaugural moments upon the floating stage, illuminated by dazzling lights and city pride." },
      { src: "/images/highlights/cs7.jpg", caption: "The harmony of traditional dance movements reflecting beautifully under laser lights on the water's surface." },
      { src: "/images/highlights/cs8.jpg", caption: "A sea of people immersed in the euphoria of music and the energy of togetherness by the riverbanks." },
      { src: "/images/highlights/cs9.jpg", caption: "The energetic leaps of the Lion Dance, a powerful symbol of multicultural convergence in the heart of Tangerang." },
      { src: "/images/highlights/cs10.jpg", caption: "The warmth of greetings and handshakes that tightly weave the brotherhood between citizens and leaders." },
    ]
  },
  footer: {
    description: "The Cisadane Festival is an annual celebration of cultural preservation, sports, and creative economy along the Cisadane River. Organized by the Tangerang City Government and supported by the 2026 Karisma Event Nusantara.",
    copyright: "© 2026 Tangerang City Government. Organized by Auliacorp. All Rights Reserved.",
  },
  stickyBar: {
    title: "Festival Cisadane 2026",
    description: "An invitation to celebrate our cultural heritage and grow together. Are you ready to take part?",
    viewHighlights: "Explore Attractions",
    registerNow: "Join the Festival",
    closeLabel: "Close sticky register bar",
  },
  heroExperience: {
    badge: "Festival Experience",
    titleLine1: "Flashback",
    titleLine2: "Moments",
    description: "Relive the laughter, cheers, and incredible energy of thousands of visitors uniting in the biggest cultural celebration on the banks of the Cisadane River.",
  },
  objectives: {
    eyebrow: "Core Goals",
    title: "Festival Objectives",
    items: [
      {
        title: "Culture & Tourism",
        description: "Promoting local culture and tourism in Tangerang City"
      },
      {
        title: "Preserving Traditions",
        description: "Preserving arts and traditions developing along the banks of the Cisadane River"
      },
      {
        title: "Regional Economic Growth & MSME Empowerment",
        description: "Empowering local MSMEs and improving the city's and community's economy"
      },
      {
        title: "Environmental Sustainability",
        description: "Fostering community awareness to maintain the sustainability of the Cisadane River"
      }
    ]
  },
  strategy: {
    eyebrow: "Collaboration Strategy",
    title: "Pentahelix Collaboration & 3A Approach",
    description: "Cisadane Festival 2026 implements the Pentahelix Collaboration to form a systematic and integrated activity framework with the 3A Approach.",
    pillars: [
      { title: "Accessibility", items: ["Easy transport: Trans Tangerang", "Jawara Bus", "Trains", "Airport"] },
      { title: "Amenities", items: ["Food facilities", "Family areas", "Hotel discounts", "City tours"] },
      { title: "Attractions", items: ["Cultural stages", "Competitions", "Spectacular shows"] }
    ],
    helix: [
      { name: "Government", desc: "Issuing regulations and support for the event." },
      { name: "Academics", desc: "Providing research and science-based solutions for event sustainability and tech exhibitions." },
      { name: "Business", desc: "Providing resources and support in eco-friendly products, financing, and infrastructure." },
      { name: "Media", desc: "Promoting the event and disseminating sustainability information to the wider public." },
      { name: "Community & Public", desc: "Encouraging active participation in education and sustainability management during the event." }
    ]
  },
  smartGreen: {
    eyebrow: "Future Innovations",
    title: "Smart & Green Event Innovations",
    items: [
      {
        title: "Zero Carbon Event",
        description: "Through tree planting programs and various eco-friendly actions, Cisadane Festival 2026 seeks to reduce carbon emissions while preserving the Cisadane River area. This initiative is part of a commitment to realize a sustainable, educational festival with a positive impact on the environment and society."
      },
      {
        title: "CCTV Counting Event",
        description: "Implementation of AI-based CCTV Crowd Counting technology to monitor and count the number of visitors in real-time. The generated data provides accurate analytical insights as a basis for event evaluation, performance measurement, and safer, more effective crowd management."
      },
      {
        title: "Waste Management Solutions",
        description: "Integrated Waste Management for a Sustainable Festival. Cisadane Festival implements a three-category waste sorting system (organic, plastic, paper/can), managed together with WAHU, <b>Banksasuci</b> (Cisadane River Waste Bank), and DLH/Tangerang City Communities, supported by 50 trash bin points across the event area.",
        subItems: [
          { title: "3-Category Waste Sorting", desc: "Organic, plastic, and paper/can waste are sorted at the source, then forwarded to their respective management partners (WAHU for plastic, <b>Banksasuci</b> and DLH/Communities for organic and paper/can)." },
          { title: "50 Integrated Trash Bin Points", desc: "Spread across the festival area, supported by the collaboration of mineral water producers, WAHU, <b>Banksasuci</b>, and DLH as partners providing and managing the trash bins." }
        ]
      }
    ]
  },
  impact: {
    eyebrow: "Festival Impact",
    title: "Cisadane Festival's\nTrack Record",
    description: "The Cisadane Festival is more than a celebration; it's an engine for economic growth, cultural preservation, and community empowerment.",
    stats: [
      { value: "50,000+", label: "Total Visitors", suffix: "" },
      { value: "200+", label: "Local SMEs Involved", suffix: "" },
      { value: "15", label: "Economic Turnover", suffix: " Billion" },
      { value: "125", label: "Top National KEN Events", suffix: "" },
    ]
  },
  history: {
    eyebrow: "Traces & Facts",
    title: "Diving into Cisadane's\nHistory",
    description: "Learn more about the civilization, unity, and harmonious diversity born on the banks of the Cisadane River.",
    items: [
      {
        title: "Jalan Benteng",
        description: "The name Jalan Benteng did not appear without reason. Benteng Tangerang was the main VOC military post in Tangerang, located on the banks of the Tjisadane (Cisadane) River, marking the political border between the VOC territory in Batavia and the Banten Sultanate. From this fort, the area became known as Benteng, and the name endures as the identity of Tangerang society today.",
        image: "/images/history/history_1.jpeg"
      },
      {
        title: "Benteng Makassar",
        description: "Despite the name \"Makassar\", the Benteng Makassar area does not originate from the city of Makassar in Sulawesi. VOC troops consisting of Bugis-Makassar forces under the ally Arung Palakka helped build this fort, living in garrison camps around the post and forming the toponym of Kampung Benteng Makassar today. The design of Benteng Tangerang is also suspected to adopt Fort Rotterdam, a VOC fort in Makassar.",
        image: "/images/history/history_3.jpeg"
      },
      {
        title: "Traces of the Dutch Fort",
        description: "In the Jalan Benteng Makassar area, there is a replica of a fort and cannons built to commemorate colonial defense history. The original location of this fort was in the center of present-day Tangerang city on Jalan Raya Pantura-Daan Mogot. This fort bore silent witness to major incidents, including the VOC-Banten war (1680-1684), the Chinese Massacre (1740), and the Kiyai Tapa rebellion (1750-1751).",
        image: "/images/history/history_4.jpeg"
      },
      {
        title: "The Peh Cun Tradition",
        description: "Peh Cun or the Duan Wu Jie celebration is a summer festival of Chinese tradition. The highlight of the Peh Cun tradition is the decorated boat race on the Cisadane River. Although this festival aims to commemorate ancestors, its implementation involves many people and is not limited to citizens of Chinese descent, but becomes a joint celebration with the citizens of Tangerang and its surroundings.",
        image: "/images/history/history_2.jpeg"
      }
    ]
  }
};

export type Dictionary = typeof en;
