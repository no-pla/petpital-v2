import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReviewInput from "./ReviewInput";
import PhotoUploader from "./PhotoUploader";
import StarRate from "./StarRate";
import SelectedHospitalMap from "./SelectedHospitalMap";
import { selectedHospital } from "@/share/atom";
import { useRecoilValue } from "recoil";
import { StaticMap } from "react-kakao-maps-sdk";

interface ReviewData {
  photo: string[];
  title: string;
  review: string;
  totalAmounts: string;
  rate: any;
  categories: string[];
}

const ReviewForm = () => {
  const hospitalData = useRecoilValue(selectedHospital);
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

  console.log(hospitalData);

  return (
    <>
      {hospitalData && (
        <div className="h-screen absolute top-0 left-0 bg-white w-full px-3">
          <div>병원 이미지</div>
          <PhotoUploader />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) => onSubmit(data))}
              className="flex flex-col gap-2"
            >
              <ReviewInput
                label="title"
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
              <StarRate />
              <ReviewInput
                label="categories"
                placeholder="EX. 저렴해요, 깨끗해요"
              />
              <button>제출</button>
            </form>
          </FormProvider>
          <SelectedHospitalMap
            lng={hospitalData.x}
            lat={hospitalData.y}
            hospitalName={hospitalData.place_name}
            address={hospitalData.road_address_name}
          />
        </div>
      )}
    </>
  );
};

export default ReviewForm;

/** TODO: 할 일
 * 1. 핀 클릭 시 해당 병원 데이터 띄우기 - 완료
 * 2. 유저 현재 위치 (로그인시/로그아웃시 다르게 띄우기)
 * 3. 유저 버튼 클릭 시 현재 위치 다시 띄우기
 * 4. 리뷰 CRUD
 * 5. 이미지 검색 라이브러리로 병원 이미지 띄워주기
 */
