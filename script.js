const baseUrl = "http://127.0.0.1:5000"
const aleatorio = "/charadas"
let respostaCorreta = "";

async function getCharada() {
    try {
        const charada = await fetch(baseUrl + aleatorio);
        const charadaJson = await charada.json();
        
        document.getElementById("pergunta").innerHTML = charadaJson.pergunta;
        respostaCorreta = charadaJson.resposta;
        
        document.getElementById("resposta-container").innerHTML = "<p>...</p>";
        document.getElementById("input-resposta").value = "";
    } catch (error) {
        console.log("Erro ao chamar a API: " + error);
    }
}

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function verificaResposta() {
    const respostaUsuario = document.getElementById("input-resposta").value.trim().toLowerCase();
    if (respostaUsuario === "") {
        document.getElementById("resposta-container").innerHTML = '<p class="text-warning">Por favor, digite uma resposta.</p>';
        return;
    }
    
    const respostaFormatada = removerAcentos(respostaCorreta.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""));
    const respostaUsuarioFormatada = removerAcentos(respostaUsuario.replace(/[^a-zA-Z0-9 ]/g, ""));
    const respostaContainer = document.getElementById("resposta-container");
    
    const palavrasCorretas = respostaFormatada.split(" ").filter(p => p.length > 2);
    const palavrasUsuario = respostaUsuarioFormatada.split(" ").filter(p => p.length > 2);
    
    let palavrasEmComum = palavrasUsuario.filter(palavra => palavrasCorretas.includes(palavra)).length;
    let taxaAcerto = palavrasEmComum / palavrasCorretas.length;
    
    if (taxaAcerto >= 0.5) {
        respostaContainer.innerHTML = '<p class="text-success">Correto! 🎉</p>';
    } else {
        respostaContainer.innerHTML = `<p class="text-danger">Errado! A resposta correta é: ${respostaCorreta}</p>`;
    }
}

function novaCharada() {
    getCharada();
}

getCharada();
