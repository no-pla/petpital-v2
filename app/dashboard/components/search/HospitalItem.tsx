import React from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { selectedHospital } from "@/share/atom";

const HospitalItem = ({ hospital, index }: any) => {
  const router = useRouter();
  const setHospital = useSetRecoilState(selectedHospital);

  const onClickHospital = (hospital: any) => {
    setHospital(hospital);
    router.replace(
      `/dashboard?loc=${hospital.address_name}&name=${hospital.place_name}&lng=${hospital.x}&lat=${hospital.y}&id=${hospital.id}`
    );
  };

  console.log(hospital);

  return (
    <div
      key={hospital.id}
      onClick={() => onClickHospital(hospital)}
      className="px-[18px] py-3 border-b-[#C5C5C5] border-b-[0.4px]"
    >
      <div className="flex gap-1 items-center mb-1">
        <span className="text-[#16B4BF] font-bold text-[20px] pr-3">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="font-bold">{hospital.place_name}</span>
        <span className="text-[12px] text-[#9f9f9f]">동물병원</span>
      </div>
      <div className="flex gap-[10px] text-[12px]">
        <div className="text-[#16B4BF]">★5</div>
        <div className="text-[#9f9f9f]">방문자 리뷰: 000</div>
      </div>
    </div>
  );
};

export default HospitalItem;
