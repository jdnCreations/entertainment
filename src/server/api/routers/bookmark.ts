import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bookmarkRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        mediaId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bookmark.create({
        data: {
          mediaId: input.mediaId,
          userId: ctx.session.user.id,
        },
      });
    }),

  remove: protectedProcedure
    .input(
      z.object({
        mediaId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const toDelete = await ctx.db.bookmark.findFirst({
        where: {
          mediaId: input.mediaId,
          userId: ctx.session.user.id,
        },
      });

      return ctx.db.bookmark.delete({
        where: {
          id: toDelete?.id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.bookmark.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
