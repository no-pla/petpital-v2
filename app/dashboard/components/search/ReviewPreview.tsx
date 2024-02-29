import Image from "next/image";
import React from "react";

const ReviewPreview = ({ hospitalReview }: any) => {
  return (
    <div className="overflow-scroll">
      <div className="mt-5 flex gap-3 w-max ">
        {hospitalReview.map((review: any) => {
          return (
            <div key={review.id} className="relative flex-shrink-0">
              <Image
                src={review.photo}
                width={156}
                height={156}
                alt=""
                className="object-cover w-[156px] h-[156px] rounded"
              />
              <div className="absolute bottom-1 left-1 flex items-center gap-2">
                <Image
                  src={review.user.image}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <span className="text-[14px] text-white">
                  {review.user.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-1">
        {hospitalReview.slice(-2).map((review: any) => {
          return (
            <div key={review.id} className="mt-1 w-ful">
              <div className="bg-gray-200 text-[12px] py-2 px-2 rounded-sm flex w-[328px] min-h-[52px]">
                <span className="font-bold mr-1 min-w-fit h-fit">
                  {review.user.name}
                </span>
                <span className="text-clip line-clamp-2">{review.review}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewPreview;
