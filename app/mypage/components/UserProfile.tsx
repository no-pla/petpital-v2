"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import MyPageHeader from "./MyPageHeader";

const UserProfile = () => {
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
    <div className="bg-main w-full h-max min-h-[456px] pt-[90px]">
      <MyPageHeader title="마이페이지" />
      {session && (
        <div className="mt-4 flex flex-col items-center">
          <div className="relative">
            <Image
              src={session.user?.image!}
              alt="프로필 이미지입니다."
              width={128}
              height={128}
              className="rounded-full h-[128px] w-[128px] object-cover mb-4 border-white border-2"
            />
            <Link
              href="/mypage/changeProfile"
              className="absolute top-0 right-3 bg-white w-6 h-6 rounded-full flex justify-center items-center"
            >
              <CiSettings size={20} />
            </Link>
          </div>
          <div className="p-2 text-white text-[20px] font-bold">
            {session.user?.name}
          </div>
          <div className="mt-5 py-1 px-3 bg-[rgba(255,255,255,0.3)] rounded text-white font-semibold">
            <span className="mr-5">남긴 리뷰:</span>
            <span>{reviewList ? reviewList.length! : 0}</span>
          </div>
          <span className="mt-[72px] border-b-white border-b-[4px] py-2 px-3  text-white font-medium">
            리뷰
          </span>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
