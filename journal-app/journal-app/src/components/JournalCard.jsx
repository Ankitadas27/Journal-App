import React from 'react'

const CARD_ACCENTS = [
  'card-accent-orange',
  'card-accent-yellow',
  'card-accent-teal',
  'card-accent-blue',
  'card-accent-green',
  'card-accent-pink',
  'card-accent-lilac',
]

const CARD_EMOJIS = ['✍️', '💭', '🌿', '⚡', '🔥', '🌊', '✨', '🎯', '💡', '🌙', '🦋', '🌸']

function getAccent(id) {
  const hash = String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return CARD_ACCENTS[hash % CARD_ACCENTS.length]
}

function getEmoji(id) {
  const hash = String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return CARD_EMOJIS[hash % CARD_EMOJIS.length]
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function JournalCard({ entry, onEdit, onDelete, onClick }) {
  const accent = getAccent(entry.id)
  const emoji = getEmoji(entry.id)
  const dateLabel = formatDate(entry.createdAt || entry.date || entry.updatedAt)

  return (
    <article
      className={`journal-card ${accent}`}
      onClick={() => onClick(entry)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(entry)}
    >
      <span className="card-emoji">{emoji}</span>
      <h3 className="card-title">{entry.title}</h3>
      <p className="card-content">{entry.content}</p>

      <div className="card-meta">
        {dateLabel && <span className="card-date">📅 {dateLabel}</span>}
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(entry)}
            title="Edit entry"
            aria-label="Edit"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(entry)}
            title="Delete entry"
            aria-label="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  )
}
