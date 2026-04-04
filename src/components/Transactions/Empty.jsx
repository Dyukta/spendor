import { SearchX } from 'lucide-react'

export default function Empty() {
  return (
    <tr><td colSpan={10}>
      <div className="empty-state">
        <SearchX size={32} strokeWidth={1.2} />
        <span>No transactions </span>
        <small>Try adjusting the search or filters above</small>
      </div>
    </td></tr>
  )
}