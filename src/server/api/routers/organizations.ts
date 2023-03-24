import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const organizationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session
    const userEmailDomain = user.email!.split('@')[1]

    return await ctx.prisma.organization.findMany({
      where: { domain: userEmailDomain },
    })
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.organization.findFirst({
        where: { id: input.id },
        include: { boards: true },
      })
    }),
  createOrganization: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
        avatar: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.organization.create({ data: input })
    }),
})
