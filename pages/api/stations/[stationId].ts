import type { NextApiRequest, NextApiResponse } from 'next'
import { getStationById } from 'lib/db/station'
import { getJourneyStatsByStation } from 'lib/db/journey'
import { BikeStationStats } from 'lib/types/station'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | BikeStationStats>
) {
  if (req.method === 'GET') {
    const stationId = req.query.stationId

    if (!stationId || Array.isArray(stationId)) {
      return res.status(400).json({ message: 'Bad request.' })
    }

    const station = await getStationById(stationId)

    if (station) {
      const { returnStationsStats, departureStationsStats } =
        await getJourneyStatsByStation(stationId)

      return res.status(200).json({
        station,
        departureStationsStats,
        returnStationsStats,
      })
    } else {
      return res
        .status(404)
        .json({ message: 'Could not find station with id.' })
    }
  }
}
