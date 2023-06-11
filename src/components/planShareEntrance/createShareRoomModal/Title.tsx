import React, { useState } from "react";

const Title = () => {
  const [title, setTitle] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="일정 제목을 입력하세요"
        className="px-4 py-4 w-[15rem] outline-none text-lg placeholder:text-base placeholder:font-light"
        maxLength={20}
        onChange={onChangeHandler}
      />
      <p className="text-xl text-[#A5A5A5]">{title.length} / 20</p>
    </div>
  );
};

export default Title;
