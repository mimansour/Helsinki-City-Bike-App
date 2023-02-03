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

  return journeys.map(({ departureDate, returnDate, ...rest }) => ({
    departureDate: departureDate.toISOString(),
    returnDate: returnDate.toISOString(),
    ...rest,
  }))
}

export const getJourneyStatsByStation = async (stationId: string) => {
  const departureStationsStatsPromise = getStatsByStationType(
    stationId,
    'returnStationId'
  )
  const returnStationsStatsPromise = getStatsByStationType(
    stationId,
    'departureStationId'
  )

  const [departureStationsStats, returnStationsStats] = await Promise.all([
    departureStationsStatsPromise,
    returnStationsStatsPromise,
  ])

  return { departureStationsStats, returnStationsStats }
}

export const getStatsByStationType = async (
  stationId: string,
  type: keyof Pick<BikeJourney, 'departureStationId' | 'returnStationId'>
) => {
  const aggregatePromise = prisma.journey.aggregate({
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
  const topPopularStationsPromise = prisma.journey.groupBy({
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

  const [aggregate, topPopularStations] = await Promise.all([
    aggregatePromise,
    topPopularStationsPromise,
  ])

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
