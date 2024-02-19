"use client";

import {
  hospitalDataArray,
  pagination,
  searchHospitalWord,
} from "@/share/atom";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";

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
  const hospital = useRecoilValue(searchHospitalWord);
  const setHospitalArray = useSetRecoilState(hospitalDataArray);
  const setPagination = useSetRecoilState(pagination);

  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const loc = searchParams.get("loc");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    // 지도 띄울 때 현재 위치로 고정
    if (lat && lng) {
      setState((prev: any) => ({
        ...prev,
        center: {
          lat: lat, // 위도
          lng: lng, // 경도
        },
        isLoading: false,
      }));
      return;
    } else {
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
    }
  }, []);

  useEffect(() => {
    if (!map) return;
    // if (hospital === "" && name === "") return;
    const ps = new kakao.maps.services.Places();

    const hospitalName = !hospital ? `${loc} ${name}` : hospital + "동물병원";
    ps.keywordSearch(
      hospitalName,
      (data, status, pagination) => {
        console.log(status);
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          // TODO: 검색 결과 없을 때 처리
        }
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            // }

            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
        if (pagination.first !== pagination.last && pagination.last > 1) {
          setPagination(pagination);
        }
        setHospitalArray(data);
      },
      {
        category_group_code: "HP8",
      }
    );
  }, [hospital, map]);

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
        onCreate={setMap}
      >
        {markers.map((marker: any) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          ></MapMarker>
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
