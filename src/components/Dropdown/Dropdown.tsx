import { Listbox, Transition } from '@headlessui/react'
import type { FC } from 'react'
import { Fragment } from 'react'

type DropDownProps = {
  data: { id: string; name: string }[]
  selected?: { id: string; name: string }
  onChange: (selected: { id: string; name: string }) => void
  dropdownColor?: string
  width?: string
}

const Dropdown: FC<DropDownProps> = ({
  data,
  selected,
  onChange,
  dropdownColor,
  width,
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className={`relative mt-1 ${width ? width : 'w-1/2'}`}>
        <Listbox.Button
          className={`relative w-full cursor-default rounded-lg shadow-md ${
            dropdownColor ? dropdownColor : 'bg-white'
          } py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
        >
          <span className="block truncate">{selected?.name || 'Select'}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-20 w-full overflow-auto  rounded-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.map((item: { id: string; name: string }, itemIdx: number) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default Dropdown
