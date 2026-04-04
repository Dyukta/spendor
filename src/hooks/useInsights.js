import { useMemo } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import { calcInsights, calcSummary } from '../utils/calc'

export const useInsights = () => {
  const { transactions } = useTransactions()

  return useMemo(() => ({
    ...calcInsights(transactions),
    summary: calcSummary(transactions)
  }), [transactions])
}