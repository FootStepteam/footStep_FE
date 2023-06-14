import { useEffect } from "react";
import Map from "./map/Map";
import SideBar from "./sideBar/SideBar";
import { createMap } from "../../api/kakaoAPI";

const PlanShareRoom = () => {
  useEffect(() => {
    createMap();
  }, []);

  return (
    <>
      <SideBar />
      <Map />
    </>
  );
};

export default PlanShareRoom;
