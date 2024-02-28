import type { Metadata } from "next";
import Provider from "@/provider/Provider";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "PETPITAL | %s",
    default: "PETPITAL",
  },
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
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/petpital-v2.appspot.com/o/assets%2F_final_.png?alt=media&token=e616646f-f0cb-4ac4-8766-be801ea9def0"
        />
      </head>
      <Provider>
        <body className="font-Pretendard" suppressHydrationWarning={true}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
