import React, { useState } from 'react'

export default function SnoozeModal({ open, onClose, onConfirm, defaultDays = 1 }) {
  const [days, setDays] = useState(defaultDays)
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <h3>Snooze All Reminders</h3>
          <p>Choose how many days to add to all expiries.</p>
          <div style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
            <input type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} style={{padding:8,borderRadius:8}} />
            <button onClick={() => onConfirm(days)} style={{padding:'8px 12px'}}>Snooze</button>
            <button className="link-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
