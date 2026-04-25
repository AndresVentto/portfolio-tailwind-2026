/*~~~~~~~~~~~~~~~ VENTANAS MODALES ~~~~~~~~~~~~~~~*/ 

export function openModal(event, id) {
    event.preventDefault(); 

    const modal = document.getElementById(id);
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.style.overflow = "hidden";
}

export function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    document.body.style.overflow = "";
}

// Cerrar al hacer click fuera (genérico)
window.addEventListener("click", function (e) {
    const modal = document.querySelector(".modal-active");
    if (e.target.classList.contains("modal-bg")) {
        closeModal(e.target.id);
    }
});