import React from "react";
import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "로그인",
};

const Page = async () => {
  await getServerSession(authOptions).then((res) => {
    if (res) {
      redirect("/");
    }
  });

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Page;
