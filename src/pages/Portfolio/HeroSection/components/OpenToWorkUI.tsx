import Live from "@/assets/icons/live.svg";
import { motion } from "framer-motion";
import React from "react";
import { USER } from "@/data/user";

function OpenToWorkUI() {
  const [isHovered, setIsHovered] = React.useState(false);
  const waitTime = 2000; // Time in milliseconds to wait before showing the text
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, waitTime);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <motion.div
      className="absolute top-0 right-0 translate-y-0.5 -translate-x-0.5 cursor-pointer z-10"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      title="Click to Email Me"
      onClick={() => {
        const email = decodeBase64(USER.email);
        const subject = encodeURIComponent("Professional Opportunity");
        const body = encodeURIComponent(`Dear Mohamed,

I came across your profile and believe you'd be a great fit for our team.

FROM:
Name: [YOUR_NAME]
Company: [COMPANY_NAME]
Role: [YOUR_ROLE]

POSITION:
Title: [JOB_TITLE]
Skills Required: [REQUIRED_SKILLS]
Type: [FULL_TIME/REMOTE/CONTRACT]
Location: [LOCATION]

WHY YOU:
[WHY_YOU_ARE_A_FIT]

NEXT STEPS:
I'd love to discuss this opportunity with you. Please let me know your availability.

Best regards,
[YOUR_NAME]
[CONTACT_INFO]`);
        window.open(`mailto:${email}?subject=${subject}&body=${body}`);
      }}
    >
      <div
        className="flex items-center bg-background   rounded-full  overflow-hidden"
        style={{
          transition: "box-shadow 0.2s ease",
          boxShadow: isHovered ? "0 4px 16px 0 rgba(0,0,0,0.12)" : "none",
          paddingLeft: isHovered ? "4px" : "0px",
          paddingRight: isHovered ? "4px" : "0px",
        }}
      >
        <img src={Live} alt="icon" className="size-6 flex-shrink-0" />
        <span
          className="text-xs font-medium text-foreground whitespace-nowrap overflow-hidden"
          style={{
            maxWidth: isHovered ? "120px" : "0px",
            opacity: isHovered ? 1 : 0,
            marginLeft: isHovered ? "4px" : "0px",
            transition: isHovered
              ? "max-width 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease 0.05s, margin-left 0.3s cubic-bezier(0.34,1.56,0.64,1)"
              : "max-width 0.2s ease-in, opacity 0.1s ease-in, margin-left 0.2s ease-in",
          }}
        >
          Open to Work
        </span>
      </div>
    </motion.div>
  );
}

export default OpenToWorkUI;

function decodeBase64(base64String: string) {
  const decodedString = atob(base64String);
  return decodedString;
}
