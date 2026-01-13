import { useState } from 'react';
import api from '../services/api';

function Register({ onBackToLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // O Gateway (3000) vai repassar isso para o Accounts (3001)
      await api.post('/register', { user, password });
      
      alert("Usuário cadastrado com sucesso! Agora você pode fazer login.");
      onBackToLogin(); // Volta para a tela de login automaticamente
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar. Verifique se o serviço de Contas está rodando.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <h2>Criar Nova Conta</h2>
      <form onSubmit={handleRegister}>
        <input 
          placeholder="Escolha um usuário" 
          value={user}
          onChange={(e) => setUser(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Crie uma senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
        </button>
      </form>
      <button 
        className="btn-link" 
        onClick={onBackToLogin}
        style={{ marginTop: '15px', background: 'none', color: '#007bff', border: 'none', cursor: 'pointer' }}
      >
        Já tem uma conta? Faça Login
      </button>
    </div>
  );
}

export default Register;