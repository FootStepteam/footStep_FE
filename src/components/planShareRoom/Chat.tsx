import { ChangeEvent, useState } from "react";
import { ReactComponent as ChatEmotion } from "../../assets/chatEmotion.svg";
import { ReactComponent as Close } from "../../assets/close.svg";

const Chat = () => {
  const [openChatStatus, setOpenChatStatue] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onClickChatStatusHandler = () => {
    setOpenChatStatue(!openChatStatus);
  };

  const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div
        role="button"
        onClick={onClickChatStatusHandler}
        className="absolute bottom-10 right-10 w-[5rem] h-[5rem] rounded-full hover:bg-gray-003 cursor-pointer z-[1016]"
      >
        <ChatEmotion className="w-[5rem] h-[5rem]" />
      </div>
      {openChatStatus && (
        <div
          className={`absolute right-5 bottom-10 w-[20rem] h-[35rem] bg-black-002 rounded-2xl z-[1017] ]`}
        >
          <div className="flex flex-row-reverse mt-3 mr-4">
            <Close
              role="button"
              onClick={onClickChatStatusHandler}
              className="w-[25px] h-[25px] fill-white"
            />
          </div>
          <div className="flex flex-col mt-3 m-center w-[18rem] h-[30rem] bg-blue-005 rounded-md">
            <div className="grow">
              <div>asd</div>
            </div>
            <div className="flex m-center w-[18rem] h-[4rem] bg-white">
              <textarea
                onChange={onChangeMessageHandler}
                className="px-3 py-2 w-[14rem] rounded-md outline-none text-sm resize-none"
                placeholder="메세지를 입력하세요."
                maxLength={50}
              />
              <button
                type="button"
                className="ml-0.5 my-auto w-[3.5rem] h-[2.5rem] bg-yellow-001 disabled:bg-gray-003 rounded-md text-sm text-black-003"
                disabled={message.length === 0 ? true : false}
              >
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
