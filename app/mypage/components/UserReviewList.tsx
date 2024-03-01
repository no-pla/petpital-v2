"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Review from "./Review";

const UserReviewList = () => {
  const router = useRouter();
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
      {reviewList?.length ? (
        <div className="flex flex-col items-center justify-center gap-6 mt-[84px]">
          {reviewList.map((review) => {
            return <Review key={review.id} review={review} />;
          })}
        </div>
      ) : (
        <div className="text-center mt-8 flex flex-col items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-[466px] py-2 bg-main rounded text-white mb-8"
          >
            병원 검색하러 가기
          </button>
          <div className="shadow-noReview w-fit bg-white p-4 rounded-full">
            아직 등록하신 리뷰가 없습니다!🐶
          </div>
          <p className="my-[60px] text-[14px]">
            동물병원을 검색하고,
            <br />
            리뷰를 남겨보세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserReviewList;
