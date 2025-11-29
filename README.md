# Food Saver — Demo Website

[![CI](https://github.com/KL2400030623/-front1/actions/workflows/ci.yml/badge.svg)](https://github.com/KL2400030623/-front1/actions)
[![Deploy](https://github.com/KL2400030623/-front1/actions/workflows/deploy.yml/badge.svg)](https://github.com/KL2400030623/-front1/actions)

Live: https://KL2400030623.github.io/-front1/

Small demo React app for tracking food items, showing expiry reminders, and experimenting with CRUD, auth (client-side), and deployments.

Quick start (Windows PowerShell):

```powershell
cd "c:\Users\morth\OneDrive\Desktop\front end"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser (Vite's default port).

Run both dev server and mock API together:

```powershell
npm run start:all
```

This starts `json-server` on port `4000` and Vite in parallel.

Deployment
---------

This repository includes a GitHub Actions workflow that builds the app and deploys the generated `dist` to GitHub Pages. After pushing to `main` the workflow will publish the site to the `gh-pages` branch. The Pages URL will typically be:

`https://<your-username>.github.io/<repo-name>/`

Badges
------

Build status (Actions) and Pages will appear in the repository's Actions and Pages tabs after the first push.

Notes
-----

- Authentication and persistence are client-side for demo purposes only. Do not use this approach for production apps.
- The API wrapper `src/api/mockApi.js` prefers a local `json-server` but falls back to `localStorage` when the server is not available.

Next steps
----------

- Add server-side authentication and hashed passwords for production.
- Expand tests (unit + e2e) and add linting.
- Replace demo data storage with a real backend.

