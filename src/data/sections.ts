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
    title: "Perahu Naga",
    description:
      "Ikon seremonial Festival Cisadane yang menghidupkan tradisi sungai dan energi kompetisi rakyat.",
    image: "/images/highlights/dragon-boat.jpg",
    accent: "red",
  },
  {
    title: "Panggung Terapung",
    description:
      "Pertunjukan malam dengan cahaya panggung, musik, tari, dan refleksi lampu di permukaan sungai.",
    image: "/images/highlights/floating-stage.jpg",
    accent: "teal",
  },
  {
    title: "Projection Mapping",
    description:
      "Atraksi visual yang mengubah ruang festival menjadi pengalaman cahaya dan cerita.",
    image: "/images/highlights/projection-mapping.jpg",
    accent: "gold",
  },
  {
    title: "Tari Tradisional",
    description:
      "Pertemuan budaya Tionghoa, Betawi, Sunda, dan identitas multikultural Kota Tangerang.",
    image: "/images/highlights/traditional-dance.jpg",
    accent: "orange",
  },
  {
    title: "Konser Malam",
    description:
      "Musik, crowd, dan atmosfer festival rakyat yang hidup di tepian Cisadane.",
    image: "/images/highlights/night-concert.jpg",
    accent: "gold",
  },
  {
    title: "Kembang Api",
    description:
      "Momen puncak yang memperkuat rasa seremoni dan kemeriahan festival.",
    image: "/images/highlights/fireworks.jpg",
    accent: "red",
  },
];

export const registrationCategories: RegistrationCategory[] = [
  {
    id: "visitor",
    title: "Pengunjung Umum",
    description: "Untuk masyarakat yang ingin hadir menikmati festival.",
    image: "/images/register/visitor.jpg",
  },
  {
    id: "tenant",
    title: "UMKM / Booth Tenant",
    description: "Untuk pelaku usaha, kuliner, fesyen, kriya, dan produk lokal.",
    image: "/images/register/tenant.jpg",
  },
  {
    id: "dragon_boat",
    title: "Peserta Perahu Naga",
    description: "Untuk komunitas atau tim yang mengikuti agenda perahu naga.",
    image: "/images/register/dragon-boat-team.jpg",
  },
  {
    id: "collaborator",
    title: "Kolaborator",
    description: "Untuk sponsor, media, komunitas, institusi, dan partner festival.",
    image: "/images/register/collaborator.jpg",
  },
];

export const accessInfo: AccessInfo[] = [
  {
    title: "Trans Tangerang",
    description: "Akses transportasi kota menuju kawasan festival.",
  },
  {
    title: "Bandara Soekarno-Hatta",
    description: "Gerbang utama wisatawan luar kota dan mancanegara.",
  },
  {
    title: "Ojek & Taksi Online",
    description: "Alternatif drop-off menuju area tepian Sungai Cisadane.",
  },
  {
    title: "Panduan Parkir",
    description: "Informasi titik parkir akan diumumkan setelah venue final.",
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