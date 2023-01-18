import { Journey } from '@prisma/client'
import { BikeJourney, BikeJourneyPage } from '../types/journey'
import { parseJournies } from '../utils/csv'
import prisma from './prisma'

export const addBikeJourneyDataToDb = async () => {
  const journies = parseJournies()
  // Get only first 100000 due to limited free cloud database storage.
  const sampleJournies = journies.slice(0, 100000)
  return await prisma.journey.createMany({
    data: sampleJournies,
  })
}

export const getAllJournies = async (
  params: BikeJourneyPage['params']
): Promise<Journey[]> => {
  const { skip, sortByHeader, filterBy } = params
  const PAGE_SIZE = 10

  const journies = await prisma.journey.findMany({
    ...(skip && { skip: skip * PAGE_SIZE }),
    take: PAGE_SIZE,
    ...(sortByHeader && {
      orderBy: {
        [sortByHeader]: 'asc',
      },
    }),
    ...(filterBy && {
      where: {
        OR: [
          {
            departureStationName: {
              contains: filterBy,
              mode: 'insensitive',
            },
          },
          {
            returnStationName: {
              contains: filterBy,
              mode: 'insensitive',
            },
          },
        ],
      },
    }),
  })

  return journies
}

export const getJourneyStatsByStation = async (stationId: string) => {
  const returnStations = await getStatsByStationType(
    stationId,
    'returnStationId'
  )
  const departureStations = await getStatsByStationType(
    stationId,
    'departureStationId'
  )

  return { returnStations, departureStations }
}

export const getStatsByStationType = async (
  stationId: string,
  type: keyof Pick<BikeJourney, 'departureStationId' | 'returnStationId'>
) => {
  const aggregate = await prisma.journey.aggregate({
    where: {
      [type]: stationId,
    },
    _avg: {
      distance: true,
    },
    _count: {
      [type]: true,
    },
  })

  const topPopularStations = await prisma.journey.groupBy({
    by: [
      type === 'departureStationId'
        ? 'returnStationName'
        : 'departureStationName',
    ],
    where: {
      [type]: stationId,
    },
    orderBy: [
      {
        _count: {
          [type === 'departureStationId'
            ? 'returnStationName'
            : 'departureStationName']: 'desc',
        },
      },
      {
        ...(type === 'departureStationId'
          ? {
              returnStationName: 'desc',
            }
          : {
              departureStationName: 'desc',
            }),
      },
    ],
    _count: {
      [type === 'departureStationId'
        ? 'returnStationName'
        : 'departureStationName']: true,
    },

    take: 5,
  })

  const { _avg, _count } = aggregate

  return {
    averageDistance: _avg.distance,
    totalJournies: _count[type] as number,
    topPopularStations: topPopularStations as
      | { departureStationName: string }[]
      | { returnStationName: string }[],
  }
}
