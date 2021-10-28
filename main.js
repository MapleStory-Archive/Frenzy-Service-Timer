import Client from "./Client.js";
import MapleMaps from "./MapleMaps.js";

const container = document.querySelector(".client-container");
const addClientBtn = document.querySelector(".new-client-btn");
const mapDatalist = document.querySelector("#map-list");

addClientBtn.addEventListener("click", () => {
    const client = new Client(container, {});
});

container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const dragging = document.querySelector(".dragging");

    if (afterElement === null) {
        container.appendChild(dragging);
    } else {
        container.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const clients = [...container.querySelectorAll(".client:not(.dragging)")];

    return clients.reduce(
        (closestBox, child) => {
            const boundingBox = child.getBoundingClientRect();
            const offset = y - boundingBox.top - boundingBox.height / 2;
            if (offset < 0 && offset > closestBox.offset) {
                return { offset: offset, element: child };
            } else {
                return closestBox;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

mapDatalist.innerHTML = new MapleMaps().getMapOptions();
