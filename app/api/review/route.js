import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const {
    title,
    review,
    totalAmounts,
    rate,
    photo,
    hospitalId,
    userId,
    categories,
  } = await req.json();

  if (!userId) {
    return NextResponse.json({
      ok: false,
      message: "로그인 후 이용해 주세요.",
    });
  }

  if (!title || !review || !totalAmounts || !rate) {
    return NextResponse.json({
      ok: false,
      message: "비어 있는 필드가 존재합니다.",
    });
  }

  if (!hospitalId) {
    return NextResponse.json({
      ok: false,
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }

  let post;

  try {
    post = await prisma.reviews.create({
      data: {
        title,
        review,
        totalAmounts,
        rate,
        photo:
          photo === ""
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            : photo, // TODO: 비어 있는 경우 이미지 임시 추가
        hospitalId,
        userId,
        categories,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }

  return NextResponse.json(post);
}
