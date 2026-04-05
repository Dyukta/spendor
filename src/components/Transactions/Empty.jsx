import { SearchX } from 'lucide-react'

export default function Empty() {
  return (
    <tr><td colSpan={6}>
      <div className="empty-state">
        <SearchX size={32} strokeWidth={1.2} />
        <span>No transactions yet </span>
        <small>Add your first transaction to get started</small>
      </div>
    </td></tr>
  )
}
