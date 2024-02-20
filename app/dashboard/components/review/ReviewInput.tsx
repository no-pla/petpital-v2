import React from "react";
import { useFormContext } from "react-hook-form";

const ReviewInput = ({ label, placeholder }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return <input {...register(`${label}`)} placeholder={placeholder} />;
};

export default ReviewInput;
