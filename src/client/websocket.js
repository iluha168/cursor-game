const notepack = require("notepack.io");

const types = require("../types");
const Listener = require("../listeners.js");

class SocketClient {
    static socket = null;
    static event = new Listener();
    static gamePing = 0;
    static userId = null;

    static async ping() {
        //Measures round-trip ping
        const t0 = performance.now();

        this.sendJSON(types.PING, Math.floor(t0));
        await this.event.waitForEvent("message_PING");

        const t1 = performance.now();

        this.gamePing = t1 - t0;
        return this.gamePing;
    }
    static start() {
        const socket = new WebSocket(...arguments);
        this.socket = socket;
        this.open = true;
        socket.onmessage = (e)=>{this.handleMessage(e)};
        socket.onerror = (e) => {
            this.event.dispatchEvent("error",e);
        }
        socket.onclose = (e) => {
            this.event.dispatchEvent("close");
        }
        return socket;
    }
    static async handleMessage(raw) {
        let [type, data] = notepack.decode(await raw.data.arrayBuffer());
		console.debug("%cIn: ", "color:red", type, data)
        if(type == types.IDENTIFY) this.userId = data.id;

        this.event.dispatchEvent("message_"+types.typeof(type),data);
        this.event.dispatchEvent("message_generic",data);
    }
    static sendJSON(type,data) {
        if(this.socket.readyState >= 2) return this.event.dispatchEvent("close");
		console.debug("%cOut: ", "color:lime", type, data)
        this.socket.send(notepack.encode([type,data]));
    }
    static updateState(state) {
        if(this.socket.readyState >= 2) return this.event.dispatchEvent("close");
        this.sendJSON(types.DATA_CHANGE,state);
    }
    static updatePosition(state) {
        if(this.socket.readyState >= 2) return this.event.dispatchEvent("close");
        this.sendJSON(types.USER_MOVE,state);
    }
    static sendMessage(msg) {
        if(this.socket.readyState >= 2) return this.event.dispatchEvent("close");
        this.sendJSON(types.CHAT,{msg});
    }
}

module.exports = SocketClient;