"use client";

import React from "react";
import SearchInput from "./SearchInput";
import { useRecoilValue } from "recoil";
import { hospitalDataArray, pagination as paginationArray } from "@/share/atom";

const SearchBoard = () => {
  const hospitals = useRecoilValue(hospitalDataArray);
  const pagination = useRecoilValue(paginationArray);

  return (
    <div>
      <SearchInput />
      {hospitals && (
        <div>
          {hospitals.map((hospital: any, index: number) => {
            return (
              <div key={hospital.id}>
                <span>{String.fromCharCode(65 + index)}</span>
                {hospital.place_name}
              </div>
            );
          })}
        </div>
      )}
      {pagination && (
        <div>
          <button
            onClick={() => pagination.gotoFirst()}
            disabled={!pagination.hasPrevPage}
            className="disabled:bg-gray-500"
          >
            처음으로
          </button>
          <button
            onClick={() => pagination.prevPage()}
            disabled={!pagination.hasPrevPage}
            className="disabled:bg-gray-500"
          >
            이전
          </button>
          <button
            onClick={() => pagination.nextPage()}
            disabled={!pagination.hasNextPage}
            className="disabled:bg-gray-500"
          >
            다음
          </button>
          <button
            onClick={() => pagination.gotoLast()}
            disabled={!pagination.hasNextPage}
            className="disabled:bg-gray-500"
          >
            마지막으로
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBoard;
