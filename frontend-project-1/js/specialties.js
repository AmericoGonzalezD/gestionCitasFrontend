// This file manages the specialties page. It fetches specialties from the endpoint, displays them in a table, and includes functionality to edit specialty names.

document.addEventListener('DOMContentLoaded', function() {
    const specialtiesTable = document.getElementById('specialtiesTable');
    const alertDiv = document.getElementById('alert');

    function fetchSpecialties() {
        fetch('http://localhost:8080/specialties')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displaySpecialties(data);
            })
            .catch(error => {
                showAlert('Error fetching specialties: ' + error.message);
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
                    <button class="btn btn-warning btn-sm" onclick="editSpecialty(${specialty.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteSpecialty(${specialty.id})">Delete</button>
                </td>
            `;
            specialtiesTable.appendChild(row);
        });
    }

    function editSpecialty(id) {
        const newName = prompt('Enter new specialty name:');
        if (newName) {
            fetch(`http://localhost:8080/specialties/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newName })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchSpecialties();
            })
            .catch(error => {
                showAlert('Error updating specialty: ' + error.message);
            });
        }
    }

    function deleteSpecialty(id) {
        if (confirm('Are you sure you want to delete this specialty?')) {
            fetch(`http://localhost:8080/specialties/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchSpecialties();
            })
            .catch(error => {
                showAlert('Error deleting specialty: ' + error.message);
            });
        }
    }

    function showAlert(message) {
        alertDiv.innerText = message;
        alertDiv.style.display = 'block';
    }

    fetchSpecialties();
});