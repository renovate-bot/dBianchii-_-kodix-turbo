import React, { Suspense } from "react";

import { appRouter } from "@kdx/api";
import { auth } from "@kdx/auth";
import { prisma } from "@kdx/db";
import { Skeleton } from "@kdx/ui";

import { DialogProvider } from "./Contexts/DialogContexts";
import { GithubUser } from "./GithubUser";

export default function Testing() {
  return (
    <DialogProvider>
      <div className="mx-20 border-spacing-3 border border-red-200 p-4">
        <p className="my-4 text-red-300">
          Hi! I am inside react Server Component
        </p>
        <Suspense
          fallback={
            <div className="my-4 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          }
        >
          <GithubUser username="dbianchii" />;
        </Suspense>
        {/* <button onClick={() => alert("hi")}></button> */}
      </div>
    </DialogProvider>
  );
}
