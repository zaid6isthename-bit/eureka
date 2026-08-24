"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { readSession } from "@/lib/use-persistent-state";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<"checking" | "authed">("checking");

  useEffect(() => {
    if (readSession()) {
      setState("authed");
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (state !== "authed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <Image
          src="/reclaim-light.png"
          alt="RECLAIM"
          width={40}
          height={40}
          className="animate-pulse rounded-xl"
        />
      </div>
    );
  }

  return <>{children}</>;
}
