import { ReactComponent as Line } from "../../assets/line.svg";

const Step = () => {
  return (
    <section className="grid grid-cols-2 w-full h-[45rem] bg-gray-006">
      <div className="grow py-44 text-2xl">
        <div className="ml-[30rem] w-[23rem]">
          <p className="py-2">일정 만드는 법 매우 간단해요.</p>
          <p className="py-2">여행일자, 가고싶은 장소만 선택하면</p>
          <p className="py-2">일정이 완성이 되는 발자국 플랫폼</p>
        </div>
      </div>
      <div className="grow px-36 py-20 ">
        <p className="text-3xl font-bold">STEP</p>
        <div className="mt-4">
          <div className="flex">
            <div className="flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-red-001 rounded-[100%]">
              <p className="text-3xl font-bold text-white">1</p>
            </div>
            <div className="flex items-center ml-4">
              <p className="text-xl">여행일자 선택</p>
            </div>
          </div>
          <Line className="w-[4.4rem]" />
          <div className="flex">
            <div className="flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-orange-001 rounded-[100%]">
              <p className="text-3xl font-bold text-white">2</p>
            </div>
            <div className="flex items-center ml-4">
              <p className="text-xl">장소 선택</p>
            </div>
          </div>
          <Line className="w-[4.4rem]" />
          <div className="flex">
            <div className="flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-yellow-001 rounded-[100%]">
              <p className="text-3xl font-bold text-white">3</p>
            </div>
            <div className="flex items-center ml-4">
              <p className="text-xl">일정 생성</p>
            </div>
          </div>
          <Line className="w-[4.4rem]" />
          <div className="flex">
            <div className="flex justify-center items-center w-[4.5rem] h-[4.5rem] bg-green-001 rounded-[100%]">
              <p className="text-3xl font-bold text-white">4</p>
            </div>
            <div className="flex items-center ml-4">
              <p className="text-xl">일정 공유</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
