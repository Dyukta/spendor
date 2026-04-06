import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useInsights } from '../../hooks/useInsights'
import { formatCurrency } from '../../utils/format'

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null

const item = payload[0]

const total = spending.reduce((s, e) => s + e.value, 0)

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{item.name}</div>
      <div className="chart-tooltip-row mono">
        <span>Amount</span>
        <span>{formatCurrency(-item.value)}</span>
      </div>
    </div>
  )
}

export default function SpendingChart() {
  const { spending } = useInsights()

  if (!spending.length) return null

  const max = Math.max(...spending.map(s => s.value))

  return (
    <div className="surface chart-card">
      <div className="chart-card-header">
        <span className="chart-title">Spending Breakdown</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>

          <Pie
            data={spending}
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={95}
            dataKey="value"
            paddingAngle={3}
            strokeWidth={0}
          >
            {spending.map((e, i) => (
              <Cell
                key={i}
                fill={e.fill}
                opacity={e.value === max ? 1 : 0.6}
              />
            ))}
          </Pie>

          {/* CENTER LABEL */}
          <text x="50%" y="41%" textAnchor="middle" dominantBaseline="middle"
  style={{ fontSize: 11, fill: 'var(--text-muted)' }}>
  Total
</text>
<text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
  className="mono"
  style={{ fontSize: 13, fontWeight: 700, fill: 'var(--text-primary)' }}>
  ₹{total.toLocaleString('en-IN')}
</text>

          <Tooltip content={<Tip />} />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}