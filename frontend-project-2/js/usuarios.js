document.addEventListener('DOMContentLoaded', function() {
    const usuariosTableBody = document.getElementById('usuariosTableBody');
    const alertDiv = document.getElementById('alert');

    function fetchUsuarios() {
        fetch('http://localhost:8080/usuarios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch usuarios.');
                }
                return response.json();
            })
            .then(data => {
                populateUsuariosTable(data);
            })
            .catch(error => {
                showAlert(error.message);
            });
    }

    function populateUsuariosTable(usuarios) {
        usuariosTableBody.innerHTML = '';
        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUsuario(${usuario.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUsuario(${usuario.id})">Delete</button>
                </td>
            `;
            usuariosTableBody.appendChild(row);
        });
    }

    window.editUsuario = function(id) {
        // Logic to edit usuario
        alert(`Edit usuario with ID: ${id}`);
    };

    window.deleteUsuario = function(id) {
        if (confirm('Are you sure you want to delete this usuario?')) {
            fetch(`http://localhost:8080/usuarios/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete usuario.');
                }
                fetchUsuarios();
            })
            .catch(error => {
                showAlert(error.message);
            });
        }
    };

    function showAlert(message) {
        alertDiv.innerText = message;
        alertDiv.classList.remove('d-none');
    }

    fetchUsuarios();
});