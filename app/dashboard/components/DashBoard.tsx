import React from "react";

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`scrollbar-hide w-[375px] z-10 h-full bg-white border-r-2 overflow-y-scroll relative`}
    >
      {children}
    </div>
  );
};

export default DashBoard;
