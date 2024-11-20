document.addEventListener('DOMContentLoaded', function() {
    const citasTableBody = document.getElementById('citasTableBody');
    const alertDiv = document.getElementById('alert');

    function fetchCitas() {
        fetch('http://localhost:8080/citas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch citas.');
                }
                return response.json();
            })
            .then(data => {
                populateCitasTable(data);
            })
            .catch(error => {
                showAlert(error.message);
            });
    }

    function populateCitasTable(citas) {
        citasTableBody.innerHTML = '';
        citas.forEach(cita => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cita.id}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td>${cita.paciente}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteCita(${cita.id})">Delete</button>
                </td>
            `;
            citasTableBody.appendChild(row);
        });
    }

    window.deleteCita = function(id) {
        fetch(`http://localhost:8080/citas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete cita.');
            }
            fetchCitas(); // Refresh the table
        })
        .catch(error => {
            showAlert(error.message);
        });
    };

    function showAlert(message) {
        alertDiv.innerText = message;
        alertDiv.classList.remove('d-none');
    }

    fetchCitas();
});