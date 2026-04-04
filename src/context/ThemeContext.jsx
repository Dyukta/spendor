import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{
      theme,
      toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark')
    }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)