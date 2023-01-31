import { getAllStations } from 'lib/db/station'
import { BikeStation } from '@/lib/types/station'
import StationsTable, { createColumnHelper } from 'components/StationsTable'
import Link from 'next/link'
import ChevronRightIcon from 'components/ChevronRightIcon'

const columnHelper = createColumnHelper<BikeStation>()

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

export async function getServerSideProps() {
  const stations = await getAllStations()

  return { props: { stations } }
}

function Stations({ stations }: { stations: BikeStation[] }) {
  return (
    <div className="gap-y-6 mx-10 flex flex-col items-center">
      <h2 className="font-bold text-3xl uppercase">Stations</h2>
      <p>
        Click the station name to get more information about the given station.
      </p>
      <StationsTable<BikeStation> data={stations} columns={columns} />
    </div>
  )
}

export default Stations
