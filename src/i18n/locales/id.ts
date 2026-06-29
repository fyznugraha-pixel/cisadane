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
      { label: "Registrasi", href: "/register" },
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
        image: "/images/highlights/cs2.jpg",
        accent: "red" as const,
      },
      {
        title: "Panggung Terapung",
        description: "Nikmati pertunjukan seni dan musik malam hari di atas panggung air berukuran 15x20 meter, lengkap dengan tata cahaya yang spektakuler.",
        image: "/images/highlights/cs6.jpg",
        accent: "teal" as const,
      },
      {
        title: "Atraksi Barongsai",
        description: "Apresiasi kekayaan multikultural Tangerang melalui pertunjukan Barongsai yang lincah dan ragam kesenian lintas budaya lainnya.",
        image: "/images/highlights/cs9.jpg",
        accent: "gold" as const,
      },
      {
        title: "Koreografi Tradisional",
        description: "Meriahkan suasana dengan atraksi Tifo Reveal berupa koreografi visual massal dan berbagai tarian kreasi yang memukau ribuan pengunjung.",
        image: "/images/highlights/cs7.jpg",
        accent: "orange" as const,
      },
      {
        title: "Panggung Malam",
        description: "Tutup hari Anda dengan bernyanyi bersama musisi dan band favorit dari berbagai genre di panggung utama festival.",
        image: "/images/highlights/cs5.jpg",
        accent: "gold" as const,
      },
      {
        title: "Seremoni Pembukaan",
        description: "Upacara pembukaan meriah yang menampilkan atraksi akrobatik Water Flying Jet Dance dan tata visual Projection Mapping 3D di permukaan air.",
        image: "/images/highlights/cs1.jpg",
        accent: "red" as const,
      },
    ]
  },
  performers: {
    eyebrow: "Penampil Panggung Malam",
    title: "Gema Melodi\nDari Tepian",
    previewPrefix: "Lineup",
    talent: [
      { name: "TBA" },
      { name: "Samsaka" },
      { name: "ziepross" },
      { name: "VOC" },
      { name: "The Mora" },
      { name: "Star Koplo" },
      { name: "pasmatik 18" }
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
    statusBox: "Pendaftaran pengunjung telah dibuka. Sampai jumpa di tepian Cisadane!",
    form: {
      fullName: "Nama Lengkap",
      email: "Alamat Email",
      phone: "Nomor Handphone",
      category: "Kategori Pengunjung",
      categories: {
        general: "Masyarakat Umum",
        student: "Pelajar/Mahasiswa",
        community: "Komunitas",
        media: "Media/Pers"
      },
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
        title: "Transportasi Kota",
        description: "Gunakan layanan Bus Trans Tangerang, Bus Jawara, atau angkutan Si Benteng yang dikelola langsung oleh Dishub Kota Tangerang untuk rute dalam kota.",
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
      { src: "/images/highlights/cs1.jpg", caption: "Seremoni pembukaan yang meriah, menandai dimulainya perayaan warisan sungai terbesar di Tangerang." },
      { src: "/images/highlights/cs2.jpg", caption: "Adu ketangkasan dan semangat juang komunal dalam tradisi balap perahu naga." },
      { src: "/images/highlights/cs3.jpg", caption: "Membelah arus Cisadane, menjaga pusaka leluhur agar terus hidup dan mengalir." },
      { src: "/images/highlights/cs4.jpg", caption: "Ruang perjumpaan gagasan, memberdayakan komunitas loka melalui literasi digital." },
      { src: "/images/highlights/cs5.jpg", caption: "Semarak panggung malam yang mengapresiasi dedikasi dan karya talenta terbaik kota." },
      { src: "/images/highlights/cs6.jpg", caption: "Detik-detik peresmian di atas panggung terapung yang dipenuhi gemerlap cahaya dan kebanggaan." },
      { src: "/images/highlights/cs7.jpg", caption: "Harmoni tari tradisional yang membias indah di bawah sorotan cahaya di atas permukaan air." },
      { src: "/images/highlights/cs8.jpg", caption: "Lautan manusia yang terhanyut dalam euforia musik dan energi kebersamaan di tepian sungai." },
      { src: "/images/highlights/cs9.jpg", caption: "Lompatan energik Barongsai, simbol sejati dari konvergensi multikultural di jantung kota." },
      { src: "/images/highlights/cs10.jpg", caption: "Kehangatan jabat tangan yang merajut erat persaudaraan antara masyarakat dan pemimpin." },
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
  }
};
