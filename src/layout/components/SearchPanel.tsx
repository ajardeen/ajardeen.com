import { ArrowRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { pagesSearch } from "@/configs/globalSearchConfig";
import { buildProjectSearch } from "@/utils/projectSearchBuilder";

const SearchPanel = ({ onItemClick }: any) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const quickLinks = [
    { label: "About", href: "#profile", isScroll: true },
    { label: "All Projects", href: "/project" },
    { label: "Tech Stack", href: "#tech-stack", isScroll: true },
    { label: "Experience", href: "#experience", isScroll: true },
  ];

  const allSearchableItems = useMemo(() => {
    const projectGroups = buildProjectSearch();
    const projects = projectGroups.flatMap((group) => group.items);
    const mappedPages = pagesSearch.map((p) => ({
      label: p.searchName,
      href: p.link,
    }));
    const mappedProjects = projects.map((p) => ({
      label: p.searchName,
      href: p.link,
    }));
    return [...mappedPages, ...mappedProjects];
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    return allSearchableItems
      .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  }, [query, allSearchableItems]);

  // Determine which list is active and its items
  const isQuickLinks = !query;
  const activeList = isQuickLinks ? quickLinks : filteredResults;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset focus index when query or list changes
  //   useEffect(() => {
  //     setFocusedIndex(activeList.length > 0 ? 0 : -1);
  //   }, [query, activeList.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (activeList.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % activeList.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex(
          (prev) => (prev - 1 + activeList.length) % activeList.length,
        );
      } else if (e.key === "Enter") {
        if (focusedIndex >= 0 && focusedIndex < activeList.length) {
          onItemClick(activeList[focusedIndex]);
        }
      }
    },
    [activeList, focusedIndex, onItemClick],
  );

  // ...existing code...

  // Animation variants for the list items
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" },
    }),
    exit: { opacity: 0, x: 5, transition: { duration: 0.1 } },
  };

  return (
    <div className="px-10 max-w-3xl mx-auto w-full h-96">
      {/* Static Input Area */}
      <div className="flex items-center gap-3  pb-4 md:mt-15 ">
        <Search className="size-7! text-muted-foreground" />
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="bg-transparent border-none outline-none text-2xl font-semibold w-full placeholder:text-3xl placeholder:text-muted-foreground/90"
          aria-activedescendant={
            focusedIndex >= 0 ? `search-item-${focusedIndex}` : undefined
          }
          aria-controls="search-list"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="min-h-[250px]">
          <AnimatePresence mode="wait">
            {!query ? (
              <motion.div key="quick-links" exit={{ opacity: 0 }}>
                <Header title="Quick Links" />
                <ul
                  className="space-y-2 w-full"
                  id="search-list"
                  ref={listRef}
                  role="listbox"
                >
                  {quickLinks.map((link, i) => (
                    <motion.li
                      key={i}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      id={`search-item-${i}`}
                      role="option"
                      aria-selected={focusedIndex === i}
                    >
                      <ListButton
                        link={link}
                        onItemClick={onItemClick}
                        focusedIndex={focusedIndex}
                        i={i}
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div key="suggestions" exit={{ opacity: 0 }}>
                <Header title="Suggested Search" />
                <ul
                  className="space-y-2"
                  id="search-list"
                  ref={listRef}
                  role="listbox"
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        id={`search-item-${i}`}
                        role="option"
                        aria-selected={focusedIndex === i}
                      >
                        <ListButton
                          link={item}
                          onItemClick={onItemClick}
                          focusedIndex={focusedIndex}
                          i={i}
                        />
                      </motion.li>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground italic"
                    >
                      No matches found.
                    </motion.p>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;

const Header = ({ title }: { title: string }) => (
  <p className="text-xl mt-5 md:mt-0 md:text-sm text-muted-foreground capitalize mb-4 w-full">
    {title}
  </p>
);

const ListButton = ({ link, onItemClick, focusedIndex, i }: any) => {
  return (
    <button
      onClick={() => onItemClick(link)}
      className={`flex items-center gap-2 group text-xl md:text-sm rounded-sm font-medium transition-colors cursor-pointer w-full text-left p-1  ${focusedIndex === i ? "bg-secondary/80 text-primary font-semibold" : "hover:text-primary hover:bg-secondary/80"}`}
      tabIndex={-1}
      aria-current={focusedIndex === i}
    >
      <ArrowRight
        className={`size-3 text-muted-foreground/80 group-hover:text-primary ${focusedIndex === i ? "text-primary" : ""}`}
      />
      {link.label}
    </button>
  );
};
