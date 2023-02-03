import JourneysStats from 'components/JourneysStats'
import { getJourneyStatsByStation } from 'lib/db/journey'
import { getStationById } from 'lib/db/station'
import { BikeStationStats } from 'lib/types/station'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stationId = context.query['stationId']

  if (typeof stationId === 'string') {
    const station = await getStationById(stationId)

    if (station) {
      const { departureStationsStats, returnStationsStats } =
        await getJourneyStatsByStation(stationId)

      return {
        props: {
          stationWithStats: {
            station,
            departureStationsStats,
            returnStationsStats,
          },
        },
      }
    }
  }

  return {
    props: {},
  }
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

function StationView({
  stationWithStats,
}: {
  stationWithStats?: BikeStationStats
}) {
  const router = useRouter()
  const { stationId } = router.query

  if (!stationId || !stationWithStats) {
    return null
  }

  const stationName = stationWithStats.station.nameFi

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 text-center bg-white shadow-lg p-8 rounded md:w-2/5 md:min-w-[75vh] max-w-6xl">
        <h1 className="font-extrabold text-3xl uppercase py-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-400">
          {stationName}
        </h1>
        <div className="py-2 font-light">
          Station address:
          <span className="font-semibold pl-1">
            {stationWithStats.station.addressFi}
          </span>
        </div>
        <hr className="w-48 h-1 mx-auto my-4 bg-amber-500 border-0 rounded md:my-10"></hr>
        <JourneysStats
          stats={stationWithStats.departureStationsStats}
          isDeparture={true}
          stationName={stationName}
        />
        <hr className="w-48 h-1 mx-auto my-4 bg-amber-500 border-0 rounded md:my-10"></hr>
        <JourneysStats
          stats={stationWithStats.returnStationsStats}
          isDeparture={false}
          stationName={stationName}
        />
      </div>
    </div>
  )
}

export default StationView
