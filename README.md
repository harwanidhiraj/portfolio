# 🚀 Full-Stack Dynamic Portfolio with Admin Panel (React + Node.js + TypeScript)

A fully dynamic and visually impressive developer portfolio with:

- ✅ Beautiful frontend in React + TypeScript
- ✅ Secure admin panel to manage content
- ✅ Contact form with email integration
- ✅ Backend APIs using Node.js + Express
- ✅ Protected routes, animations, and toast notifications

---

## ✨ Features

### 👨‍💻 Portfolio Frontend

- Home page with animated typewriter intro
- About, Skills, Experience, Projects, Contact pages
- Beautiful icons, transitions, and animations
- Responsive design (mobile-friendly)
- Resume download button
- Dynamic content fetched via APIs

### 🔐 Admin Panel

- Secure login for admin
- CRUD management for:
  - Profile
  - Skills
  - Experience
  - Projects
  - Contact Messages
- Logout with confirmation modal
- Reusable ConfirmModal for deletions
- All UI built with TailwindCSS

### 🔧 Backend (API)

- Node.js + Express REST APIs
- JWT-based authentication
- MongoDB with Mongoose (assumed)
- Contact form sends email via Nodemailer

---

## 🛠️ Tech Stack

| Layer      | Tech                                |
| ---------- | ----------------------------------- |
| Frontend   | React + Vite + TypeScript           |
| Styling    | Tailwind CSS, React Icons           |
| State Mgmt | useState + API-based dynamic data   |
| Backend    | Node.js, Express, JWT, Nodemailer   |
| Database   | MongoDB (via Mongoose)              |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🔧 Project Structure

```bash
.
├── client/           # React + TS frontend
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── main.tsx
│
├── backend/          # Node.js + Express API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
```
