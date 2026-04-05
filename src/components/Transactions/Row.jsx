import { CATEGORY_COLORS } from '../../data/transactions'
import { formatCurrency, formatDate } from '../../utils/format'
import { Pencil, Trash2 } from 'lucide-react'

export default function Row({ txn, canEdit, onEdit, onDelete }) {
  const exp = txn.type === 'expense'

  return (
    <tr className="row">
      <td className="td">{formatDate(txn.date)}</td>

      <td className="td td-strong">
        {txn.desc}
      </td>

      <td className="td">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: CATEGORY_COLORS[txn.category] ?? '#888'
          }} />
          {txn.category}
        </span>
      </td>

      <td className="td">
        <span className={`badge ${exp ? 'badge-expense' : 'badge-income'}`}>
          {exp ? 'Expense' : 'Income'}
        </span>
      </td>

      <td className="td td-right">
        <span className={`mono amount ${exp ? 'expense' : 'income'}`}>
          {exp ? '−' : '+'}{formatCurrency(Math.abs(txn.amount))}
        </span>
      </td>


      {canEdit && (
        <td className="td actions-cell">
          <button className="icon-btn edit" onClick={() => onEdit(txn)}>
            <Pencil size={14} />
          </button>
          <button className="icon-btn delete" onClick={() => onDelete(txn.id)}>
            <Trash2 size={14} />
          </button>
        </td>
      )}
    </tr>
  )
}