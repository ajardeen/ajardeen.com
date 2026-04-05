import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "kjb-trip",
    companyName: "KJB Trip",
    companyLogo:
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768236586/kjbSolution_thvn3k.webp",
    positions: [
      {
        id: "20f8bfe5-b6a3-4b0d-ac2f-6fccd50d417e",
        title: "Front-End Developer",
        employmentPeriod: {
          start: "04.2025",
          end: "Present",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `
- **Lead POS Architecture:** Spearheaded full-stack development for KJB POS, managing project initialization, folder structure design, and cross-team coordination[cite: 1].
- **Enterprise Dashboards:** Engineered high-performance Channel Manager and Admin portals to monitor reservations, revenue, and multi-platform OTA data[cite: 1].
- **Data Optimization:** Integrated **TanStack Query (v5)** and **Zustand** for advanced state management, automatic cache invalidation, and background fetching[cite: 1].
- **Hardware Integration:** Developed a specialized Node.js backend using **Puppeteer** and **pdf-to-printer** for automated thermal printing and PDF billing[cite: 1].
- **Design Systems:** Built a scalable design system and high-fidelity prototypes using **Shadcn/ui** and **Tailwind CSS V4**[cite: 1].
- **Business Logic:** Implemented complex modules for KOT, inventory logistics, stock audits, and multi-platform bulk-edit tools[cite: 1].
`,
        skills: [
          "React 18.3.1",
          "Vite [cite: 1]",
          "TanStack Query (v5) [cite: 1]",
          "Zustand [cite: 1]",
          "Shadcn/ui [cite: 1]",
          "Tailwind CSS V4 [cite: 1]",
          "Material UI (MUI) [cite: 1]",
          "Node.js [cite: 1]",
          "Express [cite: 1]",
          "Puppeteer [cite: 1]",
          "REST API Integration [cite: 1]",
          "Chart.js [cite: 1]",
        ],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "freelancer",
    companyName: "Freelancer",
    companyLogo: "",
    positions: [
      {
        id: "20f8bfe5-b6a3-4b0d-ac2f-6fccd50d417e",
        title: "Front End Developer",
        employmentPeriod: {
          start: "1.2024",
          end: "4.2025",
        },
        employmentType: "Freelance",
        icon: "code",
        description: `
- Developed responsive portfolio websites and modern landing pages using HTML, CSS, and JavaScript.
- Built clean UI layouts with mobile-first design and cross-browser compatibility.
- Converted Figma and design mockups into pixel-accurate frontend interfaces.
- Optimized page performance, image loading, and basic SEO structure.
- Implemented interactive UI components such as sliders, forms, and animations.
- Delivered client-ready static websites with reusable structure and maintainable code.
      `,
        skills: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Responsive Design",
          "Landing Pages",
          "Portfolio Websites",
          "UI Implementation",
          "Figma to Code",
          "Web Performance",
        ],
      },
    ],
  },

  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "c47f5903-88ae-4512-8a50-0b91b0cf99b6",
        title: "Sethu Institute of Technology",
        employmentPeriod: {
          start: "08.2017",
          end: "2021",
        },
        icon: "education",
        description: `- Mechanical Engineering Graduated  `,
        skills: ["C++", "Self-learning", "Teamwork", "Presentation"],
      },
    ],
  },
];
