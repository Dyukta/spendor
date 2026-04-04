export default function AddBtn({ onClick, label='Add' }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      + {label}
    </button>
  )
}