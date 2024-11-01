document.addEventListener("DOMContentLoaded", function () {
    //Elementos del Modal
    const modal = document.getElementById("usernameModal");
    const displayName = document.getElementById("displayName");
    // Mostrar modal si el nombre de usuario no esta en localstorage
    const storedUsername = localStorage.getItem("username");

    //Validar si ya hay usuario
    if (storedUsername) {
        displayName.textContent = storedUsername;
        modal.style.display = "none";
    } else {
        modal.style.display = "flex"; // Mostrar el modal si no existe un nombre de usuario
    }

    //MLogica del evento de cerrar sesion
    const logOutButton = document.getElementById("logOutButton");
    logOutButton.addEventListener("click", function () {
        localStorage.removeItem("username");
        displayName.textContent = '';
        modal.style.display = 'flex';
    });
});

// Función para establecer el nombre de usuario
function setUsername() {
    const usernameInput = document.getElementById("usernameInput").value.trim();
    if (usernameInput) {
        localStorage.setItem("username", usernameInput);
        document.getElementById("displayName").textContent = usernameInput;
        document.getElementById("usernameModal").style.display = "none";
    }
}