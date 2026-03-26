# JobFlow

A full-stack job application tracking system built with React, Node.js, Express, and MongoDB.

JobFlow allows users to manage their job search efficiently with authentication, user-specific data, and a clean dashboard experience.

---

## 🔍 Overview

JobFlow is designed to simulate a real-world product dashboard where users can:

- manage job applications
- track progress across different stages
- analyze response rates
- securely store personal job data

This project focuses on building a production-like full-stack application with proper architecture, authentication, and user experience considerations.

---

## ✨ Features

### 🔐 Authentication & Security

- JWT-based login and registration
- protected routes (frontend + backend)
- user-specific data isolation
- token-based API requests

---

### 📊 Dashboard

- application summary cards
- response tracking
- recent applications preview
- quick access to add new job form

---

### 📁 Applications Management

- add, edit, and delete job applications
- status tracking (Applied, Interview, Offer, Rejected)
- search across company, position, and notes
- filter and sort functionality
- notes support for additional context
- empty state handling

---

### 📈 Analytics

- application breakdown by status
- response count and response rate
- dynamically derived data from job list

---

### 🎯 UX Improvements

- password visibility toggle
- inline search clearing
- responsive layout
- clean and consistent UI hierarchy
- safe handling of missing data (optional chaining)

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- React Icons

### Backend

- Node.js
- Express

### Database

- MongoDB Atlas

### Authentication

- JSON Web Tokens (JWT)

---

## 📁 Project Structure

```bash
job-dashboard/
  server/
    src/
      models/
      routes/
      middleware/

  src/
    components/
      auth/
      dashboard/
      jobs/
      layout/

    hooks/
    pages/
    services/
    utils/
```

---

## 🧠 Key Implementation Details

### 1. Authentication Flow

- JWT token stored in localStorage
- protected routes on frontend
- backend middleware verifies token
- userId attached to requests for data isolation

### 2. User-specific Data Handling

Each job entry is linked to a user:

- users can only access their own data
- backend queries filter by `userId`
- prevents data leakage between accounts

### 3. Custom Hooks Architecture

Custom hooks manage logic separation:

- `useJobs` → CRUD + API integration
- `useApplicationFilters` → search, filter, sort
- `useJobForm` → form state and validation

### 4. Derived State & Analytics

Analytics are computed dynamically:

- response rate calculation
- status breakdown
- latest activity tracking

### 5. UI/UX Design Decisions

- minimal grayscale UI with clear hierarchy
- status-based color indicators
- form validation and error feedback
- consistent interaction patterns

---

## ▶️ Getting Started

### 1. Clone the repository

Frontend

```bash
git clone https://github.com/Joy-Juyoung/job-dashboard.git
cd job-dashboard
```

### 2. Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd server
npm install
```

### 3. Setup environment variables

Create a `.env` file inside the `/server` directory:

```bash
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Run the application

Backend

```bash
cd server
npm run dev
```

Frontend

```bash
npm run dev
```

### 5. Open in **browser**

```bash
http://localhost:5173
```

```md
You can create a new account using the registration page.
```

---

## 🌐 Deployment

Live demo: https://job-dashboard-steel-five.vercel.app/

---

## 📌 Future Improvements

- refresh token / auth persistence improvements
- pagination for large datasets
- better error handling UI
- mobile UX optimization

---

## 👤 Author

Juyoung Lee (Joy)

GitHub: https://github.com/Joy-Juyoung
