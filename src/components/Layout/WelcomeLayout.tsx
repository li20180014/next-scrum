/* eslint-disable @next/next/no-img-element */
import type { FC } from 'react'

type WelcomeProps = {
  organizationName: string
}

const WelcomeLayout: FC<WelcomeProps> = ({ organizationName }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <h1 className="text-2xl font-extrabold text-primary-700 lg:text-5xl">
        Welcome to {organizationName}!
      </h1>
      <p className="mt-1 text-xs font-normal text-primary-600 sm:text-sm">
        {' '}
        Please select or{' '}
        <strong className="font-semibold">create a new board</strong> to
        continue.
      </p>
      <img
        className="h-auto w-2/3 2xl:w-5/6"
        alt="welcome"
        src="/welcome.png"
      />
    </div>
  )
}

export default WelcomeLayout
