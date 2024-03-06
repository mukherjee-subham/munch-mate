import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
  const { createUser } = useCreateMyUser();
  const { user } = useAuth0();
  const hasBeenCreated = useRef(false);
  const navigate = useNavigate();
  console.log("User ::", user);
  useEffect(() => {
    if (user?.sub && user?.email && !hasBeenCreated.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasBeenCreated.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallBackPage;
