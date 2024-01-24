const BASE_API = "http://localhost:3000/users";
let allData = [];


// Get all data

async function getAllData(url) {
    const response = await fetch(url);
    const data = await response.json();

    allData = data;

    fillTable(data);
}

function fillTable(data) {

    data.map((user, ind) => {

        // fill table
        const tableBody = document.querySelector("#tableBody");
        tableBody.innerHTML +=
            `
            <td>${ind + 1}.</td>
            <td class="userName">${user.name}</td>
            <td class="userSurname">${user.surname}</td>
            <td class="userPhone">${user.phone}</td>
            <td class="userMail">${user.mail}</td>
            <td>
            <button class="editBtn" id=${user.id} onClick={editRow(id)}>
                <img src="./images/pencil.svg" alt="Edit icon" />
            </button>
            <button class="deleteBtn" id=${user.id} onClick={deleteRow(id)}>
                <img src="./images/trash.svg" alt="Trash icon" />
            </button>
            </td>
        `;

        // fill mobile cards
        const cardsBox = document.querySelector("#cardsBox");
        cardsBox.innerHTML +=
            `
            <div class="card">
                <p class="number">${ind + 1} .</p>
                <div class="details">
                <div class="cardRow">
                    <span class="key">Name:</span>
                    <span class="value">${user.name}</span>
                </div>
                <div class="cardRow">
                    <span class="key">Surname:</span>
                    <span class="value">${user.surname}</span>
                </div>
                <div class="cardRow">
                    <span class="key">Phone:</span>
                    <span class="value">${user.phone}</span>
                </div>
                <div class="cardRow">
                    <span class="key">Mail:</span>
                    <span class="value">${user.mail}</span>
                </div>
                </div>
                <div class="actions">
                <button class="editBtn" id=${user.id} onClick={editRow(id)}>Edit</button>
                <button class="deleteBtn" id=${user.id} onClick={deleteRow(id)}>Delete</button>
                </div>
            </div>
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


const container = document.querySelector("#container");
// Delete data

// const deleteRow = (id) => {
//     let singleData = allData.find(data => data.id === id);

//     const deleteModal = document.createElement("div");
//     deleteModal.classList.add("active");

//     const modalRow = document.createElement("p");
//     modalRow.classList.add("modalRow");

//     for (const [key, value] of Object.entries(singleData)) {
//         modalRow.value = value;
//         deleteModal.innerHTML += modalRow;
//     }
//     container.appendChild("deleteModal");

// }

// fetch(`${BASE_API}/${id}`, { method: "DELETE" });


// Update data

// function editRow(id) {
//     let singleData = allData.find(data => data.id === id);
//     console.log(singleData);

//     const editModal = document.createElement("div");
//     editModal.classList.add("editModal", "active");
//     const modalRow = document.createElement("p");
//     modalRow.classList.add("modalRow");

//     for (const [key, value] of Object.entries(singleData)) {

//         modalRow.innerText = value;
//         // editModal.innerHTML += modalRow;
//     }


//     editModal.appendChild(modalRow);
//     container.appendChild(editModal);
// }