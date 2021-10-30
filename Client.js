import Timer from "./Timer.js";

export default class Client {
    constructor(
        root,
        { name = "", map = "", channel = "", initSeconds = 3600 }
    ) {
        this.name = name;
        this.map = map;
        this.channel = channel;
        this.parentElement = root;
        this.element = this.getElementHTML();
        this.initSeconds = initSeconds;
        this.timer = new Timer(
            this.element.querySelector(".client__timer"),
            initSeconds
        );
        this.parentElement.append(this.element);
    }

    getElementHTML() {
        const client = document.createElement("div");

        client.classList.add("client");
        client.setAttribute("draggable", true);
        client.innerHTML = `
        <div class="client__form">
            <div class="client__form__field">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="In-game name"
                    value="${this.name}"
                    spellcheck="false"
                    maxlength="12"
                />
            </div>
            <div class="client__form__field">
                <input
                    type="text"
                    name="channel"
                    id="channel"
                    placeholder="Channel #"
                    value="${this.channel}"
                />
            </div>
            <div class="client__form__field">
                <input
                    type="text"
                    list="map-list"
                    name="map"
                    id="map"
                    placeholder="Map name (e.g: Cavern Lower Path)"
                    value="${this.map}"
                    spellcheck="false"
                />
            </div>
            </div>
            <div class="client__timer"></div>
            <div class="client__controls">
                <button type="button">Delete</button>
            </div>
        `;

        client
            .querySelector(".client__controls button")
            .addEventListener("click", async () => {
                this.element.remove();
            });
        // await this.getRelevantMaps(datalist);
        client.setAttribute("draggable", true);

        client.addEventListener("dragstart", () => {
            client.classList.add("dragging");
        });
        client.addEventListener("dragend", () => {
            client.classList.remove("dragging");
        });

        return client;
    }
}
