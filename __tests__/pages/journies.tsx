import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Journies from 'pages/journies'
import { testJournies, testJourniesJsonData } from 'fixtures/journies'
import { fromMetersToKm, fromSecToMin } from 'lib/utils/journey'

describe('Journies page', () => {
  beforeEach(() => {
    render(<Journies journies={testJournies} />)
  })

  it('renders title', () => {
    const title = screen.getByText('Journies')
    expect(title).toBeDefined()
  })

  it('renders journies table headers', () => {
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()

    const departureStationNameCol = screen.getByRole('columnheader', {
      name: 'Departure station',
    })
    expect(departureStationNameCol).toBeInTheDocument()

    const returnStationNameCol = screen.getByRole('columnheader', {
      name: 'Return station',
    })
    expect(returnStationNameCol).toBeInTheDocument()

    const distanceCol = screen.getByRole('columnheader', {
      name: 'Covered distance (km)',
    })
    expect(distanceCol).toBeInTheDocument()

    const durationCol = screen.getByRole('columnheader', {
      name: 'Duration (min)',
    })
    expect(durationCol).toBeInTheDocument()
  })

  it('renders journies table cells', () => {
    testJourniesJsonData.forEach((journey) => {
      const departureStationNameCell = screen.getByRole('cell', {
        name: journey.departureStationName,
      })
      expect(departureStationNameCell).toBeInTheDocument()

      const returnStationNameCell = screen.getByRole('cell', {
        name: journey.returnStationName,
      })
      expect(returnStationNameCell).toBeInTheDocument()

      const distanceCell = screen.getByRole('cell', {
        name: fromMetersToKm(journey.distance).toString(),
      })
      expect(distanceCell).toBeInTheDocument()

      const durationCell = screen.getByRole('cell', {
        name: fromSecToMin(journey.duration).toString(),
      })
      expect(durationCell).toBeInTheDocument()
    })
  })
})
