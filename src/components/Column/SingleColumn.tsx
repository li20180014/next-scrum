import type { FC } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import EditableText from '../Input/EditableText'
import type { Issue } from '../Issues/IssueItem'
import IssueItem from '../Issues/IssueItem'
import { useState } from 'react'
import { api } from 'src/utils/api'

type SingleColumnProps = {
  cIndex: number
  column: Column
  refetch: () => void
}

const SingleColumn: FC<SingleColumnProps> = ({ cIndex, column, refetch }) => {
  const [columnName, setColumnName] = useState('')

  const updateColumnName = api.column.updateColumnName.useMutation()

  const onInputChange = (columnName: string | undefined) => {
    if (columnName) {
      setColumnName(columnName)

      updateColumnName.mutate(
        { id: column.id, name: columnName },
        {
          onSuccess() {
            refetch()
          },
        }
      )
    }
  }

  return (
    <Droppable droppableId={cIndex.toString()}>
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div
            className={`relative flex w-64 flex-col overflow-hidden rounded-lg bg-white shadow-md 
      ${snapshot.isDraggingOver && 'bg-gray-100'}`}
          >
            <span className="absolute inset-x-0 top-0 h-1 w-full bg-primary-100"></span>

            <EditableText
              className="group/item mb-2 flex items-center justify-between p-3 text-xl !outline-none"
              variant="input"
              tag="div"
              onChangeHandler={onInputChange}
            >
              {columnName || column.name}
            </EditableText>

            {column.issues.map((item: Issue, iIndex: number) => {
              return <IssueItem key={item.id} issue={item} index={iIndex} />
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export type Column = {
  boardId: string
  id: string
  issues: Issue[]
  name: string
}

export default SingleColumn
