import React from "react";
import { useFormContext } from "react-hook-form";

const ReviewInput = ({ label, placeholder, validation, title, sub }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="font-bold text-[14px]">{title}</div>
      <p className="text-[#c5c5c5] text-[10px] mt-1 mb-2">{sub}</p>
      {label === "review" ? (
        <textarea
          {...register(`${label}`, validation)}
          placeholder={placeholder}
          className="w-full bg-[#FAFAFA] h-20 text-[14px] p-2 resize-none"
        />
      ) : (
        <input
          {...register(`${label}`, validation)}
          placeholder={placeholder}
          className={`bg-[#FAFAFA] p-2 w-full text-[14px]`}
        />
      )}
      <p className="text-red-300 text-[10px] mt-1 mb-2">
        {errors[label]?.message?.toString()}
      </p>
    </div>
  );
};

export default ReviewInput;
