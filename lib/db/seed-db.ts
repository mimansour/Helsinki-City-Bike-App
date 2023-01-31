import { PrismaClient } from '@prisma/client'
import { addBikeStationDataToDb } from './station'
import { addBikeJourneyDataToDb } from './journey'

const prisma = new PrismaClient()

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
