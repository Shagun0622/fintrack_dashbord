// src/utils/helpers.js

/** Format a number as Indian Rupees */
export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

/** Format date string to readable format */
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

/** Get "Mon YYYY" label from date string */
export const getMonthLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', { month: 'short' }) + ' ' + d.getFullYear();
};

/** Get "YYYY-MM" key from date string for grouping */
export const getMonthKey = (dateStr) => dateStr.slice(0, 7);

/**
 * Compute summary stats from a list of transactions.
 * Returns { income, expenses, balance }
 */
export const computeSummary = (transactions) => {
  const income   = transactions.filter(t => t.type === 'income' ).reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

/**
 * Group transactions by month and compute monthly income/expense totals.
 * Returns array sorted oldest→newest.
 */
export const computeMonthlyTrend = (transactions) => {
  const map = {};
  transactions.forEach(t => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { month: key, label: getMonthLabel(t.date), income: 0, expenses: 0 };
    if (t.type === 'income')  map[key].income   += t.amount;
    if (t.type === 'expense') map[key].expenses += t.amount;
  });
  return Object.values(map)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(m => ({ ...m, balance: m.income - m.expenses }));
};

/**
 * Compute spending per category (expense only).
 * Returns array sorted descending by amount.
 */
export const computeCategoryBreakdown = (transactions) => {
  const map = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  const total = Object.values(map).reduce((s, v) => s + v, 0);
  return Object.entries(map)
    .map(([name, amount]) => ({ name, amount, pct: total > 0 ? Math.round((amount / total) * 100) : 0 }))
    .sort((a, b) => b.amount - a.amount);
};

/** Filter transactions based on filter state */
export const applyFilters = (transactions, filters) => {
  let result = [...transactions];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);
  if (filters.type     !== 'all') result = result.filter(t => t.type     === filters.type);
  if (filters.month    !== 'all') result = result.filter(t => getMonthKey(t.date) === filters.month);
  return result;
};

/** Sort transactions */
export const sortTransactions = (transactions, sortKey, sortDir) => {
  return [...transactions].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    if (sortKey === 'date')   { aVal = new Date(aVal); bVal = new Date(bVal); }
    if (sortKey === 'amount') { aVal = Number(aVal);   bVal = Number(bVal);   }
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ?  1 : -1;
    return 0;
  });
};

/** Generate unique numeric ID */
export const genId = () => Date.now() + Math.floor(Math.random() * 1000);
