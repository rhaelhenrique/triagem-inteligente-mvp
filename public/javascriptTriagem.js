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

    //function getMoney( str ){
    //  return parseInt( str.replace(/[\D]+/g,'') );
    //}
    function formatReal( float ){
      var tmp = float+'';
      tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
      if( tmp.length > 6 )
              tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

      return tmp;
    }

    //MOSTRANDO OS RESULTADOS NA TELA
    function showPeticoes(data){
      let output1 = ''
      let analise = ''
      let justicaGratuita = ''
      let valorFormatado = 0

      for( let row of data) {
        if (row.flag == false){
          analise = 'Aguardando';
        } else if (row.flag == true){
          analise = 'Triagem Realizada';
        }
        if (row.processo.justGratuita == false || row.processo.justGratuita == null){
          justicaGratuita = 'Não';
        } else if (row.processo.justGratuita == true){
          justicaGratuita = 'Sim';
        }

        valorFormatado = formatReal(row.processo.valorCausa)

        output1 += `<tbody><tr>
            <td class="tdTable">ID: ${row.id}</td>
            <td class="tdTable">Python: ${analise}</td>
            <td class="tdTable">Valor da Causa: R$ ${valorFormatado}</td>
            <td class="tdTable">Justiça Gratuita: ${justicaGratuita}</td>
          </tr></tbody>`
      }
      document.getElementById('table').innerHTML = output1
    }
  }

  findAllPeticoes()