import type { FC } from 'react'
import { useState } from 'react'
import AddIssueForm from '../Forms/AddIssueForm'
import Modal from '../Modal/Modal'

type SubBarProps = {
  onColumnAdd: () => void
  selectedBoard: string
  refetch: () => void
}

const BoardBar: FC<SubBarProps> = ({ onColumnAdd, selectedBoard, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnClose = () => setIsOpen(false)

  return (
    <>
      {isOpen && (
        <Modal onClose={handleOnClose}>
          <div className="h-full w-full rounded-lg bg-gray-50 shadow-md lg:h-auto lg:w-2/5 xl:w-1/4">
            <AddIssueForm
              onClose={handleOnClose}
              selectedBoard={selectedBoard}
              refetch={refetch}
            />
          </div>
        </Modal>
      )}
      <div className="flex items-center justify-between py-3">
        <div className="flex-1"></div>
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg bg-gray-100 bg-opacity-70 p-2 text-xs text-primary-700"
          >
            + Issue
          </button>
          <button
            onClick={onColumnAdd}
            className="ml-2 rounded-lg bg-gray-100 bg-opacity-70 p-2 text-xs text-primary-700"
          >
            + Column
          </button>
        </div>
      </div>
    </>
  )
}

export default BoardBar
