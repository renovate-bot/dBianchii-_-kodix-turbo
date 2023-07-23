import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@kdx/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@kdx/api";
