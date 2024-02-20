import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ReviewInput from "./ReviewInput";
import PhotoUploader from "./PhotoUploader";
import SelectedHospitalMap from "../SelectedHospitalMap";
import { reviewCategories, selectedHospital } from "@/share/atom";
import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storageService } from "@/firebase/firebase";
import { Rating } from "react-simple-star-rating";
import CategoriesForm from "./CategoriesForm";

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
  const categories = useRecoilValue(reviewCategories);
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
    console.log(rate);
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
      const res = await fetch("/api/review", {
        body: JSON.stringify({
          ...data,
          photo: downloadUrl ?? "",
          hospitalId: hospitalData.id,
          userId: session?.user?.id,
          categories,
          rate: rating,
        }),
        method: "POST",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("preview-image");
  }, []);

  return (
    <>
      {hospitalData && (
        <div className="h-screen absolute top-0 left-0 bg-white w-full px-3 overflow-scroll">
          <PhotoUploader />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) => onSubmit(data))}
              className="flex flex-col gap-2"
              id="reviewForm"
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
            </form>
          </FormProvider>
          <div>
            <div>별점</div>
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
          <button type="submit" form="reviewForm">
            제출
          </button>
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
