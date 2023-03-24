import type { FC } from 'react'

type SideBarProps = {
  label: string
  onClick?: () => void
  isActive?: boolean
}

const SideBarItem: FC<SideBarProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-lg p-3  ${
        isActive ? 'bg-primary-600' : 'bg-primary-700'
      }`}
    >
      <span className="text-xs font-semibold text-primary-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span className="text-sm text-white">{label}</span>
    </button>
  )
}

export default SideBarItem
