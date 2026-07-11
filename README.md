# 🌿 EcoStay AI

EcoStay AI is an AI-powered Homestay & Eco-Tourism Platform that promotes sustainable travel by helping users discover eco-friendly homestays and plan smarter trips.

## 🚀 Features

- 🔐 User Authentication (Register/Login)
- 🔑 JWT Authentication
- 🌐 Google OAuth Login
- 🛡️ Protected Routes
- 🏡 Homestay CRUD Operations
- 🔍 Search Homestays
- 🚦 API Rate Limiting
- 🤖 AI Travel Planner *(In Progress)*

## 🛠 Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

**Authentication**
- JWT
- Passport.js
- Google OAuth
- bcrypt.js

## 📂 Project Structure

```
EcoStay-AI
├── frontend
├── backend
└── README.md
```

## ⚙️ Installation

```bash
# Clone Repository
git clone <your-repository-url>

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`

### Homestays
- `GET /api/homestays`
- `GET /api/homestays/search`
- `POST /api/homestays` *(Protected)*
- `PUT /api/homestays/:id` *(Protected)*
- `DELETE /api/homestays/:id` *(Protected)*

## 📌 Status

✅ Authentication Completed  
✅ Google OAuth  
✅ JWT Protected APIs  
✅ Homestay CRUD  
🚧 AI Travel Planner (In Progress)

## 👩‍💻 Developer

**Sakshi Rawat**  
B.Tech CSE | Graphic Era Hill University

**Sakshi Rawat**



