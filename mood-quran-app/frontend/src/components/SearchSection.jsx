import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { fetchGuidance } from '../utils/api'
import LoadingSpinner from './LoadingSpinner'

const urduMoods = [
  { label: 'دُکھی (Dukhi - Sad)', value: 'dukhi' },
  { label: 'پریشان (Pareshan - Worried)', value: 'pareshan' },
  { label: 'خوش (Khush - Happy)', value: 'khush' },
  { label: 'گصہ (Gussa - Angry)', value: 'gussa' },
  { label: 'ڈر (Dar - Fear)', value: 'dar' },
  { label: 'امید (Umeed - Hope)', value: 'umeed' },
  { label: 'تنہا (Tanha - Lonely)', value: 'tanha' },
  { label: 'بے چین (Be-chain - Restless)', value: 'be-chain' },
  { label: 'شکر گزار (Shukar Guzaar - Grateful)', value: 'shukar-guzaar' },
  { label: 'مایوس (Mayoos - Hopeless)', value: 'mayoos' },
]

const englishMoods = [
  'Sad','Worried','Happy','Angry','Fearful','Hopeful','Lonely','Anxious','Grateful','Hopeless','Confused','Peaceful','Stressed','Content','Depressed'
].map(m => ({ label: m, value: m.toLowerCase() }))

export default function SearchSection({ onResult }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const options = useMemo(() => {
    const all = [...urduMoods, ...englishMoods]
    if (!query) return all
    return all.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const onChoose = (opt) => {
    setSelected(opt)
    setOpen(false)
  }

  const onSearch = async () => {
    setError('')
    setLoading(true)
    try {
      const moodToSend = selected?.value || query.trim()
      if (!moodToSend) {
        setError('Please select or type a mood')
        setLoading(false)
        return
      }
      const data = await fetchGuidance(moodToSend)
      onResult?.(data)
    } catch (e) {
      setError('Failed to fetch guidance. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="mx-auto max-w-2xl"
    >
      <div className="p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 shadow-xl">
        <label className="block text-sm mb-2 text-slate-200">Select your mood</label>
        <div className="relative">
          <button
            type="button"
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition flex items-center justify-between"
            onClick={() => setOpen(v => !v)}
          >
            <span className="truncate">{selected?.label || 'Choose a mood or type to search…'}</span>
            <ChevronDown className="w-4 h-4 opacity-80" />
          </button>
          {open && (
            <div className="absolute z-20 mt-2 w-full rounded-xl bg-slate-900/95 border border-white/10 shadow-2xl overflow-hidden">
              <input
                className="w-full px-4 py-2 bg-transparent border-b border-white/10 outline-none placeholder:text-slate-400"
                placeholder="Search moods…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="max-h-56 overflow-auto">
                {options.map((opt) => (
                  <button key={opt.value} className="w-full text-left px-4 py-2 hover:bg-white/5" onClick={() => onChoose(opt)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={onSearch}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-60"
          >
            <Search className="w-4 h-4" />
            Search Guidance
          </button>
          {loading && <LoadingSpinner />}
        </div>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      </div>
    </motion.section>
  )
}