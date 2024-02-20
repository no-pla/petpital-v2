import React from "react";
import KakaoMap from "./components/KakaoMap";
import DashBoardContainer from "./components/DashBoardContainer";

const Page = () => {
  return (
    <div>
      <DashBoardContainer />
      <KakaoMap />
    </div>
  );
};

export default Page;

/** TODO:
 * 1. 대쉬보드 만들기 검색창 / 리뷰창
 * 2. CRUD - Create & Read까지 - 완료
 * 3. 현재 위치로 띄우기 - 완료
 * 4. 스카이뷰 토글 추가 - 완료
 * 5. 날씨 데이터 추가 -
 */
