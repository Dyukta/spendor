import { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import Header from '../components/layout/Header'
import SummaryCard from '../components/cards/SummaryCard'
import BalanceChart from '../components/charts/BalanceChart'
import SpendingChart from '../components/charts/SpendingChart'
import Table from '../components/transactions/Table'
import TransactionModal from '../components/transactions/TransactionModal'
import AddBtn from '../components/ui/AddBtn'
import { useInsights } from '../hooks/useInsights'
import { useRole } from '../context/RoleContext'
import { useTransactions } from '../context/TransactionsContext'
import { useToast } from '../components/feedback/Toast'
import { formatCurrency } from '../utils/format'

export default function Dashboard() {
  const { summary, monthly } = useInsights()
  const { permissions } = useRole()
  const { transactions, addTransaction, editTransaction, deleteTransaction } = useTransactions()
  const { toast } = useToast()
  const [modal, setModal] = useState(null)

  const last = monthly.at(-1)
  const prev = monthly.at(-2)
  const delta = (c, p) => p ? ((c - p) / p) * 100 : null
  const incomeDelta  = last && prev ? delta(last.income,   prev.income)   : null
  const expenseDelta = last && prev ? delta(last.expenses, prev.expenses) : null

  const handleSave = (data) => {
    data.id ? editTransaction(data) : addTransaction(data)
    toast(data.id ? 'Transaction updated' : 'Transaction added')
    setModal(null)
  }
  const handleDelete = (id) => {
    if (!confirm('Delete this transaction?')) return
    deleteTransaction(id)
    toast('Transaction deleted', 'error')
  }

  return (
    <>
      <Header
        title="Overview"
        actions={permissions.canAdd && <AddBtn onClick={() => setModal('add')} />}
      />
      <div className="page-body page-stack">
        <div className="page-grid-3">
          <SummaryCard label="Total Balance" value={formatCurrency(summary.balance)}  icon={Wallet}      variant="balance" />
          <SummaryCard label="Total Income"  value={formatCurrency(summary.income)}   icon={TrendingUp}  variant="income"  delta={incomeDelta}  deltaLabel="vs last month" />
          <SummaryCard label="Total Expenses" value={formatCurrency(summary.expenses)} icon={TrendingDown} variant="expense" delta={expenseDelta} deltaLabel="vs last month" />
        </div>

        <div className="page-grid-2">
          <BalanceChart />
          <SpendingChart />
        </div>

        <div>
          <div className="section-header">
            <span className="section-title">Recent Transactions</span>
            {permissions.canAdd && <AddBtn label="Add" onClick={() => setModal('add')} />}
          </div>
          <Table
            transactions={transactions.slice(0, 8)}
            canEdit={permissions.canEdit}
            onEdit={setModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {modal && (
        <TransactionModal
          initial={modal === 'add' ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}