document.addEventListener("DOMContentLoaded", function () {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get("idCliente") || urlParams.get("idPsicologo"); // Buscar ambos parámetros

    // Si no hay userId en la URL, buscar en localStorage
    if (!userId) {
        userId = localStorage.getItem("userId");
    }

    // Determinar si el usuario es un cliente o psicólogo
    const isPsychologist = urlParams.has("idPsicologo") || localStorage.getItem("userType") === "psicologo";

    if (!userId) {
        alert("No se encontró información del usuario. Por favor, inicie sesión.");
        window.location.href = "login.html";
        return;
    }

    console.log("ID del usuario:", userId, isPsychologist ? "(Psicólogo)" : "(Cliente)");

    const appointmentsTable = document.getElementById("appointmentsTableBody");

    // Fetch para obtener las citas
    function fetchAppointments() {
        const endpoint = isPsychologist
            ? `http://localhost:8080/citas/psicologo?idPsicologo=${userId}`
            : `http://localhost:8080/citas/cliente?idCliente=${userId}`;

        fetch(endpoint)
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

        if (!data || !data.citas || data.citas.length === 0) {
            appointmentsTable.innerHTML = "<tr><td colspan='6'>No hay citas agendadas</td></tr>";
            return;
        }

        appointments.forEach(appointment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointment.idCita}</td>
                <td>${appointment.clienteNombre}</td>
                <td>${appointment.psicologoNombre}</td>
                <td>${appointment.fecha}</td>
                <td>${appointment.hora}</td>
                <td>${appointment.estado.trim()}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteAppointment(${appointment.idCita})">Eliminar cita</button>
                </td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    // Función para eliminar una cita
    window.deleteAppointment = function (idCita) {
        fetch(`http://localhost:8080/citas/${idCita}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    fetchAppointments(); // Actualizar la lista de citas
                    alert("Cita eliminada con éxito.");
                } else {
                    alert("Error al eliminar la cita.");
                }
            })
            .catch(error => {
                console.error("Error deleting appointment:", error);
            });
    };

    // Llamar a la función para obtener las citas inicialmente
    fetchAppointments();
});

