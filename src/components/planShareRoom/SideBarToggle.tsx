import { useRecoilState } from "recoil";
import { ReactComponent as Toggle } from "../../assets/menu.svg";
import { sideBarState } from "../../state/sidebarState";

const SideBarToggle = () => {
  const [sideBarOpenState, setSideBarOpenState] = useRecoilState(sideBarState);

  const onClickToggle = () => {
    setSideBarOpenState({ ...sideBarOpenState, schedule: true });
  };

  return (
    <>
      <div className="absolute mt-4 ml-4 p-2 hover:bg-gray-006 rounded-full cursor-pointer z-[1005] transition-[background-color] duration-200">
        <Toggle
          className="w-[50px] h-[50px]"
          onClick={onClickToggle}
        />
      </div>
    </>
  );
};

export default SideBarToggle;
