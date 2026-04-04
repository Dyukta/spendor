import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

const Ctx = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === 'success' ? <CheckCircle size={15} /> : <XCircle size={15} />}
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}>
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)