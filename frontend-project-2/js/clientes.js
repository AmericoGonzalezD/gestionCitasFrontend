document.addEventListener("DOMContentLoaded", function() {
    // Extraer el ID del cliente desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get("idCliente");

    if (!clientId) {
        console.error("No se encontró el idCliente en la URL.");
        alert("No se encontró información del cliente. Por favor, inicie sesión.");
        window.location.href = "login.html";
        return;
    }

    console.log("ID Cliente obtenido de la URL:", clientId);

    const appointmentsTable = document.getElementById("appointmentsTableBody");

    // Fetch para obtener citas
    function fetchAppointments() {
        fetch(`http://localhost:8080/citas/cliente?idCliente=${clientId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las citas");
                }
                return response.json();
            })
            .then(data => {
                displayAppointments(data);
            })
            .catch(error => {
                console.error("Error fetching appointments:", error);
            });
    }

    // Mostrar citas en la tabla
    function displayAppointments(appointments) {
        appointmentsTable.innerHTML = ""; // Limpiar filas previas

        if (!appointments || appointments.length === 0) {
            console.warn("No hay citas disponibles para mostrar.");
            return;
        }

        appointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointment.numeroCita}</td>
                <td>${appointment.nombreCliente}</td>
                <td>${appointment.nombrePsicologo}</td>
                <td>${appointment.fecha}</td>
                <td>${appointment.horario}</td>
                <td>${appointment.estado}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteAppointment(${appointment.idCita})">Eliminar cita</button>
                </td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    // Eliminar cita
    window.deleteAppointment = function(idCita) {
        fetch(`http://localhost:8080/citas/${idCita}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                fetchAppointments(); // Actualizar la lista
                alert("Cita eliminada con éxito.");
            } else {
                alert("Error al eliminar la cita.");
            }
        })
        .catch(error => {
            console.error("Error deleting appointment:", error);
        });
    };

    // Llamada inicial
    fetchAppointments();
});
