# 📝 Notes Management System

A full-stack MERN application for creating, managing, and searching notes — built with React, Node.js, Express, and MongoDB.

---

## 🎥 Demo

//


---

## ✨ Features

- 📄 Create, edit, delete, and view notes
- 🔍 Real-time search by title and content
- 📌 Pin important notes to the top
- 🏷️ Tag notes for easy categorization
- 🕐 Auto-updates `updatedAt` timestamp on every edit
- 💬 Confirmation dialog before deletion
- 📭 Empty state and loading state handling
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

| Layer     | Technology |
|-----------|-----------|
| Frontend | React 18, Vite, React Router DOM |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── models/
│   │   └── Note.js          # Mongoose schema
│   ├── routes/
│   │   └── notes.js         # All note API routes
│   ├── .env.example         # Environment variable template
│   ├── server.js            # Express app entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── notesApi.js  # Axios API calls
    │   ├── components/
    │   │   ├── NoteCard.jsx
    │   │   ├── NoteForm.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── ConfirmDialog.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   └── NotePage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## ⚙️ Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally  
  **OR** a free [MongoDB Atlas](https://cloud.mongodb.com/) cloud cluster



---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-management-system.git
cd notes-management-system
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create your `.env` file from the example:

Open `.env` and fill in your values:

```
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/notesapp
PORT=5000

# OR if using MongoDB Atlas, replace with your connection string:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/notesapp
```

Start the backend server:

```bash
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5000
```

---

### 3. Setup the Frontend

Open a **new terminal tab**, then:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### 4. Open the App

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

Both servers must be running at the same time:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/notes` | Get all notes | — |
| `GET` | `/notes?search=keyword` | Search notes | — |
| `GET` | `/notes/:id` | Get single note | — |
| `POST` | `/notes` | Create a note | `{ title, content, tags }` |
| `PUT` | `/notes/:id` | Update a note | `{ title, content, tags, pinned }` |
| `DELETE` | `/notes/:id` | Delete a note | — |

### Example Response

```json
{
  "success": true,
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "My First Note",
    "content": "This is the content of my note.",
    "tags": ["work", "ideas"],
    "pinned": false,
    "createdAt": "2024-06-01T10:00:00.000Z",
    "updatedAt": "2024-06-01T12:30:00.000Z"
  }
}
```

---

## 🗄️ Database Schema

```
Note {
  _id        ObjectId   (auto-generated)
  title      String     required, max 200 chars
  content    String     optional
  tags       [String]   default []
  pinned     Boolean    default false
  createdAt  Date       auto-managed
  updatedAt  Date       auto-managed (updates on every save)
}
```

---

## 🧪 Testing the States

| State | How to trigger |
|-------|---------------|
| **Loading state** | Add `await new Promise(r => setTimeout(r, 2000))` at top of GET /notes route temporarily |
| **Empty state** | Fresh database or delete all notes |
| **Search empty** | Search for a term that doesn't exist e.g. `xyzxyz` |
| **Error state** | Stop the backend server and refresh the frontend |

---


## 📸 Screenshots

<!-- Add screenshots of your app here after building -->
<!-- Drag and drop images into this section on GitHub, or use this format: -->

---

## 👤 Author

**Mohit Bharat Vishwakarma**  


---

## 📄 License

This project is for assignment/educational purposes.
