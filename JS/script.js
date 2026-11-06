
/* 1. Arreglo de tareas */

// Aquí guardamos todas las tareas.
// Cada tarea tiene una descripción y un estado.

let tareas = [];


/* 2. Seleccionar elementos del HTML */

// Obtenemos el formulario.
const formulario = document.getElementById("formulario");

// Obtenemos el campo donde escribimos las tareas.
const nuevaTarea = document.getElementById("nuevaTarea");

// Obtenemos la lista donde aparecerán las tareas.
const listaTareas = document.getElementById("listaTareas");


/* 3. Agregar una nueva tarea */

// Escuchamos cuando se envía el formulario.
formulario.addEventListener("submit", function(event) {

    // Evitamos que la página se recargue.
    event.preventDefault();

    // Guardamos el texto que escribió el usuario.
    const descripcion = nuevaTarea.value.trim();

    // Comprobamos que no esté vacío.
    if (descripcion === "") {
        return;
    }

    // Creamos un objeto con la nueva tarea.
    const tarea = {
        descripcion: descripcion,
        completada: false
    };

    // Agregamos el objeto al arreglo.
    tareas.push(tarea);

    // Actualizamos la lista en pantalla.
    renderTasks();

    // Limpiamos el campo de texto.
    nuevaTarea.value = "";

});


/* 4. Mostrar las tareas */

function renderTasks() {

    // Primero eliminamos todo lo que había en la lista.
    listaTareas.innerHTML = "";

    // Separamos las tareas pendientes de las completadas.
    const pendientes = tareas.filter(tarea => !tarea.completada);

    const completadas = tareas.filter(tarea => tarea.completada);

    // Unimos las dos listas para mostrar primero las pendientes.
    const ordenadas = pendientes.concat(completadas);

    // Recorremos todas las tareas.
    ordenadas.forEach(function(tarea) {

        // Creamos un elemento de lista.
        const elemento = document.createElement("li");

        // Creamos una casilla para marcar la tarea.
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        // Indicamos si la casilla está marcada.
        checkbox.checked = tarea.completada;

        // Creamos el texto de la tarea.
        const texto = document.createElement("span");

        texto.textContent = tarea.descripcion;

        // Creamos el botón para eliminar.
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "🗑";

        botonEliminar.classList.add("eliminar");

        // Si la tarea está completada, agregamos una clase.
        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        // Agregamos los elementos a la fila.
        elemento.appendChild(checkbox);

        elemento.appendChild(texto);

        elemento.appendChild(botonEliminar);


        /*  5. Marcar y desmarcar tareas */

        checkbox.addEventListener("change", function() {

            // Cambiamos el estado de la tarea.
            tarea.completada = checkbox.checked;

            // Volvemos a dibujar toda la lista.
            renderTasks();

        });


        /*  6. Eliminar tareas */

        botonEliminar.addEventListener("click", function() {

            // Buscamos la tarea y la quitamos del arreglo.
            tareas = tareas.filter(function(elemento) {
                return elemento !== tarea;
            });

            // Actualizamos la lista.
            renderTasks();

        });

        // Agregamos la fila a la lista del HTML.
        listaTareas.appendChild(elemento);

    });

}
