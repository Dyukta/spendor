export default function Section({ title, actions, children, className='' }) {
  return (
    <section className={`flex-col ${className}`} style={{ gap: 14 }}>
      {(title || actions) && (
        <div className="section-header">
          {title && <h2 className="section-title display">{title}</h2>}
          {actions && <div className="flex" style={{ gap: 8 }}>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}