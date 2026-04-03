// src/components/AddTransactionModal.jsx
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { X, TrendingUp, TrendingDown, Plus, Save } from 'lucide-react';

const EMPTY = { description:'', amount:'', category:'Food', type:'expense', date:new Date().toISOString().split('T')[0] };

export default function AddTransactionModal({ editTarget, onClose }) {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [err, setErr]   = useState('');
  const isEdit = Boolean(editTarget);

  useEffect(() => {
    setForm(editTarget ? { ...editTarget, amount: String(editTarget.amount) } : EMPTY);
  }, [editTarget]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    setErr('');
    if (!form.description.trim()) return setErr('Description is required.');
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) return setErr('Enter a valid positive amount.');
    if (!form.date) return setErr('Date is required.');
    const payload = { ...form, amount: amt };
    isEdit ? editTransaction(payload) : addTransaction(payload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">{isEdit ? 'Edit Transaction' : 'New Transaction'}</div>
          <button className="modal-x" onClick={onClose}><X size={16} strokeWidth={2.2} /></button>
        </div>

        <div className="fg">
          <label className="fg-lbl">Type</label>
          <div className="type-row">
            <button className={`type-btn income ${form.type === 'income' ? 'on' : ''}`} onClick={() => set('type','income')}>
              <TrendingUp size={14} strokeWidth={2} style={{ marginRight: 6 }} />Income
            </button>
            <button className={`type-btn expense ${form.type === 'expense' ? 'on' : ''}`} onClick={() => set('type','expense')}>
              <TrendingDown size={14} strokeWidth={2} style={{ marginRight: 6 }} />Expense
            </button>
          </div>
        </div>

        <div className="fg">
          <label className="fg-lbl">Description</label>
          <input className="fg-input" placeholder="e.g. Monthly Salary" value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div className="fg-2">
          <div className="fg">
            <label className="fg-lbl">Amount (₹)</label>
            <input className="fg-input" type="number" min="1" placeholder="0" value={form.amount} onChange={e => set('amount', e.target.value)} />
          </div>
          <div className="fg">
            <label className="fg-lbl">Date</label>
            <input className="fg-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
        </div>

        <div className="fg">
          <label className="fg-lbl">Category</label>
          <select className="fg-sel" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {err && <div className="fg-err">{err}</div>}

        <div className="modal-ftr">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" onClick={submit}>
            {isEdit
              ? <><Save size={14} strokeWidth={2} style={{ marginRight: 6 }} />Save Changes</>
              : <><Plus size={14} strokeWidth={2.2} style={{ marginRight: 6 }} />Add Transaction</>}
          </button>
        </div>
      </div>
    </div>
  );
}
