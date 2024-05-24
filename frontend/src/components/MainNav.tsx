import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          className="font-bold bg-orange-500 border-white border-2 hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border-solid hover:border-2"
          onClick={async () => {
            await loginWithRedirect();
          }}
        >
          Login
        </Button>
      )}
    </span>
  );
};

export default MainNav;
