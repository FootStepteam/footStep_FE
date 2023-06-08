import { useState } from "react";
import { Link } from "react-router-dom";

function Tab() {
  const [selected, setSelected] = useState("profileEdit");

  const tabs = [
    {
      menu: "profileEdit",
      text: "회원정보수정",
      path: "/user/profile/edit",
    },
    {
      menu: "passwordEdit",
      text: "비밀번호변경",
      path: "/user/profile/edit",
    },
    {
      menu: "userSecession",
      text: "회원탈퇴",
      path: "/user/profile/edit",
    },
  ];

  const onClickHandler = (menu: string) => {
    setSelected(menu);
  };

  return (
    <div className="flex justify-center items-center w-full border-y border-[#DCDCDC]">
      {tabs.map((tab) => (
        <Link
          key={tab.menu}
          className={`mx-2 px-2 py-4 text-md font-${
            selected === tab.menu &&
            "border-b-2 border-skyblue-1 text-skyblue-1 text-lg font-bold"
          }`}
          onClick={() => onClickHandler(tab.menu)}
          to={tab.path}
        >
          {tab.text}
        </Link>
      ))}
    </div>
  );
}

export default Tab;
