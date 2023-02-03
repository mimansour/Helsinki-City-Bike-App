import { Prisma } from '@prisma/client'
import { BikeJourney, BikeJourneyParams } from '../types/journey'
import prisma from './prisma'

export const getAllJourneys = async (
  params: BikeJourneyParams
): Promise<BikeJourney[]> => {
  const { skip, sortByHeader, filterBy } = params
  const PAGE_SIZE = 10
  const DEFAULT_SORT_DIRECTION = 'asc'

  const journeys = await prisma.journey.findMany({
    ...(skip && { skip: skip * PAGE_SIZE }),
    take: PAGE_SIZE,
    ...(sortByHeader && {
      orderBy: {
        [sortByHeader]: DEFAULT_SORT_DIRECTION,
      },
    }),
    ...(filterBy && {
      where: {
        OR: [
          {
            departureStationName: {
              contains: filterBy,
            },
          },
          {
            returnStationName: {
              contains: filterBy,
            },
          },
        ],
      },
    }),
  })

  return journeys.map(({ departureDate, returnDate, ...rest }) => ({
    departureDate: departureDate.toISOString(),
    returnDate: returnDate.toISOString(),
    ...rest,
  }))
}

export const getJourneyStatsByStation = async (stationId: string) => {
  const departureStationsStats = await getStatsByStationType(
    stationId,
    'returnStationId'
  )
  const returnStationsStats = await getStatsByStationType(
    stationId,
    'departureStationId'
  )

  return { departureStationsStats, returnStationsStats }
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

  const isDeparatureStation = type === 'departureStationId'
  const groupByCol = isDeparatureStation
    ? 'returnStationName'
    : 'departureStationName'

  const TOP_STATIONS_AMOUNT = 5
  const topPopularStations = await prisma.journey.groupBy({
    by: [groupByCol],
    where: {
      [type]: stationId,
    },
    orderBy: [
      {
        _count: {
          [groupByCol]: 'desc',
        },
      },
      {
        ...(isDeparatureStation
          ? {
              returnStationName: 'desc',
            }
          : {
              departureStationName: 'desc',
            }),
      },
    ],
    _count: {
      [groupByCol]: true,
    },

    take: TOP_STATIONS_AMOUNT,
  })

  const { _avg, _count } = aggregate

  const topStations = topPopularStations.map((station) =>
    isDeparatureStation
      ? station.returnStationName
      : station.departureStationName
  )

  return {
    averageDistance: _avg.distance as number,
    totalJourneys: _count[type] as number,
    topStationsNames: topStations,
  }
}

export const insertManyJourneys = (journeys: BikeJourney[]) => {
  return prisma.$executeRaw`
  INSERT INTO "Journey" ("departureDate", "returnDate", "departureStationId", "departureStationName", "returnStationId", "returnStationName" , "duration", "distance")
  VALUES
  ${Prisma.join(
    journeys.map(
      ({
        departureDate,
        returnDate,
        departureStationId,
        departureStationName,
        returnStationId,
        returnStationName,
        distance,
        duration,
      }) =>
        Prisma.sql`(${Prisma.join([
          departureDate,
          returnDate,
          departureStationId,
          departureStationName,
          returnStationId,
          returnStationName,
          duration,
          distance,
        ])})`
    )
  )};`
}
