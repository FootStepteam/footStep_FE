import Close from "./Close";
import Title from "./Title";
import PlanDate from "./PlanDate";
import Button from "./Button";

const CreateShareRoomModal = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-[99] animate-modalBgShow">
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
