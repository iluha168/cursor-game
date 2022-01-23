const Listener = require("../listeners.js");

class MinigameLoader {
    static minigames = new Map();

    static loadGame(name) {
        const game = require("./"+name+".js");
        game.setup();
        
        this.addEventListener("*", (type, ws, ...args) => {
            game.dispatchEvent(type, ws, ...args);
        })

        game.start();

        this.minigames.set(name,game);
    }
    static tick() {
        this.minigames.values().forEach(game => {
            game.tick();
        });
    }
}
Listener.attach(MinigameLoader);

module.exports = MinigameLoader;