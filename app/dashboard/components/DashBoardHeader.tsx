"use client";

import React from "react";

const DashBoardHeader = ({
  second,
  backFunc,
  closeFunc,
}: {
  second?: boolean;
  backFunc?: () => void;
  closeFunc: () => void;
}) => {
  return (
    <div
      className={`${
        second ? "bg-transparent" : "bg-[#15B5BF]"
      } p-4 sticky top-0 left-0 z-10 w-full text-black text-[12px]`}
    >
      <div className={`flex ${second ? "justify-end" : "justify-between"}`}>
        {!second && <button onClick={backFunc}>이전으로</button>}
        <button onClick={closeFunc}>닫기</button>
      </div>
    </div>
  );
};

export default DashBoardHeader;
