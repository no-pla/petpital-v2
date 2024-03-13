import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  // 유저 작성 리뷰 GET
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("userId");

  const userReviewList = await prisma.reviews.findMany({
    where: {
      userId: id,
    },
  });

  return NextResponse.json(userReviewList);
}

export async function PATCH(req) {
  // 프로필 UPDATE
  const { name, userId, image } = await req.json();

  const user = await prisma.user.updateMany({
    where: {
      id: userId,
    },
    data: {
      name,
      image,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req) {
  // 유저 탈퇴
  const { userId } = await req.json();
  console.log(userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({
      ok: false,
      message: "이미 탈퇴한 유저입니다.",
    });
  }

  if (user.id !== userId) {
    return NextResponse.json({
      ok: false,
      message: "알 수 없는 에러가 발생했습니다.",
    });
  }

  await prisma.reviews.deleteMany({
    where: {
      userId: userId,
    },
  });

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return NextResponse.json(null);
}
