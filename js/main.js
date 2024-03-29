const BASE_API = "http://localhost:3000/users";
const container = document.querySelector("#container");

let allData = [];
let globalId;

let startNumber = 0;
let endNumber = 10;


// Get All Data (READ)
async function getAllData(url) {
    const response = await fetch(url);
    const data = await response.json();

    allData = data;
    renderData();

    // Pagination Buttons
    if (allData.length > 9) {
        document.querySelector(".paginationBox").classList.add("active");
    }
}


// Search function
const searchInp = document.querySelector("#searchInp");

searchInp.addEventListener("keyup", async () => {

    const response = await fetch(`${BASE_API}?name=${searchInp.value.toLowerCase()}`);
    const data = await response.json();

    allData = data;
    renderData();
});


// Pagination
document.querySelector("#beforeBtn").addEventListener("click", () => {
    startNumber = startNumber - 10;
    endNumber = endNumber - 10;

    renderData();
});

document.querySelector("#afterBtn").addEventListener("click", () => {
    startNumber = startNumber + 10;
    endNumber = endNumber + 10;

    renderData();
});


// Render Data
function renderData() {

    const tableBody = document.querySelector("#tableBody");
    const cardsBox = document.querySelector("#cardsBox");
    tableBody.innerHTML = "";
    cardsBox.innerHTML = "";


    for (let i = startNumber; i < endNumber; i++) {

        // fill table
        tableBody.innerHTML +=
            `
                <td>${i + 1}.</td>
                <td class="userName">${allData[i].name}</td>
                <td class="userSurname">${allData[i].surname}</td>
                <td class="userPhone">${allData[i].phone}</td>
                <td class="userMail">${allData[i].mail}</td>
                <td>
                <button class="editBtn" id=${allData[i].id} onClick={editRow(id)}>
                    <img src="./images/pencil.svg" alt="Edit icon" />
                </button>
                <button class="deleteBtn" id=${allData[i].id} onClick={deleteRow(id)}>
                    <img src="./images/trash.svg" alt="Trash icon" />
                </button>
                </td>
            `;

        // fill cards
        cardsBox.innerHTML +=
            `
            <div class="card">
                <p class="number">${i + 1} .</p>
                <div class="details">
                <div class="cardRow">
                    <span class="key">Name:</span>
                    <span class="value">${allData[i].name}</span>
                </div>
                <div class="cardRow">
                    <span class="key">Surname:</span>
                    <span class="value">${allData[i].surname}</span>
                </div>
                <div class="cardRow">
                    <span class="key">Phone:</span>
                    <span class="value">${allData[i].phone}</span>
                </div>
                <div class="cardRow">
                    <span class="key">Mail:</span>
                    <span class="value">${allData[i].mail}</span>
                </div>
                </div>
                <div class="actions">
                <button class="editBtn" id=${allData[i].id} onClick={editRow(id)}>Edit</button>
                <button class="deleteBtn" id=${allData[i].id} onClick={deleteRow(id)}>Delete</button>
                </div>
            </div>
        `;
    }
}

getAllData(BASE_API);


// POST New Data (CREATE)
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

    // Create form validation
    let nameError;
    let surnameError;
    let phoneError;
    let mailError;

    valueName = valueName.trim();
    valueSurname = valueSurname.trim();
    valuePhone = valuePhone.trim();
    valueMail = valueMail.trim();

    if (valueName.length === 0) {
        nameError = true;
        document.querySelector(".errorMsgName").classList.add("active");
    } else {
        nameError = false;
        document.querySelector(".errorMsgName").classList.remove("active");
    }

    if (valueSurname.length === 0) {
        surnameError = true;
        document.querySelector(".errorMsgSurname").classList.add("active");
    } else {
        surnameError = false;
        document.querySelector(".errorMsgSurname").classList.remove("active");
    }

    const phoneRegEx = /[A-Za-z]/;
    if ((valuePhone.length === 0) || (phoneRegEx.test(valuePhone))) {
        phoneError = true;
        document.querySelector(".errorMsgPhone").classList.add("active");
    } else {
        phoneError = false;
        document.querySelector(".errorMsgPhone").classList.remove("active");
    }

    const mailRegEx = /@/;
    if ((valueMail.length === 0) || !(mailRegEx.test(valueMail))) {
        mailError = true;
        document.querySelector(".errorMsgMail").classList.add("active");
    } else {
        mailError = false;
        document.querySelector(".errorMsgMail").classList.remove("active");
    }

    if (nameError === false && surnameError === false && phoneError === false && mailError === false) {

        body = {
            name: valueName.toLowerCase(),
            surname: valueSurname.toLowerCase(),
            phone: valuePhone.toLowerCase(),
            mail: valueMail.toLowerCase(),
        }

        await fetch(BASE_API, {
            method: "POST",
            body: JSON.stringify(body),
        })
            .then(() => alert("User created successfully!"))
            .catch(err => console.log(err));
    }

});


// Remove Data (DELETE)
const deleteRow = (id) => {
    globalId = id;
    let singleData = allData.find(data => data.id === id);

    const deleteModal = document.createElement("div");
    deleteModal.classList.add("deleteModal", "active");

    const dataArray = Object.entries(singleData);
    for (let i = 0; i < dataArray.length - 1; i++) {

        const modalRow = document.createElement("div");
        modalRow.classList.add("modalRow");

        modalRow.innerText = dataArray[i][1];
        deleteModal.appendChild(modalRow);
    }

    container.appendChild(deleteModal);

    const modalRow = document.createElement("div");
    modalRow.classList.add("modalRow");
    modalRow.innerHTML =
        `
        <div class="question">Are you sure to delete this data?</div>
        <div class="actions">
            <button onClick="deleteConfirm()">Yes</button>
            <button onClick="deactiveModal()">Cancel</button>
        </div>
    `;
    deleteModal.appendChild(modalRow);
}

async function deleteConfirm() {

    if (globalId) {
        await fetch(`${BASE_API}/${globalId}`, { method: "DELETE" })
            .then(() => alert("Data was deleted!!"))
            .catch(error => console.warn(error));
    } else {
        console.warn("Id is not defined.");
    }
};

function deactiveModal() {
    deleteModal = document.querySelector(".deleteModal");

    container.removeChild(deleteModal);
}


// Edit Data (UPDATE)
function editRow(id) {
    let singleData = allData.find(data => data.id === id);

    const editModal = document.querySelector("#editModal");
    editModal.classList.add("active");

    const editInputName = document.querySelector("#editInputName");
    const editInputSurname = document.querySelector("#editInputSurname");
    const editInputPhone = document.querySelector("#editInputPhone");
    const editInputMail = document.querySelector("#editInputMail");

    let valueEditedName = singleData.name;
    let valueEditedSurname = singleData.surname;
    let valueEditedPhone = singleData.phone;
    let valueEditedMail = singleData.mail;

    editInputName.value = singleData.name;
    editInputSurname.value = singleData.surname;
    editInputPhone.value = singleData.phone;
    editInputMail.value = singleData.mail;

    editInputName.addEventListener("change", (e) => valueEditedName = e.target.value);
    editInputSurname.addEventListener("change", (e) => valueEditedSurname = e.target.value);
    editInputPhone.addEventListener("change", (e) => valueEditedPhone = e.target.value);
    editInputMail.addEventListener("change", (e) => valueEditedMail = e.target.value);

    document.querySelector("#cancelBtn").addEventListener("click", (e) => {
        e.preventDefault();
        editModal.classList.remove("active");
    });

    document.querySelector("#updateBtn").addEventListener("click", async (e) => {
        e.preventDefault();

        const body = {
            name: valueEditedName,
            surname: valueEditedSurname,
            phone: valueEditedPhone,
            mail: valueEditedMail,
        }

        await fetch(`${BASE_API}/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
            })
            .then(response => alert("Data succesfully updated!"))
            .catch(error => console.warn(error));

    });

}