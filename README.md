# WID2001: Knowledge Representation and Reasoning
## Group Project: Student Welfare Aid & Support Referral Expert System (FSKTM)

### 📋 Project Overview
This project is an **Expert System** designed to assist students at the Faculty of Computer Science and Information Technology (FSKTM) in identifying and applying for suitable welfare aid, financial assistance, and support services. 

Developed for the course **WID2001 Knowledge Representation and Reasoning (Semester 2, 2025/2026)**, the system utilizes a rule-based inference engine to provide advisory recommendations based on expert knowledge acquired from the FSKTM Student Affairs (TD HEP) office.

---

### 🌍 Sustainable Development Goals (SDG) Alignment
This project aligns with the following United Nations SDGs:
*   **SDG 4: Quality Education** – Ensuring that financial barriers do not prevent students from completing their higher education by providing timely access to welfare aid and scholarships.
*   **SDG 10: Reduced Inequalities** – Promoting social and economic inclusion for B40 and marginalized student groups through an equitable referral system for financial support.

---

### 🧠 Core Components
As required by the assignment, the prototype consists of three primary components:

1.  **Knowledge Base (KB):**
    *   Consists of **48 refined IF-THEN rules** derived from an expert interview with En. Ahmad (Representative of Deputy Dean Student Affairs, FSKTM).
    *   Covers domains including B40 Financial Aid, Student Disaster Relief, Scholarship Referrals, Counseling, and Accommodation support.
2.  **Inference Engine (IE):**
    *   Utilizes **Forward Chaining** to match user-provided facts (student status, income category, emergency situations) against the knowledge base to derive specific recommendations.
3.  **User Interface (UI):**
    *   A modern, responsive web application built with **React, TypeScript, and Tailwind CSS**.
    *   Features a multi-step "Assessment Wizard" for accurate data collection and a dynamic results dashboard.

---

### 🛠️ Technical Implementation
*   **Frontend Framework:** React 18 (Vite)
*   **Styling:** Tailwind CSS / Vanilla CSS
*   **Logic Engine:** Custom TypeScript-based Forward Chaining Engine
*   **Icons:** Lucide-React
*   **Animations:** Framer Motion

---

### 📂 Repository Structure
*   `src/logic/engine.ts`: The core inference engine containing the 48-rule knowledge base.
*   `src/components/AssessmentWizard.tsx`: The data acquisition module (UI).
*   `src/components/ResultsDisplay.tsx`: The explanation facility and recommendation output module.

---

### 🚀 Getting Started

#### Prerequisites
*   Node.js (v18 or higher)
*   npm

#### Installation
1.  Clone the repository
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

---

### 👥 Project Roles
*   **Project Manager:** Thian Xin Yi
*   **Knowledge Engineer:** Celine Leong, Kueh Zhi Ling
*   **Domain Expert:** Madeline Puah Yee Mun
*   **Programmer:** Ng Rou Rou
*   **Expected End User:** Chang Yong Qi

---

### 📜 Acknowledgments
Special thanks to the FSKTM Student Affairs Office and Madam Siti Nurul Aisyah binti Zulzaidi for providing the expert domain knowledge required to build this system.
