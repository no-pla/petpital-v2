"use client";

import { searchHospitalWord } from "@/share/atom";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setHospitalSearch = useSetRecoilState(searchHospitalWord);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchRef.current?.value) return;
    setHospitalSearch(searchRef.current?.value);
  };

  return (
    <div className="relative">
      <p className="absolute">🔍</p>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          ref={searchRef}
          className="w-full rounded-[2px]"
          placeholder="동물병원을 입력해 보세요."
        />
      </form>
    </div>
  );
};

export default SearchInput;

/**
 * ㄷ
 */
