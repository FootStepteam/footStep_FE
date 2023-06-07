import ParticipatingPlan from './participatingPlan/ParticipatingPlan';
import ProfileUserInfo from './profileUserInfo/ProfileUserInfo';

const Profile = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-commonSection min-h-content border border-2 border-indigo-600 m-center">
        <ProfileUserInfo />
        <ParticipatingPlan />
      </div>
    </>
  );
};

export default Profile;
