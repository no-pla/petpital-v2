import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserProfile from "./components/UserProfile";
import UserReviewList from "./components/UserReviewList";

const Page = async () => {
  await getServerSession(authOptions).then((res) => {
    if (!res) {
      redirect("/");
    }
  });

  return (
    <div>
      <UserProfile />
      <UserReviewList />
    </div>
  );
};

export default Page;
