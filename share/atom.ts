import { atom } from "recoil";

export const searchHospitalWord = atom<string>({
  key: "searchHospitalWord",
  default: "",
});

export const hospitalDataArray = atom<any>({
  key: "hospitalDataArray",
  default: null,
});

export const pagination = atom<any>({
  key: "pagination",
  default: null,
});
