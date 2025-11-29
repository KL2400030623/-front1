import React from 'react'

export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Confirm</h3>
        <p>{message}</p>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button onClick={onCancel} className="link-btn">Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
