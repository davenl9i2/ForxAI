const pairs = ['USD/JPY', 'EUR/USD', 'USD/CHF', 'GBP/USD', 'CAD/USD'];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '140px',
        backgroundColor: '#f3f4f6',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100vh',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}
    >
      {pairs.map((pair) => (
        <button
          key={pair}
          disabled={pair !== 'USD/JPY'}
          style={{
            padding: '10px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: pair === 'USD/JPY' ? '#1E40AF' : '#ccc',
            color: pair === 'USD/JPY' ? '#fff' : '#666',
            cursor: pair === 'USD/JPY' ? 'pointer' : 'not-allowed'
          }}
        >
          {pair}
        </button>
      ))}
    </aside>
  );
}
