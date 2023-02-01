import { PrismaClient } from '@prisma/client'
import { BikeJourney } from '../types/journey'
import { parseJournies, parseStations } from '../utils/csv'
import { insertManyJournies } from './journey'

const prisma = new PrismaClient()

const addBikeJourneyDataToDb = async () => {
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
    try {
      await insertManyJournies(chunk)
      console.log(`Chunk ${index + 1} / ${journiesChunks.length} is added`)
    } catch (error) {
      console.log(
        `Saving chunk ${index + 1} / ${journiesChunks.length} failed!`
      )
      console.error(error)
    }
  }

  console.log('Journies saved to DB successfully!')
}

const addBikeStationDataToDb = async () => {
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

const seed = async () => {
  const stationCount = await prisma.station.count()
  const journeyCount = await prisma.journey.count()

  if (stationCount < 1) {
    await addBikeStationDataToDb()
  }

  if (journeyCount < 1) {
    await addBikeJourneyDataToDb()
  }

  console.log('Database has been seeded successfully.')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
