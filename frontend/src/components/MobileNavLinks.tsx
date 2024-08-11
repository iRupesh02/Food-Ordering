import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { SheetClose } from "./ui/sheet";

export const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <div className=" flex flex-col space-y-2 p-4 items-center justify-center">
        <SheetClose asChild>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        Order Status
      </Link>
      </SheetClose>
      <Separator />
      <SheetClose asChild>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        Manage Restaurant
      </Link>
      </SheetClose>
      <Separator />
      <SheetClose asChild>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        User Profile
      </Link>
      </SheetClose>
      <Separator />
      <SheetClose asChild>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-red-500 w-40"
      >
        Log Out
      </Button>
      </SheetClose>
    </div>
  );
};
