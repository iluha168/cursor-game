const notepack = require("notepack.io");

const types = require("../types");
const Listener = require("../listeners.js");

class SocketClient {
    static socket = null;
    static event = new Listener();
    static ping = 0;
    static userId = null;

    static async ping() {
        //Measures round-trip ping
        const t0 = performance.now();

        this.sendJSON(types.PING,Math.floor(t0));
        await this.event.waitForEvent("message_PING");

        const t1 = performance.now();

        this.ping = t1 - t0;
        return this.ping;
    }
    static start() {
        const socket = new WebSocket(...arguments);
        this.socket = socket;
        socket.onmessage = (e)=>{this.handleMessage(e)};
        
        return socket;
    }
    static async handleMessage(raw) {
        let [type, data] = notepack.decode(await raw.data.arrayBuffer());

        if(type == types.IDENTIFY) this.userId = data.id;

        this.event.dispatchEvent("message_"+types.typeof(type),data);
        this.event.dispatchEvent("message_generic",data);
    }
    static sendJSON(type,data) {
        this.socket.send(notepack.encode([type,data]));
    }
    static updateState(state) {
        this.sendJSON(types.DATA_CHANGE,state);
    }
    static updatePosition(state) {
        this.sendJSON(types.USER_MOVE,state);
    }
    static sendMessage(msg) {
        this.sendJSON(types.CHAT,{msg});
    }
}

module.exports = SocketClient;
/*

switch (type) {
    case types.USER_MOVE:
    case types.DATA_CHANGE:
        let newData = cursors.get(data.id) ?? {};
        if (data.x != null) newData.x = (data.x * cvs.width) / precision;
        if (data.y != null) newData.y = (data.y * cvs.height) / precision;
        if (data.c != null) newData.c = data.c;
        if (data.p != null) newData.p = data.p;
        if (data.id != null) newData.id = data.id;
        if (data.nick != null) newData.nick = data.nick;
        cursors.set(data.id, newData);
        break;
    case types.USER_JOIN:
        cursors.set(data.id, data);
        assets.audio.player_join.play();
        break;
    case types.USER_LEAVE:
        cursors.delete(data.id);
        assets.audio.player_leave.play();
        break;
    case types.CHAT:
        if (!chats.get(data.id)) chats.set(data.id, []);
        chats.get(data.id).push(data.msg);
        assets.audio.new_message.play();
        setTimeout(() => chats.get(data.id).shift(), 7000);
        break;
    case types.IDENTIFY:
        myid = data.id;
        break;
    case types.PING:
        ping = Date.now() - lastPingTime;
        setTimeout(sendPing, 500);
        break;
    default:
        console.log(type, data);
        break;
}
*/