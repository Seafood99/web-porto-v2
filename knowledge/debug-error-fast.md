# Debug Error Fast — Playbook kalau ada Bug

> Playbook cepat untuk mendiagnosis dan fix bug. Ikuti langkah-langkah ini kalau ada yang error / unexpected behavior.

## Langkah Diagnosis Umum

### 1. Cek Error Message

```bash
# Type error / Svelte compiler error
bun run check

# Build error
bun run build

# Runtime error
# Buka browser console (F12) → Console tab
```

**Pertanyaan**:
- Error muncul di build-time atau run-time?
- Error message-nya apa? File apa yang disebutkan?
- Ada stack trace? Line berapa?

### 2. Reproduksi

- Error terjadi selalu atau hanya kadang-kadang?
- Terjadi di browser apa? (Chrome, Safari, Firefox)
- Terjadi di device apa? (Desktop, Mobile)
- Terjadi di mode apa? (Light/Dark)

**Cara reproduksi cepat**:
```bash
bun run dev
# buka http://localhost:5173
# coba action yang error
# cek browser console
```

### 3. Isolasi

- Coba rollback perubahan terakhir (git diff HEAD~1)
- Disable komponen/section satu per satu → ketemu yang culprit
- Cek apakah error masih muncul di mode incognito (no extensions)

## Error Umum dan Fix-nya

### `svelte-check found X errors`

**Symptom**: `bun run check` keluar error TypeScript / Svelte.

**Fix**:
1. Baca error message — biasanya file mana dan line berapa
2. Cek apakah ada typo / syntax error
3. Cek apakah import path bener
4. Cek apakah types match

**Contoh error**:
```
❌ Type 'string' is not assignable to type 'Snippet'
✅ Cek apakah component export default + di-import dengan benar
```

### Build error: `Cannot find module`

**Symptom**: `bun run build` gagal karena module tidak ketemu.

**Fix**:
```bash
bun install          # re-install dependencies
bun run check        # cek error
```

### Navbar scroll tidak smooth

**Symptom**: Scroll animation jerky / snap.

**Diagnosis**:
1. Cek apakah pakai `scrollProgress` (0.0–1.0) atau boolean `isScrolled`
2. Cek apakah inline style di-apply atau CSS class saja
3. Cek browser DevTools → Performance tab → apakah ada forced reflow

**Fix**:
```javascript
// ❌ Boolean toggle (snap)
let isScrolled = scrollY > 50;

// ✅ Progress-based (smooth)
let scrollProgress = Math.min(scrollY / 100, 1);
```

### Mobile menu tidak muncul

**Symptom**: Klik hamburger tapi menu tidak keluar.

**Diagnosis**:
1. Cek `menuOpen` state (buka DevTools → inspect element)
2. Cek apakah overlay di-render (`{#if menuOpen}`)
3. Cek z-index (navbar harus di bawah overlay)

**Fix**:
- Cek onclick handler di button
- Cek apakah ada CSS yang block (display: none, overflow: hidden)

### Dark mode tidak persist

**Symptom**: Toggle dark mode, refresh, balik ke light mode.

**Diagnosis**:
1. Cek browser DevTools → Application → Local Storage → theme key
2. Cek apakah inisialisasi theme jalan di app.html

**Fix**:
- Cek apakah `localStorage.setItem` jalan di onclick toggle
- Cek theme init script di `src/app.html` (blocking script di `<head>`)

### WebGL shader tidak muncul

**Symptom**: Background biru polos, tanpa animasi shader.

**Diagnosis**:
1. Cek browser console → WebGL error
2. Cek apakah canvas element ada (`#shader-bg`)
3. Cek apakah uniforms ter-set dengan benar

**Fix**:
- WebGL butuh GPU — cek di `chrome://gpu`
- Cek apakah ada compile error di fragment shader
- Cek console log untuk WebGL warnings

## Triage Priority

| Priority | Kriteria | Action |
|---|---|---|
| 🔴 High | Bug block user (menu tidak jalan, page blank) | Fix segera, commit fix |
| 🟡 Medium | Bug minor tapi ganggu (animasi jerky, alignment salah) | Fix kalau sempat |
| 🟢 Low | Cosmetic / edge case (hover salah di browser jarang) | Catat di TODO, fix nanti |

## Cara Tanya User / Agent Lain

Kalau stuck > 30 menit, kasih info ini:

```
**Bug**: [deskripsi singkat]
**Reproduce**: [langkah step-by-step]
**Expected**: [yang seharusnya terjadi]
**Actual**: [yang beneran terjadi]
**Environment**: [browser, device, mode]
**Error message**: [kalau ada]
**Screenshot**: [kalau visual]
```

## Tools Berguna

- **Browser DevTools** (F12) — Elements, Console, Performance
- **Svelte DevTools** (Chrome extension) — inspect $state, $effect
- **git difftool** — lihat perubahan terakhir
- **bun run check** — lint + type check

## Prevent Bug

- Jalankan `bun run check` setelah setiap perubahan significant
- Test manual di browser setelah implement feature
- Test responsif (Chrome DevTools → Device toolbar)
- Test dark mode + light mode
- Commit kecil-kecil (lebih gampang rollback)
