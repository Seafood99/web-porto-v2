> **Status:** DONE — diimplementasi 2026-10-31 · **Dibuat:** 2026-10-31 oleh `/feature`

# Logo Tech Stack (ganti text pill)

## Masalah

Tech stack disimpan sebagai string tampil bebas di `Project.tags` (`src/lib/data.ts:6`) dan dirender
sebagai text pill. Isinya mencampur tiga hal berbeda: nama teknologi (`Docker`), nama + nomor versi
(`Laravel 13`, `Next.js 14`, `Tailwind v4`, `Strapi v5`), dan konsep yang memang tidak punya logo
(`CI/CD`, `REST API`, `VPS`, `Lighthouse 100`).

Penulisannya juga tidak konsisten antar project: `Tailwind v4` di `tsa` vs `Tailwind CSS` di `origin`
dan `nutrify`; `Next.js` di `bcs`/`origin` vs `Next.js 14` di `css`. Tidak ada tempat menaruh ikon,
dan tidak ada satu pun sumber kebenaran untuk daftar teknologi.

## Pendekatan

Buat registry tech di `src/lib/tech.ts` sebagai satu-satunya sumber kebenaran, lalu ubah
`Project.tags` dari `string[]` menjadi `TechKey[]`. Karena `TechKey` adalah union dari key registry,
typo pada `tags` langsung ketahuan saat `bun run check` — bukan saat runtime.

Nomor versi **dilepas dari chip**. Informasinya tidak hilang: sudah ada di prosa `caseStudy`
("Laravel 13 backend", "Next.js 14 with TypeScript", "Tailwind v4 for styling", "Strapi v5 headless
CMS", "Perfect Lighthouse scores: performance 100").

Ikon di-vendor ke `static/assets/tech/`, bukan diambil dari CDN saat runtime — tidak menambah request
pihak ketiga, tetap jalan offline, dan tidak merusak skor Lighthouse yang jadi nilai jual project
`nutrify`. Semua SVG dipaksa `fill="currentColor"` supaya ikut palet biru `design-system.md` §1, bukan
memakai warna brand. Teknologi tanpa logo mendapat `icon: null` dan dirender sebagai pill teks seperti
sekarang, jadi tidak ada lubang visual.

Chip memakai pill yang sudah ada: background `--tag-bg`, border `--border-light`, radius 999px, font
0.75rem, teks & ikon `--blue-700` (dark: `--blue-400`). Tidak ada token CSS baru — `--tag-bg` dan
`--tag-border` sudah dideklarasikan di `src/app.css` untuk light dan dark.

Sesuai keputusan user, logo **hanya** tampil di halaman detail `/projects/[slug]`. Tampilan modal dan
card tidak berubah.

## File yang dibuat / diubah

### 1. `static/assets/tech/*.svg` (BARU, 22 file)
- Di-download dari simple-icons, elemen `<title>` dibuang, atribut `fill="currentColor"` ditambahkan
  ke tag `<svg>`.
- Nama file = slug simple-icons (biar gampang di-download ulang), pemetaan ke key kita ada di registry.
- Daftar slug: `svelte`, `nextdotjs`, `react`, `typescript`, `laravel`, `tailwindcss`, `gsap`,
  `strapi`, `drizzle`, `postgresql`, `sqlite`, `fastapi`, `flask`, `python`, `pandas`, `scikitlearn`,
  `threedotjs`, `docker`, `nginx`, `googlecloud`, `githubactions`, `lighthouse`.

### 2. `src/lib/tech.ts` (BARU)
- `interface Tech { label: string; icon: string | null }`.
- `techRegistry` — objek berisi 27 key, dideklarasikan dengan `satisfies Record<string, Tech>`.
- `export type TechKey = keyof typeof techRegistry`.

Isi registry:

| Key | Label | File ikon |
|---|---|---|
| `sveltekit` | SvelteKit | `/assets/tech/svelte.svg` |
| `svelte` | Svelte | `/assets/tech/svelte.svg` |
| `nextjs` | Next.js | `/assets/tech/nextdotjs.svg` |
| `react` | React | `/assets/tech/react.svg` |
| `typescript` | TypeScript | `/assets/tech/typescript.svg` |
| `laravel` | Laravel | `/assets/tech/laravel.svg` |
| `tailwindcss` | Tailwind CSS | `/assets/tech/tailwindcss.svg` |
| `gsap` | GSAP | `/assets/tech/gsap.svg` |
| `strapi` | Strapi | `/assets/tech/strapi.svg` |
| `drizzle` | Drizzle ORM | `/assets/tech/drizzle.svg` |
| `postgresql` | PostgreSQL | `/assets/tech/postgresql.svg` |
| `sqlite` | SQLite | `/assets/tech/sqlite.svg` |
| `fastapi` | FastAPI | `/assets/tech/fastapi.svg` |
| `flask` | Flask | `/assets/tech/flask.svg` |
| `python` | Python | `/assets/tech/python.svg` |
| `pandas` | Pandas | `/assets/tech/pandas.svg` |
| `scikitlearn` | Scikit-learn | `/assets/tech/scikitlearn.svg` |
| `threejs` | Three.js | `/assets/tech/threedotjs.svg` |
| `docker` | Docker | `/assets/tech/docker.svg` |
| `nginx` | Nginx | `/assets/tech/nginx.svg` |
| `gcp` | GCP | `/assets/tech/googlecloud.svg` |
| `cloudrun` | Cloud Run | `/assets/tech/googlecloud.svg` |
| `cicd` | CI/CD | `/assets/tech/githubactions.svg` |
| `lighthouse` | Lighthouse 100 | `/assets/tech/lighthouse.svg` |
| `vps` | VPS | `null` |
| `xendit` | Xendit | `null` |
| `restapi` | REST API | `null` |

### 3. `src/lib/components/TechStack.svelte` (BARU)
- Props `{ tags: TechKey[] }` via `$props()`.
- Render satu chip per tag: `<span>` 16×16 `aria-hidden="true"` yang memakai `mask-image: var(--icon)`
  + `background-color: currentColor` bila `icon` tidak null, diikuti label. Bila `icon` null → teks
  saja, bentuk pill identik.
- **Sengaja bukan `<img>`.** SVG yang dimuat lewat `<img>` adalah dokumen terpisah dan tidak mewarisi
  CSS halaman induk, sehingga `fill="currentColor"` di dalamnya jatuh ke hitam — warna biru chip dan
  dark mode tidak akan ikut. Dengan `mask-image`, bentuk ikon diwarnai ulang oleh
  `background-color: currentColor`, jadi ikon otomatis `--blue-700` di light dan `--blue-400` di dark.
- `title` dan `aria-label` diisi dari `label` supaya tetap terbaca screen reader dan saat hover.
- Style menyalin `.tag` yang sudah ada di `ProjectModal.svelte` (font 0.75rem, padding 0.3rem 0.75rem,
  radius 999px, `--tag-bg`, `--border-light`, `--blue-700`, dark override `--blue-400`) + `gap: 0.4rem`
  antar chip dan `gap` internal ikon–label.

### 4. `src/lib/data.ts`
- Import `type TechKey` dari `$lib/tech`.
- `Project.tags: TechKey[]` (baris 6).
- Isi ulang 8 array `tags`:

| Project | `tags` baru |
|---|---|
| `tsa` | `sveltekit`, `postgresql`, `drizzle`, `tailwindcss`, `gsap` |
| `bcs` | `nextjs`, `strapi`, `typescript`, `docker`, `cicd` |
| `sia-asrama` | `fastapi`, `sqlite`, `threejs`, `nginx`, `vps` |
| `css` | `laravel`, `nextjs`, `xendit`, `restapi` |
| `origin` | `laravel`, `nextjs`, `react`, `tailwindcss` |
| `nutrify` | `svelte`, `tailwindcss`, `lighthouse` |
| `wise` | `gcp`, `flask`, `docker`, `cloudrun` |
| `kpop` | `python`, `scikitlearn`, `pandas` |

- Tidak ada field lain yang berubah; `experiences`, `journey`, `education` tidak disentuh.

### 5. `src/routes/projects/[slug]/+page.svelte`
- Pakai `<TechStack tags={project.tags} />` di bagian body (halaman ini dibuat oleh
  `project-detail-page.md`).

### 6. `src/lib/components/ProjectModal.svelte`
- **Tampilan tidak berubah**, tapi blok `.modal-tags` sekarang harus merender
  `techRegistry[tag].label` — kalau tidak, yang muncul adalah key mentah seperti `nextdotjs`.

### 7. `src/lib/components/ProjectCard.svelte`
- DIHAPUS. Dead code: tidak diimpor di file mana pun (yang dipakai
  `src/routes/projects/+page.svelte` hanya `WorkCard` dan `ProjectModal`), peninggalan decision #9
  saat grid diganti track horizontal. Kalau dibiarkan hidup, `.card-tags`-nya akan merender key mentah
  bila suatu saat dipakai lagi.

## Verifikasi

1. Download aset (fish, satu baris):
   ```fish
   for s in svelte nextdotjs react typescript laravel tailwindcss gsap strapi drizzle postgresql sqlite fastapi flask python pandas scikitlearn threedotjs docker nginx googlecloud githubactions lighthouse; curl -sfL "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/$s.svg" | sed -e 's|<title>[^<]*</title>||' -e 's|<svg |<svg fill="currentColor" |' > "static/assets/tech/$s.svg"; end
   ```
   Buat foldernya dulu bila belum ada: `mkdir -p static/assets/tech`.
2. Pastikan tidak ada yang gagal download — `curl -f` + 404 menghasilkan file 0 byte:
   ```fish
   ls -l static/assets/tech
   ```
   Semua file harus lebih dari 200 byte. Yang 0 byte berarti slug-nya tidak ada di simple-icons →
   set `icon: null` untuk key tersebut di `src/lib/tech.ts`; fallback pill teks sudah menangani.
3. `bun run dev`, buka `http://localhost:5173/projects/bcs` → 5 chip: Next.js, Strapi, TypeScript,
   Docker, CI/CD. Tiap chip ada ikonnya, dan warna ikon **ikut teks** (biru), bukan hitam atau warna
   brand.
4. Toggle dark mode lewat navbar → ikon ikut menjadi terang. Kalau ikon tetap hitam, berarti
   `fill="currentColor"` belum masuk ke SVG-nya.
5. Buka `http://localhost:5173/projects/sia-asrama` → chip "VPS" tampil tanpa ikon dengan bentuk pill
   yang sama persis dengan chip berikon.
6. Buka `http://localhost:5173/projects/kpop` → chip Python, Scikit-learn, Pandas.
7. Buka `/projects`, klik badan card → di dalam modal label masih teks manusia ("Next.js", bukan
   "nextdotjs").
8. `bun run check` → 0 error 0 warning. Ini sekaligus membuktikan tidak ada key `tags` yang typo.
9. `bun run build` → sukses, tidak ada warning aset hilang.
10. **Rollback:**
    ```fish
    rm -rf static/assets/tech src/lib/tech.ts src/lib/components/TechStack.svelte
    git checkout -- src/lib/data.ts src/lib/components/ProjectCard.svelte src/lib/components/ProjectModal.svelte "src/routes/projects/[slug]/+page.svelte"
    ```
    Tidak ada resource eksternal yang perlu dilepas — semua aset berupa file statis di repo.

## Asumsi yang perlu kamu konfirmasi

- ~~`[ASUMSI]` slug simple-icons belum terverifikasi~~ → **TERKONFIRMASI**: ke-22 slug berhasil
  di-download, tidak ada file 0 byte. `drizzle`, `gsap`, `strapi`, `lighthouse`, `scikitlearn`,
  `threedotjs`, dan `githubactions` semuanya ada. Yang `icon: null` hanya `vps`, `xendit`, `restapi`.
- ~~`[ASUMSI]` menghapus `ProjectCard.svelte` perlu persetujuan~~ → **DIKONFIRMASI user**, file sudah
  dihapus. Masih bisa dipulihkan dari git history kalau suatu saat dibutuhkan.
- `[ASUMSI]` `cloudrun` memakai ikon `googlecloud` karena Cloud Run tidak punya logo tersendiri di
  simple-icons.
- `[ASUMSI]` Nomor versi dihapus dari chip (`Laravel 13` → `Laravel`) karena informasinya sudah ada di
  prosa `caseStudy`. Diputus agent atas delegasi user. Kalau mau versi tetap kelihatan, perlu field
  `version?: string` per tag — itu mengubah bentuk data lagi.
- `[ASUMSI]` Modal sengaja tetap memakai text pill (pilihan user: logo hanya di halaman detail).
  Menyamakan nanti cukup satu baris: ganti render `.modal-tags` dengan
  `<TechStack tags={project.tags} />`.
