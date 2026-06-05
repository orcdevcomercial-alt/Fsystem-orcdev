// Aqui gerencia as Movimentações

let tipoMovimentacaoSelecionado = "receita";

function renderMovimentacoes(){
    if(
            !exigirLogin()
        ){
            return;
        }
        
        const user =
        usuarioAtual();

    let html = `

    <h2 class="section-title">
        Movimentações
    </h2>

    <div class="mov-form">

        <div class="campo">

            <label>Descrição</label>

            <input
                id="descricaoMov"
                placeholder="Ex: Mercado, Salário, Netflix..."
            >

        </div>

        <div class="campo">

            <label>Valor</label>

            <div class="valor-destaque">

                <span>R$</span>

                <input
                    id="valorMov"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                >

            </div>

        </div>

        <div class="tipo-mov">

            <button
                id="btnReceita"
                 class="tipo-btn receita-ativa"
                onclick="selecionarTipo('receita')"
                type="button"
            >
                + Receita
            </button>

            <button
                id="btnDespesa"
                 class="tipo-btn despesa-ativa"
                onclick="selecionarTipo('despesa')"
                type="button"
            >
                - Despesa
            </button>

        </div>

        <button
            class="btn-salvar-mov"
            onclick="adicionarMovimentacao()"
        >
            Salvar movimentação
        </button>

    </div>

    `;

    if(data.movimentacoes.length){

        html += `
        <div class="cards">
        `;

        data.movimentacoes
        .slice()
        .reverse()
        .forEach((mov,index)=>{

            html += `

            <div class="card">

                <h3>
                    ${mov.descricao}
                </h3>

                <p
                    style="
                    color:${
                        mov.tipo === "receita"
                        ? "#22c55e"
                        : "#ef4444"
                    };
                    font-size:20px;
                    font-weight:700;
                "
                >

                    ${
                        mov.tipo === "receita"
                        ? "+"
                        : "-"
                    }

                    ${formatarMoeda(
                        mov.valor
                    )}

                </p>

                <br>

                <small>
                    ${mov.data}
                </small>

                <br><br>

                <button
                    class="botaoexcluir"
                    onclick="excluirMovimentacao(
                        ${
                            data.movimentacoes.length
                            -1
                            -index
                        }
                    )"
                >
                    Excluir
                </button>

            </div>

            `;

        });

        html += `
        </div>
        `;

    }else{

        html += `

        <div class="card">

            Nenhuma movimentação cadastrada.

        </div>

        `;

    }

    document.getElementById(
        "page-content"
    ).innerHTML = html;

    fecharMenuMobile();

}

// Seleciona Receita ou Despesa
function selecionarTipo(tipo){

    tipoMovimentacaoSelecionado = tipo;

    const btnReceita =
    document.getElementById("btnReceita");

    const btnDespesa =
    document.getElementById("btnDespesa");

    btnReceita.classList.remove(
        "receita-ativa"
    );

    btnDespesa.classList.remove(
        "despesa-ativa"
    );

    if(tipo === "receita"){

        btnReceita.classList.add(
            "receita-ativa"
        );

    }else{

        btnDespesa.classList.add(
            "despesa-ativa"
        );

    }

}
// Adiciona movimentação

function adicionarMovimentacao(){

    const descricao =
    document.getElementById(
        "descricaoMov"
    ).value.trim();

    const valor =
    parseFloat(
        document.getElementById(
            "valorMov"
        ).value
    );

    const tipo =
    tipoMovimentacaoSelecionado;

    if(
        !descricao ||
        !valor ||
        valor <= 0
    ){

        toast(
            "Preencha todos os campos",
            "warning"
        );

        return;

    }

    if(tipo === "receita"){

        data.conta.saldo += valor;

    }else{

        if(
            valor >
            data.conta.saldo
        ){

            toast(
                "Saldo insuficiente",
                "error"
            );

            return;

        }

        data.conta.saldo -= valor;

    }

    data.movimentacoes.push({

        descricao,

        valor,

        tipo,

        data:new Date()
        .toLocaleString(
            "pt-BR"
        )

    });

    registrarHistorico(

        tipo,

        descricao,

        valor,

        "Conta Principal",

        "Conta Principal"

    );

    salvar();

    renderMovimentacoes();

    toast(
        "Movimentação registrada",
        "success"
    );

}

// Excluir movimentação

function excluirMovimentacao(index){

    const mov =
    data.movimentacoes[index];

    if(
        mov.tipo === "receita"
    ){

        data.conta.saldo -=
        mov.valor;

    }else{

        data.conta.saldo +=
        mov.valor;

    }

    data.movimentacoes.splice(
        index,
        1
    );

    salvar();

    renderMovimentacoes();

    toast(
        "Movimentação removida",
        "success"
    );

}
