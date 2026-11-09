# Design System — Portfolio Muhammad Dawam Amali (v2)

> Panduan desain tunggal untuk project ini. Setiap elemen UI harus mengikuti sistem ini. Jangan membuat warna, font, atau komponen baru yang menyimpang tanpa konfirmasi.

## 1. Palet Warna

### Light Mode (default)

| Token | Nilai | Penggunaan |
|---|---|---|
| `--bg` | `#EAF4FB` | Background utama |
| `--bg-card` | `#ffffff` | Kartu |
| `--text` | `#1a2a47` | Teks utama |
| `--text-muted` | `#3a4a6b` | Teks redup |
| `--blue-700` | `#2C5EAD` | Warna primer, tombol, link |
| `--blue-500` | `#1591DC` | Aksen terang, hover |
| `--blue-400` | `#4BB8FA` | Gradien akhir |
| `--blue-100` | `#C4E2F5` | Scrollbar track, badge bg |

### Dark Mode

| Token | Nilai | Penggunaan |
|---|---|---|
| `--bg` | `#0f172a` | Background utama |
| `--bg-card` | `#1e293b` | Kartu |
| `--text` | `#e2e8f0` | Teks utama |
| `--text-muted` | `#94a3b8` | Teks redup |
| `--blue-700` | `#3b82f6` | Warna primer |
| `--blue-500` | `#60a5fa` | Aksen terang |

**Catatan**: Semua warna dideklarasikan sebagai CSS variables di `src/app.css`, otomatis berubah saat `html.dark` aktif.

## 2. Tipografi

| Role | Font | Ukuran | Berat |
|---|---|---|---|
| Judul hero | `Instrument Serif` — baris 1 regular, baris 2 italic | `clamp(3.5rem, 9.5vw, 7.5rem)` | 400 |
| Section heading | `Instrument Serif` | `2.75rem` | 400 |
| Body | `Segoe UI, system-ui` | `0.88–1.1rem` | 400/500 |
| Label/eyebrow | system | `0.75rem`, uppercase, `letter-spacing: 3px` | 600 |

**Font external**: `Instrument Serif via Google Fonts (di `src/app.html`).

## 3. Radius & Bentuk

- **Pill (4rem)**: navbar capsule (scrolled state)
- **Kartu (12px)**: project-card, timeline-card, edu-card
- **Input (8px)**: form fields
- **Full (50% / 9999px)**: avatar, badge kecil

## 4. Spacing

- **Section wrapper**: `padding: 8rem 2rem` (desktop) → `3.5rem 1.25rem` (mobile)
- **Grid gap**: `1.25–1.5rem` antar kartu
- **Inline gap**: `0.5rem` (small), `1rem` (medium), `2rem` (large)
- **Spacing konsisten pakai rem**, hindari px untuk layout besar.

## 5. Shadow & Border

- Kartu default: `border: 1px solid var(--border)` + `box-shadow: 0 2px 8px var(--shadow)`
- Kartu hover: `transform: translateY(-2px)`, border lebih solid, shadow lebih besar
- Navbar scrolled: `box-shadow: var(--shadow-aceternity)`

## 6. Komponen

### Navbar

**Desktop**:
- Fixed top, full-width saat atas
- Saat scroll (> 10% progress): transition ke capsule (85% width, radius 4rem, translateY 10px)
- Smooth transition (cubic-bezier 0.22, 1, 0.36, 1) durasi 0.6s
- Glassmorphism: `backdrop-filter: blur(12px) saturate(1.8)`
- Avatar dengan shimmer sweep effect (setiap 4 detik)

**Mobile**:
- Fullscreen overlay saat menu buka
- Close button (X) di kanan atas
- Links center vertical, font 1.5rem, stagger animation
- Dark mode toggle di bottom (icon only)

### Tombol

| Variant | Style |
|---|---|
| `.btn-primary` | bg `--blue-700`, teks putih, pill. Hover: translateY(-2px), shadow lebih dalam. |
| `.btn-secondary` | bg `--btn-secondary-bg`, teks `--blue-700`, border tipis. Hover: translateY(-2px). |

### Hero (Homepage)

- **Komposisi**: grid dua kolom. Kiri = pitch (nama serif 2 baris, lede, satu CTA utama + satu
  text link). Kanan = ledger fakta (`Latest project`, `Education`) dengan hairline di atas, rata
  bawah bersama CTA. Hero full-bleed; konten dibatasi `.hero-inner` (max 1120px).
- **Tanpa glass card.** Latar memakai scrim radial *edge-less* `position: fixed; inset: 0`:
  `color-mix` `--bg` 82–88% di inti, memudar ke transparan. Fixed supaya tidak ada garis potong
  saat scroll; shader tetap terlihat, kontras teks tetap ≥ 7:1.
- **Bukan center stack.** Rata kiri; satu aksi dominan (`View selected work`), satu aksi tenang
  (`My journey`).
- **Motion**: CSS `@keyframes rise` (opacity + translateY 16px), stagger 0.06–0.3s, hanya aktif
  di `prefers-reduced-motion: no-preference`. Tidak bergantung JS saat mount.
- **Target sentuh**: CTA utama 48px, text link 44px. Focus ring `2px solid var(--blue-500)`.

### Footer (Homepage)

- Hanya ikon sosial (Instagram, LinkedIn, GitHub), tanpa teks, rata tengah.
- Target 44×44px, hover lift 2px, focus ring `2px solid var(--blue-500)`.
- Gradient `--bg` ke transparan di belakangnya agar tetap terbaca di atas shader.

### Scroll Indicator (Next page)

- Pill lebih kecil: `padding: 0.9rem 0.9rem 0.9rem 1.6rem`, gap `1.5rem`, ring 46px, label
  `clamp(1.35rem, 2.6vw, 1.65rem)`.
- Section `min-height: 46vh` (mobile 42vh) — tidak mendominasi layar.
- Hover lift 2px; panah nudge 2s; `prefers-reduced-motion` mematikan animasi.

### Kartu Project
- Media area 180px tinggi, cover object-fit
- Body: judul (1.05rem), deskripsi (0.88rem), tags pill, link (border rounded 8px)
- Hover: translateY(-2px) 0.25s

### Timeline
- Garis vertikal gradient, dots 14px
- Active dot: `--blue-500` background + glow

### Input
- Border: `var(--input-border)`
- Focus: border `--blue-700` + ring `--border-light`

## 7. Background WebGL Shader

- Canvas fixed full-screen (z-index 0, pointer-events none)
- Warna shader reactive ke dark mode (palette auto-swap)
- **JANGAN dihapus/diubah** tanpa konfirmasi — signature feature.

## 8. Animasi

- **Section reveal**: fade + translateY(24px) saat masuk viewport (IntersectionObserver threshold 0.1)
- **Counter stats**: ease-out cubic selama 1.5s
- **Hover kartu**: translateY(-2px) 0.25s
- **Navbar scroll**: smooth transition 0.6s cubic-bezier
- **Mobile menu**: fade in (0.3s) + staggered links (0.4s each, delay 0.05s)

## 9. Responsive Breakpoints

| Breakpoint | Perubahan |
|---|---|
| `max-width: 768px` | Desktop nav hidden → Mobile nav tampil. Grid 1 kolom. |

## 10. Aksesibilitas

- Navbar `aria-label="Primary navigation"`
- Tombol ikon pakai `aria-label` deskriptif
- Kontras warna terjaga (lihat aturan palet)
- Focus visible on keyboard navigation (default browser)
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
