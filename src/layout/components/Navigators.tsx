import { motion, type Variants } from "framer-motion";

const slideDownBlur: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: { duration: 0.2 }, // Fast reset for hidden
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
  // ADD THIS: The exit state
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

const MacHeader = ({ label, title }: { label: string; title: string }) => {
  return (
    <div className="space-y-4">
      <motion.p
        variants={slideDownBlur}
        className="text-sm font-medium text-muted-foreground uppercase tracking-tight"
      >
        {label}
      </motion.p>
      <motion.h2
        variants={slideDownBlur}
        className="text-3xl font-semibold tracking-tight text-foreground leading-[1.1]"
      >
        {title}
      </motion.h2>
    </div>
  );
};

const MacLinkList = ({ 
  category, 
  links, 
  onItemClick 
}: { 
  category: string; 
  links: { label: string; href: string; isScroll?: boolean }[];
  onItemClick: (link: { label: string; href: string; isScroll?: boolean }) => void;
}) => {
  return (
    <div className="space-y-4">
      <motion.p variants={slideDownBlur} className="text-sm font-medium text-muted-foreground tracking-tight">
        {category}
      </motion.p>
      <motion.ul 
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
        }}
        className="space-y-3"
      >
        {links.map((link) => (
          <motion.li key={link.label} variants={slideDownBlur}>
            <button
              onClick={() => onItemClick(link)}
              className="text-sm font-semibold hover:opacity-60 transition-opacity text-left block w-full cursor-pointer"
            >
              {link.label}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export { MacHeader, MacLinkList };
