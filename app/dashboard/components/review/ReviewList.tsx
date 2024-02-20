"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ReviewList = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getReviews = async () => {
      const res = await fetch(`/api/review?id=${id}`, {
        method: "GET",
      });

      const reviewData = await res.json();
      setData(reviewData);
    };
    getReviews();
  }, [id]);

  return (
    <div>
      {data?.reviews.length ? (
        <>
          {data?.reviews.map((res: any) => {
            return <div key={res.id}>{res.title}</div>;
          })}
        </>
      ) : (
        <div>작성된 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default ReviewList;
