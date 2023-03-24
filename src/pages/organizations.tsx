import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Dropdown from 'src/components/Dropdown/Dropdown'
import AddOrganizationForm from 'src/components/Forms/AddOrganizationForm'
import { api } from 'src/utils/api'

// TODO: Fix responsive
const Organizations: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const { data: organizations } = api.organization.getAll.useQuery(undefined, {
    initialData: [],
  })
  const [selected, setSelected] = useState<{ id: string; name: string }>({
    id: '',
    name: 'Select',
  })

  const handleSelect = (selected: { id: string; name: string }) => {
    router.push(`/organization/${selected.id}`)
  }

  useEffect(() => {
    if (status !== 'loading' && !session) router.push('/auth/signin')
  }, [session, status, router])

  useEffect(() => {
    if (organizations.length)
      setSelected({ id: organizations[0]!.id, name: organizations[0]!.name })
  }, [organizations])

  return (
    <div className="flex h-screen items-center justify-center gap-3 bg-gradient-to-r from-violet-200 to-pink-200 ">
      <div className="flex w-1/2 flex-col items-center gap-4">
        <h1 className="text-xl font-bold uppercase text-primary-700">
          Choose existing organization
        </h1>
        <Dropdown
          selected={selected}
          onChange={handleSelect}
          data={organizations || []}
        />
      </div>
      <div className="h-1/2 border-r-2 bg-white"></div>
      <div className="flex w-1/2 flex-col items-center gap-4">
        <h1 className="text-xl font-bold uppercase text-primary-700">
          Create new organization
        </h1>
        <div className=" w-1/2">
          {' '}
          <AddOrganizationForm />
        </div>
      </div>
    </div>
  )
}

export default Organizations
