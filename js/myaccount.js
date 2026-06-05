

// =====================================
// MINHA CONTA
// =====================================

function renderMinhaConta(){
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
        Minha Conta
    </h2>

    <!-- PERFIL -->

    <div class="card">

        <div
            style="
                text-align:center;
            "
        >

            <img

                src="${
                    user.photoURL ||
                    "assets/img/user.png"
                }"

                alt="Usuário"

                style="
                    width:120px;
                    height:120px;
                    border-radius:50%;
                    object-fit:cover;
                    border:4px solid #f0f0f0;
                    margin-bottom:15px;
                "

            >

            <h3>
                ${
                    user.displayName ||
                    "Usuário"
                }
            </h3>

            <p
                style="
                    color:#666;
                    margin-top:5px;
                "
            >
                ${
                    user.email
                }
            </p>

        </div>

    </div>

    <!-- SEGURANÇA -->

    <div class="card">

        <h3>
            🔐 Segurança
        </h3>

        <br>

        <p>

            <strong>
                Provedor:
            </strong>

            Google

        </p>

        <br>

        <p>

            <strong>
                E-mail verificado:
            </strong>

            ${
                user.emailVerified
                ? "Sim"
                : "Não"
            }

        </p>

        <br>

        <p>

            <strong>
                UID:
            </strong>

            <span
                id="uidUsuario"
                style="
                    word-break:break-all;
                "
            >
                ${
                    user.uid
                }
            </span>

        </p>

        <br>

        <button

            class="botaoclick"

            id="btnCopiarUid"

        >

            Copiar UID

        </button>

    </div>

    <!-- ESTATÍSTICAS -->

    <div class="card">

        <h3>
            📊 Estatísticas
        </h3>

        <br>

        <p>

            <strong>
                Conta Principal:
            </strong>

            ${
                formatarMoeda(
                    data.conta.saldo
                )
            }

        </p>

        <br>

        <p>

            <strong>
                Patrimônio Total:
            </strong>

            ${
                formatarMoeda(
                    patrimonio()
                )
            }

        </p>

        <br>

        <p>

            <strong>
                Caixinhas:
            </strong>

            ${
                data.caixinhas.length
            }

        </p>

        <br>

        <p>

            <strong>
                Movimentações:
            </strong>

            ${
                data.historico.length
            }

        </p>

    </div>

    <!-- SESSÃO -->

    <div class="card">

        <h3>
            🚪 Sessão
        </h3>

        <br>

        <p>

            Você está conectado com sua conta Google.

        </p>

        <br>

        <button

            class="botaoclick"

            id="btnLogout"

            style="
                background:#d32f2f;
            "

        >

            Encerrar Sessão

        </button>

    </div>

    `;

    registrarEventosMinhaConta();

}

// =====================================
// EVENTOS
// =====================================

function registrarEventosMinhaConta(){

    document
    .getElementById(
        "btnLogout"
    )
    ?.addEventListener(

        "click",

        logoutGoogle

    );

    document
    .getElementById(
        "btnCopiarUid"
    )
    ?.addEventListener(

        "click",

        copiarUID

    );

}

// =====================================
// COPIAR UID
// =====================================

function copiarUID(){

    const user =
    usuarioAtual();

    navigator.clipboard
    .writeText(
        user.uid
    )
    .then(()=>{

        toast(
            "UID copiado",
            "success"
        );

    });

}

// =====================================
// EXPORTS
// =====================================

window.renderMinhaConta =
renderMinhaConta;

export {
    renderMinhaConta
};