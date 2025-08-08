/*
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                navLinks.classList.remove('active');
            }
        });
    });

    // Efecto de aparición al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .demo-container');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configura animaciones iniciales
    document.querySelectorAll('.feature-card, .step, .demo-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecuta una vez al cargar

    // Mini demo del chat (simulado)
    const demoChat = document.querySelector('.demo-chat');
    const demoInput = document.querySelector('.demo-form input');
    const demoButton = document.querySelector('.demo-form button');

    if (demoButton && demoInput) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            sendDemoMessage();
        });

        demoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }

    function sendDemoMessage() {
        const message = demoInput.value.trim();
        if (!message) return;

        // Agregar mensaje del usuario
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        demoChat.appendChild(userMessage);

        demoInput.value = '';

        // Simular respuesta después de un breve retraso
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';

            // Respuestas predefinidas para la demo
            if (message.toLowerCase().includes('producto')) {
                botMessage.textContent = 'El producto más vendido este mes es "Software Empresarial Premium" con 152 unidades.';
            } else if (message.toLowerCase().includes('ventas') || message.toLowerCase().includes('región')) {
                botMessage.textContent = 'Ventas por región:\n- Norte: $45,200\n- Sur: $38,750\n- Este: $52,100\n- Oeste: $41,300';
            } else {
                botMessage.textContent = 'En una implementación real, estaría consultando tus datos en tiempo real para darte una respuesta precisa.';
            }

            demoChat.appendChild(botMessage);
            demoChat.scrollTop = demoChat.scrollHeight;
        }, 800);
    }
});
*/

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                navLinks.classList.remove('active');
            }
        });
    });

    // Sistema de pestañas
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Agregar active al seleccionado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Mini demo del chat (simulado)
    const demoChat = document.querySelector('.demo-chat');
    const demoInput = document.querySelector('.demo-form input');
    const demoButton = document.querySelector('.demo-form button');

    if (demoButton && demoInput) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            sendDemoMessage();
        });

        demoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }

    function sendDemoMessage() {
        const message = demoInput.value.trim();
        if (!message) return;

        // Agregar mensaje del usuario
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        demoChat.appendChild(userMessage);

        demoInput.value = '';

        // Simular respuesta
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';

            if (message.toLowerCase().includes('cita') || message.toLowerCase().includes('agenda')) {
                botMessage.innerHTML = '✔ Cita agendada exitosamente<br><br>📅 Fecha: 20 de Julio, 2023<br>⏰ Hora: 10:00 AM<br>📍 Lugar: Oficina Principal<br><br>¿Necesitas que envíe un recordatorio por WhatsApp?';
            } else if (message.toLowerCase().includes('venta') || message.toLowerCase().includes('vend')) {
                botMessage.textContent = 'Las ventas de esta semana fueron de $12,450. El producto más vendido fue "Software Empresarial" con 35 unidades.';
            } else if (message.toLowerCase().includes('recordatorio') || message.toLowerCase().includes('envía')) {
                botMessage.textContent = 'Recordatorio enviado a 5 clientes pendientes por WhatsApp. 3 ya han confirmado su recepción.';
            } else {
                botMessage.textContent = 'Puedo ayudarte con consultas de datos, agendamiento de citas y envío de recordatorios. ¿Qué necesitas exactamente?';
            }

            demoChat.appendChild(botMessage);
            demoChat.scrollTop = demoChat.scrollHeight;
        }, 800);
    }

    // Efecto de aparición al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .demo-container, .use-case');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configura animaciones iniciales
    document.querySelectorAll('.feature-card, .step, .demo-container, .use-case').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                navLinks.classList.remove('active');
            }
        });
    });

    // Sistema de pestañas
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Agregar active al seleccionado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Mini demo del chat (simulado)
    const demoChat = document.querySelector('.demo-chat');
    const demoInput = document.querySelector('.demo-form input');
    const demoButton = document.querySelector('.demo-form button');

    if (demoButton && demoInput) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            sendDemoMessage();
        });

        demoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }

    function sendDemoMessage() {
        const message = demoInput.value.trim();
        if (!message) return;

        // Agregar mensaje del usuario
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        demoChat.appendChild(userMessage);

        demoInput.value = '';

        // Simular respuesta
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';

            if (message.toLowerCase().includes('cita') || message.toLowerCase().includes('agenda')) {
                botMessage.innerHTML = '✔ Cita agendada exitosamente<br><br>📅 Fecha: 20 de Julio, 2023<br>⏰ Hora: 10:00 AM<br>📍 Lugar: Oficina Principal<br><br>¿Necesitas que envíe un recordatorio por WhatsApp?';
            } else if (message.toLowerCase().includes('venta') || message.toLowerCase().includes('vend')) {
                botMessage.textContent = 'Las ventas de esta semana fueron de $12,450. El producto más vendido fue "Software Empresarial" con 35 unidades.';
            } else if (message.toLowerCase().includes('recordatorio') || message.toLowerCase().includes('envía')) {
                botMessage.textContent = 'Recordatorio enviado a 5 clientes pendientes por WhatsApp. 3 ya han confirmado su recepción.';
            } else {
                botMessage.textContent = 'Puedo ayudarte con consultas de datos, agendamiento de citas y envío de recordatorios. ¿Qué necesitas exactamente?';
            }

            demoChat.appendChild(botMessage);
            demoChat.scrollTop = demoChat.scrollHeight;
        }, 800);
    }

    // Efecto de aparición al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .demo-container, .use-case');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configura animaciones iniciales
    document.querySelectorAll('.feature-card, .step, .demo-container, .use-case').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});