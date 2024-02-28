import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/app/components/Header";
import MyPageHeader from "../components/MyPageHeader";
import UserProfile from "../components/UserProfile";
import UpdateForm from "./UpdateForm";

const Page = async () => {
  await getServerSession(authOptions).then((res) => {
    if (!res) {
      redirect("/");
    }
  });
  return (
    <div className="pt-[90px] bg-[#FAFAFA] min-h-screen w-screen">
      <Header />
      <MyPageHeader title="프로필 변경" />
      <UpdateForm />
    </div>
  );
};

export default Page;
