import React from 'react'
import JournalCard from './JournalCard'

export default function JournalList({ entries, onEdit, onDelete, onView, searchQuery }) {
  const filtered = entries.filter((e) => {
    const q = searchQuery.toLowerCase()
    return (
      e.title?.toLowerCase().includes(q) ||
      e.content?.toLowerCase().includes(q)
    )
  })

  if (!filtered.length && searchQuery) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">🔍</span>
        <h3>No results found</h3>
        <p>Try different keywords or clear the search</p>
      </div>
    )
  }

  if (!filtered.length) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">📓</span>
        <h3>Your journal is empty!</h3>
        <p>Start writing your first entry and let it all out 🌊</p>
      </div>
    )
  }

  return (
    <div className="journal-grid">
      {filtered.map((entry) => (
        <JournalCard
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onView}
        />
      ))}
    </div>
  )
}
