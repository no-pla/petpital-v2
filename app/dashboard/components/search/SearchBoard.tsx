"use client";

import React from "react";
import { hospitalDataArray, pagination as paginationAtom } from "@/share/atom";
import { useRecoilValue } from "recoil";
import HospitalItem from "./HospitalItem";

const SearchBoard = () => {
  const hospitals = useRecoilValue(hospitalDataArray);
  const pagination = useRecoilValue(paginationAtom);

  return (
    <div className="flex flex-col justify-between">
      {hospitals && (
        <div className="min-h-[calc(100vh-58px)]">
          {hospitals.map((hospital: any, index: number) => {
            return (
              <HospitalItem key={index} hospital={hospital} index={index} />
            );
          })}
        </div>
      )}
      <div>
        {pagination && (
          <div className="w-full">
            <button
              onClick={() => pagination.prevPage()}
              disabled={!pagination.hasPrevPage}
              className="bg-[#15B5BF] text-white disabled:bg-gray-300 disabled:text-black w-1/2 py-3 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              onClick={() => pagination.nextPage()}
              disabled={!pagination.hasNextPage}
              className="bg-[#15B5BF] text-white disabled:bg-gray-300 disabled:text-black w-1/2 py-3 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBoard;
