import { useState, useEffect, useCallback, useRef } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { CATEGORIES } from '../../data/transactions'


const EMPTY_FORM = {
  desc:     '',
  amount:   '',
  category: CATEGORIES[0],
  type:     'expense',
  date:     new Date().toISOString().slice(0, 10),
}

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Expense' },
  { value: 'income',  label: 'Income'  },
]


function validate(form) {
  const errors = {}
  if (!form.desc.trim())
    errors.desc = 'Description is required'
  if (!form.amount || isNaN(+form.amount) || +form.amount <= 0)
    errors.amount = 'Enter a valid amount greater than 0'
  if (!form.date)
    errors.date = 'Date is required'
  return errors
}

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="label-caps">{label}</label>
      {children}
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

function TypeToggle({ value, onChange }) {
  return (
    <div className="type-toggle" role="group" aria-label="Transaction type">
      {TYPE_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`type-toggle-btn ${opt.value} ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function TransactionModal({ initial, onSave, onClose }) {
  const [form,   setForm]   = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const firstInputRef       = useRef(null)

  const isEdit = Boolean(initial?.id)

  useEffect(() => {
    if (initial) {
      setForm({
        desc:     initial.desc     ?? '',
        amount:   String(Math.abs(initial.amount ?? 0)),
        category: initial.category ?? CATEGORIES[0],
        type:     initial.type     ?? 'expense',
        date:     initial.date     ?? new Date().toISOString().slice(0, 10),
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [initial])


  useEffect(() => {
    const t = setTimeout(() => firstInputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [])

  const setField = useCallback((key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }, [])


  const handleSubmit = useCallback(() => {
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSaving(true)

    const amount = form.type === 'expense'
      ? -Math.abs(+form.amount)
      :  Math.abs(+form.amount)

    const payload = {
      ...form,
      amount,
      ...(isEdit ? { id: initial.id } : {}),
    }


    setTimeout(() => {
      onSave(payload)
      setSaving(false)
    }, 220)
  }, [form, isEdit, initial, onSave])


  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (
        e.key === 'Enter' &&
        e.target.tagName !== 'SELECT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        handleSubmit()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSubmit, onClose])


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal modal-enhanced">

        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className={`modal-icon-badge ${form.type}`}>
              {form.type === 'income' ? '+' : '−'}
            </div>
            <span
              id="modal-title"
              className="display"
              style={{ fontSize: 16, fontWeight: 700 }}
            >
              {isEdit ? 'Edit Transaction' : 'New Transaction'}
            </span>
          </div>
          <button
            className="btn-icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">

          <Field label="Description" error={errors.desc}>
            <input
              ref={firstInputRef}
              className={`field-input ${errors.desc ? 'field-input-error' : ''}`}
              placeholder="e.g. Swiggy Order, Electricity Bill…"
              value={form.desc}
              onChange={e => setField('desc', e.target.value)}
              maxLength={80}
            />
          </Field>


          <div className="modal-row">
            <Field label="Amount (₹)" error={errors.amount}>
              <div className="amount-input-wrap">
                <span className="amount-prefix">₹</span>
                <input
                  className={`field-input amount-input ${errors.amount ? 'field-input-error' : ''}`}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={e => setField('amount', e.target.value)}
                />
              </div>
            </Field>

            <Field label="Type" error={undefined}>
              <TypeToggle
                value={form.type}
                onChange={v => setField('type', v)}
              />
            </Field>
          </div>

  
          <div className="modal-row">
            <Field label="Category" error={undefined}>
              <select
                className="field-input"
                value={form.category}
                onChange={e => setField('category', e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Date" error={errors.date}>
              <input
                className={`field-input ${errors.date ? 'field-input-error' : ''}`}
                type="date"
                value={form.date}
                onChange={e => setField('date', e.target.value)}
              />
            </Field>
          </div>

  
          {form.amount && !isNaN(+form.amount) && +form.amount > 0 && (
            <div className="modal-preview">
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Preview</span>
              <span
                className="mono"
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: form.type === 'income' ? 'var(--green)' : 'var(--red)',
                }}
              >
                {form.type === 'income' ? '+' : '−'}₹{Number(form.amount).toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {form.category}
              </span>
            </div>
          )}

        </div>


        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button
            className={`btn-primary modal-save-btn ${saving ? 'saving' : ''}`}
            onClick={handleSubmit}
            disabled={saving}
            aria-busy={saving}
          >
            {saving ? (
              <>
                <span className="modal-spinner" />
                Saving…
              </>
            ) : (
              <>
                <CheckCircle size={14} />
                {isEdit ? 'Save Changes' : 'Add Transaction'}
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
