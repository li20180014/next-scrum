import { getProviders, signIn, useSession } from 'next-auth/react'
import type { InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const SignIn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading' && session) {
      router.push('/')
    }
  }, [session, router, status])

  return (
    <>
      <section className="bg-gradient-to-r from-violet-200 to-pink-200">
        <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Sign in to your account
              </h1>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                    <div key={provider.name}>
                      <button
                        className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300"
                        onClick={() =>
                          signIn(provider.id, {
                            callbackUrl: `${window.location.origin}/organizations`,
                          })
                        }
                      >
                        Sign in with {provider.name}
                      </button>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}

export default SignIn
