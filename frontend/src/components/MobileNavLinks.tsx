import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Manage Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Your Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex flex-1 font-bold items-center hover:bg-slate-500"
      >
        Logout
      </Button>
    </>
  );
};

export default MobileNavLinks;
