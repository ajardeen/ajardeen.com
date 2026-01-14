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
    "https://drive.google.com/file/d/129BCxe3WNPqH2f56psCGFgHITHSNvvRy/view?usp=drive_link",
    // https://drive.usercontent.google.com/u/0/uc?id=129BCxe3WNPqH2f56psCGFgHITHSNvvRy&export=download
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
- **Front-End Developer** focused on building modern, responsive, and scalable web applications using **React**, **TypeScript**, and modern UI frameworks.
- Hands-on experience delivering **real-world projects** including management systems, dashboards, real-time applications, and user-focused platforms.
- Strong in translating requirements into clean, maintainable UI with attention to **UX, performance, and accessibility**.
- Built multiple **end-to-end MERN applications** such as:
  - Hostel Management System with payments, reports, and role-based access
  - Placement Management System with scheduling, analytics, and animations
  - Real-time Chat Application using Socket.IO and JWT authentication
- Comfortable working with **modern UI ecosystems** like Tailwind CSS, shadcn/ui, Radix UI, Framer Motion, and TanStack tools.
- Experienced in integrating **APIs, authentication, payments, email services**, and real-time features into front-end workflows.
- Actively improving skills through continuous learning, certifications, and hands-on experimentation.
- Passionate about building **clean UI, smooth interactions, and meaningful user experiences**.

`,
  timeZone: "Asia/Chennai",
  keywords: ["ajardeen", "mohamed"],
  dateCreated: "2023-10-20", // YYYY-MM-DD
} satisfies User;
