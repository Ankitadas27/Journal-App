import React, { useState } from 'react'
import { useJournal } from './hooks/useJournal'
import { useToast } from './hooks/useToast'
import JournalList from './components/JournalList'
import JournalForm from './components/JournalForm'
import ViewEntryModal from './components/ViewEntryModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import ToastContainer from './components/ToastContainer'

export default function App() {
  const { entries, loading, error, fetchEntries, createEntry, updateEntry, deleteEntry } = useJournal()
  const { toasts, addToast, removeToast } = useToast()

  const [modal, setModal] = useState(null) // 'create' | 'edit' | 'view' | 'delete'
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // ── Handlers ──────────────────────────────────────────────
  const openCreate = () => { setSelectedEntry(null); setModal('create') }
  const openEdit = (entry) => { setSelectedEntry(entry); setModal('edit') }
  const openView = (entry) => { setSelectedEntry(entry); setModal('view') }
  const openDelete = (entry) => { setSelectedEntry(entry); setModal('delete') }
  const closeModal = () => { setModal(null); setSelectedEntry(null) }

  const handleCreate = async (data) => {
    try {
      await createEntry(data)
      addToast('Entry saved! ✨ Keep writing!', 'success')
      closeModal()
    } catch (err) {
      addToast(err.message || 'Failed to create entry', 'error')
    }
  }

  const handleUpdate = async (data) => {
    try {
      await updateEntry(selectedEntry.id, data)
      addToast('Entry updated! 💾 Looking good!', 'success')
      closeModal()
    } catch (err) {
      addToast(err.message || 'Failed to update entry', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteEntry(selectedEntry.id)
      addToast('Entry deleted 🗑️ Gone forever!', 'info')
      closeModal()
    } catch (err) {
      addToast(err.message || 'Failed to delete entry', 'error')
    }
  }

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">📓</div>
            <span className="logo-text">
              My<span>Journal</span>
            </span>
          </div>

          <div className="header-stats">
            <span className="dot" />
            {loading ? 'Loading...' : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <span className="deco-star s1">✦</span>
        <span className="deco-star s2">✶</span>
        <span className="deco-star s3">✸</span>

        <div className="hero-badge">
          ✨ Your personal space
        </div>

        <h1 className="hero-title">
          Write about the things<br />
          <span className="highlight">you can't say out loud</span>
        </h1>

        <p className="hero-subtitle">
          Pour your thoughts, track your growth, and rediscover yourself —
          one entry at a time 🌊
        </p>

        <button className="btn-add" onClick={openCreate}>
          ✍️ New Entry
        </button>
      </section>

      {/* MAIN */}
      <main className="main-content">
        {/* Search + Section Header */}
        {!loading && !error && (
          <>
            <div className="search-bar-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="search"
                className="search-bar"
                placeholder="Search your thoughts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="section-heading">
              <h2 className="section-title">
                📚 Your Entries
                {entries.length > 0 && (
                  <span className="entry-count">{entries.length}</span>
                )}
              </h2>
              <button className="btn-add" onClick={openCreate} style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
                + Add New
              </button>
            </div>
          </>
        )}

        {/* States */}
        {loading && (
          <div className="loading-wrapper">
            <div className="spinner" />
            <p className="loading-text">Fetching your thoughts... ⏳</p>
          </div>
        )}

        {error && !loading && (
          <div className="empty-state">
            <span className="empty-state-icon">😵</span>
            <h3>Oops! Connection failed</h3>
            <p>{error}</p>
            <button className="btn-add" onClick={fetchEntries} style={{ marginTop: '1rem' }}>
              🔄 Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <JournalList
            entries={entries}
            onEdit={openEdit}
            onDelete={openDelete}
            onView={openView}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        Made with 🧡 · Your thoughts are safe here · {new Date().getFullYear()}
      </footer>

      {/* MODALS */}
      {modal === 'create' && (
        <JournalForm onSubmit={handleCreate} onClose={closeModal} />
      )}
      {modal === 'edit' && selectedEntry && (
        <JournalForm entry={selectedEntry} onSubmit={handleUpdate} onClose={closeModal} />
      )}
      {modal === 'view' && selectedEntry && (
        <ViewEntryModal entry={selectedEntry} onClose={closeModal} onEdit={openEdit} />
      )}
      {modal === 'delete' && selectedEntry && (
        <ConfirmDeleteModal entry={selectedEntry} onConfirm={handleDelete} onClose={closeModal} />
      )}

      {/* TOASTS */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
