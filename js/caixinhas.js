//Este é o controle de Caixinhas/Reservas
//Aqui começa a funcionalidade das caixinhas

function renderCaixinhas(){
    if(
        !exigirLogin()
    ){
        return;
    }
    
    const user =
    usuarioAtual();

    let html = `

    <h2 class="section-title">
        Caixinhas
    </h2>

    <div class="form-caixinha">

        <input
            id="nomeCaixinha"
            placeholder="Nome da Caixinha"
            style="padding:10px;width:220px"
        >

        <input
            id="metaCaixinha"
            type="number"
            placeholder="Meta"
            style="padding:10px;width:180px"
        >

        <button class="botaoclick"
            onclick="criarCaixinha()"
        >
            Criar
        </button>

    </div>

    `;

    if(data.caixinhas.length === 0){

        html += `
            <p>
                Nenhuma caixinha criada.
            </p>
        `;

    }else{

        html += `
            <div class="cards">
        `;

        data.caixinhas.forEach(
            (c,index)=>{

            const progresso =
                c.meta > 0
                ? (c.saldo / c.meta) * 100
                : 0;

            html += `

            <div class="card">

                <h3>${c.nome}</h3>

                <p>
                    ${formatarMoeda(
                        c.saldo
                    )}
                </p>

                <br>

               <div class="caixinha-info">

        <span>Meta</span>
        <strong>
            ${formatarMoeda(c.meta)}
        </strong>
    </div>

    <div>
        <span>Falta</span>
        <strong>
            ${formatarMoeda(c.pendente)}
        </strong>
    </div>

            

                <div class="progresso-label">

    ${formatarMoeda(c.saldo)}
    de
    ${formatarMoeda(c.meta)}
    (${Math.round(progresso)}%)

                   </div>

<div style="
    height:10px;
    background:#ddd;
    border-radius:20px;
    overflow:hidden;">

    <div style="
        height:100%;
        background:#8A05BE;
        width:${Math.min(
            progresso,
            100
        )}%;
        "
    ></div>

</div>

<br>

                <br>

                <input
                    id="valor${index}"
                    type="number"
                    placeholder="Valor"
                >

                <br><br>

                <div
                    class="acoes-caixinha"
                >

                    <button class="botaoclick"
                        onclick="
                        depositarCaixinha(
                            ${index}
                        )"
                    >
                        Depositar
                    </button>

                    <button class="botaoresgate"
                        onclick="
                        resgatarCaixinha(
                            ${index}
                        )"
                    >
                        Resgatar
                    </button>

                    <button class="botaoexcluir"
                        onclick="
                        excluirCaixinha(
                            ${index}
                        )"
                    >
                        Excluir
                    </button>

                </div>

            </div>

            `;

        });

        html += `
            </div>
        `;

    }

    document.getElementById(
        "page-content"
    ).innerHTML = html;

    fecharMenuMobile();

}
//Aqui começa funçao de criar uma nova caixinha
function criarCaixinha(){

    const nome =
    document.getElementById(
        "nomeCaixinha"
    ).value.trim();

    const meta =
    parseFloat(
        document.getElementById(
            "metaCaixinha"
        ).value
    );

    if(
        !nome ||
        isNaN(meta) ||
        meta <= 0
    ){

        toast(
            "Preencha os campos corretamente",
            "warning"
        );

        return;

    }

    data.caixinhas.push({

        nome: nome,

        saldo: 0,

        meta: meta,

        pendente: meta

    });

    registrarHistorico(

        "criacao_caixinha",

        `Caixinha criada: ${nome}`,

        0

    );

    salvar();

    renderCaixinhas();

    toast(
        "Caixinha criada",
        "success"
    );

    fecharMenuMobile();


}
//aqui acaba criar caixinha
//Começa depositar caixinhafunction depositarCaixinha(index){
   function depositarCaixinha(index){

    const valor =
    parseFloat(
        document.getElementById(
            `valor${index}`
        ).value
    );

    if(
        isNaN(valor) ||
        valor <= 0
    ){

        toast(
            "Valor inválido",
            "error"
        );

        return;

    }

    if(
        valor >
        data.conta.saldo
    ){

        toast(
            "Saldo insuficiente na conta",
            "error"
        );

        return;

    }

    data.conta.saldo -= valor;

    data.caixinhas[index].saldo += valor;

    data.caixinhas[index].pendente =
    Math.max(
        0,
        data.caixinhas[index].meta -
        data.caixinhas[index].saldo
    );

    registrarHistorico(

        "deposito",

        `Depósito na caixinha ${data.caixinhas[index].nome}`,

        valor,

        "Conta Principal",

        data.caixinhas[index].nome

    );

    salvar();

    renderCaixinhas();

    toast(
        "Valor transferido",
        "success"
    );

}
//aqui acaba depositarcaixinha
///Começa resgatar caixinha
function resgatarCaixinha(index){

    const valor =
    parseFloat(
        document.getElementById(
            `valor${index}`
        ).value
    );

    if(
        isNaN(valor) ||
        valor <= 0
    ){

        toast(
            "Valor inválido",
            "error"
        );

        return;

    }

    if(
        valor >
        data.caixinhas[index].saldo
    ){

        toast(
            "Saldo insuficiente",
            "error"
        );

        return;

    }

    data.caixinhas[index].saldo -= valor;

    data.conta.saldo += valor;

    data.caixinhas[index].pendente =
    Math.max(
        0,
        data.caixinhas[index].meta -
        data.caixinhas[index].saldo
    );

    registrarHistorico(

        "resgate",

        `Resgate da caixinha ${data.caixinhas[index].nome}`,

        valor,

        data.caixinhas[index].nome,

        "Conta Principal"

    );

    salvar();

    renderCaixinhas();

    toast(
        "Resgate realizado",
        "success"
    );

}
//acaba resgatar caixinha
//Começa excluir caixinha
function excluirCaixinha(index){

    if(
        !confirm(
            "Deseja excluir esta caixinha?"
        )
    ){
        return;
    }

    const saldoRestante =
    data.caixinhas[index].saldo;

    data.conta.saldo += saldoRestante;

    registrarHistorico(

        "exclusao_caixinha",

        `Caixinha removida: ${data.caixinhas[index].nome}`,

        saldoRestante,

        data.caixinhas[index].nome,

        "Conta Principal"

    );

    data.caixinhas.splice(
        index,
        1
    );

    salvar();

    renderCaixinhas();

    toast(
        "Caixinha removida",
        "success"
    );

    fecharMenuMobile();

}