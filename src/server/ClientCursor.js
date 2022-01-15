const notepack = require("notepack.io");
const types = require("../types");
const utils = require("../utils");
const Listener = require("../listeners.js");

class ClientCursor {
	constructor(ws, clients) {
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
					if (typeof data.x === "number") this.x = data.x;
					if (typeof data.y === "number") this.y = data.y;
					if (typeof data.c === "string") this.c = data.c;
					if (typeof data.p === "boolean") this.p = data.p;
					if (typeof data.nick === "string")
						this.nick = data.nick.slice(0, 32);

					let dataToSend =
						type == types.USER_MOVE ? this.pos : this.data;
					for (let client of this.clients.values()) {
						client.send(type, dataToSend);
					}
					break;
				case types.CHAT:
					if (typeof data.msg !== "string") return;
					if (!data.msg.length) return;
					data.msg = data.msg.trim().slice(0, 200);
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
void "No"; //repl.it thing
