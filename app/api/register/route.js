import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password, name } = await req.json();
  // 아이디 비밀번호 닉네임 전부 존재 확인
  if (!email || !password || !name) {
    return NextResponse.json({
      message: "이메일이나 비밀번호, 닉네임이 비어 있습니다.",
      ok: false,
    });
  }

  // 이미 가입한 유저인지 확인
  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return NextResponse.json({
      message: "이미 가입된 유저입니다.",
      ok: false,
    });
  }
  // 가입 로직 작성
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // 임시 추가
    },
  });

  return NextResponse.json(user);
}
