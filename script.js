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
});