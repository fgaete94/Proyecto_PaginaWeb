// Función para obtener el valor del dólar desde la API
function getDolar(done) {
  // URLs de las APIs principal y secundaria
  const primaryUrl = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=2547195c57077b59253fcc77d3d749f2ad7d7469&formato=json';
  const secondaryUrl = 'https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/2024/07/dias/17?apikey=2547195c57077b59253fcc77d3d749f2ad7d7469&formato=json';

  // Función para hacer la solicitud a la API y procesar la respuesta
  function fetchDolar(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error de respuesta: ${response.status} ${response.statusText}`);
        }
        return response.json();
      });
  }

  // Intentar obtener datos desde la API principal
  fetchDolar(primaryUrl)
    .then(data => {
      console.log('Datos obtenidos de la API principal:', data);
      done(data);
    })
    .catch(error => {
      console.error('Error al consumir la API principal:', error);
      // Intentar con la API secundaria si la principal falla
      fetchDolar(secondaryUrl)
        .then(data => {
          console.log('Datos obtenidos de la API alternativa:', data);
          done(data);
        })
        .catch(error => {
          console.error('Error al consumir la API alternativa:', error);
        });
    });
}

// Función para actualizar los precios en base al valor del dólar
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

//Evento que se ejecuta cuando el DOM se ha cargado
document.addEventListener('DOMContentLoaded', () => {
  // Obtener el valor del dólar y actualizar la interfaz
  getDolar(data => {
    const valorDolar = parseFloat(data.Dolares[0].Valor.replace(',', '.'));
    document.getElementById('dolar').innerHTML = `US$ ${data.Dolares[0].Valor}, Fecha Obtención: ${data.Dolares[0].Fecha}`;

    // Guardar los precios originales en un atributo data
    const precios = document.querySelectorAll('.precio');
    precios.forEach(precio => {
      const precioCLP = parseFloat(precio.textContent.replace('$', '').replace('.', ''));
      precio.setAttribute('data-precio-original', precioCLP);
    });

    // Obtener el elemento del botón para cambiar la divisa
    const toggleDivisa = document.getElementById('toggleDivisa');
    if (toggleDivisa) {
      // Agregar evento al botón para cambiar la divisa
      toggleDivisa.addEventListener('click', () => {
        const esUSD = toggleDivisa.getAttribute('data-divisa') === 'CLP';
        actualizarPrecios(valorDolar, esUSD);
        toggleDivisa.setAttribute('data-divisa', esUSD ? 'USD' : 'CLP');
        toggleDivisa.textContent = esUSD ? 'Mostrar en CLP' : 'Mostrar en USD';
      });
    } else {
      console.warn("El elemento con id 'toggleDivisa' no se encontró en el DOM.");
    }
  });
});
