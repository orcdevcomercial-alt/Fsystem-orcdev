//Este é responsável pelo dashboard visual do usuario

function renderDashboard(){

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <h2 class="section-title">
        Dashboard
    </h2>

    <div class="cards">

        <div class="card">
            <h3>Conta Principal</h3>
            <p>
                ${formatarMoeda(
                    data.conta.saldo
                )}
            </p>
        </div>

        <div class="card">
            <h3>Caixinhas</h3>
            <p>
                ${formatarMoeda(
                    totalCaixinhas()
                )}
            </p>
        
            <h3 >Quantidade</h3>
            <p style="text-align:left;">
                ${data.caixinhas.length}
            </p>
        </div>

        <div class="card">
            <h3>Patrimônio</h3>
            <p>
                ${formatarMoeda(
                    patrimonio()
                )}
            </p>
        </div>

        <div class="card">
            <h3>Reposição</h3>
            <p>
                ${formatarMoeda(
                    totalPendente()
                )}
            </p>
        </div>

        <div class="card">
            <h3>Receitas</h3>
            <p>
                ${formatarMoeda(
                    receitasMes()
                )}
            </p>
        </div>

        <div class="card">
            <h3>Gastos</h3>
            <p>
                ${formatarMoeda(
                    gastosMes()
                )}
            </p>
        </div>

    </div>

    `;

    fecharMenuMobile();

}