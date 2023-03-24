import { Priority } from '@prisma/client'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useState } from 'react'
import { api } from 'src/utils/api'
import ExitButton from '../Buttons/ExitButton'
import RadioButton from '../Buttons/RadioButton'
import Dropdown from '../Dropdown/Dropdown'

type FormProps = {
  onClose: () => void
  selectedBoard: string
  refetch: () => void
}

const AddIssueForm: FC<FormProps> = ({ onClose, selectedBoard, refetch }) => {
  const router = useRouter()

  const [formState, setFormState] = useState(FormData)
  const [selectedColumn, setSelectedColumn] = useState({ id: '', name: '' })
  const [selectedAsignee, setSelectedAsignee] = useState({ id: '', name: '' })
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { data: columns } = api.column.getColumnsByBoardId.useQuery({
    boardId: selectedBoard,
  })
  const { data: asignees } = api.user.getByOrganization.useQuery({
    organizationId: router.query.organizationId as string,
  })
  const addIssue = api.issue.createIssue.useMutation()

  // TODO: Rewrite functions into generic handler
  const handleSelectedColumn = (selected: { id: string; name: string }) => {
    setSelectedColumn(selected)
    setFormState((prevState) => ({ ...prevState, columnId: selected.id }))
  }

  const handleSelectedAsignee = (selected: { id: string; name: string }) => {
    setSelectedAsignee(selected)
    setFormState((prevState) => ({ ...prevState, userId: selected.id }))
  }

  const handleSelectedPriority = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({ ...prevState, priority: value as Priority }))
  }

  const onChangeHandler =
    (key: string) =>
    ({
      target: { value },
    }:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormState((prevState) => ({ ...prevState, [key]: value }))
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Object.values(formState).forEach((value) => {
      if (!value) {
        setErrorMessage('Please fill in all required fields!')
        setIsError(true)
      }
    })

    if (isError) return

    addIssue.mutate(formState, {
      onSuccess() {
        refetch()
        onClose()
      },
      onError() {
        setErrorMessage('Unable to add new issue!')
        setIsError(true)
      },
    })
  }

  return (
    <form
      className="relative h-full w-full overflow-hidden overflow-y-auto p-4"
      onSubmit={handleSubmit}
    >
      <ExitButton onClose={onClose} />

      <div className="mt-6 mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Issue name
        </label>
        <input
          onChange={onChangeHandler(FORM_KEYS.NAME)}
          value={formState.name}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
          required
        />
      </div>

      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-900 ">
          Column
        </label>
        {columns && (
          <Dropdown
            width="w-full"
            dropdownColor="bg-gray-200 text-primary-700 "
            selected={selectedColumn}
            data={columns}
            onChange={handleSelectedColumn}
          />
        )}
      </div>

      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-900 ">
          Description
        </label>
        <textarea
          value={formState.description}
          onChange={onChangeHandler(FORM_KEYS.DESCRIPTION)}
          rows={4}
          className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
          placeholder="Enter..."
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-900 ">
          Asignee
        </label>
        {asignees && (
          <Dropdown
            width="w-full"
            dropdownColor="bg-gray-200 text-primary-700"
            selected={selectedAsignee}
            data={asignees}
            onChange={handleSelectedAsignee}
          />
        )}
      </div>

      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-900 ">
          Priority
        </label>
        <RadioButton data={Priority} handleSelected={handleSelectedPriority} />
      </div>

      <div className="my-6 flex ">
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

const FORM_KEYS = {
  NAME: 'name',
  DESCRIPTION: 'description',
  PRIORITY: 'priority',
  USER_ID: 'userId',
  COLUMN_ID: 'columnId',
}

const FormData = {
  name: '',
  description: '',
  priority: '' as Priority,
  userId: '',
  columnId: '',
}

export default AddIssueForm
