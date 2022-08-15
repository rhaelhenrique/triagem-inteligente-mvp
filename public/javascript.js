//Passando a referência dos elentos do HTML
const inputFile = document.getElementById("inputFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const insertText = document.getElementById("insertText");
const salvarText = document.getElementById("salvarText");

insertText.value = "";

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

//FAZENDO O POST EM PETICOES - PDF
salvarPDF.addEventListener("click", async function insert() {
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
    .then(//Esse Then traz a função para realizar a chamada na rota Python logo após a inserção do PDF.
    async function acionarPython(){
      try{
        const response = await fetch('http://localhost:8080/peticoes')//Rota do Python para realizar a Triagem
        console.log("Acionando o Python! Status code: ", response.status)
        const data = await response.json()
        console.log(data)
      } catch(error){
        console.error("Erro ao Acionar o Python: ", error)
      }
    }
  ).then(alert("Texto Salvo!"))
console.log("POST realizado!");
//document.location.reload();//Remover barras no início para acionar o Reload após salvar!
  } catch (e) {
    console.log("Falha ao salvar os dados :: POST " + e)
  }
})

//FAZENDO O POST EM PETICOES - TEXTO
salvarText.addEventListener("click", async function insert() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const init = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
          "textoPeticao": insertText.value,
          "flag": false,
            "processo": {
              "valorCausa": 0
            }
      }),
    }
    const postPeticao = await fetch("http://localhost:8080/peticoes", init)      
      .then(//Esse Then traz a função para realizar a chamada na rota Python logo após a inserção do novo texto.
        async function acionarPython(){
          try{
            const response = await fetch('http://localhost:8080/peticoes')//Rota do Python para realizar a Triagem
            console.log("Acionando o Python! Status code: ", response.status)
            const data = await response.json()
            console.log(data)
          } catch(error){
            console.error("Erro ao Acionar o Python: ", error)
          }
        }
      ).then(alert("Texto Salvo!"))
    console.log("POST realizado!");
    //document.location.reload();//Remover barras no início para acionar o Reload após salvar!
  } catch (e) {
    console.log("Falha ao salvar os dados :: POST " + e)
  }
})