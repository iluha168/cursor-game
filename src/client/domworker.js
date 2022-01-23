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
            this.event.dispatchEvent("color", input.value);
        })
		document.querySelector("#minigames").addEventListener("click", (e)=>{
			alert("We didn't make minigames yet, sorry ;)")
		})
        document.querySelector("#disconnect-warning").classList.add("hidden");
        document.querySelector("#disconnect-warning > .container > button").addEventListener("click", () => {
            document.location.reload()
        });
    }
    static setColor(color) {
        document.querySelector("#color").value = color;
    }
    static setStats(stats) {
        const {fps, ping, players} = stats;
        if(fps) document.querySelector("#fps-counter").textContent = fps;
        if(ping) document.querySelector("#ping-counter").textContent = ping;
        if(players) document.querySelector("#players-online").innerText = players;
    }
    static showDisconnectionWarning() {
        document.querySelector("#disconnect-warning").classList.remove("hidden");
    }
}

module.exports = DomWorker;