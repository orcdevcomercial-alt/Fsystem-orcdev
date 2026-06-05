//Este é a primeira função de alterar tema

function renderConfig(){
    

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <h2 class="section-title">
        Configurações
    </h2>

    <button
        class="theme-btn"
        onclick="alternarTema()"
    >

        Alternar Tema

    </button>

    `;

    fecharMenuMobile();

}
//Este é a segunda função de alterar tema
function alternarTema(){

    document.body.classList.toggle(
        "dark"
    );

    data.configuracoes.tema =

        document.body.classList.contains(
            "dark"
        )

        ? "dark"
        : "light";

    salvar();

    toast(
        "Tema alterado",
        "success"
    );

    fecharMenuMobile();

}