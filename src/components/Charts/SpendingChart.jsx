import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useInsights } from '../../hooks/useInsights'
import { formatCurrency } from '../../utils/format'

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{payload[0].name}</div>
      <div className="chart-tooltip-row mono">{formatCurrency(-payload[0].value)}</div>
    </div>
  )
}

export default function SpendingChart() {
  const { spending } = useInsights()
  if (!spending.length) return null
  return (
    <div className="surface chart-card">
      <div className="chart-card-header">
        <span className="chart-title">Spending Breakdown</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={spending} cx="50%" cy="45%"
            innerRadius={65} outerRadius={95}
            dataKey="value" paddingAngle={3} strokeWidth={0}
          >
            {spending.map((e, i) => <Cell key={i} fill={e.fill} />)}
          </Pie>
          <Tooltip content={<Tip />} />
          <Legend
            iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}