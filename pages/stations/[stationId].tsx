import { getJourneyStatsByStation } from 'lib/db/journey'
import { getStationById } from 'lib/db/station'
import { BikeStationStats } from 'lib/types/station'
import { fromMetersToKm } from 'lib/utils/journey'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stationId = context.query['stationId']

  if (typeof stationId === 'string') {
    const station = await getStationById(stationId)

    if (station) {
      const stats = await getJourneyStatsByStation(stationId)

      return {
        props: {
          stationWithStats: {
            station,
            stats,
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

  const departureAvgDistance = fromMetersToKm(
    stationWithStats.stats.departureStations.averageDistance
  )
  const returnAvgDistance = fromMetersToKm(
    stationWithStats.stats.returnStations.averageDistance
  )

  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="font-bold text-xl py-2">
        {stationWithStats.station.nameFi}
      </h2>
      <div className="py-2">
        Station address: {stationWithStats.station.addressFi}
      </div>
      <div className="py-4">
        <strong className="uppercase text-sm">
          Journies starting from the station
        </strong>
        <div className="pt-2">
          Total journies:{' '}
          {stationWithStats.stats.departureStations.totalJournies}
        </div>
        <div className="pb-4">
          {`The average distance:
        ${departureAvgDistance} km`}
        </div>
        <u>Five most popular stations where journey ended:</u>
        <ul>
          {stationWithStats.stats.departureStations.topPopularStations.map(
            (station: { returnStationName: string }) => (
              <li key={station.returnStationName}>
                {station.returnStationName}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="py-4">
        <strong className="uppercase text-sm">
          Journies ending at the station
        </strong>
        <div className="pt-2">
          Total journies: {stationWithStats.stats.returnStations.totalJournies}
        </div>
        <div className="pb-4">
          {`The average distance:
        ${returnAvgDistance} km`}
        </div>
        <u>Five most popular stations where journey started:</u>
        <ul>
          {stationWithStats.stats.returnStations.topPopularStations.map(
            (station: { departureStationName: string }) => (
              <li key={station.departureStationName}>
                {station.departureStationName}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default StationView
