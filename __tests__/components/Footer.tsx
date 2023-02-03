import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders footer content', () => {
    render(<Footer />)

    expect(screen.getByText('Copyright ©2023.')).toBeInTheDocument()
    expect(screen.getByText('Mira Mansour')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'The Noun Project' })
    ).toBeInTheDocument()
  })
})
