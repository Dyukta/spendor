import { createContext, useContext, useState, useEffect } from 'react';

const ROLES = {
  admin: {
    label: 'Admin',
    canAdd: true,
    canEdit: true,
    canDelete: true,
  },
  viewer: {
    label: 'Viewer',
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
};

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || 'admin';
  });

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  const switchRole = (nextRole) => {
    if (!ROLES[nextRole]) return;
    setRole(nextRole);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        permissions: ROLES[role],
        switchRole,
        ROLES
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);