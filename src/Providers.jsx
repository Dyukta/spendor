import { ThemeProvider } from './context/ThemeContext'
import { RoleProvider } from './context/RoleContext'
import { TransactionsProvider } from './context/TransactionsContext'
import { ToastProvider } from './components/feedback/Toast'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <RoleProvider>
        <TransactionsProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </TransactionsProvider>
      </RoleProvider>
    </ThemeProvider>
  )
}