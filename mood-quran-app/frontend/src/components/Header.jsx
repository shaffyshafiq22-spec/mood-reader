import React from 'react'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="text-center mb-10 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-lg"
      >
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm">Mood-Based Guidance</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight"
      >
        Mood-Based Quran & Hadith Finder
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-3 text-base md:text-lg text-slate-200"
      >
        Find spiritual guidance based on your current feelings
      </motion.p>
    </header>
  )
}