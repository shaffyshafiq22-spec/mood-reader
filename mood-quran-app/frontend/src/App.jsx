import React, { useState } from 'react'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import FlashCard from './components/FlashCard'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const [result, setResult] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.15),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(5,150,105,0.15),transparent_40%)]" />
        <div className="relative z-10 container mx-auto px-4 py-10 max-w-5xl">
          <Header />
          <SearchSection onResult={(data) => { setResult(data); setIsOpen(true) }} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && result && (
          <FlashCard result={result} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}