//Funções auxiliares usadas por várias paginas estarão aqui...
function formatarMoeda(valor){

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    ).format(valor);

}
function totalCaixinhas(){

    return data.caixinhas.reduce(

        (acc,caixinha)=>
            acc + caixinha.saldo,

        0

    );

}
function patrimonio(){

    return (
        data.conta.saldo +
        totalCaixinhas()
    );

}
function totalPendente(){

    return data.caixinhas.reduce(

        (acc,caixinha)=>
            acc + caixinha.pendente,

        0

    );

}
function gastosMes(){

    return data.movimentacoes

        .filter(
            mov =>
            mov.tipo === "despesa"
        )

        .reduce(
            (total,mov)=>
            total + mov.valor,
            0
        );

}
function receitasMes(){

    return data.movimentacoes

        .filter(
            mov =>
            mov.tipo === "receita"
        )

        .reduce(
            (total,mov)=>
            total + mov.valor,
            0
        );

}
//para quando for implementar no firebase e backup...
function gerarId(){

    return Date.now() +
    Math.floor(
        Math.random() * 1000
    );

}
function dataAtual(){

    return new Date()
        .toLocaleString(
            "pt-BR"
        );

}
// tradução de tipo para pdf
function traduzirTipo(tipo){

    const tipos = {

        receita: "Receita",
        despesa: "Despesa",

        deposito: "Depósito",
        resgate: "Resgate",

        criacao_caixinha: "Criação",
        exclusao_caixinha: "Exclusão"

    };

    return tipos[tipo] || tipo;

}
// termina tradução de tipo para pdf