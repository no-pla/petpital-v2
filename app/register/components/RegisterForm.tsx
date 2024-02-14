"use client";
import React from "react";
import CustomInput from "./CustomInput";
import { useForm, FormProvider } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/share/utils";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const RegisterForm = () => {
  const methods = useForm<RegisterData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    mode: "onChange",
  });

  const onSubmit = async ({ email, password, nickname }: RegisterData) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password, nickname }),
      });
      const response = await res.json();
      console.log(response);
      if (!response.ok) {
        throw new Error(response.message);
      }
    } catch (error) {
      //TODO: 에러 핸들링
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data))}
        className="flex flex-col"
      >
        <CustomInput
          type="string"
          label="email"
          placeholder="이메일"
          validation={{
            required: {
              value: true,
              message: "필수 입력값입니다.",
            },
            pattern: {
              value: emailRegex,
              message: "이메일 형식이 옳지 않습니다.",
            },
          }}
        />
        <CustomInput
          type="password"
          label="password"
          placeholder="비밀번호"
          validation={{
            required: {
              value: true,
              message: "필수 입력값입니다.",
            },
            pattern: {
              value: passwordRegex,
              message: "비밀번호 형식이 옳지 않습니다.",
            },
          }}
        />
        <CustomInput
          type="password"
          label="confirmPassword"
          placeholder="비밀번호 확인"
          validation={{
            validate: (value: string) =>
              value === methods.watch("password") ||
              "비밀번호가 일치하지 않습니다.",
            required: {
              value: true,
              message: "필수 입력 값입니다.",
            },
          }}
        />
        <CustomInput
          type="text"
          label="nickname"
          placeholder="닉네임"
          validation={{
            minLength: {
              value: 2,
              message: "닉네임은 1글자 이상 18글자 이하로 설정해 주세요.",
            },
            maxLength: {
              value: 18,
              message: "닉네임은 1글자 이상 18글자 이하로 설정해 주세요.",
            },
            required: {
              value: true,
              message: "필수 입력 값입니다.",
            },
          }}
        />
        <button>회원가입</button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
