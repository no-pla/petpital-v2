"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

const PhotoUploader = ({ image }: { image?: string }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = event.target?.files;
    if (!newPhoto || newPhoto.length === 0) return;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(newPhoto[0]);

    reader.onloadend = (event: any) => {
      const result = event.currentTarget?.result;
      setPhoto(result);
      localStorage.setItem("preview-image", result);
    };
  };

  useEffect(() => {
    if (image) {
      setPhoto(image);
    }
  }, []);

  return (
    <div className="px-3 mb-10">
      <div className="mt-8">
        <div className="font-bold text-[14px]">사진 인증</div>
        <p className="text-[#c5c5c5] text-[10px] mt-1 mb-2">
          영수증, 병원 등 다른 회원님들에게 도움 될 만한 이미지를 공유해 주세요.
        </p>
      </div>
      <div className="relative h-[196px] w-full">
        <label
          htmlFor="reviewImage"
          className={`h-[196px] w-full ${
            photo ? "bg-transparent" : "bg-[#D9D9D9]"
          } w-full flex items-center justify-center absolute ${
            photo ? "text-white" : "text-black"
          } top-0`}
        >
          <div className="flex flex-col justify-center items-center gap-2 ">
            <CiCirclePlus color="white" width={24} height={24} />
            <span className="text-[12px] font-bold text-white">
              {photo ? "사진 바꾸기" : "사진 올리기"}
            </span>
          </div>
        </label>
        {photo && (
          <button
            className={`absolute w-5 h-5 ${
              photo ? "text-black" : "text-[#fafafa]"
            } ${
              photo ? "bg-[#fafafa]" : "bg-[#15B5BF]"
            } m-2 flex justify-center items-center rounded-sm`}
            onClick={() => setPhoto(null)}
          >
            <IoCloseOutline />
          </button>
        )}
        {photo && (
          <Image
            src={photo}
            alt="리뷰 이미지"
            width={375}
            height={196}
            loading="eager"
            className={`h-[196px]  object-cover`}
          />
        )}
      </div>
      <input
        accept="image/*"
        type="file"
        id="reviewImage"
        onChange={(event) => onChange(event)}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUploader;
