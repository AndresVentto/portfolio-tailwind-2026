/*~~~~~~~~~~~~~~~ CAMBIAR FONDO DEL ENCABEZADO (Header) ~~~~~~~~~~~~~~~*/ 

export function scrollHeaderFondo() {
    const header = document.getElementById("header");
    const logoOscuro = document.getElementById("logo-oscuro");
    const themeBoton = document.getElementById("theme-btn");
    const hamburguesa = document.getElementById("hamburguesa");
    const aTags = document.querySelectorAll("nav ul li a");

    const scrollHeader = () => {
        // Aumentamos un poco el umbral a 20px para evitar saltos bruscos
        if (window.scrollY > 20) {
            header.classList.add("bg-[hsla(216,100%,5%,0.98)]", "shadow-xl", "py-2");
            header.classList.remove("py-5"); // Hacemos el header un poco más delgado al bajar
            
            // Forzar color blanco en elementos críticos
            [themeBoton, hamburguesa, ...aTags].forEach(el => {
                if(el) el.style.color = "#ffffff";
            });

            if (logoOscuro) logoOscuro.style.filter = "brightness(0) invert(1)";
        } else {
            header.classList.remove("bg-[hsla(216,100%,5%,0.98)]", "shadow-xl", "py-2");
            header.classList.add("py-5");
            
            // Volver a colores originales (esto quita el estilo inline)
            [themeBoton, hamburguesa, ...aTags].forEach(el => {
                if(el) el.style.color = "";
            });

            if (logoOscuro) logoOscuro.style.filter = "none";
        }
    };

    window.addEventListener("scroll", scrollHeader);
    window.addEventListener("load", scrollHeader); // Ejecutar al cargar la página
}

/*~~~~~~~~~~~~~~~ MOSTRAR BOTÓN DE DESPLAZAMIENTO HACIA ARRIBA ~~~~~~~~~~~~~~~*/ 
const scrollUpBtn = document.getElementById("scroll-up");

// Función de suavizado (Easing)
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

const scrollToTopGraceful = () => {
    const startY = window.scrollY;
    if (startY <= 0) return;

    const duration = Math.min(100, 480 + startY * 0.42);
    const t0 = performance.now();

    const step = (now) => {
        const elapsed = now - t0;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutQuint(t);
        window.scrollTo(0, startY * (1 - eased));
        if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

const updateScrollUpBtn = () => {
    if (!scrollUpBtn) return; // Seguridad por si el ID no existe en el HTML
    
    if (window.scrollY >= 300) {
        scrollUpBtn.classList.remove("-bottom-28", "opacity-0", "pointer-events-none");
        scrollUpBtn.classList.add("bottom-6", "opacity-100", "pointer-events-auto");
    } else {
        scrollUpBtn.classList.add("-bottom-28", "opacity-0", "pointer-events-none");
        scrollUpBtn.classList.remove("bottom-6", "opacity-100", "pointer-events-auto");
    }
};

window.addEventListener("scroll", updateScrollUpBtn);
if (scrollUpBtn) scrollUpBtn.addEventListener("click", scrollToTopGraceful);

/*~~~~~~~~~~~~~~~ ENLACE ACTIVO DE SECCIONES ~~~~~~~~~~~~~~~*/ 
const activarLink = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // Ajustamos el offset para que el cambio sea más natural
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((item) => {
        item.classList.remove("active");
        // Verificamos si el href termina en el ID actual
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
};

window.addEventListener("scroll", activarLink);