import axios from "axios";
import { TLoginFormData } from "../type/emailLogin";

export const signInWithEmail = async (data: TLoginFormData): Promise<any> => {
  try {
    const response = await axios.post("/api/api/members/sign-in", {
      loginEmail: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
