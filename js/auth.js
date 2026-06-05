
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
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider =
new GoogleAuthProvider();

// =====================================
// TELA DE LOGIN
// =====================================

export function mostrarTelaLogin(){

    document.getElementById(
        "page-content"
    ).innerHTML = `

    <div style="
        max-width:420px;
        margin:80px auto;
        text-align:center;
        color:black;
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

// =====================================
// LOGIN GOOGLE
// =====================================

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

// =====================================
// MONITORAMENTO DE SESSÃO
// =====================================

onAuthStateChanged(

    auth,

    async (user)=>{

        if(user){

            window.usuarioLogado =
            user;

            await carregar();

            renderDashboard();

        }else{

            mostrarTelaLogin();

        }

    }

);

// =====================================
// EXPORTA LOGIN
// =====================================

export {
    loginGoogle
};
// =====================================
// LOGOUT GOOGLE
// =====================================

export async function logoutGoogle(){

    const confirmar = confirm(
        "Deseja realmente sair da conta?"
    );

    if(!confirmar){
        return;
    }

    try{

        await signOut(
            auth
        );

        toast(
            "Logout realizado com sucesso",
            "success"
        );

    }catch(error){

        console.error(error);

        toast(
            "Erro ao realizar logout",
            "error"
        );

    }

}

// =====================================
// DADOS DO USUÁRIO
// =====================================

export function usuarioAtual(){

    return auth.currentUser;

}

// =====================================
// VERIFICA LOGIN
// =====================================

export function estaLogado(){

    return !!auth.currentUser;

}
export function exigirLogin(){
 console.log("exigirLogin executou");
    if(!auth.currentUser){
console.log("usuario nao logado");
     toast("Faça login para acessar essa área",
    "Warning");
    
        mostrarTelaLogin();

        return false;

    }

    return true;

}

window.exigirLogin = exigirLogin;
window.usuarioAtual = usuarioAtual;
window.logoutGoogle = logoutGoogle;