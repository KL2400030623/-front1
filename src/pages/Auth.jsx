import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const e = {}
    if (isRegister && !form.name.trim()) e.name = 'Name required'
    if (!validateEmail(form.email)) e.email = 'Invalid email'
    if (form.password.length < 6) e.password = 'Minimum 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    if (isRegister) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.email === form.email)) {
        setErrors({ email: 'Email already registered' })
        return
      }
      const user = { id: Date.now(), name: form.name, email: form.email }
      users.push({ ...user, password: form.password })
      localStorage.setItem('users', JSON.stringify(users))
      sessionStorage.setItem('authUser', JSON.stringify(user))
      onLogin(user)
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const found = users.find(u => u.email === form.email && u.password === form.password)
      if (!found) {
        setErrors({ email: 'Invalid credentials' })
        return
      }
      const user = { id: found.id, name: found.name, email: found.email }
      sessionStorage.setItem('authUser', JSON.stringify(user))
      onLogin(user)
    }
  }

  return (
    <section className="auth">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        {isRegister && (
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <small className="err">{errors.name}</small>}
          </label>
        )}
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <small className="err">{errors.email}</small>}
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} />
          {errors.password && <small className="err">{errors.password}</small>}
        </label>
        <div className="actions">
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
          <button type="button" className="link-btn" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </form>
      <p>
        For demo purposes, passwords are stored in `localStorage`. This is only for the demo — do not do this in production.
      </p>
    </section>
  )
}
