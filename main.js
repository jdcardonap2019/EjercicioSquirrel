const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"
fetch(url).then(res=>res.json()).then(res=>{
    console.log('%cmain.js line:4 res', 'color: #007acc;', res)
    datos = res
    let eventos = []
    let eventos2 = []
    //Creación arreglo segundo punto
    for (let x = 0; x<datos.length;x++){
        for(let y = 0; y<datos[x].events.length;y++)
        {
            if(eventos.indexOf(datos[x].events[y])===-1)
            {
                eventos.push(datos[x].events[y])
                eventos2.push({event: datos[x].events[y], TP: 0, TN: 0, FP: 0, FN: 0, Correlation: 0})
            }
        }
    }
    console.log(eventos2)
    for (let i = 0; i<datos.length;i++)
    {
        //Recopilación de datos
        for(let j = 0; j<datos[i].events.length;j++)
        {
            let nombreE = datos[i].events[j]
            let indice = eventos.indexOf(nombreE)
            //Si se dio el evento y se convirtio en ardilla
            if(datos[i].squirrel===true)
            {
                eventos2[indice].TP += 1
            }
            //Si se dio el evento pero no se convirtio en ardilla
            else
            {
                eventos2[indice].FN += 1
            }
        }
        for(let w = 0; w<eventos2.length; w++)
        {
            //Si no se dio el evento ni se convirtio en ardilla
            if(!datos[i].events.includes(eventos2[w].event) && datos[i].squirrel===false)
            {
                eventos2[w].TN+=1
            }   
            //Si no se dio el evento pero se convirtio en ardilla
            if(!datos[i].events.includes(eventos2[w].event) && datos[i].squirrel===true)
            {
                eventos2[w].FP+=1
            }   
        }
        //Impresión de tabla punto 1
        /** Forma de las líneas de la tabla:
         *  <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
         */
       let th = document.createElement("th")
       let iterador = document.createTextNode(i+1)
       th.appendChild(iterador)
       let tr = document.createElement("tr")
       let td = document.createElement("td")
       let tdS = document.createElement("td")
       let text = document.createTextNode(datos[i].events)
       let textS =  document.createTextNode(datos[i].squirrel)
       if(textS.nodeValue==="true")
       {
        tr.className = "table-danger"
       }
       tdS.appendChild(textS)
       td.appendChild(text)
       tr.appendChild(th)
       tr.appendChild(td) 
       tr.appendChild(tdS)
       const ne = document.getElementById("fila")
        ne.appendChild(tr)
    }
    //Impresión punto 2
    for (let i = 0; i<eventos2.length;i++)
    {
        let event = eventos2[i]
        event.Correlation = ((event.TP*event.TN) - (event.FP*event.FN))/(((event.TP+event.FP)*(event.TP+event.FN)*(event.TN+event.FP)*(event.TN+event.FN))**(1/2))
    }
    for (let i = 0; i<eventos2.length;i++)
    {
        let event = eventos2[i]
        for (let j = 0; j < eventos2.length - 1 - i; j++ ) {
            let event2 = eventos2[j]
            if ( event2.Correlation < eventos2[ j + 1 ].Correlation ) {
              [ eventos2[ j ], eventos2[ j + 1 ] ] = [ eventos2[ j + 1 ], eventos2[ j ] ];
            }
          }
    }
    for (let i = 0; i<eventos2.length;i++)
    {
        let event = eventos2[i]
        let th = document.createElement("th")
       let iterador = document.createTextNode(i+1)
       th.appendChild(iterador)
       let tr = document.createElement("tr")
       let td = document.createElement("td")
       let tdS = document.createElement("td")
       let text = document.createTextNode(event.event)
       let corr =  document.createTextNode(event.Correlation)
       tdS.appendChild(corr)
       td.appendChild(text)
       tr.appendChild(th)
       tr.appendChild(td) 
       tr.appendChild(tdS)
       const ne = document.getElementById("fila2")
        ne.appendChild(tr)
    }
    //Ordenamiento


})