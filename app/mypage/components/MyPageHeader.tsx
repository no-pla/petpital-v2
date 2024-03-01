import Link from "next/link";
import React from "react";
import { LuArrowLeftCircle } from "react-icons/lu";

const MyPageHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center pb-[30px] relative max-w-[1200px] mx-auto">
      {title !== "마이페이지" && (
        <Link
          href="/mypage"
          className="text-center flex gap-1 items-center absolute left-7"
        >
          <LuArrowLeftCircle />
          이전으로
        </Link>
      )}
      <div
        className={`text-[20px] font-semibold ${
          title === "마이페이지" ? "text-white" : "text-black"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default MyPageHeader;
