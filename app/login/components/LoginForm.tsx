"use client";

import React from "react";
import CustomInput from "@/app/register/components/CustomInput";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/share/utils";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const methods = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onLogin = async ({ email, password }: LoginData) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!result?.ok) {
        throw new Error(result?.error!);
      }
    } catch (error) {
      // TODO: 에러 처리
      console.log(error);
      return;
    }
    router.push("/");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onLogin(data))}>
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
        <button>로그인</button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
