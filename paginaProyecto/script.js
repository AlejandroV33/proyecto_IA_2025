document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const messagesContainer = document.getElementById('messages-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');

    // URL de la API
    const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:8000/query'
        : 'https://tu-url-ngrok.ngrok.io/query';

    // Sidebar toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });

    // Cerrar sidebar al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && e.target !== menuToggle) {
            sidebar.classList.remove('active');
        }
    });

    // Mensaje inicial
    addBotMessage("¡Hola! Soy DataBot, tu asistente inteligente. ¿En qué puedo ayudarte hoy?");

    // Event listeners para enviar mensajes
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Función principal para enviar mensajes
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message || message === '') return;

        // Agregar mensaje del usuario
        addUserMessage(message);
        userInput.value = '';
        showLoading();

        try {
            // Enviar mensaje al backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: message })
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            removeLoading();

            // Verificar si la respuesta contiene SQL y mostrarlo de manera especial
            if (data.sql_query) {
                addBotMessage(data.answer);
                addSQLMessage(data.sql_query);
            } else {
                addBotMessage(data.answer || "No pude generar una respuesta");
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            removeLoading();
            addBotMessage("⚠️ Error al conectar con el servidor. Por favor intenta nuevamente.");
        }
    }

    // Funciones auxiliares
    function addUserMessage(text) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${timeString}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${timeString}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addSQLMessage(sql) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-content">
                <strong>Consulta SQL generada:</strong>
                <div class="sql-code">${sql}</div>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot';
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div class="message-content">
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(loadingDiv);
        scrollToBottom();
    }

    function removeLoading() {
        const loadingDiv = document.getElementById('loading-indicator');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});