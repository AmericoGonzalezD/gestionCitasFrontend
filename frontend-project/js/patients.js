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
    const createUserBtn = document.getElementById("createUserBtn");

    createUserBtn.addEventListener("click", function () {
        // Obtener los datos del formulario
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const edad = document.getElementById("edad").value;
        const sexo = document.getElementById("sexo").value;
        const password = document.getElementById("password").value;
        const rol = document.getElementById("rol").value;
        const estadoCivil = document.getElementById("estadoCivil").value;
        const direccion = document.getElementById("direccion").value;

        // Validar que todos los campos estén completos
        if (!nombre || !correo || !telefono || !edad || !sexo || !password || !rol || !estadoCivil || !direccion) {
            alert("Please fill in all fields.");
            return;
        }

        // Crear el cuerpo de la solicitud
        const userData = {
            nombre,
            correo,
            telefono,
            edad,
            sexo,
            password,
            rol
        };

        // Llamada a la API para crear el usuario
        fetch(`http://localhost:8080/api/usuario?estadoCivil=${estadoCivil}&direccion=${direccion}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {
                alert("User created successfully!");
                fetchPatients();
                $('#createUserModal').modal('hide'); // Cerrar el modal
                 // Actualizar la tabla con los nuevos datos
            } else if (response.status === 409) {
                return response.json().then(errorData => {
                    alert(errorData.error); // Muestra el mensaje de error personalizado
                });
            } else {
                alert("Error creating user.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error creating user.");
        });
    });
    

    // Cargar pacientes al inicio
    fetchPatients();
});
