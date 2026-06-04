//Comanda o histórico de transações feitas pelo usuario
function registrarHistorico(
    tipo,
    descricao,
    valor = 0,
    origem = "",
    destino = ""
){

    data.historico.push({

        id: gerarId(),

        tipo,

        descricao,

        valor,

        origem,

        destino,

        dataISO:new Date().toISOString(),

        dataFormatada:dataAtual()

    });

}

//visual
function renderHistorico(){

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <div class="historico-header">

        <h2>Meu Histórico</h2>

        <button
            class="filtro-btn"
            onclick="abrirFiltroHistorico()"
        >
            ☰
        </button>

    </div>

    <div class="busca-historico">

        <input
            type="text"
            id="buscaHistorico"
            placeholder="Buscar movimentação..."
            oninput="carregarHistorico()"
        >

    </div>

    <div id="listaHistorico"></div>

    `;

    carregarHistorico();
fecharMenuMobile();
}
//fim visual
//carregar historico
function carregarHistorico(){

    let registros =
    [...data.historico].reverse();

    const busca =
    document.getElementById(
        "buscaHistorico"
    )?.value?.toLowerCase() || "";

    registros =
    registros.filter(item =>

        item.descricao
        .toLowerCase()
        .includes(busca)

    );

    let html = "";

    let ultimoMes = "";

    registros.forEach(item => {

        const dataObj =
        new Date(item.dataISO);

        const mes =
        dataObj.toLocaleDateString(
            "pt-BR",
            {
                month:"long",
                year:"numeric"
            }
        );

        if(mes !== ultimoMes){

            html += `

            <div class="mes-historico">

                ${mes.toUpperCase()}

            </div>

            `;

            ultimoMes = mes;

        }

        let icone = "💸";
        let classe = "saida";

        if(item.tipo === "entrada"){

            icone = "↓";
            classe = "entrada";

        }

        if(item.tipo === "transferencia"){

            icone = "⇄";
            classe = "transferencia";

        }

        if(item.tipo === "caixinha"){

            icone = "📦";
            classe = "caixinha";

        }

        html += `

        <div class="historico-item">

            <div class="historico-icon ${classe}">

                ${icone}

            </div>

            <div class="historico-info">

                <div class="historico-titulo">

                    ${item.descricao}

                </div>

                <div class="historico-data">

                    ${item.dataFormatada}

                </div>

            </div>

            <div class="historico-valor">

                ${formatarMoeda(item.valor)}

            </div>

        </div>

        `;

    });

    if(registros.length === 0){

        html = `

        <div class="historico-vazio">

            Nenhuma movimentação encontrada

        </div>

        `;

    }

    document.getElementById(
        "listaHistorico"
    ).innerHTML = html;

}

//termina carregar historico
//começa filtro histórico
function filtrarHistorico(){

    const dataFiltro =
    document.getElementById(
        "filtroData"
    ).value;

    carregarHistorico(
        dataFiltro
    );

}
//termina filtro de histórico