import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { userData, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!userData) {
    return <span>Unable to load user-profile page</span>;
  }
  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      userData={userData}
    />
  );
};

export default UserProfilePage;
