"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

const Providers = ({ children, session }: any) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>{children}</SessionProvider>
    </RecoilRoot>
  );
};

export default Providers;
