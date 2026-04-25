const PETALS = ['🌸', '🌹', '💮', '🌺', '✨', '💫']

export default function FloatingPetals({ count = 12 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const emoji = PETALS[i % PETALS.length]
        const left = `${Math.random() * 100}%`
        const duration = `${8 + Math.random() * 12}s`
        const delay = `${Math.random() * 10}s`
        const size = `${0.8 + Math.random() * 0.8}rem`
        return (
          <span
            key={i}
            className="petal"
            style={{
              left,
              fontSize: size,
              animationDuration: duration,
              animationDelay: delay,
            }}
          >
            {emoji}
          </span>
        )
      })}
    </>
  )
}
