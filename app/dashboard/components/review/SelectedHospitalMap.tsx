"use client";

import React from "react";
import { StaticMap } from "react-kakao-maps-sdk";

const SelectedHospitalMap = ({ lng, lat, hospitalName, address }: any) => {
  return (
    <>
      <div>동물병원 주소</div>
      <p>리뷰를 등록하고자 하는 병원이 맞는지 확인해 주세요.</p>
      <StaticMap // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: +lat,
          lng: +lng,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "300px",
        }}
        marker={{
          position: {
            lat: +lat,
            lng: +lng,
          },
          text: hospitalName,
        }}
        level={3} // 지도의 확대 레벨
      />
      <div>{hospitalName}</div>
      <p>{address}</p>
    </>
  );
};

export default SelectedHospitalMap;
