import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "lunchbox-legends",
    title: "Lunchbox Legends",
    period: {
      start: "10.2025",
    },
    link: "https://lunchboxlegends.netlify.app/",
    skills: ["Open Source", "React", "TypeScript"],
    shortDescription:"iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support",
    description: `
iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.

- 📱 Natural touch scrolling
- 🖱️ Mouse + touch support
- 🔄 Infinite loop
- 🎨 Unstyled components
- ⚡ shadcn CLI install
`,
    logo: "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768222582/Lunchbox-legends_ptewjk.webp",
    imageUrls: [
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228344/lbl_4_xfurhr.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228344/lbl_3_rn7yho.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228345/lbl_1_a9pr2z.webp",
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768228343/lbl_2_jejpij.webp",
    ],
    // videoUrl:"https://youtu.be/swcn2SZ6kwQ?si=ggh17BPjSeAdj2A0",
    cardUi: true,
    isExpanded: true,
  },
  // 1️⃣ CARD UI
  {
    id: "hostel-management-system",
    title: "Hostel Management System",
    period: { start: "06.2024" },
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
    description: `
A full-featured system for efficient hostel operations.

- Room allocation & availability tracking
- Maintenance request management
- Billing & payment tracking
- Resident management
- Financial reporting with charts
- Role-based access & notifications
`,
    imageUrls: [],
    videoUrl: "",
    cardUi: true,
  },

  // 2️⃣ CARD UI
  {
    id: "placement-management-system",
    title: "Placement Management System",
    period: { start: "05.2024" },
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
    description: `
A MERN-based platform to streamline college placement workflows.

- Student application tracking
- Interview scheduling with notifications
- Company & job management
- Placement drive coordination
- Reports & analytics
`,
    imageUrls: [],
    videoUrl: "",
    cardUi: true,
  },

  // 3️⃣ CARD UI
  {
    id: "realtime-chat-application",
    title: "Real-Time Chat Application",
    period: { start: "03.2024" },
    link: "https://chatapplication-ajardeen.netlify.app/",
    skills: ["React", "Socket.IO", "MongoDB", "JWT", "Material UI", "Formik"],
    description: `
A one-on-one real-time chat application.

- Instant messaging using Socket.IO
- JWT authentication & session handling
- Message status (delivered, seen, typing)
- Responsive UI for mobile & desktop
`,
    imageUrls: [],
    videoUrl: "",
    cardUi: true,
  },

  // 4️⃣ CARD UI
  {
    id: "recipe-app",
    title: "Recipe App",
    period: { start: "02.2024" },
    link: "https://recipe-app-ajar.netlify.app/",
    skills: ["React", "Redux", "TailwindCSS", "Spoonacular API"],
    description: `
A recipe discovery and management app powered by Spoonacular API.

- Search recipes with filters
- View detailed cooking instructions
- Save favorite recipes
- Dietary preference support
`,
    imageUrls: [],
    videoUrl: "",
    cardUi: false,
  },

  // 5️⃣ COLLAPSIBLE LIST
  {
    id: "password-reset-flow",
    title: "Password Reset Flow",
    period: { start: "01.2024" },
    link: "https://password-resetflow-ajar.netlify.app/",
    skills: ["React", "Node.js", "Express", "MongoDB", "Nodemailer", "JWT"],
    description: `
Secure password reset system with email verification.

- Forgot password flow
- Token-based email verification
- Secure password update
- Expiry-based security handling
`,
    imageUrls: [],
    videoUrl: "",
  },

  // 6️⃣ COLLAPSIBLE LIST
  {
    id: "trabook-landing-page",
    title: "Trabook Landing Page",
    period: { start: "12.2023" },
    link: "https://trabook-landingpage-ajar.netlify.app/",
    skills: ["HTML", "TailwindCSS"],
    description: `
Pixel-perfect responsive landing page based on Figma design.

- Fully responsive layout
- Tailwind utility-first styling
- Optimized performance
`,
    imageUrls: [],
    videoUrl: "",
  },
];
