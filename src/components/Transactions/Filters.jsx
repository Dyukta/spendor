import { Search, X } from 'lucide-react'
import { CATEGORIES } from '../../data/transactions'

export default function Filters({ search, setSearch, category, setCategory, type, setType, sortBy, setSortBy }) {
  const dirty = search || category !== 'all' || type !== 'all'

  return (
    <div className="filters-bar">
      <div className="search-wrap">
        <Search size={14} className="search-icon" />
        <input
          className="field-input search-input"
          placeholder="Search transactions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}><X size={12} /></button>
        )}
      </div>

      <select className="field-input" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select className="field-input" style={{ width: 'auto' }} value={type} onChange={e => setType(e.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select className="field-input" style={{ width: 'auto' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </select>

      {dirty && (
        <button className="btn-ghost" onClick={() => { setSearch(''); setCategory('all'); setType('all') }}>
          <X size={12} /> Clear
        </button>
      )}
    </div>
  )
}