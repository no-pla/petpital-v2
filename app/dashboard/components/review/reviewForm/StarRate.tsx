"use client";

import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const StarRate = () => {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(rate);
  };

  return (
    <div className="">
      <div>별점</div>
      <Rating
        onClick={handleRating}
        SVGstyle={{ display: "inline-block" }}
        style={{
          marginBottom: -10,
        }}
        allowFraction
        allowHover
        size={40}
        SVGstrokeColor="#15B5BF"
        fillColor="#15B5BF"
        initialValue={0}
      />
    </div>
  );
};

export default StarRate;
