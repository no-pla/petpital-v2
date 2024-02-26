"use client";

import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PhotoUploader from "@/app/dashboard/components/review/reviewForm/PhotoUploader";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/firebase/firebase";

const UpdateForm = () => {
  const { data: session, status, update }: any = useSession();
  const router = useRouter();
  const newNameRef = useRef<HTMLInputElement>(null);

  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    const reviewImage = localStorage.getItem("preview-image");
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
      console.log(downloadUrl);
      await update({ name: newNameRef.current?.value, image: downloadUrl });
    }
    router.push("/mypage");
  };

  return (
    <div>
      {status === "authenticated" && (
        <>
          <PhotoUploader image={session.user?.image!} />
          <form onSubmit={updateProfile}>
            <input defaultValue={session.user?.name!} ref={newNameRef} />
            <button>업데이트</button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateForm;
