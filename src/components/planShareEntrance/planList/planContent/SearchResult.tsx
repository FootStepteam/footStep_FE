import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import testImage from "../../../../assets/temporary/nature-6517866_1920.jpg";
import { ReactComponent as RightArrow } from "../../../../assets/rightArrow.svg";
import { searchShareRoomData } from "../../../../store/searchShareRoom";
import { IShareRoom } from "../../../../type/shareRoom";

const SearchResult = () => {
  const result: IShareRoom = useRecoilValue(searchShareRoomData);

  return (
    <>
      <h1 className="text-xl font-bold">검색결과</h1>
      <div className="mt-8 mb-20 grid grid-cols-2 w-commonSection">
        <Link
          to={`/planShareRoom/${result.shareId}`}
          className="group flex mx-auto my-4 w-[32rem] h-[10rem] border-gray-003 border rounded-xl transition-all duration-100 ease-out hover:scale-105"
        >
          <div className="w-[12rem] h-[10rem]">
            <img
              className="rounded-xl border-black border-1 object-fill"
              width={200}
              height={200}
              src={testImage}
              alt=""
            />
          </div>
          <div className="grow ml-6">
            <div className="mt-4 font-bold text-[1.3rem]">
              {result.shareName}
            </div>
            <div className="mt-1 text-lg">
              {result.travelStartDate} ~ {result.travelEndDate}
            </div>
            <div className="mt-6 text-[0.7rem] text-gray-002">
              <p>여행 일정은 입장코드를 공유 받은 인원만</p>
              <p>입장 가능합니다.</p>
            </div>
          </div>
          <div className="flex justify-center items-center w-12 rounded-r-xl bg-sky-001 transition-all duration-100 ease-out group-hover:w-14">
            <RightArrow width={20} height={20} fill="#FFFFFF"/>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SearchResult;
