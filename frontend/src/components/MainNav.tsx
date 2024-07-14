import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import Username from "./Username";

const MainNav = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div>
      <span className="flex space-x-2 items-center">
        {isAuthenticated ? (
          <Username />
        ) : (
          <Button
            onClick={async () => await loginWithRedirect()}
            variant="ghost"
            className="font-bold text-[15px] hover:text-red-500 hover:bg-white"
          >
            Log In
          </Button>
        )}
      </span>
    </div>
  );
};

export default MainNav;
