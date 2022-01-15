const Listener = require("../listeners.js");

class DomWorker {
    static event = new Listener();

    static setup() {
        document.querySelector("#chat").addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.querySelector("#chat > input");

            this.event.dispatchEvent("chat",input.value);
            input.value = "";
        })
        document.querySelector("#nick").addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.querySelector("#nick > input");

            this.event.dispatchEvent("nick",input.value);
            input.value = "";
        })
        document.querySelector("#color").addEventListener("input", (e) => {
            const input = document.querySelector("#color");

            this.event.dispatchEvent("color",input.value);
        })
    }
    static setColor(color) {
        document.querySelector("#color").value = color;
    }
}

module.exports = DomWorker;