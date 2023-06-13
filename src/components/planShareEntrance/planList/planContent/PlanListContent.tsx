import { useRecoilValue } from "recoil";
import ExistsPlan from "./ExistsPlan";
import NotExistsPlan from "./NotExistsPlan";
import SearchResult from "./SearchResult";
import { searchShareRoomData } from "../../../../store/searchShareRoom";

const PlanListContent = () => {
  const plans = ["a"];
  const isExists = plans.length !== 0;
  const searchResult = useRecoilValue(searchShareRoomData);

  return (
    <div className="mt-8 w-commonSection">
      <div>{searchResult.shareId !== 0 && <SearchResult />}</div>
      <div>{isExists ? <ExistsPlan /> : <NotExistsPlan />}</div>
    </div>
  );
};

export default PlanListContent;
