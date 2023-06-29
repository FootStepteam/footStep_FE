import { ChangeEvent, useState, useEffect } from "react";
import { ReactComponent as ChatEmotion } from "../../assets/chatEmotion.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
// import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getMemberByAccessToken } from "../../api/memberAPI";
import { useRecoilValue } from "recoil";
import { shareRoomInfo } from "../../store/shareRoomInfo";
import { getChatRoomDetail, getChatRooms } from "../../api/chatAPI";

interface IChatMessage {
  sender: string;
  content: string;
  type: "JOIN" | "CHAT" | "LEAVE";
}

const colors = [
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
];

const Chat = () => {
  const [stompClient, setStompClient] = useState<any | null>(null);
  const [openChatStatus, setOpenChatStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loadingUsername, setLoadingUsername] = useState<boolean>(true);
  const shareRoomData = useRecoilValue(shareRoomInfo);
  const shareId = shareRoomData.shareId;

  const onClickChatStatusHandler = () => {
    setOpenChatStatus(!openChatStatus);
    connect();
  };

  const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const memberData = await getMemberByAccessToken();
      const userName = memberData.nickname;
      setUsername(userName);
      setLoadingUsername(false);

      const roomId = shareId.toString();
      setRoomId(roomId);

      if (roomId) {
        const roomDetail = await getChatRoomDetail(roomId);
      }

      if (userName && roomId) {
        connect();
      }
    };

    fetchDetails()
      .then(() => console.log("fetchDetails has completed"))
      .catch((error) => console.error("Failed to fetch details:", error));

    return () => {
      disconnect();
    };
  }, [shareId]);

  const connect = () => {
    const socketFactory = () =>
      new window.SockJS("http://43.200.76.174:8080/javatechie");
    const client = Stomp.over(socketFactory);
    setStompClient(client);
    client.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient?.subscribe("/topic/public", onMessageReceived);

    stompClient?.send(
      "/app/chat.send",
      {},
      JSON.stringify({ sender: username, type: "JOIN" })
    );
  };

  const onError = (error: any) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
  };

  const sendMessageHandler = () => {
    if (message && stompClient) {
      const chatMessage: IChatMessage = {
        sender: username!,
        content: message,
        type: "CHAT",
      };

      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  const onMessageReceived = (payload: any) => {
    const message: IChatMessage = JSON.parse(payload.body);

    if (message.type === "JOIN") {
      message.content = message.sender + " joined!";
    } else if (message.type === "LEAVE") {
      message.content = message.sender + " left!";
    }

    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const disconnect = () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect();
    }
  };

  const getAvatarColor = (messageSender: string) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }

    const index = Math.abs(hash % colors.length);
    return colors[index];
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
                  <i style={{ backgroundColor: getAvatarColor(msg.sender) }}>
                    {msg.sender[0]}
                  </i>
                  <span>{msg.sender}</span>
                  <p>{msg.content}</p>
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

// import { Stomp } from "@stomp/stompjs";
// import React, { useState, useEffect, useRef } from "react";
// import SockJS from "sockjs-client";

// interface IChatMessage {
//   sender: string;
//   content: string;
//   type: "JOIN" | "CHAT" | "LEAVE";
// }

// const colors = [
//   "#2196F3",
//   "#32c787",
//   "#00BCD4",
//   "#ff5652",
//   "#ffc107",
//   "#ff85af",
//   "#FF9800",
//   "#39bbb0",
// ];

// const Chat = () => {
//   const [stompClient, setStompClient] = useState<any | null>(null);
//   const [username, setUsername] = useState<string | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const messageArea = useRef<HTMLUListElement>(null);
//   const [messages, setMessages] = useState<IChatMessage[]>([]);

//   const connect = (event: React.FormEvent) => {
//     event.preventDefault();

//     if (username) {
//       const socket = new window.SockJS("http://43.200.76.174:8080/javatechie");
//       const client = Stomp.over(socket);
//       setStompClient(client);
//       client.connect({}, onConnected, onError);
//     }
//   };

//   const onConnected = () => {
//     stompClient?.subscribe(
//       "http://43.200.76.174:8080/topic/public",
//       onMessageReceived
//     );

//     stompClient?.send(
//       "http://43.200.76.174:8080/app/chat.register",
//       {},
//       JSON.stringify({ sender: username, type: "JOIN" })
//     );
//   };

//   const onError = (error: any) => {
//     console.error(
//       "Could not connect to WebSocket server. Please refresh this page to try again!",
//       error
//     );
//   };
//   const sendMessage = (event: React.FormEvent) => {
//     event.preventDefault();

//     if (message && stompClient) {
//       const chatMessage: IChatMessage = {
//         sender: username!,
//         content: message,
//         type: "CHAT",
//       };

//       stompClient.send(
//         "http://43.200.76.174:8080/app/chat.send",
//         {},
//         JSON.stringify(chatMessage)
//       );
//     }
//   };

//   const onMessageReceived = (payload: any) => {
//     const message: IChatMessage = JSON.parse(payload.body);

//     if (message.type === "JOIN") {
//       message.content = message.sender + " joined!";
//     } else if (message.type === "LEAVE") {
//       message.content = message.sender + " left!";
//     }

//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const getAvatarColor = (messageSender: string) => {
//     let hash = 0;
//     for (let i = 0; i < messageSender.length; i++) {
//       hash = 31 * hash + messageSender.charCodeAt(i);
//     }

//     const index = Math.abs(hash % colors.length);
//     return colors[index];
//   };

//   return (
//     <div>
//       <form onSubmit={connect}>
//         <input
//           type="text"
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your name..."
//         />
//         <button type="submit">Connect</button>
//       </form>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//       <ul ref={messageArea}>
//         {messages.map((message, i) => (
//           <li key={i} className={message.type}>
//             <i style={{ backgroundColor: getAvatarColor(message.sender) }}>
//               {message.sender[0]}
//             </i>
//             <span>{message.sender}</span>
//             <p>{message.content}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Chat;

//websocket 버전
// import { ChangeEvent, useState, useEffect } from "react";
// import { ReactComponent as ChatEmotion } from "../../assets/chatEmotion.svg";
// import { ReactComponent as Close } from "../../assets/close.svg";
// import SockJS from "sockjs-client";
// import { Stomp, Client } from "@stomp/stompjs";
// import { getMemberByAccessToken } from "../../api/memberAPI";
// import { useRecoilValue } from "recoil";
// import { shareRoomInfo } from "../../store/shareRoomInfo";
// import { getChatRoomDetail, getChatRooms } from "../../api/chatAPI";

// let stompClient: any;

// const Chat = () => {
//   const [openChatStatus, setOpenChatStatus] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<string[]>([]);
//   const [roomId, setRoomId] = useState<string>("");
//   const [username, setUsername] = useState<string>("");
//   const [loadingUsername, setLoadingUsername] = useState<boolean>(true);
//   const shareRoomData = useRecoilValue(shareRoomInfo);
//   const shareId = shareRoomData.shareId;

//   const onClickChatStatusHandler = () => {
//     setOpenChatStatus(!openChatStatus);
//   };

//   const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setMessage(e.target.value);
//   };

//   const sendMessageHandler = () => {
//     if (message.trim() !== "") {
//       const chatMessage = {
//         roomId: roomId,
//         sender: username,
//         message: message.trim(),
//       };
//       stompClient.publish({
//         destination: "/app/chat/sendMessage",
//         body: JSON.stringify(chatMessage),
//       });
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const memberData = await getMemberByAccessToken();
//       const userName = memberData.nickname;
//       setUsername(userName);
//       setLoadingUsername(false);
//       console.log("username: ", userName); // 이곳에선 최신 값을 얻을 수 있습니다.

//       const roomId = shareId.toString();
//       setRoomId(roomId);

//       if (roomId) {
//         console.log("roomId: ", roomId);
//         const roomDetail = await getChatRoomDetail(roomId);
//       }

//       if (userName && roomId) {
//         console.log("roomId: ", roomId);
//         console.log("loadingUsername: ", loadingUsername);
//         connect(); // 함수에 직접 인자를 전달합니다.
//       }
//     };

//     fetchDetails()
//       .then(() => console.log("fetchDetails has completed"))
//       .catch((error) => console.error("Failed to fetch details:", error));

//     return () => {
//       disconnect();
//     };
//   }, [shareId]);

//   const connect = () => {
//     stompClient = Stomp.over(new WebSocket("ws://43.200.76.174:8080/ws-stomp"));

//     const onConnect = () => {
//       console.log("Connected");
//       stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
//     };

//     const onError = (error: any) => {
//       console.log("Connection failed:", error);
//     };

//     stompClient.connect({}, onConnect, onError);
//     console.log("stompClient: ", stompClient);
//     console.log("Activating stompClient");
//     stompClient.activate();
//   };

//   const onMessageReceived = (payload: any) => {
//     const msg = JSON.parse(payload.body);
//     setMessages((prevMsgs) => [...prevMsgs, msg.message]);
//   };

//   const disconnect = () => {
//     if (stompClient && stompClient.active) {
//       stompClient.deactivate();
//     }
//   };

//   return (
//     <>
//       <div
//         role="button"
//         onClick={onClickChatStatusHandler}
//         className="absolute bottom-10 right-10 w-[5rem] h-[5rem] rounded-full hover:bg-gray-003 cursor-pointer z-[1016]"
//       >
//         <ChatEmotion className="w-[5rem] h-[5rem]" />
//       </div>
//       {openChatStatus && (
//         <div
//           className={`absolute right-5 bottom-10 w-[20rem] h-[35rem] bg-black-002 rounded-2xl z-[1017] ]`}
//         >
//           <div className="flex flex-row-reverse mt-3 mr-4">
//             <Close
//               role="button"
//               onClick={onClickChatStatusHandler}
//               className="w-[25px] h-[25px] fill-white"
//             />
//           </div>
//           <div className="flex flex-col mt-3 m-center w-[18rem] h-[30rem] bg-blue-005 rounded-md">
//             <div className="overflow-y-scroll no-scrollbar mt-3 ml-3 mr-3 mb-3 h-[25rem] bg-blue-007 rounded-md">
//               {messages.map((msg, index) => (
//                 <div key={index} className="mt-3 ml-3 text-white">
//                   {msg}
//                 </div>
//               ))}
//             </div>
//             <textarea
//               placeholder="내용을 입력해주세요"
//               value={message}
//               onChange={onChangeMessageHandler}
//               className="mt-3 ml-3 mr-3 h-[4rem] rounded-md"
//             />
//             <div
//               role="button"
//               onClick={sendMessageHandler}
//               className="m-3 h-[2rem] rounded-md bg-blue-004 hover:bg-blue-003 cursor-pointer text-white flex justify-center items-center"
//             >
//               전송
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chat;
