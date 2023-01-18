import { parseStations } from '../utils/csv'
import prisma from './prisma'

export const addBikeStationDataToDb = async () => {
  const stations = parseStations()
  return await prisma.station.createMany({
    data: stations,
  })
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
