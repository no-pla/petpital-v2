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
    createdAt,
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

  if (!hospitalId || !createdAt) {
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
        createdAt,
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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  let reviews;
  try {
    reviews = await prisma.reviews.findMany({
      where: {
        hospitalId: id,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }

  return NextResponse.json({ reviews: reviews });
}

export async function DELETE(req) {
  const { reviewId, userId } = await req.json();
  console.log(reviewId, userId);

  // 리뷰 아이디 기반으로 리뷰 가져오기
  const exist = await prisma.reviews.findUnique({
    where: {
      id: reviewId,
    },
  });
  // 리뷰가 존재하는지 확인

  if (!exist) {
    return NextResponse.json({
      ok: false,
      message: "이미 삭제된 리뷰입니다.",
    });
  }
  // 리뷰에 저장된 userId랑 작성자 아이디랑 같은지 확인
  if (exist.userId !== userId) {
    return NextResponse.json({
      ok: false,
      message: "본인이 작성한 리뷰만 삭제할 수 있습니다.",
    });
  }
  // 같으면 삭제

  try {
    await prisma.reviews.delete({
      where: {
        id: reviewId,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(null);
}
