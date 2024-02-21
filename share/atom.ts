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

export const selectedHospital = atom<any>({
  key: "selectedHospital",
  default: null,
});

export const reviewCategories = atom<any[]>({
  key: "reviewCategories",
  default: [],
});

export const reviewOpen = atom<boolean>({
  key: "reviewOpen",
  default: false,
});
