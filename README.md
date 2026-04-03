# 📊 FinDash - Financial Dashboard UI

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)

A modern, responsive, and interactive financial dashboard built as a frontend development assessment. FinDash allows users to track their financial activity, view spending patterns, and manage transactions with a simulated role-based access control (RBAC) system.

## ✨ Live Demo
**https://findash-frontend-assessment.vercel.app/**

---

<img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/d370f7d4-2682-43d3-9105-aa542ce0932a" />
<img width="1917" height="1069" alt="image" src="https://github.com/user-attachments/assets/30e22394-9cc4-4d2a-b03c-272f6e8c206d" />

## 🚀 Key Features

* **Dynamic Data Visualizations:** Real-time balance trend line charts and categorical spending pie charts using Recharts.
* **Simulated RBAC (Role-Based Access Control):** Easily toggle between `Viewer` and `Admin` modes. Admins gain exclusive access to add or delete transactions.
* **Advanced Filtering & Search:** Instantly filter transactions by type (Income/Expense) or search by description/category using optimized, debounced inputs.
* **Interactive Modal Forms:** Clean UI for admins to add new transactions with form validation.
* **Pagination:** Efficient client-side pagination (5 items per page) to handle transaction lists without overwhelming the DOM.
* **Dark Mode Support:** Fully integrated, class-based dark mode that persists across navigation and dynamically updates chart UI.
* **Mobile-First Responsive Design:** Adapts flawlessly to any screen size, complete with a collapsible mobile hamburger navigation menu.
* **Toast Notifications:** Smooth, non-intrusive feedback for user actions.

---

## 🛠️ Tech Stack & Architecture

This project was built with modern React patterns, prioritizing clean architecture, performance, and scalability.

* **Framework:** React (via Vite for lightning-fast HMR and optimized builds)
* **Routing:** React Router v6 (Client-side routing with clean layout wrappers)
* **State Management:** Zustand (Chosen for its lightweight, boilerplate-free global state management)
* **Styling:** Tailwind CSS v4 (Utility-first styling, enabling rapid responsive design and dark mode implementation)
* **Data Visualization:** Recharts (Declarative, highly customizable, and natively responsive SVG charts)
* **Icons & UI Extras:** Lucide-React (Icons) & React-Hot-Toast (Notifications)

### 🧠 Architectural Decisions
1.  **Separation of Concerns:** Business logic and heavy calculations (like aggregating chart data and calculating balances) are extracted into custom hooks (e.g., `useFinancialMetrics`). Components are strictly responsible for rendering UI.
2.  **Performance Optimization:** The transaction search input utilizes a custom `useDebounce` hook to prevent excessive re-rendering and filtering operations while typing.
3.  **Modular Layouts:** Using React Router's `<Outlet />` pattern allows for a persistent navigation shell (`AppLayout`) while seamlessly swapping page content without full reloads.

---

## 🚦 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have Node.js installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Arnab-Pachal1234/findash-frontend-assessment.git
   ```

2. Navigate into the project directory:
   ```bash
   cd findash-frontend-assessment
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Open your browser and visit: http://localhost:5173

---

## 📝 Future Enhancements

If given more time, I would expand this project by adding:

* Backend Integration: Connect to a Node.js/Express API with a real database (PostgreSQL/MongoDB).
* Authentication: Implement actual JWT-based authentication instead of the frontend role simulation.
* Data Persistence: Utilize localStorage or sessionStorage to persist transactions between page reloads in the absence of a database.
* Export Functionality: Allow users to export their transaction table to a CSV or PDF file.

---

Designed and developed by Arnab Pachal.
