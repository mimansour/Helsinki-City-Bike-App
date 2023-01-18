import { BikeStationStats } from 'lib/types/station'
import { fromMetersToKm } from 'lib/utils/journey'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stationId = context.query['stationId']
  const url = `http://localhost:3000/api/stations/${stationId}`
  const res = await fetch(url)
  const stations: BikeStationStats = await res.json()

  return {
    props: {
      stationWithStats: stations,
    },
  }
}
export const fetcher = (url: string) => fetch(url).then((res) => res.json())

function StationView({
  stationWithStats,
}: {
  stationWithStats: BikeStationStats
}) {
  const router = useRouter()
  const { stationId } = router.query

  if (!stationId) {
    return null
  }

  const departureAvgDistance = fromMetersToKm(
    stationWithStats.stats.departureStations.averageDistance
  )
  const returnAvgDistance = fromMetersToKm(
    stationWithStats.stats.returnStations.averageDistance
  )

  return (
    <div className="flex flex-col pt-16 pb-28 gap-2 text-center">
      <h2 className="font-bold text-xl py-2">
        {stationWithStats.station.nameFi}
      </h2>
      <div className="py-2">
        Station address: {stationWithStats.station.addressFi}
      </div>
      <div className="py-4">
        <strong>Journies starting from the station:</strong>
        <div>
          Total journies:{' '}
          {stationWithStats.stats.departureStations.totalJournies}
        </div>
        <div>
          {`The average distance:
        ${departureAvgDistance} km`}
        </div>
        <h3>Five most popular stations where journey ended:</h3>
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
        <strong>Journies ending at the station:</strong>
        <div>
          Total journies: {stationWithStats.stats.returnStations.totalJournies}
        </div>
        <div>
          {`The average distance:
        ${returnAvgDistance} km`}
        </div>
        <h3>Five most popular stations where journey started:</h3>
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
