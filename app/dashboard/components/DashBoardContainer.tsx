import React from "react";
import DashBoard from "./DashBoard";
import SearchBoard from "./search/SearchBoard";
import ReviewBoard from "./review/ReviewBoard";
import SearchInput from "./search/SearchInput";

const DashBoardContainer = () => {
  return (
    <div className="flex absolute h-screen">
      <DashBoard>
        <SearchInput />
        <SearchBoard />
      </DashBoard>
      <DashBoard>
        <ReviewBoard />
      </DashBoard>
    </div>
  );
};

export default DashBoardContainer;
