const token = localStorage.getItem('token');
const tokenParts = token.split('.');
const payload = tokenParts[1];
const decodedPayload = window.atob(payload);
const tokenData = JSON.parse(decodedPayload);
let id = ""
let url = ""
let tipoDeUsuario = ""
if(tokenData.id === undefined){
    id = tokenData.cnpj
    console.log(id)
    url = `http://localhost:3030/empresa`;
    tipoDeUsuario = "empresa"
}else{
    id = tokenData.id
    url = `http://localhost:3030/clientes`;
    console.log(id)
    tipoDeUsuario = "cliente"
}
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'authorization': token,
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
    }
    return response.json();
})
.then(dataUser => {
    if(tipoDeUsuario == "empresa"){    
        document.getElementById("perfil-box-titulo-h2").innerHTML = dataUser.nome;
        document.getElementById("perfil-box-info-cidade").innerHTML = dataUser.cidade;
        document.getElementById("perfil-box-info-endereco").innerHTML = dataUser.logradouro + " - " + dataUser.bairro + ", " + dataUser.numero
        document.getElementById("perfil-box-info-funcionamento").innerHTML = "Aberto das " + dataUser.horario_func[0] + " as " + dataUser.horario_func[1]
        let classificacao = (100 * dataUser.classificacao)/5;
        if(classificacao >= 20){
            document.getElementById("perfil-box-info-avaliacoes-estrelas-1").style.backgroundColor = "#f7abc2"
        }else{
            document.getElementById("perfil-box-info-avaliacoes-estrelas-1").style.backgroundColor = "#ddd"    
        }if(classificacao >= 40){
            document.getElementById("perfil-box-info-avaliacoes-estrelas-2").style.backgroundColor = "#f7abc2"
        }else{
            document.getElementById("perfil-box-info-avaliacoes-estrelas-2").style.backgroundColor = "#ddd"        
        }if(classificacao >= 60){
            document.getElementById("perfil-box-info-avaliacoes-estrelas-3").style.backgroundColor = "#f7abc2"
        }else{
            document.getElementById("perfil-box-info-avaliacoes-estrelas-3").style.backgroundColor = "#ddd"        
        }if(classificacao >= 80){
            document.getElementById("perfil-box-info-avaliacoes-estrelas-4").style.backgroundColor = "#f7abc2"
        }else{
            document.getElementById("perfil-box-info-avaliacoes-estrelas-4").style.backgroundColor = "#ddd"        
        }if(classificacao >= 100){
            document.getElementById("perfil-box-info-avaliacoes-estrelas-5").style.backgroundColor = "#f7abc2"
        }else{
            document.getElementById("perfil-box-info-avaliacoes-estrelas-5").style.backgroundColor = "#ddd"        
        }
    }else{
        document.getElementById("perfil-box-titulo-h2").innerHTML = dataUser.nome;
        document.getElementById("perfil-box-info-cidade").innerHTML = "Seu email: " + dataUser.email;
        document.getElementById("perfil-box-info-endereco").innerHTML = "Seu telefone: " + dataUser.telefone
        document.getElementById("perfil-box-info-funcionamento").innerHTML = ""
        document.getElementById("perfil-box-info-avaliacoes").style.display = "none"
        document.getElementById("button-informacoes").style.display = "none"
        document.getElementById("button-avaliacoes").style.width = "45%"
        document.getElementById("button-procedimentos").style.width = "45%"
        document.getElementById("button-avaliacoes-p").innerHTML = "Avaliações feitas"
        document.getElementById("button-procedimentos-p").innerHTML = "Procedimentos agendados"
        const elementos = document.getElementsByClassName("perfil-box-menu-point");
        for (let i = 0; i < elementos.length; i++) {
            elementos[i].style.width = "8%";
        }
    }
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
function excluirConfirm(){
    document.getElementById("fundoEscuro").style.display = "flex";
}
function naoExcluir(){
    document.getElementById("fundoEscuro").style.display = "none";
}
function editarPerfilBox(){
    document.getElementById("fundoEscuro2").style.display = "flex";
    fetch(url, {
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
        if(tipoDeUsuario === "empresa"){    
            document.getElementById("edit-cnpj").value = data.cnpj;
            document.getElementById("edit-nome").value = data.nome;
            document.getElementById("edit-telefone").value = data.telefone;
            document.getElementById("edit-cidade").value = data.cidade;
            document.getElementById("edit-bairro").value = data.bairro;
            document.getElementById("edit-logradouro").value = data.logradouro;
            document.getElementById("edit-numero").value = data.numero;
            document.getElementById("edit-descricao").innerHTML = data.descricao;
            document.getElementById("edit-hora-abre").value = data.horario_func[0];
            document.getElementById("edit-hora-fecha").value = data.horario_func[1];
            data.dias_func[0] === true ? document.getElementById("edit-dia-dom").checked = true : document.getElementById("edit-dia-dom").checked = false;
            data.dias_func[1] === true ? document.getElementById("edit-dia-seg").checked = true : document.getElementById("edit-dia-seg").checked = false;
            data.dias_func[2] === true ? document.getElementById("edit-dia-ter").checked = true : document.getElementById("edit-dia-ter").checked = false;
            data.dias_func[3] === true ? document.getElementById("edit-dia-qua").checked = true : document.getElementById("edit-dia-qua").checked = false;
            data.dias_func[4] === true ? document.getElementById("edit-dia-qui").checked = true : document.getElementById("edit-dia-qui").checked = false;
            data.dias_func[5] === true ? document.getElementById("edit-dia-sex").checked = true : document.getElementById("edit-dia-sex").checked = false;
            data.dias_func[6] === true ? document.getElementById("edit-dia-sab").checked = true : document.getElementById("edit-dia-sab").checked = false;
        }else{
            document.getElementById("confirmEdit").style.height = "42%"
            document.getElementById("edit-cnpj").value = data.email;
            document.getElementById("ConfirmEdit-cnpj").style.height = "13%";
            document.getElementById("ConfirmEdit-senha").style.height = "13%";
            document.getElementById("campoInfoEditButton").style.height = "13%"
            document.getElementById("edit-nome").value = data.nome;
            document.getElementById("ConfirmEdit-nome").style.height = "13%";
            document.getElementById("edit-telefone").value = data.telefone;
            document.getElementById("ConfirmEdit-telefone").style.height = "13%";
            document.getElementById("ConfirmEdit-cidade").style.display = "none";
            document.getElementById("ConfirmEdit-bairro").style.display = "none";
            document.getElementById("ConfirmEdit-logradouro").style.display = "none";
            document.getElementById("ConfirmEdit-numero").style.display = "none";
            document.getElementById("ConfirmEdit-descricao").style.display = "none";
            document.getElementById("ConfirmEdit-horarioFunc").style.display = "none";
            document.getElementById("ConfirmEdit-diasFunc").style.display = "none";

        }
    })
    .catch(error => console.error('Erro:', error));
}
function fecharEdit(){
    document.getElementById("fundoEscuro2").style.display = "none";
}

function editarPerfil(){
    if(document.getElementById("edit-senha").value === ""){
        alert("Insira uma senha!")
    }else{
        document.getElementById("pop-up-confirm-edit").style.display = "flex";
    }
}
function confirmarEdicao(){
    const userDataConfirm = {
        emailOuCNPJ: document.getElementById("edit-cnpj").value,
        senha: document.getElementById("pop-up-corfirm-edit-senha").value
      };
    fetch('http://localhost:3030/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDataConfirm)
  })
  .then(response => {
    if(response.status === 400){
      throw new Error('Erro ao autenticar usuário: ' + response.statusText);
    }else if (!response.ok) {
        throw new Error('Erro ao autenticar usuário.' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Usuário autenticado com sucesso:', data);
    let dataEdit = [];
    if(tipoDeUsuario == "empresa"){
        let dias_func_var = [document.getElementById("edit-dia-dom").checked, document.getElementById("edit-dia-seg").checked, document.getElementById("edit-dia-ter").checked, document.getElementById("edit-dia-qua").checked, document.getElementById("edit-dia-qui").checked, document.getElementById("edit-dia-sex").checked, document.getElementById("edit-dia-sab").checked,]
        let horario_func = [document.getElementById("edit-hora-abre").value, document.getElementById("edit-hora-fecha").value]
        dataEdit = {
            senha: document.getElementById("edit-senha").value,
            nome: document.getElementById("edit-nome").value,
            telefone: document.getElementById("edit-telefone").value,
            cidade: document.getElementById("edit-cidade").value,
            bairro: document.getElementById("edit-bairro").value,
            logradouro: document.getElementById("edit-logradouro").value,
            numero: document.getElementById("edit-numero").value,
            descricao: document.getElementById("edit-descricao").innerHTML,
            horario_func: horario_func,
            dias_func: dias_func_var
        };
    } else{
        dataEdit = {
            nome: document.getElementById("edit-nome").value,
            senha: document.getElementById("edit-senha").value,
            telefone: document.getElementById("edit-telefone").value,
            id: id,
            email: document.getElementById("edit-cnpj").value
        }
    }
    console.log(dataEdit)
    // Configurações da requisição
    const options = {
        method: 'PUT', // Método HTTP PUT
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(dataEdit) // Converte os dados para JSON e os adiciona ao corpo da requisição
    };
    // Realiza a requisição PUT
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar recurso');
        }
        return response.json(); // Retorna os dados da resposta em formato JSON
    })
    .then(data => {
        console.log('Recurso atualizado com sucesso:', data);
        window.location.href = '../index.html';
    })
    .catch(error => {
        console.error('Erro durante a atualização do recurso:', error);
    });
  })
  .catch(error => {
    console.error('Erro durante a autenticação do usuário:', error.message);
    alert('Erro durante a autenticação: ' + error.message);
  });
}