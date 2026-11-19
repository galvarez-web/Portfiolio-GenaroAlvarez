const botonTema = document.getElementById("btn-tema")
function cambiarTema() {
    document.body.classList.toggle("oscuro")
}
botonTema.addEventListener("click", cambiarTema);

const inputMensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador-mensaje");
inputMensaje.addEventListener("input", () => {
    contador.textContent = inputMensaje.value.length + " caracteres "
});

function validarNombre(nombre) {
    return nombre.trim().length >= 3;
}
function validarEmail(email) {
    return email.includes("@") && email.includes(".");
}
function validarTelefono(telefono) {
    return telefono >= "0" && telefono <= "9";
}
function validarMensaje(mensaje) {
    return mensaje.length >= 10;
}

const formulario = document.getElementById('form-contacto');

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    let valido = true;


    const nombre = document.getElementById("nombre").value;
    const errorNombre = document.getElementById("error-nombre");
    if (!validarNombre(nombre)) {
        errorNombre.textContent = "Mínimo 3 letras";
        valido = false;
    } else {
        errorNombre.textContent = "";
    }

    const email = document.getElementById("email").value;
    const errorEmail = document.getElementById("error-email");
    if (!validarEmail(email)) {
        errorEmail.textContent = "Debe contener @ y .";
        valido = false;
    } else {
        errorEmail.textContent = "";
    }
    const telefono = document.getElementById("telefono").value;
    const errorTelefono = document.getElementById("error-telefono");
    if (!validarTelefono(telefono)) {
        errorTelefono.textContent = "Debe contener numeros";
        valido = false;
    } else {
        errorTelefono.textContent = "";
    }

    const mensajeTexto = document.getElementById("mensaje").value;
    const errorMensaje = document.getElementById("error-mensaje");
    if (!validarMensaje(mensajeTexto)) {
        errorMensaje.textContent = "Mínimo 10 caracteres.";
        valido = false;
    } else {
        errorMensaje.textContent = "";
    }

    const resultadoForm = document.getElementById("resultado-form");
    if (valido) {
        resultadoForm.textContent = `¡Muchas gracias por tu mensaje, ${nombre.trim()}!`;
        resultadoForm.classList.add("ok");
    } else {
        resultadoForm.textContent = "";
        resultadoForm.classList.remove("ok");
    }
});
const lista = document.getElementById("lista-proyectos");
const estado = document.getElementById("estado-proyectos");
fetch("proyectos.json")
    .then((respuesta) => respuesta.json())
    .then((proyectos) => {
        estado.textContent = "";
        proyectos.forEach((proyecto) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("proyecto");
            const titulo = document.createElement("h3");
            titulo.textContent = proyecto.titulo;
            const descripcion = document.createElement("p");
            descripcion.textContent = proyecto.descripcion;
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(descripcion);
            proyecto.tecnologias.forEach((tec) => {
                const etiqueta = document.createElement("span");
                etiqueta.classList.add("etiqueta");
                etiqueta.textContent = tec;
                tarjeta.appendChild(etiqueta);
                tarjeta.addEventListener("mouseover", () => {
                    tarjeta.style.borderColor = "#2563eb";
                });

                tarjeta.addEventListener("mouseout", () => {
                    tarjeta.style.borderColor = "";
                });
            });

            lista.appendChild(tarjeta);
        });
    })
    .catch(() => {
        estado.textContent = "No se pudieron cargar los proyectos.";
    });
