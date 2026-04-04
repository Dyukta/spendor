import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useInsights } from '../../hooks/useInsights';

export default function BalanceChart() {
  const { monthly } = useInsights();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
      
      <div className="mb-3">
        <p className="text-sm font-medium">Balance Trend</p>
        <p className="text-xs text-gray-400">Income vs Expenses</p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={monthly}>
          
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          {/* ✅ FIXED TOOLTIP */}
          <Tooltip
            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
          />

          <Legend iconSize={8} />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            fill="url(#income)"
            strokeWidth={2}
            dot={false}
          />

          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            fill="url(#expense)"
            strokeWidth={2}
            dot={false}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}