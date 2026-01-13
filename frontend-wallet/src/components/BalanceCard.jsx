import React from 'react';

function BalanceCard({ transactions }) {
    //calculamos o total somando  o amount 
    const total = transactions.reduce((acc, t) => acc + Number(t.amount),0);

    return (
        <div className='card balance-card'>
            <div className='balance-info'>
                <span>Saldo Disponível</span>
                <h2>R$ {total.toLocaleString('pt-BR',{ minimumFractionDigits: 2 })}</h2>
            </div>
            <div className='balance-icon'>💰</div>
        </div>
    )
}

export default BalanceCard;