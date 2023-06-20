import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getIncludeShareRoomAPI } from "../../../api/shareRoomAPI";
import { jwtAccessTokenState } from "../../../state/loginState";
import { searchShareRoomData } from "../../../store/searchShareRoom";
import ExistsPlan from "./ExistsPlan";
import NotExistsPlan from "./NotExistsPlan";
import SearchResult from "./SearchResult";
import { getShareRoomList } from "../../../store/getShareRoomList";

const PlanListContent = () => {
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const searchResult = useRecoilValue(searchShareRoomData);
  const token = useRecoilValue(jwtAccessTokenState);

  // const isExists = shareRooms.length !== 0;
  const isExists = shareRooms.length !== 0;

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI(token);
    setShareRooms(result);
  };

  useEffect(() => {
    getShareRooms();
  }, []);

  return (
    <div className="mt-8 w-commonSection">
      <div>{searchResult.shareId !== 0 && <SearchResult />}</div>
      <div>{isExists ? <ExistsPlan /> : <NotExistsPlan />}</div>
    </div>
  );
};

export default PlanListContent;
