import React from "react";
import { useFormContext } from "react-hook-form";

const ReviewInput = ({ label, placeholder, validation }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input {...register(`${label}`, validation)} placeholder={placeholder} />
      <p>{errors[label]?.message?.toString()}</p>
    </>
  );
};

export default ReviewInput;
