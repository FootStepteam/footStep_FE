import axios from "axios";
import {
  ICreateShareRoomFormValue,
  ISubmitShareRoomData,
} from "../type/shareRoom";
import { getCookie, setCookie } from "../utils/cookie";
import Swal from "sweetalert2";
import { checkTokenAPI, refreshTokenAPI } from "./tokenAPI";

// 공유코드로 공유방 찾기
export const getShareRoomAPI = async (shareCode: number) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }
  try {
    const response = await axios.get(
      `/api/api/share-room/find?q=${shareCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
    }
  }
};

// 공유방 생성
export const createShareRoomAPI = async (
  formValue: ICreateShareRoomFormValue
) => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }

  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: "",
  };

  try {
    const response = await axios.post("/api/api/share-room", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
    }
  }
};

// 참여중인 공유방 리스트 조회
export const getIncludeShareRoomAPI = async () => {
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }

  try {
    const response = await axios.get("/api/api/share-room?page=0&size=20", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
    }
  }
};

// 공유방 상세정보 조회
export const getShareRoomDetailAPI = async (shareRoomID: string) => {
  const id = Number(shareRoomID);
  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }
  try {
    const response = await axios.get(`/api/api/share-room/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      const errorCode = error.response?.data.errorCode;
      console.log(errorCode);
    }
  }
};

// 공유방 정보 수정
export const editShareRoomInfoAPI = async (
  shareRoomID: number,
  formValue: ICreateShareRoomFormValue
) => {
  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: "",
  };

  let token = getCookie("accessToken");
  const isAvailableToken = await checkTokenAPI(token);

  if (!isAvailableToken) {
    token = await refreshTokenAPI();
  }

  const response = await axios.put(`/api/api/share-room/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status;
};

export const recommendPlacesAPI = async (keyword: string) => {
  const KEY = "accessToken";
  const token = getCookie(KEY);

  try {
    const response = await axios.get(
      `/api/api/share-room/recommend?keyword=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data.errorCode;
    }
  }
};

export const uploadImageAPI = async (formData: FormData) => {
  const boundary = "----WebKitFormBoundary";

  console.log(formData);

  try {
    const response = await axios.post(
      `/api/api/upload?image&shareRoomId`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const sendImageKaKaoAPI = async (
  authorizationCode: string,
  shareRoomID: number
) => {
  try {
    const response = await axios.post(`/api/api/sendme/${shareRoomID}`, {
      authorizationCode,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        text: "나에게로 일정 공유를 완료했습니다.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "처리 중 오류가 발생하였습니다.",
    });
  }
};

export const sendTokenEnteringShareRoom = async (shareId: number) => {
  const accessToken = getCookie("accessToken");
  const response = await axios.post(`/api/api/share-room/${shareId}/enter`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  return response.data;
};
