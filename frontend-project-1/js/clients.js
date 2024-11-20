// This file manages the clients page. It fetches appointments for the client from the specified endpoint, displays them in a Bootstrap table, and includes functionality to delete appointments.

document.addEventListener('DOMContentLoaded', function() {
    const appointmentsTable = document.getElementById('appointmentsTable');
    const alertDiv = document.getElementById('alert');

    // Fetch appointments from the API
    function fetchAppointments() {
        fetch('http://localhost:8080/citas')
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
                showAlert('Error fetching appointments: ' + error.message);
            });
    }

    // Display appointments in the table
    function displayAppointments(appointments) {
        appointmentsTable.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${appointment.clientName}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteAppointment(${appointment.id})">Delete</button>
                </td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    // Delete an appointment
    window.deleteAppointment = function(id) {
        fetch(`http://localhost:8080/citas/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchAppointments(); // Refresh the appointments list
            showAlert('Appointment deleted successfully.');
        })
        .catch(error => {
            showAlert('Error deleting appointment: ' + error.message);
        });
    };

    // Show alert messages
    function showAlert(message) {
        alertDiv.innerText = message;
        alertDiv.style.display = 'block';
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 3000);
    }

    // Initial fetch of appointments
    fetchAppointments();
});