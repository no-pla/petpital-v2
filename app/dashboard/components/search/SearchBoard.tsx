"use client";

import React from "react";
import SearchInput from "./SearchInput";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  hospitalDataArray,
  pagination as paginationArray,
  selectedHospital,
} from "@/share/atom";
import { useRouter } from "next/navigation";

const SearchBoard = () => {
  const hospitals = useRecoilValue(hospitalDataArray);
  const pagination = useRecoilValue(paginationArray);
  const setHospital = useSetRecoilState(selectedHospital);
  const router = useRouter();

  const onClickHospital = (hospital: any) => {
    setHospital(hospital);
    console.log(hospital);
    router.replace(
      `/dashboard?loc=${hospital.address_name}&name=${hospital.place_name}&lng=${hospital.x}&lat=${hospital.y}`
    );
  };

  return (
    <div>
      <SearchInput />
      {hospitals && (
        <div>
          {hospitals.map((hospital: any, index: number) => {
            return (
              <div key={hospital.id} onClick={() => onClickHospital(hospital)}>
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
