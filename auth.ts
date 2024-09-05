import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Naver from "next-auth/providers/naver";
import { prisma } from "./prisma";
import { Provider } from "next-auth/providers";

export const CustomNaverAuthProvider: Provider = Naver({
  clientId: process.env.AUTH_NAVER_ID,
  clientSecret: process.env.AUTH_NAVER_SECRET,
  authorization: "https://nid.naver.com/oauth2.0/authorize?response_type=code",
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [CustomNaverAuthProvider],
});

export const { GET, POST } = handlers;
