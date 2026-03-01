import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "kjb-solution",
    companyName: "KJB Solution",
    companyLogo:
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1768236586/kjbSolution_thvn3k.webp",
    positions: [
      {
        id: "20f8bfe5-b6a3-4b0d-ac2f-6fccd50d417e",
        title: "Front End Developer",
        employmentPeriod: {
          start: "4.2025",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Built **Channel Manager dashboards** (Reservation & Performance) using React (Vite), delivering 10+ desktop-focused screens with reusable UI architecture and complex reporting modules.
- Rebuilt [**Hostel Management System (HMS)** ](https://template-uii.netlify.app/) UI using React + TypeScript and Shadcn design system, introducing responsive layouts, reusable components, dark/light themes, and modern dashboard visualizations.
- Led frontend architecture for **Retailo Restaurant POS**, migrating 20+ legacy HTML/CSS/JS screens into modular React structure with MUI, optimized state handling, and scalable component patterns.
- Implemented centralized API workflows using TanStack Query to reduce redundant requests and improve data performance across billing, KOT, inventory, ledger, and reporting modules.
- Developed POS printing backend using Node.js (PDFKit, pdf-to-printer), converting billing HTML into formatted PDFs for automated physical printing workflows.
- Contributed to full-stack product development including real-time order flows, reusable contexts, and performance-focused UI delivery across business-critical applications.`,
        skills: [
          "React",
          "Vite",
          "TypeScript",
          "Material UI",
          "TanStack Query",
          "React Data Table",
          "Node.js",
          "Express.js",
          "PDFKit",
          "Shadcn UI",
          "Responsive UI",
          "REST API Integration",
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
