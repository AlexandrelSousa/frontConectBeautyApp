function authenticateUser(){

  const userData = {
    emailOuCNPJ: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };
  
  fetch('http://localhost:3030/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
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
    console.log(data.acessToken)
    localStorage.setItem('token', data.acessToken);
    alert('Usuário autenticado com sucesso!');
    window.location.href = './html/homepage.html';
  })
  .catch(error => {
    console.error('Erro durante a autenticação do usuário:', error.message);
    alert('Erro durante a autenticação: ' + error.message);
  });
}

function replaceCadastro(){
  location.replace("./html/cadastro.html", "_self");
}
function replaceCadastroEmpresa(){
  location.replace("./html/cadastroEmpresa.html", "_self");
}