// This file handles the appointments page, including fetching appointment data and managing any specific functionalities related to appointments.

document.addEventListener("DOMContentLoaded", function() {
    const appointmentsTable = document.getElementById("appointmentsTable");
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentIdInput = document.getElementById("appointmentId");
    const clientNameInput = document.getElementById("clientName");
    const psychologistIdInput = document.getElementById("psychologistId");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const statusInput = document.getElementById("status");

    const apiUrl = "http://localhost:8080/citas";

    function fetchAppointments() {
        fetch(`${apiUrl}/psicologo?idPsicologo=123`) // Replace with actual psychologist ID
            .then(response => response.json())
            .then(data => {
                appointmentsTable.innerHTML = "";
                data.forEach(appointment => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${appointment.idCita}</td>
                        <td>${appointment.nombreCliente}</td>
                        <td>${appointment.nombrePsicologo}</td>
                        <td>${appointment.fecha}</td>
                        <td>${appointment.hora}</td>
                        <td>${appointment.estado}</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteAppointment(${appointment.idCita})">Eliminar</button>
                            <button class="btn btn-warning" onclick="editAppointment(${appointment.idCita})">Editar</button>
                        </td>
                    `;
                    appointmentsTable.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching appointments:", error));
    }

    function deleteAppointment(idCita) {
        fetch(`${apiUrl}/${idCita}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                fetchAppointments();
                alert("Cita eliminada con éxito.");
            } else {
                alert("Error al eliminar la cita.");
            }
        })
        .catch(error => console.error("Error deleting appointment:", error));
    }

    function editAppointment(idCita) {
        fetch(`${apiUrl}/${idCita}`)
            .then(response => response.json())
            .then(appointment => {
                appointmentIdInput.value = appointment.idCita;
                clientNameInput.value = appointment.nombreCliente;
                psychologistIdInput.value = appointment.idPsicologo;
                dateInput.value = appointment.fecha;
                timeInput.value = appointment.hora;
                statusInput.value = appointment.estado;
                $('#appointmentModal').modal('show'); // Assuming you're using Bootstrap modals
            })
            .catch(error => console.error("Error fetching appointment for edit:", error));
    }

    appointmentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const idCita = appointmentIdInput.value;
        const psychologistId = psychologistIdInput.value;
        const date = dateInput.value;
        const time = timeInput.value;

        fetch(`${apiUrl}/${idCita}?idPsicologo=${psychologistId}&fecha=${date}&hora=${time}`, {
            method: "PUT"
        })
        .then(response => {
            if (response.ok) {
                fetchAppointments();
                $('#appointmentModal').modal('hide');
                alert("Cita actualizada con éxito.");
            } else {
                alert("Error al actualizar la cita.");
            }
        })
        .catch(error => console.error("Error updating appointment:", error));
    });

    fetchAppointments();
});