const token = localStorage.getItem('token');
fetch('http://localhost:3030/empresa', {
    method: 'GET',
    headers: {
        'authorization': token,
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
    }
    return response.json();
})
.then(data => {
    document.getElementById("perfil-box-titulo-h2").innerHTML = data.nome;
    document.getElementById("perfil-box-info-cidade").innerHTML = data.cidade;
    document.getElementById("perfil-box-info-endereco").innerHTML = data.logradouro + " - " + data.bairro + ", " + data.numero
    document.getElementById("perfil-box-info-funcionamento").innerHTML = "Aberto das " + data.horario_func[0] + " as " + data.horario_func[1]
})
.catch(error => console.error('Erro:', error));


function perfilButton(){
    document.getElementById("perfil").style.display = "block"
    document.getElementById("feed").style.display = "none"
}
function feedButton(){
    document.getElementById("perfil").style.display = "none"
    document.getElementById("feed").style.display = "block"
}

function buttonProcedimentos(){
    document.getElementById("perfil-box-menu-point-procedimentos").style.backgroundColor = "#f7abc2"
    document.getElementById("perfil-box-menu-point-informacoes").style.backgroundColor = "#fff"
    document.getElementById("perfil-box-menu-point-avaliacoes").style.backgroundColor = "#fff"

    document.getElementById("perfil-box-procedimentos").style.display = "block"
    document.getElementById("perfil-box-avaliações").style.display = "none"
    document.getElementById("perfil-box-informações").style.display = "none"
}
function buttonAvaliacoes(){
    document.getElementById("perfil-box-menu-point-procedimentos").style.backgroundColor = "#fff"
    document.getElementById("perfil-box-menu-point-informacoes").style.backgroundColor = "#fff"
    document.getElementById("perfil-box-menu-point-avaliacoes").style.backgroundColor = "#f7abc2"

    document.getElementById("perfil-box-procedimentos").style.display = "none"
    document.getElementById("perfil-box-avaliações").style.display = "block"
    document.getElementById("perfil-box-informações").style.display = "none"
}
function buttonInformacoes(){
    document.getElementById("perfil-box-menu-point-procedimentos").style.backgroundColor = "#fff"
    document.getElementById("perfil-box-menu-point-informacoes").style.backgroundColor = "#f7abc2"
    document.getElementById("perfil-box-menu-point-avaliacoes").style.backgroundColor = "#fff"

    document.getElementById("perfil-box-procedimentos").style.display = "none"
    document.getElementById("perfil-box-avaliações").style.display = "none"
    document.getElementById("perfil-box-informações").style.display = "flex"
}

function excluirPerfil(){
    const tokenParts = token.split('.');
    const payload = tokenParts[1];
    const decodedPayload = window.atob(payload);
    const tokenData = JSON.parse(decodedPayload);
    let id = ""
    let url = ""
    if(tokenData.id === undefined){
        id = tokenData.cnpj
        console.log(id)
        url = `http://localhost:3030/empresa`;
    }else{
        id = tokenData.id
        url = `http://localhost:3030/clientes`;
        console.log(id)
    }
    console.log(token)
    fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        window.location.href = '../index.html';
    })
    .catch(error => console.error('Erro:', error));
    

}