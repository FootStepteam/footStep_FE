import { useState } from 'react';

const menus = [
  {
    menu: 'About',
    path: '/',
  },
  {
    menu: '여행일정',
    path: '/',
  },
  {
    menu: '커뮤니티',
    path: '/',
  },
  {
    menu: 'FAQ',
    path: '/',
  },
];

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState('About');

  const onClickMenuHandler = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className="flex grow">
        {menus.map((element) => (
          <div
            key={element.menu}
            className={`flex grow justify-center items-center ${selectedMenu === element.menu && 'text-skyblue-1'}`}
            onClick={() => onClickMenuHandler(element.menu)}
          >
            <p className="text-[1.3rem] font-semibold cursor-pointer">{element.menu}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
