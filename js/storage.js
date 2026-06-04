import {
    salvarNuvem,
    carregarNuvem
} from "./database.js";

export async function salvar() {

    localStorage.setItem(
        "financasNubank",
        JSON.stringify(data)
    );

    if(window.usuarioLogado){

        try{

            await salvarNuvem(
                window.usuarioLogado.uid,
                data
            );

            console.log(
                "Dados salvos na nuvem"
            );

        }catch(error){

            console.error(
                error
            );

        }

    }

}

export async function carregar() {

    if(window.usuarioLogado){

        try{

            const dadosNuvem =
            await carregarNuvem(
                window.usuarioLogado.uid
            );

            if(dadosNuvem){

                Object.assign(
                    data,
                    dadosNuvem
                );

                console.log(
                    "Dados carregados da nuvem"
                );

                return;

            }

        }catch(error){

            console.error(
                error
            );

        }

    }

    const banco =
    localStorage.getItem(
        "financasNubank"
    );

    if(banco){

        Object.assign(
            data,
            JSON.parse(banco)
        );

    }

    if(
        data.configuracoes &&
        data.configuracoes.tema === "dark"
    ){

        document.body.classList.add(
            "dark"
        );

    }

}window.salvar = salvar;
window.carregar = carregar;