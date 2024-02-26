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
