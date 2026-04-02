let users = JSON.parse(localStorage.getItem("users")) || [];

const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

function renderUsers() {
    userList.innerHTML = "";

    users.forEach((user, index) => {
        userList.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn-edit" onclick="editUser(${index})">Editar</button>
                    <button class="btn-delete" onclick="deleteUser(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
// FEATURE: crear usuario
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("userId").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (id === "") {
        users.push({ name, email });
    } else {
        users[id] = { name, email };
    }

    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
    document.getElementById("userId").value = "";
    renderUsers();

}); // ✅ ESTE ERA EL QUE FALTABA

function editUser(index) {
    document.getElementById("userId").value = index;
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
}

function deleteUser(index) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
}

renderUsers();