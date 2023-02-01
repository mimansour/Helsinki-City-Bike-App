import JourniesTable from './JourniesTable'
import { createColumnHelper } from 'components/tables/StationsTable'
import { Journey } from '@prisma/client'
import { fromMetersToKm, fromSecToMin } from '@/lib/utils/journey'

const JourniesTableContainer = (props: {
  data: Journey[]
  onSorting: (headerId?: any) => Promise<void>
}) => {
  const columnHelper = createColumnHelper<Journey>()

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
      cell: (info) => {
        const value = info.renderValue()

        return value ? fromMetersToKm(value) : null
      },
      header: () => <span>Covered distance (km)</span>,
    }),
    columnHelper.accessor('duration', {
      cell: (info) => {
        const value = info.renderValue()

        return value ? fromSecToMin(value) : null
      },
      header: () => <span>Duration (min)</span>,
      enableSorting: true,
    }),
  ]
  return (
    <JourniesTable
      data={props.data}
      columns={columns}
      onSorting={props.onSorting}
    />
  )
}

export default JourniesTableContainer
