import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReviewInput from "./ReviewInput";
import PhotoUploader from "./PhotoUploader";
import StarRate from "./StarRate";
import SelectedHospitalMap from "./SelectedHospitalMap";

interface ReviewData {
  photo: string[];
  title: string;
  review: string;
  totalAmounts: string;
  rate: any;
  categories: string[];
}

const ReviewForm = () => {
  const methods = useForm({
    defaultValues: {
      photo: "",
      title: "",
      review: "",
      totalAmounts: "",
      rate: "",
      categories: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-screen absolute top-0 left-0 bg-white w-full">
      <div>병원 이미지</div>
      <PhotoUploader />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-2"
        >
          <ReviewInput label="title" placeholder="제목을 입력해 주세요." />
          <ReviewInput label="review" placeholder="내용을 입력해 주세요." />
          <ReviewInput
            label="totalAmounts"
            placeholder="금액을 입력해 주세요."
          />
          <StarRate />
          <ReviewInput
            label="categories"
            placeholder="EX. 저렴해요, 깨끗해요"
          />
        </form>
      </FormProvider>
      <SelectedHospitalMap />
    </div>
  );
};

export default ReviewForm;

/** TODO: 할 일
 * 1. 핀 클릭 시 해당 병원 데이터 띄우기
 * 2. 유저 현재 위치 (로그인시/로그아웃시 다르게 띄우기)
 * 3. 유저 버튼 클릭 시 현재 위치 다시 띄우기
 * 4. 리뷰 CRUD
 * 5. 이미지 검색 라이브러리로 병원 이미지 띄워주기
 */
