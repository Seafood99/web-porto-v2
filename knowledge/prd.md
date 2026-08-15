# PRD — Portfolio Website Muhammad Dawam Amali (v2)

> Product Requirements Document. Ini adalah sumber kebenaran (source of truth) untuk apa yang sedang kita bangun. Semua pekerjaan harus mengikuti dokumen ini.

## 1. Ringkasan Produk

Website portfolio pribadi satu halaman (single-page) untuk **Muhammad Dawam Amali** — mahasiswa Informatika (Amikom Yogyakarta), Cloud Computing graduate (Bangkit Academy), full-stack developer & cloud engineer.

Tujuan: menampilkan skill, project, pengalaman, dan kontak secara profesional dan menarik, bisa diakses dari HP maupun desktop.

**v2**: Rewrite dari `web-porto` (HTML/CSS/JS) ke SvelteKit 2 + Svelte 5 (runes). Reason: struktur lama mulai sulit di-maintain (navbar complex, state management manual, CSS conflicts).

## 2. Target Pengguna

- **Recruiter / HRD** — melihat profil, skill, dan pengalaman kerja.
- **Klien potensial** — melihat project dan menghubungi.
- **Rekan developer / komunitas** — melihat karya dan GitHub.

## 3. Tujuan Produk

1. Menampilkan profil profesional dengan kesan modern & premium.
2. Menampilkan **8 project nyata** dengan detail teknologi.
3. Memudahkan kontak (email, WA, LinkedIn, GitHub).
4. Bisa diakses dari **HP** (ini prioritas — user mengerjakan & mengakses dari HP).
5. Bisa di-deploy ke Vercel (static).

## 4. Data Diri (Sumber: CV)

- **Nama**: Dawam Amali (full: Muhammad Dawam Amali — gunakan "Dawam Amali" di semua UI)
- **Lokasi**: Sleman, Yogyakarta, Indonesia
- **Status**: Mahasiswa Informatika (Amikom, IPK 3.75/4.00)
- **Kontak**:
  - Email: muhammadawamali@gmail.com
  - WA: +62 821-2347-3652
  - LinkedIn: https://www.linkedin.com/in/muhammad-dawam-amali-7487ab28b/
  - GitHub: https://github.com/Seafood99/
  - Website: https://dawamali.vercel.app/

## 5. Skill (dari CV)

- **Cloud & DevOps**: GCP (Cloud Run, Compute Engine), Docker, Terraform, VPS Management, GitHub CI/CD, Linux Administration
- **Web Development**: SvelteKit, Next.js, Strapi CMS, TypeScript, React.js, Tailwind CSS
- **Machine Learning**: Python, Scikit-learn, Pandas, TensorFlow (Basic)
- **Tools & Design**: Git, Figma, Postman, VS Code

## 6. Project (8 Project — dari CV)

| # | Nama | Deskripsi | Teknologi | Link |
|---|---|---|---|---|
| 1 | Taktik Sejahtera Abadi | Company profile + CMS admin panel untuk perusahaan konstruksi & properti | SvelteKit, PostgreSQL, Drizzle ORM, Tailwind v4, GSAP, Better Auth | Private |
| 2 | BCS X PSS Sleman Fan Platform | Platform fan engagement produksi (live) | Next.js, Strapi v5, TypeScript, Docker, CI/CD | https://admin.bcsxpss.com |
| 3 | SIA Komplek M | Sistem informasi asrama (absensi, izin, jadwal, piket) | FastAPI, SQLite, Three.js, Nginx, VPS | https://komplekm.my.id |
| 4 | CSS E-Commerce Platform | E-commerce private dengan integrasi pembayaran | Laravel 13, Next.js 14, Xendit | Private |
| 5 | Origin Entertainment | Platform manajemen event | Laravel 12, Next.js, React, TypeScript, Tailwind | Private |
| 6 | Nutrify | Landing page brand makanan sehat (Lighthouse 100) | Svelte, Tailwind CSS | Private |
| 7 | Wise — AI Wound ID | Backend ML prediksi, deploy Cloud Run (99.9% uptime), capstone Bangkit | GCP, Flask, Docker | Private |
| 8 | K-Pop Song Ranking Classifier | Model ML prediksi popularitas lagu | Python, Scikit-learn, Pandas | Private |

> Catatan: project "Private" = tanpa link publik, cukup deskripsi. Project BCS & SIA punya link live.

## 7. Experience (Timeline)

1. **Full Stack Developer — Taktik Sejahtera Abadi** (Jun 2026–Present)
2. **Full Stack Developer — BCS X PSS Sleman** (Jan–Mei 2026)
3. **Full Stack Developer — SIA Komplek M** (Jun 2026)
4. **Full Stack Developer — CSS E-Commerce** (Apr–Mei 2026)
5. **Full Stack Developer — Origin Entertainment** (Feb–Apr 2026)
6. **Frontend Developer — Nutrify** (Mar–Apr 2025)
7. **Laboratory Assistant — Universitas Amikom** (Mar–Agu 2025)
8. **Cloud Computing Cohort — Bangkit Academy** (Sep 2024–Jan 2025)

## 8. Education

- **Universitas Amikom Yogyakarta** — Bachelor of Informatics, GPA 3.75 (2022–sekarang)
- **Neuversity School of Software Engineering** — Frontend Dev Bootcamp (Jun–Des 2024)
- **Google Cloud** — Preparing Your Associate Cloud Engineer Journey (sertifikasi)
- **Dicoding** — Menjadi Cloud Engineer, Belajar Dasar Pemrograman Javascript

## 9. Fitur Website

### 9.1 Navigasi
- **Desktop**: Navbar fixed top, full-width saat belum scroll → capsule pill saat scroll (smooth transition via inline style)
- **Mobile**: Hamburger → fullscreen overlay dengan close button (X)
- Menu: About, Projects, Contact — **link ke halaman terpisah** (`/about`, `/projects`, `/contact`)
- Dark mode toggle (persist ke localStorage)

### 9.2 Hero (Homepage only)
- Nama "Dawam Amali" (font besar, bold)
- **Flipper component**: rotating subtitle pill ("Full Stack Developer" → "Cloud Engineer" → dll)
- Subheading ringkas (1 paragraf pendek)
- CTA: "View My Work" + "Contact Me"
- Stats counter animasi (8 projects, 100+ students, 3 cloud certs, 4 years)

### 9.3 Halaman `/about` (placeholder)
- Coming soon. Diisi detail later: full bio, skills, stats, photo.

### 9.4 Halaman `/projects` (placeholder)
- Coming soon. Diisi later: grid project dengan detail, screenshots, live demo links.

### 9.5 Halaman `/contact` (placeholder)
- Coming soon. Diisi later: form contact, social links.

### 9.8 Background
- Canvas WebGL shader animasi (warna biru tema) — signature feature
- Reactive to dark mode (palette auto-adjust)

### 9.9 Dark Mode
- Toggle manual (navbar)
- Persist ke `localStorage.theme`
- Initial check: user preference → system preference

### 9.10 Footer
- Copyright notice (seluruh halaman)

## 10. Non-Fungsional

- **Responsive**: mobile-first, breakpoint 768px
- **Performance**: static site (SvelteKit adapter-static), no server runtime
- **Accessibility**: semantic tags, aria-label di nav & tombol ikon, focus visible
- **SEO**: title deskriptif, meta viewport, semantic HTML
- **Browser**: modern (Chrome, Safari, Firefox)

## 11. Kriteria "Selesai" (Definition of Done)

- [ ] Semua konten sesuai data diri & project nyata
- [ ] Tidak ada konten dummy/template tersisa
- [ ] Responsif & enak dipakai di HP
- [ ] `bun run check` → 0 error 0 warning
- [ ] Ter-deploy & bisa diakses publik
- [ ] Link kontak & project berfungsi

## 12. Out of Scope (Sekarang)

- Backend / database (form pakai mailto dulu)
- Multi-halaman (cukup single-page)
- Bahasa Indonesia/Inggris toggle (bisa jadi future)
- Analytics
