import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Sun, Moon, Download} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useRole } from '../../context/RoleContext'
import { useExport } from '../../hooks/useExport'

const NAV = [
  { to: '/',             icon: LayoutDashboard, label: 'Overview'     },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights'     },
]

export default function Sidebar() {
  const { theme, toggle } = useTheme()
  const { role, switchRole, ROLES = {} } = useRole()
  const { exportCSV, exportJSON } = useExport()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <strong>Spendor</strong>
      </div>

      <div className="sidebar-group">
        <span className="sidebar-label">Navigation</span>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to} to={to} end={to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={16} />{label}
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
            <span style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              background: k === 'admin' ? 'var(--green)' : 'var(--amber)',
              display: 'inline-block'
            }} />
            {v.label}
          </button>
        ))}
      </div>

      <div className="sidebar-group">
        <span className="sidebar-label">Actions</span>
        <button className="nav-item" onClick={toggle}>
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="nav-item" onClick={exportCSV}><Download size={14} />Export CSV</button>
        <button className="nav-item" onClick={exportJSON}><Download size={14} />Export JSON</button>
      </div>

      <div className="sidebar-role-card">
        <span className="label-caps">Role</span>
        <strong>{ROLES[role]?.label}</strong>
      </div>
    </aside>
  )
}