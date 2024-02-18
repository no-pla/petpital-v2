"use client";
import React from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <Map
      id="map"
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100vw", height: "100vh" }}
    ></Map>
  );
};

export default KakaoMap;
