import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getIncludeShareRoomAPI } from "../../../api/shareRoomAPI";
import { searchShareRoomData } from "../../../store/searchShareRoom";
import ExistsPlan from "./ExistsPlan";
import NotExistsPlan from "./NotExistsPlan";
import SearchResult from "./SearchResult";
import { getShareRoomList } from "../../../store/getShareRoomList";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../utils/cookie";

const PlanListContent = () => {
  const navigate = useNavigate();
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const searchResult = useRecoilValue(searchShareRoomData);

  // const isExists = shareRooms.length !== 0;
  const isExists = shareRooms.length !== 0;

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI();
    setShareRooms(result);
  };

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token === undefined) {
      navigate("/login");
    } else {
      getShareRooms();
    }
  }, []);

  return (
    <div className="mt-8 w-commonSection">
      <div>{searchResult.shareId !== 0 && <SearchResult />}</div>
      <div>{isExists ? <ExistsPlan /> : <NotExistsPlan />}</div>
    </div>
  );
};

export default PlanListContent;
