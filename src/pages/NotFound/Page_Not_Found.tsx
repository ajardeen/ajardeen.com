import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useNavigate } from "react-router-dom"
import maLight from "@/assets/icons/maicon.png"
import maDark from "@/assets/icons/maicondark.png"
import { useTheme } from "@/components/theme-provider"


export function Page_Not_Found() {
  const {theme} = useTheme();

  const navigate = useNavigate()
  return (
    <Empty className="h-screen w-screen">
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src={theme == "dark" ? maLight : maDark}
              className="grayscale "
            />
            <AvatarFallback>AZ</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle className="text-9xl font-bold">404</EmptyTitle>
        <EmptyDescription>
          The page you are looking for does not exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </EmptyContent>
    </Empty>
  )
}
