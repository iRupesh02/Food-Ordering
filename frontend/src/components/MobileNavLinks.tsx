import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";

export const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        Order Status
      </Link>
      <Separator />

      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        Manage Restaurant
      </Link>
      <Separator />
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        User Profile
      </Link>
      <Separator />
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-red-500"
      >
        Log Out
      </Button>
    </div>
  );
};
