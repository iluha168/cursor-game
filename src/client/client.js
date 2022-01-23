const utils = require("../utils");
const CrossTab = require("./cross-tab.js")
const Game = require("./game.js");
const Renderer = require("./renderer.js");
const Loader = require("./loader.js");

if (process.env.NODE_ENV == "development") window.Game = Game;

Loader.assets = {
    unloaded: [
        {
            id: "player_join",
            src: "player_join.wav",
            type: "audio"
        },
        {
            id: "player_leave",
            src: "player_leave.wav",
            type: "audio"
        },
        {
            id: "new_message",
            src: "message.wav",
            type: "audio"
        },
    ],
    audio: {},
};

let assets = null;

async function setup() {
	let CTChannel = new CrossTab();
    assets = await Loader.loadAssets();
    Renderer.setup();

    try {
        await Game.establishConnection();
    } catch(e) {
        console.log("%cUnable to connect to the game.", "color:red;font-weight:bold;");
        return await setup();
    }
    console.log("%cSuccessfully connected to the game!", "color:lime;font-weight:bold;");

    Game.syncSettings();
    Game.start();

    setInterval(()=>Game.tick(), 50)
    setInterval(()=>Game.tickHighFreq(), 5)
    setInterval(()=>Game.tickLowFreq(), 500)

    Game.event.addEventListener("user_join", (player) => {
        assets.audio.player_join.play();
    });

    Game.event.addEventListener("user_leave", (player) => {
        assets.audio.player_leave.play();
    });

    Game.event.addEventListener("chat_message", (msg) => {
        assets.audio.new_message.play();
    });
}

window.onload = setup;

var t0 = 0;
function frame(t1) {
	Game.fps = Math.round(1000/(t1-t0));
	t0 = t1;
    Game.draw();
	requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// Trick webpack into thinking it's a ES6 module
export default function () {}