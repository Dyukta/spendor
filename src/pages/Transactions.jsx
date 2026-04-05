import { useState } from 'react'
import Header from '../components/layout/Header'
import Filters from '../components/transactions/Filters'
import Table from '../components/transactions/Table'
import TransactionModal from '../components/transactions/TransactionModal'
import AddBtn from '../components/ui/AddBtn'
import { useTransactionFilters } from '../hooks/useTransactions'
import { useRole } from '../context/RoleContext'
import { useTransactions } from '../context/TransactionsContext'
import { useToast } from '../components/feedback/Toast'

export default function Transactions() {
  const { permissions } = useRole()
  const { addTransaction, editTransaction, deleteTransaction } = useTransactions()
  const { toast } = useToast()
  const filters = useTransactionFilters()
  const [modal, setModal] = useState(null)

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
        title="Transactions"
        subtitle={`${filters.filtered.length} transactions`}
        actions={
          <div className="flex gap-2">
            {permissions.canAdd && <AddBtn onClick={() => setModal('add')} />}
          </div>
        }
      />
      <div className="page-body page-stack">
        <Filters {...filters} />
        <Table
          transactions={filters.filtered}
          canEdit={permissions.canEdit}
          onEdit={setModal}
          onDelete={handleDelete}
        />
        {!permissions.canAdd && (
          <div className="viewer-notice">
            Viewing as <strong>Viewer</strong> : switch to Admin in the sidebar to make changes.
          </div>
        )}
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