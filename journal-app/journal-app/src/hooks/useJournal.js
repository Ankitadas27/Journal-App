import { useState, useEffect, useCallback } from 'react'
import { journalApi } from '../utils/api'

export function useJournal() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await journalApi.getAll()
      setEntries(res.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const createEntry = async (data) => {
    const res = await journalApi.create(data)
    setEntries((prev) => [res.data, ...prev])
    return res.data
  }

  const updateEntry = async (id, data) => {
    const res = await journalApi.update(id, data)
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...res.data } : e))
    )
    return res.data
  }

  const deleteEntry = async (id) => {
    await journalApi.delete(id)
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return {
    entries,
    loading,
    error,
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
  }
}
