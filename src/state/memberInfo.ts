import { atom } from "recoil";

const initialValue = {
  gender: "",
  img: "",
  loginEmail: "",
  memberId: 0,
  nickname: "",
  password: "",
};

export const memberInfo = atom<IMember>({
  key: "memebtInfo",
  default: initialValue,
});
