"use client";

import { useEffect } from "react";
import Script from "next/script";

import Chat from "~/components/Chat";

export default function Page() {
  return (
    <div className="flex min-h-screen break-before-page items-center justify-center bg-[#EDB234]">
      <Chat />
    </div>
  );
}
