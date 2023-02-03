import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from 'pages'

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders title', () => {
    const title = screen.getByText('Helsinki City Bike App')
    expect(title).toBeDefined()
  })

  it('renders the link', async () => {
    const stationsLink = screen.getByRole('link', { name: 'Get started' })
    expect(stationsLink).toBeInTheDocument()
    expect(stationsLink).toHaveAttribute('href', '/stations')
  })
})
