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
  jobTitle: "Junior Full Stack Developer",
  jobs: [
    {
      title: "FrontEnd Developer",
      company: "KJB Solution",
      website: "#",
    },
  ],
  
  avatar: avatar,
  //   about: `
  // Hello, World! I am Chánh Đại — a Design Engineer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.

  // With 5+ years of experience, I specialize in building high-quality web and mobile applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and turning ideas into reality through personal projects.

  // One of my key projects, [ZaDark](https://zadark.com), launched in 2022, enhances the Zalo experience on PC and Web, surpassing 80k+ downloads on [SourceForge](https://sourceforge.net/projects/zadark) and reaching 20k+ active users on the [Chrome Web Store](https://chromewebstore.google.com/detail/llfhpkkeljlgnjgkholeppfnepmjppob) (as of Sep 2025).

  // I'm also the creator of [React Wheel Picker](https://react-wheel-picker.chanhdai.com) — iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support. It has earned 4k+ weekly downloads on [npm](https://www.npmjs.com/package/@ncdai/react-wheel-picker) and was selected for [▲Vercel OSS Program](https://vercel.com/blog/summer-2025-oss-program#react-wheel-picker) summer 2025 cohort.

  // Let's connect and collaborate!
  //   `,
about: `

- **Design Engineer** with 5+ years of experience, known for pixel-perfect execution and strong attention to small details.
- Skilled in **Next.js**, **React**, **TypeScript**, and modern front-end technologies; building high-quality, user-centric web and mobile applications.
- Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted personal projects.
- Creator of [ZaDark](https://zadark.com) (2022): enhances the Zalo experience on PC & Web
  - 80k+ downloads on [SourceForge](https://sourceforge.net/projects/zadark)
  - 30k+ active users on the [Chrome Web Store](https://chromewebstore.google.com/detail/llfhpkkeljlgnjgkholeppfnepmjppob)
- Creator of [React Wheel Picker](https://react-wheel-picker.chanhdai.com)
  - 10k+ weekly downloads on [npm](https://www.npmjs.com/package/@ncdai/react-wheel-picker)
  - [▲Vercel OSS Program](https://vercel.com/blog/summer-2025-oss-program#react-wheel-picker)
`,

  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-light.png?v=4",
  namePronunciationUrl: "/audio/chanhdai.mp3",
  timeZone: "Asia/Ho_Chi_Minh",
  keywords: [
    "ncdai",
    "nguyenchanhdai",
    "nguyen chanh dai",
    "chanhdai",
    "chanh dai",
    "iamncdai",
    "quaric",
    "zadark",
    "nguyễn chánh đại",
    "chánh đại",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
} satisfies User;
