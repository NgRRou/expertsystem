# WID2001: Knowledge Representation and Reasoning
## Group Project: Student Welfare Aid & Support Referral Expert System (FSKTM)

### 📋 Project Overview
This project is an **Expert System** designed to assist students at the Faculty of Computer Science and Information Technology (FSKTM) in identifying and applying for suitable welfare aid, financial assistance, and support services. 

Developed for the course **WID2001 Knowledge Representation and Reasoning (Semester 2, 2025/2026)**, the system utilizes a rule-based inference engine to provide advisory recommendations based on expert knowledge acquired from the FSKTM Student Affairs (TD HEP) office.

---

### 🌍 Sustainable Development Goals (SDG) Alignment
This project aligns with the following United Nations SDGs:
*   **SDG 1: No Poverty** – Directly assisting B40 and underprivileged students with financial, food, and disaster relief aid to alleviate student economic hardships.

---

### 🧠 Core Components
As required by the assignment, the prototype consists of three primary components:

1.  **Knowledge Base (KB):**
    *   Consists of **48 refined IF-THEN rules** derived from an expert interview with En. Ahmad (Representative of Deputy Dean Student Affairs, FSKTM).
    *   Covers domains including B40 Financial Aid, Student Disaster Relief, Scholarship Referrals, Counseling, and Accommodation support.
2.  **Inference Engine (IE):**
    *   Utilizes the **Experta Expert System Shell** in a Python backend, implementing the Rete Algorithm for highly efficient, data-driven Forward Chaining.
3.  **User Interface (UI):**
    *   A modern, responsive web application built with **React, TypeScript, and Tailwind CSS**. Communicates with the Experta engine via a FastAPI REST interface.

---

### 🛠️ Technical Implementation
*   **Inference Engine:** Python, Experta (Rete Algorithm)
*   **API Layer:** FastAPI, Uvicorn
*   **Frontend Framework:** React 18 (Vite), TypeScript
*   **Styling & UI:** Tailwind CSS, Framer Motion, Lucide-React

---

### 📂 Repository Structure
*   `backend.py`: The core Python inference engine containing the 48-rule knowledge base (built with Experta) and FastAPI server.
*   `src/components/AssessmentWizard.tsx`: The frontend data acquisition module (UI).
*   `src/components/ResultsDisplay.tsx`: The explanation facility and recommendation output module.

---

### 🚀 Getting Started

#### Prerequisites
*   Node.js (v18 or higher)
*   Python 3.x
*   npm & pip

#### Installation & Running

1.  Clone the repository and install frontend dependencies:
    ```bash
    npm install
    ```
2.  Install backend dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start the Experta Python Backend (Terminal 1):
    ```bash
    python backend.py
    ```
4.  Start the React Frontend (Terminal 2):
    ```bash
    npm run dev
    ```
5.  Open `http://localhost:3000` in your browser.

---

### 👥 Project Roles
*   **Project Manager:** Thian Xin Yi
*   **Knowledge Engineers:** Celine Leong, Kueh Zhi Ling
*   **Domain Expert:** Madeline Puah Yee Mun
*   **Programmer:** Ng Rou Rou
*   **End User:** Chang Yong Qi

---

### 📜 Acknowledgments
Special thanks to the FSKTM Student Affairs Office and Madam Siti Nurul Aisyah binti Zulzaidi for providing the expert domain knowledge required to build this system.
