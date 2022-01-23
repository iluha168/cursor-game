const express = require("express");
const exws = require("express-ws");
const path = require("path");
const helmet = require("helmet")

const ClientCursor = require("./ClientCursor");
const types = require("../types");
const Listener = require("../listeners.js");
const MinigameLoader = require("./games/minigameloader.js");

//First generator function application
function* idGenerator() {
    let id = 0;
    while(true) {
        yield id++;
    }
};

class Server {
    static server = express();
    static clients = new Map();
    static event = new Listener();
    static idGenerator = idGenerator();
	
    static start() {
        exws(this.server);
		if (process.env.IS_DEV == "false") {
			this.server.use(helmet());
		}
        this.setupWebSocket();
        this.setupPaths();
        this.server.listen();

        setInterval(()=>this.tick(), 50);

        MinigameLoader.loadGame("basic");
    }
    static setupWebSocket() {
        this.server.ws("/", (ws, _req) => {
            ws.id = this.idGenerator.next().value;

            let newHandle = new ClientCursor(ws, this.clients);
            this.clients.set(ws.id, newHandle);

            newHandle.send(types.IDENTIFY, { id: ws.id });

            for (let client of this.clients.values()) {
                //Send join event to all peers
                client.send(types.USER_JOIN, newHandle.data);

                //Send join event of all peers to connecting client
                newHandle.send(types.USER_JOIN, client.data);
            }

            ws.on("close", () => {
                this.clients.delete(ws.id);
                for (let client of this.clients.values()) {
                    client.send(types.USER_LEAVE, { id: ws.id });
                }
            });

            newHandle.addEventListener("*", (event, ...args) => {
                MinigameLoader.dispatchEvent(event, newHandle, ...args);
            })
        });
    }
    static setupPaths() {
        let securityPolicy = `
            default-src 'none';
            form-action 'none';
            frame-ancestors 'none';
            script-src 'self'${process.env.IS_DEV ? " 'unsafe-eval'" : ""};
            style-src 'self';
            img-src 'self';
            connect-src 'self';
            media-src 'self';
        `;
        const options = {
            setHeaders: (res,path,stat) => {
                res.set("Content-Security-Policy", securityPolicy.replace(/\s{4}|\n/g,""));
            }
        }
        this.server.use(express.static(path.join(__dirname,"../../dist/"), options));

        this.server.use("/assets/", express.static(path.join(__dirname, "../client/assets")));
		
        this.server.get("/types.js", (_req, res) => {
            res.sendFile(path.join(__dirname, "../types.js"));
        });
    }

    static tick() {
        MinigameLoader.tick();
    }
}

module.exports = Server;