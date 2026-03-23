# Job Dashboard

A frontend job application tracking dashboard built with React and Tailwind CSS.

This project was built to practice building a real-world frontend application with clean architecture, reusable components, and thoughtful UI/UX design.

---

## 🔍 Overview

Job Dashboard allows users to:

- track job applications
- manage application status
- filter and search records
- review application progress through analytics

The goal of this project was to simulate a real product dashboard and improve frontend development skills beyond simple UI cloning.

---

## ✨ Features

### Dashboard

- application summary cards
- recent applications preview
- quick access to add new job form

### Applications

- add, edit, and delete job applications
- filter by status (Applied, Interview, Offer, Rejected)
- search by company or position
- reset filters
- responsive list-based management UI

### Analytics

- application status breakdown
- response count and response rate
- visual chart representation using Recharts

---

## 🛠 Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- React Icons
- localStorage

---

## 📁 Project Structure

```bash
src/
  components/
    layout/
      Header.jsx
      MainLayout.jsx
      Sidebar.jsx

    jobs/
      AddJobForm.jsx
      ApplicationRow.jsx
      ApplicationsControls.jsx
      JobCard.jsx
      StatCard.jsx
      StatusBadge.jsx
      StatusFilter.jsx

  data/
    jobs.js

  hooks/
    useJobs.js

  pages/
    DashboardPage.jsx
    ApplicationsPage.jsx
    AnalyticsPage.jsx

  App.jsx
  main.jsx
```

## 🧠 Key Implementation Details

### 1. Custom hook for state management

The `useJobs` hook centralizes:

- job CRUD logic (add, update, delete)
- localStorage persistence
- dashboard summary calculations
- analytics data generation

This improves separation of concerns and keeps UI components clean.

---

### 2. Component-based architecture

The UI is built using reusable components such as:

- StatCard
- ApplicationRow
- StatusBadge
- ApplicationsControls
- AddJobForm

This ensures scalability and consistency across the application.

---

### 3. Page-based routing structure

The application is divided into:

- Dashboard (overview)
- Applications (management)
- Analytics (data insights)

Each page has a clear responsibility, similar to real-world admin dashboards.

---

### 4. Derived analytics logic

Analytics data is calculated dynamically from the job list:

- total applications
- interviews, offers, rejections
- pending applications
- response rate

This demonstrates data transformation and state-driven UI.

---

### 5. UI/UX considerations

- consistent button hierarchy (primary / secondary / actions)
- minimal grayscale design with color reserved for status indicators
- list-based layout for better management experience
- responsive sidebar and mobile navigation
- inline search clearing and filter UX improvements

---

## 🚧 Future Improvements

- backend API integration (REST)
- authentication (login/signup)
- persistent cloud database
- form validation and error handling
- sorting and pagination
- confirmation modal for delete actions

---

## ▶️ Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

---

## 🌐 Deployment

Live demo: https://job-dashboard-steel-five.vercel.app/

---

## 👤 Author

Juyoung Lee (Joy)

GitHub: https://github.com/Joy-Juyoung
