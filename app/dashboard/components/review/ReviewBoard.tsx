"use client";

import React, { useEffect, useState } from "react";
import HospitalInfo from "./HospitalInfo";
import ReviewList from "./ReviewList";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { reviewOpen, updateOpen } from "@/share/atom";
import { useSession } from "next-auth/react";
import ReviewForm from "./reviewForm/ReviewForm";
import UpdateForm from "./updateForm/UpdateForm";

const ReviewBoard = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<any>(null);
  const review = useRecoilValue(reviewOpen);
  const update = useRecoilValue(updateOpen);

  const { data: session, status }: any = useSession({
    required: true,
  });

  const getReviews = async () => {
    const res = await fetch(`/api/review?id=${id}`, {
      method: "GET",
    });

    const reviewData = await res.json();
    setData(reviewData);
  };

  const onDelete = async (reviewId: string) => {
    if (!session) return;
    if (status === "loading" || session.user === undefined) return;
    const userId = session.user?.id;
    const res = await fetch("/api/review", {
      method: "DELETE",
      body: JSON.stringify({ reviewId, userId }),
    });
    if (res.ok) {
      getReviews();
    }
  };

  useEffect(() => {
    getReviews();
  }, [id, review, update]);

  const onChangeOrderNew = () => {
    setData((prev: any) =>
      [...prev].sort((data1, data2) => {
        return +data2.createdAt - +data1.createdAt;
      })
    );
  };

  const onChangeOrder = () => {
    setData((prev: any) =>
      [...prev].sort((data1, data2) => {
        return +data1.createdAt - +data2.createdAt;
      })
    );
  };

  return (
    <div className="mt-[-52px] h-screen">
      <HospitalInfo reviews={data} />
      <div className="flex gap-3 p-1 border-[#E4E4E4] border-b-[0.4px]">
        <button
          className="p-2 font-medium text-[#15B5BF]"
          onClick={onChangeOrder}
        >
          영수증 리뷰
        </button>
        <button className="p-2 font-medium" onClick={onChangeOrderNew}>
          최신순
        </button>
      </div>
      <ReviewList reviews={data} onDelete={onDelete} />
      {review && <ReviewForm />}
      {update && <UpdateForm />}
    </div>
  );
};

export default ReviewBoard;
