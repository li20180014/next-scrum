import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (status !== 'loading' && session) {
      router.push('/organizations')
      return
    }

    router.push('/auth/signin')
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-violet-200 to-pink-200 px-16">
      <div className="place-self-center">
        <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
          Welcome to your number one Scrum Board!
        </h1>
        <p className="mb-6 max-w-2xl  text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
          Experience effortless agile project management with our innovative
          solution.
        </p>
        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Continue
        </button>
      </div>
      <div className="hidden max-w-2xl items-center justify-center lg:flex">
        <Image
          src="/scrum-board.png"
          alt="mockup"
          height="700"
          width="700"
          priority
        />
      </div>
    </div>
  )
}

export default Home
