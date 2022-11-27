import { z } from 'zod';
import { procedure, router } from '../trpc';
export const appRouter = router({
  hello: procedure
    .query(({ input }) => {
      return {
        greeting: `hello vikash`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;