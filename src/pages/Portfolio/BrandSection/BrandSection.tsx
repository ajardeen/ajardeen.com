import { BrandContextMenu } from "@/components/brand-context-menu";
import { Panel, PanelHeader, PanelTitle } from "@/components/panel";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import lightIcon from "@/assets/icons/maicon.png";
import darkIcon from "@/assets/icons/maicondark.png";
import lightSign from "@/assets/images/masignature.png";
import darkSign from "@/assets/images/masignaturedark.png";

function BrandSection() {
  const { theme } = useTheme();
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Brand</PanelTitle>
      </PanelHeader>

      <BrandContextMenu>
        <div className="grid grid-cols-[2rem_1fr]">
          <div className="flex h-28 items-center justify-center border-r border-dashed border-edge bg-background">
            <span className="rotate-270 text-sm text-muted-foreground select-none">
              Mark
            </span>
          </div>

          <div className="screen-line-after flex items-center justify-center pr-8 after:z-1">
            <img
              src={theme === "light" ? darkIcon : lightIcon}
              alt="icon"
              className={cn("w-29 transition-colors ")}
            />
          </div>

          <div className="flex h-28 items-center justify-center border-r border-dashed border-edge bg-background">
            <span className="rotate-270 text-sm text-muted-foreground select-none">
              Signature
            </span>
          </div>

          <div className="screen-line-after flex items-center justify-center after:z-1">
            {/* <ChanhDaiWordmark className="h-6 w-auto sm:h-10" /> */}
            <img
              src={theme === "light" ? lightSign : darkSign}
              alt="icon"
              className={cn("w-96 transition-colors ")}
            />
          </div>
        </div>
      </BrandContextMenu>
    </Panel>
  );
}

export default BrandSection;
