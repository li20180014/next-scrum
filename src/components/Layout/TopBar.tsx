/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'

type TopBarProps = {
  organizationName: string
}

const TopBar: FC<TopBarProps> = ({ organizationName }) => {
  const session = useSession()

  return (
    <div className="min-w-0 bg-white">
      <div className="border-b border-gray-200">
        <header className="px-3">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-medium text-primary-700">
              {organizationName}
            </h1>
            <div className="flex">
              <div className="hidden items-center lg:flex">
                <h2 className="mr-3 text-xs tracking-wide text-primary-600">
                  User Settings
                </h2>
                <button>
                  <img
                    className="h-9 w-9 rounded-full object-cover"
                    alt="Avatar"
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&w=144&h=144&q=80&facepad=2.5"
                  />
                </button>
              </div>
              <div className="flex items-center">
                {session.status !== 'loading' && session.data && (
                  <button
                    className="ml-4 text-base text-primary-700"
                    title="Logout"
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}/auth/signin`,
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default TopBar
