import { CATEGORY_COLORS } from '../data/transactions'
import { formatMonth } from './format'

export const calcSummary = (txns) => {
  let income = 0, expenses = 0

  for (const t of txns || []) {
    if (t.type === 'income') income += t.amount
    else expenses += Math.abs(t.amount)
  }

  return { income, expenses, balance: income - expenses }
}

export const calcInsights = (txns) => {
  const months = {}
  const categories = {}

  for (const t of txns || []) {
    const key = t.date?.slice(0, 7) || 'unknown'
    const m = months[key] ?? (months[key] = { month: key, income: 0, expenses: 0 })

    if (t.type === 'income') m.income += t.amount
    else {
      const val = Math.abs(t.amount) || 0
      m.expenses += val
      categories[t.category] = (categories[t.category] || 0) + val
    }
  }

  const monthly = Object.values(months)
    .sort((a,b) => a.month.localeCompare(b.month))
    .map(m => ({
      ...m,
      label: formatMonth(m.month + '-01'),
      balance: m.income - m.expenses
    }))

  const spending = Object.entries(categories)
    .map(([name, value]) => ({
      name,
      value: Number(value) || 0,
      fill: CATEGORY_COLORS[name] || '#888'
    }))
    .sort((a, b) => b.value - a.value)

  const last2 = monthly.slice(-2)

  return {
    monthly,
    spending,
    topCategory: spending[0] || null,
    avgMonthlySpend: monthly.length
      ? Math.round(monthly.reduce((s,m) => s + m.expenses, 0) / monthly.length)
      : 0,
    monthDiff: last2.length === 2
      ? ((last2[1].expenses - last2[0].expenses) / (last2[0].expenses || 1)) * 100
      : null,
    savingsRate: monthly.length
      ? Math.round(
          monthly.reduce((s,m) => s + (m.income ? (m.income - m.expenses)/m.income : 0), 0)
          / monthly.length * 100
        )
      : 0,
  }
}