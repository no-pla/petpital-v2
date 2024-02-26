import React from "react";
import RegisterForm from "./components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async () => {
  await getServerSession(authOptions).then((res) => {
    if (res) {
      redirect("/");
    }
  });

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Page;
