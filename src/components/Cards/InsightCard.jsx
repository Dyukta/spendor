export default function InsightCard({ icon: Icon, title, body, variant = 'default' }) {
  return (
    <div className={`insight-card variant-${variant}`}>
      {Icon && <div className="icon-box"><Icon size={18} /></div>}
      <div>
        <div className="insight-title">{title}</div>
        <div className="insight-body">{body}</div>
      </div>
    </div>
  )
}