//Este arquivo é responsável por: toats, menu do mobile, paginas em construção (alertas)

//Para fechar menu no mobile
function fecharMenuMobile(){

    if(window.innerWidth <= 768){

        document
            .getElementById("sidebar")
            .classList.remove("active");

        document
            .getElementById("overlay")
            .classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

    }

}
//fim menu mobile
//toast inicio
function toast(
    mensagem,
    tipo = "info"
){

    const el =
    document.createElement("div");

    el.className =
    `toast ${tipo}`;

    el.innerText =
    mensagem;

    document
        .getElementById(
            "toastContainer"
        )
        .appendChild(el);

    setTimeout(()=>{

        el.remove();

    },4000);

}
//toast fim
//Pagina em construção inicio
function paginaEmConstrucao(nome){

    document
        .getElementById(
            "page-content"
        )
        .innerHTML = `

        <h2>${nome}</h2>

        <br>

        <p>
            Módulo será implementado
            nas próximas etapas.
        </p>

    `;

    fecharMenuMobile();

}
//Pagina em construção fim
