async function getAllData(url) {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

const api = "http://localhost:3000/products";

getAllData(api);