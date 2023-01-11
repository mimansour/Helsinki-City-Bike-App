import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllJournies } from 'lib/db/journey'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const journies = await getAllJournies()

    return res.status(200).json(journies)
  }
}
