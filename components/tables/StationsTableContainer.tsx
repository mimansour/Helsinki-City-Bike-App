import { Station } from '@prisma/client'
import ChevronRightIcon from 'components/general/ChevronRightIcon'
import Link from 'next/link'
import StationsTable, { createColumnHelper } from './StationsTable'

const StationsTableContainer = (props: { data: Station[] }) => {
  const columnHelper = createColumnHelper<Station>()

  const columns = [
    columnHelper.accessor('nameFi', {
      cell: (info) => (
        <Link
          className="hover:text-amber-500 text-gray-600 flex flex-row gap-x-2 items-center"
          href={`/stations/${info.row.original.stationId}`}
        >
          {info.getValue()}
          <span className="w-3 h-3 flex justify-center">
            <ChevronRightIcon />
          </span>
        </Link>
      ),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('addressFi', {
      cell: (info) => info.getValue(),
      header: () => <span>Address</span>,
    }),
  ]

  return <StationsTable data={props.data} columns={columns} />
}

export default StationsTableContainer
