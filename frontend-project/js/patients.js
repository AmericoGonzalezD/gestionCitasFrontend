document.addEventListener('DOMContentLoaded', function() {
    const patientsTableBody = document.getElementById('patientsTableBody');
    const editPatientForm = document.getElementById('editPatientForm');
    const patientNameInput = document.getElementById('patientName');
    const patientEmailInput = document.getElementById('patientEmail');
    const patientPhoneInput = document.getElementById('patientPhone');
    const editModal = document.getElementById('editModal');
    const createModal = document.getElementById('createModal');
    const newPatientNameInput = document.getElementById('newPatientName');
    const newPatientEmailInput = document.getElementById('newPatientEmail');
    const newPatientPhoneInput = document.getElementById('newPatientPhone');
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

    // Crear paciente
    /*window.createPatient = function() {
        const newPatient = {
            nombre: newPatientNameInput.value,
            correo: newPatientEmailInput.value,
            telefono: newPatientPhoneInput.value
        };

        // Validación del teléfono
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(newPatient.telefono)) {
            alert('El número de teléfono debe tener exactamente 10 dígitos.');
            return;
        }

        fetch('http://localhost:8080/usuarios/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatient)
        })
        .then(response => {
            if (response.ok) {
                fetchPatients(); // Recargar la lista de pacientes después de crear uno
                $(createModal).modal('hide'); // Cerrar el modal
            } else {
                console.error('Error creating patient:', response.statusText);
            }
        })
        .catch(error => console.error('Error creating patient:', error));
    };*/
    // Crear paciente
    window.createPatient = function() {
        const newPatient = {
            nombre: newPatientNameInput.value,
            correo: newPatientEmailInput.value,
            telefono: newPatientPhoneInput.value
        };

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(patientPhoneInput.value)) {
            alert('El número de teléfono debe tener exactamente 10 dígitos.');
            return;
        }

        fetch('http://localhost:8080/usuarios/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatient)
        })
        .then(response => {
            if (response.ok) {
                fetchPatients(); // Recargar la lista de pacientes después de crear uno
                $(createModal).modal('hide'); // Cerrar el modal
            } else {
                console.error('Error creating patient:', response.statusText);
            }
        })
        .catch(error => console.error('Error creating patient:', error));
    };

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
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(patientPhoneInput.value)) {
                alert('El número de teléfono debe tener exactamente 10 dígitos.');
                return;
            }
            console.log(id);
            updatePatient(id);// Llamar a la función para actualizar al paciente
        };
    }
};

     // Actualizar paciente
     function updatePatient(id) {
        const updatedPatient = {
            correo: patientEmailInput.value,
            telefono: patientPhoneInput.value
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
            alert("Por favor llene todos los campos.");
            return;
        }
                // Validar que el nombre y estado civil solo contengan texto
                const textRegex = /^[a-zA-Z\s]+$/;
                if (!textRegex.test(nombre)) {
                    alert('El nombre solo debe contener letras.');
                    return;
                }
                if (!textRegex.test(estadoCivil)) {
                    alert('El estado civil solo debe contener letras.');
                    return;
                }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(telefono)) {
            alert('El número de teléfono debe tener exactamente 10 dígitos.');
            return;
        }
        // Validar que el estado civil sea uno de los valores permitidos
        const validEstadoCivil = ['CASADO', 'SOLTERO', 'DIVORCIADO', 'VIUDO'];
        if (!validEstadoCivil.includes(estadoCivil.toUpperCase())) {
            alert('El estado civil debe ser uno de los siguientes: CASADO, SOLTERO, DIVORCIADO, VIUDO.');
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
        fetch(`http://localhost:8080/usuarios/editar?estadoCivil=${estadoCivil}&direccion=${direccion}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {
                alert("Usuario creado de manera exitosa.");
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
            alert("Error al crear usuario. Verifique los datos e intente de nuevo.");
        });
    });
    

    // Cargar pacientes al inicio
    fetchPatients();
});