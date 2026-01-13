const express = require('express'); 
const mysql = require('mysql2/promise'); 
const cors = require('cors'); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'accounts_db',
    port: 3306,
}; 

// --- NOVA ROTA: Validar Login (Usada pelo Gateway) ---
app.post('/validate-login', async (req, res) => {
    const { user, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [user, password]
        );
        await connection.end();

        if (rows.length > 0) {
            return res.json({ valid: true, user: rows[0].username });
        } else {
            return res.status(401).json({ valid: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao consultar usuários: " + error.message });
    }
});

// --- NOVA ROTA: Cadastro de Usuário (Signup) ---
app.post('/register', async (req, res) => {
    const { user, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [user, password]
        );
        await connection.end();
        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao cadastrar: " + error.message });
    }
});

// --- ROTA EXISTENTE: Saldo ---
app.get('/balance/:owner', async (req, res) => {
    const { owner } = req.params;  
    try {
        const connection = await mysql.createConnection(dbConfig); 
        const [rows] = await connection.execute(
            'SELECT balance FROM accounts WHERE owner = ?',
            [owner]
        );
        await connection.end(); 

        if(rows.length > 0) {
            res.json({
                service: "Account-Service",
                owner: owner,
                balance: rows[0].balance,
            })
        } else {
            res.status(404).json({ message: "Usuário não encontrado" })
        }    
    } catch (error) {
        res.status(500).json({
            error: "Erro ao acessar o cofre: " + error.message
        })
    }
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`🚀 Service-Account online na porta ${PORT}`);
});