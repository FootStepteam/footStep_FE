import { useParams } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import Tab from "../components/profileEdit/Tab";
import ProfileEdit from "../components/profileEdit/edit/ProfileEdit";
import PasswordEdit from "../components/profileEdit/passwordEdit/PasswordEdit";
import Secession from "../components/profileEdit/secession/Secession";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Toggle from "../components/common/header/toggle/Toggle";

const ProfileEditPage = () => {
  const { path } = useParams();
  useRequireAuth();

  return (
    <>
      <Toggle />
      <HeaderContainer />
      <Tab />
      {path === "edit" && <ProfileEdit />}
      {path === "passwordEdit" && <PasswordEdit />}
      {path === "secession" && <Secession />}
      <Footer />
    </>
  );
};

export default ProfileEditPage;
