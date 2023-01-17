import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllStations } from 'lib/db/station'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const stations = await getAllStations()

    if (!stations) {
      return res.status(400).json({ message: 'Bad request.' })
    }

    return res.status(200).json(stations)
  }
}
