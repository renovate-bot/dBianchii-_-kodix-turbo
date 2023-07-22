import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import type { AppRouter } from "@kdx/api";

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") return `https://www.kodix.com.br`; // SSR in production should use vercel url
  if (typeof window !== "undefined") return `http://localhost:3000`; // browser should use localhost:3000
  return `http://localhost:3000`; // dev SSR should use localhost
};

const proxyClient = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

export const helpers = createServerSideHelpers({
  client: proxyClient,
});
