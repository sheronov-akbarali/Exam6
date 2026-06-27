# Portfolio Web

This portfolio now includes a modern multi-page experience with routing, global state, translations, API-driven project data, and enhanced UX.

## Included features

- React + Vite frontend
- Redux Toolkit for theme, language, and favorites
- TanStack React Query for project data fetching and mutation
- React Router for Home, Skills, Projects, Project Details, Contact, and 404 pages
- i18n support for Uzbek, English, and Russian
- Express + JSON-backed API with CRUD project endpoints
- Search, filter, skeleton loading, toast notifications, mobile navigation, and smooth transitions

## Run locally

1. Install dependencies: npm install
2. Start the API server: npm run dev:server
3. Start the frontend: npm run dev
4. Open http://localhost:5173

## API endpoints

- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id
