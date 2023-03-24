import type { FC, HTMLInputTypeAttribute, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

type EditableTextProps = {
  tag: 'div'
  variant: 'input'
  children: string
  className?: string
  type?: HTMLInputTypeAttribute
  onChangeHandler: (value: string | undefined) => void
}

const EditableText: FC<EditableTextProps> = ({
  className,
  tag,
  variant,
  type = 'text',
  children,
  onChangeHandler,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditting, setIsEditting] = useState(false)

  const props = {
    className,
    onDoubleClick: () => {
      setIsEditting((isEdditing) => !isEdditing)
    },
  }

  const inputProps = {
    type,
    onKeyDown: (e: KeyboardEvent) => {
      if (!e.shiftKey && (e.key === 'Enter' || e.key === 'Space')) {
        e.preventDefault()
        setIsEditting(false)
        onChangeHandler(inputRef.current?.value)
      }

      if (e.key === 'Escape') {
        setIsEditting(false)
      }
    },
  }

  useEffect(() => {
    if (isEditting) {
      inputRef.current?.focus()
    }
  }, [isEditting])

  if (isEditting) {
    if (variant === 'input') {
      return <input ref={inputRef} {...props} {...inputProps} />
    }
  }

  if (tag === 'div') {
    return (
      <div {...props}>
        <h4>{children}</h4>
        <span className="invisible text-gray-400 group-hover/item:visible">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </span>
      </div>
    )
  }

  return null
}

export default EditableText
