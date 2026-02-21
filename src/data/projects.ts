import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "lunchbox-legends",
    title: "Lunchbox Legends",
    period: {
      start: "10.2025",
    },
    link: "https://lunchboxlegends.netlify.app/",
    skills: [
      "React Native",
      "React (Vite)",
      "Node.js",
      "Express.js",
      "WebSockets",
      "REST API",
      "UPI Integration",
      "Firebase",
      "Role-Based Access",
      "Realtime Systems",
    ],
    shortDescription:
      "Full-stack food ordering and delivery platform with real-time kitchen, rider, and admin workflows powered by React Native and Node.js.",

    description: `
- Designed and developed a complete food ordering ecosystem including a React Native mobile app, a role-based admin platform ([Admin Dashboard](https://vabook.netlify.app/)), and a Node.js/Express backend supporting real-time workflows via WebSockets.

- Built subscription-based bundle ordering (daily, weekly, monthly) allowing customers to browse menus, place orders with UPI payments, and receive automated menu allocation once admin approval is completed.

- Implemented role-based architecture with dedicated interfaces for Admin, Kitchen, Rider, and Customer, enabling streamlined order lifecycle from preparation to delivery tracking.

- Developed real-time kitchen workflow where daily menus are automatically filtered and pushed to kitchen screens, reducing manual coordination and improving operational efficiency.

- Created rider delivery flow with live order updates, location tracking, and status synchronization between mobile and web clients to maintain accurate delivery progress.

- Built landing page with pre-registration system ([Landing Page](https://lunchboxlegends.netlify.app/)) storing user onboarding data in Firebase for early access and marketing validation.

- Structured scalable REST APIs handling mobile and admin dashboards from a unified backend service, enabling efficient data flow and consistent business logic across platforms.

- Currently expanding platform capabilities with OTP authentication, advanced reporting, and enhanced payment workflows to support production-scale deployment.

**Quick Links**

* 🌐 Landing Page — https://lunchboxlegends.netlify.app/
* 🧑‍💻 Admin / Kitchen / Rider Dashboard — https://vabook.netlify.app/

`,

    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768222582/Lunchbox-legends_ptewjk.webp",
    imageUrls: [
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228344/lbl_4_xfurhr.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228344/lbl_3_rn7yho.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228345/lbl_1_a9pr2z.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228343/lbl_2_jejpij.webp",
    ],
    cardUi: true,
    isExpanded: true,
    isUnderDevelopment: true,
  },
  // 1️⃣ CARD UI
{
  id: "hostel-management-system",
  title: "Hostel Management System",
  period: { start: "06.2024" },
  logo:"https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321239/hosteledge_mtjdgc.webp",
  link: "https://hosteledge-management-system-ajar.netlify.app/",
  skills: [
    "React",
    "TailwindCSS",
    "Node.js",
    "Express",
    "MongoDB",
    "PayPal",
    "NodeMailer",
  ],
  shortDescription:
    "Full-stack hostel operations platform with billing, maintenance workflows, and role-based dashboards.",

  description: `
A full-stack hostel management system focused on workflow automation and structured administration.

- Built room allocation system with real-time availability tracking and automated billing workflows.
- Implemented maintenance lifecycle with task monitoring and staff coordination.
- Developed financial dashboards with chart-based reporting.
- Designed role-based access control and email notification flows.

**Quick Links**
- 🌐 Live Demo — https://hosteledge-management-system-ajar.netlify.app/
- 💻 Frontend — https://github.com/ajardeen/Hostel-Management-Frontend
- ⚙️ Backend — https://github.com/ajardeen/Hostel_Management_Backend
`,
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325743/hostel1_nurr8u.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325748/hostel2_ffatcx.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325746/hostel3_qukrvi.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325751/hostel4_e6vsjx.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325754/hostel5_w2wbfn.webp"
  ],
  videoUrl: "",
  cardUi: true,
},

{
  id: "placement-management-system",
  title: "Placement Management System",
  period: { start: "05.2024" },
  logo:"https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321237/collage_woeeb9.webp",
  link: "https://college-placement-system-ajar.netlify.app/home",
  skills: [
    "React",
    "TailwindCSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Zoom API",
    "Framer Motion",
  ],
  shortDescription:
    "MERN-based recruitment platform with interview scheduling and analytics dashboards.",

  description: `
A recruitment workflow system built using MERN stack to streamline student placement operations.

- Developed application tracking dashboards for students and administrators.
- Integrated interview scheduling workflows with notification support.
- Built company and job management modules with analytics reporting.
- Designed responsive UI with animation-based interactions.

**Quick Links**
- 🌐 Live Demo — https://college-placement-system-ajar.netlify.app/home
- 💻 Frontend — https://github.com/ajardeen/College-Placement-Management-FrontEnd
- ⚙️ Backend — https://github.com/ajardeen/College-Placement-Management-Backend
`,
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325722/college1_wbgutr.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325719/college2_a3l2it.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325717/college3_rng4o4.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325714/college4_teggp6.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325712/college5_cloqmj.webp"
  ],
  videoUrl: "",
  cardUi: true,
},

{
  id: "realtime-chat-application",
  title: "Real-Time Chat Application",
  period: { start: "03.2024" },
  logo:"https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321239/realtimechat_oljkuj.webp",
  link: "https://chatapplication-ajardeen.netlify.app/",
  skills: ["React", "Socket.IO", "MongoDB", "JWT", "Material UI", "Formik"],
  shortDescription:
    "One-to-one WebSocket chat platform with JWT authentication and responsive UI.",

  description: `
Real-time messaging platform focused on secure communication and responsive UX.

- Implemented Socket.IO messaging with typing, delivered, and seen indicators.
- Built JWT authentication flow with secure session handling.
- Designed responsive chat interface optimized for mobile and desktop.
- Structured persistent chat history using MongoDB.

**Quick Links**
- 🌐 Live Demo — https://chatapplication-ajardeen.netlify.app/
- 💻 Frontend — https://github.com/ajardeen/ChatApplicationFrontend
- ⚙️ Backend — https://github.com/ajardeen/ChatApplicationBackend
`,
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326429/chat-bubble_zhglit.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326427/realtimechat_1_ohpqzj.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326423/realtimechat_3_tp36gv.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326420/realtimechat_2_q14kyj.webp"
  ],
  videoUrl: "https://youtu.be/WoK7NfpDR8k",
  cardUi: true,
},

{
  id: "recipe-app",
  title: "Recipe App",
  period: { start: "02.2024" },
  logo:"https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321240/recipe_j1lxw3.webp",
  link: "https://recipe-app-ajar.netlify.app/",
  skills: ["React", "Redux", "TailwindCSS", "Spoonacular API"],
  shortDescription:
    "Recipe discovery app integrating Spoonacular API with Redux state management.",

  description: `
Recipe discovery application focused on search-driven UX and dynamic API data rendering.

- Built filter-based search UI supporting dietary preferences.
- Implemented Redux state management for favorites and navigation.
- Designed responsive layouts optimized for API performance.

**Quick Links**
- 🌐 Live Demo — https://recipe-app-ajar.netlify.app/
- 💻 GitHub — https://github.com/ajardeen/recipe-app
`,
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325830/receipe_3_y9vuiq.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325835/receipe_1_ev2m5u.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325832/receipe_2_dnj6rk.webp"
  ],
  videoUrl: "",
  cardUi: false,
},

{
  id: "password-reset-flow",
  title: "Password Reset Flow",
  period: { start: "01.2024" },
  link: "https://password-resetflow-ajar.netlify.app/",
  skills: ["React", "Node.js", "Express", "MongoDB", "Nodemailer", "JWT"],
  shortDescription:
    "Secure password recovery module using token-based email verification.",

  description: `
Authentication module implementing secure password reset workflow.

- Built token-based email verification using Nodemailer.
- Implemented secure password update flow with backend validation.
- Designed expiry-based JWT security logic.

**Quick Links**
- 🌐 Live Demo — https://password-resetflow-ajar.netlify.app/
- 💻 Frontend — https://github.com/ajardeen/PasswordResetFlow-frontend
- ⚙️ Backend — https://github.com/ajardeen/PasswordResetFlow-backend
`,
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325777/password1_lq2kr7.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325774/password2_yrv51f.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326737/passwordflow_3_x4lfdu.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326745/passwordflow_2_tr8l72.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326741/passwordflow_1_ye19xj.webp"
  ],
  videoUrl: "",
},

{
  id: "trabook-landing-page",
  title: "Trabook Landing Page",
  period: { start: "12.2023" },
  link: "https://trabook-landingpage-ajar.netlify.app/",
  skills: ["HTML", "TailwindCSS"],
  shortDescription:
    "Pixel-perfect responsive landing page built from Figma using TailwindCSS.",

  description: `
Responsive landing page built from Figma design with utility-first styling.

- Converted design prototype into responsive production UI.
- Implemented scalable layout using Tailwind utilities.
- Optimized performance with lightweight HTML + CSS architecture.

**Quick Links**
- 🌐 Live Demo — https://trabook-landingpage-ajar.netlify.app/
- 💻 GitHub — https://github.com/ajardeen/Trabook-LandingPage
`,
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325822/landing1_sye2b8.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325819/landing3_b5pwoc.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325816/landing2_egecp7.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325814/landing4_fzejkm.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325811/landing5_qqeivc.webp"
  ],
  videoUrl: "",
}
];
