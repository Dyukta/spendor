export default function SummaryCard({ label, value, delta, deltaLabel, icon: Icon, variant = 'default' }) {
  const pos = delta >= 0
  return (
    <div className={`surface card variant-${variant}`}>
      <div className="flex-between">
        <span className="label-caps">{label}</span>
        {Icon && <span className="card-icon"><Icon size={16} /></span>}
      </div>
      <div className="mono value">{value}</div>
      {delta !== undefined && (
        <div style={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: pos ? 'var(--green)' : 'var(--red)' }}>
            {pos ? '↑' : '↓'} {Math.abs(delta).toFixed(1)}%
          </span>
          {deltaLabel && <span style={{ color: 'var(--text-muted)' }}>{deltaLabel}</span>}
        </div>
      )}
    </div>
  )
}