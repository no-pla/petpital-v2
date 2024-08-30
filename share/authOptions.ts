import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, credentials, account }) {
      if (!credentials) {
        if (account?.provider === "naver") {
          const userExist = await prisma.user.findUnique({
            where: {
              email: profile?.response.email,
            },
          });

          if (!userExist) {
            const newUser = await prisma.user.create({
              data: {
                email: profile?.response!.email!,
                image: profile?.response!.profile_image!,
                name: profile?.response!.nickname!,
              },
            });
            user.id = newUser.id;
          } else {
            user = Object.assign(user, userExist);
          }
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
