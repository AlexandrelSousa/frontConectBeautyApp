const token = localStorage.getItem('token');
const tokenParts = token.split('.');
const payload = tokenParts[1];
const decodedPayload = window.atob(payload);
const tokenData = JSON.parse(decodedPayload);
let procedimentosComID = {
    nome: [],
    id: []
}
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
        document.getElementById("perfil-box-info-funcionamento").innerHTML = "Aberto das " + dataUser.inicio_expediente.substring(0, 5) + " as " + dataUser.fim_expediente.substring(0, 5)
        document.getElementById("perfil-box-info-botaoExcluir").style.display = "none";
        fetch('http://localhost:3030/procedimento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
        },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar procedimentos');
            }
            return response.json();
        })
        .then(procedimentos => {
            const divBox = document.getElementById("perfil-box-procedimentos")
            const divProcedimentos = `
                <div class="perfil-box-procedimentos-procedimentos">
                    <div class="perfil-box-procedimentos-imagem" id="perfil-box-procedimentos-imagem">
                        <img id="perfil-box-procedimentos-image-img" src="../assets/cilios-icon.svg" alt="" width="80%" height= "min-content">
                    </div>
                        <div class="perfil-box-procedimentos-informacoes">
                            <div class="perfil-box-procedimentos-informacoes-titulo">
                            <h3 id="perfil-box-procedimentos-titulo">Nome do Procedimento</h3>
                        </div>
                        <div class="perfil-box-procedimentos-informacoes-informacoes">
                        <div class="perfil-box-procedimentos-informacoes-informacoes-dados">
                            <p id="perfil-box-procedimentos-preço">R$ 00,00</p>
                            <button onClick="abrirExcluirProced(this)" id="btn0">EXCLUIR</button>
                        </div>
                        <div class="perfil-box-procedimentos-informacoes-informacoes-editar" id="0" onclick="abrirFormEditProced(this)">
                            <img src="../assets/edit-icon-cor2.png">
                            <label for="">EDITAR</label>
                        </div>
                    </div>
                </div>
            </div>`
            console.log("tamanho do array: " + procedimentos.length + "\nProcedimentos: " + procedimentos)
            for(let i=0; i<procedimentos.length ; i++){
                procedimentosComID.nome[i] = procedimentos[i].nome
                procedimentosComID.id[i] = procedimentos[i].id_pro
                divBox.innerHTML += divProcedimentos
                document.getElementById("perfil-box-procedimentos-titulo").id = 'perfil-box-procedimentos-titulo' + i
                document.getElementById("0").id = procedimentos[i].nome
                document.getElementById("btn0").id = "btn" + procedimentos[i].nome
                document.getElementById("perfil-box-procedimentos-preço").id = 'perfil-box-procedimentos-preço' + i
                document.getElementById("perfil-box-procedimentos-titulo" + i).innerHTML = procedimentos[i].nome
                document.getElementById("perfil-box-procedimentos-preço" + i).innerHTML = "R$ " + procedimentos[i].preco
                
                document.getElementById("perfil-box-procedimentos-image-img").id = 'perfil-box-procedimentos-image-img' + i
                
                if(procedimentos[i].categoria === "sobrancelha"){
                    document.getElementById("perfil-box-procedimentos-image-img" + i).src = "../assets/sobrancelha-icon.svg"
                } else if(procedimentos[i].categoria === "cilios"){
                    document.getElementById("perfil-box-procedimentos-image-img" + i).src = "../assets/cilios-icon.svg"
                } else if(procedimentos[i].categoria === "pés"){
                    document.getElementById("perfil-box-procedimentos-image-img" + i).src = "../assets/pé-icon.svg"    
                } else if(procedimentos[i].categoria === "mãos"){
                    document.getElementById("perfil-box-procedimentos-image-img" + i).src = "../assets/mãos_icon.svg"    
                } else if(procedimentos[i].categoria === "makeup"){
                    document.getElementById("perfil-box-procedimentos-image-img"  + i).src = "../assets/makeup_icon.svg"    
                }else{
                    document.getElementById("perfil-box-procedimentos-image-img"  + i).src = "../assets/outros-icon.svg"    
                }
            }
        }).catch(error => {
            console.error('Erro:', error);
        });
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
            document.getElementById("edit-hora-abre").value = data.inicio_expediente;
            document.getElementById("edit-hora-fecha").value = data.fim_expediente;
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
            inicio_expediente: document.getElementById("edit-hora-abre").value,
            fim_expediente: document.getElementById("edit-hora-fecha").value, 
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

function pesChange(){
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");
    var CheckboxOutros = document.getElementById("checkbox-outros");

    CheckboxOutros.checked = false;
    CheckboxMãos.checked = false;
    CheckboxSobrancelha.checked = false;
    CheckboxCilios.checked = false;
    CheckboxMakeup.checked = false;
}

function maosChange(){
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");
    var CheckboxOutros = document.getElementById("checkbox-outros");

    CheckboxOutros.checked = false;
    CheckboxPés.checked = false;
    CheckboxSobrancelha.checked = false;
    CheckboxCilios.checked = false;
    CheckboxMakeup.checked = false;
}

function sobrancelhaChange(){
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");
    var CheckboxOutros = document.getElementById("checkbox-outros");

    CheckboxOutros.checked = false;
    CheckboxPés.checked = false;
    CheckboxMãos.checked = false;
    CheckboxCilios.checked = false;
    CheckboxMakeup.checked = false;
}

function ciliosChange(){
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");
    var CheckboxOutros = document.getElementById("checkbox-outros");

    CheckboxOutros.checked = false;
    CheckboxPés.checked = false;
    CheckboxMãos.checked = false;
    CheckboxSobrancelha.checked = false;
    CheckboxMakeup.checked = false;
}

function makeupChange(){
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxOutros = document.getElementById("checkbox-outros");
    
    CheckboxOutros.checked = false;
    CheckboxPés.checked = false;
    CheckboxMãos.checked = false;
    CheckboxSobrancelha.checked = false;
    CheckboxCilios.checked = false;
}
function outrosChange(){
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");

    CheckboxMakeup.checked = false;
    CheckboxPés.checked = false;
    CheckboxMãos.checked = false;
    CheckboxSobrancelha.checked = false;
    CheckboxCilios.checked = false;
}
function abrirFormAddProced(){
    var form = document.getElementById("perfil-box-procedimentos-adicionar-form")
    if( form.style.display === "none"){
        form.style.display = "block"
    }else{
        form.style.display = "none"
    }
    document.getElementById("categorias-button-adicionar").style.display = "inline-block"
    document.getElementById("categorias-button-editar").style.display = "none"
}
function abrirFormEditProced(nome){
    localStorage.setItem('nomeAntigo', nome.id)
    var form = document.getElementById("perfil-box-procedimentos-adicionar-form")
    if( form.style.display === "none"){
        form.style.display = "block"
    }else{
        form.style.display = "none"
    }
    document.getElementById("categorias-button-adicionar").style.display = "none"
    document.getElementById("categorias-button-editar").style.display = "inline-block"
    fetch('http://localhost:3030/procedimento', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar procedimentos');
            }
            return response.json();
        })
        .then(procedimentos => {
            let j
            for(let i=0; i<procedimentos.length; i++){
                if(procedimentos[i].nome === nome.id){
                    j = i
                }
            }
            document.getElementById("adicionar-novo-procedimento-nome").value = procedimentos[j].nome
            document.getElementById("adicionar-novo-procedimento-descricao").innerHTML = procedimentos[j].descricao
            document.getElementById("adicionar-novo-procedimento-duracao").value = procedimentos[j].duracao
            document.getElementById("adicionar-novo-procedimento-preco").value = procedimentos[j].preco
            if(procedimentos[j].categoria === "sobrancelha"){
                document.getElementById("checkbox-sobrancelha").checked = true
            } else if(procedimentos[j].categoria === "cilios"){
                document.getElementById("checkbox-cilios").checked = true
            } else if(procedimentos[j].categoria === "pés"){
                document.getElementById("checkbox-pés").checked = true   
            } else if(procedimentos[j].categoria === "mãos"){
                document.getElementById("checkbox-mãos").checked = true  
            } else if(procedimentos[j].categoria === "makeup"){
                document.getElementById("checkbox-makeup").checked = true   
            }else{
                document.getElementById("checkbox-outros").checked = true   
            }
        }).catch(error => {
            console.error('Erro:', error);
        });
}
function adicionarProcedimento(){
    var categoria
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");
    var CheckboxOutros = document.getElementById("checkbox-outros");
    if(CheckboxPés.checked === true){
        categoria = "pés"
    } else if(CheckboxMãos.checked === true){
        categoria = "mãos"
    } else if(CheckboxCilios.checked === true){
        categoria = "cilios"
    } else if(CheckboxMakeup.checked === true){
        categoria = "makeup"
    } else if(CheckboxSobrancelha.checked === true){
        categoria = "sobrancelha"
    }else if(CheckboxOutros.checked === true){
        categoria = "outros"
    }else{
        alert("Selecione uma categoria")
    }
    procedimento = {
        nome: document.getElementById("adicionar-novo-procedimento-nome").value,
        descricao: document.getElementById("adicionar-novo-procedimento-descricao").value,
        duracao: document.getElementById("adicionar-novo-procedimento-duracao").value,
        preco: parseFloat(document.getElementById("adicionar-novo-procedimento-preco").value),
        categoria: categoria
    }
    console.log(procedimento)
    // Configurações da requisição
    if(procedimento.nome === ""){
        alert("Dê um nome para o procedimento")
    } else if(procedimento.descricao === ""){
        alert("Dê uma descrição para o procedimento")
    } else if (procedimento.preco === ""){
        alert("Dê um preço para o procedimento")
    } else if(procedimento.duracao === ""){
        alert("Dê uma duração para o procedimento")
    }else{
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(procedimento)
        };
        fetch("http://localhost:3030/procedimento", options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar recurso');
            }
            return response.json();
        })
        .then(data => {
            console.log('procedimento criado com sucesso:', data);
            window.location.reload(true)
        })
        .catch(error => {
            console.error('Erro ao criar procedimento: ', error);
        });
    }
}

function editarProcedimento(){
    var categoria
    var CheckboxPés = document.getElementById("checkbox-pés");
    var CheckboxMãos = document.getElementById("checkbox-mãos");
    var CheckboxSobrancelha = document.getElementById("checkbox-sobrancelha");
    var CheckboxCilios = document.getElementById("checkbox-cilios");
    var CheckboxMakeup = document.getElementById("checkbox-makeup");
    var CheckboxOutros = document.getElementById("checkbox-outros");
    if(CheckboxPés.checked === true){
        categoria = "pés"
    } else if(CheckboxMãos.checked === true){
        categoria = "mãos"
    } else if(CheckboxCilios.checked === true){
        categoria = "cilios"
    } else if(CheckboxMakeup.checked === true){
        categoria = "makeup"
    } else if(CheckboxSobrancelha.checked === true){
        categoria = "sobrancelha"
    }else if(CheckboxOutros.checked === true){
        categoria = "outros"
    }else{
        alert("Selecione uma categoria")
    }
    const procedimento = {
        nome_antigo: localStorage.getItem('nomeAntigo'),
        nome: document.getElementById("adicionar-novo-procedimento-nome").value,
        descricao: document.getElementById("adicionar-novo-procedimento-descricao").innerHTML,
        duracao: document.getElementById("adicionar-novo-procedimento-duracao").value,
        preco: parseFloat(document.getElementById("adicionar-novo-procedimento-preco").value),
        categoria: categoria
    }
    if(procedimento.nome === ""){
        alert("Dê um nome para o procedimento")
    } else if(procedimento.descricao === ""){
        alert("Dê uma descrição para o procedimento")
    } else if (procedimento.preco === ""){
        alert("Dê um preço para o procedimento")
    } else if(procedimento.duracao === ""){
        alert("Dê uma duração para o procedimento")
    }else{
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(procedimento)
        };
        fetch("http://localhost:3030/procedimento", options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar recurso');
            }
            return response.json();
        })
        .then(data => {
            console.log('procedimento editado com sucesso:', data);
            window.location.reload(true)
        })
        .catch(error => {
            console.error('Erro ao editar procedimento: ', error);
        });
    }

}
function abrirExcluirProced(nome){
    let nome2 = nome.id.replace("btn", "")
    localStorage.setItem('nome', nome2)
    document.getElementById("fundoEscuro3").style.display = "flex"
}
function naoExcluirProc(){
    document.getElementById("fundoEscuro3").style.display = "none"
}
function excluirProcedimento(){
    let idResgatado
    for(let i=0; i<procedimentosComID.nome.length; i++){
        if(procedimentosComID.nome[i] == localStorage.getItem('nome')){
            idResgatado = procedimentosComID.id[i]
        }
    }
    const nomeProc = {
        nome: localStorage.getItem('nome'),
        id_pro: idResgatado
    }
    console.log(nomeProc)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(nomeProc)
    };
    fetch("http://localhost:3030/procedimento", options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        window.location.reload(true);
    })
    .catch(error => console.error('Erro:', error));
}
$(document).ready(function(){
    $('#adicionar-novo-procedimento-duracao').mask('99:99:99');
});

$(document).ready(function(){
    $('#adicionar-novo-procedimento-preco').mask('999.99', {reverse: true});
});


function barraCilios(){
    if(document.getElementById("categorias-barra-cilios").style.display == "block"){
        document.getElementById("categorias-barra-cilios").style.display = "none"
        var feedEmpresas = document.getElementById("feed-empresas")
        while (feedEmpresas.firstChild) {
            feedEmpresas.removeChild(feedEmpresas.firstChild);
        }
        listarTodos()
    }else{
        document.getElementById("categorias-barra-cilios").style.display = "block"
        document.getElementById("categorias-barra-mão").style.display = "none"
        document.getElementById("categorias-barra-sobrancelha").style.display = "none"
        document.getElementById("categorias-barra-makeup").style.display = "none"
        document.getElementById("categorias-barra-pé").style.display = "none"
        document.getElementById("categorias-barra-outros").style.display = "none"
    
        const filtro = {
            categoria: "cilios"
        };
        
        // Convertendo os parâmetros de filtro em uma string de consulta
        const queryString = new URLSearchParams(filtro).toString();
        const url = `http://localhost:3030/procedimento/filtro?${queryString}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao aplicar o filtro');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var feedEmpresas = document.getElementById("feed-empresas")
                feedEmpresas.dataset.id = data.length
                while (feedEmpresas.firstChild) {
                    feedEmpresas.removeChild(feedEmpresas.firstChild);
                }
                let k = 0
    
                adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<3; j++){
                        if(k!=data.length){
                            document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                            document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                            document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                        }else{
                            break;
                        }
                        k++
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao aplicar o filtro: ', error);
            });
    }
}
function barraMão(){
    if(document.getElementById("categorias-barra-mão").style.display == "block"){
        document.getElementById("categorias-barra-mão").style.display = "none"
        var feedEmpresas = document.getElementById("feed-empresas")
        while (feedEmpresas.firstChild) {
            feedEmpresas.removeChild(feedEmpresas.firstChild);
        }
        listarTodos()
    }else{
        document.getElementById("categorias-barra-cilios").style.display = "none"
        document.getElementById("categorias-barra-mão").style.display = "block"
        document.getElementById("categorias-barra-sobrancelha").style.display = "none"
        document.getElementById("categorias-barra-makeup").style.display = "none"
        document.getElementById("categorias-barra-pé").style.display = "none"
        document.getElementById("categorias-barra-outros").style.display = "none"
        
        const filtro = {
            categoria: "mãos"
        };
        
        // Convertendo os parâmetros de filtro em uma string de consulta
        const queryString = new URLSearchParams(filtro).toString();
        const url = `http://localhost:3030/procedimento/filtro?${queryString}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao aplicar o filtro');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var feedEmpresas = document.getElementById("feed-empresas")
                feedEmpresas.dataset.id = data.length
                while (feedEmpresas.firstChild) {
                    feedEmpresas.removeChild(feedEmpresas.firstChild);
                }
                let k = 0
    
                adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<3; j++){
                        if(k!=data.length){
                            document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                            document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                            document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                        }else{
                            break;
                        }
                        k++
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao aplicar o filtro: ', error);
            });
    }
}
function barraSobrancelha(){
    if(document.getElementById("categorias-barra-sobrancelha").style.display == "block"){
        document.getElementById("categorias-barra-sobrancelha").style.display = "none"
        var feedEmpresas = document.getElementById("feed-empresas")
        while (feedEmpresas.firstChild) {
            feedEmpresas.removeChild(feedEmpresas.firstChild);
        }
        listarTodos()
    }else{
        document.getElementById("categorias-barra-cilios").style.display = "none"
        document.getElementById("categorias-barra-mão").style.display = "none"
        document.getElementById("categorias-barra-sobrancelha").style.display = "block"
        document.getElementById("categorias-barra-makeup").style.display = "none"
        document.getElementById("categorias-barra-pé").style.display = "none"
        document.getElementById("categorias-barra-outros").style.display = "none"
    
        const filtro = {
            categoria: "sobrancelha"
        };
        
        // Convertendo os parâmetros de filtro em uma string de consulta
        const queryString = new URLSearchParams(filtro).toString();
        const url = `http://localhost:3030/procedimento/filtro?${queryString}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao aplicar o filtro');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var feedEmpresas = document.getElementById("feed-empresas")
                feedEmpresas.dataset.id = data.length
                while (feedEmpresas.firstChild) {
                    feedEmpresas.removeChild(feedEmpresas.firstChild);
                }
                let k = 0
    
                adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<3; j++){
                        if(k!=data.length){
                            document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                            document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                            document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                        }else{
                            break;
                        }
                        k++
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao aplicar o filtro: ', error);
            });
    }
}
function barraMakeup(){
    if(document.getElementById("categorias-barra-makeup").style.display == "block"){
        document.getElementById("categorias-barra-makeup").style.display = "none"
        var feedEmpresas = document.getElementById("feed-empresas")
        while (feedEmpresas.firstChild) {
            feedEmpresas.removeChild(feedEmpresas.firstChild);
        }
        listarTodos()
    }else{
        document.getElementById("categorias-barra-cilios").style.display = "none"
        document.getElementById("categorias-barra-mão").style.display = "none"
        document.getElementById("categorias-barra-sobrancelha").style.display = "none"
        document.getElementById("categorias-barra-makeup").style.display = "block"
        document.getElementById("categorias-barra-pé").style.display = "none"
        document.getElementById("categorias-barra-outros").style.display = "none"
    
        const filtro = {
            categoria: "makeup"
        };
        
        // Convertendo os parâmetros de filtro em uma string de consulta
        const queryString = new URLSearchParams(filtro).toString();
        const url = `http://localhost:3030/procedimento/filtro?${queryString}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao aplicar o filtro');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var feedEmpresas = document.getElementById("feed-empresas")
                feedEmpresas.dataset.id = data.length
                while (feedEmpresas.firstChild) {
                    feedEmpresas.removeChild(feedEmpresas.firstChild);
                }
                let k = 0
    
                adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<3; j++){
                        if(k!=data.length){
                            document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                            document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                            document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                        }else{
                            break;
                        }
                        k++
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao aplicar o filtro: ', error);
            });
    }
}
function barraPé(){
    if(document.getElementById("categorias-barra-pé").style.display == "block"){
        document.getElementById("categorias-barra-pé").style.display = "none"
        var feedEmpresas = document.getElementById("feed-empresas")
        while (feedEmpresas.firstChild) {
            feedEmpresas.removeChild(feedEmpresas.firstChild);
        }
        listarTodos()
    }else{
        document.getElementById("categorias-barra-cilios").style.display = "none"
        document.getElementById("categorias-barra-mão").style.display = "none"
        document.getElementById("categorias-barra-sobrancelha").style.display = "none"
        document.getElementById("categorias-barra-makeup").style.display = "none"
        document.getElementById("categorias-barra-pé").style.display = "block"
        document.getElementById("categorias-barra-outros").style.display = "none"
    
        const filtro = {
            categoria: "pés"
        };
        
        // Convertendo os parâmetros de filtro em uma string de consulta
        const queryString = new URLSearchParams(filtro).toString();
        const url = `http://localhost:3030/procedimento/filtro?${queryString}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao aplicar o filtro');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var feedEmpresas = document.getElementById("feed-empresas")
                feedEmpresas.dataset.id = data.length
                while (feedEmpresas.firstChild) {
                    feedEmpresas.removeChild(feedEmpresas.firstChild);
                }
                let k = 0
    
                adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<3; j++){
                        if(k!=data.length){
                            document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                            document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                            document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                        }else{
                            break;
                        }
                        k++
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao aplicar o filtro: ', error);
            });
    }
}

function barraOutros(){
    if(document.getElementById("categorias-barra-outros").style.display == "block"){
        document.getElementById("categorias-barra-outros").style.display = "none"
        var feedEmpresas = document.getElementById("feed-empresas")
        while (feedEmpresas.firstChild) {
            feedEmpresas.removeChild(feedEmpresas.firstChild);
        }
        listarTodos()
    }else{
        document.getElementById("categorias-barra-cilios").style.display = "none"
        document.getElementById("categorias-barra-mão").style.display = "none"
        document.getElementById("categorias-barra-sobrancelha").style.display = "none"
        document.getElementById("categorias-barra-makeup").style.display = "none"
        document.getElementById("categorias-barra-pé").style.display = "none"
        document.getElementById("categorias-barra-outros").style.display = "block"
    
        const filtro = {
            categoria: "outros"
        };
        
        // Convertendo os parâmetros de filtro em uma string de consulta
        const queryString = new URLSearchParams(filtro).toString();
        const url = `http://localhost:3030/procedimento/filtro?${queryString}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao aplicar o filtro');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                var feedEmpresas = document.getElementById("feed-empresas")
                feedEmpresas.dataset.id = data.length
                let k = 0
    
                adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
                for(let i=0; i<data.length; i++){
                    for(let j=0; j<3; j++){
                        if(k!=data.length){
                            document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                            document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                            document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                        }else{
                            break;
                        }
                        k++
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao aplicar o filtro: ', error);
            });
    }
}

function listarTodos(){
    $(document).ready(function(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch("http://localhost:3030/empresa/todas", options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar recurso');
            }
            return response.json();
        })
        .then(data => {
            console.log('empresas carregadas com sucesso:', data);
            document.getElementById("feed-empresas").dataset.id = data.length
            let k = 0
            adicionarDivDinamica(Math.ceil(data.length / 3), data.length)
            for(let i=0; i<data.length; i++){
                for(let j=0; j<3; j++){
                    if(k!=data.length){
                        document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[k].cnpj
                        document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[k].nome
                        document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[k].descricao
                    }else{
                        break;
                    }
                    k++
                }
            }
        })
        .catch(error => {
            console.error('Erro ao consultar empresas: ', error);
        });
    });
}

function adicionarDivDinamica(numLinhas, numColum){
    let i
    let j
    let l = 0
    
    const feedLinhas = `
    <div class="feed-empresas-linha" id="feed-empresas-linha"></div>
    `
    const feedColuna = `
    <div class="feed-empresas-coluna" id="feed-empresas-coluna">
        <div class="feed-empresas-coluna-imagem" id="feed-empresas-coluna-imagem"></div>
        <label class="feed-empresas-coluna-nome" id="feed-empresas-coluna-nome"></label>
        <textarea class="feed-empresas-coluna-descricao" id="feed-empresas-coluna-descricao" rows="3" cols="10" readonly maxlength="20"></textarea>
    </div>
    `
    for (i=0; i<numLinhas; i++){
        document.getElementById("feed-empresas").innerHTML += feedLinhas
        document.getElementById("feed-empresas-linha").id = "feed-empresas-linha-" + i
        for(j=0; j<3; j++){
            if(l != numColum){
                document.getElementById("feed-empresas-linha-" + i).innerHTML += feedColuna
                document.getElementById("feed-empresas-coluna").id = "feed-empresas-linha-" + i + "-coluna-" + j
                //document.getElementById("feed-empresas-linha-" + i + "-coluna-" + j).dataset.id = data[l].cnpj
                document.getElementById("feed-empresas-coluna-imagem").id = "feed-empresas-coluna-imagem-linha-" + i + "-coluna-" + j
                document.getElementById("feed-empresas-coluna-nome").id = "feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j
                document.getElementById("feed-empresas-coluna-descricao").id = "feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j
                //document.getElementById("feed-empresas-coluna-nome-linha-" + i + "-coluna-" + j).innerHTML = data[l].nome
                //document.getElementById("feed-empresas-coluna-descricao-linha-" + i + "-coluna-" + j).innerHTML += data[l].descricao
            }else{
                break;
            }
            l++
        }
    }
}

listarTodos();