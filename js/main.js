import Timer from "./Timer.js";
import Client from "./Client.js";

const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");
const storage = localStorage;

function getAllStorage() {
    let values = [],
        keys = Object.keys(storage),
        i = keys.length;

    while (i--) {
        values.push(JSON.parse(storage.getItem(keys[i])));
    }

    return values;
}

window.addEventListener("DOMContentLoaded", (e) => {
    const data = getAllStorage();

    data.forEach((obj) => {
        const client = new Client(
            obj.channel,
            obj.ign,
            obj.map,
            obj.totalTime,
            obj.paidStatus,
            tableBody
        );
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let paidStatus;
    if (form.paid.checked) {
        paidStatus = "Yes";
    } else {
        paidStatus = "No";
    }
    const client = new Client(
        form.channel.value,
        form.ign.value,
        form.map.value,
        form.hours.value,
        paidStatus,
        tableBody
    );

    localStorage.setItem(form.ign.value, JSON.stringify(client));
    clearInputs(form);
});

function clearInputs(form) {
    for (let input of form.elements) {
        input.value = "";
    }
}
