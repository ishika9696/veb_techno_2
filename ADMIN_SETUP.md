# Custom CMS Admin Setup Guide — Veb Techno Inc

This codebase includes a custom, self-hosted Content Management System (CMS) built directly into the Next.js project to manage **Blog Posts**, **Portfolio Projects**, and **Job Listings (Careers)**.

---

## 1. Environment Setup

Copy `.env.example` to `.env.local` or configure your environment variables in Vercel:

```bash
# PostgreSQL Connection URL (Vercel Postgres or Neon)
DATABASE_URL="postgresql://user:password@localhost:5432/veb_techno_db?schema=public"

# Auth Secret (generate with `openssl rand -base64 32`)
NEXTAUTH_SECRET="your_secret_key_at_least_32_chars_long"
NEXTAUTH_URL="http://localhost:3000" # or your production URL

# Initial Admin User Credentials (used by seed script)
ADMIN_EMAIL="admin@vebtechno.com"
ADMIN_PASSWORD="AdminPassword123!"

# Optional: Vercel Blob Storage Token for Image Uploads
# (If omitted in local dev, uploads fall back to /public/uploads)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_token"
```

---

## 2. Database Migrations

Run Prisma migrations to initialize the database tables (`admin_users`, `blog_posts`, `portfolio_projects`, `job_listings`):

```bash
# Push schema directly to database (development / first-time setup)
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Create and apply migration (production workflows)
npx prisma migrate dev --name init
```

---

## 3. Data Migration (Seed Script)

Populate the database with default admin credentials and existing content from `content/projects.json`, `content/blog/*.mdx`, and careers data:

```bash
npx prisma db seed
# or
npm run db:seed
```

This will create:
- **Admin User**: Email `admin@vebtechno.com` / Password `AdminPassword123!` (or the credentials set in your `.env`)
- **Portfolio Projects**: Migrated from `content/projects.json`
- **Blog Posts**: Migrated from `content/blog/*.mdx`
- **Job Listings**: Migrated from default career positions

---

## 4. Logging in for the First Time

1. Start your local dev server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000/admin/login
   ```
3. Sign in with:
   - **Email**: `admin@vebtechno.com`
   - **Password**: `AdminPassword123!`

Upon successful login, you will be redirected to the **Admin Dashboard** (`/admin`).

---

## 5. How to Reset the Admin Password

If you ever need to reset or change the admin password, you can re-run the seed script after updating `ADMIN_PASSWORD` in `.env.local`, or run this quick Node/TypeScript command using `bcryptjs`:

```bash
npx tsx -e "
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function reset() {
  const hash = await bcrypt.hash('YOUR_NEW_PASSWORD_HERE', 12);
  await prisma.adminUser.update({
    where: { email: 'admin@vebtechno.com' },
    data: { hashedPassword: hash }
  });
  console.log('Password updated successfully!');
}
reset();
"
```

---

## 6. Features Overview

- **/admin**: Overview dashboard with entity counts and quick action links.
- **/admin/blog**: List, edit, publish/unpublish, and write new articles using the **Tiptap rich text editor**.
- **/admin/portfolio**: Manage portfolio case studies, upload cover/gallery images, and configure key metrics.
- **/admin/careers**: Manage active job positions with dynamic line-item list inputs for responsibilities and requirements.
- **Image Uploads**: Upload images directly through the UI. In production on Vercel, images are stored in **Vercel Blob**; in local development, they save automatically to `/public/uploads`.
