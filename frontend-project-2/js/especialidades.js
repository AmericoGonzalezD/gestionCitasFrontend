document.addEventListener('DOMContentLoaded', function() {
    const specialtiesTable = document.getElementById('specialtiesTable');
    const alertDiv = document.getElementById('alert');

    function fetchSpecialties() {
        fetch('http://localhost:8080/especialidades')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch specialties.');
                }
                return response.json();
            })
            .then(data => {
                displaySpecialties(data);
            })
            .catch(error => {
                showAlert(error.message);
            });
    }

    function displaySpecialties(specialties) {
        specialtiesTable.innerHTML = '';
        specialties.forEach(specialty => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${specialty.id}</td>
                <td>${specialty.name}</td>
                <td>
                    <button class="btn btn-warning" onclick="editSpecialty(${specialty.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteSpecialty(${specialty.id})">Delete</button>
                </td>
            `;
            specialtiesTable.appendChild(row);
        });
    }

    function showAlert(message) {
        alertDiv.innerText = message;
        alertDiv.classList.remove('d-none');
    }

    function editSpecialty(id) {
        // Logic for editing a specialty
    }

    function deleteSpecialty(id) {
        fetch(`http://localhost:8080/especialidades/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete specialty.');
            }
            fetchSpecialties();
        })
        .catch(error => {
            showAlert(error.message);
        });
    }

    fetchSpecialties();
});