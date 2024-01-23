const BASE_API = "http://localhost:3000/users";


// Get all data

async function getAllData(url) {
    const response = await fetch(url);
    const data = await response.json();

    fillTable(data);
}

function fillTable(data) {
    const tableBody = document.querySelector("#tableBody");

    data.map((user, ind) => {
        tableBody.innerHTML +=
            `
            <td>${ind + 1}.</td>
            <td class="userName">${user.name}</td>
            <td class="userSurname">${user.surname}</td>
            <td class="userPhone">${user.phone}</td>
            <td class="userMail">${user.mail}</td>
            <td>
            <button class="editBtn">
                <img src="./images/pencil.svg" alt="Edit icon" />
            </button>
            <button class="deleteBtn" id=${user.id} onClick={deleteRow(id)}>
                <img src="./images/trash.svg" alt="Trash icon" />
            </button>
            </td>
        `;
    });
}

getAllData(BASE_API);



// POST new data

let valueName = "";
let valueSurname = "";
let valuePhone = "";
let valueMail = "";

document.querySelector("#inputName").addEventListener("change", (e) => valueName = e.target.value);
document.querySelector("#inputSurname").addEventListener("change", (e) => valueSurname = e.target.value);
document.querySelector("#inputPhone").addEventListener("change", (e) => valuePhone = e.target.value);
document.querySelector("#inputMail").addEventListener("change", (e) => valueMail = e.target.value);

document.querySelector("#contactCreateForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    body = {
        name: valueName,
        surname: valueSurname,
        phone: valuePhone,
        mail: valueMail,
    }

    const response = await fetch(BASE_API,
        {
            method: "POST",
            body: JSON.stringify(body),
        });
});


// Delete data

const deleteModal = document.querySelector("#deleteModal");

const deleteRow = (id) => {
    deleteModal.classList.add("active");
}

    // fetch(`${BASE_API}/${id}`, { method: "DELETE" });