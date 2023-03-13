import ProfilePage from "@/components/ProfilePage";
import { IProfileData } from "@/components/ProfilePage/types/profilePage";
import { GetServerSideProps } from "next";

interface IProfileProps {
  profileData: IProfileData;
}

const Profile = ({ profileData }: IProfileProps) => {
  return <ProfilePage profileData={profileData} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO call api from backend
  return {
    props: {
      profileData: {
        firstName: "Polapob",
        lastName: "Ratanachayoto",
        userName: "Poom_So_Cool",
        email: "PSC@gmail.com",
      },
    },
  };
};

export default Profile;
