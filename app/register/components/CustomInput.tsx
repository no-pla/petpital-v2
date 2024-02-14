import React from "react";
import { useFormContext } from "react-hook-form";

const CustomInput = ({ type, label, placeholder, validation }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input
        {...register(`${label}`, validation)}
        type={type}
        placeholder={placeholder}
        className="border"
      />
      <p>{errors[label]?.message?.toString()}</p>
    </>
  );
};

export default CustomInput;
