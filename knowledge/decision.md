# Decision Log — Keputusan Teknis

> Catatan setiap keputusan teknis penting. Format: **Keputusan → Alasan → Konsekuensi → Tanggal**. Tambahkan entri baru di bagian atas setiap kali ada keputusan baru. Jangan mengubah entri lama (history harus akurat).

---

## 18. Hero Homepage: Komposisi Editorial + Scrim Edge-less, Tanpa Glass Card

**Tanggal**: 2026-11-09

**Keputusan**:
1. Menghapus `.hero-glass` (frosted card: blur 16px, border, radius 20px, shadow) dari
   `src/lib/components/Hero.svelte`.
2. Mengganti center stack menjadi grid editorial dua kolom: pitch rata kiri (nama `Instrument
   Serif` dua baris — `Dawam` regular, `Amali` italic — lede, satu CTA utama + satu text link)
   dan ledger fakta di kanan (`Latest project`, `Education`) dengan hairline, rata bawah bersama
   CTA. Eyebrow peran di atas nama dihapus — nama jadi satu-satunya pembuka.
3. Menambahkan scrim radial *edge-less* di `.hero::before`: `color-mix(in srgb, var(--bg) 82–88%, transparent)`
   di inti, memudar ke transparan. Tidak ada border, shadow, atau radius — bukan card. Hero dibuat
   full-bleed dengan `.hero-inner` sebagai pembatas lebar; scrim memakai `position: fixed; inset: 0`
   (bukan `-50vw`/`absolute`) supaya tidak menambah `scrollWidth` dan tidak meninggalkan garis
   potong saat hero discroll.
4. Memindahkan animasi masuk dari JS-gated (`class:show` + `onMount`) ke CSS `@keyframes rise`
   dengan `animation-fill-mode: both`, hanya di dalam `@media (prefers-reduced-motion: no-preference)`.
5. Menyeragamkan CTA: primary `View selected work` (48px) + text link `My journey` (44px),
   keduanya dengan `:focus-visible` ring 2px.

**Alasan**:
- Glass card adalah *unearned blur*: panel itu ada hanya untuk keterbacaan di atas shader, dan
  membuat hero terasa seperti template. Center stack juga tidak memberi satu aksi dominan.
- Judul hero memakai Helvetica Neue, satu-satunya tempat yang keluar dari tipografi
  `Instrument Serif` milik situs.
- Lede, badge, dan CTA sebelumnya `opacity: 0` sampai JS mount. Kalau hydration gagal, isi hero
  tidak pernah muncul.
- Scrim tetap diperlukan: shader light mode memiliki pita biru gelap di belakang area teks
  (luminance minimum terukur 0.088) yang membuat kontras teks jatuh ke ~1.7:1 tanpa lapisan.

**Konsekuensi**:
- Kontras terukur (efektif termasuk scrim): lede/ledger 7.2–8.9:1, judul 13.4–16.8:1; dark mode
  11.6–17.1:1. Semua lolos WCAG AA/AAA.
- Shader masih terlihat (scrim semi-transparan 82–88%, memudar ke luar), dan tetap utuh — file
  `src/lib/components/ShaderBackground.svelte` tidak disentuh.
- Hero sekarang memakai `projects[0]` dan `education[0]` dari `src/lib/data.ts` untuk ledger,
  bukan teks hardcoded. Data pendidikan diperbarui: lulus 2026, GPA 3.60 (sebelumnya 3.75).
- Tidak ada overflow horizontal di 320/375/1440/1920/2560px (`scrollWidth` = `clientWidth`);
  CTA 48/44px; focus-visible terverifikasi; `prefers-reduced-motion: reduce` mematikan animasi.
- Footer homepage: teks "Shipped from Bekasi." dihapus, ikon sosial rata tengah, target 44px.
- ScrollIndicator "Next page" diperkecil (pill 77px, ring 46px, label 1.35–1.65rem) dan section
  diturunkan ke 46vh (mobile 42vh).
- Tiga report diagnostik tersimpan di `.commandcode/design/` (smell, checkup, review).

**Trade-offs**: hero tidak lagi identik dengan panel glass di halaman lain (about/projects) yang
masih memakai `--glass-bg`; halaman lain belum diubah karena scope permintaan hanya homepage.

---

## 17. Perbaikan Routing Prerender Static & Clean URLs di Production (Vercel)

**Tanggal**: 2026-11-03

**Keputusan**:
1. Menambahkan `export const trailingSlash = 'always'` pada root `src/routes/+layout.ts`. Ini menginstruksikan `@sveltejs/adapter-static` untuk meng-generate struktur direktori dengan `index.html` (misal `public/projects/wise/index.html` dan `public/projects/index.html`), bukan file flat `projects.html` dan `projects/wise.html`.
2. Menambahkan `"cleanUrls": true` dan `"trailingSlash": true` pada `vercel.json`.
3. Memperbarui link navigasi internal ke format trailing slash (`/projects/{slug}/`, `/projects/`) di `ProjectModal.svelte`, `WorkCard.svelte`, dan `projects/[slug]/+page.svelte`.

**Alasan**:
Sebelumnya saat mengklik 'Read full case study' atau mengakses URL `/projects/[slug]` secara langsung di production, Vercel gagal me-load halaman (404 Not Found). Hal ini disebabkan oleh:
- Vercel (static hosting `"framework": null`) mencari file `projects/wise` tanpa ekstensi `.html` yang secara fisik tidak ada.
- Adanya file flat `public/projects.html` yang bentrok dengan folder `public/projects/` di filesystem static server.

**Konsekuensi**:
- Seluruh rute prerender statis (termasuk semua sub-halaman detail case study `/projects/[slug]/`) dapat di-load 100% lancar di production, baik via navigasi SPA, klik modal, maupun reload/direct link URL.

---

## 16. Peningkatan Kontras Warna Global & Keterbacaan Elemen UI

**Tanggal**: 2026-11-01

**Keputusan**:
1. Merombak token warna teks global di `src/app.css`:
   - Light mode: `--text` diubah ke `#0f172a` (Slate-900) dan `--text-muted` ke `#334155` (Slate-700).
   - Dark mode: `--text` ke `#f8fafc` (Slate-50) dan `--text-muted` ke `#cbd5e1` (Slate-300 yang terang & kontras tinggi).
2. Memperkuat opasitas frosted glass:
   - `--nav-bg-scrolled` dan `--glass-bg` dinaikkan ke 85% (`rgba(..., 0.85)` / `0.88` di dark mode) dengan `backdrop-filter: blur(16px)`.
3. Memperbarui komponen navigasi dan badge:
   - Link navbar (`.nav-link`) memakai font weight 500 dan warna teks kontras.
   - Kicker/badges (`VISIT SITE`, dll.) dan navigasi pager bawah (`.pager-link`) diubah menjadi kartu glassmorphism solid dengan border dan box-shadow halus agar tidak tenggelam di atas animasi WebGL canvas.
4. Logo Tech Stack Menggunakan Brand Color Asli (Warna-warni):
   - Menambahkan field `color` dan `darkColor` pada registry `src/lib/tech.ts` dengan kode hex resmi masing-masing brand (Svelte orange, React cyan, Tailwind cyan, Laravel red, Drizzle lime, Postgres blue, dll.).
   - `TechStack.svelte` menginjeksi `--brand-color` dan `--brand-color-dark` ke CSS mask sehingga logo tampil dengan warna asli identitas brand-nya.
5. Tuning Dark Mode Shader & Hero Text:
   - Palette `darkColors` di `ShaderBackground.svelte` dituning dari biru-neon terang ke midnight navy yang pekat, dan canvas diberi opasitas 0.85 di dark mode. Ini menghilangkan silau yang sebelumnya menenggelamkan teks putih di dark mode.
   - Text shadow hero title di dark mode diubah ke soft dark glow agar teks putih tajam dan tidak berkabut.

**Alasan**:
Sebelumnya skema warna bernuansa serba biru (blue-on-blue) dengan opasitas glass yang terlalu tipis (35% di navbar, 8% di tag pill). Hal ini membuat teks mudah pudar saat gelombang canvas WebGL melintas di belakangnya, serta teks gambar screenshot di halaman detail bocor menembus navbar saat di-scroll.

**Konsekuensi**:
- Rasio kontras teks melonjak tajam memenuhi standar WCAG AAA.
- Navigasi atas dan pager bawah tetap melayang secara modern namun teksnya 100% terbaca dengan stabil di atas background dinamis apa pun.

---

## 15. Halaman Detail Project per Slug + Registry Tech Stack Berlogo

**Tanggal**: 2026-10-31

**Keputusan**: Field `slug` yang selama ini menganggur dipakai untuk rute `/projects/[slug]` yang
di-prerender. `ProjectModal` TETAP ada sebagai quick peek, tapi `<svelte:head><title>` dipindah dari
modal ke rute. Tech stack dipindah dari string bebas (`Project.tags: string[]`) ke registry
`src/lib/tech.ts` dengan tipe `TechKey`, dirender komponen baru `TechStack.svelte` sebagai chip
logo + label monokrom. Ikon di-vendor ke `static/assets/tech/` (22 file dari simple-icons).
`ProjectCard.svelte` dihapus.

**Alasan**: `caseStudy` adalah konten terkuat portfolio tapi tidak punya URL — hanya hidup di balik
klik modal, jadi tidak bisa dishare ke recruiter dan tidak pernah ter-prerender (blok
`{#if selectedProject}` tidak masuk HTML statis). Sementara `tags` berisi campuran nama teknologi,
nomor versi, dan konsep non-logo (`CI/CD`, `REST API`, `VPS`, `Lighthouse 100`) dengan penulisan
tidak konsisten antar project (`Tailwind v4` vs `Tailwind CSS`, `Next.js` vs `Next.js 14`).

**Konsekuensi**:
- `entries()` di `+page.ts` **wajib**, karena `svelte.config.js` memakai `adapter-static` dengan
  `strict: true` dan `fallback: undefined`. Tanpa itu `bun run build` gagal.
- Output build berupa `public/projects/<slug>.html` (file, bukan folder), mengikuti `trailingSlash`
  default `never`.
- `load()` mengembalikan `{ project, previous, next }` — objek tetangga, bukan indeks.
- **Ikon tidak boleh lewat `<img>`.** SVG-as-image adalah dokumen terpisah yang tidak mewarisi CSS
  halaman, jadi `fill="currentColor"` di dalamnya jatuh ke hitam dan dark mode tidak ikut. Dipakai
  `mask-image: var(--icon)` + `background-color: currentColor` sehingga warna ikon = warna teks chip.
- **`onDestroy` tetap dijalankan saat SSR** (di `#close_render`). Menaruh `window.removeEventListener`
  di sana membuat prerender gagal 500 dengan `ReferenceError: window is not defined`. Cleanup listener
  harus lewat *return value* `onMount`, mengikuti pola `ScrollIndicator`/`ScrollBack`.
- Nomor versi hilang dari chip (`Laravel 13` → `Laravel`); informasinya tetap ada di prosa `caseStudy`.
- `vps`, `xendit`, `restapi` tidak punya logo → `icon: null` → chip teks dengan bentuk identik.
- Logo hanya muncul di halaman detail. Modal tetap text pill, tapi labelnya kini diambil dari
  `techRegistry[tag].label` karena `tags` berisi key, bukan string tampil.
- `.work-name` di `WorkCard` jadi anchor nyata ke `/projects/{slug}` (crawlable + ctrl/cmd-click);
  klik badan card tetap membuka modal, klik panah tetap ke link eksternal. Blok `.work-tags` yang
  mati dihapus — semua judul mengandung em-dash sehingga cabang itu tidak pernah dirender.
- CTA halaman detail: `linkLabel === 'Private'` → teks "Inquire about this project" ke `/contact`.

**Trade-offs**:
- Halaman detail menambah `<meta name="description">` sendiri, sehingga ada dua tag description
  (default dari `app.html` + per-page). Belum dirapikan — itu wilayah fitur SEO per-halaman, bukan
  fitur ini.
- Chip logo dipakai konsisten di halaman detail dan modal quick peek (`ProjectModal`).
  Styling chip ditingkatkan: background frosted glass semi-opaque (`rgba(255,255,255,0.85)` /
  `rgba(30,41,59,0.85)` + backdrop-filter blur), teks kontras tinggi `var(--text)`, border solid,
  dan aksen warna ikon `var(--blue-700)` / `var(--blue-400)` agar selalu terbaca jelas di atas
  background dinamis canvas WebGL.
- 22 file SVG menambah bobot repo (~35 KB total), ditukar dengan nol dependency runtime ke CDN dan
  nol request pihak ketiga.

---

## 13. Urutan Flow: Home → About → Projects → Contact

**Tanggal**: 2026-08-15

**Keputusan**: Urutan halaman diubah jadi `/` → `/about` → `/projects` → `/contact`. About (perjalanan belajar & karier) datang SEBELUM Projects. Menggantikan Decision #12 yang menempatkan Projects lebih dulu.

**Alasan**: Langsung melempar user ke Projects itu ambigu — mereka melihat hasil kerja tanpa tahu latar belakangnya dulu. Referensi heynesh.com menaruh perjalanan (belajar → kerja) lebih dulu supaya ada konteks, baru portfolio sebagai bukti. Ceritanya jadi: "ini siapa saya dan bagaimana saya sampai di sini" → "ini yang sudah saya kerjakan" → "ayo kerja bareng".

**Konsekuensi**:
- `/` ScrollIndicator → `/about` (dulu `/projects`).
- `/about` ScrollIndicator → `/projects`.
- `/projects` footer link → `/contact` (dulu `/about`).
- Tombol "Back" tiap halaman ikut flow mundur: `/projects` → back ke `/about`, `/contact` → back ke `/projects`.
- Urutan link Navbar (About → Projects → Contact) sudah cocok, tidak diubah.

---

## 14. Satu Timeline Kronologis Menyatu, Digambar Saat Scroll

**Tanggal**: 2026-08-15

**Keputusan**: Education dan Experience DIGABUNG jadi satu array `journey` di `src/lib/data.ts`, urut **ascending (lama → baru)**. Dirender oleh komponen baru `JourneyTimeline.svelte` yang garis vertikalnya terisi progresif mengikuti scroll.

**Alasan**: Memisah Education dan Experience jadi dua timeline memutus alur cerita — user harus baca mundur, selesai, lalu mulai lagi dari atas. Referensi heynesh.com pakai satu garis nyambung dari titik awal belajar sampai yang terbaru. Ascending dipilih karena arah baca (atas → bawah) jadi searah dengan arah waktu (dulu → sekarang), sehingga scroll ke bawah terasa seperti maju di garis waktu.

**Konsekuensi**:
- Interface baru `JourneyItem` dengan field `kind: 'education' | 'work'` sebagai pembeda; badge "Education"/"Work" ditampilkan di tiap kartu.
- `experiences` dan `education` yang lama TETAP ADA di `data.ts` — belum ada konsumen lain saat ini, tapi dibiarkan supaya tidak memutus apa pun yang menyusul.
- Garis: elemen `.rail` (track) + `.rail-fill` yang tingginya `calc(var(--drawn) * 100%)`, `--drawn` di-set dari JS.
- Titik acuan pengisian = 55% tinggi viewport. Kartu di atas garis dapat class `.lit` → opacity 0.45 → 1 dan marker menyala.
- Scroll listener `passive: true` + di-throttle `requestAnimationFrame`.
- `prefers-reduced-motion` → semua kartu langsung tampil penuh, tanpa transisi.

**Trade-offs**:
- Perhitungan progres pakai `getBoundingClientRect()` per frame scroll; masih murah untuk ~10 entri, tapi kalau timeline tumbuh besar sebaiknya pindah ke IntersectionObserver.
- Titik acuan 55% masih tebakan — perlu diuji di layar pendek (laptop 768px) vs panjang.

---

## 12. Projects Section Stay di Halaman (No Auto-Navigate)

**Tanggal**: 2026-08-15

**Keputusan**: Setelah selesai scroll melalui horizontal track projects, user **stay di halaman `/projects`** — tidak ada auto-navigate ke About. Sebagai pengganti `ScrollIndicator`, tambah footer dengan link manual "Explore my work history → About Me & Timeline".

**Alasan**: Referensi heynesh.com menunjukkan bahwa setelah user explore semua work cards, mereka tetap stay di Projects page. User perlu waktu untuk melihat each project detail sebelum pindah section. Otomatis-navigasi (seperti mosbyfiles pattern) terlalu aggressive — user yang baru mau lihat projects jadi bingung atau merasa "disuruh" pindah halaman tanpa kesempatan eksplorasi dulu.

**Konsekuensi**:
- Hapus `<ScrollIndicator nextRoute="/about" ... />` dari `/projects`.
- Tambah `.page-footer` section dengan heading dan link manual ke `/about`.
- Link desain: large serif font, arrow icon animasi hover, border-top divider.
- Flow berubah: `/` → `/projects` → *user eksplor* → manual klik "About" → `/about` → `/contact`.
- ScrollIndicator hanya muncul di `/` (scroll untuk Projects) dan `/about` (scroll for Contact).

**Trade-offs**:
- User lebih kontrol, tapi mungkin lupa kalau ada section berikutnya.
- Solusi: visual cue lewat design footer yang elegant + navbar persistent.

---

## 11. Halaman /About dengan Timeline Vertikal & Experience Cards

**Tanggal**: 2026-08-15

**Keputusan**: Buat halaman `/about` dengan struktur vertikal: intro text → timeline pengalaman kerja (baru ke lama) → timeline pendidikan (baru ke lama). Gunakan vertical timeline connector line dengan marker dots, bukan horizontal scroll seperti Projects page.

**Alasan**: Experience dan education sifatnya chronological dan linear — user skans dari yang terbaru dulu ke lama. Vertical timeline lebih mudah dibaca di HP dan desktop tanpa perlu scroll horizontal tambahan. Horizontal scroll cocok untuk "galeri" work cards yang equal weight (Projects), tapi kurang pas untuk narrative story seperti career progression.

**Konsekuensi**:
- `experiences` array dari `src/lib/data.ts` dirender pakai `<ol class="timeline vertical">`.
- `education` array dirender pakai `<dl class="timeline vertical">` dengan `<dt>` sebagai wrapper per item.
- Connector line gradient (`linear-gradient(to bottom, var(--blue-700), var(--border))`) dari atas ke bawah.
- Marker dots: border ring + shadow effect mirip UI design system modern.
- Hover state: card naik `translateY(-3px)` + border color shift ke blue + shadow aceternity.
- Badge "Now" untuk job yang masih aktif (`active: true`).
- Intro text hardcoded di component (tidak ada field baru di `Job` interface) — simple, satu-satunya About me paragraph.

**Trade-offs**:
- Tidak ada skill section atau certifications grid — bisa ditambahkan nanti kalau diperlukan.
- Experience cards hanya menampilkan 4 field: title, org, date, desc. Kalau mau tambah logo atau tech stack badges, perlu extension data interface.

---

## 10. Navigasi Antar Halaman Pakai Overscroll-to-Navigate (Mosby Files Pattern)

**Tanggal**: 2026-08-15

**Keputusan**: `ScrollIndicator.svelte` diubah dari "klik → scrollIntoView + setTimeout goto" menjadi panel next-page yang punya dua jalur navigasi: (1) klik biasa sebagai `<a href>`, (2) overscroll-to-navigate — user yang sudah di dasar halaman dan terus scroll akan mengakumulasi `overscroll` sampai `threshold` (default 420px), lalu auto-navigate.

**Alasan**: Referensi mosbyfiles.com/cases — implementasinya (Nuxt + Pinia) pakai state `isOverscroll`, `overscrollAmount`, `isNavigationLocked`. Pattern ini bikin perpindahan halaman terasa seperti satu scroll berkelanjutan, bukan klik-dan-lompat. Implementasi lama pakai `setTimeout(goto, 600)` yang rapuh (navigasi jalan walau animasi belum selesai / user sudah scroll balik).

**Konsekuensi**:
- Progress ring SVG (`stroke-dasharray` / `stroke-dashoffset`) mengisi seiring overscroll — dipilih ketimbang meniru "folder wipe" mosbyfiles karena lebih ringan dan cocok dengan design system.
- State: `armed` (sudah mentok dasar halaman), `overscroll` (0..threshold), `locked` (guard sekali-navigate), `progress` = `$derived`.
- Decay via `requestAnimationFrame`: kalau user berhenti scroll >160ms, progress meluruh balik ke 0.
- `afterNavigate` mereset semua state — wajib, karena SvelteKit reuse komponen antar rute.
- Root element `<a href>` bukan `<div onclick>` → ctrl/cmd-click buka tab baru, keyboard focus jalan tanpa `tabindex` manual, tidak butuh `svelte-ignore a11y_*`.
- Semua listener `passive: true` (tidak `preventDefault`) supaya scroll native tidak terganggu.
- Prop `icon` dihapus (tidak lagi relevan), diganti prop `kicker` dan `threshold`.
- Chain rute: `/` → `/projects` → `/about` → `/contact`.

**Trade-offs**:
- Listener di `window`, bukan di elemen — kalau nanti ada dua `ScrollIndicator` di satu halaman, keduanya akan ikut menghitung. Saat ini satu per halaman, jadi aman.
- Threshold 420px hasil tebakan; perlu dites di trackpad (delta kecil, sering) vs mouse wheel (delta besar, jarang).

---

## 7. Homepage Jadi Quick Intro (Bukan Full Portfolio)

**Keputusan**: Homepage hanya berisi Hero dengan nama "Dawam Amali" + Flipper (rotating subtitle), subheading singkat, CTA, dan stats counter. Section About/Projects/Experience/Education dipindah ke halaman terpisah.

**Alasan**: Homepage sebelumnya terlalu panjang — scroll terus untuk lihat semua section. Dengan model multi-page, homepage jadi quick summary yang bikin first impression kuat, dan user bisa dive deeper ke halaman spesifik yang mereka mau (via navbar).

**Konsekuensi**:
- Nama "Dawam Amali" (bukan full name "Muhammad Dawam Amali").
- Navbar pakai route link (`/about`, `/projects`, `/contact`), bukan anchor (`#about`).
- Halaman `/about`, `/projects`, `/contact` dibuat sebagai placeholder (siap diisi nanti).
- Section lama (`About.svelte`, `Projects.svelte`, `Experience.svelte`, `Education.svelte`, `Contact.svelte`) tidak lagi tampil di homepage — bisa dihapus nanti atau di-reuse di halaman masing-masing.

**Tanggal**: 2026-08-15

---

## 8. Flipper Component (Rotating Text)

**Keputusan**: Bikin `<Flipper>` component yang rotate otomatis beberapa label (contoh: "Full Stack Developer", "Cloud Engineer", dll).

**Alasan**: Reference Aceternity minimal portfolio punya fitur serupa — bikin homepage lebih hidup dan menyampaikan multiple identity sekaligus. Pakai `AnimatePresence` pattern (Framer Motion) yang di-translate ke Svelte `{#key}` block + custom transition.

**Konsekuensi**:
- File `src/lib/components/Flipper.svelte`.
- Props: `labels: string[]`, `interval?: number` (ms).
- Animasi: keluar ke atas (blur + translateY negative), masuk dari bawah (blur 0 + translateY 0).
- Durasi 450ms masuk, 300ms keluar.

**Tanggal**: 2026-08-15

---

## 9. Projects Page Menggunakan Horizontal Scroll Track dengan Collective Hover (NESH Pattern)

**Tanggal**: 2026-08-15

**Keputusan**: Halaman `/projects` menggunakan horizontal scroll track dengan portrait work cards (480x600px desktop, 320x420px mobile, 280x380px smartphone). Collective hover effect: saat hover satu card, semua card lain redup (opacity 0.4, saturate 0.7), card yang di-hover tetap terang.

**Alasan**: Inspirasi dari heynesh.com portfolio. Pattern ini lebih modern dan engaging dibanding grid layout biasa. Collective hover menciptakan depth dan fokus kuat pada card yang di-hover. Horizontal scroll lebih compact dan showcase-oriented.

**Konsekuensi**:
- Card component baru: `WorkCard.svelte` dengan portrait orientation (landscape image crop)
- Dark gradient overlay (opacity 0.9 ke transparent dari bawah)
- Title + tags di bottom, arrow button dengan color-shift hover
- Horizontal track dengan `overflow-x: auto` dan `scroll-snap-type: x mandatory`
- Collective hover CSS di page-level menggunakan `:global()` selectors
- Hide scrollbar untuk cleaner look
- Responsive sizes: 320x420px tablet, 280x380px smartphone
- Click card → buka modal dengan detail project

**Trade-offs**:
- Grid di `+page.svelte` diganti jadi flex horizontal scroll
- Hero card (featured project) dihapus → semua project equal weight di track
- User navigate via scroll horizontal atau click card untuk modal

---

## 1. Full Rewrite ke SvelteKit (Bukan Incremental from web-porto)

**Keputusan**: Bikin project baru `web-porto-v2` dengan SvelteKit 2 + Svelte 5 runes + Bun, rewrite dari `web-porto` (HTML/CSS/JS plain).

**Alasan**: Struktur lama mulai sulit di-maintain — navbar logic complex (capsule scroll + mobile hamburger), CSS mulai banyak `!important` override, state management manual (scroll detection, mobile detect, menu toggle), dan animasi makin kompleks. SvelteKit kasih: scoped style per component, reactive state ($state, $derived, $effect), built-in transitions, dan static adapter untuk performance.

**Konsekuensi**:
- Dua repo selama periode transisi (`web-porto` archived, `web-porto-v2` active).
- Deploy ke Vercel (static hosting) pakai `@sveltejs/adapter-static`.
- Bun dipakai sebagai package manager (lebih cepat dari npm).
- TypeScript strict mode aktif.
- `bun run check` wajib run sebelum push (lint + type check).

**Tanggal**: 2026-08-15

---

## 2. Navbar Menggunakan Inline Style (Aceternity Pattern)

**Keputusan**: Navbar desktop pakai inline style (`$derived` dari `scrollProgress`) buat animasi scroll, bukan CSS class toggle.

**Alasan**: Class toggle (`.scrolled`) cuma switch antara 2 state boolean — transisinya snap/jerky. Inline style dengan `scrollProgress` (0.0–1.0) bikin transisi gradual. Referensi: Aceternity minimal portfolio template.

**Konsekuensi**:
- Nilai `scrollProgress` dihitung dari `scrollY / 100`.
- Border-radius, width, max-width, transform berubah smooth setiap frame.
- Sulit di-override dari CSS — perubahan harus lewat JavaScript.

**Tanggal**: 2026-08-15

---

## 3. Dua Navbar Components (Desktop/Mobile Terpisah)

**Keputusan**: Bikin dua layout navbar (desktop + mobile) yang di-toggle via media query, bukan satu komponen yang handle semua case.

**Alasan**: Satu komponen untuk desktop + mobile bikin logic kompleks (banyak `{#if}` bercabang, conditional styling). Pisah jadi dua lebih simpel, masing-masing fokus satu case.

**Konsekuensi**:
- `.desktop-navbar-wrapper` hidden di mobile (`display: none`, show di `@media min-width: 768px`)
- `.mobile-navbar` hanya tampil di mobile
- Fullscreen overlay mobile di-render terpisah ({#if menuOpen})

**Tanggal**: 2026-08-15

---

## 4. Mobile Menu Fullscreen Overlay (Aceternity Pattern)

**Keputusan**: Mobile menu pakai fullscreen overlay (fixed inset-0), bukan slide-down panel di bawah navbar.

**Alasan**: Referensi Aceternity template pakai fullscreen overlay. Lebih clean, fokus user ke navigation, ada space lebih buat konten (font bisa besar).

**Konsekuensi**:
- Button close (X) di kanan atas overlay
- Links center vertical, font 1.5rem
- Fade transition (Svelte built-in `transition:fade`)
- Body scroll locked saat menu buka (overlay block)

**Tanggal**: 2026-08-15

---

## 5. Dark Mode System (CSS Variables + localStorage)

**Keputusan**: Dark mode pakai CSS variables (deklarasikan ulang di `html.dark`) + localStorage persist.

**Alasan**: Simple, no library needed, works with Svelte scoped style. localStorage bikin preferensi user persist antar session.

**Konsekuensi**:
- Inisialisasi di `<script>` blocking di `src/app.html` (cegah FOUC).
- Reactive via `$state` theme store (`src/lib/theme.svelte.ts`).
- WebGL shader palette auto-swap saat dark mode toggle.

**Tanggal**: 2026-08-15

---

## 6. Static Adapter (No Server Runtime)

**Keputusan**: Pakai `@sveltejs/adapter-static`, bukan `@sveltejs/adapter-node` atau `@sveltejs/adapter-vercel`.

**Alasan**: Website portfolio ini fully static (no backend, no forms yang butuh server process). Static adapter bikin output HTML/CSS/JS murni → deploy ke CDN manapun (Vercel, Netlify, VPS, GitHub Pages) tanpa server process.

**Konsekuensi**:
- `export const prerender = true` di `+layout.ts`.
- `handleMissingId: 'warn'` karena ada link `#section` ke elemen yang belum di-render SSR (fix setelah hydration).
- No server routes, no API endpoints.

**Tanggal**: 2026-08-15
