const SocketClient = require("./websocket.js");
const Renderer = require("./renderer.js");
const Input = require("./input.js");
const Player = require("./player.js");
const Listener = require("../listeners.js");
const DomWorker = require("./domworker.js");
const { randint } = require("../utils.js");

class Game {
    static event = new Listener();
    static config = {
        mouseFloatPrecision: 2000,
        socketUrl: "wss://" + location.hostname,
    }
    static data = {
        cursors: {},
        chats: {},
    }

    //Default settings without localstorage
    static settings = {
        color: "#" + randint(0x111111, 0xffffff).toString(16),
        nick: "No nickname",
    }
    static ws = null;
    static me = new Player();

    static fetchSettings() {
        Object.assign(this.settings,localStorage);
        this.settings.Length = undefined;
        
        this.me.c = this.settings.color;
        this.me.nick = this.settings.nick;
        DomWorker.setColor(this.settings.color);
    }
    static saveSettings() {
        Object.assign(localStorage,this.settings);
        
        this.me.c = this.settings.color;
        this.me.nick = this.settings.nick;
    }

    static syncSettings() {
        SocketClient.updateState(this.me);
    }

    static start() {
        Input.listen(Renderer.canvas);
        DomWorker.setup();
        DomWorker.event.addEventListener("chat", (message) => {
            SocketClient.sendMessage(message);
        })
        DomWorker.event.addEventListener("nick", (nickname) => {
            this.settings.nick = nickname;
            this.saveSettings();
            this.syncSettings();
        })
        DomWorker.event.addEventListener("color", (color) => {
            this.settings.color = color;
            this.saveSettings();
            this.syncSettings();
        })

        this.fetchSettings();
        this.syncSettings();
    }
    static setupSocketListeners() {
        this.me.id = SocketClient.userId;

        SocketClient.event.addEventListener("message_USER_JOIN", (user) => {
            if(user.id != this.me.id)
            this.userJoin(user);
        })
        SocketClient.event.addEventListener("message_USER_LEAVE", (user) => {
            if(user.id != this.me.id)
            this.userLeave(user);
        })
        SocketClient.event.addEventListener("message_USER_MOVE", (user) => {
            if(user.id != this.me.id)
            this.userMove(user);
        })
        SocketClient.event.addEventListener("message_DATA_CHANGE", (user) => {
            if(user.id != this.me.id)
            this.userDataChange(user);
        })
        SocketClient.event.addEventListener("message_CHAT", (data) => {
            this.chatMessage(data);
        })
        SocketClient.event.addEventListener("message_IDENTIFY", (user) => {
            this.me.id = user.id;
        })
    }

    static userJoin(user) {
        const player = new Player(user);
        this.data.cursors[user.id] = player;
        this.event.dispatchEvent("user_join",player);
    }

    static userLeave(user) {
        const player = this.data.cursors[user.id];
        if(!player) return;
        
        player.selfDestruct();

        delete this.data.cursors[user.id];
        this.event.dispatchEvent("user_leave",user);
    }

    static userMove(user) {
        const player = this.data.cursors[user.id];
        if(!player) return;

        player.merge(user);

        this.event.dispatchEvent("user_move",user);
    }

    static userDataChange(user) {
        if(user.id == this.me.id) {
            this.me.merge(user);
        } else {
            this.data.cursors[user.id].merge(user);
        }
        this.event.dispatchEvent("user_change",user);
    }

    static chatMessage(data) {
        let {msg, id} = data;
        
        this.data.chats[id] = [msg,...(this.data.chats[id] || [])];

        setTimeout(() => {
            this.data.chats[id].splice(this.data.chats[id].length-1,1);
        },msg.length * 150 + 5000);
        
        this.event.dispatchEvent("chat_message",data);
    }

    static tick() {
        let [x,y] = this.screenToWorldSpace(Input.mouseX,Input.mouseY);

        const newState = {
            x, y, 
            p: Input.leftMousePressed
        };
        this.me.merge(newState);
        SocketClient.updatePosition(newState);
    }

    static tickHighFreq() {
        for(let c of Object.keys(this.data.cursors)) {
            let cursor = this.data.cursors[c];
            cursor.tickInterpolation();
        }
        this.me.tickInterpolation();
    }

    static t0 = performance.now();
    static t1 = performance.now();
    static fps = 0;
    static draw() {
        this.t1 = performance.now();
        let dt = this.t1 - this.t0;
        this.t0 = this.t1;
        this.fps = 1/dt;

        Renderer.clear();
        
        for(let c of Object.keys(this.data.cursors)) {
            let cursor = this.data.cursors[c];
            let chatMessages = this.data.chats[c];
            Renderer.renderPlayer(cursor,chatMessages);
        }

        Renderer.renderPlayer(this.me,this.data.chats[this.me.id]);
    }

    static screenToWorldSpace(x,y) {
        return [
            x / Renderer.canvas.width,
            y / Renderer.canvas.height
        ]
    }

    static async establishConnection() {
        return new Promise((res,rej) => {
            const socket = SocketClient.start(this.config.socketUrl);
            this.ws = socket;
            this.setupSocketListeners();

            //Resolve on open
            socket.onopen = () => {
                socket.onerror = socket.onclose = null;
                res(socket);
            }

            //If socket error or closed before opened then throw error
            socket.onerror = () => {
                this.ws = null;
                rej(0);
            }
            socket.onclose = () => {
                this.ws = null;
                rej(1);
            }
        })
    }
}

module.exports = Game;