import React from "react";

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[375px] h-screen bg-white absolute top-0 left-0 z-20 border-r-[8px] border-[#D9D9D9]">
      {children}
    </div>
  );
};

export default DashBoard;
