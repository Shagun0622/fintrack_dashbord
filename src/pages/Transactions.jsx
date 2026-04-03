// src/pages/Transactions.jsx
import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { applyFilters, computeSummary, getMonthKey, getMonthLabel, formatINR } from '../utils/helpers';
import { CATEGORIES } from '../data/mockData';
import TransactionTable    from '../components/TransactionTable';
import AddTransactionModal from '../components/AddTransactionModal';
import Topbar              from '../components/Topbar';
import { Download, Plus, Search, X } from 'lucide-react';

export default function Transactions({ onMenuClick }) {
  const { transactions, role, filters, setFilter, clearFilters } = useApp();
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const monthOptions = useMemo(() => {
    const keys = [...new Set(transactions.map(t => getMonthKey(t.date)))].sort().reverse();
    return keys.map(k => ({ key: k, label: getMonthLabel(k + '-01') }));
  }, [transactions]);

  const filtered = useMemo(() => applyFilters(transactions, filters), [transactions, filters]);
  const summary  = useMemo(() => computeSummary(filtered), [filtered]);
  const hasFilters = filters.search || filters.category !== 'all' || filters.type !== 'all' || filters.month !== 'all';

  const openEdit   = txn => { setEditTarget(txn); setShowModal(true); };
  const closeModal = ()  => { setShowModal(false); setEditTarget(null); };

  const exportCSV = () => {
    const rows = filtered.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join('\n');
    const blob = new Blob(['Date,Description,Category,Type,Amount\n' + rows], { type:'text/csv' });
    const a = Object.assign(document.createElement('a'), { href:URL.createObjectURL(blob), download:'transactions.csv' });
    a.click(); URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <Topbar title="Transactions" subtitle={`${filtered.length} records`} onMenuClick={onMenuClick} />
      <div className="page-content">

        {/* PAGE HEADER */}
        <div className="txn-page-header">
          <div>
            <h2 className="page-heading">Transactions</h2>
            <p className="page-sub" style={{ marginBottom:0 }}>Track and manage all your financial activity.</p>
          </div>

          {/* No inline styles — CSS handles all sizing & responsiveness */}
          <div className="txn-header-actions">
            <button className="export-btn" onClick={exportCSV}>
              <Download size={14} strokeWidth={2} style={{ marginRight:5 }} />CSV
            </button>

            {role === 'admin' && (
              <button
                className="add-btn"
                onClick={() => { setEditTarget(null); setShowModal(true); }}
              >
                <Plus size={15} strokeWidth={2.2} style={{ marginRight:4 }} />Add
              </button>
            )}
          </div>
        </div>

        <div className="filters-wrap">
          <div className="srch-wrap">
            <span className="srch-ico"><Search size={14} strokeWidth={2} /></span>
            <input className="srch-input" type="text" placeholder="Search description or category…"
              value={filters.search} onChange={e => setFilter({ search: e.target.value })} />
          </div>
          <select className="f-sel" value={filters.category} onChange={e => setFilter({ category: e.target.value })}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="f-sel" value={filters.type} onChange={e => setFilter({ type: e.target.value })}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="f-sel" value={filters.month} onChange={e => setFilter({ month: e.target.value })}>
            <option value="all">All Months</option>
            {monthOptions.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>
          {hasFilters && (
            <button className="clear-btn" onClick={clearFilters}>
              <X size={13} strokeWidth={2.5} style={{ marginRight:4 }} />Clear
            </button>
          )}
        </div>

        {hasFilters && (
          <div className="filter-sum">
            <span className="fs-item">Showing <span className="fs-val">{filtered.length}</span> records</span>
            <span className="fs-item">Income: <span className="fs-inc">{formatINR(summary.income)}</span></span>
            <span className="fs-item">Expenses: <span className="fs-exp">{formatINR(summary.expenses)}</span></span>
          </div>
        )}

        <div className="section-card">
          <TransactionTable transactions={filtered} onEdit={openEdit} />
        </div>
      </div>

      {showModal && <AddTransactionModal editTarget={editTarget} onClose={closeModal} />}
    </>
  );
}