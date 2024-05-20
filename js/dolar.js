/* el primer ejemplo es solo usando una url especifica*/
/*function getDolar(done){  Creamos un funcion que es para recuperar el valor del dolar
  const results = fetch('https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/2024/05/dias/17?apikey=2547195c57077b59253fcc77d3d749f2ad7d7469&formato=json');
luego creamos una constante que le entregamos como valor el fetch que utilizamos, para luego lo que hacemos es que resultados lo formateamos como json
  results .then(response => response.json())
    .then(data => {done(data)})
    .catch(error => { console.log('Error al consumir la API:',error);});
}

getDolar(data=> {
  console.log(data)
  const valorDolar = data.Dolares[0].Valor;
  document.getElementById("dolar").innerHTML = 'US$' + valorDolar;


});*/
/*en este codigo a continuacion lo que hacemos es definir 2 URL, donde frente  un error le digo que use una URL secundaria para la obtencion de lo que requiero*/
function getDolar(done) {
  const primaryUrl = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=2547195c57077b59253fcc77d3d749f2ad7d7469&formato=json';
  const secondaryUrl = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/2024/05/dias/17?apikey=2547195c57077b59253fcc77d3d749f2ad7d7469&formato=json'; // URL alternativa

  function fetchDolar(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) { //aca le estoy diciendo que si no funciona me entregue un error, el que usare despues 
          throw new Error('API con error');
        }
        return response.json();
      });
  }

  fetchDolar(primaryUrl)
    .then(data => done(data))
    .catch(error => { //aca por medio del catch, hago que si me da un error me muestre por consula cual es y luego use la url secundaria
      console.log('Error al consumir la API principal:', error);
      // Intentar con la URL alternativa
      fetchDolar(secondaryUrl)
        .then(data => done(data))
        .catch(error => {
          console.log('Error al consumir la API alternativa:', error);
        });
    });
}

// getDolar(data => {
//   console.log(data);
//   /*const valorDolar = data.Dolares[0].Valor;*/
//   document.getElementById("dolar").innerHTML = 'US$' + data.Dolares[0].Valor;
//   document.getElementById("fecha").innerHTML = ',Fecha Obtención:' + data.Dolares[0].Fecha;
// });

function actualizarPrecios(valorDolar, aDolar = true) {
  const precios = document.querySelectorAll('.precio');
  precios.forEach(precio => {
    const precioOriginal = parseFloat(precio.getAttribute('data-precio-original'));
    if (aDolar) {
      const precioUSD = (precioOriginal / valorDolar).toFixed(2);
      precio.textContent = `US$ ${precioUSD}`;
    } else {
      precio.textContent = `$${precioOriginal.toLocaleString('es-CL')}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getDolar(data => {
    const valorDolar = parseFloat(data.Dolares[0].Valor.replace(',', '.'));
    document.getElementById('dolar').innerHTML = 'US$' + data.Dolares[0].Valor;
    document.getElementById('fecha').innerHTML = ', Fecha Obtención: ' + data.Dolares[0].Fecha;

    // Guardar los precios originales en un atributo data
    const precios = document.querySelectorAll('.precio');
    precios.forEach(precio => {
      const precioCLP = parseFloat(precio.textContent.replace('$', '').replace('.', ''));
      precio.setAttribute('data-precio-original', precioCLP);
    });

    // Agregar evento al botón para cambiar la divisa
    document.getElementById('toggleDivisa').addEventListener('click', () => {
      const esUSD = document.getElementById('toggleDivisa').getAttribute('data-divisa') === 'CLP';
      actualizarPrecios(valorDolar, esUSD);
      document.getElementById('toggleDivisa').setAttribute('data-divisa', esUSD ? 'USD' : 'CLP');
      document.getElementById('toggleDivisa').textContent = esUSD ? 'Mostrar en CLP' : 'Mostrar en USD';
    });
  });
});