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
