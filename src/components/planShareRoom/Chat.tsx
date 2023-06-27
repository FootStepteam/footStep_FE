import { ChangeEvent, useState, useEffect } from "react";
import { ReactComponent as ChatEmotion } from "../../assets/chatEmotion.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getMemberByAccessToken } from "../../api/memberAPI";
import { getShareRoomInfoAPI } from "../../api/shareRoomAPI";
import { useRecoilValue } from "recoil";
import { shareRoomInfo } from "../../store/shareRoomInfo";

let stompClient: any;

const Chat = () => {
  const [openChatStatus, setOpenChatStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loadingUsername, setLoadingUsername] = useState<boolean>(true);
  const shareRoomData = useRecoilValue(shareRoomInfo);
  const shareId = shareRoomData.shareId;

  const onClickChatStatusHandler = () => {
    setOpenChatStatus(!openChatStatus);
  };

  const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = () => {
    if (message.trim() !== "") {
      const chatMessage = {
        roomId: roomId,
        sender: username,
        message: message.trim(),
      };
      stompClient.publish(
        "/app/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setMessage("");
    }
  };

  useEffect(() => {
    getMemberByAccessToken().then((memberData) => {
      setUsername(memberData.nickname);
      setLoadingUsername(false);
    });

    getShareRoomInfoAPI(shareId.toString()).then((roomData) => {
      setRoomId(roomData.shareId);
    });

    if (!loadingUsername) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [loadingUsername, shareId]);

  const connect = () => {
    const socket = new SockJS("http://43.200.76.174:8080/ws-stomp");

    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected");
        stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
      },
      onStompError: (error) => {
        console.log("Stomp error:", error);
      },
    });

    stompClient.activate();
  };

  const onMessageReceived = (payload: any) => {
    const msg = JSON.parse(payload.body);
    setMessages((prevMsgs) => [...prevMsgs, msg.message]);
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.deactivate();
    }
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
            <div className="overflow-y-scroll no-scrollbar mt-3 ml-3 mr-3 mb-3 h-[25rem] bg-blue-007 rounded-md">
              {messages.map((msg, index) => (
                <div key={index} className="mt-3 ml-3 text-white">
                  {msg}
                </div>
              ))}
            </div>
            <textarea
              placeholder="내용을 입력해주세요"
              value={message}
              onChange={onChangeMessageHandler}
              className="mt-3 ml-3 mr-3 h-[4rem] rounded-md"
            />
            <div
              role="button"
              onClick={sendMessageHandler}
              className="m-3 h-[2rem] rounded-md bg-blue-004 hover:bg-blue-003 cursor-pointer text-white flex justify-center items-center"
            >
              전송
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
