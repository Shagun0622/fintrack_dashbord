// src/components/SummaryCard.jsx
import { formatINR } from '../utils/helpers';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

export default function SummaryCard({ type, amount, label, icon, trend, trendDir, hint, sparkData, delay = 0 }) {
  const sparkColor = type === 'income' ? 'var(--income)' : type === 'expense' ? 'var(--expense)' : 'var(--accent)';
  const sparkHex   = type === 'income' ? '#2dd4a0'       : type === 'expense' ? '#ff5370'        : '#7c5cfc';

  return (
    <div className={`sum-card ${type}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="sum-row">
        <div className={`sum-icon ${type}`}>{icon}</div>
        {trend && (
          <span className={`sum-badge ${trendDir}`}>
            {trendDir === 'up'
              ? <TrendingUp size={11} strokeWidth={2.5} style={{ marginRight: 3, display: 'inline' }} />
              : <TrendingDown size={11} strokeWidth={2.5} style={{ marginRight: 3, display: 'inline' }} />}
            {trend}
          </span>
        )}
      </div>
      <div className="sum-lbl">{label}</div>
      <div className={`sum-val ${type}`}>{formatINR(amount)}</div>
      {hint && <div className="sum-hint">{hint}</div>}
      {sparkData && sparkData.length > 1 && (
        <div className="sum-spark">
          <Sparklines data={sparkData} height={32} margin={2}>
            <SparklinesLine color={sparkHex} style={{ fill: 'none', strokeWidth: 1.8 }} />
            <SparklinesSpots size={2} style={{ fill: sparkHex }} />
          </Sparklines>
        </div>
      )}
    </div>
  );
}
