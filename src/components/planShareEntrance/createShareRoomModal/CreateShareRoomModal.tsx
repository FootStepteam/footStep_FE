import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import Close from "./Close";
import Title from "./Title";
import PlanDate from "./PlanDate";
import Button from "./Button";
import { createModalOpenState } from "../../../state/createModalOpen";

const CreateShareRoomModal = () => {
  const [openModal, setOpenModal] = useRecoilState(createModalOpenState);
  const modalRef = useRef<HTMLDivElement>(null);

  const onClickModalBgHandler = (e: MouseEvent) => {
    console.log(e);
    const buttonDOM = document.querySelector("#createBtn");

    if (e.target !== buttonDOM && e.target === modalRef.current) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      document.addEventListener("click", onClickModalBgHandler);
    }
    return () => {
      document.removeEventListener("click", onClickModalBgHandler);
    };
  });

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-[99] animate-modalBgShow"
      role="presentation"
      ref={modalRef}
    >
      <div className="flex flex-col items-center m-center mt-[15rem] w-[24rem] h-[20rem] bg-white rounded-md shadow-md animate-modalShow">
        <Close />
        <Title />
        <PlanDate />
        <Button />
      </div>
    </div>
  );
};

export default CreateShareRoomModal;
