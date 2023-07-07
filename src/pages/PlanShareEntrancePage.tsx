import { useRecoilValue } from "recoil";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import PlanShareEntrance from "../components/planShareEntrance/PlanShareEntrance";
import CreateShareRoomModal from "../components/planShareEntrance/createShareRoomModal/CreateShareRoomModal";
import { createModalOpenState } from "../state/createModalOpen";
import { useRequireAuth } from "../hooks/useRequireAuth";

const PlanShareEntrancePage = () => {
  const open = useRecoilValue(createModalOpenState);
  useRequireAuth();

  return (
    <>
      <HeaderContainer />
      <PlanShareEntrance />
      <Footer />
      {open && <CreateShareRoomModal />}
    </>
  );
};

export default PlanShareEntrancePage;
