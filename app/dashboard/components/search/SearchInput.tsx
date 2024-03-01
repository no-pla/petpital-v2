"use client";

import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { searchHospitalWord } from "@/share/atom";
import Image from "next/image";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setHospitalSearch = useSetRecoilState(searchHospitalWord);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchRef.current?.value) return;
    setHospitalSearch(searchRef.current?.value);
  };

  return (
    <div className="bg-[#15B5BF] relative flex py-2 pl-2 gap-1">
      <div className="w-10 px-1 flex justify-center items-center">
        <Image
          src="/main_logo.png"
          width={24}
          height={36}
          alt="펫피탈 로고"
          className="w-6 h-9"
        />
      </div>
      <form onSubmit={(event) => onSubmit(event)} className="w-full h-max pr-6">
        <input
          ref={searchRef}
          className="py-2 px-2 w-full rounded-[2px] border-[#000] border-[0.4px] outline-none text-[14px] font-bold"
          placeholder="동물병원을 입력해 보세요."
        />
      </form>
    </div>
  );
};

export default SearchInput;
