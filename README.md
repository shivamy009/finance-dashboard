# Finance Dashboard UI — Zorvyn Frontend Internship Assessment

<!-- REPLACE THIS LINK WITH YOUR HERO DASHBOARD SCREENSHOT -->
![Finance Dashboard Overview](./screenshot-hero.png)

Welcome to the Finance Dashboard UI, developed as part of the frontend engineering internship assessment for Zorvyn. This project is a highly interactive, extremely polished financial tracking application built with modern React.

🌟 **Live Deployment**: [View Dashboard on Vercel](https://finance-dashboard-cyan-kappa.vercel.app)

## 🚀 Overview of Approach

My approach to this assessment was to go beyond basic functionality and deliver a **production-ready, premium user experience** that heavily prioritizes performance, visual depth, and seamless interactions. 

Instead of relying on heavy pre-packaged component libraries, I implemented a bespoke **BentoGrid-inspired aesthetic** using pure Tailwind CSS v4. The structural architecture is deliberately decoupled—separating complex graphic background layers from the layout logic to ensure absolute stability, perfect responsive wrapping, and peak rendering performance.

State management is handled natively via the React Context API (`FinanceContext.jsx`). To thoroughly simulate real-world backend interaction, I engineered a robust mock data layer that artificially injects asynchronous network latency. This allowed for the implementation of graceful loading spinners and heavily staggered, cinematic entrance animations that trigger beautifully based purely on the user's viewport scrolling.

---

## ✨ Core Features & Visuals

### 🔐 1. Role-Based Dashboard Authorization (Admin vs Viewer)

<!-- REPLACE THIS LINK WITH YOUR ADMIN PANEL SCREENSHOT -->
![Admin Controls View](./view.gif)

* **Dynamic Permissions System**: A persistent, mock-authenticated state layout that shifts UI interfaces based on contextual roles.
* **Admin Privileges**: Unlocks total CRUD (Create, Read, Update, Delete) capability on the global transaction ledger. Fully manages localized datastore logic and grants access to export the live table straight into cleanly formatted `.json` files for external system handoffs.
* **Viewer Restrictions**: Lock-down state natively restricting edit/delete workflows and preventing bulk data downloads cleanly while accurately preserving analytics tracking access.

### 💎 2. Premium Bento Grid UI Architecture

<!-- REPLACE THIS LINK WITH A CLOSE-UP OF YOUR CARDS/ANIMATIONS -->
![UI Component Close-up](./dashboard.gif)

* **Physical Graphics**: Completely custom Tailwind configurations yielding deep ambient inner glows, frosted backdrop blurring, responsive hover escalation vectors (`hover:-translate-y-1`), and complex layered radial micro-dot textures.
* **Cinematic Entrance Effects**: Heavily integrated `framer-motion` timelines to orchestrate a hyper-smooth cascade-blur sequential animation every time elements scroll into the viewport.
* **Spring-Loaded Physics**: Bespoke, physics-driven (`useSpring`) numeric modules that smoothly count up financial injections live natively upon component initialization.

### 📊 3. Responsive Financial Intelligence

<!-- REPLACE THIS LINK WITH A SCREENSHOT OF YOUR CHARTS -->
![Analytics Insight Charting](./dashboard.gif)

* **Responsive Charting**: Beautifully customized analytical interfaces tracking daily expense gaps via responsive line-grids, and interactive doughnut architectures for deep category insight.
* **Contextual Insights Engine**: Seamlessly algorithms processing live data to deliver on-screen Cash Flow health markers and precise maximum-expense alerts natively connected to backend adjustments.
* **Refined Filtering Parameters**: Advanced search tracking and categorical segregation workflows mapped beautifully across the ledger hierarchy.

### 🌗 4. Native Thematic Syncing

<!-- REPLACE THIS LINK WITH A SCREENSHOT OF LIGHT/DARK THEME TOGGLE -->
![Theme System Support](./theme.gif)

* **Native OS Polishing**: Strict CSS `color-scheme` synchronization guarantees that native operating system components (like calendar menus and dropdown chevrons) seamlessly flip into dark or light variations natively, averting jarring white popouts.
* **Strict State Defaults**: Securely boots into Dark Mode orientation for visually optimal viewing parameters, allowing for session-specific toggle transitions manually.

---

## 🛠 Tech Stack

* **Core Framework**: React 18 powered by Vite
* **Styling Engine**: Tailwind CSS v4 (Zero pre-built UI dependency kits utilized)
* **Animation Protocol**: Framer Motion
* **Typography Array**: Google's Sora Font family / Lucide-React Vector Icons
* **Data Visualization**: Recharts
* **Utility Tools**: `date-fns` for strict chronological formatting, `clsx` / `tailwind-merge` for class deduplication.

## 📦 Local Setup Instructions

Ensure you have Node.js installed, then run the following command sequence in the root of the cloned directory to test the assessment environment:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Launch**: Open your testing browser and navigate to the local address Vite provides in the terminal (typically `http://localhost:5173`) to interact with the frontend dynamically.

Alternatively, you can test the production-ready build instantly without running local dependencies directly at:
👉 **[https://finance-dashboard-cyan-kappa.vercel.app](https://finance-dashboard-cyan-kappa.vercel.app)**

---
*Developed for the Zorvyn Frontend Engineering Internship Assessment.*
