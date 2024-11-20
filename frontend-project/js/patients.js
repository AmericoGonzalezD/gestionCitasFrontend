document.addEventListener('DOMContentLoaded', function() {
    const patientsTableBody = document.getElementById('patientsTableBody');
    const editPatientForm = document.getElementById('editPatientForm');
    const patientNameInput = document.getElementById('patientName');
    const patientEmailInput = document.getElementById('patientEmail');
    const patientPhoneInput = document.getElementById('patientPhone');
    const patientAddressInput = document.getElementById('patientAddress');
    const patientCivilStatusInput = document.getElementById('patientCivilStatus');
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
                    <button class="btn btn-warning" onclick="editPatient(${patient.idUsuario})">Edit</button>
                    <button class="btn btn-danger" onclick="deletePatient(${patient.idUsuario})">Delete</button>
                </td>
            `;
            patientsTableBody.appendChild(row);
        });
    }

    // Editar paciente
    window.editPatient = function(id) {
        const patient = patients.find(p => p.idUsuario === id);
        patientNameInput.value = patient.nombre;
        patientEmailInput.value = patient.correo;
        patientPhoneInput.value = patient.telefono;
        patientAddressInput.value = patient.direccion;
        patientCivilStatusInput.value = patient.estadoCivil;

        $(editModal).modal('show');
        editPatientForm.onsubmit = function(event) {
            event.preventDefault();
            updatePatient(id);
        };
    };

    // Actualizar paciente
    function updatePatient(id) {
        const updatedPatient = {
            correo: patientEmailInput.value,
            telefono: patientPhoneInput.value,
            direccion: patientAddressInput.value,
            estadoCivil: patientCivilStatusInput.value
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
                fetchPatients();
                $(editModal).modal('hide');
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
            console.log('Response Status:', response.status); // Verifica el código de estado
            if (response.ok) {
                fetchPatients();  // Recarga la lista de pacientes
            } else {
                console.error('Error deleting patient:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting patient:', error));
    };
    
    

    // Cargar pacientes al inicio
    fetchPatients();
});
