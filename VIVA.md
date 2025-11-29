**UI/UX Design & Visual Aesthetics**: The app uses a simple responsive layout with clear headings, cards for content grouping, and consistent spacing and color accents. Use of readable font and contrast ensures accessibility basics.

**Routing & Navigation**: Implemented with `react-router-dom`. Routes: `/` (Home), `/auth` (Register/Login), `/dashboard` (user area). The `Nav` component shows links conditionally based on auth state.

**Form Validation & Error Handling**: Client-side validation checks email format and password length; registration checks duplicate emails. Errors are surfaced inline near inputs. Server-side validation is recommended in production.

**Authentication (Registration & Login)**: Demo stores users in `localStorage` (including passwords for simplicity) and saves current session in `sessionStorage`. `src/pages/Auth.jsx` handles register/login flows. In a real system, replace with secure server endpoints, hashed passwords, and secure tokens (JWT/OAuth).

**API Integration (Fetch / Axios)**: `src/api/mockApi.js` shows how to call an API with `axios` (commented example) and implements a localStorage fallback for the demo. Swap the implementation to call your server endpoints to enable real fetching.

**CRUD Operations**: Dashboard supports create, read, update, delete for food items. These operations call `mockApi` functions which persist data in `localStorage` for demo purposes.

**Data Persistence (Local / Session Storage)**: Users are stored in `localStorage` (persistent) and the current session is in `sessionStorage` (cleared on tab close). Items are saved in `localStorage` under `food_saver_items` key.

**Git Usage (Version Control)**:
- Initialize: `git init`
- Make small commits: `git add .` then `git commit -m "feat: scaffold Food Saver demo"`
- Use branches for features: `git checkout -b feature/auth`
- Push to remote: `git remote add origin <url>` then `git push -u origin main`

**Code & React Concept Understanding (Questioning / Viva)**:
- Explain how `useState` and `useEffect` manage state and lifecycle.
- Explain the difference between client-side routing (`react-router-dom`) and server-side routing.
- Discuss why storing plaintext passwords in `localStorage` is insecure and how to fix it.
- Explain how you'd replace `mockApi` with a real REST API and handle errors, retries, and loading states.

Use this doc to prepare answers during viva or code walkthroughs.
