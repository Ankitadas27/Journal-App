import React, { useState } from 'react'

export default function ConfirmDeleteModal({ entry, onConfirm, onClose }) {
  const [deleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    setDeleting(true)
    try {
      await onConfirm()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="confirm-modal">
          <span className="confirm-emoji">🗑️</span>
          <h2 className="confirm-title">Delete this entry?</h2>
          <p className="confirm-text">
            "<strong>{entry?.title}</strong>" will be gone forever.
            <br />No undo. No take-backs. Are you sure? 👀
          </p>
          <div className="confirm-actions">
            <button className="btn-cancel" onClick={onClose}>
              Nope, keep it 🙅
            </button>
            <button
              className="btn-danger"
              onClick={handleConfirm}
              disabled={deleting}
            >
              {deleting ? '⏳ Deleting...' : '💀 Yes, delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
