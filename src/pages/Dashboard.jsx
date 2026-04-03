// src/pages/Dashboard.jsx
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { computeSummary, computeMonthlyTrend, computeCategoryBreakdown, formatINR } from '../utils/helpers';
import SummaryCard        from '../components/SummaryCard';
import TrendChart         from '../components/TrendChart';
import DonutChart         from '../components/DonutChart';
import TransactionTable   from '../components/TransactionTable';
import Topbar             from '../components/Topbar';
import SkeletonDashboard  from '../components/SkeletonDashboard';
import { Wallet, ArrowUpCircle, ArrowDownCircle, ArrowRight } from 'lucide-react';

export default function Dashboard({ onMenuClick }) {
  const { transactions } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const summary = useMemo(() => computeSummary(transactions), [transactions]);
  const monthly = useMemo(() => computeMonthlyTrend(transactions), [transactions]);
  const catData = useMemo(() => computeCategoryBreakdown(transactions), [transactions]);

  const trendInfo = useMemo(() => {
    if (monthly.length < 2) return null;
    const curr = monthly[monthly.length - 1];
    const prev = monthly[monthly.length - 2];
    const diff = prev.expenses > 0 ? Math.abs(Math.round(((curr.expenses - prev.expenses) / prev.expenses) * 100)) : 0;
    return { dir: curr.expenses < prev.expenses ? 'up' : 'down', pct: diff };
  }, [monthly]);

  const incomeSpark  = monthly.slice(-6).map(m => m.income);
  const expenseSpark = monthly.slice(-6).map(m => m.expenses);
  const balanceSpark = monthly.slice(-6).map(m => m.income - m.expenses);

  const today = new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' });

  return (
    <>
      <Topbar title="Dashboard" subtitle={`Good to see you — ${today}`} onMenuClick={onMenuClick} />
      {loading ? <SkeletonDashboard /> : (
        <div className="page-content">
          <h2 className="page-heading">Overview</h2>
          <p className="page-sub">Your financial snapshot at a glance.</p>

          <div className="sum-grid">
            <SummaryCard type="balance" label="Net Balance" amount={summary.balance}
              icon={<Wallet size={18} strokeWidth={1.8} />}
              hint={`${formatINR(summary.income)} in · ${formatINR(summary.expenses)} out`}
              sparkData={balanceSpark} delay={0} />
            <SummaryCard type="income" label="Total Income" amount={summary.income}
              icon={<ArrowUpCircle size={18} strokeWidth={1.8} />}
              trend="this period" trendDir="up"
              hint={`${transactions.filter(t => t.type==='income').length} transactions`}
              sparkData={incomeSpark} delay={55} />
            <SummaryCard type="expense" label="Total Expenses" amount={summary.expenses}
              icon={<ArrowDownCircle size={18} strokeWidth={1.8} />}
              trend={trendInfo ? `${trendInfo.pct}% vs last month` : null} trendDir={trendInfo?.dir}
              hint={`${transactions.filter(t => t.type==='expense').length} transactions`}
              sparkData={expenseSpark} delay={110} />
          </div>

          <div className="charts-row">
            <TrendChart data={monthly} />
            <DonutChart data={catData} />
          </div>

          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">Recent Transactions</div>
              <button className="view-all" onClick={() => navigate('/transactions')}>
                View all <ArrowRight size={13} strokeWidth={2} style={{ marginLeft: 3 }} />
              </button>
            </div>
            <TransactionTable transactions={transactions} compact />
          </div>
        </div>
      )}
    </>
  );
}
