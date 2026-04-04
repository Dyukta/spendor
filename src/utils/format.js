export const formatCurrency = (n = 0) =>
  `₹${Math.abs(n).toLocaleString('en-IN')}`

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

export const formatMonth = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric'
  })