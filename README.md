# Agile Task Manager (MERN Stack)

[![Live Demo](https://img.shields.io/badge/demo-online-green)](https://task-manager-app-sage-one.vercel.app/)

A full-stack task management application designed with a focus on user experience and secure data handling. This project implements a modern MERN (MongoDB, Express, React, Node.js) architecture with a dynamic Kanban-style board for agile task tracking.

## 🚀 Live Demo

You can access the live application here: [Task Manager App](https://task-manager-app-sage-one.vercel.app/)

---

## ✨ Key Features

- **Secure Authentication**: Implemented JWT (JSON Web Tokens) for user sign-up and login with password hashing.
- **Full CRUD Operations**: Users can create, read, edit, and delete tasks in real-time.
- **Dynamic Views**: Seamlessly switch between **List View** and **Kanban Board** view based on task priority.
- **Priority Management**: Categorize tasks by `Low`, `Medium`, or `High` priority with visual color indicators.
- **Status Persistence**: Tasks state (completed/pending) is persisted in a MongoDB cloud database.
- **Protected Routes**: Frontend routes are guarded to ensure only authenticated users can access task data.

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, Axios, CSS Modules.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Cloud).
- **Authentication**: JWT, bcryptjs.
- **Deployment**: Vercel (Frontend), Render (Backend).

## 📐 Architecture & Logic (For Interviewers)

- **Separation of Concerns**: The project is split into a clear `frontend` and `backend` structure.
- **Middleware**: Used custom Express middleware for authentication and error handling.
- **State Management**: Utilized React Context API to manage global authentication state across the application.
- **RESTful API**: Designed a clean RESTful interface for all resource operations.

## ⚙️ Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lmnst/task-manager-app.git
   ```

2. **Backend Setup**:

   ```
   cd backend
   npm install
   # Create a .env file with:
   # MONGO_URI=your_mongodb_uri
   # JWT_SECRET=your_secret_key
   npm start
   ```

3. **Frontend Setup**:

   ```
   cd frontend
   npm install
   # Create a .env file with:
   # VITE_API_BASE_URL=http://localhost:5000
   npm run dev
   ```

Developed by Zhuangyu Zhou - CS Master Student at Uni-Bonn
