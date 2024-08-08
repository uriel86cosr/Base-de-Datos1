let editRow = null;

window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem('equiposData')) || [];
    const table = document.getElementById('equiposTable').getElementsByTagName('tbody')[0];
    
    savedData.forEach(data => {
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = data.numeroPC;
        newRow.insertCell(1).textContent = data.nombreEquipo;
        newRow.insertCell(2).textContent = data.nombreUsuario;
        newRow.insertCell(3).textContent = data.contrasena;

        const actionsCell = newRow.insertCell(4);
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        updateButton.className = 'button update';
        updateButton.onclick = function() { startUpdateRow(updateButton); };
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'button delete';
        deleteButton.onclick = function() { deleteRow(deleteButton); };
        actionsCell.appendChild(deleteButton);
    });
}

function addRow() {
    const numeroPC = document.getElementById('numeroPC').value;
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (!numeroPC || !nombreEquipo || !nombreUsuario || !contrasena) {
        showErrorModal();
        return;
    }

    const savedData = JSON.parse(localStorage.getItem('equiposData')) || [];
    const existingRow = savedData.find(row => row.numeroPC === numeroPC);

    if (editRow) {
        const rowIndex = Array.from(editRow.parentNode.children).indexOf(editRow);
        savedData[rowIndex] = { numeroPC, nombreEquipo, nombreUsuario, contrasena };
        localStorage.setItem('equiposData', JSON.stringify(savedData));
        editRow = null;
    } else {
        if (existingRow) {
            showErrorModal();
            return;
        }
        const table = document.getElementById('equiposTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = numeroPC;
        newRow.insertCell(1).textContent = nombreEquipo;
        newRow.insertCell(2).textContent = nombreUsuario;
        newRow.insertCell(3).textContent = contrasena;

        const actionsCell = newRow.insertCell(4);
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        updateButton.className = 'button update';
        updateButton.onclick = function() { startUpdateRow(updateButton); };
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'button delete';
        deleteButton.onclick = function() { deleteRow(deleteButton); };
        actionsCell.appendChild(deleteButton);

        savedData.push({ numeroPC, nombreEquipo, nombreUsuario, contrasena });
        localStorage.setItem('equiposData', JSON.stringify(savedData));
    }

    document.getElementById('addForm').reset();
    showSuccessModal();
}

function startUpdateRow(button) {
    editRow = button.closest('tr');
    const cells = editRow.getElementsByTagName('td');

    document.getElementById('numeroPC').value = cells[0].textContent;
    document.getElementById('nombreEquipo').value = cells[1].textContent;
    document.getElementById('nombreUsuario').value = cells[2].textContent;
    document.getElementById('contrasena').value = cells[3].textContent;
}

function deleteRow(button) {
    const row = button.closest('tr');
    const numeroPC = row.cells[0].textContent;
    
    if (confirm('¿Estás seguro de que deseas eliminar esta fila?')) {
        row.remove();
        let savedData = JSON.parse(localStorage.getItem('equiposData')) || [];
        savedData = savedData.filter(data => data.numeroPC !== numeroPC);
        localStorage.setItem('equiposData', JSON.stringify(savedData));
        showDeletedModal();
    }
}

function showSuccessModal() {
    document.getElementById('successModal').style.display = 'block';
}

function showErrorModal() {
    document.getElementById('errorModal').style.display = 'block';
}

function showDeletedModal() {
    document.getElementById('deletedModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    document.getElementById('errorModal').style.display = 'none';
    document.getElementById('deletedModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('successModal') || 
        event.target == document.getElementById('errorModal') || 
        event.target == document.getElementById('deletedModal')) {
        closeModal();
    }
}
