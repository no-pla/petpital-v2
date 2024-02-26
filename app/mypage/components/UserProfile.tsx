"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

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
    <div>
      <button onClick={() => signOut()}>signOut</button>
      {session && (
        <>
          <Image
            src={session.user?.image!}
            alt="프로필 이미지입니다."
            width={150}
            height={150}
          />
          <div>{session.user?.name}</div>
          <div>남긴 리뷰: {reviewList ? reviewList.length! : 0}</div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
