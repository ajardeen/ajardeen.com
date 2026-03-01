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
  {
    id: "template-ui",
    title: "Template UI",
    period: {
      start: "20.12.2025",
    },
    link: "https://template-uii.netlify.app/",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "ShadCN UI",
      "Component Library Architecture",
      "Theme System Design",
      "Dark/Light Mode",
      "Custom Theme Configuration",
      "Responsive Design",
      "Reusable Components",
      "UI/UX Design Systems",
    ],
    shortDescription:
      "A reusable and scalable UI component library built with Vite, React, and TypeScript featuring dark/light mode, custom theme support, and a live demo preview system.",

    description: `

Template UI is a reusable and scalable component library built using Vite, React, and TypeScript. The goal of this project was to create a clean, customizable design system inspired by ShadCN architecture while maintaining full control over styling and theme extensibility.

The library includes a structured collection of reusable UI components built with Tailwind CSS and designed for consistency, performance, and developer experience.

Key Highlights:

• Built with Vite for fast development and optimized builds  
• Strongly typed components using TypeScript  
• Dark and Light mode support  
• Custom theme configuration system  
• Reusable, composable component architecture  
• Custom-built responsive sidebar layout  
• Dedicated demo UI to preview and test components in real-time  
• Clean folder structure for scalability  

The demo application showcases how the components can be composed into real-world layouts, making it easy to evaluate design consistency and usability.

**Quick Links**

• 🌐 Live Demo — https://template-uii.netlify.app/

`,
    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772233271/templateui_d0zhsd.webp",
    imageUrls: [
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772232922/template_ui_4_u8vwcs.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772232922/template_ui_6_qaooxc.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772232922/template_ui_5_q5djsu.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772232923/template_ui_2_kw4t6d.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772232922/template_ui_1_irspkw.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772232922/template_ui_3_l1o3hr.webp",
    ],
    cardUi: true,
    isExpanded: true,
  },
  // 1️⃣ CARD UI
  {
    id: "hostel-management-system",
    title: "Hostel Management System",
    period: { start: "15.12.2024", end: "31.12.2024" },
    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321239/hosteledge_mtjdgc.webp",
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
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325754/hostel5_w2wbfn.webp",
    ],
    videoUrl: "",
    cardUi: true,
  },

  {
    id: "placement-management-system",
    title: "Placement Management System",
    period: { start: "19.12.2024", end: "01.01.2025" },
    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321237/collage_woeeb9.webp",
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
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325712/college5_cloqmj.webp",
    ],
    videoUrl: "",
    cardUi: true,
  },

{
  id: "vision-action-toolkit",
  title: "Vision Action Toolkit",
  period: {
    start: "06.11.2025",
  },
  link: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772278154/va_ui_components_2_r4n1oc.webp",
  skills: [
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS v4",
    "Radix UI",
    "React Hook Form",
    "Zod",
    "Design System Architecture",
    "Reusable Component Patterns",
    "Dark/Light Theme Engine"
  ],
  shortDescription:
    "Scalable design system and reusable UI toolkit built with React 19 and TypeScript, featuring schema-based validation, theme extensibility, and composable architecture.",

  description: `
Vision Action Toolkit is a production-ready UI component system built to deliver scalable, type-safe, and validation-integrated frontend architecture.

It combines React 19, TypeScript, and Vite with a ShadCN-inspired structure to create reusable, accessible, and theme-extensible components.

Key highlights:
- Accessible primitives powered by Radix UI
- Utility-driven styling with Tailwind CSS v4
- Schema-based validation using React Hook Form + Zod
- Dark/Light mode with custom theme configuration
- Variant-driven component design using CVA
- Advanced UI patterns including data tables, command menu, dialogs, and motion effects

The project demonstrates how to build a maintainable design system foundation rather than isolated UI components, making it suitable for scalable production applications.

Quick Links:
• 🌐 Live Demo — https://va-reusable-components.netlify.app/
• ⚙️ GitHub — https://github.com/ajardeen/va-reusable-components
`,
  logo: "",
  imageUrls: [
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772278153/va_ui_components_4_qdrlix.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772278153/va_ui_components_1_lsnrhd.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772278153/va_ui_components_3_iyrcci.webp",
    "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772278154/va_ui_components_2_r4n1oc.webp",
  ],
  isExpanded: true,
},
  {
    id: "realtime-chat-application",
    title: "Real-Time Chat Application",
    period: { start: "09.03.2025", end: "12.04.2025" },
    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321239/realtimechat_oljkuj.webp",
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
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326420/realtimechat_2_q14kyj.webp",
    ],
    videoUrl: "https://youtu.be/WoK7NfpDR8k",
    cardUi: false,
  },
  {
    id: "project-your-database",
    title: "Project Your Database",
    period: { start: "01.02.2026", end: "" },
    link: "https://yourdatabase.netlify.app/",
    skills: [
      "React 19",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Material UI",
      "Ant Design",
      "Axios",
      "REST API",
      "API Key Authentication",
    ],
    shortDescription:
      "Personal data management platform that stores user data and exposes secure API endpoints for instant website updates.",

    description: `
Full-stack personal data API platform designed to centralize user information and expose it securely via API keys.

This project allows users to:
- Store structured personal data (portfolio info, availability status, location, bio, social links, etc.).
- Generate secure API keys for accessing their data.
- Instantly update information from a dashboard.
- Automatically reflect changes across external websites using API integration.

**Core Features**
- API Key–based authentication for secure data access.
- Real-time update capability for portfolio-driven websites.
- Clean dashboard built using Material UI and Ant Design.
- RESTful backend architecture for scalable integration.
- Axios-powered frontend API communication.
- Smooth UI interactions using Framer Motion.

**Use Case Example**
A developer hosting a portfolio can:
- Update availability status to "Open for Work".
- Change location or bio.
- Modify featured projects.
All updates instantly reflect on connected websites via the exposed API.


**Quick Links**
- 🌐 Live Demo — https://yourdatabase.netlify.app/
- 💻 Frontend GitHub — https://github.com/ajardeen/Project-UserData
- ⚙️ Backend GitHub — https://github.com/ajardeen/Project-UserData-Backend
`,
    imageUrls: [
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772389759/device-mockup_1.5x_postspark_2026-03-01_23-51-52_1_vi2ihe.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772389759/device-mockup_1.5x_postspark_2026-03-01_23-52-18_1_ftoxen.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772389758/device-mockup_1.5x_postspark_2026-03-01_23-53-20_keewal.webp",
    ],
    videoUrl: "",
    isUnderDevelopment: true,
  },
  {
    id: "recipe-app",
    title: "Recipe App",
    period: { start: "07.12.2025", end: "30.01.2025" },
    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321240/recipe_j1lxw3.webp",
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
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325832/receipe_2_dnj6rk.webp",
    ],
    videoUrl: "",
    cardUi: false,
  },

  {
    id: "google-oauth-implementation",
    title: "Google OAuth Implementation",
    period: { start: "12.12.2024", end: "03.03.2025" },
    link: "https://googleoauth.netlify.app/",
    skills: ["React", "Vite", "Google console", "jwt-decode", "Google OAuth"],
    shortDescription:
      "Secure Google OAuth implementation with session management.",

    description: `
Authentication module implementing secure Google OAuth workflow.

- Integrated Google OAuth with secure session handling.
- Implemented user profile retrieval and storage in MongoDB.
- Designed responsive UI for login and logout flows.


**Quick Links**
- 🌐 Live Demo — https://googleoauth.netlify.app/
- 💻 Frontend — https://github.com/ajardeen/GoogleOAuth-FrontEnd
`,
    imageUrls: [
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772240138/oauth_bdcnob.webp",
    ],
    videoUrl: "https://www.youtube.com/watch?v=3PkpTDMQ_Mc",
  },
  {
    id: "password-reset-flow",
    title: "Password Reset Flow",
    period: { start: "12.12.2024", end: "03.03.2025" },
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
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326741/passwordflow_1_ye19xj.webp",
    ],
    videoUrl: "",
  },

  {
    id: "trabook-landing-page",
    title: "Trabook Landing Page",
    period: { start: "03.03.2023", end: "03.03.2023" },
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
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325811/landing5_qqeivc.webp",
    ],
    videoUrl: "",
  },
  {
    id: "askme-identity-landing-page",
    title: "AskMe Identity Landing Page",
    period: { start: "20.09.2024", end: "20.09.2024" },
    link: "https://askmeidentity-landingpage-ajar.netlify.app/",
    skills: ["HTML", "TailwindCSS", "Figma"],
    shortDescription:
      "Pixel-perfect responsive landing page built from Figma using TailwindCSS.",

    description: `
Responsive landing page built from Figma design with utility-first styling.

- Converted figma design prototype into responsive production UI.
- Implemented scalable layout using Tailwind utilities.
- Optimized performance with lightweight HTML + CSS architecture.

**Quick Links**
- 🌐 Live Demo — https://askmeidentity-landingpage-ajar.netlify.app/
- 💻 GitHub — https://github.com/ajardeen/Askmeidentity-LandingPage
`,
    imageUrls: [
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772223962/askme_landing_page_6_t6efom.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772223962/askme_landing_page_5_u2edwz.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772223962/askme_landing_page_4_zys5az.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772223962/askme_landing_page_3_vyze7e.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772223962/askme_landing_page_1_kxro2y.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1772223961/askme_landing_page_2_gnozje.webp",
    ],
    videoUrl: "",
  },
];
