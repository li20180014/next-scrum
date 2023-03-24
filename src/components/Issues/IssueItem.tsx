import type { FC } from 'react'
import { Draggable } from 'react-beautiful-dnd'

type IssueItemProps = {
  index: number
  issue: Issue
}
// TODO: Add tags and asignees
const IssueItem: FC<IssueItemProps> = ({ issue, index }) => {
  return (
    <Draggable index={index} draggableId={issue.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="m-3 mt-0 rounded-md bg-primary-50 p-3 last:mb-2"
        >
          <label
            className={`rounded
            bg-gradient-to-r from-violet-200 to-pink-200 px-2 py-1 text-xs text-primary-600
                  `}
          >
            {`${issue.priority} priority`}
          </label>

          <h5 className="my-3 text-base font-semibold leading-6 text-primary-700">
            {issue.name}
          </h5>

          <div className="text-xxs text-gray-400">{issue.description}</div>
        </div>
      )}
    </Draggable>
  )
}

export type Issue = {
  id: string
  priority: string
  name: string
  description: string
  userId: string
  columnId?: string
}

export default IssueItem
