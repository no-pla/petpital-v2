"use client";

import React from "react";
import { hospitalDataArray, pagination as paginationAtom } from "@/share/atom";
import { useRecoilValue } from "recoil";
import HospitalItem from "./HospitalItem";

const SearchBoard = () => {
  const hospitals = useRecoilValue(hospitalDataArray);
  const pagination = useRecoilValue(paginationAtom);

  return (
    <div className="h-fit min-h-[calc(100vh-98px)] flex flex-col justify-between">
      {hospitals && (
        <div>
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
              className="bg-[#15B5BF] text-white disabled:bg-gray-300 disabled:text-black w-1/2 py-1 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              onClick={() => pagination.nextPage()}
              disabled={!pagination.hasNextPage}
              className="bg-[#15B5BF] text-white disabled:bg-gray-300 disabled:text-black w-1/2 py-1 disabled:cursor-not-allowed"
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
