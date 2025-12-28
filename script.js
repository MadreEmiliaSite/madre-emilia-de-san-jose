/* ========================================
   MADRE EMILIA DE SAN JOSÉ - JAVASCRIPT v2.0
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES =====
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const navDropdown = document.querySelector('.nav__dropdown');
    const dropdownToggle = document.querySelector('.nav__dropdown-toggle');
    
    // ===== MENÚ MÓVIL =====
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Dropdown en móvil
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            }
        });
    }
    
    // ===== HEADER CON EFECTO AL SCROLL =====
    function scrollHeader() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', scrollHeader);
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== MAPA DE VENEZUELA CON LEAFLET =====
    function initMap() {
        const mapElement = document.getElementById('venezuela-map');
        if (!mapElement) return;
        
        // Crear el mapa centrado en Venezuela
        const map = L.map('venezuela-map').setView([8.5, -66.5], 6);
        
        // Añadir capa de mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Definir íconos personalizados
        const birthIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #e74c3c; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const foundationIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #3498db; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const houseIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #2ecc71; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        const deathIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #9b59b6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        // Marcadores
        const locations = [
            {
                coords: [10.4806, -66.9036],
                name: 'Caracas',
                description: 'Lugar de nacimiento (1848)',
                icon: birthIcon,
                id: 'caracas'
            },
            {
                coords: [10.6015, -66.9333],
                name: 'La Guaira',
                description: 'Fundación de la Congregación (1901)',
                icon: foundationIcon,
                id: 'laguaira'
            },
            {
                coords: [10.5936, -66.9597],
                name: 'Maiquetía',
                description: 'Lugar de fallecimiento (1939)',
                icon: deathIcon,
                id: 'maiquetia'
            },
            {
                coords: [10.1579, -67.9972],
                name: 'Valencia',
                description: 'Casa de la Congregación',
                icon: houseIcon,
                id: 'valencia'
            },
            {
                coords: [10.6544, -71.6295],
                name: 'Maracaibo',
                description: 'Obra educativa',
                icon: houseIcon,
                id: 'maracaibo'
            },
            {
                coords: [10.0647, -69.3570],
                name: 'Barquisimeto',
                description: 'Obra social',
                icon: houseIcon,
                id: 'barquisimeto'
            }
        ];
        
        // Añadir marcadores al mapa
        const markers = {};
        
        locations.forEach(loc => {
            const marker = L.marker(loc.coords, { icon: loc.icon })
                .addTo(map)
                .bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
            
            markers[loc.id] = { marker, coords: loc.coords };
        });
        
        // Interacción con las tarjetas de lugares
        const placeCards = document.querySelectorAll('.place-card');
        
        placeCards.forEach(card => {
            card.addEventListener('click', () => {
                const locationId = card.dataset.location;
                
                // Remover clase active de todas las tarjetas
                placeCards.forEach(c => c.classList.remove('active'));
                
                // Añadir clase active a la tarjeta clickeada
                card.classList.add('active');
                
                // Centrar el mapa en la ubicación
                if (markers[locationId]) {
                    map.setView(markers[locationId].coords, 10);
                    markers[locationId].marker.openPopup();
                }
            });
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                const locationId = card.dataset.location;
                if (markers[locationId]) {
                    markers[locationId].marker.openPopup();
                }
            });
        });
    }
    
    // Inicializar mapa cuando Leaflet esté disponible
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        // Si Leaflet no está cargado, intentar de nuevo en 1 segundo
        setTimeout(() => {
            if (typeof L !== 'undefined') {
                initMap();
            }
        }, 1000);
    }
    
    // ===== SLIDER DE FRASES =====
    const frasesContainer = document.getElementById('frases-container');
    const fraseCards = document.querySelectorAll('.frase-card');
    const prevBtn = document.getElementById('prev-frase');
    const nextBtn = document.getElementById('next-frase');
    const dotsContainer = document.getElementById('frases-dots');
    
    let currentFrase = 0;
    const totalFrases = fraseCards.length;
    
    // Crear dots
    if (dotsContainer) {
        for (let i = 0; i < totalFrases; i++) {
            const dot = document.createElement('div');
            dot.classList.add('frases__dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToFrase(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    const dots = document.querySelectorAll('.frases__dot');
    
    function updateFrases() {
        fraseCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentFrase) {
                card.classList.add('active');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentFrase) {
                dot.classList.add('active');
            }
        });
    }
    
    function goToFrase(index) {
        currentFrase = index;
        updateFrases();
    }
    
    function nextFrase() {
        currentFrase = (currentFrase + 1) % totalFrases;
        updateFrases();
    }
    
    function prevFrase() {
        currentFrase = (currentFrase - 1 + totalFrases) % totalFrases;
        updateFrases();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextFrase);
    if (prevBtn) prevBtn.addEventListener('click', prevFrase);
    
    // Auto-play del slider
    let fraseInterval = setInterval(nextFrase, 6000);
    
    // Pausar al interactuar
    if (frasesContainer) {
        frasesContainer.addEventListener('mouseenter', () => {
            clearInterval(fraseInterval);
        });
        
        frasesContainer.addEventListener('mouseleave', () => {
            fraseInterval = setInterval(nextFrase, 6000);
        });
    }
    
    // ===== ANIMACIÓN DE NÚMEROS =====
    function animateNumbers() {
        const numbers = document.querySelectorAll('.impacto__number');
        
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2500;
            const start = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                number.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target.toLocaleString();
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Intersection Observer para números
    const impactoSection = document.getElementById('impacto');
    let numbersAnimated = false;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !numbersAnimated) {
                animateNumbers();
                numbersAnimated = true;
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (impactoSection) {
        observer.observe(impactoSection);
    }
    
    // ===== ANIMACIÓN DE ELEMENTOS AL SCROLL =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.virtud-card, .timeline__item, .galeria__item, .place-card'
        );
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        const animateOnScroll = () => {
            animatedElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Ejecutar una vez al cargar
    }
    
    initScrollAnimations();
    
    // ===== ACTIVE LINK EN NAVEGACIÓN =====
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
    
    // ===== CERRAR MENÚ AL HACER CLIC FUERA =====
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // ===== TECLA ESCAPE PARA CERRAR MENÚ =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== RESIZE HANDLER =====
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== PARTÍCULAS EN EL HERO (Efecto simple) =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background-color: rgba(79, 195, 247, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Añadir keyframes de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    createParticles();
    
    console.log('✝ Página de la Venerable Madre Emilia de San José cargada correctamente');

    // ===== MODALES DE VIRTUDES =====
const virtudButtons = document.querySelectorAll('.virtud-card__btn');
const virtudModals = document.querySelectorAll('.virtud-modal');

// Abrir modal
virtudButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Cerrar modal con botón X
virtudModals.forEach(modal => {
    const closeBtn = modal.querySelector('.virtud-modal__close');
    const overlay = modal.querySelector('.virtud-modal__overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Cerrar modal al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        virtudModals.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ===== MAPA INTERACTIVO DE VENEZUELA =====

// Nombres de TODAS las diócesis (para mostrar tooltip en todas)
const nombresDiocesis = {
    'diocesis-caracas': 'Arquidiócesis de Caracas',
    'diocesis-la-guaira': 'Diócesis de La Guaira',
    'diocesis-puerto-ayacucho': 'Diócesis de Puerto Ayacucho',
    'diocesis-barcelona': 'Diócesis de Barcelona',
    'diocesis-san-fernando': 'Diócesis de San Fernando de Apure',
    'diocesis-maracay': 'Diócesis de Maracay',
    'diocesis-barinas': 'Diócesis de Barinas',
    'diocesis-ciudad-bolivar': 'Diócesis de Ciudad Bolívar',
    'diocesis-valencia': 'Diócesis de Valencia',
    'diocesis-san-carlos': 'Diócesis de San Carlos',
    'diocesis-tucupita': 'Diócesis de Tucupita',
    'diocesis-coro': 'Diócesis de Coro',
    'diocesis-calabozo': 'Diócesis de Calabozo',
    'diocesis-barquisimeto': 'Arquidiócesis de Barquisimeto',
    'diocesis-merida': 'Arquidiócesis de Mérida',
    'diocesis-los-teques': 'Diócesis de Los Teques',
    'diocesis-maturin': 'Diócesis de Maturín',
    'diocesis-margarita': 'Diócesis de Margarita',
    'diocesis-guanare': 'Diócesis de Guanare',
    'diocesis-cumana': 'Diócesis de Cumaná',
    'diocesis-san-cristobal': 'Diócesis de San Cristóbal',
    'diocesis-trujillo': 'Diócesis de Trujillo',
    'diocesis-san-felipe': 'Diócesis de San Felipe',
    'diocesis-maracaibo': 'Arquidiócesis de Maracaibo'
};

// Datos completos solo para diócesis con información
const diocesisData = {
    'diocesis-caracas': {
        tituloModal: '<span class="huellas-modal__title-highlight">Arquidiócesis de</span> Caracas',
        lugares: [
            {
                titulo: 'Lugar de Nacimiento',
                fecha: '7 de diciembre de 1858',
                descripcion: 'Emilia Chapellín Istúriz nació en Caracas, en el seno de una familia católica ejemplar. Fue la novena de doce hijos.'
            },
            {
                titulo: 'Catedral de Caracas',
                fecha: '12 de enero de 1859',
                descripcion: 'A los 36 días de nacida recibió el Sacramento del Bautismo en la Catedral de Caracas.'
            },
            {
                titulo: 'Asilo de la Providencia',
                fecha: '15 de enero de 1892',
                descripcion: 'Fundó en Caracas el Asilo de la Providencia, segunda casa de la Congregación, en condiciones de pobreza heroica.'
            }
        ]
    },
    'diocesis-la-guaira': {
        tituloModal: '<span class="huellas-modal__title-highlight">Diócesis de</span> La Guaira',
        lugares: [
            {
                titulo: 'Hospital San José de Maiquetía',
                fecha: '22 de abril de 1888',
                descripcion: 'Se inauguró el Hospital de San José, donde Emilia comenzó su servicio a los enfermos más necesitados.'
            },
            {
                titulo: 'Fundación de la Congregación',
                fecha: '25 de septiembre de 1889',
                descripcion: 'Junto al Padre Santiago Machado, fundó la Congregación de Hermanitas de los Pobres de Maiquetía, primera Congregación religiosa venezolana.'
            },
            {
                titulo: 'Capilla del Hospital',
                fecha: '30 de agosto de 1890',
                descripcion: 'Se instaló el Santísimo Sacramento en la capilla, centro de la vida espiritual de la comunidad.'
            },
            {
                titulo: 'Macuto - Lugar de Fallecimiento',
                fecha: '18 de enero de 1893',
                descripcion: 'Falleció durante la Misa, momentos después de recibir la Santa Comunión, a los 34 años de edad. Murió en ejercicio actual de amor de Dios.'
            }
        ]
    }
};

// Elementos del DOM
const tooltip = document.getElementById('map-tooltip');
const tooltipText = tooltip ? tooltip.querySelector('.map__tooltip-text') : null;
const modal = document.getElementById('huellas-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalOverlay = modal ? modal.querySelector('.huellas-modal__overlay') : null;

// Diócesis que tienen información completa (pueden abrir modal)
const diocesisConInfo = ['diocesis-caracas', 'diocesis-la-guaira'];

// Obtener TODAS las diócesis del mapa
const todasLasDiocesis = document.querySelectorAll('[id^="diocesis-"]');

// Inicializar eventos para TODAS las diócesis
todasLasDiocesis.forEach(diocesis => {
    const id = diocesis.id;
    const nombre = nombresDiocesis[id] || id.replace('diocesis-', '').replace(/-/g, ' ');
    
    // Evento hover - mostrar tooltip para TODAS
    diocesis.addEventListener('mouseenter', (e) => {
        if (tooltipText && tooltip) {
            tooltipText.textContent = nombre;
            tooltip.classList.add('visible');
        }
        if (diocesisConInfo.includes(id)) {
            diocesis.classList.add('active');
        }
    });
    
    // Evento mousemove - mover tooltip (posición fija al cursor)
    diocesis.addEventListener('mousemove', (e) => {
        if (tooltip) {
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = (e.clientY - 15) + 'px';
        }
    });
    
    // Evento mouseleave - ocultar tooltip
    diocesis.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.classList.remove('visible');
        }
        diocesis.classList.remove('active');
    });
    
    // Evento click - solo para diócesis con información
    if (diocesisConInfo.includes(id)) {
        diocesis.style.cursor = 'pointer';
        
        diocesis.addEventListener('click', () => {
            const data = diocesisData[id];
            if (data && modal) {
                // Llenar el título
                modalTitle.innerHTML = data.tituloModal;
                
                // Llenar el contenido
                let contenidoHTML = '';
                data.lugares.forEach(lugar => {
                    contenidoHTML += `
                        <div class="huellas-modal__lugar">
                            <h3 class="huellas-modal__lugar-title">${lugar.titulo}</h3>
                            <p class="huellas-modal__lugar-fecha">${lugar.fecha}</p>
                            <p class="huellas-modal__lugar-desc">${lugar.descripcion}</p>
                        </div>
                    `;
                });
                modalBody.innerHTML = contenidoHTML;
                
                // Mostrar modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
});

// Cerrar modal con botón X
if (modalClose) {
    modalClose.addEventListener('click', cerrarModalHuellas);
}

// Cerrar modal al hacer clic en overlay
if (modalOverlay) {
    modalOverlay.addEventListener('click', cerrarModalHuellas);
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        cerrarModalHuellas();
    }
});

function cerrarModalHuellas() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

console.log('✓ Mapa de Venezuela inicializado correctamente');
});