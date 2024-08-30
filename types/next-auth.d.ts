import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
  interface Profile {
    response?: {
      email: string;
      profile_image: string;
      nickname: string;
    };
    kakao_account?: {
      email: string;
    };
    properties?: {
      profile_image: string;
      nickname: string;
    };
  }
}
