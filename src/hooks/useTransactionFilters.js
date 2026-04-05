import { useState, useMemo } from 'react';
import { useTransactions } from '../context/TransactionsContext';

export const useTransactionFilters = () => {
  const { transactions } = useTransactions();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const filtered = useMemo(() => {
    let list = [...transactions];

    // FIXED SEARCH (safe + correct field)
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        (t.desc || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q)
      );
    }

    if (category !== 'all') {
      list = list.filter((t) => t.category === category);
    }

    if (type !== 'all') {
      list = list.filter((t) => t.type === type);
    }

    const [field, dir] = sortBy.split('-');

list.sort((a, b) => {
  let va = a[field];
  let vb = b[field];

  if (field === 'date') {
    va = new Date(va);
    vb = new Date(vb);
  }

  if (va === vb) return 0;

  return dir === 'asc'
    ? va > vb ? 1 : -1
    : va < vb ? 1 : -1;
});

    return list;
  }, [transactions, search, category, type, sortBy]);

  return {
    filtered,
    search,
    setSearch,
    category,
    setCategory,
    type,
    setType,
    sortBy,
    setSortBy,
  };
};