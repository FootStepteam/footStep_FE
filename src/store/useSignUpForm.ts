import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { signUpFormState } from "../state/signUpFormState";

export const useSignUpForm = () => {
  const [formData, setFormData] = useRecoilState(signUpFormState);

  const updateForm = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    formData,
    updateForm,
  };
};
