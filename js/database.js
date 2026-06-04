import { db } from "./firebase.js";

import {
    ref,
    set,
    get
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

export async function salvarNuvem(uid, dados){

    await set(
        ref(
            db,
            `users/${uid}`
        ),
        dados
    );

}

export async function carregarNuvem(uid){

    const snapshot =
    await get(
        ref(
            db,
            `users/${uid}`
        )
    );

    if(snapshot.exists()){

        return snapshot.val();

    }

    return null;

}