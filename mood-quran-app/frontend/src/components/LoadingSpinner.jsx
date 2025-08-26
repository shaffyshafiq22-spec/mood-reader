import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      <span className="sr-only">Loading…</span>
      <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse [animation-delay:150ms]" />
      <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse [animation-delay:300ms]" />
    </div>
  )
}