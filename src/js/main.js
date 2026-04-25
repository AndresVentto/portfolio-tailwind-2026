import { menuFunciones } from './menu.js';
import { darkMode, lightMode, cargarParticles } from './theme.js';
import { scrollHeaderFondo } from './scroll.js';
import { moverIndicador, openModal, closeModal } from './proyectos.js';
import { copyAr, renderContacto } from './copy.js';
// Importamos la nueva función
import { initContactForm } from './contact.js'; 

// Ejecución de funciones
menuFunciones();
scrollHeaderFondo();
copyAr();
renderContacto();
initContactForm(); // <--- Llamada a la validación



// Deshabilitar clik derecho
document.addEventListener('contextmenu', event => event.preventDefault());
// Deshabilitar selección de texto
document.onselectstart = function() { return false; };




