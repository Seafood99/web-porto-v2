# Clean Commits — Konvensi Commit

> Format commit dan cara commit yang benar. Project ini akan di-publish di GitHub, jadi history commit harus jelas dan berguna.

## Format

```
type(scope): deskripsi singkat
```

### Types

| Type | Kapan dipakai |
|---|---|
| `feat` | Fitur baru (section, komponen, interaksi) |
| `fix` | Fix bug |
| `refactor` | Perubahan struktur tanpa ubah behavior |
| `style` | Formatting, whitespace, semicolon, dll (tanpa ubah logic) |
| `docs` | Update dokumentasi (README, AGENTS.md, knowledge/) |
| `chore` | Maintenance (bump deps, config, tooling) |

### Scopes

`hero`, `nav`, `about`, `projects`, `experience`, `education`, `contact`, `shader`, `theme`, `mobile`, `data`

### Contoh

```
feat(nav): navbar capsule scroll dengan inline style
feat(nav): mobile fullscreen overlay menu
fix(nav): hamburger icon centering, span width
style(theme): normalize CSS variable naming
docs(knowledge): tambah decision log untuk dark mode
chore(deps): bump svelte-kit ke 2.70.2
```

## Aturan Umum

1. **Satu commit = satu tujuan logis**. Jangan campur-campur perubahan unrelated dalam satu commit.
   - ✅ `feat(nav): tambah mobile menu` (1 file change)
   - ❌ `feat(nav, about, projects): update ini itu banyak file`

2. **Kompatibel dengan changelog**. Pesan commit harus bisa dibaca orang lain.
   - ✅ `feat(hero): counter animation dengan IntersectionObserver`
   - ❌ `update file` / `fix this` / `wip`

3. **Pakai bahasa Indonesia atau Inggris**. Konsisten aja. Project ini pakai **Indonesia** (bahasa sehari-hari tim).

4. **Jangan commit file berikut**: `.bak`, `*.tmp`, `node_modules/`, `.svelte-kit/`, `build/`, `bun.lockb` (optional, depends on preference).

## Workflow Rekomendasi

```bash
# 1. Kerja (edit files)
bun run check                    # pastikan 0 error 0 warning
git status                       # lihat perubahan

# 2. Stage perubahan (pilih file spesifik, jangan git add .)
git add src/lib/components/Navbar.svelte
git add knowledge/decision.md

# 3. Commit dengan format di atas
git commit -m "feat(nav): tambah mobile fullscreen overlay"

# 4. Push
git push
```

## Commit Granularity

- **Kecil tapi bermakna**: setiap commit harus bisa di-reverse tanpa break sesuatu.
- **Group related changes**: edit CSS + edit component + update data → satu commit kalau tujuannya sama.
- **Jangan commit WIP**: commit hanya feature yang sudah work di browser.

## Contoh History yang Bagus

```
feat(hero): tambah stats counter animation
feat(nav): navbar smooth scroll capsule transition
feat(nav): mobile fullscreen overlay menu
fix(nav): hamburger icon span width 22px (dari 100%)
style(theme): rename CSS variables ke lowercase
docs(knowledge): tambah decision log untuk navbar refactor
chore(deps): bump svelte ke 5.56.9
```

## Anti-Pattern

❌ `git commit -m "update"`
❌ `git commit -m "wip"`
❌ `git commit -m "fix everything"`
❌ `git add . && git commit -m "feat: banyak perubahan"`
❌ Commit file backup (`.bak`, `*.tmp`)
