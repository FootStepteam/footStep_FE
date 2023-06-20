import { useRecoilValue } from "recoil";
import { searchShareRoomData } from "../../../store/searchShareRoom";
import ExistsPlan from "./ExistsPlan";
import NotExistsPlan from "./NotExistsPlan";
import SearchResult from "./SearchResult";
import { useSharedRoom } from "../../../hooks/useMyShareRoom";

const PlanListContent = () => {
  const searchResult = useRecoilValue(searchShareRoomData);
  const { shareRooms } = useSharedRoom();

  const isExists = shareRooms.length !== 0;

  return (
    <div className="mt-8 w-commonSection">
      <div>{searchResult.shareId !== 0 && <SearchResult />}</div>
      <div>{isExists ? <ExistsPlan /> : <NotExistsPlan />}</div>
    </div>
  );
};

export default PlanListContent;
