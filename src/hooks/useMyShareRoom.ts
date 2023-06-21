import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { getShareRoomList } from "../store/getShareRoomList";
import { jwtAccessTokenState } from "../state/loginState";
import { getIncludeShareRoomAPI } from "../api/shareRoomAPI";

export const useSharedRoom = () => {
  const [shareRooms, setShareRooms] = useRecoilState(getShareRoomList);
  const plans = useRecoilValue(getShareRoomList);
  const token = useRecoilValue(jwtAccessTokenState);

  const getShareRooms = async () => {
    const result = await getIncludeShareRoomAPI();
    setShareRooms(result);
  };

  useEffect(() => {
    getShareRooms();
  }, []);

  return { shareRooms, plans, token };
};
