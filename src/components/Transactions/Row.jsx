import { CATEGORY_COLORS } from '../../data/transactions'
import { formatCurrency, formatDate } from '../../utils/format'

export default function Row({ txn, canEdit, onEdit, onDelete }) {
  const exp = txn.type === 'expense'
  return (
    <tr className="row">
      <td className="td" style={{ color: 'var(--text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
        {formatDate(txn.date)}
      </td>
      <td className="td" style={{ fontWeight: 600 }}>{txn.desc}</td>
      <td className="td">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: CATEGORY_COLORS[txn.category] ?? '#888',
            flexShrink: 0, display: 'inline-block'
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
        <span
          className="mono"
          style={{
            fontSize: 14, fontWeight: 600,
            color: exp ? 'var(--red)' : 'var(--green)'
          }}
        >
          {exp ? '−' : '+'}{formatCurrency(Math.abs(txn.amount))}
        </span>
      </td>
      {canEdit && (
        <td className="td">
          <div className="row-actions">
            <button className="icon-btn" onClick={() => onEdit(txn)} title="Edit">✎</button>
            <button className="icon-btn danger" onClick={() => onDelete(txn.id)} title="Delete">✕</button>
          </div>
        </td>
      )}
    </tr>
  )
}