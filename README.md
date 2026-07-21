# Veb Techno Inc — Premium IT Agency Website

Flagship production-ready website for **Veb Techno Inc**, built with Next.js 14+ (App Router, React 19), Tailwind CSS, TypeScript, Framer Motion, and shadcn/ui.

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

## 📁 Folder Structure

*   `app/` — App Router layouts, sitemaps, and pages (Home, About, Services, Portfolio, Blog, Careers, Contact).
*   `components/` — Nav/Footer layout layout shells, section components, and shared components (forms, animation cards).
*   `content/` — CMS-ready local JSON/MDX content for services, projects, team, testimonials, and blog posts.
*   `lib/` — Configuration constants, form validations, and utility functions.
*   `public/` — Shared assets, images, and icons.
*   `styles/` — Global styling and design system tokens.
*   `types/` — Structured TypeScript definitions.

## 🎨 Design System

All custom design tokens (navy scale, electric indigo accent, custom fonts, spacing grid, border radius, shadows, animations, glassmorphism) are defined in:
*   [styles/globals.css](styles/globals.css) using Tailwind CSS v4 `@theme inline` configuration.

## 🔧 Swapping Content / Adding a Headless CMS

*   **To edit static info**: Update files under `content/` (JSON and MDX files).
*   **To swap for a headless CMS (e.g. Sanity, Contentful, Strapi)**:
    1. Replace the file system fetches in `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/services/[slug]/page.tsx`, and `app/portfolio/[slug]/page.tsx` with a CMS API client fetch.
    2. Maintain the same data contracts defined in `types/index.ts`.
