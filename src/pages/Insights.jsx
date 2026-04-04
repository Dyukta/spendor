import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';

import {
  Award, ArrowUpDown, TrendingUp,
  TrendingDown, PiggyBank, AlertCircle
} from 'lucide-react';

import Header from '../components/layout/Header';
import StatCard from '../components/cards/StatCard';
import InsightCard from '../components/cards/InsightCard';
import { useInsights } from '../hooks/useInsights';
import { formatCurrency } from '../utils/format';

/* Reusable tooltip */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-2 text-xs shadow">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex justify-between">
          <span style={{ color: p.fill || p.color }}>{p.name}</span>
          <span>₹{p.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
};

export default function Insights() {
  const {
    topCategory,
    avgMonthlySpend,
    monthDiff,
    savingsRate,
    spending,
    monthly,
    summary,
  } = useInsights();

  const cards = [
    topCategory && {
      icon: Award,
      title: 'Top Spending Category',
      body: `Highest spend: ${topCategory.name} at ${formatCurrency(topCategory.value)}.`,
      variant: 'warning',
    },
    {
      icon: ArrowUpDown,
      title: 'Avg Monthly Spend',
      body: `You spend ${formatCurrency(avgMonthlySpend)} per month.`,
      variant: 'info',
    },
    monthDiff !== null && {
      icon: monthDiff > 0 ? TrendingUp : TrendingDown,
      title: 'Month-over-Month',
      variant: monthDiff > 0 ? 'negative' : 'positive',
      body:
        monthDiff > 0
          ? `Expenses increased ${Math.abs(monthDiff).toFixed(1)}%.`
          : `Expenses decreased ${Math.abs(monthDiff).toFixed(1)}%.`,
    },
    {
      icon: PiggyBank,
      title: 'Savings Rate',
      body:
        savingsRate >= 20
          ? `${savingsRate}% savings rate — strong.`
          : `${savingsRate}% savings rate. Aim for 20%+.`,
      variant: savingsRate >= 20 ? 'positive' : 'warning',
    },
    summary.balance < 0 && {
      icon: AlertCircle,
      title: 'Negative Balance',
      body: `Balance is ${formatCurrency(summary.balance)}.`,
      variant: 'negative',
    },
  ].filter(Boolean);

  return (
    <>
      <Header
        title="Insights"
        subtitle="Understand your financial patterns"
      />

      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 md:grid-cols-2">
          <StatCard
            label="Savings Rate"
            value={`${savingsRate}%`}
            sub="average"
            accent={savingsRate >= 20 ? '#22c55e' : '#f59e0b'}
          />
          <StatCard
            label="Avg Monthly Spend"
            value={formatCurrency(avgMonthlySpend)}
            sub="per month"
            accent="#3b82f6"
          />
          <StatCard
            label="Total Income"
            value={formatCurrency(summary.income)}
            sub="all time"
            accent="#22c55e"
          />
          <StatCard
            label="Total Expenses"
            value={formatCurrency(summary.expenses)}
            sub="all time"
            accent="#ef4444"
          />
        </div>

        {/* Spending Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <p className="text-sm font-medium mb-3">Spending by Category</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={spending}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />

              <Tooltip content={<ChartTooltip />} />

              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {spending.map((e, i) => (
                  <Cell key={i} fill={e.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <p className="text-sm font-medium mb-3">Monthly Comparison</p>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />

              <Tooltip content={<ChartTooltip />} />

              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div>
          <p className="text-sm font-medium mb-3">Key Observations</p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {cards.map((c, i) => (
              <InsightCard key={i} {...c} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}