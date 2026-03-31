import React, { useState, useEffect } from 'react'

export default function JournalForm({ entry, onSubmit, onClose }) {
  const isEditing = Boolean(entry)

  const [title, setTitle] = useState(entry?.title || '')
  const [content, setContent] = useState(entry?.content || '')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Focus title on open
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('journal-title-input')?.focus()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const validate = () => {
    const errs = {}
    if (!title.trim()) errs.title = "Title can't be empty ✍️"
    if (!content.trim()) errs.content = "Don't leave this blank! Pour it out 💬"
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    try {
      await onSubmit({ title: title.trim(), content: content.trim() })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-emoji">{isEditing ? '✏️' : '📝'}</span>
            <h2 className="modal-title">
              {isEditing ? 'Edit Entry' : 'New Entry'}
            </h2>
            <p className="modal-subtitle">
              {isEditing
                ? 'Make it better, make it yours ✨'
                : "What's on your mind today? 🌿"}
            </p>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="journal-title-input">
              📌 Title
            </label>
            <input
              id="journal-title-input"
              type="text"
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Give this moment a name..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors((p) => ({ ...p, title: '' }))
              }}
              maxLength={120}
            />
            {errors.title && (
              <p className="form-error">⚠️ {errors.title}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="journal-content-input">
              💭 Your Thoughts
            </label>
            <textarea
              id="journal-content-input"
              className={`form-textarea ${errors.content ? 'error' : ''}`}
              placeholder="Let it all out. No judgment here... 🌊"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (errors.content) setErrors((p) => ({ ...p, content: '' }))
              }}
            />
            {errors.content && (
              <p className="form-error">⚠️ {errors.content}</p>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⏳</span>
                  Saving...
                </>
              ) : (
                <>{isEditing ? '💾 Save Changes' : '🚀 Add Entry'}</>
              )}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
