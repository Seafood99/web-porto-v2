> **Status:** DONE — diimplementasi 2026-10-31 · **Dibuat:** 2026-10-31 oleh `/feature`

# Halaman Detail Project `/projects/[slug]`

## Masalah

Field `slug` sudah ada di interface `Project` (`src/lib/data.ts:2`) dan terisi di kedelapan project
(`tsa`, `bcs`, `sia-asrama`, `css`, `origin`, `nutrify`, `wise`, `kpop`), tapi tidak pernah dipakai
untuk routing. Satu-satunya tempat `caseStudy` tampil adalah `ProjectModal.svelte`, yang hanya muncul
lewat state `selectedProject` di `src/routes/projects/+page.svelte`.

Akibatnya konten terkuat portfolio ini tidak punya URL. Recruiter tidak bisa dikirimi link langsung ke
satu project, hasil share selalu jatuh di `/projects` (user harus scroll track horizontal lalu mencari
card yang benar), dan crawler tidak pernah melihat halaman case study karena blok `{#if selectedProject}`
tidak ikut ter-prerender ke HTML statis. Modal juga menyetel `<svelte:head><title>`, jadi title tab
berubah tanpa URL berubah — back button dan bookmark jadi tidak konsisten.

## Pendekatan

Buat rute dinamis `src/routes/projects/[slug]/` yang di-prerender dari array `projects`. Modal TETAP
ada sebagai quick peek (pola NESH di `decision.md` #9 tidak diubah), tapi perannya digeser: modal jadi
pintu masuk, halaman detail jadi tujuan yang bisa dishare. Supaya tidak ada dua sumber title,
`<svelte:head>` dipindah dari modal ke rute.

**Wajib diperhatikan:** `svelte.config.js` memakai `adapter-static` dengan `strict: true` dan
`fallback: undefined`. Rute dinamis tanpa `entries()` akan membuat `bun run build` GAGAL.

Pola existing yang diikuti:
- Struktur halaman dari `src/routes/contact/+page.svelte` — wrapper `.page` dengan
  `position: relative; z-index: 1`, link `.back` di atas, lalu `.kicker` + `.heading` (Instrument
  Serif) + `.sub`.
- Markup & CSS galeri dari `ProjectModal.svelte` (`.modal-gallery`, `.nav-btn`, `.dots`, `.counter`)
  — dipindah, bukan ditulis ulang dari nol.
- Token warna dari `src/app.css`: `--bg-card`, `--border-light`, `--tag-bg`, `--blue-700`,
  `--blue-400`, `--shadow-aceternity`. Override dark mode lewat `:global(html.dark)`.
- Navigasi mundur pakai `ScrollBack.svelte` seperti `/about`, `/projects`, `/contact`.

## File yang dibuat / diubah

### 1. `src/routes/projects/[slug]/+page.ts` (BARU)
- `export const prerender = true` (mengikuti `src/routes/+layout.ts`).
- `export function entries()` → `projects.map((p) => ({ slug: p.slug }))` dari `$lib/data`.
- `export function load({ params })` → cari project dengan `params.slug`; kalau tidak ketemu panggil
  `error(404, ...)`. Return `{ project, previous, next }` — `previous`/`next` berisi objek project
  tetangga (atau `null`) dan langsung dipakai tombol pager, jadi template tidak perlu menghitung indeks.

### 2. `src/routes/projects/[slug]/+page.svelte` (BARU)
- `<svelte:head>`: `<title>{project.title} — Dawam Amali</title>` (format title dipindah dari
  `ProjectModal.svelte`) dan `<meta name="description" content={project.desc}>`.
- `<ScrollBack prevRoute="/projects" prevLabel="Projects" />` di paling atas.
- Header: link `.back` → `/projects`, kicker = `project.linkLabel`, `.heading` = judul project,
  `.sub` = `project.desc`.
- Galeri: state `imageIndex` + `nextImage` / `prevImage` / `goToImage`, listener keyboard
  `ArrowLeft` / `ArrowRight`, fallback `placehold.co/1200x720` bila `project.images` kosong (berlaku
  untuk `kpop` yang memang `images: []`).
- **Jebakan SSR:** listener keyboard wajib dilepas lewat *return value* `onMount`, BUKAN lewat
  `onDestroy`. Di Svelte 5 callback `onDestroy` tetap dieksekusi saat render server (di `#close_render`),
  sehingga `window.removeEventListener` melempar `ReferenceError: window is not defined` dan seluruh
  prerender gagal 500. Pola `onMount(() => { add...; return () => remove...; })` sudah dipakai
  `ScrollIndicator.svelte`, `ScrollBack.svelte`, dan `HorizontalTimeline.svelte`.
- `imageIndex` di-reset lewat `$effect` yang membaca `project.slug`, karena SvelteKit me-reuse
  komponen ini saat berpindah antar `/projects/[slug]`.
- Body: `<TechStack tags={project.tags} />` (lihat `tech-stack-logos.md`), lalu `caseStudy` dengan
  `white-space: pre-line`.
- CTA: bila `project.linkLabel === 'Private'` teksnya "Inquire about this project" (href `/contact`);
  selain itu pakai `linkLabel` apa adanya. `target="_blank"` + `rel="noopener noreferrer"` hanya bila
  `isExternal()`, sama seperti logika di modal.
- Footer navigasi: "← Previous" / "Next →" antar project berurutan sesuai array `projects`, plus link
  "Back to all projects".
- Tidak merender `<Footer />` — `Footer` hanya dipakai di `/`, halaman `/projects` juga tidak.

### 3. `src/lib/components/WorkCard.svelte`
- `<h3 class="work-name">` dibungkus jadi anchor nyata `href={'/projects/' + project.slug}` supaya
  crawler dan ctrl/cmd-click mendapat URL asli. Anchor ini BUKAN pembungkus seluruh card — akan
  menghasilkan nested `<a>` dengan `.work-arrow-link` yang sudah ada. Class `.work-name` dipindah ke
  anchor agar style (Helvetica 1.35rem, warna `#fff`) tidak berubah.
- `handleClick` sudah mengabaikan klik pada `a` (`target.closest('a')`), jadi klik nama project =
  navigasi, klik badan card = tetap membuka modal, klik panah = tetap ke link eksternal.
- Sekaligus **hapus blok `.work-tags` yang mati** beserta CSS `.work-tag`-nya. Semua judul project
  mengandung em-dash, sehingga `projectSubtitle` selalu terisi dan `{#if projectSubtitle}` selalu
  menang — cabang tags itu tidak pernah dirender sekali pun.

### 4. `src/lib/components/ProjectModal.svelte`
- Hapus blok `<svelte:head>` — title sekarang milik rute detail.
- Tambah link "Read full case study →" di `.modal-actions` sebelum tombol `Close`, menuju
  `/projects/{project.slug}`. Link ini memanggil `handleClose()` lebih dulu supaya animasi tutup jalan
  dan `document.body.style.overflow` dilepas oleh `onDestroy` sebelum navigasi terjadi.

### 5. `knowledge/features/README.md` (BARU)
- Index dokumen fitur.

## Verifikasi

1. Jalankan dev server:
   ```fish
   bun run dev
   ```
2. Buka `http://localhost:5173/projects/bcs` → muncul halaman detail BCS X PSS Sleman: galeri 3
   gambar (`bcs-1..3.webp`), case study lengkap, CTA "Visit Site" ke `https://bcsxpss.com/`. Title
   tab = "BCS X PSS Sleman — Fan Platform — Dawam Amali".
3. Buka `http://localhost:5173/projects/kpop` → project tanpa gambar; pastikan fallback `placehold.co`
   tampil dan layout tidak rusak.
4. Buka `http://localhost:5173/projects/wise` → CTA berbunyi "Inquire about this project" dan menuju
   `/contact` (bukan "Private").
5. Buka `http://localhost:5173/projects/tidak-ada` → harus 404, bukan halaman kosong.
6. Buka `http://localhost:5173/projects`, lalu uji empat jalur klik:
   - klik **nama project** → URL berubah ke `/projects/{slug}`;
   - ctrl/cmd-klik nama project → terbuka di tab baru;
   - klik **badan card** → modal tetap terbuka seperti sebelumnya;
   - klik **panah** kanan bawah → tetap membuka link eksternal, atau `/contact` untuk yang Private.
7. Dari dalam modal klik "Read full case study" → pindah ke halaman detail DAN body bisa di-scroll
   (tidak terkunci). Tekan Esc sebelum itu → modal tertutup normal.
8. Prev/next: dari `/projects/tsa` next = `bcs`; dari `/projects/kpop` previous = `wise` dan tombol
   next tidak ada.
9. Cek di DevTools lebar 375px → galeri dan tombol prev/next tidak menimbulkan overflow horizontal.
10. Build dan pastikan rute ter-prerender:
    ```fish
    bun run build
    ls public/projects
    ```
    Harus ada `tsa.html`, `bcs.html`, `sia-asrama.html`, `css.html`, `origin.html`, `nutrify.html`,
    `wise.html`, `kpop.html`. Bentuknya FILE, bukan folder berisi `index.html`, karena `trailingSlash`
    default SvelteKit adalah `never`. Kalau build gagal dengan pesan prerender, berarti `entries()`
    belum ter-export.
11. `bun run check` → 0 error 0 warning.
12. **Rollback:**
    ```fish
    rm -rf "src/routes/projects/[slug]"
    git checkout -- src/lib/components/WorkCard.svelte src/lib/components/ProjectModal.svelte
    rm -rf public/projects
    ```
    Tidak ada resource eksternal yang dibuat (tanpa API key, service, atau env var), jadi rollback
    cukup menghapus file di atas. `public/` adalah output build — regenerasi dengan `bun run build`.

## Asumsi yang perlu kamu konfirmasi

- `[ASUMSI]` Project berlabel **Private** (`origin`, `wise`, `kpop`) tetap di-listing dan tetap dapat
  halaman detail publik — sudah dikonfirmasi user. Karena itu tidak ada field `unlisted`.
- `[ASUMSI]` Urutan prev/next mengikuti urutan array `projects` di `data.ts` (tsa → bcs → … → kpop),
  bukan urutan tanggal.
- `[ASUMSI]` Format title `<judul project> — Dawam Amali`, mengikuti yang sudah dipakai
  `ProjectModal.svelte`.
- `[ASUMSI]` Modal dipertahankan. Klik badan card tetap membuka modal; hanya nama project yang jadi
  jalur navigasi baru.
- `[ASUMSI]` Gambar fallback `placehold.co` (butuh network) diterima sementara. Mengganti dengan aset
  lokal untuk `kpop` adalah tugas terpisah.
- `[ASUMSI]` Fitur ini dikerjakan SEBELUM `tech-stack-logos.md` — halaman detail dibuat lebih dulu
  dengan `.tag` teks biasa, lalu `<TechStack>` masuk di fitur berikutnya.
