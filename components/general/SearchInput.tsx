import Image from 'next/image'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import searchIcon from '../../public/search.svg'

const SearchInput = (props: {
  value?: string
  onFilterChange: (value: string) => Promise<void>
}) => {
  const [internalValue, setInternalValue] = useState(props.value)

  const debouncedOnChange = useDebouncedCallback((value: string) => {
    props.onFilterChange(value)
  }, 500)

  return (
    <div className="relative mt-1 py-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image src={searchIcon} alt="" />
      </div>
      <input
        type="text"
        aria-label="search station"
        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-amber-700 focus:border-amber-700 focus:outline-none"
        placeholder="Search station"
        value={internalValue}
        onChange={({ target }) => {
          setInternalValue(target.value)
          debouncedOnChange(target.value)
        }}
      />
    </div>
  )
}

export default SearchInput
