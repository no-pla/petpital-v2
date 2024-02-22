"use client";

import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { searchHospitalWord } from "@/share/atom";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setHospitalSearch = useSetRecoilState(searchHospitalWord);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchRef.current?.value) return;
    setHospitalSearch(searchRef.current?.value);
  };

  return (
    <div className="bg-[#15B5BF] relative flex py-2 gap-1">
      <div className="h-10 w-10 px-1 flex justify-center items-center">🤎</div>
      <form onSubmit={(event) => onSubmit(event)} className="w-full h-max pr-6">
        <input
          ref={searchRef}
          className="py-2 px-2 w-full rounded-[2px] border-[#000] border-[0.4px] outline-none"
          placeholder="동물병원을 입력해 보세요."
        />
      </form>
    </div>
  );
};

export default SearchInput;
