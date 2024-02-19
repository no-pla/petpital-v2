import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/provider/Provider";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PETPITAL",
  description: "동물병원 정보 교환 사이트",
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <Provider>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
