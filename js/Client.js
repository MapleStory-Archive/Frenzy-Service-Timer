import Timer from "./Timer.js";

export default class Client {
    constructor(channel, ign, map, totalTime, paidStatus, obj) {
        this.ign = ign;
        this.map = map;
        this.channel = channel;
        this.totalTime = totalTime;
        this.paidStatus = paidStatus;

        this.el = document.createElement("tr");
        this.el.classList.add("client");
        this.el.innerHTML = this.getHTML();

        obj.append(this.el);
        new Timer(this.el.children[5].children[0], totalTime * 3600);

        const deleteButton = this.el.children[5].children[1];

        deleteButton.addEventListener("click", () => {
            this.el.remove();
            localStorage.removeItem(this.ign);
        });
    }

    getHTML() {
        return `
            <td>${this.channel}</td>
            <td>${this.ign}</td>
            <td>${this.map}</td>
            <td>${this.totalTime} hours</td>
            <td>${this.paidStatus.toString()}</td>
            <td>
                <div class="timer"></div>
                <button class="client__delete" type="button"><span class="material-icons">close</span></button>
            </td>
        `;
    }
}
