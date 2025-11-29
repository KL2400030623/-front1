import React from 'react'
import { render, screen } from '@testing-library/react'
import Dashboard from '../pages/Dashboard'

test('Dashboard prompts to login when no user', () => {
  render(<Dashboard user={null} />)
  expect(screen.getByText(/Please login to view your dashboard/i)).toBeInTheDocument()
})
