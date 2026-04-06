import { useMemo } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import { calcInsights, calcSummary } from '../utils/calc'

export const useInsights = () => {
  const { transactions } = useTransactions() || { transactions: [] }

  return useMemo(() => {
    const insights = calcInsights(transactions || [])
    const summary = calcSummary(transactions || [])

    return { ...insights, summary }
  }, [transactions])
}