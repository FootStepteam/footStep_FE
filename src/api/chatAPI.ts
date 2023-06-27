import axios from "axios";
import { getCookie } from "../utils/cookie";

export const createChatRoom = async (name: string) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.post("/api/chat/createroom", null, {
      params: {
        name: name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
