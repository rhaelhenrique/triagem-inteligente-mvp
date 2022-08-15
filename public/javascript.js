//Passando a referência dos elentos do HTML

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