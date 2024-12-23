/*document.addEventListener('DOMContentLoaded', function() {
    const specialtiesTableBody = document.getElementById('specialtiesTableBody');
    const specialtyForm = document.getElementById('specialtyForm');
    const specialtyNameInput = document.getElementById('specialtyName');
    const addSpecialtyForm = document.getElementById('addSpecialtyForm');
    const addSpecialtyNameInput = document.getElementById('addSpecialtyName');
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    let specialties = [];

    // Obtener las especialidades
    function fetchSpecialties() {
        fetch('http://localhost:8080/especialidad')
            .then(response => response.json())
            .then(data => {
                specialties = data;
                renderSpecialties();
            })
            .catch(error => console.error('Error fetching specialties:', error));
    }

    // Renderizar especialidades en la tabla
    function renderSpecialties() {
        specialtiesTableBody.innerHTML = '';
        specialties.forEach(specialty => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${specialty.idEspecialidad}</td>
                <td>${specialty.nombre}</td>
                <td>
                    <button class="btn btn-primary" onclick="editSpecialty(${specialty.idEspecialidad})">Editar</button>
                    <button class="btn btn-danger" onclick="deletePatient(${specialty.idEspecialidad})">Eliminar</button>
                </td>
            `;
            specialtiesTableBody.appendChild(row);
        });
    }

    // Mostrar formulario de edición con los datos de la especialidad seleccionada
    window.editSpecialty = function(id) {
        const specialty = specialties.find(s => s.idEspecialidad === id);
        specialtyNameInput.value = specialty.nombre;
        
        // Mostrar el modal para editar
        $(editModal).modal('show');
        
        specialtyForm.onsubmit = function(event) {
            event.preventDefault();
            updateSpecialty(id);
        };
    };

    // Actualizar especialidad mediante PUT
    function updateSpecialty(id) {
        const updatedName = specialtyNameInput.value;
        fetch(`http://localhost:8080/especialidad/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: updatedName })
        })
        .then(response => {
            if (response.ok) {
                fetchSpecialties(); // Refrescar la lista de especialidades
                $(editModal).modal('hide'); // Cerrar el modal
                specialtyForm.reset();
            } else {
                console.error('Error updating specialty:', response.statusText);
            }
        })
        .catch(error => console.error('Error updating specialty:', error));
    }

    // Agregar nueva especialidad mediante POST
    addSpecialtyForm.onsubmit = function(event) {
        event.preventDefault();
        const newName = addSpecialtyNameInput.value;
        fetch('http://localhost:8080/especialidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: newName })
        })
        .then(response => {
            if (response.ok) {
                fetchSpecialties(); // Refrescar la lista de especialidades
                $(addModal).modal('hide'); // Cerrar el modal
                addSpecialtyForm.reset();
            } else {
                console.error('Error adding specialty:', response.statusText);
            }
        })
        .catch(error => console.error('Error adding specialty:', error));
    };
    // Eliminar especialidad mediante DELETE
    window.deletePatient = function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
            fetch(`http://localhost:8080/especialidad/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    fetchSpecialties(); // Refrescar la lista de especialidades
                    alert('Especialidad eliminada exitosamente.');
                } else {
                    console.error('Error deleting specialty:', response.statusText);
                    alert('No se pudo eliminar la especialidad. Intente nuevamente.');
                }
            })
            .catch(error => {
                console.error('Error deleting specialty:', error);
                alert('Ocurrió un error al intentar eliminar la especialidad.');
            });
        }
    };

    // Cargar las especialidades al iniciar
    fetchSpecialties();
});*/


document.addEventListener('DOMContentLoaded', function () {
    const specialtiesTableBody = document.getElementById('specialtiesTableBody');
    const specialtyForm = document.getElementById('specialtyForm');
    const specialtyNameInput = document.getElementById('specialtyName');
    const addSpecialtyForm = document.getElementById('addSpecialtyForm');
    const addSpecialtyNameInput = document.getElementById('addSpecialtyName');
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    const assignModal = document.getElementById('assignModal');
    const psicologoSelect = document.getElementById('idPsicologo');
    const assignForm = document.getElementById('assignForm');
    let specialties = [];

    // Obtener las especialidades
    function fetchSpecialties() {
        fetch('http://localhost:8080/especialidad')
            .then(response => response.json())
            .then(data => {
                specialties = data;
                renderSpecialties();
            })
            .catch(error => console.error('Error fetching specialties:', error));
    }
    // Agregar nueva especialidad mediante POST
    addSpecialtyForm.onsubmit = function(event) {
        event.preventDefault();
        const newName = addSpecialtyNameInput.value;
        fetch('http://localhost:8080/especialidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: newName })
        })
        .then(response => {
            if (response.ok) {
                fetchSpecialties(); // Refrescar la lista de especialidades
                $(addModal).modal('hide'); // Cerrar el modal
                addSpecialtyForm.reset();
            } else {
                console.error('Error adding specialty:', response.statusText);
            }
        })
        .catch(error => console.error('Error adding specialty:', error));
    };

    // Renderizar especialidades en la tabla
    function renderSpecialties() {
        specialtiesTableBody.innerHTML = '';
        specialties.forEach(specialty => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${specialty.idEspecialidad}</td>
                <td>${specialty.nombre}</td>
                <td>
                    <button class="btn btn-primary" onclick="editSpecialty(${specialty.idEspecialidad})">Editar</button>
                    <button class="btn btn-danger" onclick="deletePatient(${specialty.idEspecialidad})">Eliminar</button>
                    <button class="btn btn-secondary" onclick="openAssignModal(${specialty.idEspecialidad})">Asignar</button>
                </td>
            `;
            specialtiesTableBody.appendChild(row);
        });
    }

    // Mostrar formulario de edición con los datos de la especialidad seleccionada
    window.editSpecialty = function (id) {
        const specialty = specialties.find(s => s.idEspecialidad === id);
        specialtyNameInput.value = specialty.nombre;

        // Mostrar el modal para editar
        $(editModal).modal('show');

        specialtyForm.onsubmit = function (event) {
            event.preventDefault();
            updateSpecialty(id);
        };
    };

    // Actualizar especialidad mediante PUT
    function updateSpecialty(id) {
        const updatedName = specialtyNameInput.value;
        fetch(`http://localhost:8080/especialidad/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: updatedName }),
        })
            .then(response => {
                if (response.ok) {
                    fetchSpecialties(); // Refrescar la lista de especialidades
                    $(editModal).modal('hide'); // Cerrar el modal
                    specialtyForm.reset();
                } else {
                    console.error('Error updating specialty:', response.statusText);
                }
            })
            .catch(error => console.error('Error updating specialty:', error));
    }

    // Eliminar especialidad mediante DELETE
    window.deletePatient = function (id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
            fetch(`http://localhost:8080/especialidad/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        fetchSpecialties(); // Refrescar la lista de especialidades
                        alert('Especialidad eliminada exitosamente.');
                    } else {
                        console.error('Error deleting specialty:', response.statusText);
                        alert('No se pudo eliminar la especialidad. Intenta nuevamente.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting specialty:', error);
                    alert('Ocurrió un error al intentar eliminar la especialidad.');
                });
        }
    };

    // Abrir modal para asignar una especialidad a un psicólogo
    window.openAssignModal = function (idEspecialidad) {
        fetchPsychologists(); // Cargar psicólogos en el select
        $(assignModal).modal('show');

        assignForm.onsubmit = function (event) {
            event.preventDefault();
            const selectedPsychologistId = psicologoSelect.value;
            if (!selectedPsychologistId) {
                alert('Por favor selecciona un psicólogo.');
                return;
            }

            assignSpecialtyToPsychologist(selectedPsychologistId, idEspecialidad);
        };
    };

    // Asignar especialidad a psicólogo mediante POST
    function assignSpecialtyToPsychologist(idPsicologo, idEspecialidad) {
        fetch(`http://localhost:8080/psicologo/${idPsicologo}/especialidad/${idEspecialidad}`, {
            method: 'POST',
        })
            .then(response => {
                if (response.ok) {
                    alert('Especialidad asignada exitosamente.');
                    $(assignModal).modal('hide'); // Cerrar el modal
                } else {
                    console.error('Error assigning specialty:', response.statusText);
                    alert('No se pudo asignar la especialidad. Intenta nuevamente.');
                }
            })
            .catch(error => {
                console.error('Error assigning specialty:', error);
                alert('Ocurrió un error al intentar asignar la especialidad.');
            });
    }

    // Función para cargar los psicólogos
    function fetchPsychologists() {
        fetch('http://localhost:8080/psicologo')
            .then(response => response.json())
            .then(data => {
                psicologoSelect.innerHTML = '<option value="">Seleccionar Psicólogo</option>';

                data.forEach(psicologo => {
                    const option = document.createElement('option');
                    option.value = psicologo.id;
                    option.textContent = `ID: ${psicologo.id} - ${psicologo.nombre}`;
                    psicologoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar psicólogos:', error));
    }

    // Cargar las especialidades al iniciar
    fetchSpecialties();
});

