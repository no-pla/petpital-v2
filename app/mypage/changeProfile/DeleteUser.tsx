"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

const DeleteUser = () => {
  const { data: session }: any = useSession();
  const onRemoveUser = async () => {
    try {
      await fetch("/api/user", {
        method: "DELETE",
        body: JSON.stringify({ userId: session.user.id }),
      });
    } catch (error) {
      return;
    }
    signOut();
  };
  return (
    <div className="mt-4 pt-[10%] text-right pr-12">
      <button onClick={onRemoveUser}>회원 탈퇴</button>
    </div>
  );
};

export default DeleteUser;
