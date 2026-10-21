<div align="center">

# 🏨 Karnid International Hotel & SPA
### Management System

A comprehensive, full-stack web application designed to streamline hotel operations, from room bookings and guest management to SPA scheduling and financial reporting.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

</div>

---

## 📑 Table of Contents
1. [About the Project](#-about-the-project)
2. [Core Modules](#-core-modules)
3. [System Architecture](#-system-architecture)
4. [Database Design](#-database-design)
5. [Tech Stack](#-tech-stack)
6. [Installation & Setup](#-installation--setup)
7. [Default Credentials](#-default-credentials)
8. [Screenshots](#-screenshots)
9. [Future Enhancements](#-future-enhancements)

---

## 📖 About the Project

**Karnid International Hotel & SPA** is a custom-built Property Management System (PMS) developed as a final-year college project. It replaces manual paper-based systems with a centralized digital platform, allowing receptionists and administrators to manage daily hotel operations efficiently.

### The Problem It Solves
- **Double-Booking:** Prevents two guests from booking the same room for overlapping dates using custom SQL date-overlap logic.
- **Revenue Leakage:** Tracks partial and full payments to ensure no guest checks out without a settled invoice.
- **Disorganized SPA:** Manages wellness treatments independently from room bookings.

---

## 🚀 Core Modules

### 🔐 1. Authentication & Access Control
- Secure login/logout using **bcrypt** for password hashing and **express-session** for session management.
- Role-based access control (Admin vs. Receptionist).
- Protected routes ensuring unauthenticated users cannot access the system.

### 📊 2. Command Center (Dashboard)
- Real-time KPI cards: Occupancy Rate, Today's Arrivals, Today's Departures, and Total Collected Revenue.
- **Interactive Doughnut Chart** (Chart.js) visualising the live status of all rooms (Available, Occupied, Cleaning, Maintenance).
- Quick-access shortcuts to create new bookings or SPA appointments.

### 🛏️ 3. Room Management
- Full CRUD operations (Create, Read, Update, Delete) for rooms.
- Room status tracking: `Available`, `Occupied`, `Cleaning`, `Maintenance`.
- Integration with Room Types (Standard, Deluxe, Executive, Suite, Presidential) featuring base pricing and capacity.
- High-quality image display for each room category.

### 👥 4. Guest Management
- Maintain a database of guest profiles (Contact info, Country, ID Proofs).
- Fast search functionality filtering by name, email, or phone number.
- Notes section for VIP preferences or allergies.

### 📅 5. Reservations Engine
- Seamless booking process selecting a guest, room, and date range.
- **Automated Price Calculation:** Calculates total cost based on room rate × number of nights.
- **Double-Booking Prevention:** A dedicated `availabilityService.js` checks for date overlaps (`check_in < new_check_out AND check_out > new_check_in`) and rejects conflicting bookings.
- State machine workflow: `Booked` → `Checked In` → `Checked Out` / `Cancelled`.

### 🧾 6. Billing & Invoices
- Automatically redirects to an invoice page upon guest check-out.
- Printable invoice layout (CSS `@media print` optimization).
- Tracks payment history (Cash, Credit Card, Bank Transfer).
- Dynamically calculates the remaining balance due.

### 💆 7. SPA Services Module
- A catalog of wellness treatments (Swedish Massage, Deep Tissue, Facials, Sauna).
- Independent scheduling system linking guests to treatments.
- Track appointment statuses: `Scheduled`, `Completed`, `Cancelled`.

---

## 🏗️ System Architecture

This project follows the **MVC (Model-View-Controller)** architectural pattern:

- **Models (`/models`)**: Sequelize ORM schemas defining the database tables and associations.
- **Views (`/views`)**: EJS templates rendering the user interface using Bootstrap 5.
- **Controllers (`/controllers`)**: Handles the business logic, requests, and responses.
- **Services (`/services`)**: Contains complex business logic separated from controllers (e.g., Availability checking).
- **Routes (`/routes`)**: Maps HTTP endpoints to controller functions.
- **Migrations & Seeders (`/migrations`, `/seeders`)**: Version controls the database schema and populates initial demo data.

### Folder Structure
```text
hotel-management/
├── config/          # Database configuration
├── controllers/     # Route logic (Auth, Rooms, Guests, etc.)
├── middlewares/     # Auth protection middleware
├── migrations/      # Sequelize database migrations (Version Control)
├── models/          # Sequelize models & associations
├── public/          # Static assets (CSS, Images, Logos)
├── routes/          # Express route definitions
├── seeders/         # Demo data for testing
├── services/        # Complex business logic (Double-booking prevention)
├── views/           # EJS templates (UI)
├── app.js           # Express app configuration
├── server.js        # Entry point
└── .env             # Environment variables (Not committed)
