import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password ", type: "password" },
      },
      async authorize(credentials) {
        // authorize => jwt callback => session callback 순서로 실행됨
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일 혹은 비밀번호가 비어있습니다.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("이메일 혹은 비밀번호를 다시 확인해 주세요.");
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!passwordsMatch) {
          throw new Error("이메일 혹은 비밀번호를 다시 확인해 주세요.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 프로필 업데이트 시
      if (trigger === "update" && (session.name || session.image)) {
        token.name = session.name;
        token.picture = session.image;
      }
      // 로그인 하면서 토큰의 user에 id 추가
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      // session에 토큰에 저장한 id를 포함해서 반환하여 session에서 접근 가능하도록
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
