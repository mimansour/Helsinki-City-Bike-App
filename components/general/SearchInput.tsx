import Image from 'next/image'
import searchIcon from '../../public/search.svg'

const SearchInput = (props: {
  value?: string
  onFilterChange: (value: string) => Promise<void>
}) => (
  <div className="relative mt-1 py-4">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Image src={searchIcon} alt="" />
    </div>
    <input
      type="text"
      aria-label="search station"
      className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-white focus:ring-amber-700 focus:border-amber-700 focus:outline-none"
      placeholder="Search station"
      value={props.value}
      onChange={({ target }) => props.onFilterChange(target.value)}
    />
  </div>
)

export default SearchInput
