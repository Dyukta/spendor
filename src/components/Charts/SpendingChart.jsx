import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { useInsights } from '../../hooks/useInsights'
import { formatCurrency } from '../../utils/format'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="chart-tooltip-row mono">
          <span>{p.name}</span>
          <span>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function SpendingChart() {
  const { spending } = useInsights()

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <span className="chart-title">Spending by Category</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={spending} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />

          <XAxis
            dataKey="name"
            angle={-30}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />

          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {spending.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}