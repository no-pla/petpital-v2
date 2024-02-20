"use client";

import { reviewCategories } from "@/share/atom";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const CategoriesForm = () => {
  const [categories, setCategories] = useRecoilState(reviewCategories);
  const keywordRef = useRef<HTMLInputElement>(null);
  let index = 0;
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!keywordRef.current) return;
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

  return (
    <div>
      <div>카테고리</div>
      <form onSubmit={(event) => onSubmit(event)}>
        <input placeholder="EX. 저렴해요, 깨끗해요" ref={keywordRef} />
      </form>
      <div className="flex gap-2 flex-wrap">
        {categories?.map((category: any) => {
          return (
            <div key={category.id} className="bg-sky-200">
              <span> {category.keyword}</span>
              <button onClick={() => onDeleteCategory(category.id)}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesForm;
