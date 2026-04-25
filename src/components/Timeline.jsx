import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ✏️  Replace these with your real memories!
const MEMORIES = [
  {
    id: 1,
    emoji: "☕",
    date: "31 july",
    title: "৩১-০৭-২০২৪",
    desc: "রাত ১০ঃ৫০ বুধবার ছিলো যেদিন তুমি আমাকে প্রথমবার,  I Love you  বলছো, জানো অইদিন খুব খুশি হইছিলাম। যেই মানুষ টাকে এত ভালোবাসি,তার থেকে প্রথমবার শুনা টা কত খুশির গো।",
    color: "#d4a847",
  },
  {
    id: 2,
    emoji: "🌙",
    date: "That Long Night",
    title: "সারারাত তুমার সাথে জাগনা।", 
    desc: "তুমার সাথে প্রজেক্ট করতে গিয়ে সারারাত জাগনা ছিলাম আমরা ২ জন, জানো অইরাত টাকে মিস করি, অইরাত টা আমার জন্যে স্পেশাল।", 
    color: "#a78bfa",
  },
  {
    id: 3,
    emoji: "🌊",
    date: "Our Second Meet",
    title: "আমার লাইফের সেরা জার্নি",
    desc: "আমার কাছে দ্বিতীয় মিট বেস্ট ছিলো, যেখানে তুমাকে ছুতে পেরেছি, বউ বউ লাগছে। আর জার্নিটা ছিলো অন্যরকম স্পেশাল। সারারাত জাগনা , আর তুমার সাথে দেখা হবে ইস এককথায় অন্যরকম ", 
    color: "#38bdf8", 
  },
  {
    id: 4,
    emoji: "🍕",
    date: "Phone",
    title: "ফোনে কথা বলা ",
    desc: "আমার খুব খুব ভাল্লাগে তুমার সাথে যখন ফোনে কথা বলি, আমাকে অনেক অনেক গল্প শুনাও খুব ভাল্লাগে। আর আগে মাঝে মাঝে গান শুনাতে অইটা মিস করি",
    color: "#f97316",
  },

];

function MemoryCard({ memory, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} w-full max-w-2xl mx-auto`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          {/* Glow accent */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${isLeft ? '100% 0%' : '0% 0%'}, ${memory.color}22, transparent 60%)`,
            }}
          />
          <div
            className="text-xs font-sans tracking-widest uppercase mb-2"
            style={{ color: memory.color, opacity: 0.8 }}
          >
            {memory.date}
          </div>
          <h3 className="font-serif text-sm md:text-lg mb-2" style={{ color: '#f9d0de' }}>
            {memory.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(240,230,246,0.6)' }}>
            {memory.desc}
          </p>
        </div>
      </div>

      {/* Center node */}
      <motion.div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{ width: 56, height: 56 }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: `radial-gradient(circle, ${memory.color}33, ${memory.color}11)`,
            border: `2px solid ${memory.color}55`,
            boxShadow: `0 0 20px ${memory.color}44`,
          }}
        >
          {memory.emoji}
        </div>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="flex-1" />
    </motion.div>
  )
}

export default function Timeline({ onReveal }) {
  return (
    <motion.div
      className="relative z-10 min-h-screen py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#e11d6a' }}>
          Our Story
        </p>
        <h1 className="font-serif text-4xl md:text-6xl shimmer-text mb-4">
          The Journey of Us
        </h1>
        <p className="font-sans text-sm" style={{ color: 'rgba(240,230,246,0.4)' }}>
          Every moment together, a treasure kept forever
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div
          className="timeline-line absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
          style={{ width: 2 }}
        />

        <div className="flex flex-col gap-14">
          {MEMORIES.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} />
          ))}
        </div>
      </div>

      {/* CTA button */}
      <motion.div
        className="flex justify-center mt-24 mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          onClick={onReveal}
          className="relative font-serif text-xl md:text-2xl px-4 py-2 rounded-full text-white overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #9d174d, #e11d6a, #7c3aed)',
            backgroundSize: '200% 200%',
            boxShadow: '0 0 40px rgba(225,29,106,0.5), 0 10px 30px rgba(0,0,0,0.4)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 70px rgba(225,29,106,0.7)' }}
          whileTap={{ scale: 0.97 }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Click for the final surprise!
            <span className="heartbeat inline-block">💖</span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
