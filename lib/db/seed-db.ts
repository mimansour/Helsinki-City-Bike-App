import { PrismaClient } from '@prisma/client'
import { BikeJourney } from '../types/journey'
import { parseJourneys, parseStations } from '../utils/csv'

const prisma = new PrismaClient()

const addBikeJourneyDataToDb = async () => {
  const journeys = parseJourneys()
  console.log('Journeys parsed successfully!')

  const CHUNK_SIZE = 20000
  const journeysChunks = journeys.reduce((chunks, journey, index) => {
    const chunkIndex = Math.floor(index / CHUNK_SIZE)

    const isNewChunk = !chunks[chunkIndex]

    if (isNewChunk) {
      chunks[chunkIndex] = []
    }

    chunks[chunkIndex].push(journey)

    return chunks
  }, [] as BikeJourney[][])

  console.log(
    `Adding ${journeys.length} journeys in ${journeysChunks.length} chunks.`
  )

  for await (const [index, chunk] of journeysChunks.entries()) {
    try {
      await prisma.journey.createMany({ data: chunk })
      console.log(`Chunk ${index + 1} / ${journeysChunks.length} is added`)
    } catch (error) {
      console.log(
        `Saving chunk ${index + 1} / ${journeysChunks.length} failed!`
      )
      console.error(error)
    }
  }

  console.log('Journeys saved to DB successfully!')
}

const addBikeStationDataToDb = async () => {
  const stations = parseStations()
  console.log('Stations parsed successfully!')

  console.log(`Adding ${stations.length} stations.`)

  try {
    const createdStations = await prisma.station.createMany({ data: stations })

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
