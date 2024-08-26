const mapeamentoVogais = [
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
];

function botaoCriptografar() {
    processarTexto(criptografar);
}

function botaoDescriptografar() {
    processarTexto(descriptografar);
}

function processarTexto(funcaoDeProcessamento) {
    const textoOriginal = document.querySelector('#espacoMensagem').value;
    
    if (!verificarSomenteLetras(textoOriginal)) {
        alert('O texto contém caracteres não permitidos. Use apenas letras.');
        return;
    }

    const mostrarTexto = document.querySelector('#tituloResposta');
    mostrarTexto.innerText = funcaoDeProcessamento(textoOriginal, mapeamentoVogais);
    esconderAviso();
    adicionarBotaoCopiar();
}

function criptografar(texto, mapeamento) {
    return texto.split('').map(letra => {
        const [chave, valor] = mapeamento.find(([chave]) => chave === letra) || [];
        return valor || letra;
    }).join('');
}

function descriptografar(texto, mapeamento) {
    let textoDescriptografado = texto;
    mapeamento.forEach(([chave, valor]) => {
        textoDescriptografado = textoDescriptografado.split(valor).join(chave);
    });
    return textoDescriptografado;
}

function verificarSomenteLetras(texto) {
    const regex = /^[a-zA-Z\s]+$/; 
    return regex.test(texto);
}

function esconderAviso() {
    const paragrafoAviso = document.querySelector('.paragrafoAviso');
    paragrafoAviso.style.display = 'none';
}

function adicionarBotaoCopiar() {
    const container = document.querySelector('#containerBotaoCopiar');
    container.innerHTML = '';
    const botaoCopiar = document.createElement('button');
    botaoCopiar.innerText = 'Copiar texto';
    botaoCopiar.onclick = copiarTexto;
    container.appendChild(botaoCopiar);
}

function copiarTexto() {
    const textoParaCopiar = document.querySelector('#tituloResposta').innerText;
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => {
            document.querySelector('#espacoMensagem').value = textoParaCopiar;
        })
        .catch(err => {
            console.error('Erro ao copiar o texto: ', err);
        });
}
