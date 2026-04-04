import { useState } from 'react';

import Header from '../components/layout/Header';
import Filters from '../components/transactions/Filters';
import Table from '../components/transactions/Table';
import TransactionModal from '../components/transactions/TransactionModal';
import AddBtn from '../components/ui/AddBtn';
import ExportBtn from '../components/ui/ExportBtn';

import { useTransactionFilters } from '../hooks/useTransactions';
import { useRole } from '../context/RoleContext';
import { useTransactions } from '../context/TransactionsContext';
import { useToast } from '../components/feedback/Toast';

export default function Transactions() {
  const { permissions } = useRole();
  const { addTransaction, editTransaction, deleteTransaction } = useTransactions();
  const { toast } = useToast();

  const filters = useTransactionFilters();
  const [modal, setModal] = useState(null);

  const handleSave = (data) => {
    if (data.id) {
      editTransaction(data);
      toast('Transaction updated');
    } else {
      addTransaction(data);
      toast('Transaction added');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this transaction?')) return;
    deleteTransaction(id);
    toast('Transaction deleted', 'error');
  };

  return (
    <>
      <Header
        title="Transactions"
        subtitle={`${filters.filtered.length} transactions`}
        actions={
          <div className="flex gap-2">
            <ExportBtn />
            {permissions.canAdd && (
              <AddBtn onClick={() => setModal('add')} />
            )}
          </div>
        }
      />

      <div className="p-6 space-y-4">

        {/* Filters */}
        <Filters {...filters} />

        {/* Table */}
        <div className="min-h-[300px]">
          <Table
            transactions={filters.filtered}
            canEdit={permissions.canEdit}
            onEdit={setModal}
            onDelete={handleDelete}
          />
        </div>

        {/* Viewer Notice */}
        {!permissions.canAdd && (
          <div className="text-sm bg-amber-100 border border-amber-400 text-amber-600 rounded-md px-4 py-3">
            You're viewing as <span className="font-semibold">Viewer</span>.
            Switch to Admin in the sidebar to make changes.
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
  );
}