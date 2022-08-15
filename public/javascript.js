//Passando a referência dos elentos do HTML
<<<<<<< HEAD
=======
const inputFile = document.getElementById("inputFile");
const btnUpload = document.getElementById("btnUpload");
const resultText = document.getElementById("resultText");
const insertText = document.getElementById("insertText");
const salvarText = document.getElementById("salvarText");

insertText.value = "";
>>>>>>> e62a860057d441348ffc071764d8c9f97dd192cd

var pdfInput = document.getElementById("pdf-input")
var txtInput = document.getElementById("txt-input")
var resultInput = document.getElementById("result-input")
var btnPdfLoad = document.getElementById("btn-load-pdf")
var btnTxtLoad = document.getElementById("btn-load-txt")
var btnSave = document.getElementById("btn-save")

//Verifica o tipo de entrada que o usuario escolheu no ratio
function choiceInput() {
  var pdfRadio = document.getElementById('radio-pdf')
  if (pdfRadio.checked) {
    pdfInput.style.display = "block"
    btnPdfLoad.style.display = "block"
    resultInput.style.display = "block"
    txtInput.style.display = "none"
    btnTxtLoad.style.display = "none"
    btnSave.style.opacity = 1
  } else {
    pdfInput.style.display = "none"
    btnPdfLoad.style.display = "none"
    resultInput.style.display = "none"
    txtInput.style.display = "block"
    btnTxtLoad.style.display = "block"
    resultText.value = ""
    btnSave.style.opacity = 1
  }
}

const radioButtons = document.querySelectorAll('input[name="radio-input"]');
radioButtons.forEach(radio => {
  radio.addEventListener("click", choiceInput)
});

//Processamento da entrada por PDF
const inputFile = document.getElementById("input-file")
const resultText = document.getElementById("result-text")

/*
  Carregar informações do documento
    - Carregar texto do PDF
  */
btnPdfLoad.addEventListener("click", () => {
  const formData = new FormData()

  formData.append("pdfFile", inputFile.files[0])
  //console.log(inputFile.files[0]);

  fetch("/extract-text", {
    method: "post",
    body: formData,
  }).then((response) => {
      return response.text()
    }).then((extractedText) => {
      resultText.value = extractedText.trim()

      //Debug
      //let str = extractedText.trim()
      //console.log(str)
    })  
})


/**
 * Envia o texto para API flask para que seja feita o processamento nela.
 * @return JSON
 */
btnTxtLoad.addEventListener("click", getResponseTxt)

<<<<<<< HEAD
async function getResponseTxt() {
  var insertedText = document.getElementById("insert-text").value
  
  console.log(insertedText);
  
  let data = {
    "textoPeticao": insertedText
  }

  await fetch("http://localhost:5000/triagem", {
    "method": "post",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(data)
  }).then(
    (res) => res.json()
  ).then(data => {
    console.log(data);
    console.log(data['justGratuita']);
    console.log(data['valorCausa']);
    console.log(data['wc']);
  });
  

}

btnSave.addEventListener("click", () => {
  if (resultText.value != "") {
    console.log("OK");
  } else {
    console.log("Error");
  }
  
})

/**
 * var insertedText = document.getElementById("insert-text").value
  
  console.log(insertedText);
  
  let data = {
    "texto": insertedText
=======
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
>>>>>>> e62a860057d441348ffc071764d8c9f97dd192cd
  }

  fetch("http://localhost:5000/test", {
    "method": "post",
    "mode": "no-cors",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify(data)
  }).then((result) => {
    console.log(result.text);
  })
 */