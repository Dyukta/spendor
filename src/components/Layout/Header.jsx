export default function Header({ title, subtitle, actions }) {
  return (
    <header className="header">
      <div>
        <h1 className="display">{title}</h1>
        {subtitle && <p className="text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </header>
  )
}