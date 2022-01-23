const notepack = require("notepack.io");
const types = require("../types");
const utils = require("../utils");
const Listener = require("../listeners.js");

class ClientCursor {
	constructor(ws, clients) {
        this.event = new Listener();
		this.ws = ws;
		this.clients = clients;
		this.x = 0.5;
		this.y = 0.5;
		this.c = "#" + utils.randint(256, 4096).toString(16); // colour
		this.nick = "New User"; //nickname
		this.p = false; // pressed (mouse click)

		ws.on("message", (msg) => {
			try {
				var [type, data] = notepack.decode(msg);
			} catch {
				return;
			}
			switch (type) {
				case types.DATA_CHANGE:
				case types.USER_MOVE:

                    //Actions
                    let posChanged = false;

					if (typeof data.x === "number") { // x ∈ [0;1]
						data.x = Math.min(Math.max(0, data.x), 1)
                        if(this.x !== data.x) posChanged = true;
						this.x = data.x;
                    }
					if (typeof data.y === "number") { // y ∈ [0;1]
						data.y = Math.min(Math.max(0, data.y), 1)
                        if(this.y !== data.y) posChanged = true;
						this.y = data.y;
					}
                    if(posChanged) {
                        this.event.dispatchEvent("mouseMove", data.x, data.y);
                    }
					
					if (typeof data.p === "boolean") {
                        //Will fire if new data is different from stored data
                        if(this.p !== data.p)
							this.event.dispatchEvent("buttonChanged",data.p);

						this.p = data.p;
                    }

                    //Customization
					if (typeof data.c === "string") {
                        if(this.c !== data.c)
							this.event.dispatchEvent("colorChanged",data.c);
                        this.c = data.c;
                    }
					if (typeof data.nick === "string") {
						data.nick = data.nick.slice(0, 32)
                        if(this.nick != data.nick) 
                            this.event.dispatchEvent("nickChanged",data.nick);
						this.nick = data.nick;
                    }

                    //Send message to all peers
					let dataToSend =
						type == types.USER_MOVE ? this.pos : this.data;
					for (let client of this.clients.values()) {
						client.send(type, dataToSend);
					}
					break;

				case types.CHAT:
					if (typeof data.msg !== "string") return;
                    
                    //Keep message within 200 char limit
					data.msg = data.msg.trim().slice(0, 200);
					if (!data.msg.length) return;

                    this.event.dispatchEvent("sendChat",data.msg);
                    
                    //Send message to all peers
					for (let client of this.clients.values()) {
						client.send(type, { id: ws.id, msg: data.msg });
					}
					break;
                    
				case types.PING:
					this.send(types.PING, Date.now());
			}
		});
	}
	send(type, data) {
		this.ws.send(notepack.encode([type, data]));
	}
	get data() {
		return {
			x: this.x,
			y: this.y,
			c: this.c,
			p: this.p,
			nick: this.nick,
			id: this.ws.id,
		};
	}

	get pos() {
		return {
			x: this.x,
			y: this.y,
			p: this.p,
			id: this.ws.id,
		};
	}
}

module.exports = ClientCursor;
