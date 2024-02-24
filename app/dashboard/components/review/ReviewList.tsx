"use client";

import React from "react";
import ReviewItem from "./reviewForm/ReviewItem";
import { reviewOpen } from "@/share/atom";
import { useRecoilState } from "recoil";

const ReviewList = ({ reviews, onDelete }: any) => {
  const [review, setReview] = useRecoilState(reviewOpen);

  return (
    <div className="h-[calc(100%-460px)] relative">
      {reviews?.length ? (
        <div className="flex flex-col min-h-full">
          {reviews?.map((res: any) => {
            return <ReviewItem key={res.id} review={res} onDelete={onDelete} />;
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center h-full">
          작성된 리뷰가 없습니다.
        </div>
      )}
      <button
        className="sticky bottom-0 left-0 w-full py-3 font-bold text-white bg-[#15b5bf]"
        onClick={() => setReview(true)}
      >
        리뷰 참여하기
      </button>
    </div>
  );
};

export default ReviewList;
