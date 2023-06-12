import axios from "axios";

export const getShareRoomAPI = async (shareCode: string) => {
  const response = await axios.get(`/api/api/share-room/find?q=${shareCode}`);

  return response;
};

export const createShareRoomAPI = async () => {
  const response = await axios.post("/api/api/share-room", {
    shareName: "테스트",
    travelStartDate: "20230612",
    travelEndDate: "20230620",
    imageUrl: "",
  });
  return response;
};
