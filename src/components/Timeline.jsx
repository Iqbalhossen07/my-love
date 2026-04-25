import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MEMORIES = [
  {
    id: 1,
    emoji: "☕",
    date: "31 july",
    title: "৩১-০৭-২০২৪",
    desc: "রাত ১০ঃ৫০ বুধবার ছিলো যেদিন তুমি আমাকে প্রথমবার, I Love you বলছো, জানো অইদিন খুব খুশি হইছিলাম। যেই মানুষ টাকে এত ভালোবাসি,তার থেকে প্রথমবার শুনা টা কত খুশির গো।",
    color: "#d4a847",
  },
  {
    id: 2,
    emoji: "🌙",
    date: "That Long Night",
    title: "সারারাত তুমার সাথে জাগনা।",
    desc: "তুমার সাথে প্রজেক্ট করতে গিয়ে সারারাত জাগনা ছিলাম আমরা ২ জন, জানো অইরাত টাকে মিস করি, অইরাত টা আমার জন্যে স্পেশাল।",
    color: "#a78bfa",
  },
  {
    id: 3,
    emoji: "🌊",
    date: "Our Second Meet",
    title: "আমার লাইফের সেরা জার্নি",
    desc: "আমার কাছে দ্বিতীয় মিট বেস্ট ছিলো, যেখানে তুমাকে ছুতে পেরেছি, বউ বউ লাগছে। আর জার্নিটা ছিলো অন্যরকম স্পেশাল। সারারাত জাগনা , আর তুমার সাথে দেখা হবে ইস এককথায় অন্যরকম ",
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  // মোবাইলে সবসময় একপাশে দেখাবে, বড় স্ক্রিনে ডানে-বামে (Left-Right) হবে
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      // md:flex-row-reverse দিয়ে বড় স্ক্রিনে অল্টারনেট করা হয়েছে, মোবাইলে সবসময় একই দিকে থাকবে
      className={`relative flex items-center md:items-start gap-4 md:gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} w-full max-w-2xl mx-auto px-2 md:px-0`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card */}
      <div
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}
      >
        <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${isLeft ? "100% 0%" : "0% 0%"}, ${memory.color}22, transparent 60%)`,
            }}
          />
          <div
            className="text-[10px] md:text-xs font-sans tracking-widest uppercase mb-1 md:mb-2"
            style={{ color: memory.color, opacity: 0.8 }}
          >
            {memory.date}
          </div>
          <h3
            className="font-serif text-sm md:text-lg mb-2"
            style={{ color: "#f9d0de" }}
          >
            {memory.title}
          </h3>
          <p
            className="font-sans text-xs md:text-sm leading-relaxed"
            style={{ color: "rgba(240,230,246,0.6)" }}
          >
            {memory.desc}
          </p>
        </div>
      </div>

      {/* Center node - ইমোজি সার্কেল মোবাইলে একটু ছোট করা হয়েছে */}
      <motion.div
        className="relative flex-shrink-0 flex items-center justify-center z-20"
        style={{ width: 40, height: 40 }} // মোবাইলের জন্য ডিফল্ট সাইজ
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
      >
        <div
          className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl"
          style={{
            background: `radial-gradient(circle, ${memory.color}33, ${memory.color}11)`,
            border: `2px solid ${memory.color}55`,
            boxShadow: `0 0 15px ${memory.color}44`,
            backgroundColor: "#1a1a1a", // ইমোজি যেন লাইনের উপরে ক্লিয়ার থাকে
          }}
        >
          {memory.emoji}
        </div>
      </motion.div>

      {/* Spacer for opposite side - মোবাইলে হাইড করে দেওয়া হয়েছে */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export default function Timeline({ onReveal }) {
  return (
    <motion.div
      className="relative z-10 min-h-screen py-10 md:py-20 px-4 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12 md:mb-20"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p
          className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "#e11d6a" }}
        >
          Our Story
        </p>
        <h1 className="font-serif text-3xl md:text-6xl shimmer-text mb-4 px-2">
          The Journey of Us
        </h1>
        <p
          className="font-sans text-xs md:text-sm px-4"
          style={{ color: "rgba(240,230,246,0.4)" }}
        >
          Every moment together, a treasure kept forever
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line - মোবাইলে ডান পাশে সরানো হয়েছে ইমোজির সাথে মিল রেখে */}
        <div
          className="timeline-line absolute left-[calc(100%-20px)] md:left-1/2 top-0 bottom-0 -translate-x-1/2 opacity-30 md:opacity-100"
          style={{ width: 2 }}
        />

        <div className="flex flex-col gap-10 md:gap-14">
          {MEMORIES.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} />
          ))}
        </div>
      </div>

      {/* CTA button */}
      <motion.div
        className="flex justify-center mt-16 md:mt-24 mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          onClick={onReveal}
          className="relative font-serif text-lg md:text-2xl px-6 py-3 rounded-full text-white overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #9d174d, #e11d6a, #7c3aed)",
            backgroundSize: "200% 200%",
            boxShadow: "0 0 30px rgba(225,29,106,0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            backgroundPosition: {
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <span className="relative z-10 flex items-center gap-2 md:gap-3">
            Click for the final surprise!
            <span className="heartbeat inline-block">💖</span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
