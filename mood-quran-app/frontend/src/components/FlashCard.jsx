import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function FlashCard({ result, onClose }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-[92%] max-w-2xl"
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="[perspective:1000px]">
            <motion.div
              className="relative h-full"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20 shadow-2xl" style={{ backfaceVisibility: 'hidden' }}>
                <div className="h-40 flex items-center justify-center text-lg text-slate-200">
                  Preparing guidance…
                </div>
              </div>

              <div className="absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur border border-white/20 shadow-2xl" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                <div className="space-y-4">
                  <div className="text-2xl md:text-3xl font-bold font-amiri text-center leading-relaxed">{result.arabic}</div>
                  <div className="text-lg md:text-xl font-nastaliq text-center leading-9">{result.urdu}</div>
                  <div className="text-sm text-slate-200 text-center italic">{result.reference}</div>
                  <div className="text-sm md:text-base text-slate-100/90 italic text-center whitespace-pre-line">{result.explanation}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}