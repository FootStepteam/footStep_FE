import { useRecoilState } from "recoil";
import { createModalOpenState } from "../../../../state/createModalOpen";

const PlanListHeader = () => {
  const [open, setOpen] = useRecoilState(createModalOpenState);

  const onClickHandler = () => {
    setOpen(!open);
  };

  return (
    <div className="m-center w-commonSection">
      <div className="flex flex-row-reverse">
        <button
          id="createBtn"
          type="button"
          className="px-4 py-3 float-right bg-sky-005 rounded-xl font-bold text-white "
          onClick={onClickHandler}
        >
          방 생성하기
        </button>
      </div>
    </div>
  );
};

export default PlanListHeader;
