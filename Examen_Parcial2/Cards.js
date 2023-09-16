document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.getElementById("main-content");
    const tablaLink = document.getElementById("tablaLink");

    tablaLink.addEventListener("click", function (event) {
        event.preventDefault();
        clearMainContent();
        createColumns();
    });

    function clearMainContent() {
        mainContent.innerHTML = "";
    }

    function createColumns() {
        const columnCount = 3;

        for (let i = 1; i <= columnCount; i++) {
            const column = document.createElement("div");
            column.classList.add("column");



            mainContent.appendChild(column);
        }
    }
});
