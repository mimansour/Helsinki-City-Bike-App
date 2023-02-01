import { getAllStations } from 'lib/db/station'
import { Station } from '@prisma/client'
import StationsTableContainer from 'components/tables/StationsTableContainer'

export async function getServerSideProps() {
  const stations = await getAllStations()

  return { props: { stations } }
}

function Stations({ stations }: { stations: Station[] }) {
  return (
    <div className="gap-y-6 mx-10 flex flex-col items-center">
      <h1 className="font-bold text-3xl uppercase">Stations</h1>
      <p>
        Click the station name to get more information about the given station.
      </p>
      <StationsTableContainer data={stations} />
    </div>
  )
}

export default Stations
