# 🏕️ Heavenly Cabins
> **A comprehensive internal management portal for boutique hotel and cabin operations.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React Query](https://img.shields.io/badge/React_Query-Caching-FF4154?style=flat&logo=reactquery)](https://tanstack.com/query/latest)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

**[Live Demo](https://heavenly-cabins.vercel.app)** | **[Source Code](https://github.com/prashant-2006/Heavenly-Cabins)**

Heavenly Cabins is a robust, full-stack administrative dashboard designed to handle the complete lifecycle of hotel operations. Engineered with a focus on performance and data integrity, it utilizes advanced server-state caching, secure role-based access control, and interactive data visualization to track business metrics.

---

## 📸 Dashboard Preview

> **Note to Developer:** *Insert a high-quality GIF or screenshot here showcasing the dashboard charts, the check-in/out process, and the toast notifications working in real-time.*
> 
> `![Heavenly Cabins Demo](./public/demo.gif)`

---

## 🚀 Core Architecture & Features

### ⚡ Advanced Server-State Caching
* **React Query Integration:** Completely decoupled UI state from server state. Leveraged React Query for intelligent data fetching, background synchronization, and caching, dramatically reducing redundant network requests.
* **Optimistic UI Updates:** Implemented optimistic mutations for booking status changes (check-in/check-out) to ensure a zero-latency feel for the end-user.

### 🔒 Secure Authentication & Protected Routing
* **Supabase Authentication:** Engineered a secure login and onboarding workflow strictly for administrative personnel using Supabase Auth.
* **Protected App State:** Implemented React Router protected routes to prevent unauthenticated access to the dashboard, ensuring business data is only exposed to verified admins.
* **Row-Level Security (RLS):** Database operations are protected by Supabase RLS policies, securing cabin and booking mutations at the database layer.

### 📊 Interactive Data Visualization
* **Recharts Dashboard:** Built dynamic, responsive charts to visualize complex, aggregated booking data, revenue trends, and occupancy rates over custom date ranges.

### 🏨 Complete Booking Engine
* **Full CRUD Capabilities:** Admins can seamlessly provision new cabins, manage existing inventory, and delete outdated records.
* **Lifecycle Management:** Dedicated flows for managing guest arrivals (check-in), departures (check-out), and booking cancellations.

---

## 🛠️ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React (Vite), React Router DOM |
| **State Management** | React Query (TanStack Query) |
| **Backend & Database** | Supabase (PostgreSQL), Supabase Auth |
| **Styling & UI** | Tailwind CSS, React Hot Toast |
| **Data Visualization** | Recharts |

---

## ⚙️ Local Development Setup

Follow these steps to run the Heavenly Cabins admin panel locally.

### 1. Clone the repository
```bash
git clone [https://github.com/prashant-2006/Heavenly-Cabins.git](https://github.com/prashant-2006/Heavenly-Cabins.git)
cd Heavenly-Cabins
