import { yupResolver } from "@hookform/resolvers/yup";
import { FocusEvent, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkEmailDuplication, signUp } from "../api/userSignUp";

interface IFormData {
  loginEmail: string;
  password: string;
  checkPassword: string;
  nickname: string;
  gender: string;
}

interface ICheckEmail {
  checkEmailMsg: string;
  check: boolean;
}

interface IGenderType {
  gender: string;
  initial: boolean;
}

export const useSignUpForm = () => {
  const [genderType, setGenderType] = useState<IGenderType>({
    gender: "성별 선택은 필수입니다.",
    initial: true,
  });
  const [isCheckEmail, setIsCheckEmail] = useState<ICheckEmail>({
    checkEmailMsg: "",
    check: false,
  });
  const navigate = useNavigate();

  const formSchema = yup.object({
    loginEmail: yup
      .string()
      .required("이메일은 필수 입력입니다.")
      .email("이메일 형식이 아닙니다.")
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("비밀번호는 필수 입력입니다.")
      .min(8, "최소 8자 필수 입력입니다.")
      .max(16, "최대 16자 까지만 가능합니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        "영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력해주세요."
      ),
    checkPassword: yup
      .string()
      .required("비밀번호 재확인은 필수 입력입니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
    nickname: yup
      .string()
      .required("닉네임은 필수 입력입니다.")
      .min(2, "최소 2자 필수 입력입니다.")
      .max(8, "최대 8자 입력 가능합니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormData>({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const onClickCheckEmailHandler = async () => {
    const loginEmail = getValues().loginEmail;

    if (loginEmail.length === 0 || errors.loginEmail) {
      return;
    }

    const duplication = await checkEmailDuplication(loginEmail);
    if (duplication) {
      setIsCheckEmail({
        checkEmailMsg: "이미 사용중인 이메일입니다.",
        check: false,
      });
    } else {
      setIsCheckEmail({
        checkEmailMsg: "사용가능한 이메일입니다.",
        check: true,
      });
    }
  };

  const onClickGenderHandler = (gender: string) => {
    setGenderType({
      gender,
      initial: false,
    });
  };

  const onKeyDownEmailHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Tab") {
      setIsCheckEmail({
        checkEmailMsg: "",
        check: false,
      });
    }
  };

  const onBlurEmailHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setIsCheckEmail({
        ...isCheckEmail,
        checkEmailMsg: "이메일 입력은 필수입니다.",
      });
      return;
    }

    if (!isCheckEmail.check) {
      setIsCheckEmail({
        ...isCheckEmail,
        checkEmailMsg: "이메일 중복확인은 필수입니다.",
      });
      return;
    }
  };

  const onSubmitHandler = async () => {
    if (genderType.gender === "") {
      setGenderType({
        ...genderType,
        initial: false,
      });
      return;
    } else if (!isCheckEmail.check) {
      setIsCheckEmail({
        ...isCheckEmail,
        checkEmailMsg: "이메일 중복확인은 필수입니다.",
      });
      return;
    }

    const signUpForm = {
      loginEmail: getValues().loginEmail,
      password: getValues().password,
      nickname: getValues().nickname,
      gender: getValues().gender,
    };

    const response = await signUp(signUpForm);

    if (response.status === 200) {
      navigate("/user/welcome");
    }
  };

  return {
    register,
    errors,
    isCheckEmail,
    genderType,
    handleSubmit,
    onSubmitHandler,
    onClickGenderHandler,
    onClickCheckEmailHandler,
    onKeyDownEmailHandler,
    onBlurEmailHandler,
  };
};
