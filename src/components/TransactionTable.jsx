// src/components/TransactionTable.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatDate, sortTransactions } from '../utils/helpers';
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Search, Pencil, Trash2 } from 'lucide-react';

const COLS = [
  { key:'date',        label:'Date'        },
  { key:'description', label:'Description' },
  { key:'category',    label:'Category'    },
  { key:'type',        label:'Type'        },
  { key:'amount',      label:'Amount'      },
];

export default function TransactionTable({ transactions, onEdit, compact = false }) {
  const { role, deleteTransaction } = useApp();
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = key => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted    = sortTransactions(transactions, sortKey, sortDir);
  const displayed = compact ? sorted.slice(0, 5) : sorted;

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown size={11} style={{ opacity: 0.35 }} />;
    return sortDir === 'asc'
      ? <ArrowUp size={11} style={{ opacity: 0.7 }} />
      : <ArrowDown size={11} style={{ opacity: 0.7 }} />;
  };

  if (!displayed.length) return (
    <div className="empty">
      <div className="empty-ico"><Search size={32} strokeWidth={1.5} /></div>
      <div className="empty-h">No transactions found</div>
      <div className="empty-p">Try adjusting your filters or adding a transaction.</div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP TABLE (hidden on mobile via CSS) ── */}
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              {COLS.map(c => (
                <th
                  key={c.key}
                  className={compact ? '' : 'sort'}
                  onClick={compact ? undefined : () => handleSort(c.key)}
                >
                  <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                    {c.label}
                    {!compact && <SortIcon col={c.key} />}
                  </span>
                </th>
              ))}
              {role === 'admin' && !compact && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayed.map(txn => (
              <tr key={txn.id} className="tbl-row">
                <td className="td-date">{formatDate(txn.date)}</td>
                <td className="td-desc">{txn.description}</td>
                <td><span className="cat-chip">{txn.category}</span></td>
                <td>
                  <span className={`type-chip ${txn.type}`}>
                    {txn.type === 'income'
                      ? <TrendingUp  size={11} strokeWidth={2.2} style={{ marginRight:4 }} />
                      : <TrendingDown size={11} strokeWidth={2.2} style={{ marginRight:4 }} />}
                    {txn.type}
                  </span>
                </td>
                <td>
                  <span className={`td-amt ${txn.type}`}>
                    {txn.type === 'income' ? '+' : '-'}{formatINR(txn.amount)}
                  </span>
                </td>
                {role === 'admin' && !compact && (
                  <td>
                    <div className="row-acts">
                      <button className="act-btn" onClick={() => onEdit(txn)}>
                        <Pencil size={13} strokeWidth={2} style={{ marginRight:4 }} />Edit
                      </button>
                      <button
                        className="act-btn del"
                        onClick={() => window.confirm('Delete this transaction?') && deleteTransaction(txn.id)}
                      >
                        <Trash2 size={13} strokeWidth={2} style={{ marginRight:4 }} />Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE CARDS (hidden on desktop via CSS) ── */}
      <div className="txn-cards">
        {displayed.map(txn => (
          <div key={txn.id} className="txn-card">

            {/* Top row: description + amount */}
            <div className="txn-card-top">
              <span className="txn-card-desc">{txn.description}</span>
              <span className={`txn-card-amount ${txn.type}`}>
                {txn.type === 'income' ? '+' : '-'}{formatINR(txn.amount)}
              </span>
            </div>

            {/* Meta row: category chip, type chip, date */}
            <div className="txn-card-meta">
              <span className="cat-chip">{txn.category}</span>
              <span className={`type-chip ${txn.type}`}>
                {txn.type === 'income'
                  ? <TrendingUp  size={10} strokeWidth={2.2} style={{ marginRight:3 }} />
                  : <TrendingDown size={10} strokeWidth={2.2} style={{ marginRight:3 }} />}
                {txn.type}
              </span>
              <span className="txn-card-date">{formatDate(txn.date)}</span>
            </div>

            {/* Actions — admin only, non-compact only */}
            {role === 'admin' && !compact && (
              <div className="txn-card-actions">
                <button className="act-btn" onClick={() => onEdit(txn)}>
                  <Pencil size={13} strokeWidth={2} style={{ marginRight:4 }} />Edit
                </button>
                <button
                  className="act-btn del"
                  onClick={() => window.confirm('Delete this transaction?') && deleteTransaction(txn.id)}
                >
                  <Trash2 size={13} strokeWidth={2} style={{ marginRight:4 }} />Delete
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </>
  );
}