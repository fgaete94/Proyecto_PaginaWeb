fetch('https://mindicador.cl/api').then(function(response) {
   return response.json();
}).then(function(dailyIndicators) {
  document.getElementById("dolar").innerHTML = 'US$' + dailyIndicators.dolar.valor;

}).catch(function(error) {
  console.log('Requestfailed', error);
});
