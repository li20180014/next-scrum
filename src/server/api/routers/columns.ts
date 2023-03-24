import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const columnRouter = createTRPCRouter({
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        issues: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            priority: z.string(),
            description: z.string(),
            userId: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t1 = ctx.prisma.column.update({
        where: { id: input.id },
        data: {
          issues: { set: [] },
        },
      })

      const issueIds = input.issues.map((item) => ({ id: item.id }))

      const t2 = ctx.prisma.column.update({
        where: { id: input.id },
        data: {
          issues: {
            connect: issueIds,
          },
        },
      })

      await ctx.prisma.$transaction([t1, t2])
    }),
  createColumn: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        boardId: z.string(),
      })
    )
    .mutation(async ({ ctx, input: column }) => {
      return await ctx.prisma.column.create({ data: column })
    }),
  updateColumnName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      return await ctx.prisma.column.update({
        where: {
          id,
        },
        data: data,
      })
    }),
  getColumnsByBoardId: protectedProcedure
    .input(z.object({ boardId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.column.findMany({
        where: { boardId: input.boardId },
      })
    }),
})
