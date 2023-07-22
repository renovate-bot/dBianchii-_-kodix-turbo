import Link from "next/link";
import { signOut } from "next-auth/react";

import { appRouter } from "@kdx/api";
import { auth } from "@kdx/auth";
import { prisma } from "@kdx/db";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  buttonVariants,
  Skeleton,
} from "@kdx/ui";

import { api } from "~/utils/api";
import HomePage from "./Home";

export default async function Home() {
  const session = await auth();
  const caller = appRouter.workspace.createCaller({ session, prisma });
  const initialData = await caller.getActiveWorkspace();

  return <HomePage initialData={initialData} />;
}
