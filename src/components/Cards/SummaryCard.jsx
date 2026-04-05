export default function SummaryCard({ label, value, delta, deltaLabel, icon: Icon, variant = 'default' }) {
  const pos = delta >= 0
  return (
    <div className={`card variant-${variant}`}>
      <div className="card-top">
        <span className="label-caps">{label}</span>
        {Icon && <span className="card-icon"><Icon size={16} /></span>}
      </div>
      <div className="mono value">{value}</div>
      {delta !== undefined && delta !== null && (
        <div className="card-delta">
          <span style={{ color: pos ? 'var(--green)' : 'var(--red)' }}>
            {pos ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}%
          </span>
          {deltaLabel && <span className="card-delta-label">{deltaLabel}</span>}
        </div>
      )}
    </div>
  )
}