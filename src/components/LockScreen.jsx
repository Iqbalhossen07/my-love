import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ✏️  Change this to her nickname, your anniversary date, or any secret word
const SECRET_PASSWORD = 'iqbal+habiba'

export default function LockScreen({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [hint, setHint] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = () => {
    if (value.trim().toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
      onUnlock()
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glow orb background */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(225,29,106,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating heart */}
      <motion.div
        className="text-6xl mb-6 heartbeat"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        💖
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="font-serif text-4xl md:text-5xl text-center mb-2 leading-tight"
        style={{ color: '#f9d0de' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        A Secret Surprise
      </motion.h1>
      <motion.p
        className="font-sans text-sm md:text-base text-center mb-10"
        style={{ color: 'rgba(240,230,246,0.45)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        Only the one who holds the key may enter&hellip;
      </motion.p>

      {/* Lock icon */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="10" y="26" width="36" height="24" rx="6" fill="rgba(225,29,106,0.18)" stroke="rgba(225,29,106,0.6)" strokeWidth="1.5"/>
          <path d="M18 26V18a10 10 0 0120 0v8" stroke="rgba(225,29,106,0.7)" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="28" cy="38" r="4" fill="#e11d6a"/>
          <line x1="28" y1="42" x2="28" y2="46" stroke="#e11d6a" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Input + button */}
      <motion.div
        className={`w-full max-w-xs flex flex-col gap-4 ${error ? 'shake' : ''}`}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <input
          ref={inputRef}
          type="password"
          placeholder="Enter the secret word…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="glow-input w-full rounded-2xl px-5 py-4 font-sans text-sm tracking-widest text-center"
        />

        <AnimatePresence>
          {error && (
            <motion.p
              className="text-center text-xs font-sans"
              style={{ color: '#ff4d8d' }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              That's not quite right, my love 💔
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={handleSubmit}
          className="glow-btn rounded-2xl py-2 font-sans font-medium tracking-widest text-white text-sm uppercase"
        >
          Unlock the Surprise ✨
        </button>

        <button
          className="font-sans text-xs underline text-center opacity-30 hover:opacity-60 transition-opacity"
          style={{ color: '#f9a8b8' }}
          onClick={() => setHint((h) => !h)}
        >
          {hint ? `iqbal+habiba 🌹` : 'Need a hint?'}
        </button>
      </motion.div>

      {/* Bottom decoration */}
      <motion.p
        className="absolute bottom-8 font-serif italic text-xs"
        style={{ color: 'rgba(240,230,246,0.2)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Made with all my love 💕
      </motion.p>
    </motion.div>
  )
}
