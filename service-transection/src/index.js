const express = require('express');
const { Pool } = require('pg'); 
const cors = require('cors');
const { Kafka } = require('kafkajs');

const app = express(); 
app.use(cors());
app.use(express.json());

// 1. CONFIGURAÇÃO DO KAFKA (Movi para cima para o 'producer' existir antes da rota)
const kafka = new Kafka({
    clientId: 'transaction-service', 
    brokers: ['localhost:9092']
}); 
const producer = kafka.producer();

// 2. CONFIGURAÇÃO POSTGRES
const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'transactions_db',
    password: 'password',
    port: 5432,
});

// 3. ROTA DE TRANSFERÊNCIA
app.post('/transfer', async (req, res) => {
    // 1. Pegue o receiver do corpo da requisição
    const { owner, receiver, amount, type } = req.body; 

    try {
        // 2. Adicione 'receiver' na Query e nos Values
        const query = 'INSERT INTO transactions (owner, receiver, amount, type, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [owner, receiver, amount, type, 'CONCLUIDO'];
        
        const result = await pool.query(query, values);
        res.json({ message: "Sucesso!", data: result.rows[0] });
    } catch (error) {
        console.error("Erro no Postgres:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Localize esta rota no seu Service-Transaction (3002)
app.get('/transactions/:owner', async (req, res) => {
    // 1. O 'owner' vem da URL (ex: /transactions/ana)
    const { owner } = req.params; 

    try {
        // 2. ADICIONE O WHERE! Isso filtra os resultados no banco de dados.
        // Usamos $1 para evitar ataques de SQL Injection (segurança!)
        const query = 'SELECT * FROM transactions WHERE owner = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [owner]);

        // 3. Devolve apenas o que pertence ao usuário logado
        res.json(result.rows);
    } catch (error) {
        console.error("Erro no Postgres:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Service-Transaction online na porta ${PORT}`);
});