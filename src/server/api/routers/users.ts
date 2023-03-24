import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  getByOrganization: protectedProcedure
    .input(z.object({ organizationId: z.string() }))
    .query(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findFirst({
        where: { id: input.organizationId },
      })

      if (organization) {
        return await ctx.prisma.user.findMany({
          where: { email: { contains: organization.domain } },
        })
      }
    }),
})
