import axios from 'axios';
import { ICreateShareRoomFormValue, ISubmitShareRoomData } from '../type/shareRoom';

export const getShareRoomAPI = async (shareCode: string) => {
  try {
    const response = await axios.get(`/api/api/share-room/find?q=${shareCode}`);
    return response;
  } catch (error) {
    alert(error);
  }
};

export const createShareRoomAPI = async (formValue: ICreateShareRoomFormValue, token: string) => {
  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: '',
  };

  const response = await axios.post('/api/api/share-room', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response;
};

export const getIncludeShareRoomAPI = async (token: string) => {
  const response = await axios.get('/api/api/share-room?page=0&size=20', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getShareRoomInfoAPI = async (shareRoomID: string, token: string) => {
  const id = Number(shareRoomID);
  const response = await axios.get(`/api/api/share-room/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};

export const editShareRoomInfoAPI = async (shareRoomID: string, token: string, formValue:ICreateShareRoomFormValue) => {
  const id = Number(shareRoomID);

  const data: ISubmitShareRoomData = {
    shareName: formValue.title,
    travelStartDate: formValue.startDate,
    travelEndDate: formValue.endDate,
    imageUrl: '',
  };

  const response = await axios.put(`/api/api/share-room/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.status;
}