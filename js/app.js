//Este arquivo é responsável pelo ponto de entrada das aplicações

const menuBtn =
document.getElementById(
    "menuBtn"
);

const sidebar =
document.getElementById(
    "sidebar"
);

const overlay =
document.getElementById(
    "overlay"
);

menuBtn.addEventListener(
    "click",
    ()=>{

        sidebar.classList.toggle(
            "active"
        );

        overlay.classList.toggle(
            "active"
        );

        document.body.classList.toggle(
            "menu-open"
        );

    }
);

//melhora na UX

overlay.addEventListener(
    "click",
    ()=>{

        sidebar.classList.remove(
            "active"
        );

        overlay.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }
);

//Inicializar Sistema
//Inicializar Sistema



toast(
    "Sistema carregado",
    "success"
);
