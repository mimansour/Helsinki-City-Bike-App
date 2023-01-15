import { createMocks } from 'node-mocks-http'
import { testJournies, testJourniesJsonData } from 'fixtures/journies'
import * as Journey from 'lib/db/journey'
import journiesHandler from 'pages/api/journies'

jest.mock('../../lib/db/journey', () => ({
  __esModule: true,
  ...jest.requireActual('../../lib/db/journey'),
}))

describe('journies api', () => {
  const getAllJourniesSpy = jest.spyOn(Journey, 'getAllJournies')

  it('returns 200 with all journey data', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    getAllJourniesSpy.mockImplementation(() => Promise.resolve(testJournies))
    await journiesHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(testJourniesJsonData)
  })
})
