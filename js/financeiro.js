//Este arquivo é o "banco de dados em memória" da aplicação.

const data = {

    conta:{
        saldo:0
    },

    caixinhas:[],

    movimentacoes:[],

    historico:[],

    configuracoes:{
        tema:"light"
    }

};
window.data = data;