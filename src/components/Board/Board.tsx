import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { DropResult } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'
import { api } from 'src/utils/api'
import type { Column } from '../Column/SingleColumn'
import SingleColumn from '../Column/SingleColumn'
import type { Issue } from '../Issues/IssueItem'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import BoardBar from './BoardBar'

type BoardProps = {
  selectedBoard: string
}

const Board: FC<BoardProps> = ({ selectedBoard }) => {
  const boardRef = useRef<HTMLDivElement>(null)
  const [isWindowReady, setIsWindowReady] = useState(false)
  const [boardColumns, setBoardColumns] = useState<Column[]>([
    {
      boardId: '',
      id: '',
      issues: [],
      name: '',
    },
  ])

  const updateById = api.column.updateById.useMutation()
  const createColumn = api.column.createColumn.useMutation()

  const {
    data: boardData,
    isLoading,
    refetch,
  } = api.board.getById.useQuery({
    id: selectedBoard,
  })

  useEffect(() => {
    if (boardData) setBoardColumns(boardData.columns as Column[])

    setIsWindowReady(true)
  }, [boardData])

  useEffect(() => {
    // TODO: Fix scroll on initial page load
    boardRef.current?.scrollBy({
      left: boardRef.current.offsetWidth,
      behavior: 'smooth',
    })
  }, [boardColumns])

  const handleOnColumnAdd = () => {
    createColumn.mutate(
      { boardId: selectedBoard, name: 'New Column' },
      {
        onSuccess() {
          refetch()
        },
      }
    )
  }

  const onDragEnd = (res: DropResult) => {
    const { source, destination } = res
    if (!destination) return

    const parsedId = parseInt(source.droppableId)
    const dragItem = boardColumns[parsedId]?.issues[source.index]

    boardColumns[parsedId]?.issues.splice(source.index, 1)
    boardColumns[parseInt(destination.droppableId)]?.issues.splice(
      destination.index,
      0,
      dragItem as Issue
    )

    setBoardColumns(boardColumns)

    updateById.mutate({
      id: boardColumns[parsedId]!.id,
      issues: boardColumns[parseInt(source.droppableId)]!.issues,
    })
    updateById.mutate({
      id: boardColumns[parseInt(destination.droppableId)]!.id,
      issues: boardColumns[parseInt(destination.droppableId)]!.issues,
    })
  }

  return !isLoading && boardColumns ? (
    <div
      className="flex h-full flex-col bg-gradient-to-r from-violet-200 to-pink-200 px-3 py-2"
      style={{ maxWidth: 'calc(100vw - 256px)' }}
    >
      <BoardBar
        onColumnAdd={handleOnColumnAdd}
        selectedBoard={selectedBoard}
        refetch={refetch}
      />
      {isWindowReady && boardColumns.length ? (
        <div
          className="my-2 flex flex-1 gap-2 overflow-hidden overflow-x-auto "
          ref={boardRef}
        >
          <DragDropContext key={selectedBoard} onDragEnd={onDragEnd}>
            {boardColumns.map((columnData: Column, cIndex: number) => {
              return (
                <SingleColumn
                  key={columnData.name}
                  column={columnData}
                  cIndex={cIndex}
                  refetch={refetch}
                />
              )
            })}
          </DragDropContext>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="flex h-full items-center justify-center bg-gradient-to-r from-violet-200 to-pink-200">
      <LoadingSpinner />
    </div>
  )
}

export default Board
