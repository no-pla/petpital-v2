"use client";

import React, { useEffect, useState } from "react";
import HospitalInfo from "./HospitalInfo";
import ReviewList from "./ReviewList";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { reviewOpen } from "@/share/atom";
import { useSession } from "next-auth/react";
import ReviewForm from "./reviewForm/ReviewForm";

const ReviewBoard = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<any>(null);
  const review = useRecoilValue(reviewOpen);

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
  }, [id, review]);

  return (
    <div className="mt-[-52px] h-screen">
      <HospitalInfo reviews={data} />
      <ReviewList reviews={data} onDelete={onDelete} />
      {review && <ReviewForm />}
    </div>
  );
};

export default ReviewBoard;
