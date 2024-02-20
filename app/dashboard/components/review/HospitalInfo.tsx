"use client";

import React from "react";
import { selectedHospital } from "@/share/atom";
import { useRecoilValue } from "recoil";
import ReviewList from "./ReviewList";

const HospitalInfo = () => {
  const hospital = useRecoilValue(selectedHospital);
  return (
    <div>
      <div>{hospital?.place_name}</div>
      <div>{hospital?.phone}</div>
      <div>{hospital?.road_address_name}</div>
      <ReviewList />
    </div>
  );
};

export default HospitalInfo;
