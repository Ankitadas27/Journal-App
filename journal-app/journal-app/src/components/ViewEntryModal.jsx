import React from 'react'

function formatDate(str) {
  if (!str) return ''
  try {
    return new Date(str).toLocaleString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
      year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  } catch { return '' }
}

export default function ViewEntryModal({ entry, onClose, onEdit }) {
  if (!entry) return null
  const dateLabel = formatDate(entry.createdAt || entry.date || entry.updatedAt)

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal entry-view" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-emoji">📖</span>
            <h2 className="modal-title" style={{ fontSize: '1.2rem' }}>Reading Entry</h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-icon btn-edit" onClick={() => { onClose(); onEdit(entry) }}>✏️</button>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <h1 className="entry-view-title">{entry.title}</h1>
        <p className="entry-view-content">{entry.content}</p>

        {dateLabel && (
          <div className="entry-view-meta">
            📅 {dateLabel}
          </div>
        )}
      </div>
    </div>
  )
}
