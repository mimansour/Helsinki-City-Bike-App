import type { NextApiRequest, NextApiResponse } from 'next'
import { addBikeStationDataToDb } from 'lib/db/station'
import { addBikeJourneyDataToDb } from 'lib/db/journey'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    await addBikeStationDataToDb()
    await addBikeJourneyDataToDb()

    return res.status(201).json({ message: 'Data inserted successfully.' })
  }
}
