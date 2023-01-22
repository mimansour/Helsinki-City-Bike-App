import { parseStations } from '../utils/csv'
import prisma from './prisma'

export const addBikeStationDataToDb = async () => {
  const stations = parseStations()
  console.log('Stations parsed successfully!')

  const stationsCreateQueries = stations.map((data) =>
    prisma.station.create({ data })
  )

  console.log(`Adding ${stations.length} stations.`)

  try {
    const createdStations = await prisma.$transaction(stationsCreateQueries)

    console.log('Stations saved to DB successfully!')

    return createdStations
  } catch (error) {
    console.log('Saving stations to DB failed.')
    console.error(error)
  }
}

export const getStationById = async (id: string) => {
  return await prisma.station.findUnique({
    where: {
      stationId: id,
    },
  })
}

export const getAllStations = async () => {
  return await prisma.station.findMany({})
}
