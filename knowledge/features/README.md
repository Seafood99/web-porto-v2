# knowledge/features/ — Index

Plan ringan per fitur, format `/feature`: Masalah · Pendekatan · File yang dibuat/diubah · Verifikasi ·
Asumsi. Untuk konteks produk lihat [`../prd.md`](../prd.md), untuk gaya visual
[`../design-system.md`](../design-system.md), dan untuk keputusan teknis yang sudah diambil
[`../decision.md`](../decision.md).

| # | Fitur | Status | File |
|---|---|---|---|
| 1 | Halaman detail project `/projects/[slug]` | DONE (2026-10-31) | [project-detail-page.md](project-detail-page.md) |
| 2 | Logo tech stack (ganti text pill) | DONE (2026-10-31) | [tech-stack-logos.md](tech-stack-logos.md) |

Urutan pengerjaan: **#1 dulu, lalu #2** — halaman detail harus ada sebelum chip logo punya tempat
untuk dirender. Keduanya sudah diimplementasi; keputusan teknisnya tercatat di
[`../decision.md`](../decision.md) entri #15.

Setiap fitur selesai diimplementasi, tambahkan entri baru di [`../decision.md`](../decision.md)
(format: Keputusan → Alasan → Konsekuensi → Tanggal) dan centang kriteria yang relevan di
`../prd.md` §11.
