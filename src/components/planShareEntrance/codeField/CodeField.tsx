const CodeField = () => {
  return (
    <div className="w-full h-52 bg-main-color">
      <div className="mx-auto pt-10 w-[55rem]">
        <p className="m-center w-[31rem] text-white text-lg font-bold">
          친구들과 자유롭게 계획하는 실시간 여행 일정 계획 플랫폼, 발자국
        </p>
        <input
          type="text"
          placeholder="초대코드를 8자리를 입력해주세요. ex) 000000"
          maxLength={8}
          className="block m-center px-8 mt-4 w-[45rem] h-[5rem] bg-white rounded-3xl outline-none"
        />
      </div>
    </div>
  );
};

export default CodeField;