"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const PhotoUploader = ({ image }: { image?: string }) => {
  const [photoList, setPhotoList] = useState<any>(null);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target?.files;
    if (!fileList) return;

    const result: any = await imageToDataURL(fileList);
    setPhotoList(result);
    localStorage.setItem("preview-image", result);

    event.target.value = "";
  };

  const imageToDataURL = async (fileList: any) => {
    const readAndPreview = (file: any) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = (event) => {
          resolve(event.target!.result);
        };
        reader.readAsDataURL(file);
      });
    };

    const promises = Array.from(fileList).map(readAndPreview);

    return await Promise.all(promises);
  };

  useEffect(() => {
    if (image) {
      setPhotoList([image]);
    }
  }, []);

  return (
    <div className="px-3 mt-8 mb-10">
      <div className="font-bold text-[14px]">사진 인증</div>
      <p className="text-[#c5c5c5] text-[10px] mt-1 mb-2">
        영수증, 병원 등 다른 회원님들에게 도움 될 만한 이미지를 공유해 주세요.
      </p>
      <div className="relative h-[196px]">
        <label
          htmlFor="reviewImage"
          className={`h-[196px] w-full ${
            photoList ? "bg-transparent" : "bg-[#fafafa]"
          } w-full flex items-center justify-center absolute ${
            photoList ? "text-white" : "text-black"
          } top-0`}
        >
          {photoList ? "사진 바꾸기" : "사진 올리기"}
        </label>
        {photoList && (
          <button
            className={`absolute w-5 h-5 ${
              photoList ? "text-black" : "text-[#fafafa]"
            } ${
              photoList ? "bg-[#fafafa]" : "bg-[#15B5BF]"
            } m-2 flex justify-center items-center rounded-sm`}
            onClick={() => setPhotoList(null)}
          >
            X
          </button>
        )}
        {photoList && (
          <Image
            src={photoList[0]}
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
        // multiple TODO: MVP 만든 후 여러 이미지 받아오는 방식으로 수정
        onChange={(event) => onChange(event)}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUploader;
