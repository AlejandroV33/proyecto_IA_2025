document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Validar credenciales quemadas
    if (email === 'ejemplo@gmail.com' && password === 'hola123') {
        window.location.href = 'chat.html'; // Redirigir a chat.html
    } else {
        errorMessage.textContent = 'Correo o contraseña incorrectos.';
        errorMessage.style.display = 'block';
    }
});

