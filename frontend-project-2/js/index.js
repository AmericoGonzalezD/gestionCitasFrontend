document.addEventListener('DOMContentLoaded', function() {
    const appointmentsTable = document.getElementById('appointmentsTable');

    function fetchAppointments() {
        fetch('http://localhost:8080/appointments')
            .then(response => response.json())
            .then(data => {
                populateAppointmentsTable(data);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error);
            });
    }

    function populateAppointmentsTable(appointments) {
        appointmentsTable.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${appointment.psychologist}</td>
                <td>${appointment.client}</td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    fetchAppointments();
});