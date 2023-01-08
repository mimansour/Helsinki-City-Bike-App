import { parseStations } from '../utils/csv'
import prisma from './prisma'

export const addBikeStationDataToDb = async () => {
  const stations = parseStations()
  return await prisma.station.createMany({
    data: stations,
  })
}
