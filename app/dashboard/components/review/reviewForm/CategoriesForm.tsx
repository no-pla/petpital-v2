"use client";

import { reviewCategories } from "@/share/atom";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { IoCloseOutline } from "react-icons/io5";

const CategoriesForm = ({ defaultCategories }: any) => {
  const [categories, setCategories] = useRecoilState(reviewCategories);
  const keywordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!keywordRef.current) return;
    if (!keywordRef.current.value) return;
    const keyword = keywordRef.current.value;

    setCategories((prev) => [
      ...prev,
      {
        keyword,
        id: uuidv4(),
      },
    ]);
    keywordRef.current.value = "";
  };

  const onDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category: any) => category.id !== id));
  };

  useEffect(() => {
    if (defaultCategories) {
      setCategories(defaultCategories);
    }
  }, []);

  return (
    <div className="px-3 my-4">
      <div className="font-bold text-[14px]">카테고리</div>
      <p className="text-[#c5c5c5] text-[10px] mt-1 mb-2">
        다른 회원님에게 이 병원을 간단하게 설명해 주세요.
        <br />
        (입력 후 Enter키로 다름 단어를 입력해 주세요.)
      </p>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          placeholder="EX. 저렴해요, 깨끗해요"
          ref={keywordRef}
          className="bg-[#FAFAFA] p-2 w-full mb-2 text-[14px]"
        />
      </form>
      <div className="flex gap-2 flex-wrap">
        {categories?.map((category: any) => {
          return (
            <div
              key={category.id}
              className=" border-[#15B5BF] border-[2px] p-1 rounded text-[14px] flex items-center"
            >
              <span className="text-[#15B5BF]"> {category.keyword}</span>
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="bg-[#15B5BF] text-white text-[14px] rounded-full ml-1"
              >
                <IoCloseOutline size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesForm;
