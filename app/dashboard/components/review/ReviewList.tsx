"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReviewList = () => {
  const { data: session, status }: any = useSession({
    required: true,
  });
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<any>(null);
  const getReviews = async () => {
    const res = await fetch(`/api/review?id=${id}`, {
      method: "GET",
    });

    const reviewData = await res.json();
    setData(reviewData);
  };

  useEffect(() => {
    getReviews();
  }, [id]);

  const onDelete = async (reviewId: string) => {
    if (status === "loading" || session.user === undefined) return;
    const userId = session.user?.id!;
    const res = await fetch("/api/review", {
      method: "DELETE",
      body: JSON.stringify({ reviewId, userId }),
    });
    if (res.ok) {
      getReviews();
    }
  };

  return (
    <div>
      {data?.reviews?.length ? (
        <>
          {data?.reviews.map((res: any) => {
            return (
              <div key={res.id}>
                <div>{res.review}</div>
                <button onClick={() => onDelete(res.id)}>삭제</button>
              </div>
            );
          })}
        </>
      ) : (
        <div>작성된 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default ReviewList;
