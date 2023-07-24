import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import testImage from "../../../assets/temporary/nature-6517866_1920.jpg";
import { ReactComponent as RightArrow } from "../../../assets/rightArrow.svg";
import { searchShareRoomData } from "../../../store/searchShareRoom";
import { IShareRoom } from "../../../type/planShareRoom";
import { sendTokenEnteringShareRoom } from "../../../api/shareRoomAPI";

const SearchResult = () => {
  const result: IShareRoom = useRecoilValue(searchShareRoomData);

  return (
    <>
      <h1 className="md:ml-16 w-full md:w-[20rem] text-center md:text-left text-2xl font-bold">
        검색결과
      </h1>
      <div className="mt-8 mb-20 px-2 md:px-0 w-full md:w-commonSection">
        <Link
          to={`/planShareRoom/${result.shareId}`}
          className="group flex flex-col md:flex-row mx-auto my-4 w-full md:w-[60rem] h-[20rem] md:h-[15rem] border-gray-003 border rounded-xl transition-all duration-100 ease-out hover:scale-105"
          onClick={() => sendTokenEnteringShareRoom(result.shareId)}
        >
          <div className="w-full md:w-[20rem] h-full md:h-[14.9rem] rounded-t-xl md:rounded-tr-none md:rounded-l-xl overflow-hidden">
            <img
              className="h-full w-full md:rounded-l-xl object-cover"
              width={320}
              height={240}
              src={testImage}
              alt=""
            />
          </div>
          <div className="grow ml-6">
            <div className="mt-10 font-bold text-3xl">{result.shareName}</div>
            <div className="mt-4 text-2xl">
              {result.travelStartDate} ~ {result.travelEndDate}
            </div>
            <div className="mt-12 mb-4 md:mb-0 text-sm text-gray-002">
              <p>여행 일정은 입장코드를 공유 받은 인원만 입장 가능합니다.</p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-[15rem] md:h-full md:w-20 rounded-b-xl md:rounded-bl-none md:rounded-r-xl bg-sky-002 transition-all duration-100 ease-out md:group-hover:w-24">
            <RightArrow width={20} height={20} fill="#FFFFFF" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default SearchResult;
