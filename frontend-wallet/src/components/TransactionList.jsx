import React from 'react';

// Agora ele recebe 'transactions' e 'refresh' como propriedades (props)
function TransactionList({ transactions, refresh }) {
  return (
    <div className="card">
      <h3>📄 Extrato Recente</h3>
      <button onClick={refresh} className="btn-update" style={{marginBottom: '15px'}}>
        Atualizar Lista
      </button>
      
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Para</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.receiver}</td>
              <td className="status-done">R$ {Number(t.amount).toFixed(2)}</td>
              <td>{new Date(t.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Nenhuma transação encontrada.
        </p>
      )}
    </div>
  );
}

export default TransactionList;