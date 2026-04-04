import { CATEGORY_COLORS } from '../../data/transactions'
import { formatCurrency, formatDate } from '../../utils/format'

export default function Row({ txn, canEdit, onEdit, onDelete }) {
  const exp = txn.type === 'expense'

  return (
    <tr className="row">
      <td className="td" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{formatDate(txn.date)}</td>
      <td className="td" style={{ fontWeight: 500 }}>{txn.desc}</td>
      <td className="td">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: CATEGORY_COLORS[txn.category] ?? '#888', flexShrink: 0 }} />
          {txn.category}
        </span>
      </td>
      <td className="td">
        <span className={`badge ${exp ? 'badge-expense' : 'badge-income'}`}>
          {exp ? 'Expense' : 'Income'}
        </span>
      </td>
      <td className="td" style={{ textAlign: 'right' }}>
        <span className={`mono ${exp ? 'amount-neg' : 'amount-pos'}`} style={{ fontSize: 14, fontWeight: 500 }}>
          {formatCurrency(txn.amount)}
        </span>
      </td>
      {canEdit && (
        <td className="td">
          <div className="row-actions">
            <button className="icon-btn" onClick={() => onEdit(txn)} title="Edit">✎</button>
            <button className="icon-btn" onClick={() => onDelete(txn.id)} title="Delete"
              style={{ '--hover-bg': 'var(--red-bg)', '--hover-color': 'var(--red)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-bg)'; e.currentTarget.style.color = 'var(--red)' }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '' }}>✕</button>
          </div>
        </td>
      )}
    </tr>
  )
}