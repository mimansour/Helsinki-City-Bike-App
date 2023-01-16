import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from 'pages'

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders title', () => {
    const title = screen.getByText('Welcome to Helsinki City Bike App!')
    expect(title).toBeDefined()
  })

  it('renders links', async () => {
    const stationsLink = screen.getByRole('link', { name: 'Stations' })
    expect(stationsLink).toBeInTheDocument()
    expect(stationsLink).toHaveAttribute('href', '/stations')

    const journeysLink = screen.getByRole('link', { name: 'Journies' })
    expect(journeysLink).toBeInTheDocument()
    expect(journeysLink).toHaveAttribute('href', '/journies')
  })
})
