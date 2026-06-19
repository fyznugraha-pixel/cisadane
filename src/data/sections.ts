export type EventHighlight = {
  title: string;
  description: string;
  image: string;
  accent: "red" | "gold" | "teal" | "orange";
};

export type RegistrationCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type AccessInfo = {
  title: string;
  description: string;
};

export const eventHighlights: EventHighlight[] = [
  {
    title: "Dragon Boat Racing",
    description:
      "The ceremonial icon of Festival Cisadane, reviving ancient river traditions and the unyielding spirit of communal competition.",
    image: "/images/highlights/dragon-boat.jpg",
    accent: "red",
  },
  {
    title: "Floating Night Stage",
    description:
      "A mesmerising evening spectacle featuring theatrical lighting, live music, and traditional dance reflected upon the river's surface.",
    image: "/images/highlights/floating-stage.jpg",
    accent: "teal",
  },
  {
    title: "Projection Mapping",
    description:
      "A visual masterpiece that transforms the festival grounds into an immersive journey of light, architecture, and storytelling.",
    image: "/images/highlights/projection-mapping.jpg",
    accent: "gold",
  },
  {
    title: "Traditional Dance",
    description:
      "A graceful celebration of the harmonious encounter between Chinese, Betawi, and Sundanese cultures, showcasing the true multicultural identity of Tangerang.",
    image: "/images/highlights/traditional-dance.jpg",
    accent: "orange",
  },
  {
    title: "Evening Concert",
    description:
      "Immerse yourself in the rhythm, the crowd, and the vibrant atmosphere of a folk festival roaring to life by the Cisadane banks.",
    image: "/images/highlights/night-concert.jpg",
    accent: "gold",
  },
  {
    title: "Grand Fireworks",
    description:
      "The culminating moment of celebration, painting the night sky to honour our shared heritage and festivities.",
    image: "/images/highlights/fireworks.jpg",
    accent: "red",
  },
];

export const registrationCategories: RegistrationCategory[] = [
  {
    id: "visitor",
    title: "General Visitor",
    description: "For those wishing to attend and immerse themselves in the festival experience.",
    image: "/images/register/visitor.jpg",
  },
  {
    id: "tenant",
    title: "Merchant & Artisan Booth",
    description: "For local enterprises, culinary vendors, fashion creators, and artisans.",
    image: "/images/register/tenant.jpg",
  },
  {
    id: "dragon_boat",
    title: "Dragon Boat Team",
    description: "For communities and athletic teams participating in the dragon boat race.",
    image: "/images/register/dragon-boat-team.jpg",
  },
  {
    id: "collaborator",
    title: "Festival Collaborator",
    description: "For sponsors, media partners, institutions, and community collaborators.",
    image: "/images/register/collaborator.jpg",
  },
];

export const accessInfo: AccessInfo[] = [
  {
    title: "Trans Tangerang",
    description: "The primary city transport access to the festival grounds.",
  },
  {
    title: "Soekarno-Hatta Airport",
    description: "The main gateway for out-of-town and international visitors.",
  },
  {
    title: "Ride-Hailing & Taxis",
    description: "Convenient alternative drop-off points directly to the riverbanks.",
  },
  {
    title: "Parking Guidance",
    description: "Parking points will be announced closer to the event date.",
  },
];

export const talentPreview: string[] = [
  "Perunggu",
  "Happy Asmara",
  "Ada Band",
  "The Changcuters",
  "Barasuara",
  "Nadin Amizah",
  "Bernadya",
  "Sal Priadi",
];