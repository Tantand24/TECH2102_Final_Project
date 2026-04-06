import { render, screen } from '@testing-library/react'
import App from './App'

test('renders group and names', () => {
  render(<App />)

  expect(screen.getByText(/Group 9/i)).toBeInTheDocument()
  expect(screen.getByText(/Tristan Dang/i)).toBeInTheDocument()
  expect(screen.getByText(/Rukaiya Pardawala/i)).toBeInTheDocument()
})