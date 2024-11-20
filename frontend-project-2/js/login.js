document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const alertDiv = document.getElementById('alert');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const correo = emailInput.value.trim();
        const password = passwordInput.value;

        if (!validateEmail(correo)) {
            showAlert('Please enter a valid email address.');
            return;
        }

        fetch('http://localhost:8080/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login, e.g., redirect or store user info
            const idCliente = data.idCliente; // Assuming the response contains 'idCliente'
            window.location.href = `clientes.html?idCliente=${idCliente}`;
        })
        .catch(error => {
            showAlert(error.message);
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(message) {
        alertDiv.textContent = message;
        alertDiv.classList.remove('d-none');
    }
});