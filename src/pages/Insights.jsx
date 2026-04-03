// src/pages/Insights.jsx
import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { computeSummary, computeMonthlyTrend, computeCategoryBreakdown, formatINR } from '../utils/helpers';
import { CATEGORY_COLORS } from '../data/mockData';
import Topbar from '../components/Topbar';
import { Trophy, PiggyBank, BarChart2, Star, AlertTriangle, ThumbsUp, PartyPopper, TrendingDown } from 'lucide-react';

const CARD_THEMES = {
  trophy:  { bg: 'rgba(251,191,36,0.12)',  color: '#f59e0b', border: 'rgba(251,191,36,0.25)'  },
  piggy:   { bg: 'rgba(124,92,252,0.12)',  color: 'var(--accent)', border: 'var(--accent-bd)' },
  chart:   { bg: 'rgba(96,165,250,0.12)',  color: '#60a5fa', border: 'rgba(96,165,250,0.25)'  },
  star:    { bg: 'rgba(52,211,153,0.12)',  color: 'var(--income)', border: 'var(--income-bd)' },
};

function InsCard({ Icon, lbl, val, hint, hintNode, valColor, theme, delay }) {
  return (
    <div className="ins-card" style={{ animationDelay:`${delay}ms` }}>
      <div className="ins-ico" style={{ background: theme.bg, border: `1px solid ${theme.border}`, color: theme.color }}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div className="ins-lbl">{lbl}</div>
      <div className="ins-val" style={valColor ? { color: valColor } : {}}>{val}</div>
      <div className="ins-hint">{hintNode || hint}</div>
    </div>
  );
}

export default function Insights({ onMenuClick }) {
  const { transactions } = useApp();
  const summary  = useMemo(() => computeSummary(transactions), [transactions]);
  const monthly  = useMemo(() => computeMonthlyTrend(transactions), [transactions]);
  const catBreak = useMemo(() => computeCategoryBreakdown(transactions), [transactions]);

  const topCat  = catBreak[0] || null;
  const lastTwo = monthly.slice(-2);
  const prevM   = lastTwo[0] || null;
  const currM   = lastTwo[1] || lastTwo[0] || null;
  const expDelta = prevM && currM ? Math.round(((currM.expenses - prevM.expenses) / (prevM.expenses || 1)) * 100) : 0;
  const saveRate = summary.income > 0 ? Math.round(((summary.income - summary.expenses) / summary.income) * 100) : 0;
  const bestM    = monthly.length ? [...monthly].sort((a,b) => a.expenses - b.expenses)[0] : null;
  const maxInc   = Math.max(...monthly.map(m => m.income), 1);
  const maxCat   = catBreak[0]?.amount || 1;

  const savingsHintNode = (
    <>
      {saveRate >= 30
        ? <PartyPopper size={12} style={{ marginRight:4, display:'inline', verticalAlign:'middle' }} />
        : saveRate >= 10
          ? <ThumbsUp size={12} style={{ marginRight:4, display:'inline', verticalAlign:'middle' }} />
          : <AlertTriangle size={12} style={{ marginRight:4, display:'inline', verticalAlign:'middle' }} />}
      {saveRate >= 30 ? 'Excellent savings rate!' : saveRate >= 10 ? 'Good, room to improve' : 'Consider cutting expenses'}
    </>
  );

  return (
    <>
      <Topbar title="Insights" subtitle="Understand your spending patterns" onMenuClick={onMenuClick} />
      <div className="page-content">
        <h2 className="page-heading">Insights</h2>
        <p className="page-sub">Key observations from your financial data.</p>

        <div className="ins-grid">
          <InsCard Icon={Trophy} lbl="Top Spending Category"
            val={topCat ? topCat.name : '—'}
            hint={topCat ? `${formatINR(topCat.amount)} · ${topCat.pct}% of total expenses` : 'No expense data'}
            theme={CARD_THEMES.trophy} delay={0} />

          <InsCard Icon={PiggyBank} lbl="Savings Rate"
            val={`${saveRate}%`}
            hintNode={savingsHintNode}
            valColor={saveRate >= 30 ? 'var(--income)' : saveRate >= 10 ? 'var(--accent)' : 'var(--expense)'}
            theme={CARD_THEMES.piggy} delay={55} />

          <InsCard Icon={BarChart2} lbl="Month-on-Month Expenses"
            val={`${expDelta > 0 ? '+' : ''}${expDelta}%`}
            hint={currM && prevM
              ? `${currM.label}: ${formatINR(currM.expenses)} vs ${prevM.label}: ${formatINR(prevM.expenses)}`
              : 'Not enough data'}
            valColor={expDelta <= 0 ? 'var(--income)' : 'var(--expense)'}
            theme={CARD_THEMES.chart} delay={110} />

          <InsCard Icon={Star} lbl="Best Month (Lowest Spend)"
            val={bestM ? bestM.label : '—'}
            hint={bestM ? `Only ${formatINR(bestM.expenses)} in expenses` : 'No data yet'}
            theme={CARD_THEMES.star} delay={165} />
        </div>

        {monthly.length > 0 && (
          <div className="monthly-card">
            <div className="section-title">Monthly Breakdown</div>
            <div style={{ fontSize:'0.72rem', color:'var(--t2)', marginTop:3 }}>Income vs Expenses per month</div>
            <div style={{ display:'flex', gap:14, marginTop:11, marginBottom:2 }}>
              {[['var(--income)','Income'],['var(--expense)','Expenses']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.7rem', color:'var(--t2)' }}>
                  <span style={{ width:9, height:9, borderRadius:2, background:c, display:'inline-block' }} />{l}
                </div>
              ))}
            </div>
            <div className="cmp-set">
              {monthly.map(m => (
                <div key={m.month}>
                  <div className="cmp-row">
                    <div className="cmp-month">{m.label.split(' ')[0]}</div>
                    <div className="bar-track"><div className="bar-fill inc" style={{ width:`${(m.income/maxInc)*100}%` }} /></div>
                    <div className="cmp-amt">{formatINR(m.income)}</div>
                  </div>
                  <div className="cmp-row" style={{ marginBottom:6 }}>
                    <div className="cmp-month" />
                    <div className="bar-track"><div className="bar-fill exp" style={{ width:`${(m.expenses/maxInc)*100}%` }} /></div>
                    <div className="cmp-amt">{formatINR(m.expenses)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {catBreak.length > 0 && (
          <div className="cat-card">
            <div className="section-title">Spending by Category</div>
            <div style={{ fontSize:'0.72rem', color:'var(--t2)', marginTop:3 }}>All-time expense breakdown</div>
            <div className="cat-rows">
              {catBreak.map(cat => (
                <div key={cat.name} className="cat-r">
                  <div className="cat-nm">{cat.name}</div>
                  <div className="cat-track">
                    <div className="cat-fill" style={{ width:`${(cat.amount/maxCat)*100}%`, background: CATEGORY_COLORS[cat.name] || 'var(--accent)' }} />
                  </div>
                  <div className="cat-amt">{formatINR(cat.amount)}</div>
                  <div className="cat-pct">{cat.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!transactions.length && (
          <div className="section-card">
            <div className="empty">
              <div className="empty-ico"><TrendingDown size={32} strokeWidth={1.5} /></div>
              <div className="empty-h">No data to analyze</div>
              <div className="empty-p">Add transactions to see insights.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
