import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserProfile from "./components/UserProfile";
import UserReviewList from "./components/UserReviewList";
import Header from "../components/Header";

export const metadata = {
  title: "마이 페이지",
};

const Page = async () => {
  await getServerSession(authOptions).then((res) => {
    if (!res) {
      redirect("/");
    }
  });

  return (
    <div>
      <Header />
      <UserProfile />
      <UserReviewList />
    </div>
  );
};

export default Page;
