import prisma from './prisma'

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
