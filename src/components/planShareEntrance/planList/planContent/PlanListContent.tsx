import { useRecoilState, useRecoilValue } from "recoil";
import ExistsPlan from "./ExistsPlan";
import NotExistsPlan from "./NotExistsPlan";
import SearchResult from "./SearchResult";
import { searchShareRoomData } from "../../../../store/searchShareRoom";
import { getShareRoomList } from "../../../../store/getShareRoomList";
import { useEffect } from "react";
import { getIncludeShareRoomAPI } from "../../../../api/shareRoomAPI";

const PlanListContent = () => {
  // const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const searchResult = useRecoilValue(searchShareRoomData);
  const test = ["1", "2", "3", "4"];

  // const isExists = shareRooms.length !== 0;
  const isExists = test.length !== 0;

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI();
    // setShareRooms(result);
  }

  useEffect(() => {
    getShareRooms();
  }, [])

  return (
    <div className="mt-8 w-commonSection">
      <div>{searchResult.shareId !== 0 && <SearchResult />}</div>
      <div>{isExists ? <ExistsPlan /> : <NotExistsPlan />}</div>
    </div>
  );
};

export default PlanListContent;
