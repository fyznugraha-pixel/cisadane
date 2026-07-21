export interface Tenant {
  id: string;
  name: string;
  type: string;
}

const rawTenants: Tenant[] = [
  { id: "1", name: "Dinas Kebudayaan dan Pariwisata", type: "Custom Booth" },
  { id: "2", name: "Dinas Kebudayaan dan Pariwisata", type: "Custom Booth" },

  { id: "5", name: "Dinas Kesehatan", type: "Custom Booth" },
  { id: "6", name: "Dinas Kesehatan", type: "Custom Booth" },
  { id: "7", name: "Dinas Sosial", type: "Sarnavil Putih" },
  { id: "8", name: "Dinas Sosial", type: "Sarnavil Putih" },
  { id: "9", name: "DP3AP2KB", type: "Sarnavil Putih" },
  { id: "10", name: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu", type: "Custom Booth" },
  { id: "11", name: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu", type: "Custom Booth" },
  { id: "12", name: "Diskominfo", type: "Space" },
  { id: "13", name: "Diskominfo", type: "Space" },
  { id: "14", name: "Panda Studio", type: "Sarnavil Putih" },
  { id: "15", name: "Dinas Perumahan, Permukiman, dan Pertanahan", type: "Custom Booth" },
  { id: "16", name: "Dinas Perumahan, Permukiman, dan Pertanahan", type: "Custom Booth" },
  { id: "17", name: "Dinas Ketahanan Pangan", type: "Custom Booth" },
  { id: "18", name: "Dinas Ketahanan Pangan", type: "Custom Booth" },
  { id: "19", name: "Dinas Ketahanan Pangan", type: "Custom Booth" },
  { id: "20", name: "Bikers Brotherhood 1% MC", type: "Sarnavil Putih" },
  { id: "21", name: "Badan Pendapatan Daerah", type: "Custom Booth" },
  { id: "22", name: "Badan Pendapatan Daerah", type: "Custom Booth" },
  { id: "23", name: "Dinas Pendidikan", type: "Sarnavil Putih" },
  { id: "24", name: "Dinas Pendidikan", type: "Sarnavil Putih" },
  { id: "25", name: "Badan Pengelolaan Keuangan Daerah", type: "Custom Booth" },
  { id: "26", name: "Badan Pengelolaan Keuangan Daerah", type: "Custom Booth" },
  { id: "27", name: "Dinas Lingkungan Hidup", type: "Custom Booth" },
  { id: "28", name: "Dinas Lingkungan Hidup", type: "Custom Booth" },
  { id: "29", name: "WAHU Waste Hubs", type: "Sarnavil Putih" },
  { id: "30", name: "Balai Pelestarian Kebudayaan Banten", type: "Sarnavil Putih" },
  { id: "31", name: "Balai Pelestarian Kebudayaan Banten", type: "Sarnavil Putih" },
  { id: "32", name: "BAZNAS Kota Tangerang", type: "Custom Booth" },
  { id: "33", name: "ZCoffee Baznas Kota Tangerang", type: "Custom Booth" },
  { id: "34", name: "Badan Penanggulangan Bencana Daerah", type: "Custom Booth" },
  { id: "35", name: "Badan Penanggulangan Bencana Daerah", type: "Custom Booth" },
  { id: "36", name: "Dinas Perpustakaan dan Arsip Daerah", type: "Custom Booth" },
  { id: "37", name: "Dinas Perpustakaan dan Arsip Daerah", type: "Custom Booth" },
  { id: "38", name: "Asosiasi Camat", type: "Custom Booth" },
  { id: "39", name: "Asosiasi Camat", type: "Custom Booth" },
  { id: "40", name: "Asosiasi Camat", type: "Custom Booth" },
  { id: "41", name: "Dinas Pemuda dan Olahraga", type: "Custom Booth" },
  { id: "42", name: "Dinas Pemuda dan Olahraga", type: "Custom Booth" },
  { id: "43", name: "Dinas Pemuda dan Olahraga", type: "Custom Booth" },
  { id: "44", name: "Dinas Pemuda dan Olahraga", type: "Custom Booth" },
  { id: "45", name: "Komunitas Semanggi", type: "Sarnavil Putih" },
  { id: "46", name: "Dinas Tenaga Kerja", type: "Custom Booth" },
  { id: "47", name: "Dinas Tenaga Kerja", type: "Custom Booth" },
  { id: "48", name: "Dinas Kependudukan dan Pencatatan Sipil", type: "Custom Booth" },
  { id: "49", name: "Dinas Kependudukan dan Pencatatan Sipil", type: "Custom Booth" },
  { id: "51", name: "Dinas Perhubungan", type: "Custom Booth" },
  { id: "52", name: "Dinas Perhubungan", type: "Custom Booth" },
  { id: "53", name: "Dinas Perhubungan", type: "Custom Booth" },
  { id: "54", name: "Dinas Perhubungan", type: "Custom Booth" },
  { id: "55", name: "Yayasan Difabel Mandiri Indonesia", type: "Sarnavil Putih" },
  { id: "65", name: "Universitas Islam Syekh-Yusuf", type: "Sarnavil Putih" },
  { id: "66", name: "UNIVERSITAS MUHAMMADIYAH TANGGERANG", type: "Sarnavil Putih" },
  { id: "67", name: "Global Institute", type: "Sarnavil Putih" },
  { id: "68", name: "Universitas Yatsi Madani", type: "Sarnavil Putih" },
  { id: "69", name: "Universitas Pramita Indonesia", type: "Sarnavil Putih" },
  { id: "70", name: "Banksasuci", type: "Sarnavil Putih" },
  { id: "71", name: "Mr Manggo Thai", type: "Sarnavil Putih" },
  { id: "72", name: "Mr Manggo Thai", type: "Sarnavil Putih" },
  { id: "73", name: "Mr Manggo Thai", type: "Sarnavil Putih" },
  { id: "74", name: "Teh Jawa", type: "Space" },
  { id: "75", name: "Teh Jawa", type: "Space" },
  { id: "76", name: "Es Balang Malaysia", type: "Sarnavil Putih" },
  { id: "77", name: "Es Balang Malaysia", type: "Sarnavil Putih" },
  { id: "78", name: "Es Balang Malaysia", type: "Sarnavil Putih" },
  { id: "79", name: "Larutan Penyegar Cap Badak", type: "Sarnavil Putih" },
  { id: "80", name: "Larutan Penyegar Cap Badak", type: "Sarnavil Putih" },
  { id: "81", name: "Zee", type: "Space" },
  { id: "82", name: "Hydrococo", type: "Space" },
  { id: "83", name: "Mrs Chelsea", type: "Sarnavil Putih" },
  { id: "84", name: "Mrs Chelsea", type: "Sarnavil Putih" },
  { id: "85", name: "Mrs Chelsea", type: "Sarnavil Putih" },
  { id: "86", name: "Sun Paper Source", type: "Sarnavil Putih" },
  { id: "87", name: "Fortuin", type: "Sarnavil Putih" },
  { id: "88", name: "Acc Danaku", type: "Sarnavil Putih" },
  { id: "89", name: "Yupi", type: "Space" },
  { id: "91", name: "Yamaha", type: "Sarnavil Putih" },
  { id: "92", name: "Bejo", type: "Sarnavil Putih" },
  { id: "93", name: "Extra Josss", type: "Space" },
  { id: "94", name: "BJB", type: "Sarnavil Putih" },
  { id: "95", name: "BJB", type: "Sarnavil Putih" },
  { id: "96", name: "Almaz FriedChicken", type: "Sarnavil Putih" },
  { id: "97", name: "Dinas Indagkop UKM", type: "Custom Booth" },
];

export const tenants: Tenant[] = Array.from(
  rawTenants.reduce((map, item) => {
    if (!map.has(item.name)) {
      map.set(item.name, { ...item });
    } else {
      const existing = map.get(item.name)!;
      existing.id = `${existing.id}, ${item.id}`;
    }
    return map;
  }, new Map<string, Tenant>()).values()
);
