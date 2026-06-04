import {
    auth
} from "./firebase.js";

import {
    salvar,
    carregar
} from "./storage.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

function mostrarTelaLogin(){

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <div style="
        max-width:420px;
        margin:80px auto;
        text-align:center;
        background:white;
        padding:30px;
        border-radius:20px;
        box-shadow:0 10px 30px rgba(0,0,0,.1);
    ">

        <h2>
            Finanças ORCDev
        </h2>

        <p style="margin:15px 0;">
            Entre para acessar
            seus dados financeiros.
        </p>

        <button
            id="btnGoogleLogin"
            class="botaoclick"
        >
            Entrar com Google
        </button>

    </div>

    `;

    document
    .getElementById(
        "btnGoogleLogin"
    )
    .addEventListener(
        "click",
        loginGoogle
    );

}

async function loginGoogle(){

    try{

        await signInWithPopup(
            auth,
            provider
        );

    }catch(error){

        console.error(error);

        alert(
            "Erro ao realizar login"
        );

    }

}
//Desnecessario
//window.salvar = salvar;
//window.carregar = carregar;
onAuthStateChanged(auth, async (user) => {

    if(user){

        window.usuarioLogado = user;

        await carregar();

        renderDashboard();

    }else{

        mostrarTelaLogin();

    }

});