//começa função de gerar relatórios
function renderRelatorios(){

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <h2 class="section-title">
        Relatórios
    </h2>

    <div class="card">

        <h3>
            Gerar Relatório Financeiro
        </h3>

        <br>

        <p>
            O Relatório MENSAL contém:
        </p>

        <br>

        <ul>

            <li>Resumo financeiro do mês atual</li>

            <li>Conta principal</li>

            <li>Caixinhas</li>

            <li>Receitas</li>

            <li>Despesas</li>

            <li>Histórico completo</li>

        </ul>

        <br>

        <button class="botaoclick" onclick="gerarPDF()">
            Gerar PDF
        </button>

    </div>
      <div class="card">

        <h3>
            Gerar Relatório Financeiro
        </h3>

        <br>

        <p>
            O Relatório GERAL contém:
        </p>

        <br>

        <ul>

            <li>Resumo financeiro</li>

            <li>Conta principal</li>

            <li>Caixinhas</li>

            <li>Receitas</li>

            <li>Despesas</li>

            <li>Histórico completo</li>

        </ul>

        <br>

        <button class="botaoclick" onclick="gerarPDF()">
            Gerar PDF
        </button>

    </div>

    `;
fecharMenuMobile();
}
//termina função de gerar relatórios
//Começa gerador de logo
function carregarLogo(){

    return new Promise((resolve)=>{

        const img = new Image();

        img.src = "assets/logo/logodopdf.png";

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

    });

}
//Termina logo
//começa async de gerar pdf
async function gerarPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
    );

    const logo = await carregarLogo();

    const pageWidth = 210;
    const pageHeight = 297;

    let y = 15;

    // =========================
    // CABEÇALHO
    // =========================

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

    try{

        pdf.addImage(
            logo,
            "PNG",
              130, //x
            -18,//Y
            100,//tamanho altura
            80//largura
        );

    }catch(e){

        console.log(
            "Logo não carregada"
        );

    }

    pdf.setFontSize(18);

    pdf.setTextColor(
        0,
        102,
        204
    );

    pdf.text(
        "ORCDev",
        168,
        30
    );

    pdf.setTextColor(
        0,
        0,
        0
    );

    y = 40;

    pdf.setFontSize(11);

    pdf.text(
        "EXTRATO FINANCEIRO",
        10,
        y
    );

    pdf.text(
        dataAtual(),
        145,
        y
    );

    y += 8;

    pdf.line(
        10,
        y,
        200,
        y
    );

    y += 8;

    // =========================
    // RESUMO
    // =========================

    pdf.setFontSize(12);

    pdf.text(
        "RESUMO FINANCEIRO",
        10,
        y
    );

    y += 8;

    pdf.setFontSize(10);

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
        `Receitas: ${formatarMoeda(receitasMes())}`,
        15,
        y
    );

    y += 6;

    pdf.text(
        `Despesas: ${formatarMoeda(gastosMes())}`,
        15,
        y
    );

    y += 12;

    // =========================
    // HISTÓRICO
    // =========================

    pdf.setFontSize(12);

    pdf.text(
        "DEMONSTRATIVO DE MOVIMENTAÇÕES",
        10,
        y
    );

    y += 8;

    pdf.setFillColor(
        220,
        220,
        220
    );

    pdf.rect(
        10,
        y-5,
        190,
        8,
        "F"
    );

    pdf.setFontSize(9);

    pdf.text("DATA",12,y);
    pdf.text("TIPO",45,y);
    pdf.text("DESCRIÇÃO",75,y);
    pdf.text("VALOR",150,y);
    pdf.text("SALDO",178,y);

    y += 10;

    let saldo = 0;

    const historicoOrdenado =
    [...data.historico];

    historicoOrdenado.forEach(item=>{

        if(y > 260){

            adicionarRodape();

            pdf.addPage();

            y = 20;

        }

        if(
            item.tipo === "receita" ||
            item.tipo === "resgate"
        ){

            saldo += item.valor;

        }else if(
            item.tipo === "despesa" ||
            item.tipo === "deposito"
        ){

            saldo -= item.valor;

        }

        const descricao =
        item.descricao
        ? item.descricao.substring(
            0,
            35
        )
        : "-";

        pdf.setFontSize(8);

        pdf.text(
            (item.dataFormatada || item.data || "")
            .substring(0,10),
            12,
            y
        );

        pdf.text(
            traduzirTipo(item.tipo),
            45,
            y
        );

        pdf.text(
            descricao,
            75,
            y
        );

        pdf.text(
            formatarMoeda(item.valor),
            145,
            y
        );

        pdf.text(
            formatarMoeda(saldo),
            175,
            y
        );

        y += 6;

    });

    y += 8;

    // =========================
    // CAIXINHAS
    // =========================

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

    pdf.setFontSize(12);

    pdf.text(
        "CAIXINHAS",
        10,
        y
    );

    y += 10;

    pdf.setFillColor(
        220,
        220,
        220
    );

    pdf.rect(
        10,
        y-5,
        190,
        8,
        "F"
    );

    pdf.setFontSize(9);

    pdf.text("NOME",12,y);
    pdf.text("SALDO",95,y);
    pdf.text("META",135,y);
    pdf.text("FALTA",170,y);

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

    function adicionarRodape(){

        pdf.setFontSize(8);

        pdf.line(
            10,
            280,
            200,
            280
        );

        pdf.text(
            "Relatório gerado automaticamente pelo Sistema Financeiro ORCDev",
            40,
            286
        );

    }

    pdf.save(
        `Extrato-ORCDev-${Date.now()}.pdf`
    );

    toast(
        "PDF gerado com sucesso",
        "success"
    );

}
//termina async de gerar pdf
