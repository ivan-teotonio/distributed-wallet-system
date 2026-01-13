import { useState } from 'react';
import api from '../services/api'; // Vamos criar esse serviço já já

function Transfer() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      // Enviamos exatamente o que o serviço 3002 precisa
      await api.post('/transfer', {
        owner: 'ivan', // Usuário logado
        receiver: receiver, // <--- ADICIONADO
        amount: parseFloat(amount),
        type: 'TRANSFER'
      });
      alert("Transferência realizada!");
    } catch (err) {
      alert("Erro 500: Verifique o console do VS Code na porta 3002");
    }
  };

  return (
    <div className="card">
      <h3>Transferir Dinheiro</h3>
      <form onSubmit={handleTransfer}>
        <input placeholder="Para quem?" onChange={e => setReceiver(e.target.value)} />
        <input type="number" placeholder="Valor" onChange={e => setAmount(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Transfer;