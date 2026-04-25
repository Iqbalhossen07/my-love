import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Starfield from './components/Starfield'
import FloatingPetals from './components/FloatingPetals'
import LockScreen from './components/LockScreen'
import Timeline from './components/Timeline'
import GrandReveal from './components/GrandReveal'

// Phase states
const PHASES = {
  LOCK: 'lock',
  TIMELINE: 'timeline',
  REVEAL: 'reveal',
}

export default function App() {
  const [phase, setPhase] = useState(PHASES.LOCK)

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#05050d' }}>
      {/* Always-on background layers */}
      <Starfield />
      <FloatingPetals count={phase === PHASES.REVEAL ? 20 : 10} />

      {/* Radial background glow that shifts per phase */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-1000"
        style={{
          background:
            phase === PHASES.LOCK
              ? 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(225,29,106,0.07) 0%, transparent 70%)'
              : phase === PHASES.TIMELINE
              ? 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 90% 60% at 50% 40%, rgba(225,29,106,0.12) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
        }}
      />

      {/* Phase rendering with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {phase === PHASES.LOCK && (
          <LockScreen key="lock" onUnlock={() => setPhase(PHASES.TIMELINE)} />
        )}
        {phase === PHASES.TIMELINE && (
          <Timeline key="timeline" onReveal={() => setPhase(PHASES.REVEAL)} />
        )}
        {phase === PHASES.REVEAL && (
          <GrandReveal key="reveal" />
        )}
      </AnimatePresence>
    </div>
  )
}
