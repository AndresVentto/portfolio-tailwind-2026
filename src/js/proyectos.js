/*~~~~~~~~~~~~~~~ FILTRO DE PROYECTOS ~~~~~~~~~~~~~~~*/ 

let tabs = document.querySelectorAll(".tab");
let indicador = document.querySelector("#indicador");

const todos = document.querySelectorAll(".work_card");
const frontends = document.querySelectorAll(".frontend");
const sistemas = document.querySelectorAll(".sistema");
const mobiles = document.querySelectorAll(".mobile");

export function moverIndicador(tab) {
    const tabRect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();

    indicador.style.width = tabRect.width + "px";
    indicador.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
}

// Estado inicial
moverIndicador(tabs[0]);
tabs[0].classList.add("text-whiteColor");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {

        // Movimiento fluido
        moverIndicador(tab);

        // Activar color
        tabs.forEach(t => t.classList.remove("text-whiteColor"));
        tab.classList.add("text-whiteColor");

        const tabval = tab.getAttribute("data-tabs");

        // Ocultar todos
        todos.forEach(items => items.style.display = "none");

        // Mostrar según filtro
        if(tabval === "frontend") {
            frontends.forEach(item => item.style.display = "block");

        } else if(tabval === "sistema") {
            sistemas.forEach(item => item.style.display = "block");

        } else if(tabval === "mobile") {
            mobiles.forEach(item => item.style.display = "block");

        } else {
            todos.forEach(items => items.style.display = "block");
        }
    });
});

window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".tab.text-whiteColor");
    if(activeTab) moverIndicador(activeTab);
});

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


