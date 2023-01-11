import { createMocks } from 'node-mocks-http'
import stationIdHandler from 'pages/api/stations/[stationId]'
import { testStationA, testStations } from 'fixtures/stations'
import { testStats } from 'fixtures/journies'
import * as Station from 'lib/db/station'
import * as Journey from 'lib/db/journey'
import stationsHandler from 'pages/api/stations'

jest.mock('../lib/db/station', () => ({
  __esModule: true,
  ...jest.requireActual('../lib/db/station'),
}))

jest.mock('../lib/db/journey', () => ({
  __esModule: true,
  ...jest.requireActual('../lib/db/journey'),
}))

describe('station apis', () => {
  const getStationByIdSpy = jest.spyOn(Station, 'getStationById')
  const getJourneyStatsSpy = jest.spyOn(Journey, 'getJourneyStatsByStation')

  describe('station id api', () => {
    it('returns 200 with station data based on id', async () => {
      const stats = {
        returnStations: testStats,
        departureStations: testStats,
      }

      getStationByIdSpy.mockImplementation(() => Promise.resolve(testStationA))
      getJourneyStatsSpy.mockImplementation(() => Promise.resolve(stats))

      const stationId = '501'

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          stationId,
        },
      })

      await stationIdHandler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual({
        station: testStationA,
        stats,
      })
      expect(getStationByIdSpy).toHaveBeenCalledWith(stationId)
      expect(getJourneyStatsSpy).toHaveBeenCalledWith(stationId)
    })

    it('fails with 404 if id is not found', async () => {
      const stationId = '11'
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          stationId,
        },
      })

      getStationByIdSpy.mockImplementation(() => Promise.resolve(null))
      await stationIdHandler(req, res)

      expect(res._getStatusCode()).toBe(404)
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Could not find station with id.',
        })
      )
    })
  })

  describe('stations api', () => {
    it('returns 200 with all station data', async () => {
      const getAllStationsSpy = jest.spyOn(Station, 'getAllStations')

      const { req, res } = createMocks({
        method: 'GET',
      })

      getAllStationsSpy.mockImplementation(() => Promise.resolve(testStations))
      await stationsHandler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toHaveLength(testStations.length)
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(testStations)
      )
    })
  })
})
