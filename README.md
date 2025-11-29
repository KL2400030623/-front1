# Food Saver — Demo Website

This is a small demo React app illustrating UI/UX, routing, validation, auth (client-side), API integration patterns, CRUD operations, local/session storage persistence, and Git usage notes.

Quick start (Windows PowerShell):

```powershell
cd "c:\Users\morth\OneDrive\Desktop\front end"
npm install
npm run dev
```

Open http://localhost:5173 in your browser (Vite's default port).

Notes:
- Authentication is a client-side demo that stores user records in `localStorage` and session state in `sessionStorage` for convenience.
- The API layer (`src/api/mockApi.js`) uses `localStorage` for persistence and shows where `axios` calls would be placed.

Suggested next steps:
- Hook `src/api/mockApi.js` to a real backend (Express / JSON Server / real API).
- Add stronger validation and password hashing on the server.
- Add tests and CI, and deploy.

Run both dev server and mock API together:

```powershell
npm run start:all
```

This will start `json-server` on port `4000` and the Vite dev server in parallel.
