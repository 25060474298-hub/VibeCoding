# 🚀 VibeCoding Backend: Bun + ElysiaJS + Drizzle + MySQL

REST API backend performa tinggi yang dibangun menggunakan **Bun** sebagai runtime, **ElysiaJS** sebagai web framework, **Drizzle ORM** sebagai layer database, dan **MySQL** sebagai database. Proyek ini dilengkapi dengan dokumentasi interaktif Swagger/OpenAPI.

---

## 🛠️ Tech Stack

| Layer | Teknologi | Deskripsi |
| --- | --- | --- |
| **Runtime** | [Bun](https://bun.sh/) | All-in-one JavaScript & TypeScript runtime super cepat |
| **Framework** | [ElysiaJS](https://elysiajs.com/) | Web framework ergonomis dan cepat untuk Bun |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | TypeScript ORM deklaratif dan lightweight |
| **Migration** | [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) | Tool migrasi dan Drizzle Studio |
| **Database** | [MySQL](https://www.mysql.com/) | Relational database management system |
| **API Docs** | [Swagger / OpenAPI](https://elysiajs.com/plugins/swagger.html) | Dokumentasi interaktif otomatis di `/swagger` |

---

## 📁 Struktur Folder

```text
.
├── drizzle/              # File SQL migrasi hasil generate Drizzle Kit
├── src/
│   ├── db/
│   │   ├── schema/       # Definisi skema tabel Drizzle ORM
│   │   │   ├── index.ts  # Export seluruh skema
│   │   │   └── users.ts  # Skema tabel users
│   │   └── index.ts      # Koneksi database pool & instance Drizzle
│   ├── routes/           # Routing handler grouped by resource
│   │   ├── index.ts      # Main router
│   │   └── user.routes.ts# Endpoint CRUD /api/users
│   ├── services/         # Layer business logic
│   │   └── user.service.ts
│   ├── types/            # Definisi shared TypeScript types
│   │   └── index.ts
│   └── index.ts          # Entry point aplikasi Elysia
├── .env.example          # Template environment variable
├── .gitignore            # Git ignore rule
├── drizzle.config.ts     # Konfigurasi Drizzle Kit untuk MySQL
├── package.json          # Dependency & script manajemen
├── tsconfig.json         # Konfigurasi TypeScript untuk Bun
└── README.md
```

---

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstal:

1. **Bun** (v1.0.0 atau lebih baru)
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
2. **MySQL Server** (v8.0 atau kompatibel, misal MariaDB)
   Pastikan service MySQL berjalan dan database telah dibuat (contoh: `vibecoding_db`).

---

## ⚙️ Instalasi & Setup

1. **Clone repository & masuk ke direktori proyek**:
   ```bash
   git clone https://github.com/25060474298-hub/VibeCoding.git
   cd VibeCoding
   ```

2. **Install dependensi**:
   ```bash
   bun install
   ```

3. **Konfigurasi Environment Variable**:
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan kredensial database di `.env`:
   ```env
   PORT=3000
   NODE_ENV=development

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=vibecoding_db
   ```

---

## 🗄️ Database Migration

Gunakan script berikut untuk mengelola database dengan Drizzle Kit:

1. **Generate file migrasi SQL baru**:
   ```bash
   bun run db:generate
   ```
   *(File SQL akan dibuat di dalam folder `drizzle/`)*

2. **Jalankan migrasi ke database MySQL**:
   ```bash
   bun run db:migrate
   ```

3. **Buka Drizzle Studio (Database GUI Viewer)**:
   ```bash
   bun run db:studio
   ```

---

## 🚀 Menjalankan Aplikasi

- **Mode Development (dengan Hot Reload)**:
  ```bash
  bun run dev
  ```

- **Mode Production**:
  ```bash
  bun run start
  ```

- **Type Checking**:
  ```bash
  bun run typecheck
  ```

Server akan berjalan secara default di `http://localhost:3000`.

---

## 📚 Dokumentasi API (Swagger)

Akses dokumentasi OpenAPI / Swagger UI secara interaktif di browser:

👉 **[http://localhost:3000/swagger](http://localhost:3000/swagger)**

---

## 🛣️ API Endpoints Summary

| Method | Endpoint | Deskripsi | Status Code |
| --- | --- | --- | --- |
| `GET` | `/` | Root health check & informasi API | `200` |
| `GET` | `/api/users` | Mengambil semua daftar user | `200` |
| `GET` | `/api/users/:id` | Mengambil detail user berdasarkan ID | `200` / `404` |
| `POST` | `/api/users` | Membuat data user baru | `201` / `400` / `409` |
| `PUT` | `/api/users/:id` | Memperbarui data user berdasarkan ID | `200` / `400` / `404` / `409` |
| `DELETE` | `/api/users/:id` | Menghapus user berdasarkan ID | `200` / `404` |

### Contoh Request & Response

#### 1. Buat User Baru (`POST /api/users`)
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2026-11-01T02:00:00.000Z",
    "updatedAt": "2026-11-01T02:00:00.000Z"
  }
}
```
