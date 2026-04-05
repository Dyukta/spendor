import { createContext, useContext, useReducer, useEffect } from 'react'
import { SEED_TRANSACTIONS } from '../data/transactions'

const KEY = 'txns'
const TransactionsContext = createContext()

// ---------------- REDUCER ----------------
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload, id: crypto.randomUUID() }, ...state]

    case 'EDIT':
      return state.map(t =>
        t.id === action.payload.id ? action.payload : t
      )

    case 'DELETE':
      return state.filter(t => t.id !== action.id)

    case 'RESET':
      return SEED_TRANSACTIONS

    default:
      return state
  }
}

// ---------------- INIT ----------------
const init = () => {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : SEED_TRANSACTIONS
  } catch {
    return SEED_TRANSACTIONS
  }
}

// ---------------- PROVIDER ----------------
export const TransactionsProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, [], init)

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(transactions))
  }, [transactions])

  // API (matches your usage everywhere)
  const value = {
    transactions,

    addTransaction: (data) =>
      dispatch({ type: 'ADD', payload: data }),

    editTransaction: (data) =>
      dispatch({ type: 'EDIT', payload: data }),

    deleteTransaction: (id) =>
      dispatch({ type: 'DELETE', id }),

    resetTransactions: () =>
      dispatch({ type: 'RESET' }),
  }

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

// ---------------- HOOK ----------------
export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  if (!context) {
    throw new Error('useTransactions must be used within TransactionsProvider')
  }

  return context
}