import { useState } from 'react'; 
import api from '../services/api'; 

function Login({ onLoginSuccess }) {
    const [user, setUser] = useState(''); 
    const [password, setPassword] = useState('');  

    const handleSubmit = async (e) => {
        e.preventDefault();  
        try {
          const response = await api.post('/login', { user, password}); 
          if (response.data.auth) {
            localStorage.setItem('token', response.data.token); 
            onLoginSuccess(); // avisa o app que o login foi feito com sucesso
          }
        } catch (err) {
            alert("Falha no login!");
        }
    } 

    return (
        /* ESTA DIV ESTAVA FALTANDO E É ELA QUE CENTRALIZA */
        <div className="login-container"> 
            <div className='login-card'>
                <h2>Entrar na Wallet</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Usuário" 
                        onChange={e => setUser(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder='Senha' 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                    <button type='submit'>Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;