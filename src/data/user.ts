import type { User } from "@/types/user";
import avatar from "@/assets/images/profile.webp";

export const USER = {
  firstName: "Mohamed",
  lastName: "Ajardeen",
  fullName: "Mohamed Ajardeen",
  displayName: "Mohamed Ajardeen",
  username: "ajardeen",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Design Engineer",
    "Open Source Contributor",
  ],
  address: "Thiruvamiyur Chennai",
  phoneNumber: "KzkxOTk1MjE4NzUzOQ==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "bW5hemFyODc1NDBAZ21haWwuY29t", // base64 encoded
  website: "https://mohamed-ajardeen-portfolio.netlify.app/",
  resumeUrl:
    "https://drive.google.com/file/d/1WgCHffojsmD-AEBhD72hY77SJsspo-T-/view?usp=sharing",
  resumeDownloadUrl:
  "https://drive.google.com/uc?export=download&id=1WgCHffojsmD-AEBhD72hY77SJsspo-T-",

  jobTitle: "Junior Full Stack Developer",
  jobs: [
    {
      title: "FrontEnd Developer",
      company: "KJB Solution",
      website: "#",
    },
  ],

  avatar: avatar,

  about: `
- **Front-End Developer** with **1+ year of professional experience** focused on building modern, responsive, and scalable web applications using **React 18.3.1**, **TypeScript**, and **Vite**.
- Proven track record of leading **full-stack architecture** from the ground up [cite: 1], including folder structure design and coordinating development workflows[cite: 1].
- Expert in delivering **real-world enterprise projects** including Channel Managers, POS systems[cite: 1], and user-focused management platforms.
- Specialized in **high-performance state management** using **TanStack Query (v5)** and **Zustand** to optimize data caching and CRUD synchronization[cite: 1].
- Skilled in building **comprehensive design systems** and reusable component libraries using **Tailwind CSS V4**, **shadcn/ui**, and **Material UI**[cite: 1].
- Experienced in **hardware and backend integration**, specifically developing Node.js modules for automated thermal printing and PDF generation[cite: 1].
- Built multiple **end-to-end MERN applications** including:
  - **KJB POS:** A retail/restaurant system with KOT, billing, and inventory modules[cite: 1].
  - **LBL Business Portal:** A food delivery subscription brand and administrative suite.
  - **Hostel Management System:** Featuring responsive layouts, dark/light themes, and modern visualizations.
- Strong focus on translating business requirements into clean, maintainable code with a deep commitment to **UX, performance, and accessibility**.
- Passionate about integrating **AI models (Gemini/LLMs)** and automation into web ecosystems to create meaningful user experiences.
`,
  timeZone: "Asia/Chennai",
  keywords: ["ajardeen", "mohamed"],
  dateCreated: "2026-1-1", // YYYY-MM-DD
} satisfies User;
