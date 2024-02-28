"use client";

import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/firebase/firebase";
import UserProfilePhoto from "./UserProfilePhoto";
import { LuArrowLeftCircle } from "react-icons/lu";
import Link from "next/link";

const UpdateForm = () => {
  const { data: session, status, update }: any = useSession();
  const router = useRouter();
  const newNameRef = useRef<HTMLInputElement>(null);

  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    const reviewImage = localStorage.getItem("new-profile-image");
    const imgRef = ref(storageService, `${session.user.id}/${Date.now()}`);
    let downloadUrl;
    if (reviewImage) {
      const response = await uploadString(imgRef, reviewImage, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }

    const res = await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        name: newNameRef.current?.value,
        userId: session?.user.id!,
        image: downloadUrl,
      }),
    });
    if (res.ok) {
      await update({ name: newNameRef.current?.value, image: downloadUrl });
    }
    router.push("/mypage");
  };

  return (
    <div>
      {status === "authenticated" && (
        <>
          <UserProfilePhoto image={session.user?.image!} />
          <form
            onSubmit={updateProfile}
            className="mt-[128px] w-[540px] mx-auto"
          >
            <input
              defaultValue={session.user?.name!}
              ref={newNameRef}
              className="w-full py-4 pl-5 border-[#E4E4E4] border-[1px]"
            />
            <button className="mt-[180px] w-full py-3 text-white bg-main rounded-sm border-[#AFE5E9] border-[1px]">
              저장하기
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateForm;
