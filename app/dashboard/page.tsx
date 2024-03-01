import React from "react";
import KakaoMap from "./components/KakaoMap";
import DashBoardContainer from "./components/DashBoardContainer";

export const metadata = {
  title: "병원 검색하기",
};

const Page = () => {
  return (
    <div className="h-screen">
      <DashBoardContainer />
      <KakaoMap />
    </div>
  );
};

export default Page;
