# Festival Cisadane — Card Component Override Spec (v2, Production-Grade)

> **STATUS: BINDING SPEC.** Agent WAJIB mengikuti file ini secara literal. Jika bertentangan dengan default style guide `ui-ux-pro-max` atau asumsi internal agent, file ini yang menang. Ambigu → STOP dan tanya user. DILARANG menebak, DILARANG "menyempurnakan sendiri".

---

## 0. Cara Membaca File Ini

1. Section 1–2 = konteks & filosofi (alasan di balik keputusan, bukan cuma nilai).
2. Section 3 = design tokens (satuan ukur resmi — spacing, radius, shadow, motion timing).
3. Section 4 = non-negotiable rules.
4. Section 5 = interaction & motion spec (hover, scroll reveal, focus, reduced-motion).
5. Section 6 = kode produksi penuh per treatment (A–D) — siap pakai, bukan referensi.
6. Section 7 = mapping wajib section → treatment.
7. Section 8 = content constraint (batas karakter, rasio gambar) — mencegah layout pecah.
8. Section 9 = accessibility checklist.
9. Section 10 = anti-pattern.
10. Section 11 = pre-delivery checklist final.

---

## 1. Konteks Proyek

Festival Cisadane — festival budaya tahunan Kota Tangerang di tepian Sungai Cisadane, akulturasi Tionghoa-Betawi. Concept pillar: **wave/flow/aliran sungai** sebagai bahasa desain (sudah final, jangan dipertanyakan ulang). Masalah yang diperbaiki: card component memakai bahasa visual generic yang tidak nyambung dengan wave language di section wrapper.

## 2. Filosofi Desain Card

Card TIDAK BOLEH jadi bentuk wave/blob penuh (merusak grid alignment, scan pattern, dan jadi noise kalau diulang di 5+ section). Solusi: card tetap grid-friendly, ambil 1–2 elemen bahasa visual wave secara konsisten dan bermakna posisi — bukan dekorasi acak.

---

## 3. Design Tokens (WAJIB, satuan resmi — jangan pakai angka bebas di luar ini)

### 3.1 Spacing Scale
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```
Gap antar card dalam grid: `--space-md` (mobile) → `--space-lg` (desktop). Padding internal card: `--space-md` minimum, `--space-lg` untuk card dengan konten lebih panjang.

### 3.2 Radius Scale
```css
--radius-sm: 8px;   /* elemen kecil: badge, tag */
--radius-md: 12px;  /* card standar (Treatment B, C) */
--radius-signature: 32px; /* radius besar khusus Treatment A, HANYA pada 1 sudut */
--radius-full: 9999px; /* pill/circle: Treatment D node */
```

### 3.3 Elevation ("Water Depth" Shadow System)
Shadow bukan generic drop-shadow hitam — pakai tint biru gelap tipis untuk kesan "kedalaman air", konsisten dengan tema sungai.
```css
--shadow-shallow: 0 1px 3px rgba(4, 44, 83, 0.08);   /* default card at-rest */
--shadow-mid:     0 6px 16px rgba(4, 44, 83, 0.12);  /* hover state */
--shadow-deep:    0 16px 32px rgba(4, 44, 83, 0.16); /* featured/highlighted card */
```
DILARANG pakai `rgba(0,0,0,...)` polos untuk shadow card — harus varian dari biru brand (#042C53 base) supaya shadow terasa "milik" palet, bukan generic.

### 3.4 Motion Timing
```css
--ease-flow: cubic-bezier(0.33, 1, 0.68, 1); /* easing menyerupai gerak air, dipakai di SEMUA transisi card */
--dur-fast: 150ms;
--dur-base: 250ms;
--dur-slow: 400ms;
--stagger-delay: 80ms; /* jeda antar card saat scroll-reveal, lihat Section 5.2 */
```

---

## 4. Non-Negotiable Rules

| # | Rule |
|---|------|
| R1 | Maksimal 2 treatment pattern per halaman (exception: A+C di section Activities, lihat Section 7). |
| R2 | Warna wajib dari 7-color palette resmi (Section 4.1). Tidak boleh menambah warna baru meski untuk gradient/shadow tint — pakai --shadow-* token di atas. |
| R3 | Red (#EC3A24) dan Blue (#2654A4) co-dominant secara distribusi visual. |
| R4 | Font wajib Fraunces (heading) + Work Sans (body). DILARANG: Inter, Poppins, Plus Jakarta Sans. |
| R5 | Card tetap grid-aligned, tidak boleh full irregular/blob shape. |
| R6 | Setiap curve/wave element harus konsisten arah (representasi "arah aliran"), bukan random per instance. |
| R7 | Asset kosong/placeholder DILARANG ship — gunakan fallback state terdesain (lihat 8.3). |
| R8 | Semua transisi WAJIB pakai `--ease-flow`, bukan `ease` atau `linear` default browser. |
| R9 | Kontras teks minimum 4.5:1 (lihat Section 9) — tidak bisa ditawar demi estetika. |
| R10 | `prefers-reduced-motion: reduce` WAJIB di-handle — motion/stagger reveal harus punya fallback static. |

### 4.1 Palet Warna Resmi
| Warna | Hex | Role |
|-------|-----|------|
| Merah utama | `#EC3A24` | Co-dominant, CTA, connector line, ripple divider |
| Biru utama | `#2654A4` | Co-dominant, background section, card base |
| Kuning | `#FDB715` | Aksen tersier, badge |
| Oranye | `#F7951E` | Aksen tersier |
| Biru muda 1 | `#0092B7` | Variasi tone |
| Biru muda 2 | `#38BBCA` | Variasi tone |
| Putih | `#FFFFFF` | Surface netral |

### 4.2 Typography Scale
```css
--font-heading: 'Fraunces', serif;
--font-body: 'Work Sans', sans-serif;

--text-card-title: 500 18px/1.3 var(--font-heading);
--text-card-body: 400 14px/1.6 var(--font-body);
--text-card-meta: 500 12px/1.4 var(--font-body); /* label kecil: "LINEUP BY", tanggal, dsb */
```
DILARANG fallback ke font terlarang di manapun termasuk font-stack cadangan.

---

## 5. Interaction & Motion Spec

### 5.1 Hover State (desktop only, disable di touch device)
```css
.card {
  transition: transform var(--dur-base) var(--ease-flow),
              box-shadow var(--dur-base) var(--ease-flow);
  box-shadow: var(--shadow-shallow);
  cursor: pointer;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-mid);
}
.card:focus-visible {
  outline: 2px solid #2654A4;
  outline-offset: 3px;
}
```
Translate max `-4px` — DILARANG scale transform yang menggeser layout tetangganya (lihat anti-pattern skill default: hover shift).

### 5.2 Scroll Reveal — "Flowing In" Stagger
Card muncul dengan jeda berurutan (seperti riak menjalar), bukan muncul serentak.
```css
.card {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--dur-slow) var(--ease-flow),
              transform var(--dur-slow) var(--ease-flow);
}
.card.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```
```js
// Terapkan delay bertahap via IntersectionObserver, kelipatan --stagger-delay (80ms) per index card
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
```
**Wajib fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  .card { opacity: 1; transform: none; transition: none; }
}
```

### 5.3 Image Load State
Gunakan skeleton shimmer bertema biru muda (`#38BBCA` at 15% opacity), BUKAN abu-abu generic, selama gambar dimuat. Ini juga fallback untuk R7 (asset kosong).
```css
.card-image-skeleton {
  background: linear-gradient(90deg, rgba(56,187,202,0.10) 25%, rgba(56,187,202,0.20) 37%, rgba(56,187,202,0.10) 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
@keyframes shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
```

---

## 6. Kode Produksi Penuh per Treatment

### 6.1 Treatment A — Asymmetric Single-Corner Curve
Dipakai: grid uniform 3–6 card, konten singkat.
```html
<div class="card card-a">
  <div class="card-a__image-wrap">
    <img src="{src}" alt="{deskriptif, bukan generic 'image'}" loading="lazy" />
  </div>
  <div class="card-a__body">
    <h3 class="card-a__title">{title, maks 40 karakter}</h3>
    <p class="card-a__desc">{deskripsi, maks 90 karakter}</p>
  </div>
</div>
```
```css
.card-a {
  border-radius: var(--radius-signature) var(--radius-md) var(--radius-md) var(--radius-md);
  overflow: hidden;
  background: #FFFFFF;
}
.card-a__image-wrap { aspect-ratio: 4 / 3; overflow: hidden; }
.card-a__image-wrap img { width: 100%; height: 100%; object-fit: cover; }
.card-a__body { padding: var(--space-md); }
.card-a__title { font: var(--text-card-title); color: #042C53; margin: 0 0 var(--space-xs); }
.card-a__desc { font: var(--text-card-body); color: #5F5E5A; margin: 0; }
```

### 6.2 Treatment B — Ripple Divider Line
Dipakai: grid padat (5+ item), bentuk card tidak boleh berubah.
```html
<div class="card card-b">
  <div class="card-b__image-wrap"><img src="{src}" alt="{nama performer/item}" loading="lazy" /></div>
  <svg class="ripple-divider" viewBox="0 0 300 16" aria-hidden="true">
    <path d="M0,8 Q15,0 30,8 T60,8 T90,8 T120,8 T150,8 T180,8 T210,8 T240,8 T270,8 T300,8"
          fill="none" stroke="#EC3A24" stroke-width="2"/>
  </svg>
  <div class="card-b__body"><p class="card-b__meta">LINEUP BY</p><h3 class="card-b__title">{nama}</h3></div>
</div>
```
```css
.card-b { border-radius: var(--radius-md); overflow: hidden; background: #FFFFFF; }
.card-b__image-wrap { aspect-ratio: 1 / 1; }
.card-b__image-wrap img { width: 100%; height: 100%; object-fit: cover; }
.ripple-divider { display: block; width: 100%; height: 12px; }
.card-b__body { padding: var(--space-sm) var(--space-md) var(--space-md); }
.card-b__meta { font: var(--text-card-meta); color: #A32D2D; margin: 0 0 4px; }
.card-b__title { font: var(--text-card-title); color: #042C53; margin: 0; }
```

### 6.3 Treatment C — Staggered Grid
Dipakai: grid 3 kolom visual-heavy, dikombinasikan dengan Treatment A pada card individu (satu-satunya exception R1).
```css
.stagger-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}
.stagger-grid > :nth-child(odd)  { margin-top: 0; }
.stagger-grid > :nth-child(even) { margin-top: var(--space-lg); }
@media (max-width: 768px) {
  .stagger-grid { grid-template-columns: 1fr; }
  .stagger-grid > * { margin-top: 0 !important; } /* stagger dimatikan di mobile, 1 kolom rapi */
}
```

### 6.4 Treatment D — Flowing Connector Line
Dipakai: konten kronologis/naratif (History section).
```html
<div class="flow-timeline">
  <svg class="flow-connector" viewBox="0 0 300 20" aria-hidden="true">
    <path d="M20,10 Q95,-4 150,10 T280,10" fill="none" stroke="#EC3A24"
          stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>
  </svg>
  <div class="flow-node"><span class="node-circle"></span><p class="node-label">{title}</p></div>
</div>
```
```css
.node-circle { display: block; width: 44px; height: 44px; border-radius: var(--radius-full); background: #2654A4; margin: 0 auto var(--space-xs); }
.node-label { font: var(--text-card-meta); text-align: center; color: #042C53; }
@media (max-width: 768px) {
  .flow-timeline { flex-direction: column; } /* connector line jadi vertikal, bukan hilang */
  .flow-connector { transform: rotate(90deg); width: 20px; height: 60px; margin: 0 auto; }
}
```

---

## 7. Mapping Wajib — Section ke Treatment

| Section | Treatment wajib | Alasan |
|---|---|---|
| Menyelami Sejarah Cisadane | **D** | Naratif/kronologis, sesuai "Satu Sungai, Ribuan Kisah". |
| Cahaya yang Menari di Atas Permukaan Air | **C + A** (exception R1) | Grid besar butuh scannability + organic rhythm. |
| Gema Melodi dari Tepian (lineup) | **B** | Grid padat, red accent menambal kekurangan red-presence. |
| Smart & Green Event Innovations | **A saja**, tanpa divider/connector tambahan | Section teknis/informatif — overuse wave mengaburkan pesan data-driven. |
| Objektif Festival (4 icon card) | Tidak pakai treatment wave — flat rounded-12px | Institusional/formal, motif wave di sini mengurangi kesan serius. |

---

## 8. Content Constraint (mencegah layout pecah)

| Elemen | Batas |
|---|---|
| Card title | Maks 40 karakter (2 baris di `--text-card-title`) — truncate dengan `text-overflow: ellipsis` jika lebih, JANGAN biarkan wrap ke 3+ baris. |
| Card description | Maks 90 karakter (3 baris di `--text-card-body`). |
| Image aspect ratio | Treatment A & D: 4:3. Treatment B: 1:1. Konsisten per treatment, jangan campur rasio dalam satu grid. |
| Alt text | WAJIB deskriptif spesifik (misal "Perahu naga peserta lomba di Sungai Cisadane"), DILARANG generic ("image", "photo", "gambar 1"). |

### 8.1 Fallback State untuk Asset Kosong (wajib, bukan opsional)
Jika data foto/nama performer belum tersedia saat build time:
```html
<div class="card-b card-b--pending">
  <div class="card-b__image-wrap card-image-skeleton"></div>
  <div class="card-b__body">
    <p class="card-b__meta">LINEUP BY</p>
    <h3 class="card-b__title" style="color:#888780">Segera diumumkan</h3>
  </div>
</div>
```
DILARANG ship kotak abu-abu polos kosong tanpa label/keterangan apapun.

---

## 9. Accessibility Checklist

- [ ] Kontras teks vs background minimum 4.5:1 (cek khusus: teks putih di atas Blue muda #38BBCA — sering gagal, perlu overlay gelap atau ganti warna teks).
- [ ] Semua `<img>` punya `alt` deskriptif (lihat 8, bukan generic).
- [ ] SVG dekoratif (ripple divider, connector) diberi `aria-hidden="true"`.
- [ ] Focus state (`:focus-visible`) terlihat jelas untuk keyboard navigation — jangan hilangkan outline tanpa pengganti.
- [ ] `prefers-reduced-motion: reduce` dihormati di seluruh animasi card (scroll reveal, hover transform).
- [ ] Card yang clickable (`<a>`/`<button>` wrapper) punya target tap minimum 44x44px di mobile.

---

## 10. Anti-Pattern — DILARANG KERAS

- ❌ Card berbentuk blob/wave penuh (semua sudut melengkung tidak beraturan).
- ❌ Lebih dari 2 treatment berbeda dalam satu halaman (kecuali A+C di Activities).
- ❌ Font selain Fraunces/Work Sans dengan alasan apapun.
- ❌ Warna baru di luar 7-color palette, termasuk untuk gradient/shadow tint (pakai token Section 3.3).
- ❌ Placeholder kosong tanpa fallback state terdesain.
- ❌ Mengubah/menghapus wave divider di section wrapper (di luar scope file ini).
- ❌ Menyamakan treatment section institusional (Objektif Festival) dengan section naratif (Sejarah).
- ❌ Shadow hitam generic (`rgba(0,0,0,...)`) — harus varian biru brand.
- ❌ Transisi tanpa `--ease-flow` (pakai `ease`/`linear` default browser).
- ❌ Hover transform yang menggeser layout tetangga (scale yang mendorong elemen lain).
- ❌ Mengabaikan `prefers-reduced-motion`.

---

## 11. Pre-Delivery Checklist Final

- [ ] Setiap card memakai treatment sesuai mapping Section 7 — tidak ada yang keluar dari assignment.
- [ ] Semua warna 100% dari 7-color palette resmi, dicek hex-by-hex.
- [ ] Red (#EC3A24) proporsional, bukan sekadar aksen kecil.
- [ ] Font heading = Fraunces, body = Work Sans, tanpa fallback ke font terlarang.
- [ ] Tidak ada card blob shape penuh.
- [ ] Maksimal 2 treatment per halaman (exception A+C tercatat).
- [ ] Tidak ada asset kosong tanpa fallback state (Section 8.1).
- [ ] Semua transisi pakai `--ease-flow`.
- [ ] Scroll reveal stagger berjalan, dengan fallback `prefers-reduced-motion`.
- [ ] Kontras teks lolos 4.5:1 di semua kombinasi warna yang dipakai.
- [ ] Semua `alt` text deskriptif spesifik, bukan generic.
- [ ] Responsive check lolos di 375px, 768px, 1024px, 1440px — khusus Treatment C (stagger mati di mobile) dan Treatment D (connector rotate vertikal di mobile).
- [ ] Jika ada bagian file ini yang tidak bisa diimplementasikan persis (keterbatasan teknis), agent WAJIB lapor ke user dulu — DILARANG diam-diam mengganti dengan solusi sendiri.