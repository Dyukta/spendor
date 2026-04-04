import { Pencil, Trash2 } from 'lucide-react'

export default function RowActions({ onEdit, onDelete }) {
  return (
    <div className="row-actions">
      <button className="icon-btn" onClick={onEdit}>
        <Pencil size={13} />
      </button>
      <button className="icon-btn" onClick={onDelete}>
        <Trash2 size={13} />
      </button>
    </div>
  )
}