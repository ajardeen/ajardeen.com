import type { User } from "@/types/user";
import avatar from "@/assets/images/profile.webp";

export const USER = {
  firstName: "Mohamed",
  lastName: "Ajardeen",
  fullName: "Mohamed Ajardeen",
  displayName: "Mohamed Ajardeen",
  openToWork: true,
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
-  Frontend developer with 1+ years of experience, known for pixel-perfect execution and strong attention to small details.
- Passionate about exploring modern technologies, AI integration, and turning complex business requirements into polished, production-ready products.
- Built multiple real-world platforms including POS, inventory, and food delivery systems, along with an AI-enabled developer portfolio and reusable design systems like  [TemplateUI](https://template-uii.netlify.app/)  for enterprise applications.
`,
  timeZone: "Asia/Chennai",
  keywords: ["ajardeen", "mohamed"],
  dateCreated: "2026-1-1", // YYYY-MM-DD
} satisfies User;
