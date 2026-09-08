# 🛡️ bk.auditor® 

<div align="center">
  <img src="https://img.shields.io/badge/Built_with-Cursor_IDE-000000?style=for-the-badge&logo=cursor" alt="Built with Cursor" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=white" alt="Solana" />
</div>

<br />

**bk.auditor®** is a modern, full-stack Zero-Knowledge (ZK) auditing platform designed for enterprise environments. It allows corporations to cryptographically prove compliance (e.g., HR data, ESG metrics, Core Banking solvency) and anchor these proofs on the Solana blockchain—without ever exposing raw, sensitive Personally Identifiable Information (PII).

---

## 🤖 AI-Assisted Development with Cursor

This repository was architected and developed using the **[Cursor IDE](https://cursor.sh/)**. The codebase is structured to maximize the efficiency of AI-assisted coding, utilizing Cursor's unique features:

- **`Cmd+K` (Inline Generation):** Used extensively to rapidly prototype complex React components, Tailwind CSS styling, and Recharts integrations.
- **`Cmd+L` (Chat & Codebase Context):** The end-to-end Vercel Serverless + Express API architecture was refactored using Cursor's codebase indexing (`@Codebase`), allowing seamless bridging between the Vite frontend and the Firebase backend.
- **AI Debugging:** Complex asynchronous state updates, Top-Level Await ES module resolutions, and Vercel routing configurations (`vercel.json`) were solved using Cursor's terminal error integrations.

If you are cloning this repository, we highly recommend opening it in **Cursor** for the best developer experience.

---

## ✨ Key Features

- **🔌 Data Connectors:** Simulate secure handshake connections with legacy databases (Oracle, PostgreSQL, MongoDB).
- **🧠 AI Policy Generator:** Powered by Google Gemini, allowing compliance officers to type rules in plain English (e.g., *"Ensure all salaries are positive"*) and automatically translate them into SQL queries and ZK constraints.
- **🔐 ZK-SNARK Simulation:** Wallets act as cryptographic identities, signing transactions that mathematically prove data correctness without extracting raw data.
- **📄 Immutable Audit Seals:** Export cryptographically backed audit logs to CSV or PDF for regulatory bodies.
- **☁️ Vercel Ready:** Fully configured with `vercel.json` to deploy the Express backend as Serverless Functions alongside the static React frontend.

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend:** Node.js, Express (compiled as Vercel Serverless Functions via `api/index.ts`).
- **Database:** Firebase Firestore (NoSQL) for policies, connectors, and proof history.
- **AI Integration:** Google GenAI SDK (`@google/genai`).

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bk-auditor.git
cd bk-auditor
```

### 2. Install dependencies
*(Pro-tip: If using Cursor, just ask `Cmd+L`: "Install my dependencies and start the dev server")*
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your API keys.
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
Ensure your `firebase-applet-config.json` is present in the root folder for database connectivity.

### 4. Run the Development Server
```bash
npm run dev
```
The app will start the Vite frontend and the Express backend concurrently.

---

## ☁️ Deploying to Vercel

This project is fully optimized for Vercel deployment out-of-the-box. The `vercel.json` file dictates the routing, ensuring API calls (`/api/*`) are directed to the Node.js serverless backend.

1. Push your code to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import the repository.
4. **Important:** In the Vercel Environment Variables section, add your `GEMINI_API_KEY`.
5. Click **Deploy**.

Vercel will automatically run the build scripts defined in `package.json` (`vite build` and `esbuild`), bundle the backend, and serve the application globally.

---

## 📂 Project Structure

```text
bk-auditor/
├── api/
│   └── index.ts          # Vercel Serverless Function entry point (Express API)
├── src/
│   ├── components/       # Reusable UI components (Sidebar, Modals)
│   ├── views/            # Main pages (Dashboard, Proofs, Connectors, Manual)
│   ├── App.tsx           # Application router and layout
│   └── types.ts          # TypeScript global interfaces
├── firebase-applet-config.json # Firebase connection credentials
├── server.ts             # Local Express development server
├── vercel.json           # Vercel deployment configuration
└── package.json          # Build scripts and dependencies
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Developed at the speed of thought with Cursor.*
