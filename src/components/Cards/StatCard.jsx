export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className="surface stat-card" style={{ borderLeftColor: accent ?? 'var(--border)' }}>
      <span className="label-caps">{label}</span>
      <span className="mono stat-value">{value}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  )
}