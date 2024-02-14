import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password, nickname } = await req.json();

  // 아이디 비밀번호 닉네임 전부 존재 확인
  if (!email || !password || !nickname)
    return NextResponse.json({
      message: "이메일이나 비밀번호가 비어 있습니다.",
      ok: false,
    });

  // 이미 가입한 유저인지 확인
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist)
    return NextResponse.json({ message: "이미 가입된 유저입니다.", ok: false });

  // 가입 로직 작성
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "예기치 못한 에러가 발생했습니다.",
      ok: false,
    });
  }

  return NextResponse.json({
    message: "가입되었습니다.",
    ok: true,
  });
}
