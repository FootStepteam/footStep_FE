import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendImageKaKaoAPI } from "../../api/shareRoomAPI";
import Spinner from "../common/spinner/Spinner";

const KakaoSendImage = () => {
  const navigate = useNavigate();

  const sendImage = async (code: string, shareRoomID: number) => {
    sendImageKaKaoAPI(code, shareRoomID);
    navigate(`/planShareRoom/${shareRoomID}`);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code") as string;
    const shareRoomID = sessionStorage.getItem("shareRoomID");

    if (code && shareRoomID) {
      sendImage(code, Number(shareRoomID));
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <Spinner />
    </div>
  );
};
export default KakaoSendImage;
