"use client";

import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { searchHospitalWord } from "@/share/atom";
import Image from "next/image";

const SmallSearchInput = ({ openFunc }: { openFunc: () => void }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setHospitalSearch = useSetRecoilState(searchHospitalWord);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchRef.current?.value) return;
    setHospitalSearch(searchRef.current?.value);
  };

  return (
    <div className="bg-main relative flex p-2 gap-1 border-[#24979E] border-[0.4px] rounded">
      <button
        onClick={openFunc}
        className="px-2 flex justify-center items-center"
      >
        <Image
          src="/main_logo.png"
          width={24}
          height={36}
          className="w-6 h-9"
          alt="펫피탈 로고"
        />
      </button>
      <form onSubmit={(event) => onSubmit(event)} className="h-max w-full">
        <input
          ref={searchRef}
          className="py-2 px-2 min-w-[304px] w-full rounded-[2px] border-[#000] border-[0.4px] outline-none text-[14px] font-bold"
          placeholder="동물병원을 입력해 보세요."
        />
      </form>
    </div>
  );
};

export default SmallSearchInput;
