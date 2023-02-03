import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllStations } from 'lib/db/station'
import { Station } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Station[]>
) {
  if (req.method === 'GET') {
    const stations = await getAllStations()

    return res.status(200).json(stations)
  }
}
