import React from "react";

const Review = ({ review }: any) => {
  return (
    <div>
      {review.title}
      <div>{review.review}</div>
      <div>{review.totalAmounts}</div>
    </div>
  );
};

export default Review;
