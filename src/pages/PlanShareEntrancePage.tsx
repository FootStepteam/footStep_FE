import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import PlanShareEntrance from "../components/planShareEntrance/PlanShareEntrance";
import CreateShareRoomModal from "../components/planShareEntrance/createShareRoomModal/CreateShareRoomModal";
import { createModalOpenState } from "../state/createModalOpen";

const PlanShareEntrancePage = () => {
  const open = useRecoilValue(createModalOpenState);

  useEffect(() => {
    console.log(open);
  }, [open]);

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
