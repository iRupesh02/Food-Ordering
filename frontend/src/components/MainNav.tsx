import { Button } from "./ui/button";

const MainNav = () => {
  return <div>
    <Button variant="ghost" className="font-bold text-[15px] hover:text-orange-500 hover:bg-white">
       Log In
    </Button>
    {/* <Button variant="ghost" className="font-bold text-[15px] hover:text-orange-500 hover:bg-white">
       Sign Up
    </Button> */}
  </div>;
};

export default MainNav;
