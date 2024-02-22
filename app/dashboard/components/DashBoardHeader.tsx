"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./search/SearchInput";

const DashBoardHeader = () => {
  const router = useRouter();
  return (
    <div className="bg-[#15B5BF] p-2 sticky top-0 left-0 z-10">
      <div className="flex justify-between">
        <button onClick={() => router.push("/")}>이전으로</button>
        <button>닫기</button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
