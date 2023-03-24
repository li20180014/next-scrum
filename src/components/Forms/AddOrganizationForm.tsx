/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Organization } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from 'src/utils/api'

// TODO: Create drag and drop form avatar
const AddOrganizationForm = () => {
  const router = useRouter()
  const [formState, setFormState] = useState(FormData)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const addOrganization = api.organization.createOrganization.useMutation()

  const onChangeHandler =
    (key: string) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prevState) => ({ ...prevState, [key]: value }))
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    Object.values(FORM_KEYS).forEach((value) => {
      if (!formState[value as keyof typeof FormData]) {
        setErrorMessage('Please fill in all required fields!')
        setIsError(true)
        return
      }
    })

    if (isError) return

    addOrganization.mutate(formState, {
      onSuccess(
        data: Organization,
        _variables: { name: string; domain: string; avatar: string },
        _context: unknown
      ) {
        router.push(`/organization/${data.id}`)
      },
      onError() {
        setErrorMessage('Unable to add organization!')
        setIsError(true)
      },
    })
  }

  return (
    <form
      className="flex flex-col rounded-xl bg-white py-6 px-3 shadow-md"
      onSubmit={handleSubmit}
    >
      {Object.values(FORM_KEYS).map((key, id) => (
        <div key={id} className="mb-3">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            value={formState[key as keyof typeof FormData]}
            onChange={onChangeHandler(key)}
            className="block w-full rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 "
            required
          />
        </div>
      ))}

      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Avatar
        </label>
        <input
          value={formState.avatar}
          onChange={onChangeHandler('avatar')}
          className="block w-full rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 "
        />
      </div>

      <div className="flex justify-center ">
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
  DOMAIN: 'domain',
}

const FormData = {
  name: '',
  domain: '',
  avatar: '',
}

export default AddOrganizationForm
