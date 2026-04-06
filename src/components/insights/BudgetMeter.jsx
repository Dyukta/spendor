// Simple monthly budget progress bars
// Add to Insights page below the stat cards

const BUDGETS = {
  'Food & Dining': 3000,
  'Bills & Utilities': 2000,
  'Transportation': 1500,
  'Shopping': 2500,
}

export default function BudgetMeter({ spending }) {
  const current = Object.fromEntries(spending.map(s => [s.name, s.value]))

  return (
    <div className="surface" style={{ padding: '20px 24px' }}>
      <div className="section-header" style={{ marginBottom: 16 }}>
        <span className="section-title">Monthly Budgets</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>vs suggested limits</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {Object.entries(BUDGETS).map(([cat, limit]) => {
          const spent = current[cat] || 0
          const pct = Math.min((spent / limit) * 100, 100)
          const over = spent > limit
          return (
            <div key={cat}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{cat}</span>
                <span style={{
                  fontSize: 12, fontFamily: 'var(--font-mono)',
                  color: over ? 'var(--red)' : 'var(--text-muted)'
                }}>
                  ₹{spent.toLocaleString('en-IN')} / ₹{limit.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{
                height: 6, borderRadius: 3,
                background: 'var(--bg-surface-alt)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  borderRadius: 3,
                  background: over ? 'var(--red)' : pct > 75 ? 'var(--amber)' : 'var(--green)',
                  transition: 'width 600ms cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}