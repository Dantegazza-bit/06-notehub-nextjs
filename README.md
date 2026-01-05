# NoteHub — Next.js Migration (SSR & CSR)

## 📌 Description
A multi-page notes application migrated from a SPA to Next.js using the App Router.
The project focuses on server-side rendering, client-side data fetching, and proper application structure with shared layout components.

## 🚀 Demo
06-notehub-nextjs-one-topaz.vercel.app

## 🛠 Tech Stack
- Next.js (App Router)
- TypeScript
- React
- CSS Modules
- Axios
- TanStack Query (React Query)
- Prettier

## 🧱 Application Structure
The application includes the following pages:
- `/` — Home page with general information about the app
- `/notes` — Notes list page with search and note creation
- `/notes/[id]` — Note details page (dynamic route)

A shared layout is implemented for all pages, including a global Header and Footer.

## ⚙️ Data Fetching & API
- API logic extracted into `lib/api.ts`
- Axios used for HTTP requests
- Environment variables configured with `NEXT_PUBLIC_*`
- Notes list and note details fetched from external API

## 🔄 SSR & CSR Integration
- Notes list page implemented as an SSR component with prefetching
- Client-side logic separated into `Notes.client.tsx`
- Note details page uses SSR with cache hydration
- Client components handle loading and error states

## 🧭 Routing & Navigation
- Dynamic routing for note details (`/notes/[id]`)
- Navigation implemented with Next.js Link component
- Shared Header and Footer across all routes

## ⏳ Loading & Error Handling
- Global loading state implemented via `loading.tsx`
- Error handling for:
  - Notes list (`/notes/error.tsx`)
  - Note details (`/notes/[id]/error.tsx`)
- Proper UI feedback for loading and error states

## 👤 My Contribution
- Migrated SPA application to Next.js App Router
- Implemented multi-page routing structure
- Built SSR pages with TanStack Query prefetching
- Separated client and server logic
- Implemented dynamic routes for note details
- Added loading and error handling
- Configured global layout with Header and Footer
- Deployed application to Vercel

## 📦 Deployment
The project is deployed on Vercel.
