import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const boardRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.board.findFirst({
        where: { id: input.id },
        include: {
          columns: { include: { issues: true }, orderBy: { createdAt: 'asc' } },
        },
      })
    }),
  createBoard: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.board.create({ data: input })
    }),
})
