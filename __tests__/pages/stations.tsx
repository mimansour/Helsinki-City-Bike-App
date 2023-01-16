import { render, screen } from '@testing-library/react'
import Stations from '../../pages/stations/index'
import { testStations } from 'fixtures/stations'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

describe('Stations page', () => {
  beforeEach(() => {
    render(<Stations stations={testStations} />)
  })

  it('renders stations page title', () => {
    const title = screen.getByText('Stations')
    expect(title).toBeDefined()
  })

  it('renders stations table headers', () => {
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()

    const nameCol = screen.getByRole('columnheader', { name: 'Name' })
    expect(nameCol).toBeInTheDocument()

    const addressCol = screen.getByRole('columnheader', { name: 'Address' })
    expect(addressCol).toBeInTheDocument()
  })

  it('renders stations table cells', () => {
    testStations.forEach((station) => {
      const nameCell = screen.getByRole('cell', { name: station.nameFi })
      expect(nameCell).toBeInTheDocument()

      const addressCell = screen.getByRole('cell', { name: station.addressFi })
      expect(addressCell).toBeInTheDocument()
    })
  })

  it('renders stations table links', () => {
    testStations.forEach(async (station) => {
      const nameLink = screen.getByRole('link', { name: station.nameFi })
      expect(nameLink).toBeInTheDocument()
      expect(nameLink).toHaveAttribute('href', `/stations/${station.stationId}`)
      await userEvent.click(nameLink)
      expect(screen.getByTitle(station.nameFi)).toBeInTheDocument()
    })
  })
})
