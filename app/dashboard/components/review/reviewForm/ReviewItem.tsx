"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { updateOpen } from "@/share/atom";
import { useSetRecoilState } from "recoil";
import CategoryList from "./CategoryList";

interface ReviewItemData {
  categories: any;
  createdAt: string;
  hospitalId: string;
  id: string;
  photo: string;
  rate: number;
  review: string;
  title: string;
  totalAmounts: number;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
    password: string;
  };
  userId: string;
}

const ReviewItem = ({
  review,
  onDelete,
}: {
  review: ReviewItemData;
  onDelete: any;
}) => {
  const { data: session }: any = useSession({
    required: true,
  });

  const setUpdate = useSetRecoilState(updateOpen);

  return (
    <div key={review.id} className="p-4 border-b-[#E4E4E4] border-b-[0.4px]">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <Image
            src={review.user.image}
            alt="리뷰 사진"
            loading="eager"
            width={40}
            height={40}
            className="object-cover rounded-[50%] w-10 h-10"
          />
          <span className="font-bold text-[14px]">{review.user.name}</span>
        </div>
        <span className="text-white text-[12px] bg-[#15b5bf] px-4 py-3 rounded font-semibold">
          진료비 {review.totalAmounts.toLocaleString()}
        </span>
      </div>
      <Image
        src={review.photo}
        width={375}
        height={212}
        alt="리뷰 이미지"
        className="rounded h-[212px] object-cover"
      />
      <div className="mt-1 font-bold">{review.title}</div>
      <p className="font-light text-[12px] mt-1">{review.review}</p>
      <CategoryList categories={review.categories} />
      <div className="text-[#9F9F9F] text-[12px] flex gap-3 justify-between">
        <div className="flex gap-3">
          <p>{review.createdAt}</p>
          <p>번째 방문</p>
        </div>
        {review.userId == session.user.id && (
          <div className="flex gap-3">
            <button onClick={() => onDelete(review.id)}>삭제</button>
            <button onClick={() => setUpdate(review)}>수정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
