import { Priority } from '@prisma/client'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const issueRouter = createTRPCRouter({
  createIssue: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        priority: z.nativeEnum(Priority),
        userId: z.string(),
        columnId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.issue.create({ data: input })
    }),
})
