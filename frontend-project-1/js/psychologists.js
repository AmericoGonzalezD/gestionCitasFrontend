// This file manages the psychologists page. It fetches appointments for the psychologist, displays them in a Bootstrap table, and includes buttons for editing and deleting appointments.

document.addEventListener('DOMContentLoaded', function() {
    const appointmentsTable = document.getElementById('appointmentsTable');
    const apiUrl = 'http://localhost:8080/psychologists/appointments';

    function fetchAppointments() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayAppointments(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function displayAppointments(appointments) {
        appointmentsTable.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.clientName}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editAppointment(${appointment.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAppointment(${appointment.id})">Delete</button>
                </td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    window.editAppointment = function(id) {
        // Logic to edit appointment
        alert(`Edit appointment with ID: ${id}`);
    };

    window.deleteAppointment = function(id) {
        // Logic to delete appointment
        if (confirm(`Are you sure you want to delete appointment with ID: ${id}?`)) {
            fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchAppointments(); // Refresh the table
            })
            .catch(error => {
                console.error('There was a problem with the delete operation:', error);
            });
        }
    };

    fetchAppointments();
});