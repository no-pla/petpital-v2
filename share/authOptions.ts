import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account?.provider === "naver") {
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile?.response?.email,
          },
        });

        if (!userExist) {
          const newUser = await prisma.user.create({
            data: {
              email: profile?.response?.email,
              image: profile?.response?.profile_image,
              name: profile?.response?.nickname,
            },
          });
          user.id = newUser.id;
        } else {
          user = Object.assign(user, userExist);
        }
      } else if (account?.provider === "kakao") {
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile?.kakao_account?.email,
          },
        });

        if (!userExist) {
          const newUser = await prisma.user.create({
            data: {
              email: profile?.kakao_account?.email,
              image: profile?.properties?.profile_image,
              name: profile?.properties?.nickname,
            },
          });
          user.id = newUser.id;
        } else {
          user = Object.assign(user, userExist);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
