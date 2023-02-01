import ChevronRightIcon from 'components/general/ChevronRightIcon'
import { PropsWithChildren } from 'react'

const Pagination = (
  props: PropsWithChildren<{
    onPreviousPageClick: () => void
    canPreviousPage: boolean
    onNextPageClick: () => void
    canNextPage: boolean
  }>
) => (
  <div className="flex flex-row justify-center gap-2">
    <button
      className="w-6 h-6 text-gray-900 hover:-translate-x-1 transition m-2 rotate-180"
      onClick={props.onPreviousPageClick}
      disabled={props.canPreviousPage}
      aria-label="previous page"
    >
      <ChevronRightIcon />
    </button>
    {props.children}
    <button
      className="w-6 h-6 text-gray-900 hover:translate-x-1 transition m-2"
      onClick={props.onNextPageClick}
      disabled={props.canNextPage}
      aria-label="next page"
    >
      <ChevronRightIcon />
    </button>
  </div>
)

export default Pagination
