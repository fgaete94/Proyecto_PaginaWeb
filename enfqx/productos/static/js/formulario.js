
// Método para validar RUT chileno
function validarRut(rut) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
        return false;
    }
    
    rut = rut.replace(/[-|‐]/g, '');
    var dv = rut.slice(-1).toLowerCase();
    var cuerpo = rut.slice(0, -1);

    // Calcula el dígito verificador esperado
    var suma = cuerpo.split('').reverse().reduce(function (acc, digit, i) {
        return acc + parseInt(digit) * ((i % 6) + 2);
    }, 0);

    var dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'k' : dvEsperado.toString();

    return dvEsperado === dv;
}

$(document).ready(function () {
    // Método de validación personalizado para la consulta
    $.validator.addMethod("minPalabras", function (value, element) {
        var palabras = value.trim().split(/\s+/);
        return palabras.length >= 3;
    }, "Ingresa al menos 3 palabras en tu consulta.");

    // Configuración de validación de jQuery Validate
    $("#contactForm").validate({
        rules: {
            nombre: {
                required: true,
                minlength: 3
            },
            apellido: {
                required: true,
                minlength: 3                
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
                minlength: "Ingresa al menos 3 letras."
            },
            apellido: {
                required: "Por favor, ingresa tu apellido completo.",
                minlength: "Ingresa al menos 3 letras."
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

    // Configuración por defecto para jQuery Validate
    $.validator.setDefaults({
        submitHandler: function (form) {
            alert("Formulario Enviado");
        }
    });
});