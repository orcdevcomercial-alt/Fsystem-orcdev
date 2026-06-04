import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

function mostrarTelaLogout(user){

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

        <img
            src="${user.photoURL}"
            alt="Foto do usuário"
            style="
                width:80px;
                height:80px;
                border-radius:50%;
                margin-bottom:15px;
            "
        >

        <h2>
            Olá, ${user.displayName}
        </h2>

        <p style="margin:15px 0;">
            Você está conectado.
        </p>

        <button
            id="btnLogout"
            class="botaoclick"
        >
            Sair
        </button>

    </div>

    `;

    document
        .getElementById("btnLogout")
        .addEventListener(
            "click",
            logoutGoogle
        );

}
async function logoutGoogle(){

    try{

        await signOut(auth);

    }catch(error){

        console.error(error);

        alert(
            "Erro ao realizar logout"
        );

    }

}
onAuthStateChanged(auth, async (user) => {

    if(user){

        window.usuarioLogado = user;

        await carregar();

        mostrarTelaLogout(user);

    }else{

        mostrarTelaLogin();

    }

});
document
    .getElementById("btnLogout")
    .addEventListener(
        "click",
        logoutGoogle
    );