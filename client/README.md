# Frontend - MERN RBAC Team Management System

## Overview
This is the frontend for the RBAC system built using React (Vite) and Material UI.

It dynamically renders UI based on permissions fetched from the backend.

---

## Tech Stack
- React (Vite)
- Material UI (MUI)
- Axios
- React Router

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env`
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run app
```bash
npm run dev
```

---

## Authentication Flow
- Login/Register using JWT
- Token stored in localStorage
- Axios interceptor attaches token to requests

---

## App Flow
**Login → Dashboard → Teams → Tasks**

---

## Features
- Login & Register UI
- Protected routes
- Team-based navigation
- Membership dashboard (table view)
- Task management (CRUD)
- Permission-based UI rendering

---

## Components
- Navbar
- ProtectedRoute
- ReusableTable
- Task UI (DataGrid / Table)

---

## RBAC in UI

UI elements are shown based on permissions:

| Permission   | UI Behavior         |
|--------------|--------------------|
| CREATE_TASK  | Show create button |
| EDIT_TASK    | Show edit option   |
| DELETE_TASK  | Show delete button |
| VIEW_ONLY    | Show tasks         |

---

## UI Features
- Material UI components
- Reusable table component
- Cards for teams
- Toast notifications
- Clean layout

---

## Design Decisions
- No user selection (uses logged-in user)
- Team selection controls context
- Reusable components for scalability

---

## Future Improvements
- Pagination
- Better loading states
- Advanced filtering
