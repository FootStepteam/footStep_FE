import axios from "axios";
import { ISignupFormData } from "../type/signUp";

export const signUp = async (formData: ISignupFormData) => {
  try {
    const response = await axios.post("/api/api/members/sign-up", formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
