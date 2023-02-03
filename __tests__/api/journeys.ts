import { createMocks } from 'node-mocks-http'
import { testJourneysJsonData } from 'fixtures/journeys'
import * as Journey from 'lib/db/journey'
import journeysHandler from 'pages/api/journeys'

jest.mock('../../lib/db/journey', () => ({
  __esModule: true,
  ...jest.requireActual('../../lib/db/journey'),
}))

describe('journeys api', () => {
  const getAllJourneysSpy = jest.spyOn(Journey, 'getAllJourneys')

  it('returns 200 with all journey data', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    getAllJourneysSpy.mockImplementation(() =>
      Promise.resolve(testJourneysJsonData)
    )
    await journeysHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(testJourneysJsonData)
  })
})
