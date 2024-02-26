import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UpdateForm from "./UpdateForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  await getServerSession(authOptions).then((res) => {
    if (!res) {
      redirect("/");
    }
  });
  return <UpdateForm />;
};

export default Page;
