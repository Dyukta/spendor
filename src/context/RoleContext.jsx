import { createContext, useContext, useState, useEffect } from 'react'

const DEFAULT_ROLES = {
  admin: { label: 'Admin', canAdd: true, canEdit: true, canDelete: true },
  viewer: { label: 'Viewer', canAdd: false, canEdit: false, canDelete: false },
}

const RoleContext = createContext({
  role: 'admin',
  ROLES: DEFAULT_ROLES,
  permissions: DEFAULT_ROLES.admin,
  switchRole: () => {}
})

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'admin')

  useEffect(() => {
    localStorage.setItem('role', role)
  }, [role])

  const switchRole = (nextRole) => {
    if (!DEFAULT_ROLES[nextRole]) return
    setRole(nextRole)
  }

  return (
    <RoleContext.Provider
      value={{
        role,
        ROLES: DEFAULT_ROLES,
        permissions: DEFAULT_ROLES[role] ?? {},
        switchRole
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => useContext(RoleContext)