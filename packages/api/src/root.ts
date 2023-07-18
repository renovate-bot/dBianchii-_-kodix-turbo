import { appsRouter } from "./router/apps";
import { authRouter } from "./router/auth";
import { eventRouter } from "./router/event";
import { technologyRouter } from "./router/technology";
import { todoRouter } from "./router/todo";
import { userRouter } from "./router/user";
import { workspaceRouter } from "./router/workspace";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  app: appsRouter,
  auth: authRouter,
  technology: technologyRouter,
  user: userRouter,
  workspace: workspaceRouter,
  todo: todoRouter,
  event: eventRouter,
	post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
