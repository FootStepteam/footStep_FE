import ParticipatingPlan from './participatingPlan/ParticipatingPlan';
import ProfileUserInfo from './profileUserInfo/ProfileUserInfo';

const Profile = () => {
  return (
    <>
      <div className="flex w-commonSection min-h-content m-center">
        <ProfileUserInfo />
        <ParticipatingPlan />
      </div>
    </>
  );
};

export default Profile;
