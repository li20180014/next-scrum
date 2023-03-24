import type { FC } from 'react'

type RadioProps = {
  data: { [key: string]: string }
  handleSelected: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: FC<RadioProps> = ({ data, handleSelected }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center">
        {Object.values(data).map((value: string, id) => (
          <>
            <input
              key={id}
              type="radio"
              name="priority"
              onChange={handleSelected}
              value={value}
              className="h-4 w-4 border-gray-300"
            />
            <label className="ml-2 mr-2 block text-sm font-medium text-gray-900 ">
              {value}
            </label>
          </>
        ))}
      </div>
    </div>
  )
}

export default RadioButton
