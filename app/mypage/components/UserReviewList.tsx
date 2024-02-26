"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Review from "./Review";

const UserReviewList = () => {
  const [reviewList, setReviewList] = useState<null | any[]>(null);

  const { data: session, status }: any = useSession({
    required: true,
  });
  const getUserReviews = async () => {
    const res = await fetch(`/api/user?userId=${session?.user.id!}`, {
      method: "GET",
    });
    const review = await res.json();
    setReviewList(review);
  };

  useEffect(() => {
    if (!session) return;
    getUserReviews();
  }, [status]);

  return (
    <div className="mb-10">
      {reviewList ? (
        <div className="flex flex-col items-center justify-center gap-6 mt-[84px]">
          {reviewList.map((review) => {
            return <Review key={review.id} review={review} />;
          })}
        </div>
      ) : (
        <div>작성한 리뷰가 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default UserReviewList;

/**TODO:
 * 1. 병원 이름 주소 담기
 * 2. 스키마 수정
 * 3. 마이 페이지 스타일
 */
