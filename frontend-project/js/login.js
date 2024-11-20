// js/login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!validateEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        const loginData = {
            correo: email,
            password: password
        };

        fetch('http://localhost:8080/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en el login');
            }
            return response.json();
        })
        .then(data => {
            const role = data.rol; 
            const idUsuario = data.idUsuario;

            // Verifica si el idUsuario es válido
            if (!idUsuario) {
                throw new Error("ID de usuario no válido en la respuesta del servidor.");
            }

            // Guardar en localStorage
            localStorage.setItem("userId", idUsuario);
            localStorage.setItem("userRole", role);

            // Depuración
            console.log("User ID:", idUsuario); // Verifica que se guardó correctamente
            console.log("User Role:", role);   // Verifica que se guardó correctamente

            // Redirigir según el rol
            if (role === "cliente") {
                window.location.href = `clients.html?idCliente=${idUsuario}`;
            } else if (role === "psicologo") {
                window.location.href = "index.html"; // Redirige a index.html
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    });

    // Función para validar el email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});


