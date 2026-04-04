import { useTransactions } from '../context/TransactionsContext';

export const useExport = () => {
  const { transactions } = useTransactions();

  const download = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Title', 'Category', 'Type', 'Amount'];

    const rows = transactions.map((t) =>
      [t.id, t.date, `"${t.title}"`, t.category, t.type, t.amount].join(',')
    );

    download(
      [headers.join(','), ...rows].join('\n'),
      'transactions.csv',
      'text/csv'
    );
  };

  const exportJSON = () => {
    download(
      JSON.stringify(transactions, null, 2),
      'transactions.json',
      'application/json'
    );
  };

  return { exportCSV, exportJSON };
};