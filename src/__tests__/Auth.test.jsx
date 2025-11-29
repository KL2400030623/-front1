import React from 'react'
import { render, screen } from '@testing-library/react'
import Auth from '../pages/Auth'
import { BrowserRouter } from 'react-router-dom'

test('Auth page shows register heading and login toggle', () => {
  render(
    <BrowserRouter>
      <Auth onLogin={() => {}} />
    </BrowserRouter>
  )
  // heading 'Register'
  expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument()
  // toggle button that contains the word 'Login'
  expect(screen.getByRole('button', { name: /Have an account\? Login/i })).toBeInTheDocument()
})
