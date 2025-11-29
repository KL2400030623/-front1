import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Nav from './components/Nav'

export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const s = sessionStorage.getItem('authUser')
    if (s) setUser(JSON.parse(s))
  }, [])

  function handleLogin(u) {
    setUser(u)
    sessionStorage.setItem('authUser', JSON.stringify(u))
    navigate('/dashboard')
  }

  function handleLogout() {
    setUser(null)
    sessionStorage.removeItem('authUser')
    navigate('/')
  }

  return (
    <div>
      <Nav user={user} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </main>
    </div>
  )
}
