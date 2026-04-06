export default function Header({ title, actions }) {
  return (
    <header className="header">
      <div>
        <h1 className="display">{title}</h1>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  )
}