import ParticipatingPlan from "./participatingPlan/ParticipatingPlan";
import ProfileUserInfo from "./profileUserInfo/ProfileUserInfo";

const Profile = () => {
  return (
    <div className="flex pt-[112px] w-fit min-h-screen m-center">
      <ProfileUserInfo />
      <ParticipatingPlan />
    </div>
  );
};

export default Profile;
