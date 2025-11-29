import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaClipboardList, FaLock, FaUtensils } from 'react-icons/fa'

export default function Nav({ user, onLogout }) {
  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="brand"><FaUtensils style={{marginRight:8}}/> Food Saver</Link>
      </div>
      <nav className="nav-right">
        <Link to="/">
          <FaHome style={{marginRight:8}}/>Home
        </Link>
        {user ? (
          <>
            <Link to="/dashboard"><FaClipboardList style={{marginRight:8}}/>Dashboard</Link>
            <button className="link-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/auth"><FaLock style={{marginRight:8}}/>Register / Login</Link>
        )}
      </nav>
    </header>
  )
}
