import ParticipatingPlan from "./participatingPlan/ParticipatingPlan";
import ProfileUserInfo from "./profileUserInfo/ProfileUserInfo";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[55rem] m-center">
      <ProfileUserInfo />
      <ParticipatingPlan />
    </div>
  );
};

export default Profile;
