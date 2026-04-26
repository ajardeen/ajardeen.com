import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router-dom";
import lightIcon from "@/assets/icons/ajlight.svg";
import darkIcon from "@/assets/icons/aj.svg";
import { useTheme } from "@/components/theme-provider";

export function Page_Not_Found() {
  const { theme } = useTheme();

  const navigate = useNavigate();
  return (
    <Empty className="h-screen w-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Avatar className="size-12">
            <AvatarImage
              src={theme == "dark" ? lightIcon : darkIcon}
              className="grayscale "
            />
            <AvatarFallback>AZ</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle className="text-9xl font-bold flex items-center ">
          <p className="text-brand">/</p>404
        </EmptyTitle>
        <EmptyDescription>
          The page you are looking for does not exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          size="sm"
          variant={"ghost"}
          className="group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <p className="text-brand opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0.5">
            /
          </p>
          Back to Home
        </Button>
      </EmptyContent>
    </Empty>
  );
}
