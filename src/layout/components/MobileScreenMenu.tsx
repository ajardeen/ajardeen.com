import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";
import SearchPanel from "./SearchPanel";

const overlayVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export function FullScreenMenu({
  open,
  onClose,
  scrollToSection,
  menuContent,
}: {
  open: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
  menuContent: string;
}) {
  const navigate = useNavigate();

  const handleItemClick = (link: {
    label: string;
    href: string;
    isScroll?: boolean;
  }) => {
    if (link.isScroll) {
      setTimeout(() => {
        scrollToSection(link.href.replace("#", ""));
      }, 200);
    } else {
      navigate(link.href);
    }
    onClose();
  };
  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    {
      label: "About",
      action: () => {
        scrollToSection("profile");
        onClose();
      },
    },
    {
      label: "Skills",
      action: () => {
        scrollToSection("tech-stack");
        onClose();
      },
    },
    {
      label: "Projects",
      action: () => {
        navigate("/project");
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-999 h-screen"
          onClick={onClose}
        />
      )}

      {open && (
        <motion.div
          key="fullscreen-menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-9999 bg-background/95 backdrop-blur-md flex flex-col"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top bar with close button */}
          <div className="flex items-center justify-end px-4 h-16 ">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-1 rounded-sm hover:bg-muted transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
          {/* Content */}
          {menuContent === "search" && (
            <SearchPanel onItemClick={handleItemClick} />
          )}

          {/* Menu items */}
          {menuContent === "links" && <LinksContent items={items} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const LinksContent = ({ items }: { items: any[] }) => {
  return (
    <nav className="flex flex-col items-start justify-start flex-1 pl-8 pr-2 gap-2 mt-5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={menuItemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full flex items-center gap-2 cursor-pointer group"
        >
          <button
            onClick={item.action}
            className="w-full text-left text-3xl font-semibold py-2 text-foreground/80  hover:text-foreground transition-colors duration-200 tracking-tight"
          >
            {item.label}
          </button>
          <ChevronRight
            size={35}
            className="text-gray-400 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
          />
        </motion.div>
      ))}
    </nav>
  );
};
