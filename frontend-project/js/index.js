
    document.addEventListener("DOMContentLoaded", function () {
        const appointmentsTable = document.getElementById("appointmentsTable");
    
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");
    
        if (!userId || !userRole || userRole !== "psicologo") {
            window.location.href = "login.html";
            return;
        }
    
        // Función para obtener y mostrar las citas
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

    /*window.editAppointment = function(id, idPsicologo) {
        // Obtener las referencias de los elementos en el modal
        const clientIdInput = document.getElementById("editClientId");
        const idPsicologoSelect = document.getElementById("editIdPsicologo"); // select del psicólogo
        const appointmentDateInput = document.getElementById("editAppointmentDate");
        const appointmentTimeInput = document.getElementById("editAppointmentTime");
        const appointmentStatusInput = document.getElementById("editAppointmentStatus");

        const row = document.querySelector(`button[data-id='${id}']`).closest('tr');
        const idCliente = row.querySelector('td:nth-child(1)').textContent;
        const psicologoNombre = row.querySelector('td:nth-child(2)').textContent;
        const fecha = row.querySelector('td:nth-child(3)').textContent;
        const hora = row.querySelector('td:nth-child(4)').textContent;
        const estado = row.querySelector('td:nth-child(5)').textContent;

        // Rellenar los campos del formulario con los datos de la cita
        clientIdInput.value = idCliente; // idCliente no editable
        appointmentDateInput.value = fecha;
        appointmentTimeInput.value = hora;
        appointmentStatusInput.value = estado;

        // Cargar psicólogos y seleccionar el idPsicologo correspondiente
        fetchPsychologistsForEdit(idPsicologo); // Pasa el idPsicologo desde la respuesta

        // Mostrar el modal para editar
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    };*/
    /*window.editAppointment = function(id, idPsicologo) {
        const clientIdInput = document.getElementById("editClientId");
        const idPsicologoSelect = document.getElementById("editIdPsicologo");
        const appointmentDateInput = document.getElementById("editAppointmentDate");
        const appointmentTimeInput = document.getElementById("editAppointmentTime");
        const appointmentStatusInput = document.getElementById("editAppointmentStatus");
    
        const row = document.querySelector(`button[data-id='${id}']`).closest('tr');
        const idCliente = row.querySelector('td:nth-child(1)').textContent;
        const fecha = row.querySelector('td:nth-child(3)').textContent;
        const hora = row.querySelector('td:nth-child(4)').textContent;
        const estado = row.querySelector('td:nth-child(5)').textContent;
    
        // Rellenar los campos del formulario con los datos de la cita
        clientIdInput.value = idCliente; // idCliente no editable
        appointmentDateInput.value = fecha;
        appointmentTimeInput.value = hora;
        appointmentStatusInput.value = estado;
    
        // Cargar psicólogos y seleccionar el idPsicologo correspondiente
        fetchPsychologistsForEdit(); // Pasa el idPsicologo desde la respuesta
    
        // Mostrar el modal para editar
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    
        // Esperar a que el valor de idPsicologo se haya seleccionado correctamente
        idPsicologoSelect.addEventListener('change', function() {
            const updatedAppointment = {
                idPsicologo: idPsicologoSelect.value,
                fecha: appointmentDateInput.value,
                hora: appointmentTimeInput.value,
                estado: appointmentStatusInput.value
            };
    
            // Imprimir para depuración
            console.log("Datos a actualizar:", updatedAppointment);
    
            // Llamar a la función para actualizar la cita
            updateAppointment(id, updatedAppointment);
        });
    };*/

    /*window.editAppointment = function(id, idPsicologo) {
        const clientIdInput = document.getElementById("editClientId");
        const idPsicologoSelect = document.getElementById("editIdPsicologo");
        const appointmentDateInput = document.getElementById("editAppointmentDate");
        const appointmentTimeInput = document.getElementById("editAppointmentTime");
        const appointmentStatusInput = document.getElementById("editAppointmentStatus");
    
        const row = document.querySelector(`button[data-id='${id}']`).closest('tr');
        const idCliente = row.querySelector('td:nth-child(1)').textContent;
        const fecha = row.querySelector('td:nth-child(3)').textContent;
        const hora = row.querySelector('td:nth-child(4)').textContent;
        const estado = row.querySelector('td:nth-child(5)').textContent;
    
        // Rellenar los campos del formulario con los datos de la cita
        clientIdInput.value = idCliente; // idCliente no editable
        appointmentDateInput.value = fecha;
        appointmentTimeInput.value = hora;
        appointmentStatusInput.value = estado;
    
        // Cargar psicólogos
        fetchPsychologistsForEdit(idPsicologo);
    
        // Mostrar el modal para editar
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    
        // Cambiar la forma de manejar la actualización de cita: esperar a que se haga clic en "Guardar cambios"
        const saveButton = document.querySelector("#editAppointmentForm button[type='submit']");
        
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();
            
             // Prevenir que el formulario se envíe de manera tradicional
            
            const updatedAppointment = {
                idPsicologo: idPsicologoSelect.value,
                fecha: appointmentDateInput.value,
                hora: appointmentTimeInput.value,
                estado: appointmentStatusInput.value
            };
    
            // Imprimir para depuración
            console.log("Datos a actualizar:", updatedAppointment);
    
            // Llamar a la función para actualizar la cita
            updateAppointment(id, updatedAppointment);
            
        });
    };
    
    // Función para actualizar cita
    function updateAppointment(id, updatedAppointment) {
        console.log("Guardando cita con los siguientes datos:", updatedAppointment);  // Solo para verificar
    
        // Verificar si el idPsicologo no está vacío
        if (!updatedAppointment.idPsicologo || !updatedAppointment.fecha || !updatedAppointment.hora || !updatedAppointment.estado) {
            console.error("Faltan campos para guardar la cita.");
            alert("Por favor, complete todos los campos antes de guardar.");
            return;
        }
    
        // Verificar URL generada para asegurarse de que los parámetros están siendo enviados correctamente
        const url = `http://localhost:8080/citas/${id}?idPsicologo=${updatedAppointment.idPsicologo}&fecha=${updatedAppointment.fecha}&hora=${updatedAppointment.hora}&estado=${updatedAppointment.estado}`;
        console.log("URL de actualización:", url);
    
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAppointment)
        })
        .then(response => {
            if (response.ok) {
                console.log("Cita guardada correctamente");
                fetchAppointments(); // Actualizar la lista de citas
                const modal = new bootstrap.Modal(document.getElementById('editModal'));
                modal.hide(); // Cerrar el modal
            } else {
                console.error('Error al guardar la cita:', response.statusText);
                alert("Error al guardar la cita: " + response.statusText);
            }
        })
        .catch(error => {
            console.error('Error al guardar la cita:', error);
            alert("Hubo un problema al guardar la cita.");
        });
    }*/
    
        window.editAppointment = function(id, idPsicologo) {
            const clientIdInput = document.getElementById("editClientId");
            const idPsicologoSelect = document.getElementById("editIdPsicologo");
            const appointmentDateInput = document.getElementById("editAppointmentDate");
            const appointmentTimeInput = document.getElementById("editAppointmentTime");
            const appointmentStatusInput = document.getElementById("editAppointmentStatus");
        
            const row = document.querySelector(`button[data-id='${id}']`).closest('tr');
            const idCliente = row.querySelector('td:nth-child(1)').textContent;
            const fecha = row.querySelector('td:nth-child(3)').textContent;
            const hora = row.querySelector('td:nth-child(4)').textContent;
            const estado = row.querySelector('td:nth-child(5)').textContent;
        
            // Rellenar los campos del formulario con los datos de la cita
            clientIdInput.value = idCliente; // idCliente no editable
            appointmentDateInput.value = fecha;
            appointmentTimeInput.value = hora;
            appointmentStatusInput.value = estado;
        
            // Cargar psicólogos
            fetchPsychologistsForEdit(idPsicologo);
        
            // Mostrar el modal para editar
            const modal = new bootstrap.Modal(document.getElementById('editModal'));
            modal.show();
        
            // Cambiar la forma de manejar la actualización de cita: esperar a que se haga clic en "Guardar cambios"
            const saveButton = document.querySelector("#editAppointmentForm button[type='submit']");
        
            saveButton.addEventListener('click', function(event) {
                event.preventDefault(); // Prevenir el comportamiento de envío del formulario
        
                const updatedAppointment = {
                    idPsicologo: idPsicologoSelect.value,
                    fecha: appointmentDateInput.value,
                    hora: appointmentTimeInput.value,
                    estado: appointmentStatusInput.value
                };
        
                // Imprimir para depuración
                console.log("Datos a actualizar:", updatedAppointment);
        
                // Llamar a la función para actualizar la cita
                updateAppointment(id, updatedAppointment, modal);
            });
        };
        
        // Función para actualizar cita
        function updateAppointment(id, updatedAppointment, modal) {
            console.log("Guardando cita con los siguientes datos:", updatedAppointment);  // Solo para verificar
        
            // Verificar si el idPsicologo no está vacío
            if (!updatedAppointment.idPsicologo || !updatedAppointment.fecha || !updatedAppointment.hora || !updatedAppointment.estado) {
                console.error("Faltan campos para guardar la cita.");
                alert("Por favor, complete todos los campos antes de guardar.");
                return;
            }
        
            // Verificar URL generada para asegurarse de que los parámetros están siendo enviados correctamente
            const url = `http://localhost:8080/citas/${id}?idPsicologo=${updatedAppointment.idPsicologo}&fecha=${updatedAppointment.fecha}&hora=${updatedAppointment.hora}&estado=${updatedAppointment.estado}`;
            console.log("URL de actualización:", url);
        
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAppointment)
            })
            .then(response => {
                if (response.ok) {
                    console.log("Cita guardada correctamente");
                    fetchAppointments(); // Actualizar la lista de citas
                    modal.hide(); // Cerrar el modal después de guardar
                } else {
                    console.error('Error al guardar la cita:', response.statusText);
                    alert("Error al guardar la cita: " + response.statusText);
                }
            })
            .catch(error => {
                console.error('Error al guardar la cita:', error);
                alert("Hubo un problema al guardar la cita.");
            });
        }
        

    // Función para manejar la eliminación de citas
    function deleteAppointment(idCita) {
        if (confirm("¿Está seguro de que desea eliminar esta cita?")) {
            fetch(`http://localhost:8080/citas/${idCita}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        alert("Cita eliminada correctamente.");
                        fetchAppointments();
                    } else {
                        alert("Error al eliminar la cita.");
                    }
                })
                .catch(error => console.error("Error al eliminar cita:", error));
        }
    }



        // Función para cargar psicólogos y seleccionar el que corresponde
        /*function fetchPsychologistsForEdit(selectedPsicologoId) {
            const psicologoSelect = document.getElementById("editIdPsicologo");
            
            fetch("http://localhost:8080/psicologo")
                .then(response => response.json())
                .then(data => {
                    psicologoSelect.innerHTML = '<option value="">Seleccionar Psicólogo</option>';
                    data.forEach(psicologo => {
                        const option = document.createElement("option");
                        option.value = psicologo.id;
                        option.textContent = `ID: ${psicologo.id} - ${psicologo.nombre}`;
                        psicologoSelect.appendChild(option);
                    });
        
                    // Establecer el psicólogo seleccionado por defecto
                    if (selectedPsicologoId) {
                        psicologoSelect.value = selectedPsicologoId;
                    }
                })
                .catch(error => console.error("Error al cargar psicólogos:", error));
        }*/
        
    // Función para cargar psicólogos
    function fetchPsychologists() {
        const psicologoSelect = document.getElementById("idPsicologo");

        fetch("http://localhost:8080/psicologo")
            .then(response => response.json())
            .then(data => {
                psicologoSelect.innerHTML = '<option value="">Seleccionar Psicólogo</option>';
                data.forEach(psicologo => {
                    const option = document.createElement("option");
                    option.value = psicologo.id;
                    option.textContent = `ID: ${psicologo.id} - ${psicologo.nombre}`;
                    psicologoSelect.appendChild(option);
                });
                
            })
            .catch(error => console.error("Error al cargar psicólogos:", error));
    }
        // Función para cargar psicólogos
       function fetchPsychologistsForEdit(selectedPsicologoId) {
            const psicologoSelect = document.getElementById("editIdPsicologo");

            
            fetch("http://localhost:8080/psicologo")
                .then(response => response.json())
                .then(data => {
                    psicologoSelect.innerHTML = '<option value="">Seleccionar Psicólogo</option>';
                    data.forEach(psicologo => {
                        const option = document.createElement("option");
                        option.value = psicologo.id;
                        option.textContent = `ID: ${psicologo.id} - ${psicologo.nombre}`;
                        psicologoSelect.appendChild(option);
                    });
                    if (selectedPsicologoId) {
                        psicologoSelect.value = selectedPsicologoId;
                    }
                })
                .catch(error => console.error("Error al cargar psicólogos:", error));
        }
        
// Función para cargar clientes
function fetchClients() {
    const clienteSelect = document.getElementById("idCliente");

    fetch("http://localhost:8080/usuarios/clientes")
        .then(response => response.json())
        .then(data => {
            clienteSelect.innerHTML = '<option value="">Seleccionar Cliente</option>';
            data.forEach(usuario => {
                if (usuario.rol.toLowerCase() === "cliente") {
                    const option = document.createElement("option");
                    option.value = usuario.idUsuario;
                    option.textContent =`Cliente: ${usuario.nombre} - ${usuario.correo}`;
                    clienteSelect.appendChild(option);
                }
            });
        })
        .catch(error => console.error("Error al cargar clientes:", error));
}
    
    // Cargar datos iniciales
    fetchAppointments();
    fetchPsychologists();
    fetchClients();
    fetchPsychologistsForEdit();
});

