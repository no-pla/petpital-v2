import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const hospitalId = searchParams.get("hospitalId");

  let reviews;

  try {
    reviews = await prisma.reviews.findMany({
      where: {
        hospitalId: hospitalId,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(reviews);
}
