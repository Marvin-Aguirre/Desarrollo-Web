const botonAgregarTarea = document.getElementById("addTaskButton");
const contenedoresTareas = document.querySelectorAll(".column");
let tareaArrastrada = null; 

botonAgregarTarea.addEventListener("click", () => {
    const contenidoTarea = prompt("Ingrese el contenido de la tarea:");
    if (contenidoTarea) {
        const tarjetaTarea = crearTarjetaTarea(contenidoTarea);
        contenedoresTareas[0].appendChild(tarjetaTarea);
    }
});

function crearTarjetaTarea(contenido) {
    const tarjetaTarea = document.createElement("div");
    tarjetaTarea.classList.add("task-card");
    tarjetaTarea.textContent = contenido;

    tarjetaTarea.setAttribute("draggable", true);

    tarjetaTarea.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", contenido);
        tareaArrastrada = tarjetaTarea; 
    });

    contenedoresTareas.forEach(contenedor => {
        contenedor.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        contenedor.addEventListener("drop", (e) => {
            e.preventDefault();
            const contenidoMovido = e.dataTransfer.getData("text/plain");
            if (contenidoMovido && tareaArrastrada) {
                contenedor.appendChild(tareaArrastrada);
                tareaArrastrada = null; 
            }
        });
    });

    return tarjetaTarea;
}

