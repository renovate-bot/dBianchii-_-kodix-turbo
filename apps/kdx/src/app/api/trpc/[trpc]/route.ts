import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@kdx/api";

export const runtime = "nodejs";

// export API handler
const enabledOrigins = ["https://client-nextjs-one.vercel.app"];
const handler = (req: Request, res: Response) => {
	// Enable cors for production apps, all kodix.vercel.app apps, and localhost
  if (req.headers.get("origin")) {
    if (
      enabledOrigins.includes(req.headers.get("origin")!) ||
      req.headers.get("origin")!.includes("kodix.vercel.app") ||
      req.headers.get("origin")!.includes("localhost")
    ) {
      res.headers.append("Access-Control-Allow-Origin", req.headers.get("origin")!);
    }
  }

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    
    return res.ok
  }

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => createTRPCContext(),
  });
}
  

export { handler as GET, handler as POST };
