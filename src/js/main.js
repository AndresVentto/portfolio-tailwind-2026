import {menuFunciones} from './menu.js';
import {darkMode, lightMode, cargarParticles} from './theme.js';
import {scrollHeaderFondo} from './scroll.js';
import {moverIndicador, openModal, closeModal} from './proyectos.js';
import {copyAr, renderContacto} from './copy.js';

menuFunciones();
scrollHeaderFondo();
copyAr();
renderContacto();


// Deshabilitar clic derecho
document.addEventListener('contextmenu', event => event.preventDefault());

// Deshabilitar selección de texto
document.onselectstart = function() { return false; };

/*~~~~~~~~~~~~~~~ VALIDACIÓN DE FORMULARIO ~~~~~~~~~~~~~~~*/
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const btnIcon = document.getElementById("btn-icon");
const toast = document.getElementById("toast");
const charCount = document.getElementById("char-count");

const config = {
    fullname: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/, required: true },
    subject: { regex: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/, required: true }, 
    email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true },
    message: { regex: /^[\s\S]{10,2000}$/, required: true }
};

const fields = Object.keys(config);

// --- FUNCIONES AUXILIARES ---

function showToast() {
    toast.classList.remove("translate-y-32", "opacity-0");
    setTimeout(() => toast.classList.add("translate-y-32", "opacity-0"), 4000);
}

function validateField(input, id) {
    const container = input.parentElement.tagName === 'DIV' ? input.parentElement : input.closest('.space-y-2');
    const icon = container.querySelector(".icon");
    const emptyError = container.querySelector(".error-empty");
    const invalidError = container.querySelector(".error-invalid");
    const success = container.querySelector(".success");
    const value = input.value.trim();

    // Reset styles
    [emptyError, invalidError, success].forEach(el => el?.classList.add("hidden"));
    input.classList.remove("border-red-500", "border-green-500", "border-blue-500", "ring-1", "ring-blue-500");

    if (config[id].required && value === "") {
        emptyError?.classList.remove("hidden");
        input.classList.add("border-red-500");
        if (icon) icon.textContent = "⚠️";
        return false;
    }

    if (config[id].regex && value !== "" && !config[id].regex.test(value)) {
        invalidError?.classList.remove("hidden");
        input.classList.add("border-red-500");
        if (icon) icon.textContent = "❌";
        return false;
    }

    if (value !== "") {
        success?.classList.remove("hidden");
        input.classList.add("border-green-500");
        if (icon) icon.textContent = "✅";
        return true;
    }
    return true;
}

function resetAll() {
    fields.forEach(id => {
        const input = document.getElementById(id);
        input.classList.remove("border-red-500", "border-green-500", "border-blue-500", "ring-1", "ring-blue-500");
        const container = input.closest('.space-y-2');
        const icon = container.querySelector(".icon");
        if (icon) icon.textContent = "";
        container.querySelectorAll(".error-empty, .error-invalid, .success").forEach(m => m.classList.add("hidden"));
    });
    charCount.textContent = "0";
    charCount.classList.replace("text-red-500", "text-gray-500");
}

// --- EVENTOS ---

fields.forEach((id, index) => {
    const input = document.getElementById(id);

    input.addEventListener("focus", () => {
        // Mejorado: Solo azul en focus, no rojo preventivo
        if (!input.classList.contains("border-red-500")) {
            input.classList.add("border-blue-500", "ring-1", "ring-blue-500");
        }
    });

    input.addEventListener("input", () => {
        validateField(input, id);
        if (id === "message") {
            charCount.textContent = input.value.length;
            input.value.length >= 1950 ? charCount.classList.add("text-red-500") : charCount.classList.remove("text-red-500");
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(id => {
        if (!validateField(document.getElementById(id), id)) isValid = false;
    });

    if (isValid) {
        // Efecto Loading en Botón
        const originalText = submitBtn.querySelector("span").textContent;
        submitBtn.disabled = true;
        submitBtn.querySelector("span").textContent = "Enviando...";
        btnIcon.className = "fa fa-spinner animate-spin";

        // Simulación de envío (1 seg)
        setTimeout(() => {
            showToast();
            form.reset();
            resetAll();
            
            // Volver botón a la normalidad
            submitBtn.disabled = false;
            submitBtn.querySelector("span").textContent = originalText;
            btnIcon.className = "fa fa-paper-plane";
        }, 1000);
    }
});


