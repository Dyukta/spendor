import { createContext, useContext, useReducer, useEffect } from 'react'
import { SEED_TRANSACTIONS } from '../data/transactions'

const KEY = 'txns'
const Ctx = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': return [{ ...action.payload, id: Date.now() }, ...state]
    case 'EDIT': return state.map(t => t.id === action.payload.id ? action.payload : t)
    case 'DELETE': return state.filter(t => t.id !== action.id)
    case 'RESET': return SEED_TRANSACTIONS
    default: return state
  }
}

const init = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || SEED_TRANSACTIONS }
  catch { return SEED_TRANSACTIONS }
}

export const TransactionsProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, [], init)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(transactions))
  }, [transactions])

  const api = {
    transactions,
    add: t => dispatch({ type: 'ADD', payload: t }),
    edit: t => dispatch({ type: 'EDIT', payload: t }),
    remove: id => dispatch({ type: 'DELETE', id }),
    reset: () => dispatch({ type: 'RESET' }),
  }

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export const useTransactions = () => useContext(Ctx)