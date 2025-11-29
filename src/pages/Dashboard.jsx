import React, { useEffect, useState } from 'react'
import { fetchItems, createItem, updateItem, deleteItem } from '../api/mockApi'
import { parseISO, isBefore, addDays, endOfDay } from 'date-fns'
import AddModal from '../components/AddModal'

function ItemForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState({ title: '', expiry: '' })

  useEffect(() => {
    if (editing) setForm({ title: editing.title, expiry: editing.expiry })
  }, [editing])

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave(form)
    setForm({ title: '', expiry: '' })
  }

  return (
    <form onSubmit={submit} className="item-form">
      <input placeholder="Item title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
      <div>
        <button type="submit">Save</button>
        {onCancel && <button type="button" className="link-btn" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

export default function Dashboard({ user }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState({ title: '', expiry: '', severity: 'low' })

  async function load() {
    setLoading(true)
    const data = await fetchItems()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  if (!user) return <p>Please login to view your dashboard.</p>

  function isExpired(it) {
    if (!it.expiry) return false
    try {
      const ex = endOfDay(parseISO(it.expiry))
      return isBefore(ex, new Date())
    } catch (e) {
      return false
    }
  }

  const userItems = items.filter(i => i.ownerId === user.id)
  const total = userItems.length
  const expiredCount = userItems.filter(isExpired).length
  const activeCount = total - expiredCount

  async function handleSave(form) {
    if (editing) {
      await updateItem(editing.id, form)
      setEditing(null)
    } else {
      await createItem({ ...form, ownerId: user.id })
    }
    await load()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return
    await deleteItem(id)
    await load()
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!newItem.title.trim()) return
    await createItem({ ...newItem, ownerId: user.id })
    setNewItem({ title: '', expiry: '', severity: 'low' })
    setShowAdd(false)
    await load()
  }

  async function snoozeAll(defaultDays = 1) {
    const input = prompt('Snooze all items by how many days?', String(defaultDays))
    if (!input) return
    const days = parseInt(input, 10)
    if (Number.isNaN(days) || days <= 0) {
      alert('Please enter a valid number of days.')
      return
    }
    if (!confirm(`Snooze all expiries by ${days} day(s)?`)) return

    const userItems = items.filter(i => i.ownerId === user.id && i.expiry)
    for (const it of userItems) {
      try {
        const newDate = addDays(parseISO(it.expiry), days)
        await updateItem(it.id, { expiry: newDate.toISOString().slice(0,10) })
      } catch (err) {
        // ignore individual failures
      }
    }
    await load()
  }

  return (
    <section>
      <h2>{user.name}'s Dashboard</h2>

      <div className="card">
        <div className="reminders-header">
          <h3>Active Reminders</h3>
          <div>
            <button className="add-btn" onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Close' : 'Add'}</button>
          </div>
        </div>

        <AddModal open={showAdd} onClose={() => setShowAdd(false)}>
          <form className="add-form" onSubmit={handleCreate}>
            <input placeholder="Item title" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
            <input type="date" value={newItem.expiry} onChange={e => setNewItem({ ...newItem, expiry: e.target.value })} />
            <select value={newItem.severity} onChange={e => setNewItem({ ...newItem, severity: e.target.value })}>
              <option value="critical">critical</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
            <div style={{display:'flex',gap:8}}>
              <button type="submit">Save</button>
              <button type="button" className="link-btn" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </AddModal>

        <div className="counts">
          <div className="stat">Total: {total}</div>
          <div className="stat">Active: {activeCount}</div>
          <div className="stat">Expired: {expiredCount}</div>
        </div>

        <div className="reminder-grid">
          {loading ? <p>Loading...</p> : (
            total === 0 ? <p>No items yet. Add your first food item above.</p> : (
              userItems.map(it => {
                const expired = isExpired(it)
                const sev = it.severity || 'low'
                const emoji = (sev === 'critical' && '🔥') || (sev === 'high' && '⚠️') || (sev === 'medium' && '⏳') || '🥗'
                return (
                  <div key={it.id} className={"reminder-card " + (expired ? 'expired' : '')}>
                    <div className="reminder-top">
                      <div className="reminder-title">
                        <div className="reminder-emoji">{emoji}</div>
                        <div>
                          <div className="item-title">{it.title} <span className={"severity " + sev}>{sev}</span></div>
                          <div className="reminder-meta">Expiry: {it.expiry || 'No expiry'}</div>
                        </div>
                      </div>
                      <div className="controls">
                        <button onClick={() => setEditing(it)}>Edit</button>
                        <button className="del" onClick={() => handleDelete(it.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          )}
        </div>

        <div className="quick-actions">
          <button className="qbtn" onClick={() => snoozeAll(1)}>Snooze All (1 day)</button>
          <button className="qbtn" onClick={() => alert('Settings placeholder')}>Settings</button>
          <div style={{flex:1}} />
        </div>

        <div className="pro-tip">
          <strong>Pro Tip:</strong> Set reminders 1-2 days before expiry to have time to use or donate the food!
        </div>
      </div>
    </section>
  )
}
