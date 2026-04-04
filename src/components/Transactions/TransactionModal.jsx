import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../../data/transactions'

const EMPTY = {
  desc: '', amount: '', category: CATEGORIES[0],
  type: 'expense', date: new Date().toISOString().slice(0, 10)
}

export default function TransactionModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial ? { ...initial, amount: Math.abs(initial.amount).toString() } : EMPTY)
    setErrors({})
  }, [initial])

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.desc.trim())                                         e.desc   = 'Required'
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0) e.amount = 'Enter valid amount'
    if (!form.date)                                                e.date   = 'Required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const submit = () => {
    if (!validate()) return
    const amount = form.type === 'expense' ? -Math.abs(+form.amount) : Math.abs(+form.amount)
    onSave({ ...form, amount, ...(initial ? { id: initial.id } : {}) })
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <span className="display" style={{ fontSize: 16, fontWeight: 700 }}>
            {initial ? 'Edit Transaction' : 'Add Transaction'}
          </span>
          <button className="btn-icon" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal-body">
          <div className="field">
            <label className="label-caps">Description</label>
            <input className="field-input" placeholder="e.g. Swiggy Order"
              value={form.desc} onChange={e => set('desc', e.target.value)} />
            {errors.desc && <span className="field-error">{errors.desc}</span>}
          </div>

          <div className="modal-row">
            <div className="field">
              <label className="label-caps">Amount (₹)</label>
              <input className="field-input" type="number" min="0"
                value={form.amount} onChange={e => set('amount', e.target.value)} />
              {errors.amount && <span className="field-error">{errors.amount}</span>}
            </div>
            <div className="field">
              <label className="label-caps">Type</label>
              <select className="field-input" value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="modal-row">
            <div className="field">
              <label className="label-caps">Category</label>
              <select className="field-input" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="label-caps">Date</label>
              <input className="field-input" type="date"
                value={form.date} onChange={e => set('date', e.target.value)} />
              {errors.date && <span className="field-error">{errors.date}</span>}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit}>
            {initial ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}