import DashBoard from "@/components/Dashboard/DashBoard";
import ProfilePage from "@/components/ProfilePage";
import { IProfileData } from "@/components/ProfilePage/types/profilePage";
import { GetServerSideProps } from "next";

const Profile = () => {
  return (
    <DashBoard>
      <ProfilePage />
    </DashBoard>
  );
};

export default Profile;
