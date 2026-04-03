// src/components/DonutChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS } from '../data/mockData';
import { formatINR } from '../utils/helpers';
import { PieChart as PieIcon } from 'lucide-react';

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{ background:'var(--bg-el)', border:'1px solid var(--bd2)', borderRadius:10, padding:'7px 11px', fontSize:'0.76rem' }}>
      <p style={{ color:'var(--t1)', fontWeight:700 }}>{d.name}</p>
      <p style={{ fontFamily:'var(--fm)', color:d.payload.fill, marginTop:2 }}>{formatINR(d.value)} · {d.payload.pct}%</p>
    </div>
  );
};

// Custom label rendered in the center of the donut
const CenterLabel = ({ cx, cy, total, topName }) => (
  <g>
    <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--t1)"
      style={{ fontSize: '0.82rem', fontWeight: 800, fontFamily: 'var(--fd)' }}>
      {formatINR(total)}
    </text>
    <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--t3)"
      style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
      {topName}
    </text>
  </g>
);

export default function DonutChart({ data }) {
  const top5 = data.slice(0, 5);
  const total = top5.reduce((s, d) => s + d.amount, 0);

  if (!top5.length) return (
    <div className="chart-card">
      <div className="chart-hd"><div className="chart-title">Spending Breakdown</div></div>
      <div className="empty">
        <div className="empty-ico"><PieIcon size={32} strokeWidth={1.5} /></div>
        <div className="empty-h">No expenses yet</div>
      </div>
    </div>
  );

  return (
    <div className="chart-card">
      <div className="chart-hd">
        <div>
          <div className="chart-title">Spending Breakdown</div>
          <div className="chart-sub">By category</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={top5} cx="50%" cy="50%"
            innerRadius={48} outerRadius={68}
            paddingAngle={3} dataKey="amount"
            labelLine={false}
            label={<CenterLabel total={total} topName={top5[0]?.name} />}
          >
            {top5.map(e => <Cell key={e.name} fill={CATEGORY_COLORS[e.name] || '#94a3b8'} stroke="none" />)}
          </Pie>
          <Tooltip content={<Tip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pie-leg">
        {top5.map(item => (
          <div key={item.name} className="pie-leg-row">
            <div className="pie-leg-l">
              <span className="pie-leg-dot" style={{ background: CATEGORY_COLORS[item.name] || '#94a3b8' }} />
              {item.name}
            </div>
            <span className="pie-leg-pct">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
