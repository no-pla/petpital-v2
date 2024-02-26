import Image from "next/image";
import React from "react";

const Review = ({ review }: any) => {
  console.log(review);
  return (
    <div className="flex w-[466px] h-[196px] bg-[#FAFAFA] rounded ">
      <Image
        src={review.photo}
        alt=""
        width={160}
        height={196}
        className="grow-1 object-cover rounded-l"
      />
      <div className="grow-[2] px-2 py-3 flex flex-col justify-between">
        <div>
          <div className="font-semibold text-[14px] mb-1">{review.title}</div>
          <div className="flex gap-3 text-[14px] items-center mb-1">
            <div className="text-[#9F9F9F]">병원 이름</div>
            <div className="font-light text-[12px]">병원 주소</div>
          </div>
          <div className="text-[#C5C5C5] text-[14px]">{review.review}</div>
        </div>
        <div className="rounded bg-main w-fit p-3 text-[12px] font-semibold text-white">
          진료비 {review.totalAmounts.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Review;
