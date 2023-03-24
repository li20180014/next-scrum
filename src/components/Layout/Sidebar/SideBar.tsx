/* eslint-disable @next/next/no-img-element */
import type { FC } from 'react'
import SideBarItem from './SideBarItem'

type SideBarProps = {
  boards: {
    id: string
    name: string
  }[]
  selectedBoard?: string
  onBoardSelect: (id: string) => void
  openModal: () => void
}

// TODO: Fix responsive, make hamburger menu on smaller screens
const SideBar: FC<SideBarProps> = ({
  boards,
  selectedBoard,
  onBoardSelect,
  openModal,
}) => {
  return (
    <aside className="sticky left-0 top-0 h-screen w-64 border-r bg-white px-4 py-8 2xl:w-96 2xl:px-8">
      <img
        className="h-14 w-14 rounded-md"
        src="https://camo.githubusercontent.com/d8398345404d2c3168383b122c20e06c2accb2f948438c46fa86eda6ce91bc22/68747470733a2f2f63646e2e737667706f726e2e636f6d2f6c6f676f732f7375727265616c64622d69636f6e2e737667"
        alt="Organization logo"
      />
      <nav className="mt-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-700">
          Available boards
        </h2>
        <div className="mt-5 flex flex-col gap-2">
          {!!boards &&
            boards.map((boardItem) => (
              <SideBarItem
                onClick={() => onBoardSelect(boardItem.id)}
                key={boardItem.id}
                label={boardItem.name}
                isActive={selectedBoard === boardItem.id}
              />
            ))}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary-700">
            Organization Settings
          </h2>
          <SideBarItem label="Update settings" />
          <SideBarItem onClick={openModal} label="Create new board" />
        </div>
      </nav>
    </aside>
  )
}

export default SideBar
