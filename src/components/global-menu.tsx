import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Search, type LucideIcon } from "lucide-react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import maicon from "@/assets/icons/maicon.png";
import maDarkIcon from "@/assets/icons/maicondark.png";
import { useTheme } from "./theme-provider";
;

export interface SearchItem {
  searchName: string;
  link: string;
  icon?: LucideIcon;
}

interface GlobalMenuProps {
  placeholder?: string;
  searchBtnText?: string;
  suggestedSearch?: SearchItem[];
  pagesSearch?: SearchItem[];
}

function GlobalMenu({
  suggestedSearch = [],
  pagesSearch = [],
  placeholder = "Search...",
  searchBtnText = "Search",
}: GlobalMenuProps) {
 
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Ctrl / Cmd + /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (link: string) => {
    setOpen(false);
    navigate(link);
  };

  return (
    <>
      {/* Trigger */}
      <Button
        variant="outline"
        className="flex items-center gap-3"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:block">

        {searchBtnText}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>/</Kbd>
        </KbdGroup>
        </span>
      </Button>

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        className="sm:max-w-lg h-[410px] p-0 gap-0 flex flex-col "
      >
        <Command className="flex h-full justify-between flex-col ">
          <CommandInput placeholder={placeholder} />

          <CommandList className="flex-1 overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>

            {suggestedSearch.length > 0 && (
              <>
                <CommandGroup heading="Suggestions">
                  {suggestedSearch.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={index}
                        onSelect={() => handleNavigate(item.link)}
                      >
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {item.searchName}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {pagesSearch.length > 0 && (
              <CommandGroup heading="Pages">
                {pagesSearch.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => handleNavigate(item.link)}
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {item.searchName}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
          {/* Footer */}
          <div>
            <CommandSeparator />
            <div className="flex  h-10 items-center text-end justify-between w-full gap-2 p-1  text-sm text-muted-foreground">
              <img
                src={theme === "dark" ? maicon : maDarkIcon}
                alt="icon"
                className="w-8 opacity-50"
              />
              <div className="flex gap-2">
                <span className="flex items-end gap-2">

                  Go to Page
                  <kbd className="flex bg-accent text-accent-foreground h-5 items-center gap-1 rounded border px-1 text-[0.7rem]">
                    <CornerDownLeft size={14} />
                  </kbd>
                </span>
                <span className="flex items-end gap-2">
                  Exit
                  <kbd className="flex bg-accent text-accent-foreground h-5 items-center gap-1 rounded border px-1 text-[0.7rem]">
                    Esc
                  </kbd>
                </span>
              </div>
            </div>
          </div>
        </Command>
      </CommandDialog>
    </>
  );
}

export default GlobalMenu;
