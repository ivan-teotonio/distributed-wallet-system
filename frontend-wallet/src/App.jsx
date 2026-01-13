import { useState, useEffect } from 'react';
import api from './services/api';
import { jwtDecode } from 'jwt-decode';
import BalanceCard from './components/BalanceCard';
import TransactionList from './components/TransactionList';
import Transfer from './components/Transfer';
import Login from "./components/Login";


function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'));

  // Função para carregar dados que será usada em vários lugares
  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const decoded = jwtDecode(token);
      const response = await api.get(`/transactions/${decoded.user}`);
      setTransactions(response.data);
    } catch (err) {
      console.error("Erro ao carregar dados");
    }
  };

  useEffect(() => {
    if (isLogged) loadTransactions();
  }, [isLogged]);

  if (!isLogged) return <Login onLoginSuccess={() => setIsLogged(true)} />;

  return (
    <div className="wallet-container">
      <header className="header-main">
        <h1>Minha Carteira</h1>
        <button className="logout-btn" onClick={() => { localStorage.removeItem('token'); setIsLogged(false); }}>Sair</button>
      </header>

      {/* O Saldo fica no topo, antes de tudo */}
      <BalanceCard transactions={transactions} />

      <div className="dashboard-content">
        {/* Passamos o loadTransactions para o Transfer atualizar a lista após enviar */}
        <Transfer onTransferSuccess={loadTransactions} />
        
        {/* A lista agora apenas exibe o que o App já carregou */}
        <TransactionList transactions={transactions} refresh={loadTransactions} />
      </div>
    </div>
  );
}

export default App;