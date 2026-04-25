import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// ✏️  Personalise this letter for her!
const LETTER = `My dearest love,

শুভ জন্মদিন, আমার প্রিয় মানুষ ❤️ তোমাকে নিয়ে আমার কোনো perfect sentence নেই,কারণ তুমি নিজেই একটা perfect feeling। তুমি আমার পাশে থাকাতে সবকিছু যেন একটু বেশি সুন্দর সুন্দর লাগে। তুমি আমার জীবনের সবচেয়ে সুন্দর ঘটনাগুলোর একটা। জানো, তুমি শুধু আমার গার্লফ্রেন্ড না, তুমি আমার বেস্ট ফ্রেন্ড , আমার পার্টনার, বউ,তুমার সাথে সবকিছু শেয়ার করতে পারি একটুও ভাবি না। আমি এমন একটা মানুষ ই চাইছিলাম, যার শুন্যস্থান পূরণ করলে তুমি। তুমি জানো তুমার মত মেয়ে পাওয়া ভাগ্য লাগে।তুমি আমার কাছে যেমন সুন্দর,ঠিক তেমনি তুমার মনমানসিকতা খুব সুন্দর। আরেকটা বিষয় সেটা হল ভাই যেদিন বলছিলো ইকবাল তুমার সাথে একটা মেয়ে, তার নাম হাবিবা কাজ করবে,জানো তখন ই আমার কেমন একটা ভালো লাগা কাজ করছে,তখন ত বুজিনি তুমি এতটা আপন হয়ে যাবে। তুমি আমার লাইফের সেই চাপ্টার যেটা আমি কখনো শেষ করতে চাই না। তোমার জন্য কোনো তুলনা নেই কারণ তুমি একটাই, আর তুমি আমারই জান। তুমাকে আমি ফিল করতে পারি,খুব খুব আপন লাগে,খুব বিশ্বাস করি,আশাকরি এই বিশ্বাস টা রাখবা জান।তুমাকে হারাতে চাই না জান,তুমাকে আমার করে পেতে চাই। তুমাকে নিয়ে বলা শেষ হবে না,বেশি বললে আবার বিরক্ত হবা😀😀, শেষে এটাই বলবো আজকের এই বিশেষ মুহুর্তে আমি শুধু একটা কথাই বলতে চাই—তুমি যেমন আছো, ঠিক তেমনই থেকো। কারণ এই ‘তুমি’-টাই আমার সবচেয়ে পছন্দের। আমি প্রতিদিন আল্লাহর কাছে দোয়া করি, যেন তোমার সব স্বপ্ন পূরণ হয়, তুমি সবসময় হাসিখুশি থাকো, আর আমাদের ভালোবাসাটা এমনই সুন্দর থাকে সারাজীবন 💖

শুভ জন্মদিন, আমার ভালোবাসা 🎂✨
`;

function Fireworks() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const colors = ['#e11d6a', '#d4a847', '#a78bfa', '#f9a8b8', '#fff']

    const burst = (opts = {}) =>
      confetti({
        spread: opts.spread ?? 80,
        particleCount: opts.count ?? 60,
        origin: opts.origin ?? { x: 0.5, y: 0.55 },
        colors,
        scalar: opts.scalar ?? 1.1,
        shapes: ['circle', 'square'],
        gravity: 1.2,
        ticks: 300,
        ...opts,
      })

    // Initial blasts
    setTimeout(() => burst({ origin: { x: 0.3, y: 0.6 }, count: 80 }), 0)
    setTimeout(() => burst({ origin: { x: 0.7, y: 0.6 }, count: 80 }), 150)
    setTimeout(() => burst({ origin: { x: 0.5, y: 0.5 }, count: 120, spread: 120 }), 300)

    // Heart shapes
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 74,-37 92,0C170,1 241,128 167,184 91,128 4,1 75,72z',
      matrix: [0.03, 0, 0, 0.03, -5, -10],
    })
    setTimeout(
      () =>
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { x: 0.5, y: 0.4 },
          shapes: [heart],
          colors: ['#e11d6a', '#f9a8b8'],
          scalar: 2,
        }),
      600
    )

    // Side cannons
    const cannon = (x, angle) => {
      confetti({
        particleCount: 50,
        angle,
        spread: 55,
        origin: { x, y: 0.85 },
        colors,
        startVelocity: 55,
      })
    }
    setTimeout(() => { cannon(0.1, 60); cannon(0.9, 120) }, 800)
    setTimeout(() => { cannon(0.2, 70); cannon(0.8, 110) }, 1400)
    setTimeout(() => burst({ count: 100, spread: 180, scalar: 0.8 }), 2000)
  }, [])

  return null
}

export default function GrandReveal() {
  const [showLetter, setShowLetter] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)

  const triggerMore = () => {
    const colors = ['#e11d6a', '#d4a847', '#a78bfa', '#f9a8b8']
    confetti({ particleCount: 150, spread: 160, origin: { y: 0.6 }, colors })
  }

  return (
    <motion.div
      className="relative z-10 min-h-screen flex flex-col items-center justify-start py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Fireworks />

      {/* Big birthday message */}
      <motion.div
        className="text-center mt-10 mb-12"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
      >
        <motion.p
          className="font-sans text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: '#d4a847', opacity: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          ✨ Iqbal + Habiba ✨
        </motion.p>

        <h1
          className="font-serif leading-none mb-4"
          style={{
            fontSize: 'clamp(3rem, 12vw, 7rem)',
            background: 'linear-gradient(135deg, #d4a847 0%, #f9a8b8 40%, #e11d6a 70%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(225,29,106,0.4))',
          }}
        >
          Happy
        </h1>
        <h1
          className="font-serif italic leading-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 7rem)',
            background: 'linear-gradient(135deg, #a78bfa 0%, #e11d6a 50%, #d4a847 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.5))',
          }}
        >
          Birthday My Jaan 
        </h1>

        <motion.div
          className="flex justify-center gap-3 mt-6 text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {['🌹', '💖', '✨', '💖', '🌹'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Confetti button */}
      <motion.button
        className="glow-btn rounded-full px-8 py-3 font-sans text-sm text-white tracking-widest uppercase mb-10"
        onClick={triggerMore}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎊 More Confetti!
      </motion.button>

      {/* Open letter button */}
      <motion.button
        className="font-serif italic text-lg underline decoration-dotted underline-offset-4 mb-6"
        style={{ color: '#f9a8b8' }}
        onClick={() => { setShowLetter(true); setLetterVisible(true) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.04 }}
      >
        Read my letter to you 💌
      </motion.button>

      {/* Letter modal */}
      <AnimatePresence>
        {letterVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(5,5,13,0.85)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setLetterVisible(false)}
          >
            <motion.div
              className="letter-paper rounded-3xl p-8 md:p-12 max-w-lg w-full relative overflow-y-auto max-h-[85vh]"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            >
              {/* Decorative top */}
              <div className="text-center mb-8">
                <div className="text-3xl mb-2">💌</div>
                <div
                  className="font-sans text-xs tracking-widest uppercase"
                  style={{ color: '#d4a847', opacity: 0.7 }}
                >
                 শুভ জন্মদিন প্রিয় মানুষ 
                </div>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,71,0.3), transparent)' }} />
              </div>

              <div
                className="font-serif text-sm md:text-base leading-relaxed whitespace-pre-line"
                style={{ color: 'rgba(240,230,246,0.85)', lineHeight: 1.9 }}
              >
                {LETTER}
              </div>

              <div className="mt-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,71,0.3), transparent)' }} />

              <div className="text-center mt-6">
                <motion.div
                  className="text-2xl heartbeat inline-block"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  ❤️
                </motion.div>
              </div>

              <button
                className="absolute top-5 right-5 text-xl"
                style={{ color: 'rgba(240,230,246,0.3)', lineHeight: 1 }}
                onClick={() => setLetterVisible(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom */}
      <motion.p
        className="font-serif italic text-sm text-center mt-6"
        style={{ color: 'rgba(240,230,246,0.25)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        For you. Always and forever. 💕
      </motion.p>
    </motion.div>
  )
}
