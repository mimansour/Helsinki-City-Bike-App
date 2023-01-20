import { Prisma } from '@prisma/client'
import { BikeJourney, BikeJourneyParams } from '../types/journey'
import { parseJournies } from '../utils/csv'
import prisma from './prisma'

export const getAllJournies = async (
  params: BikeJourneyParams
): Promise<BikeJourney[]> => {
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

  return journies.map(({ departureDate, returnDate, ...rest }) => ({
    departureDate: departureDate.toISOString(),
    returnDate: returnDate.toISOString(),
    ...rest,
  }))
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

export const addBikeJourneyDataToDb = async () => {
  const journies = parseJournies()
  console.log('Journies parsed successfully!')

  const CHUNK_SIZE = 20000
  const journiesChunks = journies.reduce((chunks, journey, index) => {
    const chunkIndex = Math.floor(index / CHUNK_SIZE)

    const isNewChunk = !chunks[chunkIndex]

    if (isNewChunk) {
      chunks[chunkIndex] = []
    }

    chunks[chunkIndex].push(journey)

    return chunks
  }, [] as BikeJourney[][])

  console.log(
    `Adding ${journies.length} journies in ${journiesChunks.length} chunks.`
  )

  for await (const [index, chunk] of journiesChunks.entries()) {
    await insertManyJournies(chunk)
    console.log(`Chunk ${index + 1} / ${journiesChunks.length} is added`)
  }

  console.log('Journies saved to DB successfully!')
}

const insertManyJournies = (journies: BikeJourney[]) => {
  return prisma.$executeRaw`
  INSERT INTO "Journey" ("departureDate", "returnDate", "departureStationId", "departureStationName", "returnStationId", "returnStationName" , "duration", "distance")
  VALUES
  ${Prisma.join(
    journies.map(
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
