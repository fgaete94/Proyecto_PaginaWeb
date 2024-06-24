
// Validar RUT chileno
function validarRut(rut) {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
        return false;
    }
    var tmp = rut.split('-');
    var digv = tmp[1].toLowerCase();
    var cuerpo = tmp[0];
    var suma = 0;
    var multiplo = 2;

    for (var i = 1; i <= cuerpo.length; i++) {
        var index = multiplo * cuerpo.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }

    var dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'k' : dvEsperado;
    return dvEsperado == digv;
}

$(document).ready(function () {
    /* utilizar esta parte de codigo, solo si el nombre y apellido estan juntos
    // Método de validación personalizado para el nombre completo
    $.validator.addMethod("nombreCompleto", function (value, element) {
        // Dividir el valor en palabras
        var palabras = value.trim().split(/\s+/);
        // Contar palabras con al menos 2 letras
        var palabrasValidas = palabras.filter(function (palabra) {
            return palabra.length >= 2;
        });
        // Verificar si hay al menos 2 palabras con al menos 2 letras
        return palabrasValidas.length >= 2;
    }, "Ingresa al menos 2 palabras, cada una con al menos 2 letras.");*/

    // Método de validación personalizado para la consulta
    $.validator.addMethod("minPalabras", function (value, element) {
        // Dividir el valor en palabras
        var palabras = value.trim().split(/\s+/);
        // Contar palabras
        return palabras.length >= 3;
    }, "Ingresa al menos 3 palabras en tu consulta.");

    // Configuración de validación de jQuery
    $("#contactForm").validate({
        rules: {
            nombre: {
                required: true,
                minlength:3
            },
            apellido: {
                required: true,
                minlength:3                
            },
            rut: {
                required: true,
                rutChileno: true
            },
            email: {
                required: true,
                email: true
            },
            consulta: {
                required: true,
                minPalabras: true
            }
        },
        messages: {
            nombre: {
                required: "Por favor, ingresa tu nombre completo.",
                minlength: "Ingresa al menos 3 letras"
            },
            apellido: {
                required: "Por favor, ingresa tu apellido completo.",
                minlength: "Ingresa al menos 3 letras"
            },            
            rut: {
                required: "Por favor, ingresa tu RUT.",
                rutChileno: "Por favor, ingresa un RUT válido."
            },
            email: {
                required: "Por favor, ingresa tu correo electrónico.",
                email: "Por favor, ingresa un correo electrónico válido."
            },
            consulta: {
                required: "Por favor, ingresa tu consulta.",
                minPalabras: "Ingresa al menos 3 palabras en tu consulta."
            }
        }
    });

    // Método de validación personalizado para RUT chileno
    $.validator.addMethod("rutChileno", function (value, element) {
        return this.optional(element) || validarRut(value);
    }, "Por favor, ingresa un RUT válido.");
});
$.validator.setDefaults({
    submitHandler: function (form) {
        alert("Formulario Enviado");
    }
});