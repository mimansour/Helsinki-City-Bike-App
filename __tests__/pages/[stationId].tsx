import { render, screen } from '@testing-library/react'
import { testStationA } from 'fixtures/stations'
import '@testing-library/jest-dom/extend-expect'
import StationView from 'pages/stations/[stationId]'
import { testStats } from 'fixtures/journeys'
import { fromMetersToKm } from 'lib/utils/journey'

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
  const { departureStationsStats, returnStationsStats } = testStats
  const stationWithStats = {
    station: testStationA,
    departureStationsStats,
    returnStationsStats,
  }
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      route: `/stations/${stationWithStats.station.stationId}`,
      query: { stationId: stationWithStats.station.stationId },
    }))

    render(<StationView stationWithStats={stationWithStats} />)
  })

  it('renders station info', () => {
    const title = screen.getByText(`${stationWithStats.station.nameFi}`)
    expect(title).toBeInTheDocument()

    expect(screen.getByText('Station address:')).toBeInTheDocument()
    expect(
      screen.getByText(`${stationWithStats.station.addressFi}`)
    ).toBeInTheDocument()
  })

  it('renders stats data', () => {
    const totalDepartJourneys = screen.getByText(
      `${stationWithStats.departureStationsStats.totalJourneys}`
    )
    expect(totalDepartJourneys).toBeInTheDocument()

    const avgDistanceDeparture = screen.getByText(
      `${fromMetersToKm(
        stationWithStats.departureStationsStats.averageDistance
      )} km`
    )
    expect(avgDistanceDeparture).toBeInTheDocument()

    const totalReturnJourneys = screen.getByText(
      `${stationWithStats.returnStationsStats.totalJourneys}`
    )
    expect(totalReturnJourneys).toBeInTheDocument()

    const avgDistanceReturn = screen.getByText(
      `${fromMetersToKm(
        stationWithStats.returnStationsStats.averageDistance
      )} km`
    )
    expect(avgDistanceReturn).toBeInTheDocument()

    testStats.departureStationsStats.topStationsNames.forEach((station) => {
      expect(screen.getByText(station)).toBeInTheDocument()
    })

    testStats.returnStationsStats.topStationsNames.forEach((station) => {
      expect(screen.getByText(station)).toBeInTheDocument()
    })
  })
})
