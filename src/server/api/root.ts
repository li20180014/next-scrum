import { boardRouter } from './routers/boards'
import { columnRouter } from './routers/columns'
import { issueRouter } from './routers/issue'
import { organizationRouter } from './routers/organizations'
import { userRouter } from './routers/users'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
  column: columnRouter,
  board: boardRouter,
  user: userRouter,
  issue: issueRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
