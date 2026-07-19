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
    eyebrow: "Perayaan Warisan Budaya Kota Tangerang",
    description: "Bergabunglah dalam festival tahunan terbesar di Tangerang pada 22–26 Juli 2026. Nikmati sengitnya kompetisi perahu naga, pertunjukan panggung malam di atas air, bazar kuliner, dan kekayaan ragam budaya di sepanjang tepian Sungai Cisadane.",
    cta: {
      primary: "Hadir & Bergabung",
      secondary: "Jelajahi Atraksi",
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
      { label: "Dampak", href: "#impact" },
      { label: "Akses", href: "#location" },
    ],
    registerBtn: "Hadir & Bergabung",
  },
  about: {
    eyebrow: "Cerita Festival Cisadane",
    title: "Satu Sungai,\nRibuan Kisah",
    description: "Merayakan keberagaman dan kreativitas masyarakat di tepian sungai. Festival Cisadane adalah acara tahunan resmi dari Pemerintah Kota Tangerang yang berhasil masuk dalam daftar 125 event terbaik Karisma Event Nusantara (KEN) 2026. Festival ini menjadi ruang pertemuan harmonis bagi budaya Tionghoa, Betawi, dan Sunda yang telah lama hidup berdampingan. Lebih dari sekadar perayaan, acara ini adalah komitmen nyata untuk terus melestarikan Sungai Cisadane dan memberdayakan komunitas lokal.",
  },
  highlights: {
    eyebrow: "Atraksi & Pertunjukan",
    title: "Cahaya yang Menari\nDi Atas Permukaan Air",
    description: "Saat matahari tenggelam di atas Sungai Cisadane, panggung-panggung budaya mulai hidup, menghadirkan kisah, tradisi, dan energi yang menyatukan ribuan orang dalam satu perayaan.",
    items: [
      {
        title: "Balap Perahu Naga",
        description: "Saksikan kompetisi dayung tradisional yang memacu adrenalin. Tim-tim tangguh dari Makassar, Salatiga, Bone, dan Bogor siap memperebutkan piala di lintasan sungai.",
        image: "/images/highlights/cs2.webp",
        accent: "red" as const,
      },
      {
        title: "Panggung Terapung",
        description: "Nikmati pertunjukan seni dan musik malam hari di atas panggung air berukuran 15x20 meter, lengkap dengan tata cahaya yang spektakuler.",
        image: "/images/highlights/cs6.webp",
        accent: "teal" as const,
      },
      {
        title: "Atraksi Barongsai",
        description: "Apresiasi kekayaan multikultural Tangerang melalui pertunjukan Barongsai yang lincah dan ragam kesenian lintas budaya lainnya.",
        image: "/images/highlights/cs9.webp",
        accent: "gold" as const,
      },
      {
        title: "Koreografi Tradisional",
        description: "Meriahkan suasana dengan atraksi Tifo Reveal berupa koreografi visual massal dan berbagai tarian kreasi yang memukau ribuan pengunjung.",
        image: "/images/highlights/cs7.webp",
        accent: "orange" as const,
      },
      {
        title: "Panggung Malam",
        description: "Tutup hari Anda dengan bernyanyi bersama musisi dan band favorit dari berbagai genre di panggung utama festival.",
        image: "/images/highlights/cs5.webp",
        accent: "gold" as const,
      },
      {
        title: "Seremoni Pembukaan",
        description: "Upacara pembukaan meriah yang menampilkan atraksi akrobatik Water Flying Jet Dance dan tata visual Projection Mapping 3D di permukaan air.",
        image: "/images/highlights/cs1.webp",
        accent: "red" as const,
      },
    ]
  },
  performers: {
    eyebrow: "Penampil Panggung Malam",
    title: "Gema Melodi\nDari Tepian",
    description: "Saksikan penampilan spektakuler dari deretan musisi dan bintang tamu yang siap memeriahkan malam festival di atas panggung terapung Sungai Cisadane.",
    previewPrefix: "Lineup",
    tapToReveal: "Ketuk untuk Membuka",
    talent: [
      { name: "Feel Koplo", image: "/artis/feel-koplo.webp", tier: "headliner", imagePosition: "center" },
      { name: "Rico Ceper (MC)", image: "/artis/riko.webp", tier: "supporting", imagePosition: "center 20%" },
      { name: "Tya Yustina (MC)", image: "/artis/tya yustina.webp", tier: "supporting", imagePosition: "center" },
      { name: "BJB Band", image: "/artis/bjb.webp", tier: "supporting", imagePosition: "center 35%" },
      { name: "D'Korp", image: "/artis/d korpp.webp", tier: "supporting", imagePosition: "center 30%" },
      { name: "Screaming Hedgehog", image: "/artis/SCREAMING HEDGEHOG.webp", tier: "supporting", imagePosition: "center" },
      { name: "Om Abidin", image: "/artis/abidin.webp", tier: "supporting", imagePosition: "center" },
      { name: "Go Tunes", image: "/artis/gotunes.webp", tier: "supporting", imagePosition: "center" },
      { name: "Pasmatik", image: "/artis/pasmatik.webp", tier: "supporting", imagePosition: "center" },
      { name: "Samsaka", image: "/artis/samsaka.webp", tier: "supporting", imagePosition: "center" },
      { name: "Sikoe Band", image: "/artis/sikoe band.webp", tier: "supporting", imagePosition: "center" },
      { name: "Start Koplo", image: "/artis/start koplo.webp", tier: "supporting", imagePosition: "center 70%" },
      { name: "The Mora", image: "/artis/the mora.webp", tier: "supporting", imagePosition: "center" },
      { name: "VOC", image: "/artis/VOC.webp", tier: "supporting", imagePosition: "center" },
      { name: "Zziepro'ss", image: "/artis/zziepro.webp", tier: "supporting", imagePosition: "center" },
      { name: "Angklung Ceria Barata", image: "/artis/ANGKLUNG CERIA BARATA.webp", tier: "supporting", imagePosition: "center" },
      { name: "Asalkustik Universe", image: "/artis/ASALKUSTIK UNIVERSE.webp", tier: "supporting", imagePosition: "center" },
      { name: "Cingdons", image: "/artis/cingdons.webp", tier: "supporting", imagePosition: "center" },
      { name: "Golden Haze", image: "/artis/GOLDEN HAZE.webp", tier: "supporting", imagePosition: "center" },
      { name: "Ilona", image: "/artis/ILONA.webp", tier: "supporting", imagePosition: "center" },
      { name: "Not Afraid", image: "/artis/not afraid.webp", tier: "supporting", imagePosition: "center" },
      { name: "Over Drive", image: "/artis/over drive.webp", tier: "supporting", imagePosition: "center" },
      { name: "Surfive", image: "/artis/surfive.webp", tier: "supporting", imagePosition: "center" },
      { name: "Univ Yatsi Madani", image: "/artis/UNIV YATSI MADANI.webp", tier: "supporting", imagePosition: "center" },
      { name: "Koflow", image: "/artis/koflow.webp", tier: "supporting", imagePosition: "center" },
    ]
  },
  whyVisit: {
    eyebrow: "Alasan Mengunjungi Festival",
    title: "Lebih Dari\nSekadar Perayaan",
    description: "Empat hal yang membuat Festival Cisadane patut Anda datangi tahun ini.",
    reasonPrefix: "Esensi",
    reasons: [
      {
        title: "Tradisi Perahu Naga",
        description: "Saksikan langsung lomba balap perahu naga berskala nasional. Kompetisi ini adalah tradisi ikonik yang selalu menjadi pusat perhatian setiap tahunnya.",
      },
      {
        title: "Panggung di Atas Air",
        description: "Rasakan pengalaman menonton konser dan seni pertunjukan dari panggung terapung. Didukung teknologi projection mapping, pertunjukan malam hari menjadi lebih hidup.",
      },
      {
        title: "Kuliner & UMKM Lokal",
        description: "Jelajahi ratusan booth di zona Local Market District. Nikmati beragam makanan khas Tangerang dan dukung produk-produk unggulan dari pelaku usaha menengah.",
      },
      {
        title: "Inklusif untuk Semua",
        description: "Festival ini dirancang untuk dinikmati oleh siapa saja. Tersedia wahana bermain anak untuk keluarga, hiburan bagi umum, dan peluang bagi para pelaku usaha.",
      },
    ]
  },
  register: {
    eyebrow: "Informasi Registrasi",
    title: "Ambil Bagian Dalam\nSejarah Ini",
    description: "Perayaan agung ini tak akan utuh tanpa kehadiran Anda. Lengkapi informasi berikut untuk turut merajut benang sejarah di Festival Cisadane 2026 sebagai pengunjung.",
    statusBox: "Pendaftaran pengunjung telah dibuka. Sampai jumpa di Festival Cisadane 2026!",
    form: {
      fullName: "Nama Lengkap",
      email: "Alamat Email",
      phone: "Nomor WhatsApp",
      domicile: "Domisili",
      domicilePlaceholder: "Mis. Kota Tangerang",
      tnc: "Saya menyetujui bahwa data registrasi saya dapat digunakan untuk keperluan registrasi, verifikasi akses acara, dan komunikasi terkait Festival Cisadane 2026.",
      submit: "Daftar Sekarang",
      success: "Terima kasih! Registrasi Anda telah berhasil.",
    }
  },
  location: {
    eyebrow: "Akses Menuju Lokasi",
    title: "Berpadu Di\nJantung Kota",
    mapPlaceholder: "Tempat Peta Interaktif",
    mapTitle: "Tepian Sungai Cisadane",
    mapDesc: "Rute dan pilihan transportasi publik untuk mencapai area festival dengan mudah.",
    accessInfo: [
      {
        title: "Transportasi Umum",
        description: "Gunakan layanan bus Trans Kota Tangerang (Ayo) atau angkot Si Benteng yang beroperasi di berbagai rute strategis, turun langsung di sekitar jembatan kaca atau alun-alun.",
      },
      {
        title: "Bandara & Kereta Api",
        description: "Dari luar kota, Anda bisa terbang ke Bandara Internasional Soekarno-Hatta atau menggunakan KRL menuju Stasiun Tangerang, lalu dilanjutkan dengan transportasi lokal.",
      },
      {
        title: "Transportasi Online",
        description: "Akses lokasi festival dengan praktis menggunakan layanan ojek dan taksi online seperti Gojek, Grab, atau Maxim.",
      },
      {
        title: "Panduan Parkir",
        description: "Informasi mengenai titik-titik parkir resmi untuk kendaraan pribadi akan diumumkan mendekati hari pelaksanaan.",
      },
    ]
  },
  gallery: {
    badge: "Arsip Festival Cisadane",
    title: "Resapi Energinya\nSebelum Anda Tiba",
    description: "Ribuan langkah menyusuri tepian Cisadane, dentuman genderang perahu naga, cahaya panggung yang memantul di permukaan sungai, dan kebersamaan yang tumbuh setiap malam. Inilah suasana magis yang akan menyambut Anda di Festival Cisadane.",
    photos: [
      { src: "/images/highlights/cs1.webp", caption: "Seremoni pembukaan yang meriah, menandai dimulainya perayaan warisan sungai terbesar di Tangerang." },
      { src: "/images/highlights/cs2.webp", caption: "Adu ketangkasan dan semangat juang komunal dalam tradisi balap perahu naga." },
      { src: "/images/highlights/cs3.webp", caption: "Membelah arus Cisadane, menjaga pusaka leluhur agar terus hidup dan mengalir." },
      { src: "/images/highlights/cs4.webp", caption: "Ruang perjumpaan gagasan, memberdayakan komunitas loka melalui literasi digital." },
      { src: "/images/highlights/cs5.webp", caption: "Semarak panggung malam yang mengapresiasi dedikasi dan karya talenta terbaik kota." },
      { src: "/images/highlights/cs6.webp", caption: "Detik-detik peresmian di atas panggung terapung yang dipenuhi gemerlap cahaya dan kebanggaan." },
      { src: "/images/highlights/cs7.webp", caption: "Harmoni tari tradisional yang membias indah di bawah sorotan cahaya di atas permukaan air." },
      { src: "/images/highlights/cs8.webp", caption: "Lautan manusia yang terhanyut dalam euforia musik dan energi kebersamaan di tepian sungai." },
      { src: "/images/highlights/cs9.webp", caption: "Lompatan energik Barongsai, simbol sejati dari konvergensi multikultural di jantung kota." },
      { src: "/images/highlights/cs10.webp", caption: "Kehangatan jabat tangan yang merajut erat persaudaraan antara masyarakat dan pemimpin." },
    ]
  },
  footer: {
    description: "Festival Cisadane adalah perayaan tahunan pelestarian budaya, olahraga, dan ekonomi kreatif di sepanjang Sungai Cisadane. Diselenggarakan oleh Pemerintah Kota Tangerang dan didukung oleh Karisma Event Nusantara 2026.",
    copyright: "© 2026 Pemerintah Kota Tangerang. Dilaksanakan oleh Auliacorp. Semua Hak Dilindungi.",
  },
  stickyBar: {
    title: "Festival Cisadane 2026",
    description: "Sebuah undangan untuk merayakan warisan budaya dan bertumbuh bersama. Siap mengambil bagian di dalamnya?",
    viewHighlights: "Jelajahi Atraksi",
    registerNow: "Hadir & Bergabung",
    closeLabel: "Tutup panel pendaftaran cepat",
  },
  heroExperience: {
    badge: "Detak Festival",
    titleLine1: "Kilas Balik",
    titleLine2: "Kemeriahan",
    description: "Saksikan kembali tawa, sorak sorai, dan energi luar biasa dari ribuan pengunjung yang menyatu dalam perayaan budaya terbesar di tepian Sungai Cisadane.",
  },
  objectives: {
    eyebrow: "Tujuan Utama",
    title: "Objektif Festival",
    items: [
      {
        title: "Budaya & Pariwisata",
        description: "Mempromosikan kebudayaan lokal dan pariwisata Kota Tangerang",
      },
      {
        title: "Melestarikan Tradisi",
        description: "Melestarikan seni dan tradisi yang berkembang di bantaran Sungai Cisadane",
      },
      {
        title: "Peningkatan Ekonomi Daerah dan Pemberdayaan UMKM",
        description: "Memberdayakan UMKM lokal dan meningkatkan Ekonomi Kota dan Masyarakat",
      },
      {
        title: "Kelestarian Lingkungan",
        description: "Menumbuhkan kesadaran masyarakat menjaga kelestarian Sungai Cisadane",
      }
    ]
  },
  strategy: {
    eyebrow: "Strategi Kolaborasi",
    title: "Kolaborasi Pentahelix & Pendekatan 3A",
    description: "Festival Cisadane 2026 mengimplementasikan Kolaborasi Pentahelix untuk membentuk kerangka kegiatan yang sistematis dan terpadu dengan Pendekatan 3A.",
    pillars: [
      { title: "Aksesibilitas", items: ["Transportasi mudah: Trans Tangerang", "Bus Jawara", "Kereta", "Bandara"] },
      { title: "Amenitas", items: ["Fasilitas makanan", "Area keluarga", "Diskon hotel", "City tour"] },
      { title: "Atraksi", items: ["Panggung budaya", "Kompetisi", "Pertunjukan spektakuler"] }
    ],
    helix: [
      { name: "Pemerintah", desc: "Mengeluarkan regulasi dan dukungan terhadap event." },
      { name: "Akademisi", desc: "Memberikan riset dan solusi berbasis ilmu pengetahuan untuk keberlanjutan acara serta pameran teknologi." },
      { name: "Bisnis", desc: "Menyediakan sumber daya dan dukungan dalam hal produk ramah lingkungan, pembiayaan dan infrastruktur." },
      { name: "Media", desc: "Mempromosikan acara dan menyebarkan informasi keberlanjutan kepada masyarakat luas." },
      { name: "Komunitas & Masyarakat", desc: "Mendorong partisipasi aktif dalam edukasi dan pengelolaan keberlanjutan selama acara." }
    ]
  },
  smartGreen: {
    eyebrow: "Inovasi Masa Depan",
    title: "Smart & Green Event Innovations",
    items: [
      {
        title: "Zero Carbon Event",
        description: "Melalui program penanaman pohon dan berbagai aksi ramah lingkungan, Festival Cisadane 2026 berupaya mengurangi emisi karbon sekaligus menjaga kelestarian kawasan Sungai Cisadane. Inisiatif ini menjadi bagian dari komitmen mewujudkan festival yang berkelanjutan, edukatif, dan memberikan dampak positif bagi lingkungan serta masyarakat."
      },
      {
        title: "CCTV Counting Event",
        description: "Implementasi teknologi AI berbasis CCTV Crowd Counting pada Festival Cisadane 2026 untuk memantau dan menghitung jumlah pengunjung secara real-time. Data yang dihasilkan memberikan insight analitik yang akurat sebagai dasar evaluasi penyelenggaraan acara, pengukuran performa event, serta pengelolaan kerumunan yang lebih aman dan efektif."
      },
      {
        title: "Waste Management Solutions",
        description: "Festival Cisadane menerapkan pengelolaan sampah terpadu dengan sistem pemilahan tiga kategori: organik, plastik, dan kertas. Bekerja sama dengan WAHU, <b>Banksasuci</b>, dan Dinas Lingkungan Hidup, serta menyiapkan puluhan titik tempat sampah di seluruh area acara guna menjaga kebersihan lingkungan festival."
      }
    ]
  },
  impact: {
    eyebrow: "Dampak Festival",
    title: "Jejak Prestasi\nFestival Cisadane",
    description: "Festival Cisadane bukan sekadar perayaan, melainkan motor penggerak ekonomi, pelestarian budaya, dan pemberdayaan masyarakat.",
    stats: [
      { value: "50.000+", label: "Total Pengunjung", suffix: "" },
      { value: "200+", label: "UMKM Lokal Terlibat", suffix: "" },
      { value: "15", label: "Perputaran Ekonomi", suffix: " Miliar" },
      { value: "125", label: "Top Event Nasional KEN", suffix: "" },
    ]
  },
  history: {
    eyebrow: "Jejak & Fakta",
    title: "Menyelami Sejarah\nCisadane",
    description: "Ketahui lebih dalam kisah peradaban, persatuan, dan harmoni ragam budaya yang lahir di tepian Sungai Cisadane.",
    items: [
      {
        title: "Jalan Benteng",
        description: "Nama Jalan Benteng bukanlah nama yang muncul tanpa alasan. Benteng Tangerang adalah pos militer utama VOC di Tangerang yang terletak di tepian Sungai Tjisadane (Cisadane), yang menandai perbatasan politik antara wilayah VOC di Batavia dan sekitarnya (Batavia Ommelanden) dan Kesultanan Banten. Dari benteng inilah kawasan tersebut kemudian dikenal sebagai Benteng, dan nama itu bertahan hingga menjadi identitas masyarakat Tangerang saat ini.",
        image: "/images/history/history_1.webp"
      },
      {
        title: "Benteng Makassar",
        description: "Meskipun namanya \"Makassar\", kawasan Benteng Makassar tidak berasal dari Kota Makassar di Sulawesi. Pasukan VOC yang terdiri dari pasukan Bugis-Makassar bawahan sekutu Arung Palakka turut mendirikan benteng ini, bertinggal di kamp-kamp garnisun sekitar pos dan perlahan membentuk toponimi Kampung Benteng Makassar hari ini. Rancangan Benteng Tangerang juga diduga mengadopsi Fort Rotterdam, benteng VOC di Makassar.",
        image: "/images/history/history_3.webp"
      },
      {
        title: "Jejak Benteng Belanda",
        description: "Di kawasan Jalan Benteng Makassar terdapat replika benteng dan meriam yang dibangun untuk mengingat sejarah pertahanan kolonial. Lokasi asli benteng ini terletak di pusat kota Tangerang saat ini di Jalan Raya Pantura-Daan Mogot. Benteng ini menjadi saksi bisu terhadap insiden besar di Tangerang, antara lain perang VOC-Banten (1680-1684), Geger Pecinan (1740), dan pemberontakan Kiyai Tapa (1750-1751).",
        image: "/images/history/history_4.webp"
      },
      {
        title: "Tradisi Peh Cun",
        description: "Peh Cun atau perayaan Duan Wu Jie adalah pesta musim panas tradisi Tionghoa. Puncak acara tradisi Peh Cun adalah lomba perahu berhias di Kali Cisadane. Festival ini kendatipun tujuannya sebagai peringatan kepada leluhur, dalam pelaksanaannya melibatkan orang banyak dan tidak terbatas di kalangan warga keturunan Cina saja, melainkan menjadi perayaan bersama warga Tangerang dan sekitarnya.",
        image: "/images/history/history_2.webp"
      }
    ]
  }
};
