# 🚀 Project Setup: Bun + ElysiaJS + Drizzle + MySQL

## Objective

Buat REST API backend project dari scratch menggunakan **Bun** sebagai runtime, **ElysiaJS** sebagai framework, **Drizzle ORM** untuk database layer, dan **MySQL** sebagai database.

---

## Phase 1: Project Initialization

- [ ] Inisialisasi project baru dengan `bun init`
- [ ] Install dependencies utama:
  - `elysia` dan `@elysiajs/swagger` (dokumentasi API otomatis)
  - `drizzle-orm` dan `drizzle-kit` (ORM + migration tool)
  - `mysql2` (MySQL driver untuk Drizzle)
- [ ] Setup TypeScript config (`tsconfig.json`) yang compatible dengan Bun
- [ ] Buat file `.env` dan `.env.example` untuk konfigurasi database (host, port, user, password, database name)
- [ ] Tambahkan `.gitignore` (node_modules, .env, dist, dll)

---

## Phase 2: Database Setup (Drizzle + MySQL)

- [ ] Buat folder `src/db/`
- [ ] Setup Drizzle connection di `src/db/index.ts` — baca config dari `.env`
- [ ] Buat file `drizzle.config.ts` di root untuk konfigurasi migration
- [ ] Buat contoh schema awal di `src/db/schema/` (minimal 1 tabel, misalnya `users`)
- [ ] Pastikan `drizzle-kit generate` dan `drizzle-kit migrate` berjalan dengan benar
- [ ] Tambahkan npm scripts di `package.json`:
  - `db:generate` → generate migration files
  - `db:migrate` → jalankan migration
  - `db:studio` → buka Drizzle Studio

---

## Phase 3: Struktur Aplikasi ElysiaJS

- [ ] Buat entry point di `src/index.ts` — setup Elysia app, register plugins, listen di port dari `.env`
- [ ] Buat folder structure:
  ```
  src/
  ├── index.ts          # Entry point
  ├── db/
  │   ├── index.ts      # Database connection
  │   └── schema/       # Drizzle table schemas
  ├── routes/           # Route handlers (grouped by resource)
  ├── services/         # Business logic layer
  └── types/            # Shared TypeScript types
  ```
- [ ] Buat minimal 1 CRUD route sebagai contoh (misalnya `/api/users`) dengan:
  - `GET /` — list all
  - `GET /:id` — get by id
  - `POST /` — create
  - `PUT /:id` — update
  - `DELETE /:id` — delete
- [ ] Integrate Swagger plugin di `/swagger` untuk API docs

---

## Phase 4: Developer Experience

- [ ] Tambahkan script `dev` di `package.json` menggunakan `bun --watch` untuk hot reload
- [ ] Tambahkan script `start` untuk production
- [ ] Setup error handling global di Elysia (`.onError()`)
- [ ] Tambahkan basic request validation menggunakan Elysia's built-in schema validation (`t.Object`, `t.String`, dll)
- [ ] Buat `README.md` dengan instruksi:
  - Prerequisites (Bun, MySQL)
  - Cara install & setup
  - Cara menjalankan project
  - Cara menjalankan migration

---

## Tech Stack Summary

| Layer        | Technology     |
| ------------ | -------------- |
| Runtime      | Bun            |
| Framework    | ElysiaJS       |
| ORM          | Drizzle ORM    |
| Database     | MySQL          |
| API Docs     | Swagger (Elysia plugin) |

---

## Notes

- Gunakan **Bun** native, jangan pakai Node.js
- Semua config sensitif harus lewat `.env`, jangan hardcode
- Drizzle schema pakai **declarative style** (bukan raw SQL)
- Route handler sebaiknya tipis — logic utama di `services/`
- Pastikan project bisa dijalankan cukup dengan `bun install` → setup `.env` → `bun run db:migrate` → `bun run dev`
