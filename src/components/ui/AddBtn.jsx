export default function AddBtn({ onClick, label = 'Add Transaction' }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      + {label}
    </button>
  )
}