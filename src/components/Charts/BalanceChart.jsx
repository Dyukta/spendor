import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { useInsights } from '../../hooks/useInsights'

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="chart-tooltip-row mono" style={{ color: p.color }}>
          <span>{p.name}</span>
          <span>₹{p.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceChart() {
  const { monthly } = useInsights()
  return (
    <div className="surface chart-card">
      <div className="chart-card-header">
        <span className="chart-title">Balance Trend</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f87171" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false} tickLine={false}
            tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={48} />
          <Tooltip content={<Tip />} />
          <Legend iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 8, color: 'var(--text-secondary)' }} />
          <Area type="monotone" dataKey="income"   name="Income"
            stroke="#4ade80" strokeWidth={2} fill="url(#gI)" dot={false} activeDot={{ r: 4 }} />
          <Area type="monotone" dataKey="expenses" name="Expenses"
            stroke="#f87171" strokeWidth={2} fill="url(#gE)" dot={false} activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}