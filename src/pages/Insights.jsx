import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Award, ArrowUpDown, TrendingUp, TrendingDown, PiggyBank, AlertCircle } from 'lucide-react'
import Header from '../components/layout/Header'
import StatCard from '../components/cards/StatCard'
import InsightCard from '../components/cards/InsightCard'
import { useInsights } from '../hooks/useInsights'
import { formatCurrency } from '../utils/format'

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="chart-tooltip-row mono" style={{ color: p.fill || p.color }}>
          <span>{p.name}</span>
          <span>₹{p.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  )
}

export default function Insights() {
  const { topCategory, avgMonthlySpend, monthDiff, savingsRate, spending, monthly, summary } = useInsights()

  const cards = [
    topCategory && {
      icon: Award, title: 'Top Spending Category', variant: 'warning',
      body: `Highest spend: ${topCategory.name} at ${formatCurrency(-topCategory.value)}.`,
    },
    {
      icon: ArrowUpDown, title: 'Avg Monthly Spend', variant: 'info',
      body: `You spend ${formatCurrency(-avgMonthlySpend)} per month on average.`,
    },
    monthDiff !== null && {
      icon: monthDiff > 0 ? TrendingUp : TrendingDown,
      title: 'Month-over-Month',
      variant: monthDiff > 0 ? 'negative' : 'positive',
      body: monthDiff > 0
        ? `Expenses rose ${Math.abs(monthDiff).toFixed(1)}% vs last month.`
        : `↓ ${Math.abs(monthDiff).toFixed(1)}% decrease  Great job!`
    },
    {
      icon: PiggyBank, title: 'Savings Rate',
      variant: savingsRate >= 20 ? 'positive' : 'warning',
      body: savingsRate >= 20
        ? `${savingsRate}% savings rate — above the recommended 20%.`
        : `${savingsRate}% savings rate. Aim for 20%+.`,
    },
    summary.balance < 0 && {
      icon: AlertCircle, title: 'Negative Balance', variant: 'negative',
      body: `Total balance is ${formatCurrency(summary.balance)}.`,
    },
  ].filter(Boolean)

  return (
    <>
      <Header title="Insights" subtitle="Understand your spending patterns" />
      <div className="page-body page-stack">

        <div className="page-grid-4">
          <StatCard label="Savings Rate"      value={`${savingsRate}%`}               sub="average"   accent={savingsRate >= 20 ? 'var(--green)' : 'var(--amber)'} />
          <StatCard label="Avg Monthly Spend" value={formatCurrency(-avgMonthlySpend)} sub="per month"  accent="var(--blue)"  />
          <StatCard label="Total Income"      value={formatCurrency(summary.income)}   sub="all time"   accent="var(--green)" />
          <StatCard label="Total Expenses"    value={formatCurrency(summary.expenses)} sub="all time"   accent="var(--red)"   />
        </div>

        <div>
          <div className="section-header">
            <span className="section-title">Spending by Category</span>
          </div>
          <div className="surface chart-card">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={spending} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name"
                  tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                  axisLine={false} tickLine={false}
                  angle={-30} textAnchor="end" interval={0} />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={48} />
                <Tooltip content={<ChartTip />} cursor={{ fill: 'var(--bg-hover)' }} />
                <Bar dataKey="value" name="Spent" radius={[4,4,0,0]}>
                  {spending.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="section-header">
            <span className="section-title">Monthly Comparison</span>
          </div>
          <div className="surface chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthly} barCategoryGap="30%" margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="label"
                  tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                  axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={48} />
                <Tooltip content={<ChartTip />} cursor={{ fill: 'var(--bg-hover)' }} />
                <Bar dataKey="income"   name="Income"   fill="#4ade80" radius={[3,3,0,0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="section-header">
            <span className="section-title">Key Observations</span>
          </div>
          <div className="page-grid-2">
            {cards.map((c, i) => <InsightCard key={i} {...c} />)}
          </div>
        </div>

      </div>
    </>
  )
}