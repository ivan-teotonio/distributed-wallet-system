const express = require('express');
const httpProxy = require('express-http-proxy');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "minha_senha_super_secreta_123";
const ACCOUNTS_URL = 'http://localhost:3001';
const TRANSACTIONS_URL = 'http://localhost:3002';

// MIDDLEWARE: O Segurança da Porta
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: 'Sem token!' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Token inválido.' });
        req.userId = decoded.user;
        next();
    });
}

// ROTA DE LOGIN: Pergunta para o Service-Accounts via Axios
app.post('/login', async (req, res) => {
    const { user, password } = req.body;
    try {
        const response = await axios.post(`${ACCOUNTS_URL}/validate-login`, { user, password });
        if (response.data.valid) {
            const token = jwt.sign({ user: response.data.user }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ auth: true, token: token });
        }
    } catch (error) {
        res.status(401).json({ message: 'Login inválido!' });
    }
});

// ROTA DE CADASTRO: Apenas repassa (proxy) para o Service-Accounts
app.post('/register', (req, res, next) => {
    // Se no seu service-accounts a rota for /register, deixe assim:
    httpProxy(ACCOUNTS_URL)(req, res, next);
});

// ROTAS PROTEGIDAS
app.post('/transfer', verifyJWT, (req, res, next) => {
    httpProxy(TRANSACTIONS_URL)(req, res, next);
});

// Coloque isso logo abaixo das outras rotas (como a /transfer)
app.get('/transactions/:owner', verifyJWT, (req, res, next) => {
    // O Gateway recebe o pedido e repassa para o microserviço de transações
    httpProxy(TRANSACTIONS_URL)(req, res, next);
});

app.post('/register', (req, res, next) => {
    httpProxy(ACCOUNTS_URL)(req, res, next);
});

app.listen(3000, () => console.log("Gateway na porta 3000"));