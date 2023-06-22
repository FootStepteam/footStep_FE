import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { getShareRoomList } from "../store/getShareRoomList";
import { getIncludeShareRoomAPI } from "../api/shareRoomAPI";
import { getCookie } from "../utils/cookie";

export const useSharedRoom = () => {
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const plans = useRecoilValue(getShareRoomList);
  const token = getCookie("accessToken");

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI();

    setShareRooms(result);
  };

  useEffect(() => {
    getShareRooms();
  }, []);

  return { shareRooms, plans, token };
};
