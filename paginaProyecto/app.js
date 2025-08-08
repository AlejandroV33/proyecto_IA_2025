document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // URL de tu API
    const API_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:8000/query'
        : 'https://tu-url-ngrok.ngrok.io/query';  //está seria la URL de la API en producción

    // Mensaje inicial
    addBotMessage("¡Hola! Soy tu asistente de consultas. Puedes preguntarme lo que sea acerca de la empresa");

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        userInput.value = '';
        showLoading();

        // Enviar mensaje al backend
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: message })
        })
            .then(response => response.json())
            .then(data => {
                removeLoading();
                addBotMessage(data.answer || "No pude generar una respuesta");
            })
            .catch(error => {
                console.error('Error:', error);
                removeLoading();
                addBotMessage("Error al conectar con el servidor");
            });
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot-message';
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
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