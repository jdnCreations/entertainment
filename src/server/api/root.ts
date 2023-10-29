import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { bookmarkRouter } from "./routers/bookmark";
import { mediaRouter } from "./routers/media";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bookmark: bookmarkRouter,
  media: mediaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
