import React from "react";
import KakaoMap from "./components/KakaoMap";
import DashBoardContainer from "./components/DashBoardContainer";

const Page = () => {
  return (
    <div className="h-screen">
      <DashBoardContainer />
      <KakaoMap />
    </div>
  );
};

export default Page;

/**
 * TODO:
 * 1. 리뷰 UPDATE
 * 4. 프로필 업데이트/삭제
 * 3. 마이 페이지 스타일
 * 5. 최근 리뷰 GET
 * 6. 병원 리스트 GET
 * 7. 메인 페이지 스타일
 * 카테고리 빈 단어 전달 시 처리
 * 에러 모달
 */
