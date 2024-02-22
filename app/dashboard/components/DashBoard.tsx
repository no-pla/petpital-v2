import React from "react";
import DashBoardHeader from "./DashBoardHeader";

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`scrollbar-hide w-[375px] z-10 bg-white border-r-2 overflow-y-scroll`}
    >
      <DashBoardHeader />
      {children}
    </div>
  );
};

export default DashBoard;
