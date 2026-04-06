import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Sun, Moon, RotateCcw } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useRole } from '../../context/RoleContext'
import { useTransactions } from '../../context/TransactionsContext'

const NAV = [
  { to: '/',             icon: LayoutDashboard, label: 'Overview'     },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights'     },
]

export default function Sidebar() {
  const { theme, toggle } = useTheme()
  const { role, switchRole, ROLES = {} } = useRole()
  const { resetTransactions } = useTransactions()

  return (
    <aside className="sidebar">

      {/* ── Brand ── */}
      <div className="sidebar-brand">
        <strong>Spendor</strong>
      </div>

      <div className="sidebar-group">
        <span className="sidebar-label">Navigation</span>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-group">
        <span className="sidebar-label">Role</span>
        {Object.entries(ROLES).map(([k, v]) => (
          <button
            key={k}
            onClick={() => switchRole(k)}
            className={`nav-item${role === k ? ' role-active' : ''}`}
          >
            <span className={`role-dot ${k}`} />
            {v.label}
          </button>
        ))}
      </div>

      <div className="sidebar-group">
        <span className="sidebar-label">Actions</span>
        <button className="nav-item" onClick={toggle}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <button
        className="nav-item danger"
        onClick={() => {
          if (confirm('Reset to demo data?')) resetTransactions()
        }}
      >
        <RotateCcw size={15} />
        Reset
      </button>

      <div style={{ marginTop: 'auto' }}>
        <div className="sidebar-role-card">
          <span className="label-caps">Active Role</span>
          <strong>{ROLES[role]?.label ?? role}</strong>
        </div>
      </div>

    </aside>
  )
}