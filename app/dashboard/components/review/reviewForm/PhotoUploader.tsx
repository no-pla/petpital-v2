"use client";

import Image from "next/image";
import React, { useState } from "react";

const PhotoUploader = () => {
  const [photoList, setPhotoList] = useState<any>(null);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target?.files;
    if (!fileList) return;

    const result: any = await imageToDataURL(fileList);
    setPhotoList(result);
    localStorage.setItem("preview-image", result);
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

  return (
    <div>
      {photoList ? (
        <Image
          src={photoList[0]}
          alt=""
          width={375}
          height={196}
          loading="eager"
          className={`h-[196px]  object-cover`}
        />
      ) : (
        <label
          htmlFor="reviewImage"
          className="h-[196px] bg-red-200 w-full flex items-center justify-center"
        >
          사진 올리기
        </label>
      )}
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
