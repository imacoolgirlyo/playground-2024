import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure.input(z.string()).query(async ({ input }) => {
    return `hello ${input}`;
  }),
});

export type AppRouter = typeof appRouter;
