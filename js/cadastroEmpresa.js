function nextForm1(){
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "flex";
    document.getElementById("form3").style.display = "none";      
}
function nextForm2(){
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "flex";
}
function previousForm2(){
    document.getElementById("form1").style.display = "flex";
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "none";   
}
function previousForm3(){
    document.getElementById("form2").style.display = "none";
    document.getElementById("form2").style.display = "flex";
    document.getElementById("form3").style.display = "none";   
}

function registerEmpresa(){
    const dias = [document.getElementById("domingo").checked, document.getElementById("segunda").checked, document.getElementById("terça").checked, document.getElementById("quarta").checked, document.getElementById("quinta").checked, document.getElementById("sexta").checked, document.getElementById("sábado").checked]
    const empresaData = {
      cnpj: document.getElementById("cnpj").value,
      senha: document.getElementById("senha").value,
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      cidade: document.getElementById("cidade").value,
      bairro: document.getElementById("bairro").value,
      logradouro: document.getElementById("logradouro").value,
      numero: document.getElementById("numero").value,
      descricao: document.getElementById("descrição").value,
      classificacao: "0",
      inicio_expediente: document.getElementById("horaInicial").value,
      fim_expediente: document.getElementById("horaFinal").value,
      dias_func: dias
    };
    fetch('http://localhost:3030/empresa/cadastrar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(empresaData)
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não estiver OK, exibe a mensagem de erro diretamente
            return response.text().then(errorMessage => {
                throw new Error('Erro durante o cadastro da empresa! ' + errorMessage);
            });
        }
        return response.text();
    })
    .then(data => {
        console.log('Empresa cadastrada com sucesso:', data);
        alert('Empresa cadastrada com sucesso!');
        window.location.href = '../index.html';
    })
    .catch(error => {
        // Captura e exibe o erro no console
        console.error('Erro durante a requisição:', error.message);
        alert('Erro durante a requisição: ' + error.message);
    });
}