
function addDeleteButtonListeners() {//funcion del boton eliminar 
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const row = this.parentNode.parentNode;
            row.remove();
        });
    });
}
function loadTable() {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#table tbody");
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
            <td>${item.userId}</td>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.completed ? "Sí" : "No"}</td>
            <td><button class="delete-button">Eliminar</button></td>
          `;
                tableBody.appendChild(row);
            });
            addDeleteButtonListeners();
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });
}

const tablaLink = document.getElementById("tablaLink");
tablaLink.addEventListener("click", function (event) {
    event.preventDefault();
    loadTable();
});




