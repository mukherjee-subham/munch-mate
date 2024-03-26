import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";

const CheckoutButton = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const onLogin = async () => {
    loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button
        className="font-bold bg-orange-500 border-white border-2 hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border-solid hover:border-2 flex-1"
        onClick={onLogin}
      >
        Login to checkout!
      </Button>
    );
  }

  if (isAuthLoading) {
    return <LoadingButton />;
  }

  return (
    <Button className="font-bold bg-orange-500 border-white border-2 hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border-solid hover:border-2 flex-1">
      Checkout!
    </Button>
  );
};

export default CheckoutButton;
