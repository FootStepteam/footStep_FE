const PasswordEdit = () => {
  return (
    <div className="h-tabInSection">
      <form className="flex flex-col m-center pt-20 w-[20rem]">
        <input
          type="password"
          placeholder="현재 비밀번호를 입력하세요."
          className="p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
        />
        <input
          type="password"
          placeholder="새로운 비밀번호"
          className="mt-2 p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
        />
        <input
          type="password"
          placeholder="비밀번호 재확인"
          className="mt-2 p-4 border border-gray-002 rounded-sm outline-none placeholder:text-sm"
        />
        <button
          type="button"
          className="mt-8 h-16 bg-sky-001 hover:bg-sky-002 rounded-sm text-white text-lg font-bold"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PasswordEdit;
