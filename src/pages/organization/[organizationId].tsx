import SideBar from 'src/components/Layout/Sidebar/SideBar'
import type { NextPage } from 'next'
import TopBar from 'src/components/Layout/TopBar'
import Board from 'src/components/Board/Board'
import { useEffect, useState } from 'react'
import { api } from 'src/utils/api'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import LoadingSpinner from 'src/components/LoadingSpinner/LoadingSpinner'
import WelcomeLayout from 'src/components/Layout/WelcomeLayout'
import Modal from 'src/components/Modal/Modal'
import AddBoardForm from 'src/components/Forms/AddBoardForm'

const Organization: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [selectedBoard, setSelectedBoard] = useState<string>('')
  const { data: session, status } = useSession()

  const {
    data: organization,
    isLoading,
    refetch,
  } = api.organization.getById.useQuery({
    id: router.query.organizationId as string,
  })

  const handleOnClose = () => setIsOpen(false)
  const onBoardSelect = (id: string) => setSelectedBoard(id)

  useEffect(() => {
    if (status !== 'loading' && !session) router.push('/auth/signin')
  }, [session, status, router])

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-violet-200 to-pink-200">
        <LoadingSpinner />
      </div>
    )

  if (organization)
    return (
      <>
        {isOpen && (
          <Modal onClose={handleOnClose}>
            <div className="h-full w-full rounded-lg bg-gray-50 shadow-md lg:h-auto lg:w-2/5 xl:w-1/4">
              <AddBoardForm onClose={handleOnClose} refetch={refetch} />
            </div>
          </Modal>
        )}
        <div className="flex">
          <SideBar
            onBoardSelect={onBoardSelect}
            selectedBoard={selectedBoard}
            boards={organization.boards}
            openModal={() => setIsOpen(true)}
          />
          <div className="flex-1 flex-col">
            <TopBar organizationName={organization.name} />
            {selectedBoard ? (
              <Board selectedBoard={selectedBoard} />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-r from-violet-200 to-pink-200">
                <WelcomeLayout organizationName={organization.name} />
              </div>
            )}
          </div>
        </div>
      </>
    )

  return null
}

export default Organization
