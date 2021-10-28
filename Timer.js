export default class Timer {
    constructor(root, seconds = 3600) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            hours: root.querySelector(".timer__part--hours"),
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
        };

        this.interval = null;
        this.remainingSeconds = seconds;
        this.updateInterfaceTime();

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start(root);
            } else {
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter Minutes:");
            if (inputMinutes) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
                root.parentElement.style.border = "none";
            }
        });
    }

    updateInterfaceTime() {
        const hours = Math.floor(this.remainingSeconds / 3600);
        const minutes = Math.floor(this.remainingSeconds / 60) - hours * 60;
        const seconds = this.remainingSeconds % 60;

        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.hours.textContent = hours.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start(root) {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
                root.parentElement.style.border = "thick solid crimson";
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
        <div class="timer__text">
            <span class="timer__part timer__part--hours">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
        </div>
        <button
            type="button"
            class="timer__btn timer__btn--control timer__btn--start"
        >
            <span class="material-icons md-18">play_arrow</span>
        </button>
        <button
            type="button"
            class="timer__btn timer__btn--control timer__btn--reset"
        >
            <span class="material-icons">timer</span>
        </button>  
        `;
    }
}
