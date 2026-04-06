import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 700) {
  const [display, setDisplay] = useState(target)
  const prevRef  = useRef(target)
  const rafRef   = useRef(null)

  useEffect(() => {

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const start = prevRef.current
    const diff  = target - start
    if (diff === 0) return

    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * eased))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        prevRef.current = target
        rafRef.current  = null
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return display
}


function formatAnimated(n) {
  return `₹${Math.abs(n).toLocaleString('en-IN')}`
}


export default function SummaryCard({ label,value,rawValue,delta,deltaLabel,icon: Icon,variant = 'default'}) {
  const animated     = useCountUp(rawValue ?? 0)
  const displayValue = rawValue !== undefined && rawValue !== null
    ? formatAnimated(animated)
    : value


  const hasDelta = delta !== undefined && delta !== null
  const isPos    = hasDelta && delta >= 0

  const isExpenseVariant = variant === 'expense'
  const deltaGood = isExpenseVariant ? !isPos : isPos
  const deltaColor = deltaGood ? 'var(--green)' : 'var(--red)'
  const deltaArrow = isPos ? '↑' : '↓'

  return (
    <div className={`card variant-${variant} summary-card-animated`}>
      
      <div className="card-top">
        <span className="label-caps">{label}</span>
        {Icon && (
          <span className="card-icon">
            <Icon size={16} />
          </span>
        )}
      </div>

  
      <div
        className="mono value summary-card-value"
        aria-label={`${label}: ${displayValue}`}
      >
        {displayValue}
      </div>

  
      {hasDelta && (
        <div className="card-delta">
          <span
            className="card-delta-pct"
            style={{ color: deltaColor }}
          >
            {deltaArrow} {Math.abs(delta).toFixed(1)}%
          </span>
          {deltaLabel && (
            <span className="card-delta-label">{deltaLabel}</span>
          )}
        </div>
      )}


      {!hasDelta && <div style={{ height: 20 }} />}
    </div>
  )
}
