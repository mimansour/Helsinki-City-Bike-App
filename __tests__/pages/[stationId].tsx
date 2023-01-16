import { render, screen } from '@testing-library/react'
import { testStationA } from 'fixtures/stations'
import '@testing-library/jest-dom/extend-expect'
import StationView from 'pages/stations/[stationId]'
import { testStats } from 'fixtures/journies'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Single station page', () => {
  const stationWithStats = {
    station: testStationA,
    stats: testStats,
  }
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      route: `/stations/${stationWithStats.station.stationId}`,
      query: { stationId: stationWithStats.station.stationId },
    }))

    render(<StationView stationWithStats={stationWithStats} />)
  })

  it('renders stats data', () => {
    const title = screen.getByText(`${stationWithStats.station.nameFi}`)
    expect(title).toBeDefined()

    const address = screen.getByText(
      `Station address: ${stationWithStats.station.addressFi}`
    )
    expect(address).toBeDefined()

    const totalDepartureJournies = screen.getByText(
      `Total journies: ${stationWithStats.stats.departureStations.totalJournies}`
    )
    expect(totalDepartureJournies).toBeDefined()

    const avgDistanceDeparture = screen.getByText(
      `The average distance: ${stationWithStats.stats.departureStations.averageDistance} km`
    )
    expect(avgDistanceDeparture).toBeDefined()

    const totalReturnJournies = screen.getByText(
      `Total journies: ${stationWithStats.stats.returnStations.totalJournies}`
    )
    expect(totalReturnJournies).toBeDefined()

    const avgDistanceReturn = screen.getByText(
      `The average distance: ${stationWithStats.stats.returnStations.averageDistance} km`
    )
    expect(avgDistanceReturn).toBeDefined()

    testStats.departureStations.topPopularStations.forEach((station) => {
      expect(screen.getByText(station.returnStationName)).toBeInTheDocument()
    })

    testStats.returnStations.topPopularStations.forEach((station) => {
      expect(screen.getByText(station.departureStationName)).toBeInTheDocument()
    })
  })
})
