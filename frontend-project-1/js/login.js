// js/login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        showAlert('Por favor, ingrese un correo electrónico válido.', 'danger');
        return;
    }

    const userData = {
        correo: email,
        password: password
    };

    fetch('http://localhost:8080/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }
        return response.json();
    })
    .then(data => {
        // Redirect based on user role
        if (data.role === 'cliente') {
            window.location.href = 'clients.html';
        } else if (data.role === 'psicologo') {
            window.location.href = 'psychologists.html';
        } else {
            showAlert('Rol de usuario no reconocido.', 'danger');
        }
    })
    .catch(error => {
        showAlert(error.message, 'danger');
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showAlert(message, type) {
    const alertDiv = document.getElementById('alert');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerText = message;
    alertDiv.style.display = 'block';
}