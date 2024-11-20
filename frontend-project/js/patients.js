document.addEventListener('DOMContentLoaded', function() {
    const patientsTableBody = document.getElementById('patientsTableBody');
    const editPatientForm = document.getElementById('editPatientForm');
    const patientNameInput = document.getElementById('patientName');
    const patientEmailInput = document.getElementById('patientEmail');
    const patientPhoneInput = document.getElementById('patientPhone');
    const editModal = document.getElementById('editModal');
    let patients = [];

    // Obtener pacientes
    function fetchPatients() {
        fetch('http://localhost:8080/usuarios/clientes')
            .then(response => response.json())
            .then(data => {
                patients = data;
                renderPatients();
            })
            .catch(error => console.error('Error fetching patients:', error));
    }

    // Renderizar pacientes en la tabla
    function renderPatients() {
        patientsTableBody.innerHTML = '';
        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.idUsuario}</td>
                <td>${patient.nombre}</td>
                <td>${patient.correo}</td>
                <td>${patient.telefono}</td>
                <td>${patient.edad}</td>
                <td>${patient.sexo}</td>
                <td>
                    <button class="btn btn-primary btn-edit" onclick="editPatient(${patient.idUsuario})">Editar</button>
                    <button class="btn btn-danger" onclick="deletePatient(${patient.idUsuario})">Eliminar</button>
                </td>
            `;
            patientsTableBody.appendChild(row);
        });
    }

    // Editar paciente
    window.editPatient = function(id) {
        const patient = patients.find(p => p.idUsuario === id);
        if (patient) {
            // Cargar los valores actuales del paciente en los campos del formulario
            patientNameInput.value = patient.nombre;
            patientEmailInput.value = patient.correo;
            patientPhoneInput.value = patient.telefono;

            // Mostrar el modal
            $(editModal).modal('show');

            // Hacer que el botón de guardar actualice los datos
            const saveButton = document.getElementById('savePatientBtn');
            saveButton.onclick = function() {
                updatePatient(id); // Llamar a la función para actualizar al paciente
            };
        }
    };

    // Actualizar paciente
    function updatePatient(id) {
        const updatedPatient = {
            correo: patientEmailInput.value,
            telefono: patientPhoneInput.value
            // No se incluyen dirección ni estado civil
        };

        fetch(`http://localhost:8080/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPatient)
        })
        .then(response => {
            if (response.ok) {
                fetchPatients(); // Recargar la lista de pacientes después de la actualización
                $(editModal).modal('hide'); // Cerrar el modal
            } else {
                console.error('Error updating patient:', response.statusText);
            }
        })
        .catch(error => console.error('Error updating patient:', error));
    }

    // Eliminar paciente
    window.deletePatient = function(id) {
        fetch(`http://localhost:8080/usuarios/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchPatients(); // Recargar la lista de pacientes después de eliminar
            } else {
                console.error('Error deleting patient:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting patient:', error));
    };

    // Cargar pacientes al inicio
    fetchPatients();
});
