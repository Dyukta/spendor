export const CATEGORIES = [
  'Food & Dining','Bills & Utilities','Transportation',
  'Shopping','Entertainment','Healthcare',
  'Salary','Freelance','Investment',
]

export const CATEGORY_COLORS = {
  'Food & Dining': '#f472b6',
  'Bills & Utilities': '#60a5fa',
  Transportation: '#f87171',
  Shopping: '#fbbf24',
  Entertainment: '#a78bfa',
  Healthcare: '#34d399',
  Salary: '#4ade80',
  Freelance: '#22d3ee',
  Investment: '#818cf8',
}

export const SEED_TRANSACTIONS = [
  { id:1, date:'2025-10-03', desc:'Salary', category:'Salary', amount:5500, type:'income' },
  { id:2, date:'2025-10-05', desc:'Food', category:'Food & Dining', amount:-340, type:'expense' },
  { id:3, date:'2025-10-07', desc:'Electricity', category:'Bills & Utilities', amount:-1200, type:'expense' },
]