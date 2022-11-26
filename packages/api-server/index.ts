import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import cors from "cors"

const app = express();
app.use(cors(
  {
    origin: "*"
  }
))
const port = 5000;
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  }),
);


export type AppRouter = typeof appRouter;

app.listen(port, () => {
  console.log(`. listening at http://localhost:${port}`);
});
