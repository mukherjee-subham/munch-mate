import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { userData, isLoading: isGetUserLoading } = useGetMyUser();

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

  if (isAuthLoading || !userData || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="font-bold bg-orange-500 border-white border-2 hover:text-orange-500 hover:bg-white hover:border-orange-500 hover:border-solid hover:border-2 flex-1"
        >
          Checkout!
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          userData={userData}
          onSave={() => {
            onCheckout(userData);
          }}
          isLoading={isGetUserLoading}
          buttonText="Proceed to checkout"
          title="Confirm delivery details"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
