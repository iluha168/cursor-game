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
        document.querySelector("#color").addEventListener("change", (e) => {
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
        document.querySelector("#open-settings-btn").addEventListener("click", () => {
            this.openSettings();
        })
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
    static openSettings() {
        const settingsMenu = document.querySelector("#settings-menu");
        settingsMenu.style.transform = "translateX(0px)";

        let children = [...settingsMenu.querySelectorAll("*,*>*")].filter((el) => {
            console.log(el.tagName);
            return el.tagName == "INPUT" || el.tagName == "BUTTON"}
        );
        children.forEach((el,i) => {
            el.tabIndex = i+1;
        })
        
        let mouseIsOver = false;
        settingsMenu.onmouseover = () => mouseIsOver = true;
        settingsMenu.onmouseout = () => mouseIsOver = false;

        const clickCallback = () => {
            if(!mouseIsOver) {
                children.forEach((el) => {
                    el.tabIndex = -1;
                })
                settingsMenu.style.transform = "translateX(var(--menu-width))";
                document.body.removeEventListener("click",clickCallback);
            }
        }

        //Prevent accidental clicks
        setTimeout(() => {
            document.body.addEventListener("click",clickCallback);
        },500);
    }
    static addMessage(author,message) {
        const element = document.createElement("li");
        const authorElement = document.createElement("span");
        const messageElement = document.createElement("span");

        authorElement.textContent = author;
        messageElement.textContent = message;
        authorElement.classList.add("username");
        messageElement.classList.add("message");

        element.appendChild(authorElement);
        element.appendChild(messageElement);

        const chatLogs = document.querySelector("#chat-logs");
        chatLogs.appendChild(element);

        //Scroll to bottom of chat
        if(chatLogs.scrollHeight - Math.abs(chatLogs.scrollTop) == chatLogs.clientHeight) {
            setTimeout(() => {
                chatLogs.scrollTop = chatLogs.scrollHeight;
            });
        }

        //TODO: Make it so when you open chat it displays past messages
        setTimeout(() => {
            element.hidden = true;
        },15000);
    }
}

module.exports = DomWorker;