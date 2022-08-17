let url = "http://localhost:8080/peticoes/"
//let url = "https://triagemhomol.jfpe.jus.br/"

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

    //MOSTRANDO OS RESULTADOS NA TELA
    function showPeticoes(data){
      let output1 = ''
      let justicaGratuita = ''
      let valorFormatado = 0
      let urlnuvem
      let nuvem

       // Create our number formatter.
      var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      for( let row of data) {
        if (row.processo.justGratuita == false || row.processo.justGratuita == null){
          justicaGratuita = 'Não';
        } else if (row.processo.justGratuita == true){
          justicaGratuita = 'Sim';
        }
        if (row.nuvem == null){
          nuvem = 'Não encontrada!'
         } else if (row.nuvem != null){
          nuvem = 'Encontrada!'
          urlnuvem = row.nuvem
          console.log("Imagem da Wordcloud disponível: ",urlnuvem)
         }

        valorFormatado = formatter.format(row.processo.valorCausa)

        output1 += `<tr>
            <td class="tdTable">${row.id}</td>
            <td class="tdTable">${valorFormatado}</td>
            <td class="tdTable">${justicaGratuita}</td>
            <td class="tdTable">${nuvem}</td>
            <td class="tdTable"><a href="javascript:findById(${row.id})">Abrir</a></td>
          </tr>`
      }
      document.getElementById('table').innerHTML = output1
    }
  }

  findAllPeticoes()

//FAZENDO O GET DE REGISTRO ESPECÍFICO
async function findById(idPeticao){
  try{
    const response = await fetch(url+idPeticao)
    //console.log(response)
    const data = await response.json()
    console.log(data)
    //showPeticao(data)
  } catch(error){
    console.error(error)
  }

  
}