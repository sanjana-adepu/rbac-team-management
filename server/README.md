# Backend - MERN RBAC Team Management System

## Overview
This backend implements a Role-Based Access Control (RBAC) system using Node.js, Express, and MongoDB.

Users can belong to multiple teams and have different roles in each team. Permissions are dynamically resolved based on user-team-role mapping.

---

## Core Concept
**User + Team → Role → Permissions**

---

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env`
Copy from `.env.example`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Run server
```bash
npm run dev
```

---

## Authentication
- JWT-based authentication
- Passwords are hashed using bcrypt
- Protected routes via middleware

---

## Data Models
- User
- Team
- Role
- Permission
- Membership (User-Team-Role mapping)

---

## Roles & Permissions

| Role    | Permissions |
|---------|------------|
| Admin   | Full access (Users + Tasks) |
| Manager | CRUD Tasks |
| Viewer  | View only |

---

## APIs

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Users
- GET `/api/users`

### Teams
- POST `/api/teams`
- GET `/api/teams`
- GET `/api/teams/my-teams`

### Roles & Permissions
- POST `/api/roles`
- GET `/api/roles`

### Membership
- POST `/api/membership/assign-role`
- GET `/api/membership/permissions`
- GET `/api/membership/my-memberships`

### Tasks
- POST `/api/tasks`
- GET `/api/tasks`
- PUT `/api/tasks/:taskId`
- DELETE `/api/tasks/:taskId`

---

## RBAC Middleware
Permission enforcement is handled via middleware:

```js
protect → checkPermission("ACTION")
```

---

## Seed Data

Run:
```bash
node seed.js
```

Default password:
```
123456
```

---

## Design Decisions
- Roles are scoped per team using Membership model
- Permissions are not hardcoded
- Dynamic permission resolution
- Middleware-based authorization

---

## Future Improvements
- Pagination
- Global admin role
- Logging & monitoring
