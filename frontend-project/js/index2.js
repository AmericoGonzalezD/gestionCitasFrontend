// Bloquear el campo idPsicologo y asignarle el userId al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const idPsicologoInput = document.getElementById("idPsicologo");
    const userId = localStorage.getItem("userId"); // Obtener el userId desde localStorage

    // Si se encuentra el userId, bloquear el campo y asignarle el valor
    if (userId) {
        idPsicologoInput.value = userId; // Asignar el valor del userId
        idPsicologoInput.disabled = true; // Bloquear el campo para que no sea editable
    } else {
        console.error("No se encontró el userId en el localStorage.");
        alert("Error: No se encontró el usuario. Por favor, inicia sesión nuevamente.");
    }

    // Cargar los psicólogos en el select
    fetchPsychologists();
});

// Función para cargar los psicólogos
function fetchPsychologists() {
    const psicologoSelect = document.getElementById("idPsicologo");
    const userId = localStorage.getItem("userId"); // Obtener el userId almacenado

    fetch("http://localhost:8080/psicologo")
        .then(response => response.json())
        .then(data => {
            // Limpiar el select antes de agregar opciones
            psicologoSelect.innerHTML = '<option value="">Seleccionar Psicólogo</option>';

            data.forEach(psicologo => {
                const option = document.createElement("option");
                option.value = psicologo.id;
                option.textContent = `ID: ${psicologo.id} - ${psicologo.nombre}`;
                psicologoSelect.appendChild(option);
            });

            // Seleccionar automáticamente el psicólogo si el userId coincide
            if (userId) {
                psicologoSelect.value = userId; // Seleccionar la opción correspondiente al userId
                psicologoSelect.disabled = true; // Bloquear el select para que no sea editable
            }
        })
        .catch(error => console.error("Error al cargar psicólogos:", error));
}

// Función para crear la cita
document.getElementById("createCitaForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional.
    const idCliente = document.getElementById("idCliente").value;
    const idPsicologo = document.getElementById("idPsicologo").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const estado = document.getElementById("estado").value;

    if (!idCliente || !idPsicologo || !fecha || !hora || !estado) {
        alert("Por favor, complete todos los campos antes de enviar.");
        return;
    }

    createAppointment(idCliente, idPsicologo, fecha, hora, estado);

    function createAppointment(idCliente, idPsicologo, fecha, hora, estado) {
        const endpoint = `http://localhost:8080/citas?idCliente=${idCliente}&idPsicologo=${idPsicologo}&fecha=${fecha}&hora=${hora}&estado=${estado}`;

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.text(); // Extraemos el mensaje del servidor
                } else {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
            })
            .then(message => {
                alert("Cita creada exitosamente: " + message);
                const modal = bootstrap.Modal.getInstance(document.getElementById("createModal"));
                modal.hide();
                fetchAppointments(); // Recarga las citas
            })
            .catch(error => {
                console.error("Error al crear la cita:", error.message);
                alert("Error al crear la cita: " + error.message);
            });
    }
});

// Función para cargar citas
function fetchAppointments() {
    const idPsicologo = document.getElementById("idPsicologo").value;

    const endpoint = `http://localhost:8080/citas/psicologo?idPsicologo=${idPsicologo}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const appointmentsTable = document.getElementById("appointmentsTable");
            appointmentsTable.innerHTML = "";

            if (!data || !data.citas || data.citas.length === 0) {
                appointmentsTable.innerHTML = "<tr><td colspan='6'>No hay citas disponibles.</td></tr>";
                return;
            }

            data.citas.forEach(cita => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cita.clienteNombre}</td>
                    <td>${cita.psicologoNombre}</td>
                    <td>${cita.fecha}</td>
                    <td>${cita.hora}</td>
                    <td>${cita.estado}</td>
                    <td>
                        <button class="btn btn-primary btn-edit" data-id="${cita.idCita}">Editar</button>
                        <button class="btn btn-danger btn-delete" data-id="${cita.idCita}">Eliminar</button>
                    </td>
                `;
                appointmentsTable.appendChild(row);
            });

            // Asignar eventos a los botones
            document.querySelectorAll(".btn-edit").forEach(button => {
                button.addEventListener("click", e => {
                    const idCita = e.target.getAttribute("data-id");
                    editAppointment(idCita, idPsicologo);
                });
            });

            document.querySelectorAll(".btn-delete").forEach(button => {
                button.addEventListener("click", e => {
                    const idCita = e.target.getAttribute("data-id");
                    deleteAppointment(idCita);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar citas:", error);
            const appointmentsTable = document.getElementById("appointmentsTable");
            appointmentsTable.innerHTML = "<tr><td colspan='6'>Error al cargar citas.</td></tr>";
        });
}
