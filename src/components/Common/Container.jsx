export default function Container({ children, className='' }) {
  return <div className={`flex-col ${className}`} style={{ gap: 24 }}>{children}</div>
}