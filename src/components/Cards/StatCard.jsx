export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat-card" style={{ borderLeftColor: accent ?? 'var(--accent)' }}>
      <span className="label-caps">{label}</span>
      <span className="mono stat-value">{value}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  )
}