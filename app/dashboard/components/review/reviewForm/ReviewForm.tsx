"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReviewInput from "./ReviewInput";
import PhotoUploader from "./PhotoUploader";
import SelectedHospitalMap from "../SelectedHospitalMap";
import { reviewCategories, reviewOpen, selectedHospital } from "@/share/atom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/firebase/firebase";
import { Rating } from "react-simple-star-rating";
import CategoriesForm from "./CategoriesForm";

interface ReviewData {
  photo: string[];
  title: string;
  review: string;
  totalAmounts: number;
  rate: any;
  categories: string[];
}

const ReviewForm = () => {
  const hospitalData = useRecoilValue(selectedHospital);
  const categories = useRecoilValue(reviewCategories);
  const resetCategories = useResetRecoilState(reviewCategories);
  const setReviewOpen = useSetRecoilState(reviewOpen);

  const { data: session }: any = useSession({
    required: true,
  });

  const methods = useForm({
    defaultValues: {
      title: "",
      review: "",
      totalAmounts: "",
      rate: "",
    },
    mode: "onChange",
  });
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const onSubmit = async (data: any) => {
    const reviewImage = localStorage.getItem("preview-image");
    const imgRef = ref(storageService, `${session.user.id}/${Date.now()}`);
    let downloadUrl;
    if (reviewImage) {
      const response = await uploadString(imgRef, reviewImage, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }

    try {
      const res: any = await fetch("/api/review", {
        body: JSON.stringify({
          ...data,
          photo: downloadUrl ?? "",
          hospitalId: hospitalData.id,
          userId: session?.user?.id,
          categories,
          rate: rating,
          totalAmounts: +data.totalAmounts,
          createdAt: new Date().toLocaleDateString("ko-KR"),
        }),
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(res?.message);
      }
    } catch (error) {
      console.log(error);
      return;
    }
    setReviewOpen(false);
  };

  useEffect(() => {
    localStorage.removeItem("preview-image");
    resetCategories();
  }, []);

  return (
    <div className="fixed top-0 left-[375px] bg-white w-[375px] h-full overflow-scroll scrollbar-hide z-20">
      <div className="p-4 w-full text-black text-[12px] font-bold flex justify-between border-b-[#E4E4E4] border-b-[0.4px]">
        <button>리뷰</button>
        <button onClick={() => setReviewOpen(false)}>닫기</button>
      </div>
      <PhotoUploader />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-2  px-3"
          id="reviewForm"
        >
          <ReviewInput
            label="title"
            title="제목 쓰기"
            sub="눈에 띄는 제목으로 다른 회원님들에게 도움을 주세요."
            placeholder="제목을 입력해 주세요."
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
          initialValue={0}
        />
      </div>
      <CategoriesForm />
      <SelectedHospitalMap
        lng={hospitalData.x}
        lat={hospitalData.y}
        hospitalName={hospitalData.place_name}
        address={hospitalData.road_address_name}
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

export default ReviewForm;

/** TODO: 할 일
 * 1. 핀 클릭 시 해당 병원 데이터 띄우기 - 완료
 * 2. 유저 현재 위치 (로그인시/로그아웃시 다르게 띄우기)
 * 3. 유저 버튼 클릭 시 현재 위치 다시 띄우기
 * 4. 리뷰 CRUD
 */
