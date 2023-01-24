import { getAllStations } from 'lib/db/station'
import { BikeStation } from '@/lib/types/station'
import StationsTable, { createColumnHelper } from 'components/StationsTable'
import Link from 'next/link'

const columnHelper = createColumnHelper<BikeStation>()

const columns = [
  columnHelper.accessor('nameFi', {
    cell: (info) => (
      <Link
        className="hover:text-amber-400"
        href={`/stations/${info.row.original.stationId}`}
      >
        {info.getValue()}
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
      <h2 className="font-bold text-2xl">Stations</h2>
      <StationsTable<BikeStation> data={stations} columns={columns} />
    </div>
  )
}

export default Stations
