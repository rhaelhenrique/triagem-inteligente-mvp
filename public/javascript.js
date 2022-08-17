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
    document.getElementById("insert-text").value = ""
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
      getResponseTxt('pdf')
    })  
})

/**
 * Envia o texto para API flask para que seja feita o processamento nela.
 * @return JSON
 */
 btnTxtLoad.addEventListener("click", () =>
 getResponseTxt('txt')
)

let just
let valorCausa
let urlnuvem
let nuvem

async function getResponseTxt(mode) {
 if (mode == 'txt') {
   console.log('txt');
   var insertedText = document.getElementById("insert-text").value
 } else {
   console.log('pdf');
   var insertedText = document.getElementById("result-text").value
 }
 
 
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
   /**TODO - criar elemento html para salvar essas informações */
   console.log(data['justGratuita']);
   just = data['justGratuita']
   console.log(data['valorCausa']);
   valorCausa = data['valorCausa']
   urlnuvem = data['nuvem']

   let output1 = ''
   let justicaGratuita = ''
   let valorFormatado = 0

   //FORMATAR PARA BRL
   var formatter = new Intl.NumberFormat('pt-BR', {
     style: 'currency',
     currency: 'BRL',
   });
   valorFormatado = formatter.format(data['valorCausa'])

   if (data['justGratuita'] == false || data['justGratuita'] == null){
     justicaGratuita = 'Não';
   } else if (data['justGratuita'] == true){
     justicaGratuita = 'Sim';
   }
   if (urlnuvem == null){
    nuvem = 'Não encontrada!'
   } else if (urlnuvem != null){
    nuvem = 'Encontrada!'
   }

   output1 += `<thead>
    <tr>
      <th scope="col">Valor da Causa</th>
      <th scope="col">Justiça Gratuita</th>
      <th scope="col">Nuvem de Palavras</th>
    </tr>
   </thead>
   <tbody>
    <tr>
    <td class="tdTable">${valorFormatado}</td>
    <td class="tdTable">${justicaGratuita}</td>
    <td class="tdTable">${nuvem}</td>
    </tr>
   </tbody>`

   document.getElementById('respPython').innerHTML = output1
 }); 

}

btnSave.addEventListener("click", save)

async function save() {
 var insertedText = document.getElementById("insert-text").value
 if (document.getElementById("insert-text").value != "") {
   var insertedText = document.getElementById("insert-text").value
 }else if (document.getElementById("result-text").value != "") {
   var insertedText = document.getElementById("result-text").value
 }
 if (insertedText != "") {
   console.log("OK");
   let data = {
     "textoPeticao": insertedText,
     "flag": true,
     "processo": {
       "valorCausa": valorCausa,
       "justGratuita": just
     },
     "nuvem": urlnuvem
   }
 
   await fetch("http://localhost:5000/save", {
     "method": "post",
     "headers": {"Content-Type": "application/json"},
     "body": JSON.stringify(data)
   }).then(
     (res) => res.json()
   ).then(data => {
     /**Salvar informações recebi */
     console.log(data);
   });
 } else {
   console.log("Error");
 }
}