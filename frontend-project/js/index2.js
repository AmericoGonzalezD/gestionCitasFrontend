

document.getElementById("createCitaForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional.
    const userId = localStorage.getItem("userId");

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
            // Verifica si la respuesta es exitosa
            if (response.ok) {
                return response.text(); // Extraemos el mensaje del servidor
            } else {
                // Captura el mensaje de error en caso de que no sea exitoso
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
        function fetchAppointments() {
    const endpoint = `http://localhost:8080/citas/psicologo?idPsicologo=${userId}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const idPsicologo = data.idPsicologo; // Obtener idPsicologo de la respuesta
            appointmentsTable.innerHTML = ""; // Limpiar tabla antes de agregar datos

            if (!data || !data.citas || data.citas.length === 0) {
                appointmentsTable.innerHTML = "<tr><td colspan='6'>No hay citas disponibles.</td></tr>";
                return;
            }

            // Mostrar las citas en la tabla
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
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const idCita = e.target.getAttribute('data-id');
                editAppointment(idCita, idPsicologo); // Pasar idPsicologo a la función de edición
            });
        });

            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', (e) => {
                    const idCita = e.target.getAttribute('data-id');
                    deleteAppointment(idCita);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar citas:", error);
            appointmentsTable.innerHTML = "<tr><td colspan='6'>Error al cargar citas.</td></tr>";
        });
}
}


});
