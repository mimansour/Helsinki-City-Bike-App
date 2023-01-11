import type { NextApiRequest, NextApiResponse } from 'next'
import { getStationById } from 'lib/db/station'
import { getJourneyStatsByStation } from 'lib/db/journey'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const stationId = req.query.stationId

    if (!stationId || Array.isArray(stationId)) {
      return res.status(400).json({ message: 'Bad request.' })
    }

    const station = await getStationById(stationId)

    if (station) {
      const stats = await getJourneyStatsByStation(stationId)

      return res.status(200).json({
        station,
        stats,
      })
    } else {
      return res
        .status(404)
        .json({ message: 'Could not find station with id.' })
    }
  }
}
