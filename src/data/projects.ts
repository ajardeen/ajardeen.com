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
    shortDescription:"",
    description: `

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
    description: `
A full-featured system for efficient hostel operations.

- Room allocation & availability tracking
- Maintenance request management
- Billing & payment tracking
- Resident management
- Financial reporting with charts
- Role-based access & notifications
`,
    imageUrls: ["https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325743/hostel1_nurr8u.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325748/hostel2_ffatcx.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325746/hostel3_qukrvi.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325751/hostel4_e6vsjx.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325754/hostel5_w2wbfn.webp"],
    videoUrl: "",
    cardUi: true,
  },

  // 2️⃣ CARD UI
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
    description: `
A MERN-based platform to streamline college placement workflows.

- Student application tracking
- Interview scheduling with notifications
- Company & job management
- Placement drive coordination
- Reports & analytics
`,
    imageUrls: ["https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325722/college1_wbgutr.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325719/college2_a3l2it.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325717/college3_rng4o4.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325714/college4_teggp6.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325712/college5_cloqmj.webp"],
    videoUrl: "",
    cardUi: true,
  },

  // 3️⃣ CARD UI
  {
    id: "realtime-chat-application",
    title: "Real-Time Chat Application",
    period: { start: "03.2024" },
    logo:"https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321239/realtimechat_oljkuj.webp",
    link: "https://chatapplication-ajardeen.netlify.app/",
    skills: ["React", "Socket.IO", "MongoDB", "JWT", "Material UI", "Formik"],
    description: `
A one-on-one real-time chat application.

- Instant messaging using Socket.IO
- JWT authentication & session handling
- Message status (delivered, seen, typing)
- Responsive UI for mobile & desktop
`,
    imageUrls: ["https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326429/chat-bubble_zhglit.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326427/realtimechat_1_ohpqzj.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326423/realtimechat_3_tp36gv.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326420/realtimechat_2_q14kyj.webp",""],
    videoUrl: "",
    cardUi: true,
  },

  // 4️⃣ CARD UI
  {
    id: "recipe-app",
    title: "Recipe App",
    period: { start: "02.2024" },
    logo:"https://res.cloudinary.com/di2vg4ur3/image/upload/v1768321240/recipe_j1lxw3.webp",
    link: "https://recipe-app-ajar.netlify.app/",
    skills: ["React", "Redux", "TailwindCSS", "Spoonacular API"],
    description: `
A recipe discovery and management app powered by Spoonacular API.

- Search recipes with filters
- View detailed cooking instructions
- Save favorite recipes
- Dietary preference support
`,
    imageUrls: ["https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325830/receipe_3_y9vuiq.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325835/receipe_1_ev2m5u.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325832/receipe_2_dnj6rk.webp","",""],
    videoUrl: "https://youtu.be/WoK7NfpDR8k",
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
    imageUrls: ["https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325777/password1_lq2kr7.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325774/password2_yrv51f.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326737/passwordflow_3_x4lfdu.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326745/passwordflow_2_tr8l72.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768326741/passwordflow_1_ye19xj.webp"],
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
    imageUrls: ["https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325822/landing1_sye2b8.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325819/landing3_b5pwoc.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325816/landing2_egecp7.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325814/landing4_fzejkm.webp","https://res.cloudinary.com/di2vg4ur3/image/upload/v1768325811/landing5_qqeivc.webp"],
    videoUrl: "",
  },
];
