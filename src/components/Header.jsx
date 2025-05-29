export default function Header() {
  return (
    <header style={{
      backgroundColor: '#1E40AF',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px'
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>ForxAI</h1>
      <button style={{
        backgroundColor: 'white',
        color: '#1E40AF',
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer'
      }}>
        Login
      </button>
    </header>
  );
}
