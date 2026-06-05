// =====================================
// TELA DE RELATÓRIOS
// =====================================

function renderRelatorios(){
    if(
        !exigirLogin()
    ){
        return;
    }
    
    const user =
    usuarioAtual();

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <h2 class="section-title">
        Relatórios
    </h2>

    <div class="card">

        <h3>
            Relatório Mensal
        </h3>

        <br>

        <p>
            O relatório mensal contém:
        </p>

        <br>

        <ul>

            <li>Resumo financeiro do mês atual</li>

            <li>Receitas do mês</li>

            <li>Despesas do mês</li>

            <li>Movimentações do mês</li>

            <li>Caixinhas</li>

        </ul>

        <br>

        <button
            class="botaoclick"
            onclick="gerarPDFmensal()"
        >
            Gerar PDF Mensal
        </button>

    </div>

    <div class="card">

        <h3>
            Relatório Geral
        </h3>

        <br>

        <p>
            O relatório geral contém:
        </p>

        <br>

        <ul>

            <li>Resumo financeiro completo</li>

            <li>Conta principal</li>

            <li>Caixinhas</li>

            <li>Receitas</li>

            <li>Despesas</li>

            <li>Histórico completo</li>

        </ul>

        <br>

        <button
            class="botaoclick"
            onclick="gerarPDFgeral()"
        >
            Gerar PDF Geral
        </button>

    </div>

    `;

    fecharMenuMobile();

}

// =====================================
// CARREGAMENTO DA LOGO
// =====================================

function carregarLogo(){

    return new Promise((resolve)=>{

        const img = new Image();

        img.src =
        "assets/logo/logodopdf.png";

        img.onload = ()=>{

            const canvas =
            document.createElement(
                "canvas"
            );

            canvas.width =
            img.width;

            canvas.height =
            img.height;

            const ctx =
            canvas.getContext(
                "2d"
            );

            ctx.drawImage(
                img,
                0,
                0
            );

            resolve(

                canvas.toDataURL(
                    "image/png"
                )

            );

        };

        img.onerror = ()=>{

            console.log(
                "Logo não encontrada"
            );

            resolve(null);

        };

    });

}

// =====================================
// HISTÓRICO DO MÊS ATUAL
// =====================================

function obterHistoricoMesAtual(){

    const hoje =
    new Date();

    const mesAtual =
    hoje.getMonth();

    const anoAtual =
    hoje.getFullYear();

    return data.historico.filter(item=>{

        if(
            !item.data
        ){
            return false;
        }

        const dataMov =
        new Date(item.data);

        return (

            dataMov.getMonth()
            === mesAtual

            &&

            dataMov.getFullYear()
            === anoAtual

        );

    });

}

// =====================================
// RECEITAS DO MÊS
// =====================================

function receitasMesRelatorio(){

    const historico =

    obterHistoricoMesAtual();

    return historico

    .filter(item=>

        item.tipo === "receita"

        ||

        item.tipo === "resgate"

    )

    .reduce(

        (total,item)=>

        total + item.valor,

        0

    );

}

// =====================================
// DESPESAS DO MÊS
// =====================================

function despesasMesRelatorio(){

    const historico =

    obterHistoricoMesAtual();

    return historico

    .filter(item=>

        item.tipo === "despesa"

        ||

        item.tipo === "deposito"

    )

    .reduce(

        (total,item)=>

        total + item.valor,

        0

    );

}

// =====================================
// REFERÊNCIA MENSAL
// =====================================

function referenciaMesAtual(){

    return new Date()

    .toLocaleDateString(

        "pt-BR",

        {

            month:"long",

            year:"numeric"

        }

    );

}

// =====================================
// TOTAL DE RECEITAS DE UM HISTÓRICO
// =====================================

function calcularReceitas(

    historico

){

    return historico

    .filter(item=>

        item.tipo === "receita"

        ||

        item.tipo === "resgate"

    )

    .reduce(

        (total,item)=>

        total + item.valor,

        0

    );

}

// =====================================
// TOTAL DE DESPESAS DE UM HISTÓRICO
// =====================================

function calcularDespesas(

    historico

){

    return historico

    .filter(item=>

        item.tipo === "despesa"

        ||

        item.tipo === "deposito"

    )

    .reduce(

        (total,item)=>

        total + item.valor,

        0

    );

}

// =====================================
// SALDO ACUMULADO DO HISTÓRICO
// =====================================

function calcularSaldoMovimentacoes(

    historico

){

    let saldo = 0;

    historico.forEach(item=>{

        if(

            item.tipo === "receita"

            ||

            item.tipo === "resgate"

        ){

            saldo += item.valor;

        }

        else if(

            item.tipo === "despesa"

            ||

            item.tipo === "deposito"

        ){

            saldo -= item.valor;

        }

    });

    return saldo;

}
// =====================================
// GERADOR PRINCIPAL PDF
// =====================================

async function gerarPDF(

    historico,

    titulo,

    receitas,

    despesas,

    referencia = null

){

    const { jsPDF } =
    window.jspdf;

    const pdf =
    new jsPDF(
        "p",
        "mm",
        "a4"
    );

    const logo =
    await carregarLogo();

    let y = 15;

    // =====================================
    // CABEÇALHO
    // =====================================

    pdf.setFillColor(
        0,
        102,
        204
    );

    pdf.rect(
        10,
        10,
        140,
        8,
        "F"
    );

    if(logo){

        try{

            pdf.addImage(

                logo,

                "PNG",

                145,

                -8,

                60,

                48

            );

        }catch(e){

            console.log(
                "Erro ao carregar logo"
            );

        }

    }

    pdf.setFontSize(
        18
    );

    pdf.setTextColor(
        0,
        102,
        204
    );

    pdf.text(
        titulo,
        10,
        32
    );

    pdf.setTextColor(
        0,
        0,
        0
    );

    pdf.setFontSize(
        10
    );

    pdf.text(

        `Emitido em: ${dataAtual()}`,

        125,

        32

    );

    if(referencia){

        pdf.setFontSize(
            9
        );

        pdf.text(

            `Referência: ${referencia}`,

            10,

            38

        );

    }

    y = 45;

    pdf.line(
        10,
        y,
        200,
        y
    );

    y += 10;

    // =====================================
    // RESUMO FINANCEIRO
    // =====================================

    pdf.setFontSize(
        13
    );

    pdf.text(
        "RESUMO FINANCEIRO",
        10,
        y
    );

    y += 6;

    pdf.rect(
        10,
        y,
        190,
        38
    );

    y += 8;

    pdf.setFontSize(
        10
    );

    pdf.text(

        `Conta Principal: ${formatarMoeda(data.conta.saldo)}`,

        15,

        y

    );

    y += 6;

    pdf.text(

        `Total em Caixinhas: ${formatarMoeda(totalCaixinhas())}`,

        15,

        y

    );

    y += 6;

    pdf.text(

        `Patrimônio Total: ${formatarMoeda(patrimonio())}`,

        15,

        y

    );

    y += 6;

    pdf.text(

        `Receitas: ${formatarMoeda(receitas)}`,

        15,

        y

    );

    y += 6;

    pdf.text(

        `Despesas: ${formatarMoeda(despesas)}`,

        15,

        y

    );

    y += 15;

    // =====================================
    // MOVIMENTAÇÕES
    // =====================================

    pdf.setFontSize(
        13
    );

    pdf.text(
        "MOVIMENTAÇÕES",
        10,
        y
    );

    y += 10;

    desenharCabecalhoTabela();

    let saldo = 0;

    historico.forEach(item=>{

        if(y > 265){

            adicionarRodape();

            pdf.addPage();

            y = 20;

            desenharCabecalhoTabela();

        }

        if(

            item.tipo === "receita"

            ||

            item.tipo === "resgate"

        ){

            saldo += item.valor;

        }

        else if(

            item.tipo === "despesa"

            ||

            item.tipo === "deposito"

        ){

            saldo -= item.valor;

        }

        const descricao =

        item.descricao

        ?

        item.descricao.substring(
            0,
            35
        )

        :

        "-";

        pdf.setFontSize(
            8
        );

        pdf.setTextColor(
            0,
            0,
            0
        );

        pdf.text(

            (
                item.dataFormatada
                ||
                item.data
                ||
                ""
            ).substring(
                0,
                10
            ),

            12,

            y

        );

        pdf.text(

            traduzirTipo(
                item.tipo
            ),

            45,

            y

        );

        pdf.text(

            descricao,

            75,

            y

        );

        // ====================
        // VALOR COLORIDO
        // ====================

        if(

            item.tipo ===
            "despesa"

        ){

            pdf.setTextColor(
                220,
                0,
                0
            );

        }

        else if(

            item.tipo ===
            "receita"

        ){

            pdf.setTextColor(
                0,
                140,
                0
            );

        }

        pdf.text(

            formatarMoeda(
                item.valor
            ),

            145,

            y

        );

        pdf.setTextColor(
            0,
            0,
            0
        );

       if(saldo < 0){

    pdf.setTextColor(
        220,
        0,
        0
    );

}else{

    pdf.setTextColor(
        0,
        140,
        0
    );

}

pdf.text(

    formatarMoeda(
        saldo
    ),

    175,

    y

);

pdf.setTextColor(
    0,
    0,
    0
);

        y += 6;

    });

    y += 10;

    // =====================================
    // CAIXINHAS
    // =====================================

    if(y > 220){

        adicionarRodape();

        pdf.addPage();

        y = 20;

    }

    pdf.line(
        10,
        y,
        200,
        y
    );

    y += 10;

    pdf.setFontSize(
        13
    );

    pdf.text(
        "CAIXINHAS",
        10,
        y
    );

    y += 10;

    pdf.setFillColor(
        230,
        230,
        230
    );

    pdf.rect(
        10,
        y - 5,
        190,
        8,
        "F"
    );

    pdf.setFontSize(
        9
    );

    pdf.text(
        "NOME",
        12,
        y
    );

    pdf.text(
        "SALDO",
        95,
        y
    );

    pdf.text(
        "META",
        135,
        y
    );

    pdf.text(
        "FALTA",
        170,
        y
    );

    y += 10;

    data.caixinhas.forEach(c=>{

        pdf.text(
            c.nome,
            12,
            y
        );

        pdf.text(
            formatarMoeda(c.saldo),
            90,
            y
        );

        pdf.text(
            formatarMoeda(c.meta),
            130,
            y
        );

        pdf.text(
            formatarMoeda(c.pendente),
            165,
            y
        );

        y += 6;

    });

    adicionarRodape();

    // =====================================
    // CABEÇALHO DA TABELA
    // =====================================

    function desenharCabecalhoTabela(){

        pdf.setFillColor(
            230,
            230,
            230
        );

        pdf.rect(
            10,
            y - 5,
            190,
            8,
            "F"
        );

        pdf.setFontSize(
            9
        );

        pdf.text(
            "DATA",
            12,
            y
        );

        pdf.text(
            "TIPO",
            45,
            y
        );

        pdf.text(
            "DESCRIÇÃO",
            75,
            y
        );

        pdf.text(
            "VALOR",
            150,
            y
        );

        pdf.text(
            "SALDO",
            178,
            y
        );

        y += 10;

    }

    // =====================================
    // RODAPÉ
    // =====================================

    function adicionarRodape(){

        pdf.line(
            10,
            280,
            200,
            280
        );

        pdf.setFontSize(
            8
        );

        pdf.text(

            "Relatório gerado automaticamente pelo Sistema Financeiro ORCDev",

            40,

            286

        );

    }

    pdf.save(

        `${titulo.replaceAll(" ","-")}-${Date.now()}.pdf`

    );

    toast(
        "PDF gerado com sucesso",
        "success"
    );

}
// =====================================
// RELATÓRIO GERAL
// =====================================

async function gerarPDFgeral(){

    const historico =
    [...data.historico];

    await gerarPDF(

        historico,

        "EXTRATO FINANCEIRO GERAL",

        calcularReceitas(
            historico
        ),

        calcularDespesas(
            historico
        )

    );

}

// =====================================
// RELATÓRIO MENSAL
// =====================================

async function gerarPDFmensal(){

    const historicoMensal =
    obterHistoricoMesAtual();

    if(
        historicoMensal.length === 0
    ){

        toast(
            "Nenhuma movimentação encontrada neste mês.",
            "warning"
        );

        return;

    }

    await gerarPDF(

        historicoMensal,

        "EXTRATO FINANCEIRO MENSAL",

        calcularReceitas(
            historicoMensal
        ),

        calcularDespesas(
            historicoMensal
        ),

        referenciaMesAtual()

    );

}