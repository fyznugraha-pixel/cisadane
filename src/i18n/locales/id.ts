import type { Dictionary } from "./en";

export const id: Dictionary = {
  site: {
    eventName: "Festival Cisadane 2026",
    tagline: "Flowing Heritage, Growing Courage",
    date: "22 - 26 Juli 2026",
    startDate: "2026-07-22T00:00:00",
    location: "Tepian Sungai Cisadane, Tangerang",
    badge: "Karisma Event Nusantara 2026",
    recognition: "Top 125 Event Nasional Terbaik",
    eyebrow: "Perayaan Warisan Budaya Nasional",
    description:
      "Sebuah perayaan yang lahir dari aliran sungai, tumbuh bersama denyut nadi masyarakat, dan terus menghidupkan warisan budaya Tangerang dari generasi ke generasi.",
    cta: {
      primary: "Hadir & Saksikan",
      secondary: "Jelajahi Ceritanya",
    },
    visualIdentity: "Identitas Visual",
    atmosphere: "Atmosfer",
    atmosphereDesc: "Cahaya panggung yang memantul di atas air, irama perayaan rakyat, dan napas budaya yang terus hidup.",
  },
  navbar: {
    items: [
      { label: "Kisah", href: "#about" },
      { label: "Atraksi", href: "#highlights" },
      { label: "Penampil", href: "#lineup" },
      { label: "Registrasi", href: "#register" },
      { label: "Akses", href: "#location" },
    ],
    registerBtn: "Hadir & Bergabung",
  },
  about: {
    eyebrow: "Jejak Sejarah",
    title: "Satu Sungai,\nRibuan Kisah",
    description: "Lebih dari sekadar perayaan tahunan, Festival Cisadane adalah monumen yang hidup. Ruang di mana denyut nadi identitas Kota Tangerang berdetak, mempertemukan tradisi Tionghoa, Betawi, dan Sunda dalam satu aliran harmoni. Ini adalah simbol perjalanan masyarakat yang merawat warisan, namun tak pernah takut untuk terus melangkah maju.",
  },
  highlights: {
    eyebrow: "Atraksi & Pertunjukan",
    title: "Cahaya yang Menari\nDi Atas Permukaan Air",
    description: "Saat matahari tenggelam di atas Sungai Cisadane, panggung-panggung budaya mulai hidup, menghadirkan kisah, tradisi, dan energi yang menyatukan ribuan orang dalam satu perayaan.",
    items: [
      {
        title: "Balap Perahu Naga",
        description: "Dentuman genderang mengiringi laju perahu naga yang membelah arus Cisadane, menghadirkan tradisi yang telah diwariskan lintas generasi.",
        image: "/images/highlights/dragon-boat.jpg",
        accent: "red" as const,
      },
      {
        title: "Panggung Terapung",
        description: "Ketika cahaya teatrikal, alunan musik magis, dan keindahan ritme budaya berpadu merdu di atas tenangnya air sungai.",
        image: "/images/highlights/floating-stage.jpg",
        accent: "teal" as const,
      },
      {
        title: "Pemetaan Visual Interaktif",
        description: "Ruang festival disulap menjadi kanvas penceritaan raksasa, tempat sejarah dan seni menyatu dalam lanskap masa depan yang memukau.",
        image: "/images/highlights/projection-mapping.jpg",
        accent: "gold" as const,
      },
      {
        title: "Koreografi Tradisional",
        description: "Sebuah penghormatan anggun bagi konvergensi budaya Tionghoa, Betawi, dan Sunda, merayakan keberagaman yang menjadi akar kota ini.",
        image: "/images/highlights/traditional-dance.jpg",
        accent: "orange" as const,
      },
      {
        title: "Semarak Panggung Malam",
        description: "Hanyutkan diri Anda dalam ritme elegan dan gemuruh perayaan, merayakan semangat kehidupan sebuah kota yang tak pernah tidur.",
        image: "/images/highlights/night-concert.jpg",
        accent: "gold" as const,
      },
      {
        title: "Puncak Kembang Api",
        description: "Langit malam yang mekar dalam lautan warna, menjadi epilog manis dari seremoni kebersamaan kita.",
        image: "/images/highlights/fireworks.jpg",
        accent: "red" as const,
      },
    ]
  },
  performers: {
    eyebrow: "Seniman & Pencerita",
    title: "Gema Melodi\nDari Tepian",
    description: "Nantikan kehadiran deretan musisi dan talenta luar biasa yang akan mengiringi malam perayaan, memadukan pesona suara masa kini dengan gaung warisan masa lalu.",
    previewPrefix: "Seniman",
    talent: [
      "Perunggu",
      "Happy Asmara",
      "Ada Band",
      "The Changcuters",
      "Barasuara",
      "Nadin Amizah",
      "Bernadya",
      "Sal Priadi",
    ]
  },
  whyVisit: {
    eyebrow: "Panggilan Perayaan",
    title: "Lebih Dari\nSekadar Perayaan",
    description: "Festival Cisadane memanggil Anda untuk bukan sekadar menjadi penonton, melainkan menjadi bagian tak terpisahkan dari sejarah yang terus mengalir.",
    reasonPrefix: "Esensi",
    reasons: [
      {
        title: "Simbol Kehidupan Kota",
        description: "Rasakan pengalaman magis saat ribuan pendar lampu memantul di permukaan air, menghidupkan kembali roh sungai sebagai pusat kehidupan masyarakat.",
      },
      {
        title: "Pertemuan Lintas Budaya",
        description: "Saksikan keindahan toleransi yang sejati, tempat pusaka dari berbagai akar budaya dirayakan dalam satu ruang pelukan yang hangat.",
      },
      {
        title: "Tontonan Bernilai Seni",
        description: "Setiap sudut dirancang untuk memukau—dari arsitektur panggung terapung hingga tata gerak yang menceritakan perjalanan panjang kota ini.",
      },
      {
        title: "Undangan Untuk Bertumbuh",
        description: "Ruang perjumpaan di mana keluarga, kreator, dan generasi masa depan bertemu untuk merawat asa masa lalu sekaligus menatap hari esok.",
      },
    ]
  },
  register: {
    eyebrow: "Jalur Pendaftaran",
    title: "Ambil Bagian Dalam\nSejarah Ini",
    description: "Perayaan agung ini tak akan utuh tanpa kehadiran Anda. Lengkapi informasi berikut untuk turut merajut benang sejarah di Festival Cisadane 2026.",
    statusBox: "Status: Pintu registrasi tengah dipersiapkan. Saat waktunya tiba, portal ini akan menyambut Anda melalui alur pendaftaran elegan yang dirancang khusus untuk pengunjung, mitra, dan kolaborator.",
    categories: [
      {
        id: "visitor",
        title: "Tamu Kehormatan",
        description: "Bagi Anda yang ingin hadir, merasakan kehangatan festival, dan menjadi saksi dari malam kebudayaan terbesar ini.",
        image: "/images/register/visitor.jpg",
      },
      {
        id: "tenant",
        title: "Kreator & Saudagar Loka",
        description: "Panggung bagi wirausaha, perajin kriya, dan talenta kuliner untuk membagikan karya terbaiknya kepada ribuan mata.",
        image: "/images/register/tenant.jpg",
      },
      {
        id: "dragon_boat",
        title: "Pejuang Arus Naga",
        description: "Panggilan bagi para penakluk arus—komunitas dan atlet yang siap mengukir nama dalam tradisi balap perahu yang sakral.",
        image: "/images/register/dragon-boat-team.jpg",
      },
      {
        id: "collaborator",
        title: "Sinergi Kemitraan",
        description: "Ruang pertemuan bagi institusi, mitra media, dan dermawan yang berkeinginan turut merawat nyala tradisi kebanggaan ini.",
        image: "/images/register/collaborator.jpg",
      },
    ]
  },
  location: {
    eyebrow: "Akses Menuju Lokasi",
    title: "Berpadu Di\nJantung Kota",
    mapPlaceholder: "Tempat Peta Interaktif",
    mapTitle: "Tepian Sungai Cisadane",
    mapDesc: "Peta kawasan festival yang artistik sedang dipersiapkan untuk memandu langkah Anda menuju titik pusat perayaan.",
    accessInfo: [
      {
        title: "Jalur Trans Tangerang",
        description: "Akses transportasi publik di dalam kota yang terintegrasi dan membawa Anda langsung ke jantung perayaan.",
      },
      {
        title: "Gerbang Soekarno-Hatta",
        description: "Pintu kedatangan utama yang bersiap menyambut hangat para penikmat budaya dari seluruh penjuru negeri maupun dunia.",
      },
      {
        title: "Kendaraan Daring",
        description: "Pilihan titik perhentian strategis yang dirancang agar Anda dapat langsung membaur dalam semarak area tepian sungai.",
      },
      {
        title: "Panduan Area Berhenti",
        description: "Pemetaan area parkir dan kedatangan sedang dirancang untuk memastikan kenyamanan langkah Anda tanpa hambatan.",
      },
    ]
  },
  footer: {
    description: "Portal resmi Festival Cisadane 2026. Sebuah dedikasi untuk merawat warisan yang hidup, menghidupkan keindahan malam di tepian sungai, dan merayakan semangat masyarakat yang terus bertumbuh bersama arus zaman.",
    copyright: "© 2026 Festival Cisadane. Seluruh kisah dan tradisi dilindungi secara resmi.",
  },
  stickyBar: {
    title: "Festival Cisadane 2026",
    description: "Sebuah undangan untuk merayakan warisan dan bertumbuh bersama. Siapkah Anda mengambil bagian di dalamnya?",
    viewHighlights: "Jelajahi Atraksi",
    registerNow: "Hadir & Bergabung",
    closeLabel: "Tutup panel pendaftaran cepat",
  },
  heroExperience: {
    badge: "Detak Festival",
    titleLine1: "Gemuruh Arus",
    titleLine2: "Pesona Malam",
    description: "Perpaduan memukau antara tradisi luhur perahu naga, panggung yang berpijar megah di atas air, dan energi masyarakat yang merayakan kebhinekaan dalam satu napas yang sama.",
  }
};
