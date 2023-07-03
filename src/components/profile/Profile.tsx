import ParticipatingPlan from "./participatingPlan/ParticipatingPlan";
import ProfileUserInfo from "./profileUserInfo/ProfileUserInfo";

const Profile = () => {
  return (
    <div className="flex w-fit min-h-[55rem] m-center">
      <ProfileUserInfo />
      <ParticipatingPlan />
    </div>
  );
};

export default Profile;
