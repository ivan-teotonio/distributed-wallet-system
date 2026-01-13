const { Kafka } = require('kafkajs');  

const kafka = new Kafka({
  clientId: 'notification-service', 
  brokers: ['localhost:9092'] // Corrigido de 'brikers' para 'brokers'
}); 

const consumer = kafka.consumer({
    groupId: 'notification-group'
}); 

const run = async () => {
    // 1. CONEXÃO: O serviço se apresenta ao Kafka
    await consumer.connect();  
    
    // 2. INSCRIÇÃO: Ele diz: "Quero ouvir tudo o que passar no canal 'transacoes'"
    await consumer.subscribe({ topic: 'transacoes', fromBeginning: true });
    
    console.log("📨 Service-Notification aguardando mensagens do Kafka...");

    // 3. LOOP DE ESCUTA: Aqui o serviço fica parado, "ouvindo", sem travar o resto do sistema
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => { // Corrigido 'partition'
            try {
                // O Kafka envia os dados como um Buffer (puro dado binário)
                // Precisamos transformar em string e depois em objeto JSON
                const transacao = JSON.parse(message.value.toString());

                console.log(`-----------------------------------------`);
                console.log(`🔔 NOTIFICAÇÃO RECEBIDA:`);
                console.log(`O usuário ${transacao.owner} realizou um(a) ${transacao.type}`);
                console.log(`Valor: R$ ${transacao.amount}`);
                console.log(`-----------------------------------------`);
            } catch (err) {
                console.error("❌ Erro ao processar mensagem:", err);
            }
        },
    });
}

run().catch(console.error);