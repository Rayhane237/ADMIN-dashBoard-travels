# Phnes Travels — Admin Dashboard
<img width="950" height="382" alt="image" src="https://github.com/user-attachments/assets/fd202a99-17b7-4771-b800-e7637834015a" />
<img width="950" height="346" alt="image" src="https://github.com/user-attachments/assets/c3ee81ec-0833-4b11-89f6-618dede1d710" />

<img width="949" height="392" alt="image" src="https://github.com/user-attachments/assets/e93a9230-83eb-4c89-b148-376a01427a21" />


The administration panel for Phnes Travels, a full-stack travel booking platform. This dashboard gives administrators full control over flight and hotel listings, customer bookings, user accounts, and site content.

**Live dashboard:**available on request
**Customer-facing app:** https://travalagency-eight.vercel.app
**API:** https://travelagency-backend-r.onrender.com (shared backend — see [Travel-Agency-backend-r](#))

---

## Overview

This is one of three applications that make up Phnes Travels. It's a standalone React app that communicates with the same backend API used by the customer-facing site, but every route it calls is protected by admin-only authentication.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| UI components | Material UI (MUI), MUI X Data Grid |
| Authentication | JWT (Bearer token), role-based access control |
| Deployment | Vercel |

---

## Features

- **Overview** — live statistics across all resources (bookings, listings, users, messages, employees)
- **Flights / Hotels** — view all customer bookings with full listing details (destination, price, image) attached
- **Flight Listings / Hotel Listings** — full CRUD for bookable inventory, including an active/inactive toggle that controls visibility on the customer site
- **Employees** — manage team member profiles shown on the public About Us page
- **Messages** — view and manage contact form submissions
- **Users** — view all registered accounts, promote or demote admin access, delete accounts
- **Light / dark theme** toggle, persisted across sessions
- **Secure authentication** — JWT-based, with automatic session refresh via httpOnly cookies

---

## Project structure

```
src/
├── api/            # One file per resource — thin wrappers around backend calls
├── Components/     # Reusable UI: DataTable, ConfirmDialog, ListingFormDialog, layout
├── context/        # Auth and theme context providers
├── pages/          # One folder per admin section
├── Routes/          # Route protection (ProtectedRoute)
└── theme.js         # Light/dark theme definitions
```

Every manageable resource (listings, employees, bookings) follows the same pattern: a `DataTable` for listing records, a `ConfirmDialog` for deletion, and — where applicable — a shared `ListingFormDialog` for create/edit, parameterized per resource.

---

## Running locally

Create a `.env` file with:

```
VITE_API_ROOT_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api/admin
```

*(Requires the backend running locally — see the backend repo's README. Contact the author for development credentials.)*

```bash
npm install
npm run dev
```

An admin account is required to log in. Admin accounts are promoted via the backend's seed script or by an existing admin through the Users page.

---

## Author

Tliba Rayhane — Computer Science student, École Normale Supérieure de Kouba (ENSK)
