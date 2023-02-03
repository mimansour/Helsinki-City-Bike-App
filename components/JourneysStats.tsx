import { fromMetersToKm } from 'lib/utils/journey'

const JourneysStats = ({
  stats,
  stationName,
  isDeparture,
}: {
  stats: {
    averageDistance: number
    totalJourneys: number
    topStationsNames: string[]
  }
  stationName: string
  isDeparture: boolean
}) => {
  const averageDistanceInKm = fromMetersToKm(stats.averageDistance)

  return (
    <div className="py-2 flex flex-col items-center">
      <h2 className="uppercase text-lg">
        {isDeparture
          ? `Journeys starting from ${stationName}`
          : `Journeys ending at ${stationName}`}
      </h2>
      <div className="grid grid-cols-3 py-6 text-start items-center w-80 gap-y-1">
        <div className="col-span-2 font-light">Journeys count:</div>
        <span className="font-semibold text-xl">{stats.totalJourneys}</span>
        <div className="col-span-2 font-light">Average distance:</div>
        <span className="font-semibold text-xl">{` ${averageDistanceInKm} km`}</span>
      </div>
      <div>
        <h3 className="uppercase pt-4 pb-2 text-gray-800">
          Top {isDeparture ? 'arrival' : 'departure'} stations
        </h3>
        <div className="flex justify-center ">
          <ol className="list-decimal list-inside gap-y-1 flex flex-col items-start">
            {stats.topStationsNames.map((station) => (
              <li key={station} className="font-light">
                {station}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default JourneysStats
