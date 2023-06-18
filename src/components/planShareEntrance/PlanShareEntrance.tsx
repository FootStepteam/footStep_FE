import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { createModalOpenState } from "../../state/createModalOpen";
import PlanList from "./planList/PlanList";
import SearchCodeBar from "./searchCodeBar/SearchCodeBar";

const PlanShareEntrance = () => {
  const openModal = useRecoilValue(createModalOpenState);

  const bodyStyleControl = () => {
    const bodyDOM = document.querySelector("body");

    if (bodyDOM != null) {
      if (openModal) {
        bodyDOM.style.overflow = "hidden";
      } else {
        bodyDOM.style.overflow = "auto";
      }
    }
  };

  useEffect(() => {
    bodyStyleControl();
  }, [openModal]);

  return (
    <div className="w-full">
      <SearchCodeBar />
      <PlanList />
    </div>
  );
};

export default PlanShareEntrance;
