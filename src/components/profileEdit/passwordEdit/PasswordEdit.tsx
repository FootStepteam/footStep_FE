const PasswordEdit = () => {
  return (
    <div className="h-tabInSection">
      <form className="flex flex-col m-center pt-20 w-[15rem]">
        <input
          type="password"
          placeholder="현재 비밀번호를 입력하세요."
          className="px-4 py-3 border border-gray-002 rounded-md outline-none text-sm"
        />
        <input
          type="password"
          placeholder="새로운 비밀번호"
          className="mt-3 px-4 py-3 border border-gray-002 rounded-md outline-none text-sm"
        />
        <input
          type="password"
          placeholder="비밀번호 재확인"
          className="mt-3 px-4 py-3 border border-gray-002 rounded-md outline-none text-sm"
        />
        <button
          type="button"
          className="mt-4 h-12 bg-skyblue-1 rounded-md text-white text-lg font-bold"
        >
          변경
        </button>
      </form>
    </div>
  );
};

export default PasswordEdit;
