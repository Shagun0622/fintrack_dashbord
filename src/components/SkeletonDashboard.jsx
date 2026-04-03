// src/components/SkeletonDashboard.jsx
export default function SkeletonDashboard() {
  return (
    <div className="page-content" style={{ pointerEvents: 'none' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="skeleton" style={{ height: 22, width: 120, borderRadius: 6, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 13, width: 220, borderRadius: 6 }} />
      </div>

      <div className="sum-grid" style={{ marginBottom: 20 }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="skeleton-card">
            <div className="skeleton sk-h" />
            <div className="skeleton sk-v" />
            <div className="skeleton sk-s" />
          </div>
        ))}
      </div>

      <div className="charts-row" style={{ marginBottom: 20 }}>
        <div className="skeleton-card" style={{ flex: 2, height: 280 }} />
        <div className="skeleton-card" style={{ flex: 1, height: 280 }} />
      </div>

      <div className="skeleton-card">
        <div className="skeleton sk-h" style={{ marginBottom: 20 }} />
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ display:'flex', gap:12, marginBottom:12, alignItems:'center' }}>
            <div className="skeleton" style={{ height:11, width:'12%', borderRadius:4 }} />
            <div className="skeleton" style={{ height:11, width:'30%', borderRadius:4 }} />
            <div className="skeleton" style={{ height:11, width:'15%', borderRadius:4 }} />
            <div className="skeleton" style={{ height:11, width:'10%', borderRadius:4 }} />
            <div className="skeleton" style={{ height:11, width:'15%', borderRadius:4, marginLeft:'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
