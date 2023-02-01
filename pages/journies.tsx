import { BikeJourneyParams } from '@/lib/types/journey'
import { Journey } from '@prisma/client'
import { useCallback, useState } from 'react'
import { getAllJournies } from 'lib/db/journey'
import PrimaryButton from 'components/general/PrimaryButton'
import SearchInput from 'components/general/SearchInput'
import JourniesTableContainer from 'components/tables/JourniesTableContainer'

export async function getServerSideProps() {
  const journies = await getAllJournies({ skip: 0, filterBy: '' })

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
      const url = `/api/journies?skip=${newParams.skip}${
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

  const onFilterChange = async (value: string) => {
    const newParams = { ...params, filterBy: value, skip: 0 }

    const newJournies = await getJournies(newParams)
    setJourneyData(newJournies)
  }

  return (
    <div className="gap-y-6 mx-10 flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center uppercase">Journies</h1>
      <div>
        <SearchInput value={params.filterBy} onFilterChange={onFilterChange} />
        <JourniesTableContainer data={journeyData} onSorting={onSorting} />
        <div className="w-full flex justify-center py-10">
          <PrimaryButton title="Load more results" onClick={onLoadMoreClick} />
        </div>
      </div>
    </div>
  )
}
