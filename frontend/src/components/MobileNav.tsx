import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { MobileNavLinks } from "./MobileNavLinks";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-red-500" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-red-500" />
                {user?.nickname}
              </span>
            ) : (
              <span>Welcome to BiteBuzz!</span>
            )}
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex flex-col gap-6">
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <Button
                className="flex-1 font-bold bg-red-500"
                onClick={async () => await loginWithRedirect()}
              >
                Log In
              </Button>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;