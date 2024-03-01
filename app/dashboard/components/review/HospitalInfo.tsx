"use client";

import React from "react";
import { selectedHospital } from "@/share/atom";
import { useRecoilValue } from "recoil";
import { Roadview } from "react-kakao-maps-sdk";

const HospitalInfo = ({ reviews }: any) => {
  const hospital = useRecoilValue(selectedHospital);

  return (
    <div>
      <Roadview // 로드뷰를 표시할 Container
        position={{
          // 지도의 중심좌표
          lat: hospital?.y,
          lng: hospital?.x,
          radius: 50,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "296px",
        }}
      />
      <div className="border-[#E4E4E4] border-b-[0.4px] p-3">
        <div className="flex items-center">
          <div className="pr-1 font-bold">{hospital?.place_name}</div>
          <span className="text-[12px] text-[#9f9f9f]">동물병원</span>
        </div>
        <div className="text-[12px] text-[#9f9f9f]">
          방문자 리뷰 {reviews?.length || 0}
        </div>
      </div>
    </div>
  );
};

export default HospitalInfo;
