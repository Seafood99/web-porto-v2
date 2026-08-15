# Agents — Panduan Agent untuk Project Ini

> Dokumen ini adalah pegangan utama untuk agent (Command Code / cmdc / AI assistant) yang bekerja di project `web-porto-v2`. Baca ini dulu sebelum menyentuh file apa pun.

## Cara kerja di project ini

1. **Mulai dari knowledge ini**: baca folder `knowledge/` sebelum mengerjakan tugas. Dokumen yang paling sering dipakai: `prd.md` (apa yang dibangun), `design-system.md` (style), `debug-error-fast.md` (kalau ada bug).
2. **Ikuti PRD**: semua perubahan harus sesuai dengan Product Requirements (`prd.md`). Kalau bertentangan, tanya dulu — jangan asal ubah.
3. **Ikuti Design System**: warna, font, spacing, dan komponen WAJIB mengikuti `design-system.md`. Jangan bikin style baru yang nyimpang.
4. **Jangan mengubah isi knowledge ini** kecuali diminta. Kalau ada keputusan baru, catat di `knowledge/decision.md`, bukan ubah dokumen lain seenaknya.

## Alur kerja yang disarankan

| Situasi | Yang dilakukan |
|---|---|
| Ada fitur baru | Baca `knowledge/prd.md` → desain sesuai `knowledge/design-system.md` → implement → tes → commit |
| Ada bug | Baca `knowledge/debug-error-fast.md` → reproduksi → fix → tes → commit |
| Mau refactor | Pastikan tes jalan → refactor bertahap |
| Mau commit | Ikuti `knowledge/clean-commits.md` |
| Ragu dengan keputusan teknis | Cek `knowledge/decision.md`, kalau belum ada → tanya user dulu |

## Aturan emas (non-negotiable)

- **Jangan ubah file di `src/lib/shader/` tanpa konfirmasi** — ini WebGL shader, signature feature website.
- **Selalu tes visual** setelah ubah komponen: buka browser, pastikan responsif (HP + desktop).
- **Konten data diri** (nama, skill, project, kontak) sumbernya dari CV (`Muhammd_Dawam_Amali-CV.pdf`). Kalau ada perubahan data diri, update PRD juga.
- **Jangan hardcode data yang berubah-ubah** — pisahkan ke file TypeScript/JSON (misal `src/lib/data.ts`).
- **Jangan komit file backup / temporary** (`.bak`, `*.tmp`, folder `node_modules`, `.svelte-kit`).
- **Jalankan `bun run check`** sebelum push — pastikan 0 error 0 warning.

## Info project

- **Stack**: SvelteKit 2 + Svelte 5 (runes) + TypeScript + Bun
- **Build**: Vite, output static via `@sveltejs/adapter-static`
- **Struktur**:
  - `src/routes/` — halaman (SvelteKit routing convention)
  - `src/lib/components/` — komponen reusable
  - `src/lib/data.ts` — data statis (projects, experiences, education, skills)
  - `src/app.css` — global CSS variables & base styles
  - `src/app.html` — HTML shell (meta tags, preconnect, fonts)
  - `static/` — aset statis (favicon, gambar)
  - `knowledge/` — folder ini
- **Deploy target**: Vercel (static hosting)

## Perintah umum

```bash
# install dependencies
bun install

# development server (http://localhost:5173)
bun run dev

# type check
bun run check

# build untuk production
bun run build

# preview production build
bun run preview
```

## Checklist sebelum dianggap "selesai"

- [ ] Konten sesuai PRD
- [ ] Style sesuai Design System
- [ ] Responsif di HP (cek lebar < 768px)
- [ ] `bun run check` → 0 error 0 warning
- [ ] Tidak ada data dummy yang tersisa
- [ ] Sudah di-commit sesuai `knowledge/clean-commits.md`
