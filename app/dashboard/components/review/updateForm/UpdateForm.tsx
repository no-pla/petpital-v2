"use client";

import React, { useEffect, useState } from "react";
import PhotoUploader from "../reviewForm/PhotoUploader";
import ReviewInput from "../reviewForm/ReviewInput";
import { Rating } from "react-simple-star-rating";
import { FormProvider, useForm } from "react-hook-form";
import CategoriesForm from "../reviewForm/CategoriesForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { reviewCategories, updateOpen } from "@/share/atom";
import SelectedHospitalMap from "../SelectedHospitalMap";
import { useSearchParams } from "next/navigation";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/firebase/firebase";
import { useSession } from "next-auth/react";

const UpdateForm = () => {
  const [update, setUpdate] = useRecoilState(updateOpen);
  const [rating, setRating] = useState(0);
  const categories = useRecoilValue(reviewCategories);

  const handleRating = (rate: number) => {
    setRating(rate);
  };
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const loc = searchParams.get("loc");
  const name = searchParams.get("name");

  const { data: session }: any = useSession({
    required: true,
  });

  const methods = useForm({
    defaultValues: {
      title: update.title,
      review: update.review,
      totalAmounts: update.totalAmounts,
    },
    mode: "onChange",
  });

  const onUpdate = async (data: any) => {
    // 업데이트 된 내용 전달
    const reviewImage = localStorage.getItem("preview-image");
    const imgRef = ref(storageService, `${session.user.id}/${Date.now()}`);
    let downloadUrl;
    if (reviewImage) {
      const response = await uploadString(imgRef, reviewImage, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }

    const res: any = await fetch("/api/review", {
      body: JSON.stringify({
        ...data,
        photo: downloadUrl ?? null,
        userId: session?.user?.id,
        categories: categories ?? null,
        rate: rating,
        totalAmounts: +data.totalAmounts,
        postId: update.id,
      }),
      method: "PATCH",
    });
    if (!res.ok) {
      // 에러 처리
      return;
    }
    setUpdate(null);
  };

  useEffect(() => {
    if (update?.rating) {
      setRating(update.rating);
    }
  }, []);

  return (
    <div className="fixed top-0 left-[375px] bg-white w-[375px] h-full overflow-scroll scrollbar-hide z-20">
      <div className="p-4 w-full text-black text-[12px] font-bold flex justify-end border-b-[#E4E4E4] border-b-[0.4px]">
        <button onClick={() => setUpdate(null)}>닫기</button>
      </div>
      <PhotoUploader image={update.photo} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onUpdate(data))}
          className="flex flex-col gap-2  px-3"
          id="reviewForm"
        >
          <ReviewInput
            label="title"
            title="제목 쓰기"
            sub="눈에 띄는 제목으로 다른 회원님들에게 도움을 주세요."
            placeholder="제목을 입력해 주세요."
            defaultValue={update.title}
            validation={{
              required: {
                value: true,
                message: "필수 입력값입니다.",
              },
            }}
          />
          <ReviewInput
            label="review"
            title="내용 쓰기"
            sub="자세한 후기로 회원님들에게 도움을 주세요."
            placeholder="내용을 입력해 주세요."
            defaultValue={update.review}
            validation={{
              required: {
                value: true,
                message: "필수 입력값입니다.",
              },
            }}
          />
          <ReviewInput
            label="totalAmounts"
            title="진료 총액"
            sub="진료 총액을 입력해 주세요."
            placeholder="금액을 입력해 주세요."
            defaultValue={update.totalAmounts}
            validation={{
              required: {
                value: true,
                message: "필수 입력값입니다.",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "형식이 옳지 않습니다.",
              },
            }}
          />
        </form>
      </FormProvider>
      <div className="px-3 mt-4">
        <div className="font-bold text-[14px]">별점 평가</div>
        <p className="text-[#c5c5c5] text-[10px] mt-1 mb-2">
          이 병원을 별점으로 총평해 주세요.
        </p>
        <Rating
          onClick={handleRating}
          SVGstyle={{ display: "inline-block" }}
          allowFraction
          allowHover
          size={40}
          SVGstrokeColor="#15B5BF"
          fillColor="#15B5BF"
          initialValue={update.rate}
        />
      </div>
      <CategoriesForm defaultCategories={update.categories} />
      <SelectedHospitalMap
        lng={lng}
        lat={lat}
        hospitalName={name}
        address={loc}
      />
      <button
        type="submit"
        form="reviewForm"
        className="fixed bottom-0 bg-[#15B5BF] w-[375px] p-4 font-bold text-white"
      >
        리뷰 등록하기
      </button>
    </div>
  );
};

export default UpdateForm;
