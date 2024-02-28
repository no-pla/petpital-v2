"use client";

import React from "react";
import DashBoard from "./DashBoard";
import SearchBoard from "./search/SearchBoard";
import ReviewBoard from "./review/ReviewBoard";
import SearchInput from "./search/SearchInput";
import DashBoardHeader from "./DashBoardHeader";
import { useRecoilState } from "recoil";
import { dashboard as dashboardAtom } from "@/share/atom";
import SmallSearchInput from "./search/SmallSearchInput";
import { useRouter } from "next/navigation";

const DashBoardContainer = () => {
  const [dashboard, setDashboard] = useRecoilState(dashboardAtom);
  const router = useRouter();

  const openFirstDashboard = () => {
    setDashboard(() => {
      return { first: true, second: false };
    });
  };

  const closeFirstDashboard = () => {
    setDashboard(() => {
      return { first: false, second: false };
    });
  };

  const closeSecondDashboard = () => {
    setDashboard(() => {
      return { first: true, second: false };
    });
  };

  return (
    <div className="flex fixed top-0 left-0 h-full z-20">
      {dashboard?.first ? (
        <DashBoard>
          <DashBoardHeader
            backFunc={() => router.push("/")}
            closeFunc={closeFirstDashboard}
          />
          <SearchInput />
          <SearchBoard />
        </DashBoard>
      ) : (
        <div className="m-6">
          <SmallSearchInput openFunc={openFirstDashboard} />
        </div>
      )}
      {dashboard?.second && (
        <DashBoard>
          <DashBoardHeader second={true} closeFunc={closeSecondDashboard} />
          <ReviewBoard />
        </DashBoard>
      )}
    </div>
  );
};

export default DashBoardContainer;
