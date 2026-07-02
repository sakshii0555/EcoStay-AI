# EcoStay AI

EcoStay AI is a full-stack web application that helps users discover eco-friendly homestays across different locations. The project uses a React frontend, a Node.js & Express backend, and MongoDB Atlas as the database.

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

---

## Why MongoDB?

MongoDB is used because it is:
- Flexible and schema-friendly
- Easy to integrate with Node.js using Mongoose
- Scalable for storing homestay information
- Cloud-hosted through MongoDB Atlas

---

## Database Schema

![Database Schema](assets/W5_SchemaDiagram_26100581.png)

---

## Project Structure

```
EcoStay-AI/
│
├── assets/
│   └── W5_SchemaDiagram_26100581.png
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── ecostay-ai/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

### 3. Start Backend Server

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal.

```bash
cd ecostay-ai
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## API Base URL

```
http://localhost:5000/api/homestays
```

---

## Available API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/homestays | Get all homestays |
| GET | /api/homestays/:id | Get homestay by ID |
| POST | /api/homestays | Create homestay |
| PUT | /api/homestays/:id | Update homestay |
| DELETE | /api/homestays/:id | Delete homestay |
| GET | /api/homestays/search/:location | Search by location |

---

## Features

- View eco-friendly homestays
- Add new homestays
- Update existing homestays
- Delete homestays
- Search homestays by location
- MongoDB Atlas integration
- RESTful CRUD APIs

---

## Author

**Sakshi Rawat**