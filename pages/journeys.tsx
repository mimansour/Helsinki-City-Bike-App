import { BikeJourneyParams } from '@/lib/types/journey'
import { Journey } from '@prisma/client'
import { useCallback, useState } from 'react'
import { getAllJourneys } from 'lib/db/journey'
import PrimaryButton from 'components/general/PrimaryButton'
import SearchInput from 'components/general/SearchInput'
import JourneysTableContainer from 'components/tables/JourneysTableContainer'

export async function getServerSideProps() {
  const journeys = await getAllJourneys({ skip: 0, filterBy: '' })

  return { props: { journeys } }
}

export default function Journeys({ journeys }: { journeys: Journey[] }) {
  const [journeyData, setJourneyData] = useState(journeys)
  const [params, setParams] = useState<BikeJourneyParams>({
    skip: 0,
    filterBy: '',
    sortByHeader: undefined,
  })

  const getJourneys = useCallback(
    async (newParams: BikeJourneyParams) => {
      const url = `/api/journeys?skip=${newParams.skip}${
        newParams.sortByHeader ? `&sortByHeader=` + newParams.sortByHeader : ''
      }${newParams.filterBy!.length ? `&filterBy=` + newParams.filterBy : ''}`

      setParams(newParams)
      const res = await fetch(url)

      return await res.json()
    },
    [setParams]
  )

  const onLoadMoreClick = async () => {
    const newSkip = params.skip! + 1
    const newParams = { ...params, skip: newSkip }

    const newJourneyData = await getJourneys(newParams)
    setJourneyData(journeyData.concat(newJourneyData))
  }

  const onSorting = async (headerId?: string) => {
    const currentHeader = params.sortByHeader
    const newSortBy = headerId !== currentHeader ? headerId : undefined
    const newParams = { ...params, sortByHeader: newSortBy, skip: 0 }

    const newJourneys = await getJourneys(newParams)
    setJourneyData(newJourneys)
  }

  const onFilterChange = async (value: string) => {
    const newParams = { ...params, filterBy: value, skip: 0 }

    const newJourneys = await getJourneys(newParams)
    setJourneyData(newJourneys)
  }

  return (
    <div className="gap-y-6 flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center uppercase">Journeys</h1>
      <div>
        <SearchInput value={params.filterBy} onFilterChange={onFilterChange} />
        <JourneysTableContainer data={journeyData} onSorting={onSorting} />
        <div className="w-full flex justify-center py-10">
          <PrimaryButton title="Load more results" onClick={onLoadMoreClick} />
        </div>
      </div>
    </div>
  )
}
