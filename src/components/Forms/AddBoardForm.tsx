import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useState } from 'react'
import { api } from 'src/utils/api'
import ExitButton from '../Buttons/ExitButton'

type BoardFormProps = {
  onClose: () => void
  refetch: () => void
}

const AddBoardForm: FC<BoardFormProps> = ({ onClose, refetch }) => {
  const router = useRouter()
  const [boardName, setBoardName] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const addBoard = api.board.createBoard.useMutation()

  const onChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addBoard.mutate(
      {
        organizationId: router.query.organizationId as string,
        name: boardName,
      },
      {
        onSuccess() {
          refetch()
          onClose()
        },
        onError() {
          setErrorMessage('Unable to add board!')
          setIsError(true)
        },
      }
    )
  }

  return (
    <form
      className="relative h-full w-full overflow-hidden overflow-y-auto p-4"
      onSubmit={handleSubmit}
    >
      <ExitButton onClose={onClose} />
      <h1 className="text-xl font-bold uppercase">Create new board</h1>

      <div className="my-3">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Board name
        </label>
        <input
          onChange={onChangeHandler}
          value={boardName}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
          required
        />
      </div>

      <div className="mt-6 flex">
        <button
          type="submit"
          className="w-1/2 rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white  "
        >
          Submit
        </button>

        {isError && (
          <label className="ml-3 flex items-center justify-center   text-sm font-medium text-red-600">
            {errorMessage}
          </label>
        )}
      </div>
    </form>
  )
}

export default AddBoardForm
