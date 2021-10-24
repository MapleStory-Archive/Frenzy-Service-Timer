import Timer from "./Timer.js";
import Client from "./Client.js";

const tableBody = document.querySelector("tbody");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let paidStatus;
    if (form.paid.checked) {
        paidStatus = "Yes";
    } else {
        paidStatus = "No";
    }
    new Client(
        form.channel.value,
        form.ign.value,
        form.map.value,
        form.hours.value,
        paidStatus,
        tableBody
    );

    clearInputs(form);
});

function clearInputs(form) {
    for (let input of form.elements) {
        input.value = "";
    }
}
