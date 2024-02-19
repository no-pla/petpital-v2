"use client";

import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [state, setState] = useState<any>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [mapType, setMapType] = useState<"roadmap" | "skyview">("roadmap");

  useEffect(() => {
    // 지도 띄울 때 현재 위치로 고정
    // TODO: 메인 화면 병원 클릭해서 들어왔을 때는 작동하지 않도록 처리해야 함.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev: any) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev: any) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev: any) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <div className="z-10 absolute right-2 top-2 bg-white rounded p-[2px] flex">
        <div
          id="btnRoadmap"
          className={`rounded-[2px] cursor-pointer p-2 ${
            mapType === "roadmap" ? "bg-white" : "bg-[#15B5BF]"
          } ${mapType === "roadmap" ? "text-black" : "text-white"}
          `}
          onClick={() => setMapType("roadmap")}
        >
          지도
        </div>
        <div
          id="btnSkyview"
          className={`rounded-[2px] cursor-pointer p-2 box-content ${
            mapType === "skyview" ? "bg-white" : "bg-[#15B5BF]"
          } ${mapType === "skyview" ? "text-black" : "text-white"}`}
          onClick={() => {
            setMapType("skyview");
          }}
        >
          스카이뷰
        </div>
      </div>
      <Map
        id="map"
        center={state.center}
        style={{ width: "100vw", height: "100vh" }}
        mapTypeId={mapType === "roadmap" ? "ROADMAP" : "HYBRID"}
      ></Map>
    </>
  );
};

export default KakaoMap;
