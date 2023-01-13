import { BikeJourney } from '@/lib/types/journey'
import Table, { createColumnHelper } from 'components/Table'

const columnHelper = createColumnHelper<BikeJourney>()

const columns = [
  columnHelper.accessor('departureStationName', {
    cell: (info) => info.getValue(),
    header: () => <span>Departure station</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('returnStationName', {
    cell: (info) => info.getValue(),
    header: () => <span>Return station</span>,
  }),
  columnHelper.accessor('distance', {
    cell: (info) => info.renderValue(),
    header: () => <span>Covered distance (km)</span>,
  }),
  columnHelper.accessor('duration', {
    cell: (info) => info.renderValue(),
    header: () => <span>Duration (min)</span>,
    enableSorting: true,
  }),
]

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/journies`)
  const journies = await res.json()

  return { props: { journies } }
}

export default function Journies({ journies }: { journies: BikeJourney[] }) {
  return (
    <div className="pt-10 pb-72 gap-y-6 mx-10 flex flex-col items-center">
      <h2 className="font-bold text-2xl text-center">Journies</h2>
      <Table<BikeJourney> data={journies} columns={columns} />
    </div>
  )
}
