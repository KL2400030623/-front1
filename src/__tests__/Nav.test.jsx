import React from 'react'
import { render, screen } from '@testing-library/react'
import Nav from '../components/Nav'
import { BrowserRouter } from 'react-router-dom'

test('renders Nav links', () => {
  render(
    <BrowserRouter>
      <Nav user={null} />
    </BrowserRouter>
  )
  expect(screen.getByText(/Food Saver/i)).toBeInTheDocument()
  expect(screen.getByText(/Home/i)).toBeInTheDocument()
  expect(screen.getByText(/Register \/ Login/i)).toBeInTheDocument()
})
