// src/components/TrendChart.jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatINR } from '../utils/helpers';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'var(--bg-el)', border:'1px solid var(--bd2)', borderRadius:10, padding:'9px 13px', fontSize:'0.78rem' }}>
      <p style={{ color:'var(--t2)', marginBottom:6, fontWeight:600 }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display:'flex', gap:7, alignItems:'center', marginBottom:3 }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:p.color, display:'inline-block' }} />
          <span style={{ color:'var(--t2)', textTransform:'capitalize' }}>{p.name}:</span>
          <span style={{ fontFamily:'var(--fm)', color:'var(--t1)', fontWeight:700 }}>{formatINR(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function TrendChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-hd">
        <div>
          <div className="chart-title">Balance Trend</div>
          <div className="chart-sub">Monthly income & expense overview</div>
        </div>
        <div className="chart-leg">
          <div className="leg-i"><span className="leg-dot" style={{ background:'var(--income)' }} />Income</div>
          <div className="leg-i"><span className="leg-dot" style={{ background:'var(--expense)' }} />Expenses</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={data} margin={{ top:4, right:4, left:0, bottom:0 }}>
          <defs>
            <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--income)"  stopOpacity={0.22} />
              <stop offset="95%" stopColor="var(--income)"  stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--expense)" stopOpacity={0.18} />
              <stop offset="95%" stopColor="var(--expense)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(128,128,128,0.07)" strokeDasharray="0" />
          <XAxis dataKey="label" tick={{ fill:'var(--t3)', fontSize:11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill:'var(--t3)', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={46} />
          <Tooltip content={<Tip />} cursor={{ stroke:'var(--bd2)' }} />
          <Area type="monotone" dataKey="income"   stroke="var(--income)"  strokeWidth={2} fill="url(#gInc)" dot={false} activeDot={{ r:4, fill:'var(--income)',  stroke:'var(--bg-card)', strokeWidth:2 }} />
          <Area type="monotone" dataKey="expenses" stroke="var(--expense)" strokeWidth={2} fill="url(#gExp)" dot={false} activeDot={{ r:4, fill:'var(--expense)', stroke:'var(--bg-card)', strokeWidth:2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
