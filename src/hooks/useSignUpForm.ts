import { yupResolver } from "@hookform/resolvers/yup";
import { FocusEvent, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkEmailDuplication, signUp } from "../api/userSignUp";
import { checkNicknameDuplication } from "../api/profileAPI";

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

interface ICheckNickname {
  checkNicknameMsg: string;
  check: boolean;
}

interface IGenderType {
  gender: string;
  initial: boolean;
}

export const useSignUpForm = () => {
  const [genderType, setGenderType] = useState<IGenderType>({
    gender: "",
    initial: true,
  });
  const [isCheckEmail, setIsCheckEmail] = useState<ICheckEmail>({
    checkEmailMsg: "",
    check: false,
  });
  const [isCheckNickname, setIsCheckNickname] = useState<ICheckNickname>({
    checkNicknameMsg: "",
    check: false,
  });
  const navigate = useNavigate();

  const formSchema = yup.object({
    loginEmail: yup
      .string()
      .required("이메일 입력은 필수입니다.")
      .email("이메일 형식이 아닙니다.")
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("비밀번호 입력은 필수입니다.")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 최대 16자까지 가능합니다.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        "영문, 숫자, 특수문자를 포함한 8~16자 비밀번호를 입력해주세요."
      ),
    checkPassword: yup
      .string()
      .required("비밀번호 확인은 필수입니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
    nickname: yup
      .string()
      .required("닉네임 입력은 필수입니다.")
      .min(2, "닉네임은 최소 2자 이상으로 작성해주세요.")
      .max(10, "닉네임은 최대 10자 이하로 작성해주세요."),
    gender: yup
      .string()
      .required("성별 선택은 필수입니다.")
      .oneOf(["male", "female"], "성별을 선택해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const onClickCheckNicknameHandler = async () => {
    const nickname = getValues().nickname;

    if (nickname.length < 2 || nickname.length > 10 || errors.nickname) {
      setIsCheckNickname({
        checkNicknameMsg: "닉네임은 2자 이상 10자 이내로 작성해주세요.",
        check: false,
      });
      return;
    }

    try {
      const response = await checkNicknameDuplication(nickname);

      if (response) {
        setIsCheckNickname({
          checkNicknameMsg: "이미 사용중인 닉네임입니다.",
          check: false,
        });
      } else {
        setIsCheckNickname({
          checkNicknameMsg: "사용 가능한 닉네임입니다.",
          check: true,
        });
      }
    } catch (error: any) {
      if (error.response.status === 500) {
        setIsCheckNickname({
          checkNicknameMsg:
            "서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
          check: false,
        });
      }
    }
  };

  const onClickGenderHandler = (gender: string) => {
    setGenderType({
      gender,
      initial: false,
    });

    setValue("gender", gender);
  };

  const onKeyDownNicknameHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Tab") {
      setIsCheckNickname({
        checkNicknameMsg: "",
        check: false,
      });
    }
  };

  const onBlurNicknameHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setIsCheckNickname({
        ...isCheckNickname,
        checkNicknameMsg: "닉네임 입력은 필수입니다.",
      });
      return;
    }

    if (!isCheckNickname.check) {
      setIsCheckNickname({
        ...isCheckNickname,
        checkNicknameMsg: "닉네임 중복확인은 필수입니다.",
      });
      return;
    }
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
    if (!isCheckEmail.check) {
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
    onClickCheckNicknameHandler,
    onKeyDownNicknameHandler,
    onBlurNicknameHandler,
    isCheckNickname,
    setValue,
  };
};
