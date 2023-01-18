import { BikeJourneyParams } from '@/lib/types/journey'
import { Journey } from '@prisma/client'
import JourniesTable from 'components/JourniesTable'
import { createColumnHelper } from 'components/StationsTable'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import searchIcon from '../public/search.svg'
import { fromMetersToKm, fromSecToMin } from 'lib/utils/journey'

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

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/journies')

  const journies: Journey[] = await res.json()

  return { props: { journies } }
}

export default function Journies({ journies }: { journies: Journey[] }) {
  const [journeyData, setJourneyData] = useState(journies)
  const [params, setParams] = useState<BikeJourneyParams>({
    skip: 0,
    filterBy: '',
    sortByHeader: undefined,
  })

  const getJournies = useCallback(
    async (newParams: BikeJourneyParams) => {
      const url = `http://localhost:3000/api/journies?skip=${newParams.skip}${
        newParams.sortByHeader ? `&sortByHeader=` + newParams.sortByHeader : ''
      }${newParams.filterBy!.length ? `&filterBy=` + newParams.filterBy : ''}`

      setParams(newParams)
      const res = await fetch(url)

      return await res.json()
    },
    [setParams]
  )

  const onLoadMoreClick = async () => {
    const newSkip = params.skip + 1
    const newParams = { ...params, skip: newSkip }

    const newJourneyData = await getJournies(newParams)
    setJourneyData(journeyData.concat(newJourneyData))
  }

  const onSorting = async (headerId?: any) => {
    const currentHeader = params.sortByHeader
    const newSortBy = headerId !== currentHeader ? headerId : undefined
    const newParams = { ...params, sortByHeader: newSortBy, skip: 0 }

    const newJournies = await getJournies(newParams)
    setJourneyData(newJournies)
  }

  const handleFilterChange = async (value: string) => {
    const newParams = { ...params, filterBy: value, skip: 0 }

    const newJournies = await getJournies(newParams)
    setJourneyData(newJournies)
  }

  return (
    <div className="pt-10 pb-72 gap-y-6 mx-10 flex flex-col items-center">
      <h2 className="font-bold text-2xl text-center">Journies</h2>
      <div>
        <label htmlFor="table-search" className="">
          Search station:
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image src={searchIcon} alt="" />
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-amber-500 focus:border-amber-500 "
            placeholder="Search station"
            value={params.filterBy}
            onChange={({ target }) => handleFilterChange(target.value)}
          />
        </div>
      </div>
      <JourniesTable<Journey>
        data={journeyData}
        columns={columns}
        onSorting={onSorting}
      />
      <div className="flex items-center gap-2">
        <button
          className="border rounded-lg bg-amber-600 text-slate-100 py-2 px-3 hover:bg-amber-500"
          onClick={() => onLoadMoreClick()}
        >
          {'Load more results'}
        </button>
      </div>
    </div>
  )
}
