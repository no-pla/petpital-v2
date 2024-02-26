import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("userId");

  const userReviewList = await prisma.reviews.findMany({
    where: {
      userId: id,
    },
  });

  return NextResponse.json(userReviewList);
}
