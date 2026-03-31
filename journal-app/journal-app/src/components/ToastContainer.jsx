import React from 'react'

const TOAST_ICONS = {
  success: '✅',
  error: '❌',
  info: '⚡',
}

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => onRemove(toast.id)}
        >
          <span className="toast-icon">{TOAST_ICONS[toast.type] || '💬'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
