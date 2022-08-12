//Passando a referência dos elentos do HTML
const inputFile = document.getElementById("inputFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");

//Função para carregar o pdf e fazer o parse
btnUpload.addEventListener("click", () => {
  const formData = new FormData()

  formData.append("pdfFile", inputFile.files[0])

  fetch("/extract-text", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      return response.text()
    })
    .then((extractedText) => {
      resultText.value = extractedText.trim()

      let str = extractedText.trim()

      console.log(str)

      window.texto = str;
    })
  
})

//FAZENDO O GET DE TODOS OS REGISTROS EM PETICOES
async function findAllPeticoes(){
    try{
      const response = await fetch('http://localhost:8080/peticoes')
      //console.log(response)
      const data = await response.json()
      console.log(data)
      showPeticoes(data)
    } catch(error){
      console.error(error)
    }
  }

  findAllPeticoes()

  function showPeticoes(peticoes) {
    let output1 = ''
    let output2 = ''

    if (peticoes.flag == false){
      for (let peticao of peticoes){
        output1 += `<tbody><tr><td>ID: ${peticao.id}</td></tr></tbody>`
      }
    }
    if (peticoes.flag == true){
      for (let peticao of peticoes){
        output2 += `<tbody><tr><td>ID: ${peticao.id}</td></tr></tbody>`
      }
    }

    document.getElementById('tableFalse').innerHTML = output1
    document.querySelector('liTrue').innerHTML = output2
  }

//FAZENDO O POST EM PETICOES
salvarForm.addEventListener("click", async function insert() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const init = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
          "textoPeticao": texto,
          "flag": false,
            "processo": {
              "valorCausa": 0
            }
      }),
    }
    const postPeticao = await fetch("http://localhost:8080/peticoes", init)
    console.log("POST realizado!");
  } catch (e) {
    console.log("Falha ao salvar os dados :: POST " + e)
  }
})