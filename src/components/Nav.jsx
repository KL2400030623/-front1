import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ user, onLogout }) {
  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">Food Saver</Link>
      </div>
      <nav className="nav-right">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="link-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Register / Login</Link>
        )}
      </nav>
    </header>
  )
}
