"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoPlus } from "react-icons/go";

const UserProfilePhoto = ({ image }: { image: string }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = event.target?.files;
    if (!newPhoto || newPhoto.length === 0) return;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(newPhoto[0]);

    reader.onloadend = (event: any) => {
      const result = event.currentTarget?.result;
      setPhoto(result);
      localStorage.setItem("new-profile-image", result);
    };
  };

  useEffect(() => {
    if (image) {
      setPhoto(image);
    }
  }, []);
  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="relative">
        <Image
          src={photo! || image}
          alt="프로필 이미지입니다."
          width={128}
          height={128}
          className="rounded-full w-[128px] h-[128px] object-cover border-white border-[2px]"
        />
        <label
          htmlFor="newProfilePhoto"
          className="absolute top-0 right-3 bg-main w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
        >
          <GoPlus size={20} color="white" />
        </label>
      </div>
      <input
        accept="image/*"
        type="file"
        id="newProfilePhoto"
        onChange={(event) => onChange(event)}
        className="hidden"
      />
    </div>
  );
};

export default UserProfilePhoto;
